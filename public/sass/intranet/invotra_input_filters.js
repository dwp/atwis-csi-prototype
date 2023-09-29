(function ($, Drupal) {

  Drupal.invotraOrderedList = function ($el, parent) {
    // List element.
    this.$el = $el;
    // Parent li number.
    this.parent = parent;
    // List style type.
    this.type = $el.css('list-style-type') || 'decimal';
    // Number to start order with.
    this.start = $el.attr('start') || 1;
    // Separator between parents and items counters.
    this.separator = '.';

    // Removes css property to remove default numbers.
    this.$el.css('list-style-type', 'none');

    this.setNumbers();
  };

  /**
   * Assigns counters to every item in the list.
   */
  Drupal.invotraOrderedList.prototype.setNumbers = function () {
    var _this = this,
        $items = _this.$el.find('> li'),
        counter = _this.start,
        indent = 0;
    if (_this.formatCounter(counter)) {
      $items.each(function () {
        var formatted = _this.formatCounter(counter++) + _this.separator,
            $this = $(this);

        if (_this.parent !== false) {
          formatted = _this.parent + formatted;
        }

        // Big thanks to IE 8.
        $this.attr('listOrder', formatted);
        $this.addClass('ie8-update');
        setTimeout(function () {
          $this.removeClass('ie8-update');
        }, 0);

        // Counting indent we need for list depending on size of counter.
        indent = Math.max(_this.getTextWidth(formatted), indent);

        $this.find('> ol').each(function () {
          $(this).data('listObject', new Drupal.invotraOrderedList($(this), formatted));
        });
      });

      $items.css('padding-left', (indent - 10) + 'px');
    }

  };

  /**
   * Creates fake element inside dom to measure text width.
   */
  Drupal.invotraOrderedList.prototype.getTextWidth = function (text) {
    var $fakeElement = $('<p></p>');

    $fakeElement
      .text(text)
      .css({
        'position': 'fixed',
        'left': '-9999px',
        'top': '-9999px'
      })
      .appendTo($('body'));

    var width = $fakeElement.width();
    $fakeElement.remove();
    return width;
  };

  /**
   * Returns num formatted to alpha or roman depends on settings.
   */
  Drupal.invotraOrderedList.prototype.formatCounter = function (num) {
    var _this = this;
    switch (_this.type) {
      case 'none':
        return null;

      case 'decimal':
        return num;

      case 'upper-roman':
      case 'lower-roman':

        // Decimal to Roman conversion.
        var roman = (function (n) {
          var lookup = { 'M':1000, 'CM':900, 'D':500, 'CD':400, 'C':100, 'XC':90, 'L':50,
                         'XL':40, 'X':10, 'IX':9, 'V':5, 'IV':4, 'I':1 },
              roman = '',
              i;
          for (i in lookup) {
            while (n >= lookup[i]) {
              roman += i;
              n -= lookup[i];
            }
          }
          return roman;
        })(num);

        // Case conversion.
        if (_this.type == 'lower-roman') {
          return roman.toLowerCase();
        }
        else {
          return roman;
        }

      case 'upper-alpha':
      case 'lower-alpha':

        // Decimal to Alpha conversion.
        var alpha = (function (n) {
          var lookup = { 26:'Z', 25:'Y', 24:'X', 23:'W', 22:'V', 21:'U', 20:'T', 19:'S', 18:'R',
                         17:'Q', 16:'P', 15:'O', 14:'N', 13:'M', 12:'L', 11:'K', 10:'J', 9:'I',
                         8:'H', 7:'G', 6:'F', 5:'E', 4:'D', 3:'C', 2:'B', 1:'A' },
              alpha = '',
              base = 26;

          while (n) {
            // Because we don't have 0 in lookup.
            if (n%base) {
              alpha += lookup[n%base];
            }
            else {
              alpha += lookup[base];
              n -= base;
            }
            n = Math.floor(n/base);
          }
          return alpha.split('').reverse().join('');
        })(num);

        // Case conversion.
        if (_this.type == 'lower-alpha') {
          return alpha.toLowerCase();
        }
        else {
          return alpha;
        }

    }
  };

  /**
   * Behavior to look up all parent <ol> lists and set counters.
   */
  Drupal.behaviors.invotraOrderedList = {
    attach: function (context) {
      $('ol', context).once('invotraOrderedList', function () {
        if (!$(this).parents('ol').length) {
          $(this).data('listObject', new Drupal.invotraOrderedList($(this), false));
        }
      });
    }
  };

})(jQuery, Drupal);