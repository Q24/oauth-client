import { AuthResultFilter } from "../auth-result-filter/model/auth-result-filter.model";
import { validateAuthResultBackend } from "../backend-check/validate-auth-result-backend";
import { validateAccessToken } from "./access-token-validation";
import { validateIdToken } from "./id-token-validation";
import { AuthResult } from "./model/auth-result.model";
import { validateState } from "./state-validation";

export function validateAuthResult(authResult:AuthResult): void {
  validateState(authResult.state);
  validateIdToken(authResult.id_token);
  validateAccessToken(authResult);
}


export async function isValidNewAuthResult(authResult: AuthResult): Promise<boolean> {
  try {
    validateAuthResult(authResult);
    await validateAuthResultBackend(authResult);
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