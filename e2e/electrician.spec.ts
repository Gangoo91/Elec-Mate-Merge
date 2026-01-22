import { test, expect } from "@playwright/test";
import { loginViaUI } from "./fixtures/auth";

test.describe("Electrician Hub", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test.describe("Main Hub", () => {
    test("electrician hub page loads", async ({ page }) => {
      await page.goto("/electrician");

      await expect(page.locator("body")).toBeVisible();
      await expect(
        page.getByText(/electrician|hub|tool|workshop/i).first()
      ).toBeVisible({ timeout: 10000 });
    });
  });

  test.describe("Job Vacancies", () => {
    test("job vacancies page loads", async ({ page }) => {
      await page.goto("/electrician/job-vacancies");

      await expect(page.locator("body")).toBeVisible();
      await expect(page.getByText(/job|vacanc|career|work/i).first()).toBeVisible(
        { timeout: 10000 }
      );
    });
  });

  test.describe("CV Builder", () => {
    test("CV builder page loads", async ({ page }) => {
      await page.goto("/electrician/cv-builder");

      await expect(page.locator("body")).toBeVisible();
      await expect(page.getByText(/CV|resume|build/i).first()).toBeVisible({
        timeout: 10000,
      });
    });
  });

  test.describe("Materials & Tools", () => {
    test("materials marketplace page loads", async ({ page }) => {
      await page.goto("/electrician/materials");

      await expect(page.locator("body")).toBeVisible();
      await expect(
        page.getByText(/material|supplier|price/i).first()
      ).toBeVisible({ timeout: 10000 });
    });

    test("tools marketplace page loads", async ({ page }) => {
      await page.goto("/electrician/tools");

      await expect(page.locator("body")).toBeVisible();
      await expect(page.getByText(/tool|equipment|buy/i).first()).toBeVisible({
        timeout: 10000,
      });
    });

    test("live pricing hub page loads", async ({ page }) => {
      await page.goto("/electrician/live-pricing");

      await expect(page.locator("body")).toBeVisible();
      await expect(page.getByText(/price|pric|cost/i).first()).toBeVisible({
        timeout: 10000,
      });
    });

    test("material price comparison page loads", async ({ page }) => {
      await page.goto("/electrician/materials/compare");

      await expect(page.locator("body")).toBeVisible();
    });
  });

  test.describe("Safety Shares", () => {
    test("safety shares page loads", async ({ page }) => {
      await page.goto("/electrician/safety-shares");

      await expect(page.locator("body")).toBeVisible();
      await expect(page.getByText(/safety|share|alert/i).first()).toBeVisible({
        timeout: 10000,
      });
    });

    test("major projects page loads", async ({ page }) => {
      await page.goto("/electrician/safety-shares/projects");

      await expect(page.locator("body")).toBeVisible();
      await expect(page.getByText(/project|major|large/i).first()).toBeVisible({
        timeout: 10000,
      });
    });

    test("safety alerts page loads", async ({ page }) => {
      await page.goto("/electrician/safety-shares/alerts");

      await expect(page.locator("body")).toBeVisible();
      await expect(page.getByText(/alert|warning|notice/i).first()).toBeVisible({
        timeout: 10000,
      });
    });

    test("industry news page loads", async ({ page }) => {
      await page.goto("/electrician/safety-shares/news");

      await expect(page.locator("body")).toBeVisible();
      await expect(page.getByText(/news|industry|update/i).first()).toBeVisible({
        timeout: 10000,
      });
    });

    test("safety resources page loads", async ({ page }) => {
      await page.goto("/electrician/safety-shares/resources");

      await expect(page.locator("body")).toBeVisible();
      await expect(
        page.getByText(/resource|safety|guide/i).first()
      ).toBeVisible({ timeout: 10000 });
    });

    test("learning from experience page loads", async ({ page }) => {
      await page.goto("/electrician/safety-shares/lfe");

      await expect(page.locator("body")).toBeVisible();
      await expect(page.getByText(/learn|experience|share/i).first()).toBeVisible(
        { timeout: 10000 }
      );
    });
  });

  test.describe("Career Progression", () => {
    test("career progression page loads", async ({ page }) => {
      await page.goto("/electrician/career-progression");

      await expect(page.locator("body")).toBeVisible();
      await expect(
        page.getByText(/career|progress|pathway/i).first()
      ).toBeVisible({ timeout: 10000 });
    });
  });

  test.describe("AI Tools / Workshop", () => {
    test("agent selector page loads", async ({ page }) => {
      await page.goto("/electrician/agent-selector");

      await expect(page.locator("body")).toBeVisible();
      await expect(page.getByText(/agent|AI|tool|select/i).first()).toBeVisible({
        timeout: 10000,
      });
    });

    test("circuit designer page loads", async ({ page }) => {
      await page.goto("/electrician/circuit-designer");

      await expect(page.locator("body")).toBeVisible();
      await expect(
        page.getByText(/circuit|design|electrical/i).first()
      ).toBeVisible({ timeout: 10000 });
    });

    test("cost engineer page loads", async ({ page }) => {
      await page.goto("/electrician/cost-engineer");

      await expect(page.locator("body")).toBeVisible();
      await expect(page.getByText(/cost|engineer|price/i).first()).toBeVisible({
        timeout: 10000,
      });
    });

    test("installation specialist page loads", async ({ page }) => {
      await page.goto("/electrician/installation-specialist");

      await expect(page.locator("body")).toBeVisible();
      await expect(
        page.getByText(/install|specialist|guidance/i).first()
      ).toBeVisible({ timeout: 10000 });
    });

    test("health and safety page loads", async ({ page }) => {
      await page.goto("/electrician/health-safety");

      await expect(page.locator("body")).toBeVisible();
      await expect(
        page.getByText(/health|safety|RAMS|risk/i).first()
      ).toBeVisible({ timeout: 10000 });
    });

    test("commissioning page loads", async ({ page }) => {
      await page.goto("/electrician/commissioning");

      await expect(page.locator("body")).toBeVisible();
      await expect(
        page.getByText(/commission|test|handover/i).first()
      ).toBeVisible({ timeout: 10000 });
    });

    test("project manager page loads", async ({ page }) => {
      await page.goto("/electrician/project-manager");

      await expect(page.locator("body")).toBeVisible();
      await expect(
        page.getByText(/project|manage|plan/i).first()
      ).toBeVisible({ timeout: 10000 });
    });

    test("maintenance page loads", async ({ page }) => {
      await page.goto("/electrician/maintenance");

      await expect(page.locator("body")).toBeVisible();
      await expect(
        page.getByText(/maintenance|repair|service/i).first()
      ).toBeVisible({ timeout: 10000 });
    });

    test("tutor page loads", async ({ page }) => {
      await page.goto("/electrician/tutor");

      await expect(page.locator("body")).toBeVisible();
      await expect(page.getByText(/tutor|learn|teach/i).first()).toBeVisible({
        timeout: 10000,
      });
    });

    test("method statement page loads", async ({ page }) => {
      await page.goto("/electrician/method-statement");

      await expect(page.locator("body")).toBeVisible();
      await expect(
        page.getByText(/method|statement|procedure/i).first()
      ).toBeVisible({ timeout: 10000 });
    });

    test("calculations page loads", async ({ page }) => {
      await page.goto("/electrician/calculations");

      await expect(page.locator("body")).toBeVisible();
      await expect(
        page.getByText(/calculat|formula|tool/i).first()
      ).toBeVisible({ timeout: 10000 });
    });

    test("install planner page loads", async ({ page }) => {
      await page.goto("/electrician/install-planner");

      await expect(page.locator("body")).toBeVisible();
      await expect(
        page.getByText(/install|planner|plan|consult/i).first()
      ).toBeVisible({ timeout: 10000 });
    });

    test("site safety page loads", async ({ page }) => {
      await page.goto("/electrician/site-safety");

      await expect(page.locator("body")).toBeVisible();
      await expect(page.getByText(/site|safety|risk/i).first()).toBeVisible({
        timeout: 10000,
      });
    });
  });
});
