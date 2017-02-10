//https://g5-cms-ikzy8kh7-carlo-inc-clie.herokuapp.com/api/v1/clients/1

/*
  v1.0 - 5/16/2016
    Initial Release
*/

/* global $ */
$.getJSON('/api/v1/clients/1', function(data, status) {
  window.open('https://g5-hub.herokuapp.com/admin/clients/'+data.client.urn);
});