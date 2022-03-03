# example-web-app
Learn how to use the SCINARIO SDK 

This repository contains a simple, plain JavaScript version of a web application.
The SCINARIO specific sample code comes alongside with modern web application artefacts like images, web manifest, and service worker code.

This example does not include any web server. Run this code on your favorite server, like:
- NodeJS: https://www.npmjs.com/package/lite-server
- Python: https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server
- PHP: https://www.php.net/manual/features.commandline.webserver.php

## Configuration

Inside the main `index.html` file there are various constants defined that have to be adjusted when this sample code should be run in your environment. Those constants are:

| name | description |
| - | - |
| SCINARIO_INSTANCE_URL | Absolute URL pointing to your SCINARIO instance. See the registration mail for details |
| SCINARIO_CLIENT_NAME | The client name of your SCINARIO instance. See the registration mail for details |
| SCINARIO_USER_NAME | The user name or email address you use to sign in |
| SCINARIO_PASSWORD | The password to use with above |

## Code walkthrough

The main JavaScript code (in `main.js`) is loaded in the index file. When loaded, it does the following:
- Load the SDK in `loadSDK()`
- When SDK is loaded, the setup is done in `setup()`, signing in the user using the configuration from the index file, and fetching data from the API. Resulting records or error messages are rendered to the screen.

Within all the boilerplate code, see the SCINARIO specific details within the call of the `setup()` function:

```javascript
// Set parameters, this is only necessary 
// when not hosted on SCNARIO SaaS or when calling the API from a different origin
await scinario.initialize({host: SCINARIO_INSTANCE_URL, client: SCINARIO_CLIENT_NAME});

// Get user session
scinario.signin({username: SCINARIO_USER_NAME, password: SCINARIO_PASSWORD})
    .then( async record => {

        // Once authenticated you can query 
        // every model, for example other users
        const model = new scinario.Model('core/Users');
        const allUsers = await model.find();

        console.log('All users', allUsers);
    })
    .catch( error => {

        // When error occurs show message in console
        console.error(error.message);
    })
```