import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { minify as minifyHtml } from "html-minifier-terser";
import { minify as minifyJavaScript } from "terser";
import { cases } from "../js/data/cases.js";
import { news } from "../js/data/news.js";
import { caseMarkup, newsMarkup } from "../js/modules/render-content-lists.js";

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

const preRenderSharedContent = (relativePath, html) => {
  const pathPrefix = relativePath === "index.html" ? "./" : "../";
  const showNewsSummary = relativePath === "news/index.html";
  let output = html;

  if (relativePath === "index.html" || relativePath === "cases/index.html") {
    output = output
      .replace("data-case-list", "data-case-list data-rendered")
      .replace(
        /<noscript><p>導入事例の表示にはJavaScriptが必要です。[\s\S]*?<\/p><\/noscript>/,
        cases.map((item) => caseMarkup(item, pathPrefix)).join("")
      );
  }

  if (relativePath === "index.html" || relativePath === "news/index.html") {
    output = output
      .replace("data-news-list", "data-news-list data-rendered")
      .replace(
        /<noscript><p>お知らせの表示にはJavaScriptが必要です。[\s\S]*?<\/p><\/noscript>/,
        news.map((item) => newsMarkup(item, showNewsSummary)).join("")
      );
  }

  return output;
};

const writeOutput = async (relativePath, content) => {
  const outputPath = path.join(outputRoot, relativePath);
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, content);
};

await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });

for (const relativePath of htmlFiles) {
  const source = await readFile(path.join(projectRoot, relativePath), "utf8");
  const preRenderedSource = preRenderSharedContent(relativePath, source);
  const output = await minifyHtml(preRenderedSource, {
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
await writeOutput(".nojekyll", "");
