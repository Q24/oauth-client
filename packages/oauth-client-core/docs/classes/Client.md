[@ilionx/oauth-client-core](../README.md) / [Exports](../modules.md) / Client

# Class: Client

## Table of contents

### Constructors

- [constructor](Client.md#constructor)

### Properties

- [\_\_cache](Client.md#__cache)
- [config](Client.md#config)
- [logger](Client.md#logger)
- [storage](Client.md#storage)

## Constructors

### constructor

• **new Client**(`config`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`OAuthClientConfig`](../interfaces/OAuthClientConfig.md) |

#### Defined in

[client/client.ts:14](https://github.com/Q24/oauth-client/blob/fb10545/packages/oauth-client-core/src/client/client.ts#L14)

## Properties

### \_\_cache

• **\_\_cache**: `Record`<`string`, `any`\> = `{}`

#### Defined in

[client/client.ts:10](https://github.com/Q24/oauth-client/blob/fb10545/packages/oauth-client-core/src/client/client.ts#L10)

___

### config

• `Readonly` **config**: [`OAuthClientConfig`](../interfaces/OAuthClientConfig.md)

#### Defined in

[client/client.ts:14](https://github.com/Q24/oauth-client/blob/fb10545/packages/oauth-client-core/src/client/client.ts#L14)

___

### logger

• **logger**: [`Logger`](Logger.md)

#### Defined in

[client/client.ts:9](https://github.com/Q24/oauth-client/blob/fb10545/packages/oauth-client-core/src/client/client.ts#L9)

___

### storage

• **storage**: `Storage` = `window.sessionStorage`

#### Defined in

[client/client.ts:12](https://github.com/Q24/oauth-client/blob/fb10545/packages/oauth-client-core/src/client/client.ts#L12)
