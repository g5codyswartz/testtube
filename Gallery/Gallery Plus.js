/*
	Todo / Ideas: 
	 - Add a delete button postioned top right
	 - Add Export and Import functionality
	 - Add Button for auto alt
	 
	 Done:
	 - On form update, update BeauGallery
*/

// Globals
var gallery = $(".edit_widget");
//var title = $("div:nth-child(2)", gallery);
var photos = $(".photo-fields", gallery);


injectCSSChanges();
injectBootstrap();

renderBeauGallery();

formChanges();


function renderBeauGallery() {
	
	var newGallery = $("#beauGallery");
	newGallery.remove(); // clean up any old ones
	
	// Add in our new gallery container
	$("<div id='beauGallery' class=''></div>").insertBefore(photos);
	newGallery = $("#beauGallery");
	
	var i = 0; // Our loop counter
	$('.photo-field').each(function(){
		
		var pPhotoUrl = $(".form-field:nth-child(2) input[type=text]", this).val();
		var pThumbUrl = $(".form-field:nth-child(3) input[type=text]", this).val();
		var pAltTag = $(".form-field:nth-child(4) input[type=text]", this).val();
		var pTitle = $(".form-field:nth-child(5) input[type=text]", this).val();
		var pCaption = $(".form-field:nth-child(6) input[type=text]", this).val();
		
		var jsonData = {
			"photoUrl": pPhotoUrl,
			"thumbUrl": pThumbUrl,
			"alt": pAltTag,
			"title": pTitle,
			"caption": pCaption
		};
		
		// Make a new row if 4 items, or first time
		if (i%4 == 0)
			$("<div class='row rowNum-"+Math.floor(i/4)+"'></div>").appendTo(newGallery);
		
		// Get the proper row to insert into
		var container = $(".row.rowNum-"+Math.floor(i/4), newGallery);
		
		var newCol = $("<div class='col-sm-3'>"+
			"<img class='photo' src='"+pPhotoUrl+"' draggable='true'>"+
		"</div>").appendTo(container)[0];
		
		var photo = $("img", newCol)[0];
		
		// Add Json data
		$(photo).data('photo', jsonData);
		
		photo.addEventListener('dragstart', handleDragStart, false);
		photo.addEventListener('dragenter', handleDragEnter, false);
		photo.addEventListener('dragover', handleDragOver, false);
		photo.addEventListener('dragleave', handleDragLeave, false);
		photo.addEventListener('drop', handleDrop, false);
		photo.addEventListener('dragend', handleDragEnd, false);
		
		i++; // Increment loop
	});
}

function addCSS(cssStyles) {
	$("<style>"+cssStyles+"</style>").appendTo("head");
}

function getBeauGalleryJson() {
	
	var exportData = [];

	$('#beauGallery .photo').each(function(){
		exportData.push($(this).data('photo'));
	});
	
	return exportData;
}

function getGalleryJson() {
	
	var exportData = [];

	$('.photo-field').each(function(){
		
		var pPhotoUrl = $(".form-field:nth-child(2) input[type=text]", this).val();
		var pThumbUrl = $(".form-field:nth-child(3) input[type=text]", this).val();
		var pAltTag = $(".form-field:nth-child(4) input[type=text]", this).val();
		var pTitle = $(".form-field:nth-child(5) input[type=text]", this).val();
		var pCaption = $(".form-field:nth-child(6) input[type=text]", this).val();
		
		exportData.push({
			"photoUrl": pPhotoUrl,
			"thumbUrl": pThumbUrl,
			"alt": pAltTag,
			"title": pTitle,
			"caption": pCaption
		});
	});
	
	//console.log(exportData);
	//copy(JSON.stringify(exportData));
	return exportData;
}

