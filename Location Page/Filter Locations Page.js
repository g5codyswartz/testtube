
var status;
var locs = $(".faux-table-body>.location").filter(function(i,e) {
    status = $(".status", e).text().trim();
    if (status != "Deleted")
    {
        return true;
    }
});

var clws = locs.map(function(i,e) {
   return $(".actions>a:eq(1)", e).attr('href');
});