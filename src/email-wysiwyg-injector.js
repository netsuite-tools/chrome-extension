// this function should not be invoked in the chrome extension sandbox
// instead in the real context of the page to access to the ckeditor
function injector() {
  // action to render template via preview API and put result into the WYSIWIG editor
  function loadTemplateToWysiwyg(event) {
    event.preventDefault();
    var button = jQuery(".load-template-to-wysiwyg")[0];

    var data = {
      recordtype:'313',
      record: '1',
      preview :'T',
      subject :'PREVIEW',
      message: window.CKEDITOR.instances.message.getData()
    };
    jQuery.post('https://system.sandbox.netsuite.com/app/crm/common/crmmessage.nl?l=T&l=T', data)
    .success(function(html) {
      // remove subject and email recipient
      var htmlToInject = html.replace(/<body>(.*)<center>/g, '<body><center>');
      window.CKEDITOR.instances.message.setData(htmlToInject);
    }).fail(function(error) {
      console.error(error);
      alert('Template konnte nicht in den WYSIWY Editor geladen werden');
    });
  }

  // disable update template checkbox
  jQuery('#updatetemplate_fs_inp')[0].disabled = true;

  // add button to trigger function above
  jQuery(".uir-field-wrapper.uir-inline-tag.uir-onoff").prepend("<button class='load-template-to-wysiwyg'>Lade Template in den WYSIWYG Editor</button>");
  jQuery(".load-template-to-wysiwyg").on('click', loadTemplateToWysiwyg);
}
// inject the function and execute it
var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ injector +')();'));
document.body.appendChild(script);
