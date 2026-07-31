import { expect, test } from "@playwright/test";

const fillRequiredFields = async (page) => {
  await page.getByLabel("氏名 必須").fill("山田 太郎");
  await page.getByLabel("メールアドレス 必須").fill("taro@example.com");
  await page.getByLabel("相談したいサービス 必須").selectOption("Excel・紙業務のデジタル化");
  await page.getByLabel("相談内容 必須").fill("毎月のExcel集計について相談したいです。");
  await page.getByLabel(/個人情報の取り扱い.*同意する/).check();
};

test.describe("Day 8 contact form", () => {
  test("shows field errors and focuses the first invalid field", async ({ page }) => {
    await page.goto("/contact/");
    await page.getByRole("button", { name: "入力内容を確認する" }).click();

    await expect(page.locator("[data-error-summary]")).toBeVisible();
    await expect(page.locator(".form-error:visible")).toHaveCount(5);
    await expect(page.locator("#name")).toBeFocused();
    await expect(page.locator("#name")).toHaveAttribute("aria-invalid", "true");
  });

  test("validates email and optional phone formats", async ({ page }) => {
    await page.goto("/contact/");
    await fillRequiredFields(page);
    await page.getByLabel("メールアドレス 必須").fill("invalid");
    await page.getByLabel("電話番号 任意").fill("phone-number");
    await page.getByRole("button", { name: "入力内容を確認する" }).click();

    await expect(page.locator("#email-error")).toContainText("正しい形式");
    await expect(page.locator("#phone-error")).toContainText("数字、ハイフン、括弧");
  });

  test("keeps values after returning from confirmation", async ({ page }) => {
    await page.goto("/contact/");
    await page.getByLabel("会社名 任意").fill("株式会社テスト");
    await fillRequiredFields(page);
    await page.getByRole("radio", { name: "メール", exact: true }).check();
    await page.getByRole("button", { name: "入力内容を確認する" }).click();

    await expect(page.locator('[data-form-panel="confirm"]')).toBeVisible();
    await expect(page.locator('[data-confirm="company"]')).toHaveText("株式会社テスト");
    await expect(page.locator('[data-confirm="contactMethod"]')).toHaveText("メール");

    await page.getByRole("button", { name: "入力画面へ戻る" }).click();
    await expect(page.getByLabel("会社名 任意")).toHaveValue("株式会社テスト");
    await expect(page.getByLabel("相談内容 必須")).toHaveValue("毎月のExcel集計について相談したいです。");
  });

  test("completes without navigating or sending a request", async ({ page }) => {
    const outgoing = [];
    page.on("request", (request) => {
      if (request.method() !== "GET") outgoing.push(request.method());
    });
    await page.goto("/contact/");
    await fillRequiredFields(page);
    await page.getByRole("button", { name: "入力内容を確認する" }).click();
    await page.getByRole("button", { name: "送信する（デモ）" }).click();

    await expect(page).toHaveURL(/\/contact\/$/);
    await expect(page.locator("#complete-title")).toBeFocused();
    await expect(page.locator('[data-form-panel="complete"]')).toContainText("実際には送信されていません");
    expect(outgoing).toEqual([]);
  });

  test("does not overflow at 320px", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto("/contact/");
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(overflow).toBe(false);
  });
});
