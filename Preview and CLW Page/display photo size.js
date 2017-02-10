/*

  Todo: 
  - Check if file path matches regex/contains g5-orion-clients, 
    then add addition info: display the client it's coming from

  5/10/2016 - v1 - OG Release Date
*/

/* global $, Image */
if (DisplayPhotoSize == undefined) {
  var DisplayPhotoSize = {
    target: undefined,
    photos: undefined,

    init: function() {
      // set target
      this.target = this.getTarget();
      // gather photos
      this.photos = $("img[src]", this.target);
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
      this.photos.each(function(i, e) {
        var el, image, dimensionsNatural, dimensionsActual, altText, fileName, leftColStyle, rightColStyle;

        el = $(e);
        altText = el.attr("alt");
        fileName = this.getFileName(el.attr("src"));
        // From Kyle's asset size bookmarklet
        image = new Image();
        image.onload =function()
        { 
          dimensionsNatural = image.naturalWidth+'x'+image.naturalHeight;
          dimensionsActual = el.width()+'x'+el.height();
          
          if (dimensionsNatural != dimensionsActual)
          {
            dimensionsNatural = "<span style='color: red;'>"+dimensionsNatural+"</span>";
          }
          
          leftColStyle = "style='text-align: right; color: #FFBE00;'";
          rightColStyle = "style='text-align: left; padding-left: 10px;'";
          
          el.after("<table class='photoSize' style='background: black; color: white;'>" + 
            "<tr><td "+leftColStyle+">File Dim:</td><td "+rightColStyle+">"+dimensionsNatural+"</td><tr>"+
            "<tr><td "+leftColStyle+">Render Dim:</td><td "+rightColStyle+">"+dimensionsActual+"</td><tr>"+
            "<tr><td "+leftColStyle+">File Name:</td><td "+rightColStyle+">"+fileName+"</td><tr>"+
            "<tr><td "+leftColStyle+">Alt Text:</td><td "+rightColStyle+">"+altText+"</td></tr></table>");
        };
        image.src = el.attr('src');

      }.bind(this));
    },
    purgeOldUI: function() {
      $(".photoSize", this.target).remove();
    },
    getFileName: function(path) {
      return path.substring(path.lastIndexOf('/')+1);
    }
    
  }

  DisplayPhotoSize.init();
}
else {
  DisplayPhotoSize.purgeOldUI();
  DisplayPhotoSize = undefined;
}
