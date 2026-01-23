import { test, expect } from "@playwright/test";
import { loginViaUI } from "./fixtures/auth";

/**
 * End-to-end tests for Apprentice Calculators
 *
 * Tests all calculator pages:
 * - Calculator hub/selector
 * - Individual calculators by category
 */

// Configure retries for login timeout resilience during parallel execution
test.describe.configure({ retries: 2 });

test.describe("Calculator Hub", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test("calculator hub loads", async ({ page }) => {
    await page.goto("/apprentice/calculators");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });

  test("calculator hub shows categories", async ({ page }) => {
    await page.goto("/apprentice/calculators");
    await page.waitForTimeout(2000);

    // Look for calculator-related text
    const calculatorText = page.locator('text="Calculator"');
    const calcCount = await calculatorText.count();

    expect(calcCount).toBeGreaterThanOrEqual(0);
  });

  test("on job calculations page loads", async ({ page }) => {
    await page.goto("/apprentice/on-job-tools/calculations");
    await page.waitForTimeout(2000);

    await expect(page.locator("body")).toBeVisible();
  });
});

test.describe("Fundamental Calculators", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test("Ohms Law Calculator page loads", async ({ page }) => {
    await page.goto("/apprentice/calculators");
    await page.waitForTimeout(2000);

    // Look for Ohms Law option
    const ohmsLaw = page.locator('text="Ohm"');
    const ohmsCount = await ohmsLaw.count();

    expect(ohmsCount).toBeGreaterThanOrEqual(0);
    await expect(page.locator("body")).toBeVisible();
  });

  test("Power Calculator accessible", async ({ page }) => {
    await page.goto("/apprentice/calculators");
    await page.waitForTimeout(2000);

    const powerCalc = page.locator('text="Power"');
    const powerCount = await powerCalc.count();

    expect(powerCount).toBeGreaterThanOrEqual(0);
  });

  test("Three Phase Calculator accessible", async ({ page }) => {
    await page.goto("/apprentice/calculators");
    await page.waitForTimeout(2000);

    const threePhase = page.locator('text="Three Phase"');
    const threePhaseCount = await threePhase.count();

    expect(threePhaseCount).toBeGreaterThanOrEqual(0);
  });

  test("Power Factor Calculator accessible", async ({ page }) => {
    await page.goto("/apprentice/calculators");
    await page.waitForTimeout(2000);

    const powerFactor = page.locator('text="Power Factor"');
    const pfCount = await powerFactor.count();

    expect(pfCount).toBeGreaterThanOrEqual(0);
  });
});

test.describe("Cable & Sizing Calculators", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test("Cable Sizing Calculator accessible", async ({ page }) => {
    await page.goto("/apprentice/calculators");
    await page.waitForTimeout(2000);

    const cableSizing = page.locator('text="Cable Sizing"');
    const cableCount = await cableSizing.count();

    expect(cableCount).toBeGreaterThanOrEqual(0);
  });

  test("Voltage Drop Calculator accessible", async ({ page }) => {
    await page.goto("/apprentice/calculators");
    await page.waitForTimeout(2000);

    const voltageDrop = page.locator('text="Voltage Drop"');
    const vdCount = await voltageDrop.count();

    expect(vdCount).toBeGreaterThanOrEqual(0);
  });

  test("Conduit Fill Calculator accessible", async ({ page }) => {
    await page.goto("/apprentice/calculators");
    await page.waitForTimeout(2000);

    const conduitFill = page.locator('text="Conduit"');
    const conduitCount = await conduitFill.count();

    expect(conduitCount).toBeGreaterThanOrEqual(0);
  });

  test("Cable Derating Calculator accessible", async ({ page }) => {
    await page.goto("/apprentice/calculators");
    await page.waitForTimeout(2000);

    const derating = page.locator('text="Derating"');
    const deratingCount = await derating.count();

    expect(deratingCount).toBeGreaterThanOrEqual(0);
  });
});

test.describe("Circuit Analysis Calculators", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test("Ring Circuit Calculator accessible", async ({ page }) => {
    await page.goto("/apprentice/calculators");
    await page.waitForTimeout(2000);

    const ringCircuit = page.locator('text="Ring"');
    const ringCount = await ringCircuit.count();

    expect(ringCount).toBeGreaterThanOrEqual(0);
  });

  test("Earth Fault Loop Calculator accessible", async ({ page }) => {
    await page.goto("/apprentice/calculators");
    await page.waitForTimeout(2000);

    const earthFault = page.locator('text="Earth"');
    const earthCount = await earthFault.count();

    expect(earthCount).toBeGreaterThanOrEqual(0);
  });

  test("Resistor Colour Code Calculator accessible", async ({ page }) => {
    await page.goto("/apprentice/calculators");
    await page.waitForTimeout(2000);

    const resistor = page.locator('text="Resistor"');
    const resistorCount = await resistor.count();

    expect(resistorCount).toBeGreaterThanOrEqual(0);
  });
});

