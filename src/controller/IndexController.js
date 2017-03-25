'use strict';

/**
 * Applications main controller.
 *
 * @param {IncomingMessage} request
 * @param {ServerResponse} response
 * @param {APIKeyService} apiKeyService
 * @param {Word} Word
 * @param {GoogleOauth2UserService} googleOauth2UserService
 *
 * @constructor
 */
let IndexController = function (request, response, apiKeyService, Word, googleOauth2UserService) {
  /**
   * @type {IndexController}
   */
  let self = this;
  
  /**
   * @type {IncomingMessage}
   */
  this.request = request;
  
  /**
   * @type {ServerResponse}
   */
  this.response = response;
  
  /**
   * @type {APIKeyService}
   */
  this.apiKeyService = apiKeyService;
  
  /**
   * @type {Word}
   */
  this.Word = Word;
  
  /**
   * @type {GoogleOauth2UserService}
   */
  this.googleOauth2UserService = googleOauth2UserService;
  
  /**
   * @type {string}
   */
  this.profileName = null;
  
  /**
   * @param {string} profile
   *
   * @return {Promise}
   */
  this.fetchWords = function (profile) {
    self.profileName = profile.displayName;
    
    return self.Word.findAll()
  };
  
  /**
   * @param {string} tokens
   *
   * @return {Promise}
   */
  this.fetchGooglePlusProfile = function (tokens) {
    self.request.session.tokens = tokens;
    return self.googleOauth2UserService.fetchProfile(self.request.session.tokens);
  };
  
  /**
   * @param {string} key
   *
   * @return {Promise}
   */
  this.fetchOauthTokens = function (key) {
    let clientKeys = JSON.parse(key);
    
    self.googleOauth2UserService.initClient(clientKeys);
    
    if (!self.request.session.code) {
      self.response.redirect(self.googleOauth2UserService.getAuthUrl(clientKeys));
    }
    
    return self.googleOauth2UserService.fetchTokens(
      self.request.session.code,
      self.request.session.tokens
    );
  };
  
  /**
   * Executes index apge action.
   */
  this.execute = function () {
    self.apiKeyService.getKey()
    .then(self.fetchOauthTokens)
    .then(self.fetchGooglePlusProfile)
    .then(self.fetchWords)
    .then((words) => {
      response.render('index',
        {
          message: 'Szavak',
          words: words,
          profileDisplayName: self.profileName
        }
      )
    })
    .catch(function (e) {
      console.log(e);
    });
  };
};

module.exports = IndexController;