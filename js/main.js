import { initHeader } from "./modules/header.js";
import { initMobileMenu } from "./modules/mobile-menu.js";
import { initFaq } from "./modules/faq.js";
import { renderContentLists } from "./modules/render-content-lists.js";

document.documentElement.classList.add("js");

initHeader();
initMobileMenu();
initFaq();
renderContentLists();
