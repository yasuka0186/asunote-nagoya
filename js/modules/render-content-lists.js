import { cases } from "../data/cases.js";
import { news } from "../data/news.js";

export const caseMarkup = (item, pathPrefix) => {
  const content = `
    <img class="case-card__image" src="${pathPrefix}${item.image}" width="${item.imageWidth}" height="${item.imageHeight}" loading="lazy" decoding="async" alt="${item.imageAlt}">
    <div class="case-card__body">
      <p class="case-card__meta"><span>${item.industry}</span><span>${item.service}</span></p>
      <p class="case-card__company">${item.company}</p>
      <h3 class="case-card__title">${item.title}</h3>
      <p class="case-card__challenge"><strong>課題：</strong>${item.challenge}</p>
      <p class="case-card__summary">${item.summary}</p>
      ${item.url ? '<span class="case-card__more">詳しく見る <span aria-hidden="true">→</span></span>' : ""}
    </div>`;

  return item.url
    ? `<article class="case-card case-card--linked"><a class="case-card__link" href="${pathPrefix}${item.url}">${content}</a></article>`
    : `<article class="case-card">${content}</article>`;
};

export const newsMarkup = (item, showSummary) => `
  <article class="news-item${showSummary ? " news-item--detail" : ""}">
    <time class="news-item__date" datetime="${item.date}">${item.displayDate}</time>
    <span class="news-item__category">${item.category}</span>
    <h3 class="news-item__title">${item.title}</h3>
    ${showSummary ? `<p class="news-item__summary">${item.summary}</p>` : ""}
  </article>`;

export const renderContentLists = () => {
  document.querySelectorAll("[data-case-list]").forEach((list) => {
    if (list.hasAttribute("data-rendered")) return;
    const pathPrefix = list.dataset.pathPrefix ?? "./";
    list.innerHTML = cases.map((item) => caseMarkup(item, pathPrefix)).join("");
  });

  document.querySelectorAll("[data-news-list]").forEach((list) => {
    if (list.hasAttribute("data-rendered")) return;
    const showSummary = list.hasAttribute("data-show-summary");
    list.innerHTML = news.map((item) => newsMarkup(item, showSummary)).join("");
  });
};
