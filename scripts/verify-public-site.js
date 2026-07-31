import console from "node:console";
import process from "node:process";
import { URL } from "node:url";
import { chromium } from "@playwright/test";

const baseUrl = new URL(process.env.PUBLIC_URL ?? "https://yasuka0186.github.io/asunote-nagoya/");
const pagePaths = [
  "",
  "services/",
  "cases/",
  "cases/manufacturing/",
  "news/",
  "company/",
  "contact/",
  "privacy/",
  "404.html"
];
const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];

page.on("console", (message) => {
  if (message.type() === "error") errors.push(`Console error: ${message.text()}`);
});
page.on("pageerror", (error) => errors.push(`Page error: ${error.message}`));

for (const pagePath of pagePaths) {
  const expectedUrl = new URL(pagePath, baseUrl);
  const response = await page.goto(expectedUrl.href, { waitUntil: "networkidle" });

  if (!response?.ok()) errors.push(`${expectedUrl.href}: HTTP ${response?.status() ?? "no response"}`);
  if (!(await page.locator("main").count())) errors.push(`${expectedUrl.href}: main element not found`);

  const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
  if (canonical !== expectedUrl.href) errors.push(`${expectedUrl.href}: canonical is ${canonical}`);

  const ogUrl = await page.locator('meta[property="og:url"]').getAttribute("content");
  if (ogUrl !== expectedUrl.href) errors.push(`${expectedUrl.href}: og:url is ${ogUrl}`);

  const resourceUrls = await page.locator("img[src], script[src], link[rel=stylesheet][href]").evaluateAll(
    (elements) => elements.map((element) => element.src || element.href)
  );
  for (const resourceUrl of resourceUrls) {
    const url = new URL(resourceUrl);
    if (url.origin === baseUrl.origin && !url.pathname.startsWith(baseUrl.pathname)) {
      errors.push(`${expectedUrl.href}: resource escaped the Pages base path: ${url.href}`);
    }
  }
}

for (const filePath of ["robots.txt", "sitemap.xml"]) {
  const url = new URL(filePath, baseUrl);
  const response = await page.request.get(url.href);
  if (!response.ok()) errors.push(`${url.href}: HTTP ${response.status()}`);
}

await browser.close();

if (errors.length) throw new Error(`Public-site verification failed:\n${errors.join("\n")}`);
console.log(`Verified ${pagePaths.length} pages, robots.txt, and sitemap.xml at ${baseUrl.href}`);
