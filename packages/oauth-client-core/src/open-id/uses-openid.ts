import { config } from "../configuration/config.service";

export function usesOpenId(): boolean {
  return config.response_type.includes("id_token");
}
