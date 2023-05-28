// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //billingApi: 'http://192.168.75.22:1200',
  billingApi: "http://localhost:9090",
  //pacexApi: "http://localhost:9091",
  //pacexApi: 'http://192.168.75.22',
  keycloak: {
    // issuer: 'http://192.168.75.189:9090/auth',
    issuer: "http://localhost:8080/",
    realm: 'stock',
    clientId: 'stock-client'
    // realm: "pacex-web",
    // clientId: "pacex-web-client-dev",
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.