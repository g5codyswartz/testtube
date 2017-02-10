
var pairs = {
    "store.branded_name": "location_name",
    "store.city": "location_city",
    "store.state": "location_state",
    "store.state_long": "location_state_name",
    "store.zip": "location_postal_code",
    "store.marketing_number": "location_phone_number",
    "store.location_label": "location_name",
    "store.qualifier": "location_qualifier",
    "store.landmark": "location_landmark_1_name",
    "store.uni": "location_nearby_schools",
    "store.university": "location_nearby_schools",
    "store.style": "location_property_feature_1",
    "store.employer": "location_nearby_employers",
    "store.amenities_x": "location_apartment_amenity_1",
    "store.neighborhood": "location_neighborhood",
};

var keys = Object.keys(pairs);

/* global CKEDITOR, $ */
var inst,data,reg;
Object.keys(CKEDITOR.instances).forEach(function(key,i) {
    
    //debugger;
    //console.log(key);
    
    // get instance and data
    inst = CKEDITOR.instances[key];
    data = inst.getData();
    
    // remove nbsp's
    keys.forEach(function(key,i){
        reg = new RegExp(key, "gm");
        data = data.replace(reg, pairs[key]); 
    });
    
    // set to jquery element - wrap it so we can get the inner html later
    data = $("<div>"+data+"</div>");
    
    // set/save data
    inst.setData(data.html());
    
});
