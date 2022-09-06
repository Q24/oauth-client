export async function sha256(buffer: string): Promise<string> {
  const hashArray = await crypto.subtle.digest(
    "SHA-256",
    Buffer.from(buffer, "utf8"),
  );
  return hashArrayToHex(hashArray);
}

export function hexToBuffer(hex: string): Buffer {
  return Buffer.from(hex, "hex");
}

export function hashArrayToHex(hashArray: Uint8Array | ArrayBuffer): string {
  return Buffer.from(hashArray).toString("hex");
}
