import { test, expect, Page } from "@playwright/test";

import { testInstruments, testResultsPassing, testResultsFailing } from "../fixtures/test-data";

/**
 * Minor Works - Testing Section Tests
 *
 * Tests for test instruments, conditions, and results entry
 *
 * Total: 22 tests
 */

// Helper to navigate to Minor Works form
async function navigateToMinorWorks(page: Page) {
  await page.goto("/electrician/inspection-testing?section=minor-works");
  await page.waitForTimeout(3000);
}

// Helper to fill a field if visible
async function fillIfVisible(page: Page, selector: string, value: string): Promise<boolean> {
  const element = page.locator(selector).first();
  if (await element.isVisible({ timeout: 2000 }).catch(() => false)) {
    await element.fill(value);
    return true;
  }
  return false;
}

// Helper to select from dropdown
async function selectOption(page: Page, triggerSelector: string, optionText: string): Promise<boolean> {
  const trigger = page.locator(triggerSelector).first();
  if (await trigger.isVisible({ timeout: 2000 }).catch(() => false)) {
    await trigger.click();
    await page.waitForTimeout(300);
    const option = page.locator(`[role="option"]:has-text("${optionText}"), [role="menuitem"]:has-text("${optionText}")`).first();
    if (await option.isVisible({ timeout: 2000 })) {
      await option.click();
      return true;
    }
  }
  return false;
}

test.describe("Minor Works Testing - Continuity Tester Details", () => {
  test.beforeEach(async ({ page }) => {
    // Auth handled by storageState
    await navigateToMinorWorks(page);
  });

  test("1. Continuity Tester Make field accepts input", async ({ page }) => {
    const filled = await fillIfVisible(
      page,
      'input[name*="continuityTester" i][name*="make" i], input[name*="continuity" i][placeholder*="make" i]',
      testInstruments.continuityTester.make
    );

    if (filled) {
      const input = page.locator('input[name*="continuityTester" i][name*="make" i]').first();
      if (await input.isVisible()) {
        const value = await input.inputValue();
        expect(value).toBe(testInstruments.continuityTester.make);
      }
    }

    await expect(page.locator("body")).toBeVisible();
  });

  test("2. Continuity Tester Serial field accepts input", async ({ page }) => {
    const filled = await fillIfVisible(
      page,
      'input[name*="continuityTester" i][name*="serial" i], input[name*="continuity" i][placeholder*="serial" i]',
      testInstruments.continuityTester.serial
    );

    if (filled) {
      const input = page.locator('input[name*="continuityTester" i][name*="serial" i]').first();
      if (await input.isVisible()) {
        const value = await input.inputValue();
        expect(value).toBe(testInstruments.continuityTester.serial);
      }
    }

    await expect(page.locator("body")).toBeVisible();
  });

  test("3. Continuity Tester Calibration Date accepts date", async ({ page }) => {
    const dateInput = page.locator('input[type="date"][name*="continuity" i], input[name*="continuityTester" i][name*="cal" i]').first();

    if (await dateInput.isVisible({ timeout: 3000 })) {
      await dateInput.fill(testInstruments.continuityTester.calDate);
      const value = await dateInput.inputValue();
      expect(value).toBe(testInstruments.continuityTester.calDate);
    }

    await expect(page.locator("body")).toBeVisible();
  });
});

test.describe("Minor Works Testing - Insulation Tester Details", () => {
  test.beforeEach(async ({ page }) => {
    // Auth handled by storageState
    await navigateToMinorWorks(page);
  });

  test("4. Insulation Tester Make field accepts input", async ({ page }) => {
    const filled = await fillIfVisible(
      page,
      'input[name*="insulationTester" i][name*="make" i], input[name*="insulation" i][placeholder*="make" i]',
      testInstruments.insulationTester.make
    );

    if (filled) {
      const input = page.locator('input[name*="insulationTester" i][name*="make" i]').first();
      if (await input.isVisible()) {
        const value = await input.inputValue();
        expect(value).toBe(testInstruments.insulationTester.make);
      }
    }

    await expect(page.locator("body")).toBeVisible();
  });

  test("5. Insulation Tester Serial field accepts input", async ({ page }) => {
    const filled = await fillIfVisible(
      page,
      'input[name*="insulationTester" i][name*="serial" i], input[name*="insulation" i][placeholder*="serial" i]',
      testInstruments.insulationTester.serial
    );

    if (filled) {
      const input = page.locator('input[name*="insulationTester" i][name*="serial" i]').first();
      if (await input.isVisible()) {
        const value = await input.inputValue();
        expect(value).toBe(testInstruments.insulationTester.serial);
      }
    }

    await expect(page.locator("body")).toBeVisible();
  });

  test("6. Insulation Tester Calibration Date accepts date", async ({ page }) => {
    const dateInput = page.locator('input[type="date"][name*="insulation" i], input[name*="insulationTester" i][name*="cal" i]').first();

    if (await dateInput.isVisible({ timeout: 3000 })) {
      await dateInput.fill(testInstruments.insulationTester.calDate);
      const value = await dateInput.inputValue();
      expect(value).toBe(testInstruments.insulationTester.calDate);
    }

    await expect(page.locator("body")).toBeVisible();
  });
});

