// https://openid.net/specs/openid-connect-frontchannel-1_0-06.html

import { Client } from "../client";
import { parseIdToken } from "../jwt";
import { getIdTokenHint } from "../open-id/id-token-hint";
import { cleanStorage } from "../utils/clean-session-storage";
import { parseQueryParameters } from "../utils/url";

// import { Client } from "../client";
// import { getIdTokenHint } from "../open-id/id-token-hint";
// import { destroyIframe } from "../utils/iframe";

interface FrontChannelLogoutConfig {
  logout_url: string;
  post_logout_redirect_uri: string;
}

interface FrontChannelLogoutSession {
  iss: string;
  sid: string;
}

export function rpLogout(client: Client) {
  const session = parseQueryParameters<FrontChannelLogoutSession>(
    window.location.search,
  );

  if ((session.iss || session.sid) && !(session.iss && session.sid)) {
    throw new Error("if either iss or sid is provided, both must be provided");
  }

  return _rpLogout(client, session);
}

export function _rpLogout(client: Client, options?: FrontChannelLogoutSession) {
  const idTokenHint = getIdTokenHint(client);
  if (!idTokenHint) {
    throw new Error("id_token_hint is required");
  }
  const idToken = parseIdToken(idTokenHint);

  if (idToken.payload.iss !== options.iss) {
    throw new Error("iss does not match");
  }
  if (idToken.payload.sid !== options.sid) {
    throw new Error("sid does not match");
  }

  cleanStorage(client);
}

// const frontChannelLogoutStore: {
//   [iFrameId: string]: Promise<void> | undefined;
// } = {};

// /**
//  * Allows you to initiate a logout of the session in the background via an
//  * iframe.
//  *
//  * This logout will not redirect the top-level window to the logged-out page.
//  * It is important that the result of the returning Promise is used to take
//  * an action (e.g. do a redirect to the logout page).
//  *
//  * The logout was successful if the iframe ended up on the configured
//  * `post_logout_redirect_uri`.
//  *
//  * @param url A URL pointing to a *page*.
//  * This *page* should make a POST request to the logout endpoint of the SSO server
//  * in an automated fashion, which will cause the user to be logged out.
//  * The `id_token_hint` and `csrf_token` will be supplied to the *page* via this
//  * function. Defaults to `front_channel_logout_uri` from the client.config.
//  * @returns The promise resolves if the logout was successful, otherwise it will reject.
//  */
// export async function frontChannelLogout(
//   client: Client,
//   frontChannelLogoutConfig?: FrontChannelLogoutConfig,
// ): Promise<void> {
//   const logout_url =
//     frontChannelLogoutConfig?.logout_url ??
//     client.config.front_channel_logout_uri;
//   const post_logout_redirect_uri =
//     frontChannelLogoutConfig?.post_logout_redirect_uri ??
//     client.config.post_logout_redirect_uri;

//   if (!(logout_url && post_logout_redirect_uri)) {
//     client.logger.error(
//       "the logout URL or post logout redirect URL must be defined",
//       "logout_url",
//       logout_url,
//       "post_logout_redirect_uri",
//       post_logout_redirect_uri,
//     );
//     throw Error("logout_url or post_logout_redirect_uri undefined");
//   }

//   client.logger.debug("Front-Channel logout by URL started");
//   const iframeId = "frontChannelLogoutIframe";

//   // Checks if there is a concurrent front-channel logout call going on.
//   if (frontChannelLogoutStore[iframeId]) {
//     return frontChannelLogoutStore[iframeId];
//   }
//   // Store CSRF token of the new session to storage. We'll need it for logout and authenticate
//   const src = await getFrontChannelIframeSrc(logout_url, client, iFrame);

//   // Create an iFrame
//   const iFrame = getLogoutIFrame(src);

//   const frontChannelLogoutPromise = new Promise<void>((resolve, reject) => {
//     // Handle the result of the Authorize Redirect in the iFrame
//     iFrame.onload = () => {
//       client.logger.debug(
//         "front-channel logout iFrame onload triggered",
//         iFrame,
//       );

//       let timeout = 5000;
//       const interval = 50;

//       const intervalTimer = setInterval(() => {
//         timeout -= interval;

//         if (timeout <= 0) {
//           client.logger.debug(
//             "Front-channel logout failed after 5000",
//             iFrame.contentWindow?.location.href,
//             post_logout_redirect_uri,
//           );

//           clearInterval(intervalTimer);
//           destroyIframe(iFrame);
//           reject("timeout");
//           return;
//         }

//         const currentIframeURL = iFrame.contentWindow!.location.href;
//         if (currentIframeURL.indexOf(post_logout_redirect_uri) === 0) {
//           client.logger.debug(
//             "Front-channel logout successful",
//             iFrame.contentWindow!.location.href,
//             post_logout_redirect_uri,
//           );

//           clearInterval(intervalTimer);
//           destroyIframe(iFrame);
//           resolve();
//         }
//       }, interval);
//     };
//   }).finally(() => {
//     if (frontChannelLogoutStore[iframeId]) {
//       delete frontChannelLogoutStore[iframeId];
//     }
//   });
//   // Sets the front-channel logout promise so concurrent calls to this function will
//   // use the same promise.
//   frontChannelLogoutStore[iframeId] = frontChannelLogoutPromise;

//   return frontChannelLogoutPromise;
// }

// async function getFrontChannelIframeSrc(
//   logout_url: string,
//   client: Client,
// ): Promise<string> {
//   let iframeUrl = `${logout_url}?id_token_hint=${getIdTokenHint(client)}`;
//   if (client.config.csrf_token_endpoint) {
//     await getCsrfResult(client)
//       .then((csrfResult) => {
//         iframeUrl += `&csrf_token=${csrfResult.csrf_token}`;

//         client.logger.debug("Do front-channel logout with URL", iframeUrl);
//         iFrame.src = iframeUrl;
//       })
//       .catch((error) => {
//         client.logger.debug("no CsrfToken", error);
//         throw error;
//       });
//   } else {
//     client.logger.debug("Do front-channel logout with URL", iframeUrl);
//     iFrame.src = iframeUrl;
//   }
// }

// /**
//  * Create a logout frame and append it to the DOM
//  * @returns {HTMLIFrameElement}
//  */
// function getLogoutIFrame(src: string): HTMLIFrameElement {
//   const iFrame: HTMLIFrameElement = document.createElement("iframe");

//   // Set the iFrame  Id
//   iFrame.id = "frontChannelLogoutIframe";
//   // Hide the iFrame
//   iFrame.style.display = "none";

//   // For older FireFox and IE versions first append the iFrame and then set its
//   // source attribute.
//   window.document.body.appendChild(iFrame);

//   // Set the iFrame source
//   iFrame.src = src;

//   return iFrame;
// }
