import { KeycloakService } from "keycloak-angular";
import { environment } from "src/environments/environment";
export function initializeKeycloak(
  keycloak: KeycloakService
): () => Promise<any> {
  console.log("Initilazing the security...");
  console.log("Api: ", environment.billingApi);

  return (): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      try {
        await keycloak.init({
          config: {
            url: environment.keycloak.issuer,
            realm: environment.keycloak.realm,
            clientId: environment.keycloak.clientId,
          },
          loadUserProfileAtStartUp: true,
          initOptions: {
            onLoad: "login-required",
            checkLoginIframe: true,
          },
          bearerExcludedUrls: [],
        });
        resolve();
      } catch (error) {
        console.log(error + "err");
        reject(error);
      }
    });
  };
}
