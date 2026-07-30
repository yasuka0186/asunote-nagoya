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
  "/404.html",
];

for (const path of pages) {
  test(`${path} displays the common foundation without console errors`, async ({
    page,
  }) => {
    const consoleErrors = [];
    page.on("console", (message) => {
      if (message.type() === "error") {
        consoleErrors.push(message.text());
      }
    });

    const response = await page.goto(path);

    expect(response?.ok()).toBe(true);
    await expect(page.locator("#main-content")).toBeVisible();
    await expect(page.locator(".site-footer")).toBeVisible();
    expect(consoleErrors).toEqual([]);
  });
}

test.describe("mobile menu", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("opens and closes with the button and Escape key", async ({ page }) => {
    await page.goto("/");

    const button = page.locator("[data-menu-button]");
    const menu = page.locator("[data-menu]");

    await button.click();
    await expect(button).toHaveAttribute("aria-expanded", "true");
    await expect(menu).toHaveClass(/is-open/);
    await expect(page.locator("body")).toHaveClass(/is-menu-open/);

    await page.keyboard.press("Escape");
    await expect(button).toHaveAttribute("aria-expanded", "false");
    await expect(button).toBeFocused();
  });

  test("closes after an outside click", async ({ page }) => {
    await page.goto("/");

    const button = page.locator("[data-menu-button]");
    await button.click();
    await page.locator("main").click({ position: { x: 10, y: 400 } });

    await expect(button).toHaveAttribute("aria-expanded", "false");
  });
});

test("desktop navigation is visible and identifies the current page", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/services/");

  await expect(page.locator("[data-menu]")).toBeVisible();
  await expect(
    page.locator('.site-header__link[aria-current="page"]'),
  ).toHaveText("サービス");
});

test("404 excludes the global navigation", async ({ page }) => {
  await page.goto("/404.html");

  await expect(page.locator('[aria-label="メインナビゲーション"]')).toHaveCount(
    0,
  );
  await expect(page.getByRole("link", { name: "トップページへ戻る" })).toBeVisible();
});
