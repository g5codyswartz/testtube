
// http://stackoverflow.com/questions/7589528/is-it-possible-to-remove-nbsp-using-jquery

var ckeIframe = $("#cke_ckeditor .cke_contents iframe.cke_wysiwyg_frame")
var ckeContents = $(ckeIframe.contents());
var ckeBody = $("body", ckeContents);

ckeBody.html( ckeBody.html().replace(/&nbsp;/g, ' ') );

// http://stackoverflow.com/questions/7589528/is-it-possible-to-remove-nbsp-using-jquery

var ckeIframe = $("#cke_ckeditor .cke_contents iframe.cke_wysiwyg_frame")
var ckeContents = $(ckeIframe.contents());
var ckeBody = $("body", ckeContents);

ckeBody.html( ckeBody.html().replace(/Southwest Colorado Springs/g, ' ') );
ckeBody.html( ckeBody.html().replace(/Salt Lake City/g, ' ') );