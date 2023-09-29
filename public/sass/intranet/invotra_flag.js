(function ($) {


  Drupal.behaviors.flagLinkAria = {

    attach: function(context, settings) {
      // Check flag entity type.
      if (Drupal.settings.invotraFlagEntityType == 'undefined') {
        return false;
      }
      // Aria for flag functionality.
      if (Drupal.settings.invotraFlagEntityType) {
        $('.flag-wrapper', context).once('invotraFlagAria', function () {
          var flag = $('.flag');
          flag.each(function () {
            var element = $(this);
            // Save.
            if (element.parent().is('.flag-favourite-nodes, .flag-favourite-terms, .flag-favourite-comments')) {
              element.attr({
                'title': element.hasClass('unflag-action')
                  ? Drupal.t('Unsave this content')
                  : Drupal.t('Save this content'),
                'aria-pressed': element.hasClass('unflag-action') ? true : false
              });

              var text = element.hasClass('unflag-action') ? Drupal.t('Unsave') : Drupal.t('Save');
                element.find('.flag-text').text(text);
              }

              // Follow
              if (element.parent().is('.flag-follow-node')) {
                element.attr({
                  'title': element.hasClass('unflag-action')
                    ? Drupal.t('Unfollow this content')
                    : Drupal.t('Follow this content'),
                  'aria-pressed': element.hasClass('unflag-action') ? true : false
                });

                var followText = element.hasClass('unflag-action') ? Drupal.t('Unfollow') : Drupal.t('Follow');
                  element.find('.flag-text').text(followText);
                }
              });
          });
      }
    }
  };

})(jQuery);