function importGalleryJson(json) {
	
	var gallery = $(".edit_widget");
	//var title = $("div:nth-child(2)", gallery);
	var photos = $(".photo-fields", gallery);
	
	//var importData = prompt("Paste your JSON string without the surrounding quotes");
	var importData = (typeof json == 'string') ? JSON.parse(json) : json;
	
	// clear any previous data
	$('.photo-field input[type=text]').val("");
	
	var i = 0; // our loop counter
	$('.photo-field').each(function(){
		
		var imported = importData[i];
		i++;// increment loop, should do it at the bottom but we're not reusing it
		
		// keeping a var is useless since we're done with this dom element but it's just from copy paste of the export code
		var pPhotoUrl = $(".form-field:nth-child(2) input[type=text]", this).val(imported["photoUrl"]);
		var pThumbUrl = $(".form-field:nth-child(3) input[type=text]", this).val(imported["thumbUrl"]);
		var pAltTag = $(".form-field:nth-child(4) input[type=text]", this).val(imported["alt"]);
		var pTitle = $(".form-field:nth-child(5) input[type=text]", this).val(imported["title"]);
		var pCaption = $(".form-field:nth-child(6) input[type=text]", this).val(imported["caption"]);
		
	});
}

function injectCSSChanges() {
	
	// Larger Modal
	addCSS(
	".modal.fade.in {" +
	"    top: 10%;" +
	"}" +
	".modal {" +
	"	left: 10%;" +
	"	margin: 0px;" +
	"	width: 80%;" +
	"}" +
	".modal-body {" +
	"	max-height: none;" +
	"	height: 70vh;" +
	"}" +
	".photo-fields {" +
	"	height: auto;" +
	"}");
	
	// Hide the normal gallery fields
	//addCSS(".photo-fields { display: none; }");
	
	// Hide the gallery note
	//addCSS(".edit_widget .note { display: none; }");
	
	// Custom Styling
	addCSS(
	"#beauGallery .photo.dragHover { "+
  	"	border: 2px dashed #000; "+
	"}"+
	"#beauGallery .photo { "+
	"	border: 2px solid #777; "+
	"	padding: 0px; "+
	"	margin: 15px 0px; "+
	"}");
	
}

