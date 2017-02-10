
var parent = $(".modal-body");
// set custom css
//$("input[type=text]:eq(0)", parent).val("what-size-col");
// set row 1 - columns, first one
$("select:eq(1)", parent).val("HTML")
// submit
$("form", parent).submit();