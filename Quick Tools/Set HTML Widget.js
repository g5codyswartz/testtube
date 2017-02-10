
// get the iframe
var ckeIframe = $("#cke_ckeditor .cke_contents iframe.cke_wysiwyg_frame");
// get our main content within the iframe to target
var contents = ckeIframe.contents();
// set new html
$("body", contents).html('<h1>What Size Do I Need?</h1>');
// submit
$(".modal-body form").submit();