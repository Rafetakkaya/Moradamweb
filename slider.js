$('.slider__container').each(function (i) {
  var $this = $(this);
  var $slides = $('.slider__items', this);
  var currentSlide = 1;
  var activeSlidesLength = 0;
  var slidePositions = {};
  var totalSlides = 0;
  var trackStart = 0;
  var lastSlideWidth = 0;
  var interval = null;
  var sliderSpeed = 3000; //ms for slide to scroll
  var tweenNext = '';
  var tweenPrev = '';
  var backClicked = false;
  var autoAdvance = true;
  $slides.on('init', function (e, slick) {
    var $track = $('.slick-track', $this);
    function setSizeVars() {
      activeSlidesLength = 0;
      trackStart = $('.slick-slide', $this).first().outerWidth();
      slidePositions[1] = trackStart;
      $('.slick-slide:not(.slick-cloned)', $this).each(function (i) {
        var width = $(this).outerWidth();
        activeSlidesLength += width;
        slidePositions[i + 2] = trackStart + activeSlidesLength;
        lastSlideWidth = width;
        totalSlides = i + 2;
      });
    };
    setSizeVars();
    $(window).on('resize', function () {
      setSizeVars();
    });
    $track.css({ 'transform': 'translate(-' + slidePositions[currentSlide] + 'px,0,0)' });
    function goToNextSlide(transitionTime, transitionEasing) {
      if (currentSlide == totalSlides - 1) { // Go to first cloned slide if reached end
        var nextSlide = currentSlide + 1;
        tweenNext = TweenLite.to($track, 0, {
          x: -(slidePositions[1] - lastSlideWidth),
          ease: Power0.easeNone,
          onComplete: function () {
            currentSlide = nextSlide;
            goToNextSlide(transitionTime, transitionEasing);
          }
        });
      } else {
        var nextSlide = (currentSlide == totalSlides ? 1 : currentSlide + 1);
        tweenNext = TweenLite.to($track, transitionTime, {
          x: -(slidePositions[nextSlide]),
          ease: transitionEasing,
          onComplete: function () {
            currentSlide = nextSlide;
            if (autoAdvance) {
              goToNextSlide(sliderSpeed / 1000, Power0.easeNone);
            }
          }
        });
      }
    }
    function goToPrevSlide(transitionTime, transitionEasing) {
      backClicked = true;
      if (currentSlide == totalSlides) {//Go to last Slide
        var prevSlide = currentSlide - 1;
        tweenPrev = TweenLite.to($track, 0, {
          x: -(slidePositions[prevSlide]),
          ease: Power0.easeNone,
          onComplete: function () {
            currentSlide = prevSlide;
            goToPrevSlide(transitionTime, transitionEasing);
          }
        });
      } else if (currentSlide == 1) {//Go to cloned slide instead of last slide
        var prevSlide = totalSlides;
        tweenPrev = TweenLite.to($track, transitionTime, {
          x: -(slidePositions[1] - lastSlideWidth),
          ease: transitionEasing,
          onComplete: function () {
            currentSlide = prevSlide;
          }
        });
      } else {
        var prevSlide = currentSlide - 1;
        tweenPrev = TweenLite.to($track, transitionTime, {
          x: -(slidePositions[prevSlide]),
          ease: transitionEasing,
          onComplete: function () {
            currentSlide = prevSlide;
          }
        });
      }
    }
    setTimeout(function () {
      goToNextSlide(sliderSpeed / 1000, Power0.easeNone);
    }, 1000);
    $this.hover(function () {
      tweenNext.pause();
    }, function () {
      if (backClicked) {
        goToNextSlide(sliderSpeed / 1000, Power0.easeNone);
      } else {
        tweenNext.play();
      }
      autoAdvance = true;
      backClicked = false;
    });
    $('.slider-prev', $this).on('click', function () {
      if (backClicked) {
        goToPrevSlide(0.2, Power1.easeInOut);
      } else {
        tweenNext.reverse().timeScale(6);
      }
      backClicked = true;
      autoAdvance = false;
    });
    $('.slider-next', $this).on('click', function () {
      goToNextSlide(0.2, Power1.easeInOut);
      autoAdvance = false;
    });
  });
  $slides.slick({
    infinite: true,
    variableWidth: true,
    arrows: false,
    accessibility: false,
    draggable: false,
    swipe: false,
    touchMove: false,
  });
});





var clicked = false;
function toggle() {
  if (!clicked) {
    clicked = true;
    document.getElementById("uls").style.visibility = "visible";



  } else {
    clicked = true;

    document.getElementById("uls").style.visibility = "hidden";

  }
}

function toggl() {
  if (!clicked) {
    clicked = false;

    document.getElementById("uls").style.visibility = "visible";


  } else {
    clicked = false;

    document.getElementById("uls").style.visibility = "hidden";


  }
}



