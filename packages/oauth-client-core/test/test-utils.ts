import { createClient, OAuthClientConfig } from "../src/client";
import { constants } from "./constants";

export function createTestClient(config?: Partial<OAuthClientConfig>) {
  const client = createClient({
    client_id: constants.client_id,
    response_type: "id_token token",
    redirect_uri: "localhost",
    post_logout_redirect_uri: "post_logout_redirect_uri",
    scope: "email openid",
    issuer: "",
    ...(config ?? {}),
  });

  client.__cache.discovery = Promise.resolve({
    providerMetadata: constants.openid_configuration,
    jwks: constants.jwks,
  });

  return client;
}
