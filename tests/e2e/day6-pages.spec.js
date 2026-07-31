import { expect, test } from "@playwright/test";

test.describe("Day 6 service page", () => {
  test("shows three services with the required prices", async ({ page }) => {
    await page.goto("/services/");

    await expect(page.locator(".service-detail")).toHaveCount(3);
    await expect(page.getByText("個別見積もり", { exact: true })).toHaveCount(2);
    await expect(page.getByText("月額22,000円〜", { exact: true })).toHaveCount(1);
    await expect(page.locator(".flow__item")).toHaveCount(4);
    await expect(page.locator(".notes__list li")).toHaveCount(3);
  });

  test("receives the home service links at each matching section", async ({
    page,
  }) => {
    await page.goto("/");
    const links = page.locator(".service-card__link");
    const expectedIds = ["digitalization", "cloud-support", "it-support"];

    for (let index = 0; index < expectedIds.length; index += 1) {
      await links.nth(index).click();
      await expect(page).toHaveURL(new RegExp(`/services/#${expectedIds[index]}$`));
      await expect(page.locator(`#${expectedIds[index]}`)).toBeVisible();
      await page.goto("/");
    }
  });
});

test.describe("Day 6 company page", () => {
  test("shows the required company content and fictional notice", async ({
    page,
  }) => {
    await page.goto("/company/");

    await expect(page.locator(".company-intro__image")).toBeVisible();
    await expect(page.locator(".philosophy")).toBeVisible();
    await expect(page.locator(".message")).toContainText("朝倉 直人");
    await expect(page.locator(".company-profile__row")).toHaveCount(8);
    await expect(page.locator(".company-profile__notice")).toContainText("架空");
    await expect(page.locator(".area")).toContainText("愛知県・名古屋市周辺");
  });

  test("does not overflow at 320px", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto("/company/");

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(overflow).toBe(false);
  });
});
