import { Client } from "../client";

export function usesOpenId(client: Client): boolean {
  return client.config.scope.includes("openid");
}
