#Responsive Text

This is a pretty straightforward tool for making font sizes match properties 
like height and width in their containing elements.

###Fixed Height:
####HTML
    <p id="some_p" style="height:100px"><span>Text to be sized</span></p>

####Javascript
    $('#some_p > span').responsiveText({
        'height' : true,
        'heightRatio': 0.1
    });

####Result
The font size will match the height of the element * height ratio. Responsive 
Text will not attempt to prevent lines from wrapping.

###Fixed Width:
####HTML
    <p id="some_p" style="width:100px"><span>Text  to be sized.</span></p>
####Javascript
    $('#some_p > span').responsiveText({
        'width' : true,
        'widthRatio': 0.1
    });

####Result
The font size will match the width of the element * width ratio. Responsive 
Text will force text onto one line (the result may be VERY small font-size).

###Fill:
####HTML

    <p id="some_p" style="height:100px;width:100px"><span>Text  to be 
    sized.</span></p>

####Javascript
    $('#some_p > span').responsiveText({
        'fill' : true
    });

####Result
Responsive Text will attempt to fill the element with the text. Responsive Text 
attempt to match the current height of the element (with wrapping). Since line
breaks can be enforced arbitrarily, this may require multiple guesses.

###Options
    minFontSize: double
        The smallest font-size allowed.

    maxFontSize: double
        The largest font-size allowed.

    width: boolean
        Indicates whether or not to match the width of the element.

    widthRatio: double
        What percentage of the full width of the element to match.

    height: boolean
        Indicates whether or not to match the height of the element.

    heightRatio: double
        What percentage of the full height of the element to match.

    fill: boolean
        Indicates that both the height and width of the element should be 
        matched. 

        This can also be accomplished by setting both height and width to true.

    maxGuesses: integer
        The maximum number of guesses that will be made when filling a 
        fixed-height & fixed-width element.