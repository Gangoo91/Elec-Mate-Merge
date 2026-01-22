import { test, expect } from "@playwright/test";
import { loginViaUI } from "./fixtures/auth";

test.describe("Apprentice Hub", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test.describe("Main Hub", () => {
    test("apprentice hub page loads", async ({ page }) => {
      await page.goto("/apprentice");

      await expect(page.locator("body")).toBeVisible();
      // Should have apprentice-related content
      await expect(
        page.getByText(/apprentice|learning|training|course/i).first()
      ).toBeVisible({ timeout: 10000 });
    });

    test("unified apprentice hub loads", async ({ page }) => {
      await page.goto("/apprentice/hub");

      await expect(page.locator("body")).toBeVisible();
    });
  });

  test.describe("Toolbox Section", () => {
    test("apprentice toolbox page loads", async ({ page }) => {
      await page.goto("/apprentice/toolbox");

      await expect(page.locator("body")).toBeVisible();
      await expect(
        page.getByText(/toolbox|tool|guide|resource/i).first()
      ).toBeVisible({ timeout: 10000 });
    });

    test("apprenticeship expectations page loads", async ({ page }) => {
      await page.goto("/apprentice/toolbox/apprenticeship-expectations");

      await expect(page.locator("body")).toBeVisible();
      await expect(
        page.getByText(/expectation|year|apprentice/i).first()
      ).toBeVisible({ timeout: 10000 });
    });

    test("year 1 expectations page loads", async ({ page }) => {
      await page.goto("/apprentice/toolbox/apprenticeship-expectations/year-1");

      await expect(page.locator("body")).toBeVisible();
      await expect(page.getByText(/year 1|first year/i).first()).toBeVisible({
        timeout: 10000,
      });
    });

    test("year 2 expectations page loads", async ({ page }) => {
      await page.goto("/apprentice/toolbox/apprenticeship-expectations/year-2");

      await expect(page.locator("body")).toBeVisible();
    });

    test("year 3 expectations page loads", async ({ page }) => {
      await page.goto("/apprentice/toolbox/apprenticeship-expectations/year-3");

      await expect(page.locator("body")).toBeVisible();
    });

    test("year 4 expectations page loads", async ({ page }) => {
      await page.goto("/apprentice/toolbox/apprenticeship-expectations/year-4");

      await expect(page.locator("body")).toBeVisible();
    });

    test("off-job training guide page loads", async ({ page }) => {
      await page.goto("/apprentice/toolbox/off-job-training-guide");

      await expect(page.locator("body")).toBeVisible();
      await expect(page.getByText(/off.?job|training/i).first()).toBeVisible({
        timeout: 10000,
      });
    });

    test("site jargon page loads", async ({ page }) => {
      await page.goto("/apprentice/toolbox/site-jargon");

      await expect(page.locator("body")).toBeVisible();
      await expect(page.getByText(/jargon|term|glossary/i).first()).toBeVisible({
        timeout: 10000,
      });
    });

    test("portfolio building page loads", async ({ page }) => {
      await page.goto("/apprentice/toolbox/portfolio-building");

      await expect(page.locator("body")).toBeVisible();
      await expect(
        page.getByText(/portfolio|evidence|build/i).first()
      ).toBeVisible({ timeout: 10000 });
    });

    test("communication skills page loads", async ({ page }) => {
      await page.goto("/apprentice/toolbox/communication-skills");

      await expect(page.locator("body")).toBeVisible();
      await expect(
        page.getByText(/communication|skill|speak/i).first()
      ).toBeVisible({ timeout: 10000 });
    });

    test("study tips page loads", async ({ page }) => {
      await page.goto("/apprentice/toolbox/study-tips");

      await expect(page.locator("body")).toBeVisible();
      await expect(page.getByText(/study|tip|learn/i).first()).toBeVisible({
        timeout: 10000,
      });
    });

    test("learning from mistakes page loads", async ({ page }) => {
      await page.goto("/apprentice/toolbox/learning-from-mistakes");

      await expect(page.locator("body")).toBeVisible();
      await expect(page.getByText(/mistake|learn|error/i).first()).toBeVisible({
        timeout: 10000,
      });
    });

    test("time management page loads", async ({ page }) => {
      await page.goto("/apprentice/toolbox/time-management");

      await expect(page.locator("body")).toBeVisible();
      await expect(page.getByText(/time|manage|schedule/i).first()).toBeVisible({
        timeout: 10000,
      });
    });

    test("apprenticeship funding page loads", async ({ page }) => {
      await page.goto("/apprentice/toolbox/apprenticeship-funding");

      await expect(page.locator("body")).toBeVisible();
      await expect(page.getByText(/fund|wage|money|pay/i).first()).toBeVisible({
        timeout: 10000,
      });
    });

    test("end point assessment page loads", async ({ page }) => {
      await page.goto("/apprentice/toolbox/end-point-assessment");

      await expect(page.locator("body")).toBeVisible();
      await expect(page.getByText(/EPA|assessment|end/i).first()).toBeVisible({
        timeout: 10000,
      });
    });

    test("professional tool guide page loads", async ({ page }) => {
      await page.goto("/apprentice/toolbox/professional-tool-guide");

      await expect(page.locator("body")).toBeVisible();
      await expect(page.getByText(/tool|equipment|kit/i).first()).toBeVisible({
        timeout: 10000,
      });
    });
  });

  test.describe("On-Job Tools", () => {
    test("on-job tools page loads", async ({ page }) => {
      await page.goto("/apprentice/on-job-tools");

      await expect(page.locator("body")).toBeVisible();
      await expect(page.getByText(/on.?job|tool|work/i).first()).toBeVisible({
        timeout: 10000,
      });
    });

    test("tools guide page loads", async ({ page }) => {
      await page.goto("/apprentice/on-job-tools/tools-guide");

      await expect(page.locator("body")).toBeVisible();
    });

    test("electrical installation guides page loads", async ({ page }) => {
      await page.goto("/apprentice/on-job-tools/electrical-installation-guides");

      await expect(page.locator("body")).toBeVisible();
      await expect(
        page.getByText(/install|electrical|guide/i).first()
      ).toBeVisible({ timeout: 10000 });
    });

    test("commercial installations guide loads", async ({ page }) => {
      await page.goto(
        "/apprentice/on-job-tools/electrical-installation-guides/commercial"
      );

      await expect(page.locator("body")).toBeVisible();
      await expect(page.getByText(/commercial/i).first()).toBeVisible({
        timeout: 10000,
      });
    });

    test("industrial installations guide loads", async ({ page }) => {
      await page.goto(
        "/apprentice/on-job-tools/electrical-installation-guides/industrial"
      );

      await expect(page.locator("body")).toBeVisible();
      await expect(page.getByText(/industrial/i).first()).toBeVisible({
        timeout: 10000,
      });
    });

    test("outdoor installations guide loads", async ({ page }) => {
      await page.goto(
        "/apprentice/on-job-tools/electrical-installation-guides/outdoor"
      );

      await expect(page.locator("body")).toBeVisible();
      await expect(page.getByText(/outdoor/i).first()).toBeVisible({
        timeout: 10000,
      });
    });

    test("domestic installations guide loads", async ({ page }) => {
      await page.goto(
        "/apprentice/on-job-tools/electrical-installation-guides/domestic"
      );

      await expect(page.locator("body")).toBeVisible();
      await expect(page.getByText(/domestic/i).first()).toBeVisible({
        timeout: 10000,
      });
    });

    test("specialist installations guide loads", async ({ page }) => {
      await page.goto(
        "/apprentice/on-job-tools/electrical-installation-guides/specialist"
      );

      await expect(page.locator("body")).toBeVisible();
    });

    test("calculations page loads", async ({ page }) => {
      await page.goto("/apprentice/on-job-tools/calculations");

      await expect(page.locator("body")).toBeVisible();
      await expect(
        page.getByText(/calculat|formula|ohm/i).first()
      ).toBeVisible({ timeout: 10000 });
    });

    test("assessment page loads", async ({ page }) => {
      await page.goto("/apprentice/on-job-tools/assessment");

      await expect(page.locator("body")).toBeVisible();
    });

    test("safety cases page loads", async ({ page }) => {
      await page.goto("/apprentice/on-job-tools/safety-cases");

      await expect(page.locator("body")).toBeVisible();
      await expect(page.getByText(/safety|case|incident/i).first()).toBeVisible({
        timeout: 10000,
      });
    });

    test("workplace culture page loads", async ({ page }) => {
      await page.goto("/apprentice/on-job-tools/workplace-culture");

      await expect(page.locator("body")).toBeVisible();
      await expect(
        page.getByText(/workplace|culture|team/i).first()
      ).toBeVisible({ timeout: 10000 });
    });

    test("testing procedures page loads", async ({ page }) => {
      await page.goto("/apprentice/on-job-tools/testing-procedures");

      await expect(page.locator("body")).toBeVisible();
      await expect(page.getByText(/test|procedure|check/i).first()).toBeVisible({
        timeout: 10000,
      });
    });

    test("BS7671 runthrough page loads", async ({ page }) => {
      await page.goto("/apprentice/on-job-tools/bs7671-runthrough");

      await expect(page.locator("body")).toBeVisible();
      await expect(page.getByText(/BS7671|regulation|wiring/i).first()).toBeVisible({
        timeout: 10000,
      });
    });

    test("supervisor knowledge page loads", async ({ page }) => {
      await page.goto("/apprentice/on-job-tools/supervisor-knowledge");

      await expect(page.locator("body")).toBeVisible();
      await expect(
        page.getByText(/supervisor|knowledge|senior/i).first()
      ).toBeVisible({ timeout: 10000 });
    });

    test("flashcards page loads", async ({ page }) => {
      await page.goto("/apprentice/on-job-tools/flashcards");

      await expect(page.locator("body")).toBeVisible();
      await expect(
        page.getByText(/flashcard|card|quiz|learn/i).first()
      ).toBeVisible({ timeout: 10000 });
    });
  });

  test.describe("Calculators", () => {
    test("calculators page loads", async ({ page }) => {
      await page.goto("/apprentice/calculators");

      await expect(page.locator("body")).toBeVisible();
      await expect(
        page.getByText(/calculat|formula|tool/i).first()
      ).toBeVisible({ timeout: 10000 });
    });
  });

  test.describe("OJT Hub", () => {
    test("OJT page loads", async ({ page }) => {
      await page.goto("/apprentice/ojt");

      await expect(page.locator("body")).toBeVisible();
    });

    test("OJT hub page loads", async ({ page }) => {
      await page.goto("/apprentice/ojt-hub");

      await expect(page.locator("body")).toBeVisible();
    });
  });

  test.describe("Professional Development", () => {
    test("professional development page loads", async ({ page }) => {
      await page.goto("/apprentice/professional-development");

      await expect(page.locator("body")).toBeVisible();
      await expect(
        page.getByText(/professional|develop|career/i).first()
      ).toBeVisible({ timeout: 10000 });
    });
  });

  test.describe("Rights and Pay", () => {
    test("rights and pay page loads", async ({ page }) => {
      await page.goto("/apprentice/rights-and-pay");

      await expect(page.locator("body")).toBeVisible();
      await expect(page.getByText(/right|pay|wage|law/i).first()).toBeVisible({
        timeout: 10000,
      });
    });
  });

  test.describe("Portfolio Hub", () => {
    test("portfolio hub page loads", async ({ page }) => {
      await page.goto("/apprentice/portfolio-hub");

      await expect(page.locator("body")).toBeVisible();
      // Look for visible Portfolio Hub header or main content
      await expect(
        page.locator("h1, h2, h3").filter({ hasText: /Portfolio/i }).first()
      ).toBeVisible({ timeout: 10000 });
    });
  });

  test.describe("BS7671 Inspection & Testing", () => {
    test("BS7671 inspection testing page loads", async ({ page }) => {
      await page.goto("/apprentice/bs7671-inspection-testing");

      await expect(page.locator("body")).toBeVisible();
      await expect(
        page.getByText(/BS7671|inspection|test|regulation/i).first()
      ).toBeVisible({ timeout: 10000 });
    });

    test("inspection testing hub page loads", async ({ page }) => {
      await page.goto("/apprentice/inspection-testing-hub");

      await expect(page.locator("body")).toBeVisible();
    });

    test("inspection testing page loads", async ({ page }) => {
      await page.goto("/apprentice/inspection-testing");

      await expect(page.locator("body")).toBeVisible();
    });
  });

  test.describe("Advanced Help", () => {
    test("advanced help page loads", async ({ page }) => {
      await page.goto("/apprentice/advanced-help");

      await expect(page.locator("body")).toBeVisible();
      await expect(page.getByText(/help|support|question/i).first()).toBeVisible(
        { timeout: 10000 }
      );
    });
  });
});
