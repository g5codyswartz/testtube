
var parent;

// filtering is an optional step

var clws = $(".btn-view")
.filter(function(i,e) {
    parent = $(e).parents(".location");
    return $(".status-label", parent).text().trim() != "Deleted";
})
.map(function(i,e){
    return $(e).attr("href");
})
.get(); // return just the data, not jquery

console.log(clws);
copy(clws);

