import { Client } from "../../client";
import { usesOpenId } from "../../open-id/uses-openid";
import { generateNonce, saveNonce } from "../../utils/nonce";
import { generateState, saveState } from "../../utils/state";
import { createCodeChallenge } from "./code-challenge";
import { storeAndGetNewCodeVerifier } from "./code-verifier";

import type { OAuthCodeFlowAuthorizeParameters } from "./model/authorization-request.model";

export async function createCodeFlowAuthorizeRequestParameters(
  client: Client,
): Promise<OAuthCodeFlowAuthorizeParameters> {
  const state = generateState();
  saveState(client, state);

  // Create code verifier
  const code_verifier = await storeAndGetNewCodeVerifier();
  // Encode code verifier to get code challenge
  const code_challenge = await createCodeChallenge(code_verifier);

  const oAuthCodeFlowAuthorizeParameters: OAuthCodeFlowAuthorizeParameters = {
    client_id: client.config.client_id,
    response_type: "code",
    state,
    code_challenge,
    code_challenge_method: "S256",
  };

  if (usesOpenId(client)) {
    const nonce = generateNonce();
    saveNonce(client, nonce);
    oAuthCodeFlowAuthorizeParameters.nonce = nonce;
  }

  if (client.config.redirect_uri) {
    oAuthCodeFlowAuthorizeParameters.redirect_uri = client.config.redirect_uri;
  }
  if (client.config.scope) {
    oAuthCodeFlowAuthorizeParameters.scope = client.config.scope;
  }

  return oAuthCodeFlowAuthorizeParameters;
}
