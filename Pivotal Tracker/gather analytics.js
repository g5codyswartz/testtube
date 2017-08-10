/* global $ */

var Util = class {
  static nameValSquash(pre, cur) {
    pre[cur.name] = cur.val;
    return pre;
  }
};
var PTAnalytics = class {
  constructor() {
    this.container = $("header[style]+div[style]>div");
    this.rightcol = this.container.find(">div:eq(1)>div");
    this.rightcolcols = this.rightcol.find(">div");
    this.storySections = $("[data-aid=stories-count]");
    this.sections = this.storySections.parent().parent().parent().parent();
    this.storiesContainer = this.sections.find(">div:eq(1)");
    this.sectionNames = ["accepted", "rejected", "delivered", "finished", "started"];
    this.texts = [];

    this.storiesEl = this.getStoriesEl();

    this.populateTexts();
  }

  getData() {
    let d = this.getSections();
    let stories = this.getStories();

    d.reduce((pre, cur, key) => {
      cur.stories = stories;
      pre[key] = cur;
      return pre;
    }, {});
  }

  getStories() {
    let storiesEl = this.getStoriesEl();

    // TODO: return collection of PTStory

  }

  getStoriesEl() {
    return this.storiesContainer.map((i, el) => {
      el = $(el);
      let name = this.sectionNames[i];
      let stories = el.find(">div>div");
      return {
        name: name,
        val: stories
      };
    })
      .get()
      .reduce(Util.nameValSquash, {});
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
        val: this.getSection(section)
      };
    }).reduce(Util.nameValSquash, {});
  }

  setText(name, val) {
    this.texts[name] = val;
  }

  getText(name) {
    return this.texts[name];
  }

};

var PTStory = class {

  constructor(el) {
    this.el = el;
    this.parseEl();
  }

  parseEl(el) {
    /** TODO: 
     * - create getters for these that traverse the DOM for the values
     */
    this.type = type;
    this.points = points;
    this.name = name;
    this.owner = owner;
    this.url = url;
    this.tags = tags;
  }

};

var test = new PTAnalytics();