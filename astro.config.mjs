import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://skorudzhiev.github.io",
  output: "static",
  trailingSlash: "always",
  integrations: [sitemap()],
});
