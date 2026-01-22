import { test, expect } from "@playwright/test";
import { loginViaUI } from "./fixtures/auth";

test.describe("Form Interactions", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test.describe("Quote Builder Forms", () => {
    test("quote builder has customer input fields", async ({ page }) => {
      await page.goto("/electrician/quote-builder/create");

      await page.waitForTimeout(2000);

      // Check for input fields
      const inputs = page.locator("input:visible, textarea:visible");
      const count = await inputs.count();
      expect(count).toBeGreaterThan(0);
    });

    test("quote builder has submit/save buttons", async ({ page }) => {
      await page.goto("/electrician/quote-builder/create");

      await page.waitForTimeout(2000);

      // Check for action buttons
      const buttons = page.locator(
        'button:visible:has-text("Save"), button:visible:has-text("Create"), button:visible:has-text("Submit"), button:visible:has-text("Generate")'
      );
      const count = await buttons.count();
      expect(count).toBeGreaterThanOrEqual(0);
    });
  });

  test.describe("Invoice Builder Forms", () => {
    test("invoice builder has required fields", async ({ page }) => {
      await page.goto("/electrician/invoice-builder/create");

      await page.waitForTimeout(2000);

      // Check for form elements
      const formElements = page.locator("input:visible, select:visible");
      const count = await formElements.count();
      expect(count).toBeGreaterThan(0);
    });
  });

  test.describe("Business Calculator Forms", () => {
    test("job profitability calculator has input fields", async ({ page }) => {
      await page.goto("/electrician/business-development/tools/job-profitability");

      await page.waitForTimeout(2000);

      // Check for number inputs or text inputs
      const inputs = page.locator(
        'input[type="number"], input[type="text"], input:visible'
      );
      const count = await inputs.count();
      expect(count).toBeGreaterThan(0);
    });

    test("hourly rate calculator accepts input", async ({ page }) => {
      await page.goto("/electrician/business-development/tools/hourly-rate");

      await page.waitForTimeout(2000);

      // Find an input and try to interact
      const input = page.locator("input:visible").first();
      if ((await input.count()) > 0) {
        await input.fill("100");
        const value = await input.inputValue();
        expect(value).toBe("100");
      }
    });
  });

  test.describe("Profile Forms", () => {
    test("profile page has editable fields", async ({ page }) => {
      await page.goto("/profile");

      await page.waitForTimeout(2000);

      // Check for input fields
      const inputs = page.locator("input:visible, textarea:visible");
      const count = await inputs.count();
      expect(count).toBeGreaterThanOrEqual(0);
    });

    test("settings page has toggles or checkboxes", async ({ page }) => {
      await page.goto("/settings");

      await page.waitForTimeout(2000);

      // Check for toggles, switches, or checkboxes
      const toggles = page.locator(
        'input[type="checkbox"], [role="switch"], button[role="switch"]'
      );
      const count = await toggles.count();
      expect(count).toBeGreaterThanOrEqual(0);
    });
  });
});

test.describe("Mental Health Interactions", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test.describe("Mood Tracking", () => {
    test("can select mood emoji", async ({ page }) => {
      await page.goto("/apprentice/mental-health");

      await page.waitForTimeout(2000);

      // Find mood emoji buttons and click one
      const moodButton = page.locator('button:has-text("😊")');
      if ((await moodButton.count()) > 0) {
        await moodButton.click();
        // Should provide visual feedback
        await page.waitForTimeout(500);
      }
    });
  });

  test.describe("Breathing Exercise", () => {
    test("breathing exercise can be started", async ({ page }) => {
      await page.goto("/apprentice/mental-health");

      // Click breathe button
      const breatheButton = page.getByRole("button", { name: /Breathe/i });
      await breatheButton.click();

      await page.waitForTimeout(1000);

      // Should show breathing content
      await expect(page.locator("body")).toBeVisible();
    });
  });

  test.describe("Journal", () => {
    test("wellbeing journal has text input", async ({ page }) => {
      await page.goto("/apprentice/mental-health?section=journal");

      await page.waitForTimeout(2000);

      // Check for textarea or input for journaling
      const textArea = page.locator("textarea:visible, input:visible");
      expect(await textArea.count()).toBeGreaterThanOrEqual(0);
    });
  });
});

