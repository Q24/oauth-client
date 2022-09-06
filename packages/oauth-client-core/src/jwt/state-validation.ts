import { Client } from "../client";
import { getState } from "../utils/state";

/**
 * checks if the state is valid. If not throws.
 *
 * @param state the state from the authentication result
 * @throws `state_invalid` if state is not the same as the saved state.
 */
export function validateState(client: Client, state: string): void {
  client.logger.debug("Validating");
  const storedState = getState(client);

  // We received a token from SSO, so we need to validate the state
  if (!storedState || state !== storedState) {
    client.logger.error("Authorisation Token not valid");
    client.logger.debug("State NOT valid");
    throw Error("state_invalid");
  }

  client.logger.debug(
    "State from URL validated against state in session storage state",
    storedState,
  );
}
