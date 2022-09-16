import { Client } from "../../client";
import { removeByRegex } from "../../utils/storage";

function createRefreshTokenStorageKey(client: Client): string {
  return `${client.config.client_id}-refresh-token`;
}

/**
 * gets the refresh token from session storage
 */
export function getStoredRefreshToken(client: Client): string | null {
  return client.storage.getItem(createRefreshTokenStorageKey(client));
}

/**
 * Saves the refresh to sessionStorage
 */
export function storeRefreshToken(client: Client, idTokenHint: string): void {
  client.storage.setItem(createRefreshTokenStorageKey(client), idTokenHint);
}

/**
 * Deletes the refresh token from sessionStorage for the current client
 */
export function deleteStoredRefreshToken(client: Client): void {
  removeByRegex(client.storage, createRefreshTokenStorageKey(client));
}

/**
 * Deletes the refresh tokens from sessionStorage for all clients
 */
export function deleteAllStoredRefreshTokens(client: Client): void {
  removeByRegex(client.storage, "-refresh-token");
}
