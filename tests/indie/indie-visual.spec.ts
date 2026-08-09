import { mkdir } from "node:fs/promises";
import path from "node:path";
import { test } from "@playwright/test";

test("visual-baseline: captures the hero, stories, and ledger", async ({ page }, testInfo) => {
  test.skip(!process.env.UPDATE_INDIE_BASELINES, "Baseline capture is an intentional local update.");

  const output = path.join(process.cwd(), "tests", "indie", "baselines");
  await mkdir(output, { recursive: true });
  await page.goto("/indie/", { waitUntil: "domcontentloaded" });

  await page.screenshot({ path: path.join(output, `${testInfo.project.name}-hero.png`) });

  await page.locator("#stories > .section-heading").scrollIntoViewIfNeeded();
  await page.waitForTimeout(100);
  await page.screenshot({ path: path.join(output, `${testInfo.project.name}-stories.png`) });

  await page.locator("#ledger > .section-heading").scrollIntoViewIfNeeded();
  await page.waitForTimeout(100);
  await page.screenshot({ path: path.join(output, `${testInfo.project.name}-ledger.png`) });
});
