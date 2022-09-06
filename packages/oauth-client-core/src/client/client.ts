import { JsonWebKeySet } from "../discovery/model/jwks.model";
import { OpenIDProviderMetadata } from "../discovery/model/openid-provider-metadata.model";
import { Logger } from "../utils/logger";
import { OAuthClientConfig } from "./client-config";

export function createClient(config: OAuthClientConfig): Client {
  return new Client(config);
}

export class Client {
  public logger: Logger;

  private _jwks?: JsonWebKeySet;
  private _providerMetadata?: OpenIDProviderMetadata;

  constructor(public readonly config: OAuthClientConfig) {
    this.logger = new Logger(config.debug === true);
  }

  public get jwks(): JsonWebKeySet {
    if (!this._jwks) {
      throw new Error("jwks not set, call discover first");
    }
    return this._jwks;
  }

  public set jwks(jwks: JsonWebKeySet) {
    this._jwks = jwks;
  }

  public get providerMetadata(): OpenIDProviderMetadata {
    if (!this._providerMetadata) {
      throw new Error("providerMetadata not set, call discover first");
    }
    return this._providerMetadata;
  }

  public set providerMetadata(providerMetadata: OpenIDProviderMetadata) {
    this._providerMetadata = providerMetadata;
  }
}
