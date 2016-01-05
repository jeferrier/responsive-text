/*global jQuery */
/*!
* ResponsiveText 0.0.1
* Created by James Ferrier
* 12/23/2015
* 
* This work is released under the MIT license.
* Copyright (c) 2015 James Ferrier
*
*/

(function( $ ){

  // var listeners = [];

  // function findListener( object ){

  //   var location = -1;
  //   for (var a = 0; a < listeners.length; a++){

  //     if (listeners[a] === object){

  //       location = a;
  //       break;

  //     }

  //   }

  //   return location;

  // }

  // function addListener( object ){

  //   if (findListener(object) == -1)
  //     listeners.push(object);
  //   return;

  // }

  // function removeListener( object ){

  //   var location = findListener(object);
  //   if (location == -1)
  //     return;
  //   listeners.splice(location, 1);

  // }

  $.fn.responsiveText = function( options ) {

    // Setup options
    var settings = $.extend({
          'minFontSize'    : Number.NEGATIVE_INFINITY,
          'maxFontSize'    : Number.POSITIVE_INFINITY,
          'width'          : false,
          'widthRatio'     : 1.0,
          'height'         : false,
          'heightRatio'    : 1.0,
          'fill'           : false,
          'viewportHeight' : false,
          'viewportWidth'  : false
        }, options);

    return this.each(function(){

      if (settings.height === false && settings.width === false){
        alert("No Op");
        return;
      }

      // Store the object
      var $this = $(this);

      // Resizer() resizes items based on the object width divided by the compressor * 10
      var resizer = function () {
        $this.css('font-size', 
          Math.max(Math.min($this.width() / (compressor*10), 
          parseFloat(settings.maxFontSize)), 
          parseFloat(settings.minFontSize)));
      };

      // Call once to set.
      resizer();

      // Call on resize. Opera debounces their resize by default.
      $(window).on('resize.responsivetext orientationchange.responsivetext', resizer);

    });

  };

})(jQuery);