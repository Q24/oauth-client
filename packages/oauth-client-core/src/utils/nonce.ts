import { Client } from "../client";
import { StorageUtil } from "./storage";

/**
 * Generates a random 'nonce' string
 * @returns {string}
 */
export function generateNonce(): string {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < 25; ) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
    i += 1;
  }
  return text;
}

const nonceStorageId = (client: Client) => `${client.config.client_id}-nonce`;

/**
 * Get the saved nonce string from storage
 * @returns {string}
 */
export function getNonce(client: Client): string | null {
  return StorageUtil.read(nonceStorageId(client));
}

/**
 * Saves the discoveryState string to sessionStorage
 * @param nonce
 */
export function saveNonce(client: Client, nonce: string): void {
  StorageUtil.store(nonceStorageId(client), nonce);
}

/**
 * Deletes the nonce from sessionStorage
 */
export function deleteNonce(): void {
  StorageUtil.remove("-nonce");
}
