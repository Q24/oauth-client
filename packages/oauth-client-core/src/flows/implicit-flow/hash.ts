import { isAuthResult } from "../../authentication/auth-result";
import { removeByRegex } from "../../utils/storage";
import { getHashParameters, parseQueryParameters } from "../../utils/url";
import { Client } from "../../client";

import type { AuthResult } from "../../jwt/model/auth-result.model";

export function getAuthResultFromUrl(client: Client): AuthResult | null {
  const authResultFromUrl = getHashParameters<Partial<AuthResult>>();

  if (!isAuthResult(authResultFromUrl)) {
    client.logger.error("");
    return null;
  }
  return authResultFromUrl;
}

export function getAuthResultFromStoredHash(client: Client): AuthResult | null {
  const hashString = getStoredHashString(client);
  if (!hashString) {
    return null;
  }
  return parseQueryParameters<AuthResult>(hashString);
}

export function getStoredHashString(client: Client): string | null {
  return client.storage.getItem("hash_fragment");
}

export function deleteStoredHashString(client: Client): void {
  removeByRegex(client.storage, "hash_fragment");
}
