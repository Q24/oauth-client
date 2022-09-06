import { Alg } from "../../discovery/model/jwks.model";
import { getAlgorithm } from "./verify-algorithm";

export async function verifySignature(
  signature: Uint8Array,
  key: CryptoKey | null,
  alg: Alg,
  signingInput: string,
): Promise<string | null> {
  if (key === null) {
    if (signature.length === 0) {
      return null;
    }
    return "The key is null but the signature is not.";
  }

  const algorithm = getAlgorithm(alg);

  const valid = await crypto.subtle.verify(
    algorithm,
    key,
    signature,
    Buffer.from(signingInput),
  );

  if (valid) {
    return null;
  }

  return `The signature is invalid: ${JSON.stringify(algorithm, null, 2)}`;
}
