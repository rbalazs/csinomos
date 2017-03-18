"use strict";

/**
 * Service that provides Google Api Key in every env.
 *
 * @constructor
 */
let GoogleOauth2UserService = function () {
  /**
   * @type {GoogleOauth2UserService}
   */
  let self = this;
  let google = require('googleapis');
  let OAuth2Client = google.auth.OAuth2;
  let plus = google.plus('v1');
  
  /**
   * @param clientKeys
   */
  this.initClient = function (clientKeys) {
    this.oauth2Client = new OAuth2Client(clientKeys.web.client_id, clientKeys.web.client_secret, 'http://127.0.0.1:8080/szotar');
  };
  
  /**
   * @param tokens
   */
  this.getUser = function (tokens) {
    return new Promise(function (resolve, reject) {
      self.oauth2Client.setCredentials(tokens);
      plus.people.get({userId: 'me', auth: self.oauth2Client}, function (err, profile) {
        if (err) {
          return reject('Failed to load user from google+ ' + err);
        }
        console.log("getUser query");
        return resolve(profile);
      });
    });
  };
  
  /**
   * @param code
   */
  this.fetchTokens = function (code, token) {
    return new Promise(function (resolve, reject) {
      if (token) {
        return resolve(token);
      }
      
      self.oauth2Client.getToken(code, function (err, tokens) {
        if (err) {
          return reject('An error occured', err);
        }
        console.log("getToken query");
        return resolve(tokens);
      });
    });
  };
  
  /**
   * @return {*}
   */
  this.getAuthUrl = function () {
    return self.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: 'https://www.googleapis.com/auth/plus.me'
    })
  }
};

module.exports = GoogleOauth2UserService;