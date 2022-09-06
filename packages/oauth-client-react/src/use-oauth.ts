import { useContext } from "react";
import { OAuthContext, OAuthContextInterface } from "./oauth-context";

export function useOAuth(): OAuthContextInterface {
  const value = useContext(OAuthContext);

  if (value === null) {
    throw new Error("useOAuth must be used within an OAuthProvider");
  }

  return value;
}
