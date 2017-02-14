/* global $ */
var PTAnalytics = class {
  constructor() {
    this.container = $("header[style]+div[style]>div");
    this.rightcol = this.container.find(">div:eq(1)>div");
    this.rightcolcols = this.rightcol.find(">div");
    this.storySections = $("[data-aid=stories-count]");
    this.sections = this.storySections.parent().parent().parent().parent();
    this.storiesContainer = this.sections.find(">div:eq(1)");
    this.sectionNames = ["accepted", "rejected", "delivered", "finished", "started"];
    this.stories = this.getStories();
    this.texts = [];
    this.populateTexts();
  }

  getStories() {
    return this.storiesContainer.map((i, el) => {
      el = $(el);
      let name = this.sectionNames[i];
      let stories = el.find(">div>div");
      let ret = {};
      ret[name] = stories;
      return ret;
    });
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
    }).reduce((pre, cur) => {
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

var PTStory = class {

  constructor(el) {
    this.el = el;
    this.parseEl();
  }

  parseEl(el) {
    this.type = type;
    this.points = points;
    this.name = name;
    this.owner = owner;
    this.url = url;
    this.tags = tags;
  }

};

var test = new PTAnalytics();