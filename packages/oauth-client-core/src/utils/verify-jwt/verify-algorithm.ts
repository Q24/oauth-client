import { Alg } from "../../discovery/model/jwks.model";

function isHashedKeyAlgorithm(
  algorithm: Record<string, any>,
): algorithm is HmacKeyAlgorithm | RsaHashedKeyAlgorithm {
  return typeof algorithm.hash?.name === "string";
}

function isEcKeyAlgorithm(
  algorithm: Record<string, any>,
): algorithm is EcKeyAlgorithm {
  return typeof algorithm.namedCurve === "string";
}

export function verifyAlgorithm(
  alg: Alg,
  key: CryptoKey | null,
): string | null {
  if (alg === "none") {
    return key !== null ? `The alg '${alg}' does not allow a key.` : null;
  }
  if (!key) {
    return `The alg '${alg}' requires a key.`;
  }
  const keyAlgorithm = key.algorithm;
  const algAlgorithm = getAlgorithm(alg);
  if (keyAlgorithm.name !== algAlgorithm.name) {
    return `The alg '${alg}' does not match the key's algorithm.`;
  }

  if (
    isHashedKeyAlgorithm(keyAlgorithm) &&
    isHashedKeyAlgorithm(algAlgorithm) &&
    keyAlgorithm.hash.name === algAlgorithm.hash.name
  ) {
    return null;
  }

  if (
    isEcKeyAlgorithm(keyAlgorithm) &&
    isEcKeyAlgorithm(algAlgorithm) &&
    keyAlgorithm.namedCurve === algAlgorithm.namedCurve
  ) {
    return null;
  }

  return `The alg '${alg}' does not match the key's algorithm.`;
}

export function getAlgorithm(
  alg: Alg,
):
  | RsaHashedImportParams
  | EcKeyImportParams
  | HmacImportParams
  | AesKeyAlgorithm
  | RsaPssParams {
  switch (alg) {
    case "HS256":
      return { hash: { name: "SHA-256" }, name: "HMAC" };
    case "HS384":
      return { hash: { name: "SHA-384" }, name: "HMAC" };
    case "HS512":
      return { hash: { name: "SHA-512" }, name: "HMAC" };
    case "PS256":
      return {
        hash: { name: "SHA-256" },
        name: "RSA-PSS",
        saltLength: 256 >> 3,
      };
    case "PS384":
      return {
        hash: { name: "SHA-384" },
        name: "RSA-PSS",
        saltLength: 384 >> 3,
      };
    case "PS512":
      return {
        hash: { name: "SHA-512" },
        name: "RSA-PSS",
        saltLength: 512 >> 3,
      };
    case "RS256":
      return { hash: { name: "SHA-256" }, name: "RSASSA-PKCS1-v1_5" };
    case "RS384":
      return { hash: { name: "SHA-384" }, name: "RSASSA-PKCS1-v1_5" };
    case "RS512":
      return { hash: { name: "SHA-512" }, name: "RSASSA-PKCS1-v1_5" };
    case "ES256":
      return { hash: { name: "SHA-256" }, name: "ECDSA", namedCurve: "P-256" };
    case "ES384":
      return { hash: { name: "SHA-384" }, name: "ECDSA", namedCurve: "P-384" };
    // case "ES512":
    // return { hash: { name: "SHA-512" }, name: "ECDSA", namedCurve: "P-521" };
    default:
      throw new Error(`The jwt's alg '${alg}' is not supported.`);
  }
}
