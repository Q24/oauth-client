import { Client } from "../../client";
import { getState } from "../../utils/state";
import { getSearchParameters } from "../../utils/url";

import type { OAuthCodeFlowAuthorizeResponse } from "./model/authorization-response.model";

export function getCodeFromUrl(client: Client): string | null {
  const oAuthCodeFlowAuthorizeResponse =
    getSearchParameters<OAuthCodeFlowAuthorizeResponse>();

  client.logger.debug(
    "comparing state from response to state from request",
    "response",
    oAuthCodeFlowAuthorizeResponse,
  );

  const requestState = getState(client);

  if (oAuthCodeFlowAuthorizeResponse.state !== requestState) {
    client.logger.warn(
      "State from response was not the same as the state from the request",
      "response state",
      oAuthCodeFlowAuthorizeResponse.state,
      "request state",
      requestState,
    );
    return null;
  }

  client.logger.debug("state is the same; returning the code");

  return oAuthCodeFlowAuthorizeResponse.code;
}
