/*
    Todo: 
    - Check that the length of the import is the same length as the current selection
    
*/

var json = prompt("Paste your json dump from the Widget Exporter");
json = JSON.parse(json);

$(".modal-body input:not([type=hidden])").each(function(i, e) {
    $(e).val(json[i]);
});