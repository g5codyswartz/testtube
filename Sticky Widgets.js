/* 
    v1.2
    - Clicking the bookmarklet again doesn't add another button - check if it's already there
    - refractored code to be object oriented and contained
    
    v1.1
    - Support for Click 2 Edit era.
    
    v1.0
    Author: Cody Swartz

    Idea, Highlight current position: $("iframe.ember-view").contents().scrollTop()
    could use some kinda scroll spy plugin
 
    [x] Auto apply to main on load

    container needs max-width

    Highlight which content stripe the iframe is scrolled into view
    Have an anchor jump to jump to the given stripe 
     - might be better as part of widget namer
     It's going to require a mapping system that probably goes through and names the given 
     associated content stripes : (
 
 Todo: 
    - make the button at the top right of the container
        top: 3px;
        position: absolute;
        right: 3px;
    
    
*/

var Helpers = {
    addCSS: function (cssStyles) {
    	$("<style>"+cssStyles+"</style>").appendTo("head");
    }
}

var StickyWidgets = {
    
    bottomLeftFixedWidgetCSS: ".builder .widget-drop-zone.bottomLeftFixedWidget {"+
    "    position: fixed;"+
    "    left: 10px;"+
    "    bottom: 10px;"+
    "    z-index: 1045;"+
    "    background-color: rgba(255,255,255,.8);"+
    "    border: 3px solid rgba(0,0,0,.2);"+
    "    width: initial;"+
    "} "+
    ".builder .bottomLeftFixedWidget .add-drop-zone, .builder .bottomLeftFixedWidget .remove-drop-zone {"+
    "   display: none;"+
    "}",
    
    myButtonCSS:  ".myButton {"+
        "top: 2px;"+
        "position: absolute;"+
        "right: 2px;"+
		"padding: 0px 2px;"+
  		"background-color: #3699C6;"+//#222;"+
  		"color: white;"+
  		"border: 0px solid #222;"+
  		"border-radius: 4px;"+
//  		"width: 20px;"+
//  		"height: 18px;"+
  		"letter-spacing: 1px;"+
//  		"font-weight: bold;"+
  		"padding-left: 3px;"+
  		"margin-bottom: 2px"+
  		"}",
    
    init: function() {
        
        if (!this.alreadyInjected())
        {
            // inject custom css classes
            Helpers.addCSS(this.bottomLeftFixedWidgetCSS);
            Helpers.addCSS(this.myButtonCSS);
            
            // allow child to appear outside of the parent
            $(".editor").css("overflow", "visible");
            
            this.addButton();
        }
        
        // start the widget fixed when running the script
        this.setFixed();
    },
    alreadyInjected: function() {
        return $(".myButton").length > 0;
    },
    addButton: function() {
        // inject our class toggler button to widgets
        // http://character-code.com/arrows-html-codes.php
        $('<button class="toggleFixed myButton">&#8633;Stick</button>')
            .insertAfter('.builder .widget-drop-zone h2:first-of-type')
            .click(function(){
               $(this).parent().toggleClass('bottomLeftFixedWidget');
        });
    
    
    },
    setFixed: function() {
        $(".widget-drop-zone.main-widgets").addClass('bottomLeftFixedWidget');
    }
    
}



// On document ready
$(function(){
    
    StickyWidgets.init();
    
});