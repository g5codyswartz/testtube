/* global $ */
var HoursTools = {

  officeHours: undefined,
  accessHours: undefined,
  init: function() {
    this.officeHours = $("#location_office_hours");
    this.accessHours = $("#location_access_hours");
  },
  clean: function() {
    this.init();

    // gather
    var officeHours = this.officeHours.val();
    var accessHours = this.accessHours.val();

    // remove quotes
    officeHours = this.removeQuotes(officeHours);
    accessHours = this.removeQuotes(accessHours);
    // add br tags
    officeHours = this.addBrTags(officeHours);
    accessHours = this.addBrTags(accessHours);

    // save back
    this.officeHours.val(officeHours);
    this.accessHours.val(accessHours);

  },
  removeQuotes: function(str) {
    str = this.Strings.removeBackQuotes(str);
    str = this.Strings.removeFrontQuotes(str);
    return str;
  },
  addBrTags: function(str) {
    return str.split("\n").join("<br>\n");
  },
  // helpers
  Strings: {
    removeFrontQuotes: function(str) {
      if (str.indexOf('"') === 0) {
        str = str.substring(1);
      }
      return str;
    },
    removeBackQuotes: function(str) {
      if (str.slice(-1) == '"') {
        str = str.slice(0, -1);
      }
      return str;
    }
  }

}

HoursTools.clean();





// not yet tested, may ditch this
/* OG Unfinished
var officeHours = $("#location_office_hours");
var accessHours = $("#location_access_hours");

officeHours.val(trim(officeHours.val(),"\""));

// http://codereview.stackexchange.com/questions/28464/trim-certain-characters-from-a-string-in-javascript
var trim = (function () {
    "use strict";

    function escapeRegex(string) {
        return string.replace(/[\[\](){}?*+\^$\\.|\-]/g, "\\$&");
    }

    return function trim(str, characters, flags) {
        flags = flags || "g";
        if (typeof str !== "string" || typeof characters !== "string" || typeof flags !== "string") {
            throw new TypeError("argument must be string");
        }

        if (!/^[gi]*$/.test(flags)) {
            throw new TypeError("Invalid flags supplied '" + flags.match(new RegExp("[^gi]*")) + "'");
        }

        characters = escapeRegex(characters);

        return str.replace(new RegExp("^[" + characters + "]+|[" + characters + "]+$", flags), '');
    };
}());
*/