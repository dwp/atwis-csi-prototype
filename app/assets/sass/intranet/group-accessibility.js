(function ($) {
  Drupal.behaviors.GroupHomeAccessibility = {
    attach: function (context, settings) {

      var $pollForm = $('.node-advpoll-form');
      $pollForm.find('.poll-question-processed').attr({"aria-labels" : Drupal.t('Answer (letter)')});
      var $feeds = $('.view-group-home .views-row');
      $feeds.each(function() {
        $(this).attr({role:'article'});
      });
      $(document).ajaxSuccess(function() {
        $('.comment-reply a').each(function() {
          $(this).attr({'aria-expandable':'true'});
        });
      });
      $('.views-field-field-media a').each(function() {
        $(this).attr({"aria-label" : Drupal.t('Open attachment')});
      });
      $('.pane-group-about').attr({"role":'complementary'});
      $('.form-type-media a.button.browse').attr({"aria-label" : Drupal.t('Add attachment')});

      $('a.rate-thumbs-up-btn-up.user-voted', context).attr({"aria-label" : Drupal.t('Like activated')});

      $pollForm = $('.node-advpoll-form');
      $pollForm.find('.poll-question-processed').attr({"aria-label" : Drupal.t('Answer (letter)')});

      // Remove accessibility from picure.
      $('.views-field-picture a', $feeds).attr({
        'tabindex': '-1',
        'aria-hidden': 'true'
      });
      $('.pane-group-node-members-full .views-field-umember-picture-url a').attr({
        'tabindex': '-1',
        'aria-hidden': 'true'
      });
    }
  }

  Drupal.behaviors.GroupCommentsAccessibility = {
    attach: function (context, settings) {
      $('.group_status-comment-reply #comment-form .field-name-comment-body label,' +
        ' .advpoll-comment-reply #comment-form .field-name-comment-body label, ' +
        ' .node-type-group-status #comment-form .field-name-comment-body label,' +
        ' .node-type-advpoll #comment-form .field-name-comment-body label,' +
        ' .node-type-doc #comment-form .field-name-comment-body label', context).once('groupCommentsAccessibility', function () {
          $(this).addClass('element-invisible');
      });

    }
  };

  /**
   * Fix issues with JAWS+Chrome+Win.
   *
   * - Selecting ajax button activates menu;
   *
   */
  Drupal.behaviors.GroupAccessibilityJawsFix = {
    attach: function (context) {
      $('input.ajax-processed, a.ajax-processed', context).not('.invotra-user-autocomplete').once('AjaxClick', function () {
        $(this).parent().attr({'role': 'application'});
        $(this).attr({'role': 'button'});
        $(this).keydown(function (e) {
          if (e.keyCode == 13 || e.keyCode == 32) {
            e.preventDefault();
          }
        });
        $(this).keyup(function (e) {
          if (e.keyCode == 13 || e.keyCode == 32) {
            e.preventDefault();
            if ($(this).is('a')) {
              $(this).click();
            }
            else {
              $(this).trigger('mouseup');
            }
          }
        });
      });
    }
  }
}(jQuery));