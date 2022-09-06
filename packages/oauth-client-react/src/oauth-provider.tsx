import {
  configure,
  getStoredAuthResult as _getStoredAuthResult,
  OAuthClientConfig,
  getAuthHeader as _getAuthHeader,
  lazyRefresh,
  cleanSessionStorage,
  deleteStoredAuthResults,
  getCsrfResult,
  getIdTokenHint,
  getStoredCsrfToken,
  obtainSession,
  silentLogout,
  AuthResult,
  AuthResultFilter,
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
  const getStoredAuthResult = useCallback(() => {
    return _getStoredAuthResult(filters);
  }, [filters]);

  const [authResult, setAuthResult] = useState<AuthResult | null>(() =>
    getStoredAuthResult()
  );
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = authResult?.access_token !== undefined;

  useEffect(() => {
    configure(config);
  }, [config]);

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
      return lazyRefresh(token);
    }
    return false;
  }, [getStoredAuthResult]);

  const login = useCallback(() => {
    setIsLoading(true);
    return obtainSession()
      .finally(() => {
        setIsLoading(false);
      })
      .then((result) => {
        setAuthResult(result);
      });
  }, []);

  const providerValue = useMemo(
    (): OAuthContextInterface => ({
      isAuthenticated,
      isLoading,
      login,
      getCsrfResult,
      getStoredCsrfToken,
      getStoredAuthResult,
      getAuthHeader,
      getIdTokenHint,
      cleanSessionStorage,
      deleteStoredAuthResults,
      silentLogout,
      silentRefresh,
    }),
    [
      isAuthenticated,
      isLoading,
      login,
      getStoredAuthResult,
      getAuthHeader,
      silentRefresh,
    ]
  );

  return (
    <OAuthContext.Provider value={providerValue}>
      {children}
    </OAuthContext.Provider>
  );
}
