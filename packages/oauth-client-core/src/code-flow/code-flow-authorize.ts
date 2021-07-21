import { config } from "../configuration/config.service";
import { assertProviderMetadata } from "../discovery/assert-provider-metadata";
import { state } from "../state/state";
import { GeneratorUtil } from "../utils/generatorUtil";
import { toUrlParameterString } from "../utils/urlUtil";
import { createCodeChallenge } from "./code-challenge";
import { storeAndGetNewCodeVerifier } from "./code-verifier";
import {
  OAuthCodeFlowAuthorizeParameters,
  OAuthPKCEAuthorizeParameters,
} from "./model/authorization-request.model";

export function createCodeFlowAuthorizeRequestParameters(): OAuthCodeFlowAuthorizeParameters {
  const state = GeneratorUtil.generateState();

  const oAuthCodeFlowAuthorizeParameters: OAuthCodeFlowAuthorizeParameters = {
    client_id: config.client_id,
    response_type: "code",
    state,
  };

  if (config.redirect_uri) {
    oAuthCodeFlowAuthorizeParameters.redirect_uri = config.redirect_uri;
  }
  if (config.scope) {
    oAuthCodeFlowAuthorizeParameters.scope = config.scope;
  }

  return oAuthCodeFlowAuthorizeParameters;
}

export function withPkceAuthorizeRequestParameters(
  oAuthCodeFlowAuthorizeParameters: OAuthCodeFlowAuthorizeParameters,
): OAuthPKCEAuthorizeParameters {
  // Create code verifier
  const code_verifier = storeAndGetNewCodeVerifier();
  // Encode code verifier to get code challenge
  const code_challenge = createCodeChallenge(code_verifier);

  return {
    ...oAuthCodeFlowAuthorizeParameters,
    code_challenge: code_challenge,
    code_challenge_method: "S256",
  };
}

export function codeFlowAuthorize<
  T extends {
    [key in keyof T]: any;
  },
>(urlParameters: T): void {
  assertProviderMetadata(state.providerMetadata);
  const urlParamsString = toUrlParameterString(urlParameters);
  window.location.href = `${state.providerMetadata.authorization_endpoint}?${urlParamsString}`;
}
