import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const failures = [];

function expect(condition, message) {
  if (!condition) failures.push(message);
}

async function readDist(...segments) {
  return fs.readFile(path.join(root, "dist", ...segments), "utf8");
}

const [homeHtml, servicesHtml, writingHtml, articleHtml, feedXml] = await Promise.all([
  readDist("index.html"),
  readDist("services", "index.html"),
  readDist("writing", "index.html"),
  readDist("writing", "mcp-project-brains", "index.html"),
  readDist("feed.xml"),
]);

expect(
  homeHtml.includes("AI systems &amp; MCP integrations"),
  "The homepage capability band is missing the MCP integration positioning.",
);
expect(
  homeHtml.includes('href="/writing/mcp-project-brains/"'),
  "The homepage writing section is missing the first-party MCP article.",
);
expect(
  homeHtml.includes('href="https://bsky.app/profile/skorudzhiev.bsky.social"'),
  "The public-site footer is missing the Bluesky profile link.",
);
expect(
  homeHtml.includes(">Bluesky ↗</a>"),
  "The Bluesky profile is missing its compact footer label.",
);
expect(
  !homeHtml.includes("bluesky-badge"),
  "The Bluesky profile must use the same footer-link markup as the other social profiles.",
);
expect(
  servicesHtml.includes('id="context-systems"'),
  "The services page is missing the context-aware product systems section.",
);
expect(
  servicesHtml.includes("I build and operationalize MCP integrations"),
  "The services page is missing the bounded MCP capability claim.",
);
expect(
  servicesHtml.includes("production-minded integrations and product workflows"),
  "The services page is missing the explicit evidence boundary.",
);
expect(
  writingHtml.includes('href="/writing/mcp-project-brains/"'),
  "The writing index is missing the internal MCP article route.",
);
expect(
  !writingHtml.includes('href="/writing/mcp-project-brains/" target="_blank"'),
  "The internal MCP article must not open as an external destination.",
);
expect(
  articleHtml.includes("MCP Is the Interface. The Project Brain Is the System."),
  "The MCP article title is missing.",
);
expect(
  articleHtml.includes("Two products, two different boundaries"),
  "The MCP article is missing its implementation evidence section.",
);
expect(
  articleHtml.includes("The marketable unit is an outcome"),
  "The MCP article is missing the commercial-claim boundary.",
);
expect(
  articleHtml.includes('class="article-navigator"'),
  "The MCP article is missing its persistent heading navigator.",
);
expect(
  homeHtml.includes('class="theme-toggle"'),
  "The personal-site header is missing the light/dark theme toggle.",
);
expect(
  articleHtml.includes('rel="canonical" href="https://skorudzhiev.github.io/writing/mcp-project-brains/"'),
  "The MCP article canonical URL is incorrect.",
);
expect(
  feedXml.includes("https://skorudzhiev.github.io/writing/mcp-project-brains/"),
  "The writing feed is missing the first-party MCP article.",
);

if (failures.length > 0) {
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Positioning verification passed: homepage, services, article, internal routing, canonical, and feed checks.");
