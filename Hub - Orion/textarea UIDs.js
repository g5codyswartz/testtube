/* global $ */
$("td.col-uid").each(function(i,e){
    e = $(e);
    var text = e.text().trim();
    e.replaceWith("<textarea readonly style='width:300px; height: 110px;'>"+text+"</textarea>");
});