// v1.0
// Author: Cody Swartz

 /* global Storage $ localStorage location */

/* Ideas:
	Too bad I cannot pull h-tags I could auto name them by those, 
	or at least display them or take like a 10 character substring from them
	
	todo 
	Import/Export
	
	Should not care what the previous domain name was, or at least alert the user that the 
	domain name doesn't match up, but it can still import them - maybe there's a 
	parent id I can grab that both have in common.
	
	I figured I would put the [Im] [Ex] buttons next to the MAIN column header
	
	todo 
	Bugs
	
	The .com (from the domain name should not be it's own key right now in 
	local storage, it should be getting changed to ~ like the rest of the 
	domain name periods.
	
	todo 
	Implement a fix that migrates the .com key version over to the fixed version.
	
	todo
	Pages Level display and editing
	Determine if on pages page: location.pathname.substr(1).indexOf("/") < 0
	
	Grab all pages and then grab all ids in our stored data and populate 
	the given data-ids on the page. We will also need a writer that writes by 
	id's. If it is slow I can make a temporary dataId storage which has 
	the keys and their values as well as page they belong to. \
	
	Maybe the data should be refactored so that there's just a collection of 
	dataIds which would contain their names, and pages just contain a 
	collection of dataIds which are just pointers to the dataId collection.
	
	^ That would solve the pages level display read/write issue without crawling 
	all the data to get it to display or save.
	
	Append: Also should possibly store the order the widgets are in that way you 
	can clone from one location to the other since that's all there will be able to 
	go off of. I'm not sure how single domains will handle, but I imagine 
	they use a shared DB so dataId's should not overlap.
	
*/

/**
	float: right;
	height: 20px;
	padding: 0;
 */
 
 // $("<style type='text/css'> .redbold{ color:#f00; font-weight:bold;} </style>").appendTo("head");
 
 // maybe append a span with the name infront of the widget name styled with lower casing text
 // $($('.main-widgets li[id^=ember]')[1]).contents()[2].nodeValue = "Testing2"

// http://stackoverflow.com/questions/2010892/storing-objects-in-html5-localstorage
/*Storage.prototype.setObject = function(key, value) {
	this.setItem(key, JSON.stringify(value));
}

Storage.prototype.getObject = function(key) {
	var value = this.getItem(key);
	return value && JSON.parse(value);
}*/

//https://github.com/iFind/html5MultidimensionalStorage
/**
 *
 * MOVED TO: https://github.com/iFind/html5MultidimensionalStorage
 *
 * This methods extends the default HTML5 Storage object and add support
 * to set and get multidimensional data
 *
 * @example Storage.setObj('users.albums.sexPistols',"blah");
 * @example Storage.setObj('users.albums.sexPistols',{ sid : "My Way", nancy : "Bitch" });
 * @example Storage.setObj('users.albums.sexPistols.sid',"Other songs");
 *
 * @example Storage.getObj('users');
 * @example Storage.getObj('users.albums');
 * @example Storage.getObj('users.albums.sexPistols');
 * @example Storage.getObj('users.albums.sexPistols.sid');
 * @example Storage.getObj('users.albums.sexPistols.nancy');
 *
 * This is just a prototype and is not recommended to use at production apps
 * USE AT YOUR OWN RISK
 *
 * @author Klederson Bueno <klederson@klederson.com>
 * @author Gabor Zsoter <helo@zsitro.com>
 */
 
//Add Storage support for objects
Storage.prototype.__walker = function(path,o) {
	//Validate if path is an object otherwise returns false
	if(typeof path !== "object")
		return undefined;

	if(path.length === 0){
		return o;
	}

	for(var i in path){
		var prop = path[i];
		//Check if path step exists
		if(o.hasOwnProperty(prop)){
			var val = o[prop];
			if(typeof val == 'object'){
				path.splice(0,1);
				return this.__walker(path,val);
			} else {
				return val;
			}
		}
	}
};

Storage.prototype.setObj = function(key, value) {

	var path = key.split('.');

	//First level is always the localStorage key pair item
	var _key = path[0];
	var os = this.getItem(_key) !== null ? JSON.parse(this.getItem(_key)) : null; //general storage key pair element
	path.splice(0,1);

	if(os === null) {
		os = {};
		this.setItem(_key,JSON.stringify(os));
	}

	var innerWalker = function(path,o) {

		//Validate if path is an object otherwise returns false
		if(typeof path !== "object")
			return undefined;

		if(path.length == 1) {
			o[path[0]] = value;
			return o;
		} else if(path.length === 0) {
			os = value;
			return os;
		}
		
		var val = null;

		for(var i in path){
			var prop = path[i];
			//Check if path step exists
			if(o.hasOwnProperty(prop)) {
				val = o[prop];
				if(typeof val == 'object'){
					path.splice(0,1);
					return innerWalker(path,val);
				}
			} else {
				//create depth
				o[prop] = {};
				val = o[prop];
				path.splice(0,1);
				return innerWalker(path,val);
			}
		}
	};

	innerWalker(path,os);
	
	this.setItem(_key,JSON.stringify(os));
};

