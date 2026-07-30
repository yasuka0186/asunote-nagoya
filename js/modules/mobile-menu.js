const OPEN_CLASS = "is-open";
const BODY_OPEN_CLASS = "is-menu-open";
const DESKTOP_MEDIA_QUERY = "(min-width: 1024px)";

export const initMobileMenu = () => {
  const button = document.querySelector("[data-menu-button]");
  const menu = document.querySelector("[data-menu]");

  if (!button || !menu) {
    return;
  }

  const desktopMedia = window.matchMedia(DESKTOP_MEDIA_QUERY);

  const setMenuState = (isOpen, { returnFocus = false } = {}) => {
    button.setAttribute("aria-expanded", String(isOpen));
    button.setAttribute(
      "aria-label",
      isOpen ? "メニューを閉じる" : "メニューを開く",
    );
    menu.classList.toggle(OPEN_CLASS, isOpen);
    document.body.classList.toggle(BODY_OPEN_CLASS, isOpen);

    if (returnFocus) {
      button.focus();
    }
  };

  const isOpen = () => button.getAttribute("aria-expanded") === "true";

  button.addEventListener("click", () => {
    setMenuState(!isOpen());
  });

  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      setMenuState(false);
    }
  });

  document.addEventListener("click", (event) => {
    if (isOpen() && !menu.contains(event.target) && !button.contains(event.target)) {
      setMenuState(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isOpen()) {
      setMenuState(false, { returnFocus: true });
    }
  });

  desktopMedia.addEventListener("change", (event) => {
    if (event.matches) {
      setMenuState(false);
    }
  });
};
