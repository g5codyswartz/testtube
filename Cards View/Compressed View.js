// imported & stripped down from Page Overview.js
var CVTools = {
  addCSS: function(prefix, cssStyles) {
		var prefix = 'css-'+prefix+"-";
		var rndId = CVTools.getRandomId(prefix);
		$("<style id='"+prefix+rndId+"'>" + cssStyles + "</style>").appendTo("head");
		return rndId;
	},
  removePreviousInjectedCSS: function(prefix) {
    $('[id^="css-'+prefix+'-"]').remove();
  },
  // http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
  getRandomInt: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  getRandomId: function(prefix) {
    prefix = prefix == undefined ? '' : prefix;
    var rnd;
    do {
      rnd = this.getRandomInt(100, 999);
    }
    while ($('#' + prefix + rnd).length > 0)
    return prefix + rnd;
  }
}

CVTools.removePreviousInjectedCSS("compressed-cards");
console.log(CVTools.addCSS("compressed-cards",
  ".card { height: 120px; } .card-screencap-container { display: none; } "+
  ".card-container { height: auto; padding-bottom: 0px; } "));