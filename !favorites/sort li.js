// http://stackoverflow.com/questions/304396/what-is-the-easiest-way-to-order-a-ul-ol-in-jquery
var uls = $("ul", $("#cke_ckeditor>.cke_inner>.cke_contents iframe").contents());

uls.each(function(){
    var lis = $("li", this).get();
    
    lis.sort(function(a,b){
        var keyA = $(a).text();
        var keyB = $(b).text();
        
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
    });
    
    var ul = $(this);
    
    $.each(lis, function(i, li){
        ul.append(li);
    });
});