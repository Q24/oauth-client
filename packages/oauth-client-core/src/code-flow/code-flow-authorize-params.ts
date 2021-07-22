import { config } from "../configuration/config.service";
import { GeneratorUtil } from "../utils/generatorUtil";
import { createCodeChallenge } from "./code-challenge";
import { storeAndGetNewCodeVerifier } from "./code-verifier";
import { OAuthCodeFlowAuthorizeParameters } from "./model/authorization-request.model";

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
