import { createImplicitFlowAuthorizeRequestParameters } from "./implicit-flow-authorize-params";
import {AuthValidationOptions} from '../../jwt/model/auth-validation-options.model';
import {AuthResult} from '../../jwt/model/auth-result.model';
import {discovery} from '../../discovery/discovery';
import {transformScopesStringToArray} from '../../utils/scope';
import {config} from '../../configuration/config.service';
import {LogUtil} from '../../utils/log-util';
import {assertProviderMetadata} from '../../discovery/assert-provider-metadata';
import {discoveryState} from '../../discovery/discovery-state';
import {hashFragmentToAuthResult, toUrlParameterString} from '../../utils/url';
import {loadIframeUrl} from '../../utils/iframe';
import {isValidNewAuthResult, isValidStoredAuthResult} from '../../jwt/validate-auth-result';
import {storeAuthResult} from '../../authentication/auth-result';

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
  authValidationOptions?: AuthValidationOptions,
): Promise<AuthResult> {
  await discovery();

  const scopes: string[] =
    authValidationOptions?.scopes ?? transformScopesStringToArray(config.scope);
  LogUtil.debug("Silent refresh started");

  assertProviderMetadata(discoveryState.providerMetadata);
  const promptNone = true;

  const authorizeParams = createImplicitFlowAuthorizeRequestParameters(
    scopes,
    promptNone,
  );

  const urlToLoad = `${
    discoveryState.providerMetadata.authorization_endpoint
  }?${toUrlParameterString(authorizeParams)}`;

  const loadedUrl = await loadIframeUrl(urlToLoad);
  const hashAuthResult = hashFragmentToAuthResult(loadedUrl.split("#")[1]);

  LogUtil.debug(
    "Access Token found in silent refresh return URL, validating it",
  );

  const isValid = await isValidNewAuthResult(hashAuthResult);

  if (isValid) {
    storeAuthResult(hashAuthResult);

    if (
      isValidStoredAuthResult(
        hashAuthResult,
        authValidationOptions?.extraAuthFilters || [],
      )
    ) {
      return hashAuthResult;
    } else {
      throw Error("invalid_token");
    }
  }
  throw Error("invalid_token");
}