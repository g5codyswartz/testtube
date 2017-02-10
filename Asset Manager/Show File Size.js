
/* global $ */

var displaySize = function(data, status, xhr) {
    console.log("DATA", data, "STAT", status, "XHR", xhr);
}

$(".assets .faux-table-body img").forEach(function(i,e) { 
    var src = $(e).attr("src");
	$.ajax({
	    url: src,
	    success: displaySize
	});
});
