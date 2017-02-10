
$.ajax({
	method: "GET", 
	url: "http://blog.storquest.com/feed/",
	jsonp: "callback",
	success: function(data, status, xhr) {
		//console.log("Success, Status: "+status);
		console.log(data);
		console.log(xhr);
	}.bind(this),
	error: function(xhr, status, error) {
		console.log("Error: "+error+" Status: "+status);
		console.log(xhr);
	}.bind(this),
	complete: function(xhr, status) {
		//console.log("Complete, Status: "+status);
		//console.log(xhr);
	}.bind(this)
});

///  http://www.html5rocks.com/en/tutorials/cors/
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {

    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);

  } else if (typeof XDomainRequest != "undefined") {

    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);

  } else {

    // Otherwise, CORS is not supported by the browser.
    xhr = null;

  }
  return xhr;
}

var xhr = createCORSRequest("GET", "http://blog.storquest.com/feed/")

if (!xhr) {
  throw new Error('CORS not supported');
}

// Response handlers.
xhr.onload = function() {
    var text = xhr.responseText;
    console.log(text)
};

xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
};

xhr.send();