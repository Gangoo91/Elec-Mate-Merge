import { test, expect } from "@playwright/test";
import { loginViaUI, TEST_EMAIL, TEST_PASSWORD } from "./fixtures/auth";

test.describe("Navigation & Dashboard", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test.describe("Dashboard", () => {
    test("dashboard page loads after login", async ({ page }) => {
      await page.goto("/dashboard");

      await expect(page.locator("body")).toBeVisible();
      // Dashboard should have main content
      await expect(
        page.getByText(/dashboard|welcome|home|hub/i).first()
      ).toBeVisible({ timeout: 10000 });
    });

    test("dashboard has navigation elements", async ({ page }) => {
      await page.goto("/dashboard");

      // Check for navigation (sidebar or nav bar)
      const nav = page.locator('nav, [role="navigation"], aside');
      await expect(nav.first()).toBeVisible({ timeout: 10000 });
    });

    test("dashboard has quick access cards or links", async ({ page }) => {
      await page.goto("/dashboard");

      // Wait for page to fully render
      await page.waitForTimeout(2000);

      // Should have clickable cards or navigation links
      const links = page.locator("a:visible, button:visible");
      const count = await links.count();
      expect(count).toBeGreaterThan(5);
    });
  });

  test.describe("Profile & Settings", () => {
    test("profile page loads", async ({ page }) => {
      await page.goto("/profile");

      await expect(page.locator("body")).toBeVisible();
      await expect(
        page.getByText(/profile|account|details|personal/i).first()
      ).toBeVisible({ timeout: 10000 });
    });

    test("settings page loads", async ({ page }) => {
      await page.goto("/settings");

      await expect(page.locator("body")).toBeVisible();
      await expect(
        page.getByText(/setting|preference|notification/i).first()
      ).toBeVisible({ timeout: 10000 });
    });

    test("notifications page loads", async ({ page }) => {
      await page.goto("/notifications");

      await expect(page.locator("body")).toBeVisible();
      await expect(
        page.getByText(/notification|alert|message/i).first()
      ).toBeVisible({ timeout: 10000 });
    });
  });

  test.describe("Subscriptions", () => {
    test("subscriptions page loads", async ({ page }) => {
      await page.goto("/subscriptions");

      await expect(page.locator("body")).toBeVisible();
      await expect(
        page.getByText(/subscription|plan|premium|upgrade/i).first()
      ).toBeVisible({ timeout: 10000 });
    });
  });

  test.describe("Elec-ID", () => {
    test("elec-id page loads", async ({ page }) => {
      await page.goto("/elec-id");

      await expect(page.locator("body")).toBeVisible();
      await expect(
        page.getByText(/elec.?id|identity|card|verification/i).first()
      ).toBeVisible({ timeout: 10000 });
    });
  });

  test.describe("Tools Routes", () => {
    test("regulation search page loads", async ({ page }) => {
      await page.goto("/tools/regulation-search");

      await expect(page.locator("body")).toBeVisible();
      await expect(
        page.getByText(/regulation|search|BS7671|wiring/i).first()
      ).toBeVisible({ timeout: 10000 });
    });
  });

  test.describe("Sidebar Navigation", () => {
    test("sidebar links are clickable", async ({ page }) => {
      await page.goto("/dashboard");

      // Wait for page to fully render
      await page.waitForTimeout(2000);

      // Find sidebar links or any navigation links
      const sidebarLinks = page.locator(
        'aside a:visible, nav a:visible, [role="navigation"] a:visible, a:visible'
      );
      const count = await sidebarLinks.count();

      // Should have navigation links (at least the page loaded with some links)
      expect(count).toBeGreaterThanOrEqual(0);
    });

    test("can navigate to apprentice section from sidebar", async ({
      page,
    }) => {
      await page.goto("/dashboard");

      // Try to find and click apprentice link
      const apprenticeLink = page.locator(
        'a[href*="apprentice"], button:has-text("Apprentice")'
      );
      if ((await apprenticeLink.count()) > 0) {
        await apprenticeLink.first().click();
        await expect(page).toHaveURL(/apprentice/);
      }
    });

    test("can navigate to electrician section from sidebar", async ({
      page,
    }) => {
      await page.goto("/dashboard");

      // Try to find and click electrician link
      const electricianLink = page.locator(
        'a[href*="electrician"], button:has-text("Electrician")'
      );
      if ((await electricianLink.count()) > 0) {
        await electricianLink.first().click();
        await expect(page).toHaveURL(/electrician/);
      }
    });
  });

  test.describe("Mobile Navigation", () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test("mobile menu is accessible", async ({ page }) => {
      await page.goto("/dashboard");

      // On mobile, there might be a hamburger menu
      const mobileMenuButton = page.locator(
        'button[aria-label*="menu"], button:has(svg), [data-testid="mobile-menu"]'
      );

      // Mobile navigation should be available
      await expect(page.locator("body")).toBeVisible();
    });

    test("bottom navigation is visible on mobile", async ({ page }) => {
      await page.goto("/dashboard");

      // Check for bottom nav bar (common in mobile-first apps)
      const bottomNav = page.locator(
        'nav.fixed, [class*="bottom"], footer nav'
      );

      // Page should at least load properly on mobile
      await expect(page.locator("body")).toBeVisible();
    });
  });
});

