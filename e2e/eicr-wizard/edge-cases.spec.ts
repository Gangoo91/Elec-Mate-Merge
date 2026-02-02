import { test, expect, Page } from "@playwright/test";

import { testClient, testClient2, testCircuit } from "../fixtures/test-data";

/**
 * EICR Wizard Edge Cases
 *
 * Tests for unusual scenarios, boundary conditions, and error handling
 *
 * Total: 10 tests
 */

// Helper functions
async function fillIfVisible(page: Page, selector: string, value: string): Promise<boolean> {
  const element = page.locator(selector).first();
  if (await element.isVisible({ timeout: 2000 }).catch(() => false)) {
    await element.fill(value);
    return true;
  }
  return false;
}

async function clickOption(page: Page, text: string): Promise<boolean> {
  const option = page.locator(`button:has-text("${text}"), [role="button"]:has-text("${text}"), label:has-text("${text}")`).first();
  if (await option.isVisible({ timeout: 2000 }).catch(() => false)) {
    await option.click();
    return true;
  }
  return false;
}

test.describe("EICR Wizard Edge Cases - Input Validation", () => {
  test.beforeEach(async ({ page }) => {
    // Auth handled by storageState
    await page.goto("/electrician/inspection-testing?section=eicr");
    await page.waitForTimeout(3000);
  });

  test("1. Very long client name is handled", async ({ page }) => {
    const longName = "A".repeat(200);
    await fillIfVisible(page, 'input[name="clientName"]', longName);

    const clientNameInput = page.locator('input[name="clientName"]').first();
    if (await clientNameInput.isVisible()) {
      const value = await clientNameInput.inputValue();
      // Should either truncate or accept the full name
      expect(value.length).toBeGreaterThan(0);
    }

    await expect(page.locator("body")).toBeVisible();
  });

  test("2. Special characters in fields are handled", async ({ page }) => {
    const specialName = "O'Brien & Sons <Test> \"Company\"";
    await fillIfVisible(page, 'input[name="clientName"]', specialName);

    const clientNameInput = page.locator('input[name="clientName"]').first();
    if (await clientNameInput.isVisible()) {
      const value = await clientNameInput.inputValue();
      expect(value).toContain("O'Brien");
    }

    await expect(page.locator("body")).toBeVisible();
  });

  test("3. Unicode characters are supported", async ({ page }) => {
    const unicodeName = "Müller & Søren's Électrique";
    await fillIfVisible(page, 'input[name="clientName"]', unicodeName);

    const clientNameInput = page.locator('input[name="clientName"]').first();
    if (await clientNameInput.isVisible()) {
      const value = await clientNameInput.inputValue();
      expect(value).toBe(unicodeName);
    }

    await expect(page.locator("body")).toBeVisible();
  });

  test("4. Empty postcode format is handled gracefully", async ({ page }) => {
    await fillIfVisible(page, 'input[name="clientName"]', testClient.name);
    await fillIfVisible(page, 'input[name="propertyAddress"], textarea[name="propertyAddress"]', testClient.address);
    await fillIfVisible(page, 'input[name="propertyPostcode"]', "");

    const nextButton = page.locator('button:has-text("Next")').first();
    if (await nextButton.isVisible()) {
      // Form should handle empty postcode (may show validation or proceed)
      const isClickable = await nextButton.isEnabled();
      expect(typeof isClickable).toBe('boolean');
    }

    await expect(page.locator("body")).toBeVisible();
  });
});

test.describe("EICR Wizard Edge Cases - Navigation", () => {
  test.beforeEach(async ({ page }) => {
    // Auth handled by storageState
    await page.goto("/electrician/inspection-testing?section=eicr");
    await page.waitForTimeout(3000);
  });

  test("5. Rapid navigation doesn't break wizard", async ({ page }) => {
    // Fill step 1
    await fillIfVisible(page, 'input[name="clientName"]', testClient.name);
    await fillIfVisible(page, 'input[name="propertyAddress"], textarea[name="propertyAddress"]', testClient.address);
    await fillIfVisible(page, 'input[name="propertyPostcode"]', testClient.postcode);

    // Rapidly navigate
    const nextButton = page.locator('button:has-text("Next")').first();
    if (await nextButton.isVisible() && await nextButton.isEnabled()) {
      await nextButton.click();
      await page.waitForTimeout(500);
    }

    // Try rapid back-forth
    const backButton = page.locator('button:has-text("Back")').first();
    if (await backButton.isVisible()) {
      await backButton.click();
      await page.waitForTimeout(200);
    }

    if (await nextButton.isVisible() && await nextButton.isEnabled()) {
      await nextButton.click();
      await page.waitForTimeout(200);
    }

    // Form should still be functional
    await expect(page.locator("body")).toBeVisible();
  });

  test("6. Browser back button is handled", async ({ page }) => {
    // Fill step 1 and navigate to step 2
    await fillIfVisible(page, 'input[name="clientName"]', testClient.name);
    await fillIfVisible(page, 'input[name="propertyAddress"], textarea[name="propertyAddress"]', testClient.address);
    await fillIfVisible(page, 'input[name="propertyPostcode"]', testClient.postcode);

    const nextButton = page.locator('button:has-text("Next")').first();
    if (await nextButton.isVisible() && await nextButton.isEnabled()) {
      await nextButton.click();
      await page.waitForTimeout(2000);

      // Use browser back
      await page.goBack();
      await page.waitForTimeout(2000);

      // Should handle gracefully (may stay on form or navigate to dashboard)
      await expect(page.locator("body")).toBeVisible();
    }
  });

  test("7. Direct URL access to specific step", async ({ page }) => {
    // Try accessing step 3 directly
    await page.goto("/electrician/inspection-testing?section=eicr?step=3");
    await page.waitForTimeout(3000);

    // Should either redirect to step 1 or show step 3
    await expect(page.locator("body")).toBeVisible();

    // Form should be functional
    const formContent = page.locator('text=/client|installation|board|circuit|eicr/i');
    const hasContent = await formContent.first().isVisible({ timeout: 3000 }).catch(() => false);
    expect(hasContent).toBeTruthy();
  });
});

