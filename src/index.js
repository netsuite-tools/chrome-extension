var jQuery = require('jquery');

if (window.location.pathname == "/app/common/scripting/scriptdebugger.nl") {
  require('./debug-helper');
}

if (
  window.location.pathname == "/app/crm/common/crmmessage.nl" &&
  jQuery("#messages_form").length > 0
) {
    require('./email-wysiwyg-injector');
  }
