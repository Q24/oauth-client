import {
  getCsrfResult,
  getStoredCsrfToken,
  getStoredAuthResult,
  getIdTokenHint,
  cleanSessionStorage,
  deleteStoredAuthResults,
  silentLogout,
} from "@ilionx/oauth-client-core";
import { createContext } from "react";

export interface OAuthContextInterface {
  isLoading: boolean;
  isAuthenticated: boolean;

  login: () => void;

  getCsrfResult: typeof getCsrfResult;
  getStoredCsrfToken: typeof getStoredCsrfToken;
  getStoredAuthResult: typeof getStoredAuthResult;
  getAuthHeader: () => string | null;
  getIdTokenHint: typeof getIdTokenHint;
  cleanSessionStorage: typeof cleanSessionStorage;
  deleteStoredAuthResults: typeof deleteStoredAuthResults;
  silentLogout: typeof silentLogout;
  silentRefresh: () => Promise<boolean>;
}

export const OAuthContext = createContext<OAuthContextInterface | null>(null);
