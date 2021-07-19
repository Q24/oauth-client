import { getState } from "../utils/stateUtil";
import { clearQueryParameters } from "../utils/url/clear-query-parameters";
import { getQueryParameters } from "../utils/url/get-query-parameters";
import { OAuthCodeFlowAuthorizeResponse } from "./model/authorization-response.model";

export function getValidCodeFromUrlAndCleanUrl(): string | null {
  const oAuthCodeFlowAuthorizeResponse =
    getQueryParameters<OAuthCodeFlowAuthorizeResponse>();

  if (oAuthCodeFlowAuthorizeResponse.state !== getState()) {
    return null;
  }

  if (oAuthCodeFlowAuthorizeResponse.code) {
    clearQueryParameters();
    return oAuthCodeFlowAuthorizeResponse.code;
  }

  return null;
}
