// v1.0
// Author: Cody Swartz

$('.panel.panel-info .panel-body input:first-of-type').each(function(){
    if ($(this).value().indexOf('&') > -1)
        console.log(this);
});