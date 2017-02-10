
var Requester = {
    widget: function(widgetId, success, error, complete) {
        $.ajax({
    		method: "GET", 
    		url: "/widgets/"+widgetId+"/edit",
    		success: success.bind(this),
    		error: error.bind(this),
    		complete: complete.bind(this)
    	});
    }
}

var Gatherer = {
    pages: function() {
        
    }
}

function Page(name, widgets) {
    this.name = name;
    this.widgets = [];
    
    this.addWidget = function(widget) {
        this.widgets.push(widget);
    }
}

function Widget(id) {
    this.id = id;
    
    this.getName = function() {
        
    }
}