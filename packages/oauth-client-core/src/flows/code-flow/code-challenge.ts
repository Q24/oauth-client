import { sha256 } from "../../crypto";
import { base64urlEncode } from "../../utils/base64-url";

export async function createCodeChallenge(
  code_verifier: string,
): Promise<string> {
  const hash = await sha256(code_verifier);
  const challenge = base64urlEncode(hash);

  return challenge;
}
