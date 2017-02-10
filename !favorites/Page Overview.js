/*
		Name: Page Overview - orignally "Auto Widget Namer"
		Author: Cody Swartz
		
		Lots of widgets to test with: 
			https://g5-cms-ia5tywen-byron-single-d.herokuapp.com/website/3/pre-defined-rows/edit
			https://g5-cms-ia5tywen-byron-single-d.herokuapp.com/frankensite/pre-defined-rows/edit
		
		Todo / Ideas
		
		5/26/2016
		 - Popout window, talking back to your parent: 
		 	- http://stackoverflow.com/questions/9276086/popup-window-to-return-data-to-parent-on-close
		
		5/4/2016
		- external window ? external modals? multiple modals? 
		- static header, with collapse that stacks icons/buttons
		- !!! if a load is pending from a submit/modal save smart reload when another modal opens up ;) 
		- close button, or maybe better hiding; maybe something like rocket dock?
		- settings could be nice like having it auto-refresh and auto show on refresh
		
		- Add button to the modal that says "Save & Reload" or maybe for UX "Save Without Reloading"
		- Text preview of widget/section
		- When on the cards page display the page name at the top of the overviewer
		- Hide jump button on cards view
		- Allow for local storage config to enable/disable refresh on save FOR page edit mode
		- Add Exit & refresh preview to overview
		
		- Check for page navigation
		- Cache Pages
		- Displays widgets not in a column - if they are top level in a content stripe
		- Update on iframe refresh - will have to have a snazzy watcher surely
		
		v2.3 - 4/4/2016
		 - Auto updates the UI when preview refrehes
		
		v2.2 - 3/25/2016
		- added reload button
		- fixed some issues with css adding up and not being removed when reinitiating 
		
		v2.1 - 3/4/2016
		- Adds color status to the cog on the cards view Previewer - red = fail, green = success - 
		
		v2.0
		- Adds cards page overview
		- Fixes modal saving issues
		
		v1.2
		- Hovering widgets shows the data id via title attribute
		- Fixed a couple of scope issues cause by the OO refactor
		
		v1.1 - Code Refactor - 2/5/2016
		- Made the code more object oriented, but not completely name spaced
		
		v1.0 - Initial Release - 2/4/2016
		- Displays an overview of the page which allows you to edit any widget, column, or content stripe.
		- Clicking the check at the top right will hide/show the pane.
		- The checkmark will becoming a spazmatic loading icon while loading a widget.
		
*/

/* global $ */
var knownWidgetClasses = {
	"action-calls": "Calls To Action",
	"corporate-map": "Corporate Locations Map",
	"floorplans-cards": "Floor Plans Cards",
	"g5-enhanced-form": "Apply Form",
	"self-storage-iui-cards": "Self Storage IUI Cards v2",
	"home-multifamily-iui": "Multifamily IUI Home",
	"phone": "Phone Number", // phone-number
	"mini-news-feed-widget": "Mini News Feed", // mini-news-feed
	"news-tags-widget": "News Tags", //news-tags

	"analytics": "Analytics",
	"bluemoon": "Bluemoon",
	"brochure-form": "Brochure Form",
	"button": "Button",
	"css-override": "CSS Override",
	"call-outs": "Call Outs",
	"city-state-zip-search": "City State Zip Search",
	"column": "Column",
	"comarketing": "Comarketing",
	"contact-form": "Contact Form",
	"contact-info": "Contact Info",
	"contact-info-sheet": "Contact Info Sheet",
	"content-stripe": "Content Stripe",
	"coupon": "Coupon",
	"directions": "Directions",
	"directory": "Directory",
	"events": "Events",
	"featured-properties": "Featured Properties",
	"floor-plans": "Floor Plans",
	"footer-info": "Footer Info",
	"gallery": "Gallery",
	"gallery-basic": "Gallery Basic",
	"google-translate": "Google Translate",
	"html": "HTML",
	"hold-unit-form": "Hold Unit Form",
	"hours": "Hours",
	"lead-form": "Lead Form",
	"locations-navigation": "Locations Navigation",
	"logo": "Logo",
	"map": "Map",
	"meta": "Meta",
	"meta-description": "Meta Description",
	"multifamily-iui-cards": "Multifamily IUI Cards",
	"multifamily-mini-search": "Multifamily Mini Search",
	"multifamily-search": "Multifamily Search",
	"navigation": "Navigation",
	"navigation-v2": "Navigation V2",
	"news-feed": "News Feed",
	"pdf-embed": "PDF Embed",
	"photo": "Photo",
	"photo-group": "Photo Group",
	"photo-randomizer": "Photo Randomizer",
	"promoted-reviews": "Promoted Reviews",
	"quote": "Quote",
	"real-page": "Real Page",
	"request-info-form": "Request Info Form",
	"review-form": "Review Form",
	"ss-featured-unit-categories": "SS Featured Unit Categories",
	"self-storage-filtered": "Self Storage Filtered",
	"self-storage-iui-filtered": "Self Storage IUI Filtered",
	"self-storage-search": "Self Storage Search",
	"self-storage-search-home": "Self Storage Search Home",
	"service-request-form": "Service Request Form",
	"social-feed": "Social Feed",
	"social-links": "Social Links",
	"suggestion-form": "Suggestion Form",
	"tell-a-friend": "Tell a friend",
	"tour-form": "Tour Form",
	"typekit": "Typekit",
	"video": "Video",
	"walkscore": "Walkscore"
}

