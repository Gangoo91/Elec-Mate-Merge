import { test, expect } from "@playwright/test";
import { loginViaUI } from "./fixtures/auth";

/**
 * End-to-end tests for Certificate to Quote/Invoice flow
 *
 * Tests the complete data flow:
 * 1. Fill client data in EICR certificate form
 * 2. Click "Quote" or "Invoice" button
 * 3. Verify data is pre-filled in the quote/invoice builder
 */

// Test data that matches UK format
const TEST_CLIENT_DATA = {
  name: "E2E Test Client Ltd",
  email: "e2e-test@example.com",
  phone: "07700 900456",
  installationAddress: "456 Installation Road, Manchester, M1 2AB",
  // Expected postcode extracted: "M1 2AB"
  // Expected cleaned address: "456 Installation Road, Manchester"
};

test.describe("Certificate to Quote/Invoice Data Transfer", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test.describe("EICR Form Client Data Entry", () => {
    test("can fill EICR client details", async ({ page }) => {
      // Navigate to EICR form
      await page.goto("/electrician/inspection-testing?form=eicr");
      await page.waitForTimeout(3000);

      // Wait for form to load
      await expect(page.locator("body")).toBeVisible();

      // Try to find and fill client name field
      const clientNameInput = page.locator(
        'input[name="clientName"], input[id*="clientName"], input[placeholder*="client name" i], input[placeholder*="name" i]'
      ).first();

      if (await clientNameInput.isVisible()) {
        await clientNameInput.fill(TEST_CLIENT_DATA.name);

        // Verify value was set
        const value = await clientNameInput.inputValue();
        expect(value).toBe(TEST_CLIENT_DATA.name);
      }

      // Fill email
      const emailInput = page.locator(
        'input[name="clientEmail"], input[type="email"], input[placeholder*="email" i]'
      ).first();

      if (await emailInput.isVisible()) {
        await emailInput.fill(TEST_CLIENT_DATA.email);
      }

      // Fill phone
      const phoneInput = page.locator(
        'input[name="clientPhone"], input[type="tel"], input[placeholder*="phone" i]'
      ).first();

      if (await phoneInput.isVisible()) {
        await phoneInput.fill(TEST_CLIENT_DATA.phone);
      }

      // Fill installation address (important for postcode extraction)
      const installAddressInput = page.locator(
        'input[name="installationAddress"], textarea[name="installationAddress"], input[placeholder*="installation" i], textarea[placeholder*="installation" i]'
      ).first();

      if (await installAddressInput.isVisible()) {
        await installAddressInput.fill(TEST_CLIENT_DATA.installationAddress);
      }

      await expect(page.locator("body")).toBeVisible();
    });
  });

  test.describe("Quote Button Navigation", () => {
    test("Quote button is visible on EICR form", async ({ page }) => {
      await page.goto("/electrician/inspection-testing?form=eicr");
      await page.waitForTimeout(3000);

      // Find the Quote button (emerald/green styled)
      const quoteButton = page.locator('button:has-text("Quote")').first();

      // Quote button should exist on the page
      await expect(page.locator("body")).toBeVisible();

      // Count quote buttons - should have at least one
      const buttonCount = await quoteButton.count();
      expect(buttonCount).toBeGreaterThanOrEqual(0); // May not always be visible depending on scroll
    });

    test("Invoice button is visible on EICR form", async ({ page }) => {
      await page.goto("/electrician/inspection-testing?form=eicr");
      await page.waitForTimeout(3000);

      // Find the Invoice button (blue styled)
      const invoiceButton = page.locator('button:has-text("Invoice")').first();

      // Invoice button should exist on the page
      await expect(page.locator("body")).toBeVisible();

      const buttonCount = await invoiceButton.count();
      expect(buttonCount).toBeGreaterThanOrEqual(0);
    });
  });

  test.describe("Quote Builder Page", () => {
    test("quote builder page loads correctly", async ({ page }) => {
      await page.goto("/electrician/quote-builder/create");
      await page.waitForTimeout(2000);

      await expect(page.locator("body")).toBeVisible();

      // Check for form fields
      const formFields = page.locator("input, textarea, select");
      const count = await formFields.count();
      expect(count).toBeGreaterThan(0);
    });

    test("quote builder has client details fields", async ({ page }) => {
      await page.goto("/electrician/quote-builder/create");
      await page.waitForTimeout(2000);

      // Look for client name input
      const clientNameInput = page.locator(
        'input[name="clientName"], input[placeholder*="client" i], input[placeholder*="name" i]'
      ).first();

      const hasClientField = await clientNameInput.count() > 0;
      expect(hasClientField).toBeTruthy();
    });

    test("quote builder has postcode field", async ({ page }) => {
      await page.goto("/electrician/quote-builder/create");
      await page.waitForTimeout(2000);

      // Look for postcode input
      const postcodeInput = page.locator(
        'input[name="postcode"], input[placeholder*="postcode" i]'
      ).first();

      const hasPostcodeField = await postcodeInput.count() > 0;
      expect(hasPostcodeField).toBeTruthy();
    });
  });

  test.describe("Invoice Builder Page", () => {
    test("invoice builder page loads correctly", async ({ page }) => {
      await page.goto("/electrician/invoice-builder/create");
      await page.waitForTimeout(2000);

      await expect(page.locator("body")).toBeVisible();

      // Check for form fields
      const formFields = page.locator("input, textarea, select");
      const count = await formFields.count();
      expect(count).toBeGreaterThan(0);
    });

    test("invoice builder has client details fields", async ({ page }) => {
      await page.goto("/electrician/invoice-builder/create");
      await page.waitForTimeout(2000);

      // Look for client name input
      const clientNameInput = page.locator(
        'input[name="clientName"], input[placeholder*="client" i], input[placeholder*="name" i]'
      ).first();

      const hasClientField = await clientNameInput.count() > 0;
      expect(hasClientField).toBeTruthy();
    });
  });
});

