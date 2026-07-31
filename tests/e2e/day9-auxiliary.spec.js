import { expect, test } from "@playwright/test";

test("privacy page contains every required policy section", async ({ page }) => {
  await page.goto("/privacy/");

  await expect(page.locator(".privacy-section")).toHaveCount(5);
  await expect(page.locator(".privacy-intro")).toContainText("取得、保存、送信することはありません");
  await expect(page.locator(".privacy-page")).toContainText("アクセス解析ツールを導入していません");
  await expect(page.locator(".privacy-page__date")).toContainText("2026年7月30日");
});

test("404 page provides only the focused return route", async ({ page }) => {
  await page.goto("/404.html");

  await expect(page.locator(".not-found__code")).toHaveText("404");
  await expect(page.getByRole("heading", { name: "ページが見つかりません" })).toBeVisible();
  await expect(page.getByRole("link", { name: "トップページへ戻る" })).toHaveAttribute("href", "./");
  await expect(page.locator('[aria-label="メインナビゲーション"]')).toHaveCount(0);
});

test("FAQ supports Enter and Space without closing another answer", async ({ page }) => {
  await page.goto("/");
  const buttons = page.locator("[data-faq-button]");

  await buttons.nth(0).focus();
  await page.keyboard.press("Enter");
  await buttons.nth(1).focus();
  await page.keyboard.press("Space");

  await expect(buttons.nth(0)).toHaveAttribute("aria-expanded", "true");
  await expect(buttons.nth(1)).toHaveAttribute("aria-expanded", "true");
});

test.describe("mobile fixed CTA", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("appears after scrolling and hides near the footer", async ({ page }) => {
    await page.goto("/");
    const cta = page.locator("[data-fixed-cta]");

    await expect(cta).not.toBeVisible();
    await page.evaluate(() => window.scrollTo(0, 700));
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute("href", /\/contact\/$/);

    await page.locator(".site-footer").scrollIntoViewIfNeeded();
    await expect(cta).not.toBeVisible();
  });

  test("is not added to the contact page", async ({ page }) => {
    await page.goto("/contact/");
    await expect(page.locator("[data-fixed-cta]")).toHaveCount(0);
  });
});

test("reveals a section when it enters the viewport", async ({ page }) => {
  await page.goto("/");
  const target = page.locator(".service-overview");

  await expect(target).toHaveClass(/reveal/);
  await target.scrollIntoViewIfNeeded();
  await expect(target).toHaveClass(/is-revealed/);
});

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("shows content without reveal movement", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const section = page.locator("main > section").first();

    await expect(section).toHaveCSS("opacity", "1");
    await expect(section).not.toHaveClass(/(^|\s)reveal(\s|$)/);
    await expect(section).toHaveCSS("transform", "none");
  });
});

test("all nine pages identify the fictional site", async ({ page }) => {
  const paths = ["/", "/services/", "/cases/", "/cases/manufacturing/", "/news/", "/company/", "/contact/", "/privacy/", "/404.html"];

  for (const path of paths) {
    await page.goto(path);
    await expect(page.locator("body")).toContainText("本サイトはポートフォリオ用に制作した架空企業のデモサイトです。");
  }
});
