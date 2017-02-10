
var parent;
var filtered = $(".btn.deploy").filter(function(i, e) {
    
    // check if live
    parent = $(e).parent().parent();
    return $("div.faux-table-cell.status", parent).text().trim() == "Live";
    
});
filtered.click();



// Deploy all
$(".btn.deploy").click();