import { Client } from "../../client";
import isCodeFlow from "../code-flow/is-code-flow";

export function isImplicitFlow(client: Client) {
  return !isCodeFlow(client);
}
