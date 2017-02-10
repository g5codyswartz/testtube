/* global $ dataLayer */
alert(JSON.stringify(dataLayer[0]).split(",").join("\n").slice(1,-1));


// v2.0
alert($("body").contents().filter(function(){return this.nodeType == 8;})[0].nodeValue.trim()+"\n\n"+JSON.stringify(dataLayer[0]).split(",").join("\n").slice(1,-1));


// v3.0
// Todo check if in an iframe in the CMS
var deployInfo = $("body").contents().filter(function(){return this.nodeType == 8;})[0].nodeValue.trim();
var dateTimeReg = /(\d{4}-\d{2}-\d+ \d+:\d{2}:\d{2})/;
var cmsVersionReg = /CMS: v(.*)/;

var dateTime = new Date(dateTimeReg.exec(deployInfo)[1]);
var cmsVersion = cmsVersionReg.exec(deployInfo)[1];
var datas = JSON.stringify(dataLayer[0]).split(",").join("\n").slice(1,-1);

var msg = ""