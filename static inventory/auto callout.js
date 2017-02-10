
// Sets quote callout automatically by pulling in the location uid

var url = window.location.href;
var urlParse = /https:\/\/g5-self-storage-inventory.herokuapp.com\/clients\/.*\/(.*)#call-to-actions/g;
var match = urlParse.exec(url);
var uid = match[1];
var urlInput = $("input[name=call-to-action-url]");
var urlOut = "https://g5-cls-ij4jqc4l-self-storage-m.herokuapp.com/api/v1/locations/"+uid+"/html_forms/contact-no-current";
urlInput.val(urlOut);
