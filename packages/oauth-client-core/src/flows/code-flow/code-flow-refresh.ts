import { accessTokenRequest } from "./code-flow-access-token-request";
import {
  deleteStoredRefreshToken,
  getStoredRefreshToken,
} from "./refresh-token";

import type { OAuthRefreshTokenParameters } from "./model/refresh-token-request.model";
import type { AuthResult } from "../../jwt/model/auth-result.model";
import { Client } from "../../client";
/**
 * @returns the refresh parameters for the token endpoint
 */
export function createCodeFlowRefreshRequestParameters(
  client: Client,
): OAuthRefreshTokenParameters {
  const refreshToken = getStoredRefreshToken(client);
  if (!refreshToken) {
    throw Error("no refresh token");
  }

  const oAuthCodeFlowRefreshParameters: OAuthRefreshTokenParameters = {
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  };

  return oAuthCodeFlowRefreshParameters;
}

/**
 * Gets a new auth result by means of a refresh request to the tokens endpoint.
 *
 * @returns An Auth result, if the refresh was successful, otherwise null
 */
export async function codeFlowRefreshAccessToken(
  client: Client,
): Promise<AuthResult | null> {
  const requestParameters = createCodeFlowRefreshRequestParameters(client);
  try {
    return accessTokenRequest(client, requestParameters);
  } catch (e) {
    client.logger.error("Could not successfully refresh the access token", e);
    return null;
  } finally {
    deleteStoredRefreshToken(client);
  }
}
