gsap.registerPlugin(ScrollTrigger);

if (typeof Lenis !== 'undefined') {
  if (window.innerWidth > 768) {
    const lenis = new Lenis({
      duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
  direction: 'vertical',
    });

    function raf(time) {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    if (window.self !== window.top) {
      // Inject iframe-specific CSS fixes
      const style = document.createElement('style');
      style.textContent = `
        [data-lenis-scroll] {
          will-change: transform !important;
          transform-style: preserve-3d !important;
          backface-visibility: hidden !important;
          contain: layout paint !important;
          -webkit-font-smoothing: antialiased !important;
          -webkit-backface-visibility: hidden !important;
        }
      `;
      document.head.appendChild(style);
    }
  }
}


document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // Remove .gsap-animated from widgets inside any .gsap-sec-animation-none container
  document.querySelectorAll(".gsap-sec-animation-none .elementor-widget.gsap-animated, .gsap-animation-none.elementor-widget.gsap-animated").forEach(el => {
    el.classList.remove("gsap-animated");
  });

  // Animate only widgets that:
  // - are not already animated
  // - are not inside a .gsap-sec-animation-none container
  const widgets = gsap.utils.toArray(".elementor-widget:not(.gsap-animated)");

  widgets.forEach((el) => {
    // Skip elements inside excluded container
    if (el.closest(".gsap-sec-animation-none")) return;

    // Mark as animated
    el.classList.add("gsap-animated");

    // Animate with GSAP + ScrollTrigger
    gsap.fromTo(
      el,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 100%",
          toggleActions: "play none none none",
          once: true,
        },
      }
    );
  });

  ScrollTrigger.refresh();
});

document.addEventListener('DOMContentLoaded', function() {
  var headerDiv = document.querySelector('#masthead div.header');
  
  if (!headerDiv) {
    return;
  }
  
  headerDiv.classList.forEach(function(cls) {
    if (cls.startsWith('header-')) {
      document.body.classList.add(cls);
    }
  });
});


document.addEventListener('DOMContentLoaded', function() {
  var body = document.body;
  var headerClasses = ['header-2', 'header-3', 'header-4', 'header-5'];
  
  headerClasses.forEach(function(hClass) {
    if (body.classList.contains(hClass)) {
      body.classList.add('breadcrumb-' + hClass.split('-')[1]);
    }
  });
});