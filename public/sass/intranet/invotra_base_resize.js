/**
 * @file
 *
 * invotraWindowResize event definition file.
 *
 * The event is similar to window resize but is triggered only if window
 * dimensions were changed.
 *
 * Some browsers (hello IE) fires window resize after *any* window element
 * resize event is triggered, even if dimensions didn't change. This results
 * in infinite callbacks loop if event handler changes some DOM element
 * dimensions (like centers modal popup).
 *
 * As a workaround, any event handlers which interacts with DOM elements sizing
 * should use invotraWindowResize event instead of resize.
 *
 * Wrong code:
 * $(window).resize(function(){ resizeSomeElement(); });
 *
 * Another wrong code:
 * $(window).bind('resize', function(){ resizeSomeElement(); });
 *
 * Correct code:
 * $(window).bind('invotraWindowResize', function(){ resizeSomeElement(); });
 */

(function ($) {
  var $window = $(window);
  var prevWindowWidth = $window.width();
  var prevWindowHeight = $window.height();
  $window.resize(function() {
    if ($window.width() != prevWindowWidth
      || $window.height() != prevWindowHeight) {
      $window.trigger('invotraWindowResize');
      prevWindowWidth = $window.width();
      prevWindowHeight = $window.height();
    }
  });
})(jQuery);
