wislider
========

A cool full feature slider for jQuery

***
Supports:

IE8+ / Chrome / Firefox / Safari / Netscape (Ok, the last one was a joke)
***

PARAMETERS
========

> *arrowParent*
* **Description:** Set where the navigation arrows should go.
* **Default:** ```.wisliderArrows```
* **Eg.:** ```arrowParent: '.foo'```

> *arrowPrev*
* **Description:** Set the selector for previous navigation arrow
* **Default:** ```.wisliderPrev```
* **Eg.:** ```arrowPrev: '.prev'```

> *arrowNext*
* **Description:** Set the selector for next navigation arrow
* **Default:** ```.wisliderNext```
* **Eg.:** ```arrowNext: '.next'```

> *arrowSelector*
* **Description:** Common selector for both navigation arrows
* **Default:** ```.wisliderArrow```
* **Eg.:** ```arrowSelector: '.arrowSelector'```

> *navParent*
* **Description:** The parent object where navigation buttons should go
* **Default:** ```.wisliderNav```
* **Eg.:** ```navParent: '.navigation'```

> *navSelector*
* **Description:** The selector for each navigation button
* **Default:** ```.wisliderSelector```
* **Eg.:** ```navSelector: '.navigationButton'```

> *navButtons*
* **Description:** ```true``` or ```false``` if you want navigation buttons
* **Default:** ```true```
* **Eg.:** ```navButtons: false```

> *navArrows*
* **Description:** ```true``` or ```false``` if you want navigation arrows
* **Default:** ```true```
* **Eg.:** ```navArrows: false```

> *startAt*
* **Description:** The wislider should start in which slide? (this option are not zero index)
* **Default:** ```1```
* **Eg.:** ```startAt: 2```

> *slideSpeed*
* **Description:** The speed in miliseconds to slide transition
* **Default:** ```500``` (half second)
* **Eg.:** ```slideSpeed: 1000``` (one second)

> *slideEase*
* **Description:** The animation ease of slide animation: ```easein```, ```easeout``` or ```linear```
* **Default:** ```easein```
* **Eg.:** ```slideEase: 'linear'```

> *auto*
* **Description:** Should the slide have slideshow? ```true``` or ```false```
* **Default:** ```true```
* **Eg.:** ```auto: 'false'```

> *waitTime*
* **Description:** How much time wait until slide again in slideshow? (in miliseconds)
* **Default:** ```8000``` (eigth seconds)
* **Eg.:** ```waitTime: '1000'``` (one second)

> *animate*
* **Description:** ```true``` to animate the slide or ```false``` to just change the slide in each step
* **Default:** ```true```
* **Eg.:** ```animate: false```

> *pauseOnHover*
* **Description:** Should the slideshow pause when mouse stand over slide?
* **Default:** ```true```
* **Eg.:** ```pauseOnHover: false```

> *speedAdjustToLength*
* **Description:** Should the speed of slide animation be based on how many slides you have?
* **Default:** ```false```
* **Eg.:** ```speedAdjustToLength: true```
* **Note:** Use this option if you have about 6 or more slides

***

CHANGELOG
========

*Changes 1.0.4*

> ADJUSTMENTS
* The ```speedAdjustToLength``` option are now set ```false``` as default

*Changes 1.0.3*

> ADJUSTMENTS
* Added option to adjust the speed of slide based on how many slides are set: ```speedAdjustToLength```

*Changes 1.0.2*

> ADJUSTMENTS
* The ```navArrows``` option are now set ```true``` as default

*Changes 1.0.1*

> FIXES
* Bug fix that crashes the slider with more than 2 slides

