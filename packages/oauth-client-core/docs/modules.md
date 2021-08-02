[@ilionx/oauth-client-core](README.md) / Exports

# @ilionx/oauth-client-core

## Table of contents

### Classes

- [LogUtil](classes/LogUtil.md)

### Interfaces

- [AuthResult](interfaces/AuthResult.md)
- [AuthResultFilter](interfaces/AuthResultFilter.md)
- [CsrfResult](interfaces/CsrfResult.md)
- [JWT](interfaces/JWT.md)
- [OAuthClientConfig](interfaces/OAuthClientConfig.md)
- [OAuthCodeFlowAccessTokenParameters](interfaces/OAuthCodeFlowAccessTokenParameters.md)
- [OAuthCodeFlowAuthorizeParameters](interfaces/OAuthCodeFlowAuthorizeParameters.md)
- [OAuthCodeFlowAuthorizeResponse](interfaces/OAuthCodeFlowAuthorizeResponse.md)
- [OAuthRefreshTokenParameters](interfaces/OAuthRefreshTokenParameters.md)

### Variables

- [config](modules.md#config)

### Functions

- [accessTokenScopeFilter](modules.md#accesstokenscopefilter)
- [authorize](modules.md#authorize)
- [cleanHashFragment](modules.md#cleanhashfragment)
- [cleanSessionStorage](modules.md#cleansessionstorage)
- [codeFlow](modules.md#codeflow)
- [configure](modules.md#configure)
- [discovery](modules.md#discovery)
- [getCsrfResult](modules.md#getcsrfresult)
- [getStoredCsrfToken](modules.md#getstoredcsrftoken)
- [getUserInfo](modules.md#getuserinfo)
- [isSessionAlive](modules.md#issessionalive)
- [parseIdToken](modules.md#parseidtoken)
- [parseJwt](modules.md#parsejwt)
- [silentRefresh](modules.md#silentrefresh)

## Variables

### config

• `Let` **config**: [`OAuthClientConfig`](interfaces/OAuthClientConfig.md)

#### Defined in

[configuration/config.service.ts:3](https://github.com/Q24/oauth-client/blob/d927bd3/packages/oauth-client-core/src/configuration/config.service.ts#L3)

## Functions

### accessTokenScopeFilter

▸ **accessTokenScopeFilter**(`scopes`): [`AuthResultFilter`](interfaces/AuthResultFilter.md)

check if the access token has the required scopes. The access token must be a
JWT token with a scope parameter.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scopes` | `string`[] | the scopes to check for |

#### Returns

[`AuthResultFilter`](interfaces/AuthResultFilter.md)

an AuthResultFilter function

#### Defined in

[auth-result-filter/access-token-scope-filter.ts:12](https://github.com/Q24/oauth-client/blob/d927bd3/packages/oauth-client-core/src/auth-result-filter/access-token-scope-filter.ts#L12)

___

### authorize

▸ **authorize**<`T`\>(`urlParameters`): `Promise`<[`AuthResult`](interfaces/AuthResult.md)\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends { [key in string \| number \| symbol]: any} |

#### Parameters

| Name | Type |
| :------ | :------ |
| `urlParameters` | `T` |

#### Returns

`Promise`<[`AuthResult`](interfaces/AuthResult.md)\>

#### Defined in

[common/authorize.ts:8](https://github.com/Q24/oauth-client/blob/d927bd3/packages/oauth-client-core/src/common/authorize.ts#L8)

___

### cleanHashFragment

▸ **cleanHashFragment**(`url`): `string`

Based on a URL containing a hash fragment, gets a new URL without this fragment.

Useful if the URL contains a hash fragment which should be stripped. URL could contain
an *access_token* when a user uses the *BACK* button in the browser.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | the URL containing the hash fragment |

#### Returns

`string`

the URL without the hash fragment

#### Defined in

[utils/url.ts:105](https://github.com/Q24/oauth-client/blob/d927bd3/packages/oauth-client-core/src/utils/url.ts#L105)

___

### cleanSessionStorage

▸ **cleanSessionStorage**(): `void`

Cleans up the current session: deletes the stored local tokens, discoveryState, nonce,
id token hint, CSRF token, json web key set, id provider metadata, user info,
refresh token

#### Returns

`void`

#### Defined in

[utils/clean-session-storage.ts:16](https://github.com/Q24/oauth-client/blob/d927bd3/packages/oauth-client-core/src/utils/clean-session-storage.ts#L16)

___

### codeFlow

▸ **codeFlow**(`authValidationOptions?`): `Promise`<[`AuthResult`](interfaces/AuthResult.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `authValidationOptions?` | `AuthValidationOptions` |

#### Returns

`Promise`<[`AuthResult`](interfaces/AuthResult.md)\>

#### Defined in

[flows/code-flow/code-flow.ts:17](https://github.com/Q24/oauth-client/blob/d927bd3/packages/oauth-client-core/src/flows/code-flow/code-flow.ts#L17)

___

### configure

▸ **configure**(`configuration`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `configuration` | (`configuration`: [`OAuthClientConfig`](interfaces/OAuthClientConfig.md)) => [`OAuthClientConfig`](interfaces/OAuthClientConfig.md) \| [`OAuthClientConfig`](interfaces/OAuthClientConfig.md) |

#### Returns

`void`

#### Defined in

[configuration/config.service.ts:5](https://github.com/Q24/oauth-client/blob/d927bd3/packages/oauth-client-core/src/configuration/config.service.ts#L5)

___

### discovery

▸ **discovery**(): `Promise`<`void`\>

Used for obtaining OpenID Provider configuration information. The discovery
will only be done once. Further calls to the discovery endpoint will result
in a singleton promise being returned.

Discovery will automatically be done by the checkSession method.

#### Returns

`Promise`<`void`\>

A promise which will resolve when the discovery is complete

#### Defined in

[discovery/discovery.ts:24](https://github.com/Q24/oauth-client/blob/d927bd3/packages/oauth-client-core/src/discovery/discovery.ts#L24)

___

### getCsrfResult

▸ **getCsrfResult**(): `Promise`<[`CsrfResult`](interfaces/CsrfResult.md)\>

Get a CSRF Token from the authorization server

#### Returns

`Promise`<[`CsrfResult`](interfaces/CsrfResult.md)\>

#### Defined in

[csrf/csrf.ts:34](https://github.com/Q24/oauth-client/blob/d927bd3/packages/oauth-client-core/src/csrf/csrf.ts#L34)

___

### getStoredCsrfToken

▸ **getStoredCsrfToken**(): `string` \| ``null``

Gets the stored CSRF Token from storage

#### Returns

`string` \| ``null``

#### Defined in

[csrf/csrf.ts:17](https://github.com/Q24/oauth-client/blob/d927bd3/packages/oauth-client-core/src/csrf/csrf.ts#L17)

___

### getUserInfo

▸ **getUserInfo**(): `Promise`<`UserInfo`\>

tries to get the local user info; if not found, get the remote user info.

#### Returns

`Promise`<`UserInfo`\>

the user info

#### Defined in

[user-info/getUserInfo.ts:125](https://github.com/Q24/oauth-client/blob/d927bd3/packages/oauth-client-core/src/user-info/getUserInfo.ts#L125)

___

### isSessionAlive

▸ **isSessionAlive**(): `Promise`<`Object`\>

Checks if a session is alive. This may be on another platform.
This is normally used in conjunction with a silent logout. It
doesn't extend the lifetime of the current session. If a
session is found, a logout should NOT be triggered.

#### Returns

`Promise`<`Object`\>

The status code of the HTTP response

#### Defined in

[backend-check/session-alive.ts:13](https://github.com/Q24/oauth-client/blob/d927bd3/packages/oauth-client-core/src/backend-check/session-alive.ts#L13)

___

### parseIdToken

▸ `Const` **parseIdToken**(`token`): [`JWT`](interfaces/JWT.md)<`IdTokenPayload`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `string` |

#### Returns

[`JWT`](interfaces/JWT.md)<`IdTokenPayload`\>

#### Defined in

[jwt/parseJwt.ts:45](https://github.com/Q24/oauth-client/blob/d927bd3/packages/oauth-client-core/src/jwt/parseJwt.ts#L45)

___

### parseJwt

▸ **parseJwt**<`T`\>(`token`): [`JWT`](interfaces/JWT.md)<`T`\>

transforms an JWT string (e.g. from an access token) to a
JWT object.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `AccessTokenPayload` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `token` | `string` | A JWT token string |

#### Returns

[`JWT`](interfaces/JWT.md)<`T`\>

JSON Web Token

#### Defined in

[jwt/parseJwt.ts:27](https://github.com/Q24/oauth-client/blob/d927bd3/packages/oauth-client-core/src/jwt/parseJwt.ts#L27)

___

### silentRefresh

▸ **silentRefresh**(`authValidationOptions?`): `Promise`<[`AuthResult`](interfaces/AuthResult.md)\>

Silently refresh an access token via iFrame.

Concurrent requests to this function will resolve to a
singleton Promise.

Creates an invisible iframe that navigates to the
`authorize_endpoint` to get a new token there. Extracts
the token from the iframe URL and returns it.

If this function fails for any reason, the Promise will reject.

#### Parameters

| Name | Type |
| :------ | :------ |
| `authValidationOptions?` | `AuthValidationOptions` |

#### Returns

`Promise`<[`AuthResult`](interfaces/AuthResult.md)\>

A valid token

#### Defined in

[flows/implicit-flow/implicit-flow-refresh.ts:29](https://github.com/Q24/oauth-client/blob/d927bd3/packages/oauth-client-core/src/flows/implicit-flow/implicit-flow-refresh.ts#L29)
