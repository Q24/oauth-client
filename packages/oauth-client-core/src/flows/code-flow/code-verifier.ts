import { base64urlEncode } from "../../utils/base64-url";

const codeVerifierStorageKey = "code_verifier";

export function storeCodeVerifier(code_verifier: string): void {
  window.sessionStorage.setItem(codeVerifierStorageKey, code_verifier);
}

export function getStoredCodeVerifier(): string | null {
  return window.sessionStorage.getItem(codeVerifierStorageKey);
}

export function generateCodeVerifier(): string {
  const randomBytes = crypto.getRandomValues(new Uint8Array(32));
  return base64urlEncode(randomBytes);
}

/**
 * Generates a code verifier and stores it in session storage.
 *
 * @returns the code verifier
 */
export function storeAndGetNewCodeVerifier(): string {
  const code_verifier = generateCodeVerifier();
  storeCodeVerifier(code_verifier);

  return code_verifier;
}
