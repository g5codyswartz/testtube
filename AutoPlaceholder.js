// v1.3
// Author: Cody Swartz

// Check for stragglers like G+ input that has no place holder yet
//  Then inject the place holder to bandaide it so we can  handle it
//  Also patch any that have incorrect placeholders
$("input[type=text][id^=widget_settings_attributes]").each(function() {
    $(this).attr('placeholder', getCorrectPlaceholder(this));
});

var liquidInputs = $('[placeholder^="{{"]');

// Add AutoPlace Button for liquid inputs
liquidInputs.after(function() {
    var placeholderVal = $(this).attr('placeholder');
    return '<button style="margin-top: 5px;" class="autoPlacer" phVal="'+placeholderVal+'">Auto Place</button>';
});

// Auto Place button event
$('.autoPlacer').click(function(e){
    e.preventDefault(); // prevent form submission
    
    var placeholderVal = $(this).attr('phVal');
    var neighbor = $(this).parent().children('[placeholder^="{{"]')[0];
    
    $(neighbor).val(placeholderVal);
    
    // maybe double click for fill in? need timer that resets a counter attribute on the element
    // get parent and then the placeholder within the parent
    // if jQuery defaultly supported background-color I would use that and the jQuery animate
    
});

if (confirm("Auto Place All? This will overwrite all liquid inputs values."))
{
    liquidInputs.each(function(){
        $(this).val($(this).attr('placeholder'));
    });
}

function getCorrectPlaceholder(el) {
    
    var placeholderName = $(el).attr('placeholder');
    
    switch(placeholderName)
    {
        case "{{twitter_username}}":
            return "{{location_twitter_id}}";
        case "{{facebook_username}}":
            return "{{location_facebook_id}}";
        case "{{yelp_username}}":
            return "{{location_yelp_id}}";
        case undefined: // fall through
        case "": // No placeholder
            var placeholderParent = $(el).parent();
            var inputLabel = $("label", placeholderParent);
            var inputLabelText = inputLabel.text();
            
            if (inputLabelText.indexOf("Google+") > -1 || inputLabelText.indexOf("Google +") > -1)
                return "{{location_google_plus_id}}";
            
            // otherwise just let this case fall through to default
        case undefined:
            return "";
            
        default:
            console.log("No placeholder translation found for: '"+placeholderName+"'");
            return placeholderName;
    }
}