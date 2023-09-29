(function ($, Drupal) {

  /**
   * Invotra ideas clickable view.
   */
  Drupal.behaviors.invotraWebformViewRowClick = {
    attach: function(context, settings) {
      var $viewRow = context == document ? $(context) : $(context).parent();
      $viewRow
        .find('.views-webform-app .views-row')
        .each(function() {
          var $element = $(this);
          var $url = $element.find('.views-field-title .title a').attr('href');
          if (typeof $url !== 'undefined') {
            Drupal.invotra.invotraBase.clickableViewRow($element, $url);
          }
        });
      }
    };

})(jQuery, Drupal);