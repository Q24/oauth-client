import { getNonce } from "../utils/nonce";
import { saveSessionId } from "./session-id";

import type { AuthResult } from "../jwt/model/auth-result.model";
import { Client } from "../client";

export interface ValidSession {
  /**
   * User Session ID is a response given from the token validation call
   * and used to trigger session related calls through backend (i.e. kill all sessions)
   */
  user_session_id: string;
}

interface ValidateTokenRequest {
  nonce: string;
  id_token: string;
  access_token?: string;
}

/**
 * Posts the received token to the Backend for decryption and validation
 */
export async function validateAuthResultBackend(
  client: Client,
  authResult: AuthResult,
): Promise<void> {
  if (!client.config.validate_token_endpoint) {
    return;
  }
  const nonce = getNonce(client);
  if (!nonce) {
    throw new Error("Nonce not found in local storage.");
  }
  const data: ValidateTokenRequest = {
    nonce,
    id_token: authResult.id_token,
  };

  // Access token is optional
  if (authResult.access_token) {
    data.access_token = authResult.access_token;
  }

  client.logger.debug("Validate token with TokenValidation Endpoint");

  return new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    if (!client.config.validate_token_endpoint) {
      throw new Error("Token Validation endpoint must be defined");
    }

    xhr.open("POST", client.config.validate_token_endpoint, true);

    xhr.withCredentials = true;
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const validationResult: ValidSession = JSON.parse(xhr.responseText);
          saveSessionId(client, validationResult.user_session_id);
          client.logger.debug("Token validated by backend", validationResult);

          resolve();
        } else {
          client.logger.error("Authorisation Token not valid");
          client.logger.debug("Token NOT validated by backend", xhr.statusText);
          reject("token_invalid_backend");
        }
      }
    };
    xhr.send(JSON.stringify(data));
  });
}
