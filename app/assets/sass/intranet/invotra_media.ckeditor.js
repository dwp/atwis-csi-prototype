(function ($, Drupal) {

  /**
   * Fix duplicating media files on enter.
   */
  Drupal.behaviors.invotraMediaFilesFix = {
    attach: function () {
      if (typeof CKEDITOR !== 'undefined') {
        CKEDITOR.on('instanceLoaded', function (event) {
          var editor = event.editor,
              selection;

          editor.on('key', function (e) {
            if ($.inArray(e.data.keyCode, [37, 38, 39, 40]) !== -1) {
              return;
            }
            selection = e.editor.getSelection();
            if (typeof selection === 'undefined') {
              return;
            }
            var el = selection.getStartElement(),
                range = selection.getRanges()[0],
                container = range.startContainer.$,
                cursor_position = range.startOffset,
                position = null,
                position_element = null,
                length = null,
                isIE = document.documentMode || /Edge/.test(navigator.userAgent);
            // The current caret position is in the span.
            if (el && el.is('span') && el.hasClass('media-element')) {
              length = el.$.textContent.length;
              // IE fix.
              if (isIE) {
                // The position before link is 0, 1.
                // After link - 2.
                if (cursor_position < 2) {
                  cursor_position = 0;
                }
                else {
                  cursor_position = length;
                }
              }
              // Fix the issue with strange the startOffset value after press Enter before link several times.
              else if (container.nodeType === 1) {
                cursor_position = 0;
              }
              // If cursor position less than link length than move caret to start of the link.
              else if (cursor_position < length) {
                cursor_position = 0;
              }
              // else move caret to the end of the link.
              else {
                cursor_position = length;
              }
              position_element = el;
            }
            // The current caret position is in the link.
            else if (el && el.is('a') && el.getParent().hasClass('media-element')) {
              length = el.$.textContent.length;
              position_element = el.getParent();
            }

            // Only if we have a link length we can determine the caret's new
            // position.
            if (length) {
              if (cursor_position >= length) {
                position = CKEDITOR.POSITION_AFTER_END;
              }
              else if (cursor_position === 0) {
                position = CKEDITOR.POSITION_BEFORE_START;
              }
              else {
                // Don't allow to press the Enter key within link text to prevent duplicate it.
                if (e.data.keyCode == 13) {
                  e.cancel();
                }
              }
            }

            // And if we have a position then we move the caret to it.
            if (position) {
              range.moveToPosition(position_element, position);
              event.editor.getSelection().selectRanges([range]);
            }
          });

          editor.on('afterCommandExec', function (e) {
            selection = e.editor.getSelection();
            if (typeof selection === 'undefined' || $.isEmptyObject(selection)) {
              return;
            }

            var el = selection.getStartElement();
            if (e.data.name === 'media') {
              e.editor.once('insertHtml', function (event) {
                selection = e.editor.getSelection();
                if (typeof selection === 'undefined') {
                  return;
                }

                el = selection.getStartElement();
                if (el) {
                  var range = new CKEDITOR.dom.range(event.editor.document);
                  if (el.is('span') && el.hasClass('media-element')) {
                    range.moveToPosition(el, CKEDITOR.POSITION_AFTER_END);
                    event.editor.getSelection().selectRanges([range]);
                  }
                  else if (el.is('a') && el.getParent().hasClass('media-element')) {
                    range.moveToPosition(el.getParent(), CKEDITOR.POSITION_AFTER_END);
                    event.editor.getSelection().selectRanges([range]);
                   }
                }
              });
            }
          });

          // Fix issue with caret placement on media file after losing focus.
          if ($.browser.msie && (parseInt($.browser.version) <= 9)) {
            editor.on('focus', function (e) {
              e.editor.once('key', function (event) {
                selection = e.editor.getSelection();
                if (typeof selection === 'undefined') {
                  return;
                }

                var el = selection.getStartElement();
                if (el) {
                  var range = new CKEDITOR.dom.range(event.editor.document);
                  if (el.is('span') && el.hasClass('media-element')) {
                    range.moveToPosition(el, CKEDITOR.POSITION_AFTER_END);
                    event.editor.getSelection().selectRanges([range]);
                  }
                  else if (el.is('a') && el.getParent().hasClass('media-element')) {
                    range.moveToPosition(el.getParent(), CKEDITOR.POSITION_AFTER_END);
                    event.editor.getSelection().selectRanges([range]);
                  }
                }
              });
            });
          }
        });
      }
    }
  };

})(jQuery, Drupal);
