(function ($) {
  Drupal.behaviors.invotraOpenGraph = {
    attach: function(context, settings) {
      $('.opengraph-filter img', context).once('openGraphHideImage', function () {
        $(this).error(function () {
          $(this).parents('.left').hide();
        });
      });
    }
  };

  /**
   * Send a GET request to the Drupal to get the links preview block.
   */
  Drupal.behaviors.invotraGetLinkData = {
    attach: function (context, settings) {
      var urls = [];
      $("[data-opengraph-filter]", context).once('openGraphGetLinksData', function () {
        $(this).each(function () {
          var $link = $(this);
          var cid = $link.data('opengraph-filter');

          // Get the elements url.
          var url = $(this).attr('href');

          // Add a throbber element.
          var $throbber = $('<div class="ajax-progress ajax-progress-throbber ' + cid + '"><div class="throbber">&nbsp;</div></div>');
          $(this).after($throbber);

          // If this url haven't been processed yet then we need to send an AJAX
          // request to Drupal to get link's preview.
          if (urls.indexOf(url) === -1) {
            urls.push(url);

            // Send an Ajax request to the Drupal to obtain url's preview.
            $.ajax({
              url: Drupal.settings.basePath + 'invotra/opengraph/getPreview',
              dataType: 'json',
              data: {'url': url},
              cache: false,
              success: function (data) {
                if (!data || !data.hasOwnProperty('output')) {
                  return;
                }

                var selector = "[data-opengraph-filter=\"" + cid + "\"]";
                $(selector, context).replaceWith(data.output);
              },
              complete: function () {

                // Remove the throbber.
                $('.' + cid, context).remove();
              }
            });
          }
        });

      });
    }
  }
}(jQuery));
