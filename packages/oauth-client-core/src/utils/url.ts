import { Client } from "../client";

/**
 * Flush state param
 */
export interface URLParams {
  /**
   * Flush state param
   */
  flush_state?: boolean;
}

export function getURLParameters<T extends ParsedParameters>(): T {
  return {
    ...getHashParameters<T>(),
    ...getSearchParameters<T>(),
  };
}

export type ParsedParameters = Record<
  string,
  string | string[] | boolean | number
>;

export function getHashParameters<T>(): T {
  return parseQueryParameters(window.location.hash);
}

export function getSearchParameters<T>(): T {
  return parseQueryParameters(window.location.search);
}

export function parseQueryParameters<T>(queryParametersString: string): T {
  const firstSubstring = queryParametersString.substring(0, 1);

  const queryParametersArray =
    firstSubstring === "#" || firstSubstring === "?"
      ? queryParametersString.substring(1).split("&")
      : queryParametersString.split("&");

  const argsParsed: ParsedParameters = {};

  for (const queryParameter of queryParametersArray) {
    const [key, value] = queryParameter
      .split("=")
      .map((keyOrValue) => decodeURIComponent(keyOrValue).trim());
    argsParsed[key] = value ?? true;
  }

  return argsParsed as unknown as T;
}

/**
 * Convert Object to URL Query string
 * @param urlParameters
 * @returns the url parameters
 */
export function toUrlParameterString<T extends object>(
  urlParameters: T,
): string {
  if (urlParameters.hasOwnProperty("redirect_uri")) {
    // @ts-ignore
    urlParameters.redirect_uri = cleanHashFragment(urlParameters.redirect_uri);
  }
  const params = [];
  for (const key in urlParameters) {
    if (urlParameters.hasOwnProperty(key)) {
      const value = urlParameters[key];
      if (value !== undefined) {
        params.push(`${key}=${value}`);
      }
    }
  }

  return params.join("&");
}

/**
 * Based on a URL containing a hash fragment, gets a new URL without this fragment.
 *
 * Useful if the URL contains a hash fragment which should be stripped. URL could contain
 * an *access_token* when a user uses the *BACK* button in the browser.
 *
 * @param url the URL containing the hash fragment
 * @returns the URL without the hash fragment
 */
export function cleanHashFragment(url: string): string {
  return url.split("#")[0];
}

export function cleanCode(client: Client, url: string): string {
  const cleanedUrl = new URL(url);
  cleanedUrl.searchParams.delete("code");
  cleanedUrl.searchParams.delete("state");
  client.logger.debug("Cleaning Code parameter from URL", url, cleanedUrl);
  return cleanedUrl.toString();
}

export function clearQueryParameters(): void {
  window.history.replaceState({}, document.title, window.location.pathname);
}
