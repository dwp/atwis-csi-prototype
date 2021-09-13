(function ($) {

  /**
   * Allow ajax for SearchApi glossary widget.
   */
  Drupal.behaviors.invotraSearchGlossaryAjax = {
    attach: function (context, settings) {
      var context = '.pane-search-api-glossary ul.facetapi-facetapi-glossary';

      $('a:not(.ajax-processed)', context).addClass('ajax-processed').each(function() {
        var id = $(this).closest('.pane-search-api-glossary').attr('id');

        // Submit data for ajax request.
        var submitData = {
          glossaryAjax: {
            conf: settings.glossaryAjax[id].conf,
            dom_id: id,
          }
        };

        // Add additional facet filters if it needed.
        var href = $(this).attr('href');
        if (settings.glossaryAjax[id].filter) {
          href = href + settings.glossaryAjax[id].filter;
        }
        // Configure ajax request.
        var element_settings = {};
        element_settings.url = href;
        element_settings.submit =  submitData;
        element_settings.setClick = true;
        element_settings.event = 'click';
        element_settings.progress = { 'type': 'throbber' };

        var base = $(this).attr('id');
        Drupal.ajax[base] = new Drupal.ajax(base, this, element_settings);
      });
    }
  };

  /**
   * Glossary carousel.
   */
  Drupal.behaviors.invotraSearchGlossaryCarousel = {
    savedPositions: {},
    attach: function () {
      var savedPositions = this.savedPositions;
      $('.pane-search-api-glossary ul.facetapi-facetapi-glossary').once('glossary', function () {
        var $list = $(this),
            defWidth = $list.width(),
            width = 0,
            left = 0,
            scrollWidth = parseInt(defWidth / 80) * 40,
            paneID = $list.closest('.pane-search-api-glossary').attr('id');
        $('li', $list).each(function () {
          width += $(this).outerWidth(true);
        });
        $list.width(width);
        if (savedPositions[paneID]) {
          left = savedPositions[paneID];
        }
        $list.css({
          'position': 'absolute',
          'left': -left
        });
        var $prevLink = $('<a>', {
              'href': '#',
              'class': 'prev',
              'text': '<<',
              'click': function (e) {
                  e.preventDefault();
                  left -= scrollWidth;
                  if (left <= 0) {
                    left = 0;
                    $(this).hide();
                  }
                  $(this).siblings('.next').show();
                  $list.animate({'left': -left}, 300);
                  savedPositions[paneID] = left;
                }
              }),
            $nextLink = $prevLink.clone()
              .attr('class', 'next')
              .text('>>')
              .click(function (e) {
                e.preventDefault();
                left += scrollWidth;
                if (left >= (width - defWidth)) {
                  left = width - defWidth - 2;
                  $(this).hide();
                }
                $(this).siblings('.prev').show();
                $list.animate({'left': -left}, 300);
                savedPositions[paneID] = left;
              });
        $list.parent()
          .prepend($prevLink)
          .append($nextLink);
        if (left < 50) {
          $prevLink.hide();
        }
        if (left >= (width - defWidth - 2)) {
          $nextLink.hide();
        }
      });
    }
  };

  /**
   * Handle Simple Search pane.
   */
  Drupal.behaviors.invotraSimpleSearch = {
    attach: function (context) {
      $(context).find('.pane-simple-search-bar').once('invotraSimpleSearch', function () {
        var $this = $(this);
        var formTextId = $this.find('.form-text').attr('id');
        var $paneTitle = $('.pane-title', $this);

        if ($paneTitle.length) {
          $paneTitle.html('<label for="' + formTextId + '">' + $paneTitle[0].outerHTML + '</label>');
          $paneTitle.prependTo($('form', $this));
        }
        else {
          $('.form-text', $this).attr('aria-label', Drupal.t('Search'));
        }
      });
    }
  };
})(jQuery);
