var pageContainers = $(".redirects .location");
var redirectRules = $(".faux-table-cell:nth-of-type(2)", pageContainers);

var currentText;
var lines
var lowered;
redirectRules.each(function(i, e){
    e = $("textarea", e);
    currentText = e.val();
    if (currentText !== "")
    {
        lines = currentText.split("\n");
        lines.forEach(function(ee,i) 
        {
            lowered = ee.toLowerCase();
            if (ee !== lowered)
            {
                currentText = e.val();
                e.val(currentText+"\r\n"+lowered);
            }
        });
    }
    e.focus();
    //window.scrollTo(0, 0);
});