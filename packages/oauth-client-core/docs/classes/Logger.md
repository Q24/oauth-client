[@ilionx/oauth-client-core](../README.md) / [Exports](../modules.md) / Logger

# Class: Logger

## Table of contents

### Constructors

- [constructor](Logger.md#constructor)

### Methods

- [debug](Logger.md#debug)
- [emitLog](Logger.md#emitlog)
- [error](Logger.md#error)
- [info](Logger.md#info)
- [warn](Logger.md#warn)

## Constructors

### constructor

• **new Logger**(`debugMode`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `debugMode` | `boolean` |

#### Defined in

[utils/logger.ts:2](https://github.com/Q24/oauth-client/blob/fb10545/packages/oauth-client-core/src/utils/logger.ts#L2)

## Methods

### debug

▸ **debug**(`msg`, ...`supportingDetails`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `string` |
| `...supportingDetails` | `any`[] |

#### Returns

`void`

#### Defined in

[utils/logger.ts:4](https://github.com/Q24/oauth-client/blob/fb10545/packages/oauth-client-core/src/utils/logger.ts#L4)

___

### emitLog

▸ `Private` **emitLog**(`logType`, `msg`, ...`supportingDetails`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `logType` | ``"log"`` \| ``"info"`` \| ``"warn"`` \| ``"error"`` |
| `msg` | `string` |
| `...supportingDetails` | `any`[] |

#### Returns

`void`

#### Defined in

[utils/logger.ts:20](https://github.com/Q24/oauth-client/blob/fb10545/packages/oauth-client-core/src/utils/logger.ts#L20)

___

### error

▸ **error**(`msg`, ...`supportingDetails`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `string` |
| `...supportingDetails` | `any`[] |

#### Returns

`void`

#### Defined in

[utils/logger.ts:16](https://github.com/Q24/oauth-client/blob/fb10545/packages/oauth-client-core/src/utils/logger.ts#L16)

___

### info

▸ **info**(`msg`, ...`supportingDetails`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `string` |
| `...supportingDetails` | `any`[] |

#### Returns

`void`

#### Defined in

[utils/logger.ts:8](https://github.com/Q24/oauth-client/blob/fb10545/packages/oauth-client-core/src/utils/logger.ts#L8)

___

### warn

▸ **warn**(`msg`, ...`supportingDetails`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `string` |
| `...supportingDetails` | `any`[] |

#### Returns

`void`

#### Defined in

[utils/logger.ts:12](https://github.com/Q24/oauth-client/blob/fb10545/packages/oauth-client-core/src/utils/logger.ts#L12)
