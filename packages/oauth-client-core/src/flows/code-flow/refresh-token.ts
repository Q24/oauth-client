import { Client } from "../../client";
import { StorageUtil } from "../../utils/storage";

function createRefreshTokenStorageKey(client: Client): string {
  return `${client.config.client_id}-refresh-token`;
}

/**
 * gets the refresh token from session storage
 */
export function getStoredRefreshToken(client: Client): string | null {
  return StorageUtil.read(createRefreshTokenStorageKey(client));
}

/**
 * Saves the refresh to sessionStorage
 */
export function storeRefreshToken(client: Client, idTokenHint: string): void {
  StorageUtil.store(createRefreshTokenStorageKey(client), idTokenHint);
}

/**
 * Deletes the refresh token from sessionStorage for the current client
 */
export function deleteStoredRefreshToken(client: Client): void {
  StorageUtil.remove(createRefreshTokenStorageKey(client));
}

/**
 * Deletes the refresh tokens from sessionStorage for all clients
 */
export function deleteAllStoredRefreshTokens(): void {
  StorageUtil.remove("-refresh-token");
}
