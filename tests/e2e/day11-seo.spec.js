import { expect, test } from "@playwright/test";

const baseUrl = "https://yasuka0186.github.io/asunote-nagoya";
const pages = [
  ["/", `${baseUrl}/`],
  ["/services/", `${baseUrl}/services/`],
  ["/cases/", `${baseUrl}/cases/`],
  ["/cases/manufacturing/", `${baseUrl}/cases/manufacturing/`],
  ["/news/", `${baseUrl}/news/`],
  ["/company/", `${baseUrl}/company/`],
  ["/contact/", `${baseUrl}/contact/`],
  ["/privacy/", `${baseUrl}/privacy/`],
  ["/404.html", `${baseUrl}/404.html`]
];

test("all pages expose complete and unique social metadata", async ({ page }) => {
  const titles = new Set();
  const descriptions = new Set();

  for (const [path, canonical] of pages) {
    await page.goto(path);
    const title = await page.title();
    const description = await page.locator('meta[name="description"]').getAttribute("content");

    expect(title).not.toBe("");
    expect(description).not.toBe("");
    expect(titles.has(title)).toBe(false);
    expect(descriptions.has(description)).toBe(false);
    titles.add(title);
    descriptions.add(description);

    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", canonical);
    await expect(page.locator('link[rel="icon"]')).toHaveAttribute("href", /favicon\.svg$/);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", title);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", canonical);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", `${baseUrl}/assets/images/ogp.png`);
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
  }
});

test("structured data contains Organization and breadcrumbs", async ({ page }) => {
  await page.goto("/");
  const organization = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent());
  expect(organization["@type"]).toBe("Organization");

  for (const [path] of pages.slice(1, -1)) {
    await page.goto(path);
    const breadcrumb = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent());
    expect(breadcrumb["@type"]).toBe("BreadcrumbList");
    expect(breadcrumb.itemListElement[0].position).toBe(1);
  }
});

test("non-hero photos have dimensions and lazy loading", async ({ page }) => {
  for (const path of ["/", "/cases/", "/cases/manufacturing/", "/company/"]) {
    await page.goto(path);
    const photos = page.locator('img[src*="assets/images/"]:not([src$="ogp.png"])');

    for (let index = 0; index < await photos.count(); index += 1) {
      await expect(photos.nth(index)).toHaveAttribute("width", /\d+/);
      await expect(photos.nth(index)).toHaveAttribute("height", /\d+/);
      await expect(photos.nth(index)).toHaveAttribute("loading", "lazy");
    }
  }
});

test("robots and sitemap expose the intended public pages", async ({ request }) => {
  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toContain(`${baseUrl}/sitemap.xml`);

  const sitemap = await request.get("/sitemap.xml");
  const xml = await sitemap.text();
  expect((xml.match(/<url>/g) ?? [])).toHaveLength(8);
  expect(xml).not.toContain("404.html");
});
