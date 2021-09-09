(function($, Drupal) {

  // Declare invotra and invotra.invotraToolbar objects in Drupal scope.
  Drupal.invotra = Drupal.invotra || {};
  Drupal.invotra.invotraBase = Drupal.invotra.invotraBase || {};

  /**
   * Accessible menu by arrows.
   *
   * @param $menu
   *   jQuery object for menu selector.
   * @param menuLvlOrientation
   *   Array of menu levels orientation. Example ['horizontal', 'vertical',
   *     'vertical'].
   * @param connectedLink
   *   Object with neighbor menu, should contain side of connection and jQuery
   *     selector of link. Example {'left': $('#invotra-profile-menu a:last')}
   */
  Drupal.invotra.invotraBase.accessibleMenu = function($menu, menuLvlOrientation, connectedLink) {
    var keyCodes = [37, 38, 39, 40, 13, 32, 27];
    var _this = this;

    _this.setMenuLvls = function ($menu, lvl) {
      var $currentMenuLevel = $menu.find('ul:first');
      var i = 0;
      $('> li', $currentMenuLevel).each(function () {
        if ($(this).hasClass('profile-menu-my-feed')) {
          return true;
        }
        if ($('a', $(this)).length) {
          var $this = $(this);
          var nextIndex = parseInt(lvl) + i;
          $('a:first', $this).addClass('inv-link-index-' + nextIndex);
          $('a.profile-avatar', $this).addClass('inv-link-index-' + (nextIndex + 1));
          if ($this.find('ul').length) {
            _this.setMenuLvls($this, nextIndex + '00');
          }
          i++;
        }
      });
    };
    var checkChildren = function ($currentLink) {
      return $currentLink.closest('li').find('ul').length;
    };
    var navigationArrows = {
      left: function (currentLvl) {
        return $('a.inv-link-index-' + (currentLvl - 1), $menu);
      },
      right: function (currentLvl) {
        return $('a.inv-link-index-' + (currentLvl + 1), $menu);
      },
      down: function ($currentLink, currentLvl) {
        if (!$currentLink.is('.open')) {
          $currentLink.trigger('click-submenu');
        }
        return $('a.inv-link-index-' + currentLvl + '00', $menu);
      },
      up: function ($currentLink) {
        return $currentLink.closest('ul').closest('li').find('a:first');
      },
      first: function ($currentLink) {
        var $next;
        var skipParent = $currentLink.parents('li').length > 1 ? $($currentLink.parents('li')[1]).hasClass('skip-parent') : false;

        if ($currentLink.parents('#invotra-profile-toolbar').length) {
          $next = $currentLink.parents('#invotra-profile-toolbar').find('a:first');
        }
        else if ($currentLink.parents('#menu-quick-links').length) {
          $next = $currentLink.parents('#menu-quick-links').find('a:first');
        }
        else {
          $next = $currentLink.closest('ul').prevAll('a').first();
        }
        if (!$next.length || skipParent) {
          // Fallback to fist item in current list.
          $next = $currentLink.closest('ul').find('li.first').find('a:first');
        }

        return $next;
      },
      last: function ($currentLink) {
        return $currentLink.closest('ul').find('li.last').find('a:last');
      }
    };
    $menu.once(function () {
      if ($menu.attr('id') === 'invotra-profile-menu') {
        $menu.find('> ul.menu').attr('role', 'menubar');
        $menu.find('li ul.menu').attr('role', 'menu');
        $menu.find('li').attr('role', 'presentation');
        $menu.find('li a').attr('role', 'menuitem');

        // Disable click on root elements.
        $menu.find('> ul.menu > li > a').bind('click', function (e) {
          e.preventDefault();
        })
      }
      $('li.expanded', $(this)).each(function () {
        $('a:first', $(this)).attr('aria-haspopup', 'true');
      });
      var openSubmenu = function(e) {
        var $this = $(e.target);
        if ($this.is('.focus:not(.open)') && $this.closest('li').is('.expanded')) {
          $('a.open', $menu).removeClass('open');
          if ($this.hasClass('profile-link')) {
            $('#invotra-profile-toolbar').toggleClass('open')
          }
          $this.trigger('focus').toggleClass('open');
          e.preventDefault();
        }
      };
      var closeSubmenu = function() {
        $('.active-submenu', $menu).each(function () {
          if (!$(this).find('a:focus').length) {
            $('#invotra-profile-toolbar').removeClass('open')
            $(this).removeClass('active-submenu').hide()
              .closest('li').find('.open, a:first').removeClass('open');
            $(this).closest('li').removeClass('delay-show');
          }
        });
      };
      $('a', $menu).bind({
        'click-submenu': function (e) {
          var $this = $(this);
          $this.addClass('focus');
          openSubmenu(e);
          $this.closest('li').find(' > *:last').addClass('active-submenu').show();
        },
        'blur': function () {
          $(this).closest('li').removeClass('focus');
          setTimeout(function () {
            closeSubmenu();
          }, 200);
        }
      });

      _this.setMenuLvls($menu, 100);

      $menu.bind('keydown', function (e) {
        if ($.inArray(e.keyCode, keyCodes) > -1 && $('a:focus', $menu).length) {
          var $currentLink = $('a:focus', $menu);
          var skipParent = $currentLink.closest('li').hasClass('skip-parent');

          if (!skipParent && $currentLink.parents('li').length) {
             skipParent = $($currentLink.parents('li')[1]).hasClass('skip-parent');
          }

          if (!$currentLink.attr('class').match(/inv-link-index-(\d+)/)) {
            return;
          }
          if (skipParent) {
            $menu.find('a:not(.focus)').addClass('click-dis');
          }

          var currentIndex = parseInt($currentLink.attr('class').match(/inv-link-index-(\d+)/)[1]),
              currentLvl = currentIndex.toString().length - 3;
          var $next = $();
          switch (e.keyCode) {
            // Space.
            case 32:
            // Enter.
            case 13:
              if (!$currentLink.is('.open') && $currentLink.closest('li').find('ul').length && !$currentLink.hasClass('profile-avatar')) {
                $currentLink.trigger('click-submenu');
                $currentLink.unbind('keyup');

                // After Space/Enter on parent item we need to focus first child item.
                // I.e. do the same as for Down button. See 'case 40:' section in code below.
                if (skipParent || currentLvl === 0) {
                  if (checkChildren($currentLink) && menuLvlOrientation[currentLvl] == 'horizontal') {
                    $next = navigationArrows.down($currentLink, currentIndex);
                  }
                  else if (currentLvl >= 1) {
                    $next = navigationArrows.right(currentIndex);
                    // If it is last item ($next is empty) then navigate to first item.
                    if (!$next.length) {
                      $next = navigationArrows.first($currentLink);
                    }
                  }
                }
                else {
                  if ($currentLink.parents('#block-system-main-menu').length || $currentLink.parents('#block-menu-menu-quick-links').length) {
                    window.location.href = $(this).attr('href');

                    return e.keyCode !== 32;
                  }
                  return false;
                }
              }
              else {
                // On space we trigger click, otherwise the page will scroll
                // down.
                $(e.target)[0].click();
                return e.keyCode !== 32;
              }
              break;

            // Escape.
            case 27:
              if (currentLvl >= 1) {
                if ($currentLink.parents('#invotra-profile-toolbar').length) {
                  $next = $currentLink.parents('#invotra-profile-toolbar').find('a:first');
                }
                else {
                  $next = $currentLink.closest('.active-submenu').siblings('a');
                }
              }
              break;

            // Left button.
            case 37:
              if (menuLvlOrientation[currentLvl] == 'horizontal') {
                $next = navigationArrows.left(currentIndex);
              }
              if (!$next.length && connectedLink && connectedLink['left'] && currentLvl == 0) {
                $next = connectedLink['left'];
              }
              else if (!$next.length) {
                // Do the same as for Up button.
                if (currentLvl >= 1) {
                  if (currentIndex.toString().slice(-1) == '0' && $currentLink.parent().is('.first')) {
                    if (skipParent) {
                      $next = navigationArrows.last($currentLink);
                    }
                    else {
                      $next = navigationArrows.up($currentLink);
                    }
                  }
                  else {
                    $next = navigationArrows.left(currentIndex);
                  }
                }
              }
              break;

            // Right button.
            case 39:
              if (menuLvlOrientation[currentLvl] == 'horizontal') {
                $next = navigationArrows.right(currentIndex);
              } else if (checkChildren($currentLink)) {
                $next = navigationArrows.down($currentLink, currentIndex);
              }
              if (!$next.length && connectedLink && connectedLink['right'] && currentLvl == 0) {
                $next = connectedLink['right'];
              }
              else if (!$next.length) {
                // Do the same as for Down button.
                if (checkChildren($currentLink) && menuLvlOrientation[currentLvl] == 'horizontal') {
                  $next = navigationArrows.down($currentLink, currentIndex);
                }
                else if (currentLvl >= 1) {
                  $next = navigationArrows.right(currentIndex);
                  // If it is last item ($next is empty) then navigate to first item.
                  if (!$next.length) {
                    $next = navigationArrows.first($currentLink);
                  }
                }
              }
              break;

            // Up button.
            case 38:
              if (currentLvl >= 1) {
                if (currentIndex.toString().slice(-1) == '0' && $currentLink.parent().is('.first')) {
                  if (skipParent || $currentLink.parents('#menu-quick-links').length) {
                   $next = navigationArrows.last($currentLink);
                  }
                  else {
                    $next = navigationArrows.up($currentLink);
                  }
                }
                else {
                  if ($currentLink.parents('#invotra-profile-toolbar').length && $currentLink.parent().is(':nth-child(2)')) {
                    $next = navigationArrows.up($currentLink);
                  }
                  else {
                    $next = navigationArrows.left(currentIndex);
                  }
                }
              }
              break;

            // Down button.
            case 40:
              if (checkChildren($currentLink) && menuLvlOrientation[currentLvl] == 'horizontal') {
                $next = navigationArrows.down($currentLink, currentIndex);
              }
              else if (currentLvl >= 1) {
                $next = navigationArrows.right(currentIndex);
                // If it is last item ($next is empty) then navigate to first item.
                if (!$next.length) {
                  $next = navigationArrows.first($currentLink);
                }
              }
              break;
          }

          if ($currentLink.hasClass('focus')) {
            $currentLink.removeClass('click-dis');
          }
          $currentLink.removeClass('focus').parent().removeClass('focus');
          if (!$next.length) {
            $next = $currentLink;
          }
          $next.addClass('focus').focus().parent().addClass('focus');
          closeSubmenu();
          e.preventDefault();
        }
      });
    });
  };
  Drupal.invotra.invotraBase.accessibleMenu.prototype.updateMenuLvls = function ($menu, lvl) {
    this.setMenuLvls($menu, lvl);
  };

  /**
   * Accessibility for General style 14.
   */
  Drupal.behaviors.invotraAccessibilityGeneral14 = {
    attach: function (context) {
      $(context).find('.general-styles.slideshow, .view-gallery-items').once('invotraAccessibilityGeneral14', function () {
        var $this = $(this);

        // Set proper tabindex.
        $this.find('.views-slideshow-controls-text-previous a')
          .text(Drupal.t('Previous article'))
          .attr('tabindex', 0);
        $this.find('.views-slideshow-controls-text-next a')
          .text(Drupal.t('Next article'))
          .attr('tabindex', 0);
        $this.find('.views_slideshow_slide .views-field-title a').attr('tabindex', 0);

        // Moves next button after slides to change focus order.
        $('<div class="views-slideshow-controls-text"> </div>')
          .append($this.find('.views-slideshow-controls-text-next'))
          .appendTo($this);

        // ARIA attributes for pause button.
        $this.find('.views-slideshow-controls-text-pause a')
          .text('')
          .attr('tabindex', -1)
          .attr('aria-hidden', true);

        // Remove clickable slide from focus.
        $this.find('.image-field a').attr('tabindex', -1);

        // Pause slider when focus comes into it with keyboard.
        var keyevent = false;
        $(document).bind('keydown', function () {
          keyevent = true;
        }).bind('keyup', function () {
          keyevent = false;
        });
        $this.bind('focusin', function () {
          if (keyevent) {
            $this.addClass('slideshow-focus');
            $this.find('.views-slideshow-cycle-main-frame').cycle('pause');
          }
        }).bind('focusout', function () {
          $this.removeClass('slideshow-focus');
          if (!$this.find('.views-slideshow-controls-text-pause').hasClass('play')) {
            $this.find('.views-slideshow-cycle-main-frame').cycle('resume');
          }
        });
      });
    }
  };

})(jQuery, Drupal);
