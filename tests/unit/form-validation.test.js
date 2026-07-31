import { describe, expect, it } from "vitest";
import { validateForm } from "../../js/modules/form-validation.js";

const validValues = {
  company: "株式会社テスト",
  name: "山田 太郎",
  email: "taro@example.com",
  phone: "052-123-4567",
  service: "Excel・紙業務のデジタル化",
  message: "集計業務について相談したいです。",
  consent: true,
};

describe("validateForm", () => {
  it("accepts valid values", () => {
    expect(validateForm(validValues)).toEqual({});
  });

  it("reports every missing required field", () => {
    const errors = validateForm({
      ...validValues,
      name: " ",
      email: "",
      service: "",
      message: "",
      consent: false,
    });

    expect(Object.keys(errors)).toEqual(["name", "email", "service", "message", "consent"]);
  });

  it("rejects invalid email and phone formats", () => {
    const errors = validateForm({
      ...validValues,
      email: "invalid-email",
      phone: "052-ABC-0000",
    });

    expect(errors.email).toContain("正しい形式");
    expect(errors.phone).toContain("数字、ハイフン、括弧");
  });

  it("enforces every character limit", () => {
    const errors = validateForm({
      ...validValues,
      company: "会".repeat(101),
      name: "名".repeat(51),
      email: `${"a".repeat(250)}@a.com`,
      phone: "0".repeat(21),
      message: "相".repeat(2001),
    });

    expect(errors.company).toContain("100文字以内");
    expect(errors.name).toContain("50文字以内");
    expect(errors.email).toContain("254文字以内");
    expect(errors.phone).toContain("20文字以内");
    expect(errors.message).toContain("2,000文字以内");
  });
});
