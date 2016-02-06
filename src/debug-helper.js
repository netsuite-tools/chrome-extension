var $ = require('jquery');
require('jquery-ui/autocomplete');

// var API_LIST = require('../vendor/netsuite-api.json');
var API_LIST = [
  {
    "name": "nlapiCopyRecord",
    "params": [
      "type",
      "id",
      "initializeValues"
    ],
    "comment": "*\n * Return a new record using values from an existing record.\n * @governance 10 units for transactions, 2 for custom records, 4 for all other records\n *\n * @param {string} \ttype The record type name.\n * @param {int} \tid The internal ID for the record.\n * @param {Object} \tinitializeValues Contains an array of name/value pairs of defaults to be used during record initialization.\n * @return {nlobjRecord}  Returns an nlobjRecord object of a copied record.\n *\n * @since\t2007.0"
  },
  {
    "name": "nlapiLoadRecord",
    "params": [
      "type",
      "id",
      "initializeValues"
    ],
    "comment": "*\n * Load an existing record from the system.\n * @governance 10 units for transactions, 2 for custom records, 4 for all other records\n *\n * @param {string} \ttype The record type name.\n * @param {int} \tid The internal ID for the record.\n * @param {Object} \tinitializeValues Contains an array of name/value pairs of defaults to be used during record initialization.\n * @return {nlobjRecord}  Returns an nlobjRecord object of an existing NetSuite record.\n *\n * @exception {SSS_INVALID_RECORD_TYPE}\n * @exception {SSS_TYPE_ARG_REQD}\n * @exception {SSS_INVALID_INTERNAL_ID}\n * @exception {SSS_ID_ARG_REQD}\n *\n * @since\t2007.0"
  }
];

var fetchLines = function() {
  var allLines = $('#historywindow > div').map(function(_, line) {return $(line).text()});
  var inputLines = allLines.filter(function(_, item) {
    return item.substr(0, 1) === '$';
  });
  var inputWithoutPrompt = inputLines.map(function(_, item) {
    return item.substr(2);
  });
  return inputWithoutPrompt;
}

var evalInputSelector = '#evalexpression';
var evalInputElement = $(evalInputSelector);
if (evalInputElement.length > 0) {
  // evalInputElement.attr("autocomplete", "off");
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

  // inject some elements to provide better UI for autocompletion


  evalInputElement.parent().append('<input type="hidden" id="ns-api-id">');
  evalInputElement.parent().append('<p id="ns-api-params"></p>');
  zzz = evalInputElement.autocomplete({
      minLength: 0,
      source: API_LIST,
      focus: function( event, ui ) {
        evalInputElement.val( ui.item.name );
        return false;
      },
      select: function( event, ui ) {
        $( evalInputSelector ).val( ui.item.name );
        $( "#ns-api-id" ).val( ui.item.name );
        $( "#ns-api-params" ).val( ui.item.params );
        return false;
      }
    })
    .autocomplete().data("uiAutocomplete")._renderItem = function( ul, item ) {
      return $( "<li>" )
        .append( "<a>" + item.name + "<br>(" + item.params.join(', ') + ")</a>" )
        .appendTo( ul );
    };
}
