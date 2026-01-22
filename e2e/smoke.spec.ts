import { test, expect } from "@playwright/test";

test.describe("Smoke Tests", () => {
  test("homepage loads successfully", async ({ page }) => {
    await page.goto("/");

    // Wait for app to be ready (adjust selector as needed)
    await expect(page.locator("body")).toBeVisible();

    // Check no critical errors in console
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    // Wait a bit for any async errors
    await page.waitForTimeout(2000);

    // Filter out expected errors (like missing env vars in test)
    const criticalErrors = errors.filter(
      (e) => !e.includes("Sentry") && !e.includes("PostHog")
    );
    expect(criticalErrors).toHaveLength(0);
  });

  test("page has correct title", async ({ page }) => {
    await page.goto("/");

    // Adjust expected title to match your app
    await expect(page).toHaveTitle(/Elec-Mate/i);
  });
});
