/// Globals
var iframeSrcLocation;

// jQuery Cached elements
var elRefreshPreview;
var elPreviewIframe;

$(function(){
    // Set & cache global jQuery elements
    elPreviewIframe = $('.preview iframe');
    
    // Grab frame src attribute
    iframeSrcLocation = $(elPreviewIframe).attr('src')

    // Add refresh button
    $('.page .builder .l-container.page-section')
        .append('<button id="refreshPreview" style="position: absolute; left: 20px; bottom: 2px; background-color: #222; color: white; border: 0;">&#x21bb; Refresh Preview</button>');
    
    // Set & cache global jQuery elements
    elRefreshPreview = $('#refreshPreview');
    
    // Refresh button event
    $(elRefreshPreview).click(function(){
        $('.preview iframe').attr('src', iframeSrcLocation)
    });
    
    // Frame loaded event
    $(elPreviewIframe).on('load', function() {
        console.log('Frame Loaded');
    });
});
