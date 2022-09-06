[@ilionx/oauth-client-core](../README.md) / [Exports](../modules.md) / LogUtil

# Class: LogUtil

## Table of contents

### Constructors

- [constructor](client.logger.md#constructor)

### Methods

- [debug](client.logger.md#debug)
- [emitLog](client.logger.md#emitlog)
- [error](client.logger.md#error)
- [info](client.logger.md#info)
- [warn](client.logger.md#warn)

## Constructors

### constructor

• **new LogUtil**()

## Methods

### debug

▸ `Static` **debug**(`msg`, ...`supportingDetails`): `void`

#### Parameters

| Name                   | Type     |
| :--------------------- | :------- |
| `msg`                  | `string` |
| `...supportingDetails` | `any`[]  |

#### Returns

`void`

#### Defined in

[utils/log-util.ts:4](https://github.com/Q24/oauth-client/blob/5af8134/packages/oauth-client-core/src/utils/log-util.ts#L4)

---

### emitLog

▸ `Static` `Private` **emitLog**(`logType`, `msg`, ...`supportingDetails`): `void`

#### Parameters

| Name                   | Type                                         |
| :--------------------- | :------------------------------------------- |
| `logType`              | `"log"` \| `"info"` \| `"warn"` \| `"error"` |
| `msg`                  | `string`                                     |
| `...supportingDetails` | `any`[]                                      |

#### Returns

`void`

#### Defined in

[utils/log-util.ts:20](https://github.com/Q24/oauth-client/blob/5af8134/packages/oauth-client-core/src/utils/log-util.ts#L20)

---

### error

▸ `Static` **error**(`msg`, ...`supportingDetails`): `void`

#### Parameters

| Name                   | Type     |
| :--------------------- | :------- |
| `msg`                  | `string` |
| `...supportingDetails` | `any`[]  |

#### Returns

`void`

#### Defined in

[utils/log-util.ts:16](https://github.com/Q24/oauth-client/blob/5af8134/packages/oauth-client-core/src/utils/log-util.ts#L16)

---

### info

▸ `Static` **info**(`msg`, ...`supportingDetails`): `void`

#### Parameters

| Name                   | Type     |
| :--------------------- | :------- |
| `msg`                  | `string` |
| `...supportingDetails` | `any`[]  |

#### Returns

`void`

#### Defined in

[utils/log-util.ts:8](https://github.com/Q24/oauth-client/blob/5af8134/packages/oauth-client-core/src/utils/log-util.ts#L8)

---

### warn

▸ `Static` **warn**(`msg`, ...`supportingDetails`): `void`

#### Parameters

| Name                   | Type     |
| :--------------------- | :------- |
| `msg`                  | `string` |
| `...supportingDetails` | `any`[]  |

#### Returns

`void`

#### Defined in

[utils/log-util.ts:12](https://github.com/Q24/oauth-client/blob/5af8134/packages/oauth-client-core/src/utils/log-util.ts#L12)
