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
     * @type {PageController}
     */
    let self = this;
    
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
        
        let inputForeign = $('<input>').data('key', 'foreign').data('id', id).val(foreign).blur(self.save);
        let inputPlain = $('<input>').data('key', 'plain').data('id', id).val(plain).blur(self.save);
        
        $foreign.replaceWith(inputForeign);
        $plain.replaceWith(inputPlain);
      });
      
      $('.add').click(function () {
        let $inputAddButton = $('<button>').addClass('addBtn')
        .click(function () {
          $.ajax({
            method: "POST",
            url: "/word",
            data: {'foreign': $('.new_foreign').val(), 'plain': $('.new_foreign').val()}
          });
        });
        let inputForeign = $('<input>').addClass('new_foreign').data('key', 'foreign');
        let inputPlain = $('<input>').addClass('new_plain').data('key', 'plain');
        $('#words_wrap').append(inputForeign);
        $('#words_wrap').append(inputPlain);
        $('#words_wrap').append($inputAddButton);
      });
    };
    
    this.save = function (e) {
      let id = $(this).data('id');
      let key = $(this).data('key');
      let value = $(this).val();
      $.ajax({
        method: "PUT",
        url: "/word/" + id,
        data: {'key': key, 'value': value}
      });
    };
  };
};

define('PageController', dependencies, callback);