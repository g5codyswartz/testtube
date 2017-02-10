var pageContainers = $(".redirects .location");
var redirectRules = $(".faux-table-cell:nth-of-type(2)", pageContainers);
var unescapedQuestionMark = /(([^\\])(\?))/igm;

redirectRules.each(function(i, e){
    e = $("textarea", e);
    
    // force an update on ember so the save works
    e.focus();
    
    e.val(e.val().split(/\n/).map(function(e, i) {
        if (e.match(unescapedQuestionMark))
        {
            console.log(e);
            //console.log(e.replace(unescapedQuestionMark, "$2\\$3"));//"$1 , $2 , $3 , $4 , $5"));
            return e.replace(unescapedQuestionMark, "$2\\$3");
        }
        else
        {
            return e;
        }
    }).join("\n"));
    
    // force an update on ember so the save works
    e.focus();
    
});