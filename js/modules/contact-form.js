import { validateForm } from "./form-validation.js";

const fieldOrder = ["company", "name", "email", "phone", "service", "message", "consent"];

const getValues = (form) => {
  const data = new window.FormData(form);
  return {
    company: String(data.get("company") ?? ""),
    name: String(data.get("name") ?? ""),
    email: String(data.get("email") ?? ""),
    phone: String(data.get("phone") ?? ""),
    service: String(data.get("service") ?? ""),
    message: String(data.get("message") ?? ""),
    contactMethod: String(data.get("contactMethod") ?? ""),
    consent: data.get("consent") === "on",
  };
};

export const initContactForm = () => {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  const panels = document.querySelectorAll("[data-form-panel]");
  const progressItems = document.querySelectorAll("[data-progress-step]");
  const summary = document.querySelector("[data-error-summary]");

  const showStep = (step) => {
    panels.forEach((panel) => { panel.hidden = panel.dataset.formPanel !== step; });
    progressItems.forEach((item) => {
      const isCurrent = item.dataset.progressStep === step;
      item.classList.toggle("is-current", isCurrent);
      if (isCurrent) item.setAttribute("aria-current", "step");
      else item.removeAttribute("aria-current");
    });
  };

  const clearErrors = () => {
    fieldOrder.forEach((name) => {
      const field = form.elements.namedItem(name);
      const error = form.querySelector(`[data-error-for="${name}"]`);
      field?.removeAttribute("aria-invalid");
      if (error) { error.textContent = ""; error.hidden = true; }
    });
    summary.hidden = true;
    summary.textContent = "";
  };

  const showErrors = (errors) => {
    clearErrors();
    const names = fieldOrder.filter((name) => errors[name]);
    names.forEach((name) => {
      const field = form.elements.namedItem(name);
      const error = form.querySelector(`[data-error-for="${name}"]`);
      field?.setAttribute("aria-invalid", "true");
      if (error) { error.textContent = errors[name]; error.hidden = false; }
    });
    summary.innerHTML = `<p><strong>入力内容を確認してください。</strong></p><ul>${names.map((name) => `<li><a href="#${name}">${errors[name]}</a></li>`).join("")}</ul>`;
    summary.hidden = false;
    form.elements.namedItem(names[0])?.focus();
  };

  const fillConfirmation = (values) => {
    const displayValues = {
      ...values,
      company: values.company || "未入力",
      phone: values.phone || "未入力",
      contactMethod: values.contactMethod || "指定なし",
      consent: "同意済み",
    };
    Object.entries(displayValues).forEach(([name, value]) => {
      const output = document.querySelector(`[data-confirm="${name}"]`);
      if (output) output.textContent = String(value);
    });
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const values = getValues(form);
    const errors = validateForm(values);
    if (Object.keys(errors).length) { showErrors(errors); return; }

    clearErrors();
    fillConfirmation(values);
    showStep("confirm");
    document.querySelector("#confirm-title")?.focus();
  });

  document.querySelector("[data-form-back]")?.addEventListener("click", () => {
    showStep("input");
    document.querySelector("#contact-form-title")?.focus();
  });

  document.querySelector("[data-form-complete]")?.addEventListener("click", () => {
    showStep("complete");
    document.querySelector("#complete-title")?.focus();
  });
};