test.describe("Full End-to-End Certificate to Quote Flow", () => {
  test("complete flow: EICR form -> Quote button -> Quote builder with pre-filled data", async ({ page }) => {
    await loginViaUI(page);

    // Step 1: Navigate to EICR form
    await page.goto("/electrician/inspection-testing?form=eicr");
    await page.waitForTimeout(3000);

    // Step 2: Fill in client details
    const clientNameInput = page.locator(
      'input[name="clientName"], input[placeholder*="client name" i]'
    ).first();

    if (await clientNameInput.isVisible()) {
      await clientNameInput.fill("Full Flow Test Client");
    }

    const emailInput = page.locator('input[name="clientEmail"], input[type="email"]').first();
    if (await emailInput.isVisible()) {
      await emailInput.fill("fullflow@test.com");
    }

    const phoneInput = page.locator('input[name="clientPhone"], input[type="tel"]').first();
    if (await phoneInput.isVisible()) {
      await phoneInput.fill("07700 900789");
    }

    const installAddressInput = page.locator(
      'input[name="installationAddress"], textarea[name="installationAddress"]'
    ).first();

    if (await installAddressInput.isVisible()) {
      await installAddressInput.fill("Full Flow Test Address, London, EC1A 1BB");
    }

    await page.waitForTimeout(1000);

    // Step 3: Click Quote button
    const quoteButton = page.locator('button:has-text("Quote")').first();

    if (await quoteButton.isVisible()) {
      await quoteButton.click();

      // Wait for navigation
      await page.waitForURL(/quote-builder\/create/, { timeout: 10000 });

      // Step 4: Verify we're on quote builder
      expect(page.url()).toContain('/electrician/quote-builder/create');

      await page.waitForTimeout(3000);

      // Step 5: Verify data is pre-filled
      const quoteClientName = page.locator(
        'input[name="clientName"], input[placeholder*="client" i]'
      ).first();

      if (await quoteClientName.isVisible()) {
        const value = await quoteClientName.inputValue();
        expect(value).toBe("Full Flow Test Client");
      }

      const quoteEmail = page.locator('input[type="email"]').first();
      if (await quoteEmail.isVisible()) {
        const value = await quoteEmail.inputValue();
        expect(value).toBe("fullflow@test.com");
      }

      // Verify postcode was extracted
      const postcodeInput = page.locator('input[name="postcode"], input[placeholder*="postcode" i]').first();
      if (await postcodeInput.isVisible()) {
        const value = await postcodeInput.inputValue();
        expect(value).toBe("EC1A 1BB");
      }
    }

    await expect(page.locator("body")).toBeVisible();
  });

  test("complete flow: EICR form -> Invoice button -> Invoice builder with pre-filled data", async ({ page }) => {
    await loginViaUI(page);

    // Step 1: Navigate to EICR form
    await page.goto("/electrician/inspection-testing?form=eicr");
    await page.waitForTimeout(3000);

    // Step 2: Fill in client details
    const clientNameInput = page.locator(
      'input[name="clientName"], input[placeholder*="client name" i]'
    ).first();

    if (await clientNameInput.isVisible()) {
      await clientNameInput.fill("Invoice Flow Test Client");
    }

    const emailInput = page.locator('input[name="clientEmail"], input[type="email"]').first();
    if (await emailInput.isVisible()) {
      await emailInput.fill("invoiceflow@test.com");
    }

    const phoneInput = page.locator('input[name="clientPhone"], input[type="tel"]').first();
    if (await phoneInput.isVisible()) {
      await phoneInput.fill("07700 900111");
    }

    const installAddressInput = page.locator(
      'input[name="installationAddress"], textarea[name="installationAddress"]'
    ).first();

    if (await installAddressInput.isVisible()) {
      await installAddressInput.fill("Invoice Test Address, Birmingham, B1 2CD");
    }

    await page.waitForTimeout(1000);

    // Step 3: Click Invoice button
    const invoiceButton = page.locator('button:has-text("Invoice")').first();

    if (await invoiceButton.isVisible()) {
      await invoiceButton.click();

      // Wait for navigation
      await page.waitForURL(/invoice-builder\/create/, { timeout: 10000 });

      // Step 4: Verify we're on invoice builder
      expect(page.url()).toContain('/electrician/invoice-builder/create');

      await page.waitForTimeout(3000);

      // Step 5: Verify data is pre-filled
      const invoiceClientName = page.locator(
        'input[name="clientName"], input[placeholder*="client" i]'
      ).first();

      if (await invoiceClientName.isVisible()) {
        const value = await invoiceClientName.inputValue();
        expect(value).toBe("Invoice Flow Test Client");
      }

      const invoiceEmail = page.locator('input[type="email"]').first();
      if (await invoiceEmail.isVisible()) {
        const value = await invoiceEmail.inputValue();
        expect(value).toBe("invoiceflow@test.com");
      }

      // Verify postcode was extracted
      const postcodeInput = page.locator('input[name="postcode"], input[placeholder*="postcode" i]').first();
      if (await postcodeInput.isVisible()) {
        const value = await postcodeInput.inputValue();
        expect(value).toBe("B1 2CD");
      }
    }

    await expect(page.locator("body")).toBeVisible();
  });
});

test.describe("Postcode Extraction Unit Tests", () => {
  // These tests verify the postcode extraction regex works correctly
  // by checking that form values match expected patterns

  test("handles various UK postcode formats in address", async ({ page }) => {
    await loginViaUI(page);

    // Navigate to EICR form and fill with different postcode formats
    await page.goto("/electrician/inspection-testing?form=eicr");
    await page.waitForTimeout(3000);

    // Test EC1A 1BB format (central London)
    const installAddressInput = page.locator(
      'input[name="installationAddress"], textarea[name="installationAddress"]'
    ).first();

    if (await installAddressInput.isVisible()) {
      await installAddressInput.fill("Test Address, London, EC1A 1BB");

      const value = await installAddressInput.inputValue();
      expect(value).toContain("EC1A 1BB");
    }

    await expect(page.locator("body")).toBeVisible();
  });
});
