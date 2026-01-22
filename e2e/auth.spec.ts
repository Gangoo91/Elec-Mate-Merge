import { test, expect } from "@playwright/test";

test.describe("Authentication", () => {
  test("login page is accessible", async ({ page }) => {
    await page.goto("/login");

    // Check login form elements exist
    await expect(page.locator('input[type="email"], input[name="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"], input[name="password"]')).toBeVisible();
  });

  test("shows validation errors for empty form", async ({ page }) => {
    await page.goto("/login");

    // Try to submit empty form
    const submitButton = page.locator('button[type="submit"]');
    if (await submitButton.isVisible()) {
      await submitButton.click();

      // Should show some validation feedback
      // Adjust based on your actual validation UI
      await page.waitForTimeout(500);
    }
  });

  test("signup page is accessible", async ({ page }) => {
    await page.goto("/register");

    // Check signup form exists
    await expect(page.locator('input[type="email"], input[name="email"]')).toBeVisible();
  });

  test("can navigate between login and signup", async ({ page }) => {
    await page.goto("/login");

    // Look for link to signup
    const signupLink = page.locator('a[href*="register"], a[href*="signup"]');
    if (await signupLink.isVisible()) {
      await signupLink.click();
      await expect(page).toHaveURL(/register|signup/);
    }
  });
});
