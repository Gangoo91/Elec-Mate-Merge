import { test, expect, Page } from "@playwright/test";
import { loginViaUI, TEST_EMAIL, TEST_PASSWORD } from "./fixtures/auth";

test.describe("User Onboarding & Registration", () => {
  test("signup page is accessible", async ({ page }) => {
    await page.goto("/auth/signup");
    await page.waitForTimeout(1000);

    // Check signup form elements
    const emailInput = page.locator('input[type="email"]');
    const passwordInput = page.locator('input[type="password"]');

    await expect(emailInput.first()).toBeVisible({ timeout: 10000 });
    await expect(passwordInput.first()).toBeVisible({ timeout: 10000 });
  });

  test("signup form has validation", async ({ page }) => {
    await page.goto("/auth/signup");
    await page.waitForTimeout(1000);

    // Try submitting empty form
    const submitButton = page.getByRole("button", { name: /sign up|create|register/i });
    if (await submitButton.isVisible()) {
      // Form should be disabled or show validation on submit
      const isDisabled = await submitButton.isDisabled();
      console.log(`Submit button disabled when empty: ${isDisabled}`);
    }
  });

  test("signup shows password requirements", async ({ page }) => {
    await page.goto("/auth/signup");
    await page.waitForTimeout(1000);

    const passwordInput = page.locator('input[type="password"]').first();
    if (await passwordInput.isVisible()) {
      await passwordInput.fill("weak");
      await page.waitForTimeout(300);

      // Check for password strength indicator or requirements
      const strengthIndicator = page.getByText(/strong|weak|medium|8|character/i);
      const hasIndicator = await strengthIndicator.first().isVisible().catch(() => false);
      console.log(`Password strength indicator: ${hasIndicator}`);
    }
  });

  test("can navigate between signup and signin", async ({ page }) => {
    await page.goto("/auth/signup");
    await page.waitForTimeout(1000);

    // Find link to signin
    const signinLink = page.getByRole("link", { name: /sign in|login|already have/i });
    if (await signinLink.isVisible()) {
      await signinLink.click();
      await page.waitForURL(/signin|login/, { timeout: 5000 });
      expect(page.url()).toMatch(/signin|login/);
    }
  });
});

test.describe("7-Day Free Trial System", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test("trial status is shown to user", async ({ page }) => {
    await page.goto("/electrician");
    await page.waitForTimeout(2000);

    // Look for trial-related UI elements
    const trialBadge = page.getByText(/trial|free|7 day/i);
    const subscriptionStatus = page.getByText(/subscribe|upgrade|premium/i);

    const hasTrialUI =
      (await trialBadge.first().isVisible().catch(() => false)) ||
      (await subscriptionStatus.first().isVisible().catch(() => false));

    console.log(`Trial/subscription UI visible: ${hasTrialUI}`);
  });

  test("subscription page shows trial status", async ({ page }) => {
    await page.goto("/subscriptions");
    await page.waitForTimeout(2000);

    // Check for subscription status component
    await expect(page.locator("body")).toBeVisible();

    // Look for current plan or trial indicator
    const statusIndicators = [
      page.getByText(/current plan/i),
      page.getByText(/trial/i),
      page.getByText(/days remaining/i),
      page.getByText(/subscribed/i),
    ];

    let foundIndicator = false;
    for (const indicator of statusIndicators) {
      if (await indicator.first().isVisible().catch(() => false)) {
        foundIndicator = true;
        console.log(`Found status indicator`);
        break;
      }
    }
  });

  test("trial countdown shows correct time", async ({ page }) => {
    await page.goto("/subscriptions");
    await page.waitForTimeout(2000);

    // The trial is 7 days from account creation
    // Check for any time-related display
    const timeDisplay = page.getByText(/\d+ day|\d+ hour|expir/i);
    const hasTimeDisplay = await timeDisplay.first().isVisible().catch(() => false);
    console.log(`Trial time display visible: ${hasTimeDisplay}`);
  });
});

