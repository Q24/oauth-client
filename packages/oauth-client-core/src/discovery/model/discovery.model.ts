import { JsonWebKeySet } from "./jwks.model";
import { OpenIDProviderMetadata } from "./openid-provider-metadata.model";

export interface Discovery {
  jwks: JsonWebKeySet;
  providerMetadata: OpenIDProviderMetadata;
}