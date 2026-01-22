import { test, expect } from "@playwright/test";

// These tests run on all configured devices (including mobile-chrome, mobile-safari)
// as defined in playwright.config.ts

test.describe("Responsive Experience", () => {
  test("navigation is visible", async ({ page }) => {
    await page.goto("/");

    // Check for navigation
    const nav = page.locator('nav, [role="navigation"]');
    await expect(nav.first()).toBeVisible();
  });

  test("touch targets are appropriately sized", async ({ page }) => {
    await page.goto("/login");

    // Check buttons have minimum touch targets
    const buttons = page.locator("button");
    const count = await buttons.count();

    for (let i = 0; i < Math.min(count, 5); i++) {
      const button = buttons.nth(i);
      if (await button.isVisible()) {
        const box = await button.boundingBox();
        if (box) {
          // Minimum touch target ~40px
          expect(box.height).toBeGreaterThanOrEqual(36);
        }
      }
    }
  });

  test("no horizontal overflow", async ({ page }) => {
    await page.goto("/");

    // Verify page renders without horizontal scroll
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);

    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 5);
  });

  test("forms are usable", async ({ page }) => {
    await page.goto("/login");

    // Check inputs exist and are reasonably sized
    const emailInput = page.locator('input[type="email"], input[name="email"]');
    if (await emailInput.isVisible()) {
      const box = await emailInput.boundingBox();
      if (box) {
        expect(box.width).toBeGreaterThan(150);
      }
    }
  });
});
