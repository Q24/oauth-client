import { deleteStoredAuthResults } from "../authentication/auth-result";
import { deleteIdTokenHint } from "../open-id/id-token-hint";
import { deleteAllStoredRefreshTokens } from "../flows/code-flow/refresh-token";
import { deleteSessionId } from "../backend-check/session-id";
import { deleteStoredCsrfToken } from "../csrf/csrf";
import { deleteStoredUserInfo } from "../user-info/user-info-storage";
import { LogUtil } from "./log-util";
import { deleteNonce } from "./nonce";
import { deleteState } from "./state";

/**
 * Cleans up the current session: deletes the stored local tokens, discoveryState, nonce,
 * id token hint, CSRF token, json web key set, id provider metadata, user info,
 * refresh token
 */
export function cleanSessionStorage(): void {
  LogUtil.debug("cleanSessionStorage: cleaning all session storage items.");
  deleteStoredAuthResults();
  deleteIdTokenHint();
  deleteState();
  deleteNonce();
  deleteSessionId();
  deleteStoredCsrfToken();
  deleteStoredUserInfo();
  deleteAllStoredRefreshTokens();
}
