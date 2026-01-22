import { test, expect } from "@playwright/test";
import { loginViaUI } from "./fixtures/auth";

test.describe("Business Hub & Tools", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test.describe("Business Hub", () => {
    test("business hub page loads", async ({ page }) => {
      await page.goto("/electrician/business");

      await expect(page.locator("body")).toBeVisible();
      await expect(
        page.getByText(/business|admin|manage/i).first()
      ).toBeVisible({ timeout: 10000 });
    });

    test("business admin page loads", async ({ page }) => {
      await page.goto("/electrician/business-admin");

      await expect(page.locator("body")).toBeVisible();
    });
  });

  test.describe("Quote Builder", () => {
    test("quote builder page loads", async ({ page }) => {
      await page.goto("/electrician/quote-builder");

      await expect(page.locator("body")).toBeVisible();
      await expect(page.getByText(/quote|estimate|price/i).first()).toBeVisible({
        timeout: 10000,
      });
    });

    test("quote builder create page loads", async ({ page }) => {
      await page.goto("/electrician/quote-builder/create");

      await expect(page.locator("body")).toBeVisible();
      await expect(
        page.getByText(/quote|create|new|customer/i).first()
      ).toBeVisible({ timeout: 10000 });
    });

    test("smart quote builder page loads", async ({ page }) => {
      await page.goto("/electrician/quote-builder/smart");

      await expect(page.locator("body")).toBeVisible();
      await expect(page.getByText(/smart|quote|AI/i).first()).toBeVisible({
        timeout: 10000,
      });
    });

    test("quotes list page loads", async ({ page }) => {
      await page.goto("/electrician/quotes");

      await expect(page.locator("body")).toBeVisible();
      await expect(page.getByText(/quote|list|all/i).first()).toBeVisible({
        timeout: 10000,
      });
    });
  });

  test.describe("Invoice Builder", () => {
    test("invoices list page loads", async ({ page }) => {
      await page.goto("/electrician/invoices");

      await expect(page.locator("body")).toBeVisible();
      await expect(page.getByText(/invoice|bill|payment/i).first()).toBeVisible({
        timeout: 10000,
      });
    });

    test("invoice builder create page loads", async ({ page }) => {
      await page.goto("/electrician/invoice-builder/create");

      await expect(page.locator("body")).toBeVisible();
      await expect(
        page.getByText(/invoice|create|new|customer/i).first()
      ).toBeVisible({ timeout: 10000 });
    });

    test("quote invoice dashboard page loads", async ({ page }) => {
      await page.goto("/electrician/quote-invoice-dashboard");

      await expect(page.locator("body")).toBeVisible();
      await expect(
        page.getByText(/dashboard|quote|invoice|overview/i).first()
      ).toBeVisible({ timeout: 10000 });
    });
  });

  test.describe("Business Development", () => {
    test("business development page loads", async ({ page }) => {
      await page.goto("/electrician/business-development");

      await expect(page.locator("body")).toBeVisible();
      await expect(
        page.getByText(/business|develop|grow/i).first()
      ).toBeVisible({ timeout: 10000 });
    });

    test("startup guide page loads", async ({ page }) => {
      await page.goto("/electrician/business-development/startup");

      await expect(page.locator("body")).toBeVisible();
      await expect(
        page.getByText(/startup|start|business|new/i).first()
      ).toBeVisible({ timeout: 10000 });
    });

    test("managing apprentices page loads", async ({ page }) => {
      await page.goto("/electrician/business-development/apprentices");

      await expect(page.locator("body")).toBeVisible();
      await expect(
        page.getByText(/apprentice|employ|hire|train/i).first()
      ).toBeVisible({ timeout: 10000 });
    });

    test("managing electricians page loads", async ({ page }) => {
      await page.goto("/electrician/business-development/electricians");

      await expect(page.locator("body")).toBeVisible();
      await expect(
        page.getByText(/electrician|employ|staff|team/i).first()
      ).toBeVisible({ timeout: 10000 });
    });

    test("business growth page loads", async ({ page }) => {
      await page.goto("/electrician/business-development/growth");

      await expect(page.locator("body")).toBeVisible();
      await expect(page.getByText(/grow|scale|expand/i).first()).toBeVisible({
        timeout: 10000,
      });
    });

    test("customer management page loads", async ({ page }) => {
      await page.goto("/electrician/business-development/customers");

      await expect(page.locator("body")).toBeVisible();
      await expect(
        page.getByText(/customer|client|manage/i).first()
      ).toBeVisible({ timeout: 10000 });
    });

    test("business templates page loads", async ({ page }) => {
      await page.goto("/electrician/business-development/templates");

      await expect(page.locator("body")).toBeVisible();
      await expect(
        page.getByText(/template|document|form/i).first()
      ).toBeVisible({ timeout: 10000 });
    });

    test("tax and finances page loads", async ({ page }) => {
      await page.goto("/electrician/business-development/tax-finances");

      await expect(page.locator("body")).toBeVisible();
      await expect(page.getByText(/tax|finance|account/i).first()).toBeVisible({
        timeout: 10000,
      });
    });

    test("debt recovery page loads", async ({ page }) => {
      await page.goto("/electrician/business-development/debt-recovery");

      await expect(page.locator("body")).toBeVisible();
      await expect(
        page.getByText(/debt|recover|payment|chase/i).first()
      ).toBeVisible({ timeout: 10000 });
    });
  });

  test.describe("Business Calculators", () => {
    test("business calculators hub page loads", async ({ page }) => {
      await page.goto("/electrician/business-development/tools");

      await expect(page.locator("body")).toBeVisible();
      await expect(
        page.getByText(/calculator|tool|business/i).first()
      ).toBeVisible({ timeout: 10000 });
    });

    test("job profitability calculator loads", async ({ page }) => {
      await page.goto("/electrician/business-development/tools/job-profitability");

      await expect(page.locator("body")).toBeVisible();
      await expect(
        page.getByText(/profit|job|margin/i).first()
      ).toBeVisible({ timeout: 10000 });
    });

    test("business cost calculator loads", async ({ page }) => {
      await page.goto("/electrician/business-development/tools/business-cost");

      await expect(page.locator("body")).toBeVisible();
      await expect(page.getByText(/cost|business|expense/i).first()).toBeVisible(
        { timeout: 10000 }
      );
    });

    test("cash flow planner loads", async ({ page }) => {
      await page.goto("/electrician/business-development/tools/cash-flow");

      await expect(page.locator("body")).toBeVisible();
      await expect(page.getByText(/cash|flow|plan/i).first()).toBeVisible({
        timeout: 10000,
      });
    });

    test("pricing strategy calculator loads", async ({ page }) => {
      await page.goto("/electrician/business-development/tools/pricing-strategy");

      await expect(page.locator("body")).toBeVisible();
      await expect(page.getByText(/pricing|strategy|rate/i).first()).toBeVisible(
        { timeout: 10000 }
      );
    });

    test("ROI calculator loads", async ({ page }) => {
      await page.goto("/electrician/business-development/tools/roi-calculator");

      await expect(page.locator("body")).toBeVisible();
      await expect(page.getByText(/ROI|return|invest/i).first()).toBeVisible({
        timeout: 10000,
      });
    });

    test("hourly rate calculator loads", async ({ page }) => {
      await page.goto("/electrician/business-development/tools/hourly-rate");

      await expect(page.locator("body")).toBeVisible();
      await expect(page.getByText(/hourly|rate|charge/i).first()).toBeVisible({
        timeout: 10000,
      });
    });

    test("capacity planning tool loads", async ({ page }) => {
      await page.goto("/electrician/business-development/tools/capacity-planner");

      await expect(page.locator("body")).toBeVisible();
      await expect(
        page.getByText(/capacity|plan|schedule/i).first()
      ).toBeVisible({ timeout: 10000 });
    });

    test("tax and NI estimator loads", async ({ page }) => {
      await page.goto("/electrician/business-development/tools/tax-estimator");

      await expect(page.locator("body")).toBeVisible();
      await expect(page.getByText(/tax|NI|national/i).first()).toBeVisible({
        timeout: 10000,
      });
    });

    test("break even calculator loads", async ({ page }) => {
      await page.goto("/electrician/business-development/tools/break-even");

      await expect(page.locator("body")).toBeVisible();
      await expect(page.getByText(/break.?even|profit/i).first()).toBeVisible({
        timeout: 10000,
      });
    });

    test("staff cost calculator loads", async ({ page }) => {
      await page.goto("/electrician/business-development/tools/staff-cost");

      await expect(page.locator("body")).toBeVisible();
      await expect(page.getByText(/staff|cost|employ/i).first()).toBeVisible({
        timeout: 10000,
      });
    });

    test("quote variance tracker loads", async ({ page }) => {
      await page.goto("/electrician/business-development/tools/quote-variance");

      await expect(page.locator("body")).toBeVisible();
      await expect(
        page.getByText(/quote|variance|track/i).first()
      ).toBeVisible({ timeout: 10000 });
    });

    test("minimum charge calculator loads", async ({ page }) => {
      await page.goto("/electrician/business-development/tools/minimum-charge");

      await expect(page.locator("body")).toBeVisible();
      await expect(
        page.getByText(/minimum|charge|callout/i).first()
      ).toBeVisible({ timeout: 10000 });
    });

    test("VAT scheme comparison loads", async ({ page }) => {
      await page.goto("/electrician/business-development/tools/vat-scheme");

      await expect(page.locator("body")).toBeVisible();
      await expect(page.getByText(/VAT|scheme|flat/i).first()).toBeVisible({
        timeout: 10000,
      });
    });

    test("CIS DRC helper loads", async ({ page }) => {
      await page.goto("/electrician/business-development/tools/cis-drc");

      await expect(page.locator("body")).toBeVisible();
      await expect(page.getByText(/CIS|DRC|construction/i).first()).toBeVisible({
        timeout: 10000,
      });
    });
  });

  test.describe("Customers Page", () => {
    test("customers list page loads", async ({ page }) => {
      await page.goto("/customers");

      await expect(page.locator("body")).toBeVisible();
      await expect(
        page.getByText(/customer|client|contact/i).first()
      ).toBeVisible({ timeout: 10000 });
    });
  });

  test.describe("Certificate Expiry", () => {
    test("certificate expiry page loads", async ({ page }) => {
      await page.goto("/certificate-expiry");

      await expect(page.locator("body")).toBeVisible();
      await expect(
        page.getByText(/certificate|expiry|renew/i).first()
      ).toBeVisible({ timeout: 10000 });
    });
  });
});
