import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");
const indiePath = path.join(dist, "indie", "index.html");
const indieHtml = await readFile(indiePath, "utf8");

const failures = [];
const expect = (condition, message) => {
  if (!condition) failures.push(message);
};

expect(
  indieHtml.includes('name="robots" content="noindex, nofollow, noarchive, nosnippet"'),
  "The Indie Log must carry the complete robots exclusion directive.",
);
expect(indieHtml.includes('href="https://skorudzhiev.github.io/indie/"'), "The Indie Log canonical URL is missing.");
expect(!indieHtml.includes("twelve products"), "The social metadata contains a stale twelve-project claim.");
expect(indieHtml.includes("indie-og-v2.png"), "The current Indie Log social preview image is missing.");
expect(!indieHtml.includes('class="site-header"'), "The personal-site header leaked into the Indie Log.");
expect(!indieHtml.includes('class="site-footer"'), "The personal-site footer leaked into the Indie Log.");
expect(indieHtml.includes('class="theme-toggle"'), "The Indie Log masthead is missing the light/dark theme toggle.");
expect(indieHtml.includes('class="indie-index"'), "The Indie Log is missing its persistent section index.");
expect(
  indieHtml.includes('href="https://bsky.app/profile/skorudzhiev.bsky.social"'),
  "The Indie Log follow section is missing the Bluesky profile link.",
);
expect(
  indieHtml.includes("Bluesky / @skorudzhiev.bsky.social"),
  "The Indie Log Bluesky link is missing its visible profile handle.",
);
expect(
  !indieHtml.includes("follow-link--bluesky"),
  "The Indie Log Bluesky link must use the same visual treatment as the other follow links.",
);
expect(indieHtml.includes('data-filter="shipped"'), "The project stage filters are missing.");
expect(
  (indieHtml.match(/<article class="ledger-card"[^>]*data-project-card/g) ?? []).length === 15,
  "The project ledger must contain exactly 15 entries.",
);
expect(
  indieHtml.includes('id="project-pangolines" data-project-card data-tier="active"'),
  "A Vercel-only Pangolines build must remain active rather than shipped.",
);
expect(
  !indieHtml.includes('id="story-pangolines"'),
  "A Vercel-only Pangolines build must not be featured as a shipped story.",
);
expect(
  (indieHtml.match(/data-disclosure="private-product-facts"/g) ?? []).length === 10,
  "The private-product disclosure boundary must cover exactly ten approved records.",
);
expect(
  (indieHtml.match(/data-project-icon/g) ?? []).length === 8,
  "The project ledger must render all eight available original project icons.",
);
expect(!indieHtml.includes("OpenClaw-Jarvis"), "Backup repositories must not appear as products.");

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const resolved = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(resolved)));
    else files.push(resolved);
  }
  return files;
}

const builtFiles = await walk(dist);
const sitemapFiles = builtFiles.filter((file) => /sitemap.*\.xml$/.test(path.basename(file)));
expect(sitemapFiles.length > 0, "No generated sitemap was found.");

for (const sitemapFile of sitemapFiles) {
  const contents = await readFile(sitemapFile, "utf8");
  expect(!contents.includes("/indie/"), `The Indie Log leaked into ${path.basename(sitemapFile)}.`);
}

const discoverableFiles = builtFiles.filter((file) => {
  if (!/\.(html|xml)$/.test(file)) return false;
  if (file === indiePath) return false;
  if (/sitemap.*\.xml$/.test(path.basename(file))) return false;
  return true;
});

for (const file of discoverableFiles) {
  const contents = await readFile(file, "utf8");
  expect(!contents.includes('href="/indie/"'), `A discoverable link to /indie/ exists in ${path.relative(dist, file)}.`);
}

const robotsPath = path.join(dist, "robots.txt");
if (builtFiles.includes(robotsPath)) {
  const robots = await readFile(robotsPath, "utf8");
  expect(!robots.includes("/indie/"), "robots.txt must not reveal the unlisted route.");
}

if (failures.length > 0) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log("Indie Log static verification passed: metadata, publication policy, isolation, inventory, sitemap, and link checks.");