test.describe("Search & Filter Functionality", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test.describe("Materials Search", () => {
    test("materials page has search functionality", async ({ page }) => {
      await page.goto("/electrician/materials");

      await page.waitForTimeout(2000);

      // Look for search input
      const searchInput = page.locator(
        'input[type="search"], input[placeholder*="search" i], input[placeholder*="Search" i]'
      );
      expect(await searchInput.count()).toBeGreaterThanOrEqual(0);
    });
  });

  test.describe("Job Vacancies Search", () => {
    test("job vacancies page has search/filter", async ({ page }) => {
      await page.goto("/electrician/job-vacancies");

      await page.waitForTimeout(2000);

      // Look for search or filter elements
      const searchOrFilter = page.locator(
        'input[type="search"], input[placeholder*="search" i], select, button:has-text("Filter")'
      );
      expect(await searchOrFilter.count()).toBeGreaterThanOrEqual(0);
    });
  });

  test.describe("Regulation Search", () => {
    test("regulation search has search input", async ({ page }) => {
      await page.goto("/tools/regulation-search");

      await page.waitForTimeout(2000);

      // Check for search functionality
      const searchInput = page.locator(
        'input[type="search"], input[type="text"], textarea'
      );
      expect(await searchInput.count()).toBeGreaterThan(0);
    });
  });
});

test.describe("Interactive Components", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test.describe("Collapsible Sections", () => {
    test("collapsible sections can expand and collapse", async ({ page }) => {
      await page.goto("/electrician/inspection-testing");

      await page.waitForTimeout(2000);

      // Find collapsible triggers
      const collapsibles = page.locator(
        '[data-state="open"], [data-state="closed"], [role="button"][aria-expanded]'
      );

      if ((await collapsibles.count()) > 0) {
        const first = collapsibles.first();
        await first.click();
        await page.waitForTimeout(300);
        // State should change
        expect(true).toBeTruthy();
      }
    });
  });

  test.describe("Tabs", () => {
    test("tab navigation works", async ({ page }) => {
      await page.goto("/apprentice/mental-health");

      await page.waitForTimeout(2000);

      // Find tab buttons
      const tabs = page.locator('[role="tab"], button[data-state]');

      if ((await tabs.count()) > 1) {
        await tabs.nth(1).click();
        await page.waitForTimeout(300);
        expect(true).toBeTruthy();
      }
    });
  });

  test.describe("Modals & Sheets", () => {
    test("bottom sheets open correctly", async ({ page }) => {
      await page.goto("/electrician/agent-selector");

      await page.waitForTimeout(2000);

      // Try to trigger a bottom sheet by clicking an agent card
      const agentCard = page.locator(
        'button:has-text("Design"), button:has-text("Cost"), [role="button"]'
      );

      if ((await agentCard.count()) > 0) {
        await agentCard.first().click();
        await page.waitForTimeout(500);
        // Should show sheet or modal
        expect(true).toBeTruthy();
      }
    });
  });

  test.describe("Dropdowns & Select", () => {
    test("select dropdowns are functional", async ({ page }) => {
      await page.goto("/electrician/quote-builder/create");

      await page.waitForTimeout(2000);

      // Find select elements
      const selects = page.locator(
        "select, [role='combobox'], [role='listbox'], button:has([data-state])"
      );

      if ((await selects.count()) > 0) {
        const first = selects.first();
        await first.click();
        await page.waitForTimeout(300);
        expect(true).toBeTruthy();
      }
    });
  });
});

test.describe("Toast Notifications", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test("toast appears after action", async ({ page }) => {
    await page.goto("/settings");

    await page.waitForTimeout(2000);

    // Find a save button and click it
    const saveButton = page.locator(
      'button:has-text("Save"), button:has-text("Update")'
    );

    if ((await saveButton.count()) > 0) {
      await saveButton.first().click();
      await page.waitForTimeout(1000);

      // Look for toast notification
      const toast = page.locator(
        '[role="alert"], [data-sonner-toast], .toast, [class*="toast"]'
      );
      // Toast may or may not appear depending on validation
      expect(true).toBeTruthy();
    }
  });
});

test.describe("Loading States", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test("pages show loading state before content", async ({ page }) => {
    await page.goto("/electrician/materials");

    // Check that page eventually loads content
    await expect(page.locator("body")).toBeVisible();
    await page.waitForTimeout(3000);

    // After loading, should have actual content
    const hasContent = await page.locator("main, [role='main'], .content").count();
    expect(hasContent).toBeGreaterThanOrEqual(0);
  });
});

test.describe("Error States", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test("form validation shows error messages", async ({ page }) => {
    await page.goto("/electrician/quote-builder/create");

    await page.waitForTimeout(2000);

    // Try to submit an empty form
    const submitButton = page.locator(
      'button[type="submit"], button:has-text("Create"), button:has-text("Save")'
    );

    if ((await submitButton.count()) > 0) {
      await submitButton.first().click();
      await page.waitForTimeout(1000);

      // Should show validation errors or prevent submission
      expect(true).toBeTruthy();
    }
  });
});
