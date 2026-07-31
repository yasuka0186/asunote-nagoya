const SHOW_THRESHOLD = 480;

export const initFixedCta = () => {
  if (document.querySelector("[data-contact-form]")) return;

  const footer = document.querySelector(".site-footer");
  if (!footer) return;

  const link = document.createElement("a");
  link.className = "fixed-cta";
  link.href = new window.URL("../../contact/", import.meta.url).href;
  link.textContent = "ITのお悩みを相談する";
  link.setAttribute("data-fixed-cta", "");
  document.body.append(link);

  let isNearFooter = false;
  const update = () => {
    link.classList.toggle("is-visible", window.scrollY >= SHOW_THRESHOLD && !isNearFooter);
  };

  const footerObserver = new window.IntersectionObserver((entries) => {
    isNearFooter = entries[0]?.isIntersecting ?? false;
    update();
  }, { rootMargin: "0px 0px 80px" });

  footerObserver.observe(footer);
  window.addEventListener("scroll", update, { passive: true });
  update();
};
