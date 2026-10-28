(function($) {
  "use strict";

  const gsapanim = function() {

    // SVG Animation
    document.querySelectorAll(".svg-animate").forEach(box => {
      const paths = box.querySelectorAll("path");

      paths.forEach(path => {
        const length = path.getTotalLength();

        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
          visibility: "visible",
          opacity: 1,
        });

        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: box,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      });
    });


const splitTypes = document.querySelectorAll('.themeht-anim-text');
splitTypes.forEach((element) => {
    const splitText = new SplitType(element, { types: 'chars, words' });

    gsap.from(splitText.chars, {
        opacity: 0.2,
        stagger: 0.05, // Reduced for smoother animation
        scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            end: 'top -10%',
            scrub: true,
        }
    });
});


const textAnimeElements = document.querySelectorAll('.text-anime-style');

if (textAnimeElements.length > 0) {
  textAnimeElements.forEach(el => {
    const split = new SplitType(el, { types: 'words' });

    // Defensive check for split.words existence and length
    if (split.words && split.words.length > 0) {
      gsap.from(split.words, {
        clipPath: 'inset(0 100% 0 0)',
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    }
  });
}


  if (document.querySelector('.bg-gsap')) {
  gsap.to(".bg-gsap", {
    backgroundPosition: "center 100%",
    ease: "none",
    scrollTrigger: {
      trigger: ".bg-gsap",
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });
}

    // Slide Left/Right Animation
    gsap.utils.toArray(['.slide-left', '.slide-right']).forEach(elem => {
      if(elem) {
        gsap.fromTo(elem,
          { x: elem.classList.contains('slide-left') ? -100 : 100 },
          {
            x: 0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: elem,
              start: "top 80%",
              end: "bottom 20%",
              scrub: true,
            }
          }
        );
      }
    });

    // Title Icon Rotation
    if (document.querySelector(".title-icon")) {
      gsap.to(".title-icon", {
        rotation: 720,
        duration: 10,
        ease: "linear",
        repeat: -1,
        transformOrigin: "50% 50%"
      });
    }

  }

  $(function() {
    gsapanim();
  });
  
  jQuery(window).on('elementor/frontend/init', function() {
        elementorFrontend.hooks.addAction( 'frontend/element_ready/title.default', gsapanim );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/feature.default', gsapanim );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/ht-anim-title.default', gsapanim );
        elementorFrontend.hooks.addAction( 'frontend/element_ready/image.default', gsapanim );
    });

})(jQuery);