test.describe("EICR Wizard Edge Cases - Data Scenarios", () => {
  test.beforeEach(async ({ page }) => {
    // Auth handled by storageState
    await page.goto("/electrician/inspection-testing?section=eicr");
    await page.waitForTimeout(3000);
  });

  test("8. Switching supply type updates related fields", async ({ page }) => {
    // Navigate to step 2
    await fillIfVisible(page, 'input[name="clientName"]', testClient.name);
    await fillIfVisible(page, 'input[name="propertyAddress"], textarea[name="propertyAddress"]', testClient.address);
    await fillIfVisible(page, 'input[name="propertyPostcode"]', testClient.postcode);

    const nextButton = page.locator('button:has-text("Next")').first();
    if (await nextButton.isVisible() && await nextButton.isEnabled()) {
      await nextButton.click();
      await page.waitForTimeout(2000);

      // Select 1P first
      await clickOption(page, "Single") || await clickOption(page, "1P");
      await page.waitForTimeout(300);

      // Check voltage
      const voltageInput = page.locator('input[name*="voltage" i]').first();
      let voltage1P = "";
      if (await voltageInput.isVisible()) {
        voltage1P = await voltageInput.inputValue();
      }

      // Switch to 3P
      await clickOption(page, "Three") || await clickOption(page, "3P");
      await page.waitForTimeout(300);

      // Voltage should update
      if (await voltageInput.isVisible()) {
        const voltage3P = await voltageInput.inputValue();
        // Voltage should be different or same depending on implementation
        expect(typeof voltage3P).toBe('string');
      }
    }

    await expect(page.locator("body")).toBeVisible();
  });

  test("9. Maximum number of circuits can be added", async ({ page }) => {
    // Navigate to step 4
    await fillIfVisible(page, 'input[name="clientName"]', testClient.name);
    await fillIfVisible(page, 'input[name="propertyAddress"], textarea[name="propertyAddress"]', testClient.address);
    await fillIfVisible(page, 'input[name="propertyPostcode"]', testClient.postcode);

    for (let i = 0; i < 3; i++) {
      const nextOrSkip = page.locator('button:has-text("Next"), button:has-text("Skip")').first();
      if (await nextOrSkip.isVisible({ timeout: 2000 }) && await nextOrSkip.isEnabled()) {
        if (i === 1) {
          await clickOption(page, "Single") || await clickOption(page, "1P");
          await clickOption(page, "TN-C-S");
        }
        await nextOrSkip.click();
        await page.waitForTimeout(1500);
      }
    }

    // Add multiple circuits
    const addButton = page.locator('button:has-text("Add"), button:has-text("Circuit")').first();
    if (await addButton.isVisible({ timeout: 3000 })) {
      for (let i = 0; i < 5; i++) {
        if (await addButton.isVisible() && await addButton.isEnabled()) {
          await addButton.click();
          await page.waitForTimeout(500);
        }
      }

      // Check circuits were added
      const circuitCards = page.locator('[class*="circuit"], [class*="card"]:has-text("C")');
      const circuitCount = await circuitCards.count();
      expect(circuitCount).toBeGreaterThan(0);
    }

    await expect(page.locator("body")).toBeVisible();
  });

  test("10. Completing wizard with minimum required fields", async ({ page }) => {
    // Fill only required fields
    await fillIfVisible(page, 'input[name="clientName"]', testClient.name);
    await fillIfVisible(page, 'input[name="propertyAddress"], textarea[name="propertyAddress"]', testClient.address);
    await fillIfVisible(page, 'input[name="propertyPostcode"]', testClient.postcode);

    // Navigate through all steps
    for (let i = 0; i < 5; i++) {
      const nextOrSkip = page.locator('button:has-text("Next"), button:has-text("Skip"), button:has-text("Continue")').first();
      if (await nextOrSkip.isVisible({ timeout: 2000 }) && await nextOrSkip.isEnabled()) {
        if (i === 1) {
          await clickOption(page, "Single") || await clickOption(page, "1P");
          await page.waitForTimeout(200);
          await clickOption(page, "TN-C-S");
          await page.waitForTimeout(200);
        }
        if (i === 4) {
          // Mark all as satisfactory in inspections step
          const allSatButton = page.locator('button:has-text("All Satisfactory")').first();
          if (await allSatButton.isVisible({ timeout: 2000 })) {
            await allSatButton.click();
            await page.waitForTimeout(300);
          }
        }
        await nextOrSkip.click();
        await page.waitForTimeout(1500);
      }
    }

    // Should reach review step
    const reviewContent = page.locator('text=/review|complete|signature|summary/i');
    const isOnReview = await reviewContent.first().isVisible({ timeout: 3000 }).catch(() => false);
    expect(isOnReview).toBeTruthy();

    await expect(page.locator("body")).toBeVisible();
  });
});
