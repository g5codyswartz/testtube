/*
    Todo: 
    - Export different types of values besides inputs
    - See if the widget type can get grabbed and exported for validation purposes on inporting
*/

var json = $(".modal-body input:not([type=hidden])").map(function(i,e) {
    return $(e).val();
}).get();

copy(JSON.stringify(json));