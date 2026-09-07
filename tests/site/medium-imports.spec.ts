import { expect, test } from "@playwright/test";

const articles = [
  {
    slug: "a-better-reading-order-is-a-better-job-for-ai",
    title: "A better reading order is a better job for AI",
    mediumId: "dcf65f9480df",
    date: "September 6, 2026",
    images: 4,
    featured: true,
    opening: "Most useful boards do not begin as presentations.",
    ending: "That is why the workflow ends inside the board, not inside the tool call.",
    sections: ["The board stays the source of truth", "MCP becomes a seam between intent and structure", "The review is where the two tools meet", "Images belong in the same boundary", "A useful kind of assistance"],
  },
  {
    slug: "a-project-brain-gives-ai-something-better-than-a-blank-prompt",
    title: "A project brain gives AI something better than a blank prompt",
    mediumId: "4e376a1a99fc",
    date: "August 31, 2026",
    images: 2,
    featured: false,
    opening: "Much of the work we call “using AI” is really context work.",
    ending: "That is not a replacement for thinking. It is infrastructure that leaves more room for it.",
    sections: ["What belongs in a project brain", "Current state matters more than polished positioning", "Evidence should travel with the instruction", "Serve the context where the work happens", "A brain should not become a mythology", "Better context across several interfaces", "Start small and keep it honest"],
  },
  {
    slug: "architecture-as-a-living-document",
    title: "Architecture as a living document",
    mediumId: "cb86df0e1bb5",
    date: "August 20, 2026",
    images: 3,
    featured: true,
    opening: "The first version of an architecture diagram is usually useful. It captures a system while the trade-offs are still fresh and the boundaries are still being discussed.",
    ending: "An answer can be copied anywhere. The logic around it deserves somewhere durable to live.",
    sections: ["A diagram is more useful when its source stays close", "The diagram is only part of the decision", "A declarative path into the Canvas", "Local-first is a boundary, not a slogan", "Keep the logic"],
  },
];

for (const article of articles) {
  test(`republishes ${article.slug} completely with Medium attribution`, async ({ page, request }, testInfo) => {
    const path = `/writing/${article.slug}/`;
    const medium = `https://skorudzhiev.medium.com/${article.slug}-${article.mediumId}`;
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(article.title);
    await expect(page.locator(".article-hero .eyebrow")).toContainText(article.date);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", medium);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", `https://skorudzhiev.github.io${path}`);
    await expect(page.getByRole("link", { name: "Originally published on Medium" })).toHaveAttribute("href", medium);
    await expect(page.getByRole("link", { name: "Back to writing" })).toHaveAttribute("href", "/writing/");
    await expect(page.locator(".article-closing")).toHaveCount(0);

    const body = page.locator("[data-article-content]");
    await expect(body.locator("h2")).toHaveText(article.sections);
    await expect(body.locator(".prose > p").first()).toHaveText(article.opening);
    await expect(body.locator(".prose > p").last()).toHaveText(article.ending);
    await expect(body).not.toContainText("Become a Medium member");
    await expect(body.locator("img")).toHaveCount(article.images);
    for (const img of await body.locator("img").all()) {
      await img.scrollIntoViewIfNeeded();
      await expect.poll(() => img.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
      await expect(img).toHaveAttribute("alt", /\S+/);
      await expect(img).toHaveAttribute("src", new RegExp(`^/assets/images/writing/${article.slug}/`));
      const dimensions = await img.evaluate((element: HTMLImageElement) => ({
        rendered: element.getBoundingClientRect().width / element.getBoundingClientRect().height,
        natural: element.naturalWidth / element.naturalHeight,
      }));
      expect(dimensions.rendered).toBeCloseTo(dimensions.natural, 2);
    }
    if (article.images === 4) {
      await expect(body.locator("figcaption")).toContainText("A real Continuum Canvas titled");
      await expect(body.locator("ol li")).toHaveCount(4);
      await expect(body.locator("strong")).toContainText(["prepare a better reading order, then wait.", "Read the board.", "Stage a proposal.", "Review in Continuum.", "Approve or reject."]);
    }
    if (article.images === 2) {
      await expect(body.locator("ul li")).toHaveCount(24);
      await expect(body.locator("ol li")).toHaveCount(5);
    }

    const navigator = page.getByLabel("Article navigation");
    await navigator.locator("summary").click();
    await navigator.getByRole("link", { name: article.sections.at(-1), exact: false }).click();
    await expect(navigator.locator('[aria-current="location"]')).toContainText(article.sections.at(-1)!);

    for (const theme of ["light", "dark"]) {
      await page.evaluate((value) => { localStorage.setItem("stoyan-theme", value); }, theme);
      await page.reload();
      await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({ path: testInfo.outputPath(`${theme}-hero.png`) });
      await body.locator("figure").first().scrollIntoViewIfNeeded();
      await page.screenshot({ path: testInfo.outputPath(`${theme}-body.png`) });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow).toBeLessThanOrEqual(1);
    }

    await page.goto("/writing/");
    const card = page.locator(".writing-card").filter({ hasText: article.title });
    await expect(card.getByRole("link", { name: "Read the article" })).toHaveAttribute("href", path);
    await expect(card.getByRole("link")).not.toHaveAttribute("target", "_blank");
    if (article.featured) await expect(card).toHaveClass(/writing-card--featured/);
    else await expect(card).not.toHaveClass(/writing-card--featured/);
    const feed = await request.get("/feed.xml");
    expect(await feed.text()).toContain(`https://skorudzhiev.github.io${path}`);
    const sitemap = await request.get("/sitemap-0.xml");
    expect(await sitemap.text()).not.toContain(path);
    expect(await sitemap.text()).toContain("/writing/mcp-project-brains/");
  });
}
