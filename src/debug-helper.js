var jQuery = require('jquery');

var fetchLines = function() {
  var allLines = jQuery('#historywindow > div').map(function(_, line) {return jQuery(line).text()});
  var inputLines = allLines.filter(function(_, item) {
    return item.substr(0, 1) === '$';
  });
  var inputWithoutPrompt = inputLines.map(function(_, item) {
    return item.substr(2);
  });
  return inputWithoutPrompt;
}

var evalInputElement = jQuery('#evalexpression');
if (evalInputElement.length > 0) {
  evalInputElement.attr("autocomplete", "off");
  var handler = function(e) {
    if (e.keyCode == 38) {
      var items = fetchLines();
      counter++;
      if (counter >= items.length) {
        counter = items.length - 1;
      }
      var selected = items[counter];
      evalInputElement.val(selected);

    } else if (e.keyCode == 40) {
      var items = fetchLines();
      counter--;
      if (counter <= -1) {
        counter = -1;
        return evalInputElement.val('');
      }
      console.log(counter);
      // >= 0
      var selected = items[counter];
      evalInputElement.val(selected);
    }
  };
  var counter = -1;
  evalInputElement.on('keyup', handler);
  console.log('attach handler');
}
