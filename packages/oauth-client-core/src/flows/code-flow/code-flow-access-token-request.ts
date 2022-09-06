import { cleanCode, toUrlParameterString } from "../../utils/url";
import { getStoredCodeVerifier } from "./code-verifier";

import type { AuthResult } from "../../jwt/model/auth-result.model";
import type { OAuthCodeFlowAccessTokenParameters } from "./model/access-token-request.model";
import type { OAuthRefreshTokenParameters } from "./model/refresh-token-request.model";
import { Client } from "../../client";

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
  client.logger.debug(
    "getting the access token from the token endpoint with parameters:",
    requestParameters,
  );

  const urlParamsString = toUrlParameterString(requestParameters);

  return new Promise<AuthResult>((resolve, reject) => {
    if (!client.providerMetadata?.token_endpoint) {
      reject("no token endpoint found");
      return;
    }
    const xhr = new XMLHttpRequest();

    xhr.open("POST", client.providerMetadata.token_endpoint, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          const csrfResult = JSON.parse(xhr.responseText) as AuthResult;
          resolve(csrfResult);
        } else {
          reject(xhr.statusText);
        }
      }
    };
    xhr.send(urlParamsString);
  });
}
