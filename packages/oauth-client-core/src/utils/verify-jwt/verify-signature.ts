import { Alg } from "../../discovery/model/jwks.model";
import { toUint8Array } from "../text-encoding";
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

  const uint8Array = toUint8Array(signingInput);

  const valid = await crypto.subtle.verify(
    algorithm,
    key,
    signature,
    uint8Array,
  );

  if (valid) {
    return null;
  }

  return `The signature is invalid for the given key and algorithm ${alg}.`;
}
