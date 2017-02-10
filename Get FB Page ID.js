var metas = document.getElementsByTagName("meta");
metas = Array.prototype.slice.call(metas, 0);
var content;
var pattern = /fb:\/\/page\/(\d*)$/g;

var meta = metas.filter(function(e,i){
  content = e.getAttribute("content");
  if (content && pattern.test(content))
  {
    return e;
  }
})[0];

var matches = pattern.exec(meta.getAttribute("content"));
console.log(matches);

//alert("Check console log for FB ID: "+matches[1]);
document.write("Facebook ID: "+matches[1]);
//copy(matches[1]);