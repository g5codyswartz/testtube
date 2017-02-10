var parent;
// Get page slugs
var base = $(".btn-preview").attr("href");
var pageSlugs = $(".btn-preview").filter(function(i,e){
    //debugger;
    parent = $(e).parents(".card-container");
    return !$(".card-head", parent).hasClass("disabled");
}).map(function(i,e){
    return $(e).attr("href").split(base)[1]; 
}).get();

console.log(pageSlugs);
copy(pageSlugs);
