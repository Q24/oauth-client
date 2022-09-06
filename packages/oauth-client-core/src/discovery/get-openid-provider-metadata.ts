/**
 * Once the OpenID Provider has been identified, the configuration information for
 * that OP is retrieved from a well-known location as a JSON document, including
 * its OAuth 2.0 endpoint locations.
 */
import { Client } from "../client";
import type { OpenIDProviderMetadata } from "./model/openid-provider-metadata.model";

/**
 * OpenID Providers supporting Discovery MUST make a JSON document available at
 * the path formed by concatenating the string /.well-known/openid-configuration
 * to the Issuer. The syntax and semantics of .well-known are defined in RFC
 * 5785 [RFC5785] and apply to the Issuer value when it contains no path
 * component. openid-configuration MUST point to a JSON document compliant with
 * this specification and MUST be returned using the application/json content
 * type.
 */
function fetchOpenIdProviderMetadata(
  client: Client,
): Promise<OpenIDProviderMetadata> {
  client.logger.debug("getting provider metadata");

  const openIdConfigurationUrl = `${client.config.issuer}/.well-known/openid-configuration`;

  return new Promise<OpenIDProviderMetadata>((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", openIdConfigurationUrl, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status <= 300) {
          const providerMetadata = JSON.parse(xhr.responseText);
          client.logger.debug(
            "successfully got provider metadata",
            providerMetadata,
          );

          resolve(providerMetadata);
        } else {
          client.logger.error(
            "could not get provider metadata",
            xhr.statusText,
          );
          reject(xhr.statusText);
        }
      }
    };
    xhr.send();
  });
}

/**
 * sets the local provider metadata to the remote provider metadata.
 *
 * @returns the metadata
 */
export async function getRemoteOpenIdProviderMetadata(
  client: Client,
): Promise<OpenIDProviderMetadata> {
  const providerMetadata = await fetchOpenIdProviderMetadata(client);
  client.providerMetadata = providerMetadata;
  return providerMetadata;
}

/**
 * tries to get the local metadata; if not found, get the remote metadata.
 *
 * @returns the metadata
 */
export async function getOpenIdProviderMetadata(
  client: Client,
): Promise<OpenIDProviderMetadata> {
  if (client.providerMetadata) {
    return client.providerMetadata;
  }
  return getRemoteOpenIdProviderMetadata(client);
}
