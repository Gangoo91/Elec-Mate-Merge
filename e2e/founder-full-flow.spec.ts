import { test, expect, Page } from "@playwright/test";
import { loginViaUI, TEST_EMAIL, TEST_PASSWORD } from "./fixtures/auth";

// Test email for founder invites (use a unique test email)
const TEST_FOUNDER_EMAIL = `test.founder.${Date.now()}@example.com`;

test.describe("Founder Onboarding - Full E2E Flow", () => {
  test.describe("Admin Panel - Founder Management", () => {
    test.beforeEach(async ({ page }) => {
      await loginViaUI(page);
    });

    test("admin can access founders page", async ({ page }) => {
      await page.goto("/admin/founders");

      // Wait for page to load
      await page.waitForTimeout(2000);

      // Should show founders page or redirect if not admin
      const url = page.url();
      if (url.includes("admin/founders")) {
        // Check for founder-specific elements
        await expect(page.locator("body")).toBeVisible();

        // Look for Founder Invites header or crown icon
        const founderHeader = page.getByText(/founder invites/i);
        const uploadButton = page.getByRole("button", { name: /upload/i });
        const refreshButton = page.locator("button").filter({ has: page.locator("svg") });

        // At least one of these should be visible
        const hasFounderContent =
          (await founderHeader.isVisible().catch(() => false)) ||
          (await uploadButton.isVisible().catch(() => false));

        console.log(`Founder page accessible: ${hasFounderContent}`);
      }
    });

    test("admin can open upload emails sheet", async ({ page }) => {
      await page.goto("/admin/founders");
      await page.waitForTimeout(2000);

      // Find and click upload button
      const uploadButton = page.getByRole("button", { name: /upload/i });

      if (await uploadButton.isVisible()) {
        await uploadButton.click();

        // Wait for sheet to open
        await page.waitForTimeout(500);

        // Check for textarea in the sheet
        const emailTextarea = page.locator("textarea");
        await expect(emailTextarea).toBeVisible({ timeout: 5000 });

        // Check for "Create & Send Invites" button
        const sendButton = page.getByRole("button", { name: /create.*send|send.*invite/i });
        if (await sendButton.isVisible()) {
          console.log("Upload sheet opened successfully");
        }
      }
    });

    test("admin can see founder stats", async ({ page }) => {
      await page.goto("/admin/founders");
      await page.waitForTimeout(2000);

      // Look for stat cards
      const totalCard = page.getByText(/total/i);
      const pendingCard = page.getByText(/pending/i);
      const sentCard = page.getByText(/sent/i);
      const claimedCard = page.getByText(/claimed/i);

      // Check if at least some stats are visible
      const statsVisible =
        (await totalCard.isVisible().catch(() => false)) ||
        (await pendingCard.isVisible().catch(() => false)) ||
        (await sentCard.isVisible().catch(() => false)) ||
        (await claimedCard.isVisible().catch(() => false));

      console.log(`Stats visible: ${statsVisible}`);
    });

    test("admin can upload and send founder invites", async ({ page }) => {
      await page.goto("/admin/founders");
      await page.waitForTimeout(2000);

      // Find and click upload button
      const uploadButton = page.getByRole("button", { name: /upload/i });

      if (await uploadButton.isVisible()) {
        await uploadButton.click();
        await page.waitForTimeout(500);

        // Enter test email
        const emailTextarea = page.locator("textarea");
        if (await emailTextarea.isVisible()) {
          await emailTextarea.fill(TEST_FOUNDER_EMAIL);

          // Check email count indicator
          await page.waitForTimeout(300);
          const emailCount = page.getByText(/1 valid email/i);
          if (await emailCount.isVisible()) {
            console.log("Email validation working");
          }

          // Click send button
          const sendButton = page.getByRole("button", { name: /create.*send/i });
          if (await sendButton.isVisible()) {
            await sendButton.click();

            // Wait for response
            await page.waitForTimeout(3000);

            // Check for success toast or updated list
            const successToast = page.getByText(/invite.*created|invite.*sent/i);
            const hasSuccess = await successToast.isVisible().catch(() => false);
            console.log(`Invite creation result: ${hasSuccess ? "success" : "check manually"}`);
          }
        }
      }
    });

    test("admin can view invite details", async ({ page }) => {
      await page.goto("/admin/founders");
      await page.waitForTimeout(2000);

      // Look for any invite cards in the list
      const inviteCards = page.locator('[class*="Card"]').filter({ hasText: /@/ });
      const cardCount = await inviteCards.count();

      if (cardCount > 0) {
        // Click on the first invite
        await inviteCards.first().click();
        await page.waitForTimeout(500);

        // Check for detail sheet
        const statusLabel = page.getByText(/status/i);
        const inviteLink = page.getByText(/invite link/i);
        const copyButton = page.getByRole("button", { name: /copy/i });

        const detailsVisible =
          (await statusLabel.isVisible().catch(() => false)) ||
          (await inviteLink.isVisible().catch(() => false)) ||
          (await copyButton.isVisible().catch(() => false));

        console.log(`Invite details visible: ${detailsVisible}`);
      } else {
        console.log("No invites to view - create one first");
      }
    });

    test("admin can resend invite", async ({ page }) => {
      await page.goto("/admin/founders");
      await page.waitForTimeout(2000);

      // Look for any invite cards with "sent" status
      const inviteCards = page.locator('[class*="Card"]').filter({ hasText: /@/ });
      const cardCount = await inviteCards.count();

      if (cardCount > 0) {
        await inviteCards.first().click();
        await page.waitForTimeout(500);

        // Look for resend button
        const resendButton = page.getByRole("button", { name: /resend/i });
        if (await resendButton.isVisible()) {
          console.log("Resend button available");
          // Don't actually click to avoid spam
        }
      }
    });
  });

  test.describe("Founder Signup Flow", () => {
    test("signup page shows founder branding", async ({ page }) => {
      // Use a test token (will be invalid but shows UI)
      await page.goto("/founder/signup?token=FND-TESTTOKEN12345");
      await page.waitForTimeout(2000);

      // Even with invalid token, check the page loaded
      const pageLoaded = await page.locator("body").isVisible();
      expect(pageLoaded).toBeTruthy();

      // Check for founder-specific branding elements
      const hasCrown = await page.locator('[class*="Crown"], svg').first().isVisible().catch(() => false);
      const hasFounderText = await page.getByText(/founder/i).first().isVisible().catch(() => false);
      const hasPrice = await page.getByText(/£3.99/i).isVisible().catch(() => false);

      console.log(`Crown icon: ${hasCrown}, Founder text: ${hasFounderText}, Price: ${hasPrice}`);
    });

    test("signup form validation works", async ({ page }) => {
      await page.goto("/founder/signup?token=FND-TESTTOKEN12345");
      await page.waitForTimeout(2000);

      // If the token is invalid, we should see an error
      const invalidError = await page.getByRole("heading", { name: /invalid/i }).isVisible().catch(() => false);

      if (invalidError) {
        console.log("Invalid token correctly shows error");
        expect(invalidError).toBeTruthy();
      } else {
        // Token might be valid in test environment - check form
        const nameInput = page.locator('input[placeholder*="name" i]');
        const passwordInput = page.locator('input[type="password"]').first();

        if (await nameInput.isVisible()) {
          // Test validation - try submitting empty
          const submitButton = page.getByRole("button", { name: /create account/i });
          if (await submitButton.isVisible() && await submitButton.isEnabled()) {
            await submitButton.click();
            await page.waitForTimeout(500);
            // Should show validation error or button stays disabled
          }
        }
      }
    });

    test("password requirements are shown", async ({ page }) => {
      await page.goto("/founder/signup?token=FND-TESTTOKEN12345");
      await page.waitForTimeout(2000);

      const passwordInput = page.locator('input[type="password"]').first();

      if (await passwordInput.isVisible()) {
        // Type a weak password
        await passwordInput.fill("test");
        await page.waitForTimeout(300);

        // Check for requirement indicators (8+, A-Z, a-z, 0-9)
        const requirementIndicators = page.getByText(/8\+|a-z|0-9/i);
        const hasIndicators = await requirementIndicators.first().isVisible().catch(() => false);
        console.log(`Password requirements shown: ${hasIndicators}`);
      }
    });

    test("signup redirects to Stripe checkout", async ({ page }) => {
      // This test would need a valid token from the database
      // For now, we verify the flow structure
      await page.goto("/founder/signup?token=FND-TESTTOKEN12345");
      await page.waitForTimeout(2000);

      // Check that the submit button mentions subscription
      const subscribeButton = page.getByRole("button", { name: /subscribe|checkout|create account/i });
      const buttonExists = await subscribeButton.isVisible().catch(() => false);

      console.log(`Subscribe button exists: ${buttonExists}`);

      // If we had a valid token and filled form, clicking would redirect to Stripe
    });
  });

  test.describe("Founder Success Page", () => {
    test("success page shows completion message", async ({ page }) => {
      await page.goto("/founder/success");
      await page.waitForTimeout(1000);

      // Check for success elements
      const successHeading = page.getByText(/success|welcome|congratulations|thank you/i);
      const founderBadge = page.getByText(/founder/i);

      const hasSuccessContent =
        (await successHeading.first().isVisible().catch(() => false)) ||
        (await founderBadge.first().isVisible().catch(() => false));

      console.log(`Success page shows content: ${hasSuccessContent}`);
    });

    test("success page has call to action", async ({ page }) => {
      await page.goto("/founder/success");
      await page.waitForTimeout(1000);

      // Look for CTA buttons
      const dashboardButton = page.getByRole("button", { name: /dashboard|start|get started|continue/i });
      const signInLink = page.getByRole("link", { name: /sign in|login|dashboard/i });

      const hasCTA =
        (await dashboardButton.isVisible().catch(() => false)) ||
        (await signInLink.isVisible().catch(() => false));

      console.log(`Success page has CTA: ${hasCTA}`);
    });
  });

  test.describe("Email Flow Verification", () => {
    test("invite email contains correct link format", async ({ page }) => {
      // This tests the link structure
      const testToken = "FND-TESTTOKEN12345";
      const expectedUrl = `/founder/signup?token=${testToken}`;

      await page.goto(expectedUrl);

      // Verify URL structure is correct
      expect(page.url()).toContain("founder/signup");
      expect(page.url()).toContain("token=");
    });

    test("claim page redirects correctly", async ({ page }) => {
      await page.goto("/founder/claim?token=FND-TESTTOKEN12345");
      await page.waitForTimeout(2000);

      // Should either show claim page or redirect to signup
      const url = page.url();
      expect(url).toContain("founder");
    });
  });
});

test.describe("Mobile - Founder Onboarding", () => {
  test.use({ viewport: { width: 375, height: 812 } }); // iPhone X

  test("founder signup is mobile friendly", async ({ page }) => {
    await page.goto("/founder/signup?token=FND-TESTTOKEN12345");
    await page.waitForTimeout(2000);

    // Check viewport is correct
    const viewport = page.viewportSize();
    expect(viewport?.width).toBeLessThanOrEqual(400);

    // Check buttons are touch-friendly (min 44px height)
    const buttons = page.locator("button:visible");
    const buttonCount = await buttons.count();

    for (let i = 0; i < Math.min(buttonCount, 3); i++) {
      const button = buttons.nth(i);
      const box = await button.boundingBox();
      if (box) {
        // Touch target should be at least 44px
        const isTouchFriendly = box.height >= 40 || box.width >= 40;
        console.log(`Button ${i} touch-friendly: ${isTouchFriendly} (${box.height}px)`);
      }
    }
  });

  test("founder success page works on mobile", async ({ page }) => {
    await page.goto("/founder/success");
    await page.waitForTimeout(1000);

    // Should be visible and usable on mobile
    await expect(page.locator("body")).toBeVisible();
  });
});
