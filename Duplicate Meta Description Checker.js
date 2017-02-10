

var DuplicateMetaDescriptionChecker = {
	
	metas: {},
	metaJEls: [], // collection of meta jQuery elements
	harvestQueue: [],
	missingMeta: [],
	jCards: null,
	
	init: function() {
		
		this.jCards = $(".cards .card");
		
		this.collectMeta();
		this.harvestMetaData();
		this.findMissingMeta();
	},
	findMissingMeta: function() {
		this.missingMeta = $.grep(this.jCards, function(e, i) {
			
		}, );
	},
	collectMeta: function() {
		this.metaJEls = $(".card-body img[src*=meta-description]", this.jCards);
		return this.metaJEls.length;
	},
	harvestMetaData: function() {
		this.populateHarvestQueue(this.doHarvestQueue.bind(this));
	},
	populateHarvestQueue: function(callback) {
		this.harvestQueue = $.map(this.metaJEls, function(el, i) {
			return $(el).parent().data("id");
		});
		if (callback !== undefined)
		{
			callback();
		}
	},
	doHarvestQueue: function() {
		
		if (this.harvestQueue.length > 0)
		{
			var widgetId = this.getNextHarvestItem();
			
			$.ajax({
				method: "GET", 
				url: "/widgets/"+widgetId+"/edit",
				success: function(data, status, xhr) {
					//console.log("Success, Status: "+status);
					//console.log(data);
					//console.log(xhr);
					
					var responseHtml = $(data);
					
					var description = responseHtml.filter("form").find(".form-field-meta-description input[type=text]").val();
					
					this.addMeta(widgetId, description);
					
					// Process the next in line
					this.doHarvestQueue();
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
		}
		else
		{
			// todo fire finished event/job
			return false;
		}
	},
	getNextHarvestItem: function() {
		return this.harvestQueue.pop();
	},
	addMeta: function(widgetId, meta) {
		if (!this.hasMeta(meta))
		{
			this.addMetaKey(meta);
		}
		this.metas[meta].push(widgetId);
	},
	addMetaKey: function(meta) {
		this.metas[meta] = new Array();
	},
	hasMeta: function(meta) {
		return meta in this.metas;
	},
	hasDuplicates: function() {
		// use filter to check array count
		return this.getDuplicates().length > 0;
	},
	getDuplicates: function() {
		return $.grep(Object.keys(this.metas), function(n, i) {
			return this.metas[n].length > 1;
		}.bind(this));
	},
	hasEmptyMeta: function() {
		return "" in this.metas;
	},
	getEmptyMeta: function() {
		if (this.hasEmptyMeta())
		{
			return this.metas[""];
		}
		else
		{
			return [];
		}
	},
	report: function() {
		
		var duplicates = this.getDuplicates();
		
		var sb = 	"=== Meta Data Report ===\n"+
					"Missing: "+this.missingMeta.length+"\n"+
					"Duplicates: "+duplicates.length+"\n"+
					"Empty: "+this.getEmptyMeta().length;
		
		if (this.missingMeta.length === 0 && this.duplicates.length === 0 )
		{
			sb += "=== Perfect! ===";
		}
		else
		{
			sb += "=== Check the console log for more info ===";
			console.log("Missing");
			console.log(this.missingMeta);
			console.log("Duplicates");
			console.log(duplicates);
			
		}
		
		alert(sb);
	},
	getDuplicatesReport: function() {
		var sb = "";
		
		
		
	},
	
	
	// internal Class
	WidgetInfo: {
		initNew: function(widgetId) {
			var page = this.WidgetIdPageName.getName(widgetId);
			return {
				widgetId: widgetId,
				name: "",
				type: "",
				pageName: page
			};
		},
		WidgetIdPageName: {
			cache: {},
			
			// public
			getName: function(widgetId) {
				if (widgetId in this.cache)
				{
					return this.cache[widgetId];
				}
				else 
				{
					return this.harvestName(widgetId);
				}
			},
			// private
			harvestName: function(widgetId) {
				var parent = $("[data-id="+widgetId+"]").closest(".card-container");
				var name = $(".card-head", parent).text().trim()
				
				this.cache[widgetId] = name;
				return name;
			}
			
		}
	}
	
}

DuplicateMetaDescriptionChecker.init();