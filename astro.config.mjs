import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://skorudzhiev.github.io",
  output: "static",
  trailingSlash: "always",
  integrations: [
    sitemap({
      filter: (page) => !["/indie/", "/blog/", "/projects/", "/404/"].includes(new URL(page).pathname),
    }),
  ],
});
