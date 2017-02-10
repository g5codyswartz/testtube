var gallery = $(".edit_widget");
//var title = $("div:nth-child(2)", gallery);
var photos = $(".photo-fields", gallery);

var importData = prompt("Paste your JSON string without the surrounding quotes");
importData = JSON.parse(importData);

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

