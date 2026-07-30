const SCROLLED_CLASS = "is-scrolled";
const SCROLL_THRESHOLD = 16;

export const initHeader = () => {
  const header = document.querySelector("[data-header]");

  if (!header) {
    return;
  }

  const updateHeader = () => {
    header.classList.toggle(SCROLLED_CLASS, window.scrollY > SCROLL_THRESHOLD);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
};

