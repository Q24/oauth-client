import type { JsonWebKeySet } from "./model/jwks.model";
import { assertProviderMetadata } from "./assert-provider-metadata";
import { getOpenIdProviderMetadata } from "./get-openid-provider-metadata";
import { Client } from "../client";

function fetchJwks(client: Client): Promise<JsonWebKeySet> {
  return new Promise<JsonWebKeySet>((resolve, reject) => {
    client.logger.debug("getting jwks");
    const xhr = new XMLHttpRequest();

    assertProviderMetadata(client.providerMetadata);

    xhr.open("GET", client.providerMetadata.jwks_uri, true);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status <= 300) {
          const jwks = JSON.parse(xhr.responseText);
          client.logger.debug("successfully got jwks", jwks);
          resolve(jwks);
        } else {
          client.logger.error("could not get jwks", xhr.statusText);
          reject(xhr.statusText);
        }
      }
    };
    xhr.send();
  });
}

/**
 * Gets the remote JsonWebKeySet; Sets the local JsonWebKeySet
 *
 * @returns the JsonWebKeySet
 */
export async function getRemoteJwks(client: Client): Promise<JsonWebKeySet> {
  const providerMetadata = await getOpenIdProviderMetadata(client);
  if (!providerMetadata.jwks_uri) {
    client.logger.error(
      "No JWKS URI found in OpenID Provider Metadata",
      providerMetadata,
    );
    throw Error("no_jwks_uri");
  }
  const jwks = await fetchJwks(client);
  client.jwks = jwks;

  return jwks;
}

/**
 * tries to get the local jwks; if not found, get the remote jwks.
 *
 * @returns the jwks
 */
export async function getJwks(client: Client): Promise<JsonWebKeySet> {
  if (client.jwks) {
    return client.jwks;
  }
  return getRemoteJwks(client);
}
