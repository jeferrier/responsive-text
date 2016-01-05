/*global jQuery */
/*
* ResponsiveText 0.0.1
* Created by James Ferrier
* 12/23/2015 - 01/04/2015
* 
* This work is released under the MIT license.
* Copyright (c) 2015 James Ferrier
*
* 
* Credit to https://github.com/davatron5000/FitText.js
* for the original draft that inspired this rewrite
*/

(function( $ ){

  $.fn.responsiveText = function( options ){

    //Setup options
    var settings = $.extend({
          'minFontSize'    : Number.NEGATIVE_INFINITY,
          'maxFontSize'    : Number.POSITIVE_INFINITY,
          'width'          : false,
          'widthRatio'     : 0.1,
          'height'         : false,
          'heightRatio'    : 0.1,
          'fill'           : false,
          'maxGuesses'     : 3
        }, options);

    return this.each(function(){

      //We don't support dynamic font sizing with dynamically sized elements
      if (settings.height == false && settings.width == false){

        //This is the case where just "fill":true
        if (settings.fill == true) {
          settings.height = true;
          settings.width = true;
        } else {
          return;
        }

      }

      //Store the object we're operating on, locally
      var $this = $(this);

      //Assemble the function that will resize our object
      var resizer = function(){ console.log("ResponsiveText: No op function called."); };

      if (settings.width == true){

        if (settings.height == true){

          //The element we are trying to fill has an area.
          //The text also has an area.
          //Our goal is to make those areas match as closely as possible.

          //If we imagine all of the text on one line, the area of that text is
          //  font-size * width-of-all-characters
          //
          //The width of a character is actually some-base-width * font-size
          //So we can reimagine the text on one line with a new area
          //  font-size * font-size * some-base-width-of-all-characters
          //
          //So the question becomes, what is some-base-width-of-all-characters?
          //To do this, we'll set the white-space property to nowrap. In this way
          //we'll force all of the characters to be on one line.
          //Then we can divide the element's width by font-size to get 
          //some-base-width-of-all-characters.
          //
          //But there's still a problem. The browser will do intelligent line breaking
          //and so we don't actually know where these line breaks will force us to
          //increase the number of lines.
          //
          //This is where guessing comes in.
          //We're going to have to set the font-size to fill the area,
          //then check to see if we've OVERFILLED it. And if so, attempt to intelligently
          //guess how to nudge ourselves back under the area target.

          //Same behavior no matter what fill is
          //Attempt to fill the area with the text
          var oldWhiteSpace = $this.css("white-space");
          $this.css("white-space", "nowrap");
          var indexWidth = $this.width() / parseFloat($this.css("font-size"));
          $this.css("white-space", oldWhiteSpace);

          resizer = function(){
            
            //Start by figuring out the current area of the parent
            var area = $this.parent().width() * $this.parent().height();

            //Now let's try to guess the new font size from our formula
            //This is the 0th guess, and will ALWAYS happen
            var squaredFontSize = area / indexWidth;
            var fontSize = Math.sqrt(squaredFontSize);
            $this.css("font-size", Math.max(Math.min(fontSize, parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)) + "px");

            //Now we need to verify that this new set of dimensions is smaller than our target.
            //NOTE: In further revisions, this will also adjust UP to the desired height (if we guess too small).
            var guessCount = 0;
            while ($this.height() > $this.parent().height() && guessCount < settings.maxGuesses){

              //Evaluate the current area of this element
              var currentArea = $this.height() * $this.width();

              //Find the effective font size of this element
              var effectiveFontSize = currentArea / indexWidth;
              effectiveFontSize = Math.sqrt(effectiveFontSize);

              //Adjust ourselves down by the difference between them
              fontSize -= (effectiveFontSize - fontSize);

              $this.css("font-size", Math.max(Math.min(fontSize, parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)) + "px");
              guessCount++;

            }

          };

        } else {

          //Set the font-size to some portion of the parent's width
          var oldWhiteSpace = $this.css("white-space");
          $this.css("white-space", "nowrap");
          var indexWidth = $this.width() / parseFloat($this.css("font-size"));
          $this.css("white-space", oldWhiteSpace);

          resizer = function(){
            var maxWidth = $this.parent().width();
            var fontSize = (maxWidth * parseFloat(settings.widthRatio)) / indexWidth;
            $this.css("font-size", Math.max(Math.min(fontSize, parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)) + "px");
          };

        }

      } else if (settings.height == true) {

        //Set the font-size to some portion of the parent's height
        resizer = function(){
          var maxHeight = $this.parent().height();
          var fontSize = maxHeight * parseFloat(settings.heightRatio);
          $this.css("font-size", Math.max(Math.min(fontSize, parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)) + "px");
        };

      }

      //Call once to set the initial font size
      resizer();

      //Set an event handler on the window, to resize this element
      $(window).on('resize.responsivetext orientationchange.responsivetext', resizer);

    });

  };

})(jQuery);