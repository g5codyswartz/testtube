var gallery = $(".edit_widget");
//var title = $("div:nth-child(2)", gallery);
var photos = $(".photo-fields", gallery);

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
copy(JSON.stringify(exportData));
