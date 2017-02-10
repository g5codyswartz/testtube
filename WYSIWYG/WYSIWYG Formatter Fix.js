//CKEDITOR.instances['ckeditor'].destroy(); CKEDITOR.replace('ckeditor');

// v2
/* global CKEDITOR */
Object.keys(CKEDITOR.instances).forEach(function(key,i){
    CKEDITOR.instances[key].destroy();
    CKEDITOR.replace(key);
});