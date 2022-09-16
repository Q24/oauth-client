import { deleteStoredAuthResults } from "../authentication/auth-result";
import { Client } from "../client";
import { deleteAllStoredRefreshTokens } from "../flows/code-flow/refresh-token";
import { deleteIdTokenHint } from "../open-id/id-token-hint";
import { deleteNonce } from "./nonce";
import { deleteState } from "./state";

/**
 * Cleans up the current session: deletes the stored local tokens, discoveryState, nonce,
 * id token hint, CSRF token, json web key set, id provider metadata, user info,
 * refresh token
 */
export function cleanStorage(client: Client): void {
  client.logger.debug("cleaning all storage items.");
  deleteStoredAuthResults(client);
  deleteIdTokenHint(client);
  deleteState(client);
  deleteNonce(client);
  deleteAllStoredRefreshTokens(client);
}
