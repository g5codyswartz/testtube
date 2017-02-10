// https://gist.github.com/g5codyswartz/3a39448d5919588fb5627ca0344fd4da

var authors = {};
var author;
$(".author_cell").each(function(i,e) { 
    author = $(e).text().trim();
    if (!authors.hasOwnProperty(author)) authors[author] = 0;
    authors[author]++
});

// http://jsfiddle.net/lalatino/mcuzr/
function sortObject(obj) {
    var arr = [];
    var prop;
    for (prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            arr.push({
                'key': prop,
                'value': obj[prop]
            });
        }
    }
    arr.sort(function(a, b) {
        return b.value - a.value;
    });
    return arr; // returns array
}

authors = sortObject(authors);

function keyValueizer(obj) {
    var newObj = {};
    
    obj.forEach(function(k,v) {
        newObj[k['key']] = k['value'];
    });
    
    return newObj;
}

authors = keyValueizer(authors);

console.log(JSON.stringify(authors));

