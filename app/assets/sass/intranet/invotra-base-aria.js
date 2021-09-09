/**
 * @file
 * Invotra ARIA stuff to provide accessibility for extra elements,
 * like themed form widgets, etc...
 */
(function ($) {
  // Simulate select list open.
  $.fn.openSelect = function() {
    return this.each(function(idx,domEl) {
      if (document.createEvent) {
        var event = document.createEvent("MouseEvents");
        event.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        domEl.dispatchEvent(event);
      } else if (element.fireEvent) {
        domEl.fireEvent("onmousedown");
      }
    });
  };
  var invotraBase = Drupal.invotra.invotraBase || {};

  // Invotra ARIA functions.
  Drupal.invotra.invotraBase.ARIA = {
    lastFocused: null,
    keyCodes: [32, 13, 9, 37, 38, 39, 40],
    init: function (context) {
      var $context = $(context);
      // Add ARIA to multiple select list.
      this.listbox($context.find('.ms-list[role="listbox"]'));
      // Apply spacebar action to links.
      this.spaceBarAction($context.find('a, .form-submit:not(".field-add-more-submit"), button'));
      // Apply enter bar action to links.
      this.enterBarAction($context.find('a'));
      // Apply spacebar action to select. Doesn't works in IE.
      this.spaceBarAction($context.find('select'));
      // Apply other aria stuff.
      this.ariaCommon($context);
      // Add aria support to CKEditor.
      this.wysiwygAriaCKE();
      // Read-only fields stuff.
      this.disabledFields($context);
      // Org chart ARIA.
      this.orgChartAria($context);
      // Table drag ARIA.
      this.tableDragAria($context);
      // Multiple Selects in table ARIA.
      this.multipleSelects($context);
    },
    listbox: function ($el) {
      // Help function to update listbox bindings.
      var updateLists = function($el) {
        $el.each(function () {
          $(this).unbind('keydown')
        });
        _parent.listbox($el);
      };
      var _parent = this;
      var describeID = $el.first().attr('aria-labelledby') + 'desc';
      $el.first().once('describedby').before($('<div>', {
        'text': Drupal.t('To change the selection, use the arrow keys or tab key.'),
        'id': describeID,
        'class': 'element-invisible'
      }));
      $el.each(function () {
        var listType = $(this).closest('.ms-selectable').length ? 'selectable' : 'selected';
        var id = $el.closest('.ms-container').attr('id') + '-' + listType;
        var $this = $(this);
        var $option = $this.find('li');
        $option.each(function (i) {
          $(this).attr('id', id + '-' + i);
        });
        $this
          .attr('aria-describedby', describeID)
          .attr('aria-activedescendant', $option.filter(':visible').first().attr('id'))
        $this.bind({
          'focus': function (e) {
            $el.removeClass('focused');
            $this.addClass('focused');
            $option.filter(':visible').first().addClass('focused');
          },
          'blur': function () {
            $this.removeClass('focused');
            $option.removeClass('focused');
          }
        });
        $this.bind({
          keydown: function (e) {
            var $selOpt = $this.find('[role=option].focused');
            if ($.inArray(e.keyCode, _parent.keyCodes) >= 0) {
              var $nextOpt = $selOpt.nextAll(':visible').first();
              var $prevOpt = $selOpt.prevAll(':visible').first();
              switch (e.keyCode) {
                case 13:
                case 32:
                  $selOpt.click();
                  updateLists($el);
                  if ($nextOpt.length) {
                    $selOpt.trigger('blur');
                    $nextOpt.trigger('focus');
                  }
                  else if ($prevOpt.length) {
                    $selOpt.trigger('blur');
                    $prevOpt.trigger('focus');
                  }
                  else {
                    $selOpt.parent().trigger('focus');
                  }
                  break;
                case 37:
                case 38:
                  e.preventDefault()
                  if ($prevOpt.length) {
                    $selOpt.trigger('blur');
                    $prevOpt.trigger('focus');
                  }
                  break;
                case 39:
                case 40:
                  e.preventDefault()
                  if ($nextOpt.length) {
                    $selOpt.trigger('blur');
                    $nextOpt.trigger('focus');
                  }
                  break;
              }
            }
          }
        });
        $option.bind({
          'focus': function (e) {
            e.stopPropagation();
            $this.addClass('focused');
            $(this).addClass('focused');
          },
          blur: function (e) {
            e.stopPropagation();
            if (!$this.find(':focus').length) {
            }
            $this.removeClass('focused');
            $(this).removeClass('focused');
          }
        });
        // Binding for 2nd list(selected) of options.
        if ($this.closest('.ms-selection').length) {
          $option.bind({
            'focus': function () {
              $(this).removeAttr('aria-selected');
            },
            'blur': function () {
              $(this).attr('aria-selected', 'true');
            }
          })
        }
      });
    },
    spaceBarAction: function ($el) {
      $el.once().bind({
        keydown: function(e) {
          if (e.keyCode == 32) {
            e.preventDefault();
          }
        },
        keyup: function (e) {
          if (e.keyCode == 32) {
            e.preventDefault();
            var $target = $(e.target),
                id = $target.attr('id');
            if (!$target.is('.click-dis')) {
              if (typeof Drupal.settings.ajax !== 'undefined' &&
                  typeof Drupal.settings.ajax[id] !== 'undefined') {
                $target.trigger(Drupal.settings.ajax[id].event);
              }
              else {
                $(e.target)[0].click();
              }
            }
            if ($(e.target).is('select:not(:disabled, [readonly])')) {
              $(e.target).openSelect();
            }
          }
        }
      });
    },
    enterBarAction: function ($el) {
      $el.once().bind({
        keydown: function(e) {
          if (e.keyCode == 13) {
            e.preventDefault();
          }
        },
        keyup: function (e) {
          if (e.keyCode == 13) {
            e.preventDefault();
            var $target = $(e.target);
            if (!$target.is('.click-dis')) {
              $(e.target)[0].click();
            }
          }
        }
      });
    },
    ariaCommon: function ($selector) {
      var $tableSelect = $('select', $selector.find('table'));
      $tableSelect.once('table-select', function () {
        var $this = $(this),
            $label = $this.closest('table').find('.field-label');
        if ($label.length && $this.attr('aria-label') == '') {
          $this.attr({
            'aria-label': $label.text()
          });
        }
      });
      $('.turnoff-label-ie').once(function () {
        if ($.browser.msie) {
          var labelFor = $(this).attr('id');
          $('label[for="' + labelFor + '"]')
            .attr('for', labelFor + '-ie')
            .click(function () {
              $('#' + labelFor).focus();
            });
        }
      });
      if ($.browser.msie && !($('body').hasClass('page-media-browser'))) {
        $('.ui-tabs li a').bind('keydown', function (e) {
          if ($(this).hasClass('dont-scroll')) {
            return;
          }
          var focusTimeout;
          if (e.keyCode == 32 || e.keyCode == 13) {
            var $this = $(this);
            var tabContentId = $this.attr('href');
            if ($(tabContentId).length) {
              $tabContent = $(tabContentId);
              var $focusableElements = $('a, input, textarea, select, button', $tabContent);
              var $focused = $focusableElements.filter(':visible').first();
            }
            else {
              var $focused = $this;
            }
            clearTimeout(focusTimeout);
            focusTimeout  = setTimeout(function () {
              $focused.trigger('focus');
            }, 500)
          }
        });
      }
      // Add aria-hidden attr to admin related links.
      $('.contextual-links-wrapper a').attr('aria-hidden', true);
      if ($('.admin-menu').length) {
        if (!$('#admin-menu').length) {
          Drupal.admin.attachBehaviors = function (context, settings, $adminMenu) {
            if ($adminMenu.length) {
              $adminMenu.addClass('admin-menu-processed');
              $.each(Drupal.admin.behaviors, function() {
                this(context, settings, $adminMenu);
              });
              $adminMenu.find('a').attr('aria-hidden', true);
            }
          };
        }
      }
    },
    wysiwygAriaCKE: function () {
      // Add aria support to CKEditor.
      if (Drupal.wysiwyg && Drupal.wysiwyg.instances && CKEDITOR) {
        CKEDITOR.on('instanceReady', function(ev) {
          $('.cke').once('cke-aria', function () {
            $(this).removeAttr('aria-labelledby').removeAttr('role');
            var $field = $(this).closest('.form-type-textarea');
            var label = $field.find('label').text();
            $('iframe', $field).attr('title', label);
            ev.editor.document.$.title = label;
          });
        });
      }
    },
    disabledFields: function ($selector) {
      // On webform component we will be used .webform-conditional-disabled instead .disabled.
      $selector.find('.webform-component .selector, .webform-component .form-text[disabled]:not([readonly])').once('disabled', function () {
        $(this).removeClass('disabled');
      });
      $selector.find('.form-text[disabled]').once('disabled', function () {
        var $this = $(this);
        var ariaLabel = $('label[for="' + $this.attr('id') + '"]').text() + '.';
        var $description = $this.closest('.form-wrapper').find('.description');
        var descriptionText = $description.text();
        if ($this.is('.date-clear')) {
          descriptionText = Drupal.t('You are not able to edit this field.'),
          $this.closest('.form-wrapper').find('.description').text(descriptionText);
        }
        if ($description.length) {
          ariaLabel += ' ' + descriptionText;
        }
        // Init state.
        $this
          .attr('readonly', 'readonly')
          .removeAttr('disabled')
          .addClass('disabled')
          .attr('aria-label', ariaLabel);

        // Change attributes on states triggering.
        $this.bind('state:disabled', function(e) {
          if (e.trigger) {
            setTimeout(function() {
              if (e.value) {
                $this.attr('readonly', 'readonly').removeAttr('disabled').addClass('disabled');
              }
              else {
                $this.removeAttr('readonly').removeClass('disabled');
              }
            }, 50);
          }
        });
      });
      $selector.find('textarea[disabled]').once('disabled', function () {
        // Skip textareas disabled by webform condition.
        if ($(this).parents('.webform-conditional-hidden')) {
          return;
        }
        var $textField = $(this).closest('.form-item');
        var $description = $textField.parent().find('.description');
        var $descriptionText = $description.text();
        var $descriptionID = $(this).attr('id') + '-desc';
        var ariaLabel = $textField .find('label').first().text() + '. ';
        $textField.attr('tabindex', 0);
        $textField.parent().before($('<div class ="element-invisible" id="' + $descriptionID +'">' + ariaLabel + $descriptionText + '</div>'));
        $textField.attr('aria-labelledby', $descriptionID);
      })
      $selector.find('select[disabled]').once('disabled', function () {
        var $select = $(this);
        var $descriptionID = $select.parent().find('.ms-container').attr('id') + '-desc';
        var $description = $select.parent().find('.description');
        var $descriptionText = $description.text();

        if ($select.is('.shs-enabled')) {
          $(this).closest('.shs-wrapper-processed').attr('tabindex', 0);
          var $shsWidget = $(this).closest('.field-widget-taxonomy-shs');
          $shsWidget.find('.form-submit').attr('disabled', 'disabled');
          $shsWidget.find('.tabledrag-handle').hide();
          var ariaLabel = $shsWidget.find('thead label').first().text() + '. ';
          $select.before($('<div>', {
            'text': ariaLabel,
            'id': $descriptionID,
            'class': 'element-invisible'
          }));
          var $extraSelects= $('select[id*=' + $select.attr('id') + ']');
          $extraSelects.attr('disabled', 'disabled');
          $extraSelects.bind('keydown', function (e) {
            if ($.inArray(e.keyCode, [13, 32, 38, 40]) >= 0) {
              e.preventDefault();
            }
          }).bind('mousedown mouseup', function () {
            return false;
          });
         $extraSelects.attr('aria-label', ariaLabel + $descriptionText);
        }
        else if ($select.attr('multiple')) {
          var ariaLabel = $select.parent().find('label').first().text() + '. ';
          $msSelect = $select.closest('.form-item').find('.ms-container');
          var defaultValues = '';
          $msSelect.find('.ms-selection li').each(function(index, el) {
            defaultValues = defaultValues + $(this).text() + ', ';
          });
          $select.before($('<div>', {
            'text': ariaLabel + $descriptionText + '. ' + defaultValues,
            'id': $descriptionID,
            'class': 'element-invisible'
          }));
          $msSelect
            .attr('aria-labelledby', $descriptionID)
            .attr('tabindex', 0);

          $msSelect.find('li, ul').each(function(index, el) {
            $(this).removeAttr('tabindex');
          });
        }
        else if ($select.parent().is('.selector.disabled')) {
          var $uniformSelect = $select.parent();
          var $descriptionText = $uniformSelect.parent().find('.description').text();
          if ($descriptionText == '') {
            $descriptionText = $uniformSelect.closest('fieldset').parent().find('.description').text();
          }
          var $descriptionID = $uniformSelect.attr('id') + '-desc';
          var ariaLabel = $uniformSelect.parent().find('label').first().text() + '. ';
          $uniformSelect.before($('<div>', {
            'text': ariaLabel + $descriptionText,
            'id': $descriptionID,
            'class': 'element-invisible'
          }));
          $uniformSelect.attr('aria-labelledby', $descriptionID);
          $uniformSelect.attr('tabindex', 0);
        }
      });
    },
    invotraModalARIA: {
      hide: function (lastFocused) {
        $('#page').removeAttr('aria-hidden');
        if (lastFocused) {
          lastFocused.focus();
          if (lastFocused.is('.tabbed')) {
            lastFocused.addClass('focus').removeClass('no-ouline');
            invotraBase.focusedInput(lastFocused);
          }
        }
      },
      show: function ($selector) {
        if ($selector.length) {
          $selector.attr({
            'role': 'dialog',
            'aria-hidden': false,
            'aria-visible': 'true'
          });
          $('#page').attr('aria-hidden', true);
        }
      }
    },
    modalAccessibility: function ($selector) {
      var _this = this;
      var $modal = $selector.find('body.page-media-format-form, #modalContent, .ui-dialog.ui-widget');
      $modal.once('accessible', function () {
        var $this = $(this);
        $this.keydown(function (e) {
          if ((e.which || e.keyCode) == 9) {
            var $focusableElements = $('a, input, textarea, select, button', $this);
            var $first = $focusableElements.filter(':visible').first(),
                $last = $focusableElements.filter(':visible').last();
            if (!e.shiftKey && $last.is(":focus")) {
              e.preventDefault();
              $first.focus();
            }
            else if (e.shiftKey && $first.is(":focus")) {
              e.preventDefault();
              $last.focus();
            }
          }
          if ((e.which || e.keyCode) == 27) {
            if ($('body.page-media-format-form').length) {
              $('.media-title .close').click();
            }
          }
        });
      });

      // Add extra attributes on modal open/close.
      setTimeout(function() {
        var invotraModalShow = function (ajax, response, status) {
          if ($('#modalContent').length == 0) {
            Drupal.CTools.Modal.show(Drupal.CTools.Modal.getSettings(ajax.element));
          }
          $('#modal-title').html(response.title);
          // Simulate an actual page load by scrolling to the top after adding
          // the content. This is helpful for allowing users to see error
          // messages at the top of a form, etc.
          $('#modal-content').html(response.output).scrollTop(0);

          // Attach behaviors within a modal dialog.
          var settings = response.settings || ajax.settings || Drupal.settings;
          Drupal.attachBehaviors('#modalContent', settings);

          if ($('#modal-content').hasClass('ctools-modal-loading')) {
            $('#modal-content').removeClass('ctools-modal-loading');
          }
          else {
            // If the modal was already shown, and we are simply replacing its
            // content, then focus on the first focusable element in the modal.
            // (When first showing the modal, focus will be placed on the close
            // button by the show() function called above.)
            $('#modal-content :focusable:first').focus();
          }
          _this.invotraModalARIA.show($('#modalContent'));

        };
        var invotraModalDismiss = function () {
          Drupal.CTools.Modal.modal_dismiss();
          _this.invotraModalARIA.hide(_this.lastFocused);
        };
        $('body.html').once('CToolsDetachBehaviors', function () {
          $(document).bind('CToolsDetachBehaviors', function (e, context) {
            if ($(context).is('#modalContent')) {
              _this.invotraModalARIA.hide(_this.lastFocused);
            }
          });
        });
        // Override modal callbacks to own.
        Drupal.ajax.prototype.commands.modal_display = invotraModalShow;
        Drupal.ajax.prototype.commands.modal_dismiss = invotraModalDismiss;

        // Use own events on open/close for media modals.
        if (Drupal.media && Drupal.media.popups) {
          var dialogOptions = Drupal.media.popups.getDialogOptions();
          Drupal.media.popups.getDialogOptions = function () {
            dialogOptions['close'] = function (event, ui) {
              var $iframe = $(event.target);
              // Workaround IE iframe removal bug.
              $iframe.attr('src', 'about:blank');
              $iframe.remove();
              $(this).dialog('close');
              _this.invotraModalARIA.hide(_this.lastFocused);
            };
            dialogOptions['open'] = function (event, ui) {
              _this.invotraModalARIA.show($(event.target).closest('.ui-dialog'));
            };
            return dialogOptions;
          }
        }
      }, 200);
      $('.ctools-use-modal, a.open-ui-dialog').once(function () {
        $(this).click(function () {
          _this.lastFocused = $(this).removeClass('tabbed');
        });
        $(this).keyup(function (e) {
          if ($.inArray(e.keyCode, [13, 32]) >= 0) {
            _this.lastFocused = $(this).addClass('tabbed');
          }
        });
      });
    },
    orgChartAria: function ($selector) {
      var $orgChartViews = $selector.find('.pane-org-chart-panel-pane-6, .pane-org-chart-panel-pane-4');
      $orgChartViews.once('org-chart-aria', function (i) {
        var labelId = 'org-chart-aria-label-' + ++i;
        $('.pane-title', $(this)).attr('id', labelId);
        $(this).attr({
          'role': 'complementary',
          'aria-labbeledby': labelId
        });
      });
    },
    tableDragAria: function ($selector) {
      $selector.find('.tabledrag-handle').once('table-drag-aria', function () {
        $(this).attr({
          'aria-hidden': true,
          'tabindex': -1,
          'aria-label': Drupal.t('Drag and drop icon, use show row weights link to order items')
        });
      });
    },
    multipleSelects: function ($selector) {
      $selector.find('.field-multiple-table .form-type-select select').once('select-aria', function () {
        var $this = $(this),
            $label = $.trim($this.closest('table').find('thead label').text());

        $this.before('<label class="element-invisible" for="' + $this.attr('id') + '">' + $label + '</label>');
      });
    }
  };

  /**
   * Accessible ARIA alerts.
   */
  Drupal.behaviors.invotraBaseAriaAlerts = {
    attach: function (context, settings) {
      var $messages = $(context).find('.messages').parent();
      if (!$messages.is('#messages') && !$messages.is('#messages-wrapper')) {
        $messages = $('.messages', $messages).wrapAll('<div id="messages-wrapper" />').parent();
      }
      $messages.once('aria-alerts', function () {
        // Focusing except draggable table messages.
        if (!$messages.find('.tabledrag-changed-warning').length) {
          var $this = $(this);
          var height = $this.height();
          var $content = $this.html();
          $this.attr('tabindex', -1).empty().height(height);
          setTimeout(function () {
            $this.html($content).focus().css('height', 'auto');
          }, 100)
        }
      });
    }
  };

  /**
   * Accessible ARIA search.
   */
  Drupal.behaviors.invotraBaseAriaSearch = {
    attach: function (context, settings) {
      var $context = $(context);
      // Accessibility for checkbox only without link "tabbing".
      $context.find('.facetapi-facetapi-checkbox-remove, .facetapi-facetapi-checkbox-links').once('checkbox-merge', function () {
        var mainLabel = $(this).closest('.panel-pane').find('.pane-title').text();
        $('li', $(this)).each(function (i) {
          var $this = $(this),
              $checkbox = $('input[type="checkbox"]', $this);
          if ($checkbox.length) {
            if (i == 0) {
              $this.prepend('<label class="element-invisible" tabindex="0">' + mainLabel + '</label>');
            }
            var label = $('a', $this).attr('tabindex', -1).attr('title');
            $checkbox.attr('aria-label', label);
          }
        });
      });

      // Function for adding aria-labels to links.
      function addAriaLabel($selector) {
        $selector.once('aria-label', function () {
          var baseLabel = $.trim($(this).text().replace(':', ''));
          $(this).parent().find('a').each(function () {
            $(this).prepend('<span class="element-invisible">' + baseLabel + '</span>');
          });
        });
      }
      // Add aria-labels to search results links.
      addAriaLabel($context.find('.views-label', $('.view-simple-search')));
      // Add aria-labels to user fields.
      addAriaLabel($context.find('#user-profile .hide-label .field-label'));
      // Add aria-labels to org_chart view fields.
      addAriaLabel($context.find('.view-org-chart .field-aria-lbl'));
    }
  };

  Drupal.behaviors.invotraBaseAria = {
    attach: function(context, settings) {
      var $context = $(context);
      $context.find('#section-footer').attr('role','contentinfo');
      $context.find('#region-content').attr('role', 'main');
      // Modal accessibility.
      Drupal.invotra.invotraBase.ARIA.modalAccessibility($context);
    }
  };

  /**
   * Add additional class to profile's "tabs".
   *
   * We need this to make invotraMediaBrowserAria behavior don'tes to
   * the profile's "tabs".
   */
  Drupal.behaviors.invotraProfileAria = {
    attach: function (context) {
      var $profile = $(context).find('.page-user');
      if ($profile.length > 0) {
        $('ul.tabs.primary').addClass('without-roles');
        $('ul.tabs.primary').parent().addClass('without-roles');
      }
    }
  };

  /**
   * Add keyboard interaction to the tabs.
   */
  Drupal.behaviors.invotraTabsKeyboardInteraction = {
    attach: function (context) {
      function setTabIndex($tabs, $activeTab) {
        $('a', $tabs).attr('tabindex', -1);
        $activeTab.attr('tabindex', 0);
      }

      var $tabs = $('.ui-tabs .ui-tabs-nav', context),
          keyCodes = [13, 27, 32],
          $nextLink = null,
          previousTabKey = 37,
          nextTabKey = 39;
      $('a', $tabs).attr('tabindex', -1).blur(function () {
        $(this).removeClass('dont-scroll');
      });
      $tabs.find('li.ui-state-active a').attr('tabindex', 0);

      if ($tabs.parents('.ui-tabs.tabs-left').length > 0) {
        previousTabKey = 38;
        nextTabKey = 40;
      }
      keyCodes.push(previousTabKey, nextTabKey);
      $tabs.bind({
        keydown: function (e) {
          if ($.inArray(e.keyCode, keyCodes) < 0) {
            return;
          }
          e.preventDefault();

          var $currentLink = $(e.target),
              $currentLinksLi = $currentLink.closest('li');
          switch (e.keyCode) {

              // Right arrow.
            case nextTabKey:
              if (!$currentLinksLi.is(':last-child')) {
                $nextLink = $currentLinksLi.next().find('a');
              }
              else {
                $nextLink = $currentLink.parents('ul').find('li:first-child a');
              }

              setTabIndex($tabs, $nextLink);
              $nextLink.addClass('dont-scroll').click().focus().addClass('focus');
              $currentLink.blur().removeClass('focus');
              break;

              // Left arrow.
            case previousTabKey:
              if (!$currentLinksLi.is(':first-child')) {
                $nextLink = $currentLinksLi.prev().find('a');
              }
              else {
                $nextLink = $currentLink.parents('ul').find('li:last-child a');
              }
              setTabIndex($tabs, $nextLink);
              $nextLink.addClass('dont-scroll').click().focus().addClass('focus');
              $currentLink.blur().removeClass('focus');
              break;

              // Enter/space key.
            case 13:
            case 32:
              return false;
          }
        }
      });
    }
  };

  /**
   * Accessible ARIA Media Browser.
   */
  Drupal.behaviors.invotraMediaBrowserAria = {
    aTab: false,

    getCurrentTab: function ($links) {
      var cIndex = null;
      $links.each(function( i, link ){
        var focused = false;
        var $link = $(link);
        try {
          focused = $('a', $link).is(':focus');
        }
        catch (error) {
          focused = $('a', $link).is(document.activeElement);
        }
        if (focused) {
          cIndex = i;
          return 0;
        }
      });
      return cIndex;
    },

    tabFocus: function(tab) {
      var $tab = $(tab);
      $('a', $tab).focus();
      $('a', $tab).triggerHandler( "focus" );
    },

    activateTab: function(tab) {
      var $tab = $(tab);
      $("a", $tab).click();
      $("a", $tab).triggerHandler( "click" );
    },

    contentNavigation: function (content, e) {
      var $content = $(content);
      var $focusableElements = $('a, input, textarea, select, button', $content);
      var $first = $focusableElements.filter(':visible').first(),
        $last = $focusableElements.filter(':visible').last();
      if (!e.shiftKey && $last.is(":focus")) {
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
        $first.focus();
      }
      else if (e.shiftKey && $first.is(":focus")) {
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
        $last.focus();
      }
    },

    attach: function (context) {
      var self = this;

      $("body").once("invotraMediaBrowserAria", function () {
        var $tabset = $('.tabs:not(.without-roles)');
        var $links = $("li", $tabset);
        var $modal = $(this);

        $tabset.attr('role','tablist');
        $links.attr('role','presentation');
        $('a', $links).attr('role', 'tab');

        // Manage modal processes.
        $(window).bind("keydown.navigation", function (e) {
          switch ((e.which || e.keyCode)) {
            // Switch on tabs/close modal on ESC key.
            case 27:
              if (self.aTab) {
                self.aTab = false;
                var $tab = $(".ui-tabs-selected", $tabset);
                self.tabFocus($tab);
              }
              else {
                $(".media-title .close").click();
              }
              break;

            // Switch on tab content on Space and Enter keys.
            case 32:
            case 13:
              var cIndex = self.getCurrentTab($links);
              if (cIndex == null) {
                return;
              }
              e.preventDefault ? e.preventDefault() : (e.returnValue = false);
              self.activateTab($links[cIndex]);
              self.tabFocus($links[cIndex]);
              return;
              break;

            // Navigation on modal/tab content.
            case 9:
              var cIndex = self.getCurrentTab($links);
              if (cIndex == null) {
                self.contentNavigation($modal, e);
                return;
              }
              if ($($links[cIndex]).hasClass('ui-tabs-selected')) {
                var $acContent = null;
                $('.media-browser-tab').each(function () {
                  if ( $(this).hasClass("ui-tabs-hide")) {
                    return 1;
                  }
                  else {
                    $acContent = $(this);
                    return 0;
                  }
                });

                if ($acContent != null) {
                  self.aTab = true;
                  e.preventDefault ? e.preventDefault() : (e.returnValue = false);
                  $('a, input, textarea, select, button', $acContent).filter(':visible').first().focus();
                  return;
                }
              }
              self.contentNavigation($modal, e);
              break;

            case 37:
            case 38:
            case 39:
            case 40:
              var cIndex = self.getCurrentTab($links);
              if (cIndex != null) {
                e.preventDefault ? e.preventDefault() : (e.returnValue = false);
              }
              break;
          }
        });

        // Manage tab navigation.
        $(window).bind("keyup.navigation", function (e) {
          // Works only for Left, Up, Right and Down arrows.
          if ([37, 38, 39, 40].indexOf(e.which) === -1
            && [37, 38, 39, 40].indexOf(e.keyCode) === -1) {
            return;
          }
          var cIndex = self.getCurrentTab($links);
          if (cIndex == null) {
            return;
          }
          e.preventDefault ? e.preventDefault() : (e.returnValue = false);
          switch ((e.which || e.keyCode)) {
            // Down arrow.
            case 40:
            // Right arrow.
            case 39:
              $('a', $links).blur();
              if (typeof $links[cIndex + 1] == "undefined") {
                self.tabFocus($links[0]);
              }
              else {
                self.tabFocus($links[cIndex + 1]);
              }
              break;

            // Up arrow.
            case 38:
            // Left arrow.
            case 37:
              $('a', $links).blur();
              if (typeof $links[cIndex - 1] == "undefined") {
                self.tabFocus($links[$links.length - 1]);
              }
              else {
                self.tabFocus($links[cIndex - 1]);
              }
              break;
          }
        });

      });
    }
  };

  /**
   * Accessible ARIA landing page search.
   */
  Drupal.behaviors.invotraLandingPageAria = {
    attach: function(context, settings) {
      var $LandingSearch = $('#ilp-search-form .form-item-search input', context);
      var $LandingPlaceholder = $LandingSearch.attr('placeholder');
      var $LandingId = $LandingSearch.attr('id');
      $LandingSearch.once('LpSearchAria', function() {
        $(this).before('<h2><label for="' + $LandingId + '" class="element-invisible">' + $LandingPlaceholder + '</label></h2>')
      });

      var $viewRow = context == document ? $(context) : $(context).parent();
      // Accessibility link of entire article.
      $viewRow
        .find('.view-messages-feed, .view-my-workspace-my-notifications, .view-find-teams, .view-find-locations, .view-apps-ideas')
        .each(function () {
          var $link = $(this).find('.views-row a.view-row-link-background, .views-row .user-picture a, .views-row .views-field-image a');
          $link
            .attr('aria-hidden', true)
            .attr('tabindex', '-1');
        });

      // Search checkboxes accessibility.
      $('#invotra-landing-search .pane-invotra-panes-facets-display', context).once('LpCheckboxAria', function() {
        // Remove active facet text and title
        if ($.fn.uniform) {
          $(this).find('.facetapi-active').empty();
          $(this).find('a')
            .removeAttr('title')
            .each(function () {
              $(this).find('span.element-invisible').remove();
            });
        }
      });
    }
  };

  /**
   * ARIA warning for mobile view.
   */
  Drupal.behaviors.invotraZoomAriaAlert = {
    attach: function (context) {
      $('body').once('invotraZoomAriaAlert', function() {
        var ariaText = Drupal.t("You are now viewing the site on a mobile resolution. Page elements may be placed differently. Use CTRL + 0 to reset browser zoom and view in a desktop resolution again."),
            $this = $(this);

        $this.prepend($('<p id="mobile-aria-alert" class="element-hidden">' + ariaText + '</p>').attr('role', 'alert'));

        var manageAlert = function () {
          if ((window.innerWidth <= 960) && $this.find('#mobile-aria-alert').hasClass('element-hidden')) {
            $this.find('#mobile-aria-alert').text('');
            $this.find('#mobile-aria-alert').removeClass('element-hidden');
            $this.find('#mobile-aria-alert').text(ariaText);
          }
          else if (window.innerWidth > 960) {
            $this.find('#mobile-aria-alert').addClass('element-hidden');
          }
        };

        $(window).bind('invotraWindowResize', function () {
          setTimeout(manageAlert, 200);
        });
        setTimeout(manageAlert, 200);
      });
    }
  };

  /**
   * Accessibility for apps refine form.
   */
  Drupal.behaviors.invotraRefineAria = {
    attach: function (context, settings) {

      // Apps search form.
      var $appSearch = $('#invotra-apps-refine-form .form-item input', context);
      var $appsPlaceholder = $appSearch.attr('placeholder');
      var $appsId = $appSearch.attr('id');

      // Adds label
      $appSearch.once('RefineAria', function() {
        $(this)
          .before('<h2><label for="' + $appsId + '" class="element-invisible">' + $appsPlaceholder + '</label></h2>')
      });
    }
  };

  /**
   * Accessibility for webform.
   */
  Drupal.behaviors.invotraWebformAria = {
    attach: function (context, settings) {

      var $table = $('table.webform-grid', context);
      $table.once('RefineAria', function() {
        $(this).find('caption').attr({'aria-hidden' : 'true'}).addClass('element-invisible');
      });
    }
  };

  /**
   * Accessibility for rate widget.
   */
  Drupal.behaviors.invotraRateWidgetAria = {
    attach: function (context, settings) {

      // Apps search form.
      var $rateWidget = $('.rate-widget', context);

      // Adds label
      $rateWidget.once('RateWidgetAria', function() {
        var rateLink = $rateWidget.find('.rate-button');
        var rateCount = $rateWidget.find('.count');

        rateLink
          .each(function() {
            var liked = $(this).hasClass('rate-fivestar-btn-filled')
              || $(this).hasClass('voted')
              || $(this).hasClass('user-voted')
              || $(this).parent().hasClass('liked');

            $(this).attr({
              'title': liked
                ? Drupal.t('Unlike this content')
                : Drupal.t('Like this content'),
                'aria-pressed': liked ? true : false
            });
            var text = $(this).parent().find('.rate-button').hasClass('user-voted')
              ? Drupal.t('Unlike this content')
              : Drupal.t('Like this content');
            $(this).parent().find('.rate-text').text(text);
        });

        var rateFocus = function (rate) {
          $(rate).bind({
            'blur': function () {
              $(this).parents('div.item-list').removeClass('focus');
              $(this).parent().removeClass('focus');
            },
            'focus': function () {
              if ($(this).parents('div.item-list').length) {
                $(this).parents('div.item-list').addClass('focus');
              }
              else {
                $(this).parent().addClass('focus');
              }
            },
            'click': function () {
              $(this).parents('div.item-list').removeClass('focus');
              $(this).parent().removeClass('focus');
            },
            'mousedown': function (e) {
              e.preventDefault();
            }
          });
        };

        // Call focus function.
        rateFocus(rateLink);
        rateFocus(rateCount);
      });
    }
  };
  /**
   * Title accessibility.
   */
  Drupal.behaviors.invotraTitleUpdate = {
    attach: function (context, settings) {
      $('a.ctools-use-modal').once('title-update', function () {
        var $title = $(this).attr('title');
        if (!$title) {
          $(this).removeAttr('title');
        }
      });
    }
  };

  /**
   * Password field accessibility.
   */
  Drupal.behaviors.invotraPasswordAccessibility = {
    attach: function (context, settings) {
      $('.form-type-password .password-strength', context).once('password-accessibility', function () {
        var $text = $(this).find('.password-strength-text'),
            $title = $(this).find('.password-strength-title'),
            $fake_text = $('<div></div>', {
              'class': 'fake-password-strength',
              'aria-live': 'assertive',
              'css': {position: 'absolute', left: '-999em'}
            });
        $text.removeAttr('aria-live');
        $(this).append($fake_text);
        $(this).parent().find('input.password-field').bind('keyup', function () {
          $fake_text.html($title.html() + ' ' + $text.html());
        });
      });
    }
  }

})(jQuery);
