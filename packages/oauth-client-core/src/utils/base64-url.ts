function addPaddingToBase64url(base64url: string): string {
  if (base64url.length % 4 === 2) {
    return `${base64url}==`;
  }
  if (base64url.length % 4 === 3) {
    return `${base64url}=`;
  }
  if (base64url.length % 4 === 1) {
    throw new TypeError("Illegal base64url string!");
  }
  return base64url;
}

function convertBase64urlToBase64(b64url: string): string {
  if (!/^[-_A-Z0-9]*?={0,2}$/i.test(b64url)) {
    // Contains characters not part of base64url spec.
    throw new TypeError("Failed to decode base64url: invalid character");
  }
  return addPaddingToBase64url(b64url).replace(/\-/g, "+").replace(/_/g, "/");
}

function convertBase64ToBase64url(b64: string): string {
  return b64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

export function encode(
  data: ArrayBuffer | string,
  encoding: BufferEncoding = "utf8",
): string {
  const b64 = Buffer.isBuffer(data)
    ? data.toString("base64")
    : Buffer.from(data as string, encoding).toString("base64");

  return convertBase64ToBase64url(b64);
}

export function decode(b64url: string): Uint8Array {
  const b64 = convertBase64urlToBase64(b64url);
  return Buffer.from(b64, "base64");
}
