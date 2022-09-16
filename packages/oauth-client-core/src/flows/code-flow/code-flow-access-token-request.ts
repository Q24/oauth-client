import { cleanCode, toUrlParameterString } from "../../utils/url";
import { getStoredCodeVerifier } from "./code-verifier";

import type { AuthResult } from "../../jwt/model/auth-result.model";
import type { OAuthCodeFlowAccessTokenParameters } from "./model/access-token-request.model";
import type { OAuthRefreshTokenParameters } from "./model/refresh-token-request.model";
import { Client } from "../../client";
import { discovery } from "../../discovery/discovery";

interface CreateCodeFlowAcccessTokenRequestParametersConfig {
  code: string;
}

export function createCodeFlowAccessTokenRequestParameters(
  client: Client,
  { code }: CreateCodeFlowAcccessTokenRequestParametersConfig,
): OAuthCodeFlowAccessTokenParameters {
  const code_verifier = getStoredCodeVerifier();
  if (!code_verifier) {
    throw new Error("code_verifier not found");
  }
  return {
    client_id: client.config.client_id,
    code,
    grant_type: "authorization_code",
    redirect_uri: cleanCode(client, client.config.redirect_uri),
    code_verifier,
  };
}

export async function accessTokenRequest(
  client: Client,
  requestParameters:
    | OAuthCodeFlowAccessTokenParameters
    | OAuthRefreshTokenParameters,
): Promise<AuthResult> {
  const { providerMetadata } = await discovery(client);

  client.logger.debug(
    "getting the access token from the token endpoint with parameters:",
    requestParameters,
  );

  const urlParamsString = toUrlParameterString(requestParameters);

  const response = await fetch(`${providerMetadata.token_endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: urlParamsString,
  });

  if (!response.ok) {
    client.logger.error("Failed to fetch access token", response);
    throw new Error("Failed to fetch access token");
  }

  const json = await response.json();

  client.logger.debug("access token response", json);
  return json;
}
