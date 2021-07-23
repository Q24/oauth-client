import { isAuthResult } from "../authentication/auth-result";
import { AuthResult } from "../jwt/model/auth-result.model";
import { LogUtil } from "../utils/logUtil";
import { StorageUtil } from "../utils/storageUtil";

export function getAuthResultFromUrl(): AuthResult | null {
  const hashString = getHashStringFromUrl();
  const authResultFromUrl =
    convertHashStringToObject<Partial<AuthResult>>(hashString);

  if (!isAuthResult(authResultFromUrl)) {
    LogUtil.error("");
    return null;
  }
  return authResultFromUrl;
}

export function getAuthResultFromStoredHash(): AuthResult | null {
  const hashString = getStoredHashString();
  if (!hashString) {
    return null;
  }
  return convertHashStringToObject<AuthResult>(hashString);
}

export function getHashStringFromUrl(): string {
  return window.location.hash.substring(1);
}

export function getStoredHashString(): string | null {
  return StorageUtil.read("hash_fragment");
}

export function deleteStoredHashString(): void {
  StorageUtil.remove("hash_fragment");
}

export function convertHashStringToObject<T>(hashFragment: string): T {
  const result = {} as T;
  let urlVariablesToParse;

  if (hashFragment) {
    urlVariablesToParse = hashFragment.split("&");

    for (const urlVar of urlVariablesToParse) {
      const parameter = urlVar.split("=");
      result[parameter[0]] = parameter[1];
    }
  }

  return result;
}
