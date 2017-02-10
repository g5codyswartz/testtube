var widgetId = $($(".site-settings.page-section .l-cell:nth-of-type(2) .widgets .widget")[0]).attr("data-id")

$.ajax({
	method: "GET", 
	url: "/widgets/"+widgetId+"/edit",
	success: function(data, status, xhr) {

		var responseHtml = $(data);
		
		var description = responseHtml.filter("form").find(".form-field-logo-url input[type=text]").val();
		
		console.log(description);
		
		copy(description);
		
	},
	error: function(xhr, status, error) {
		console.log("Error: "+error+" Status: "+status);
		console.log(xhr);
	},
	complete: function(xhr, status) {
		//console.log("Complete, Status: "+status);
		//console.log(xhr);
	}
});