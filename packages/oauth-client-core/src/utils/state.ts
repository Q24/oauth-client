import { Client } from "../client";
import { removeByRegex } from "./storage";

/**
 * Generates a random 'discoveryState' string
 * @returns {string}
 */
export function generateState(): string {
  let text = "";
  const possible = "0123456789";

  for (let i = 0; i < 5; ) {
    for (let j = 0; j < 3; ) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
      j += 1;
    }
    text += "-";
    for (let k = 0; k < 3; ) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
      k += 1;
    }
    i += 1;
  }
  return text;
}

const stateStorageId = (client: Client) => `${client.config.client_id}-state`;
/**
 * Get the saved state string from sessionStorage
 */
export function getState(client: Client): string | null {
  const state = client.storage.getItem(stateStorageId(client));
  if (!state) {
    client.logger.debug("state was not found in storage", state);
    return null;
  }
  client.logger.debug("Got state from storage", state);
  return state;
}

/**
 * Saves the state string to sessionStorage
 */
export function saveState(client: Client, state: string): void {
  client.logger.debug("State saved");
  client.storage.setItem(stateStorageId(client), state);
}

/**
 * Deletes the discoveryState from sessionStorage
 */
export function deleteState(client: Client): void {
  client.logger.debug(`Deleted state`);
  removeByRegex(client.storage, "-discoveryState");
}
