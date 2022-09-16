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
export async function fetchOpenIdProviderMetadata(
  client: Client,
): Promise<OpenIDProviderMetadata> {
  client.logger.debug("getting provider metadata");

  const openIdConfigurationUrl = `${client.config.issuer}/.well-known/openid-configuration`;

  const response = await fetch(openIdConfigurationUrl);
  if (!response.ok) {
    client.logger.error("Failed to fetch OpenID Provider Metadata", response);
    throw new Error(
      `Failed to fetch OpenID Provider Metadata from ${openIdConfigurationUrl}`,
    );
  }

  const providerMetadata = await response.json();
  client.logger.debug("got provider metadata", providerMetadata);
  return providerMetadata;
}
