(function ($, Drupal) {
  "use strict";

  /**
   * Adds mobile header to app pages.
   */
  Drupal.behaviors.invotraAppsHeader = {
    attach: function (context) {
      if (Drupal.invotra.invotraBase && Drupal.invotra.invotraBase.mobileHeader) {
        $('body.productivity-landing', context).once('invotraAppsHeader', function () {
          var title = $(context).find('.pane-invotra-apps-create .title').text();
          if (title) {
            Drupal.invotra.invotraBase.mobileHeader.init({
              'title': title
            });
          }
        });

        // This should apply for ideas create as well.
        // Added class messes with theming.
        $('body.page-apps-ideas-create', context).once('invotraideasHeader', function () {
          var title = Drupal.t('Create idea');
          Drupal.invotra.invotraBase.mobileHeader.init({
            'title': title
          });
        });
      }
    }
  };

  /**
   * Fixes for facet theming.
   */
  Drupal.behaviors.invotraAppsFacets = {
    attach: function (context) {
      $('body.productivity-landing').find('.facetapi-facet-type, .facetapi-facet-invotra-poll-status').once('invotraAppsFacets', function () {
        var $facet = $(this);
        $facet.find('.facetapi-active').each(function () {
          var $active_facet = $(this);
          var $span = $active_facet.find('+ span');
          $active_facet.html($span.remove().text());
          var $title = $active_facet.parent().text();
          $active_facet.text($title);
        });
        if ($facet.find('.facetapi-active').length) {
          setTimeout(function () {
            $facet.find('.facetapi-active').show();
          }, 10);
        }

        if ($facet.hasClass('facetapi-facet-invotra-poll-status')) {
          setTimeout(function () {
            $facet.find('.radio input').bind('click', function (e) {
              // debugger;
              var val = $(e.target).attr('checked');
              $facet.find('.radio input').attr('checked', '');
              $(e.target).attr('checked', val);
              if ($.uniform) {
                $.uniform.update($facet.find('.radio input'));
              }
              window.location.href = $(e.target).closest('li').find('a').attr('href');
            });
          }, 10);
        }
      });
      // Category facets accessibility.
      $('body.productivity-landing').find('.facetapi-invotra-facets-category-links').once('invotraAppsCategoryFacets', function() {
          $(this).find('a').removeAttr('title');
      });
    }
  };

  /**
   * Append invisible title above Apps filters (case for some my-[app] pages).
   */
  Drupal.behaviors.invotraAppsLayout = {
    attach: function (context) {
      $('body.productivity-landing .panel-display.brenham', context).once('invotraAppsLayout', function () {
          // Appends invisible title above filters if there are any.
          $(this)
            .find('.brenham-container .brenham-sidebar')
            .prepend('<h2 class="element-invisible">' + Drupal.t('Filters') + '</h2>');
      });
    }
  };

  /**
   * Invotra apps behavior for tall & wide app icons.
   */
  Drupal.behaviors.invotraAppIconHeader = {
    attach: function(context) {
      $('.pane-invotra-apps-icon', context).once('invotraAppsIcon', function() {

        // Do not apply for ideas create page.
        if ($('.page-apps-ideas-create').length) {
          return false;
        }

        var icon = $(context).find('.pane-invotra-apps-icon img'),
            // Jquery fails to detect IE11..
            isIE11 = !!navigator.userAgent.match(/Trident.*rv\:11\./),
            ICON_MAX_WIDTH = 115,
            ICON_HEIGHT_DIMENSION = 40,
            ICON_TABS_POSITION = 38;
        var margin = {
          'wideIcon': '0px',
          'wideIconIE': '3px',
          'tallIconIE' : '-2px'
        };

        $(window).resize(function (e) {
          appsExtraStyles(icon);
        });
        
        if (icon.height() > ICON_HEIGHT_DIMENSION
          && icon.length) {
          appsExtraStyles(icon);
        }

        if (icon.height() <= ICON_HEIGHT_DIMENSION
          && icon.width() == ICON_MAX_WIDTH
          && icon.length) {
          appsWideStyles(icon);
        }

        if (icon.height() >= ICON_HEIGHT_DIMENSION
          && icon.width() == ICON_MAX_WIDTH
          && icon.length) {
          if (($.browser.msie && parseInt($.browser.version) <= 10) || isIE11) {
            appsIeStyles(icon);
          }
        }


        // Helper function for tall icons.
        function appsExtraStyles(icon) {
          var tabsTop = (window.innerWidth > 768) ? icon.height() - ICON_TABS_POSITION : icon.height() + 7;
          $(context).find('.pane-invotra-apps-icon').css({
            'height': (icon.height() - ICON_HEIGHT_DIMENSION)
          });

          $(context).find('.productivity-landing .region-content ul.tabs').css({
            // PX need to be exact for horizontal tabs design.
            'top': tabsTop
          });
        }

        // Helper function for wide icons.
        function appsWideStyles(icon) {
          icon.css({
            'margin-top': margin.wideIcon
          });
          // Tweak for IE.
          if ($.browser.msie && parseInt($.browser.version) <= 10
            || isIE11) {
            icon.css({
              'margin-top': margin.wideIconIE
            });
          }
        }

        // Helper function for 3x4 icons IE.
        function appsIeStyles(icon) {
          icon.css({
            'margin-top': margin.tallIconIE
          })
        }
      })
    }
  };

  /**
   * Row clicking script for apps.
   */
  Drupal.behaviors.invotraAppsClickableRow = {
    attach: function (context, settings) {
      $('.view-id-productivity_landings .views-row', context).once('invotraAppsClickableRow', function () {
        var $row = $(this);

        $row.css('cursor', 'pointer').bind('click', function (e) {
          if (!$(e.target).is('a')) {
            window.location.href = $row.find('.title a').attr('href');
          }
        });
      });
    }
  }

})(jQuery, Drupal);
