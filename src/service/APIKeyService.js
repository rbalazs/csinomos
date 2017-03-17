"use strict";

/**
 * Service that provides Google Api Key in every env.
 *
 * @constructor
 */
let APIKeyService = function () {
  /**
   * Returns the key.
   *
   * Loads up key from disk, if it is not provided as an env variable.
   *
   * @return {Promise}
   */
  this.getKey = function () {
    return new Promise(function (resolve, reject) {
      let fs;
      fs = require('fs');
      fs.readFile('client_id.json', function (err, content) {
        if (err) {
          return reject('Failed to load key from disk.');
        }
        return resolve(content);
      });
    });
  };
};

module.exports = APIKeyService;