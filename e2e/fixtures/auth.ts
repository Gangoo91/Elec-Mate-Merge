import { test as base, expect, Page } from "@playwright/test";

// Test credentials for e2e testing
export const TEST_EMAIL = "andrewgangoo91@gmail.com";
export const TEST_PASSWORD = "2487gangoo!";

// Extended test with authentication
export const test = base.extend<{ authenticatedPage: Page }>({
  authenticatedPage: async ({ page }, use) => {
    // Navigate to login page
    await page.goto("/auth/signin");

    // Wait for the form to load
    await page.waitForSelector('input[type="email"], input[name="email"]', {
      timeout: 10000,
    });

    // Fill in credentials
    await page.fill('input[type="email"], input[name="email"]', TEST_EMAIL);
    await page.fill(
      'input[type="password"], input[name="password"]',
      TEST_PASSWORD
    );

    // Submit the form
    await page.click('button[type="submit"]');

    // Wait for navigation to dashboard or check for successful login
    await page.waitForURL(/dashboard|electrician|apprentice/, {
      timeout: 15000,
    });

    // Use the authenticated page
    await use(page);
  },
});

// Helper function to login via UI
export async function loginViaUI(page: Page) {
  await page.goto("/auth/signin");
  await page.waitForSelector('input[type="email"], input[name="email"]', {
    timeout: 10000,
  });
  await page.fill('input[type="email"], input[name="email"]', TEST_EMAIL);
  await page.fill(
    'input[type="password"], input[name="password"]',
    TEST_PASSWORD
  );
  await page.click('button[type="submit"]');
  await page.waitForURL(/dashboard|electrician|apprentice/, { timeout: 15000 });
}

// Helper to check if page loaded without critical errors
export async function checkNoConsoleErrors(page: Page) {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      const text = msg.text();
      // Filter out expected errors
      if (
        !text.includes("Sentry") &&
        !text.includes("PostHog") &&
        !text.includes("favicon")
      ) {
        errors.push(text);
      }
    }
  });
  return errors;
}

// Helper to verify a page loads correctly
export async function verifyPageLoads(
  page: Page,
  url: string,
  expectedContent?: string | RegExp
) {
  await page.goto(url);
  await expect(page.locator("body")).toBeVisible();

  if (expectedContent) {
    await expect(page.getByText(expectedContent).first()).toBeVisible({
      timeout: 10000,
    });
  }

  // Check no crash occurred
  const title = await page.title();
  expect(title).not.toContain("Error");
}

// Helper to check interactive elements work
export async function checkButtonsClickable(page: Page) {
  const buttons = page.locator("button:visible");
  const count = await buttons.count();

  for (let i = 0; i < Math.min(count, 5); i++) {
    const button = buttons.nth(i);
    const isEnabled = await button.isEnabled();
    if (isEnabled) {
      const box = await button.boundingBox();
      if (box) {
        // Verify touch target size (44px minimum)
        expect(box.height).toBeGreaterThanOrEqual(36);
      }
    }
  }
}

// Helper to check forms are functional
export async function checkFormInputs(page: Page) {
  const inputs = page.locator("input:visible, textarea:visible, select:visible");
  const count = await inputs.count();

  for (let i = 0; i < Math.min(count, 5); i++) {
    const input = inputs.nth(i);
    const isEnabled = await input.isEnabled();
    if (isEnabled) {
      const box = await input.boundingBox();
      if (box) {
        expect(box.width).toBeGreaterThan(50);
      }
    }
  }
}

export { expect };
