import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://skorudzhiev.github.io",
  output: "static",
  trailingSlash: "always",
  integrations: [
    sitemap({
      // Republished editions remain readable locally, but Medium is canonical.
      filter: (page) => ![
        "/indie/", "/blog/", "/projects/", "/404/",
        "/writing/a-better-reading-order-is-a-better-job-for-ai/",
        "/writing/a-project-brain-gives-ai-something-better-than-a-blank-prompt/",
        "/writing/architecture-as-a-living-document/",
      ].includes(new URL(page).pathname),
    }),
  ],
});
