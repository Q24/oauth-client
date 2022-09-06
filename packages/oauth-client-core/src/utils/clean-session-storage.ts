import { deleteStoredAuthResults } from "../authentication/auth-result";
import { deleteSessionId } from "../backend-check/session-id";
import { Client } from "../client";
import { deleteStoredCsrfToken } from "../csrf/csrf";
import { deleteAllStoredRefreshTokens } from "../flows/code-flow/refresh-token";
import { deleteIdTokenHint } from "../open-id/id-token-hint";
import { clearUserInfoCache } from "../user-info/user-info-state";
import { deleteNonce } from "./nonce";
import { deleteState } from "./state";

/**
 * Cleans up the current session: deletes the stored local tokens, discoveryState, nonce,
 * id token hint, CSRF token, json web key set, id provider metadata, user info,
 * refresh token
 */
export function cleanSessionStorage(client: Client): void {
  client.logger.debug(
    "cleanSessionStorage: cleaning all session storage items.",
  );
  deleteStoredAuthResults(client);
  deleteIdTokenHint();
  deleteState(client);
  deleteNonce();
  deleteSessionId();
  deleteStoredCsrfToken(client);
  clearUserInfoCache();
  deleteAllStoredRefreshTokens();
}
