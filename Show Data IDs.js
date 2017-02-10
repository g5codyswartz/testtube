
// On Page Editor
var ShowDataIDs = {
    iframe: null,
    widgets: null,
    
    init: function() {
        console.log("init");
        this.iframe = $($("iframe.ember-view").contents());
        this.widgets = this.iframe.find(".widget[data-id]");
        
        this.addCSS(".widget {border: 1px dashed rgba(255,0,0,.5);}");
        this.addCSS(".widget .data-id-display {background: black; color: red;}");
        this.display();
    },
    display: function() {
        this.widgets.each(function(i, el){
            // Add only if it doesn't exist yet
            if ($(".data-id-display", el).length === 0)
            {
                this.initDataIdDisplay($(el))
            }
        }.bind(this));
    },
    initDataIdDisplay: function(jEl){
        var dataId = jEl.attr("data-id");
        var dataIdEl = $("<div class='data-id-display'>"+dataId+"</div>")
        jEl.append(dataIdEl);
    },
    addCSS: function(cssStyles) {
    	$("<style>"+cssStyles+"</style>").appendTo($("head", this.iframe));
    }
    
};

ShowDataIDs.init();

// On Pages Page
var ShowDataIDs = {
    elements: null,
    
    init: function() {
        console.log("init");
        this.elements = $(".form-field.col-widgets a[data-widget-id]");
        
        this.display();
    },
    display: function() {
        this.elements.each(function(i, el){
            // Add only if it doesn't exist yet
            if ($(el).text().indexOf("ID: ") === -1)
            {
                this.initDataIdDisplay($(el))
            }
        }.bind(this));
    },
    initDataIdDisplay: function(jEl){
        var id = jEl.data('widget-id');
        var small = jEl.find('small');
        small.text("(Edit) ID: "+id);
    },
    // Unused
    addCSS: function(cssStyles) {
    	$("<style>"+cssStyles+"</style>").appendTo($("head", this.iframe));
    }
    
};

ShowDataIDs.init();