import { Client } from "../client";
import { StorageUtil } from "../utils/storage";

const createSessionIdStorageId = (client: Client) =>
  `${client.config.client_id}-session-id`;

/**
 * Get the saved session ID string from storage
 */
export function getSessionId(client: Client): string | null {
  return StorageUtil.read(createSessionIdStorageId(client));
}

/**
 * Saves the session ID to sessionStorage
 */
export function saveSessionId(client: Client,sessionId: string): void {
  StorageUtil.store(createSessionIdStorageId(client), sessionId);
}

/**
 * Deletes the session ID from sessionStorage
 */
export function deleteSessionId(): void {
  StorageUtil.remove("-session-id");
}
