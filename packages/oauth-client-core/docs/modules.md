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

### Type aliases

- [AuthorizeErrors](modules.md#authorizeerrors)

### Variables

- [AUTHORIZE\_ERRORS](modules.md#authorize_errors)
- [config](modules.md#config)

### Functions

- [accessTokenScopeFilter](modules.md#accesstokenscopefilter)
- [cleanHashFragment](modules.md#cleanhashfragment)
- [cleanSessionStorage](modules.md#cleansessionstorage)
- [configure](modules.md#configure)
- [deleteStoredAuthResults](modules.md#deletestoredauthresults)
- [discovery](modules.md#discovery)
- [getAuthHeader](modules.md#getauthheader)
- [getCsrfResult](modules.md#getcsrfresult)
- [getIdTokenHint](modules.md#getidtokenhint)
- [getStoredAuthResult](modules.md#getstoredauthresult)
- [getStoredCsrfToken](modules.md#getstoredcsrftoken)
- [getUserInfo](modules.md#getuserinfo)
- [isSessionAlive](modules.md#issessionalive)
- [lazyRefresh](modules.md#lazyrefresh)
- [obtainSession](modules.md#obtainsession)
- [parseIdToken](modules.md#parseidtoken)
- [parseJwt](modules.md#parsejwt)
- [silentLogout](modules.md#silentlogout)
- [silentRefresh](modules.md#silentrefresh)

## Type aliases

### AuthorizeErrors

Ƭ **AuthorizeErrors**: ``"invalid_client"`` \| ``"unauthorized_client"`` \| ``"invalid_grant"`` \| ``"unsupported_grant_type"`` \| ``"invalid_scope"`` \| ``"invalid_request_response_type"`` \| ``"invalid_request_type"`` \| ``"invalid_request_openid_type"`` \| ``"invalid_request_redirect_uri"`` \| ``"invalid_request_signature"`` \| ``"invalid_request_realm"`` \| ``"invalid_request_atype"`` \| ``"invalid_request_recipient"``

A set of strings to match when the Authorize redirect is erroring. This is the complete list of possible error to handle.

#### Defined in

authentication/model/authorize-errors.model.ts:4

## Variables

### AUTHORIZE\_ERRORS

• `Const` **AUTHORIZE\_ERRORS**: [`AuthorizeErrors`](modules.md#authorizeerrors)[]

#### Defined in

authentication/utils/authorize-errors.ts:3

___

### config

• `Let` **config**: [`OAuthClientConfig`](interfaces/OAuthClientConfig.md)

#### Defined in

configuration/config.service.ts:3

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

auth-result-filter/access-token-scope-filter.ts:12

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

utils/urlUtil.ts:122

___

### cleanSessionStorage

▸ **cleanSessionStorage**(): `void`

Cleans up the current session: deletes the stored local tokens, state, nonce,
id token hint, CSRF token, json web key set, id provider metadata, user info.

#### Returns

`void`

#### Defined in

utils/clean-storage.ts:14

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

configuration/config.service.ts:5

___

### deleteStoredAuthResults

▸ **deleteStoredAuthResults**(`authResultFilter?`): `void`

Deletes all the auth results from the storage. If authResultFilter is passed
in, only a subset will be deleted.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `authResultFilter?` | (`authResult`: `Readonly`<[`AuthResult`](interfaces/AuthResult.md)\>) => `boolean` | if specified, the authResultFilter is called for every auth result in the store. If a authResultFilter callback returns true, the auth result will remain in the store. Otherwise, it will be deleted (Just like Array.prototype.filter()) |

#### Returns

`void`

#### Defined in

authentication/utils/auth-result.ts:20

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

discovery/discovery.ts:24

___

### getAuthHeader

▸ **getAuthHeader**(`authResult`): `string`

Get the Authorisation header for usage with rest calls.

Uses the token type present in the token.

#### Parameters

| Name | Type |
| :------ | :------ |
| `authResult` | [`AuthResult`](interfaces/AuthResult.md) |

#### Returns

`string`

#### Defined in

authentication/utils/auth-header.ts:8

___

### getCsrfResult

▸ **getCsrfResult**(): `Promise`<[`CsrfResult`](interfaces/CsrfResult.md)\>

Get a CSRF Token from the authorization server

#### Returns

`Promise`<[`CsrfResult`](interfaces/CsrfResult.md)\>

#### Defined in

csrf/csrf.ts:34

___

### getIdTokenHint

▸ **getIdTokenHint**(`options?`): `string` \| ``null``

Get the saved id_token_hint string for the current instance from storage
Used when you need to check the if your logged in or not without using access-tokens as a reference

Pass the `{regex: true}` option, to search for any ID Token Hint by regex
During logout, the regex option should be enabled if we are not sure that the *client_id* will remain stable.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `options` | `Object` | `undefined` |
| `options.regex` | `boolean` | `false` |

#### Returns

`string` \| ``null``

#### Defined in

authentication/utils/id-token-hint.ts:15

___

### getStoredAuthResult

▸ **getStoredAuthResult**(`authResultFilters?`): [`AuthResult`](interfaces/AuthResult.md) \| ``null``

Gets a valid, non-expired token from session storage given a set of validators.

#### Parameters

| Name | Type |
| :------ | :------ |
| `authResultFilters?` | [`AuthResultFilter`](interfaces/AuthResultFilter.md)[] |

#### Returns

[`AuthResult`](interfaces/AuthResult.md) \| ``null``

A valid Token or `null` if no token has been found.

#### Defined in

authentication/utils/auth-result.ts:95

___

### getStoredCsrfToken

▸ **getStoredCsrfToken**(): `string` \| ``null``

Gets the stored CSRF Token from storage

#### Returns

`string` \| ``null``

#### Defined in

csrf/csrf.ts:17

___

### getUserInfo

▸ **getUserInfo**(): `Promise`<`UserInfo`\>

tries to get the local user info; if not found, get the remote user info.

#### Returns

`Promise`<`UserInfo`\>

the user info

#### Defined in

user-info/getUserInfo.ts:125

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

backend-check/session-alive.ts:13

___

### lazyRefresh

▸ **lazyRefresh**(`authResult`, `tokenValidationOptions?`): `Promise`<`void`\>

Check if the token expires in the next *x* seconds.

If this is the case, a silent refresh will be triggered and the Promise will
resolve to `true`.

If the token does not expire within *x* seconds, the Promise will resolve to
`false` instead.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `authResult` | [`AuthResult`](interfaces/AuthResult.md) | the token to check |
| `tokenValidationOptions?` | `AuthValidationOptions` & { `almostExpiredThreshold?`: `number`  } | extra validations for the token |

#### Returns

`Promise`<`void`\>

A promise. May throw an error if the token we got from the refresh
is not valid.

#### Defined in

authentication/lazy-refresh.ts:20

___

### obtainSession

▸ **obtainSession**(`authValidationOptions?`): `Promise`<[`AuthResult`](interfaces/AuthResult.md)\>

Checks if there is a session available.
If this is not available, redirect to the authorization page.

Before starting with checks, we flush state if needed (in case of session upgrade i.e.)
1. If there is a valid auth result already stored, we are done.
2. Else, if we may refresh in the background, try to do that.
3. Else, if there is an *id_token* in the URL;
  - a. Validate that the state from the response is equal to the state previously generated on the client.
  - b. Validate token from URL with Backend
  - c. Store the token
  - d. Get a new CSRF token from Authorization with the newly created session, and save it for i.e. logout usage
4. Else, if there's a session_upgrade_token in the URL, call the session upgrade function
5. Else, Nothing found anywhere, so redirect to authorization

**`throws`** It will reject (as well as redirect) in case the check did not pass.

#### Parameters

| Name | Type |
| :------ | :------ |
| `authValidationOptions?` | `AuthValidationOptions` |

#### Returns

`Promise`<[`AuthResult`](interfaces/AuthResult.md)\>

An auth result

#### Defined in

authentication/obtain-session.ts:43

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

jwt/parseJwt.ts:45

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

jwt/parseJwt.ts:27

___

### silentLogout

▸ **silentLogout**(`url?`): `Promise`<`void`\>

Allows you to initiate a logout of the session in the background via an
iframe.

This logout will not redirect the top-level window to the logged-out page.
It is important that the result of the returning Promise is used to take
an action (e.g. do a redirect to the logout page).

The logout was successful if the iframe ended up on the configured
`post_logout_redirect_uri`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `undefined` \| `string` | A URL pointing to a *page*. This *page* should make a POST request to the logout endpoint of the SSO server in an automated fashion, which will cause the user to be logged out. The `id_token_hint` and `csrf_token` will be supplied to the *page* via this function. Defaults to `silent_logout_uri` from the config. |

#### Returns

`Promise`<`void`\>

The promise resolves if the logout was successful, otherwise it will reject.

#### Defined in

authentication/silent-logout.ts:29

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

authentication/silent-refresh.ts:48