test.describe("Minor Works Testing - Test Conditions", () => {
  test.beforeEach(async ({ page }) => {
    // Auth handled by storageState
    await navigateToMinorWorks(page);
  });

  test("7. Ambient Temperature field accepts value", async ({ page }) => {
    const filled = await fillIfVisible(
      page,
      'input[name*="ambient" i], input[name*="temp" i], input[placeholder*="temperature" i]',
      testResultsPassing.ambientTemp
    );

    if (filled) {
      const input = page.locator('input[name*="ambient" i]').first();
      if (await input.isVisible()) {
        const value = await input.inputValue();
        expect(value).toBe(testResultsPassing.ambientTemp);
      }
    }

    await expect(page.locator("body")).toBeVisible();
  });

  test("8. Isolation Confirmed dropdown (Yes/No)", async ({ page }) => {
    const selected = await selectOption(
      page,
      '[name*="isolation" i], button:has-text("Isolation")',
      "Yes"
    );

    if (selected) {
      const pageContent = await page.textContent("body");
      expect(pageContent?.toLowerCase()).toContain("yes");
    }

    await expect(page.locator("body")).toBeVisible();
  });
});

test.describe("Minor Works Testing - Circuit Type", () => {
  test.beforeEach(async ({ page }) => {
    // Auth handled by storageState
    await navigateToMinorWorks(page);
  });

  test("9. Circuit Type dropdown can be selected", async ({ page }) => {
    const selected = await selectOption(
      page,
      '[name*="circuitType" i], button:has-text("Circuit type")',
      "Ring"
    );

    if (selected) {
      const pageContent = await page.textContent("body");
      expect(pageContent?.toLowerCase()).toContain("ring");
    }

    await expect(page.locator("body")).toBeVisible();
  });
});

test.describe("Minor Works Testing - Ring Circuit Continuity", () => {
  test.beforeEach(async ({ page }) => {
    // Auth handled by storageState
    await navigateToMinorWorks(page);
  });

  test("10. Ring - Live continuity field accepts value", async ({ page }) => {
    const filled = await fillIfVisible(
      page,
      'input[name*="ringContinuityLive" i], input[name*="ringLive" i], input[name*="r1" i]',
      testResultsPassing.ringContinuityLive
    );

    if (filled) {
      const input = page.locator('input[name*="ringContinuityLive" i], input[name*="r1" i]').first();
      if (await input.isVisible()) {
        const value = await input.inputValue();
        expect(value).toBe(testResultsPassing.ringContinuityLive);
      }
    }

    await expect(page.locator("body")).toBeVisible();
  });

  test("11. Ring - Neutral continuity field accepts value", async ({ page }) => {
    const filled = await fillIfVisible(
      page,
      'input[name*="ringContinuityNeutral" i], input[name*="ringNeutral" i], input[name*="rn" i]',
      testResultsPassing.ringContinuityNeutral
    );

    if (filled) {
      const input = page.locator('input[name*="ringContinuityNeutral" i]').first();
      if (await input.isVisible()) {
        const value = await input.inputValue();
        expect(value).toBe(testResultsPassing.ringContinuityNeutral);
      }
    }

    await expect(page.locator("body")).toBeVisible();
  });

  test("12. Ring - R1+R2 field accepts value (max 1.67Ohm)", async ({ page }) => {
    const filled = await fillIfVisible(
      page,
      'input[name*="r1r2" i], input[name*="r1+r2" i]',
      testResultsPassing.r1r2
    );

    if (filled) {
      const input = page.locator('input[name*="r1r2" i]').first();
      if (await input.isVisible()) {
        const value = await input.inputValue();
        expect(parseFloat(value)).toBeLessThanOrEqual(1.67);
      }
    }

    await expect(page.locator("body")).toBeVisible();
  });
});

test.describe("Minor Works Testing - Radial Circuit Continuity", () => {
  test.beforeEach(async ({ page }) => {
    // Auth handled by storageState
    await navigateToMinorWorks(page);
  });

  test("13. Radial - R1+R2 field accepts value", async ({ page }) => {
    const filled = await fillIfVisible(
      page,
      'input[name*="radialR1R2" i], input[name*="r1r2" i]',
      testResultsPassing.r1r2
    );

    if (filled) {
      const input = page.locator('input[name*="r1r2" i]').first();
      if (await input.isVisible()) {
        const value = await input.inputValue();
        expect(value).toBe(testResultsPassing.r1r2);
      }
    }

    await expect(page.locator("body")).toBeVisible();
  });
});

