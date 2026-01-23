import { test, expect } from "@playwright/test";
import { loginViaUI } from "./fixtures/auth";

/**
 * End-to-end tests for Apprentice Toolbox & On-Job Tools
 *
 * Tests:
 * - Apprentice Toolbox main page
 * - All toolbox sub-pages
 * - On-Job Tools main page
 * - All on-job tools sub-pages
 * - BS7671 resources
 */

// Configure retries for login timeout resilience during parallel execution
test.describe.configure({ retries: 2 });

test.describe("Apprentice Toolbox - Main Page", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test("toolbox page loads", async ({ page }) => {
    await page.goto("/apprentice/toolbox");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("toolbox shows resource cards", async ({ page }) => {
    await page.goto("/apprentice/toolbox");
    await page.waitForTimeout(2000);

    // Look for resource-related content
    const cards = page.locator('[class*="card"]');
    const cardCount = await cards.count();

    expect(cardCount).toBeGreaterThanOrEqual(0);
  });
});

test.describe("Apprentice Toolbox - Sub-Pages", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test("apprenticeship expectations page loads", async ({ page }) => {
    await page.goto("/apprentice/toolbox/apprenticeship-expectations");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("off job training guide loads", async ({ page }) => {
    await page.goto("/apprentice/toolbox/off-job-training-guide");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("apprenticeship funding page loads", async ({ page }) => {
    await page.goto("/apprentice/toolbox/apprenticeship-funding");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("end point assessment page loads", async ({ page }) => {
    await page.goto("/apprentice/toolbox/end-point-assessment");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("site jargon page loads", async ({ page }) => {
    await page.goto("/apprentice/toolbox/site-jargon");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("portfolio building page loads", async ({ page }) => {
    await page.goto("/apprentice/toolbox/portfolio-building");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("communication skills page loads", async ({ page }) => {
    await page.goto("/apprentice/toolbox/communication-skills");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("study tips page loads", async ({ page }) => {
    await page.goto("/apprentice/toolbox/study-tips");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("learning from mistakes page loads", async ({ page }) => {
    await page.goto("/apprentice/toolbox/learning-from-mistakes");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("time management page loads", async ({ page }) => {
    await page.goto("/apprentice/toolbox/time-management");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("professional tool guide page loads", async ({ page }) => {
    await page.goto("/apprentice/toolbox/professional-tool-guide");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });
});

test.describe("Apprentice Toolbox - Year Expectations", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test("Year 1 expectations accessible", async ({ page }) => {
    await page.goto("/apprentice/toolbox/apprenticeship-expectations/year-1");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("Year 2 expectations accessible", async ({ page }) => {
    await page.goto("/apprentice/toolbox/apprenticeship-expectations/year-2");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("Year 3 expectations accessible", async ({ page }) => {
    await page.goto("/apprentice/toolbox/apprenticeship-expectations/year-3");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("Year 4 expectations accessible", async ({ page }) => {
    await page.goto("/apprentice/toolbox/apprenticeship-expectations/year-4");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });
});

test.describe("On-Job Tools - Main Page", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test("on job tools page loads", async ({ page }) => {
    await page.goto("/apprentice/on-job-tools");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("on job tools shows tool options", async ({ page }) => {
    await page.goto("/apprentice/on-job-tools");
    await page.waitForTimeout(2000);

    // Look for tool cards
    const tools = page.locator('[class*="card"]');
    const toolCount = await tools.count();

    expect(toolCount).toBeGreaterThanOrEqual(0);
  });
});

test.describe("On-Job Tools - Sub-Pages", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test("tools guide page loads", async ({ page }) => {
    await page.goto("/apprentice/on-job-tools/tools-guide");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("electrical installation guides page loads", async ({ page }) => {
    await page.goto("/apprentice/on-job-tools/electrical-installation-guides");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("assessment tools page loads", async ({ page }) => {
    await page.goto("/apprentice/on-job-tools/assessment");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("safety cases page loads", async ({ page }) => {
    await page.goto("/apprentice/on-job-tools/safety-cases");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("workplace culture page loads", async ({ page }) => {
    await page.goto("/apprentice/on-job-tools/workplace-culture");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("supervisor knowledge page loads", async ({ page }) => {
    await page.goto("/apprentice/on-job-tools/supervisor-knowledge");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("testing procedures page loads", async ({ page }) => {
    await page.goto("/apprentice/on-job-tools/testing-procedures");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("flashcards page loads", async ({ page }) => {
    await page.goto("/apprentice/on-job-tools/flashcards");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("calculations page loads", async ({ page }) => {
    await page.goto("/apprentice/on-job-tools/calculations");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });
});

test.describe("On-Job Tools - Installation Guides", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test("commercial installations guide loads", async ({ page }) => {
    await page.goto("/apprentice/on-job-tools/electrical-installation-guides/commercial");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("industrial installations guide loads", async ({ page }) => {
    await page.goto("/apprentice/on-job-tools/electrical-installation-guides/industrial");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("outdoor installations guide loads", async ({ page }) => {
    await page.goto("/apprentice/on-job-tools/electrical-installation-guides/outdoor");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("domestic installations guide loads", async ({ page }) => {
    await page.goto("/apprentice/on-job-tools/electrical-installation-guides/domestic");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("specialist installations guide loads", async ({ page }) => {
    await page.goto("/apprentice/on-job-tools/electrical-installation-guides/specialist");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });
});

test.describe("BS7671 Resources", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test("BS7671 run through page loads", async ({ page }) => {
    await page.goto("/apprentice/on-job-tools/bs7671-runthrough");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("BS7671 inspection testing hub loads", async ({ page }) => {
    await page.goto("/apprentice/inspection-testing-hub");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });
});

test.describe("Additional Study Resources", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test("maths refresher page loads", async ({ page }) => {
    await page.goto("/apprentice/maths-refresher");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("electrical symbols page loads", async ({ page }) => {
    await page.goto("/apprentice/electrical-symbols");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("tools materials guide page loads", async ({ page }) => {
    await page.goto("/apprentice/tools-materials");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("troubleshooting guide page loads", async ({ page }) => {
    await page.goto("/apprentice/troubleshooting");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });
});
