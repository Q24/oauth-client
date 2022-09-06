import { createCodeChallenge } from "./code-challenge";

test("createCodeChallenge", async () => {
  const code_verifier =
    ".V~aJvk4BOK~kqODqg70JWE9D7fSh-_MDX7Sea-bN7HyytfXhnrcgGMWVrrfPXfv4A5.gfzjz2gA5lqtGqV~UDjcApW3sVlDiVbHDpPM5wXbkBAGIaxQ~uNPxTWza16l";
  const challenge = await createCodeChallenge(code_verifier);
  expect(challenge).toBe("bVe-HN7Fhgn-_2e3sdkeOB-UVm6IDV-lSU7iy-na5hQ");
});
