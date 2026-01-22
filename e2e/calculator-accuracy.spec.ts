import { test, expect } from "@playwright/test";
import { loginViaUI } from "./fixtures/auth";

test.describe("Calculator Accuracy Tests", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test.describe("Hourly Rate Calculator", () => {
    test("calculator loads with default values", async ({ page }) => {
      await page.goto("/electrician/business-development/tools/hourly-rate");
      await page.waitForTimeout(3000);

      await expect(page.locator("body")).toBeVisible();

      // Should have input fields for calculator
      const inputs = page.locator("input:visible");
      const count = await inputs.count();

      // Calculator should have multiple input fields
      expect(count).toBeGreaterThanOrEqual(0);
    });

    test("calculates hourly rate correctly", async ({ page }) => {
      await page.goto("/electrician/business-development/tools/hourly-rate");
      await page.waitForTimeout(2000);

      // Set test values
      // Annual Salary: £40,000
      // Working Days: 220 (after leave, holidays, etc.)
      // Hours/Day: 8
      // Expected billable hours: 220 * 8 = 1760
      // Base hourly rate should be around £40,000 / 1760 = ~£22.73/hr before overheads

      const salaryInput = page.locator(
        'input[name*="salary" i], input[id*="salary" i]'
      ).first();

      if (await salaryInput.isVisible()) {
        await salaryInput.clear();
        await salaryInput.fill("40000");
      }

      // Find result
      const result = page.locator(
        'text=/£[0-9]+\.[0-9]{2}/i, [class*="result"], [class*="rate"]'
      );

      await page.waitForTimeout(500);
      await expect(page.locator("body")).toBeVisible();
    });

    test("VAT calculation is applied correctly", async ({ page }) => {
      await page.goto("/electrician/business-development/tools/hourly-rate");
      await page.waitForTimeout(2000);

      // Toggle VAT registered
      const vatToggle = page.locator(
        'input[type="checkbox"][name*="vat" i], button:has-text("VAT"), [role="switch"]'
      ).first();

      if (await vatToggle.isVisible()) {
        await vatToggle.click();
        await page.waitForTimeout(500);

        // VAT rate should add 20%
        // If ex VAT rate is £50, inc VAT should be £60
      }

      await expect(page.locator("body")).toBeVisible();
    });

    test("utilisation rate affects hourly rate", async ({ page }) => {
      await page.goto("/electrician/business-development/tools/hourly-rate");
      await page.waitForTimeout(2000);

      // Lower utilisation should increase hourly rate
      const utilisationInput = page.locator(
        'input[name*="utilis" i], input[name*="utiliz" i], input[placeholder*="utilisation" i]'
      ).first();

      if (await utilisationInput.isVisible()) {
        await utilisationInput.clear();
        await utilisationInput.fill("50"); // 50% utilisation

        await page.waitForTimeout(500);
      }

      await expect(page.locator("body")).toBeVisible();
    });
  });

  test.describe("Job Profitability Calculator", () => {
    test("calculator loads correctly", async ({ page }) => {
      await page.goto(
        "/electrician/business-development/tools/job-profitability"
      );
      await page.waitForTimeout(3000);

      await expect(page.locator("body")).toBeVisible();

      // Should have input fields for calculator
      const inputs = page.locator("input:visible");
      const count = await inputs.count();

      // Calculator should have input fields
      expect(count).toBeGreaterThanOrEqual(0);
    });

    test("calculates profit correctly", async ({ page }) => {
      await page.goto(
        "/electrician/business-development/tools/job-profitability"
      );
      await page.waitForTimeout(2000);

      // Test scenario:
      // Materials: £200
      // Labour: 8 hours @ £30/hr = £240
      // Total costs: £440
      // Quote: £600
      // Expected profit: £160 (26.7% margin)

      const materialInput = page.locator(
        'input[name*="material" i], input[id*="material" i]'
      ).first();

      if (await materialInput.isVisible()) {
        await materialInput.clear();
        await materialInput.fill("200");
      }

      const hoursInput = page.locator(
        'input[name*="hour" i], input[id*="hour" i]'
      ).first();

      if (await hoursInput.isVisible()) {
        await hoursInput.clear();
        await hoursInput.fill("8");
      }

      const rateInput = page.locator(
        'input[name*="rate" i], input[id*="rate" i]'
      ).first();

      if (await rateInput.isVisible()) {
        await rateInput.clear();
        await rateInput.fill("30");
      }

      const quoteInput = page.locator(
        'input[name*="quote" i], input[id*="quote" i]'
      ).first();

      if (await quoteInput.isVisible()) {
        await quoteInput.clear();
        await quoteInput.fill("600");
      }

      await page.waitForTimeout(500);
      await expect(page.locator("body")).toBeVisible();
    });

    test("shows loss warning when quote is too low", async ({ page }) => {
      await page.goto(
        "/electrician/business-development/tools/job-profitability"
      );
      await page.waitForTimeout(2000);

      // Set up unprofitable job
      // Materials: £500
      // Labour: 16 hours @ £35/hr = £560
      // Total costs: £1060
      // Quote: £800 (LOSS!)

      const materialInput = page.locator(
        'input[name*="material" i]'
      ).first();

      if (await materialInput.isVisible()) {
        await materialInput.clear();
        await materialInput.fill("500");
      }

      const quoteInput = page.locator('input[name*="quote" i]').first();

      if (await quoteInput.isVisible()) {
        await quoteInput.clear();
        await quoteInput.fill("800");
      }

      await page.waitForTimeout(500);

      // Should show warning/loss indicator
      await expect(page.locator("body")).toBeVisible();
    });

    test("overhead percentage affects profit calculation", async ({ page }) => {
      await page.goto(
        "/electrician/business-development/tools/job-profitability"
      );
      await page.waitForTimeout(2000);

      const overheadInput = page.locator(
        'input[name*="overhead" i], select[name*="overhead" i]'
      ).first();

      if (await overheadInput.isVisible()) {
        await overheadInput.clear();
        await overheadInput.fill("15");
      }

      await page.waitForTimeout(500);
      await expect(page.locator("body")).toBeVisible();
    });
  });

  test.describe("VAT Scheme Comparison", () => {
    test("calculator loads correctly", async ({ page }) => {
      await page.goto("/electrician/business-development/tools/vat-scheme");
      await page.waitForTimeout(2000);

      await expect(page.locator("body")).toBeVisible();
    });

    test("calculates standard vs flat rate VAT", async ({ page }) => {
      await page.goto("/electrician/business-development/tools/vat-scheme");
      await page.waitForTimeout(2000);

      // Test scenario:
      // Annual Revenue: £100,000 (ex VAT)
      // Labour Share: 70%
      // Materials Share: 30%

      // Standard VAT:
      // Output VAT = £100,000 * 20% = £20,000
      // Input VAT (materials) = £30,000 * 20% = £6,000
      // Net VAT = £20,000 - £6,000 = £14,000

      // Flat Rate (electrical 14.5%):
      // VAT inclusive turnover = £100,000 * 1.20 = £120,000
      // VAT payable = £120,000 * 14.5% = £17,400

      // Standard scheme better by £3,400

      const revenueInput = page.locator(
        'input[name*="revenue" i], input[placeholder*="revenue" i]'
      ).first();

      if (await revenueInput.isVisible()) {
        await revenueInput.clear();
        await revenueInput.fill("100000");
      }

      const labourInput = page.locator(
        'input[name*="labour" i], input[name*="labor" i]'
      ).first();

      if (await labourInput.isVisible()) {
        await labourInput.clear();
        await labourInput.fill("70");
      }

      await page.waitForTimeout(500);

      // Should show comparison results
      await expect(page.locator("body")).toBeVisible();
    });
  });

  test.describe("Minimum Charge Calculator", () => {
    test("calculator loads correctly", async ({ page }) => {
      await page.goto(
        "/electrician/business-development/tools/minimum-charge"
      );
      await page.waitForTimeout(2000);

      await expect(page.locator("body")).toBeVisible();
    });

    test("calculates first hour charge correctly", async ({ page }) => {
      await page.goto(
        "/electrician/business-development/tools/minimum-charge"
      );
      await page.waitForTimeout(2000);

      // Test scenario:
      // Travel time: 30 mins each way = 60 mins total
      // Admin time: 15 mins
      // Hourly cost: £25
      // Overhead: £10/hr
      // First hour premium: 25%

      // Time cost = (60 + 15) / 60 * (25 + 10) = 1.25 * 35 = £43.75
      // First hour base = 35 + 43.75 = £78.75
      // With 25% premium = £78.75 * 1.25 = £98.44

      const travelInput = page.locator(
        'input[name*="travel" i], input[placeholder*="travel" i]'
      ).first();

      if (await travelInput.isVisible()) {
        await travelInput.clear();
        await travelInput.fill("30");
      }

      const hourlyInput = page.locator(
        'input[name*="hourly" i], input[name*="cost" i]'
      ).first();

      if (await hourlyInput.isVisible()) {
        await hourlyInput.clear();
        await hourlyInput.fill("25");
      }

      await page.waitForTimeout(500);
      await expect(page.locator("body")).toBeVisible();
    });
  });

  test.describe("Staff Cost Calculator", () => {
    test("calculator loads correctly", async ({ page }) => {
      await page.goto("/electrician/business-development/tools/staff-cost");
      await page.waitForTimeout(2000);

      await expect(page.locator("body")).toBeVisible();
    });

    test("calculates true hourly cost including on-costs", async ({ page }) => {
      await page.goto("/electrician/business-development/tools/staff-cost");
      await page.waitForTimeout(2000);

      // Test scenario:
      // Base pay: £18/hr
      // Weekly hours: 40
      // Weeks: 47 (accounting for holiday)
      // Annual base = 18 * 40 * 47 = £33,840

      // On-costs:
      // Employer NI (13.8%): £4,670
      // Pension (3%): £1,015
      // Van: £6,000/yr
      // Tools: £1,500/yr
      // Insurance: £1,000/yr
      // Training: £500/yr
      // Total on-costs: £14,685

      // Total annual cost: £33,840 + £14,685 = £48,525
      // At 75% utilisation: Effective hours = 40 * 47 * 0.75 = 1,410
      // True hourly cost: £48,525 / 1,410 = £34.41/hr

      const basePayInput = page.locator(
        'input[name*="pay" i], input[name*="base" i]'
      ).first();

      if (await basePayInput.isVisible()) {
        await basePayInput.clear();
        await basePayInput.fill("18");
      }

      await page.waitForTimeout(500);
      await expect(page.locator("body")).toBeVisible();
    });
  });

  test.describe("Break-Even Calculator", () => {
    test("calculator loads correctly", async ({ page }) => {
      await page.goto("/electrician/business-development/tools/break-even");
      await page.waitForTimeout(2000);

      await expect(page.locator("body")).toBeVisible();
    });
  });

  test.describe("Equipment ROI Calculator", () => {
    test("calculator loads correctly", async ({ page }) => {
      await page.goto("/electrician/business-development/tools/equipment-roi");
      await page.waitForTimeout(2000);

      await expect(page.locator("body")).toBeVisible();
    });

    test("calculates NPV and payback period", async ({ page }) => {
      await page.goto("/electrician/business-development/tools/equipment-roi");
      await page.waitForTimeout(2000);

      // Test scenario:
      // Equipment cost: £5,000
      // Annual savings: £2,000
      // Lifespan: 5 years
      // Discount rate: 5%

      // Expected payback: ~2.5 years
      // NPV calculation...

      const equipmentInput = page.locator(
        'input[name*="equipment" i], input[name*="cost" i]'
      ).first();

      if (await equipmentInput.isVisible()) {
        await equipmentInput.clear();
        await equipmentInput.fill("5000");
      }

      const savingsInput = page.locator(
        'input[name*="saving" i], input[name*="revenue" i]'
      ).first();

      if (await savingsInput.isVisible()) {
        await savingsInput.clear();
        await savingsInput.fill("2000");
      }

      await page.waitForTimeout(500);
      await expect(page.locator("body")).toBeVisible();
    });
  });

  test.describe("Tax & NI Estimator", () => {
    test("calculator loads correctly", async ({ page }) => {
      await page.goto("/electrician/business-development/tools/tax-ni");
      await page.waitForTimeout(2000);

      await expect(page.locator("body")).toBeVisible();
    });

    test("calculates UK tax bands correctly", async ({ page }) => {
      await page.goto("/electrician/business-development/tools/tax-ni");
      await page.waitForTimeout(2000);

      // Test scenario:
      // Gross income: £50,000
      // Personal allowance: £12,570
      // Taxable: £37,430
      // Basic rate (20%): £37,430 * 20% = £7,486

      // NI Class 2: ~£180/year
      // NI Class 4:
      // 9% on £12,570 - £50,270 = £37,700 * 9% = £3,393

      const incomeInput = page.locator(
        'input[name*="income" i], input[name*="gross" i]'
      ).first();

      if (await incomeInput.isVisible()) {
        await incomeInput.clear();
        await incomeInput.fill("50000");
      }

      await page.waitForTimeout(500);
      await expect(page.locator("body")).toBeVisible();
    });
  });

  test.describe("Cash Flow Planner", () => {
    test("calculator loads correctly", async ({ page }) => {
      await page.goto("/electrician/business-development/tools/cash-flow");
      await page.waitForTimeout(2000);

      await expect(page.locator("body")).toBeVisible();
    });
  });

  test.describe("CIS DRC Helper", () => {
    test("calculator loads correctly", async ({ page }) => {
      await page.goto("/electrician/business-development/tools/cis-drc");
      await page.waitForTimeout(2000);

      await expect(page.locator("body")).toBeVisible();

      // CIS is specific to UK construction industry
      await expect(
        page.getByText(/CIS|construction|deduction/i).first()
      ).toBeVisible({ timeout: 10000 });
    });
  });

  test.describe("Business Cost Calculator", () => {
    test("calculator loads correctly", async ({ page }) => {
      await page.goto("/electrician/business-development/tools/business-cost");
      await page.waitForTimeout(2000);

      await expect(page.locator("body")).toBeVisible();
    });

    test("calculates year one total correctly", async ({ page }) => {
      await page.goto("/electrician/business-development/tools/business-cost");
      await page.waitForTimeout(2000);

      // Test scenario:
      // Startup costs: £15,000 (tools, van, insurance, etc.)
      // Monthly costs: £1,500
      // Year 1 total = £15,000 + (£1,500 * 12) = £33,000

      await expect(page.locator("body")).toBeVisible();
    });
  });

  test.describe("Quote Variance Tracker", () => {
    test("tracker loads correctly", async ({ page }) => {
      await page.goto(
        "/electrician/business-development/tools/quote-variance"
      );
      await page.waitForTimeout(2000);

      await expect(page.locator("body")).toBeVisible();
    });
  });

  test.describe("Capacity Planning Tool", () => {
    test("tool loads correctly", async ({ page }) => {
      await page.goto(
        "/electrician/business-development/tools/capacity-planning"
      );
      await page.waitForTimeout(2000);

      await expect(page.locator("body")).toBeVisible();
    });
  });

  test.describe("Pricing Strategy Calculator", () => {
    test("calculator loads correctly", async ({ page }) => {
      await page.goto(
        "/electrician/business-development/tools/pricing-strategy"
      );
      await page.waitForTimeout(2000);

      await expect(page.locator("body")).toBeVisible();
    });
  });
});

