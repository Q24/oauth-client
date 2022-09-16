import {
  getCsrfResult,
  getStoredCsrfToken,
  getStoredAuthResult,
  getIdTokenHint,
  cleanStorage,
  deleteStoredAuthResults,
  silentLogout,
  AuthResultFilter,
  AuthResult,
  CsrfResult,
  SilentLogoutConfig,
} from "@ilionx/oauth-client-core";
import { createContext } from "react";

export interface OAuthContextInterface {
  isLoading: boolean;
  isAuthenticated: boolean;

  login: () => void;

  getCsrfResult: () => Promise<CsrfResult>;
  getStoredCsrfToken: () => string | null;
  getStoredAuthResult: (
    extraAuthResultFilters?: AuthResultFilter[]
  ) => AuthResult | null;
  getAuthHeader: () => string | null;
  getIdTokenHint: (
    options?:
      | {
          regex: boolean;
        }
      | undefined
  ) => string | null;
  cleanStorage: () => void;
  deleteStoredAuthResults: (
    authResultFilter?: (authResult: Readonly<AuthResult>) => boolean
  ) => void;
  silentLogout: (silentLogoutConfig?: SilentLogoutConfig) => Promise<void>;
  silentRefresh: () => Promise<boolean>;
}

export const OAuthContext = createContext<OAuthContextInterface | null>(null);
