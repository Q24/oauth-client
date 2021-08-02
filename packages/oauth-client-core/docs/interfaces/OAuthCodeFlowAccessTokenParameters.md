[@ilionx/oauth-client-core](../README.md) / [Exports](../modules.md) / OAuthCodeFlowAccessTokenParameters

# Interface: OAuthCodeFlowAccessTokenParameters

## Table of contents

### Properties

- [client\_id](OAuthCodeFlowAccessTokenParameters.md#client_id)
- [code](OAuthCodeFlowAccessTokenParameters.md#code)
- [code\_verifier](OAuthCodeFlowAccessTokenParameters.md#code_verifier)
- [grant\_type](OAuthCodeFlowAccessTokenParameters.md#grant_type)
- [redirect\_uri](OAuthCodeFlowAccessTokenParameters.md#redirect_uri)

## Properties

### client\_id

• **client\_id**: `string`

REQUIRED, if the client is not authenticating with the authorization server
as described in Section 3.2.1.

#### Defined in

[flows/code-flow/model/access-token-request.model.ts:19](https://github.com/Q24/oauth-client/blob/d927bd3/packages/oauth-client-core/src/flows/code-flow/model/access-token-request.model.ts#L19)

___

### code

• **code**: `string`

The authorization code received from the authorization server.

#### Defined in

[flows/code-flow/model/access-token-request.model.ts:7](https://github.com/Q24/oauth-client/blob/d927bd3/packages/oauth-client-core/src/flows/code-flow/model/access-token-request.model.ts#L7)

___

### code\_verifier

• **code\_verifier**: `string`

Code verifier

#### Defined in

[flows/code-flow/model/access-token-request.model.ts:23](https://github.com/Q24/oauth-client/blob/d927bd3/packages/oauth-client-core/src/flows/code-flow/model/access-token-request.model.ts#L23)

___

### grant\_type

• **grant\_type**: ``"authorization_code"``

#### Defined in

[flows/code-flow/model/access-token-request.model.ts:2](https://github.com/Q24/oauth-client/blob/d927bd3/packages/oauth-client-core/src/flows/code-flow/model/access-token-request.model.ts#L2)

___

### redirect\_uri

• **redirect\_uri**: `string`

REQUIRED, if the "redirect_uri" parameter was included in the authorization
request as described in Section 4.1.1, and their values MUST be identical.

#### Defined in

[flows/code-flow/model/access-token-request.model.ts:13](https://github.com/Q24/oauth-client/blob/d927bd3/packages/oauth-client-core/src/flows/code-flow/model/access-token-request.model.ts#L13)
