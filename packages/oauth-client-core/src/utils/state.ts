import { StorageUtil } from "./storage";
import { LogUtil } from "./log-util";
import { config } from "../configuration/config.service";

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

const stateStorageId = () => `${config.client_id}-state`;
/**
 * Get the saved discoveryState string from sessionStorage
 */
export function getState(): string | null {
  const state = StorageUtil.read(stateStorageId());
  if (!state) {
    LogUtil.debug("discoveryState was not found in storage", state);
    return null;
  }
  LogUtil.debug("Got discoveryState from storage", state);
  return state;
}

/**
 * Saves the discoveryState string to sessionStorage
 */
export function saveState(state: string): void {
  LogUtil.debug("State saved");
  StorageUtil.store(stateStorageId(), state);
}

/**
 * Deletes the discoveryState from sessionStorage
 */
export function deleteState(): void {
  LogUtil.debug(`Deleted state`);
  StorageUtil.remove("-discoveryState");
}
