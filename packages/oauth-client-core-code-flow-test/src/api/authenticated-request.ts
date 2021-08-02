import {
  getAuthHeader,
  getStoredAuthResult,
  lazyRefresh,
  obtainSession,
} from "@ilionx/oauth-client-core";
import axios, { AxiosRequestConfig } from "axios";
import { globals } from "../globals";

export const authenticatedRequest = axios.create({
  baseURL: globals.restBaseUrl,
});

const setAuthHeader = async (
  config: AxiosRequestConfig
): Promise<AxiosRequestConfig> => {
  const storedToken = getStoredAuthResult();

  if (storedToken) {
    config.headers["Authorization"] = getAuthHeader(storedToken);

    lazyRefresh(storedToken);
    return config;
  } else {
    const isLoggedIn = await obtainSession();
    if (isLoggedIn) {
      config = await setAuthHeader(config);
      return config;
    } else {
      throw new axios.Cancel("User is not logged in");
    }
  }
};

authenticatedRequest.interceptors.request.use(setAuthHeader);
