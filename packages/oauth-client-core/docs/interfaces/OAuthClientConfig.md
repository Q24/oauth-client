[@ilionx/oauth-client-core](../README.md) / [Exports](../modules.md) / OAuthClientConfig

# Interface: OAuthClientConfig

Config Object for OIDC Service

## Table of contents

### Properties

- [client_id](OAuthClientclient.config.md#client_id)
- [csrf_token_endpoint](OAuthClientclient.config.md#csrf_token_endpoint)
- [debug](OAuthClientclient.config.md#debug)
- [defaultAuthResultFilters](OAuthClientclient.config.md#defaultauthresultfilters)
- [is_session_alive_endpoint](OAuthClientclient.config.md#is_session_alive_endpoint)
- [issuedAtMaxOffset](OAuthClientclient.config.md#issuedatmaxoffset)
- [issuer](OAuthClientclient.config.md#issuer)
- [login_hint](OAuthClientclient.config.md#login_hint)
- [post_logout_redirect_uri](OAuthClientclient.config.md#post_logout_redirect_uri)
- [redirect_uri](OAuthClientclient.config.md#redirect_uri)
- [response_type](OAuthClientclient.config.md#response_type)
- [scope](OAuthClientclient.config.md#scope)
- [silent_logout_uri](OAuthClientclient.config.md#silent_logout_uri)
- [silent_refresh_uri](OAuthClientclient.config.md#silent_refresh_uri)
- [trusted_audiences](OAuthClientclient.config.md#trusted_audiences)
- [validate_token_endpoint](OAuthClientclient.config.md#validate_token_endpoint)

## Properties

### client_id

• **client_id**: `string`

Set the ID of your client

#### Defined in

[configuration/model/client.config.model.ts:10](https://github.com/Q24/oauth-client/blob/5af8134/packages/oauth-client-core/src/configuration/model/client.config.model.ts#L10)

---

### csrf_token_endpoint

• `Optional` **csrf_token_endpoint**: `string`

CSRF token endpoint

#### Defined in

[configuration/model/client.config.model.ts:47](https://github.com/Q24/oauth-client/blob/5af8134/packages/oauth-client-core/src/configuration/model/client.config.model.ts#L47)

---

### debug

• `Optional` **debug**: `boolean`

Verbose logging of inner workings of the package.

#### Defined in

[configuration/model/client.config.model.ts:62](https://github.com/Q24/oauth-client/blob/5af8134/packages/oauth-client-core/src/configuration/model/client.config.model.ts#L62)

---

### defaultAuthResultFilters

• `Optional` **defaultAuthResultFilters**: [`AuthResultFilter`](AuthResultFilter.md)[]

A list of filters each auth result must adhere to.

#### Defined in

[configuration/model/client.config.model.ts:84](https://github.com/Q24/oauth-client/blob/5af8134/packages/oauth-client-core/src/configuration/model/client.config.model.ts#L84)

---

### is_session_alive_endpoint

• `Optional` **is_session_alive_endpoint**: `string`

Endpoint for checking if a session is still used somewhere

#### Defined in

[configuration/model/client.config.model.ts:57](https://github.com/Q24/oauth-client/blob/5af8134/packages/oauth-client-core/src/configuration/model/client.config.model.ts#L57)

---

### issuedAtMaxOffset

• `Optional` **issuedAtMaxOffset**: `number`

The maximum time to pass between the issuance and consumption of an
authentication result.

#### Defined in

[configuration/model/client.config.model.ts:74](https://github.com/Q24/oauth-client/blob/5af8134/packages/oauth-client-core/src/configuration/model/client.config.model.ts#L74)

---

### issuer

• **issuer**: `string`

The base issuer URL.

#### Defined in

[configuration/model/client.config.model.ts:79](https://github.com/Q24/oauth-client/blob/5af8134/packages/oauth-client-core/src/configuration/model/client.config.model.ts#L79)

---

### login_hint

• `Optional` **login_hint**: `string`

Hint to the Authorization Server about the login identifier the End-User
might use to log in (if necessary). This hint can be used by a Relying
Party (RP) if it first asks the End-User for their e-mail address (or other
identifier) and then wants to pass that value as a hint to the discovered
authorization service. It is RECOMMENDED that the hint value match the
value used for discovery. This value MAY also be a phone number in the
format specified for the `phone_number` Claim. The use of this parameter is
left to the OpenID Provider's discretion.

#### Defined in

[configuration/model/client.config.model.ts:96](https://github.com/Q24/oauth-client/blob/5af8134/packages/oauth-client-core/src/configuration/model/client.config.model.ts#L96)

---

### post_logout_redirect_uri

• `Optional` **post_logout_redirect_uri**: `string`

The URL you want to be redirected to after logging out

#### Defined in

[configuration/model/client.config.model.ts:36](https://github.com/Q24/oauth-client/blob/5af8134/packages/oauth-client-core/src/configuration/model/client.config.model.ts#L36)

---

### redirect_uri

• **redirect_uri**: `string`

The URL you want to be redirected to after redirect from Authorization

#### Defined in

[configuration/model/client.config.model.ts:21](https://github.com/Q24/oauth-client/blob/5af8134/packages/oauth-client-core/src/configuration/model/client.config.model.ts#L21)

---

### response_type

• **response_type**: `"id_token"` \| `"id_token token"` \| `"code"`

What type of token(s) you wish to receive
In case op Open Id Connect this is usually `token id_token`

#### Defined in

[configuration/model/client.config.model.ts:16](https://github.com/Q24/oauth-client/blob/5af8134/packages/oauth-client-core/src/configuration/model/client.config.model.ts#L16)

---

### scope

• **scope**: `string`

Define the scopes you want access to. Each scope is separated by space.
When using Open Id Connect, scope `openid` is mandatory

#### Defined in

[configuration/model/client.config.model.ts:42](https://github.com/Q24/oauth-client/blob/5af8134/packages/oauth-client-core/src/configuration/model/client.config.model.ts#L42)

---

### silent_logout_uri

• `Optional` **silent_logout_uri**: `string`

The URL you want to use for a silent Logout, if your stack supports it.

#### Defined in

[configuration/model/client.config.model.ts:31](https://github.com/Q24/oauth-client/blob/5af8134/packages/oauth-client-core/src/configuration/model/client.config.model.ts#L31)

---

### silent_refresh_uri

• `Optional` **silent_refresh_uri**: `string`

The URL you want to be redirected to after redirect from Authorization, while doing a silent access token refresh

#### Defined in

[configuration/model/client.config.model.ts:26](https://github.com/Q24/oauth-client/blob/5af8134/packages/oauth-client-core/src/configuration/model/client.config.model.ts#L26)

---

### trusted_audiences

• `Optional` **trusted_audiences**: `string`[]

Audiences (client_ids) other than the current client which are allowed in
the audiences claim.

#### Defined in

[configuration/model/client.config.model.ts:68](https://github.com/Q24/oauth-client/blob/5af8134/packages/oauth-client-core/src/configuration/model/client.config.model.ts#L68)

---

### validate_token_endpoint

• `Optional` **validate_token_endpoint**: `string`

Validate received token endpoint

#### Defined in

[configuration/model/client.config.model.ts:52](https://github.com/Q24/oauth-client/blob/5af8134/packages/oauth-client-core/src/configuration/model/client.config.model.ts#L52)
