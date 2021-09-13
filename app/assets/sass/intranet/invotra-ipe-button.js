(function ($, Drupal) {

  /**
   * Invotra panel ipe button.
   */
  Drupal.behaviors.invotraWebformPanelIpe = {
    attach: function (context) {
      $('#app-ipe-link', context).once('invotraIdeasIpe', function () {
        $(this).bind('click', function(e) {
          e.preventDefault();
          var $ipeButton = $('a#panels-ipe-customize-page');
          if ($ipeButton.length)
            $ipeButton.click();
        });
      });
    }
  };
})(jQuery, Drupal);
