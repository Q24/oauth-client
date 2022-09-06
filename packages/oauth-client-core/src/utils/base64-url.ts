import { toUint8Array, fromUint8Array } from "./text-encoding";

export const base64Encode = (input: Uint8Array | string) => {
  let unencoded = input;
  if (typeof unencoded === "string") {
    unencoded = toUint8Array(unencoded);
  }
  const CHUNK_SIZE = 0x8000;
  const arr = [];
  for (let i = 0; i < unencoded.length; i += CHUNK_SIZE) {
    arr.push(
      // @ts-expect-error
      String.fromCharCode.apply(null, unencoded.subarray(i, i + CHUNK_SIZE)),
    );
  }
  return btoa(arr.join(""));
};

export const base64urlEncode = (input: Uint8Array | string) => {
  return base64Encode(input)
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};

export const base64Decode = (encoded: string): Uint8Array => {
  const binary = atob(encoded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
};

export const base64urlDecode = (input: Uint8Array | string) => {
  let encoded = input;
  if (encoded instanceof Uint8Array) {
    encoded = fromUint8Array(encoded);
  }
  encoded = encoded.replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, "");
  try {
    return base64Decode(encoded);
  } catch {
    throw new TypeError("The input to be decoded is not correctly encoded.");
  }
};
