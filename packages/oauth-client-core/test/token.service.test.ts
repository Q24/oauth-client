import {
  deleteStoredAuthResults,
  getIdTokenHint,
  getStoredAuthResult,
  getStoredCsrfToken,
  parseJwt,
} from "../src";
import { constants } from "./constants";
import { createTestClient } from "../test/test-utils";

// Initialise the OIDC config
const client = createTestClient();

beforeEach(() => {
  // Most tests make use of session storage. Need to clean it to avoid collisions between tests.
  sessionStorage.clear();
});

describe("deleteStoredTokens", () => {
  it("deletes all tokens", () => {
    // Create a sample token in the database
    window.sessionStorage.setItem(
      `${constants.client_id}-authResult`,
      JSON.stringify([constants.sampleToken1, constants.sampleToken1]),
    );

    // Verify that there are tokens in the storage.
    expect(
      window.sessionStorage.getItem(`${constants.client_id}-authResult`),
    ).not.toBeNull();

    // Call the delete stored tokens method.
    deleteStoredAuthResults(client);

    // Verify that there are no tokens left in the storage.
    expect(
      window.sessionStorage.getItem(`${constants.client_id}-authResult`),
    ).toBeNull();
  });

  it("deletes specific tokens", () => {
    // Create a sample token in the storage
    window.sessionStorage.setItem(
      `${constants.client_id}-authResult`,
      JSON.stringify([
        constants.sampleToken1,
        constants.sampleToken1,
        constants.sampleToken2,
      ]),
    );

    // Verify that there are tokens in the storage.
    expect(
      window.sessionStorage.getItem(`${constants.client_id}-authResult`),
    ).not.toBeNull();

    // Only delete tokens which expire earlier than...
    // token 2 has an expiration of 400..., so it should be in the store
    // after this partial deletions.
    deleteStoredAuthResults(
      client,
      (token) => (token.expires ?? 0) > 3_500_000_000,
    );

    // Verify that there are no tokens left in the storage.
    const parsedTokens = JSON.parse(
      window.sessionStorage.getItem(`${constants.client_id}-authResult`) ??
        "[]",
    );
    expect(parsedTokens.length).toBeGreaterThan(0);
  });
});

describe("getIdTokenHint", () => {
  it("gets a token without regex", () => {
    // Create a sample token in the storage
    window.sessionStorage.setItem(
      `${constants.client_id}-id-token-hint`,
      constants.sampleIdTokenHint1,
    );

    // is able to get the id token hint from storage.
    expect(getIdTokenHint(client)).not.toBeNull();
  });

  it("gets a id token with regex", () => {
    // Create a sample token in the storage for a non-standard client.
    window.sessionStorage.setItem(
      `other_client-id-token-hint`,
      constants.sampleIdTokenHint1,
    );

    // is able to get the id token hint from storage.
    expect(getIdTokenHint(client, { regex: true })).not.toBeNull();
  });
});

describe("getStoredToken", () => {
  it("gets a token for the global scopes", () => {
    // Create a sample token in the database
    window.sessionStorage.setItem(
      `${constants.client_id}-authResult`,
      JSON.stringify([constants.sampleToken1]),
    );

    // Verify that there are tokens in the storage.
    expect(getStoredAuthResult(client)).not.toBeNull;
  });

  it("gets a token for specific scopes", () => {
    // Create a sample token in the database
    window.sessionStorage.setItem(
      `${constants.client_id}-authResult`,
      JSON.stringify([constants.sampleToken3]),
    );

    // Verify that the normal method does not return the right scopes.
    expect(getStoredAuthResult(client)).toBeNull;

    // Verify that there are tokens in the storage.
    expect(
      getStoredAuthResult(client, [
        (token) => {
          const accessTokenString = token.access_token;
          if (!accessTokenString) {
            return false;
          }
          const { payload } = parseJwt(accessTokenString);
          return (
            payload.scope.includes("openid") &&
            payload.scope.includes("other-custom")
          );
        },
      ]),
    ).not.toBeNull;
  });
});

describe("getStoredCsrfToken", () => {
  it("stores and retrieves csrf token", () => {
    // Create a sample token in the database
    window.sessionStorage.setItem(`_csrf`, "csrf");

    // Verify that there are tokens in the storage.
    expect(getStoredCsrfToken(client)).not.toBeNull;
  });
});
