import { Client } from "../../client";
import { generateNonce, getNonce, saveNonce } from "../../utils/nonce";
import { generateState, getState, saveState } from "../../utils/state";

import type { OpenIdImplicitAuthorizationParameters } from "./model/implicit-request-parameters.model";

/**
 * Gather the URL params for Authorize redirect method
 *
 * @param scopes the scopes to authorise for.
 * @param promptNone If true, the user will not be asked to
 * authorise this app. If no authentication is required,
 * the user will not be asked with any configuration.
 * @returns the parameters to use for an authorise request
 */
export function createImplicitFlowAuthorizeRequestParameters(
  client: Client,
  scopes: string[],
  promptNone = false,
): OpenIdImplicitAuthorizationParameters {
  const storedState = getState(client) ?? generateState();
  const authorizeParams: OpenIdImplicitAuthorizationParameters = {
    nonce: getNonce(client) ?? generateNonce(),
    state: storedState,
    client_id: client.config.client_id,
    response_type: client.config
      .response_type as OpenIdImplicitAuthorizationParameters["response_type"],
    redirect_uri:
      promptNone && client.config.silent_refresh_uri
        ? client.config.silent_refresh_uri
        : client.config.redirect_uri,
    scope: scopes.join(" "),
  };

  if (client.config.login_hint) {
    authorizeParams.login_hint = client.config.login_hint;
  }

  if (promptNone) {
    authorizeParams.prompt = "none";
  }

  // Save the generated discoveryState & nonce
  saveState(client, storedState);
  saveNonce(client, authorizeParams.nonce);

  client.logger.debug("Gather the Authorize Params", authorizeParams);
  return authorizeParams;
}