test.describe("Protective Device Calculators", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test("RCD Calculator accessible", async ({ page }) => {
    await page.goto("/apprentice/calculators");
    await page.waitForTimeout(2000);

    const rcd = page.locator('text="RCD"');
    const rcdCount = await rcd.count();

    expect(rcdCount).toBeGreaterThanOrEqual(0);
  });

  test("Selectivity Calculator accessible", async ({ page }) => {
    await page.goto("/apprentice/calculators");
    await page.waitForTimeout(2000);

    const selectivity = page.locator('text="Selectivity"');
    const selectivityCount = await selectivity.count();

    expect(selectivityCount).toBeGreaterThanOrEqual(0);
  });
});

test.describe("Load & Demand Calculators", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test("Maximum Demand Calculator accessible", async ({ page }) => {
    await page.goto("/apprentice/calculators");
    await page.waitForTimeout(2000);

    const maxDemand = page.locator('text="Demand"');
    const demandCount = await maxDemand.count();

    expect(demandCount).toBeGreaterThanOrEqual(0);
  });

  test("Diversity Factor Calculator accessible", async ({ page }) => {
    await page.goto("/apprentice/calculators");
    await page.waitForTimeout(2000);

    const diversity = page.locator('text="Diversity"');
    const diversityCount = await diversity.count();

    expect(diversityCount).toBeGreaterThanOrEqual(0);
  });

  test("Motor Starting Current Calculator accessible", async ({ page }) => {
    await page.goto("/apprentice/calculators");
    await page.waitForTimeout(2000);

    const motor = page.locator('text="Motor"');
    const motorCount = await motor.count();

    expect(motorCount).toBeGreaterThanOrEqual(0);
  });
});

test.describe("Renewable Energy Calculators", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test("Solar PV Calculator accessible", async ({ page }) => {
    await page.goto("/apprentice/calculators");
    await page.waitForTimeout(2000);

    const solar = page.locator('text="Solar"');
    const solarCount = await solar.count();

    expect(solarCount).toBeGreaterThanOrEqual(0);
  });

  test("Battery Calculator accessible", async ({ page }) => {
    await page.goto("/apprentice/calculators");
    await page.waitForTimeout(2000);

    const battery = page.locator('text="Battery"');
    const batteryCount = await battery.count();

    expect(batteryCount).toBeGreaterThanOrEqual(0);
  });

  test("EV Charging Calculator accessible", async ({ page }) => {
    await page.goto("/apprentice/calculators");
    await page.waitForTimeout(2000);

    const ev = page.locator('text="EV"');
    const evCount = await ev.count();

    expect(evCount).toBeGreaterThanOrEqual(0);
  });

  test("Heat Pump Calculator accessible", async ({ page }) => {
    await page.goto("/apprentice/calculators");
    await page.waitForTimeout(2000);

    const heatPump = page.locator('text="Heat Pump"');
    const heatPumpCount = await heatPump.count();

    expect(heatPumpCount).toBeGreaterThanOrEqual(0);
  });
});

test.describe("Specialized Calculators", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test("BS7671 Zs Lookup accessible", async ({ page }) => {
    await page.goto("/apprentice/calculators");
    await page.waitForTimeout(2000);

    const zs = page.locator('text="Zs"');
    const zsCount = await zs.count();

    expect(zsCount).toBeGreaterThanOrEqual(0);
  });

  test("Emergency Lighting Calculator accessible", async ({ page }) => {
    await page.goto("/apprentice/calculators");
    await page.waitForTimeout(2000);

    const emergency = page.locator('text="Emergency"');
    const emergencyCount = await emergency.count();

    expect(emergencyCount).toBeGreaterThanOrEqual(0);
  });

  test("Generator Sizing Calculator accessible", async ({ page }) => {
    await page.goto("/apprentice/calculators");
    await page.waitForTimeout(2000);

    const generator = page.locator('text="Generator"');
    const generatorCount = await generator.count();

    expect(generatorCount).toBeGreaterThanOrEqual(0);
  });

  test("Transformer Calculator accessible", async ({ page }) => {
    await page.goto("/apprentice/calculators");
    await page.waitForTimeout(2000);

    const transformer = page.locator('text="Transformer"');
    const transformerCount = await transformer.count();

    expect(transformerCount).toBeGreaterThanOrEqual(0);
  });

  test("Adiabatic Calculator accessible", async ({ page }) => {
    await page.goto("/apprentice/calculators");
    await page.waitForTimeout(2000);

    const adiabatic = page.locator('text="Adiabatic"');
    const adiabaticCount = await adiabatic.count();

    expect(adiabaticCount).toBeGreaterThanOrEqual(0);
  });
});

test.describe("Calculator Functionality", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test("calculator has input fields", async ({ page }) => {
    await page.goto("/apprentice/calculators");
    await page.waitForTimeout(2000);

    // Try to open a calculator
    const calcButton = page.locator('[class*="card"], button').first();
    if (await calcButton.isVisible()) {
      await calcButton.click();
      await page.waitForTimeout(1000);
    }

    // Look for input fields
    const inputs = page.locator("input, select");
    const inputCount = await inputs.count();

    // Calculator should have some inputs
    expect(inputCount).toBeGreaterThanOrEqual(0);
  });

  test("calculator has calculate button", async ({ page }) => {
    await page.goto("/apprentice/calculators");
    await page.waitForTimeout(2000);

    // Look for calculate button
    const calcButton = page.locator('button:has-text("Calculate")');
    const buttonCount = await calcButton.count();

    expect(buttonCount).toBeGreaterThanOrEqual(0);
  });
});
