"use strict";

/**
 * Service that provides Google Api Key in every env.
 *
 * @constructor
 */
let GoogleOauth2UserService = function () {
  this.getUser = function (tokens, clientKeys) {
    let google = require('googleapis');
    let OAuth2Client = google.auth.OAuth2;
    let plus = google.plus('v1');
    let REDIRECT_URL = 'http://127.0.0.1:8080/szotar';
    let oauth2Client = new OAuth2Client(clientKeys.web.client_id, clientKeys.web.client_secret, REDIRECT_URL);

    return new Promise(function (resolve, reject) {
      oauth2Client.setCredentials(tokens);
      plus.people.get({userId: 'me', auth: oauth2Client}, function (err, profile) {
        if (err) {
          return reject('Failed to load user from google+.');
        }
        return resolve(profile);
      });
    });
  };
  
  this.fetchTokens = function (code, clientKeys) {
    let google = require('googleapis');
    let OAuth2Client = google.auth.OAuth2;
    let plus = google.plus('v1');
    let REDIRECT_URL = 'http://127.0.0.1:8080/szotar';
    let oauth2Client = new OAuth2Client(clientKeys.web.client_id, clientKeys.web.client_secret, REDIRECT_URL);
  
    return new Promise(function (resolve, reject) {
      oauth2Client.getToken(code, function (err, tokens) {
        if (err) {
          return reject('An error occured', err);
        }
        return resolve(tokens);
      });
    });
  };
  
  this.getAuthUrl = function (clientKeys) {
    let google = require('googleapis');
    let OAuth2Client = google.auth.OAuth2;
    let plus = google.plus('v1');
    let REDIRECT_URL = 'http://127.0.0.1:8080/szotar';
    let oauth2Client = new OAuth2Client(clientKeys.web.client_id, clientKeys.web.client_secret, REDIRECT_URL);
    return oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: 'https://www.googleapis.com/auth/plus.me'
    })
  }
};

module.exports = GoogleOauth2UserService;