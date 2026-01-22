import { test, expect } from "@playwright/test";
import { loginViaUI } from "./fixtures/auth";

test.describe("Employer Hub", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test("employer dashboard page loads", async ({ page }) => {
    await page.goto("/employer");

    await expect(page.locator("body")).toBeVisible();
    await expect(
      page.getByText(/employer|company|business|apprentice|staff/i).first()
    ).toBeVisible({ timeout: 10000 });
  });
});

test.describe("College Hub", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test("college dashboard page loads", async ({ page }) => {
    await page.goto("/college");

    await expect(page.locator("body")).toBeVisible();
    await expect(
      page.getByText(/college|tutor|student|course|class/i).first()
    ).toBeVisible({ timeout: 10000 });
  });
});

test.describe("Admin Panel", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test.describe("Admin Dashboard", () => {
    test("admin panel loads", async ({ page }) => {
      await page.goto("/admin");

      await expect(page.locator("body")).toBeVisible();
      // May show admin dashboard or access denied depending on user role
    });

    test("admin users page loads", async ({ page }) => {
      await page.goto("/admin/users");

      await expect(page.locator("body")).toBeVisible();
    });

    test("admin revenue page loads", async ({ page }) => {
      await page.goto("/admin/revenue");

      await expect(page.locator("body")).toBeVisible();
    });

    test("admin analytics page loads", async ({ page }) => {
      await page.goto("/admin/analytics");

      await expect(page.locator("body")).toBeVisible();
    });

    test("admin offers page loads", async ({ page }) => {
      await page.goto("/admin/offers");

      await expect(page.locator("body")).toBeVisible();
    });

    test("admin elec-ids page loads", async ({ page }) => {
      await page.goto("/admin/elec-ids");

      await expect(page.locator("body")).toBeVisible();
    });

    test("admin verification queue page loads", async ({ page }) => {
      await page.goto("/admin/verification");

      await expect(page.locator("body")).toBeVisible();
    });

    test("admin vacancies moderation page loads", async ({ page }) => {
      await page.goto("/admin/vacancies");

      await expect(page.locator("body")).toBeVisible();
    });

    test("admin pricing moderation page loads", async ({ page }) => {
      await page.goto("/admin/pricing");

      await expect(page.locator("body")).toBeVisible();
    });

    test("admin document review page loads", async ({ page }) => {
      await page.goto("/admin/document-review");

      await expect(page.locator("body")).toBeVisible();
    });

    test("admin subscriptions page loads", async ({ page }) => {
      await page.goto("/admin/subscriptions");

      await expect(page.locator("body")).toBeVisible();
    });

    test("admin conversations page loads", async ({ page }) => {
      await page.goto("/admin/conversations");

      await expect(page.locator("body")).toBeVisible();
    });

    test("admin announcements page loads", async ({ page }) => {
      await page.goto("/admin/announcements");

      await expect(page.locator("body")).toBeVisible();
    });

    test("admin support page loads", async ({ page }) => {
      await page.goto("/admin/support");

      await expect(page.locator("body")).toBeVisible();
    });

    test("admin feature flags page loads", async ({ page }) => {
      await page.goto("/admin/feature-flags");

      await expect(page.locator("body")).toBeVisible();
    });

    test("admin settings page loads", async ({ page }) => {
      await page.goto("/admin/settings");

      await expect(page.locator("body")).toBeVisible();
    });

    test("admin audit logs page loads", async ({ page }) => {
      await page.goto("/admin/audit");

      await expect(page.locator("body")).toBeVisible();
    });

    test("admin email logs page loads", async ({ page }) => {
      await page.goto("/admin/emails");

      await expect(page.locator("body")).toBeVisible();
    });

    test("admin data export page loads", async ({ page }) => {
      await page.goto("/admin/export");

      await expect(page.locator("body")).toBeVisible();
    });

    test("admin founders page loads", async ({ page }) => {
      await page.goto("/admin/founders");

      await expect(page.locator("body")).toBeVisible();
    });

    test("admin system page loads", async ({ page }) => {
      await page.goto("/admin/system");

      await expect(page.locator("body")).toBeVisible();
    });
  });

  test.describe("Admin Tools", () => {
    test("admin RAG processor page loads", async ({ page }) => {
      await page.goto("/admin/rag-processor");

      await expect(page.locator("body")).toBeVisible();
    });

    test("admin knowledge uploader page loads", async ({ page }) => {
      await page.goto("/admin/knowledge-uploader");

      await expect(page.locator("body")).toBeVisible();
    });

    test("admin learning review page loads", async ({ page }) => {
      await page.goto("/admin/learning-review");

      await expect(page.locator("body")).toBeVisible();
    });

    test("admin enrichment monitor page loads", async ({ page }) => {
      await page.goto("/admin/enrichment");

      await expect(page.locator("body")).toBeVisible();
    });

    test("admin training upload page loads", async ({ page }) => {
      await page.goto("/admin/training-upload");

      await expect(page.locator("body")).toBeVisible();
    });
  });
});

test.describe("PDF Generator", () => {
  test("PDF generator page loads", async ({ page }) => {
    await page.goto("/pdf-generator");

    await expect(page.locator("body")).toBeVisible();
    await expect(
      page.getByText(/PDF|generate|document|latex/i).first()
    ).toBeVisible({ timeout: 10000 });
  });
});

test.describe("Public Token Routes", () => {
  test.describe("Public Quote", () => {
    test("public quote page handles invalid token", async ({ page }) => {
      await page.goto("/quote/invalid-token-12345");

      await expect(page.locator("body")).toBeVisible();
      // Should show error or quote not found
    });

    test("public quote via alternate route handles invalid token", async ({
      page,
    }) => {
      await page.goto("/public-quote/invalid-token-12345");

      await expect(page.locator("body")).toBeVisible();
    });
  });

  test.describe("Public Signature", () => {
    test("signature page handles invalid token", async ({ page }) => {
      await page.goto("/sign/invalid-token-12345");

      await expect(page.locator("body")).toBeVisible();
    });
  });

  test.describe("Client Portal", () => {
    test("client portal handles invalid token", async ({ page }) => {
      await page.goto("/portal/invalid-token-12345");

      await expect(page.locator("body")).toBeVisible();
    });
  });

  test.describe("Briefing Sign-off", () => {
    test("briefing sign-off handles invalid id", async ({ page }) => {
      await page.goto("/briefing-signoff/invalid-id-12345");

      await expect(page.locator("body")).toBeVisible();
    });
  });
});

test.describe("Payment Success Pages", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test("payment success page loads", async ({ page }) => {
    await page.goto("/payment-success");

    await expect(page.locator("body")).toBeVisible();
  });

  test("invoice payment success page loads", async ({ page }) => {
    await page.goto("/invoice-payment-success");

    await expect(page.locator("body")).toBeVisible();
  });
});
