import { initHeader } from "./modules/header.js";
import { initMobileMenu } from "./modules/mobile-menu.js";
import { initFaq } from "./modules/faq.js";
import { renderHomeLists } from "./modules/render-home-lists.js";

document.documentElement.classList.add("js");

initHeader();
initMobileMenu();
initFaq();
renderHomeLists();
