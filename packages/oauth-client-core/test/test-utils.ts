import { createClient, OAuthClientConfig } from "../src/client";
import { constants } from "./constants";

export function createTestClient(config?: Partial<OAuthClientConfig>) {
  const client = createClient({
    client_id: constants.client_id,
    response_type: "id_token token",
    redirect_uri: "localhost",
    post_logout_redirect_uri: "post_logout_redirect_uri",
    scope: "email openid",
    csrf_token_endpoint: "csrf_token_endpoint",
    validate_token_endpoint: "validate_token_endpoint",
    is_session_alive_endpoint: "is_session_alive_endpoint",
    issuer: "",
    ...(config ?? {}),
  });

  client.jwks = constants.jwks;
  client.providerMetadata = constants.openid_configuration;

  return client;
}
