import { JsonWebKeySet } from "./model/jwks.model";
import { OpenIDProviderMetadata } from "./model/openid-provider-metadata.model";

interface DiscoveryState {
  jwks?: JsonWebKeySet;
  providerMetadata?: OpenIDProviderMetadata;
}

export const discoveryState: DiscoveryState = {};
