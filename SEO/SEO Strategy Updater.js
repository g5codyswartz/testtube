/*
  Todo: 
    - Add button that opens up the strategies sheet
    - Add a BR for the buttons - clear below the setting
  
  Done: 
    - v1.0.1 - Adds Climate Control Translation
    - v1.0.0 - initial release - 6/21/2016
  
  Ideas:
    
*/

/* global $ */
var AutoSEO = {
  version: "1.0.1",
  dateUpdated: "6/21/2016",
  author: "Coder Swartz",
  textarea: null,
  submitTitleAndDescription: null,
  submitH1Button: null,
  clearTitleDescriptionButton: null,
  clearH1Button: null,
  elHook: null,
  pageContainers: null,
  pageNames: null,
  pages: null,
  error: false,
  translation: {
    Residents: "Current Residents",
    Reviews: ">> Reviews",
    Suggestions: "Suggestion Box",
    "Privacy Policy": ">> Privacy Policy",
    "Climate Control": "Climate Controlled Units"
  },

  init: function() {
    // init properties
    this.textarea = $("#pasteSEO");
    
    this.submitTitleAndDescription = $("#submitTitleAndDescription");
    this.submitH1= $("#submitH1");
    this.clearTitleDescriptionButton = $("#clearTitleDescription");
    this.clearH1Button = $("#clearTitleDescription");
    
    this.elHook = $(".page-title:eq(0)")
    this.pageContainers = $(".faux-table-body")[0];
    this.pageNames = $(".faux-table-cell.name", this.pageContainers);
    this.titles = $(".faux-table-cell.title", this.pageContainers);
    this.descriptions = $(".faux-table-cell.description", this.pageContainers);
    this.h1s = $(".faux-table-cell.h1", this.pageContainers);

    // check if already on page
    if (this.textarea.length === 0) {
      this.createTextarea();
      //this.createClearTitleDescriptionButton();
      //this.createClearH1Button();
      this.createSubmitTitleAndDescriptionButton();
      this.createSubmitH1Button();
    }
  },
  
  // Create Text Area
  createTextarea: function() {
    this.textarea = $("<textarea id='pasteSEO' rows='20'>");
    // cannot do multi-line placeholder via attribut due to specs, but you can do it through JS ;)
    this.textarea.attr("placeholder", "Paste your SEO strategy from a spreadsheet here.\r\n\r\n" +
      "Column 1 = Page Name\r\nColumn 2 = Title Tag\r\nColumn 3 = Meta Description\r\nColumn 4 = H1\r\n\r\n" +
      "SEO Strategy Updater v"+this.version+"\r\nUpdated: "+this.dateUpdated+"\r\nBy: "+this.author);
    this.elHook.after(this.textarea);
  },
  
  // Create Buttons
  createSubmitTitleAndDescriptionButton: function() {
    this.submitTitleDescriptionButton = $("<button id='submitTitleAndDescription' style='float: right; margin-top: 10px; margin-right: 10px;'>"
      +"Tile + Description</button>");
    this.textarea.after(this.submitTitleDescriptionButton);
    this.submitTitleAndDescriptionButtonEvent();
  },
  createSubmitH1Button: function() {
    this.submitH1Button = $("<button id='submitH1' style='float: right; margin-top: 10px;'>H1</button>");
    this.textarea.after(this.submitButton);
    this.submitH1ButtonEvent();
  },
  createClearTitleDescriptionButton: function() {
    this.clearTitleDescriptionButton = $("<button id='clearTitleDescription' style='float: right; margin-top: 10px; margin-right: 10px;'>"+
      "Clear Title + Description</button>");
    this.textarea.after(this.clearTitleDescriptionButton);
    this.clearTitleDescriptionButtonEvent();
  },
  createClearH1Button: function() {
    this.clearH1Button = $("<button id='clearH1' style='float: right; margin-top: 10px; margin-right: 10px;'>"+
      "Clear H1</button>");
    this.textarea.after(this.clearH1Button);
    this.clearH1ButtonEvent();
  },
  
  // Button Events
  submitTitleAndDescriptionButtonEvent: function() {
    this.submitTitleDescriptionButton.click(function(e) {
      e.preventDefault();
      this.setTitlesDescriptions();
    }.bind(this));
  },
  submitH1ButtonEvent: function() {
    this.submitH1Button.click(function(e) {
      e.preventDefault();
      this.setH1s();
    }.bind(this));
  },
  clearTitleDescriptionButtonEvent: function() {
    this.clearTitleDescriptionButton.click(function(e) {
      // focus text area to trigger an ember update, otherwise nothing gets passed to the server
      $("textarea", this.titles).val("").focus();
      $("textarea", this.descriptions).val("").focus();
      // refocus back to the top
      this.textarea.focus();
    }.bind(this));
  },
  clearH1ButtonEvent: function() {
    this.clearH1Button.click(function(e) {
      // focus text area to trigger an ember update, otherwise nothing gets passed to the server
      $("textarea", this.h1s).val("").focus();
      // refocus back to the top
      this.textarea.focus();
    }.bind(this));
  },
  
  // Applying & Parsing
  setTitlesDescriptions: function() {
    var pages = this.getPageNames();
    this.error = false;

    pages.each(function(i, e) {
      this.applyTitlesDescriptions(e);
    }.bind(this));

    if (this.error) {
      alert("Check the console for a list of page(s) that did not match");
    }

    // refocus back to the top
    this.textarea.focus();
  },
  applyTitlesDescriptions: function(pageName) {
    var el = this.getElByPageName(pageName);
    var page = this.getPage(pageName);
    
    if (el.length == 0 || !page) {
      if (this.translation.hasOwnProperty(pageName))
      {
        var translatedPageName = this.translation[pageName];
        el = this.getElByPageName(pageName);
        page = this.getPage(translatedPageName);
        
        if (el.length == 0 || !page) {
          console.log("Missing Page: ", pageName, " Via Translation: ", translatedPageName);
          this.error = true;
        }
      }
      else {
        console.log("Missing Page: ", pageName);
        this.error = true;
      }
      
    }
    
    if (el.length != 0 && page) {
      var title = $("textarea:eq(0)", el.parent());
      var description = $("textarea:eq(1)", el.parent());
      // focus text area to trigger an ember update, otherwise nothing gets passed to the server
      //console.log("EL",textarea)
      title.focus();
      // if empty just the path, otherwise a newline and the path
      title.val(page.title);
      
      description.focus();
      description.val(page.description);
    }
  },
  parseSEO: function() {
    this.pages = this.textarea.map(function(i, e) {
      // split on new lines
      return $(e).val().split(/\n/).map(function(e, i) {
        // split on tabs
        var redirect = e.split(/\t/);
        // return new Redirect object
        return new SEOPage(redirect[0], redirect[1], redirect[2], redirect[3]);
      })
    });
    return this.pages;
  },
  getPage: function(name) {
    this.parseSEO();
    var page = this.pages.filter(function(i, e){
      return e.page == name;
    });
    return page.length > 0 ? page[0] : false;
  },
  // unused
  getPageNames: function() {
    return this.pageNames.map(function(i, e) {
      return $(e).text().trim();
    });
  },
  getElByPageName: function(pageName) {
    return this.pageNames.filter(function(i, e) {
      return $(e).text().trim().toLowerCase() == pageName.trim().toLowerCase();
    });
  }

}

var SEOPage = function(page, title, description, h1) {
  this.page = page.trim();
  this.title = title.trim();
  this.description = description.trim();
  this.h1 = h1.trim();
};

AutoSEO.init();