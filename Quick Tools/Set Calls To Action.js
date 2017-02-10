
var parent = $(".modal-body");
// set first cta
$("input[type=text]:eq(1)").val("Reserve Now");
// set first cta page
$("select:eq(0)").val("unit-sizes-prices");
// 2nd cta
$("input[type=text]:eq(2)").val("Get A Coupon");
// 2nd cta page
$("select:eq(1)").val("coupon");
// submit / save
$("form", parent).submit();