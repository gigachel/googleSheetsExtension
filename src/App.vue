<template lang="html">
  <div>
    <h1>Hello {{ name }}</h1>
    <button v-on:click="onClick">Button</button>
  </div>
</template>

<script>

  // Client ID and API key from the Developer Console
  var CLIENT_ID = '695856259469-kn1d6mp1r140cpsc7vh2jgjc238c9vli.apps.googleusercontent.com';
  var API_KEY = 'AIzaSyC8_iaQV4ql8q7m8_9zS6dVh-O-Nkxd_jo';

  // Array of API discovery doc URLs for APIs used by the quickstart
  var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  var SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

  var authorizeButton = document.getElementById('authorize-button');
  var signoutButton = document.getElementById('signout-button');
ggee
  handleClientLoad()

  /**
   *  On load, called to load the auth2 library and API client library.
   */
  function handleClientLoad() {
    gapi.load('client:auth2', initClient);
  }

  /**
   *  Initializes the API client library and sets up sign-in state
   *  listeners.
   */
  function initClient() {
    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
    }).then(function () {
      // Listen for sign-in state changes.
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

      // Handle the initial sign-in state.
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
    gapi.client.sheets.spreadsheets.values.get({
      // spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
      spreadsheetId: '1Z-c1NtfOn0AZcia4-sc7pTVDMv_IEkebh9ul1-9xmKE',
      // range: 'Class Data!A2:E',
      range: 'Китайские!A2:B',
    })
    .then(function(response) {
      var range = response.result;
      if (range.values.length > 0) {
        appendPre('Name, Major:');
        for (var i = 0; i < range.values.length; i++) {
          var row = range.values[i];
          // Print columns A and E, which correspond to indices 0 and 4.
          appendPre(row[0] + ', ' + row[1]);
        }
      } else {
        appendPre('No data found.');
      }
    }, function(response) {
      appendPre('Error: ' + response.result.error.message);
    });
  }

  // @vue/component
  export default {
    // data: function () {
    //   return {
    //     name: 'World',
    //     items: [
    //       {id: 1, name: "a"},
    //       {id: 2, name: "b"},
    //       {id: 3, name: "c"}
    //     ]
    //   };
    // },
    data: {
      name: "piz"
    },
    methods: {
      onClick() {
        console.log("xyu");
      }
    }
  };
</script>

<style lang="css">

</style>
