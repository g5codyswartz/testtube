/*
    Todo: 
        
    Done: 
        12/7/2015 - whitelist: images in social feed
        whitelist: blog post images, gallery thumbnails, map/directions
    Idea: 
        throw a before element and put a tint over the image - heros would then be visible
*/

var MissingAlts = {
    iframe: null,
    highlightColor: "rgb(0, 255, 0)",
    highlightSize: "3px",
    whiteList: [
        "[id='g5-c2e-thumb']",
        "[src*=googleapis]",
        "[src*=gstatic]"
    ],
    notWidgets: "",
    
    init: function() {
        this.iframe = $($("iframe.ember-view").contents());
        if (this.iframe.length === 0)
        {
            this.iframe = $(document);
        }
    },
    displayMissingAlts: function() {
        this.getMissingAlts().css('box-shadow', this.highlightColor+" 0px 0px 0px "+this.highlightSize+
        ", "+this.highlightColor+" 0px 0px 0px "+this.highlightSize+" inset");
    },
    getMissingAlts: function() {
        
        var notWidgets = this.getWhiteList();
        
        var noAlt = $("img:not([alt])"+notWidgets, this.iframe);
        var empties = $("img[alt='']"+notWidgets, this.iframe);
        
        var blogImages = $(".mini-news-feed-widget img");
        var galleryThumbs = $(".flex-control-thumbs img");
        var socialFeedImages = $(".widget.social-feed img");
        
        return noAlt.add(empties)
            .not(blogImages)
            .not(galleryThumbs)
            .not(socialFeedImages);
    },
    getWhiteList: function() {
        var notWidgets = "";
        
        this.whiteList.forEach(function(e, i) {
            notWidgets += ":not("+e+")";
        });
        
        return notWidgets
    }
    
}

MissingAlts.init();
MissingAlts.displayMissingAlts();

var missingAlts = MissingAlts.getMissingAlts().get();
if (missingAlts.length > 0)
{
    alert("Missing Alt Tags: "+missingAlts.length+"\n\nCheck the console for elements. You can click them and then right click - scroll into view to see them if there are any in question.");
    console.log(missingAlts);
}