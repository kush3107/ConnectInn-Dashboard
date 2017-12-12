// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,

  apiBaseURL: 'http://api.connectinn.tk/api',
  firebase: {
    apiKey: 'AIzaSyDaB5pdNpfHr27qrX3msOHcaRihNWmXbxQ',
    databaseURL: 'https://connectinn-tk.firebaseio.com/',
    projectId: 'connectinn-tk',
  }
};
