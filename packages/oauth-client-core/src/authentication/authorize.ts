import { assertProviderMetadata } from "../discovery/assert-provider-metadata";
import { timeout } from "../utils/timeout";
import { getURLParameters, toUrlParameterString } from "../utils/url";
import { Client } from "../client";

import type { AuthResult } from "../jwt/model/auth-result.model";

export async function authorize<
  T extends {
    [key in keyof T]: any;
  },
>(client: Client, urlParameters: T): Promise<AuthResult> {
  assertProviderMetadata(client.providerMetadata);
  const urlParamsString = toUrlParameterString(urlParameters);
  window.location.href = `${client.providerMetadata.authorization_endpoint}?${urlParamsString}`;

  // Send Authorization code and code verifier to token endpoint -> server returns access token
  await timeout(20000);
  throw Error("authorize_redirect_timeout");
}

export function ensureNoErrorInParameters(client: Client): void {
  const urlParams = getURLParameters();
  if (urlParams.error) {
    // Error in authorize redirect
    client.logger.error("Redirecting to Authorisation failed");
    client.logger.debug(`Error in authorize redirect: ${urlParams.error}`);
    throw Error("redirect_failed");
  }
}
