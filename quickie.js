


/// ----- Set CTAs ----- ///
var fields = $("#modal fieldset .form-field");

// CTA 1
$("input[type=text]", fields[0]).val("Our Locations");
$("select", fields[1]).val("locations");

// CTA 2
$("input[type=text]", fields[2]).val("Contact Us");
$("select", fields[3]).val("contact-us");



/// ----- Set Widgets in Column CTAs ----- ///
var numberOfWidgets = $("#modal .form-field.select-row-count select");
// set widget amount
numberOfWidgets.val('two');

var rows = $("#modal .form-field.row-widgets");

// set widgets
$("select", rows[0]).val("Calls To Action");
$("select", rows[1]).val("Contact Info");



/// ----- Add Widget - Hours ----- ///

var selects = $("#modal select");
var widgetCount = selects[0];
var selectedOption = $("option[selected]", widgetCount);
var nextWidgetCount = selectedOption.next();

// remove selected attribute
selectedOption.removeAttr("selected");
// add selected attribute
nextWidgetCount.attr("selected", "");
// set val for the select
$(widgetCount).val(nextWidgetCount.val());

// Fill in our new widget with Hours
$(selects[nextWidgetCount.text()]).val("Hours");

// submit/save form
$("#modal form").submit();



/// ----- Special Deals / Coupon Insert Into WYSIWYG Editor & Save ----- ///

var htmlSource = 
    "<h1>Special Offer</h1>"+
    "<p>&nbsp;</p>"+
    "<h2>Call for Specials</h2>"+
    "<p>*Coupon is for select units and must be presented at time of first inquiry and cannot be combined with any other discounts including online reservations. This coupon is for New Customers Only and Expires 30 days from print date.</p>";
    
var ckeIframe = $("#cke_ckeditor .cke_contents iframe.cke_wysiwyg_frame")
$("body",ckeIframe.contents()).html(htmlSource);



/// ------- Hide alert box on deploying

function addCSS(cssStyles) {
	$("<style>"+cssStyles+"</style>").appendTo("head");
}

addCSS(".alert-box { position: fixed; top: 0px; left: 0px; z-index: 9999; }");



/// ------- Get CLWs - run on the CMS location's page
//  or of course could have used: https://g5-cms-iedcpw65-the-william-wa.herokuapp.com/api/v1/locations
var test = $('.faux-table-body>.faux-table-row.location').map(function(i, e) {
    var clw = $('.actions a[href*=g5-clw]', e).attr('href');
    var clwClean = clw.replace(".herokuapp.com", "").replace("http://", "");
    return {
        name: $('.name', e).text(), 
        clw: clw, 
        clwClean: clwClean,
        herokuSettings: "https://dashboard.heroku.com/apps/"+clwClean+"/settings"
    };
}).get();




/// ------- Get logo url from pages page
var widgetId = $($(".site-settings.page-section .l-cell:nth-of-type(2) .widgets .widget")[0]).attr("data-id")

$.ajax({
	method: "GET", 
	url: "/widgets/"+widgetId+"/edit",
	success: function(data, status, xhr) {

		var responseHtml = $(data);
		
		var description = responseHtml.filter("form").find(".form-field-logo-url input[type=text]").val();
		
		console.log(description);
		
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




/// ------- Get all pages - run at pages level. Great for having a drop down in spreed sheets
var sb = "";
$(".card-body .buttons>.btn:nth-of-type(2)").each(function(i, el) { 
   var src = $(el).attr('href');
   var split = src.split("/");
   sb += split[split.length-1]+",";
});
console.log(sb);


