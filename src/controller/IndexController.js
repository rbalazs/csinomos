"use strict";

/**
 * Applications main controller.
 *
 * @constructor
 */
let IndexController = function () {
  /**
   * @type {IndexController}
   */
  let self = this;
  
  /**
   * Handles index page action.
   *
   * @param req
   * @param res
   * @param apiKeyService
   * @param Word
   * @param googleOauth2UserService
   */
  this.execute = function (req, res, apiKeyService, Word, googleOauth2UserService) {
    apiKeyService.getKey().then(function (key) {
      let clientKeys = JSON.parse(key);
      
      googleOauth2UserService.initClient(clientKeys);
      
      if (req.query.code && req.session.code != req.query.code) {
        req.session.code = req.query.code;
      } else {
        res.redirect(googleOauth2UserService.getAuthUrl(clientKeys));
        return;
      }
      
      googleOauth2UserService.fetchTokens(req.session.code, req.session.tokens).then(function (tokens) {
        req.session.tokens = tokens;
        
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
      });
    });
  };
};

module.exports = IndexController;