import { timeout } from "../utils/timeout";
import { getURLParameters, toUrlParameterString } from "../utils/url";
import { Client } from "../client";

import type { AuthResult } from "../jwt/model/auth-result.model";
import { discovery } from "../discovery/discovery";

export async function authorize<
  T extends {
    [key in keyof T]: any;
  },
>(client: Client, urlParameters: T): Promise<AuthResult> {
  const { providerMetadata } = await discovery(client);

  const urlParamsString = toUrlParameterString(urlParameters);
  window.location.href = `${providerMetadata.authorization_endpoint}?${urlParamsString}`;

  // Send Authorization code and code verifier to token endpoint -> server returns access token
  await timeout(20_000);
  throw Error("authorize_redirect_timeout");
}

export function ensureNoErrorInParameters(client: Client): void {
  const urlParams = getURLParameters();
  if (urlParams.error) {
    // Error in authorize redirect
    client.logger.error("Redirecting to Authorization failed");
    client.logger.debug(`Error in authorize redirect: ${urlParams.error}`);
    throw Error("redirect_failed");
  }
}
