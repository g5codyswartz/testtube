/*
    TODO: 
    [x] when searching convert everything to lowercase for the search
*/
// Wrap the singleton up :'(
//  Got away from prototyping :P 
var SelectFilter = function(select) {
    var obj = {
        selectId: null,
        locationList: null,
        locations: null,
        searchBox: null,
        
        init: function(select) {
            this.selectId = select;
            this.locationList = $(select);
            this.locations = this.locationList.find("option");
            this.searchBox = $(".filter-locations-search[data-selectId]");
            
            this.addSearchBox();
        },
        addSearchBox: function() {
            if (this.searchBox.length === 0)
            {
                var label = "<label>Filter</label>";
                var input = "<input class='filter-locations-search'>";
                var searchBox = $(label+" "+input);
                searchBox.data('selectId', this.selectId);
                searchBox.on('input', function(e) { this.filterResultsEvent(e); }.bind(this));
                this.locationList.before(searchBox);
            }
        },
        filterResultsEvent: function(e) {
            var val = $(e.srcElement).val();
            this.filterResults(val);
        },
        filterResults: function(toFilter) {
            toFilter = toFilter.toLowerCase();
            $(this.locations).each(function(i, el) {
                var jEl = $(el);
                var text = jEl.text().toLowerCase();
                jEl.css("display", (text.indexOf(toFilter) > -1) ? "block" : "none");
            });
            //console.log(toFilter);
        }
    }
    
    obj.init(select);
};

// Source Locations
new SelectFilter("#source_location");

// Target Locations
new SelectFilter("#target_location_ids");


//////////////////////////////////////////////////////////////////////
// Tried this from Steve, but no luck for the functions

var obj = {
    selectId: null,
    locationList: null,
    locations: null,
    searchBox: null,
    
    init: function(select) {
        this.selectId = select;
        this.locationList = $(select);
        this.locations = this.locationList.find("option");
        this.searchBox = $(".filter-locations-search[data-selectId]");
        
        this.addSearchBox();
        return this;
    },
    addSearchBox: function() {
        if (this.searchBox.length === 0)
        {
            var label = "<label>Filter</label>";
            var input = "<input class='filter-locations-search'>";
            var searchBox = $(label+" "+input);
            searchBox.data('selectId', this.selectId);
            searchBox.on('input', function(e) { this.filterResultsEvent(e); }.bind(this));
            this.locationList.before(searchBox);
        }
    },
    filterResultsEvent: function(e) {
        var val = $(e.srcElement).val();
        this.filterResults(val);
    },
    filterResults: function(toFilter) {
        toFilter = toFilter.toLowerCase();
        $(this.locations).each(function(i, el) {
            var jEl = $(el);
            var text = jEl.text().toLowerCase();
            jEl.css("display", (text.indexOf(toFilter) > -1) ? "block" : "none");
        });
        //console.log(toFilter);
    }
}

var test1 = new obj.init("#source_location");
var test2 = new obj.init("#target_location_ids");