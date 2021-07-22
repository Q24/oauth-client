import {
  getStoredAuthResult,
  storeAuthResult,
} from "../authentication/utils/auth-result";
import { authorize } from "../common/authorize";
import { AuthResult } from "../jwt/index";
import { clearQueryParameters } from "../utils/url/clear-query-parameters";
import {
  accessTokenRequest,
  createCodeFlowAccessTokenRequestParameters,
} from "./code-flow-access-token-request";
import { createCodeFlowAuthorizeRequestParameters } from "./code-flow-authorize-params";
import { getCodeFromUrl } from "./get-code-from-url";
import { OAuthCodeFlowAuthorizeParameters } from "./model/authorization-request.model";

export async function codeFlow(): Promise<AuthResult> {
  // Get the authorization code from the URL parameters and clear parameters from URL
  const code = getCodeFromUrl();
  if (code) {
    clearQueryParameters();
    return codeFlowAccessTokenFlow(code);
  }

  const storedAuthResult = getStoredAuthResult();
  if (storedAuthResult) {
    return storedAuthResult;
  }

  // refresh

  return codeFlowAuthorizeFlow();
}

/**
 * Authorizes the user against the authentication server
 * @returns
 */
async function codeFlowAuthorizeFlow(): Promise<AuthResult> {
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
async function codeFlowAccessTokenFlow(code: string) {
  const accessTokenRequestParameters =
    createCodeFlowAccessTokenRequestParameters({
      code,
    });

  const authResult = await accessTokenRequest(accessTokenRequestParameters);

  storeAuthResult(authResult);

  return authResult;
}
