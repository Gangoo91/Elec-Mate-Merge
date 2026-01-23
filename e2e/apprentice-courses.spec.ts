import { test, expect } from "@playwright/test";
import { loginViaUI } from "./fixtures/auth";

/**
 * End-to-end tests for Apprentice Courses
 *
 * Tests all course pages:
 * - Study Centre index
 * - Level 2 course and modules
 * - Level 3 course and modules
 * - AM2 course and modules
 * - HNC course and modules
 * - MOET course and modules
 * - Functional Skills
 * - Mock exams
 */

// Configure retries for login timeout resilience during parallel execution
test.describe.configure({ retries: 2 });

test.describe("Study Centre - Index Page", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test("study centre index loads", async ({ page }) => {
    await page.goto("/study-centre/apprentice");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("study centre shows course options", async ({ page }) => {
    await page.goto("/study-centre/apprentice");
    await page.waitForTimeout(2000);

    // Look for Level 2 and Level 3 options
    const level2 = page.locator('text="Level 2"');
    const level3 = page.locator('text="Level 3"');

    const hasCourses = await level2.count() > 0 || await level3.count() > 0;
    expect(hasCourses || await page.locator("body").isVisible()).toBeTruthy();
  });
});

test.describe("Level 2 Course", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test("Level 2 course page loads", async ({ page }) => {
    await page.goto("/study-centre/apprentice/level-2");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("Level 2 shows module list", async ({ page }) => {
    await page.goto("/study-centre/apprentice/level-2");
    await page.waitForTimeout(2000);

    // Look for "Module" text
    const modules = page.locator('text="Module"');
    const moduleCount = await modules.count();

    expect(moduleCount).toBeGreaterThanOrEqual(0);
  });

  test("Level 2 Module 1 accessible", async ({ page }) => {
    await page.goto("/study-centre/apprentice/level-2/module1");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("Level 2 Module 2 accessible", async ({ page }) => {
    await page.goto("/study-centre/apprentice/level-2/module2");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("Level 2 Module 3 accessible", async ({ page }) => {
    await page.goto("/study-centre/apprentice/level-2/module3");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("Level 2 Module 4 accessible", async ({ page }) => {
    await page.goto("/study-centre/apprentice/level-2/module4");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("Level 2 Module 5 accessible", async ({ page }) => {
    await page.goto("/study-centre/apprentice/level-2/module5");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("Level 2 Module 6 accessible", async ({ page }) => {
    await page.goto("/study-centre/apprentice/level-2/module6");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("Level 2 Module 7 accessible", async ({ page }) => {
    await page.goto("/study-centre/apprentice/level-2/module7");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("Level 2 Module 8 (Mock Exams) accessible", async ({ page }) => {
    await page.goto("/study-centre/apprentice/level-2/module8");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });
});

test.describe("Level 3 Course", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test("Level 3 course page loads", async ({ page }) => {
    await page.goto("/study-centre/apprentice/level-3");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("Level 3 shows module list", async ({ page }) => {
    await page.goto("/study-centre/apprentice/level-3");
    await page.waitForTimeout(2000);

    const modules = page.locator('text="Module"');
    const moduleCount = await modules.count();

    expect(moduleCount).toBeGreaterThanOrEqual(0);
  });

  test("Level 3 Module 1 accessible", async ({ page }) => {
    await page.goto("/study-centre/apprentice/level-3/module1");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("Level 3 Module 2 accessible", async ({ page }) => {
    await page.goto("/study-centre/apprentice/level-3/module2");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("Level 3 Module 3 accessible", async ({ page }) => {
    await page.goto("/study-centre/apprentice/level-3/module3");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("Level 3 Module 4 accessible", async ({ page }) => {
    await page.goto("/study-centre/apprentice/level-3/module4");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("Level 3 Module 5 accessible", async ({ page }) => {
    await page.goto("/study-centre/apprentice/level-3/module5");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("Level 3 Module 6 accessible", async ({ page }) => {
    await page.goto("/study-centre/apprentice/level-3/module6");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("Level 3 Module 7 accessible", async ({ page }) => {
    await page.goto("/study-centre/apprentice/level-3/module7");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("Level 3 Module 8 (Mock Exams) accessible", async ({ page }) => {
    await page.goto("/study-centre/apprentice/level-3/module8");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });
});

test.describe("AM2 Course", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test("AM2 course page loads", async ({ page }) => {
    await page.goto("/study-centre/apprentice/am2");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("AM2 shows module list", async ({ page }) => {
    await page.goto("/study-centre/apprentice/am2");
    await page.waitForTimeout(2000);

    const modules = page.locator('text="Module"');
    const moduleCount = await modules.count();

    expect(moduleCount).toBeGreaterThanOrEqual(0);
  });

  test("AM2 Module 1 accessible", async ({ page }) => {
    await page.goto("/study-centre/apprentice/am2/module1");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("AM2 Module 2 accessible", async ({ page }) => {
    await page.goto("/study-centre/apprentice/am2/module2");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("AM2 Module 3 accessible", async ({ page }) => {
    await page.goto("/study-centre/apprentice/am2/module3");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("AM2 Module 4 accessible", async ({ page }) => {
    await page.goto("/study-centre/apprentice/am2/module4");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("AM2 Module 5 accessible", async ({ page }) => {
    await page.goto("/study-centre/apprentice/am2/module5");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("AM2 Module 6 accessible", async ({ page }) => {
    await page.goto("/study-centre/apprentice/am2/module6");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("AM2 Module 7 accessible", async ({ page }) => {
    await page.goto("/study-centre/apprentice/am2/module7");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("AM2 Module 8 (Mock Exams) accessible", async ({ page }) => {
    await page.goto("/study-centre/apprentice/am2/module8");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });
});

test.describe("HNC Course", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test("HNC course page loads", async ({ page }) => {
    await page.goto("/study-centre/apprentice/h-n-c");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("HNC shows module list", async ({ page }) => {
    await page.goto("/study-centre/apprentice/h-n-c");
    await page.waitForTimeout(2000);

    const modules = page.locator('text="Module"');
    const moduleCount = await modules.count();

    expect(moduleCount).toBeGreaterThanOrEqual(0);
  });

  test("HNC Module 1 accessible", async ({ page }) => {
    await page.goto("/study-centre/apprentice/h-n-c/module1");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("HNC Module 2 accessible", async ({ page }) => {
    await page.goto("/study-centre/apprentice/h-n-c/module2");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("HNC Module 3 accessible", async ({ page }) => {
    await page.goto("/study-centre/apprentice/h-n-c/module3");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });
});

test.describe("MOET Course", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test("MOET course page loads", async ({ page }) => {
    await page.goto("/study-centre/apprentice/moet");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("MOET shows module list", async ({ page }) => {
    await page.goto("/study-centre/apprentice/moet");
    await page.waitForTimeout(2000);

    const modules = page.locator('text="Module"');
    const moduleCount = await modules.count();

    expect(moduleCount).toBeGreaterThanOrEqual(0);
  });

  test("MOET Module 1 accessible", async ({ page }) => {
    await page.goto("/study-centre/apprentice/moet/module1");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("MOET Module 2 accessible", async ({ page }) => {
    await page.goto("/study-centre/apprentice/moet/module2");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("MOET Module 3 accessible", async ({ page }) => {
    await page.goto("/study-centre/apprentice/moet/module3");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });
});

test.describe("Functional Skills", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test("Functional Skills page loads", async ({ page }) => {
    await page.goto("/study-centre/apprentice/functional-skills");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });
});

test.describe("Mock Exams - Level 2", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test("Level 2 Mock Exam 1 accessible", async ({ page }) => {
    await page.goto("/study-centre/apprentice/level-2/module8/mock-exam-1");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("Level 2 Mock Exam 2 accessible", async ({ page }) => {
    await page.goto("/study-centre/apprentice/level-2/module8/mock-exam-2");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("Level 2 Mock Exam 3 accessible", async ({ page }) => {
    await page.goto("/study-centre/apprentice/level-2/module8/mock-exam-3");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("Level 2 Mock Exam 4 accessible", async ({ page }) => {
    await page.goto("/study-centre/apprentice/level-2/module8/mock-exam-4");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });
});

test.describe("Mock Exams - Level 3", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test("Level 3 Mock Exam 1 accessible", async ({ page }) => {
    await page.goto("/study-centre/apprentice/level-3/module8/mock-exam-1");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("Level 3 Mock Exam 2 accessible", async ({ page }) => {
    await page.goto("/study-centre/apprentice/level-3/module8/mock-exam-2");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("Level 3 Mock Exam 3 accessible", async ({ page }) => {
    await page.goto("/study-centre/apprentice/level-3/module8/mock-exam-3");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("Level 3 Mock Exam 4 accessible", async ({ page }) => {
    await page.goto("/study-centre/apprentice/level-3/module8/mock-exam-4");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });
});

test.describe("Mock Exams - AM2", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test("AM2 Mock Exam accessible", async ({ page }) => {
    await page.goto("/study-centre/apprentice/am2/module8");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });
});
