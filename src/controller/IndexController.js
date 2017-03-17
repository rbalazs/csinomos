"use strict";

/**
 * Applications main controller..
 *
 * @constructor
 */
let IndexController = function () {
  /**
   * Provides the response.
   */
  this.execute = function (req, res, apiKeyService, Word) {
  
    apiKeyService.getKey().then(function (key) {
    
      let clientKeys = JSON.parse(key);
      let google = require('googleapis');
      let OAuth2Client = google.auth.OAuth2;
      let plus = google.plus('v1');
    
      let REDIRECT_URL = 'http://127.0.0.1:8080/szotar';
    
      let oauth2Client = new OAuth2Client(clientKeys.web.client_id, clientKeys.web.client_secret, REDIRECT_URL);
    
      if (!req.session.tokens) {
        if (req.query.code && req.session.code != req.query.code) {
          req.session.code = req.query.code;
        } else if (!req.query.code && req.session.code) {
        
        } else {
          res.redirect(oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: 'https://www.googleapis.com/auth/plus.me'
          }));
          return;
        }
      
        oauth2Client.getToken(req.session.code, function (err, tokens) {
          if (err) {
            return console.log('An error occured', err);
          }
          req.session.tokens = tokens;
        
          oauth2Client.setCredentials(tokens);
          plus.people.get({userId: 'me', auth: oauth2Client}, function (err, profile) {
            if (err) {
              return console.log('An error occured', err);
            }
            Word.findAll().then(function (words) {
              res.render('index',
                {
                  message: "Szavak",
                  words: words,
                  profileDisplayName: profile.displayName
                }
              );
            })
          });
        });
      } else {
        oauth2Client.setCredentials(req.session.tokens);
        plus.people.get({userId: 'me', auth: oauth2Client}, function (err, profile) {
          if (err) {
            return console.log('An error occured', err);
          }
          Word.findAll().then(function (words) {
            res.render('index',
              {
                message: "Szavak",
                words: words,
                profileDisplayName: profile.displayName
              }
            );
          })
        });
      }
    });
  };
};

module.exports = IndexController;