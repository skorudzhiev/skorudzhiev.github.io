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
    hasText: "MCP Is the Interface. The Project Brain Is the System.",
  });
  await expect(articleCard.getByRole("link", { name: "Read the article" })).toHaveAttribute(
    "href",
    "/writing/mcp-project-brains/",
  );
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

  await expect(page).toHaveTitle(/MCP Is the Interface\. The Project Brain Is the System\./);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://skorudzhiev.github.io/writing/mcp-project-brains/",
  );
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "MCP Is the Interface. The Project Brain Is the System.",
  );
  await expect(page.getByRole("heading", { name: "Two products, two different boundaries" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "The marketable unit is an outcome" })).toBeVisible();
  await expect(page.getByText("Continuum: stage the change, let the product approve it")).toBeVisible();
  await expect(page.getByText("Postiz Chat Bridge: context, operations, and guarded external actions")).toBeVisible();
  await expectNoHorizontalOverflow(page);
});
