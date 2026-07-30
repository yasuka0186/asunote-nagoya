import { cases } from "../data/cases.js";
import { news } from "../data/news.js";

const caseMarkup = (item) => {
  const content = `
    <img class="case-card__image" src="${item.image}" width="640" height="420" alt="${item.imageAlt}">
    <div class="case-card__body">
      <p class="case-card__meta"><span>${item.industry}</span><span>${item.service}</span></p>
      <p class="case-card__company">${item.company}</p>
      <h3 class="case-card__title">${item.title}</h3>
      <p class="case-card__challenge"><strong>課題：</strong>${item.challenge}</p>
      <p class="case-card__summary">${item.summary}</p>
      ${item.url ? '<span class="case-card__more">詳しく見る <span aria-hidden="true">→</span></span>' : ""}
    </div>`;

  return item.url
    ? `<article class="case-card case-card--linked"><a class="case-card__link" href="${item.url}">${content}</a></article>`
    : `<article class="case-card">${content}</article>`;
};

const newsMarkup = (item) => `
  <article class="news-item">
    <time class="news-item__date" datetime="${item.date}">${item.displayDate}</time>
    <span class="news-item__category">${item.category}</span>
    <h3 class="news-item__title">${item.title}</h3>
  </article>`;

export const renderHomeLists = () => {
  const caseList = document.querySelector("[data-case-list]");
  const newsList = document.querySelector("[data-news-list]");

  if (caseList) caseList.innerHTML = cases.slice(0, 3).map(caseMarkup).join("");
  if (newsList) newsList.innerHTML = news.slice(0, 3).map(newsMarkup).join("");
};