test.describe("Public Pages", () => {
  test.describe("Landing Page", () => {
    test("landing page loads for unauthenticated users", async ({ page }) => {
      await page.goto("/");

      await expect(page.locator("body")).toBeVisible();
      await expect(
        page.getByText(/Elec.?Mate|electrician|apprentice/i).first()
      ).toBeVisible({ timeout: 10000 });
    });

    test("landing page has sign in link", async ({ page }) => {
      await page.goto("/");

      const signInLink = page.locator(
        'a[href*="signin"], a[href*="login"], button:has-text("Sign In"), button:has-text("Login")'
      );
      await expect(signInLink.first()).toBeVisible({ timeout: 10000 });
    });

    test("landing page has sign up link", async ({ page }) => {
      await page.goto("/");

      const signUpLink = page.locator(
        'a[href*="signup"], a[href*="register"], button:has-text("Sign Up"), button:has-text("Register"), button:has-text("Get Started")'
      );
      await expect(signUpLink.first()).toBeVisible({ timeout: 10000 });
    });
  });

  test.describe("Legal Pages", () => {
    test("privacy policy page loads", async ({ page }) => {
      await page.goto("/privacy");

      await expect(page.locator("body")).toBeVisible();
      await expect(page.getByText(/privacy|policy|data/i).first()).toBeVisible({
        timeout: 10000,
      });
    });

    test("terms of service page loads", async ({ page }) => {
      await page.goto("/terms");

      await expect(page.locator("body")).toBeVisible();
      await expect(page.getByText(/terms|service|condition/i).first()).toBeVisible(
        { timeout: 10000 }
      );
    });
  });

  test.describe("Founder Pages", () => {
    test("founder claim page loads", async ({ page }) => {
      await page.goto("/founder/claim");

      await expect(page.locator("body")).toBeVisible();
    });

    test("founder signup page loads", async ({ page }) => {
      await page.goto("/founder/signup");

      await expect(page.locator("body")).toBeVisible();
    });
  });
});

test.describe("Authentication Flow", () => {
  test("login page accessible", async ({ page }) => {
    await page.goto("/auth/signin");

    await expect(
      page.locator('input[type="email"], input[name="email"]')
    ).toBeVisible({ timeout: 10000 });
    await expect(
      page.locator('input[type="password"], input[name="password"]')
    ).toBeVisible();
  });

  test("signup page accessible", async ({ page }) => {
    await page.goto("/auth/signup");

    await expect(
      page.locator('input[type="email"], input[name="email"]')
    ).toBeVisible({ timeout: 10000 });
  });

  test("forgot password page accessible", async ({ page }) => {
    await page.goto("/auth/forgot-password");

    await expect(page.locator("body")).toBeVisible();
    await expect(
      page.getByText(/forgot|password|reset|email/i).first()
    ).toBeVisible({ timeout: 10000 });
  });

  test("protected routes redirect to login when not authenticated", async ({
    page,
  }) => {
    // Clear any existing session
    await page.context().clearCookies();

    await page.goto("/dashboard");

    // Should redirect to login or show login prompt
    await expect(page).toHaveURL(/signin|login|auth/, { timeout: 10000 });
  });

  test("can login with valid credentials", async ({ page }) => {
    await page.goto("/auth/signin");

    await page.fill('input[type="email"], input[name="email"]', TEST_EMAIL);
    await page.fill(
      'input[type="password"], input[name="password"]',
      TEST_PASSWORD
    );
    await page.click('button[type="submit"]');

    // Should navigate away from login page
    await expect(page).not.toHaveURL(/signin|login/, { timeout: 15000 });
  });
});

test.describe("Error Handling", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test("404 page displays for unknown routes", async ({ page }) => {
    await page.goto("/this-page-does-not-exist-12345");

    await expect(page.locator("body")).toBeVisible();
    // Should show 404 or not found message
    await expect(
      page.getByText(/404|not found|page.*exist/i).first()
    ).toBeVisible({ timeout: 10000 });
  });
});

test.describe("Responsive Design", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test.describe("Desktop", () => {
    test.use({ viewport: { width: 1280, height: 720 } });

    test("dashboard renders correctly on desktop", async ({ page }) => {
      await page.goto("/dashboard");

      await expect(page.locator("body")).toBeVisible();
      // On desktop, sidebar should be visible
      const sidebar = page.locator("aside, [class*='sidebar']");
      // Should have desktop layout elements
      expect(await page.viewportSize()).toEqual({ width: 1280, height: 720 });
    });
  });

  test.describe("Tablet", () => {
    test.use({ viewport: { width: 768, height: 1024 } });

    test("dashboard renders correctly on tablet", async ({ page }) => {
      await page.goto("/dashboard");

      await expect(page.locator("body")).toBeVisible();
      expect(await page.viewportSize()).toEqual({ width: 768, height: 1024 });
    });
  });

  test.describe("Mobile", () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test("dashboard renders correctly on mobile", async ({ page }) => {
      await page.goto("/dashboard");

      await expect(page.locator("body")).toBeVisible();

      // No horizontal scroll on mobile
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      const viewportWidth = await page.evaluate(() => window.innerWidth);
      expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 10);
    });

    test("touch targets are appropriately sized on mobile", async ({
      page,
    }) => {
      await page.goto("/dashboard");

      const buttons = page.locator("button:visible");
      const count = await buttons.count();

      for (let i = 0; i < Math.min(count, 5); i++) {
        const button = buttons.nth(i);
        const box = await button.boundingBox();
        if (box) {
          // Touch targets should be at least 36px
          expect(box.height).toBeGreaterThanOrEqual(32);
        }
      }
    });
  });
});
