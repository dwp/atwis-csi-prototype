(function ($, Drupal) {
  // Mobile sort / filter functionality.
  Drupal.invotra = Drupal.invotra || {};
  Drupal.invotra.invotraSortFilters = function (pages, facetElement, mergeExtraSearch, moveTop, moveBottom, resultElements, resultsCount, $text) {
    $(pages).once('mobileSortFilters', function () {
      var $this = $(this),
          $results = $(resultElements, $this),
          $results_count = $(resultsCount, $this),
          $facets = $(facetElement, $this),
          $name = Drupal.t($text),
          $skeleton = $([
            '<div id="mobile-sort-filter">',
              '<div id="sf-header">',
                '<div class="title">',
                  $name,
                '</div>',
                '<button class="action-button close">',
                  Drupal.t('Close'),
                '</button>',
              '</div>',
              '<div id="sort-filter-wrapper"></div>',
            '</div>'
          ].join(''));

      if ($facets.length && $facets.find('.panel-pane, .invotra-panes-facet').length) {
        if ($results.length) {
          $results.prepend(
            $([
              '<div id="mobile-sf-block">',
                '<div id="mobile-sf-buttons">',
                  '<button id="show-sf-block">',
                    $name,
                  '</button>',
                '</div>',
              '</div>'
            ].join(''))
          );
          if ($results_count.length) {
            $('#mobile-sf-block', $results).append($results_count.clone());
            $results_count.addClass('current-search-title');
          }
        }
        $('#sort-filter-wrapper', $skeleton).append($facets.clone());
        $facets.addClass('mobile-sort-filters');
        if (mergeExtraSearch !== null) {
          $.each(mergeExtraSearch, function (i, element) {
            var $merge = $(element, $this);
            if ($merge.length) {
              $('#sort-filter-wrapper', $skeleton).append($merge.clone());
              $merge.addClass('mobile-sort-filters');
            }
          });
        }
        if (moveTop !== null) {
          $.each(moveTop, function (i, element) {
            var $selector = $(element, $skeleton);
            if ($selector.length) {
              $selector.prependTo($('#sort-filter-wrapper', $skeleton));
            }
          });
        }
        if (moveBottom !== null) {
          $.each(moveBottom, function (i, element) {
            var $selector = $(element, $skeleton);
            if ($selector.length) {
              $selector.appendTo($('#sort-filter-wrapper', $skeleton));
            }
          });
        }
        // Change id of autocomplete fields.
        $('input.form-autocomplete', $skeleton).each(function () {
          var id = $(this).attr('id');
          $(this).attr('id', 'mobile-' + id);
        });
        // Change id of datepicker fields.
        for (var id in Drupal.settings.datePopup) {
          $('#' + id, $skeleton).attr('id', 'mobile-' + id);
          Drupal.settings.datePopup['mobile-' + id] = Drupal.settings.datePopup[id];
        }

        var swipeBlock = function ($action) {
          var $content = $('body .page'),
            $footer = $('body .footer-wrapper'),
            $filter = $skeleton;
          if ($action === 'show') {
            $filter.toggleClass('open').animate({'left': '0'});
            $content.animate({'right': '-100%'}, function () {
              $content.toggleClass('open');
            });
            $footer.animate({'right': '-100%'}, function () {
              $footer.toggleClass('open');
            });
          }
          else if ($action === 'hide') {
            $content.toggleClass('open').animate({'right': '0'});
            $footer.toggleClass('open').animate({'right': '0'});
            $filter.animate({'left': '-100%'}, function () {
              $filter.toggleClass('open');
            });
          }
        };
        $('#mobile-sf-buttons button#show-sf-block').click(function (e) {
          swipeBlock('show');
        });
        $('.action-button.close', $skeleton).click(function (e) {
          swipeBlock('hide');
        });
        $('body.html').prepend($skeleton);
        // Reattach autocomplete field.
        // @see Drupal.behaviors.autocomplete().
        var acdb = [];
        $('input.autocomplete', $skeleton).once('mobile-sf-autocomplete', function () {
          var uri = this.value;
          if (!acdb[uri]) {
            acdb[uri] = new Drupal.ACDB(uri);
          }
          var $mobile_input = $('#mobile-' + this.id.substr(0, this.id.length - 13))
            .attr('autocomplete', 'OFF')
            .attr('aria-autocomplete', 'list');
          $($mobile_input[0].form).submit(Drupal.autocompleteSubmit);
          $mobile_input.parent()
            .attr('role', 'application')
            .append($('<span class="element-invisible" aria-live="assertive"></span>')
              .attr('id', $mobile_input.attr('id') + '-autocomplete-aria-live')
            );
          new Drupal.jsAC($mobile_input, acdb[uri]);
        });
      }
    });
  };

  /**
   * Filter and Sort (Mobile optimisation).
   */
  Drupal.behaviors.invotraPanesMobileFacet = {
    attach: function (context) {
      // My content / All content screens.
      if ($('body.page-invotra-my-workplace', context).length) {
        var pages = 'body.page-invotra-my-workplace-all-content, body.page-invotra-my-workplace-my-content',
            results = '.view-my-workspace-content',
            results_count = '.pane-ilp-current-search-title',
            facets = '.brenham-sidebar-inner',
            mergeExtraSearch = [
              '.invotra-my-workspace-collapsible',
              '.pane-my-workspace-sort'
            ],
            moveTop = [
              '.pane-my-workspace-sort'
            ];
        Drupal.invotra.invotraSortFilters(pages, facets, mergeExtraSearch, moveTop, null, results, results_count, 'Sort and Filter');

        $('#sort-filter-wrapper .invotra-my-workspace-collapsible', context).toggleClass('invotra-my-workspace-collapsible-collapsed');

        // Feed / Notifications screens.
        var pages = 'body.page-invotra-my-workplace',
            results = '.pane-messages-feed, .brenham-content-inner',
            facets = '.pane-invotra-panes-facets-display';
        Drupal.invotra.invotraSortFilters(pages, facets, null, null, null, results, null, 'Filter');
      }

      // Global search screens.
      if ($('body.page-content-find-content.lp-search-landing,' +
        ' body.page-people-teams-find-people-search.lp-search-landing,' +
        ' body.page-locations-find-locations-search.lp-search-landing,' +
        ' body.page-people-teams-find-teams-search.lp-search-landing', context).length) {
        var pages = 'body.page-content-find-content.lp-search-landing,' +
          ' body.page-people-teams-find-people-search.lp-search-landing,' +
          ' body.page-locations-find-locations-search.lp-search-landing,' +
          ' body.page-people-teams-find-teams-search.lp-search-landing',
            results = '.pane-find-content-search, .pane-find-people-search, .pane-find-teams-search, .pane-find-locations-search',
            results_count = '.pane-ilp-current-search-title:not(.current-search-page-title)',
            facets = '.brenham-sidebar-inner',
            mergeExtraSearch = [
              '.pane-ilp-search'
            ],
            moveBottom = [
              '.pane-current-search-block',
              '.current-search-item-invotra-apps-active',
              '.pane-invotra-save-search'
            ];
        $('.current-search-item-invotra-apps-params', pages)
          .attr('id', 'edit-current-search-term')
          .prepend('<h4><label for="edit-current-search-term">' + Drupal.t('Search term:') + '</label></h4>');
        Drupal.invotra.invotraSortFilters(pages, facets, mergeExtraSearch, null, moveBottom, results, results_count, 'Sort and Filter');
      }

      // Apps 'Home' screens.
      // My Apps screens.
      if ($('body.page-apps.productivity-landing:not(.productivity-landing-explore)', context).length) {
        var pages = 'body.page-apps.productivity-landing',
            results = '.brenham-content-inner,'
              + ' .invotra-ideas-home-layout-container.invotra-ideas-home-layout-column-content,'
              + ' .invotra-group-home-layout-container.invotra-group-home-layout-column-content',
            facets = '.brenham-sidebar-inner, .invotra-ideas-home-layout-sidebar, .invotra-group-home-layout-sidebar',
            text = 'Filter';
        if ($('body.productivity-landing .invotra-apps-sort-form').length) {
          text = 'Sort and Filter';
        }
        Drupal.invotra.invotraSortFilters(pages, facets, null, null, null, results, null, text);
      }
      // Apps Explore screens.
      if ($('body.productivity-landing-explore', context).length) {
        var pages = 'body.productivity-landing-explore',
            results = '.brenham-content-inner',
            results_count = '.pane-ilp-current-search-title',
            facets = '.brenham-sidebar-inner',
            moveBottom = [
              '.pane-current-search-block'
            ];
        $('.pane-current-search-block', pages)
          .attr('id', 'edit-current-search-term')
          .prepend('<h4><label for="edit-current-search-term">' + Drupal.t('Search term:') + '</label></h4>');
        Drupal.invotra.invotraSortFilters(pages, facets, null, null, moveBottom, results, results_count, 'Sort and Filter');
      }
    }
  };

})(jQuery, Drupal);
