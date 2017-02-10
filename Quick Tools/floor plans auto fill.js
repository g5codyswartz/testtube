
var title = $("#floor_plan_title");
var beds = $("#floor_plan_beds");
var baths = $("#floor_plan_baths");
var size = $("#floor_plan_size");

var parts = title.val().split(/\t/);

title.val(parts[0]);
beds.val(parts[1] == "Studio" ? 0 : parts[1]);
baths.val(parts[2]);
size.val(parts[3]);