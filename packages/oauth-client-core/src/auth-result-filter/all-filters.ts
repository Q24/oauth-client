import { Client } from "../client";
import type { AuthResultFilter } from "./model/auth-result-filter.model";

export function getAllAuthResultFilters(
  client: Client,
  extraAuthResultFilters?: AuthResultFilter[],
): AuthResultFilter[] {
  return [
    ...(client.config.defaultAuthResultFilters || []),
    ...(extraAuthResultFilters ?? []),
  ];
}