var colLayouts = {
	"row-single": "100%",
	"row-halves": "50%",
	"row-uneven-thirds-1": ["33.33%", "66.66%"],
	"row-uneven-thirds-2": ["66.66%", "33.33%"],
	"row-thirds": "33.33%",
	"row-quarters": "25%"
};

// Tools.OpenModalURL("https://g5-cms-iedcpw65-the-william-wa.herokuapp.com/widgets/20669/edit");
var Tools = {
	// Open Modal, stripped from cms.js - pattern: openModal: function(e) {
	/*global CKEDITOR */
	n: window,
	OpenModal: function(e) {
		var t, a, r, d;
		return r = this.n.$("#modal"),
			d = r.find(".modal-body"), console.log(d),
			d.html(e.html),
			this.n.$("#ckeditor").length >= 1 && CKEDITOR.replace("ckeditor"),
			a = r.find(".modal-footer .go-back"),
			t = d.find(".go-back"),
			t.length ? a.show() : a.hide(),
			this.n.$.fn.modal.Constructor.prototype.enforceFocus = function() {
				return Tools.n.$(document).on("shown.bs.modal", function(e) {
					return function(t) {
						var a;
						return a = Tools.n.$(t.target.parentNode),
							e.$element[0] === t.target || e.$element.has(t.target).length || a.hasClass("cke_dialog_ui_input_select") || a.hasClass("cke_dialog_ui_input_text") ? void 0 : e.$element.focus()
					}
				}(this))
			},
			r.modal(),
			d.css({
				scrollTop: 0
			}),
			d.find(".edit_widget").submit(function(e) {
				return function() {
					//debugger;
					var t;
					t = Tools.n.$("#ckeditor");
					t.length >= 1 && t.val(CKEDITOR.instances.ckeditor.getData());
					Tools.SaveEditForm();
						
					return false;
				}
			}(this)), !1
	},
	// Required for OpenModal - pattern: saveEditForm: function() {
	SaveEditForm: function() {
		//debugger;
    var e, t;
    return e = this.n.$("#modal"),
    t = e.find(".modal-body"),
    $.ajax({
      url: t.find(".edit_widget").attr("action"),//this.locationOrigin() + t.find(".edit_widget").attr("action"),
      type: "PUT",
      dataType: "json",
      data: t.find(".edit_widget").serialize(),
      success: function(t) {
        return function() {
          var t;
          // todo Allow for local storage config to enable/disable refresh on save FOR page edit mode
          return e.modal("hide")//,
          //t = Tools.n.$(".preview iframe").prop("src"),
          //Tools.n.$("iframe").prop("src", t)
        }
      }(this),
      error: function(t) {
        return function(a) {
          return 204 === a.status ? e.modal("hide") : a.responseText.length ? t.insertErrorMessages($.parseJSON(a.responseText)) : t.insertErrorMessages({
            errors: {
              base: ["There was a problem saving the widget"]
            }
          })
        }
      }(this)
    })
  },
	OpenModalURL: function(url) {
		var spinner = new Tools.Loader.new("myLoader", 50);
		var success = function(e) {
			spinner.stop();
			return Tools.OpenModal(e);
		}
		var fail = function(e) {
			spinner.stop("FAIL");
			console.log("failed!");
		};
		$.ajax({
			url: url,
			success: success,
			dataType: "json",
			error: fail
				/*,
										complete: function(e, status) {
												console.log("Complete", e, status);
										}*/
		});
	},
	addCSS: function(prefix, cssStyles) {
		var prefix = 'css-'+prefix+"-";
		var rndId = Tools.getRandomId(prefix);
		$("<style id='"+prefix+rndId+"'>" + cssStyles + "</style>").appendTo("head");
		return rndId;
	},
	removePreviousInjectedCSS: function(prefix) {
    $('[id^="css-'+prefix+'-"]').remove();
  },
	findClass: function(e, collection) {
		// http://stackoverflow.com/questions/1227286/get-class-list-for-element-with-jquery
		var classes = e.attr("class").split(/\s+/);
		var ret = {};
		//console.log(classes);
		classes.filter(function(e, i) {
			//console.log(e, i, collection.hasOwnProperty(e));
			return collection.hasOwnProperty(e);
		}).forEach(function(e, i) {
			ret[e] = collection[e];
			//console.log(ret);
			//return ret;
		});


		if (Object.keys(ret).length == 0) {
			console.log("Found Nothing For", e);
		}

		//console.log(ret);
		return ret;
	},
	Loader: {
		targetEl: null,
		new: function(el, delay) {
			if (typeof el === "string")
				el = document.getElementById(el);
			if (!el)
				return;
			this.targetEl = el;
			delay = delay || 100;
			var chars = "|/-\\".split("");
			var i = 0;
			var timer = setInterval(function() {
				el.innerHTML = chars[i++ % chars.length];
			}, delay);
			// public method to stop the animation
			this.stop = function(message) {
				this.targetEl.innerHTML = message ? message : "√";
				clearInterval(timer);
			}
		}
	},
	// http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
	getRandomInt: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
	},
	getRandomId: function(prefix) {
		prefix = prefix == undefined ? '' : prefix;
		var rnd;
		do
		{
			rnd = this.getRandomInt(100,999);
		}
		while ($('#'+prefix+rnd).length > 0)
		return prefix+rnd;
	}
	
}

