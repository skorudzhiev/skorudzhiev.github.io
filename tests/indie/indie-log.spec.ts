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
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Fifteen projects");
  await expect(page.locator(".site-header")).toHaveCount(0);
  await expect(page.locator(".site-footer")).toHaveCount(0);
  await expect(page.locator("[data-project-card]")).toHaveCount(15);
  await expect(page.getByRole("link", { name: "Bluesky / @skorudzhiev.bsky.social" })).toHaveAttribute(
    "href",
    "https://bsky.app/profile/skorudzhiev.bsky.social",
  );
  const followLinkColors = await page.locator(".follow-links > a").evaluateAll((links) =>
    links.map((link) => getComputedStyle(link).color),
  );
  expect(followLinkColors).toHaveLength(3);
  expect(new Set(followLinkColors).size).toBe(1);
  const projectIcons = page.locator("[data-project-icon]");
  await expect(projectIcons).toHaveCount(8);
  await expect
    .poll(() =>
      projectIcons.evaluateAll(
        (icons) =>
          icons.filter(
            (icon) => !(icon as HTMLImageElement).complete || (icon as HTMLImageElement).naturalWidth === 0,
          ).length,
      ),
    )
    .toBe(0);
  await expect(page.getByText("OpenClaw-Jarvis", { exact: true })).toHaveCount(0);

  const stickyPosition = await page.locator(".indie-index").evaluate((element) => getComputedStyle(element).position);
  expect(stickyPosition).toBe("sticky");
  await expect(page.locator('.index-links a[href="#overview"]')).toHaveAttribute("aria-current", "location");

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});

test("keeps the section index available and marks the current section", async ({ page }) => {
  const index = page.locator(".indie-index");
  await expect(index).toBeInViewport();

  await page.locator("#ledger").scrollIntoViewIfNeeded();
  await expect(page.locator('.index-links a[href="#ledger"]')).toHaveAttribute("aria-current", "location");
  const indexTop = await index.evaluate((element) => Math.round(element.getBoundingClientRect().top));
  expect(indexTop).toBe(0);
});

test("filters the full ledger without changing the page URL", async ({ page }) => {
  const originalUrl = page.url();
  const cards = page.locator("[data-project-card]");

  await page.getByRole("button", { name: /Shipped 4/ }).click();
  await expect(cards.filter({ visible: true })).toHaveCount(4);
  await expect(page.locator("#filter-status")).toHaveText("Showing 4 projects.");

  await page.getByRole("button", { name: /Active 9/ }).click();
  await expect(cards.filter({ visible: true })).toHaveCount(9);

  await page.getByRole("button", { name: /Lab \/ archive 2/ }).click();
  await expect(cards.filter({ visible: true })).toHaveCount(2);
  expect(page.url()).toBe(originalUrl);
});

test("keeps platform previews and private-project facts inside their publication boundaries", async ({ page }) => {
  const pangolines = page.locator("#project-pangolines");
  await expect(pangolines).toHaveAttribute("data-tier", "active");
  await expect(pangolines.locator(".ledger-tier")).toHaveText("Active builds");
  await expect(pangolines.locator(".status-chip")).toContainText("Public build");
  await expect(page.locator("#story-pangolines")).toHaveCount(0);
  await expect(page.locator('.public-projects a[href*="pangolines.vercel.app"]')).toHaveCount(0);

  const privateProjects = page.locator('[data-disclosure="private-product-facts"]');
  await expect(privateProjects).toHaveCount(10);
  await expect(privateProjects.locator("a.project-link")).toHaveCount(0);
});

test("opens project notes with the keyboard and exposes clear progress", async ({ page }) => {
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
