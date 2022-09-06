import { verifySignature as verifySignature } from "./verify-signature";
import {
  getAlgorithm,
  verifyAlgorithm as verifyAlgorithm,
} from "./verify-algorithm";

import { parseJwt } from "../../jwt";
import { JWK } from "../../discovery/model/jwks.model";

export async function verifyJwt(jwt: string, jwk: JWK): Promise<string | null> {
  const key = await importJwk(jwk);
  const { header, signature } = parseJwt(jwt);

  const verifyAlgorithmError = verifyAlgorithm(header.alg, key);

  if (verifyAlgorithmError !== null) {
    return verifyAlgorithmError;
  }

  const signingInput = jwt.slice(0, jwt.lastIndexOf("."));
  const verifySignatureError = await verifySignature(
    signature,
    key,
    header.alg,
    signingInput,
  );
  if (verifySignatureError !== null) {
    return verifySignatureError;
  }

  return null;
}

async function importJwk(jwk: JWK): Promise<CryptoKey> {
  const alg = getAlgorithm(jwk.alg ?? "RS256");
  return crypto.subtle.importKey("jwk", jwk, alg, true, ["verify"]);
}
