/* global eventObserver, define */
/**
 * Dependencies.
 *
 * @type {string[]}
 */
let dependencies = ['jquery'];

/**
 * Returns the module responsible for controlling the application.
 *
 * @param {jquery} $
 *
 * @return {PageController}
 */
let callback = function ($) {
  /**
   * @constructor
   */
  return function PageController () {
    /**
     * Starts up the application.
     */
    this.execute = function () {
      
    };
  };
};

define('PageController', dependencies, callback);