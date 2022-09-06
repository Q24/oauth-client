import {
  isAuthResult,
  storeAuthResult,
} from "../../authentication/auth-result";

import { assertProviderMetadata } from "../../discovery/assert-provider-metadata";
import { discovery } from "../../discovery/discovery";
import {
  isValidNewAuthResult,
  isValidStoredAuthResult,
} from "../../jwt/validate-auth-result";
import { loadIframeUrl } from "../../utils/iframe";

import { transformScopesStringToArray } from "../../utils/scope";
import { parseQueryParameters, toUrlParameterString } from "../../utils/url";
import { createImplicitFlowAuthorizeRequestParameters } from "./implicit-flow-authorize-params";

import type { AuthValidationOptions } from "../../jwt/model/auth-validation-options.model";
import type { AuthResult } from "../../jwt/model/auth-result.model";
import { Client } from "../../client";

/**
 * Silently refresh an access token via iFrame.
 *
 * Concurrent requests to this function will resolve to a
 * singleton Promise.
 *
 * Creates an invisible iframe that navigates to the
 * `authorize_endpoint` to get a new token there. Extracts
 * the token from the iframe URL and returns it.
 *
 * If this function fails for any reason, the Promise will reject.
 *
 * @returns A valid token
 */
export async function silentRefresh(
  client: Client,
  authValidationOptions?: AuthValidationOptions,
): Promise<AuthResult> {
  await discovery(client);

  const scopes: string[] =
    authValidationOptions?.scopes ??
    transformScopesStringToArray(client.config.scope);
  client.logger.debug("Silent refresh started");

  assertProviderMetadata(client.providerMetadata);
  const promptNone = true;

  const authorizeParams = createImplicitFlowAuthorizeRequestParameters(
    client,
    scopes,
    promptNone,
  );

  const urlToLoad = `${
    client.providerMetadata.authorization_endpoint
  }?${toUrlParameterString(authorizeParams)}`;

  const loadedUrl = await loadIframeUrl(urlToLoad);
  const potentialHashAuthResult = parseQueryParameters<Partial<AuthResult>>(
    loadedUrl.split("#")[1],
  );
  if (!isAuthResult(potentialHashAuthResult)) {
    throw Error("Hash fragment is no auth result");
  }

  client.logger.debug(
    "Access Token found in silent refresh return URL, validating it",
  );

  const isValid = await isValidNewAuthResult(client, potentialHashAuthResult);

  if (isValid) {
    storeAuthResult(client, potentialHashAuthResult);

    if (
      isValidStoredAuthResult(
        potentialHashAuthResult,
        authValidationOptions?.extraAuthFilters || [],
      )
    ) {
      return potentialHashAuthResult;
    }
    throw Error("invalid_token");
  }
  throw Error("invalid_token");
}
