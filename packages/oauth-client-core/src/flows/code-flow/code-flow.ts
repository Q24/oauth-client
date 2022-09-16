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
import { clearQueryParameters } from "../../utils/url";
import {
  accessTokenRequest,
  createCodeFlowAccessTokenRequestParameters,
} from "./code-flow-access-token-request";
import { createCodeFlowAuthorizeRequestParameters } from "./code-flow-authorize-params";
import { codeFlowRefreshAccessToken } from "./code-flow-refresh";
import { getCodeFromUrl } from "./get-code-from-url";
import { getStoredRefreshToken } from "./refresh-token";

import type { OAuthCodeFlowAuthorizeParameters } from "./model/authorization-request.model";
import type { AuthResult } from "../../jwt/model/auth-result.model";
import type { AuthValidationOptions } from "../../jwt/model/auth-validation-options.model";
import { Client } from "../../client";

export async function codeFlow(
  client: Client,
  authValidationOptions?: AuthValidationOptions,
): Promise<AuthResult> {
  await discovery(client);

  client.logger.debug("Looking for a code in the URL");
  const code = getCodeFromUrl(client);
  if (code) {
    client.logger.debug(
      "The URL does have a code; save it in memory and clear the URL",
    );
    clearQueryParameters();

    const codeFlowAuthResult = await codeFlowAccessTokenFlow(client, code);
    client.logger.debug("Got auth result by token request", codeFlowAuthResult);

    if (codeFlowAuthResult) {
      if (await isValidNewAuthResult(client, codeFlowAuthResult)) {
        storeAuthResult(client, codeFlowAuthResult);
        if (
          isValidStoredAuthResult(
            codeFlowAuthResult,
            authValidationOptions?.extraAuthFilters || [],
          )
        ) {
          return codeFlowAuthResult;
        }
      }
    }
  } else {
    client.logger.debug("There is no code in the URL");
  }

  client.logger.debug("looking for auth result in storage");
  const storedAuthResult = getStoredAuthResult(client);
  if (
    storedAuthResult &&
    isValidStoredAuthResult(
      storedAuthResult,
      authValidationOptions?.extraAuthFilters || [],
    )
  ) {
    client.logger.debug("Found a valid auth result in storage, returning it.");

    return storedAuthResult;
  }

  client.logger.debug("There is no auth result in storage");

  client.logger.debug("Looking for a refresh token in storage");
  const refreshToken = getStoredRefreshToken(client);
  if (refreshToken) {
    const authResult = await codeFlowRefreshAccessToken(client);
    if (authResult) {
      if (await isValidNewAuthResult(client, authResult)) {
        storeAuthResult(client, authResult);
        if (
          isValidStoredAuthResult(
            authResult,
            authValidationOptions?.extraAuthFilters || [],
          )
        ) {
          return authResult;
        }
      }
    }
  } else {
    client.logger.debug("No refresh token in storage");
  }

  return codeFlowAuthorizeFlow(client);
}

/**
 * Authorizes the user against the authentication server
 */
async function codeFlowAuthorizeFlow(client: Client): Promise<AuthResult> {
  client.logger.debug("Do a authorize call");

  ensureNoErrorInParameters(client);
  // Create Code Flow Authorize request parameters.
  const authorizeRequestParameters: OAuthCodeFlowAuthorizeParameters =
    await createCodeFlowAuthorizeRequestParameters(client);

  // Send code challenge to server via client side redirect -> server returns authorization code
  return authorize(client, authorizeRequestParameters);
}

/**
 * Gets a token set from the token endpoint
 */
async function codeFlowAccessTokenFlow(
  client: Client,
  code: string,
): Promise<AuthResult> {
  client.logger.debug(
    "Getting the access token from the token endpoint with code",
    code,
  );

  const accessTokenRequestParameters =
    createCodeFlowAccessTokenRequestParameters(client, {
      code,
    });

  return accessTokenRequest(client, accessTokenRequestParameters);
}
