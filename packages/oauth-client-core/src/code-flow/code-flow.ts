import { getStoredAuthResult, storeAuthResult } from "../authentication/utils/auth-result";
import { AuthResult } from "../jwt/index";
import { timeout } from "../utils/timeout";
import { clearQueryParameters } from "../utils/url/clear-query-parameters";
import {
  accessTokenRequest,
  createCodeFlowAcccessTokenRequestParameters,
  withPkceAccessTokenRequestParameters,
} from "./code-flow-access-token-request";
import {
  codeFlowAuthorize,
  createCodeFlowAuthorizeRequestParameters,
  withPkceAuthorizeRequestParameters,
} from "./code-flow-authorize";
import { getValidCodeFromUrlAndCleanUrl } from "./find-and-clean-code-url";
import {
  OAuthCodeFlowAccessTokenParameters,
  OAuthCodeFlowPKCEAccessTokenParameters,
} from "./model/access-token-request.model";
import {
  OAuthCodeFlowAuthorizeParameters,
  OAuthPKCEAuthorizeParameters,
} from "./model/authorization-request.model";

export interface CodeFlowConfig {
  pkce: boolean;
}

export async function codeFlow(config: CodeFlowConfig): Promise<AuthResult> {
  // Get the authorization code from the URL parameters and clear parameters from URL
  const code = getValidCodeFromUrlAndCleanUrl();
  if (code) {
    return codeFlowAccessTokenFlow(code, config);
  }

  const storedAuthResult = getStoredAuthResult();
  if(storedAuthResult) {
    return storedAuthResult;
  }

  codeFlowAuthorizeFlow(config);

  // Send Authorization code and code verifier to token endpoint -> server returns access token
  await timeout(2000);
  throw Error("authorize_redirect_timeout");
}

/**
 * Authorizes the user against the authentication server
 * @param config
 * @returns
 */
function codeFlowAuthorizeFlow(config: CodeFlowConfig) {
  // Create Code Flow Authorize request parameters.
  let authorizeRequestParameters:
    | OAuthPKCEAuthorizeParameters
    | OAuthCodeFlowAuthorizeParameters =
    createCodeFlowAuthorizeRequestParameters();

  // Optionally, add PKCE request parameters to code flow.
  if (config.pkce) {
    authorizeRequestParameters = withPkceAuthorizeRequestParameters(
      authorizeRequestParameters,
    );
  }
  // Send code challenge to server via client side redirect -> server returns authorization code
  codeFlowAuthorize(authorizeRequestParameters);
}

/**
 * Gets a authentication token from the token endpoint
 *
 * @param oAuthCodeFlowAuthorizeResponse
 * @param config
 * @returns
 */
async function codeFlowAccessTokenFlow(code: string, config: CodeFlowConfig) {
  let accessTokenRequestParameters:
    | OAuthCodeFlowAccessTokenParameters
    | OAuthCodeFlowPKCEAccessTokenParameters = createCodeFlowAcccessTokenRequestParameters(
    {
      code,
    },
  );

  // Optionally, add PKCE request parameters to code flow.
  if (config.pkce) {
    accessTokenRequestParameters = withPkceAccessTokenRequestParameters(
      accessTokenRequestParameters,
    );
  }

  const authResult = await accessTokenRequest(accessTokenRequestParameters);

  storeAuthResult(authResult);

  return authResult;
}
