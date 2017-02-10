
var ckeIframe = $("#cke_ckeditor .cke_contents iframe.cke_wysiwyg_frame")

// http://stackoverflow.com/questions/9093838/remove-span-tag-in-string-using-jquery
ckeIframe.contents().find("span").each(function(index) {
   var text = $(this).text();
   $(this).replaceWith(text);
});