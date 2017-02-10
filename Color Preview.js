console.log('init');

// init add preview & event listener for input/change
$(".modal-body input[type=text]").each(function(index, el) {
    updateColor(el);
}).on('input', function(e) {
    updateColor(this);
});

function updateColor(el) {
    var jEl = $(el);
    var parent = jEl.parent();
    
    if (jEl.val().indexOf("#") === 0)
    {
        var colorPreview = $(".colorPreview", parent);
        
        // update
        if (colorPreview.length > 0)
        {
            var input = $('input[type=text]', parent);
            var color = input.val();
            
            colorPreview.css('background-color', color);
        }
        // add
        else
        {
            addColorPreview(el)
        }
    }
    else // try to remove
    {
        $(".colorPreview", parent).remove();
    }
    
    
}

function addColorPreview(el) {
    var jEl = $(el);
    var parent = jEl.parent();
    var input = $('input[type=text]', parent);
    var topPos = input.position().top;
    var color = input.val();
    
    // set parent's positioning
    parent.css("position", "relative");
    
    // add our color preview
    $("<div class='colorPreview' style='display: block; width: 27px; height: 27px;"+
        " position: absolute; top: 24px; right: 0px; border: 1px solid black; "+
        " background-color: "+color+"'></div>").appendTo(parent);
}