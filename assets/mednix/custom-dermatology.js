/**
 * Mednix Dermatology - Interactive Engine
 * Preloader, Sticky Header, Scroll Animations, Form Handlers & Sliders
 */

document.addEventListener('DOMContentLoaded', function () {
  console.log('Mednix Dermatology Interactive Engine Loaded');

  // 1. Dismiss preloader
  const preloader = document.getElementById('ht-preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('loaded');
      setTimeout(() => preloader.style.display = 'none', 500);
    }, 600);
  }

  // Fallback after 2s
  setTimeout(() => {
    if (preloader && preloader.style.display !== 'none') {
      preloader.classList.add('loaded');
      preloader.style.display = 'none';
    }
  }, 2000);

  // 2. Sticky Header on Scroll
  const header = document.getElementById('masthead') || document.querySelector('header');
  window.addEventListener('scroll', function () {
    if (header) {
      if (window.scrollY > 120) {
        header.classList.add('is-sticky');
      } else {
        header.classList.remove('is-sticky');
      }
    }
  });

  // 3. On-Scroll Animation Engine
  function applyRevealClasses() {
    const targets = [
      '.elementor-widget-heading',
      '.elementor-widget-text-editor',
      '.elementor-widget-image',
      '.elementor-widget-icon-box',
      '.elementor-widget-counter',
      '.service-item',
      '.team-member'
    ];

    targets.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        if (!el.closest('.header') && !el.closest('.footer')) {
          el.classList.add('mednix-reveal');
        }
      });
    });

    const reveals = document.querySelectorAll('.mednix-reveal, .mednix-reveal-left, .mednix-reveal-right');

    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('mednix-visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.05,
        rootMargin: '40px 0px 40px 0px'
      });

      reveals.forEach(el => obs.observe(el));
    } else {
      reveals.forEach(el => el.classList.add('mednix-visible'));
    }

    // Safety fallback: reveal everything after 2.5s
    setTimeout(() => {
      reveals.forEach(el => el.classList.add('mednix-visible'));
    }, 2500);
  }

  applyRevealClasses();

  // 4. Smooth Anchor Scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#' && targetId.length > 1) {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = targetEl.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // 5. Toast Notification System
  function showToast(title, msg) {
    let toast = document.getElementById('mednixToast');
    if (!toast) {
      const tHTML = `
        <div id="mednixToast" class="mednix-toast">
          <i class="bi bi-check-circle-fill" style="color: #D4AF37; font-size: 24px;"></i>
          <div>
            <h6 style="color: #D4AF37; margin: 0 0 4px 0; font-size: 15px;">${title}</h6>
            <p id="mednixToastMsg" style="margin: 0; font-size: 13px; color: #e2e8f0;">${msg}</p>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', tHTML);
      toast = document.getElementById('mednixToast');
    }
    document.getElementById('mednixToastMsg').innerText = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4500);
  }

  // 6. Handle Appointment Form Submissions
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const nameInput = form.querySelector('input[type="text"], input[name*="name"]');
      const name = nameInput ? nameInput.value : 'Guest';
      showToast('Appointment Request Received', `Thank you, ${name}! Our dermatology team will contact you shortly to confirm your time.`);
      form.reset();
    });
  });

  // 7. Counter Animation (Odometer / Stats)
  function animateCounters() {
    document.querySelectorAll('.odometer, .elementor-counter-number').forEach(el => {
      const text = el.innerText.replace(/[^\d]/g, '');
      const target = parseInt(text, 10);
      if (!target) return;

      let current = 0;
      const step = Math.ceil(target / 50);
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          el.innerText = target.toLocaleString();
          clearInterval(timer);
        } else {
          el.innerText = current.toLocaleString();
        }
      }, 30);
    });
  }

  setTimeout(animateCounters, 1000);
});
