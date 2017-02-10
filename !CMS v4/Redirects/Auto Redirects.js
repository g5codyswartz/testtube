/*
    Todo: 
        - add "Redirects remove question marks.js" to this
        - check for duplicates (within the same textarea and across others)
        - make sure the redirect rule isn't the same route as the new page
        - validate redirects before entering them - make sure all pages exist
    
        - Refactor appendRedirects so that it fitlers out textareas that are 
        not empty and focuses them after they are all appended.
        - Get pages button
        - Auto Submit after clicking go - maybe if validation is in place!
        
    Done: 
        - v1.4.0 - Tyler Hasenoehrl Updated this to work with CMS v4
        - v1.3.2 - Adds case insensitive page names and trimming
        - v1.1 Clear button - clear all current rules - 12/19/2015
        - v1.0 initial release - 12/18/2015
        
    Ideas:
        Path Consolidation
            Would need group redirects into pages and then see how much they have similiar 
            then ask the user if they would like to consolidate them
        Conflict checker
            Would need to check if redirect rules contained eachother in other pages
*/
/* global $ */
var AutoRedirects = {
    version: "1.4.0",
    textarea: null,
    submitButton: null,
    clearButton: null,
    elHook: null,
    pageContainers: null,
    pageNames: null,
    redirectRules: null,
    error: false,
    
    init: function() {
        // init properties
        this.textarea = $("#pasteRedirects");
        this.submitButton = $("#submitRedirects");
        this.clearButton = $("#clearRedirects");
        this.elHook = $(".redirects .container-header");
        this.pageContainers = $(".redirects .ember-view .collection .collection-item");
        this.pageNames = $("span.title", this.pageContainers);
        this.redirectRules = $(".secondary-content .input-field textarea.ember-text-area", this.pageContainers);
        this.Buttondiv = $("#buttondiv");
        
        // check if already on page
        if (this.textarea.length === 0)
        {
            this.createTextarea();
            this.createSubmitButton();
            this.createClearButton();
            
        }
    },
    createTextarea: function() {
        this.textarea = $("<textarea id='pasteRedirects' rows='20' style='min-height: 200px; background: #fff; margin-top: 15px;'>");
        // cannot do multi-line placeholder via attribut due to specs, but you can do it through JS ;)
        this.textarea.attr("placeholder", "Paste your redirects from a spreadsheet here. Then hit the GO! button.\r\n"+
        "Column 1 = Page Name\r\nColumn 2 = Redirect Rule\r\n\r\n"+
        "This will append to the current redirects.");
        this.elHook.after(this.textarea);
    },
    createSubmitButton: function() {
        this.submitButton = $("<button id='submitRedirects' class='btn green' style=' margin-right: 10px;  margin-top: 10px; margin-bottom: 50px;'>Auto Redirects v"+this.version+" GO!</button>");
        this.textarea.after(this.submitButton);
        this.submitButtonEvent();
    },
    submitButtonEvent: function() {
        this.submitButton.click(function(e) {
            e.preventDefault();
            this.appendRedirects();
        }.bind(this));
    },
    createClearButton: function() {
        this.clearButton = $("<button id='clearRedirects' class='btn green' style='margin: 10px; margin-bottom: 50px;'>Clear All Redirects</button></div>");
        this.submitButton.after(this.clearButton);
        this.clearButtonEvent();
    },
    clearButtonEvent: function() {
        this.clearButton.click(function(e) {
            // focus text area to trigger an ember update, otherwise nothing gets passed to the server
            $("textarea", this.pageContainers).val("").focus();
             // refocus back to the top
            this.textarea.focus();
        }.bind(this));
    },
    appendRedirects: function() {
        var redirects = this.parseRedirects();
        this.error = false;
        
        redirects.each(function(i, e) {
            this.applyRedirect(e);
        }.bind(this));
        
        if (this.error)
        {
            alert("Check the console for a list of page(s) that did not match");
        }
        
        // refocus back to the top
        this.textarea.focus();
    },
    applyRedirect: function(redirect) {
        var el = this.getElByPageName(redirect.page);
        if (el.length == 0)
        {
            console.log("Missing Page",redirect);
            this.error = true;
        }
        var textarea = $("textarea", el.parent());
        // focus text area to trigger an ember update, otherwise nothing gets passed to the server
        //console.log("EL",textarea)
        textarea.focus();
        // if empty just the path, otherwise a newline and the path
        textarea.val(textarea.val() == "" ? redirect.path : textarea.val()+"\r\n"+redirect.path);
    },
    parseRedirects: function() {
        return this.textarea.map(function(i, e) {
            // split on new lines
            return $(e).val().split(/\n/).map(function(e, i){
                // split on tabs
                var redirect = e.split(/\t/);
                // return new Redirect object
                return new Redirect(redirect[0], redirect[1]);
            });
        });
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
var Redirect = function(page, path) {
    this.page = page;
    this.path = path;
};
AutoRedirects.init();