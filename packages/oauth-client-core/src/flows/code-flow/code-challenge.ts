import { sha256 } from "../../crypto";
import { encode } from "../../utils/base64-url";

export async function createCodeChallenge(code_verifier: string): Promise<string> {
  const hash = await sha256(code_verifier);
  const challenge = encode(hash);

  return challenge;
}