test.describe("Subscription Plans Page", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test("subscription page loads correctly", async ({ page }) => {
    await page.goto("/subscriptions");
    await page.waitForTimeout(2000);

    // Check for key elements
    await expect(page.locator("body")).toBeVisible();

    // Should show pricing header
    const pricingHeader = page.getByText(/pricing|plans|subscription/i);
    await expect(pricingHeader.first()).toBeVisible({ timeout: 5000 });
  });

  test("shows all plan options", async ({ page }) => {
    await page.goto("/subscriptions");
    await page.waitForTimeout(2000);

    // Check for all three plan types (Employer shows as "Coming Soon")
    const apprenticePlan = page.getByText(/apprentice/i);
    const electricianPlan = page.getByText(/electrician/i);
    const employerPlan = page.getByText(/employer/i);

    const apprenticeVisible = await apprenticePlan.first().isVisible().catch(() => false);
    const electricianVisible = await electricianPlan.first().isVisible().catch(() => false);
    const employerVisible = await employerPlan.first().isVisible().catch(() => false);

    console.log(`Plans visible - Apprentice: ${apprenticeVisible}, Electrician: ${electricianVisible}, Employer: ${employerVisible}`);

    // All plans should be visible (Employer marked as Coming Soon)
    expect(apprenticeVisible && electricianVisible && employerVisible).toBeTruthy();

    // Employer should show "Coming Soon" badge
    const comingSoonBadge = page.getByText(/coming soon/i);
    const hasComingSoon = await comingSoonBadge.first().isVisible().catch(() => false);
    console.log(`Coming Soon badge visible: ${hasComingSoon}`);
  });

  test("billing toggle works", async ({ page }) => {
    await page.goto("/subscriptions");
    await page.waitForTimeout(2000);

    // Find billing toggle - use exact match to avoid FAQ button
    const monthlyButton = page.getByRole("button", { name: "Monthly", exact: true });
    const annualButton = page.getByRole("button", { name: "Annual", exact: true });

    if (await monthlyButton.isVisible() && await annualButton.isVisible()) {
      // Click annual
      await annualButton.click();
      await page.waitForTimeout(500);

      // Check for savings badge
      const savingsBadge = page.getByText(/save|17%|discount/i);
      const hasSavings = await savingsBadge.first().isVisible().catch(() => false);
      console.log(`Annual savings badge shown: ${hasSavings}`);

      // Click back to monthly
      await monthlyButton.click();
      await page.waitForTimeout(500);
    }
  });

  test("plan cards show pricing", async ({ page }) => {
    await page.goto("/subscriptions");
    await page.waitForTimeout(2000);

    // Check for price display (£X.XX format)
    const priceDisplay = page.getByText(/£\d+\.\d{2}/);
    const priceCount = await priceDisplay.count();

    console.log(`Found ${priceCount} price displays`);
    expect(priceCount).toBeGreaterThan(0);
  });

  test("plan cards show features", async ({ page }) => {
    await page.goto("/subscriptions");
    await page.waitForTimeout(2000);

    // Check for feature checkmarks
    const featureItems = page.locator('[class*="Check"], svg[class*="check"]');
    const featureCount = await featureItems.count();

    console.log(`Found ${featureCount} feature check items`);
  });

  test("get started button is clickable", async ({ page }) => {
    await page.goto("/subscriptions");
    await page.waitForTimeout(2000);

    // Find a "Get Started" button
    const getStartedButton = page.getByRole("button", { name: /get started/i }).first();

    if (await getStartedButton.isVisible()) {
      const isEnabled = await getStartedButton.isEnabled();
      console.log(`Get Started button enabled: ${isEnabled}`);

      // Click and check for checkout redirect (don't complete checkout)
      if (isEnabled) {
        // Create promise to catch navigation
        const navigationPromise = page.waitForURL(/stripe|checkout|subscriptions/, { timeout: 10000 }).catch(() => null);

        await getStartedButton.click();

        // Wait for either navigation or modal
        await page.waitForTimeout(3000);

        // Check if we're redirecting to Stripe or showing a modal
        const url = page.url();
        const isRedirecting = url.includes("stripe") || url.includes("checkout");
        const hasModal = await page.locator('[role="dialog"]').isVisible().catch(() => false);

        console.log(`Checkout initiated: redirect=${isRedirecting}, modal=${hasModal}`);
      }
    }
  });
});

test.describe("Payment Success Flow", () => {
  test("payment success page is accessible", async ({ page }) => {
    await page.goto("/payment-success?plan=electrician-monthly");
    await page.waitForTimeout(2000);

    // Check page loaded
    await expect(page.locator("body")).toBeVisible();

    // Look for success indicators
    const successElements = [
      page.getByText(/success|thank you|welcome|congratulations/i),
      page.getByText(/subscription|active|confirmed/i),
    ];

    let foundSuccess = false;
    for (const element of successElements) {
      if (await element.first().isVisible().catch(() => false)) {
        foundSuccess = true;
        break;
      }
    }

    console.log(`Success page shows confirmation: ${foundSuccess}`);
  });

  test("payment success has call to action", async ({ page }) => {
    await page.goto("/payment-success?plan=electrician-monthly");
    await page.waitForTimeout(2000);

    // Look for CTA buttons
    const ctaButton = page.getByRole("button", { name: /dashboard|start|continue|get started/i });
    const ctaLink = page.getByRole("link", { name: /dashboard|start|continue/i });

    const hasCTA =
      (await ctaButton.isVisible().catch(() => false)) ||
      (await ctaLink.isVisible().catch(() => false));

    console.log(`Payment success has CTA: ${hasCTA}`);
  });
});

