/* GSAP MOTION SYSTEM — shared premium animation layer */
(function () {
  "use strict";

  if (!window.gsap || !window.ScrollTrigger) return;

  gsap.registerPlugin(ScrollTrigger);\n  if (window.ScrollToPlugin) gsap.registerPlugin(window.ScrollToPlugin);

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) {
    document.documentElement.classList.add("reduce-motion");
    return;
  }

  const q = (selector) => Array.from(document.querySelectorAll(selector));

  // Page entrance
  const header = document.querySelector("header, .site-header, .header");
  if (header) gsap.from(header, { y: -24, autoAlpha: 0, duration: 0.8, ease: "power3.out", delay: 0.05 });

  const heroItems = q(".hero .eyebrow, .hero h1, .hero .lead, .hero .hero-lead, .hero .actions, .hero .hero-actions, .hero .trust, .hero .hero-stats, .hero-card");
  if (heroItems.length) {
    gsap.from(heroItems, { y: 34, autoAlpha: 0, duration: 0.9, stagger: 0.09, ease: "power3.out", delay: 0.18 });
  }

  // Scroll reveals — transform/opacity only for smooth rendering.
  q("section:not(.hero) .heading, section:not(.hero) .section-heading, section:not(.hero) .preview-heading, section:not(.hero) .eyebrow").forEach((el) => {
    gsap.from(el, {
      y: 38, autoAlpha: 0, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 84%", once: true }
    });
  });

  const groups = [
    ".cards", ".services-grid", ".testimonials-grid", ".team", ".steps",
    ".lawyer-grid", ".directory-grid", ".feature-grid", ".profile-card",
    ".info-list", ".trust-strip", ".stats-panel", ".location-grid"
  ];

  groups.forEach((selector) => {
    q(selector).forEach((group) => {
      const children = Array.from(group.children);
      if (!children.length) return;
      gsap.from(children, {
        y: 42, autoAlpha: 0, duration: 0.75, stagger: 0.08, ease: "power3.out",
        scrollTrigger: { trigger: group, start: "top 86%", once: true }
      });
    });
  });

  // Generic cards: subtle lift without fighting existing CSS hover rules.
  q(".service-card, .testimonial-card, .team article, .cards article, .lawyer-card, .step, .profile-card").forEach((card) => {
    card.addEventListener("mouseenter", () => gsap.to(card, { y: -6, duration: 0.25, ease: "power2.out", overwrite: true }));
    card.addEventListener("mouseleave", () => gsap.to(card, { y: 0, duration: 0.3, ease: "power2.out", overwrite: true }));
  });

  // Hero decorative motion.
  q(".hero-ring, .ring-one, .ring-two, .hero-bg, .hero-glow").forEach((el, i) => {
    gsap.to(el, {
      y: i % 2 ? -10 : 10, x: i % 2 ? 7 : -7, duration: 4 + i * 0.7,
      repeat: -1, yoyo: true, ease: "sine.inOut"
    });
  });

  // Image reveal.
  q("figure img, .photo img, .card-photo, .feature-visual, .aside-image").forEach((el) => {
    gsap.from(el, {
      scale: 1.06, autoAlpha: 0, duration: 1.1, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 90%", once: true }
    });
  });

  // Smooth in-page navigation.
  q('a[href^="#"]').forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || href === "#") return;
    link.addEventListener("click", (event) => {
      const target = document.querySelector(href);
      if (!target) return;
      event.preventDefault();
      gsap.to(window, { duration: 0.9, scrollTo: { y: target, offsetY: 72 }, ease: "power3.inOut" });
    });
  });

  // Refresh after images/fonts/layout settle.
  window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
  setTimeout(() => ScrollTrigger.refresh(), 300);
})();