var Events = {
	jumpToEl: function(e) {
		var dataId = $(this).attr("data-id");
		console.log("DATA ID", dataId);
		$("body", PageOverview.Globals.src()).animate({
			scrollTop: $("[data-id=" + dataId + "]", PageOverview.Globals.src()).offset().top
		}, 500);
	},
	editWidget: function(e) {
		var widgetId = $(this).attr('data-id');
		Tools.OpenModalURL("/widgets/" + widgetId + "/edit");
		console.log("EDIT WIDGET", widgetId);
	},
	collapser: function(e) {
		var jEl = $(this);
		var parent = jEl.parent().parent();
		if (parent.hasClass('closed')) {
			parent.removeClass('closed');
		}
		else {
			parent.addClass('closed');
		}
	},
	refresh: function(e) {
		if (Tests.isEditPage()) {
			var frame = $("iframe.ember-view"); 
			frame.attr("src", frame.attr("src"));
		}
	},
	iframeRefresh: function() {
		$("iframe.ember-view").load(function() {
			PageOverview.init();
		});
	},
	OverViewer: {
		overviewerClick: function(e) {
			//console.log("hello world", e, this);
			var jEl = $(this);
			var parent = jEl.parents(".card")[0];
			var previewButton = $(".btn-preview", parent);
			var previewUrl = previewButton.attr("href");
			var settingsGear = $(".card-corner", parent);
			
			// add loading class - start spinner 
			settingsGear.addClass("loading");
			// remove any other success classes
			$(".card-corner").removeClass("success");
			
			$.ajax({
				url: previewUrl,
				success: function(src){ Events.OverViewer.ajaxSuccess(src, parent); },
				//dataType: "json",
				error: Events.OverViewer.ajaxError
					/*,
											complete: function(e, status) {
													console.log("Complete", e, status);
											}*/
			});
			
			/* Todo
				x	Grab parent of: this
				x	Get preview URL 
				x	AJAX preview URL
					Feed success src over to PageOverview.DisplayWidgets()
					Display in proper area
					Maybe collapse, or just reload or just reload on expand
					
				x	Display loader/spinner on ajax request
			*/
		},
		ajaxSuccess: function(src, parent) {
			var settingsGear = $(".card-corner", parent);
			// stop spinner
			settingsGear.removeClass("loading");
			settingsGear.addClass("success");
			
			var data = PageOverview.GetData(src);
			PageOverview.DisplayWidgets(data);
		},
		ajaxError: function(e) {
			console.log("ERROR LOADING PREVIEW", e);
			
			var settingsGear = $(".card-corner", parent);
			// stop spinner
			settingsGear.removeClass("loading");
			settingsGear.addClass("error");
			
		}
	}
}

