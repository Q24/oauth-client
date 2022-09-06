import { cleanSessionStorage, silentLogout } from "@ilionx/oauth-client-core";

silentLogout()
  .then(() => {
    cleanSessionStorage();
  })
  .catch(() => {
    // Handle errors when logout has failed.
  });
