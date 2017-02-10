/* global $ */
var uniqueWork = $(".table tbody:eq(1) tr").map(function(i, e) {
    var program = $("td:eq(1)", e).text();
    var project = $("td:eq(2)", e).text();
    return `${program} - ${project}`;
}).get().reduce(function(prev, cur) {
    prev[cur] = prev.hasOwnProperty(cur) ? ++prev[cur] : 1;
    return prev;
}, {});

// http://stackoverflow.com/questions/6857468/converting-a-js-object-to-an-array
Object.prototype.toArray = function() {
    return Object.keys(this).map(function(e, i) {
        var ret = {};
        ret[e] = this[e];
        return ret;
    }.bind(this));
}

// http://stackoverflow.com/questions/1069666/sorting-javascript-object-by-property-value
JSON.stringify(uniqueWork.toArray().sort(function(a, b) {
    return a[Object.keys(a)[0]] < b[Object.keys(b)[0]];
}), null, "  ");
