var $ = require('jquery');
require('jquery-ui/autocomplete');
observeDOM = require('./dom-observer');

var API_LIST = require('../vendor/netsuite-api.json');
var STORAGE_KEY = 'debugger-history';

var addEntry = function(entry) {
  var list = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  list.unshift(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}
var getEntries = function() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}

var historyMode = false;
var evalInputSelector = '#evalexpression';
var evalInputElement = $(evalInputSelector);
if (evalInputElement.length > 0) {
  var counter = -1;
  evalInputElement.attr("autocomplete", "off");
  var keyDownHandler = function(e) {
    if (e.keyCode == 13) {
      if ($('.ui-autocomplete .ui-state-focus').length === 0) {
        addEntry(evalInputElement.val());
        counter = -1;
      }
    }
    if (e.shiftKey && (e.keyCode == 38 || e.keyCode == 40)) {
      // stop jquery autocomplete handler
      e.stopImmediatePropagation();
      e.preventDefault();
      e.stopPropagation();
    } else {
      // continue with other handlers
      return true;
    }
    if (e.keyCode == 38) {
      // arrow up
      var items = getEntries();
      counter++;
      if (counter >= items.length) {
        counter = items.length - 1;
      }
      var selected = items[counter];
      evalInputElement.val(selected);
    } else if (e.keyCode == 40) {
      // arrow down
      var items = getEntries();
      counter--;
      if (counter <= -1) {
        counter = -1;
        return evalInputElement.val('');
      }
      // >= 0
      var selected = items[counter];
      evalInputElement.val(selected);
    }
  };

  evalInputElement.on('keydown', keyDownHandler);

  // inject hidden input for jquery autocomplete
  evalInputElement.parent().append('<input type="hidden" id="ns-api-id">');
  evalInputElement.autocomplete({
      minLength: 0,
      source: API_LIST,
      focus: function( event, ui ) {
        evalInputElement.val( ui.item.label );
        return false;
      },
      select: function( event, ui ) {
        $( evalInputSelector ).val( ui.item.label );
        $( "#ns-api-id" ).val( ui.item.value );
        return false;
      },
    })
    .autocomplete().data("uiAutocomplete")._renderItem = function( ul, item ) {
      return $( "<li>" )
        .append( "<a title='" + item.comment + "'><div>" + item.value + "</div><div class='small'>" + "function(" + item.params.join(', ') + ")</div></a" )
        .appendTo( ul );
    };
}

// inject button to copy and close the cookie debug session
//https://debugger.sandbox.netsuite.com/app/common/scripting/scriptdebugger.nl?attach=T
if ($(".uir-record-type").text() === "Debug Existing") {
  observeDOM( document.querySelector("#outerwrapper"), function(arg) {
    setTimeout(function() {
      var cookie = $("#div__alert .descr");
      if (cookie.length > 0) {
        $(document.body).append("<button style='font-size: 2em;'class='copy-debug-sesion'>Copy Cookie & Close</button>");
        $(".copy-debug-sesion").on('click', function(e) {
          var range = document.createRange();
          range.selectNode(cookie[0]);
          window.getSelection().addRange(range);
          try {
            var successful = document.execCommand('copy');
            if (!successful) {
              throw new Error();
            }
            $('#tbl_close button').click();
          } catch(err) {
            $(document.body).append('<div>Oops, could not copy, just press <pre>CTR/CMD + C</pre> now</div>');
            console.log($("#div__alert .descr").text());
          }
        });
      } else {
        alert('Cookie not found');
      }
    }, 100);
  });
}
