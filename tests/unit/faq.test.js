import { beforeEach, describe, expect, it } from "vitest";
import { initFaq } from "../../js/modules/faq.js";

describe("initFaq", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <button data-faq-button aria-expanded="false" aria-controls="answer">質問</button>
      <section id="answer" hidden>回答</section>`;
  });

  it("toggles the related panel and aria-expanded", () => {
    initFaq();
    const button = document.querySelector("[data-faq-button]");
    const panel = document.querySelector("#answer");

    button.click();
    expect(button.getAttribute("aria-expanded")).toBe("true");
    expect(panel.hidden).toBe(false);

    button.click();
    expect(button.getAttribute("aria-expanded")).toBe("false");
    expect(panel.hidden).toBe(true);
  });
});
