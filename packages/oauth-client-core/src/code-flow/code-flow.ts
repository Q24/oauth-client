import {
  getStoredAuthResult,
  storeAuthResult,
} from "../authentication/auth-result";
import { getStoredRefreshToken } from "./refresh-token";
import { authorize, ensureNoErrorInParameters } from "../common/authorize";
import { AuthResult } from "../jwt/index";
import { clearQueryParameters } from "../utils/url/clear-query-parameters";
import {
  accessTokenRequest,
  createCodeFlowAccessTokenRequestParameters,
} from "./code-flow-access-token-request";
import { createCodeFlowAuthorizeRequestParameters } from "./code-flow-authorize-params";
import { codeFlowRefreshAccessToken } from "./code-flow-refresh";
import { getCodeFromUrl } from "./get-code-from-url";
import { OAuthCodeFlowAuthorizeParameters } from "./model/authorization-request.model";
import { AuthValidationOptions } from "../jwt/model/auth-validation-options.model";
import {
  isValidNewAuthResult,
  isValidStoredAuthResult,
} from "../jwt/validate-auth-result";

export async function codeFlow(
  authValidationOptions?: AuthValidationOptions,
): Promise<AuthResult> {
  // Get the authorization code from the URL parameters and clear parameters from URL
  const code = getCodeFromUrl();
  if (code) {
    clearQueryParameters();
    const codeFlowAuthResult = await codeFlowAccessTokenFlow(code);
    if (codeFlowAuthResult) {
      if (await isValidNewAuthResult(codeFlowAuthResult)) {
        storeAuthResult(codeFlowAuthResult);
        if (
          isValidStoredAuthResult(
            codeFlowAuthResult,
            authValidationOptions?.extraAuthFilters || [],
          )
        ) {
          return codeFlowAuthResult;
        }
      }
    }
  }

  const storedAuthResult = getStoredAuthResult();
  if (
    storedAuthResult &&
    isValidStoredAuthResult(
      storedAuthResult,
      authValidationOptions?.extraAuthFilters || [],
    )
  ) {
    return storedAuthResult;
  }

  const refreshToken = getStoredRefreshToken();
  if (refreshToken) {
    const authResult = await codeFlowRefreshAccessToken();
    if (authResult) {
      if (await isValidNewAuthResult(authResult)) {
        storeAuthResult(authResult);
        if (
          isValidStoredAuthResult(
            authResult,
            authValidationOptions?.extraAuthFilters || [],
          )
        ) {
          return authResult;
        }
      }
    }
  }

  return codeFlowAuthorizeFlow();
}

/**
 * Authorizes the user against the authentication server
 * @returns
 */
async function codeFlowAuthorizeFlow(): Promise<AuthResult> {
  ensureNoErrorInParameters();
  // Create Code Flow Authorize request parameters.
  const authorizeRequestParameters: OAuthCodeFlowAuthorizeParameters =
    createCodeFlowAuthorizeRequestParameters();

  // Send code challenge to server via client side redirect -> server returns authorization code
  return authorize(authorizeRequestParameters);
}

/**
 * Gets a authentication token from the token endpoint
 *
 * @param oAuthCodeFlowAuthorizeResponse
 * @param config
 * @returns
 */
async function codeFlowAccessTokenFlow(code: string): Promise<AuthResult> {
  const accessTokenRequestParameters =
    createCodeFlowAccessTokenRequestParameters({
      code,
    });

  return accessTokenRequest(accessTokenRequestParameters);
}
