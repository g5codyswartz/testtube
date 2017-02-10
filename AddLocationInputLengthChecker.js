// v1.0
// Author: Cody Swartz

var longInputTextLengths = 0;
var inputTextFields = $('input[type=text]');
var inputTextFieldsCount = inputTextFields.length;

$(inputTextFields).each(function() { 
    if($(this).val().length > 155) { 
        console.log(this); 
        console.log('^ Above element character length: '+$(this).val().length); 
        longInputTextLengths++;
    }
    
    inputTextFieldsCount--; // count down our elements we're iterating through
    
    // Check for last loop and if we found any inputs over our threshold
    if (inputTextFieldsCount === 0 && longInputTextLengths > 0)
    alert('Found '+longInputTextLengths+' text inputs that were over 155 characters in length. Check the Console for more information.');
});