Storage.prototype.getObj = function(key) {
	key = key.split('.');

	//First level is always the localStorage key pair item
	var _key = key[0];
	var o = this.getItem(_key) ? JSON.parse(this.getItem(_key)) : null;

	if(o === null)
		return undefined;

	key.splice(0,1);

	return this.__walker(key,o);
};

/* Options
	
	optDontAskRename(true/false);
	optAutoName(true/false);
	
	setName(id, name); // ie: setName(7798, "New Name");
	clearNames();
	renameAll();
*/

// Lib we're using uses periods for convention
// replace all since replace only does it once
// http://stackoverflow.com/questions/1144783/replacing-all-occurrences-of-a-string-in-javascript
var hostname = location.hostname.split(".").join("~");
var pathname = location.pathname.split(".").join("~");
var objPathPage = 'namedWidgets.'+hostname+"."+pathname
var contentStripeWidgets;

var btnRenameCSS = ".btnRename {"+
		"padding: 0px 2px;"+
  		"background-color: #222;"+
  		"color: white;"+
  		"border: 0px solid #222;"+
  		"border-radius: 4px;"+
  		"width: 20px;"+
  		"height: 18px;"+
  		"letter-spacing: 1px;"+
  		"font-weight: bold;"+
  		"padding-left: 3px;"+
  		"}";

$(function(){
	
	initjQuery();
	
	if (localStorage.getObj(objPathPage) != undefined && localStorage.getObj('options.namedWidgets.dontAskRename') !== true && !confirm("Load current names? Cancel to clear and rename all."))
		clearNames();
	
	addCSS(btnRenameCSS);
	
	addRenameButtons();

	mainNamedWidgets();
	
});

function initjQuery() {
	contentStripeWidgets = $('.main-widgets li[id^=ember].content-stripe');
}

function addRenameButtons() {
	$(contentStripeWidgets).each(function() {
		
		// Only add it if we need it
		if ($('.btnRename', this).length == 0)
		{
			var dataId = $(this).attr('data-id');
			
			var renameButton = $("<button class='btnRename' title='"+dataId+"'>rn</button>");
			$(this).append(renameButton);
			$(renameButton).click(function(e){
				var dataId = $(this).parent().attr('data-id');
				e.stopPropagation();
				setName(dataId, prompt("Choose a name for: "+dataId));
			});
		}
	});
}

function mainNamedWidgets() {
	var loop = 1;
	
	// Widgets existance - Main
	$(contentStripeWidgets).each(function() {
		
		var dataId = $(this).attr('data-id');
		var objPath = 'namedWidgets.'+hostname+"."+pathname+"."+dataId;
		var widget = localStorage.getObj(objPath);
		
		// Widget existance
		if (widget)
			displayName(this, widget.name);
		else
		{
			displayName(this, "--> Setting");
			
			//todo implement: empty yes, and, or null cancel
			
			var named = (localStorage.getObj('options.namedWidgets.autoName') !== true) ? prompt("Choose a name for: "+dataId) : loop;
			localStorage.setObj(objPath, {id: $(this).attr('id'), name: named});
			displayName(this, named);
		}
		
		loop++;
	});
}

function displayName(el, name) {
	// if name is true/set then use it, otherwise use the data id
	name = ( name ? name : " ["+$(el).attr('data-id')+"]");
	
	$(el).contents()[2].nodeValue = name;
}

function setName(dataId, named) {
	var objPath = 'namedWidgets.'+hostname+"."+pathname+"."+dataId;
	var widget = $(".main-widgets li[id^=ember][data-id="+dataId+"]");
	var widgetId = $(widget).attr('id');
	localStorage.setObj(objPath, {id: widgetId, name: named});
	displayName(widget, named);
}

function clearNames() {
	var objPath = 'namedWidgets.'+hostname+"."+pathname;
	localStorage.setObj(objPath, {});
	
	//localStorage.removeItem('namedWidgets');
}

function renameAll() {
	clearNames();
	mainNamedWidgets();
}

function optDontAskRename(bool) {
	localStorage.setObj('options.namedWidgets.dontAskRename', bool);
}

function optAutoName(bool) {
	localStorage.setObj('options.namedWidgets.autoName', bool);
}

function addCSS(cssStyles) {
	$("<style>"+cssStyles+"</style>").appendTo("head");
}

/* todo Ideas
	If the same client, ask if you want to load up another location - for locations 
	that get cloned and have the same widget layouts.
*/