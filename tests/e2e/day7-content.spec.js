import { expect, test } from "@playwright/test";

test.describe("Day 7 case pages", () => {
  test("renders three shared case cards with only one detail link", async ({
    page,
  }) => {
    await page.goto("/cases/");

    await expect(page.locator(".case-card")).toHaveCount(3);
    await expect(page.locator(".case-card__link")).toHaveCount(1);
    await expect(page.locator(".case-card__link")).toHaveAttribute(
      "href",
      "../cases/manufacturing/",
    );
    await expect(page.locator(".fiction-notice")).toContainText("架空");
  });

  test("shows the complete manufacturing case and fictional results notice", async ({
    page,
  }) => {
    await page.goto("/cases/manufacturing/");

    await expect(page.locator(".case-summary__profile > div")).toHaveCount(4);
    await expect(page.locator(".case-point-list")).toHaveCount(2);
    await expect(page.locator(".case-process__list li")).toHaveCount(4);
    await expect(page.locator(".result-card")).toHaveCount(3);
    await expect(page.locator(".results__notice")).toContainText("架空");
    await expect(page.locator(".testimonial")).toContainText("管理部担当者（架空）");
    await expect(page.getByRole("link", { name: "関連サービスを見る" })).toHaveAttribute(
      "href",
      "../../services/#digitalization",
    );
  });
});

test.describe("Day 7 news page", () => {
  test("renders three shared news items with summaries and no links", async ({
    page,
  }) => {
    await page.goto("/news/");

    await expect(page.locator(".news-item")).toHaveCount(3);
    await expect(page.locator(".news-item__summary")).toHaveCount(3);
    await expect(page.locator(".news-item a")).toHaveCount(0);
    await expect(page.locator(".news-item__date").first()).toHaveAttribute(
      "datetime",
      "2026-07-25",
    );
  });

  test("does not overflow case and news pages at 320px", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });

    for (const path of ["/cases/", "/cases/manufacturing/", "/news/"]) {
      await page.goto(path);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
      );
      expect(overflow).toBe(false);
    }
  });
});
