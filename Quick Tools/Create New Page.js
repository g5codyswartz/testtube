
// grab elements
var pageName = $("form input[type=text]:eq(0)");
var pageTitle = $("form input[type=text]:eq(1)");
var parentPage = $("form select");

// get values
var optionVal = getOptionByValue(parentPage, "Unit Sizes & Prices");

// set values
pageName.val("What Size Do I Need");
pageTitle.val("Size Estimator | {{location_name}}");
parentPage.val(optionVal);

function getOptionByValue(select, val) {
    return $("option", select).filter(function(i, e) {
        return $(e).text().trim() == val;
    }).map(function(i, e) {
        return $(e).val();
    })[0];
}

// focus/trigger all inputs to update the ember
$("form input[type=text]").focusout();

// remove disabled attribute and trigger click to submit/save
$(".buttons .btn.save").removeAttr("disabled").click();