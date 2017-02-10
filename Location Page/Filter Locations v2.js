var locations = [
"Cypress Point",
"Embassy Apartments",
"The Arbor",
"The Crossroads",
"The Diplomat",
"The Enclave",
"The Esplanade",
"The Excelsior",
"The Hallmark",
"The Newporter",
]

var name;

// get list items
var lis = $(".faux-table-body li");
// hide them
lis.hide();
// show matching items
$(".faux-table-body li").filter(function(i,e) {
    //console.log(e,i);
    name = $(".name", e).contents()[2].textContent;//.trim();
    //console.log(name);
    return locations.indexOf(name) > -1;
}).show();
