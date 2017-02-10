/*

  Todo: 
  - Display link path / final page, maybe show if it's local or external

  5/9/2016 - v1 - OG Release Date
*/

/* global $ */
if (DisplayLinkType == undefined) {
  var DisplayLinkType = {
    target: undefined,
    links: undefined,

    init: function() {
      // set target
      this.target = this.getTarget();
      // gather links
      this.links = $("a[href]", this.target);
      // purge any old UI
      this.purgeOldUI();
      // show UI
      this.displayUI();
    },
    getTarget: function() {
      var preview = this.getPreview();
      return preview.length > 0 ? preview.contents()[0] : document;
    },
    getPreview: function() {
      return $(".preview iframe");
    },
    displayUI: function() {
      var el, linkType;
      this.links.append(function(i) {
        el = $(this.links[i]);
        linkType = el.attr('target');
        return " <span class='linkType' style='background: black; color: red;'>" + linkType + "</span>";
      }.bind(this));
    },
    purgeOldUI: function() {
      $(".linkType", this.target).remove();
    }

  }

  DisplayLinkType.init();
}
else {
  DisplayLinkType.purgeOldUI();
  DisplayLinkType = undefined;
}
