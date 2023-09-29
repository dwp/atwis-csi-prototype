/**
 * Replacement file for CTool's modal.js.
 *
 * The only changed function is modalContentResize(); there's no other way to
 * replace it since it's in the closure.
 *
 * Everything else is copy-pasted.
 */

(function($) {
  if (typeof Drupal !== "undefined"
    && typeof Drupal.CTools !== "undefined"
    && typeof Drupal.CTools.Modal !== "undefined") {

    /**
     * modalContent
     * @param content string to display in the content box
     * @param css obj of css attributes
     * @param animation (fadeIn, slideDown, show)
     * @param speed (valid animation speeds slow, medium, fast or # in ms)
     * @param modalClass class added to div#modalContent
     */
    Drupal.CTools.Modal.modalContent = function(content, css, animation, speed, modalClass) {
      // If our animation isn't set, make it just show/pop
      if (!animation) {
        animation = 'show';
      }
      else {
        // If our animation isn't "fadeIn" or "slideDown" then it always is show
        if (animation != 'fadeIn' && animation != 'slideDown') {
          animation = 'show';
        }
      }

      if (!speed) {
        speed = 'fast';
      }

      // Build our base attributes and allow them to be overriden
      css = jQuery.extend({
        position: 'absolute',
        left: '0px',
        margin: '0px',
        background: '#000',
        opacity: '.55'
      }, css);

      // Add opacity handling for IE.
      css.filter = 'alpha(opacity=' + (100 * css.opacity) + ')';
      content.hide();

      // If we already have modalContent, remove it.
      if ($('#modalBackdrop').length) $('#modalBackdrop').remove();
      if ($('#modalContent').length) $('#modalContent').remove();

      // position code lifted from http://www.quirksmode.org/viewport/compatibility.html
      if (self.pageYOffset) { // all except Explorer
        var wt = self.pageYOffset;
      } else if (document.documentElement && document.documentElement.scrollTop) { // Explorer 6 Strict
        var wt = document.documentElement.scrollTop;
      } else if (document.body) { // all other Explorers
        var wt = document.body.scrollTop;
      }

      // Get our dimensions

      // Get the docHeight and (ugly hack) add 50 pixels to make sure we dont have a *visible* border below our div
      var docHeight = $(document).height() + 50;
      var docWidth = $(document).width();
      var winHeight = $(window).height();
      var winWidth = $(window).width();
      if( docHeight < winHeight ) docHeight = winHeight;

      // Create our divs
      $('body').append('<div id="modalBackdrop" class="backdrop-' + modalClass + '" style="z-index: 1000; display: none;"></div><div id="modalContent" class="modal-' + modalClass + '" style="z-index: 1001; position: absolute;">' + $(content).html() + '</div>');

      // Get a list of the tabbable elements in the modal content.
      var getTabbableElements = function () {
        var tabbableElements = $('#modalContent :tabbable'),
          radioButtons = tabbableElements.filter('input[type="radio"]');

        // The list of tabbable elements from jQuery is *almost* right. The
        // exception is with groups of radio buttons. The list from jQuery will
        // include all radio buttons, when in fact, only the selected radio button
        // is tabbable, and if no radio buttons in a group are selected, then only
        // the first is tabbable.
        if (radioButtons.length > 0) {
          // First, build up an index of which groups have an item selected or not.
          var anySelected = {};
          radioButtons.each(function () {
            var name = this.name;

            if (typeof anySelected[name] === 'undefined') {
              anySelected[name] = radioButtons.filter('input[name="' + name + '"]:checked').length !== 0;
            }
          });

          // Next filter out the radio buttons that aren't really tabbable.
          var found = {};
          tabbableElements = tabbableElements.filter(function () {
            var keep = true;

            if (this.type == 'radio') {
              if (anySelected[this.name]) {
                // Only keep the selected one.
                keep = this.checked;
              }
              else {
                // Only keep the first one.
                if (found[this.name]) {
                  keep = false;
                }
                found[this.name] = true;
              }
            }

            return keep;
          });
        }

        return tabbableElements.get();
      };

      // Keyboard and focus event handler ensures only modal elements gain focus.
      modalEventHandler = function( event ) {
        target = null;
        if ( event ) { //Mozilla
          target = event.target;
        } else { //IE
          event = window.event;
          target = event.srcElement;
        }

        var parents = $(target).parents().get();
        for (var i = 0; i < parents.length; ++i) {
          var position = $(parents[i]).css('position');
          if (position == 'absolute' || position == 'fixed') {
            return true;
          }
          // Allow event for "My Workplace saved searches" widget.
          if ($(parents[i]).is('.pane-my-workspace-searches')) {
            return true;
          }
        }

        if ($(target).is('#modalContent, body') || $(target).filter('*:visible').parents('#modalContent').length) {
          // Allow the event only if target is a visible child node
          // of #modalContent.
          return true;
        }
        else {
          getTabbableElements()[0].focus();
        }

        event.preventDefault();
      };
      $('body').bind( 'focus', modalEventHandler );
      $('body').bind( 'keypress', modalEventHandler );

      // Keypress handler Ensures you can only TAB to elements within the modal.
      // Based on the psuedo-code from WAI-ARIA 1.0 Authoring Practices section
      // 3.3.1 "Trapping Focus".
      modalTabTrapHandler = function (evt) {
        // We only care about the TAB key.
        if (evt.which != 9) {
          return true;
        }

        var tabbableElements = getTabbableElements(),
          firstTabbableElement = tabbableElements[0],
          lastTabbableElement = tabbableElements[tabbableElements.length - 1],
          singleTabbableElement = firstTabbableElement == lastTabbableElement,
          node = evt.target;

        // If this is the first element and the user wants to go backwards, then
        // jump to the last element.
        if (node == firstTabbableElement && evt.shiftKey) {
          if (!singleTabbableElement) {
            lastTabbableElement.focus();
          }
          return false;
        }
        // If this is the last element and the user wants to go forwards, then
        // jump to the first element.
        else if (node == lastTabbableElement && !evt.shiftKey) {
          if (!singleTabbableElement) {
            firstTabbableElement.focus();
          }
          return false;
        }
        // If this element isn't in the dialog at all, then jump to the first
        // or last element to get the user into the game.
        else if ($.inArray(node, tabbableElements) == -1) {
            // Make sure the node isn't in another modal (ie. WYSIWYG modal).
            var parents = $(node).parents().get();
            for (var i = 0; i < parents.length; ++i) {
              var position = $(parents[i]).css('position');
              if (position == 'absolute' || position == 'fixed') {
                return true;
              }
              // Allow event for "My Workplace saved searches" widget.
              if ($(parents[i]).is('.pane-my-workspace-searches')) {
                return true;
              }
            }

            if (evt.shiftKey) {
              lastTabbableElement.focus();
            }
            else {
              firstTabbableElement.focus();
            }
          }
      };
      $('body').bind('keydown', modalTabTrapHandler);

      // Create our content div, get the dimensions, and hide it
      var modalContent = $('#modalContent').css('top','-1000px');
      var mdcTop = wt + ( winHeight / 2 ) - (  modalContent.outerHeight() / 2);
      var mdcLeft = ( winWidth / 2 ) - ( modalContent.outerWidth() / 2);
      $('#modalBackdrop').css(css).css('top', 0).css('height', docHeight + 'px').css('width', docWidth + 'px').show();
      modalContent.css({top: mdcTop + 'px', left: mdcLeft + 'px'}).hide()[animation](speed);

      // Bind a click for closing the modalContent
      modalContentClose = function(){close(); return false;};
      $('.close').bind('click', modalContentClose);

      // Bind a keypress on escape for closing the modalContent
      modalEventEscapeCloseHandler = function(event) {
        if (event.keyCode == 27) {
          close();
          return false;
        }
      };

      $(document).bind('keydown', modalEventEscapeCloseHandler);

      // Per WAI-ARIA 1.0 Authoring Practices, initial focus should be on the
      // close button, but we should save the original focus to restore it after
      // the dialog is closed.
      var oldFocus = document.activeElement;
      $('.close').focus();

      // Close the open modal content and backdrop
      function close() {
        // Unbind the events
        $(window).unbind('resize',  modalContentResize);
        $('body').unbind( 'focus', modalEventHandler);
        $('body').unbind( 'keypress', modalEventHandler );
        $('body').unbind( 'keydown', modalTabTrapHandler );
        $('.close').unbind('click', modalContentClose);
        $('body').unbind('keypress', modalEventEscapeCloseHandler);
        $(document).trigger('CToolsDetachBehaviors', $('#modalContent'));

        // Set our animation parameters and use them
        if ( animation == 'fadeIn' ) animation = 'fadeOut';
        if ( animation == 'slideDown' ) animation = 'slideUp';
        if ( animation == 'show' ) animation = 'hide';

        // Close the content
        modalContent.hide()[animation](speed);

        // Remove the content
        $('#modalContent').remove();
        $('#modalBackdrop').remove();

        // Restore focus to where it was before opening the dialog
        $(oldFocus).focus();
      };

      // Move and resize the modalBackdrop and modalContent on window resize.
      modalContentResize = function(){

        // Reset the backdrop height/width to get accurate document size.
        $('#modalBackdrop').css('height', '').css('width', '');

        // Get our heights.
        var docHeight = $(document).height();
        var docWidth = $(document).width();
        var winHeight = $(window).height();
        if( docHeight < winHeight ) docHeight = winHeight;

        // Apply the changes
        $('#modalBackdrop').css('height', docHeight + 'px').css('width', docWidth + 'px').show();

        // Do not apply popup position since it's broken for IE8 and the
        // replacement is provided by Drupal.behaviors.invotraBaseAlignPopup.
        // @see Drupal.behaviors.Drupal.behaviors.invotraBaseAlignPopup
      };
      $(window).bind('invotraWindowResize', modalContentResize);
    };
  }
})(jQuery);
