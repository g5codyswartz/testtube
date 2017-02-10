
// Grabbed Ids but they didn't work, they don't match, they're different

/* global $ */
var iframe = $("#preview iframe");
var topWidgets = $("#drop-target-main>*", iframe.contents());
var previewDataIds = topWidgets.map(function(){ return $(this).attr('data-id'); });

var paneWidgets = $("#side-nav-secondary ul.side-nav> ul li.active div.collapsible-body div.collection [data-ember-action]");
var paneDataIds = paneWidgets.map(function() { return $(this).attr('data-ember-action'); });