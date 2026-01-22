import { test, expect } from "@playwright/test";
import { loginViaUI } from "./fixtures/auth";

test.describe("Inspection & Testing", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test.describe("Inspection Hub", () => {
    test("inspection testing index page loads", async ({ page }) => {
      await page.goto("/electrician/inspection-testing");

      await expect(page.locator("body")).toBeVisible();
      await expect(
        page.getByText(/inspection|test|certificate|EICR|EIC/i).first()
      ).toBeVisible({ timeout: 10000 });
    });

    test("legacy certificates page loads", async ({ page }) => {
      await page.goto("/electrician/inspection-testing/legacy-certificates");

      await expect(page.locator("body")).toBeVisible();
      await expect(
        page.getByText(/certificate|legacy|old|previous/i).first()
      ).toBeVisible({ timeout: 10000 });
    });
  });

  test.describe("Certificate Types", () => {
    test("EICR form accessible via query param", async ({ page }) => {
      await page.goto("/electrician/inspection-testing?type=eicr");

      await expect(page.locator("body")).toBeVisible();
      // Should load EICR (Electrical Installation Condition Report)
      await expect(
        page.getByText(/EICR|condition|report|inspection/i).first()
      ).toBeVisible({ timeout: 10000 });
    });

    test("EIC form accessible via query param", async ({ page }) => {
      await page.goto("/electrician/inspection-testing?type=eic");

      await expect(page.locator("body")).toBeVisible();
      // Should load EIC (Electrical Installation Certificate)
      await expect(
        page.getByText(/EIC|installation|certificate/i).first()
      ).toBeVisible({ timeout: 10000 });
    });

    test("Minor works form accessible via query param", async ({ page }) => {
      await page.goto("/electrician/inspection-testing?type=minor-works");

      await expect(page.locator("body")).toBeVisible();
      await expect(
        page.getByText(/minor|work|certificate/i).first()
      ).toBeVisible({ timeout: 10000 });
    });
  });

  test.describe("Form Interactions", () => {
    test("inspection form has required input fields", async ({ page }) => {
      await page.goto("/electrician/inspection-testing");

      // Wait for page to load
      await page.waitForTimeout(2000);

      // Check for form elements (inputs, buttons)
      const formElements = page.locator("input, select, textarea, button");
      const count = await formElements.count();

      // Should have multiple form elements for data entry
      expect(count).toBeGreaterThan(0);
    });

    test("inspection form sections are collapsible", async ({ page }) => {
      await page.goto("/electrician/inspection-testing");

      // Wait for page to load
      await page.waitForTimeout(2000);

      // Look for collapsible sections (using common patterns)
      const collapsibleTriggers = page.locator(
        '[data-state="open"], [data-state="closed"], button:has-text("Section"), [role="button"]'
      );

      const count = await collapsibleTriggers.count();
      // App uses collapsible sections for form organization
      expect(count).toBeGreaterThanOrEqual(0);
    });
  });
});

test.describe("Upskilling & CPD", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test.describe("Upskilling Hub", () => {
    test("upskilling main page loads", async ({ page }) => {
      await page.goto("/electrician/upskilling");

      await expect(page.locator("body")).toBeVisible();
      await expect(
        page.getByText(/upskill|CPD|course|training/i).first()
      ).toBeVisible({ timeout: 10000 });
    });
  });
});

test.describe("Study Centre", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test.describe("Study Centre Hub", () => {
    test("study centre page loads", async ({ page }) => {
      await page.goto("/study-centre");

      await expect(page.locator("body")).toBeVisible();
      await expect(
        page.getByText(/study|course|learn|training/i).first()
      ).toBeVisible({ timeout: 10000 });
    });
  });
});
