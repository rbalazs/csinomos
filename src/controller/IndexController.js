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
   * @param {Object} request
   * @param {Object} response
   * @param {APIKeyService} apiKeyService
   * @param {Word} Word
   * @param {GoogleOauth2UserService} googleOauth2UserService
   */
  this.execute = function (request, response, apiKeyService, Word, googleOauth2UserService) {
    apiKeyService.getKey().then(function (key) {
      let clientKeys = JSON.parse(key);
      
      googleOauth2UserService.initClient(clientKeys);
      
      if (!request.session.code) {
        response.redirect(googleOauth2UserService.getAuthUrl(clientKeys));
        return;
      }
      
      googleOauth2UserService.fetchTokens(request.session.code, request.session.tokens).then(function (tokens) {
        request.session.tokens = tokens;
        googleOauth2UserService.fetchProfile(request.session.tokens).then(function (profile) {
          Word.findAll().then(function (words) {
            response.render('index',
              {
                message: 'Szavak',
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