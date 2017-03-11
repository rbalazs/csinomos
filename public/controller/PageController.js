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
  return function PageController() {
    /**
     * Starts up the application.
     */
    this.execute = function () {
      let opened = undefined;
      
      $('.word-item').click(function () {
        if (opened) {
          return;
        }
        
        let $item = $(this);
        
        opened = $item;
        
        let $plain = $item.children('.plain');
        let $foreign = $item.children('.foreign');
        
        let id = $item.data('id');
        let foreign = $foreign.text().trim();
        let plain = $plain.text().trim();
        
        $foreign.replaceWith($('<input>').val(foreign));
        $plain.replaceWith($('<input>').val(plain));
      });
    };
  };
};

define('PageController', dependencies, callback);