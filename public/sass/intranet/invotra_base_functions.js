(function ($) {

/**
 * Provides function sets for Invotra base theme.
 */

Drupal.invotra = Drupal.invotra || {};
Drupal.invotra.invotraBase = Drupal.invotra.invotraBase || {};
var invotraBase = Drupal.invotra.invotraBase;

/**
 * Input tips function.
 */
invotraBase.inputTips = function ($inp, text, style, usePlaceholder, update) {
  if (usePlaceholder && $inp.attr('placeholder')) {
    text = $inp.attr('placeholder');
    if (text && $inp.parent().find('.input-placeholder').length && text) {
      $inp.parent().find('.input-placeholder').remove();
    }
  }
  if (update) {
    $inp.removeClass('input-tips-processed');
    $inp.unbind('.inputTips');
  }
  $inp.once('input-tips', function () {
    // We can't use input value for displaying placeholder as it doesn't work
    // for password field (it's covered by dotes/stars) and also sometimes it
    // doesn't removed after form validation error.
    // So new functionality for placeholders in IE - display placeholder as a
    // specific <span> which will be positioning inside the input field via css.
    var $placeholderEl = $(this).siblings('.input-placeholder');
    if (!$placeholderEl.length) {
      $inp.parent().append('<span class="input-placeholder">' + text + '</span>');
      $placeholderEl = $(this).siblings('.input-placeholder');
    }
    else {
      $placeholderEl.html(text);
    }
    if (style) {
      $placeholderEl.css(style);
    }

    $inp.parent().addClass('ie-placeholder');
    if ($inp.val() == text) {
      $(this).val('');
    }
    if ($inp.val() != '') {
      $placeholderEl.hide();
    }
    $inp.attr("placeholder", '');
    $(this).bind({
      'focus.inputTips': function() {
        $placeholderEl.hide();
      },
      'blur.inputTips': function() {
        if ($inp.val() == '') {
          $placeholderEl.show();
        }
      }
    });
    $placeholderEl.bind({
      'click': function() {
        $(this)
          .siblings('input, textarea').focus()
      }
    });
    // Needed as forms can submit own placeholder in IE.
    var $form = $inp.parents('form');
    $form.submit(function () {
      $inp.each(function() {
        if ($(this).val() == text) {
          $(this).val('');
        }
      });
    });
  });
};

/**
 * Placeholder with fallback for IE.
 */
invotraBase.placeholderWithFallback = function ($input, placeholder, update) {
  var update = (update) ? update : false;
  $input.attr('placeholder', placeholder);
  if ($.browser.msie && parseInt($.browser.version) < 10) {
    invotraBase.inputTips($input, placeholder, {'color': '#656565'}, true, update)
  }
};

/**
 * Invotra get max-width for textfield.
 */
invotraBase.textfieldWidth = function (parentWidth) {
  var gridClass = '';
  var widths = {
    'max-90': 90,
    'max-180': 180,
    'max-220': 220,
    'max-460': 460,
    'max-690': 690
  };
  $.each(widths, function(k, v) {
    if (parentWidth >= v) {
      gridClass = k;
    }
  });
  return gridClass;
}

/**
 * Help function to wrap every n elements.
 */
invotraBase.wrapElements = function ($el, n, className) {
  className = (!className) ? '' : className + ' ';
  var j = 1;
  for(var i = 0; i < $el.length; i+=n) {
    groupClass = className + 'group-' + j;
    $el.slice(i, i+n).wrapAll("<div class='" + groupClass + "'></div>");
    j++;
  }
}

/**
 * Comment delete function.
 */
invotraBase.invotraCommentDelete = function (context) {
  var $context = $(context);
  var $deleteLink = $context.find('.comment-delete a');
  $deleteLink.once('delete-comment', function () {
    $(this).bind('click', function (e) {
      var $this = $(this);
      var href = this.href + '/ajax';
      var $comment = $this.closest('.comment');
      var $dialogBox = generateDeleteBox(href, $comment);
      $('#cdbox, #cdbox-overlay').remove();
      $('body').append($dialogBox);
      e.preventDefault();
    });
  });
  function generateDeleteBox(href, $comment) {
    var $dialogBox = $([
      '<div id="cdbox-overlay"></div>',
      '<div id="cdbox">',
      '<div class="text">',
      '<p>' + Drupal.t('Any replies to this comment will be lost.') + '</p>',
      '<p>' + Drupal.t('This action cannot be undone.') + '</p>',
      '</div>',
      '<div id="cdbox-bth">',
        '<a href="#" class="cancel">' + Drupal.t('Cancel') + '</a>',
        '<a href="#" class="delete">' + Drupal.t('Delete') + '</a>',
      '</div></div>'
    ].join(''));
    $('.cancel', $dialogBox).click(function (e) {
      $('#cdbox, #cdbox-overlay').remove();
      e.preventDefault();
    });
    $('.delete', $dialogBox).click(function (e) {
      $dialogBox.append('<div class="progress" />');
      $.post(href, function () {
        $('#cdbox, #cdbox-overlay').remove();
        $comment.next('.indented').remove();
        $comment.remove();
      });

      e.preventDefault();
    });
    return $dialogBox;
  }
  // @TODO: once().
  $(document).keyup(function(e) {
    if (e.keyCode == 27) {
      $('#cdbox, #cdbox-overlay').remove();
    }
  });
}

// Equal heights function.
invotraBase.equalHeights = function(elements) {
  var tallest = 0;
  elements.each(function () {
    if ($(this).height() > tallest) {
      tallest = $(this).height();
    }
  }).each(function() {
    if ($(this).height() < tallest) {
      $(this).css('height', tallest);
    }
  });
}


  /**
   * Invotra element toggle function
   * @param $bindElement
   *   jQuery selector of binding element.
   * @param $element
   *   jQuery selector of element to toggle.
   */
invotraBase.toggleElement = function($bindElement, $element) {
  $element.hide();
  $bindElement.bind('click', function () {
    $(this).toggleClass('open');
    $element.slideToggle();
  });
};

/**
 * Help function to set visible focus on input.
 */
invotraBase.focusedInput = function ($focusedInput) {
  //Add focus state and wrap focused input button.
  if ($focusedInput.length) {
    var $focusedInputOutline = $('<span id="sbmt-btn-focus" />').css({
      'position': 'absolute',
      'top': $focusedInput.position().top + parseInt($focusedInput.css('margin-top')),
      'left': $focusedInput.position().left + parseInt($focusedInput.css('margin-left')),
      'width': $focusedInput.outerWidth() - 4,
      'height': $focusedInput.outerHeight() - 4,
      'margin': 0
    });
    $focusedInput.addClass('focus').after($focusedInputOutline);
  }
}

/**
 * Helper function to make clickable view rows with additions.
 */
invotraBase.clickableViewRow = function ($row, url) {
  $row.once('invotra-base-clickable-view-row', function () {
    var $this = $(this).addClass('view-row-link-container');
    var $links = $this.find('a');
    var $blockLink = $("<a>&nbsp;</a>")
      .attr("href", url);

    $links.addClass("view-row-link-independent");
    $blockLink.addClass("view-row-link-background");

    var containerZIndex = $this.zIndex();

    $blockLink.css({"z-index": containerZIndex + 1});
    $links.css({"z-index": containerZIndex + 2});

    $this.append($blockLink);
    // IE 8 - 10 hack.
    // Ref INVGOV-6007.
    if ($.browser.msie && parseInt($.browser.version) <= 10) {
      $(this).click(function (e) {
        var target = $(e.target);
        if (target.not('a, input').length) {
          e.preventDefault();
          window.location.href = url;
        }
      });
    }
  });
};

/**
 * Redeclare default Ctools modal theme to inject own parameters.
 */
Drupal.theme.prototype.CToolsModalDialog = function () {
  Drupal.CTools.Modal.currentSettings.modalSize.contentBottom = 120;
  var html = ''
  html += '  <div id="ctools-modal">'
  html += '    <div class="ctools-modal-content">' // panels-modal-content
  html += '      <div class="modal-header">';
  html += '        <a class="close" href="#">';
  html +=            Drupal.CTools.Modal.currentSettings.closeText + Drupal.CTools.Modal.currentSettings.closeImage;
  html += '        </a>';
  html += '        <span id="modal-title" class="modal-title">&nbsp;</span>';
  html += '      </div>';
  html += '      <div id="modal-content" class="modal-content">';
  html += '      </div>';
  html += '    </div>';
  html += '  </div>';

  return html;
}


/**
 * Accessibility toggle menu function.
 *
 * Example can be found on  all invotra comments.
 * This is going to be implemented site wide eventually, so may as well create function.
 *
 * @param $menuSelector
 *   jQuery selector for menu selector.
 *
 * @param $menuElement
 *   jQuery selector for element wrapper selector.
 *   Example '.pane-node-comments', this is to help remove focus classes & elements.
 *
 */
invotraBase.commentMenu = function ($menuSelector, $menuElement) {
  $menuSelector.once('commentMenu', function() {

    // Helper function to remove focused classes and elements.
    function removeFocus(e) {
      $(e).find('a').once('focus', function() {
        $(this).keyup(function () {
          // Remove focus from elements within wrapper div.
          $(e).find('a.focus:not(.arrow)').removeClass('focus').find('.fcs-state').remove();
        });
      });
    }

    $menuSelector.keyup(function (e) {
      var $currentLink = $(e.target);
      var $firstLink = $('li:first-child', $menuSelector);
      var $lastLink = $('li:last-child', $menuSelector);
      var _this = $(this);
      switch (e.keyCode) {

        // Down arrow.
        case 40:
        // Right arrow.
        case 39:
          $currentLink
            .closest('li').next().find('a')
            .focus().addClass('focus')
            .append('<span class="fcs-state" />');

          $currentLink
            .blur()
            .removeClass('focus')
            .find('.fcs-state')
            .remove();

          if ($currentLink.parent().is(':last-child')) {
            e.preventDefault();
            $firstLink
              .find('a').focus()
              .addClass('focus')
              .append('<span class="fcs-state" />');

            // Remove focus from other elements.
            removeFocus($menuElement);
          }

          break;

        // Up arrow.
        case 38:
        // Left arrow.
        case 37:
          $currentLink
            .closest('li').prev().find('a')
            .focus().addClass('focus')
            .append('<span class="fcs-state" />');

          $currentLink
            .blur()
            .removeClass('focus')
            .find('.fcs-state')
            .remove();

          if ($currentLink.parent().is(':first-child')) {
            e.preventDefault();
            $lastLink
              .find('a').focus()
              .addClass('focus')
              .append('<span class="fcs-state" />');

            // Remove focus from other elements.
            removeFocus($menuElement);
          }

          break;

        case 27:
            $menuSelector.hide();
            _this
              .prev('a')
              .focus().addClass('focus')
              .append('<span class="fcs-state" />');

          break
      }
    });
  })
}

})(jQuery);
