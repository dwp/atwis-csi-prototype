(function ($, Drupal) {

  /**
   * Handles dropdown addition for Invotra Search form.
   */
  Drupal.behaviors.invotraLPAutocompleteSearch = {
    attach: function () {

      $('form.autocomplete-search').once('invotra-lp-search', function () {
        var $form = $(this);
        var $searchSuggestions = $form.find('.invotra-lp-search-suggestions');
        var $searchFor         = $form.find('.invotra-lp-search-search-for');
        var $inputText         = $form.find('.form-item-keyword input');
        var $searchLi          = $form.find('li');
        var $searchForText     = $searchFor.find('.invotra-lp-search-text');
        var $searchLinks       = $searchFor.find('.invotra-lp-search-suggestion-search li a');
        var enteredText, slicedText;

        if ($.browser.msie && parseInt($.browser.version) < 10) {
          Drupal.invotra.invotraBase.inputTips($inputText, '', {}, true);
        }

        function searchShowHide(e) {
          if (e.val().length) {
            $searchFor.show();
            $searchSuggestions.hide();
          }
          else {
            $searchFor.hide();
            $searchSuggestions.show();
          }
        }
        $inputText.bind('focus', function (e) {
          searchShowHide($(this));
        });

        $inputText.bind('keyup change input',function(e){
          searchShowHide($(this));
          // Keyboard interaction.
          switch (e.keyCode) {
            case 38: // Up arrow.
            case 40: // Down arrow.
              e.preventDefault();
              $form.find('li:visible:first').get(0).focus();
            return;
          }

          enteredText = $(this).val();
          slicedText = enteredText.length > 25 ? enteredText.slice(0,25) + '...' : enteredText;
          $searchForText.text('"' + slicedText + '"');
          $searchLinks.each(function () {
            var searchCategory = $(this).attr('data-search-type');
            $(this).attr('href', URI($(this).attr('href')).query({search: enteredText, search_category: searchCategory}));
          });
        });
        $inputText.bind('keydown',function(e){
          searchShowHide($(this));
        });
        $form.find('input[type="submit"]').bind('keydown', function (e) {
          // Don't change for mobile layout.
          if  ($(this).parents('body.responsive-layout-mobile').length) {
            return;
          }
          if (e.keyCode == 9) {

            e.preventDefault();
            if (e.shiftKey) {
              $inputText.focus();
            }
            else {
              $(this).parents('#invotra-profile-menu-wrapper').next().find('a:first').focus();
            }
          }

        });
        $searchLi.bind('keydown', function (e) {
          switch (e.keyCode) {
            case 37: // Left arrow.
            case 38: // Up arrow.
              e.preventDefault();
              if ($(this).prev().length > 0) {
                $(this).prev().focus();
                return;
              }
              else if($(this).parents('.item-list').prev().length) {
                $(this).parents('.item-list').prev().find('li:last').focus();
                return;
              }
              else {
                $form.find('li:visible').get(-1).focus();
              }
              break;
            case 39: // Right arrow.
            case 40: // Down arrow.
              e.preventDefault();
              if ($(this).next().length) {
                $(this).next().focus();
                return;
              }
              else if($(this).parents('.item-list').next().length) {
                $(this).parents('.item-list').next().find('li:first').focus();
                return;
              }
              else {
                $form.find('li:visible').get(0).focus();
              }
              break;
            case 27: // Esc.
              $inputText.focus();
              $searchFor.hide();
              $searchSuggestions.hide();
              break;
            case 13: // Enter.
            case 32: // Space.
              e.preventDefault();
              if ($(this).find('a').length) {
                window.location.href = $(this).find('a').attr('href');
              }
              break;
            case 9: // Tab.
              e.preventDefault();
              $form.find('input[type="submit"]').focus();
              break;
          }
        });

        $inputText.attr('role', 'combobox');
        // Semantics.
        $form.find('ul')
          .attr('role', 'listbox');
        $searchLi
          .attr('role', 'option')
          .attr('tabindex', '-1');

        // Close dropdown after loosing focus on list items.
        var focusTimeout;
        $form.find('.form-item-keyword input, li').bind({
          'blur': function() {
            focusTimeout = setTimeout(function () {
              if (!$(document.activeElement).parents('form').hasClass('autocomplete-search')) {
                $searchFor.hide();
                $searchSuggestions.hide();
              }
            }, 200);
          }
        });
        $form.find('.form-submit').bind({
          'focus': function() {
            $searchFor.hide();
            $searchSuggestions.hide();
          }
        })
      });

    }
  };

  /**
   * Handles dropdown addition for Invotra Search form.
   */
  Drupal.behaviors.invotraLPSearchFormDropdown = {
    attach: function () {

      /**
       * Helper function to set search fields placeholder.
       */
      var changePlaceholder = function($form, link) {
        var placeholder = link.data('placeholder');
        if (placeholder.length) {
          $form.find('input[type="text"]').attr('placeholder', placeholder);
        }
        else {
          $form.find('input[type="text"]').attr('placeholder', '');
        }
        if ($.browser.msie && parseInt($.browser.version) < 10) {
          Drupal.invotra.invotraBase.inputTips($form.find('input[type="text"]'), '', {}, true);
        }
      };

      $('form.targeted-search').once('invotra-lp-search', function () {
        var $form = $(this);
        var $selectLink = $form.find('.targeted-search-select-link');
        var $dropdownList = $form.find('.targeted-search-types');

        // Check for a specific search field placeholder.
        var defaultValue = $form.find('.targeted-search-type').val();
        var defaultLink = $dropdownList.find('a[data-search-type="' + defaultValue + '"]');
        changePlaceholder($form, defaultLink);

        // Set default aria-label.
        $selectLink.attr('aria-label', $.trim(defaultLink.text()));

        $selectLink.click(function(event) {
          event.preventDefault();
          $dropdownList.toggle();

          // Closes dropdown on click.
          $('body').unbind('click.hideSearchDropdown');
          setTimeout(function () {
            $('body').bind('click.hideSearchDropdown', function (e) {
              if (!$(e.target).parents('.targeted-search-types').length) {
                $dropdownList.hide();
              }
            });
          }, 0);
        });
        // Toolbar accessible menu.
        if (Drupal.invotra.invotraBase && Drupal.invotra.invotraBase.accessibleMenu) {
          $dropdownList.unwrap('.item-list');
          Drupal.invotra.invotraBase.accessibleMenu($('.item-list:first', $form), ['horizontal', 'horizontal']);
        }
        var listItems = $dropdownList.find('li a');
        listItems.click(function (e) {
          e.preventDefault();
          $dropdownList.hide();
          var $clicked = $(this);
          var selectedType = $clicked.data('search-type');
          var selectedIconClass = $clicked.data('selected-icon-class');

          // Should be applied to all these forms on the page at once.
          $selectLink
            .attr('aria-label', $.trim($clicked.text()))
            .find('i').attr('class', selectedIconClass);
          $form.find('.targeted-search-type').val(selectedType);

          // Check for a specific placeholder.
          changePlaceholder($form, $clicked);

          // Add a focus to the search fields.
          $form.find('input[type="text"]').focus();
        });

        // Close dropdown after loosing focus on list items.
        var focusTimeout;
        listItems.bind({
          'blur': function() {
            focusTimeout = setTimeout(function () {
              $dropdownList.hide();
            }, 200);
          },
          'focus': function() {
            clearTimeout(focusTimeout);
          }
        });
      });

    }
  };

})(jQuery, Drupal);