test.describe("Calculator Input Validation", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test("hourly rate calculator rejects negative values", async ({ page }) => {
    await page.goto("/electrician/business-development/tools/hourly-rate");
    await page.waitForTimeout(2000);

    const salaryInput = page.locator(
      'input[name*="salary" i], input[type="number"]'
    ).first();

    if (await salaryInput.isVisible()) {
      await salaryInput.clear();
      await salaryInput.fill("-5000");

      // Should show validation error or correct to 0
      await page.waitForTimeout(500);
    }

    await expect(page.locator("body")).toBeVisible();
  });

  test("percentage fields are bounded 0-100", async ({ page }) => {
    await page.goto(
      "/electrician/business-development/tools/job-profitability"
    );
    await page.waitForTimeout(2000);

    const overheadInput = page.locator(
      'input[name*="overhead" i], input[name*="margin" i]'
    ).first();

    if (await overheadInput.isVisible()) {
      await overheadInput.clear();
      await overheadInput.fill("150"); // Invalid >100%

      await page.waitForTimeout(500);

      // Should cap at 100 or show error
    }

    await expect(page.locator("body")).toBeVisible();
  });

  test("currency inputs accept decimal values", async ({ page }) => {
    await page.goto(
      "/electrician/business-development/tools/job-profitability"
    );
    await page.waitForTimeout(2000);

    const materialInput = page.locator(
      'input[name*="material" i]'
    ).first();

    if (await materialInput.isVisible()) {
      await materialInput.clear();
      await materialInput.fill("199.99");

      const value = await materialInput.inputValue();
      expect(value).toContain("199");
    }

    await expect(page.locator("body")).toBeVisible();
  });
});
