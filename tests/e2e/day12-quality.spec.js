import { expect, test } from "@playwright/test";
import { URL } from "node:url";

const pages = [
  "/",
  "/services/",
  "/cases/",
  "/cases/manufacturing/",
  "/news/",
  "/company/",
  "/contact/",
  "/privacy/",
  "/404.html"
];

const isLocalHttpUrl = (url) =>
  url.origin === "http://127.0.0.1:4173" && !url.hash;

test("all internal links and assets return successful responses", async ({ page, request }) => {
  const checkedUrls = new Set();

  for (const path of pages) {
    await page.goto(path);
    const references = await page.locator("a[href], img[src], script[src], link[href]").evaluateAll((elements) =>
      elements.map((element) => element.getAttribute("href") ?? element.getAttribute("src"))
    );

    for (const reference of references) {
      if (!reference) continue;
      const url = new URL(reference, page.url());
      if (!isLocalHttpUrl(url) || checkedUrls.has(url.href)) continue;

      checkedUrls.add(url.href);
      const response = await request.get(url.href);
      expect(response.ok(), `${url.href} should be reachable`).toBe(true);
    }
  }
});

test("all images provide alternative text and dimensions", async ({ page }) => {
  for (const path of pages) {
    await page.goto(path);
    const images = page.locator("img");

    for (let index = 0; index < await images.count(); index += 1) {
      await expect(images.nth(index)).toHaveAttribute("alt");
      await expect(images.nth(index)).toHaveAttribute("width", /\d+/);
      await expect(images.nth(index)).toHaveAttribute("height", /\d+/);
    }
  }
});
