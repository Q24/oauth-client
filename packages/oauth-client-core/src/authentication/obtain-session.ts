import { codeFlow } from "../flows/code-flow/code-flow";
import { implicitFlow } from "../flows/implicit-flow/implicit-flow";
import isCodeFlow from "../flows/code-flow/is-code-flow";

import type { AuthResult } from "../jwt/model/auth-result.model";
import type { AuthValidationOptions } from "../jwt/model/auth-validation-options.model";
import { Client } from "../client";

export function obtainSession(
  client: Client,
  authValidationOptions?: AuthValidationOptions,
): Promise<AuthResult> {
  if (isCodeFlow(client)) {
    return codeFlow(client, authValidationOptions);
  }
  return implicitFlow(client, authValidationOptions);
}
