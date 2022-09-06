import {
  getStoredAuthResult,
  storeAuthResult,
} from "../../authentication/auth-result";
import {
  authorize,
  ensureNoErrorInParameters,
} from "../../authentication/authorize";
import { discovery } from "../../discovery/discovery";
import {
  isValidNewAuthResult,
  isValidStoredAuthResult,
} from "../../jwt/validate-auth-result";
import { cleanSessionStorage } from "../../utils/clean-session-storage";
import { transformScopesStringToArray } from "../../utils/scope";
import { clearQueryParameters } from "../../utils/url";
import {
  deleteStoredHashString,
  getAuthResultFromStoredHash,
  getAuthResultFromUrl,
} from "./hash";
import { createImplicitFlowAuthorizeRequestParameters } from "./implicit-flow-authorize-params";
import { silentRefresh } from "./implicit-flow-refresh";
import { getSessionUpgradeToken, sessionUpgrade } from "./session-upgrade";

import type { AuthValidationOptions } from "../../jwt/model/auth-validation-options.model";
import type { AuthResult } from "../../jwt/model/auth-result.model";
import { Client } from "../../client";

/**
 * If possible, do a session upgrade.
 *
 * Otherwise, if possible, return the auth result from:
 * 1. Hash of URL
 * 1. Hash in session storage (can be saved and cleared by other script)
 * 1. Session storage
 * 1. Silent refresh
 *
 * If there is no Auth Result to be found in all of these places, do a redirect
 * to the authorization server, so that a future call to this function may get
 * the Auth Results from the URL that was redirected to by the authentication
 * server.
 *
 * @param authValidationOptions the scope for the silent refresh and the extra
 * result filters
 * @throws It will reject (as well as redirect) in case the check did not pass.
 */
export async function implicitFlow(
  client: Client,
  authValidationOptions?: AuthValidationOptions,
): Promise<AuthResult> {
  await discovery(client);

  const sessionUpgradeToken = getSessionUpgradeToken();
  if (sessionUpgradeToken) {
    return sessionUpgrade(client, sessionUpgradeToken);
  }

  // 1. Get the auth result from the URL parameters and clear parameters from URL
  const authResultFromUrl = getAuthResultFromUrl(client);
  if (authResultFromUrl) {
    if (await isValidNewAuthResult(client, authResultFromUrl)) {
      storeAuthResult(client, authResultFromUrl);
      clearQueryParameters();
      if (
        isValidStoredAuthResult(
          authResultFromUrl,
          authValidationOptions?.extraAuthFilters || [],
        )
      ) {
        return authResultFromUrl;
      }
    }
  }

  // 2. Get the auth result from the hash previously stored in session storage,
  //    and clear it afterwards.
  const authResultFromStoredHash = getAuthResultFromStoredHash();
  if (authResultFromStoredHash) {
    if (await isValidNewAuthResult(client, authResultFromStoredHash)) {
      storeAuthResult(client, authResultFromStoredHash);
      deleteStoredHashString();
      if (
        isValidStoredAuthResult(
          authResultFromStoredHash,
          authValidationOptions?.extraAuthFilters || [],
        )
      ) {
        return authResultFromStoredHash;
      }
    }
  }

  // 3. Get the auth result from the session storage
  const storedAuthResult = getStoredAuthResult(client);
  if (
    storedAuthResult &&
    isValidStoredAuthResult(
      storedAuthResult,
      authValidationOptions?.extraAuthFilters || [],
    )
  ) {
    // As the stored result is already validated upon storing, there is no need
    // to validate it as new result.
    return storedAuthResult;
  }

  // 4. get the auth result from a silent refresh
  const authResultFromSilentRefresh = await silentRefresh(
    client,
    authValidationOptions,
  ).catch(() => null);
  if (authResultFromSilentRefresh) {
    if (await isValidNewAuthResult(client, authResultFromSilentRefresh)) {
      storeAuthResult(client, authResultFromSilentRefresh);
      if (
        isValidStoredAuthResult(
          authResultFromSilentRefresh,
          authValidationOptions?.extraAuthFilters || [],
        )
      ) {
        return authResultFromSilentRefresh;
      }
    }
  }

  // There is no auth result; try to get one for the next time we call this
  // function, by redirecting to the authorize endpoint.
  return implicitFlowAuthorizeFlow(client);
}

/**
 * HTTP Redirect to the Authorisation.
 *
 * This redirects (with authorize params) to the Authorisation.
 * The Authorisation checks if there is a valid session. If so, it returns with token hash.
 * If not authenticated, it will redirect to the login page.
 */
async function implicitFlowAuthorizeFlow(client: Client): Promise<AuthResult> {
  ensureNoErrorInParameters(client);

  cleanSessionStorage(client);

  const scopes = transformScopesStringToArray(client.config.scope);
  const authorizeParams = createImplicitFlowAuthorizeRequestParameters(
    client,
    scopes,
  );

  // All clear ->
  // Do the authorize redirect
  client.logger.debug(
    "Do authorisation redirect to SSO with options:",
    authorizeParams,
  );

  return authorize(client, authorizeParams);
}
