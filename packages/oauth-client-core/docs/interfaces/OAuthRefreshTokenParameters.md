[@ilionx/oauth-client-core](../README.md) / [Exports](../modules.md) / OAuthRefreshTokenParameters

# Interface: OAuthRefreshTokenParameters

## Table of contents

### Properties

- [grant\_type](OAuthRefreshTokenParameters.md#grant_type)
- [refresh\_token](OAuthRefreshTokenParameters.md#refresh_token)
- [scope](OAuthRefreshTokenParameters.md#scope)

## Properties

### grant\_type

• **grant\_type**: ``"refresh_token"``

#### Defined in

[flows/code-flow/model/refresh-token-request.model.ts:2](https://github.com/Q24/oauth-client/blob/d927bd3/packages/oauth-client-core/src/flows/code-flow/model/refresh-token-request.model.ts#L2)

___

### refresh\_token

• **refresh\_token**: `string`

The refresh token issued to the client.

#### Defined in

[flows/code-flow/model/refresh-token-request.model.ts:7](https://github.com/Q24/oauth-client/blob/d927bd3/packages/oauth-client-core/src/flows/code-flow/model/refresh-token-request.model.ts#L7)

___

### scope

• `Optional` **scope**: `string`

The scope of the access request as described by Section 3.3.  The requested
scope MUST NOT include any scope not originally granted by the resource
owner, and if omitted is treated as equal to the scope originally granted
by the resource owner.

#### Defined in

[flows/code-flow/model/refresh-token-request.model.ts:15](https://github.com/Q24/oauth-client/blob/d927bd3/packages/oauth-client-core/src/flows/code-flow/model/refresh-token-request.model.ts#L15)
