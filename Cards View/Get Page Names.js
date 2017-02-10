var parent;
// Get page names
var temp;
var pages = $(".front .card-head h3").filter(function(i,e){
    parent = $(e).parents(".card-container");
    return !$(".card-head", parent).hasClass("disabled");
}).map(function(i,e){
    temp = $(e).text().split("Page Setting")[0].trim();
    if (temp.indexOf("\n") > -1)
    {
        temp = temp.split("\n")[0];
    }
    return temp; 
}).get();

console.log(pages);
copy(pages);

