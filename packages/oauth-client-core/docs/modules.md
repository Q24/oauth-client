[@ilionx/oauth-client-core](README.md) / Exports

# @ilionx/oauth-client-core

## Table of contents

### Classes

- [Client](classes/Client.md)
- [Logger](classes/Logger.md)

### Interfaces

- [AuthResult](interfaces/AuthResult.md)
- [AuthResultFilter](interfaces/AuthResultFilter.md)
- [CsrfResult](interfaces/CsrfResult.md)
- [OAuthClientConfig](interfaces/OAuthClientConfig.md)

### Type Aliases

- [AuthorizeErrors](modules.md#authorizeerrors)
- [JWT](modules.md#jwt)

### Functions

- [accessTokenScopeFilter](modules.md#accesstokenscopefilter)
- [cleanHashFragment](modules.md#cleanhashfragment)
- [cleanStorage](modules.md#cleanstorage)
- [createClient](modules.md#createclient)
- [deleteStoredAuthResults](modules.md#deletestoredauthresults)
- [discovery](modules.md#discovery)
- [fetchUserInfo](modules.md#fetchuserinfo)
- [getAuthHeader](modules.md#getauthheader)
- [getCsrfResult](modules.md#getcsrfresult)
- [getIdTokenHint](modules.md#getidtokenhint)
- [getStoredAuthResult](modules.md#getstoredauthresult)
- [getStoredCsrfToken](modules.md#getstoredcsrftoken)
- [isSessionAlive](modules.md#issessionalive)
- [lazyRefresh](modules.md#lazyrefresh)
- [obtainSession](modules.md#obtainsession)
- [parseIdToken](modules.md#parseidtoken)
- [parseJwt](modules.md#parsejwt)
- [silentLogout](modules.md#silentlogout)

## Type Aliases

### AuthorizeErrors

Ƭ **AuthorizeErrors**: ``"invalid_client"`` \| ``"unauthorized_client"`` \| ``"invalid_grant"`` \| ``"unsupported_grant_type"`` \| ``"invalid_scope"`` \| ``"invalid_request_response_type"`` \| ``"invalid_request_type"`` \| ``"invalid_request_openid_type"`` \| ``"invalid_request_redirect_uri"`` \| ``"invalid_request_signature"`` \| ``"invalid_request_realm"`` \| ``"invalid_request_atype"`` \| ``"invalid_request_recipient"``

A set of strings to match when the Authorize redirect is erroring. This is the complete list of possible error to handle.
https://openid.net/specs/openid-connect-core-1_0.html#AuthError

#### Defined in

[authentication/model/authorize-errors.model.ts:5](https://github.com/Q24/oauth-client/blob/fb10545/packages/oauth-client-core/src/authentication/model/authorize-errors.model.ts#L5)

___

### JWT

Ƭ **JWT**<`T`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `AccessTokenPayload` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `header` | `JWTHeader` |
| `payload` | `T` |
| `signature` | `Uint8Array` |

#### Defined in

[jwt/model/jwt.model.ts:3](https://github.com/Q24/oauth-client/blob/fb10545/packages/oauth-client-core/src/jwt/model/jwt.model.ts#L3)

## Functions

### accessTokenScopeFilter

▸ **accessTokenScopeFilter**(`client`, `scopes`): [`AuthResultFilter`](interfaces/AuthResultFilter.md)

check if the access token has the required scopes. The access token must be a
JWT token with a scope parameter.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | [`Client`](classes/Client.md) | - |
| `scopes` | `string`[] | the scopes to check for |

#### Returns

[`AuthResultFilter`](interfaces/AuthResultFilter.md)

an AuthResultFilter function

#### Defined in

[auth-result-filter/access-token-scope-filter.ts:13](https://github.com/Q24/oauth-client/blob/fb10545/packages/oauth-client-core/src/auth-result-filter/access-token-scope-filter.ts#L13)

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

[utils/url.ts:87](https://github.com/Q24/oauth-client/blob/fb10545/packages/oauth-client-core/src/utils/url.ts#L87)

___

### cleanStorage

▸ **cleanStorage**(`client`): `void`

Cleans up the current session: deletes the stored local tokens, discoveryState, nonce,
id token hint, CSRF token, json web key set, id provider metadata, user info,
refresh token

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | [`Client`](classes/Client.md) |

#### Returns

`void`

#### Defined in

[utils/clean-session-storage.ts:15](https://github.com/Q24/oauth-client/blob/fb10545/packages/oauth-client-core/src/utils/clean-session-storage.ts#L15)

___

### createClient

▸ **createClient**(`config`): [`Client`](classes/Client.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`OAuthClientConfig`](interfaces/OAuthClientConfig.md) |

#### Returns

[`Client`](classes/Client.md)

#### Defined in

[client/client.ts:4](https://github.com/Q24/oauth-client/blob/fb10545/packages/oauth-client-core/src/client/client.ts#L4)

___

### deleteStoredAuthResults

▸ **deleteStoredAuthResults**(`client`, `authResultFilter?`): `void`

Deletes all the auth results from the storage. If authResultFilter is passed
in, only a subset will be deleted.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | [`Client`](classes/Client.md) | - |
| `authResultFilter?` | (`authResult`: `Readonly`<[`AuthResult`](interfaces/AuthResult.md)\>) => `boolean` | if specified, the authResultFilter is called for every auth result in the store. If a authResultFilter callback returns true, the auth result will remain in the store. Otherwise, it will be deleted (Just like Array.prototype.filter()) |

#### Returns

`void`

#### Defined in

[authentication/auth-result.ts:21](https://github.com/Q24/oauth-client/blob/fb10545/packages/oauth-client-core/src/authentication/auth-result.ts#L21)

___

### discovery

▸ **discovery**(`client`): `Promise`<`Discovery`\>

Used for obtaining OpenID Provider configuration information. The discovery
will only be done once. Further calls to the discovery endpoint will result
in a singleton promise being returned.

Discovery will automatically be done by the checkSession method.

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | [`Client`](classes/Client.md) |

#### Returns

`Promise`<`Discovery`\>

A promise which will resolve when the discovery is complete

#### Defined in

[discovery/discovery.ts:21](https://github.com/Q24/oauth-client/blob/fb10545/packages/oauth-client-core/src/discovery/discovery.ts#L21)

___

### fetchUserInfo

▸ **fetchUserInfo**(`client`): `Promise`<`UserInfo`\>

# 2.3.  UserInfo Endpoint

The UserInfo Endpoint is an OAuth 2.0 Protected Resource that returns Claims
about the authenticated End-User. The location of the UserInfo Endpoint MUST
be a URL using the https scheme, which MAY contain port, path, and query
parameter components. The returned Claims are represented by a JSON object
that contains a collection of name and value pairs for the Claims.

Communication with the UserInfo Endpoint MUST utilize TLS.

## 2.3.1.  UserInfo Request

Clients send requests to the UserInfo Endpoint to obtain Claims about the
End-User using an Access Token obtained through OpenID Connect
Authentication. The UserInfo Endpoint is an OAuth 2.0 [RFC6749] Protected
Resource that complies with the OAuth 2.0 Bearer Token Usage [RFC6750]
specification. The request SHOULD use the HTTP GET method and the Access
Token SHOULD be sent using the Authorization header field.

## 2.3.2.  Successful UserInfo Response

The UserInfo Claims MUST be returned as the members of a JSON object. The
response body SHOULD be encoded using UTF-8 [RFC3629]. The Claims defined in
Section 2.5 can be returned, as can additional Claims not specified there.

If a Claim is not returned, that Claim Name SHOULD be omitted from the JSON
object representing the Claims; it SHOULD NOT be present with a null or empty
string value. The sub (subject) Claim MUST always be returned in the UserInfo
Response.

The Client MUST verify that the OP that responded was the intended OP through
a TLS server certificate check, per RFC 6125 [RFC6125].

## 2.3.3.  UserInfo Error Response
When an error condition occurs, the UserInfo Endpoint returns an Error
Response as defined in Section 3 of OAuth 2.0 Bearer Token Usage [RFC6750].

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | [`Client`](classes/Client.md) |

#### Returns

`Promise`<`UserInfo`\>

#### Defined in

[user-info/user-info.ts:64](https://github.com/Q24/oauth-client/blob/fb10545/packages/oauth-client-core/src/user-info/user-info.ts#L64)

___

### getAuthHeader

▸ **getAuthHeader**(`authResult`): `string`

Get the Authorization header for usage with rest calls.

Uses the token type present in the token.

#### Parameters

| Name | Type |
| :------ | :------ |
| `authResult` | [`AuthResult`](interfaces/AuthResult.md) |

#### Returns

`string`

#### Defined in

[authentication/auth-header.ts:8](https://github.com/Q24/oauth-client/blob/fb10545/packages/oauth-client-core/src/authentication/auth-header.ts#L8)

___

### getCsrfResult

▸ **getCsrfResult**(`client`): `Promise`<[`CsrfResult`](interfaces/CsrfResult.md)\>

Get a CSRF Token from the authorization server

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | [`Client`](classes/Client.md) |

#### Returns

`Promise`<[`CsrfResult`](interfaces/CsrfResult.md)\>

#### Defined in

[csrf/csrf.ts:33](https://github.com/Q24/oauth-client/blob/fb10545/packages/oauth-client-core/src/csrf/csrf.ts#L33)

___

### getIdTokenHint

▸ **getIdTokenHint**(`client`, `options?`): `string` \| ``null``

Get the saved id_token_hint string for the current instance from storage
Used when you need to check the if your logged in or not without using access-tokens as a reference

Pass the `{regex: true}` option, to search for any ID Token Hint by regex
During logout, the regex option should be enabled if we are not sure that the *client_id* will remain stable.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `client` | [`Client`](classes/Client.md) | `undefined` |
| `options` | `Object` | `undefined` |
| `options.regex` | `boolean` | `false` |

#### Returns

`string` \| ``null``

#### Defined in

[open-id/id-token-hint.ts:15](https://github.com/Q24/oauth-client/blob/fb10545/packages/oauth-client-core/src/open-id/id-token-hint.ts#L15)

___

### getStoredAuthResult

▸ **getStoredAuthResult**(`client`, `extraAuthResultFilters?`): [`AuthResult`](interfaces/AuthResult.md) \| ``null``

Gets a valid, non-expired token from session storage given a set of validators.

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | [`Client`](classes/Client.md) |
| `extraAuthResultFilters?` | [`AuthResultFilter`](interfaces/AuthResultFilter.md)[] |

#### Returns

[`AuthResult`](interfaces/AuthResult.md) \| ``null``

A valid Token or `null` if no token has been found.

#### Defined in

[authentication/auth-result.ts:94](https://github.com/Q24/oauth-client/blob/fb10545/packages/oauth-client-core/src/authentication/auth-result.ts#L94)

___

### getStoredCsrfToken

▸ **getStoredCsrfToken**(`client`): `string` \| ``null``

Gets the stored CSRF Token from storage

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | [`Client`](classes/Client.md) |

#### Returns

`string` \| ``null``

#### Defined in

[csrf/csrf.ts:17](https://github.com/Q24/oauth-client/blob/fb10545/packages/oauth-client-core/src/csrf/csrf.ts#L17)

___

### isSessionAlive

▸ **isSessionAlive**(`client`): `Promise`<{ `status`: `number`  }\>

Checks if a session is alive. This may be on another platform.
This is normally used in conjunction with a silent logout. It
doesn't extend the lifetime of the current session. If a
session is found, a logout should NOT be triggered.

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | [`Client`](classes/Client.md) |

#### Returns

`Promise`<{ `status`: `number`  }\>

The status code of the HTTP response

#### Defined in

[backend-check/session-alive.ts:12](https://github.com/Q24/oauth-client/blob/fb10545/packages/oauth-client-core/src/backend-check/session-alive.ts#L12)

___

### lazyRefresh

▸ **lazyRefresh**(`client`, `authResult`, `tokenValidationOptions?`): `Promise`<`boolean`\>

Check if the token expires in the next *x* seconds.

If this is the case, a silent refresh will be triggered and the Promise will
resolve to `true`.

If the token does not expire within *x* seconds, the Promise will resolve to
`false` instead.

**`Throws`**

May throw an error if the token we got from the refresh is not valid,
or if the refresh did not succeed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `client` | [`Client`](classes/Client.md) | - |
| `authResult` | [`AuthResult`](interfaces/AuthResult.md) | the token to check |
| `tokenValidationOptions?` | `AuthValidationOptions` & { `almostExpiredThreshold?`: `number`  } | extra validations for the token |

#### Returns

`Promise`<`boolean`\>

A promise.

#### Defined in

[authentication/lazy-refresh.ts:25](https://github.com/Q24/oauth-client/blob/fb10545/packages/oauth-client-core/src/authentication/lazy-refresh.ts#L25)

___

### obtainSession

▸ **obtainSession**(`client`, `authValidationOptions?`): `Promise`<[`AuthResult`](interfaces/AuthResult.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | [`Client`](classes/Client.md) |
| `authValidationOptions?` | `AuthValidationOptions` |

#### Returns

`Promise`<[`AuthResult`](interfaces/AuthResult.md)\>

#### Defined in

[authentication/obtain-session.ts:9](https://github.com/Q24/oauth-client/blob/fb10545/packages/oauth-client-core/src/authentication/obtain-session.ts#L9)

___

### parseIdToken

▸ **parseIdToken**(`token`): [`JWT`](modules.md#jwt)<`IdTokenPayload`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `string` |

#### Returns

[`JWT`](modules.md#jwt)<`IdTokenPayload`\>

#### Defined in

[jwt/parseJwt.ts:45](https://github.com/Q24/oauth-client/blob/fb10545/packages/oauth-client-core/src/jwt/parseJwt.ts#L45)

___

### parseJwt

▸ **parseJwt**<`T`\>(`token`): [`JWT`](modules.md#jwt)<`T`\>

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

[`JWT`](modules.md#jwt)<`T`\>

JSON Web Token

#### Defined in

[jwt/parseJwt.ts:20](https://github.com/Q24/oauth-client/blob/fb10545/packages/oauth-client-core/src/jwt/parseJwt.ts#L20)

___

### silentLogout

▸ **silentLogout**(`client`, `silentLogoutConfig?`): `Promise`<`void`\>

Allows you to initiate a logout of the session in the background via an
iframe.

This logout will not redirect the top-level window to the logged-out page.
It is important that the result of the returning Promise is used to take
an action (e.g. do a redirect to the logout page).

The logout was successful if the iframe ended up on the configured
`post_logout_redirect_uri`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `client` | [`Client`](classes/Client.md) |
| `silentLogoutConfig?` | `SilentLogoutConfig` |

#### Returns

`Promise`<`void`\>

The promise resolves if the logout was successful, otherwise it will reject.

#### Defined in

[authentication/silent-logout.ts:33](https://github.com/Q24/oauth-client/blob/fb10545/packages/oauth-client-core/src/authentication/silent-logout.ts#L33)
