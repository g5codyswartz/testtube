
// MR Phase 1 Locations
var showLocations1 = [
    "Broadmoor Ridge Apartment Homes",
    "Candlelight Square",
    "Cherry Creek Apartments",
    "Cherry Lane Apartment Homes",
    "Hampton Park Apartment Homes",
    "Indigo Park",
    "Lakeside Casitas Apartment Homes",
    "Lamplight Square at The Park",
    "Mesa Village Apartments",
    "Miramont Apartments",
    "Northpoint at Creekside Apartment Homes",
    "Pinecone Apartments",
    "Platte View Landing",
    "Polo Club Apartments",
    "Renaissance Apartment Homes",
    "Resort at University Park",
    "San Mateo Apartment Homes",
    "Sevilla Apartment Homes",
    "Solano Springs Apartment Homes",
    "Spring Park Apartments",
    "Spyglass Hill Apartment Homes",
    "The Pearl at Spring Creek",
    //"Wyndhaven at Wells Branch"
];

// MR Phase 2 Locations
var showLocations2 = [
    "Axis at 739",
    "Bradford Park Apartments",
    "Edgewood Park Apartments",
    "Greenspoint at Paradise Valley",
    "Highland Woods Apartment Homes",
    "Las Kivas Apartments",
    "Los Arboles Apartments",
    "Mesa Royale",
    "Monterra Townhomes",
    "Mountain View Apartment Homes",
    "Parktown Townhomes",
    "Providence Landing Apartments",
    "Seven65 Lofts",
    "Sierra Sun",
    "Signature Point Apartments",
//    "Sorrento Apartments",
    "Starrview at Starr Pass",
    "The Arbors at 5th Apartments",
    "The Boulders at Mountlake Apartment Homes",
    "The Gate at Canyon Ridge",
    "The Knolls at Sweetgrass Apartment Homes",
    "The Links at High Resort",
    "The Village at Raintree Apartments",
    "Ventana Canyon Apartments",
    "Village at Desert Lakes"
];

// MR Phase 3 Locations
var showLocations3 = [
    "Adagio Apartments",
    "Arches at Oracle Apartments",
    "Maybeck at the Bend",
    "Bella Vida Apartments",
    "Bordeaux Apartment Homes",
    "Brittany Lane Apartments",
    "Copperstone Apartment Homes",
    "Fountains at Steeplechase Apartments",
    "Fox Creek Apartments",
    "Gateway on Gilbert Apartments",
    "Marketplace Apartments",
    "Miro at the Parc",
    "Overlook at Sunset Point",
    "Seasons at Pebble Creek",
    "Selway Apartments",
    "Sunnyside Place",
    "The Enclave at Paradise Valley",
    "The Lodge at McCarran Ranch Apartment Homes",
    "The Pavilions at Silver Sage",
    "The Preserve at Mesa Hills",
    "The Retreat at Maple Hill",
    "Tropicana Springs Apartments",
    "Windgate at Bountiful"
];


// StorQuest
showLocations1 = [
    1001,
    1032,
    8001,
    1008,
    1010,
    1018,
    1023,
    8004,
    1027
];

showLocations2 = [
    1033,
    1037,
    1014,
    1029,
    1034,
    1017,
    1016,
    8007,
    1005,
    1025,
    1015,
    8000,
    9000,
    8005,
    1041,
    9010,
    9011,
    1045,
    1047,
    9003,
    1048,
    9005,
    9006,
    1064
];

showLocations3 = [
    "Area",
    1049,
    1052,
    9007,
    9034,
    9036,
    1044,
    9015,
    9017,
    9024,
    9077,
    9012,
    1054,
    1055,
    1056,
    1058,
    1059,
    1060,
    1061,
    9090,
    9089,
    9087,
    9086,
    9039,
    1063
];

var showLocations4 = [
    1028,
    1026,
    1012,
    1013,
    1004,
    1007,
    1009,
    1002,
    1035,
    1040,
    1042,
    9053,
    1046,
    1051,
    9081,
    1050,
    9004,
    9008,
    9009,
    9057,
    1043,
    9078,
    9091,
    9088,
    1065
];

var showLocations = [];// showLocations1;//showLocations2.concat(showLocations3);

var phaseNumber = prompt("Enter a Mission Rock phase: 1, 2, or 4(for phase 3) "+
    "You can also add the numers together to combine them. IE: 2+4 = 6 for phase 2 and 3");
while(phaseNumber < 1 || phaseNumber > 15)
{
    phaseNumber = prompt("Enter a Mission Rock phase: 1, 2, or 4(for phase 3) "+
    "You can also add the numers together to combine them. IE: 2+4 = 6 for phase 2 and 3");
}

if ((phaseNumber&1) == 1)
    showLocations = showLocations.concat(showLocations1);
if ((phaseNumber&2) == 2)
    showLocations = showLocations.concat(showLocations2);
if ((phaseNumber&4) == 4)
    showLocations = showLocations.concat(showLocations3);
if ((phaseNumber&8) == 8)
    showLocations = showLocations.concat(showLocations4);

// http://priteshgupta.com/2012/04/handy-collection-of-javascript-prototypes/
String.prototype.left = function(n) {
        return this.substr(0,n);
};
String.prototype.right = function(n) {
        return this.substr((this.length-n),this.length);
};


$(".faux-table-body li div.name").each(function(i, el){
    
    // Hide all
    $(el).parent().css('display', 'none');
    
    // show if matching
    var name = $(el).contents()[2].textContent;
    var name2 = ($(el).contents()[5] === undefined) ? "" : $(el).contents()[5].textContent;
    
    console.log($(el).contents());
    
    if (typeof name === "string")
    {
        console.log(name);
        name = name.right(4);
        name2 = name2.right(4);
        
        console.log(name);
        
        if ($.inArray(parseInt(name), showLocations) > -1 || 
            $.inArray(parseInt(name2), showLocations) > -1)
        {
            $(this).parent().css('display', 'table-row');
        }
    }
    else
        console.log($(el).contents());
});


/*
$(".faux-table-body li div.name").each(function(){
    //console.log($(this).text().trim());
    if ($.inArray($(this).text().trim(), showLocations) == -1)
        $(this).parent().css('display', 'none');
});
*/

// http://stackoverflow.com/questions/7831712/jquery-sort-divs-by-innerhtml-of-children
function sortUsingNestedText(parent, childSelector, keySelector) {
    var items = parent.children(childSelector).sort(function(a, b) {
        var vA = $(keySelector, a).text();
        var vB = $(keySelector, b).text();
        return (vA < vB) ? -1 : (vA > vB) ? 1 : 0;
    });
    parent.append(items);
}

sortUsingNestedText($(".faux-table-body"), "li", "div:first-child");