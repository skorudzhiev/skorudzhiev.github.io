import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/indie/", { waitUntil: "domcontentloaded" });
});

test("renders the isolated, unlisted field journal", async ({ page }) => {
  await expect(page).toHaveTitle(/Stoyan's Indie Log/);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    "noindex, nofollow, noarchive, nosnippet",
  );
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Twelve bets");
  await expect(page.locator(".site-header")).toHaveCount(0);
  await expect(page.locator(".site-footer")).toHaveCount(0);
  await expect(page.locator("[data-project-card]")).toHaveCount(12);
  await expect(page.getByText("OpenClaw-Jarvis", { exact: true })).toHaveCount(0);

  const stickyPosition = await page.locator(".indie-index").evaluate((element) => getComputedStyle(element).position);
  expect(stickyPosition).toBe("sticky");

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});

test("filters the full ledger without changing the page URL", async ({ page }) => {
  const originalUrl = page.url();
  const cards = page.locator("[data-project-card]");

  await page.getByRole("button", { name: /Shipped 5/ }).click();
  await expect(cards.filter({ visible: true })).toHaveCount(5);
  await expect(page.locator("#filter-status")).toHaveText("Showing 5 projects.");

  await page.getByRole("button", { name: /Active 5/ }).click();
  await expect(cards.filter({ visible: true })).toHaveCount(5);

  await page.getByRole("button", { name: /Lab \/ archive 2/ }).click();
  await expect(cards.filter({ visible: true })).toHaveCount(2);
  expect(page.url()).toBe(originalUrl);
});

test("opens project notes with the keyboard and exposes honest progress", async ({ page }) => {
  const firstDetails = page.locator("[data-project-card] details").first();
  const summary = firstDetails.locator("summary");

  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(firstDetails).toHaveAttribute("open", "");
  await expect(firstDetails.locator(".milestone-list li")).not.toHaveCount(0);
  await expect(firstDetails.locator(".ledger-note").first()).toContainText("Lesson");
  await expect(firstDetails.locator(".ledger-note--next")).toContainText("Next");
});

test("keeps external links explicit and honors reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload({ waitUntil: "domcontentloaded" });

  const scrollBehavior = await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior);
  expect(scrollBehavior).toBe("auto");

  const externalLinks = page.locator('main a[target="_blank"], footer a[target="_blank"]');
  await expect(externalLinks.first()).toBeVisible();
  const count = await externalLinks.count();
  for (let index = 0; index < count; index += 1) {
    const rel = await externalLinks.nth(index).getAttribute("rel");
    expect(rel).toContain("noopener");
  }
});
