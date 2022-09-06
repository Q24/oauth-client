import type { JWT, JWTHeader } from "./model/jwt.model";
import type { IdTokenPayload } from "./model/id-token.model";
import type { AccessTokenPayload } from "./model/access-token.model";
import { base64urlDecode } from "../utils/base64-url";
import { fromUint8Array } from "../utils/text-encoding";

function isValid<T>(arr: any[]): arr is [JWTHeader, T, Uint8Array] {
  return (
    arr.length === 3 && typeof arr[0] === "object" && typeof arr[1] === "object"
  );
}

/**
 * transforms an JWT string (e.g. from an access token) to a
 * JWT object.
 *
 * @param token A JWT token string
 * @returns JSON Web Token
 */
export function parseJwt<T = AccessTokenPayload>(token: string): JWT<T> {
  try {
    const arr = token
      .split(".")
      .map(base64urlDecode)
      .map((uint8Array, index) => {
        if (index === 0 || index === 1) {
          const str = fromUint8Array(uint8Array);
          return JSON.parse(str);
        }
        return uint8Array;
      });
    if (isValid<T>(arr)) {
      return {
        header: arr[0],
        payload: arr[1],
        signature: arr[2],
      };
    }
    throw new Error();
  } catch {
    throw Error("The serialization of the jwt is invalid.");
  }
}

export function parseIdToken(token: string): JWT<IdTokenPayload> {
  return parseJwt<IdTokenPayload>(token);
}
