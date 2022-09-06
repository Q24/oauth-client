import { getStoredAuthResult, parseJwt } from "@ilionx/oauth-client-core";

getStoredAuthResult([
  (authResult) => {
    if (authResult.access_token) {
      const accessToken = parseJwt(authResult.access_token);
      // The backend is creating special tokens which have `someCustomProperty` set
      // to an expected value. We need to validate this.
      return accessToken["someCustomProperty"] === "someExpectedValue";
    }
    return false;
  },
]);
