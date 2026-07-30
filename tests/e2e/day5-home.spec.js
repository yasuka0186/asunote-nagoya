import { expect, test } from "@playwright/test";

test.describe("Day 5 home page", () => {
  test("shows all nine sections and renders shared data", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("main > section")).toHaveCount(9);
    await expect(page.locator(".case-card")).toHaveCount(3);
    await expect(page.locator(".news-item")).toHaveCount(3);
    await expect(page.locator(".faq-item")).toHaveCount(6);
  });

  test("only the manufacturing case is linked", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator(".case-card__link")).toHaveCount(1);
    await expect(page.locator(".case-card__link")).toHaveAttribute(
      "href",
      "./cases/manufacturing/",
    );
    await expect(page.locator(".news-item a")).toHaveCount(0);
  });

  test("allows multiple FAQ answers to be open", async ({ page }) => {
    await page.goto("/");
    const buttons = page.locator("[data-faq-button]");

    await buttons.nth(0).click();
    await buttons.nth(1).click();

    await expect(buttons.nth(0)).toHaveAttribute("aria-expanded", "true");
    await expect(buttons.nth(1)).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator("#faq-answer-1")).toBeVisible();
    await expect(page.locator("#faq-answer-2")).toBeVisible();
  });

  test("keeps primary content usable at 320px", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto("/");

    await expect(page.locator(".hero__title")).toBeVisible();
    await expect(page.locator(".hero__button")).toBeVisible();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(overflow).toBe(false);
  });
});
