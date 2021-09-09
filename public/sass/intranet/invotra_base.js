(function ($) {
  $.fn.getHiddenDimensions = function (includeMargin) {
    var $item = this,
      props = { position: 'absolute', visibility: 'hidden', display: 'block' },
      dim = { width: 0, height: 0, innerWidth: 0, innerHeight: 0, outerWidth: 0, outerHeight: 0 },
      $hiddenParents = $item.parents().andSelf().not(':visible'),
      includeMargin = (includeMargin == null) ? false : includeMargin;

    var oldProps = [];
    $hiddenParents.each(function () {
      var old = {};

      for (var name in props) {
        old[name] = this.style[name];
        this.style[name] = props[name];
      }

      oldProps.push(old);
    });

    dim.width = $item.width();
    dim.outerWidth = $item.outerWidth(includeMargin);
    dim.innerWidth = $item.innerWidth();
    dim.height = $item.height();
    dim.innerHeight = $item.innerHeight();
    dim.outerHeight = $item.outerHeight(includeMargin);

    $hiddenParents.each(function (i) {
      var old = oldProps[i];
      for (var name in props) {
        this.style[name] = old[name];
      }
    });

    return dim;
  }

  var invotraBase = Drupal.invotra.invotraBase;

  // Disable CKEDITOR plugins.
  try {
    if (CKEDITOR && CKEDITOR.config) {
      var pluginsDisabled = 'magicline';
      if(!CKEDITOR.config.removePlugins.length) {
        CKEDITOR.config.removePlugins = pluginsDisabled;
      } else {
        CKEDITOR.config.removePlugins += ',' + pluginsDisabled;
      }
    }
  } catch (error) {}

  /**
   * Mobile detection.
   * (not custom, from detectmobilebrowsers.com)
   */
  window.invotraMobileAndTabletCheck = function() {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };

  /**
   * Invotra base common behavior.
   */
  Drupal.behaviors.invotraCommonBehavior = {
    attach: function (context, settings) {
      var $context = $(context);
      // Add input tip to seach field.
      var $searchInput = $context.find('#block-invotra-search-and-do-search-lite:not(.clone) .form-text');
      $searchInput.attr('placeholder', Drupal.t('Enter search term here...'));

      // Add input tip to seach field for user management.
      var $searchDoInput = $context.find('.view-search-and-do-users .form-item-search-api-fulltext-field-text .form-text');

      var $searchDoSelect = $context.find('.view-search-and-do-users .form-item-search-api-fulltext-field-field select');
      $searchDoInput.attr('placeholder', Drupal.t('Search Username'));
      var setPlaceholder = function ($searchDoSelect, $searchDoInput) {
        if ($searchDoSelect.val() == 'search_api_aggregation_11') {
          if ($searchDoInput.val() == Drupal.t('Search Team')) {
            $searchDoInput.val('')
          }
          invotraBase.placeholderWithFallback($searchDoInput, Drupal.t('Search Username'), true, true)
        }
        else {
          if ($searchDoInput.val() == Drupal.t('Search Username')) {
            $searchDoInput.val('')
          }
          invotraBase.placeholderWithFallback($searchDoInput, Drupal.t('Search Team'), true, true)
        }
      };
      setPlaceholder($searchDoSelect, $searchDoInput);

      $searchDoSelect.change(function() {
        setPlaceholder($(this), $searchDoInput);
      });

      // Teamspace dropdown.
      $context.find('.pane-ts-content-add a.teamspace-add-content').once().click(function (e) {
        $(this).parent().find('ul').slideToggle('fast');
        $(this).toggleClass('close');
        e.preventDefault();
      });

      // Add input tip to seach within Groups.
      var $searchGroup = $context.find('#invotra-group-search-groups-form .form-text');
      $searchGroup.attr('placeholder', Drupal.t('Search within Groups'));


      // Makes <li> element clickable (redirect to href from <a> inside <li>).
      $context.find('#invotra-settings ul.menu li').once().click(function(event) {
        document.location.href = ($(this).find('a').attr('href'));
        event.stopPropagation();
      });

      // Search forms with connected focus for submit and textfield.
      var $searchBars = $context.find('.pane-fulltext-search-bar');
      $searchBars.once(function () {
        var $this = $(this),
            $form = $this.find('form');
        var $button = $('<button>', {
          'aria-label': Drupal.t('Search'),
          'class': 'submit'
        });
        $form.append($button).find('.form-submit').hide();
        $('input, button', $form).bind({
          'blur': function () {
            $form.removeClass('focus');
          },
          'focus': function () {
            $form.addClass('focus');
          }
        });
        if ($searchBars.parents('#mini-panel-group_members_add_search').length) {
          $(this).removeClass('pane-fulltext-search-bar');
          $button.text(Drupal.t('Search'));
        }
      });
    }
  };

  /**
   * Theme search by for user management.
   */
  Drupal.behaviors.invotraSearchUserManagement = {
    attach: function (context, settings) {
      var $context = $(context);
      var $roles = $context.find('.views-widget-filter-rid');
      var $anonymised = $context.find('.views-widget-filter-field_anonymised_value');
      var $username = $context.find('.views-widget-filter-name');
      var $team = $context.find('.views-widget-filter-name_1');
      var $searchBy = $context.find('.form-item-search-by');
      // Hide/show the text/select field.
      var textfiledToSelect = function (value) {
        if (typeof value !== 'undefined') {
          if (value == 'roles') {
            $username.find('input').val('');
            $username.hide();
            $team.find('input').val('');
            $team.hide();
            $anonymised.find('select').val(0);
            $anonymised.hide();
            $roles.show();
          }
          else if (value == 'anonymised') {
            $username.find('input').val('');
            $username.hide();
            $team.find('input').val('');
            $team.hide();
            $roles.find('select').val('All');
            $roles.hide();
            $anonymised.show();
          }
          else if (value == 'team') {
            $username.find('input').val('');
            $username.hide();
            $roles.find('select').val('All');
            $roles.hide();
            $anonymised.find('select').val(0);
            $anonymised.hide();
            $team.show();
          }
          else {
            $team.find('input').val('');
            $team.hide();
            $roles.find('select').val('All');
            $roles.hide();
            $anonymised.find('select').val(0);
            $anonymised.hide();
            $username.show();
          }
        }
      };
      textfiledToSelect($searchBy.find('select option:selected').val());
      $searchBy.find('select').change(function() {
        textfiledToSelect($(this).find('option:selected').val());
      });
    }
  };

  /**
   * Invotra base theme behavior.
   */
  Drupal.behaviors.invotraThemeBehavior = {
    attach: function (context, settings) {
      var $context = $(context);
      // Form elements.
      $context.find('select:not([multiple], .element-invisible, .no-uniform)').once().uniform();
      $context.find('input[type="checkbox"]').once().uniform();
      $context.find('.checker input[type="checkbox"]').once().bind('change', function () {
        $.uniform.update($(this));
      });

      // Add "select-all" checkbox binding with delay as it may be not rendered yet.
      setTimeout(function () {
        $('input[type="checkbox"]', $('th.select-all, th.views-field-views-bulk-operations')).once('select-all-theming', function () {
          $(this).bind('change', function () {
            var $tableCheckboxes = $(this).closest('table').find('tbody input[type="checkbox"]');
            var delay = ($.browser.msie && parseInt($.browser.version) <= 8) ? 300 : 0;
            setTimeout(function () {
              $.uniform.update($tableCheckboxes);
              $tableCheckboxes.trigger('update-checkbox');
            }, delay)
          });
        })
      }, 300);

      $context.find('input[type="radio"]').once().uniform();
      $context.find('input[type="file"]').once().uniform();
      $context.find('select[multiple]:not([name*="parameter[views][settings][views]"])').once().multiSelect();

      // Filter wrapper collapse.
      var $filterWrapper = $context.find('.filter-wrapper');
      $('.filter-guidelines', $filterWrapper).hide();
      $('.filter-help a', $filterWrapper).text('').once().click(function (e) {
        $(this).parents('.fieldset-wrapper').find('.filter-guidelines').slideToggle();
        e.preventDefault();
      });

      // Will be skipped if context is not document.
      $context.find('body').once('invotraThemeBehavior-behavior-events', function () {
        // Fix shs selects visibilitty.
        $(document).ajaxSuccess(function() {
          $('.selector select.shs-select').each(function () {
            var $that = $(this);
            // Uniform placing select in same ".selector" wrapper, we should move this.
            if ($('.shs-select', $that.parent()).length > 1) {
              $('.shs-select', $that.parent()).last().insertAfter($that.parent())
            }
            // Update selector on ajax complete to show selected items.
            $.uniform.update($that);

            // Add specific class to know that selector for shs select.
            $that.parent('.selector').addClass('shs-selector');
            if ($that.is('.error')) {
              $that.parent('.selector').addClass('el-error');
            }

            // Show selector if shs select already visible.
            if ($that.parent('.selector').is(':hidden') && $that.css('display') !== "none") {
              $that.parent('.selector').show();
            }

            // Remove extra selects on change.
            $that.bind('change', function () {
              $that.parent('.selector').nextAll('select, .selector').remove();
            });

            // Apply uniform to new selects.
            $that.parent('.selector').nextAll('select.shs-select').once().uniform();
          });
        });
      });

      setTimeout(function () {
        $.uniform.update($context.find('select.shs-select'));
      }, 0);

      // Add extra listener to support change event needed for VBO.
      $('input.vbo-table-select-all, input.vbo-select').bind('change', function() {
        $.uniform.update($('input.vbo-select'));
        $.uniform.update($('input.vbo-table-select-all'));
      });

      // Set max-width for textfields based on parents.
      $context.find('.form-text').each(function () {
        var parentWidth = $(this).closest('form').width();
        var gridClass = invotraBase.textfieldWidth(parentWidth);
        $(this).addClass(gridClass);
      });

      // Collapsible more information mini panel.
      var $expandPanels = $context.find('.pane-more-information .pane-panels-mini, .pane-primary-details, .pane-panels-mini.pane-related-stuff');
      $expandPanels.once('more-info', function () {
        var $target = $('> .pane-title', $(this));
        $target.wrap('<div class="accordion-menu-wrapper"></div>');
        var $targetWrap = $target.parent();
        $targetWrap
          .addClass('expandable collapsed')
          .append('<button class="ico" type="button"><span class="ico-accordion" aria-hidden="true"></span></button>')
          .next().slideUp();
        $targetWrap.parent().attr({'role': 'presentation'});
        $targetWrap.next().find('.panel-display').attr({'role': 'region'});
        $('> button.ico', $targetWrap).attr({
          'role': 'button',
          'aria-labelledby': $target.attr('id'),
          'aria-expanded' : false
        });
      });
      var $ico = $('.accordion-menu-wrapper .ico', $expandPanels);
      $ico.bind({
        'blur': function () {
          $ico.removeClass('focus');
        }
      });
      $ico.once().click(function (e) {
        e.preventDefault();
        $(this).attr({'aria-expanded' : $(this).parent().hasClass('collapsed')});
      });
      $('.accordion-menu-wrapper.expandable',$expandPanels).once().click(function () {
        $(this).toggleClass('collapsed').next().slideToggle();
      });

      // Hide page title if it added on node panel.
      if ($context.find('.page-node .pane-node-title').length) {
        $context.find('#page-title').hide();
      }

       // Quick fix for media modal tabs.
      if ($.fn.tabs) {
        $context.find('.media-browser-tab').parent()
        .addClass('tabs-processed')
        .tabs();
      }

      // Add separator class to node multiple fields.
      var $mFields = $context.find('.field-name-field-teamspace,\
        .field-name-field-related-content-fields,\
        .field-name-field-related-external-links,\
        .field-name-field-organisational-unit,\
        .field-name-field-projects,\
        .field-name-field-locations,\
        .field-name-field-primary-category,\
        .field-name-field-region,\
        .field-name-field-grade');
      $('.field-item:not(:last)', $mFields).addClass('sep');

       // IE bug: remove class (sep) if it present on the last item.
       if ($('*:last-child', $mFields).hasClass('sep')) {
         $('*:last-child', $mFields).removeClass('sep');
       }

      // Highlight errors on themed form elements.
      $context.find('form .error').each(function () {
        var $that = $(this);
        if ($that.is('select')) {
          $that.closest('.selector').addClass('el-error')
        }
        if ($that.is('textarea')) {
          $that.parent().addClass('el-error');
        }
      });

      // Clickable favourites pane title.
      $context.find('.pane-add-to-favourites-list .pane-title').once('fav-pane', function () {
        $(this).addClass('clickable').click(function () {
          $(this).next().find('.use-ajax').click();
        });
      });

      var $forms = $context.find('.node-form');
      $('.field-multiple-table thead', $forms).closest('.form-item').addClass('multiple-table-wrapper');
      var $checkboxTitle = $context.find('.field-widget-options-onoff, .pane-invotra-custom-private').find('.form-type-checkbox');
      $checkboxTitle.once('checkbox-title', function () {
        var $this = $(this);
        var $label = $('label', $this);
        var $title = $('<h4>', {
          'text': $label.text()
        });
        $label.text(Drupal.t('Select'));
        if ($this.find('.help-button').length) {
          $this.find('.help-button').after($title);
        } else {
          $this.prepend($title);
        }
        $title.after($label);
      });

      //Help Footnotes
      var icons = {
        header: "fa-info-circle",
        activeHeader: "fa-info-circle"
      };
      var $description = $('.description, .fieldset-description', $context.find('.form-wrapper'));
      $description.once('description', function () {
        var $this = $(this);
        if ($this.find('.tooltip').length) {
          $this.attr({
            'role': 'dialog',
            'aria-hidden': 'true'
          });
          if ($this.closest('.media-widget.form-item').length) {
            $this.appendTo($this.closest('.media-widget.form-item'));
          } else {
            $this.appendTo($this.parent());
          }
          var removeClasses = 'top-left top-middle top-right right-top right-middle right-bottom bottom-right ' +
                              'bottom-left bottom-middle left-bottom left-top left-middle responsive-tip';
          var $tooltip = $this.find('.tooltip');
          var classes = $tooltip.attr('class');
          var elementId = $this.find('.element-id').text();
          var descParent = $this.parent();
          var $element = $();
          var $helpButton = $('<a>', {
            'href': '#',
            'class': 'help-button',
            'text': Drupal.t('Help'),
            'aria-expandable': 'true',
            'aria-expanded': 'false',
            'aria-label': Drupal.t('Open help dialog box'),
            'click': function (e) {
              e.preventDefault();
              var $this = $(this);
              var $tooltip = $this.parent().find('> .tooltip');
              $('.fieldset-description.tooltip, .description.tooltip').hide().attr('aria-hidden', 'true');
              $('.help-button.active').not($this).removeClass('active').attr('aria-expanded', 'false');
              if (!$this.hasClass('active')) {
                setPositions($tooltip.attr('class'));
                setTimeout(function() {
                  $tooltip.show();
                }, 100);
              }
              $this.toggleClass('active');
              if ($element.is('.form-textarea-wrapper')) {
                $element.once('updatePos', function () {
                  setPositions();
                });
              }
              var tooltipState = $tooltip.is(':visible');
              $this.attr('aria-expanded', tooltipState);
              $tooltip.attr('aria-hidden', !tooltipState);
              // Need to trigger window resize to get a correct tooltip position.
              // Force triggering invotraWindowResize to run the event handlers.
              $(window).trigger('invotraWindowResize');
            }
          });
          descParent.prepend($helpButton);

          var $close = $('<a>', {
            'class': 'btn close-btn',
            'text': Drupal.t('Close'),
            'click': function () {
              $('.fieldset-description.tooltip, .description.tooltip').hide().attr('aria-hidden', 'true');
              $('.help-button.active').removeClass('active').attr('aria-expanded', 'false');
            }
          });
          // Description dialog key event.
          var $dialogClose = $context.find('.description.tooltip .close-btn');
          $(document).keydown(function (e) {
            if (e.keyCode == 27) {
              if ($('.description.description-processed.tooltip').length) {
                $dialogClose.click();
              }
            }
          });

          $tooltip.removeAttr('class');
          $this.addClass(classes);
          $this.append($close);
          if (elementId) {
            if ($('#' + elementId).length) {
              $element = $('#' + elementId);
            } else {
              $element = $('*[id*="' + elementId + '"]').first();
            }
            if ($this.attr('class').indexOf('fieldset-description') > -1 && $element.closest('fieldset').length) {
              $element = $element.closest('fieldset');
            }
            if ($element.is('fieldset') && $element.find('>legend').length) {
              $element.css('position', 'relative').addClass('fieldset-tooltip');
              $element = $element.find('input:visible, textarea:visible').first();
            }
          }

          function setPositions(classes) {
            if ($element.length) {
              $element.closest('.ui-tabs-hide').addClass('fake-show');
              $element.closest('.form-wrapper:hidden').addClass('fake-show');
              descParent.css('position', 'relative');
              if ($element.is('select')) {
                if ($element.is(':not([multiple], .shs-enabled)')) {
                  $element = $element.parent();
                } else if ($element.is('.shs-enabled')) {
                  $element = $element.parent().find('.selector').last().show();
                } else {
                  $element = $('#ms-' + elementId).find('.ms-selection');
                }
              }
              else if ($element.is('textarea.wysiwyg')) {
                $element = $element.parent();
              }
              else if ($element.is(':checkbox') && $element.closest('.checker').length) {
                $element = $element.closest('.checker');
              }
              (function ($element, $description, classes) {
                var elementPos = $element.position();
                var top = elementPos.top;
                var left = elementPos.left;
                var newLine = true;
                if (classes.indexOf('left-') > -1 || classes.indexOf('right-') > -1) {
                  left = elementPos.left + $element.outerWidth()
                  if (classes.indexOf('-middle') > -1) {
                    top = (top + $element.outerHeight() / 2) - $description.outerHeight() / 2;
                  } else if (classes.indexOf('-bottom') > -1) {
                    top = top + $element.outerHeight() - $description.outerHeight();
                  }
                  if (classes.indexOf('right-') > -1) {
                    left = elementPos.left - $description.outerWidth()
                  }
                  newLine = false;
                } else if (classes.indexOf('top-') > -1 || classes.indexOf('bottom-') > -1) {
                  top = elementPos.top +  $element.outerHeight();
                  if (classes.indexOf('-middle') > -1) {
                    left = (left + $element.outerWidth() / 2) - $this.outerWidth() / 2;
                  } else if (classes.indexOf('-right') > -1) {
                    left = left + $element.outerWidth() - $this.outerWidth();
                  }
                  if (classes.indexOf('bottom-') > -1) {
                    top = elementPos.top - $description.outerHeight();
                  }
                  newLine = false;
                }
                if (newLine) {
                  $description.addClass('new-line');
                } else {
                  setTimeout(function () {
                    $description.css({
                      'position': 'absolute',
                      'top': top,
                      'left': left
                    })
                  }, 100);
                }
                $this.once('data-set', function () {
                  $(this).data({
                    'tip-defaults': {
                      'top': top,
                      'left': left,
                      'class': classes
                    }
                  });
                })
              })($element, $this, classes);
              $element.closest('.ui-tabs-hide').removeClass('fake-show');
              $element.closest('.fake-show').removeClass('fake-show');
            } else {
              $this.addClass('new-line');
            }
          }
          setPositions(classes);
          $(window).bind('invotraWindowResize', function () {
            if ($element.length) {
              $element.closest('.ui-tabs-panel').addClass('fake-show');
              $this.addClass('fake-show');
              var offsetLeft = $element.offset().left;
              $this.removeClass('fake-show');
              $element.closest('.ui-tabs-panel').removeClass('fake-show');
              var tipDefaults = $this.data('tip-defaults');
              if (tipDefaults && offsetLeft + tipDefaults.left + $this.outerWidth() > $(this).width()) {
                var addClass = ($this.attr('class').indexOf('-left') > -1) ? 'top-left' : 'top-middle';
                $this.parent().addClass('responsive-parent');
                $this.removeClass(removeClasses).addClass(addClass + ' responsive-tip');
                setPositions($this.attr('class'));
              } else if (tipDefaults) {
                $this.parent().removeClass('responsive-parent');
                $this.removeClass(removeClasses).addClass(tipDefaults['class']);
                $this.css({
                  'left': tipDefaults.left,
                  'top': tipDefaults.top
                })
              }
              $this.removeClass('fake-show');
            }
          });
        } else if ($this.find('.no-ico').length) {
          var $label = $this.parent().find('label:visible').filter(function () {
            return !$(this).parents().hasClass('sticky-header')
          }).first();
          if ($label.length) {
            if ($label.closest('.date-padding').find('>.form-item').length > 1) {
              $label = $label.closest('.date-padding');
              $label.addClass('move-desc').prepend($this);
            } else {
              $label.after($this);
            }
          }
        }
      });

      // Remove/add focus if such exists.
      var focusContextSelectors = '#page, #modalContent, body.page-media';
      var $focusContext = $context.find(focusContextSelectors);
      var $focused = $();
      var $focusContextParent = $context.find('body') || $context;
      var menuSelectors = ['#mini-panel-primary_menu', '#block-menu-menu-quick-links'];
      $focusContextParent.once('focus', function () {
        $(this).keyup(function (e) {
          if (e.keyCode == 9 && $(e.target).closest(focusContextSelectors).length && !$(e.target).attr('ignore-focus')) {
            $focused.removeClass('focus').find('.fcs-state').remove();
            $('#sbmt-btn-focus').remove();
            $focused = $(e.target);
            // IE8/9 fix - no need to add focus for select element as uniform is
            // used there and focus is used for it wrapper.
            if ($focused.is('select')) {
              return;
            }
            $focused.addClass('focus').append('<span class="fcs-state" />');
            $('.no-outline', $focusContext).removeClass('no-outline');

            // Add focus to input buttons.
            var $focusedInput = $('input[type="submit"]:not(.ajax-processed):focus, .button:focus, .delete-taxonomy-link:focus, .ctools-close-modal:focus', $focusContext);
            invotraBase.focusedInput($focusedInput);
            $.each(menuSelectors, function (index, menuSelector) {
              var $menu = $context.find(menuSelector);
              var $focusemMenuItem = $('ul > li >a.focus', $menu);

              $menu.find('.focus').removeClass('focus');
              if ($focusemMenuItem.length) {
                $focusemMenuItem.parent('li').addClass('focus');
                $('.open', $menu).removeClass('open');
              }
            })
          }
        });
      });

      // The selector below matches lots (>2000) node elements and so it makes IE8 cry.
      // The solution for this is to move this code into separate event handler.
      var $tabsContent = $context.find('.ui-tabs-panel *');
      var attachTabsContentEvents = function () {
        $tabsContent.once().focus(function () {
          $('body.html').addClass('tab-focus');
        }).blur(function () {
          $('body.html').removeClass('tab-focus');
        });
      };
      if ($.browser.msie && $.browser.version < 9) {
        setTimeout(attachTabsContentEvents, 0);
      }
      else {
        attachTabsContentEvents();
      }
      $('a', $focusContext).blur(function () {
        $(this).removeClass('focus').find('.fcs-state').remove();
      });
      $('a', $focusContext).mousedown(function () {
        $focused.removeClass('focus').find('.fcs-state').remove();
      });
      $('input[type="submit"], .button, .delete-taxonomy-link, .ctools-close-modal', $focusContext).once().blur(function () {
        $(this).removeClass('focus');
        $('#sbmt-btn-focus').remove();
      });
      $('a, .form-submit', $focusContext).once().bind({
        'mousedown': function (e) {
          $(this).addClass('no-outline');
        },
        'blur': function (e) {
          $(this).removeClass('no-outline');
        }
      });

      $context.find('input:checkbox').once().keypress(function(e){
        if ((e.keyCode ? e.keyCode : e.which) == 13) {
          $(this).trigger('click');
          if ($.fn.uniform) {
            $(this).uniform();
          }
        }
      });
      // Fluid search block width.
      // @TODO: Check for context?..
      if ($(window)[0].innerWidth >= 960) {
        $('.region-branding-inner').once('fluid-search', function () {
          var $this = $(this),
              parentW = $this.width(),
              freeW = parentW - $('.branding-data', $this).width(),
              quickLinksW = $('#block-menu-menu-quick-links', $this).width()
          if (freeW - quickLinksW >= 245) {
            $('#block-invotra-search-and-do-search-lite', $this).width(freeW - quickLinksW);
          } else {
            $('#block-invotra-search-and-do-search-lite', $this).width(245);
            $('#block-menu-menu-quick-links', $this).width(freeW - 245)
          }
        });
      }

      // Fieldset collapsible.
      var $fieldsetLegend = $context.find('fieldset.collapsible .fieldset-legend');
      $fieldsetLegend.each(function () {
        var $this = $(this);
        $this.append('<span class="arrow" />');
        $('.arrow', $this).click(function () {
          $('.fieldset-title', $this).click();
        });
      });

      // Modal boxes tuning.

      // To click the original button of form in popup.
      function eventFire(el){
        if (el.click()) {
          el.click();
        }
        else if (document.createEvent) {
          var evObj = document.createEvent('Events');
          if (evObj.initEvent) {
            evObj.initEvent("click", true, true);
            el.dispatchEvent(evObj);
          }
        }
      }

      var $ctoolsModal = $context.find('.ctools-modal-content');
      // @TODO: Should probably search within modal window context.
      if ($ctoolsModal.length) {
        var $modalContent = $('#modal-content');
        $ctoolsModal.removeClass('with-actions');
        $('.form-actions-clone', $ctoolsModal).remove();
        if ($('.form-actions', $modalContent).length) {
          var $mainActions = $('.form-actions', $modalContent);
          var $buttons = $mainActions.clone().addClass('form-actions-clone').attr('id', 'edit-buttons-clone');
          $('.form-submit, a', $buttons).each(function () {
            var $this = $(this);
            var id = $this.attr('id');
            if (id) {
              $this.attr('id', id + '-clone')
              $this.click(function () {
                eventFire(document.getElementById(id), 'click');
                var $throbber = $('.ajax-progress', $mainActions);
                if ($throbber.length) {
                  // $('.form-actions-clone').append($throbber);
                }
              })
            }
          });
          var $modal = $mainActions.closest('.ctools-modal-content');
          $modal.addClass('with-actions').append($buttons);
          $('.ctools-close-modal', $modal).click(function() {
            Drupal.CTools.Modal.dismiss();
            return false;
          });
        }
        $('div[id*="edit-layouts"] .fieldset-wrapper', $ctoolsModal).once(function () {
          var $this = $(this);
          var columns = {
            'first': ['.form-item-list-type', '.form-item-tabs-position', '.form-item-teaser-read-more',
              '.form-item-more', '.form-item-more-link-text', '.form-item-more-path', '.form-item-more-link-path',
              '.form-item-sort'],
            'second': ['.form-item-sort-by', '.form-item-columns', '.form-item-sort-order', '.form-item-image-style',
              '.form-item-date-type', '.form-item-ss-style', '.form-item-custom-date', '.form-item-hide-body', '.form-item-custom-date-value']
          };
          $.each(columns, function (k) {
            var $container = $('<div class="col-' + k + '" />');
            $this.append($container);
            $.each(columns[k], function (key, el) {
              if ($(el, $this).length) {
                $container.append($(el).first());
              }
            })
          });
        });

        // Add footer to modal.
        if ($ctoolsModal.find('.panels-add-content-modal, .panels-choose-layout').length) {
          $ctoolsModal.once('modal-footer', function () {
            $(this).append('<div class="modal-footer" />');
          });
        }
        else {
          $ctoolsModal.removeClass('modal-footer-processed').find('.modal-footer').remove();
        }

        // Adding custom scrollbar.
        if (!$modalContent.is('.no-scroll')) {
          $modalContent.customScrollbar();
          afterRenderResize(100, $modalContent);
          $modalContent.mouseup(function () {
            afterRenderResize(300, $modalContent);
          });
          $modalContent.ajaxComplete(function () {
            afterRenderResize(300, $(this));
          });
        }
      }
      // @TODO: check context. Also missing once().
      $(document).bind('mediaClose', function () {
        $('#mediaBrowser').dialog('close');
        $('#mediaStyleSelector').dialog('close');
      });
      var $mediaModal = $context.find('body.page-media-browser, body.page-media-format-form');
      $mediaModal.once('media-modal', function () {
        $('.media-title').prependTo($(this));
        var $content = $('#section-content', $(this));
        if ($('a.button.fake-ok', $content).length && !$('a.button.fake-ok', $content).parent().is('.form-actions').length) {
          $('a.button.fake-ok, a.button.fake-cancel', $content).wrapAll('<div class="form-actions" />');
        }
        $('.messages').prependTo($content);
        $('.media-title', $(this)).prepend('<a class="close" href="#">' + Drupal.t('Close modal') + '</a>');
        $('.media-title .close', $(this)).click(function (e) {
          e.preventDefault();
          parent.jQuery(parent.document).trigger('mediaClose')
        });

        var $iFrame = parent.jQuery(parent.document).find('.media-modal-frame');
        var resizeModal = function () {
          var contentHeight = $mediaModal.outerHeight();
          $iFrame.height(contentHeight);
        };

        parent.jQuery(parent.document).find('html, body').animate({
          scrollTop: 0
        }, 100);
        // Do NOT use parent...bind to prevent cross-iframe event handling which causes issues in IE.
        $(window).bind('invotraWindowResize load', resizeModal);
        $('.ui-tabs-nav a', $(this)).click(resizeModal);
        $(document).ajaxStop(function() {
          var contentHeight = $context.find('body.page-media-browser .content, body.page-media-format-form .content').innerHeight();
          if (contentHeight) {
            $iFrame.height(contentHeight);
          }
        });
        moveDesc();
        // @TODO: missing once()
        $(document).ajaxSuccess(function() {
          moveDesc();
        });
        function moveDesc() {
          var $desc = $('.form-type-managed-file .description', $content);
          $desc.once('change-loc', function () {
            $desc.appendTo($desc.parent().parent());
          })
        }
      });

      // Function for updating custom scrollbar.
      function afterRenderResize(timeout, $content) {
        setTimeout(function () {
          $content.customScrollbar('resize', true);
        }, timeout);
      }

      // Move breadcrumbs.
      if ($context.find('.breadcrumbs-node').length) {
        $context.find('#breadcrumb').once('move', function () {
          $(this).prependTo('#mini-panel-actions');
        })
      }

      // Add extra column for draggable elements.
      // Webform changes.
      $context.find('#webform-components').once('webform', function () {
        addDragColumn($(this), 3, 'button');
      });
      // List form widget changes.
      $context.find('#invotra-custom-fc-list-container-field-list-collection table:not(.sticky-header)').once('list-form', function () {
        addDragColumn($(this), 1);
        $('th.tabledrag-hide', $(this)).remove();
      });
      function addDragColumn($el, cols, addPrevClass) {
        var addColspan = false;
        $('.tabledrag-handle', $el).each(function () {
          var $tr = $(this).closest('tr');
          var $newTd = $('<td>', {
            'class': 'drag'
          });
          $newTd.append($(this));
          $tr.append($newTd);
          if (addPrevClass) {
            $newTd.prev().addClass(addPrevClass);
          }
          addColspan = true;
        });
        if (addColspan) {
          if ($el.find('th[colspan=' + cols + ']').length) {
            $el.find('th[colspan=' + cols + ']').attr('colspan', cols + 1)
          } else {
            $el.find('th:visible:last').attr('colspan', cols + 1)
          }
        }
      }

      // Webform submission.
      $context.find('.webform-submission').once('webform-submission', function () {
        $('.webform-grid', $(this)).closest('.webform-component-display').addClass('grid');
      });

      // Add extra padding for ul/ol lists if they wrapped around image.
      $context.find('.page-node- .pane-node-field-image').once('lists-wrap', function () {
        var $thisImage = $(this);
        function addExtraMargin($image) {
          var $parent = $image.closest('.panel-display');
          if ($('.pane-node-body', $parent).find('ul, ol').length) {
            var imageOffset = $image.offset().top + $image.height();
            $('.pane-node-body', $parent).find('li').each(function () {
              if ($(this).offset().top < imageOffset) {
                $(this).addClass('extra-margin');
              } else {
                $(this).removeClass('extra-margin');
              }
            });
          }
        }
        addExtraMargin($thisImage);
        $(window).bind('invotraWindowResize load', function () {
          addExtraMargin($thisImage);
        });
      });

      // Add extra padding for ul/ol lists if they wrapped around image.
      $context.find('.field-name-body, .pane-term-description, .field-type-text-long, .pane-custom').once('p-wrap', function () {
        var addExtraMarginInsideBody = function ($textField) {
          var images = [];

          $('img', $textField).each(function () {
            images.push({
              image: $(this),
              top: $(this).offset().top,
              height: $(this).outerHeight()
            });
          });

          images.sort(function (a, b) {
            return a.top - b.top;
          });

          var assignExtraMarginLi = function ($list, top, bottom) {
            $('li', $list).each(function () {
              // Li element top position.
              var A1 = $(this).offset().top,
                  // Li element bottom position.
                  A2 = A1 + $(this).height();

              $(this).removeClass('extra-margin-inside');
              if ((A1 <= bottom) && (top <= A2)) {
                $(this).addClass('extra-margin-inside');
              }
            });
          };

          $('ul, ol', $textField).each(function () {
            var $list = $(this);
            $.each(images, function () {

              // Checking if image is aligned to the left near a list.
              // Image top position.
              var A1 = this.top,
                  // Image bottom position.
                  A2 = A1 + this.height,
                  // List top position.
                  B1 = $list.offset().top,
                  // List bottom position.
                  B2 = B1 + $list.height();

              if ((A1 <= B2) && (B1 <= A2) && (this.image.css('float') === 'left')) {
                assignExtraMarginLi($list, A1, A2);
              }
            });
          });
        };

        var $field = $(this);
        addExtraMarginInsideBody($field);
        $(window).bind('invotraWindowResize', function () {
          addExtraMarginInsideBody($field);
        });
      });

      // Use predefined table width.
      $context.find('.page-node- table[width]').once(function () {
        $(this).css({'width': $(this).attr('width')});
      });

      // Add scroll to table if it wider than screen.
      $('table').each(function() {
        var $this = $(this);
        // overflow-x style is trimming help text for related content field.
        // So, skip related content field from the check.
        if ($this.width() > $this.parent().width() && 'field-related-content-fields-values' != $this.attr('id')) {
          $this.once().wrap("<div style='width: 100%; overflow-x: auto'>");
        }
      });

      // Sticky footer.
      var $contentWrapper = $context.find('#content-wrapper');
      $contentWrapper.once('sticky-footer', function () {
        var stickyFooter = function ($wrapper) {
          var $footer = $('#footer-wrapper'),
              footerHeight = $footer.outerHeight();
          $wrapper.removeClass('sticky-footer').removeAttr('style');
          if ($footer.length && ($wrapper.height() + footerHeight) < $(window).height()) {
            $wrapper.addClass('sticky-footer').css({
              'min-height': '100%',
              'margin-bottom': -$footer.outerHeight()
            });
          }
        };
        if (!$contentWrapper.is('.sticky-footer')) {
          stickyFooter($contentWrapper);
        }
        var stickyTimeout;
        $(window).bind('load invotraWindowResize', function () {
          clearTimeout(stickyTimeout);
          stickyTimeout = setTimeout(function () {
            stickyFooter($contentWrapper);
          }, 100);
        });
      });

      // Init ARIA common stuff.
      Drupal.invotra.invotraBase.ARIA.init(context);
    }
  };

  /**
   * Invotra base main navigation behavior.
   */
  Drupal.behaviors.invotraBaseNavigation = {
    attach: function (context, settings) {
      var $context = $(context);
      var $menu = $context.find('#mini-panel-primary_menu, #block-menu-menu-quick-links');
      $menu.once('invotra-menu', function () {
        $('a', $menu).bind({
          'click': function (e) {
            var $this = $(this);
            if ($this.parent('.focus.parent:not(.open)').length) {
              $this.blur();
              $this.parent().addClass('open');
              $this.parent().find('ul:first > li:first a:first').addClass('focus').focus();
              e.preventDefault();
            }
          },
          'blur': function () {
            var $this = $(this);
            $this.removeClass('focus').parent().removeClass('focus');
            $this.parents('.open').removeClass('open');
            setTimeout(function() {
              $('.open', $menu).each(function () {
                if (!$this.find('a.focus').length) {
                  $this.removeClass('open');
                }
              });
            }, 100);
          }
        });
        var timer;
        // Add delay for menu opening.
        $('ul:first > li', $menu).hover(
            function () {
              var $this = $(this);
              timer = setTimeout(function () {
                $this.addClass('delay-show');
              }, 650)
            },
            function () {
              $(this).removeClass('delay-show');
              clearTimeout(timer);
            }
        );
      });
      if (invotraBase.accessibleMenu) {
        // Unwrap extra "item-list" div for accessibility.
        var $main_menu = $context.find('#block-system-main-menu');
        $main_menu.once('unwrap', function () {
          $(this).attr('role', 'navigation').find('ul').unwrap('.item-list');
        });
        invotraBase.accessibleMenu($main_menu, ['horizontal', 'horizontal', 'horizontal'], {'right': $('#block-system-extranet-menu ul > li.first a')});
        invotraBase.accessibleMenu($('#block-system-extranet-menu'), ['horizontal'], {'left': $('#block-system-main-menu div > ul > li.last > a:last-child')});
      }
    }
  };

  /**
   * Invotra base forms media/attachments widgets interactions.
   */
  Drupal.behaviors.invotraBaseFormsMediaWidgets = {
    attach: function (context, settings) {
      var $context = $(context);
      // Form interactions(change position, etc.).
      $context.find('table .field-multiple-drag').each(function () {
        $(this).addClass('show').appendTo($(this).parent());
      });
      $context.find('table:not(#taxonomy, #field-subpage-reference-values, #field-subpages-values) td:not(.field-multiple-drag) a.tabledrag-handle').each(function () {
        $(this).closest('tr').find('.form-submit[id*="remove"]').addClass('remove');
        var $td = $(this).closest('tr').find('td:last').addClass('ops field-multiple-drag');
        $(this).appendTo($td);
      });

      // Change tabledrag handle position for file widget.
      $context.find('.field-widget-file-generic td:not(.field-multiple-drag) .tabledrag-handle').each(function () {
        var $closestRemove = $(this).closest('tr').find('.form-submit[id*="remove"]');
        $closestRemove.addClass('remove').parent('td').addClass('field-multiple-drag').css('min-width', 55);
        $(this).once().insertAfter($closestRemove);
      });

      // Change remove button position in multiple media widget.
      $context.find('.media-widget a.remove, .media-widget + input[id*="remove"], .media-widget input[id*="remove"]').each(function () {
        var $closestDrag = $(this).closest('tr').find('.tabledrag-handle');
        $closestDrag.parent('td').width(55);
        $(this).once().addClass('remove').insertBefore($closestDrag);
      });

      // Change edit button position in multiple media widget.
      $context.find('td .media-widget').closest('tr').find('a.edit').each(function () {
        var $closestDrag = $(this).closest('tr').find('.tabledrag-handle').parent('td');
        $closestDrag.width(95);
        $(this).once().prependTo($closestDrag);
      });

      // Media widget interactions.
      $context.find('.media-widget').each(function() {
        var $this = $(this);
        var $launcher = $this.find('a.button.launcher, a.button.browse');
        if ($launcher.is('[id*="image"]') || $launcher.parents('#edit-picture').length) {
          $launcher.text(Drupal.t('Add image'));
        }
        else if ($launcher.is('[id*="icon"]')) {
          $launcher.text(Drupal.t('Add icon image'));
        }
        else {
          $launcher.text(Drupal.t('Add file'));
        }
        if ($this.find('.fid').val() == 0) {
          $this.removeClass('file-added');
        } else {
          $this.addClass('file-added');
        }
      });

      // Bind media widget remove button.
      $context.find('.media-widget .fid').once().bind('change', function () {
        var $this = $(this);
        if ($this.val() == 0) {
          $this.closest('.media-widget').removeClass('file-added');
        } else {
          $this.closest('.media-widget').addClass('file-added');
        }
      });

      // Form file change description position.
      $context.find('.form-managed-file').each(function () {
        var $thisFileWidget = $(this);
        $thisFileWidget.once()
          .parent()
          .find('.description').insertBefore($thisFileWidget.find('.form-submit'));
      });
    }
  }

  /**
   * Invotra base pane widgets.
   */
  Drupal.behaviors.invotraBasePaneWidgets = {
    attach: function (context, settings) {
      var $viewsPanes = $(context).find('.view.general-styles');
      $('.with-image', $viewsPanes).each(function () {
        $('.views-field-field-image', $(this)).css('min-height', $(this).height())
      });
    }
  }

  /**
   * Invotra base pane widgets.
   */
  Drupal.behaviors.invotraBaseListsWidget = {
    attach: function (context, settings) {
      var $context = $(context);
      var $listsForm = $context.find('form[id*="invotra-panes-lists-form"]'),
          $listsPane = $context.find('.pane-lists');
      $listsPane.each(function () {
        var $thisPane = $(this);
        if ($('form', $listsPane).length) {
          $('.pane-title', $thisPane).removeClass('clickable').addClass('active').unbind('click');
        } else {
          $('.pane-title', $thisPane).removeClass('active').addClass('clickable').bind('click', function () {
            $thisPane.find('a.use-ajax').click();
          });
        }
      });
      $listsForm.each(function () {
        $(this).once(function () {
          var $thisForm = $(this),
              $lists = $('.form-type-checkbox', $thisForm),
              listLength = $lists.length,
              inColumn = Math.ceil(listLength/2);
          for (var i = 0; i < listLength; i += inColumn) {
            $lists.slice(i, i + inColumn).wrapAll('<div class="column" />');
          }
          var parrentPos = $thisForm.parent().position();
          $thisForm.css({
            'left': parrentPos.left,
            'top': parrentPos.top
          });
        });
      });
    }
  }

  /**
   * Set parent's background as tab's background.
   */
  Drupal.behaviors.invotraTabBackground = {
    attach: function(context) {
      var selectors = ['.tabs-top ul.ui-tabs-nav li.ui-state-active a', 'ul.tabs:not(.secondary) li.active a'];
      $.each(selectors, function (i, selector) {
        $(selector, context).once('invotraTabBackground', function() {
          // Get background color of parent.
          var tab_background = function(tab) {
            tab.parents().each(function() {
              if ($(this).not('body')) {
                // Check if parent background color is NOT transparent.
                if ($(this).css('background-color') != 'transparent' && $(this).css('background-color') != 'rgba(0, 0, 0, 0)') {
                  tab.css('border-bottom', '1px solid ' + $(this).css('background-color'));
                  return false;
                }
              }
            });
          };
          // Render active tab with parent's background color
          // as border color.
          tab_background($(this));
          $(this).parents('ul').find('a').click(function () {
            tab_background($(this));
          });
        });
      });
    }
  };

  /**
   * Invotra base search results.
   */
  Drupal.behaviors.invotraBaseSearchResults = {
    attach: function (context, settings) {
      var $context = $(context);
      if (jQuery.fn.highlight) {
        var $searchView = $context.find('.pane-og-content-search-api-panel-pane-1');
        $searchView.once('hightlight', function () {
          function getUrlVars(name) {
            var vars = [], hash;
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for(var i = 0; i < hashes.length; i++) {
              hash = hashes[i].split('=');
              vars.push(hash[0]);
              vars[hash[0]] = hash[1];
            }
            if (vars[name] && vars[name].length) {
              var array = jQuery.grep(vars[name].split('+'), function(n){ return (n); });
              return array;
            }
            return '';
          }
          var highlights = getUrlVars('search_api_views_fulltext');
          if (highlights.length) {
            var $searchableElements = $('a, span, p', $(this));
            $searchableElements.each(function () {
              $(this).highlight(highlights);
            });
          }

        });
      }

      var $simpleSearchPage = $context.find('.page-simple-search, .search-results');
      var $simpleSearchRes = $context.find('.search-results-count');
      $simpleSearchPage.once(function () {
        $('.pane-invotra-save-search').prependTo($('#zone-content'));
        if ($('#breadcrumb').length) {
          $('.pane-invotra-save-search').insertAfter('#breadcrumb');
        }
        else {
          $('.pane-invotra-save-search').prependTo($('#zone-content'));
        }
      });
      $('.view-simple-search', $simpleSearchPage).once(function() {
        var $header = $(this).find('.view-header');
        var $empty = $(this).find('.view-empty');
        if ($header.length && !$simpleSearchRes.length) {
          $('#block-system-main').prepend($("<div class='search-results-count' role='alert'></div>").text($header.text()));
        }
        else if($empty.length && !$simpleSearchRes.length) {
          $('#block-system-main').prepend($("<div class='search-results-count' role='alert'></div>").text($empty.text()));
        }
      });

      var $resultsView = $context.find('.view-search-and-do-content');
      $('.views-row', $resultsView).each(function () {
        var $image = $('.views-field-field-image img', $(this));
        if ($image.length && $image.width() < 140) {
          $(this).addClass('square');
        }
      });
      $resultsView = $context.find('.view-simple-search');
      $('.views-row', $resultsView).each(function () {
        var imageFields = '.views-field-solr-prototype-index-field-image-file,'
          + '.views-field-solr-prototype-users-picture-url,'
          + '.views-field-solr-prototype-terms-field-image-file,'
          + '.views-field-solr-prototype-terms-field-ou-image-file';
        var $image = $(imageFields, $(this)).find('img');
        if ($image.length && $image.width() < 140) {
          $(this).addClass('square');
        }
      });
      var $searchFilters = $context.find('#views-exposed-form-og-content-search-api-panel-pane-1, #views-exposed-form-people-directory-panel-pane-2, #views-exposed-form-simple-search-panel-pane-1');
      $searchFilters.once(function () {
        var $thisForm = $(this);
        var $keywordField = $('.views-widget-filter-search_api_multi_fulltext .form-text, .views-widget-filter-search_api_views_fulltext .form-text', $thisForm);
        if ($keywordField.length) {
          var $fakeKeywordFieldLabel = $('<label>', {
            'text': Drupal.t('Search for your refined term'),
            'for': 'keyword-fake-form-keyword',
            'class': 'element-invisible'
          });
          var $fakeKeywordField = $('<div class="input" role="search" />').append($('<input>', {
              'type': 'text',
              id: 'keyword-fake-form-keyword',
              'class': 'form-text',
              'value': $keywordField.val(),
              'change': function () {
                $keywordField.val($(this).val())
              }
            })
          ).prepend($fakeKeywordFieldLabel);
          var $fakeKeywordSubmit = $('<button />', {
            'id': 'keyword-fake-form-submit',
            'class': 'refine-submit',
            'text': Drupal.t('Refine results')
          });
          var $fakeForm = $('<form>', {
            'id': 'keyword-fake-form',
            'submit': function (e) {
              e.preventDefault();
              // Then sort by should be "Relevance" if we click to refine search
              // button and search term isn't empty.
              if ($keywordField.val()) {
                $thisForm.find('.form-item-sort-by select').val('search_api_relevance');
              }
              $thisForm.submit();
            }
          }).append($fakeKeywordField).append($fakeKeywordSubmit);
          $('input, button', $fakeForm).bind({
            'blur': function () {
              $fakeForm.removeClass('focus');
            },
            'focus': function () {
              $fakeForm.addClass('focus');
            }
          });
          if ($('#refine-search-title').length) {
            $fakeForm.insertAfter($('#refine-search-title'));
            $keywordField.closest('.views-exposed-widget').hide();
          }
        }
      });
      var $primaryCategory = $('input', $context.find('#edit-field-primary-category,#edit-primary-category'));
      var addCheckedClass = function () {
        var $this = $(this),
          id = $this.attr('id'),
          $label = $('label[for="' + id + '"]');
        if ($this.is(':checked')) {
          $label.addClass('checked');
        } else {
          $label.removeClass('checked');
        }
      };
      $primaryCategory.each(addCheckedClass);
      $primaryCategory.change(addCheckedClass);

      // Move view header text if search-highlights exists.
      var $searchHighlights = $context.find('.pane-search-highlights-panel-pane-1 .view');
      $('.view-header', $resultsView).prependTo($searchHighlights);
    },
    checkHiddenPane: function ($pane) {
      var result = true;
      $pane.each(function () {
        if ($(this).is(':visible')) {
          result = false;
          return result;
        }
      });
      return result;
    }
  };

  /**
   * Invotra base editorial panel.
   */
  Drupal.behaviors.invotraBaseeditorialPanel = {
    attach: function (context, settings) {
      var $tabs = $('ul.tabs.primary', $(context).find('.page-node, .page-taxonomy, .page-forum'));
      if ($tabs.length && $('a.active', $tabs).text().toLowerCase().indexOf('view') > -1) {
        $tabs.parent().addClass('hide-tabs');
        var tabs_to_show = ['add_manual_page'];
        var $links = $();
        $.each(tabs_to_show, function(k, v) {
          var $link = $('a[href*="/'+ v + '"]', $tabs);
          if ($link.length) {
            var href = $link.attr('href');
            var text = $link.text();
            if (href.length) {
              var link = $('<a>', {
                'id': 'tabs-show-' + v,
                'href': href,
                'text': text
              });
              $links = $links.add(link);

              // Remove duplicated link from options dropdown list.
              $('.actions-dropdown a[href="' + href + '"]').parent().remove();
            }
          }
        });

        $('#mini-panel-actions').once('editorial', function () {
          $('.panel-panel', $(this)).append($links);
        });
        if (!$('#mini-panel-actions').length) {
          $('#zone-content').once('tabs').prepend($links);
        }
      }
    }
  };

  /**
   * Delete comment behavior.
   */
  Drupal.behaviors.invotraCommentDelete = {
    attach: function (context, settings) {
      if ($(context).find('.comment').length) {
        invotraBase.invotraCommentDelete(context);
      }
    }
  };

  /**
   * Delete comment behavior.
   */
  Drupal.behaviors.invotraWikiTreeCollapse = {
    attach: function (context, settings) {
      var $context = $(context);
      var $wikiTree = $context.find('.pane-team-wiki-pages');
      $wikiTree.once('wiki-tree-collapse', function () {
        var $thisPane = $(this),
            $sidebar = $thisPane.closest('.panel-panel'),
            originalWidth = $sidebar.width();
        var $toggleLink = $context.find('<span class="toggle-link" />');
        $thisPane.find('.pane-title').bind('click', function () {
          var width = $thisPane.is('.collapsed') ? originalWidth : '60px';
          $thisPane.toggleClass('collapsed');
          if ($thisPane.is('.collapsed')) {
            $('.pane-content', $thisPane).hide();
          }
          $sidebar.animate({
            'width': width
          }, 200, function () {
            $sidebar.next().toggleClass('expanded');
            if (!$thisPane.is('.collapsed')) {
              $('.pane-title, .pane-content', $thisPane).show();
            }
          });
        });
        $thisPane.find('.pane-title').append($toggleLink);
      });
    }
  };

  /**
   * Invotra base people directory.
   */
  Drupal.behaviors.invotraBasePeopleDirectory = {
    attach: function (context, settings) {
      var $context = $(context);
      var $facets = $context.find('.page-invotra-people-people-directory .facets .scrollable, #group-people-search .scrollable, .facet-pane.scrollable');
      $('.facetapi-facetapi-checkbox-remove', $facets).once('facet-collapsible', function () {
        var $this = $(this);
        var $title = $this.closest('.panel-pane').find('.pane-title');
        var $facetItems = $('li', $this);
        $facetItems.removeAttr('style');
        $this.next('.facetapi-limit-link').remove()
        if ($facetItems.length > 10) {
          $this.height(192);
          $this.customScrollbar();

          // Get pseudo height.
          var $tempParent = $facetItems.slice(0,10).wrapAll('<div>').parent(),
              dummyHeight = $tempParent.height();
          $this.height(dummyHeight);
          $this.customScrollbar("resize", true);
          var $searchTerm = $('<input>', {
            'type': 'text',
            'class': 'form-text filter-terms',
            'placeholder': Drupal.t('Type @term here', {
              '@term': $title.text()
            }),
            'keyup': function (e) {
              var val = $(this).val();
              var $linksLi = $this.find('li');
              if (val.length) {
                $linksLi.each(function () {
                  var $liClone = $(this).clone();
                  if ($('.facetapi-active', $liClone).length) {
                    var linkValue = $liClone.children().remove().end().text()
                  } else {
                    var linkValue = $liClone.find('a').children().remove().end().text()
                  }
                  if (linkValue.toLowerCase().indexOf(val.toLowerCase()) < 0) {
                    $(this).hide();
                  } else {
                    $(this).show();
                  }
                })
              } else {
                $linksLi.show();
              }
              $this.customScrollbar("resize", true);
            }
          });
        }
        $this.before($searchTerm);
        var $hideShowFacet = $('<a>', {
          'class': 'hide-show',
          'href': '#',
          'text': Drupal.t('Hide'),
          'click': function (e) {
            e.preventDefault();
            $(this)
              .toggleClass('hidden')
              .closest('.panel-pane').find('>.pane-content').slideToggle();
            var text = $(this).is('.hidden') ? Drupal.t('View') : Drupal.t('Hide');
            $(this).text(text);
          }
        });
        $title.append($hideShowFacet);
      });
    }
  };

  /**
   * Invotra base login screens.
   */
  Drupal.behaviors.invotraBaseLoginScreens = {
    attach: function (context, settings) {
      var $loginPages = $(context).find('.invotra-login-screens #page');
      $loginPages.once('login-pages', function () {
        var windowH = $(window).height();
        var thisH = $(this).outerHeight();
        var margin = (windowH - thisH > 0) ? (windowH - thisH) / 2 : 0;
        $(this).css('margin-top', margin)
      });
    }
  };

  /**
   * Simplify edit screens.
   */
  Drupal.behaviors.invotraSimpleEdit = {
    attach: function (context, settings) {
      var $context = $(context);
      var $node_form = $context.find('.node-form');
      var forms = $node_form.length && !$node_form.closest('.modal-content').length && !$node_form.closest('.pane-panels-mini').length;
      if (forms && settings.invotra && settings.invotra['simple_edit']) {
        // We can leave it as is without using context selector since it's ran only once anyway.
        $('body.html').once('simple-edit', function () {
          $('#edit-title').attr('placeholder', Drupal.t('Title (mandatory)'));
          var $summary = $('.text-summary-wrapper', $('#mini-panel-node_add_edit_title_body, .text-with-summary-popup'));
          var $summaryDialog = $summary.clone();
          $('a.link-edit-summary', $('.pane-node-body')).bind('keydown', function (e) {
            if (e.keyCode == 13 || e.keyCode == 32) {
              e.preventDefault();
              $(this).click().focus();
            }
          });
          var $summaryToggle = $('<a>', {
            'text': Drupal.t('Edit Summary'),
            'href': '#',
            'class': 'edit-summary',
            'click': function (e) {
              e.preventDefault();
              $summaryDialog.dialog('open');
            }
          });
          var $summaryToggleWrapper = $('<div class="summary-toggle-wrapper" />').append($summaryToggle);
          $summaryToggleWrapper.insertAfter($summary);
          $summaryDialog.insertAfter($summary);
          $summaryDialog.dialog({
            modal: true,
            autoOpen: false,
            width: 900,
            height: 300,
            resizable: false,
            draggable: false,
            title: Drupal.t('Summary'),
            dialogClass: 'summary-dialog',
            buttons: [
              {
                text: "Done",
                click: function () {
                  $('textarea', $summary).val($('textarea', $summaryDialog).val());
                  $(this).dialog('close');
                },
                'class': 'done'
              },
              {
                text: "Cancel",
                click: function () {
                  $(this).dialog('close');
                },
                'class': 'fake-cancel'
              }
            ],
            show: {
              effect: 'fade'
            },
            hide: {
              effect: 'fade'
            },
            open: function () {
              $('textarea', $summaryDialog).val($('textarea', $summary).val());
            }
          });
          $(this).addClass('simple-edit-screens');
          var $lastElementGeneral = $('.tabs-left .ui-tabs-panel', $(this)).find('.form-item:last');
          $lastElementGeneral.css('margin-bottom', 0);
          $lastElementGeneral.parents('.form-wrapper, .form-item').css('margin-bottom', 0);
        });
      }
    }
  };

  /**
   * Invotra base Groups mobile.
   *
   * @TODO: Move to invotra_base_mobile.js probably?..
   */
  Drupal.behaviors.invotraBaseGroupsMobile = {
    attach: function (context, settings) {
      var applyMobileGroups = function (context) {
        var $context = $(context);
        // Feed page.
        var $feedContext = $context.find('.node-type-teamspace .brenham-flipped-column-content');
        var $feedTabs = $('.brenham-flipped-content, .brenham-flipped-sidebar', $feedContext);
        $feedContext.once(function () {
          $feedTabs.eq(1).addClass('hide');
          var $tabs = $('<ul>', {
            'class': 'tabs secondary feed-tabs'
          });
          var links = {
            'Activity Feed': 'brenham-flipped-content',
            'Notifications': 'brenham-flipped-sidebar'
          };
          $.each(links, function (i, j) {
            var $link = $('<li>').append($('<a>', {
              'href': '#',
              'text': Drupal.t(i),
              'click': function (e) {
                e.preventDefault();
                $(this).closest('ul').find('a').removeClass('active');
                $(this).addClass('active');
                $feedTabs.addClass('hide');
                $('.' + links[i], $feedContext).removeClass('hide');
              }
            }));
            $tabs.append($link);
          });
          $tabs.find('a').eq(0).addClass('active');
          $(this).prepend($tabs);
        });

        // People/Content page.
        var $peopleContentSearch = $context.find('#group-people-search, #search-results-group').find('.brenham-column-content');
        $peopleContentSearch.once(function () {
          var $refineResults = $('<div class="refine-results-wrap">').append($('<a>',{
            'href': '#',
            'text': Drupal.t('Search for your refined term'),
            'class': 'input-standard-button',
            'click': function (e) {
              e.preventDefault();
              $peopleContentSearch.find('.brenham-sidebar').addClass('show');
              $peopleContentSearch.find('.brenham-content').addClass('hide');
            }
          }));
          var $cancelRefine = $('<a>', {
            'class': 'button fake-cancel',
            'href': '#',
            'text': Drupal.t('Cancel'),
            'click': function (e) {
              e.preventDefault();
              $peopleContentSearch.find('.brenham-sidebar').removeClass('show');
              $peopleContentSearch.find('.brenham-content').removeClass('hide');
            }
          });
          $('.views-submit-button', $peopleContentSearch).append($cancelRefine);
          $('.brenham-content', $peopleContentSearch).prepend($refineResults);
        });

        // About page.
        var $aboutPage = $context.find('#group-about');
        $aboutPage.once(function () {
          var $memberButtonClone = $('.pane-group-subscribe').clone().addClass('clone');
          $('.panel-col-bottom .inside', $(this)).prepend($memberButtonClone);

        });
      };
      if ($(window).width() < 960) {
        applyMobileGroups(context);
      }
      // @TODO: once().
      $(window).bind('invotraWindowResize', function () {
        if ($(window).width() < 960) {
          applyMobileGroups(context);
        }
      });
    }
  }

  /**
   * Invotra base widgets.
   */
  Drupal.behaviors.invotraBaseWidgets = {
    attach: function (context, settings) {
      // "Taxonomy tree" widget.
      var $taxonomyTree = $(context).find('#block-system-main .pane-tree');
      this.applyToggle($taxonomyTree);
    },
    applyToggle: function ($selector) {
      $selector.once('taxonomy-tree', function () {
        $('li.parent', $(this)).prepend('<span class="btn-arrow" title="' + Drupal.t('Click to open/close') + '" />');
        $('li.parent > .item-list', $(this)).hide();
        $('.btn-arrow', $(this)).click(function () {
          var $parent = $(this).parent('li');
          $parent.toggleClass('open');
          $('> .item-list', $parent).slideToggle('fast');
        });
        var $active = $('li.parent a.active', $(this));
        var $activeParent = $active.parents('li.parent');
        $active.closest('li').addClass('active-li');
        $activeParent.addClass('open').find('>.item-list').show();
        $active.parents('.item-list').show();
      });

      // General style 16.
      var $styleRow = $('.views-row.general-16, ul.general-16 li');
      // @TODO: Use once() for bind().
      $(window).bind('load resize', function () {
        $styleRow.parent().each(function () {
          var $this = $(this);
          if ($this.width() < 940) {
            $this.children().addClass('compact');
          } else {
            $this.children().removeClass('compact');
          }
        });
      })
    }
  };


  /**
   * Invotra progress bar.
   */
  Drupal.behaviors.invotraBaseProgressBar = {
    attach: function (context, settings) {
      $(context).find('.progress').once(function () {
        var $this = $(this);
        $this.find('.percentage').appendTo($this.find('.filled'))
      })
    }
  };

  /**
   * Invotra base user profile.
   *
   * @TODO: Move to invotra_base_mobile.js probably?..
   */
  Drupal.behaviors.invotraBaseProfileMobile = {
    attach: function (context, settings) {
      $(context).find('#mini-panel-user_profile_details_mobile').once('profile-details-mobile', function () {
        var $pane = $('.sutro-footer', $(this));
        var $toggle = $('.details-switch', $(this)).addClass('processed');
        invotraBase.toggleElement($toggle, $pane);
      });
    }
  };

  /**
   * Invotra base user profile.
   */
  Drupal.behaviors.invotraBaseProfile = {
    attach: function (context, settings) {
      $(context).find('.pane-users-teamspaces-panel-pane-1').once(function () {
        var $content = $('.view-content', $(this));
        var $switcher = $('<a>', {
          'href': '#',
          'text': Drupal.t('See more'),
          'class': 'switch',
          'click': function (e) {
            var $this = $(this);
            $this.toggleClass('open');
            var text = $this.is('.open') ? Drupal.t('See less') : Drupal.t('See more');
            $this.text(text);
            $content.toggleClass('show');
            e.preventDefault();
          }
        });
        if ($('.views-row', $(this)).length > 10) {
          $('.views-row', $(this)).eq(9).addClass('less-last').nextAll().addClass('extra');
          $content.append($switcher)
        }
      });
    }
  };
  /**
   * Invotra base widgets.
   */
  Drupal.behaviors.invotraBaseWidgets = {
    attach: function (context, settings) {
      // "Taxonomy tree" widget.
      var $taxonomyTree = $(context).find('#block-system-main .pane-tree');
      $taxonomyTree.once('taxonomy-tree', function () {
        var $this = $(this);
        $('li.parent', $this).prepend('<span class="btn-arrow" title="' + Drupal.t('Click to open/close') + '" />');
        $('li.parent > .item-list', $this).hide();
        $('.btn-arrow', $this).click(function () {
          var $parent = $(this).parent('li');
          $parent.toggleClass('open');
          $('> .item-list', $parent).slideToggle('fast');
        });
        var $active = $('li.parent a.active', $this);
        var $activeParent = $active.parents('li.parent');
        $active.closest('li').addClass('active-li');
        $activeParent.addClass('open').find('>.item-list').show();
        $active.parents('.item-list').show();
      });
    }
  };

  /**
   * Invotra Popup align.
   */
  Drupal.behaviors.invotraBaseAlignPopup = {
    attach: function(context, settings) {
      var $context = $(context);
      var $popup = $context.find('#modalContent');
      function scheduleAlignCenter () {
        // Align the popup, let modal.js do it dirty tricks and then align once
        // again.
        // There's no reliable way to prevent running modalContentResize() so
        // we'll just fix the consequences.
        // @see Drupal.CTools.Modal.modalContent
        alignCenter();
        setTimeout(alignCenter, 0);
      }
      // Function align element in the middle of the screen.
      function alignCenter () {
        $popup = $context.find('#modalContent');
        // Assign classes to body for theming purpose.
        if (!$popup.length) {
          $('body').removeClass('modal-opened');
        }
        else {
          $('body').addClass('modal-opened');
          $(document).one("CToolsDetachBehaviors", function() {
              $('body').removeClass('modal-opened');
          });
        }

        var popupWidth = $popup.width(),
          popupHeight = $popup.height();
        if (popupWidth <= 1) {
          popupWidth = $popup.find('.ctools-modal-content').width();
        }
        if (popupHeight <= 1) {
          popupHeight = $popup.find('.ctools-modal-content').height();
        }

        if (!$popup.data('initialWidth')) {
          $popup.data('initialWidth', popupWidth)
        }
        // Popup size.
        var initialWidth = $popup.data('initialWidth') || popupWidth;

        // Window size.
        var windowHeight = $(window).height(),
          windowWidth = $(window).width();

        if ((windowWidth + 40) < initialWidth) {
          $popup.find('.ctools-modal-content').width(windowWidth - 40);
          popupWidth = windowWidth - 40;
        }
        else {
          $popup.find('.ctools-modal-content').width(initialWidth);
          popupWidth = initialWidth;
        }
        var left = (windowWidth - popupWidth) / 2;
        var scrollTop = (window.pageYOffset || document.documentElement.scrollTop)  - (document.documentElement.clientTop || 0);
        var top, position;
        if (windowHeight < (popupHeight + 80)) {
          position = 'absolute';
          top = Math.max(40, scrollTop + 40);
        }
        else {
          position = 'fixed';
          top = Math.max(40, parseInt(windowHeight / 2 - popupHeight / 2));
        }
        $popup.css({'left':left, 'top':top, 'position': position});
      }

      $context.find('body').once(function() {
        $(document).ajaxSuccess(function() {
          scheduleAlignCenter();
        });
        $(window).bind('invotraWindowResize', function() {
          scheduleAlignCenter();
        });
      });

      $popup.once('popup-resize').resize(function(){
        scheduleAlignCenter();
      });
    }
  };

  /**
   * Helper function which extract query parameters from URL.
   */
  var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] === sParam) {
        return sParameterName[1] === undefined ? true : sParameterName[1];
      }
    }
  };

  /**
   * Invotra groups clickable post/status.
   */
  Drupal.behaviors.invotraGroupViewRowClick = {
    attach: function (context, settings) {
      // Click through to node view
      var $viewRow = context == document ? $(context) : $(context).parent();
      var page = getUrlParameter('page');

      $viewRow
        .find('.view-group-search .views-row')
        .each(function () {
          var $element = $(this);
          var url = $element.find('.views-field-title a').attr('href');
          if (page) {
            url = url + "?app_page=" + page;
          }
          if (typeof url !== 'undefined') {
            invotraBase.clickableViewRow($element, url);
          }
      });
      // Aria label
      $viewRow
        .find('.view-group-search .views-row')
        .each(function() {
          var $element = $(this);
          var ariaTitle = $element.find('.views-field-title a').text();
          var ariaName = $element.find('.views-field-nmember-author-fullname span a').text();
          var ariaNumber = $element.find('.comments-link').text();
          $element.find('.view-row-link-background').attr({
            'aria-label': Drupal.t('View the full ' + ariaTitle + ' from ' + ariaName + ' to the ' + ariaNumber + ' link'),
            'aria-hidden': "true",
            'tabindex': '-1'
          });
        })
    }
  };

  /**
   * Invotra groups stuff.
   */
  Drupal.behaviors.invotraGroups = {
    attach: function (context, settings) {
      var $context = $(context);
      $context.find('#group-landing .facetapi-facet-created').once('group-facet', function () {
        $('li', $(this)).each(function () {
          var $link = $(this).find('.facetapi-active');
          if ($link.length) {
            var $liClone = $(this).clone();
            $liClone.find('a').remove();
            var text = $liClone.text();
            $link.append('<span class="link">' + text + '</span>');
            $(this).empty().append($link);
          }
        });
      });

      // Show/hide search form
      var $searchForm = $context.find('#group-landing .views-exposed-form');
      if($('#edit-search-api-views-fulltext', $searchForm).length && !$('#edit-search-api-views-fulltext', $searchForm).val().length) {
        $searchForm.hide().attr('aria-hidden', 'true')
      }

      $searchForm.once('searchform', function () {
        $(this).find('.form-text').attr('role', 'search');
        var $refineLink = $('<a>', {
          'text': Drupal.t('Search'),
          'href': '#',
          'class': 'searchform-refine',
          'aria-expandable': 'true',
          'aria-expanded': 'false',
          'aria-label': Drupal.t('Select to show search field')
        });
        $(this).before($refineLink);
        $('input', $searchForm).bind({
          'blur': function () {
            $searchForm.removeClass('focus sbmt-focus');
          },
          'focus': function () {
            $searchForm.addClass('focus');
            if ($(this).is('.form-submit')) {
              $searchForm.addClass('sbmt-focus');
            }
          }
        });
      });
      $context.find('.searchform-refine').once('searchform-refine').bind('click', function (e) {
        e.preventDefault();
        var $toggleLink = $(this);
        $searchForm.slideToggle('fast', function () {
          // Add aria states.
          var ariaState = $searchForm.is(':hidden');
          $toggleLink.attr('aria-expanded', !ariaState)
          $searchForm.attr('aria-hidden', ariaState)
        });
      });

      // Add members
      var $membersButton = $context.find('.pane-group-node-members-add');
      $membersButton.once('membersPage', function() {
        if ($(this).parents('#groups-members')) {
          $membersButton.detach().prependTo('#invotra-og-group-members .form-wrapper:last-child');
        }
      });

      // Doc create
      var $createDoc = $context.find('.create-new-doc-folder');
      $createDoc.once('docAria', function() {
        if ($createDoc.length) {
          $createDoc.attr({
            'role': 'button',
            'aria-expanded': 'false'
          });
          $createDoc.bind('click', function () {
            $(this).attr('aria-expanded', $(this).attr('aria-expanded') == 'true' ? 'false' : 'true');
          });
        }
      });

      $('textarea', $context.find('#edit-share-update, #mini-panel-post_a_poll')).once('share-textarea', function () {
        var $textarea = $(this);
        $textarea.attr('rows', 1);
        $textarea.bind({
          'focus': function () {
            $textarea.parent().addClass('focus');
          },
          'blur': function () {
            $textarea.parent().removeClass('focus')
          }
        })
      });
      $('textarea', $('.invotra-group-share-update')).once('share-textarea-scroll', function () {
        var $textarea = $(this);
        var maxHeight = parseInt($textarea.css('max-height'));
        var updateTextareaScroll = function ($textarea) {
          var scrollHeight = $textarea[0].scrollHeight;
          if (scrollHeight > $textarea.outerHeight() || scrollHeight > maxHeight) {
            $textarea.closest('form').addClass('scroll');
          }
          else {
            $textarea.closest('form').removeClass('scroll');
          }
        };

        updateTextareaScroll($textarea);
        $textarea.bind({
          'change keyup input focus': function (e) {
            updateTextareaScroll($textarea);
          }
        })
      });

      // Group focus attachment icon when link is clicked IE8
      $context.find('.pane-group-update-and-poll .ui-tabs-nav a').once(function() {
        if ($.browser.msie && parseInt($.browser.version) <= 9) {
          $(this).bind('click', function () {
            $('.invotra-group-share-update .form-type-media a.button.browse')
              .focus();
          })
        }
      });

      $context.find('.hide-comments').once('hide-comments', function () {
        $(this).bind('click', function (e) {
          e.preventDefault();
          $(this).closest('.views-field').find('.feed-comments').toggle();
        });
      });
      $context.find('.view-group-home .form-submit').once(function () {
        $(this).bind('mousedown', function (e) {
          $('.view-group-home .messages').hide(200);
        });
      });
      // Post a poll tuning.
      var $postPoll = $context.find('#mini-panel-post_a_poll');
      $('.pane-node-form-title .form-text', $postPoll).once('poll-question', function () {
        var $this = $(this);
        if ($this.is('.error')) {
          $this.parent().addClass('error');
        }
        $this.bind({
          'focus': function (e) {
            $(e.target).parent().addClass('focus');
          },
          'blur': function (e) {
            $(e.target).parent().removeClass('focus')
          }
        });
      });
      if ($postPoll.find('.error').length) {
        var tabId = $postPoll.closest('.ui-tabs-panel').attr('id');
        $('a[href*="' + tabId +'"]').click();
      }

      var groupContextualLinks = function($selector, linkClass,  menuClass, parentClass) {
        var $parent = $selector.find('.' + parentClass);
        $parent.once('group-contextual-links', function () {
          var $thisParent = $(this);
          var $link = $thisParent.find('.' + linkClass);
          $link.click(function (e) {
            e.preventDefault();
            // Hide all other member actions.
            var $openedSiblings = $('.' + parentClass + '.open').not($thisParent);
            if ($openedSiblings.length) {
              $openedSiblings.each(function () {
                $(this).removeClass('open');
                $('.' + menuClass, $(this)).hide().attr('aria-hidden', 'true');
              });
            }
            // Toggle current.
            var $links = $link.next('.' + menuClass);
            $links.slideToggle('fast').parent().toggleClass('open');
            var ariaStatus = $links.is(':visible');
            $links.attr('aria-hidden', !ariaStatus);
          });
        });
        $parent.closest('.panel-pane').once('group-contextual', function () {
          $(document).click(function (e) {
            var $target = $(e.target);
            if (!$target.is('.' + linkClass) && !$target.closest('.' + menuClass).length) {
              // Hide all other member actions.

              $('.' + menuClass).hide().attr('aria-hidden', 'true');
              $('.' + linkClass).attr('aria-expanded', 'false');
            }
          });
        });
      };

      // Create button.
      groupContextualLinks($('.pane-new-folder'), 'context', 'links', 'context-links-wrap');
      // DOC actions.
      groupContextualLinks($context, 'context', 'links', 'context-links-wrap');

      // Remove Group dashboard table border if there is header
      $('.pane-invotra-apps-create', context).once('dashboardBorder', function() {
        if ($(this).children('.invotra-group-dashboard-header').length) {
          $(this).css('border-bottom', 'none');
        }
      })

    }
  };

  /**
   * Double click prevention on form submission.
   *
   * An issue on d.org: https://www.drupal.org/node/1705618
   */
  Drupal.behaviors.formSingleSubmit = {
    attach: function (context, settings) {
      function onFormSubmit (e) {
        var $form = $(e.currentTarget);
        // It should work just for the forms of node and taxonomy.
        var formValues = $form.serialize();
        var previousValues = $form.attr('data-drupal-form-submit-last');
        if (previousValues === formValues) {
          e.preventDefault();
        }
        else {
          $form.attr('data-drupal-form-submit-last', formValues);
        }
      }

      $(context).find('form.node-form, form#taxonomy-form-term').once('form-single-submit')
        .bind('submit.singleSubmit', 'form:not([method~="GET"])', onFormSubmit);
    }
  };

  /**
   * Invotra attachments anchor.
   */
  Drupal.behaviors.invotraAttachmentAnchor = {
    attach: function (context, settings) {
      var $anchor_link = $('.pane-node-details .field-attachments a');
      $anchor_link.once(function () {
        $(this).click(function () {
          var href = $(this).attr("href");
          var hash = href.substr(href.indexOf("#")).replace('#', '');
          if (hash.length) {
            var $field = $('div[class*="' + hash + '"]').first();
            if ($field.length) {
              if ($field.closest('.pane-related-stuff').length) {
                $field.closest('.pane-related-stuff').find('.expandable.collapsed .ico').click();
              }
              $('body, html').animate({ scrollTop: $field.offset().top - 40}, 400);
            }
          }
        });
      });
    }
  };

  /**
   * Rebuilds views slideshow on resize to make it responsive.
   */
  Drupal.behaviors.invotraResponsiveSlideshow = {
    attach: function (context) {
      $('.views_slideshow_cycle_main, .general-styles-content.slideshow-wrap', context).once('invotraResponsiveSlideshow', function () {
        var $slideshow = $(this),
            windowWidth = $(window).width(),
            fullId = '#' + $(this).attr('id'),
            slideNum;

        // Fix for initial slide after AJAX.
        if (typeof Drupal.settings.viewsSlideshowCycle !== 'undefined') {
          var settings = Drupal.settings.viewsSlideshowCycle[fullId];
          if (typeof settings !== 'undefined') {
            settings.processedBefore = undefined;
            settings.processedAfter = undefined;
          }
        }
        var setSlideshowWidthClass = function (width) {
          var setClass = function(size) {
            // Remove width classes.
            var classList = $slideshow.attr('class').split(/\s+/);
            $.each(classList, function (index, classname) {
              if (classname.substr(0, 24) === 'invotra-slideshow-width-') {
                $slideshow.removeClass(classname);
              }
            });

            // Add new size class.
            $slideshow.addClass('invotra-slideshow-width-' + size);
          };
          var breakpoints = [
            300,
            360,
            620,
            608,
            736,
            940
          ];
          $.each(breakpoints, function(index, value) {
            if (width >= value) {
              setClass(value);
            }
          });
        };
        var invotraResizeSlider = function(e) {
          var $this = $(e);
          var $frame = $this.find('.views-slideshow-cycle-main-frame, .slideshow'),
            frameWidth = $frame.width(),
            frameHeight = $frame.height(),
            slideImage = $frame.find('.image-field img');
          var slideWidth = slideImage.width();
          if (frameWidth != slideWidth || frameWidth < frameHeight) {
            var newFrameHeight = frameHeight;

            setSlideshowWidthClass(frameWidth);

            // Calculate Frame height.
            if (frameWidth > 740) {
              newFrameHeight = 627;
            }
            else {
              newFrameHeight = Math.round(frameWidth/3*2);
            }

            var $slideshowContent = $this.closest('.general-styles.slideshow, .general-styles-content'),
                $slideshowPause = $slideshowContent.find('.views-slideshow-controls-text-pause'),
                $slideshowPrewNext = $slideshowContent.find('.views-slideshow-controls-text-previous, .views-slideshow-controls-text-next');

            // Calculate position of the control buttons.
            if (frameWidth <= 360) {
              $slideshowPause.addClass('small');
            }
            var slideshowTopPause = Math.round(newFrameHeight / 2 + parseInt($slideshowContent.css('padding-top')) - $('a', $slideshowPause).height() / 2);
            var slideshowTopPrewNext = Math.round(newFrameHeight / 2 + parseInt($slideshowContent.css('padding-top')) - $slideshowPrewNext.height() / 2);
            $slideshowPause.css('top', slideshowTopPause.toString() + 'px');
            $slideshowPrewNext.css('top', slideshowTopPrewNext.toString() + 'px');

            $frame.find('.image-field').height(newFrameHeight);

            $(slideImage, context).each(function() {
              $(this).height(newFrameHeight);
              $(this).bind('load', function () {
                var imageWidth = $(this).getHiddenDimensions().width;
                if (frameWidth < imageWidth) {
                  var offset = - (imageWidth - frameWidth) / 2;
                  $(this).css('margin-left', offset);
                }
              });
            });
            $(slideImage).each(function(){
              slideImageHeight = $(this).context.height;
              slideImageWidth = $(this).context.width;

              if (slideImageHeight / newFrameHeight > slideImageWidth / frameWidth) {
                $(this).height(newFrameHeight);
              }
            });
          }
        };

        // Swipe images.
        $slideshow.find('.image-field img').bind('swipeleft', function(e) {
          $slideshow.siblings().find('.views-slideshow-controls-text .views-slideshow-controls-text-next a').click();
        });
        $slideshow.find('.image-field img').bind('swiperight', function(e) {
          $slideshow.siblings().find('.views-slideshow-controls-text .views-slideshow-controls-text-previous a').click();
        });

        invotraResizeSlider($slideshow);

        $(window).bind('resize', function () {
          if ($(window).width() != windowWidth) {
            windowWidth = $(window).width();

            slideNum = 0;
            if (typeof settings !== 'undefined') {
              slideNum = (typeof settings.opts.startingSlide === 'undefined') ? 0 : settings.opts.startingSlide;
            }
            $slideshow.removeClass('viewsSlideshowCycle-processed');
            $slideshow.find('ul.slideshow').removeClass('invotraPanesContentSlideshow-processed');
            $slideshow.find('.views-slideshow-cycle-main-frame').removeAttr('style');
            $slideshow.find('ul.slideshow').removeAttr('style');
            $slideshow.find('.views-slideshow-cycle-main-frame-row').removeAttr('style');
            $slideshow.find('ul.slideshow li').removeAttr('style');

            Drupal.attachBehaviors($slideshow.parent());

            invotraResizeSlider($slideshow);

            setTimeout(function () {
              $slideshow.parent().find('.views-slideshow-pager-fields > *').removeClass('active');
              $slideshow.parent().find('.views-slideshow-pager-fields > *').eq(slideNum).addClass('active');
            }, 100);
          }
        });
      });
    }
  };

  /**
   * Deffer running viewsSlideshowCycle behavior.
   *
   * The behavior invokes jQuery Cycle plugin which calculates slides heights.
   *
   * The issue with this approach is that this behavior runs *before* the
   * invotraResponsiveSlideshow behavior which replaces images heights; as a
   * result, the jQuery Cycle object has wrong objects dimensions stored.
   */
  if (typeof Drupal.behaviors.viewsSlideshowCycle !== "undefined"
  && typeof Drupal.behaviors.viewsSlideshowCycle.attach !== "undefined") {
    var originalAttach = Drupal.behaviors.viewsSlideshowCycle.attach;
    Drupal.behaviors.viewsSlideshowCycle.attach = function (context) {
      setTimeout(function () {
        originalAttach(context)
      }, 0);
    };
  }

  Drupal.behaviors.invotraTextareaAutosize = {
    attach: function (context, settings) {
      if (!$.fn.autosize) {
        // Skip if autosize is not available for some reason.
        return;
      }

      var noWysiwyg = function() {
        var id = $(this).attr('id');

        if (!id) {
          // Element does not have ID so it can't become WYSIWYG.
          return true;
        }

        if (typeof settings.wysiwyg === 'undefined'
          || typeof settings.wysiwyg.triggers === 'undefined') {
          // No WYSIWYG settings.
          return true;
        }

        for (var trigger in settings.wysiwyg.triggers) {
          if (settings.wysiwyg.triggers.hasOwnProperty(trigger)
          && settings.wysiwyg.triggers[trigger].field === id) {
            // There is a corresponding WYSIWYG setting.
            return false;
          }
        }

        // No WYSIWYG otherwise.
        return true;
      };

      $(context)
        .find('textarea')
        // Special class to allow disabling autosize.
        .not('.no-autosize')
        // Do not process WYSIWYG.
        .filter(noWysiwyg)
        // Process only once.
        .once('invotra-autosize', function () {
          var $textarea = $(this);
          $textarea.autosize();
          // Trigger window resize event if textarea is inside Ctools modal.
          if ($textarea.parents('.modal-content').length) {
            $textarea.bind('autosize.resized', function () {
              $(window).trigger('invotraWindowResize');
            })
          }
        });
    }
  };

  /**
   * Invotra profile.
   */
  Drupal.behaviors.invotraProfile = {
    attach: function (context, settings) {
      var $profile = $(context).find('#user-profile');
      var $profile_org = $profile.find('#mini-panel-user_profile_org');
      var $profileItems = $(context)
          .find('#user-profile .pane-user-field-interests .pane-content,' +
          '#user-profile .pane-user-field-free-skills .pane-content,' +
          '#user-profile .pane-user-field-skills .pane-content,' +
          '#user-profile .pane-user-groups-panel-pane-1 .pane-content');
      $profile.once(function () {
        if ($profile.length > 0) {
          $('ul.tabs.primary').addClass('profile-tabs');
          $('ul.tabs.primary').parent().attr('id', 'profile-tabs-wrapper');
          var tabs = $('#profile-tabs-wrapper').detach();
          $('#mini-panel-user_profile_details').after(tabs);
          if ($('.view-messages-feed').length) {
            tabs.after('<h2 class="element-invisible">' + Drupal.t('Activity') + '</h2>');
          }
        }
        else {
          $profile.removeClass('profile-tabs');
        }
        $profile_org.before('<h2 class="element-invisible">' + Drupal.t('Personal details') + '</h2>');
      });
      // Profile field 'View more' 'View less'
      $profileItems.each(function () {
        if ($(this).height() > 127) {
          $(this).addClass('close');
          $(this).parent().append('<button class="profile-view-more input-standard-button" type="button">' + Drupal.t('View more') + '</button>');
        }
      });
      var $viewMore = $('.profile-view-more', context);
      $viewMore.once().bind('click', function (e) {
        var $text = $(this).text() == Drupal.t('View more') ? Drupal.t('View less') : Drupal.t('View more');
        if ($(e.target).closest('button').length) {
          $(this)
            .text($text)
            .prev($profileItems).toggleClass('open')
            .toggleClass('close');
        }
      });
    }
  };

  /**
   * Invotra sticky primary menu helper function.
   */
  Drupal.behaviors.invotraStickyPrimaryMenu = {
    attach: function(context, settings) {
      // Adds extra margin if primary_menu contains many items.
      function updateContentMargins($primary_menu) {
        $('.zone-content', context).each(function() {
          $(this).css({
            'padding-top': ($primary_menu.height() - 40)
          });
        });
      }

      $(context).find('.primary-menu-sticky').once('invotraStickyPrimaryMenu', function() {
        var $this = $(this);
        updateContentMargins($this);
        $(window).bind('invotraWindowResize', function() {
          updateContentMargins($this);
        });
      });
    }
  };

  /**
   * Invotra sticky primary menu helper function.
   */
  Drupal.behaviors.invotraZoneContentHeight = {
    attach: function(context, settings) {
      // Adds height when the page hasn't vertical overflow.
      function updateContentHeight($zone_content) {
        $('.zone-content', context).css('min-height', '');

        var header = $('.section-header').height();
        var top = $('.region-page-top').height();
        var padding = $zone_content.outerHeight(true) - $zone_content.height();
        $('.zone-content', context).each(function() {
          $(this).css({
            'min-height': $('body').height() - header - top - padding
          });
        });
      }

      $(context).find('.zone-content').once('invotraZoneContentHeight', function() {
        var $this = $(this);
        updateContentHeight($this);
        $(window).bind('invotraWindowResize', function() {
          updateContentHeight($this);
        });
      });
    }
  };

  /**
   * Invotra appends reset button for landing pages.
   */
  Drupal.behaviors.invotraAppsCurrentSearch = {
    attach: function(context, settings) {
      var $resetPane = $(context).find('.pane-current-search-block .current-search-item-invotra-apps-reset');
      $resetPane.once(function() {
        if ($(this).parents('#invotra-landing-search').length) {
          $(this).appendTo('.pane-invotra-save-search .pane-content');
        }
      });
    }
  };

  /**
   * Invotra disabled submit when selected.
   */
  Drupal.behaviors.hideSubmitButton = {
    attach: function(context) {
      $('form', context).once('hideSubmitButton', function () {
        var $form = $(this);

        // Hide submit function
        function hideFormSubmitButton(d) {
          $form.find(d).click(function (e) {
            var el = $(this);
            if (!el.hasClass('invotra-distributed-publishing')) {
              el.after('<input type="hidden" name="' + el.attr('name') + '" value="' + el.attr('value') + '" />');
            }
            return true;
          });
          // Disables form on submit.
          $form.submit(function (e) {
            var $this = $(this);
            if (!e.isPropagationStopped()) {
              if ($this.hasClass('webform-client-form')) {
                if ($this.hasClass('form-submitted')) {
                  e.preventDefault();
                  return;
                }

                $this.addClass('form-submitted');
              }
              else {
                $(d, $this).attr('disabled', 'disabled');
                return true;
              }
            }
          });
        }

        hideFormSubmitButton('input.form-submit, button.submit');
      });

      // Modal window hide submit
      $('.ctools-modal-content', context).once('hideSubmitModal', function() {
        $(this).find('.form-submit').click(function() {
          if ($.browser.msie && parseInt($.browser.version) == 8) {
            // IE8 Again.
            $(this)
              .attr('disabled', true)
              .css('filter', 'alpha(opacity=70)')
              .fadeTo(0.7);
            $(this).submit();
          }
          else {
            $(this).attr('disabled', true);
            $(this).submit();
          }
        });
      })
    }
  };

  /**
   * Invotra disabled submit when selected.
   */
  Drupal.behaviors.changeSearchButton = {
    attach: function(context) {
      $('form .search-button', context).once('changeSearchButton', function() {
        $(this).click(function() {
          $(this).next('input.form-submit').click();
        });
      })
    }
  };

  /**
   * Help webkit browsers render a tags by displaying block.
   *
   * Ref: INVGOV-6025
   *
   */
  Drupal.behaviors.invotraRenderTag = {
    attach: function(context) {

      // Function to focus a tags for webkit browsers.
      function panesTags(e) {
        $(context).find(e).once('renderTags', function() {
          if ($.browser.webkit && $(e).length) {
            $(e).css('display', 'block');
          }
        })
      }
      // Calls panesTags function for a tags.
      panesTags('.pane-search-api-glossary .views-field a, .pane-taxonomy-term-field-related-content-fields a, .pane-section-lists a');
    }
  };


  /**
   * Invotra comments toggle dropdown & accessibility.
   */
  Drupal.behaviors.commentToggle = {
    attach: function(context, settings) {

      // Comment menu toggle.
      $('.comment .arrow').each(function() {
        var $element = $(this);
        var $menu = $element.parent().find('.top-links');
        $element.once('commentToggle', function () {
          $element.click(function(e) {
            e.preventDefault();
            $menu.toggle('fast');
          });

          // Hide element on ESC key.
          $element.keyup(function(e) {
            if (e.keyCode == 27) {
              $menu.hide();
            }
          })
        });
      });

      // Comment dropdown accessibility.
      $('.comment .top-links .links').each(function() {
        var $element = $(this);
        $element.once('commentAria', function () {
          var $links = $element.find('li');
          if ($links.length) {
            $links.attr({
              'role': 'menuitem'
            });
          }

          // We must remove flag link wrapper classes for accessibility.
          var $flag = $element.find('.flag-action');
          var $flagWrapper = $element.find('.flag-wrapper');
          if ($flag.length && $flagWrapper.length) {
            $flagWrapper.unwrap('span');
            $flag.unwrap('.flag-wrapper');
          }
        });
      });

      if (Drupal.invotra.invotraBase && Drupal.invotra.invotraBase.commentMenu) {
        var $menuSelector = $(context).find('.comment .comment-content-wrap .top-links');
        var $menuElement = $(context).find('.pane-node-comments');
        invotraBase.commentMenu($menuSelector, $menuElement);
      }
    }
  }

  /**
   * Check for non-empty required fields at login form.
   */
  Drupal.behaviors.invotraLoginForm = {
    attach: function(context) {
      $('form#user-login', context).once('invotraLoginForm', function() {
        var $form = $(this);
        $(this).find('.form-submit').click(function(e) {
          e.preventDefault();
          var error = false;
          var $login = $form.find('#edit-name');
          var isIE = ($.browser.msie && parseInt($.browser.version) < 10);
          if ($login.length && !$login.val()) {
            $login.addClass('error').attr("placeholder", Drupal.t('Username or email address field is required'));
            error = true;
            if (isIE) {
              $login.parent().addClass('input-error');
              $login.removeClass('input-tips-processed');
              invotraBase.inputTips($login, '', {'color': '#ff0000'}, true);
            }
          }
          var $pass = $form.find('#edit-pass');
          if ($pass.length && !$pass.val()) {
            $pass.addClass('error').attr("placeholder", Drupal.t('Password field is required'));
            error = true;
            if (isIE) {
              $pass.parent().addClass('input-error');
              $pass.removeClass('input-tips-processed');
              invotraBase.inputTips($pass, '', {'color': '#ff0000'}, true);
            }
          }
          if (!error) {
            $form.submit();
          }
        });
      });
    }
  };

  /**
   * Check for non-empty required fields at password recovery form.
   */
  Drupal.behaviors.invotraPassForm = {
    attach: function(context) {
      $('form#user-pass', context).once('invotraPassForm', function() {
        var $form = $(this);
        $(this).find('.form-submit').click(function(e) {
          e.preventDefault();
          var isIE = ($.browser.msie && parseInt($.browser.version) < 10);
          var $login = $form.find('#edit-name');
          if ($login.length && !$login.val()) {
            $login.addClass('error').attr("placeholder", Drupal.t('Username or e-mail address is required.'));
            if (isIE) {
              $login.parent().addClass('input-error');
              $login.removeClass('input-tips-processed');
              invotraBase.inputTips($login, '', {'color': '#ff0000'}, true);
            }
          }
          else {
            $form.submit();
          }
        });
      });
    }
  };

  /**
   * Display a password requirements.
   */
  Drupal.behaviors.invotraAccountForm = {
    attach: function(context, settings) {
      $('form#invotra-user-profile-account-form,  form#user-register-form', context).once('invotraAccountForm', function() {
        var $form = $(this);
        var $suggestions = $form.find('.password-suggestions');
        var result = Drupal.evaluatePasswordStrength('', settings.password);
        if ($suggestions.length) {
          var passwordInput = $form.find('input.password-field');
          var $pass_parent = $form.find('.form-type-password-confirm .password-parent');
          $suggestions.show();
          $pass_parent.before($suggestions.html(result.message));
          if (passwordInput.hasClass('error')) {
            $suggestions.html(result.message).addClass('error');
          }
        }
      });
    }
  };

  /**
   * Evaluate the strength of a user's password.
   *
   * Returns the estimated strength and the relevant output message.
   */
  Drupal.evaluatePasswordStrength = function (password, translate) {
    password = $.trim(password);

    var weaknesses = 0, strength = 100, msg = [];

    var hasLowercase = /[a-z]+/.test(password);
    var hasUppercase = /[A-Z]+/.test(password);
    var hasNumbers = /[0-9]+/.test(password);

    // Lose 3 points for every character less than 10, plus a 30 point penalty.
    if (password.length < 10) {
      msg.push(translate.tooShort);
      strength -= ((10 - password.length) * 3) + 30;
    }

    // Count weaknesses.
    if (!hasNumbers) {
      msg.push(translate.addNumbers);
      weaknesses++;
    }
    if (!hasLowercase) {
      msg.push(translate.addLowerCase);
      weaknesses++;
    }
    if (!hasUppercase) {
      msg.push(translate.addUpperCase);
      weaknesses++;
    }

    // Apply penalty for each weakness (balanced against length penalty).
    switch (weaknesses) {
      case 1:
        strength -= 12.5;
        break;

      case 2:
        strength -= 25;
        break;

      case 3:
        strength -= 40;
        break;
    }

    // Based on the strength, work out what text should be shown by the password strength meter.
    if (strength < 60) {
      indicatorText = translate.weak;
    } else if (strength < 70) {
      indicatorText = translate.fair;
    } else if (strength < 80) {
      indicatorText = translate.good;
    } else if (strength <= 100) {
      indicatorText = translate.strong;
    }

    var inputPassStrength = $('input[name="pass[strength]"]');
    if (inputPassStrength.length) {
      inputPassStrength.val(strength);
    }

    // Assemble the final message.
    msg = translate.hasWeaknesses + '<ul><li>' + msg.join('</li><li>') + '</li></ul>';
    return { strength: strength, message: msg, indicatorText: indicatorText };

  };

  /**
   * Handling terms in profile preview.
   */
  Drupal.behaviors.invotraTermsPreview = {
    attach: function(context, settings) {
      if ($('.invotra-hierarchy-chart').length || $('.view-display-id-your_profile').length) {
        // Get count of visible characters.
        var get_visible_term_length = function(text, width, size, family, weight) {

          // Create pseudo element.
          var pseudo = $("<div>").addClass("auxdiv").css ({
            fontFamily : family,
            fontSize : parseInt(size) + "px",
            position: "absolute",
            height: "auto",
            marginLeft : "-1000px",
            marginTop : "-1000px",
            fontWeight: weight,
            width: "auto"
          })
            .appendTo($("body"))
            .html(Drupal.checkPlain(text) + '...');

          var ww = pseudo.width();
          var str = text;
          var sol = text.length - 1;

          while (ww >= width) {
            str = text.slice(0, sol--);
            pseudo.html(Drupal.checkPlain(str) + '...');
            ww = pseudo.width();
          }

          // Remove pseudo element.
          $(".auxdiv").remove();
          pseudo.remove();

          // Resturn count of characters.
          return sol;
        };

        // Trim terms and add title attribute.
        var profile_terms = function($team, $chat) {
          $team.each(function() {
            var $terms;

            if ($chat) {
              $terms = [
                $(this).find('.user-name'),
                $(this).find('.job-roles'),
                $(this).find('.teams'),
                $(this).find('.locations')
              ];
            }
            else {
              $terms = [
                $(this).find('.views-field-fullname a'),
                $(this).find('.views-field-field-job-role .field-content'),
                $(this).find('.views-field-field-organisational-unit .field-content'),
                $(this).find('.views-field-field-locations .field-content')
              ];
            }

            $.each($terms, function(index, term) {
              if (term.attr('title')) {
                term.text(term.attr('title'));
              }

              // Check if there is a second line.
              if (term[0] != null && term[0].scrollHeight > term.innerHeight()) {
                var term_text   = term.text();
                var term_width  = term.innerWidth();
                var term_size   = term.css('font-size');
                var term_family = term.css('font-family');
                var term_weigth = term.css('font-weight');

                var term_length = get_visible_term_length(term_text, term_width, term_size, term_family, term_weigth);
                var term_value  = term.text().substr(0, term_length);
                term_value      = $.trim(term_value) + '...';

                term.attr('title', term_text);
                term.text(term_value);
              }
            });
          });
        };

        // Org chart page & User profile page.
        profile_terms($('.invotra-hierarchy-chart .item-list li'), true);
        // Find people page.
        profile_terms($('.view-display-id-your_profile .views-row'), false);

        $(window).bind('invotraWindowResize', function () {
          profile_terms($('.invotra-hierarchy-chart .item-list li'), true);
          profile_terms($('.view-display-id-your_profile .views-row'), false);
        });
      }
    }
  }

  /**
   * Place to fix behaviour of Better Exposed Filters scripts.
   */
  Drupal.behaviors.invotraBaseFixBEFBehavior = {
    attach: function (context) {
      // Updates input state on BEF "Select All" button.
      $('.bef-toggle', context).once('invotraBaseFixBEFBehavior', function () {
        var $this = $(this);
        $this.bind('click', function () {
                     var $inputs = $this.next().find('input');
            if ($inputs.length) {
              $.uniform.update($inputs);
            }
        });
      });
    }
  };

  /**
   * Add row-weights class to the tbody on "show row weights" link click.
   */
  Drupal.behaviors.invotraRowWeightsClass = {
    attach: function (context) {
      var toggleRowWeightClass = function($object) {
        if ($.cookie('Drupal.tableDrag.showWeight') == 1) {
          $object.addClass('row-weights');
        }
        else {
          $object.removeClass('row-weights');
        }
      };

      $('.tabledrag-toggle-weight', context).once('invotraRowWeightClass', function() {
        var $tbody = $(this).parents('div.form-item').find('tbody');
        toggleRowWeightClass($tbody);
      }).click(function() {
        var $tbody = $(this).parents('div.form-item').find('tbody');
        toggleRowWeightClass($tbody);
      });
    }
  };

  /**
   * Add needed attributes and class for the load more pager.
   */
  Drupal.behaviors.invotraPagerLoadMore = {
    attach: function (context) {
      $('.pager-load-more a', context).once('convertToButton', function () {
        var $this = $(this);
        $this.attr('role', 'button').addClass('input-standard-button');
        $this.keyup(function(e) {
          if (e.keyCode === 32) {
            $this.click();
            return false;
          }
        })
      });
    }
  };

  /**
   * Add needed attributes and class for the load more pager.
   */
  Drupal.behaviors.invotraManageApps = {
    attach: function (context) {
      $('.pane-manage-apps', context).once('activeTab', function () {
        var tab = getUrlParameter('tab');
        if (typeof tab !== 'undefined' && tab == 'manage-apps') {
          id = '#' + $(this).parent('.ui-tabs-panel').attr('aria-labelledby');
          $(id).click();
        }
      });
      $('#manage-apps-settings input.connected', context).once('connectedHover', function () {
        var text = $(this).val(),
            hoverText = $(this).attr('hover-val');
        if (hoverText !== 'undefined') {
          $(this).hover(function () {
            $(this).val(hoverText);
          }, function () {
            if (!$(this).hasClass('focus')) {
              $(this).val(text);
            }
          });
          $(this).focus(function () {
            $(this).val(hoverText);
          });
          $(this).focusout(function () {
            $(this).val(text).removeClass('focus');
          });
        }
      });
    }
  };

  /**
   * Manage multi-step CKEditor iframe.
   */
  Drupal.behaviors.invotraIframePosition = {
    attach: function (context) {
      $("iframe").once("invotraIframePosition", function () {
        $(this).load(function () {
          var $iframe = $(this);
          var attr = $(this).attr("data-invotra-iframe-position");
          if (typeof attr !== typeof undefined && attr !== false) {
            var dPositions = $iframe.data("invotra-iframe-position");
            var positions = dPositions.map( function (el) {
              return {
                height: Number(el[0]),
                enableScroll: el[1],
                center: el[2]
              };
            });

            var step = typeof $iframe.data("step") == "undefined" ? 0 : $iframe.data("step");
            $iframe.data("step", (step + 1));
            if (typeof positions[step] == "undefined"
                && positions[step].height == 0) {
              return;
            }

            // Set iframe height.
            $iframe.attr("height", positions[step].height + "px");

            // Enabling/disabling iframe scroll.
            positions[step].enableScroll
                ? $iframe.attr("scrolling", "yes")
                : $iframe.attr("scrolling", "no");

            // Scroll to iframe.
            if (positions[step].center) {
              // Get header height.
              var hHeight = 0;
              if ($(window).width() > 960) {
                hHeight = $("header").height() + $('#admin-menu').height() + $('#region-menu').height();
              }
              var scroll = $iframe.offset().top;
              scroll -= hHeight;
              $('html, body').animate({
                scrollTop: scroll
              }, 2000);
            }
          }
        });
      });
    }
  };

  if (typeof Drupal.ACDB !== 'undefined') {

    /**
     * Keep an unmodified copy of the core search callback function.
     */
    Drupal.ACDB.prototype.coreSearch = Drupal.ACDB.prototype.search;

    /**
     * Override the search callback.
     *
     * Prevent autocomplete search from running if the search string is shorter
     * than the 2 characters. Otherwise, call the clone of the original search
     *  callback.
     */
    Drupal.ACDB.prototype.search = function (searchString) {
      // Do not search if the string is too short.
      if (searchString.length < 2) {
        return;
      }

      // Call the original core search callback.
      return this.coreSearch(searchString);
    };
  }

})(jQuery);
