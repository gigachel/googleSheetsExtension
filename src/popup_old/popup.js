// from https://developers.google.com/sheets/api/quickstart/js
// !!! For web-application type need verify project or add to group 'Risky Access Permissions By Unreviewed Apps' (https://groups.google.com/forum/#!forum/risky-access-by-unreviewed-apps)

var authorizeButton = document.getElementById('authorize-button');
var signOutButton = document.getElementById('signout-button');
var accessToken = "";

document.addEventListener("DOMContentLoaded", function() {
  handleClientLoad();
});

authorizeButton.addEventListener("click", function() {
  auth()
  .then(function(token) {
    console.log(token, "tokkk");
  })
  .catch(function(error) {
    console.log(error, "errorrrrrrrrrr");
  });
});

signOutButton.addEventListener("click", function() {
  signOut();
});


function handleClientLoad() {
  return Promise.resolve()
  .then(function() {
    return checkAuth();
  })
  // .then(function(token) {
  //   if (token) return token;
  //   // else return auth();
  //   else throw "need auth";
  // })
  .then(function(token) {
    accessToken = token; // global...
    return loadSheetsApi(token);
  })
  .then(function() {
    listMajors();
  })
  .catch(function(error) {
    console.log(error, "error");
  });
}

function loadSheetsApi(token) {
  return new Promise(function(resolve, reject) {
    gapi.load('client', function() {
      // gapi.client.setApiKey('AIzaSyC8_iaQV4ql8q7m8_9zS6dVh-O-Nkxd_jo');
      gapi.client.setToken({ access_token: token });
      gapi.client.load('sheets', 'v4', resolve);
    });
  });
}

function signOut(accessToken222222222) {
  console.log(accessToken, "accessToken");
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://accounts.google.com/o/oauth2/revoke?token=' + accessToken);
  xhr.send();

  chrome.identity.removeCachedAuthToken({ token: accessToken });
}


function auth() {
  return new Promise(function(resolve, reject) {
    chrome.identity.getAuthToken({ interactive: true }, function(token) {
      console.log(token, "token 1");
      if (chrome.runtime.lastError) console.log(chrome.runtime.lastError, "chrome.runtime.lastError 1");
      if (token) {
        resolve(token);
      } else {
        // chrome.identity.getAuthToken({ interactive: false }, function(token) { // HACK call getAuthToken twice when new auth
        //   console.log(token, "token 2");
        //   if (chrome.runtime.lastError) console.log(chrome.runtime.lastError, "chrome.runtime.lastError 2");
        //
        //   if (token) resolve(token);
        //   else reject("getAuthToken don't return valid token");
        // });

        checkAuth() // HACK call getAuthToken twice when new auth, in second with interactive: false
        .then(resolve)
        .catch(reject);

      }
    });
  });
}

function checkAuth() {
  return new Promise(function(resolve, reject) {
    chrome.identity.getAuthToken({ interactive: false }, function(token) {
      if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
      resolve(token);
      // if (token) resolve(token);
      // else reject("need auth");
    });
  });
}




var config = {};
var token = null;
var logger = console;

function init(cfg, log) {
  config = cfg;
  logger = log;
}

function getLastToken() {
  return token;
}

function login(config, callback) {
  var authUrl = config.implicitGrantUrl
      + '?response_type=token&client_id=' + config.clientId
      + '&scope=' + config.scopes
      + '&redirect_uri=' + chrome.identity.getRedirectURL("oauth2");

  logger.debug('launchWebAuthFlow:', authUrl);

  chrome.identity.launchWebAuthFlow({'url': authUrl, 'interactive': true}, function (redirectUrl) {
    if (redirectUrl) {
      logger.debug('launchWebAuthFlow login successful: ', redirectUrl);
      var parsed = parse(redirectUrl.substr(chrome.identity.getRedirectURL("oauth2").length + 1));
      token = parsed.access_token;
      logger.debug('Background login complete');
      return callback(redirectUrl); // call the original callback now that we've intercepted what we needed
    } else {
      logger.debug("launchWebAuthFlow login failed. Is your redirect URL (" + chrome.identity.getRedirectURL("oauth2") + ") configured with your OAuth2 provider?");
      return (null);
    }
  });
}

function logout(config, callback) {
  var logoutUrl = config.logoutUrl;

  chrome.identity.launchWebAuthFlow({'url': logoutUrl, 'interactive': false}, function (redirectUrl) {
    logger.debug('launchWebAuthFlow logout complete');
    return callback(redirectUrl)
  });
}

function parse(str) {
  if (typeof str !== 'string') {
    return {};
  }
  str = str.trim().replace(/^(\?|#|&)/, '');
  if (!str) {
    return {};
  }
  return str.split('&').reduce(function (ret, param) {
    var parts = param.replace(/\+/g, ' ').split('=');
    // Firefox (pre 40) decodes `%3D` to `=`
    // https://github.com/sindresorhus/query-string/pull/37
    var key = parts.shift();
    var val = parts.length > 0 ? parts.join('=') : undefined;
    key = decodeURIComponent(key);
    // missing `=` should be `null`:
    // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
    val = val === undefined ? null : decodeURIComponent(val);
    if (!ret.hasOwnProperty(key)) {
      ret[key] = val;
    }
    else if (Array.isArray(ret[key])) {
      ret[key].push(val);
    }
    else {
      ret[key] = [ret[key], val];
    }
    return ret;
  }, {});
}











/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  console.log("initClient");
  gapi.client.init({
    discoveryDocs: DISCOVERY_DOCS,
    clientId: CLIENT_ID,
    scope: SCOPES
  })
  .then(function () {
    // Listen for sign-in state changes.
    console.log("then");
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    console.log(gapi.auth2.getAuthInstance().isSignedIn.get(), "gapi.auth2.getAuthInstance().isSignedIn.get()");
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    authorizeButton.onclick = handleAuthClick;
    signoutButton.onclick = handleSignoutClick;
  });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'block';
    listMajors();
  } else {
    authorizeButton.style.display = 'block';
    signoutButton.style.display = 'none';
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
  console.log(gapi.auth2, "gapi.auth2");
  gapi.auth2.getAuthInstance().signOut();
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
  var pre = document.getElementById('content');
  var textContent = document.createTextNode(message + '\n');
  pre.appendChild(textContent);
}

/**
 * Print the names and majors of students in a sample spreadsheet:
 * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 */
function listMajors() {
  console.log("listMajors");
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
    range: 'Class Data!A2:E',
  }).then(function(response) {
    var range = response.result;
    if (range.values.length > 0) {
      appendPre('Name, Major:');
      for (i = 0; i < range.values.length; i++) {
        var row = range.values[i];
        // Print columns A and E, which correspond to indices 0 and 4.
        appendPre(row[0] + ', ' + row[4]);
      }
    } else {
      appendPre('No data found.');
    }
  }, function(response) {
    console.log(response, "response");
    if (response.status === 403) {
      // return auth()
      // .then(function() {
      //   listMajors();
      // });
    } else {
      appendPre('Error: ' + response.result.error.message);
    }
  });
}
