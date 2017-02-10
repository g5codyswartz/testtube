
// http://stackoverflow.com/questions/14409631/step-through-all-children-and-remove-all-styles

var ckeIframe = $("#cke_ckeditor .cke_contents iframe.cke_wysiwyg_frame")
$("body [style]", ckeIframe.contents()).removeAttr('style');

