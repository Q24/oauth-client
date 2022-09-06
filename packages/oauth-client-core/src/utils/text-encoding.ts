const encoder = new TextEncoder();
const decoder = new TextDecoder();

export function toUint8Array(str: string) {
  return encoder.encode(str);
}

export function fromUint8Array(buffer: Uint8Array) {
  return decoder.decode(buffer);
}
