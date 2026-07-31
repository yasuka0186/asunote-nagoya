const revealSelector = "main > section, main > .l-section, main > .contact-cta";

export const initScrollReveal = () => {
  const elements = document.querySelectorAll(revealSelector);
  if (!elements.length) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || !("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-revealed"));
    return;
  }

  elements.forEach((element) => element.classList.add("reveal"));
  document.body.classList.add("is-reveal-ready");

  const observer = new window.IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-revealed");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -32px" });

  elements.forEach((element) => observer.observe(element));
};
