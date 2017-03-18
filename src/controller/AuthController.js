"use strict";

/**
 * Applications main controller.
 *
 * @constructor
 */
let AuthController = function () {
  /**
   * @type {AuthController}
   */
  let self = this;
  
  /**
   * Handles OAuth redirect.
   *
   * @param {Object} request
   * @param {Object} response
   */
  this.execute = function (request, response) {
    request.session.code = request.query.code;
    response.redirect('/szotar');
  };
};

module.exports = AuthController;