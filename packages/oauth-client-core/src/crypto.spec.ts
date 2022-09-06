import { hexToBuffer, sha256 } from "./crypto";

test("sha256", async () => {
  const hash = await sha256("hello world");
  expect(hash).toBe(
    "b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9",
  );
});
test("hexToBuffer", () => {
  const hex = hexToBuffer(
    "b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9",
  );
  expect(hex).toBeInstanceOf(Buffer);
});
