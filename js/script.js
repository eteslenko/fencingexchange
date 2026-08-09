// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('is-open');
    navToggle.classList.toggle('is-active', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('is-open');
      navToggle.classList.remove('is-active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Scroll-reveal (progressive enhancement)
// Elements are visible by default via CSS. Only elements that start
// below the fold get marked "pending" (hidden) so they can fade in —
// this avoids any chance of content staying invisible if JS is slow,
// blocked, or the IntersectionObserver callback never fires.
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealEls.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('reveal-pending');
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  revealEls.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const startsBelowFold = rect.top > window.innerHeight * 0.9;
    if (startsBelowFold) {
      el.classList.add('reveal-pending');
      observer.observe(el);
      // Safety net: guarantee visibility even if this element never
      // reports an intersection (e.g. it never enters the viewport
      // because the page is captured/printed rather than scrolled).
      setTimeout(() => {
        el.classList.remove('reveal-pending');
        el.classList.add('is-visible');
        observer.unobserve(el);
      }, 2500);
    }
  });
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Header shadow on scroll
const header = document.querySelector('.site-header');
if (header) {
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}
