import { Logger } from "../utils/logger";
import { OAuthClientConfig } from "./client-config";

export function createClient(config: OAuthClientConfig): Client {
  return new Client(config);
}

export class Client {
  public logger: Logger;
  public __cache: Record<string, any> = {};

  public storage: Storage = window.sessionStorage;

  constructor(public readonly config: OAuthClientConfig) {
    this.logger = new Logger(config.debug === true);
  }
}