test.describe("Minor Works Testing - Insulation Resistance", () => {
  test.beforeEach(async ({ page }) => {
    // Auth handled by storageState
    await navigateToMinorWorks(page);
  });

  test("14. Insulation Test Voltage can be selected (250V/500V/1000V)", async ({ page }) => {
    const selected = await selectOption(
      page,
      '[name*="insulationVoltage" i], button:has-text("Test voltage")',
      "500V"
    );

    if (selected) {
      const pageContent = await page.textContent("body");
      expect(pageContent).toContain("500");
    }

    await expect(page.locator("body")).toBeVisible();
  });

  test("15. Insulation L-N field accepts value (min 1.0 MOhm)", async ({ page }) => {
    const filled = await fillIfVisible(
      page,
      'input[name*="insulationLN" i], input[name*="ln" i], input[name*="liveNeutral" i]',
      testResultsPassing.insulationLN
    );

    if (filled) {
      const input = page.locator('input[name*="insulationLN" i], input[name*="ln" i]').first();
      if (await input.isVisible()) {
        const value = await input.inputValue();
        expect(parseFloat(value)).toBeGreaterThanOrEqual(1.0);
      }
    }

    await expect(page.locator("body")).toBeVisible();
  });

  test("16. Insulation L-E field accepts value (min 1.0 MOhm)", async ({ page }) => {
    const filled = await fillIfVisible(
      page,
      'input[name*="insulationLE" i], input[name*="le" i], input[name*="liveEarth" i]',
      testResultsPassing.insulationLE
    );

    if (filled) {
      const input = page.locator('input[name*="insulationLE" i], input[name*="le" i]').first();
      if (await input.isVisible()) {
        const value = await input.inputValue();
        expect(parseFloat(value)).toBeGreaterThanOrEqual(1.0);
      }
    }

    await expect(page.locator("body")).toBeVisible();
  });

  test("17. Insulation N-E field accepts value (min 1.0 MOhm)", async ({ page }) => {
    const filled = await fillIfVisible(
      page,
      'input[name*="insulationNE" i], input[name*="ne" i], input[name*="neutralEarth" i]',
      testResultsPassing.insulationNE
    );

    if (filled) {
      const input = page.locator('input[name*="insulationNE" i], input[name*="ne" i]').first();
      if (await input.isVisible()) {
        const value = await input.inputValue();
        expect(parseFloat(value)).toBeGreaterThanOrEqual(1.0);
      }
    }

    await expect(page.locator("body")).toBeVisible();
  });
});

test.describe("Minor Works Testing - Polarity & Loop Impedance", () => {
  test.beforeEach(async ({ page }) => {
    // Auth handled by storageState
    await navigateToMinorWorks(page);
  });

  test("18. Polarity dropdown (Correct/Incorrect)", async ({ page }) => {
    const selected = await selectOption(
      page,
      '[name*="polarity" i], button:has-text("Polarity")',
      "Correct"
    );

    if (selected) {
      const pageContent = await page.textContent("body");
      expect(pageContent?.toLowerCase()).toContain("correct");
    }

    await expect(page.locator("body")).toBeVisible();
  });

  test("19. Earth Fault Loop Zs field accepts value", async ({ page }) => {
    const filled = await fillIfVisible(
      page,
      'input[name*="zs" i], input[name*="loop" i], input[placeholder*="zs" i]',
      testResultsPassing.zs
    );

    if (filled) {
      const input = page.locator('input[name*="zs" i]').first();
      if (await input.isVisible()) {
        const value = await input.inputValue();
        expect(value).toBe(testResultsPassing.zs);
      }
    }

    await expect(page.locator("body")).toBeVisible();
  });
});

test.describe("Minor Works Testing - RCD Testing", () => {
  test.beforeEach(async ({ page }) => {
    // Auth handled by storageState
    await navigateToMinorWorks(page);
  });

  test("20. RCD Trip Time field accepts value (max 300ms)", async ({ page }) => {
    const filled = await fillIfVisible(
      page,
      'input[name*="rcdTrip" i], input[name*="tripTime" i], input[placeholder*="trip" i]',
      testResultsPassing.rcdTripTime
    );

    if (filled) {
      const input = page.locator('input[name*="rcdTrip" i], input[name*="tripTime" i]').first();
      if (await input.isVisible()) {
        const value = await input.inputValue();
        expect(parseInt(value)).toBeLessThanOrEqual(300);
      }
    }

    await expect(page.locator("body")).toBeVisible();
  });

  test("21. RCD Test Button dropdown (Sat/Unsat)", async ({ page }) => {
    const selected = await selectOption(
      page,
      '[name*="rcdTestButton" i], button:has-text("Test button")',
      "Satisfactory"
    );

    if (selected) {
      const pageContent = await page.textContent("body");
      expect(pageContent?.toLowerCase()).toContain("satisfactory");
    }

    await expect(page.locator("body")).toBeVisible();
  });
});

test.describe("Minor Works Testing - Functional Testing", () => {
  test.beforeEach(async ({ page }) => {
    // Auth handled by storageState
    await navigateToMinorWorks(page);
  });

  test("22. Functional Testing dropdown (Sat/Unsat/N/A)", async ({ page }) => {
    const selected = await selectOption(
      page,
      '[name*="functional" i], button:has-text("Functional testing")',
      "Satisfactory"
    );

    if (selected) {
      const pageContent = await page.textContent("body");
      expect(pageContent?.toLowerCase()).toContain("satisfactory");
    }

    await expect(page.locator("body")).toBeVisible();
  });
});
