// https://openid.net/specs/openid-connect-rpinitiated-1_0.html

import { getStoredAuthResult } from "../authentication";
import { Client } from "../client";
import { discovery } from "../discovery/discovery";
import { getIdTokenHint } from "../open-id/id-token-hint";
import { destroyIframe } from "../utils/iframe";
import { RpInitiatedLogoutOptions } from "./rp-initiated-logout.model";

const frontChannelLogoutStore: {
  [iFrameId: string]: Promise<void> | undefined;
} = {};

/**
 * Allows you to initiate a logout of the session in the background via an
 * iframe.
 *
 * This logout will not redirect the top-level window to the logged-out page.
 * It is important that the result of the returning Promise is used to take
 * an action (e.g. do a redirect to the logout page).
 *
 * The logout was successful if the iframe ended up on the configured
 * `post_logout_redirect_uri`.
 *
 * @param url A URL pointing to a *page*.
 * This *page* should make a POST request to the logout endpoint of the SSO server
 * in an automated fashion, which will cause the user to be logged out.
 * The `id_token_hint` will be supplied to the *page* via this
 * function. Defaults to `front_channel_logout_uri` from the client.config.
 * @returns The promise resolves if the logout was successful, otherwise it will reject.
 */
export async function rpInitiatedLogout(
  client: Client,
  _frontChannelLogoutConfig?: RpInitiatedLogoutOptions,
): Promise<void> {
  const { providerMetadata } = await discovery(client);

  const authResult = getStoredAuthResult(client);

  const frontChannelLogoutConfig: RpInitiatedLogoutOptions = {
    id_token_hint: authResult?.id_token,
    client_id: client.config.client_id,
    ..._frontChannelLogoutConfig,
  };

  const post_logout_redirect_uri =
    frontChannelLogoutConfig.post_logout_redirect_uri;

  client.logger.debug("Front-Channel logout by URL started");
  const iframeId = "frontChannelLogoutIframe";

  // Checks if there is a concurrent front-channel logout call going on.
  if (frontChannelLogoutStore[iframeId]) {
    return frontChannelLogoutStore[iframeId];
  }

  if (!providerMetadata.end_session_endpoint) {
    throw new Error("providerMetadata.end_session_endpoint is required");
  }

  // Store CSRF token of the new session to storage. We'll need it for logout and authenticate
  const src = await getFrontChannelIframeSrc(
    providerMetadata.end_session_endpoint,
    client,
  );

  // Create an iFrame
  const iFrame = getLogoutIFrame(src);

  const frontChannelLogoutPromise = new Promise<void>((resolve, reject) => {
    // Handle the result of the Authorize Redirect in the iFrame
    iFrame.onload = () => {
      client.logger.debug(
        "front-channel logout iFrame onload triggered",
        iFrame,
      );

      let timeout = 5000;
      const interval = 50;

      const intervalTimer = setInterval(() => {
        timeout -= interval;

        if (timeout <= 0) {
          client.logger.debug(
            "Front-channel logout failed after 5000",
            iFrame.contentWindow?.location.href,
            post_logout_redirect_uri,
          );

          clearInterval(intervalTimer);
          destroyIframe(iFrame);
          reject("timeout");
          return;
        }

        const currentIframeURL = iFrame.contentWindow!.location.href;
        if (currentIframeURL.indexOf(post_logout_redirect_uri) === 0) {
          client.logger.debug(
            "Front-channel logout successful",
            iFrame.contentWindow!.location.href,
            post_logout_redirect_uri,
          );

          clearInterval(intervalTimer);
          destroyIframe(iFrame);
          resolve();
        }
      }, interval);
    };
  }).finally(() => {
    if (frontChannelLogoutStore[iframeId]) {
      delete frontChannelLogoutStore[iframeId];
    }
  });
  // Sets the front-channel logout promise so concurrent calls to this function will
  // use the same promise.
  frontChannelLogoutStore[iframeId] = frontChannelLogoutPromise;

  return frontChannelLogoutPromise;
}

async function getFrontChannelIframeSrc(
  logout_url: string,
  client: Client,
): Promise<string> {
  let iframeUrl = `${logout_url}?id_token_hint=${getIdTokenHint(client)}`;
  client.logger.debug("Do front-channel logout with URL", iframeUrl);
  return iframeUrl;
}

/**
 * Create a logout frame and append it to the DOM
 * @returns {HTMLIFrameElement}
 */
function getLogoutIFrame(src: string): HTMLIFrameElement {
  const iFrame: HTMLIFrameElement = document.createElement("iframe");

  // Set the iFrame  Id
  iFrame.id = "frontChannelLogoutIframe";
  // Hide the iFrame
  iFrame.style.display = "none";

  // For older FireFox and IE versions first append the iFrame and then set its
  // source attribute.
  window.document.body.appendChild(iFrame);

  // Set the iFrame source
  iFrame.src = src;

  return iFrame;
}
