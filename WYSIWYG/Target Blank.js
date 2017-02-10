
var data, inst;
Object.keys(CKEDITOR.instances).forEach(function(key,i) {
    
    //debugger;
    //console.log(key);
    
    // get instance and data
    inst = CKEDITOR.instances[key];
    data = inst.getData();
    
    //console.log(data);
    
    // set to jquery element - wrap it so we can get the inner html later
    data = $("<div>"+data+"</div>");
    
    // remove spans
    data.find("a").attr("target", "_blank");
    
    // set/save data
    inst.setData(data.html());
    
});