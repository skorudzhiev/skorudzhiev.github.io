import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/indie",
  outputDir: "./test-results/indie",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: "http://127.0.0.1:4321",
    browserName: "chromium",
    colorScheme: "light",
    locale: "en-GB",
    timezoneId: "Europe/Sofia",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "desktop",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 1000 },
      },
    },
    {
      name: "mobile",
      use: {
        ...devices["iPhone 13"],
        viewport: { width: 390, height: 844 },
      },
    },
  ],
  webServer: {
    command: "ASTRO_TELEMETRY_DISABLED=1 npm run preview -- --host 127.0.0.1 --port 4321",
    url: "http://127.0.0.1:4321/indie/",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