var Template = {
	getEditJump: function(item) {
		//return    "<span class='my-btn edit' data-id='"+item.dataId+"'>e</span>" + 
		return "<span class='my-btn jump' data-id='" + item.dataId + "'>&#8620;</span>";
	}
}

var Globals = {
	
}

var PageOverview = {
	
	iframeRefreshSet: false,
	Globals: {
		frame: $(".builder.preview iframe"),
		src: function() { 
			return (this.frame.contents().length === 0) ? $(document) : this.frame.contents();
		}
	},
	
	init: function() {
		if (Tests.isEditPage()) {
			// Display Page Overview for the given page
			PageOverview.DisplayWidgets(PageOverview.GetData());
			
			// Add Events
			if (!this.iframeRefreshSet)
			{
				Events.iframeRefresh(); this.iframeRefreshSet = true;
			}
		}
		else if (Tests.isCardsPage()) {
			// Add Buttons to Cards
			UI.addCardsButtons();
		}
	},
	
	DisplayWidgets: function(data) {

		Tools.addCSS("page-overview",
			"#widgetLayout { position: fixed; left: 10px; bottom: 0px; z-index: 1045; " +
				"max-width: 400px; max-height: 100%; box-sizing: border-box; overflow-x: hidden; " +
				"overflow-y: auto; " +
				"background-color: rgba(255,255,255,.8); border: 3px solid rgba(0,0,0,.4); width: 400px; } " +
			"#widgetLayout.closed { left: -360px; } " +
			"#widgetLayout h3 { font-size: 14px; margin-bottom: 0px; border-bottom: 1px solid rgba(0,0,0,.4); " +
				"background-color: rgba(0,0,0,.5); color: white; } " +
			"#widgetLayout .wRow>h3 {  } " +
			"#widgetLayout .wRow { background-color: rgba(0,0,0,.2); clear: both; } " +
			"#widgetLayout .wCol { background-color: rgba(255,255,255,.8); display: block; float: left; " +
				"/*border: 10px rgba(255,255,255,.4) solid;*/ box-sizing: border-box; padding: 10px; " +
				"box-shadow: rgba(0, 0, 0, .2) 0px 0px 0px 10px inset; }" +
			"#widgetLayout .wCol>h3 {  } " +
			"#widgetLayout .widget { font-size: 15px; } " +
			"#widgetLayout .widget .widget-icon { width: 20px; height: 20px; vertical-align: sub; padding-right: 4px; font-size: } " +
			"#widgetLayout .my-btn { padding: 0px 2px; background-color: #3699C6; color: white; " +
				"border: 1px solid rgba(0,0,0,0.5); border-radius: 5px; width: 14px; height: 16px; " +
				"letter-spacing: 1px; font-weight: bold; font-size: 12px; text-transform: none; " +
				"display: inline-block; text-align: center; margin: 0 4px; cursor: pointer; }" +
			"#widgetLayout .widgetName { cursor: pointer; }" +
			"#controls { position: absolute; top: 1px; right: 0px; } " +
			"#controls .button { background-color: #3699C6; cursor: pointer; " + 
				"color: white; min-width: 20px; text-align: center; height: 20px; " + 
				"display: inline-block; float: right; margin-right: 5px; }");

		var html = "<div id='widgetLayout'><div id='controls'>"+
			"<span id='myLoader' class='button' style='font-weight: bold;'>√</span>"+
			(Tests.isEditPage() ? "<i class='fa fa-refresh button' style='padding-top: 3px; height: 17px;'></i>" : "")+
			"</div>";
		var colLayout;

		// rows
		data.forEach(function(row, rowi) {
			html += "<div class='wRow " + row.colLayout + "'><h3>" + Template.getEditJump(row) + 
				"<span class='widgetName' data-id='" + row.dataId + "' title='" + row.dataId + "'>Row</span></h3>";
			// columns
			row.cols.forEach(function(col, coli) {
				colLayout = colLayouts[row.colLayout];
				if (typeof colLayout == "object") {
					// grab proper percentage for uneven thirds
					colLayout = colLayout[coli];
				}
				html += "<div class='wCol col-" + (coli + 1) + "' style='width: " + colLayout + "'><h3>" + Template.getEditJump(col) +
					"<span class='widgetName' data-id='" + col.dataId + "' title='" + col.dataId + "'>Column</span></h3>";
				// widgets
				col.widgets.forEach(function(widget, widgeti) {
					// widget
					html += "<div class='widget'>" +
						//"<img class='widget-icon' src='/static/components/widgets/"+widget.shortName+"/images/thumbnail.png'>" +
						Template.getEditJump(widget) + "<span class='widgetName' data-id='" + widget.dataId + "' title='" + widget.dataId + "'>" 
							+ widget.fullName + "</span>" +
						"</div>";
				});
				html += "</div>"; // div.wCol
			});
			html += "</div>"; // div.wRow
		});

		html += "</div>"; // container div#widgetLayout

		// remove any old instances
		var widgetLayoutEl = $("#widgetLayout");
		if (widgetLayoutEl.length > 0) {
			widgetLayoutEl.remove();
		}

		// add the html to the dom
		$("body").append(html);

		// Events
		widgetLayoutEl = $("#widgetLayout");
		$(".widgetName", widgetLayoutEl).click(Events.editWidget);
		$(".my-btn.jump", widgetLayoutEl).click(Events.jumpToEl);
		$("#myLoader", widgetLayoutEl).click(Events.collapser);
		if (Tests.isEditPage()) { $("#controls .fa-refresh").click(Events.refresh); }

		// return html;
	},

	GetData: function(src) {

		// grab the iframe and it's contents to work with
		/*
		var frame = $(".builder.preview iframe");
		var src = (frame.contents().length === 0) ? $(document) : frame.contents();
		*/
		
		// determine if we should use the passed source or the Globals source (the iframe on the CMS edit view)
		var src = src == undefined ? this.Globals.src() : src;
		var rows = $(".row", src);
		var colLayout, name, shortName, fullName, dataId, jRow2;
		

		// get rows
		return rows.map(function(rowi, row) {

			// find column layout from grand parent
			colLayout = Object.getOwnPropertyNames(Tools.findClass($(".content", row), colLayouts))[0];

			// columns in row
			return {
				colLayout: colLayout,
				dataId: $(row).attr('data-id'),
				el: row,
				cols: $(".col", row).map(function(coli, col) {

					// widgets in row in column
					return {
						dataId: $(".column.column-widget", col).attr('data-id'),
						el: col,
						widgets: $(".column-content>div>.widget", col).map(function(row2i, row2) {

							jRow2 = $(row2);
							shortName = Object.getOwnPropertyNames(Tools.findClass(jRow2, knownWidgetClasses))[0];
							fullName = knownWidgetClasses[shortName];

							return {
								shortName: shortName,
								fullName: fullName,
								dataId: jRow2.attr("data-id"),
								el: row2
							};
						}).get()
					};
				}).get()
			};
		}).get();

	}

}

