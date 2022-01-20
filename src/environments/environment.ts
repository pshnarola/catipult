// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl:'https://test-api.catipult.ai/api', // test AWS api CDN, SSL 
  // imgUrl:'https://test-api.catipult.ai/', 
  // apiUrl: "https://api.catipult.ai/api", // prod API on TMD Hosting
  imgUrl: "https://api.catipult.ai/",
  // videoUrl:'https://s3.amazonaws.com/catipult.ai.assets/videos/',
  videoUrl:'https://d3dbf8p1iggu5z.cloudfront.net/videos/',
  imageUrl:'https://d3dbf8p1iggu5z.cloudfront.net/images/',
  version: '2.07.061'
};

// mobile
// apiUrl: 'http://192.168.43.28:2004/api'
// Local
// apiUrl: 'http://192.168.3.125:2004/api'

// catipult
// apiUrl: 'http://52.172.204.222:2004/api'
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
