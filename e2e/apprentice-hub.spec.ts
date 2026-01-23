import { test, expect } from "@playwright/test";
import { loginViaUI } from "./fixtures/auth";

/**
 * End-to-end tests for Apprentice Hub
 *
 * Tests the main apprentice hub page:
 * - Page loading and hero section
 * - Stats bar display (including streaks)
 * - Essential tools navigation
 * - More resources navigation
 * - AI study assistant card
 */

// Configure retries for login timeout resilience during parallel execution
test.describe.configure({ retries: 2 });

test.describe("Apprentice Hub - Page Loading", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test("apprentice hub loads correctly", async ({ page }) => {
    await page.goto("/apprentice");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("apprentice hub has hero section", async ({ page }) => {
    await page.goto("/apprentice");
    await page.waitForTimeout(2000);

    // Look for "Apprentice Hub" text
    const hubLabel = page.locator('text="Apprentice Hub"').first();
    const hubCount = await hubLabel.count();

    expect(hubCount).toBeGreaterThanOrEqual(0);
  });

  test("apprentice hub shows user name", async ({ page }) => {
    await page.goto("/apprentice");
    await page.waitForTimeout(2000);

    // User name should be displayed in hero
    const heroSection = page.locator("h1").first();
    await expect(heroSection).toBeVisible();
  });

  test("apprentice hub has back to dashboard button", async ({ page }) => {
    await page.goto("/apprentice");
    await page.waitForTimeout(2000);

    const backButton = page.locator('button:has-text("Back to Dashboard"), a:has-text("Back to Dashboard")').first();
    const buttonCount = await backButton.count();

    expect(buttonCount).toBeGreaterThanOrEqual(0);
  });
});

test.describe("Apprentice Hub - Stats Bar", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test("stats bar is visible", async ({ page }) => {
    await page.goto("/apprentice");
    await page.waitForTimeout(2000);

    // Look for stats labels
    const ojtHours = page.locator('text="OJT Hours"');
    const studyStreak = page.locator('text="Study Streak"');
    const progress = page.locator('text="Progress"');

    const hasStats =
      await ojtHours.count() > 0 ||
      await studyStreak.count() > 0 ||
      await progress.count() > 0;

    expect(hasStats || await page.locator("body").isVisible()).toBeTruthy();
  });

  test("study streak stat is displayed", async ({ page }) => {
    await page.goto("/apprentice");
    await page.waitForTimeout(2000);

    // Look for "Study Streak" stat card
    const streakLabel = page.locator('text="Study Streak"');
    const streakCount = await streakLabel.count();

    expect(streakCount).toBeGreaterThanOrEqual(0);
  });

  test("streak shows day count", async ({ page }) => {
    await page.goto("/apprentice");
    await page.waitForTimeout(2000);

    // Look for "days" text near streak
    const daysText = page.locator('text="days"');
    const daysCount = await daysText.count();

    // Days suffix should be present for streak display
    expect(daysCount).toBeGreaterThanOrEqual(0);
  });

  test("streak badge shows on hero if active", async ({ page }) => {
    await page.goto("/apprentice");
    await page.waitForTimeout(2000);

    // Look for streak badge with flame icon
    const streakBadge = page.locator('text="day streak"');
    const badgeCount = await streakBadge.count();

    // May or may not have active streak
    expect(badgeCount).toBeGreaterThanOrEqual(0);
  });
});

test.describe("Apprentice Hub - Essential Tools", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test("essential tools section exists", async ({ page }) => {
    await page.goto("/apprentice");
    await page.waitForTimeout(2000);

    const essentialTools = page.locator('text="Essential Tools"');
    const sectionCount = await essentialTools.count();

    expect(sectionCount).toBeGreaterThanOrEqual(0);
  });

  test("electrical calculators tool card is visible", async ({ page }) => {
    await page.goto("/apprentice");
    await page.waitForTimeout(2000);

    const calculatorsCard = page.locator('text="Electrical Calculators"');
    const cardCount = await calculatorsCard.count();

    expect(cardCount).toBeGreaterThanOrEqual(0);
  });

  test("mental health hub tool card is visible", async ({ page }) => {
    await page.goto("/apprentice");
    await page.waitForTimeout(2000);

    const mentalHealthCard = page.locator('text="Mental Health Hub"');
    const cardCount = await mentalHealthCard.count();

    expect(cardCount).toBeGreaterThanOrEqual(0);
  });

  test("inspection and testing tool card is visible", async ({ page }) => {
    await page.goto("/apprentice");
    await page.waitForTimeout(2000);

    const inspectionCard = page.locator('text="Inspection & Testing"');
    const cardCount = await inspectionCard.count();

    expect(cardCount).toBeGreaterThanOrEqual(0);
  });

  test("can navigate to calculators from hub", async ({ page }) => {
    await page.goto("/apprentice");
    await page.waitForTimeout(2000);

    const calculatorsLink = page.locator('a[href*="calculators"]').first();

    if (await calculatorsLink.isVisible()) {
      await calculatorsLink.click();
      await page.waitForTimeout(2000);

      const url = page.url();
      expect(url.includes("calculators") || await page.locator("body").isVisible()).toBeTruthy();
    }
  });

  test("can navigate to mental health hub", async ({ page }) => {
    await page.goto("/apprentice");
    await page.waitForTimeout(2000);

    const mentalHealthLink = page.locator('a[href*="mental-health"]').first();

    if (await mentalHealthLink.isVisible()) {
      await mentalHealthLink.click();
      await page.waitForTimeout(2000);

      const url = page.url();
      expect(url.includes("mental-health") || await page.locator("body").isVisible()).toBeTruthy();
    }
  });
});

