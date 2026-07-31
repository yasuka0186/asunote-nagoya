import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { minify as minifyHtml } from "html-minifier-terser";
import { minify as minifyJavaScript } from "terser";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputRoot = path.join(projectRoot, "dist");
const htmlFiles = [
  "index.html",
  "services/index.html",
  "cases/index.html",
  "cases/manufacturing/index.html",
  "news/index.html",
  "company/index.html",
  "contact/index.html",
  "privacy/index.html",
  "404.html"
];
const javascriptFiles = [
  "js/main.js",
  "js/data/cases.js",
  "js/data/news.js",
  "js/modules/contact-form.js",
  "js/modules/faq.js",
  "js/modules/fixed-cta.js",
  "js/modules/form-validation.js",
  "js/modules/header.js",
  "js/modules/mobile-menu.js",
  "js/modules/render-content-lists.js",
  "js/modules/scroll-reveal.js"
];

const writeOutput = async (relativePath, content) => {
  const outputPath = path.join(outputRoot, relativePath);
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, content);
};

await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });

for (const relativePath of htmlFiles) {
  const source = await readFile(path.join(projectRoot, relativePath), "utf8");
  const output = await minifyHtml(source, {
    collapseWhitespace: true,
    minifyCSS: true,
    minifyJS: true,
    removeComments: true,
    removeRedundantAttributes: false
  });
  await writeOutput(relativePath, output);
}

for (const relativePath of javascriptFiles) {
  const source = await readFile(path.join(projectRoot, relativePath), "utf8");
  const result = await minifyJavaScript(source, { module: true });
  await writeOutput(relativePath, result.code);
}

await cp(path.join(projectRoot, "assets"), path.join(outputRoot, "assets"), { recursive: true });
await cp(path.join(projectRoot, "css"), path.join(outputRoot, "css"), { recursive: true });
await cp(path.join(projectRoot, "robots.txt"), path.join(outputRoot, "robots.txt"));
await cp(path.join(projectRoot, "sitemap.xml"), path.join(outputRoot, "sitemap.xml"));
