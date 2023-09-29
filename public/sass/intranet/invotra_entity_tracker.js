(function ($, Drupal) {

  Drupal.behaviors.invotraEntityTrackerFilter = {
    attach: function (context) {
      $('form.entity-tracker-exposed-form #edit-entity-type', context).once('invotraEntityTypeFilter', function() {
        var $entity_type_filter = $(this);
        $entity_type_filter.find('input#edit-entity-type-all').click(function () {
          if ($(this).is(':checked')) {
            $entity_type_filter.find('.form-type-checkbox input:not([value="All"]):checked').each(function () {
              $(this).attr('checked', false);
              $(this).parent().removeClass('checked');
            });
          }
        });
        $entity_type_filter.find('input:not([value="All"])').click(function () {
          if ($(this).is(':checked')) {
            var $all = $entity_type_filter.find('input#edit-entity-type-all:checked');
            if ($all.length) {
              $all.attr('checked', false);
              $all.parent().removeClass('checked');
            }
          }
        });
      });
    }
  };
})(jQuery, Drupal);