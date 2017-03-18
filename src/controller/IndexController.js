"use strict";

/**
 * Applications main controller..
 *
 * @constructor
 */
let IndexController = function () {
  let self = this;
  
  this.sendResponse = function (googleOauth2UserService, req, Word, res) {
    googleOauth2UserService.getUser(req.session.tokens).then(function (profile) {
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
  };
  
  /**
   * Provides the response.
   */
  this.execute = function (req, res, apiKeyService, Word, googleOauth2UserService) {
    apiKeyService.getKey().then(function (key) {
      let clientKeys = JSON.parse(key);
      googleOauth2UserService.initClient(clientKeys);
      if (!req.session.tokens) {
        if (req.query.code && req.session.code != req.query.code) {
          req.session.code = req.query.code;
        } else {
          res.redirect(googleOauth2UserService.getAuthUrl(clientKeys));
          return;
        }
        googleOauth2UserService.fetchTokens(req.session.code).then(function (tokens) {
          req.session.tokens = tokens;
          self.sendResponse(googleOauth2UserService, req, Word, res);
        });
      }
      self.sendResponse(googleOauth2UserService, req, Word, res);
    });
  };
};

module.exports = IndexController;