[@ilionx/oauth-client-core](../README.md) / [Exports](../modules.md) / LogUtil

# Class: LogUtil

## Table of contents

### Constructors

- [constructor](LogUtil.md#constructor)

### Methods

- [debug](LogUtil.md#debug)
- [emitLog](LogUtil.md#emitlog)
- [error](LogUtil.md#error)
- [info](LogUtil.md#info)
- [warn](LogUtil.md#warn)

## Constructors

### constructor

• **new LogUtil**()

## Methods

### debug

▸ `Static` **debug**(`msg`, ...`supportingDetails`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `string` |
| `...supportingDetails` | `any`[] |

#### Returns

`void`

#### Defined in

utils/logUtil.ts:4

___

### emitLog

▸ `Static` `Private` **emitLog**(`logType`, `msg`, ...`supportingDetails`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `logType` | ``"log"`` \| ``"info"`` \| ``"warn"`` \| ``"error"`` |
| `msg` | `string` |
| `...supportingDetails` | `any`[] |

#### Returns

`void`

#### Defined in

utils/logUtil.ts:20

___

### error

▸ `Static` **error**(`msg`, ...`supportingDetails`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `string` |
| `...supportingDetails` | `any`[] |

#### Returns

`void`

#### Defined in

utils/logUtil.ts:16

___

### info

▸ `Static` **info**(`msg`, ...`supportingDetails`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `string` |
| `...supportingDetails` | `any`[] |

#### Returns

`void`

#### Defined in

utils/logUtil.ts:8

___

### warn

▸ `Static` **warn**(`msg`, ...`supportingDetails`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `string` |
| `...supportingDetails` | `any`[] |

#### Returns

`void`

#### Defined in

utils/logUtil.ts:12
