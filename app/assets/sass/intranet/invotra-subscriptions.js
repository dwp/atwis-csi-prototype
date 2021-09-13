(function ($) {
  Drupal.behaviors.invotraSubscriptionsPage = {
    attach: function () {
      // Proceed to node page.
      $('.view-messages-feed .views-row').each(function() {
        var $element = $(this);
        var url;
        if ($element.hasClass('message-group-groupadd')) {
          url = $element.find('.group-title a').attr('href');
        }
        else if ($element.hasClass('message-user-updated')) {
          url = $element.find('.username a').attr('href');
        }
        else {
          url = $element.find('.message-link').attr('href');
        }
        if (typeof url !== 'undefined') {
          Drupal.invotra.invotraBase.clickableViewRow($element, url);
        }
      });
      $('.pane-messages-feed').once('feed', function () {
        var $feedView = $(this);
        if ($('.view-empty', $feedView).length) {
          $('body.html').addClass('empty-feed');
        }
        $('.views-row', $feedView).attr('role', 'article');
        $('.user-picture a', $feedView).attr({
          'tabindex': '-1',
          'aria-hidden': 'true'
        });
        $(window).bind('load resize', function () {
          if ($(this).width() < 960) {
            $('.node-content img', $feedView).each(function () {
              var mobileSrc = $(this).attr('data-mobile-src');
              if (mobileSrc) {
                $(this).attr('src', mobileSrc);
              }
            });
          }
        });
      });
    }
  };

  Drupal.invotra = Drupal.invotra || {};
  Drupal.invotra.invotraSubscriptions = function (settings) {
    var apiVersion = (typeof settings.invotra_api_client.version !== 'undefined')
          ? settings.invotra_api_client.version
          : 0,
        requestUri;

    // Change request uri depending on api.
    if (apiVersion > 0) {
      requestUri = 'api/' + apiVersion + '/feeds/status';
    }
    else {
      requestUri = 'api/feeds';
    }

    $.getJSON(settings.basePath + requestUri, function(data) {
      var $counter = $('#toolbar-subscriptions').find('.count');
      if ((typeof data.feed !== "undefined") && data.feed === 1) {
        $counter.show();
      }
      else {
        $counter.hide();
      }
    });
  };

  Drupal.behaviors.invotraSubscriptions = {
    attach: function (context, settings) {
      $('#toolbar-subscriptions .count', $(context)).once('subscriptions-api', function () {
        Drupal.invotra.invotraSubscriptions(settings);
        if (typeof settings.invotraSubscriptionsInterval != "undefined"
          && settings.invotraSubscriptionsInterval) {
          setInterval(function () {
            Drupal.invotra.invotraSubscriptions(settings);
          }, settings.invotraSubscriptionsInterval);
        }
      });
    }
  };
})(jQuery);