function injectBootstrap() {
	
	//$('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">').appendTo("head");
	
	addCSS(
	'.row * { box-sizing: border-box; }' +
	'.img-responsive{display:block;max-width:100%;height:auto}.img-rounded{border-radius:6px}.img-thumbnail' +
	'{padding:4px;line-height:1.42857143;background-color:#fff;border:1px solid #ddd;' +
	'border-radius:4px;-webkit-transition:all .2s ease-in-out;-o-transition:all .2s ease-in-out;transition:all .2s ease-in-out;' +
	'display:inline-block;max-width:100%;height:auto}.img-circle{border-radius:50%}.sr-only{position:absolute;width:1px;' +
	'height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0,0,0,0);border:0}.sr-only-focusable:active,' +
	'.sr-only-focusable:focus{position:static;width:auto;height:auto;margin:0;overflow:visible;clip:auto}.container,' +
	'.container-fluid{padding-left:15px;padding-right:15px;margin-right:auto;margin-left:auto}[role=button]{cursor:pointer}' +
	'@media (min-width:768px){.container{width:750px}}@media (min-width:992px){.container{width:970px}}@media (min-width:1200px)' +
	'{.container{width:1170px}}.row{margin-left:-15px;margin-right:-15px}.col-lg-1,.col-lg-10,.col-lg-11,.col-lg-12,.col-lg-2,' +
	'.col-lg-3,.col-lg-4,.col-lg-5,.col-lg-6,.col-lg-7,.col-lg-8,.col-lg-9,.col-md-1,.col-md-10,.col-md-11,.col-md-12,' +
	'.col-md-2,.col-md-3,.col-md-4,.col-md-5,.col-md-6,.col-md-7,.col-md-8,.col-md-9,.col-sm-1,.col-sm-10,.col-sm-11,' +
	'.col-sm-12,.col-sm-2,.col-sm-3,.col-sm-4,.col-sm-5,.col-sm-6,.col-sm-7,.col-sm-8,.col-sm-9,.col-xs-1,.col-xs-10,' +
	'.col-xs-11,.col-xs-12,.col-xs-2,.col-xs-3,.col-xs-4,.col-xs-5,.col-xs-6,.col-xs-7,.col-xs-8,.col-xs-9{position:relative;' +
	'min-height:1px;padding-left:15px;padding-right:15px}.col-xs-1,.col-xs-10,.col-xs-11,.col-xs-12,.col-xs-2,.col-xs-3,' +
	'.col-xs-4,.col-xs-5,.col-xs-6,.col-xs-7,.col-xs-8,.col-xs-9{float:left}.col-xs-12{width:100%}.col-xs-11{width:91.66666667%}' +
	'.col-xs-10{width:83.33333333%}.col-xs-9{width:75%}.col-xs-8{width:66.66666667%}.col-xs-7{width:58.33333333%}' +
	'.col-xs-6{width:50%}.col-xs-5{width:41.66666667%}.col-xs-4{width:33.33333333%}.col-xs-3{width:25%}.col-xs-2{width:16.66666667%}' +
	'.col-xs-1{width:8.33333333%}.col-xs-pull-12{right:100%}.col-xs-pull-11{right:91.66666667%}.col-xs-pull-10{right:83.33333333%}' +
	'.col-xs-pull-9{right:75%}.col-xs-pull-8{right:66.66666667%}.col-xs-pull-7{right:58.33333333%}.col-xs-pull-6{right:50%}' +
	'.col-xs-pull-5{right:41.66666667%}.col-xs-pull-4{right:33.33333333%}.col-xs-pull-3{right:25%}.col-xs-pull-2{right:16.66666667%}' +
	'.col-xs-pull-1{right:8.33333333%}.col-xs-pull-0{right:auto}.col-xs-push-12{left:100%}.col-xs-push-11{left:91.66666667%}' +
	'.col-xs-push-10{left:83.33333333%}.col-xs-push-9{left:75%}.col-xs-push-8{left:66.66666667%}.col-xs-push-7{left:58.33333333%}' +
	'.col-xs-push-6{left:50%}.col-xs-push-5{left:41.66666667%}.col-xs-push-4{left:33.33333333%}.col-xs-push-3{left:25%}' +
	'.col-xs-push-2{left:16.66666667%}.col-xs-push-1{left:8.33333333%}.col-xs-push-0{left:auto}.col-xs-offset-12{margin-left:100%}' +
	'.col-xs-offset-11{margin-left:91.66666667%}.col-xs-offset-10{margin-left:83.33333333%}.col-xs-offset-9{margin-left:75%}' +
	'.col-xs-offset-8{margin-left:66.66666667%}.col-xs-offset-7{margin-left:58.33333333%}.col-xs-offset-6{margin-left:50%}' +
	'.col-xs-offset-5{margin-left:41.66666667%}.col-xs-offset-4{margin-left:33.33333333%}.col-xs-offset-3{margin-left:25%}' +
	'.col-xs-offset-2{margin-left:16.66666667%}.col-xs-offset-1{margin-left:8.33333333%}.col-xs-offset-0{margin-left:0}' +
	'@media (min-width:768px){.col-sm-1,.col-sm-10,.col-sm-11,.col-sm-12,.col-sm-2,.col-sm-3,.col-sm-4,.col-sm-5,' +
	'.col-sm-6,.col-sm-7,.col-sm-8,.col-sm-9{float:left}.col-sm-12{width:100%}.col-sm-11{width:91.66666667%}' +
	'.col-sm-10{width:83.33333333%}.col-sm-9{width:75%}.col-sm-8{width:66.66666667%}.col-sm-7{width:58.33333333%}' +
	'.col-sm-6{width:50%}.col-sm-5{width:41.66666667%}.col-sm-4{width:33.33333333%}.col-sm-3{width:25%}.col-sm-2{width:16.66666667%}' +
	'.col-sm-1{width:8.33333333%}.col-sm-pull-12{right:100%}.col-sm-pull-11{right:91.66666667%}.col-sm-pull-10{right:83.33333333%}' +
	'.col-sm-pull-9{right:75%}.col-sm-pull-8{right:66.66666667%}.col-sm-pull-7{right:58.33333333%}.col-sm-pull-6{right:50%}' +
	'.col-sm-pull-5{right:41.66666667%}.col-sm-pull-4{right:33.33333333%}.col-sm-pull-3{right:25%}.col-sm-pull-2{right:16.66666667%}' +
	'.col-sm-pull-1{right:8.33333333%}.col-sm-pull-0{right:auto}.col-sm-push-12{left:100%}.col-sm-push-11{left:91.66666667%}' +
	'.col-sm-push-10{left:83.33333333%}.col-sm-push-9{left:75%}.col-sm-push-8{left:66.66666667%}.col-sm-push-7{left:58.33333333%}' +
	'.col-sm-push-6{left:50%}.col-sm-push-5{left:41.66666667%}.col-sm-push-4{left:33.33333333%}.col-sm-push-3{left:25%}' +
	'.col-sm-push-2{left:16.66666667%}.col-sm-push-1{left:8.33333333%}.col-sm-push-0{left:auto}.col-sm-offset-12{margin-left:100%}' +
	'.col-sm-offset-11{margin-left:91.66666667%}.col-sm-offset-10{margin-left:83.33333333%}.col-sm-offset-9{margin-left:75%}' +
	'.col-sm-offset-8{margin-left:66.66666667%}.col-sm-offset-7{margin-left:58.33333333%}.col-sm-offset-6{margin-left:50%}' +
	'.col-sm-offset-5{margin-left:41.66666667%}.col-sm-offset-4{margin-left:33.33333333%}.col-sm-offset-3{margin-left:25%}' +
	'.col-sm-offset-2{margin-left:16.66666667%}.col-sm-offset-1{margin-left:8.33333333%}.col-sm-offset-0{margin-left:0}}' +
	'@media (min-width:992px){.col-md-1,.col-md-10,.col-md-11,.col-md-12,.col-md-2,.col-md-3,.col-md-4,.col-md-5,.col-md-6,.col-md-7,' +
	'.col-md-8,.col-md-9{float:left}.col-md-12{width:100%}.col-md-11{width:91.66666667%}.col-md-10{width:83.33333333%}.col-md-9{width:75%}' +
	'.col-md-8{width:66.66666667%}.col-md-7{width:58.33333333%}.col-md-6{width:50%}.col-md-5{width:41.66666667%}.col-md-4{width:33.33333333%}' +
	'.col-md-3{width:25%}.col-md-2{width:16.66666667%}.col-md-1{width:8.33333333%}.col-md-pull-12{right:100%}.col-md-pull-11{right:91.66666667%}' +
	'.col-md-pull-10{right:83.33333333%}.col-md-pull-9{right:75%}.col-md-pull-8{right:66.66666667%}.col-md-pull-7{right:58.33333333%}' +
	'.col-md-pull-6{right:50%}.col-md-pull-5{right:41.66666667%}.col-md-pull-4{right:33.33333333%}.col-md-pull-3{right:25%}' +
	'.col-md-pull-2{right:16.66666667%}.col-md-pull-1{right:8.33333333%}.col-md-pull-0{right:auto}.col-md-push-12{left:100%}' +
	'.col-md-push-11{left:91.66666667%}.col-md-push-10{left:83.33333333%}.col-md-push-9{left:75%}.col-md-push-8{left:66.66666667%}' +
	'.col-md-push-7{left:58.33333333%}.col-md-push-6{left:50%}.col-md-push-5{left:41.66666667%}.col-md-push-4{left:33.33333333%}' +
	'.col-md-push-3{left:25%}.col-md-push-2{left:16.66666667%}.col-md-push-1{left:8.33333333%}.col-md-push-0{left:auto}' +
	'.col-md-offset-12{margin-left:100%}.col-md-offset-11{margin-left:91.66666667%}.col-md-offset-10{margin-left:83.33333333%}' +
	'.col-md-offset-9{margin-left:75%}.col-md-offset-8{margin-left:66.66666667%}.col-md-offset-7{margin-left:58.33333333%}' +
	'.col-md-offset-6{margin-left:50%}.col-md-offset-5{margin-left:41.66666667%}.col-md-offset-4{margin-left:33.33333333%}' +
	'.col-md-offset-3{margin-left:25%}.col-md-offset-2{margin-left:16.66666667%}.col-md-offset-1{margin-left:8.33333333%}' +
	'.col-md-offset-0{margin-left:0}}@media (min-width:1200px){.col-lg-1,.col-lg-10,.col-lg-11,.col-lg-12,.col-lg-2,.col-lg-3,' +
	'.col-lg-4,.col-lg-5,.col-lg-6,.col-lg-7,.col-lg-8,.col-lg-9{float:left}.col-lg-12{width:100%}.col-lg-11{width:91.66666667%}' +
	'.col-lg-10{width:83.33333333%}.col-lg-9{width:75%}.col-lg-8{width:66.66666667%}.col-lg-7{width:58.33333333%}.col-lg-6{width:50%}' +
	'.col-lg-5{width:41.66666667%}.col-lg-4{width:33.33333333%}.col-lg-3{width:25%}.col-lg-2{width:16.66666667%}.col-lg-1{width:8.33333333%}' +
	'.col-lg-pull-12{right:100%}.col-lg-pull-11{right:91.66666667%}.col-lg-pull-10{right:83.33333333%}.col-lg-pull-9{right:75%}' +
	'.col-lg-pull-8{right:66.66666667%}.col-lg-pull-7{right:58.33333333%}.col-lg-pull-6{right:50%}.col-lg-pull-5{right:41.66666667%}' +
	'.col-lg-pull-4{right:33.33333333%}.col-lg-pull-3{right:25%}.col-lg-pull-2{right:16.66666667%}.col-lg-pull-1{right:8.33333333%}' +
	'.col-lg-pull-0{right:auto}.col-lg-push-12{left:100%}.col-lg-push-11{left:91.66666667%}.col-lg-push-10{left:83.33333333%}' +
	'.col-lg-push-9{left:75%}.col-lg-push-8{left:66.66666667%}.col-lg-push-7{left:58.33333333%}.col-lg-push-6{left:50%}' +
	'.col-lg-push-5{left:41.66666667%}.col-lg-push-4{left:33.33333333%}.col-lg-push-3{left:25%}.col-lg-push-2{left:16.66666667%}' +
	'.col-lg-push-1{left:8.33333333%}.col-lg-push-0{left:auto}.col-lg-offset-12{margin-left:100%}.col-lg-offset-11{margin-left:91.66666667%}' +
	'.col-lg-offset-10{margin-left:83.33333333%}.col-lg-offset-9{margin-left:75%}.col-lg-offset-8{margin-left:66.66666667%}' +
	'.col-lg-offset-7{margin-left:58.33333333%}.col-lg-offset-6{margin-left:50%}.col-lg-offset-5{margin-left:41.66666667%}' +
	'.col-lg-offset-4{margin-left:33.33333333%}.col-lg-offset-3{margin-left:25%}.col-lg-offset-2{margin-left:16.66666667%}' +
	'.col-lg-offset-1{margin-left:8.33333333%}.col-lg-offset-0{margin-left:0}}.clearfix:after,.clearfix:before,.container-fluid:after,' +
	'.container-fluid:before,.container:after,.container:before,.row:after,.row:before{content:" ";display:table}.clearfix:after,' +
	'.container-fluid:after,.container:after,.row:after{clear:both}.center-block{display:block;margin-left:auto;margin-right:auto}' +
	'.pull-right{float:right!important}.pull-left{float:left!important}.hidden,' + // .hide{display:none!important}.show{display:block!important}
	'.visible-lg,.visible-lg-block,.visible-lg-inline,.visible-lg-inline-block,.visible-md,.visible-md-block,.visible-md-inline,' +
	'.visible-md-inline-block,.visible-sm,.visible-sm-block,.visible-sm-inline,.visible-sm-inline-block,.visible-xs,.visible-xs-block,' +
	'.visible-xs-inline,.visible-xs-inline-block{display:none!important}.invisible{visibility:hidden}.text-hide{font:0/0 a;color:transparent;' +
	'text-shadow:none;background-color:transparent;border:0}.affix{position:fixed}@-ms-viewport{width:device-width}' +
	'@media (max-width:767px){.visible-xs{display:block!important}table.visible-xs{display:table!important}' +
	'tr.visible-xs{display:table-row!important}td.visible-xs,th.visible-xs{display:table-cell!important}' +
	'.visible-xs-block{display:block!important}.visible-xs-inline{display:inline!important}.visible-xs-inline-block{display:inline-block!important}}' +
	'@media (min-width:768px) and (max-width:991px){.visible-sm{display:block!important}table.visible-sm{display:table!important}' +
	'tr.visible-sm{display:table-row!important}td.visible-sm,th.visible-sm{display:table-cell!important}.visible-sm-block{display:block!important}' +
	'.visible-sm-inline{display:inline!important}.visible-sm-inline-block{display:inline-block!important}}' +
	'@media (min-width:992px) and (max-width:1199px){.visible-md{display:block!important}table.visible-md{display:table!important}' +
	'tr.visible-md{display:table-row!important}td.visible-md,th.visible-md{display:table-cell!important}' +
	'.visible-md-block{display:block!important}.visible-md-inline{display:inline!important}.visible-md-inline-block{display:inline-block!important}}' +
	'@media (min-width:1200px){.visible-lg{display:block!important}table.visible-lg{display:table!important}tr.visible-lg{display:table-row!important}' +
	'td.visible-lg,th.visible-lg{display:table-cell!important}.visible-lg-block{display:block!important}.visible-lg-inline{display:inline!important}' +
	'.visible-lg-inline-block{display:inline-block!important}}@media (max-width:767px){.hidden-xs{display:none!important}}' +
	'@media (min-width:768px) and (max-width:991px){.hidden-sm{display:none!important}}@media (min-width:992px) and (max-width:1199px)' +
	'{.hidden-md{display:none!important}}@media (min-width:1200px){.hidden-lg{display:none!important}}.visible-print{display:none!important}' +
	'@media print{.visible-print{display:block!important}table.visible-print{display:table!important}tr.visible-print{display:table-row!important}' +
	'td.visible-print,th.visible-print{display:table-cell!important}}.visible-print-block{display:none!important}' +
	'@media print{.visible-print-block{display:block!important}}.visible-print-inline{display:none!important}' +
	'@media print{.visible-print-inline{display:inline!important}}.visible-print-inline-block{display:none!important}' +
	'@media print{.visible-print-inline-block{display:inline-block!important}.hidden-print{display:none!important');
	
}


