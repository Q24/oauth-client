import { LogUtil } from "../utils/log-util";
import { getState } from "../utils/state";

/**
 * checks if the discoveryState is valid. If not throws.
 *
 * @param state the discoveryState from the authentication result
 * @throws `state_invalid` if discoveryState is not the same as the saved discoveryState.
 */
export function validateState(state: string): void {
  LogUtil.debug("Validating discoveryState");
  const storedState = getState();

  // We received a token from SSO, so we need to validate the discoveryState
  if (!storedState || state !== storedState) {
    LogUtil.error("Authorisation Token not valid");
    LogUtil.debug("State NOT valid");
    throw Error("state_invalid");
  }

  LogUtil.debug(
    "State from URL validated against discoveryState in session storage discoveryState",
    storedState,
  );
}
