import { Client } from "../client";

export function validateJwtString(client: Client, token: string): void {
  client.logger.info("validating JWT string");

  if (typeof token !== "string") {
    client.logger.error("token is not a string", token);
    throw Error("jwt_string_invalid");
  }

  const parts = token.split(".");

  if (parts.length !== 3) {
    client.logger.error("token doesn't have 3 parts", token);
    throw Error("jwt_string_invalid");
  }
}
