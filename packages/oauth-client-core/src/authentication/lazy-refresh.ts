import { discovery } from "../discovery/discovery";
import { codeFlowRefreshAccessToken } from "../flows/code-flow/code-flow-refresh";
import { silentRefresh } from "../flows/implicit-flow/implicit-flow-refresh";
import isCodeFlow from "../flows/code-flow/is-code-flow";

import type { AuthResult } from "../jwt/model/auth-result.model";
import type { AuthValidationOptions } from "../jwt/model/auth-validation-options.model";
import { Client } from "../client";
/**
 * Check if the token expires in the next *x* seconds.
 *
 * If this is the case, a silent refresh will be triggered and the Promise will
 * resolve to `true`.
 *
 * If the token does not expire within *x* seconds, the Promise will resolve to
 * `false` instead.
 *
 * @param authResult the token to check
 * @param tokenValidationOptions extra validations for the token
 * @returns A promise.
 *
 * @throws May throw an error if the token we got from the refresh is not valid,
 * or if the refresh did not succeed.
 */
export async function lazyRefresh(
  client: Client,
  authResult: AuthResult,
  tokenValidationOptions?: AuthValidationOptions & {
    almostExpiredThreshold?: number;
  },
): Promise<boolean> {
  await discovery(client);
  if (
    almostExpired(authResult, tokenValidationOptions?.almostExpiredThreshold)
  ) {
    const silentRefreshToken = await _refresh(client, tokenValidationOptions);
    if (!silentRefreshToken) {
      throw Error("invalid_token");
    }
    return true;
  }
  return false;
}

async function _refresh(
  client: Client,
  tokenValidationOptions?: AuthValidationOptions,
): Promise<AuthResult | null> {
  if (isCodeFlow(client)) {
    return codeFlowRefreshAccessToken(client);
  }
  return silentRefresh(client, tokenValidationOptions);
}

function almostExpired(authResult: AuthResult, threshold?: number) {
  return (
    authResult.expires &&
    authResult.expires - Math.round(new Date().getTime() / 1000.0) <
      (threshold ?? 300)
  );
}
