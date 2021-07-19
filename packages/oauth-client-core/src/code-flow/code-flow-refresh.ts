import { getStoredAuthResult } from "../authentication/index";
import { AuthResult } from "../jwt/index";
import { accessTokenRequest } from "./code-flow-access-token-request";
import { OAuthRefreshTokenParameters } from "./model/refresh-token-request.model";

export function createCodeFlowRefreshRequestParameters(): OAuthRefreshTokenParameters {
  const authResult = getStoredAuthResult();
  if (!authResult?.refresh_token) {
    throw Error("no refresh token");
  }

  const oAuthCodeFlowRefreshParameters: OAuthRefreshTokenParameters = {
    grant_type: "refresh_token",
    refresh_token: authResult.refresh_token,
  };

  return oAuthCodeFlowRefreshParameters;
}

export function codeFlowRefreshAccessToken(): Promise<AuthResult> {
  const requestParameters = createCodeFlowRefreshRequestParameters();
  return accessTokenRequest(requestParameters);
}
