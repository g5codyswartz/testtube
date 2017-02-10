
// gather elements
var newsServiceDomain = $(".modal-body input[type=text]:eq(1)");
var amountOfPosts = $(".modal-body input[type=number]:eq(0)");
var headingText = $(".modal-body input[type=text]:eq(2)");
var newsPageSelect = $(".modal-body select:eq(0)");
var newsPageVal = $(".modal-body option[value*=news]").val();
var buttonBackgroundColor = $(".modal-body input[type=text]:eq(3)");

// set values
newsServiceDomain.val("g5-cl-53cq4vlra-storquest-self-storage");
amountOfPosts.val(1);
headingText.val("<strong>Storquest</strong> Blog");
newsPageSelect.val(newsPageVal);
buttonBackgroundColor.val("#e1261c");

// submit/save
$(".modal-body form").submit();