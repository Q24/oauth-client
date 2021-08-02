import { OAuthCodeFlowAuthorizeResponse } from "./model/authorization-response.model";
import {getState} from '../../utils/state';
import {getSearchParameters} from '../../utils/url';

export function getCodeFromUrl(): string | null {
  const oAuthCodeFlowAuthorizeResponse =
    getSearchParameters<OAuthCodeFlowAuthorizeResponse>();

  if (oAuthCodeFlowAuthorizeResponse.state !== getState()) {
    return null;
  }

  return oAuthCodeFlowAuthorizeResponse.code;
}
