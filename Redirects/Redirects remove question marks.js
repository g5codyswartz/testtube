var pageContainers = $(".redirects .location");
var redirectRules = $(".faux-table-cell:nth-of-type(2) textarea", pageContainers);
var found,rules;

redirectRules.each(function(i, e) {
  e = $(e);
  
  rules = e.val();
  rules = rules.split(/\n/).map(function(line, i) {
    found = line.indexOf("?");
    if (found > -1) {
      console.log(line);
      return line.substring(0, found)
    }
    else {
      return line;
    }
  }).join("\n");
  
  // force an update on ember so the save works
  //console.log("EL2",e);
  // Doesn't seem to be working :(
  e.focus();
  e.val(rules);

  // force an update on ember so the save works
  //e.focus();

});