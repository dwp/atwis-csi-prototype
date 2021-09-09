
(function($) {
  Drupal.invotra = Drupal.invotra || {};
  Drupal.invotra.invotraBase = Drupal.invotra.invotraBase || {};
  var invotraBase = Drupal.invotra.invotraBase;

  /**
   * Fix issue with d3 donuts js conflict and add message of non-supported functionally.
   * NOTE: Anyway d3 doesn't work for IE8 and less.
   */
  if ($.browser.msie && parseInt($.browser.version) < 9 && Drupal.d3) {
    Drupal.d3.donutchart = function (select, settings) {
      $('#' + select).append("IE8 and less doesn't support D3 charts.")
    }
  }

  /**
   * Placeholder's fallback for lte IE9.
   */
  Drupal.behaviors.invotraPlaceholderInIE = {
    attach: function (context, settings) {
      if ($.browser.msie && parseInt($.browser.version) < 10) {
        $(context).find('.form-text[placeholder], textarea[placeholder]:not(.has-formats)').each(function () {
          if (!$(this).is('.input-tips-processed')) {
            var color = $(this).hasClass('error') ? '#ff0000' : '#656565';
            invotraBase.inputTips($(this), '', {'color': color}, true);
          }
        });
      }
    }
  }

  // Defer some behaviors for IE8 since they are very slow.
  if ($.browser.msie && parseInt($.browser.version) < 9) {
    var deferredBehaviors = {
      stack: [],
      scheduled: false,
      push: function(callback) {
        this.stack.push(callback);
      },
      run: function() {
        this.scheduled = false;
        var callback = this.stack.shift();
        if (typeof callback === 'undefined') {
          // No more callbacks in stack.
          return;
        }
        callback();
        // Next step.
        var self = this;
        self.scheduleRun(0);
      },
      scheduleRun: function (timeout) {
        var self = this;
        if (!self.scheduled) {
          setTimeout(function() {self.run()}, timeout);
          self.scheduled = true;
        }
      }
    };

    var behaviorsToDeffer = [
      'adminMenu',
      'adminMenuCollapseModules',
      'adminMenuCollapsePermissions',
      'adminMenuMarginTop'
    ];

    var name;
    for (var i = 0; i < behaviorsToDeffer.length; i++) {
      name = behaviorsToDeffer[i];
      if (Drupal.behaviors[name] && Drupal.behaviors[name].attach) {
        var oldAttach = Drupal.behaviors[name].attach;
        (function(oldAttach) {
          Drupal.behaviors[name].attach = function (context, settings) {
            deferredBehaviors.push(function () {
              oldAttach(context, settings)
            });
            deferredBehaviors.scheduleRun(100);
          }
        })(oldAttach);
      }
    }
  }

  // Avoid resizing Media Browser popup if window size didn't change.
  // Replace binding to $(window).resize() with invotraWindowResize event.
  if ($.browser.msie) {
    if (typeof Drupal.media != "undefined"
      && typeof Drupal.media.popups != "undefined"
      && typeof Drupal.media.popups.resizeDialog != "undefined") {
      Drupal.media.popups.resizeDialog = function (dialogElement) {
        $(window).bind('invotraWindowResize', function() {
          Drupal.media.popups.sizeDialog(dialogElement);
        });
      }
    }
  }

    Drupal.behaviors.invotraMediaBrowserIE8 = {
      attach: function () {
        if ($.browser.msie && parseInt($.browser.version) <= 9) {
          $('.page-media-browser').bind('click', function () {
            var $content = $(this).closest('.content'),
                $title = $(this).closest('.page-media-browser').find('media-tile');
              $('.form-wrapper.form-actions input', $content).each(function() {
                $(this).focus();
              $title
                .attr( "tabIndex", 0 )
                .focus()
                .removeAttr('tabIndex');
             });
           });
         }
       }
     }

  /**
   * Forces to repaint pseudo elements on disabled fields to show them.
   */
  Drupal.behaviors.invotraDisabledFieldsIEFix = {
    attach: function (context) {
      if ($.browser.msie && parseInt($.browser.version) <= 9) {
        $('.ui-tabs', context).once('invotraDisabledFieldsIEFix', function () {
          var $tabs = $(this);
          $('.tabs-navlist li a', this).click(function () {
            var $active = $tabs.find('.ui-tabs-panel:not(.ui-tabs-hide)');
            $active.find('.disabled').removeClass('disabled').addClass('disabled');
            $active.find('.form-disabled').removeClass('form-disabled').addClass('form-disabled');
          });
        });
      }
    }
  };

  /**
   * Fix appearing and disappearing homepage pictures.
   */
  Drupal.behaviors.invotraImageIE11Fix = {
    attach: function (context) {
      if (($.browser.msie && parseInt($.browser.version) <= 10
        || $.browser.mozilla && parseInt($.browser.version) == 11)
        && $('img').length) {
        // Set interval to run every second.
        var interval = setInterval(function(){ $('img:visible').hide().show(); }, 1000);
        // Stop it after 30 seconds.
        setTimeout(function() { clearInterval(interval); }, 30000);
      }
    }
  };

  /**
   * IE8 doesn't apply loaded css, so move it to HEAD after AJAX call.
   */
  if ($.browser.msie && parseInt($.browser.version) < 9) {
    Drupal.ajax.prototype.invotraIEReplacedSuccess = Drupal.ajax.prototype.success;
    Drupal.ajax.prototype.success = function (response, status) {
      this.invotraIEReplacedSuccess(response, status);

      var $styles;
      for (var i in response) {
        if (response.hasOwnProperty(i) && (typeof response[i].data !== 'undefined')) {
          $styles = $(response[i].data).find('link[type="text/css"]');
          if ($styles.length) {
            $styles.appendTo($('head'));
          }
        }
      }
    };
  }

  /**
   * Add 'with-remove-button' class to the field's div if it has a remove button.
   */
  Drupal.behaviors.addWithRemoveClass = {
    attach: function(context) {
      $('input.with-remove-button', context).parents('div.form-item').addClass('with-remove-button');
    }
  }

})(jQuery);
