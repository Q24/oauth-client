import { Client } from "../client";
import { getJwks } from "./get-jwks";
import { getOpenIdProviderMetadata } from "./get-openid-provider-metadata";

/**
 * A singleton promise used for initialization.
 */
let discoveryPromise: Promise<void> | null = null;

async function _discovery(client: Client) {
  await getOpenIdProviderMetadata(client);
  await getJwks(client);
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
export async function discovery(client: Client): Promise<void> {
  if (discoveryPromise) {
    return discoveryPromise;
  }
  discoveryPromise = _discovery(client).catch((reason) => {
    discoveryPromise = null;
    client.logger.error("Discovery failed", reason);
    throw Error(reason);
  });
  return discoveryPromise;
}
