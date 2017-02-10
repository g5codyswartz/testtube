
// To be ran from the pages page
var GatherWidgetIds = {
    
    indexPos: null,
    widgets: null,
    ids: [],
    
    init: function(indexPos) {
        this.indexPos = indexPos;
        this.widgets = $(".cards .card .card-body .widgets li.widget:nth-child("+indexPos+")");
        
        // truncate for testing
        // http://dvolvr.davidwaterston.com/2013/06/09/restating-the-obvious-the-fastest-way-to-truncate-an-array-in-javascript/
        //this.widgets.length = 3;
        
        this.setNotStarted();
        this.startGather();
    },
    setNotStarted: function() {
        this.widgets.each(function(i, el){
            $(el).data('finished', 'false');
        }).bind(this);
    },
    getNextWidget: function() {
        var widgets = this.widgets.filter(function(i){
            return $(this).data("finished") === "false";
        });
        
        if (widgets.length > 0)
        {
            return widgets[0];
        }
        else
        {
            return false;
        }
    },
    startGather: function() {
        var nextWidget = this.getNextWidget();
        if (nextWidget)
        {
            this.doNext(nextWidget);
        }
        else
        {
            console.log("Nothing found to start with :(");
        }
    }, 
    doNext: function(nextWidget) {
        if (nextWidget)
        {
            var widgetId = this.getWidgetId(nextWidget);
            
            console.log("Requesting Next Widget: "+widgetId);
            
            this.doRequest(widgetId);
            this.setFinished(nextWidget);
        }
        else
        {
            // Finished
            this.finished();
            return false;
        }
    },
    doRequest: function(widgetId) {
        $.ajax({
            method: "GET", 
            url: "/widgets/"+widgetId+"/edit",
            success: function(data, status, xhr) {
                //console.log("Success, Status: "+status);
                //console.log(data);
                //console.log(xhr);
                
                // todo grab ids & push this.ids
                //".form-field.col-widgets a[data-widget-id]"
                var responseHtml = $(xhr.responseText);
                $(".form-field.col-widgets a[data-widget-id][data-widget-name='Photo']", responseHtml).each(function(i, el) {
                    var widgetId = $(el).data('widget-id');
                    this.ids.push(widgetId);
                }.bind(this));
                
                var nextWidget = this.getNextWidget();
                this.doNext(nextWidget);
            }.bind(this),
            error: function(xhr, status, error) {
                console.log("Error: "+error+" Status: "+status);
                console.log(xhr);
            }.bind(this),
            complete: function(xhr, status) {
                //console.log("Complete, Status: "+status);
                //console.log(xhr);
            }.bind(this)
        });
    },
    finished: function() {
        var ids = this.ids;
        if (ids.guid !== undefined)
        {
            delete ids.guid;
        }
        console.log(ids);
    },
    getWidgetId: function(widget) {
        return $(widget).data("id");
    },
    setFinished: function(widget) {
        $(widget).data("finished", "true");
    }
    
    
}

/*Function.prototype.bind = function(scope) {
  var _function = this;

  return function() {
    return _function.apply(scope, arguments);
  }
}*/

GatherWidgetIds.init(2);