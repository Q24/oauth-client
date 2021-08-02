import { isAuthResult } from "../authentication/auth-result";
import { AuthResult } from "../jwt/model/auth-result.model";

/**
 * Flush state param
 */
export interface URLParams {
  /**
   * Flush state param
   */
  flush_state?: boolean;
}

export function getURLParameters<T>(): T {
  return {
    ...getHashParameters<T>(),
    ...getSearchParameters<T>(),
  };
}

export function getHashParameters<T>(): T {
  return parseQueryParameters(window.location.hash);
}

export function getSearchParameters<T>(): T {
  return parseQueryParameters(window.location.search);
}

export function parseQueryParameters<T>(queryParametersString: string): T {
  const queryParametersArray = queryParametersString.substring(1).split("&");
  const argsParsed = {} as T;
  queryParametersArray.forEach((queryParameterString: string) => {
    if (-1 === queryParameterString.indexOf("=")) {
      argsParsed[decodeURIComponent(queryParameterString).trim()] = true;
    } else {
      const [key, value] = queryParameterString
        .split("=")
        .map((keyOrValue) => decodeURIComponent(keyOrValue).trim());

      argsParsed[key] = value;
    }
  });

  return argsParsed;
}

/**
 * Convert Object to URL Query string
 * @param urlParameters
 * @returns the url parameters
 */
export function toUrlParameterString<
  T extends {
    [key in keyof T]: any;
  },
>(urlParameters: T): string {
  if (urlParameters["redirect_uri"]) {
    urlParameters["redirect_uri"] = cleanHashFragment(
      urlParameters["redirect_uri"],
    );
  }
  const params = [];
  for (const urlVar of Object.keys(urlParameters)) {
    params.push(`${urlVar}=${urlParameters[urlVar]}`);
  }
  return params.join("&");
}

/**
 *
 * Get Hash Fragment parameters from sessionStorage
 * @param {string} hash_fragment
 * @returns {AuthResult}
 */
export function hashFragmentToAuthResult(hash_fragment: string): AuthResult {
  const result: Partial<AuthResult> = {};
  let urlVariablesToParse;

  if (hash_fragment) {
    urlVariablesToParse = hash_fragment.split("&");

    for (const urlVar of urlVariablesToParse) {
      const parameter = urlVar.split("=");
      result[parameter[0]] = parameter[1];
    }
  }

  if (!isAuthResult(result)) {
    throw new Error("Hash fragment is no auth result");
  }

  return result;
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

export function clearQueryParameters(): void {
  window.history.replaceState({}, document.title, window.location.pathname);
}
