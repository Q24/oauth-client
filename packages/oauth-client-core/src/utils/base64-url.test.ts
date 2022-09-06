import { base64urlDecode, base64urlEncode } from "./base64-url";
import { toUint8Array, fromUint8Array } from "./text-encoding";

const testData = "test string";
const testDataEncoded = "dGVzdCBzdHJpbmc";

test("base64urlEncode", () => {
  const uint8Array = toUint8Array(testData);
  const base64url = base64urlEncode(uint8Array);
  expect(base64url).toBe(testDataEncoded);
});
test("base64urlDecode", () => {
  const uint8Array = base64urlDecode(testDataEncoded);
  const decoded = fromUint8Array(uint8Array);
  expect(decoded).toEqual(testData);
});
test("encode + decode", () => {
  const uint8Array1 = toUint8Array(testData);
  const encoded = base64urlEncode(uint8Array1);
  const uint8Array2 = base64urlDecode(encoded);
  const decoded = fromUint8Array(uint8Array2);
  expect(decoded).toEqual(testData);
});
