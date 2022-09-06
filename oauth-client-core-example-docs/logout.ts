import {
  config,
  getCsrfResult,
  getIdTokenHint,
  getStoredCsrfResult,
} from "@ilionx/oauth-client-core";

// The LOGOUT_ENDPOINT can be requested from
client.config.logout_endpoint;

// The POST_LOGOUT_REDIRECT_URI can be requested from
client.config.post_logout_redirect_uri;

// The CSRF_TOKEN can be requested from
//  Synchronously (try this first)
getStoredCsrfResult();
//  Asynchronously
getCsrfResult();

// The ID_TOKEN_HINT can be requested from
getIdTokenHint({ regex: true });
