var ClickableProject = class {

  constructor() {
    this.project = $("#time_card_project_id");
    this.projects = $("table.table:eq(1) tr>td:nth-child(3)");
    this.projectOptions = $("option", this.project);
    this.options = this.getOptions();

    // Register Events
    this.projectClick();

    // Inject Styling
    this.styleProject();
  }

  selectProject(name) {
    if (!this.options.hasOwnProperty(name)) {
      alert(`Project Not Found ${name}`);
    }
    let option = this.options[name];
    this.project.val(option);
    //console.log("name",name,"option",option);
  }

  projectClick() {
    let myThis = this;
    this.projects.click(function () {
      let el = $(this);
      let text = el.text().trim();
      myThis.selectProject(text);
    });
  }

  styleProject() {
    this.projects.css({
      "cursor": "pointer",
      "color": "blue",
      "text-decoration": "underline",
      "display": "block",
      "margin": "0px",
    });
    /**
     * Remove border top from the first project, 
     *  otherwise we get a double border due to the new display
     */
    $(this.projects[0]).css("border-top", "0");
  }

  getOptions() {
    return this.projectOptions.get().reduce((prev, cur) => {
      let el = $(cur);
      let val = el.attr("value");
      let text = el.text().trim();
      prev[text] = val;
      return prev;
    }, {});
  }

};

var clicky = new ClickableProject();