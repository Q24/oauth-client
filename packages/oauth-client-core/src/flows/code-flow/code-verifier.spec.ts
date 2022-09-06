import { generateCodeVerifier } from "./code-verifier";

test("generateCodeVerifier", async () => {
  const hash = generateCodeVerifier();
  expect(typeof hash).toBe("string");
  expect(hash.length).toBe(43);
});
