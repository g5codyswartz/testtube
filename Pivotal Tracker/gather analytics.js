/* global $ */
var PTAnalytics = class {
  constructor() {
    this.container = $("header[style]+div[style]>div");
    this.rightcol = this.container.find(">div:eq(1)>div");
    this.rightcolcols = this.rightcol.find(">div");

    this.storySections = $("[data-aid=stories-count]");
    this.sections = this.storySections.parent().parent().parent().parent();
    this.sectionNames = ["accepted", "rejected", "delivered", "finished", "started"];
    this.texts = [];
    this.populateTexts();
  }

  populateTexts() {
    this.sectionNames.forEach((section, i) => {
      this.setText(section, this.storySections[i]);
    });
  }

  parseSectionText(el) {
    let reg = /\((\d+) stories \| (\d+) points\)/;
    let text = $(el).text().trim();
    let matches = reg.exec(text);
    return {
      stories: matches[1],
      points: matches[2]
    };
  }

  getSection(name) {
    return this.parseSectionText(this.getText(name));
  }

  getSections() {
    return this.sectionNames.map((section) => {
      return {
        name: section,
        vals: this.getSection(section)
      };
    }).reduce((pre, cur)=>{
      pre[cur.name] = cur.vals;
      return pre;
    }, {});
  }

  setText(name, val) {
    this.texts[name] = val;
  }

  getText(name) {
    return this.texts[name]
  }

}

var test = new PTAnalytics();