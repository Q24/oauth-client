import { parseIdToken } from "./parseJwt";
import type { AuthResult } from "./model/auth-result.model";
import isCodeFlow from "../utils/is-code-flow";
import { hashArrayToHex, hexToBuffer, sha256 } from "../crypto";
import { Client } from "../client";
import { base64urlEncode } from "../utils/base64-url";

export async function findAtHash(
  accessToken: string,
  sha: string,
): Promise<string> {
  const hash = await sha256(accessToken);
  const hex = hashArrayToHex(hash);
  const first128bits = hex.substring(0, hex.length / 2);
  const buffer = hexToBuffer(first128bits);
  const atHash = base64urlEncode(buffer);

  return atHash;
}

/**
 * (1) Hash the octets of the ASCII representation of the access_token with
 * the hash algorithm specified in JWA [JWA] for the alg Header Parameter of
 * the ID Token's JOSE Header. For instance, if the alg is RS256, the hash
 * algorithm used is SHA-256. (2) Take the left-most half of the hash and
 * base64url-encode it. (3) The value of at_hash in the ID Token MUST match
 * the value produced in the previous step if at_hash is present in the ID
 * Token.
 *
 * @param authResult the result from the authentication call
 */
export function validateAccessToken(
  client: Client,
  authResult: AuthResult,
): void {
  // If there is no access token, we don't have to validate it.
  if (!authResult.access_token) {
    return;
  }
  const idToken = parseIdToken(authResult.id_token);
  if (isCodeFlow(client) && !idToken.payload.at_hash) {
    return;
  }

  if (
    !validateIdTokenAtHash(
      client,
      authResult.access_token,
      idToken.payload.at_hash,
      idToken.header.alg,
    )
  ) {
    client.logger.error("Could not validate Access Token Hash (at_hash)");
    throw Error("at_hash invalid");
  }
}

async function validateIdTokenAtHash(
  client: Client,
  accessToken: string,
  atHash: string,
  idTokenAlg: string,
): Promise<boolean> {
  client.logger.debug("validating at_hash", atHash);

  const secureHashAlgorithm = idTokenAlg.includes("384")
    ? "sha348"
    : idTokenAlg.includes("512")
    ? "sha512"
    : "sha256";

  const testData = await findAtHash(accessToken, secureHashAlgorithm);
  client.logger.debug("at_hash client validation not decoded:" + testData);
  if (testData === atHash) {
    return true;
  }

  const testData2 = await findAtHash(
    decodeURIComponent(accessToken),
    secureHashAlgorithm,
  );
  client.logger.debug("-gen access--", testData2);
  return testData2 === atHash;
}
