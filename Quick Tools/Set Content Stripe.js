
var WidgetLayout = {
    SingleColumn: "single",
    TwoColumnHalf: "halves",
    TwoColumnOneThird: "uneven-thirds-1",
    TwoColumnTwoThird: "uneven-thirds-2",
    ThreeColumn: "thirds",
    FourColumn: "quarters"
};

var parent = $(".modal-body");
// set custom css
$("input[type=text]:eq(0)", parent).val("wide-row");
// set background color
$("input[type=text]:eq(2)", parent).val("#64656A");
// set widget layout
$("fieldset:eq(2) select:eq(0)", parent).val(WidgetLayout.TwoColumnTwoThird);
// set column 1 - columns, first one
$("fieldset:eq(2) select:eq(1)", parent).val("Column");
// set column 2
$("fieldset:eq(2) select:eq(2)", parent).val("Column");
// submit
$("form", parent).submit();