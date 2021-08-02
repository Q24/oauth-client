import { AuthResult } from "../jwt/model/auth-result.model";
import { AuthValidationOptions } from "../jwt/model/auth-validation-options.model";
import {isCodeFlow} from '../utils/is-code-flow';
import {codeFlow} from '../flows/code-flow/code-flow';
import {implicitFlow} from '../flows/implicit-flow/implicit-flow';

export function obtainSession(
  authValidationOptions?: AuthValidationOptions,
): Promise<AuthResult> {
  if (isCodeFlow()) {
    return codeFlow(authValidationOptions);
  }
  return implicitFlow(authValidationOptions);
}