/// Drag Handling - http://www.html5rocks.com/en/tutorials/dnd/basics/
var dragSrcEl = null;

function handleDragStart(e) {
	// Target (this) element is the source node.
	this.style.opacity = '0.4';
	
	dragSrcEl = this;
	
	var jsonData = $(this).data('photo');
	
	//console.log(jsonData);
	
	e.dataTransfer.effectAllowed = 'move';
	e.dataTransfer.setData('text/plain', JSON.stringify(jsonData));
}

function handleDragEnd(e) {
	this.style.opacity = '1';
}

function handleDragOver(e) {
	if (e.preventDefault) {
		e.preventDefault(); // Necessary. Allows us to drop.
	}
	
	e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
	
	return false;
}

function handleDragEnter(e) {
	// this / e.target is the current hover target.
	this.classList.add('dragHover');
}

function handleDragLeave(e) {
	this.classList.remove('dragHover');  // this / e.target is previous target element.
}

function handleDrop(e) {
	// this/e.target is current target element.
	
	if (e.stopPropagation) {
		e.stopPropagation(); // Stops some browsers from redirecting.
	}
	
	// Don't do anything if dropping the same column we're dragging.
	if (dragSrcEl != this) {
		// Set the source column's HTML to the HTML of the column we dropped on.
		
		// Flip floppity our data 
		var jsonData = $(this).data('photo');
		var transferedJsonData = JSON.parse(e.dataTransfer.getData('text/plain'));
		
		//console.log(jsonData);
		//console.log(transferedJsonData);
		
		$(dragSrcEl).data('photo', jsonData);
		$(this).data('photo', transferedJsonData);
		
		// Update UI with photo
		$(this).attr('src', transferedJsonData.photoUrl);
		$(dragSrcEl).attr('src', jsonData.photoUrl);
		
		// Update form
		console.log('test'); // Gets us into the Chrome VM
		var newGalleryLayout = getBeauGalleryJson();
		importGalleryJson( newGalleryLayout );
	}
	
	// Update UI
	dragSrcEl.style.opacity = "1";
	dragSrcEl.classList.remove("dragHover");
	this.style.opacity = "1";
	this.classList.remove('dragHover'); 
	
	return false;
}

// http://stackoverflow.com/questions/3614212/jquery-get-html-of-a-whole-element
jQuery.fn.outerHTML = function() {
	return jQuery('<div />').append(this.eq(0).clone()).html();
};

function formChanges() {
	
	$('.photo-fields').on('input', function(e) {
		
		renderBeauGallery();
		
	});
	
}