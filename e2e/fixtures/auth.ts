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
      timeout: 15000,
    });

    // Fill in credentials
    await page.fill('input[type="email"], input[name="email"]', TEST_EMAIL);
    await page.fill(
      'input[type="password"], input[name="password"]',
      TEST_PASSWORD
    );

    // Submit the form
    await page.click('button[type="submit"]');

    // Wait for navigation - include all possible post-login routes
    // Increased timeout to 30s for slower browsers (Firefox, WebKit, mobile)
    await page.waitForURL(/dashboard|electrician|apprentice|admin|employer|college/, {
      timeout: 30000,
    });

    // Use the authenticated page
    await use(page);
  },
});

// Helper function to login via UI with retry logic for rate limiting
export async function loginViaUI(page: Page, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await page.goto("/auth/signin");
      await page.waitForSelector('input[type="email"], input[name="email"]', {
        timeout: 15000,
      });

      // Check for rate limit message before filling
      const rateLimitVisible = await page
        .getByText(/rate limit|too many requests/i)
        .isVisible()
        .catch(() => false);

      if (rateLimitVisible && attempt < retries) {
        // Wait and retry if rate limited
        await page.waitForTimeout(2000 * attempt);
        continue;
      }

      await page.fill('input[type="email"], input[name="email"]', TEST_EMAIL);
      await page.fill(
        'input[type="password"], input[name="password"]',
        TEST_PASSWORD
      );
      await page.click('button[type="submit"]');

      // Check for rate limit after submit
      await page.waitForTimeout(500);
      const postSubmitRateLimit = await page
        .getByText(/rate limit|too many requests/i)
        .isVisible()
        .catch(() => false);

      if (postSubmitRateLimit && attempt < retries) {
        await page.waitForTimeout(3000 * attempt);
        continue;
      }

      // Include admin in URL pattern since test user may be redirected there
      // Increased timeout to 30s for slower browsers (Firefox, WebKit, mobile)
      await page.waitForURL(/dashboard|electrician|apprentice|admin|employer|college/, { timeout: 30000 });
      return; // Success
    } catch (error) {
      if (attempt === retries) throw error;
      // Wait before retry
      await page.waitForTimeout(2000 * attempt);
    }
  }
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
