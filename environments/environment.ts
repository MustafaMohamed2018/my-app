// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
  	apiKey: "AIzaSyAJWrxGSDpWUIY5xIG6jwCmuwUlSrvrjgU",
    authDomain: "my-new-project-6e78e.firebaseapp.com",
    databaseURL: "https://my-new-project-6e78e.firebaseio.com",
    projectId: "my-new-project-6e78e",
    storageBucket: "my-new-project-6e78e.appspot.com",
    messagingSenderId: "1069031613907"
  }
};
