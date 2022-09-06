import { Client } from "../client";

export default function isCodeFlow(client: Client): boolean {
  return client.config.response_type.includes("code");
}
