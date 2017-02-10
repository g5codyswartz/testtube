class FilterProject {

  constructor() {
    this.form = $("#new_time_card");
    this.inputId = "filterProjectInput";
    this.input = $(`#${this.inputId}`);
    this.select = this.form.find("#time_card_project_id");
    this.options = this.select.find("option");

    // Add UI
    if (!this.hasInput()) {
      this.addInput();
    }

  }

  hasInput() {
    return this.input.length > 0;
  }

  addInput() {
    this.input = $(`<input id="${this.inputId}">`);
    $(this.input).insertAfter(this.form);

    // Add event
    $(this.input).on('input', (e) => { this.filter(e); });
  }

  getInput() {
    return this.input.val();
  }

  filter(e) {
    //debugger;
    let input = this.getInput().toLowerCase();
    this.options.each((i, el) => {
      el = $(el);
      if (el.text().toLowerCase().indexOf(input) > -1) {
        el.show();
      } else {
        el.hide();
      }
      //debugger;
    });
  }
}

var filtering = new FilterProject();