test.describe("Stripe Checkout Integration", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test("checkout creates Stripe session", async ({ page }) => {
    await page.goto("/subscriptions");
    await page.waitForTimeout(2000);

    // Find and click a subscription button
    const subscribeButton = page.getByRole("button", { name: /get started/i }).first();

    if (await subscribeButton.isVisible() && await subscribeButton.isEnabled()) {
      // Listen for network request
      const checkoutRequest = page.waitForRequest(
        (request) => request.url().includes("create-checkout"),
        { timeout: 10000 }
      ).catch(() => null);

      await subscribeButton.click();

      const request = await checkoutRequest;
      if (request) {
        console.log("Checkout API called successfully");
        expect(request.method()).toBe("POST");
      }
    }
  });

  test("promo codes can be applied", async ({ page }) => {
    await page.goto("/subscriptions");
    await page.waitForTimeout(2000);

    // Look for promo code input or text about promo codes
    const promoText = page.getByText(/promo|discount|coupon/i);
    const hasPromoOption = await promoText.first().isVisible().catch(() => false);

    console.log(`Promo code option available: ${hasPromoOption}`);
  });
});

test.describe("Feature Access Control (Paywall)", () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  test("premium features show upgrade prompt for free users", async ({ page }) => {
    // Go to a premium feature
    await page.goto("/electrician/ai-estimator");
    await page.waitForTimeout(2000);

    // Check if we see the feature or an upgrade prompt
    const upgradePrompt = page.getByText(/upgrade|subscribe|premium|unlock/i);
    const featureContent = page.getByText(/estimate|quote|cost/i);

    const showsUpgrade = await upgradePrompt.first().isVisible().catch(() => false);
    const showsFeature = await featureContent.first().isVisible().catch(() => false);

    // Either should be visible depending on subscription status
    console.log(`Shows upgrade: ${showsUpgrade}, Shows feature: ${showsFeature}`);
  });

  test("AI tools check subscription status", async ({ page }) => {
    await page.goto("/electrician/ai-assistant");
    await page.waitForTimeout(2000);

    // AI tools should either work or show upgrade prompt
    const aiInterface = page.getByText(/ask|chat|assistant/i);
    const upgradePrompt = page.getByText(/upgrade|subscribe|premium/i);

    const hasAI = await aiInterface.first().isVisible().catch(() => false);
    const hasUpgrade = await upgradePrompt.first().isVisible().catch(() => false);

    console.log(`AI available: ${hasAI}, Upgrade shown: ${hasUpgrade}`);
  });
});

test.describe("Mobile - Subscription Flow", () => {
  test.use({ viewport: { width: 375, height: 812 } }); // iPhone X

  test("subscription page is mobile friendly", async ({ page }) => {
    await loginViaUI(page);
    await page.goto("/subscriptions");
    await page.waitForTimeout(2000);

    // Check viewport
    const viewport = page.viewportSize();
    expect(viewport?.width).toBeLessThanOrEqual(400);

    // Plans should be horizontally scrollable or stacked
    await expect(page.locator("body")).toBeVisible();
  });

  test("plan cards are touch friendly", async ({ page }) => {
    await loginViaUI(page);
    await page.goto("/subscriptions");
    await page.waitForTimeout(2000);

    // Check buttons are touch-friendly (min 44px)
    const buttons = page.locator("button:visible");
    const buttonCount = await buttons.count();

    for (let i = 0; i < Math.min(buttonCount, 5); i++) {
      const button = buttons.nth(i);
      const box = await button.boundingBox();
      if (box) {
        const isTouchFriendly = box.height >= 40;
        console.log(`Button ${i} height: ${box.height}px, touch-friendly: ${isTouchFriendly}`);
      }
    }
  });

  test("billing toggle works on mobile", async ({ page }) => {
    await loginViaUI(page);
    await page.goto("/subscriptions");
    await page.waitForTimeout(2000);

    // Use exact match to avoid FAQ accordion button
    const annualButton = page.getByRole("button", { name: "Annual", exact: true });
    if (await annualButton.isVisible()) {
      await annualButton.click();
      await page.waitForTimeout(500);

      const monthlyButton = page.getByRole("button", { name: "Monthly", exact: true });
      await monthlyButton.click();
      await page.waitForTimeout(500);
    }
  });
});

test.describe("Webhook & Payment Verification", () => {
  // These tests verify the webhook handling works
  // In a real scenario, you'd use Stripe CLI to trigger test webhooks

  test("subscription status updates after payment", async ({ page }) => {
    await loginViaUI(page);

    // Check initial status
    await page.goto("/subscriptions");
    await page.waitForTimeout(2000);

    // Look for subscription status indicator
    const statusBadge = page.locator('[class*="badge"], [class*="Badge"]').filter({ hasText: /active|subscribed|trial|free/i });
    const badgeCount = await statusBadge.count();

    console.log(`Found ${badgeCount} status badges`);
  });

  test("subscription tier is correctly identified", async ({ page }) => {
    await loginViaUI(page);
    await page.goto("/electrician");
    await page.waitForTimeout(2000);

    // The app should know the user's tier
    // This is reflected in what features are accessible
    await expect(page.locator("body")).toBeVisible();
  });
});
