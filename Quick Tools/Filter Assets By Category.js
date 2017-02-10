var filterCategory = "Team";
var reset = false;

$(".assets .asset").each(function(i, el) {
	console.log($("select[name=category] option:selected", el).text())
	if (reset || $("select[name=category] option:selected", el).text() == filterCategory)
	{
		$(el).show();
	}
	else
	{
		$(el).hide();
	}
});