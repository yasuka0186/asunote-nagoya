import { mkdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { chromium } from "@playwright/test";

const baseUrl = process.env.PUBLIC_URL ?? "https://yasuka0186.github.io/asunote-nagoya/";
const outputDirectory = path.resolve("docs/screenshots");
const screenshots = [
  { name: "home-desktop.png", viewport: { width: 1440, height: 900 } },
  { name: "home-mobile.png", viewport: { width: 375, height: 812 } }
];

await mkdir(outputDirectory, { recursive: true });
const browser = await chromium.launch();

for (const screenshot of screenshots) {
  const page = await browser.newPage({ reducedMotion: "reduce", viewport: screenshot.viewport });
  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.evaluate(async () => {
    for (let position = 0; position < document.body.scrollHeight; position += window.innerHeight / 2) {
      window.scrollTo(0, position);
      await new Promise((resolve) => window.setTimeout(resolve, 80));
    }
    window.scrollTo(0, 0);
  });
  await page.screenshot({ fullPage: true, path: path.join(outputDirectory, screenshot.name) });
  await page.close();
}

await browser.close();
