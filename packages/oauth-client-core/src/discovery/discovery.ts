import { Client } from "../client";
import { fetchJwks } from "./get-jwks";
import { fetchOpenIdProviderMetadata } from "./get-openid-provider-metadata";
import { Discovery } from "./model/discovery.model";

async function _discovery(client: Client): Promise<Discovery> {
  const providerMetadata = await fetchOpenIdProviderMetadata(client);
  const jwks = await fetchJwks(client, providerMetadata.jwks_uri);
  return { providerMetadata, jwks };
}

/**
 * Used for obtaining OpenID Provider configuration information. The discovery
 * will only be done once. Further calls to the discovery endpoint will result
 * in a singleton promise being returned.
 *
 * Discovery will automatically be done by the checkSession method.
 *
 * @returns A promise which will resolve when the discovery is complete
 */
export async function discovery(client: Client): Promise<Discovery> {
  if (!client.__cache.discovery) {
    try {
      client.__cache.discovery = _discovery(client);
    } catch (reason) {
      client.logger.error("Discovery failed", reason);
      client.__cache.discovery = null;
      throw reason;
    }
  }
  return client.__cache.discovery;
}
