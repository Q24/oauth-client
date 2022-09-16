import { toUint8Array } from "./text-encoding";

export async function sha256(str: string): Promise<Uint8Array> {
  const buffer = toUint8Array(str);
  const hashArray = await crypto.subtle.digest("SHA-256", buffer);
  return new Uint8Array(hashArray);
}

export function hexToBuffer(hex: string): Uint8Array {
  return new Uint8Array(
    hex.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16)),
  );
}

export function hashArrayToHex(hashArray: Uint8Array): string {
  return Array.from(new Uint8Array(hashArray))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
