/* global requirejs */
requirejs.config({
  baseUrl: '..',
  paths: {
    jquery: 'bower_components/jquery/dist/jquery',
    PageController: 'controller/PageController'
  }
});

requirejs(
  ['PageController'],
  /**
   * Executes application main logic.
   *
   * @param PageController
   */
  function main(PageController) {
    let pageController = new PageController();
    pageController.execute();
  }
);