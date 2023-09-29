(function($, Drupal) {
  /**
   * Storage for listObjects.
   */
  var __ = {
    data: {},

    // Assigns data object to an element.
    initData: function (editorName) {
      if (typeof this.data[editorName] == 'undefined') {
        this.data[editorName] = {
          editorData: {},
          length: 1,
        }
      }
    },

    // Assigns data object to an element.
    setData: function (element, data) {
      var editorName = data.editorName,
          index = element.data('listObject');

      this.initData(editorName);
      if (index) {
        this.data[editorName].editorData[index] = data;
      }
      else {
        this.data[editorName].editorData[this.data[editorName].length++] = data;
        element.data('listObject', this.data[editorName].length - 1);
      }
    },

    // Gets assigned object from an element.
    getData: function (editorName, element) {
      // If there are no lists, then we should do nothing.
      if (typeof this.data[editorName] == 'undefined') {
        return;
      }

      var index = element.data('listObject');

      if (index) {

        // Updates element inside object because sometimes
        // CKEditor won't find it in dom and throws an error.
        this.data[editorName].editorData[index].element = element;
        return this.data[editorName].editorData[index];
      }
      return false;
    },

    // Destroys whole data set.
    destroy: function (editor) {
      var editorName = editor.name, data, element;

      // If there are no lists, then we should do nothing.
      if (typeof this.data[editorName] == 'undefined') {
        return;
      }

      for (var i = 1; i < this.data[editorName].length; i++) {

        // Getting element that way because editor won't find
        // it from object when element was moved or changed.
        element = editor.document.findOne('*[data-listobject="' + i + '"]');
        if (element) {
          data = this.getData(editorName, element);
          if (data) {
            data.destroy();
          }
        }
      }
      this.data[editorName].editorData = {};
      this.data[editorName].length = 1;
    }
  };

  /**
   * ListObject implementation.
   */
  Drupal.invotraOrderedListCK = function (editorName, element, parent) {
    this.init(editorName, element, parent);
  };

  /**
   * Prepares list for changes.
   */
  Drupal.invotraOrderedListCK.prototype.init = function (editorName, element, parent) {

    // CKEditor name.
    this.editorName = editorName;
    // List CKEditor element.
    this.element = element;
    // Parent li number.
    this.parent = parent;
    // List style type.
    this.type = element.getStyle('list-style-type') || 'decimal';
    // Wrote original type.
    this.start = element.data('originalListType', this.type);
    // Number to start order with.
    this.start = element.getAttribute('start') || 1;
    // Separator between parents and items counters.
    this.separator = '.';

    // Removes css property to remove default numbers.
    this.element.setStyle('list-style-type', 'none');

    this.setNumbers();
  };

  /**
   * Removes html changes from an element.
   */
  Drupal.invotraOrderedListCK.prototype.destroy = function () {
    var items = this.element.find('> li');
    for (var i = 0; i < items.count(); i++) {
      items.getItem(i).removeStyle('padding-left');
      items.getItem(i).removeAttribute('listOrder');
      items.getItem(i).addClass('ie8-update');
      items.getItem(i).removeClass('ie8-update');
    }
    this.element.data('listObject', false);

    if (this.element.getStyle('list-style-type') === 'none') {
      this.element.setStyle('list-style-type', this.type);
    }
  };

  /**
   * Assigns counters to every item in the list.
   */
  Drupal.invotraOrderedListCK.prototype.setNumbers = function () {
    var _this = this,
        items = _this.element.find('> li'),
        counter = _this.start,
        indent = 0,
        itemElement, i, j,
        childLists, child;

    for (i = 0; i < items.count(); i++) {
      itemElement = items.getItem(i);

      var formatted = _this.formatCounter(counter++) + _this.separator;

      if (_this.parent !== false) {
        formatted = _this.parent + formatted;
      }

      // Big thanks to IE 8.
      itemElement.setAttribute('listOrder', formatted);
      itemElement.addClass('ie8-update');
      itemElement.removeClass('ie8-update');

      // Counting indent we need for list depending on size of counter.
      indent = Math.max(_this.getTextWidth(formatted), indent);

      childLists = itemElement.find('> ol');
      for (j = 0; j < childLists.count(); j++) {
        child = __.getData(_this.editorName, childLists.getItem(j));
        if (child) {
          child.destroy();
        }
        __.setData(childLists.getItem(j), new Drupal.invotraOrderedListCK(_this.editorName, childLists.getItem(j), formatted));
      }
    }

    // Assigns padding to items depends on counters max width.
    if (indent > 10) {
      for (i = 0; i < items.count(); i++) {
        itemElement = items.getItem(i);
        itemElement.setStyle('padding-left', (indent - 10) + 'px');
      }
    }
  };

  /**
   * Creates fake element inside editor to measure text width.
   */
  Drupal.invotraOrderedListCK.prototype.getTextWidth = function (text) {
    var document = this.element.getDocument(),
        fakeElement = document.createElement('p');

    fakeElement.setStyle('position', 'fixed');
    fakeElement.setStyle('left', '-9999px');
    fakeElement.setStyle('top', '-9999px');
    fakeElement.setText(text);
    fakeElement.appendTo(document.findOne('body'));

    var width = fakeElement.getSize('width');
    fakeElement.remove();
    return width;
  };

  /**
   * Returns num formatted to alpha or roman depends on settings.
   */
  Drupal.invotraOrderedListCK.prototype.formatCounter = function (num) {
    var _this = this;
    switch (_this.type) {
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
   * Behavior to get to CKEditor object.
   */
  Drupal.behaviors.invotraOrderedListCKEditor = {
    attach: function () {
      var createNumberedList = function (editor) {
        var lists = editor.document.find('ol'),
            listParents, i, j, listElement, isChild;

        for (i = 0; i < lists.count(); i++) {
          listElement = lists.getItem(i);
          if (listElement.data('listObject') != null) {
            continue;
          }
          listParents = listElement.getParents(true);
          isChild = false;
          for (j = 1; j < listParents.length; j++) {
            if (listParents[j].is('ol')) {
              isChild = true;
              break;
            }
          }
          if (!isChild) {
            __.setData(listElement, new Drupal.invotraOrderedListCK(editor.name, listElement, false));
          }
        }
      };

      if (typeof CKEDITOR !== 'undefined') {
        CKEDITOR.on('instanceLoaded', function (event) {
          var editor = event.editor,
              editorName = editor.name;

          if (typeof editor.attachinvotraOrderedListCKEditor == 'undefined') {
            editor.attachinvotraOrderedListCKEditor = true;
            __.initData(editorName);
          }
          else {
            return;
          }

          editor.on('beforeGetData', function(e) {

            // Destroys all changes to HTML before getting data from editor.
            if (e.editor.mode === 'wysiwyg') {
              __.destroy(e.editor);
            }
          });
          editor.on('afterCommandExec', function(e) {
            var selection = editor.getSelection();
            if (!selection) {
              return;
            }

            var element = selection.getStartElement(), i, j;
            if (element) {
              var listParents = element.getParents(true);

              // Updates counters after executing indent and outdent commands.
              if (e.data.name === 'indent' || e.data.name === 'outdent') {
                var listObject, listElement;

                for (j = 1; j < listParents.length; j++) {
                  if (!listObject) {
                    listObject = __.getData(editorName, listParents[j]);
                    listElement = listParents[j];
                  }
                }

                if (listObject) {
                  listObject.destroy();
                  __.setData(listElement, new Drupal.invotraOrderedListCK(editorName, listElement, listObject.parent));
                }
              }
              else if (e.data.name === 'numberedlist') {

                // Assigns list object to new numbered list.
                if (element.getName() === 'li') {
                  for (j = 1; j < listParents.length; j++) {
                    if (listParents[j].getName() === 'ol') {
                      listObject = __.getData(editorName, listParents[j]);
                      if (listObject) {
                        listObject.destroy();
                      }
                      __.setData(listParents[j], new Drupal.invotraOrderedListCK(editorName, listParents[j], false));
                    }
                  }
                }
              }
              else if (e.data.name === 'bulletedlist') {

                // Updates numbered lists if bulleted list was created in it.
                var siblings = element.getParent().getParent().getChildren(),
                    object, list;

                for (j = 0; j < siblings.count(); j++) {
                  list = siblings.getItem(j);

                  if (!(list instanceof CKEDITOR.dom.element)) {
                    continue;
                  }

                  if (list.is('ol')) {
                    object = __.getData(editorName, list);

                    if (object) {
                      object.destroy();
                      __.setData(list, new Drupal.invotraOrderedListCK(editorName, list, object.parent));
                    }
                  }
                  else if (list.is('ul')) {
                    var items = list.find('> li');

                    for (i = 0; i < items.count(); i++) {
                      items.getItem(i).removeStyle('padding-left');
                      items.getItem(i).removeAttribute('listOrder');
                      items.getItem(i).addClass('ie8-update');
                      items.getItem(i).removeClass('ie8-update');
                    }
                    list.data('listObject', false);
                    list.removeStyle('list-style');
                  }
                }
              }
            }
          });
          editor.on('dialogShow', function(e) {

            // Updates list after changing list properties using.
            if (e.data.definition.title === 'Numbered List Properties') {
              e.data.definition.dialog.once('ok', function () {
                var element = editor.getSelection().getStartElement();
                if (element) {
                  var listParents = element.getParents(true),
                      listObject, j, listElement;

                  for (j = 1; j < listParents.length; j++) {
                    if (!listObject) {
                      listObject = __.getData(editorName, listParents[j]);
                      listElement = listParents[j];
                    }
                  }

                  if (listObject) {
                    listObject.destroy();
                    __.setData(listElement, new Drupal.invotraOrderedListCK(editorName, listElement, listObject.parent));
                  }
                }
              });
            }
          });
          editor.on('paste', function(e) {
            var $paste_data = $('<div>' + e.data.dataValue + '</div>');
            // Clear list data.
            // Li elements.
            var items = $paste_data.find('li');
            items.css('padding-left', "");
            items.removeAttr('listOrder');
            // Ol elements.
            items = $paste_data.find('ol');
            items.removeAttr('data-listobject');
            var originalListType = items.data('originalListType');
            if (originalListType !== undefined) {
              items.css('list-style-type', originalListType);
              items.removeAttr('data-originallisttype');
            }
            // Extract the cleared data.
            e.data.dataValue = $paste_data.html();
          });
          editor.on('afterPaste', function(e) {
            // Creates numbered lists after content in editor is loaded.
            createNumberedList(e.editor);
          });
          editor.on('contentDom', function(e) {

            // Creates numbered lists after content in editor is loaded.
            createNumberedList(e.editor);

            e.editor.document.on('keyup', function (evt) {
              var keyCode = evt.data.$.which || evt.data.$.keyCode,
                  selection = editor.getSelection(),
                  element = selection.getStartElement();

              // Enter, Backspace, Delete and Tab.
              if ((keyCode === 13) || (keyCode === 8) || (keyCode === 46) || (keyCode === 9)) {
                element = editor.getSelection().getStartElement();
                if (element) {
                  var listParents = element.getParents(true),
                      listObject,j;

                  for (j = 1; j < listParents.length; j++) {

                    if (!listObject) {
                      listObject = __.getData(editorName, listParents[j]);
                    }
                  }

                  if (listObject) {
                    var bookmark = editor.getSelection().createBookmarks2();
                    listObject.setNumbers();
                    editor.getSelection().selectBookmarks(bookmark);
                  }
                }
              }
            });
          });
        });
      }
    }
  };

})(jQuery, Drupal);
