var aye = $("<a target='_blank' style='font-size: 18px; border: 1px solid black; padding: 5px; text-align: center;'>D-Load</a>");
aye.click(function(){ 
	$(this).attr("href", $("#gallery .item.active img").attr("src")); 
});
$("#gallery").parent().parent().parent().append(aye);