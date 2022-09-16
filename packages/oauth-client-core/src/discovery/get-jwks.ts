import type { JsonWebKeySet } from "./model/jwks.model";
import { Client } from "../client";

export async function fetchJwks(
  client: Client,
  jwks_uri: string,
): Promise<JsonWebKeySet> {
  const response = await fetch(jwks_uri);
  if (!response.ok) {
    client.logger.error("Failed to fetch JWKS", response);
    throw new Error(`Failed to fetch jwks from ${jwks_uri}`);
  }
  return response.json();
}
