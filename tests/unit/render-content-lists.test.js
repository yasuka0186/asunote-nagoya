import { beforeEach, describe, expect, it } from "vitest";
import { renderContentLists } from "../../js/modules/render-content-lists.js";

describe("renderContentLists", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div data-case-list data-path-prefix="../"></div>
      <div data-news-list data-show-summary></div>`;
  });

  it("renders all cases and links only the case with a detail page", () => {
    renderContentLists();

    expect(document.querySelectorAll(".case-card")).toHaveLength(3);
    expect(document.querySelectorAll(".case-card__link")).toHaveLength(1);
    expect(document.querySelector(".case-card__link").getAttribute("href")).toBe(
      "../cases/manufacturing/",
    );
    expect(document.querySelector(".case-card__image").getAttribute("src")).toBe(
      "../assets/images/case-manufacturing.webp",
    );
  });

  it("renders all news summaries without links", () => {
    renderContentLists();

    expect(document.querySelectorAll(".news-item")).toHaveLength(3);
    expect(document.querySelectorAll(".news-item__summary")).toHaveLength(3);
    expect(document.querySelectorAll(".news-item a")).toHaveLength(0);
  });
});
