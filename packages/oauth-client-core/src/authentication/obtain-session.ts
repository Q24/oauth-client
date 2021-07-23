import { codeFlow } from "../code-flow/code-flow";
import { isCodeFlow } from "../code-flow/is-code-flow";
import { implicitFlow } from "../implicit-flow/implicit-flow";
import { AuthResult } from "../jwt/model/auth-result.model";
import { AuthValidationOptions } from "../jwt/model/auth-validation-options.model";

export function obtainSession(
  authValidationOptions?: AuthValidationOptions,
): Promise<AuthResult> {
  if (isCodeFlow()) {
    return codeFlow(authValidationOptions);
  }
  return implicitFlow(authValidationOptions);
}
