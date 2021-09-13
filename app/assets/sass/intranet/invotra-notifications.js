(function ($) {
  /**
   * Invotra notifications stuff, for notifications popup.
   * Interval of notifications update - 10 seconds.
   */
  Drupal.invotra = Drupal.invotra || {};
  Drupal.invotra.invotraNotifications = function (settings) {
    var basePath = Drupal.settings.basePath,
        $toolbarNotification = $('#toolbar-notifications'),
        $notificationWrapper = $('.notifications-wrapper', $toolbarNotification),
        $notificationList = $('.notifications', $toolbarNotification),
        $notificationsLink = $('.notifications-link', $toolbarNotification),
        $notificationsContainer = $('<div />'),
        actualNotices = [],
        notificationsLog = [],
        notifications = {},
        isChrome = !!window.chrome,
        originalTitle = Drupal.invotra.invotraNotifications.originalTitle,
        apiVersion = (typeof Drupal.settings.invotra_api_client.version !== 'undefined')
          ? Drupal.settings.invotra_api_client.version
          : 0;


    // A little helper function do create a data url blob.
    function getDataUri(url, callback) {
        var image = new Image();

        //what happens if an image cannot be loaded?
        image.onload = function () {
            var canvas = document.createElement('canvas');
            canvas.width = this.naturalWidth; 
            canvas.height = this.naturalHeight; 

            canvas.getContext('2d').drawImage(this, 0, 0);

            //Data URI
            callback(canvas.toDataURL('image/png'));
        };

        image.src = url;
    }

    // Update page title with notification changes. (PX-27)
    function titleNotifications(data) {
      if (data && data.length) {
        var count = (data.length < 100) ? data.length : '+99';
        document.title = count > 0 ? "(" + count + ") " + originalTitle : originalTitle;
      }
    }

    // On page noptifications.
    function pageNotifications(data) {
      if (data && data.length) {
        var count = (data.length < 100) ? data.length : '+99';
        // Prepare notification message markup.
        var linkHtml = '<span aria-hidden="true" id="ntfclinkdescr" class="element-invisible">' + count + Drupal.t(" unread notifications.") + '</span>' +
                       '<span aria-hidden="true" class="count">' + count + '</span>' +
                       '<span class="element-invisible">' + Drupal.t("Notifications") + '</span>' +
                       '<span class="ico"></span>';
        $notificationsLink.html(linkHtml).attr('aria-describedby', 'ntfclinkdescr');
        for (var i = 0; i < data.length; i++) {
          var value = data[i];
          // Use custom moment.js locale for message date.
          moment.locale('en-short');
          var time = moment.unix(value.timestamp).fromNow(true);
          // Set back to show standard format for accessibility.
          moment.locale('en');
          var timeARIA = moment.unix(value.timestamp).fromNow();
          var messageHtml = '<img aria-hidden="true" src="' + value.image + '" />' +
                '<span class="text">' + value.message + '</span>' +
                '<span class="time" aria-label="' + timeARIA + '">' + time + '</span>',
              $message = $('<li>', {
                'role': 'presentation',
                'data-id': value.uuid,
                'html': $('<a>', {
                  'role': 'menuitem',
                  'html': messageHtml,
                  'href': basePath + 'notifications/' + value.uuid + '?token=' + Drupal.settings.invotra_api_client.token
                }).bind('blur', function () {
                  $(this).removeClass('focus').parent().removeClass('focus');
                })
              });

          if (!$('[data-id="' + value.uuid + '"]', $notificationList).length) {
            $notificationsContainer.append($message);
          }
          else {
            $('[data-id="' + value.uuid + '"] a', $notificationList).html(messageHtml);
          }
          actualNotices.push(value.uuid);
        }

        // Updated existing list and check for old notices.
        $('li', $notificationList).each(function () {
          var $this = $(this);
          var thisUUID = $this.attr('data-id');
          if ($.inArray(thisUUID, actualNotices) == -1) {
            $this.remove();
          }
        });

        // Add notices to list.
        $notificationWrapper.removeClass('no-notifications');
        $notificationList.prepend($notificationsContainer.contents());

        // Add first/last classes for theming.
        $notificationList.find('li').filter(':first').addClass('first');
        $notificationList.find('li').filter(':last').addClass('last');

        // Add notifications menu into the mobilebar.
        if ($notificationList.length) {
          var $count = $('.count', $toolbarNotification).clone();
          $('#toolbar-notifications.mobile .notifications-link').html($count);
          $('#toolbar-notifications.mobile .notifications').html($('.notifications', $toolbarNotification).html());
        }

        // Adds click event to clear all link.
        $('#toolbar-notifications div.clear a').bind('click.clearAll', function (e) {
          e.preventDefault();
          var $triggered = $(e.target),
              $wrapper = $triggered.closest('#toolbar-notifications');

          //is it safe to transmit the token like this? I guess over https it can be
          $.getJSON(basePath + 'notifications/clear-all?token=' + Drupal.settings.invotra_api_client.token, function (data) {
            if (!!data.result) {
              // Notifications cleared.
              $wrapper.find('.notifications-link').html('<span class="element-invisible">' + Drupal.t('0 unread notifications.') + '</span>');
              $wrapper.find('.notifications').empty();
              $notificationWrapper.addClass('no-notifications');
              $notificationList.html('<li><span>' + Drupal.t('No new notifications') + '</span></li>');

              if ($wrapper.closest('#mobile-bar').find('.mobile-n-back').length) {
                $wrapper.closest('#mobile-bar').find('.mobile-n-back').click();
              }
              else if ($wrapper.find('.notifications-link').hasClass('open')) {
                notificationListToggle($notificationsLink, $notificationWrapper);

                $notificationsLink
                  .removeClass('open')
                  .attr('aria-expanded', 'false')
                  .addClass('focus')
                  .focus();
              }
            } else if (!!data.redirect) {
              // Redirection.
              window.location.href = data.redirect;
            }
          });
        });
      }
      else {
        $notificationsLink.html('<span class="element-invisible">' + Drupal.t('0 unread notifications.') + '</span>');
        $notificationList.empty();
        $notificationWrapper.addClass('no-notifications');
        $notificationList.html('<li><span>' + Drupal.t('No new notifications') + '</span></li>');
      }
      $toolbarNotification.find('a:first').bind('keydown', function (e) {
        switch (e.keyCode) {
          case 13: // Enter.
          case 32: // Space.
          case 40: // Down arrow.
            e.preventDefault();
            if ($notificationList.is(':hidden')) {
              notificationListToggle($notificationsLink, $notificationWrapper);
            }

            var $firstLink = $($notificationWrapper.find('a:visible').get(0));
            if ($firstLink.length) {
              $(this).removeClass('focus');
              $firstLink.addClass('focus').focus();
            }
            return;

          case 39: // Right arrow.
            e.preventDefault();
            $(this).removeClass('focus');
            $toolbarNotification.next().find('a:first').addClass('focus').focus();
            hideNotifications();
            return;

          case 37: // Left arrow.
            e.preventDefault();
            $(this).removeClass('focus');
            $toolbarNotification.prev().find('a:first').addClass('focus').focus();
            hideNotifications();
            return;

        }
      });
      $notificationWrapper.find('li, .clear, .view-all-link').bind('keydown', function (e) {
        switch (e.keyCode) {
          case 37: // Left arrow.
          case 38: // Up arrow.
            e.preventDefault();
            $(this).find('a').removeClass('focus');

            // Handle clear all/view all buttons separately.
            if ($(this).hasClass('clear')) {
              $($notificationWrapper.find('a:visible').get(-1)).addClass('focus').focus();
            }
            else if ($(this).prev().length && !$(this).hasClass('view-all-link')) {
              $(this).prev().find('a').addClass('focus').focus();
            }
            else if ($(this).is('li:first')) {
              if ($notificationWrapper.find('.clear').length) {
                $($notificationWrapper.find('a:visible').get(0)).addClass('focus').focus();
              }
              else {
                $($notificationWrapper.find('a:visible').get(-1)).addClass('focus').focus();
              }
            }
            else if ($notificationWrapper.hasClass('no-notifications') && $(this).hasClass('view-all-link')) {
              $($notificationWrapper.find('a:visible').get(0)).addClass('focus').focus();
            }
            else {
              $($notificationList.find('li').get(-1)).find('a').addClass('focus').focus();
            }
            return;

          case 39: // Right arrow.
          case 40: // Down arrow.
            e.preventDefault();
            $(this).find('a').removeClass('focus');

            // Handle clear all/view all buttons separately.
            if ($(this).hasClass('view-all-link')) {
              $($notificationWrapper.find('a:visible').get(0)).addClass('focus').focus();
            }
            else if ($(this).next().length && !$(this).hasClass('clear')) {
              $(this).next().find('a').addClass('focus').focus();
            }
            else if ($(this).is('li:last')) {
              if ($notificationWrapper.find('.view-all-link').length) {
                $($notificationWrapper.find('a:visible').get(-1)).addClass('focus').focus();
              }
              else {
                $($notificationWrapper.find('a:visible').get(0)).addClass('focus').focus();
              }
            }
            else {
              $($notificationList.find('li').get(0)).find('a').addClass('focus').focus();
            }
            return;

          case 27: // Esc.
            e.preventDefault();
            $(this).find('a').removeClass('focus');
            $notificationsLink.addClass('focus').focus();
            hideNotifications();
            break;

          case 32: // Space.
            e.preventDefault();
            if ($(this).find('a').length) {
              window.location.href = $(this).find('a').attr('href');
            }
            break;

          case 9: // Tab.
            e.preventDefault();
            $(this).find('a').removeClass('focus');
            hideNotifications();
            if (e.shiftKey) { // Shift+Tab
              $toolbarNotification.prev().find('a:first').focus();
              return;
            }
            $toolbarNotification.next().find('a:first').focus();
            break;
        }
      });

    }
    hideNotifications = function () {
      $notificationsLink.removeClass('open');
      $notificationsLink.attr('aria-expanded', 'false');
      $notificationWrapper.hide();
    };

    notificationListToggle = function($notificationsLink, $notificationList) {
      $notificationList.slideToggle(100, function () {
        var status = $(this).is(':hidden');
        if (!status) {
          $notificationsLink.addClass('open');
        }
        else {
          $notificationsLink.removeClass('open');
        }
        $notificationsLink.attr('aria-expanded', !status);
      });
    };

    // Desktop notifications (PX-59)
    function desktopNotifications(data) {
      
      //a helper triggering notifications
      function notify( title, options, onclick, onclose ){
        var n;

        // Check if we have permission for notification, ask if not
        if (window.Notification && Notification.permission !== "granted") {
          
          //browsers supporting notifications support promises
          Notification.requestPermission().then(function(status) {  
            if (Notification.permission !== status) {
              Notification.permission = status;
            }          
            console.log(status); 
          });
        }

        // The user agreed to get notified
        if (window.Notification && Notification.permission === "granted") {
          n = new Notification( title, options );
          //@todo: possibly add the rest
          n.onclick = function (event) {
            event.preventDefault();
            onclick();
          };

          setTimeout(function () {
            onclose();
          }, 2000);
        }

        // If the user hasn't told if he wants to be notified or not
        // Note: because of Chrome, we are not sure the permission property
        // is set, therefore it's unsafe to check for the "default" value.
        else if (window.Notification && Notification.permission !== "denied") {
          Notification.requestPermission(function (status) {
            if (status === "granted") {              
              n = new Notification( title, options );
              //@todo: possibly add the rest
              n.onclick = function (event) {
                event.preventDefault();
                onclick();
              };

              setTimeout(function () {
                onclose();
              }, 2000);
            }
            //else denied 
          });
        }
        //else denied
        return n;
      }

      if( console ) { console.log(settings.desktopNotifications); }
      //check for Chrome browser then that data is present
      if (
        ( isChrome || !settings.justChromeNotifications ) 
       && !!settings.desktopNotifications  
       && data 
       && data.length
       ) {
        var count = data.length - 1,
            value = data[0],
            title = $('meta[itemprop=name]').attr("content"),
            //shape the message with the correct plurals format and language, if count === 0, then the extra message_count is empty
            message_count = count
                          ? "\n" + Drupal.formatPlural(count, "and one more notification", "and @count more notifications")
                          : "",
            options  = {
              body : $('<div>').html(value.message).text() + message_count,
              tag  : value.uuid,
              icon : value.image,
              timestamp: value.timestamp
            };
            //get timestamp of last notification shown for user so we won't show duplicate notifications.
            var localStorage = window.localStorage || false;
            var lastNotificationTimestamp = localStorage ? localStorage.getItem("last_notification_timestamp") : 0;
            //trigger notification
            if (options.timestamp > lastNotificationTimestamp) {
              if (localStorage) {
                localStorage.setItem('last_notification_timestamp', options.timestamp);
              }
              notification = notify( title, options,
                function(event) {
                  notification.close();
                  $.getJSON(basePath
                    + 'notifications/read/'
                    + options.tag
                    + '?token='
                    + Drupal.settings.invotra_api_client.token
                    , function (data) { }
                  );
                  window.open(value.link, '_blank');
                },
                function(event) {

                });
            }

      }
    }

    // Get notifications data via AJAX requests.
    var processNotifications = function (data) {
      pageNotifications(data);
      if( !!settings.tabNotifications ) {
        titleNotifications(data);
      }
      if (!!settings.desktopNotifications) {
        desktopNotifications(data);
      }
    };

    if (apiVersion > 0) {
      $.getJSON(basePath + 'api/' + apiVersion + '/notifications?limit=100', function(data) {
        processNotifications(data.results);
      });
    }
    else {
      $.getJSON(basePath + 'api/notifications', function(data) {
        processNotifications(data);
      });
    }
  };

  Drupal.invotra.invotraNotifications.originalTitle = Drupal.invotra.invotraNotifications.originalTitle || document.title;

  Drupal.behaviors.invotraNotifications = {
    attach: function (context, settings) {
      $('#toolbar-notifications .notifications-link').once('invotraNotifications', function () {
        // Moment.js settings.
        if (moment) {
          moment.defineLocale('en-short', {parentLocale: 'en'});
          moment.updateLocale('en-short', {
            relativeTime: {
              future: "in %s",
              past: "%s ago",
              s: "%ds",
              m: "1m",
              mm: "%dm",
              h: "1h",
              hh: "%dh",
              d: "1d",
              dd: "%dd",
              M: "1mo",
              MM: "%dmo",
              y: "1y",
              yy: "%dy"
            }
          });
        }

        var $notificationsLink = $(this),
            $toolbarNotification = $('#toolbar-notifications');

        var $mobailNotifications = $('#toolbar-notifications.mobile').html($toolbarNotification.html()),
            $mobileLink = $('#toolbar-notifications.mobile .notifications-link');
            $mobileNotificationHeader = $([
              '<div id="mobile-notification-header">',
                '<a href="#" class="mobile-n-back"></a>',
                '<h2>' + Drupal.t('Notifications') + '</h2>',
              '</div>'
            ].join(''));
            $mobailNotifications.before($mobileNotificationHeader);

        $mobileLink.bind('keydown', function(e) {
          switch (e.keyCode) {
            case 32: // Space.
              e.preventDefault();
              $(this).click();
              break;
          }
        });

        showNotifications($notificationsLink);
        showNotifications($mobileLink);

        function showNotifications($notificationsLink) {
          $notificationsLink.once().bind('click click-submenu', function (e) {
            var $notificationList = $notificationsLink.parent().find('ul.notifications'),
                $notificationWrapper = $notificationsLink.parent().find('div.notifications-wrapper'),
                $count = $('.count', $notificationsLink);

            e.preventDefault();

            if ($count.length < 1) {
              $notificationWrapper.addClass('no-notifications');
              $notificationList.html('<li><span>' + Drupal.t('No new notifications') + '</span></li>');
            }
            else {
              $notificationWrapper.removeClass('no-notifications');
            }

            notificationListToggle($notificationsLink, $notificationWrapper);
            if ($notificationsLink.closest('.mobile')) {
              $notificationsLink
                .closest('#mobile-bar')
                .find('#mobile-notification-header')
                .show()
                .find('.mobile-n-back')
                .once('mobile-n-back', function () {
                  $(this).bind('click', function(event) {
                    event.preventDefault();
                    $(this).closest('#mobile-notification-header').hide();
                    notificationListToggle($notificationsLink, $notificationWrapper);
                  });
                  $(this).bind('keydown', function(e) {
                    switch (e.keyCode) {
                      case 32: // Space.
                        e.preventDefault();
                        $(this).click();
                        break;
                    }
                  });
                })

            }
          });
        }

        $(document).bind({
          'click': function (e) {
            if (!$(e.target).closest('#toolbar-notifications').length) {
              hideNotifications();
            }
          },
          'keyup': function (e) {
            if (e.keyCode == 27) {
              hideNotifications();
            }
          }
        });

        Drupal.invotra.invotraNotifications(settings);
        setInterval(function () {
          Drupal.invotra.invotraNotifications(settings);
        }, settings.invotraNotificationsInterval);
      });
    }
  }
})(jQuery);
