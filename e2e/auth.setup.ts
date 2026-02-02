import { test as setup, expect } from "@playwright/test";
import { TEST_EMAIL, TEST_PASSWORD } from "./fixtures/auth";

const authFile = "e2e/.auth/user.json";

setup("authenticate", async ({ page }) => {
  // Navigate to login page
  await page.goto("/auth/signin");

  // Wait for the page to load
  await page.waitForLoadState("networkidle");

  // Dismiss cookie banner if present - wait up to 5 seconds for it to appear
  const acceptCookiesButton = page.locator('button:has-text("Accept All")').first();
  try {
    await acceptCookiesButton.waitFor({ state: "visible", timeout: 5000 });
    await acceptCookiesButton.click();
    // Wait for banner to disappear
    await page.waitForTimeout(1000);
  } catch {
    // Cookie banner may not be present, continue
  }

  // Wait for the form to load
  await page.waitForSelector('input[type="email"], input[name="email"]', {
    timeout: 15000,
  });

  // Fill in credentials
  await page.fill('input[type="email"], input[name="email"]', TEST_EMAIL);
  await page.fill(
    'input[type="password"], input[name="password"]',
    TEST_PASSWORD
  );

  // Wait a moment for any animations
  await page.waitForTimeout(500);

  // Submit the form - scroll into view and click
  const submitButton = page.locator('button[type="submit"]');
  await submitButton.scrollIntoViewIfNeeded();
  await submitButton.click({ force: true });

  // Wait for navigation to authenticated area
  await page.waitForURL(/dashboard|electrician|apprentice|admin|employer|college/, {
    timeout: 30000,
  });

  // Ensure login was successful
  await expect(page.locator("body")).toBeVisible();

  // Save signed-in state
  await page.context().storageState({ path: authFile });
});
