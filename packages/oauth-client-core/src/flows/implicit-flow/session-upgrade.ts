import { assertProviderMetadata } from "../../discovery/assert-provider-metadata";
import { timeout } from "../../utils/timeout";
import {
  clearQueryParameters,
  getHashParameters,
  parseQueryParameters,
  toUrlParameterString,
} from "../../utils/url";
import { deleteStoredHashString, getStoredHashString } from "./hash";

import type { AuthResult } from "../../jwt/model/auth-result.model";
import { Client } from "../../client";

export function getSessionUpgradeToken(): string | null {
  const authResultFromUrl = getHashParameters<Partial<AuthResult>>();
  if (authResultFromUrl.session_upgrade_token) {
    clearQueryParameters();
    return authResultFromUrl.session_upgrade_token;
  }

  const hashStringFromStorage = getStoredHashString();
  if (!hashStringFromStorage) {
    return null;
  }
  const hashResultFromStorage = parseQueryParameters<Partial<AuthResult>>(
    hashStringFromStorage,
  );
  if (!hashResultFromStorage.session_upgrade_token) {
    return null;
  }
  deleteStoredHashString();
  return hashResultFromStorage.session_upgrade_token;
}

/**
 * HTTP Redirect to the Authorisation.
 *
 * This redirects (with session upgrade params) to the Authorisation.
 * The Authorisation then upgrades the session, and will then redirect back. The next authorizeRedirect() call will
 * then return a valid token, because the session was upgraded.
 */
export async function sessionUpgrade(
  client: Client,
  sessionUpgradeToken: string,
): Promise<AuthResult> {
  const urlVars = {
    session_upgrade_token: sessionUpgradeToken,
    redirect_uri: `${client.config.redirect_uri}?flush_state=true`,
  };

  client.logger.debug(
    "Session upgrade function triggered with token: ",
    sessionUpgradeToken,
  );

  // Do the authorize redirect
  const urlParams = toUrlParameterString(urlVars);
  assertProviderMetadata(client.providerMetadata);
  window.location.href = `${client.providerMetadata.issuer}/upgrade-session?${urlParams}`;

  // Send Authorization code and code verifier to token endpoint -> server returns access token
  await timeout(7000);
  throw Error("authorize_redirect_timeout");
}