var Expressions = {
	editPage: new RegExp("^https:\/\/.*\.herokuapp.com\/(([^\/]+)\/)+edit"),//^https:\/\/.*\.herokuapp.com\/([^\/]+)\/([^\/]+)\/edit$"),
	cardsPage: new RegExp("^https:\/\/.*\.herokuapp.com\/website\/([^\/]*)$")
}

var Tests = {
	isEditPage: function() {
		return Expressions.editPage.test(window.location.href);
	},
	isCardsPage: function() {
		return Expressions.cardsPage.test(window.location.href);
	}
}

var UI = {
	addCardsButtons: function() {
		
		// Remove any old injections & previous CSS injections
		$(".overviewer").remove();
		Tools.removePreviousInjectedCSS("page-overview");
		
		console.log(Tools.addCSS("page-overview",
			".overviewer { position: absolute; top:0; right: 54px; color: white; "+
				"display: block; cursor: pointer; border-left: 1px solid rgba(255,255,255,.1); "+
				"border-right: 1px solid rgba(255,255,255,.1); } "+
			".overviewer:hover { background-color: rgba(255,255,255,.1); } "+
			".overviewer i { position: relative; z-index: 1; font-size: 23px; padding: 16px; } "+
			".card-corner.loading i { color: #3699C6; opacity: 1; animation: spin 2s infinite linear; } "+
			".card-corner.error i { color: #C63636; opacity: 1; } .card-corner.success i { color: #393; opacity: 1; }"));// old green success #4BC636
		
		var cards = $(".cards .card");
		
		cards.each(function(e,i) {
			$(".card-head h3", e).append('<a class="overviewer">'+
				'<i class="fa fa-plus-square-o"></i></a>');
			$(".overviewer", e).click(Events.OverViewer.overviewerClick);
		});
		
	}
}

PageOverview.init();