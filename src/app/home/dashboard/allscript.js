$(function(){
    "use strict";
    $(".mdl-button__ripple-container").click(function(){
        var a = $(this).parents(".mdl-layout__drawer");
        if ( a.hasClass("is-visible") ){
            a.removeClass("is-visible");
            //alert("a");
            $(".mdl-layout__obfuscator").removeClass("is-visible");
        }
    });
});