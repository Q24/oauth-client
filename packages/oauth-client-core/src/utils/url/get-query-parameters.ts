export function getQueryParameters<T>(): T {
  const queryParameterStrings = window.location.search.substring(1).split("&");

  const argsParsed = {} as T;

  queryParameterStrings.forEach((queryParameterString) => {
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
