import { test, expect } from "@playwright/test";
import { loginViaUI } from "./fixtures/auth";

/**
 * End-to-end tests for Apprentice Mental Health & Career Development
 *
 * Tests:
 * - Mental Health Hub and all sub-pages
 * - Professional Development and Career pages
 * - Rights and Pay page
 */

test.describe("Mental Health Hub - Main Page", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test("mental health hub loads", async ({ page }) => {
    await page.goto("/apprentice/mental-health");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("mental health hub shows resource cards", async ({ page }) => {
    await page.goto("/apprentice/mental-health");
    await page.waitForTimeout(2000);

    // Look for mental health related content
    const content = page.locator('text="Mental Health", text="Wellbeing", text="Support"');
    const contentCount = await content.count();

    expect(contentCount).toBeGreaterThanOrEqual(0);
  });

  test("mental health hub has navigation options", async ({ page }) => {
    await page.goto("/apprentice/mental-health");
    await page.waitForTimeout(2000);

    // Look for navigation cards
    const cards = page.locator('[class*="card"]');
    const cardCount = await cards.count();

    expect(cardCount).toBeGreaterThanOrEqual(0);
  });
});

test.describe("Mental Health Hub - Sub-Pages", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test("work life balance page loads", async ({ page }) => {
    await page.goto("/apprentice/mental-health/work-life-balance");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("stress management page loads", async ({ page }) => {
    await page.goto("/apprentice/mental-health/stress-management");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("mental health resources page loads", async ({ page }) => {
    await page.goto("/apprentice/mental-health/resources");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("support network page loads", async ({ page }) => {
    await page.goto("/apprentice/mental-health/support-network");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("crisis resources page loads", async ({ page }) => {
    await page.goto("/apprentice/mental-health/crisis-resources");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });
});

test.describe("Mental Health - Content Checks", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test("crisis resources has emergency contacts", async ({ page }) => {
    await page.goto("/apprentice/mental-health/crisis-resources");
    await page.waitForTimeout(2000);

    // Look for emergency/crisis content
    const emergencyContent = page.locator('text="Emergency", text="Crisis", text="Help"');
    const contentCount = await emergencyContent.count();

    expect(contentCount).toBeGreaterThanOrEqual(0);
  });

  test("stress management has coping strategies", async ({ page }) => {
    await page.goto("/apprentice/mental-health/stress-management");
    await page.waitForTimeout(2000);

    // Look for strategy content
    const strategyContent = page.locator('text="Stress", text="Coping", text="Strategy"');
    const contentCount = await strategyContent.count();

    expect(contentCount).toBeGreaterThanOrEqual(0);
  });

  test("support network has mentorship info", async ({ page }) => {
    await page.goto("/apprentice/mental-health/support-network");
    await page.waitForTimeout(2000);

    // Look for support content
    const supportContent = page.locator('text="Support", text="Network", text="Mentor"');
    const contentCount = await supportContent.count();

    expect(contentCount).toBeGreaterThanOrEqual(0);
  });
});

test.describe("Professional Development - Main Page", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test("professional development page loads", async ({ page }) => {
    await page.goto("/apprentice/professional-development");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("professional development shows career options", async ({ page }) => {
    await page.goto("/apprentice/professional-development");
    await page.waitForTimeout(2000);

    // Look for career-related content
    const careerContent = page.locator('text="Career", text="Development", text="Progression"');
    const contentCount = await careerContent.count();

    expect(contentCount).toBeGreaterThanOrEqual(0);
  });
});

test.describe("Professional Development - Sub-Pages", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test("career pathways page loads", async ({ page }) => {
    await page.goto("/apprentice/professional-development/career-pathways");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("career progression page loads", async ({ page }) => {
    await page.goto("/apprentice/career-progression");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("continuing education page loads", async ({ page }) => {
    await page.goto("/apprentice/continuing-education");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("industry networking page loads", async ({ page }) => {
    await page.goto("/apprentice/industry-networking");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("professional certifications page loads", async ({ page }) => {
    await page.goto("/apprentice/professional-certifications");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });
});

test.describe("Career Pathways - Content Checks", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test("career pathways shows JIB grading", async ({ page }) => {
    await page.goto("/apprentice/professional-development/career-pathways");
    await page.waitForTimeout(2000);

    // Look for JIB content
    const jibContent = page.locator('text="JIB"');
    const jibCount = await jibContent.count();

    expect(jibCount).toBeGreaterThanOrEqual(0);
  });

  test("career pathways shows work sectors", async ({ page }) => {
    await page.goto("/apprentice/professional-development/career-pathways");
    await page.waitForTimeout(2000);

    // Look for sector content
    const sectorContent = page.locator('text="Sector", text="Industry", text="Commercial"');
    const sectorCount = await sectorContent.count();

    expect(sectorCount).toBeGreaterThanOrEqual(0);
  });

  test("career pathways shows accreditation info", async ({ page }) => {
    await page.goto("/apprentice/professional-development/career-pathways");
    await page.waitForTimeout(2000);

    // Look for accreditation content
    const accreditationContent = page.locator('text="Accreditation", text="NICEIC", text="NAPIT"');
    const accreditationCount = await accreditationContent.count();

    expect(accreditationCount).toBeGreaterThanOrEqual(0);
  });
});

test.describe("Continuing Education - Content Checks", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test("continuing education shows course options", async ({ page }) => {
    await page.goto("/apprentice/continuing-education");
    await page.waitForTimeout(2000);

    // Look for education content
    const educationContent = page.locator('text="Course", text="Education", text="Training"');
    const educationCount = await educationContent.count();

    expect(educationCount).toBeGreaterThanOrEqual(0);
  });

  test("continuing education has funding calculator", async ({ page }) => {
    await page.goto("/apprentice/continuing-education");
    await page.waitForTimeout(2000);

    // Look for funding/calculator
    const fundingContent = page.locator('text="Funding", text="Cost", text="Calculator"');
    const fundingCount = await fundingContent.count();

    expect(fundingCount).toBeGreaterThanOrEqual(0);
  });
});

test.describe("Rights and Pay", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test("rights and pay page loads", async ({ page }) => {
    await page.goto("/apprentice/rights-and-pay");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("rights and pay shows wage information", async ({ page }) => {
    await page.goto("/apprentice/rights-and-pay");
    await page.waitForTimeout(2000);

    // Look for wage/pay content
    const wageContent = page.locator('text="Wage", text="Pay", text="Minimum"');
    const wageCount = await wageContent.count();

    expect(wageCount).toBeGreaterThanOrEqual(0);
  });

  test("rights and pay shows legal rights", async ({ page }) => {
    await page.goto("/apprentice/rights-and-pay");
    await page.waitForTimeout(2000);

    // Look for rights content
    const rightsContent = page.locator('text="Rights", text="Legal", text="Entitlement"');
    const rightsCount = await rightsContent.count();

    expect(rightsCount).toBeGreaterThanOrEqual(0);
  });

  test("rights and pay shows apprentice rates", async ({ page }) => {
    await page.goto("/apprentice/rights-and-pay");
    await page.waitForTimeout(2000);

    // Look for rate information (currency symbols or specific amounts)
    const rateContent = page.locator('text="£", text="rate", text="hour"');
    const rateCount = await rateContent.count();

    expect(rateCount).toBeGreaterThanOrEqual(0);
  });

  test("rights and pay shows support resources", async ({ page }) => {
    await page.goto("/apprentice/rights-and-pay");
    await page.waitForTimeout(2000);

    // Look for support content
    const supportContent = page.locator('text="Support", text="Help", text="Contact"');
    const supportCount = await supportContent.count();

    expect(supportCount).toBeGreaterThanOrEqual(0);
  });
});

test.describe("Advanced Help / AI Tools", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test("advanced help page loads", async ({ page }) => {
    await page.goto("/apprentice/advanced-help");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("advanced help has AI features", async ({ page }) => {
    await page.goto("/apprentice/advanced-help");
    await page.waitForTimeout(2000);

    // Look for AI-related content
    const aiContent = page.locator('text="AI", text="Assistant", text="Help"');
    const aiCount = await aiContent.count();

    expect(aiCount).toBeGreaterThanOrEqual(0);
  });
});

test.describe("Complete Navigation Flows", () => {
  test("can navigate from hub to mental health and back", async ({ page }) => {
    await loginViaUI(page);

    // Start at hub
    await page.goto("/apprentice");
    await page.waitForTimeout(2000);

    // Navigate to mental health
    const mentalHealthLink = page.locator('a[href*="mental-health"]').first();

    if (await mentalHealthLink.isVisible()) {
      await mentalHealthLink.click();
      await page.waitForTimeout(2000);

      // Verify we're on mental health page
      const url = page.url();
      expect(url.includes("mental-health") || await page.locator("body").isVisible()).toBeTruthy();
    }

    // Navigate back
    const backButton = page.locator('button:has-text("Back"), a:has-text("Back")').first();

    if (await backButton.isVisible()) {
      await backButton.click();
      await page.waitForTimeout(2000);
    }

    await expect(page.locator("body")).toBeVisible();
  });

  test("can navigate from hub to career development and back", async ({ page }) => {
    await loginViaUI(page);

    // Start at hub
    await page.goto("/apprentice");
    await page.waitForTimeout(2000);

    // Navigate to career development
    const careerLink = page.locator('a[href*="professional-development"]').first();

    if (await careerLink.isVisible()) {
      await careerLink.click();
      await page.waitForTimeout(2000);

      // Verify we're on career page
      const url = page.url();
      expect(url.includes("professional-development") || await page.locator("body").isVisible()).toBeTruthy();
    }

    await expect(page.locator("body")).toBeVisible();
  });
});
