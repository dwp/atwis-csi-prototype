"use strict";

var forms = document.getElementsByTagName('form');

for (var i = 0; i < forms.length; i += 1) {
  if (forms[i].hasAttribute('data-submitonce')) {
    forms[i].addEventListener('submit', function (event) {
      if (event.target) {
        var buttons = event.target.getElementsByTagName('input');

        for (var j = 0; j < buttons.length; j += 1) {
          if (buttons[j].getAttribute('type') === 'submit') {
            buttons[j].setAttribute('disabled', 'true');
          }

          buttons[j].className = "".concat(buttons[j].className, " disabled");
        }
      }
    });
  }
}
