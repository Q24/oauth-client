import { validateAuthResultBackend } from "../backend-check/validate-auth-result-backend";
import { usesOpenId } from "../open-id/uses-openid";
import isCodeFlow from "../utils/is-code-flow";
import { validateAccessToken } from "./access-token-validation";
import { validateIdToken } from "./id-token-validation";
import { validateState } from "./state-validation";

import type { AuthResultFilter } from "../auth-result-filter/model/auth-result-filter.model";
import type { AuthResult } from "./model/auth-result.model";
import { Client } from "../client";
export function validateAuthResult(
  client: Client,
  authResult: AuthResult,
): void {
  if (!isCodeFlow(client)) {
    validateState(client, authResult.state);
  }
  if (usesOpenId(client)) {
    validateIdToken(client, authResult.id_token);
    validateAccessToken(client, authResult);
  }
}

export async function isValidNewAuthResult(
  client: Client,
  authResult: AuthResult,
): Promise<boolean> {
  try {
    validateAuthResult(client, authResult);
    await validateAuthResultBackend(client, authResult);
    return true;
  } catch (error) {
    return false;
  }
}

export function isValidStoredAuthResult(
  storedAuthResult: AuthResult,
  authResultFilters: AuthResultFilter[],
): boolean {
  if (authResultFilters.every((filter) => filter(storedAuthResult))) {
    return true;
  }
  return false;
}