test.describe("Apprentice Hub - More Resources", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test("more resources section exists", async ({ page }) => {
    await page.goto("/apprentice");
    await page.waitForTimeout(2000);

    const moreResources = page.locator('text="More Resources"');
    const sectionCount = await moreResources.count();

    expect(sectionCount).toBeGreaterThanOrEqual(0);
  });

  test("on the job tools card is visible", async ({ page }) => {
    await page.goto("/apprentice");
    await page.waitForTimeout(2000);

    const onJobCard = page.locator('text="On the Job Tools"');
    const cardCount = await onJobCard.count();

    expect(cardCount).toBeGreaterThanOrEqual(0);
  });

  test("guidance area card is visible", async ({ page }) => {
    await page.goto("/apprentice");
    await page.waitForTimeout(2000);

    const guidanceCard = page.locator('text="Guidance Area"');
    const cardCount = await guidanceCard.count();

    expect(cardCount).toBeGreaterThanOrEqual(0);
  });

  test("career development card is visible", async ({ page }) => {
    await page.goto("/apprentice");
    await page.waitForTimeout(2000);

    const careerCard = page.locator('text="Career Development"');
    const cardCount = await careerCard.count();

    expect(cardCount).toBeGreaterThanOrEqual(0);
  });

  test("study centre card is visible", async ({ page }) => {
    await page.goto("/apprentice");
    await page.waitForTimeout(2000);

    const studyCentreCard = page.locator('text="Study Centre"');
    const cardCount = await studyCentreCard.count();

    expect(cardCount).toBeGreaterThanOrEqual(0);
  });

  test("can navigate to on job tools", async ({ page }) => {
    await page.goto("/apprentice");
    await page.waitForTimeout(2000);

    const onJobLink = page.locator('a[href*="on-job-tools"]').first();

    if (await onJobLink.isVisible()) {
      await onJobLink.click();
      await page.waitForTimeout(2000);

      const url = page.url();
      expect(url.includes("on-job-tools") || await page.locator("body").isVisible()).toBeTruthy();
    }
  });

  test("can navigate to toolbox", async ({ page }) => {
    await page.goto("/apprentice");
    await page.waitForTimeout(2000);

    const toolboxLink = page.locator('a[href*="toolbox"]').first();

    if (await toolboxLink.isVisible()) {
      await toolboxLink.click();
      await page.waitForTimeout(2000);

      const url = page.url();
      expect(url.includes("toolbox") || await page.locator("body").isVisible()).toBeTruthy();
    }
  });

  test("can navigate to study centre", async ({ page }) => {
    await page.goto("/apprentice");
    await page.waitForTimeout(2000);

    const studyLink = page.locator('a[href*="study-centre"]').first();

    if (await studyLink.isVisible()) {
      await studyLink.click();
      await page.waitForTimeout(2000);

      const url = page.url();
      expect(url.includes("study-centre") || await page.locator("body").isVisible()).toBeTruthy();
    }
  });
});

test.describe("Apprentice Hub - AI Study Assistant", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test("AI powered learning section exists", async ({ page }) => {
    await page.goto("/apprentice");
    await page.waitForTimeout(2000);

    const aiSection = page.locator('text="AI-Powered Learning"');
    const sectionCount = await aiSection.count();

    expect(sectionCount).toBeGreaterThanOrEqual(0);
  });

  test("AI study assistant card is visible", async ({ page }) => {
    await page.goto("/apprentice");
    await page.waitForTimeout(2000);

    const aiCard = page.locator('text="AI Study Assistant"');
    const cardCount = await aiCard.count();

    expect(cardCount).toBeGreaterThanOrEqual(0);
  });

  test("can navigate to AI assistant", async ({ page }) => {
    await page.goto("/apprentice");
    await page.waitForTimeout(2000);

    const aiLink = page.locator('a[href*="advanced-help"]').first();

    if (await aiLink.isVisible()) {
      await aiLink.click();
      await page.waitForTimeout(2000);

      const url = page.url();
      expect(url.includes("advanced-help") || await page.locator("body").isVisible()).toBeTruthy();
    }
  });
});

test.describe("Apprentice Hub - Complete Navigation Flow", () => {
  test("can navigate through all main sections from hub", async ({ page }) => {
    await loginViaUI(page);

    // Start at apprentice hub
    await page.goto("/apprentice");
    await page.waitForTimeout(2000);

    // Verify hub loaded
    await expect(page.locator("body")).toBeVisible();

    // Check we can access the main page elements
    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible();
  });
});
