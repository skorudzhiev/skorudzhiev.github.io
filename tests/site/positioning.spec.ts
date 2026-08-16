import { expect, test, type Page } from "@playwright/test";

async function expectNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(1);
}

test("presents MCP as part of the broader product practice", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });

  await expect(page.getByText("AI systems & MCP integrations", { exact: true })).toBeVisible();
  const articleCard = page.locator(".writing-card").filter({
    hasText: "MCP and Project Brains",
  });
  await expect(articleCard.getByRole("link", { name: "Read the article" })).toHaveAttribute(
    "href",
    "/writing/mcp-project-brains/",
  );
  await expect(page.getByRole("link", { name: "Bluesky ↗", exact: true })).toHaveAttribute(
    "href",
    "https://bsky.app/profile/skorudzhiev.bsky.social",
  );
  const socialLinkBoxes = await page
    .getByLabel("Social links")
    .getByRole("link")
    .evaluateAll((links) =>
      links.map((link) => {
        const box = link.getBoundingClientRect();
        return { left: box.left, height: box.height };
      }),
    );
  expect(socialLinkBoxes).toHaveLength(4);
  expect(new Set(socialLinkBoxes.map(({ left }) => Math.round(left))).size).toBe(1);
  expect(Math.max(...socialLinkBoxes.map(({ height }) => height))).toBeLessThanOrEqual(24);
  await expectNoHorizontalOverflow(page);
});

test("shows the bounded service claim and two implementation examples", async ({ page }) => {
  await page.goto("/services/", { waitUntil: "domcontentloaded" });

  const section = page.locator("#context-systems");
  await expect(section.getByRole("heading", { name: "Give AI the right context. Keep the boundary visible." })).toBeVisible();
  await expect(section.getByText("Continuum", { exact: true })).toBeVisible();
  await expect(section.getByText("Postiz Chat Bridge", { exact: true })).toBeVisible();
  await expect(section.getByRole("link", { name: "Read the field note" })).toHaveAttribute(
    "href",
    "/writing/mcp-project-brains/",
  );
  await expect(section).toContainText("not generic protocol demos");
  await expectNoHorizontalOverflow(page);
});

test("publishes the first-party field note with a clear evidence boundary", async ({ page }) => {
  await page.goto("/writing/mcp-project-brains/", { waitUntil: "domcontentloaded" });

  await expect(page).toHaveTitle(/MCP and Project Brains/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://skorudzhiev.github.io/writing/mcp-project-brains/",
  );
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "MCP and Project Brains",
  );
  await expect(page.getByRole("heading", { name: "Two products, two different boundaries" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "The marketable unit is an outcome" })).toBeVisible();
  await expect(page.getByText("Continuum: stage the change, let the product approve it")).toBeVisible();
  await expect(page.getByText("Postiz Chat Bridge: context, operations, and guarded external actions")).toBeVisible();

  const articleNavigator = page.getByLabel("Article navigation");
  await expect(articleNavigator).toBeVisible();
  expect(await articleNavigator.evaluate((element) => getComputedStyle(element).position)).toBe("fixed");
  await articleNavigator.locator("summary").click();
  await articleNavigator.getByRole("link", { name: /Two products, two different boundaries/ }).click();
  await expect(page).toHaveURL(/#two-products-two-different-boundaries$/);
  await expect(articleNavigator.locator('[aria-current="location"]')).toContainText(
    "Two products, two different boundaries",
  );
  await expectNoHorizontalOverflow(page);
});

test("persists the two-state theme across the personal site and Indie Log", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.evaluate(() => localStorage.removeItem("stoyan-theme"));
  await page.reload({ waitUntil: "domcontentloaded" });

  const root = page.locator("html");
  await expect(root).toHaveAttribute("data-theme", "light");
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await expect(root).toHaveAttribute("data-theme", "dark");
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute("content", "#151715");

  await page.goto("/indie/", { waitUntil: "domcontentloaded" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.getByRole("button", { name: "Switch to light theme" })).toBeVisible();

  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute("content", "#eee7d8");
  await expectNoHorizontalOverflow(page);
});
