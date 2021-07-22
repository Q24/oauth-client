import { getState } from "../utils/stateUtil";
import { getQueryParameters } from "../utils/url/get-query-parameters";
import { OAuthCodeFlowAuthorizeResponse } from "./model/authorization-response.model";

export function getCodeFromUrl(): string | null {
  const oAuthCodeFlowAuthorizeResponse =
    getQueryParameters<OAuthCodeFlowAuthorizeResponse>();

  if (oAuthCodeFlowAuthorizeResponse.state !== getState()) {
    return null;
  }

  return oAuthCodeFlowAuthorizeResponse.code;
}
