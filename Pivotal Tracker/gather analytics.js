/* global $ */
/* global $ */
var PTAnalytics = class {
    constructor() {
        this.container = $("header[style]+div[style]>div");
        this.rightcol = this.container.find(">div:eq(1)>div");
        this.rightcolcols = this.rightcol.find(">div");
        
        this.storySections = $("[data-aid=stories-count]");
        this.sections = ["accepted", "rejected", "delivered", "finished", "started"];
        // Populate the different texts
        this.sections.each( (section, i) => {
            this[section+"Text"] = this.storySections[i];
        });
    }
    
    parseSectionText(el) {
        let reg = /\((\d+) stories \| (\d+) points\)/;
        let text = $(el).text().trim();
        let matches = reg.exec(text);
        return { stories: matches[1], points: matches[2] };
    }
    
    getSection(name) {
        
    }
    
}

var test = new PTAnalytics();