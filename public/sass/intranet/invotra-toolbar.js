/**
 * Provides invotra toolbar menu js functionality.
 */

(function ($) {

  // Constants.
  var INVOTRA_SEARCH_WIDTH = 434;
  var INVOTRA_SEARCH_MARGIN = 15;

  // Declare invotra and invotra.invotraToolbar objects in Drupal scope.
  Drupal.invotra = Drupal.invotra || {},
  Drupal.invotra.invotraToolbar = {};
  var invotraToolbar = Drupal.invotra.invotraToolbar;

  /**
   * Attaches the invotraToolbar behavior.
   */
  Drupal.behaviors.invotraToolbar = {
    attach: function (context) {
      $('#invotra-toolbar', context).once('toolbar', function () {
        // "Hook" for responsive menus.
        Drupal.invotra.invotraToolbar.generateMobileMenu();

        // Letting other implementation know that toolbar is ready.
        $(window).trigger('invotraToolbarProcessed');

        // Skip links.
        $('#toolbar-skip-links a', context).bind('click', function (e) {
          e.preventDefault();
          var $that = $(this);
          var toolbaHeight = $('#region-page-top', context).height();
          var hash = $that.attr('href');
          var top = $(hash).offset().top - toolbaHeight;
          $('html, body').animate({
            scrollTop: top
          }, 200, function () {
            $(hash).attr('tabindex', '-1');
            $(hash).focus();
          });
        });
      });
    }
  };

  /**
   * Attaches the invotraToolbarLoginBox behavior.
   */
  Drupal.behaviors.invotraToolbarLoginBox = {
    attach: function (context, settings) {
      // Stuff for login box.
      var loginBoxSelector = 'form[id*="invotra-toolbar-login-form"]';
      var $loginForm = $(loginBoxSelector, context);

      if (!$loginForm.length && $(context).is('form')) {
        $loginForm = $(context).parent().find(loginBoxSelector);
      }
      // Initial LoginBox stuff.
      $loginForm.once('login-box', function () {
        // Apply input tips.
        $('label', $loginForm).each(function () {
          $(this).prepend('<span class="element-invisible">' + Drupal.t('Enter') + '</span>');
        });
        inputTips($('.form-text', $loginForm));

        // Submit login form on 'enter' keypress.
        $loginForm.find('input').keydown(function (e) {
          if (e.keyCode == 13) {
            var $submit = $(this).closest('form').find('.form-submit'),
                id = $submit.attr('id');
            if (typeof settings.ajax[id] !== 'undefined') {
              $submit.trigger(settings.ajax[id].event);
            }
            else {
              $submit.mousedown();
            }
          }
        });

        // Hide login box on document click.
        $(document).click(function (e) {
          if (!$(e.target).is('#invotra-login-link') && !$(e.target).closest(loginBoxSelector).length) {
            $loginForm.slideUp(300);
            $loginLink.attr('aria-expanded', 'false');
          }
        });
      });

      // LoginBox validation errors and interactions.
      if (settings.invotraToolbar && $(context).closest(loginBoxSelector).length) {
        if ($.cookie) {
          $.cookie('invotra-branding-section', false);
        }
        $('.error', $loginForm).removeClass('error');
        $('#invotra-login-error', $loginForm).empty();
        var toolbarSettigns = settings.invotraToolbar;
        if (toolbarSettigns.errors) {
          $.each(toolbarSettigns.errors, function (k, v) {
            $('input[name="' + k + '"]', $loginForm).addClass('error').parent().addClass('error');
            $('#invotra-login-error', $loginForm).append('<div>' + v + '</div>');
          });
          $('.form-submit', $loginForm).addClass('effects');
          setTimeout(function () {
            $('.form-submit', $loginForm).removeClass('effects');
          }, 1000);
        }
        else if (toolbarSettigns.ajaxlogin_redirect) {
          $loginForm.slideUp(300);
          window.location.href = toolbarSettigns.ajaxlogin_redirect;
        }
        else if (toolbarSettigns.ajaxlogin_reload) {
          $loginForm.slideUp(300);
          window.location.reload();
        }
      }

      // Toggle login box.
      var loginOpenning = false;
      var $loginLink = $('.region-page-top #invotra-login-link.invotra-login-link-popup', context);
      $loginLink.once('login-link', function () {
        $(this).bind('click', function (e) {
          if (!loginOpenning) {
            loginOpenning = true;
            setTimeout(function () {
              loginOpenning = false;
            }, 600);
            try {
              var formPresents = settings.invotraToolbar.loginFormReplace;
              if (formPresents) {
                $loginForm = $('form[id*="invotra-toolbar-login-form"]');
                $loginForm.slideToggle(600, function () {
                  $loginLink.attr('aria-expanded', $loginForm.is(':visible'));
                });
              }
            }
            catch (e) {
              if (!$(this).is('.form-processed')) {
                $(this).addClass('form-processed');
                var ajax = new Drupal.ajax(false, '', {url: settings.basePath + 'invotra_toolbar/user_login_form'});
                ajax.eventResponse(ajax, {});
                $(this).attr('aria-expanded', 'true');
                return false;
              }
            }
          }
          e.preventDefault();
        });
      });
    }
  };

  /**
   * Invotra toolbar menu dropdown behavior.
   */
  Drupal.behaviors.invotraToolbarMenu = {
    attach: function (context, settings) {
      $('#invotra-toolbar', context).once('toolbar-menu', function () {
        var $no_active = $('#invotra-profile-menu .no-active > .active');
        $no_active.each(function () {
          $(this).removeClass('active');
        });

        // Hide parent profile menu links with empty nested list as they aren't
        // clickable and became useless.
        $('> .menu > li', $('#invotra-profile-menu')).each(function () {
          var $parentLink = $(this);
          if (!$('> .menu > li', $parentLink).length) {
            $parentLink.remove();
          }
        });

        var $menu = $('> .menu', $('#invotra-profile-menu, #invotra-toolbar-menu'));
        $('#skip-link').remove();
        setTimeout(function () {
          var prevMenu = false,
            activeRow,
            menuTimeout = 0,
            exit = false,
            intentTimeout = 0,
            toolbarFocusTimeout;

          $(document).bind('click', function (e) {
            if (!$(e.target).closest('#invotra-profile-menu, #invotra-toolbar-menu').length) {
              $menu.trigger('mouseleave');
            }
          });
          $menu.once('invotra-toolbar-menu', function () {
            $('> li > a', $(this)).bind({
              'focus': function () {
                clearTimeout(toolbarFocusTimeout);
                $('a.open', $menu).removeClass('open');
                $('a[aria-expanded="true"]', $menu).attr('aria-expanded', 'false');
                $menu.trigger('mouseleave');
              },
              'blur': function () {
                $(this).removeClass('focus');
              }
            });
            $(this).menuAim({
              tolerance: 0,
              submenuDirection: 'below',
              exitMenu: function (menu) {
                clearTimeout(intentTimeout);
                if (!exit) {
                  menuTimeout = setTimeout(function () {
                    $('> ul', $(activeRow)).hide();
                    exit = true;
                    $(menu).trigger('mouseleave');
                  }, 300)
                }
                else {
                  prevMenu = false;
                }
                return exit;
              },
              activate: function (row) {
                clearTimeout(menuTimeout);
                activeRow = row;
                if ($(row).closest('#invotra-toolbar-menu').length && !prevMenu) {
                  intentTimeout = setTimeout(function () {
                    $('> ul', $(row)).show();
                  },100);
                }
                else {
                  $('> ul', $(row)).show();
                }
              },
              deactivate: function (row) {
                $('> ul', $(row)).hide();
              },
              enter: function (row) {
                clearTimeout(intentTimeout);
              }
            }).mouseenter(function (e) {
              $('a', $(this)).removeClass('open');
              if (prevMenu && prevMenu !== this) {
                exit = true;
                $(prevMenu).trigger('mouseleave');
              }
              else {
                exit = false;
              }
              prevMenu = this;
              clearTimeout(menuTimeout);
            });
            var $profMenu = $('#invotra-profile-toolbar');
            var toolbarMenuDelay;
            $profMenu.once('menu-delay', function () {
              $profMenu.hover(function () {
                clearTimeout(toolbarMenuDelay);
                $profMenu.addClass('open')
              }, function () {
                toolbarMenuDelay = setTimeout(function () {
                  $profMenu.removeClass('open');
                }, 300)
              });
            });
          });

        }, 100);
        $(window).bind('invotraWindowResize load', function () {
          // Productivity fallback.
          (function ($this) {
            if (!$this.length) {
              return;
            }
            var maxW = $(window).width() - $this.offset().left,
                minW = maxW - 5;
            var cssClass = '';
            if (maxW < 968) {
              cssClass = 'cols-2';
            }
            else {
              minW = 968;
            }
            var $subMenu = $('>ul', $this);
            $subMenu.addClass(cssClass).css({
              'max-width': maxW,
              'min-width': minW
            });
          })($('li.productivity:not(.children-icons)', $menu));

          // Create content fallback.
          (function ($this) {
            if (!$this.length || $this.find('li').length < 5) {
              return;
            }
            var maxW = $(window).width() - ($this.parent().closest('li').offset().left + 320);
            $('> ul', $this).addClass('cols-2').css('max-width', maxW);
          })($('li.create-content', $menu));
        });

        // Toolbar accessible menu.
        if (Drupal.invotra.invotraBase && Drupal.invotra.invotraBase.accessibleMenu) {
          // Accessibility for logo.
          Drupal.invotra.invotraBase.accessibleMenu($('.toolbar-logo'), ['horizontal'], {'right': $('#invotra-profile-menu > ul > li.first > a')});
          var $profileMenuRightLink = $('#invotra-profile-toolbar .profile-avatar'),
            $profileToolbarLeftLink = $('#invotra-profile-menu > ul > li.last > a');
          // Check if notifications exists.
          if ($('#toolbar-notifications').length) {
            $profileToolbarLeftLink = $profileMenuRightLink = $('#toolbar-notifications .notifications-link');
          }
          // Accessibility for profile menu.
          Drupal.invotra.invotraBase.accessibleMenu($('#invotra-profile-menu'), ['horizontal', 'vertical', 'vertical'], {
            'left': $('.toolbar-logo a'),
            'right': $profileMenuRightLink
          });
          // Accessibility for profile toolbar.
          Drupal.invotra.invotraBase.accessibleMenu($('#invotra-profile-toolbar'), ['horizontal', 'vertical'], {'left': $profileToolbarLeftLink});
          // Accessibility for Useful links menu.
          Drupal.invotra.invotraBase.accessibleMenu($('#block-menu-menu-quick-links'), ['horizontal', 'vertical'], {'left': $profileToolbarLeftLink});
        }
      });
    }
  };

  /**
   * Invotra toolbar ipe button behavior.
   */
  Drupal.behaviors.invotraIpeToggle = {
    attach: function (context, settings) {
      var $ipeContainer = $('#panels-ipe-control-container', context);
      var $toolbar = $('#invotra-toolbar');
      $ipeContainer.once('invotra-ipe', function () {
        if ($toolbar.length) {
          var $ipeLinksContainer = $('<div id="ipe-links" />').hide()
            .append($('<a />', {
              'href': '#',
              'id': 'ipe-toolbar-edit',
              'text': Drupal.t('Customise page')
            }))
            .append($('<a />', {
              'href': '#',
              'id': 'ipe-toolbar-layout',
              'text': Drupal.t('Change layout')
            })).append($('<a />', {
              'href': '#',
              'id': 'ipe-toolbar-cancel',
              'text': Drupal.t('Cancel'),
              'click': function (e) {
                $ipeLinksContainer.fadeOut();
              }
            }));

          $toolbar.append($ipeLinksContainer);
          Drupal.behaviors.invotraToolbarMenu.attach();
          $('body').addClass('toolbar-ipe').removeClass('panels-ipe');
          $('#ipe-links a').click(function (e) {
            e.preventDefault();
            $ipeLinksContainer.fadeOut();
            switch ($(this).attr('id')) {
              case 'ipe-toolbar-edit':
                $('a#panels-ipe-customize-page').click();
                break;

              case 'ipe-toolbar-layout':
                $('a.panels-ipe-change-layout').click();

                $(document).one('ajaxComplete', function () {
                  setTimeout(function () {
                    $(window).trigger('invotraWindowResize');
                  }, 400);
                });
                break;
            }
          });

          $('#ipe-link').once().click(function () {
            $('#ipe-links').fadeToggle();
          });

          $(document).ajaxComplete(function (event, XMLHttpRequest, ajaxOptions) {
            var $controlForm = $('#panels-ipe-control-container #panels-ipe-edit-control-form');
            $controlForm.once('control-form-clone', function () {
              if ($controlForm.length && $('#invotra-toolbar #ipe-links').length) {
                $controlForm.clone().appendTo($toolbar);
                $('#panels-ipe-edit-control-form .form-submit', $toolbar).bind('click', function (e) {
                  e.preventDefault();
                  var buttonId = $(this).attr('id');
                  $('#' + buttonId, $controlForm).click();
                });
              }
            });
          });
        }
      });
      if ($(context).closest('#panels-ipe-edit-control-form').length && $('.panels-ipe-form-container').is(':empty')) {
        $toolbar.find('#panels-ipe-edit-control-form').remove();
      }
    }
  };

  // Declaration of input tips function.
  function inputTips($inp) {
    var inputTimeout;
    $inp.once(function () {
      $inp.parent().find('label').addClass('element-invisible').css('cursor','text')
      $inp.each(function () {
        var $this = $(this),
            $parent = $this.parent();
        setTimeout(function () {
          if ($this.val() == '') {
            $parent.find('label').removeClass('element-invisible');
          }
          else {
            $parent.find('label').addClass('element-invisible');
          }
        }, 500);
        $this.bind('change', function () {
          if ($(this).val() == '') {
            $parent.find('label').removeClass('element-invisible');
          }
        });
        $(this).bind('focus', function () {
          clearTimeout(inputTimeout);
          $(this).parent().find('label').addClass('element-invisible');
        });
        $parent.find('label').click(function () {
          $(this).addClass('element-invisible');
          $(this).next().focus();
        });
        $this.bind('blur', function () {
          if ($(this).val() == '') {
            $(this).parent().find('label').removeClass('element-invisible');
          }
        });
      });
      // Trick for auto filling fields.
      $inp.bind('change blur input', function (e) {
        var id = '#' + $(this).attr('id');
        inputTimeout = setTimeout(function () {
          $inp.filter(':not(' + id + ')').each(function () {
            var focused = false;
            try {
              focused = $(this).is(':focus');
            }
            catch (error) {
              focused = $(this).is(document.activeElement);
            }
            if ($(this).val() !== '' || focused) {
              $(this).parent().find('label').addClass('element-invisible');
            }
            else {
              $(this).parent().find('label').removeClass('element-invisible');
            }
          });
        }, 100);
      });
    });
  }

  // Default invotra toolbar, can be overridden in theme.
  invotraToolbar.generateMobileMenu = function () {
    var $toolbar = $('#invotra-toolbar');
    var logo = '';
    var logoPath = Drupal.settings.invotraMobileLogo || Drupal.settings.invotraLogo || '';
    if (logoPath) {
      logo = '<span class="logo"><img src="' + logoPath + '" /></span>';
    }
    $toolbar.once('prepare-mobile-menu', function () {
      var $mobileMenuSkeleton = $([
        '<div id="mobile-bar">',
          '<div id="mobile-buttons">',
           '<a id="show-menu" href="#" aria-label="' + Drupal.t('menu') + '" role="button" />',
            logo,
            '<div class="mobile-bar-right">',
              $('body.logged-in').length ? '<a id="show-profile-menu" href="#" aria-label="' + Drupal.t('profile') + '" role="button" />' +
                '<div id="profile-mobile" role="navigation"><div class="profile-mobile-inner"></div>' +
                '<a href="#" class="menu-close" aria-label="' + Drupal.t('Back') + '" role="button"></a>' +
                '</div>'
                : '',
              $('#toolbar-notifications').length ? '<div id="toolbar-notifications" class="mobile" href="#" />' : '',
              '<a id="show-search" href="#" aria-label="' + Drupal.t('open search') + '" role="button" />',
            '</div>',
          '</div>',
          '<ul id="mobile-menus">',
            '<li id="main" class="open"><a href="#" class="main">' + Drupal.t('Navigation') + '</a></li>',
            '<li id="user"><a href="#" class="user">' + Drupal.t('Toolbar') + '</a></li>',
          '</ul>',
        '</div>'
      ].join(''));
      var $toolbarOverlay = $('<div>', {
        'id': 'toolbar-mobile-overlay',
        'css': {
          'min-height': $(document).height()
        }
      });
      if ($('#invotra-profile-menu', $(this)).length) {
        $('#user', $mobileMenuSkeleton).append($('#invotra-profile-menu', $(this)).html());
        $('#user li.last.expanded li.last', $mobileMenuSkeleton).removeClass('last');
        $('#user li.logout', $mobileMenuSkeleton).appendTo($('#user li.last.expanded .menu', $mobileMenuSkeleton))
      }
      else {
        $('#user', $mobileMenuSkeleton).html($('.login-box', $(this)).html());
      }
      if ($('#block-system-main-menu .pane-content').length) {
        $('#main', $mobileMenuSkeleton).append($('#block-system-main-menu .pane-content').html());
      }
      else {
        $('#main', $mobileMenuSkeleton).remove();
      }
      if ($('#invotra-profile-toolbar').length) {
        $('.profile-mobile-inner', $mobileMenuSkeleton).append($('#invotra-profile-toolbar').html());
        var swipeMargin = 0;
        $('#profile-mobile', $mobileMenuSkeleton).swipe({
          swipeStatus:function (event, phase, direction, distance , duration , fingerCount) {
            var $this = $(this);
            if (direction == 'left') {
              swipeMargin = -(distance);
              if ((phase === $.fn.swipe.phases.PHASE_END || phase === $.fn.swipe.phases.PHASE_CANCEL)) {
                swipeMargin = 0;
                if (distance >= 120) {
                  $this.animate({'margin-left': -($this.width())}, 200, function () {
                    $toolbarOverlay.removeAttr('class');
                    $this.hide().removeAttr('style');
                    $mobileMenuSkeleton.removeClass('show-profile-menu');
                  });
                  return;
                }
                $this.animate({'margin-left': 0}, 400)
              }
              else {
                $this.css({
                  'margin-left': swipeMargin
                });
              }
            }
            if (direction == 'right') {
              if ((phase === $.fn.swipe.phases.PHASE_END || phase === $.fn.swipe.phases.PHASE_CANCEL)) {
                swipeMargin = 0;
                $this.animate({'margin-left': 0}, 400)
              }
              else {
                swipeMargin += distance;
                $this.css({
                  'margin-left': (swipeMargin < 0) ? swipeMargin : 0
                });
              }
            }
            if (direction == 'up' || direction == 'down') {
              var scroll = $(window).scrollTop(),
                  scrollDiff = (direction == 'up') ? distance : -(distance);
              $(window).scrollTop(scroll + scrollDiff);
            }
          },
          threshold: 0
        })
      }
      $('li.expanded > a, li.parent > a', $mobileMenuSkeleton).append('<span class="arrow" />');
      // Move back button.
      var $moveBack = $('<li>', {
        'class': 'move-back',
        'html': $('<a>', {
          'href': '#',
          'text': Drupal.t('Menu')
        })
      }).append('<span class="title" />');
      // Function to activate menu changes.
      var moveSubmenu = function ($parent, side) {
        var $moveUl = $parent.closest('ul'),
            side = side || 'forward',
            leftSub = '-200%',
            leftParent = 0;

        switch (side) {
          case 'forward':
            $moveUl.addClass('move');
            var height = $parent.find('>ul').height();
            $('#mobile-menus').css('min-height', height);
            break;

          case 'back':
            $moveUl.removeClass('move');
            leftSub = 0;
            leftParent = '100%';
            break;
        }
        var updateBackTitle = function () {
          if (side == 'back') {
            $parent.removeClass('open');
          }
          var $currentParent = ($parent.is('.open')) ? $parent : $parent.closest('li.open'),
            currentTitle = $currentParent.find('> a').clone().children().remove().end().text(),
            prevTitle = $currentParent.parents('li.open').eq(0).find('> a').clone().children().remove().end().text(),
            $moveBack = $('.move-back', $parent.parents('li').last());
          $('.title', $moveBack).text(currentTitle);
          $('a', $moveBack).text(prevTitle);
        };
        if ($moveUl.parents('.move').length) {
          $moveUl.animate({'left': leftParent}, 600, updateBackTitle);
        }
        else {
          $moveUl.animate({'left': leftSub}, 600, updateBackTitle);
        }
        $toolbarOverlay.css('min-height', $(document).height());
      };
      $('li.expanded > ul, li.parent ul', $mobileMenuSkeleton).prepend($moveBack);
      $('#mobile-menus .move-back a', $mobileMenuSkeleton).click(function (e) {
        var $parent = $(this).closest('li.open');
        moveSubmenu($parent, 'back');
      });
      $('#mobile-menus span.arrow', $mobileMenuSkeleton).click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        var $parent = $(this).closest('li');
        var $siblings = $parent.siblings();
        $siblings.removeClass('open').find('li').removeClass('open');
        $parent.addClass('open');
        moveSubmenu($parent);
        var elementOffset = $parent.offset().top;
        var ScTop = $(window).scrollTop();
        if (ScTop > elementOffset) {
          $(window).scrollTop(elementOffset);
        }
      });
      $('.menu-close', $mobileMenuSkeleton).click(function (e) {
        e.preventDefault();
        var $profile = $('#profile-mobile', $mobileMenuSkeleton);
        $toolbarOverlay.removeClass('show');
        $profile.hide().removeAttr('style');
        $mobileMenuSkeleton.removeClass('show-profile-menu');
      });
      $('#mobile-menus > li > a', $mobileMenuSkeleton).click(function (e) {
        var $parent = $(this).closest('li'),
            id = $parent.attr('id');
        if ($(this).attr('id') != 'invotra-login-link') {
          e.preventDefault();
        }
        $toolbarOverlay.addClass('show');
        $('#mobile-menus > li', $mobileMenuSkeleton).not($parent).removeClass('open');
        $parent.addClass('open').siblings().removeClass('open');
      });
      $('#mobile-buttons a', $mobileMenuSkeleton).click(function (e) {
        var $this = $(this);
        if ($this.parents('#profile-mobile').length) {
          return;
        }
        if ($this.attr('id') != 'toolbar-notifications') {
          e.preventDefault();
        }
        var id = $(this).attr('id');
        var $menus = $('#mobile-menus', $mobileMenuSkeleton);
        $(this).toggleClass('open');
        $mobileMenuSkeleton.toggleClass(id);
        switch (id) {
          case 'show-menu':
            if ($(this).is('.open')) {
              $menus.css({
                'display': 'block',
                'left': '-100%'
              });
              $menus.animate({'left': '0'}, function () {
                $toolbarOverlay.addClass('show');
              });
            }
            else {
              $menus.animate({'left': '-100%'}, function () {
                $menus.hide();
                $toolbarOverlay.removeAttr('class');
              });
            }
            break;

          case 'show-search':
            $('#mobile-buttons', $mobileMenuSkeleton).hide();
            $('#block-invotra-search-and-do-search-lite, #search-block-toolbar', $mobileMenuSkeleton).show().find('.form-text').focus();
            $toolbarOverlay.removeClass('show');
            $('#profile-mobile', $mobileMenuSkeleton).hide();
            $mobileMenuSkeleton.removeClass('show-profile-menu');
            break;

          case 'show-profile-menu':
            if ($mobileMenuSkeleton.is('.show-profile-menu')) {
              $toolbarOverlay.addClass('show');
            }
            else {
              $toolbarOverlay.removeClass('show');
            }
            $('#profile-mobile', $mobileMenuSkeleton).toggle();
            $menus.hide();
            $toolbarOverlay.css('min-height', $(document).height());
        }
      });
      $('#mobile-buttons a', $mobileMenuSkeleton).bind('keydown', function (e) {
        switch (e.keyCode) {
          case 13: // Enter.
          case 32: // Space.
            e.preventDefault();
            $(this).click();
            if ($(this).hasClass('menu-close')) {
              $('#show-profile-menu', $mobileMenuSkeleton).focus().addClass('focus');
            }
            break;
        }
      });
      var $searchBar = $('#block-invotra-search-and-do-search-lite, #search-block-toolbar').first().clone();
      var $searchBarForm = $searchBar.find('form');
      $searchBar
        .addClass('clone')
        .append($('<a>', {
          'href': '#',
          'class': 'clear',
          'aria-label': Drupal.t('Clear search'),
          'role': 'button',
          'click': function () {
            $('.form-text', $searchBar).val('').focus();
          },
          'keydown': function (e) {
            switch (e.keyCode) {
              case 13: // Enter.
              case 32: // Space.
                e.preventDefault();
                $(this).click();
                break;
            }
          }
        }))
        .prepend($('<a>', {
          'href': '#',
          'class': 'hide',
          'aria-label': Drupal.t('Back'),
          'role': 'button',
          'click': function () {
            $('#mobile-buttons', $mobileMenuSkeleton).show();
            $('#block-invotra-search-and-do-search-lite, #search-block-toolbar', $mobileMenuSkeleton).hide();
            $('#show-search', $mobileMenuSkeleton).focus().addClass('focus');
          },
          'keydown': function (e) {
            switch (e.keyCode) {
              case 13: // Enter.
              case 32: // Space.
                e.preventDefault();
                $(this).click();
                break;
            }
          }
        }))
        .find('.form-text').attr('placeholder', Drupal.t('Enter search term'));
      $searchBarForm.attr('id', $searchBarForm.attr('id') + '-clone');
      $('#mobile-menus', $mobileMenuSkeleton).before($searchBar);
      $mobileMenuSkeleton.appendTo('#region-menu');
      $('body.html').append($toolbarOverlay);
      $('#mobile-menus > li', $mobileMenuSkeleton).each(function (i) {
        $(this).addClass('item-' + (i + 1));
      });
      if ($('#invotra-login-link', $mobileMenuSkeleton).length && $('#mobile-menus li', $mobileMenuSkeleton).length == 1) {
        $('#mobile-buttons', $mobileMenuSkeleton).remove();
        $('#mobile-menus', $mobileMenuSkeleton).show();
      }
      $(document).click(function (e) {
        if (!$(e.target).closest('#mobile-bar').length && !$(e.target).is('#mobile-bar') && $('#show-menu').is('.open')) {
          $('#show-menu').removeClass('open');
          $('#mobile-menus li li', $mobileMenuSkeleton).removeClass('open');
          $('ul', $mobileMenuSkeleton).removeClass('move').removeAttr('style');
          $toolbarOverlay.removeClass('show');
        }
      });

      // Apply targeted search stuff.
      if (Drupal.behaviors.invotraLPSearchFormDropdown) {
        $searchBarForm.removeClass('invotra-lp-search-processed');
        Drupal.behaviors.invotraLPSearchFormDropdown.attach();
      }
    });
  };

  /**
   * Fixed anchor links positions.
   */
  Drupal.behaviors.invotraBaseAnchorPosition = {
    attach: function (context, settings) {
      if ($(window).width() > 960) {
        $(window).load(function (event) {
          if (window.location.hash) {
            event.preventDefault();
            var hash = window.location.hash;
            var hashName = decodeURI(hash.substring(1, hash.length));
            var el;
            // If element has this id then scroll to it.
            if (hash != '#' && $(hash).length != 0) {
              el = $(hash);
            }
            // Catch cases of links that use anchor name.
            else if ($('a[name="' + hashName + '"]').length != 0) {
              // Just use the first one in case there are multiples.
              el = $('a[name="' + hashName + '"]:first');
            }

            // Detecting IE8.
            var isIE11 = !!navigator.userAgent.match(/Trident.*rv\:11\./);
            if (($.browser.msie && (parseInt($.browser.version)) <= 9) || isIE11) {
              $(window).bind('scroll.once', function () {
                scrollToAnchor(el, 1);
                $(window).unbind('scroll.once');
              });
            }
            else {
              scrollToAnchor(el, 1);
            }
          }
        });

        var currentUrl = location.hostname + location.pathname + location.search;
        $("a").once("anchor").each(function () {
          try {
            var parser = document.createElement("a");
            parser.href = $(this).attr("href");
            var hostname = !!parser.hostname ? parser.hostname : location.hostname;
            var pathname = !!parser.pathname ? "/" + parser.pathname.replace(/^\//g, '') : location.pathname;
            var linkUrl = hostname + pathname + parser.search;
            if (!(linkUrl == currentUrl && !!parser.hash)) {
              return true;
            }
            var ancName = decodeURI(parser.hash.substring(1, parser.hash.length));
          }
          catch (e) {
            // Log any errors and return false.
            console.error("exception in invotra anchor handling: " + e.message);
            return false;
          }
          $(this).bind('click', function (event) {
            if ($(this).hasClass('dont-scroll')) {
              return;
            }
            if (ancName.length > 0 && $('a[id="' + ancName + '"]').length != 0) {
              event.preventDefault();
              scrollToAnchor($('a[id="' + ancName + '"]:first'), 300);
            }
            else if (ancName.length > 0 && $('a[name="' + ancName + '"]').length != 0) {
              event.preventDefault();
              scrollToAnchor($('a[name="' + ancName + '"]:first'), 300);
            }
            else if (ancName === "tabs-group_update_and_poll-contentmain-1" || ancName === "tabs-group_update_and_poll-contentmain-2") {
              event.preventDefault();
            }
            else if (ancName.length > 0 && $('div[id="' + ancName + '"]').length !== 0 && $('div[id="' + ancName + '"]').is(':visible')) {
              event.preventDefault();
              scrollToAnchor($('div[id="' + ancName + '"]:first'), 300);
            }
            else if (ancName.length > 0 && $('form[id="' + ancName + '"]').length !== 0 && $('form[id="' + ancName + '"]').is(':visible')) {
              event.preventDefault();
              scrollToAnchor($('form[id="' + ancName + '"]:first'), 300);
            }
          });
        });
      }

      function scrollToAnchor($el, time) {
        if ($el != undefined && $el.length != 0) {
          setTimeout(function () {
            var $toolbar = $('#invotra-toolbar'),
                $toolbar_menu = $('#region-menu'),
                // Add little offset so that toolbar shadow does not obscure the
                // anchor.
                toolbarOffset = 5;

            // Admin menu.
            // Checking settings as admin menu might be not loaded yet.
            if ((typeof settings.admin_menu != 'undefined') && !!settings.admin_menu.position_fixed) {
              toolbarOffset += 21;
            }

            // Toolbar.
            if ($toolbar.length && ($toolbar.css('position') == 'fixed')) {
              toolbarOffset += $toolbar.height();
            }

            // Toolbar links.
            if ($toolbar_menu.length && ($toolbar_menu.css('position') == 'fixed')) {
              toolbarOffset += $toolbar_menu.height();
            }

            $('body, html').animate({ scrollTop: (parseInt($el.offset().top) - toolbarOffset) }, time, 'swing');
            $(document).unbind("scroll");
          }, 5);
          return false;
        }
      }
    }
  };

  /**
   * Clean header toolbar.
   */
  Drupal.behaviors.invotraBaseCleanHeader = {
    attach: function (context, settings) {
      $('.clean-header #invotra-toolbar', context).once('clean-header', function () {
        // Function for max-width set.
        var setSearchMaxWidth = function () {
          var windowWidth = $(window).width();
          if (windowWidth <= 960) {
            windowWidth = 960;
          }
          var componetsWidth = 0;
          setTimeout(function () {
            $('.toolbar-section-inner > div').each(function () {
              componetsWidth += $(this).outerWidth(true);
            });
            var searchMargin = Math.max(Math.ceil((windowWidth - componetsWidth - INVOTRA_SEARCH_WIDTH) / 2), INVOTRA_SEARCH_MARGIN),
                searchWidth = Math.min(windowWidth - componetsWidth - searchMargin * 2, INVOTRA_SEARCH_WIDTH);

            $('#search-block-toolbar').css('max-width', searchWidth);
            $('#search-block-toolbar').css('margin-left', searchMargin);
          }, 0);
        };
        // Initial call.
        setSearchMaxWidth();

        // Call on window resize.
        $(window).bind('load invotraWindowResize', setSearchMaxWidth)
      });
    }
  };

  /**
   * Context menu for entity actions.
   */
  Drupal.behaviors.invotraToolbarContextual = {
    attach: function (context, settings) {
      $('.options-contextual-menu', context).once('invotraToolbarContextual', function () {
        var listId = 'list-options-' + Math.random().toString(36).substring(7);
        var $originalTabs = $('.region-inner > .tabs ul'),
            $dropdown = $('<ul id="' + listId + '" class="actions-dropdown"> </ul>').html($originalTabs.clone().html()),
            $trigger = $(this),
            isMobile = window.invotraMobileAndTabletCheck();

        // Remove View link.
        $dropdown.find('li.active').remove();

        // If there's no actions available, skip all the stuff.
        if (!$dropdown.find('li').length) {
          $trigger.hide();
          return;
        }

        // Copies original tabs to new dropdown and places it.
        $trigger.after($dropdown);

        // Make sure ajax links work.
        $dropdown.find('.ajax-processed').removeClass('ajax-processed');
        Drupal.attachBehaviors($dropdown, settings);

        if (!isMobile) {
          // Shows it just to calculate all the stuff.
          $trigger.parent().addClass('opened');
          // Places dropdown right below Options button.
          var leftOffset = $trigger.offset().left - $trigger.parent().offset().left;
          $dropdown.css('left', leftOffset + 'px');
          // Checks if we ain't off the screen from the right.
          if (($dropdown.offset().left + $dropdown.width()) > $(window).width()) {
            // Moves it to left with 15px in advance to left some room from right.
            leftOffset -= ($dropdown.offset().left + $dropdown.width()) - $(window).width() + 10;
            $dropdown.css('left', leftOffset + 'px');
          }
          $trigger.parent().removeClass('opened');
        }
        else {
          // Align dropdown to right because it's mobile.
          $dropdown.css('right', 0);
        }

        // Binds events for desktop and mobile.
        if (isMobile) {
          $trigger.bind('click', function (e) {
            e.preventDefault();
            $trigger.parent().toggleClass('opened');
            $trigger.attr('aria-expanded', function(_, attr) { return !(attr == 'true') })
            if ($trigger.parent().hasClass('opened')) {
              $dropdown.attr('aria-hidden', 'false');
              $('body').bind('click.invotraContextualDropdown', function (event) {
                if (!$(event.target).closest('#entity-actions').length) {
                  $trigger.parent().removeClass('opened');
                  $('body').unbind('click.invotraContextualDropdown');
                }
              });
            }
            else {
              $dropdown.attr('aria-hidden', 'true');
            }
          });
        }
        else {
          var close;
          $trigger.bind('click', function (e) {
            e.preventDefault();
          });
          $trigger.bind('mouseenter', function () {
            $trigger.parent().addClass('opened');
            $trigger.attr('aria-expanded', 'true');
            $dropdown.attr('aria-hidden', 'false');
            clearTimeout(close);
          });
          $trigger.bind('mouseleave', function () {
            close = setTimeout(function() {
              $trigger.parent().removeClass('opened');
              $trigger.attr('aria-expanded', 'false');
              $dropdown.attr('aria-hidden', 'true');
            }, 100);
          });
          $dropdown.bind('mouseenter', function () {
            clearTimeout(close);
          });
          $dropdown.bind('mouseleave', function () {
            close = setTimeout(function() {
              $trigger.parent().removeClass('opened');
              $trigger.attr('aria-expanded', 'false');
              $dropdown.attr('aria-hidden', 'true');
            }, 100);
          });
        }

        // Accessibility stuff.
        $trigger.attr('role', 'button');
        $trigger.attr('aria-expanded', false);
        $trigger.attr('aria-haspopup', 'true');
        $trigger.attr('aria-controls', listId);
        $dropdown.attr('role', 'menu');
        $dropdown.attr('tabindex', -1);
        $('li', $dropdown).attr('role', 'presentation');
        $('li a', $dropdown).attr('role', 'menuitem');

        var enterKey = 13,
          spaceKey = 32,
          escKey = 27;
        $trigger
          .bind('keydown', function (e) {
            if ((e.which || e.keyCode) == enterKey || (e.which || e.keyCode) == spaceKey) {
              e.preventDefault();
            }
          })
          .bind('keyup', function (e) {
            if ((e.which || e.keyCode) == enterKey || (e.which || e.keyCode) == spaceKey) {
              e.preventDefault();
              $trigger.parent().addClass('opened');
              $trigger.attr('aria-expanded', 'true');
              $dropdown.attr('aria-hidden', 'false');
              $('li:first a', $dropdown).focus().addClass('focus').append('<span class="fcs-state" />');
              $dropdown.bind('keyup.invotraContextualDropdown', function (de) {
                if ((de.which || de.keyCode) == escKey) {
                  $trigger.parent().removeClass('opened');
                  $trigger.attr('aria-expanded', 'false');
                  $dropdown.attr('aria-hidden', 'true');
                  $trigger.focus();
                  $dropdown.unbind('keyup.invotraContextualDropdown');
                }
              });
            }
          });
      });
    }
  };

  /**
   * Process custom menu tabs.
   *
   * Custom tabs replaces Drupal's default menu tabs; however, the original
   * tabs may be still processed by Drupal.behaviors.invotraToolbarContextual.
   *
   * @see invotra_toolbar_tabs_add_menu_tab()
   */
  Drupal.behaviors.invotraToolbarCustomTabs = {
    attach: function (context, settings) {
      if (!settings.invotraToolbarTabs) {
        return;
      }
      var $context = $(context);
      var $div = $context
        .find('div.tabs');
      if (!$div.length && $context.find('#page-title').length) {
        $div = $('<div class="tabs clearfix"><ul class="tabs primary clearfix"></ul></div>');
        $div.insertAfter('#page-title');
      }
      $div.once('invotraToolbarCustomTabs', function () {
          var $tabs = $(this);
          $tabs.removeClass('hide-tabs');
          var $ul = $tabs.find('ul');
          $ul.empty();
          $.each(settings.invotraToolbarTabs, function (index, data) {
            var $li = $('<li></li>').html(data);
            if ($li.find('a.active').length) {
              $li.addClass('active');
            }
            $ul.append($li);
          })
        });
    }
  };

  /**
   * Assigning additional attributes and functionality to icon-view toolbar.
   */
  Drupal.behaviors.invotraToolbarIcons = {
    attach: function (context) {

      // Assing attributes for menu items with icon.
      $('#toolbar-section ul.menu > li[data-icon]', context).once('invotraToolbarIcons', function () {
        var $icon = $('<span class="toolbar-menu-icon"> </span>')
              .attr({
                'aria-hidden': 'true',
                'tabindex': '-1'
              });

        if ($.browser.msie && parseInt($.browser.version) <= 8) {
          $icon.css('filter', 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + $(this).attr('data-icon') + '",sizingMethod="scale")');
        }
        else {
          $icon.css('background-image', 'url(' + $(this).attr('data-icon') + ')');
        }

        $(this).find('> a').prepend($icon);
      });

      // Assing attributes for menu items with letter-icon.
      $('#toolbar-section li.children-icons > ul > li', context).once('invotraToolbarIcons', function () {
        var $icon = $('<span class="toolbar-menu-letter"> </span>')
              .attr({
                'aria-hidden': 'true',
                'tabindex': '-1'
              })
              .text($(this).find('> a').text().slice(0, 1));

        $(this).find('> a').prepend($icon);
      });

      // Assing equal height for submenu with icons.
      $('#toolbar-section li.children-icons > ul', context).once('invotraToolbarIconsHeight', function () {
        var $links = $(this).find('> li'),
            maxWidth = $(this).width(),
            $tempLinks = [],
            tempWidth = 0,
            maxHeight, i, j;

        $(this).css('display', 'block');
        for (i = 0; i < $links.length; i++) {
          tempWidth += $($links[i]).find('> a').outerWidth(true);

          if (tempWidth > maxWidth) {
            tempWidth = 0;
            maxHeight = 0;
            for (j = 0; j < $tempLinks.length; j++) {
              $tempLinks[j].css('height', '');
              if ($tempLinks[j].height() > maxHeight) {
                maxHeight = $tempLinks[j].height();
              }
            }
            for (j = 0; j < $tempLinks.length; j++) {
              $tempLinks[j].height(maxHeight);
            }
            $tempLinks = [];
          }
          else {
            $tempLinks.push($($links[i]).find('> a'));
          }
        }
        $(this).css('display', '');
      });
    }
  };

  /**
   * Set static width on root toolbar items, so it won't get bigger on hover.
   */
  Drupal.behaviors.invotraToolbarWidthFix = {
    attach: function (context) {
      $('#invotra-profile-menu > .menu > li', context).once('invotraToolbarWidthFix', function () {
        var $this = $(this),
            setLinkWidth = function () {
              $this.css('width', '');
              $this.css('width', $this.width());
            };

        $(window).bind('invotraWindowResize', setLinkWidth);
        setLinkWidth();
      });
    }
  };

})(jQuery);
