import { Client } from "../client";
import { getState } from "../utils/state";

/**
 * checks if the state is valid. If not throws.
 *
 * @param state the state from the authentication result
 * @throws `state_invalid` if state is not the same as the saved state.
 */
export function validateState(client: Client, state: string): void {
  client.logger.debug("Validating state");
  const storedState = getState(client);

  if (!storedState) {
    client.logger.error("state was not found in storage");
    throw new Error("state_invalid");
  }

  if (state !== storedState) {
    client.logger.error("state does not match");
    throw new Error("state_invalid");
  }

  client.logger.debug(
    "State from URL validated against state in session storage state",
    storedState,
  );
}
