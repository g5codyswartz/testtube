
var parent;

// filtering is an optional step

var names = $(".location .name")
.filter(function(i,e) {
    parent = $(e).parents(".location");
    return $(".status-label", parent).text().trim() != "Deleted";
})
.map(function(i,e){
    //console.log(e);
    return $(e).contents()[2].nodeValue;
})
.get(); // return just the data, not jquery

console.log(names);
copy(names);

