import { config } from "../configuration/config.service";
import { assertProviderMetadata } from "../discovery/assert-provider-metadata";
import { state } from "../state/state";
import { GeneratorUtil } from "../utils/generatorUtil";
import { toUrlParameterString } from "../utils/urlUtil";
import { createCodeChallenge } from "./code-challenge";
import { storeAndGetNewCodeVerifier } from "./code-verifier";
import {
  OAuthCodeFlowAuthorizeParameters,
} from "./model/authorization-request.model";
import { timeout } from "../utils/timeout";
import { AuthResult } from "../jwt/index";

export function createCodeFlowAuthorizeRequestParameters(): OAuthCodeFlowAuthorizeParameters {
  const state = GeneratorUtil.generateState();
  // Create code verifier
  const code_verifier = storeAndGetNewCodeVerifier();
  // Encode code verifier to get code challenge
  const code_challenge = createCodeChallenge(code_verifier);

  const oAuthCodeFlowAuthorizeParameters: OAuthCodeFlowAuthorizeParameters = {
    client_id: config.client_id,
    response_type: "code",
    state,
    code_challenge: code_challenge,
    code_challenge_method: "S256",
  };

  if (config.redirect_uri) {
    oAuthCodeFlowAuthorizeParameters.redirect_uri = config.redirect_uri;
  }
  if (config.scope) {
    oAuthCodeFlowAuthorizeParameters.scope = config.scope;
  }

  return oAuthCodeFlowAuthorizeParameters;
}


export async function codeFlowAuthorize<
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
