var modal = $("#modal");
var inStorePrice = $("input[name=storage-unit-in_store_price]", modal);
var webPrice = $("input[name=storage-unit-web_price]", modal);
inStorePrice.val(webPrice.val());
$(".btn-save", modal).click();