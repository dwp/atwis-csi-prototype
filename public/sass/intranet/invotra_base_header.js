(function ($, Drupal) {

  // Mobile header implementation.
  Drupal.invotra.invotraBase.mobileHeader = {
    options: {
      // Back button title.
      backButton: Drupal.t('Back'),
      // Header title.
      title: Drupal.t('Title'),
      // Max width where header should be visible.
      threshold: 960
    },

    init: function (options) {
      var _this = this;
      $.extend(this.options, options);

      // Adding toolbar after it's been processed.
      $(window).one('invotraToolbarProcessed', function () {
        _this.$wrapper = $('#mobile-bar');

        if (!_this.$wrapper.hasClass('specific-header')) {
          _this.$wrapper.addClass('specific-header');
          _this.$wrapper.append(_this.theme());
        }
        else {
          _this.$wrapper.find('> .specific-header-wrapper').replace(_this.theme());
        }
        _this.$el = _this.$wrapper.find('> .specific-header-wrapper');
        _this.initEvents();
      });
    },
    theme: function () {
      var html = '';
      html += '<div class="specific-header-wrapper">';
      html += '  <a class="back-button" href="javascript:void(0);">';
      html += '    <span class="icon" tabindex="-1" aria-hidden="true"></span>';
      html += '  </a>';
      html += '  <h4 class="title">';
      html +=      this.options.title;
      html += '  </h4>';
      html += '</div>';
      return html;
    },
    initEvents: function () {
      this.$el.find('.back-button').bind('click', function () {
        history.back();
      });
    }
  };
})(jQuery, Drupal);