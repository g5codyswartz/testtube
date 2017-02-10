/* v1.1
* Author: Cody Swartz
* Options: 
*   localStorage.agressiveLiquidState = true/false
*       If true it will select {{location_state}} automatically
*/
    

var query = $('option[value="AL"]');

$('<option value="{{location_state}}">{{location_state}}</option>').insertBefore(query).val('{{location_state}}');

if (localStorage.agressiveLiquidState === "true")
    $(query).parent("select").val("{{location_state}}");