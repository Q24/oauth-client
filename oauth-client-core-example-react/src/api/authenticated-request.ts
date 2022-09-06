import {
  getAuthHeader,
  getStoredAuthResult,
  obtainSession,
  silentRefresh,
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
    client.config.headers["Authorization"] = getAuthHeader(storedToken);

    if (
      (storedToken.expires || 0) - Math.round(new Date().getTime() / 1000.0) <
      300
    ) {
      silentRefresh();
    }
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
