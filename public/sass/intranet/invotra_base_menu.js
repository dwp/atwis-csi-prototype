(function ($, Drupal) {

  /**
   * Updating useful menu.
   */
  Drupal.behaviors.invotraUsefulMenu = {
    attach: function(context, settings) {
      function addColumns($menu) {
        // Open menu to calculate width/height.
        $menu.show();
        var menuHeight = 34 * 10,
            menuWidth = $menu.outerWidth(),
            menuPadding = (menuWidth - $menu.width())/2,
            columnWidth = menuWidth,
            currentHeight = 0,
            column = 1;
        // Create the first column.
        $menu.append('<div id="menu-column-1" class="menu-column"></div>');
        // Move links to columns.
        $menu.find('li').each(function(i) {
          var $item = $(this);
          currentHeight += $item.outerHeight();
          // Check if the link still in this column.
          if (currentHeight > menuHeight) {
            currentHeight = $item.outerHeight();
            menuWidth += columnWidth;
            column++;
            // Create a new column.
            $menu.append('<div id="menu-column-' + column + '" class="menu-column"></div>');
          }
          $('#menu-column-' + column, $menu).append($item);
          var $link = $('a', $item);
          // Add ellipsis to the long links.
          $link.dotdotdot({
            ellipsis: '...',
            height: 40,
            watch: true
          });
        });
        // Remove left and right padding.
        menuWidth -= 2 * menuPadding;
        // Set new width for menu.
        $menu.css({'width' : menuWidth});
        // Close menu.
        $menu.hide();
      }
      $('#block-menu-menu-quick-links .menu', context).once('invotraMenuColumn', function() {
        addColumns($(this));
      });
    }
  };

})(jQuery, Drupal);
