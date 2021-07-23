import { assertProviderMetadata } from "../discovery/assert-provider-metadata";
import { AuthResult } from "../jwt/model/auth-result.model";
import { state } from "../state/state";
import { LogUtil } from "../utils/logUtil";
import { timeout } from "../utils/timeout";
import { getURLParameters, toUrlParameterString } from "../utils/urlUtil";

export async function authorize<
  T extends {
    [key in keyof T]: any;
  },
>(urlParameters: T): Promise<AuthResult> {
  assertProviderMetadata(state.providerMetadata);
  const urlParamsString = toUrlParameterString(urlParameters);
  window.location.href = `${state.providerMetadata.authorization_endpoint}?${urlParamsString}`;

  // Send Authorization code and code verifier to token endpoint -> server returns access token
  await timeout(2000);
  throw Error("authorize_redirect_timeout");
}

export function ensureNoErrorInParameters(): void {
  const urlParams = getURLParameters();
  if (urlParams["error"]) {
    // Error in authorize redirect
    LogUtil.error("Redirecting to Authorisation failed");
    LogUtil.debug(`Error in authorize redirect: ${urlParams["error"]}`);
    throw Error("redirect_failed");
  }
}
