import {
  createClient,
  getStoredAuthResult as _getStoredAuthResult,
  OAuthClientConfig,
  getAuthHeader as _getAuthHeader,
  lazyRefresh,
  deleteStoredAuthResults,
  getCsrfResult,
  getIdTokenHint,
  getStoredCsrfToken,
  obtainSession,
  silentLogout,
  AuthResult,
  AuthResultFilter,
  cleanStorage,
} from "@ilionx/oauth-client-core";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { OAuthContext, OAuthContextInterface } from "./oauth-context";

interface OAuthProviderProps {
  children: ReactNode;
  config: OAuthClientConfig;
  filters?: AuthResultFilter[];
}
export function OAuthProvider({
  children,
  config,
  filters = [],
}: OAuthProviderProps): JSX.Element {
  const client = useMemo(
    () =>
      createClient({
        client_id: config.client_id,
        response_type: config.response_type,
        redirect_uri: config.redirect_uri,
        silent_refresh_uri: config.silent_refresh_uri,
        silent_logout_uri: config.silent_logout_uri,
        post_logout_redirect_uri: config.post_logout_redirect_uri,
        csrf_token_endpoint: config.csrf_token_endpoint,
        validate_token_endpoint: config.validate_token_endpoint,
        is_session_alive_endpoint: config.is_session_alive_endpoint,
        debug: config.debug,
        trusted_audiences: config.trusted_audiences,
        issuedAtMaxOffset: config.issuedAtMaxOffset,
        defaultAuthResultFilters: config.defaultAuthResultFilters,
        login_hint: config.login_hint,
        issuer: config.issuer,
        scope: config.scope,
      }),
    [
      config.client_id,
      config.response_type,
      config.redirect_uri,
      config.silent_refresh_uri,
      config.silent_logout_uri,
      config.post_logout_redirect_uri,
      config.csrf_token_endpoint,
      config.validate_token_endpoint,
      config.is_session_alive_endpoint,
      config.debug,
      config.trusted_audiences,
      config.issuedAtMaxOffset,
      config.defaultAuthResultFilters,
      config.login_hint,
      config.issuer,
      config.scope,
    ]
  );

  const getStoredAuthResult = useCallback(() => {
    return _getStoredAuthResult(client, filters);
  }, [client, filters]);

  const [authResult, setAuthResult] = useState<AuthResult | null>(() =>
    getStoredAuthResult()
  );
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = authResult?.access_token !== undefined;

  const getAuthHeader = useCallback((): string | null => {
    const authResult = getStoredAuthResult();
    if (authResult) {
      return _getAuthHeader(authResult);
    }
    return null;
  }, [getStoredAuthResult]);

  const silentRefresh = useCallback(async (): Promise<boolean> => {
    const token = getStoredAuthResult();
    if (token) {
      return lazyRefresh(client, token);
    }
    return false;
  }, [client, getStoredAuthResult]);

  const login = useCallback(() => {
    setIsLoading(true);
    return obtainSession(client)
      .finally(() => {
        setIsLoading(false);
      })
      .then((result) => {
        setAuthResult(result);
      });
  }, [client]);

  const providerValue = useMemo(
    (): OAuthContextInterface => ({
      isAuthenticated,
      isLoading,
      login,
      getCsrfResult: getCsrfResult.bind(null, client),
      getStoredCsrfToken: getStoredCsrfToken.bind(null, client),
      getStoredAuthResult: getStoredAuthResult.bind(null, client),
      getAuthHeader: getAuthHeader.bind(null, client),
      getIdTokenHint: getIdTokenHint.bind(null, client),
      cleanStorage: cleanStorage.bind(null, client),
      deleteStoredAuthResults: deleteStoredAuthResults.bind(null, client),
      silentLogout: silentLogout.bind(null, client),
      silentRefresh: silentRefresh.bind(null, client),
    }),
    [
      isAuthenticated,
      isLoading,
      login,
      getStoredAuthResult,
      getAuthHeader,
      silentRefresh,
      client,
    ]
  );

  return (
    <OAuthContext.Provider value={providerValue}>
      {children}
    </OAuthContext.Provider>
  );
}
