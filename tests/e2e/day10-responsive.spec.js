import { expect, test } from "@playwright/test";

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

const requiredWidths = [375, 768, 1024, 1440];
const rangeWidths = [320, 360, 1280, 1920];

const expectNoHorizontalOverflow = async (page) => {
  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth
  }));

  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
};

for (const width of requiredWidths) {
  test(`all pages fit at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });

    for (const path of pages) {
      await page.goto(path);
      await expect(page.locator("main")).toBeVisible();
      await expectNoHorizontalOverflow(page);
    }
  });
}

test("all pages fit throughout the 320px to 1920px range", async ({ page }) => {
  for (const width of rangeWidths) {
    await page.setViewportSize({ width, height: 900 });

    for (const path of pages) {
      await page.goto(path);
      await expectNoHorizontalOverflow(page);
    }
  }
});

test("content reflows at a 200 percent zoom equivalent", async ({ page }) => {
  // 1280pxの表示領域を200%に拡大した際の640 CSS px相当で確認する。
  await page.setViewportSize({ width: 640, height: 450 });

  for (const path of pages) {
    await page.goto(path);
    await expect(page.locator("main")).toBeVisible();
    await expectNoHorizontalOverflow(page);
  }
});

test("primary keyboard controls remain operable", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");

  await page.locator(".site-header__menu-button").focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".site-header__menu-button")).toHaveAttribute(
    "aria-expanded",
    "true"
  );
  await page.keyboard.press("Escape");
  await expect(page.locator(".site-header__menu-button")).toHaveAttribute(
    "aria-expanded",
    "false"
  );

  const faqButton = page.locator("[data-faq-button]").first();
  await faqButton.focus();
  await page.keyboard.press("Space");
  await expect(faqButton).toHaveAttribute("aria-expanded", "true");
});
