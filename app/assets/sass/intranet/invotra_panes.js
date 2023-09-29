(function ($) {
  Drupal.invotraPanes = Drupal.invotraPanes || {}
  
  function checkSelection($container) {
    $('.form-checkbox', $container).each(function() {
      if ($(this).is(':checked')) {
        $(this).parent().addClass('checked');
      }
      else {
        $(this).parent().removeClass('checked');
      }
    });
  }

  Drupal.behaviors.invotraPanesCheckboxes = {
    attach: function (context, settings) {
      $('#invotra-panes-lists-form #edit-lists', context).once(function() {
        $(this).change(function () {
          checkSelection($(this));
        });
        checkSelection($(this));
      });
    }
  };
  function checkListFlag($link) {
    var $form = $link.parent().find('.form-checkbox');
    if ($form.length) {
      var checked = 0;
      $form.each(function() {
        if ($(this).is(':checked')) {
          checked = 1;
          return;
        }
      });
      if (checked) {
        $link.removeClass('flag-action');
        $link.addClass('unflag-action');
      }
      else {
        $link.removeClass('unflag-action');
        $link.addClass('flag-action');
      }
    }
  }

  Drupal.behaviors.invotraPanesListsCheckboxes = {
    attach: function (context, settings) {
      $('a.invotra-lists-link', context).once('invotraPanesListsCheckboxes', function() {
        var $pane = $(this).parents('.pane-lists'),
            $content = $pane.find('#invotra-list-form-wrapper');
        checkListFlag($(this));
        $(this).click(function() {
          checkListFlag($(this));
          $(document).one('ajaxSuccess.openList', function() {
            if ($pane.hasClass('open-list')) {
              $pane.removeClass('open-list');
              $content.hide();
            }
            else {
              $pane.addClass('open-list');
              $content.show();
              $pane.find('.form-submit').bind('mousedown', function() {
                $(document).bind('ajaxSuccess.openList', function() {
                  $pane.removeClass('open-list');
                  $(document).unbind('ajaxSuccess.openList');
                });
              });
            }
            checkListFlag($(this));
          });
        });
      });
    }
  };

  // Selector :active not working on child element click in IE.
  Drupal.behaviors.invotraPanesRateListLinks = {
    attach: function (context, settings) {
      $('.pane-invotra-actions', context).once('invotraPanesRateListLinks', function(e) {
        addActiveToParent($('.pane-rate-widget'));
        addActiveToParent($('.pane-lists'));
      });
      function addActiveToParent($element) {
        $(document).click(function () {
          $element.removeClass('active');
        });
        $element
          .mousedown(function() {
            $element.addClass('active');
          })
          .mouseup(function() {
            $element.removeClass('active');
          });
      }
    }
  };

  Drupal.behaviors.invotraFaqWidget = {
    attach: function (context, settings) {
      $faqList = $('.pane-faq .faq-list, .view-faq .faq-list');
      $faqList.once('faq-accordion', function() {
        $faqList.find('.answer').hide();
        $faqList.find('.title a').once().click(function (e) {
          $(this).parents('li').find('.answer').slideToggle('fast');
          e.preventDefault();
        });
      });
    }
  }

  Drupal.behaviors.invotraAccordionStyle = {
    attach: function (context, settings) {
      $accItem = $('.general-styles-content .accodion-item');
      $accItem.parent().once('list-accordion', function() {
        $accItem.find('.text').hide();
        $accItem.find('.title a').click(function (e) {
          $(this).parents('li').find('.text').slideToggle('fast');
          e.preventDefault();
        });
      });
    }
  };
  Drupal.behaviors.invotraWidgetsBackgroudLink = {
    attach: function (context, settings) {
      $('.general-styles-content, .general-styles').once('BackgroudLink', function() {
        function setBackgroundHover($link) {
          var $viewsTitle = $link.parents('.views-field-link-background').prevAll('.views-field-title'),
            $listTitle = $link.prevAll('.title');
          if ($listTitle.length) {
            $listTitle.toggleClass('hover');
          }
          else {
            if (!$viewsTitle.length) {
              $viewsTitle = $link.parents('.views-field-link-background').prevAll('.info-wrapper').find('.views-field-title');
            }
            $viewsTitle.toggleClass('hover');
          }
        }
        // Add hover action for the handle.
        var $backgroundLink = $(this).find('.views-field-link-background a, .link-background');
        var containerZIndex = $(this).zIndex();
        $backgroundLink.attr('aria-hidden', true).attr('tabindex', '-1').css({'z-index': containerZIndex + 1});
        $backgroundLink.hover(function () {
          setBackgroundHover($(this));
        }, function () {
          setBackgroundHover($(this));
        });
      });
    }
  };

  /**
   * Change GS22 link attr.
   */
  Drupal.behaviors.invotraGS22LinkAttr = {
    attach: function (context, settings) {
      $('.general-22-content').once('LinkAttr', function() {
        // Add hover action for the handle.
        var $commentLink = $(this).find('.comments a, .views-field-created a');
        var containerZIndex = $(this).zIndex();
        $commentLink.attr('tabindex', '-1').css({'z-index': containerZIndex + 2, 'position': 'relative'});
      });
    }
  };

  Drupal.behaviors.invotraPanesTabs = {
    attach: function(context, settings) {
      if (typeof Drupal.settings.invotraPanesTabs !== 'undefined') {
        if (Drupal.settings.invotraPanesTabs && $.ui.tabs) {
          var tabs = Drupal.settings.invotraPanesTabs;
          for (var key in tabs) {
            $('#' + tabs[key].tabsID + ':not(.tabs-processed)', context)
                .addClass('tabs-processed')
                .tabs();
            if (tabs[key].position == 'bottom') {
              $('#' + tabs[key].tabsID + ' .ui-tabs-nav, .tabs-bottom .ui-tabs-nav > *')
                  .removeClass('ui-corner-all ui-corner-top')
                  .addClass('ui-corner-bottom');
              // move the nav to the bottom
              $('#' + tabs[key].tabsID).find('.ui-tabs-nav').appendTo('#' + tabs[key].tabsID);
            }

            // Aria for invotra panes tabs.
            var uiTabs = $(context).find('.invotra-view-tabs'),
                nodeTeaser = uiTabs.find('.node-teaser-link'),
                userLink = uiTabs.find('.user-picture a'),
                userTeaser = uiTabs.find('.user-picture img'),
                tabLink = uiTabs.find('.tab-link');
            if (uiTabs.length) {
              nodeTeaser.unwrap();
              userLink.attr({
                'tabindex': '-1',
                'aria-hidden': 'true'
              });
              userTeaser.attr({
                'tabindex': '-1',
                'aria-hidden': 'true'
              })
              .parent().removeAttr('title');
              tabLink.each(function() {
                if ($(this).parent().hasClass('ui-state-active')) {
                  $(this).attr('aria-selected', true);
                }
                else {
                  $(this).attr('aria-selected', false);
                }
              })
            }
          }
        }
      }
    }
  };

  Drupal.behaviors.invotraPreventEnter = {
    attach: function(context, settings) {
      $('#invotra-panes-list-edit-form, #invotra-panes-promotion-edit-form').keypress(function (event) {
        if (event.keyCode == 13) {
          return false;
        }
      });
    }
  }
  
  Drupal.behaviors.invotraPanesSlideshow = {
    attach: function (context, settings) {
      $view = $('.general-styles.slideshow');
      $('.views-slideshow-pager-field-item a', $view).each(function (i) {
        $(this).parent().html(i+1);
      });
      $('.views-slideshow-pager-field-item a',$view).click(function () {
        return false;
      });
    }
  }
  Drupal.behaviors.invotraPanesContentSlideshow = {
    attach: function (context, settings) {
      var $contentSlideshow = $('.general-styles-content .slideshow');
      if ($contentSlideshow.length && $.fn.cycle) {
        $contentSlideshow.once('invotraPanesContentSlideshow', function () {
          var $this = $(this);
          var $wrapper = $this.closest('.general-styles-content').addClass('slideshow-wrap'),
              $controls = $wrapper.find('.views-slideshow-controls-text'),
              $pager = $wrapper.find('.widget_pager').empty();
          if (!$controls.length) {
            $pager = $('<div class="pager widget_pager" />')
              .prependTo($wrapper);

            // Add prev/next controls this way to change focus order.
            $('<div class="views-slideshow-controls-text" />')
              .append(
                $('<span class="views-slideshow-controls-text-previous"> </span>')
                  .append('<a href="#" tabindex="0">' + Drupal.t('Previous article') + '</a>'),
                $('<span class="views-slideshow-controls-text-pause"> </span>')
                  .append('<a href="#" tabindex="-1" aria-hidden="true"> </a>')
              )
              .prependTo($wrapper);
            $('<div class="views-slideshow-controls-text" />')
              .append(
                $('<span class="views-slideshow-controls-text-next"> </span>')
                  .append('<a href="#" tabindex="0">' + Drupal.t('Next article') + '</a>')
              )
              .appendTo($wrapper);
            $controls = $wrapper.find('.views-slideshow-controls-text');
          }
          $wrapper.parent().find('> .more-link-general').appendTo($wrapper);
          $this.cycle('destroy');
          setTimeout(function () {
            $this.cycle({
              fx: 'fade',
              speed: 700,
              timeout: 5000,
              prev: $controls.find('.views-slideshow-controls-text-previous a'),
              next: $controls.find('.views-slideshow-controls-text-next a'),
              pager: $pager,
              wait_for_image_load: 1,
              wait_for_image_load_timeout: 3000
            });

            // Remove pager from focus.
            $pager.find('a').attr('tabindex', -1);

            // Adds pause button event.
            $controls.find('.views-slideshow-controls-text-pause a').bind('click', function (e) {
              var $button = $(this).parent();
              e.preventDefault();

              if ($button.hasClass('play')) {
                $this.cycle('resume');
              }
              else {
                $this.cycle('pause');
              }
              $button.toggleClass('play');
            });

            // Pause slider when focus comes into it with keyboard.
            var keyevent = false;
            $(document).bind('keydown', function () {
              keyevent = true;
            }).bind('keyup', function () {
              keyevent = false;
            });
            $wrapper.bind('focusin', function () {
              if (keyevent) {
                $wrapper.addClass('slideshow-focus');
                $this.cycle('pause');
              }
            }).bind('focusout', function () {
              if (keyevent) {
                $wrapper.removeClass('slideshow-focus');
                if (!$wrapper.find('.views-slideshow-controls-text-pause').hasClass('play')) {
                  $this.cycle('resume');
                }
              }
            });
          }, 10);
        });
      }
    }
  };

  /**
   * Send an ajax request to retrieve a Image styles on layout change.
   *
   * We use this as an standard Drupal '#ajax' alternative because standard
   * Drupal ajax request makes Panels block disappear in some cases.
   */
  Drupal.behaviors.invotraImageStyleChange = {
    attach: function (context, settings) {
      $('input[type=radio][name=layout]', context).once('ajaxImageStyle', function () {
        var $this = $(this);
        $this.change(function () {
          var $throbber = $('<div class="ajax-progress ajax-progress-throbber"><div class="throbber">&nbsp;</div></div>');
          $this.after($throbber);
          $.ajax({
            url: Drupal.settings.basePath + 'invotra_panes/get_image_styles/' + this.value,
            dataType: 'json',
            success: function (data, status) {
              var $imageStyleFIeld = $('#image-style-replace');
              $imageStyleFIeld.html(data);
              Drupal.attachBehaviors($imageStyleFIeld);
              $throbber.remove();
            }
          });
        })
      })
    }
  };

  Drupal.behaviors.invotraPanesCarousel = {
    attach: function (context, settings) {

      var $carousel = $('.general-styles-content ul.carousel, .general-styles.carousel .view-content ul');
      $carousel.once('invotraPanesContentCarousel', function() {
        $(window).load(function () {
          implementCarousel($carousel);
        });
        $carousel.find('img').load(function () {
          implementCarousel($carousel);
        });
      });
      function implementCarousel($elements) {
        if ($.fn.jcarousel) {
          $elements.each(function() {
            var maxWidth = getMaxWidth($(this).find('li').find('img'));
            if (maxWidth) {
              var ulWidth = 0;
              $(this).find('li').each(function () {
                $img = $(this).find('img');
                var imgWidth = $img.width();
                if (width) {
                  $(this).css('max-width', imgWidth);
                  ulWidth += imgWidth;
                }
                else {
                  $(this).css('max-width', maxWidth);
                  ulWidth += maxWidth;
                }
              });
              $(this).addClass('loaded').jcarousel({
                scroll: 1,
                itemFallbackDimension: maxWidth
              });
            }
            else {
              $(this).addClass('loaded').jcarousel({
                scroll: 1
              })
            }
            $parent = $(this).parents('.jcarousel-container');
            $parent.find('.jcarousel-prev').text(Drupal.t('Prev'));
            $parent.find('.jcarousel-next').text(Drupal.t('Next'));
            // Fix carousel width.
            if ($(this).width() < ulWidth) {
              $(this).width(ulWidth);
            }
          });
        }
      }
      function getMaxWidth($images) {
        var maxWidth = 0;
        $images.each(function () {
          width = $(this).width();
          maxWidth = (width > maxWidth) ? width : maxWidth;
        });
        return maxWidth;
      }
    }
  };

  Drupal.behaviors.invotraPanesTopContentWidget = {
    attach: function (context, settings) {
      $widget = $('.pane-top-rated-content');
      if ($widget.length) {
        var $items = $widget.find('.item-list');
        if ($items.length && $items.attr('class').indexOf('general') < 0) {
          $widget.each(function() {
            $rows = $('.views-row', $(this));
            if ($rows.length > 3) {
              $(this).once('apply-pager', function () {
                Drupal.invotraPanes.topWidgetPager($rows, 3);
              });
            }
          });
        }
      }
    }
  }

  Drupal.behaviors.invotraVideoLibrary = {
    attach: function (context, settings) {
      $libraryView = $('.view-gallery-library.view-display-id-panel_pane_1');
      $('.views-row', $libraryView).bind('click', function (e) {
        e.preventDefault();
        var href = $(this).find('a').attr('href');
        window.location.href = href;
      });
    }
  }
  
  Drupal.behaviors.invotraListEditLink = {
    attach: function (context, settings) {
      $('span.autocomplete-edit-link').each(function () {
        $that = $(this)
        $field = $(this).closest('.form-item').find('input.form-autocomplete');
        $field.bind('change blur', function () {
          var val = $(this).val();
          var matches = val.match(/.*\[nid:([\d]+)\]/);
          if (matches && typeof parseInt(matches[1]) == 'number') {
            link = '<a target="_blank" href="node/' + matches[1] + '/edit">' + Drupal.t('Edit list node') + '</a>';
            $that.html('[' + link + ']');
          } else {
            $that.html('');
          }
        })
      });
    }
  }

  Drupal.viewsSlideshowControlsText = Drupal.viewsSlideshowControlsText || {};

  /**
   * Implement the pause hook for text controls.
   */
  Drupal.viewsSlideshowControlsText.pause = function (options) {
    $('#views_slideshow_controls_text_pause_' + options.slideshowID).toggleClass('play');
  };

  /**
   * Implement the play hook for text controls.
   */
  Drupal.viewsSlideshowControlsText.play = function (options) {
    $('#views_slideshow_controls_text_pause_' + options.slideshowID).toggleClass('play');
  };

  /**
   * Pager for content top widget.
   */
  Drupal.invotraPanes.topWidgetPager = function($rows, items) {
    var j = 1,
        rLength = $rows.length,
        $fragments,
        $visibleFragment;
        
    var $next = $('<a>', {
      'href': '#',
      'text': '>',
      'class': 'next'
    });
    var $prev = $('<a>', {
      'href': '#',
      'text': '<',
      'class': 'prev'
    });
    var $pager = $('<div class="widget-pager" />').append($next).prepend($prev)
    if (rLength > items) {
      $rows.parent().prepend($pager);
      for(var i = 0; i < rLength; i+=items) {
        $rows.slice(i, i + items).wrapAll("<div class='fragment fragment-" + j + "'></div>");
        j++;
      }
      $fragments = $rows.parent('.fragment');
    }
    $visibleFragment = $fragments.parent().find('.fragment:visible');
    checkVisibles($visibleFragment)
    $('a', $pager).click(function (e) {
      if (!$(this).is('.disabled')) {
        $visibleFragment = $fragments.parent().find('.fragment:visible');
        if ($(this).is('.next')) {
          $visibleFragment.fadeOut('fast', function () {
            $(this).next().fadeIn('fast');
            checkVisibles($(this).next());
          });
        } else {
          $visibleFragment.fadeOut('fast', function () {
            $(this).prev().fadeIn('fast');
            checkVisibles($(this).prev());
          });
        }
      }
      e.preventDefault();
    });
    
    // Check if there exists next/prev fragments.
    function checkVisibles($elem, way) {
      $prev.removeClass('disabled');
      $next.removeClass('disabled');
      
      if (!$elem.prev('.fragment').length) {
        $prev.addClass('disabled');
      }
      if (!$elem.next('.fragment').length) {
        $next.addClass('disabled');
      }
    }
  };

  Drupal.behaviors.invotraSelectAllCT = {
    attach: function (context, settings) {
      var $contentTypes = $('#edit-type.form-checkboxes');
      $contentTypes.once('invotraSelectAllCT', function () {
        $that = $(this);
        var $checboxMarkup = $([
          '<div class="form-item form-type-checkbox form-item-select-all">',
            '<input type="checkbox" id="select-all" name="select-all" value="all" class="form-checkbox">',
            '<label style="font-weight: bold;" class="option" for="select-all">' + Drupal.t('Select all') + '</label>',
          '</div>'
        ].join(''));

        $that.prepend($checboxMarkup);
        var $selectAll = $('input#select-all', $contentTypes);
        $selectAll.once('select-all', function () {
          if ($.fn.uniform && $('.checker', $contentTypes).length) {
            $(this).uniform();
          }
          if (!$('input', $that).filter(':not(#select-all):not(:checked)').length) {
            $selectAll.attr('checked', true);
            $.uniform.update($selectAll);
          }
          $(this).bind('change', function (e) {
            if ($(this).is(':checked')) {
              $('input', $that).filter(':not(#select-all)').attr('checked', true).trigger('change');
            } else {
              $('input', $that).filter(':not(#select-all)').attr('checked', false).trigger('change');
            }
          });
          $('input', $that).filter(':not(#select-all)').change(function () {
            if (!$('input', $that).filter(':not(#select-all):not(:checked)').length) {
              $selectAll.attr('checked', true);
            } else {
              $selectAll.attr('checked', false);
            }
            $.uniform.update($selectAll);
          });

          // Add "select-all" checkbox binding with delay as it may be not rendered yet.
          setTimeout(function () {
            $('input#select-all', $contentTypes).once('select-all-theming', function () {
              $(this).bind('change', function () {
                var $widgetCheckboxes = $(this).closest('.form-checkboxes').find('.form-type-checkbox input[type="checkbox"]');
                $.uniform.update($widgetCheckboxes);
                var delay = ($.browser.msie && parseInt($.browser.version) <= 9) ? 300 : 0;
                setTimeout(function () {
                  $.uniform.update($widgetCheckboxes);
                }, delay)
              });
            })
          }, 300);

        });
      });
    }
  }

  Drupal.behaviors.invotraCollapsibleRefine = {
    attach: function(settings, context) {
      var $panes = $('.invotra-panes-collapsible-refine');
      $panes.each(function () {
        var $pane = $(this);
        var $search = $pane.find('input[type=text]');
        var $sort = $pane.find('select');
        if ($search.val() || $sort.val()) {
          $pane.removeClass('invotra-panes-collapsible-refine-collapsed');
        }
        $pane.once('invotra-panes-collapsible-refine', function() {
          var $header = $pane.find('.invotra-panes-collapsible-refine-header');
          $header.click(function(e) {
            $pane.toggleClass('invotra-panes-collapsible-refine-collapsed');
            e.preventDefault();
            if (!$pane.hasClass('invotra-panes-collapsible-refine-collapsed')) {
              $search.focus();
            }
          });
        });
      });
    }
  }

  /**
   * Change width and height of GS23 items.
   */
  Drupal.behaviors.invotraIconGrid = {
    attach: function(context, settings) {
      $('.general-style-23', context).once('invotraIconGrid', function() {
        var $content = $(this);
        var $rows = $(this).find('div.row');
        var $item = $content.find('li');
        var $fieldImg = $item.find('.views-field-field-image');
        var $fieldTitle = $item.find('.views-field-title a');
        var $img = $fieldImg.find('.field-image-background');
        var count = parseInt($content.attr('items-count'));
        var min_size = 80;
        var min_margin = 14;
        var min_font = 12;
        // Add IE8 fix.
        if ($.browser.msie  && parseInt($.browser.version, 10) === 8) {
          $fieldImg.addClass('ie8');
          $fieldImg.find('a').append('<span></span>');
        }
        // Get new width/margin/font size.
        var margin = $img.width() * 10 / min_size;
        margin = margin < min_margin ? min_margin : margin;
        var width = ($content.width() - 1 - margin * (count - 1)) / count;
        width = width <= min_size ? min_size : width;
        var font_size = width * min_font / min_size;
        // The font size should be min if min margin used.
        font_size = margin <= min_margin ? min_font : font_size;
        font_size = font_size > 20 ? 20 : font_size;

        // Check if the items are more than accommodated in area.
        if (width == min_size && $content.width() < (count-1) * min_margin + count * min_size) {
          // Define a new count.
          var new_count = Math.floor($content.width() / min_size);
          // Check with min margin.
          new_count = $content.width() < (new_count-1) * min_margin + new_count * min_size ? new_count - 1 : new_count;
          // Make sure that new count is positive.
          new_count = new_count < 1 ? 1 : new_count;

          // Rebuild the rows.
          // Remove class.
          $item.removeClass('first');
          $item.removeClass('last');
          // Move all el to the first row.
          for (var i = count; i < $item.length; i ++) {
            var $first_ul = $($rows[0]).find('ul');
            $($item[i]).appendTo($first_ul);
          }
          // Remove empty rows.
          for (var i = 1; i < $rows.length; i ++) {
            $($rows[i]).remove();
          }
          // Add class.
          for (var i = 0; i < $item.length; i += new_count) {
            $item.slice(i, i + 1).addClass('first');
            $item.slice(i + new_count - 1, i + new_count).addClass('last');
          }
          // Fix the img width (it might be more than min width).
          width = ($content.width() - 1 - min_margin * (new_count - 1)) / new_count;
          $fieldImg.css({'width' : width, 'height' : width});
          $item.css({'width' : width});
        }
        else {
          $item.css({'margin-right' : margin , 'margin-bottom' : margin , 'width' : width});
          $fieldImg.css({'width' : width, 'height' : width});
          $fieldTitle.css({'font-size' : font_size});
          $content.find('.last').css({'margin-right' : 0 });
        }
      });
    }
  };

})(jQuery);
