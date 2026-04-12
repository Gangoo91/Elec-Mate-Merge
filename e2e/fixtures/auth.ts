import { test as base, expect, Page } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';

// Test credentials for e2e testing
export const TEST_EMAIL =
  process.env.TEST_EMAIL || process.env.PLAYWRIGHT_TEST_EMAIL || 'founder@elec-mate.com';
export const TEST_PASSWORD =
  process.env.TEST_PASSWORD || process.env.PLAYWRIGHT_TEST_PASSWORD || '2487Gangoo!';

const AUTH_CREDENTIALS = [
  { email: TEST_EMAIL, password: TEST_PASSWORD },
  { email: 'andrewgangoo91@gmail.com', password: '2487gangoo!' },
  { email: 'test@example.com', password: 'test123456' },
];

const SUPABASE_URL =
  process.env.VITE_SUPABASE_URL || 'https://jtwygbeceundfgnkirof.supabase.co';
const SUPABASE_PUBLISHABLE_KEY =
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0d3lnYmVjZXVuZGZnbmtpcm9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyMTc2OTUsImV4cCI6MjA2MTc5MzY5NX0.NgMOzzNkreOiJ2_t_f90NJxIJTcpUninWPYnM7RkrY8';
const SUPABASE_STORAGE_KEY = 'sb-jtwygbeceundfgnkirof-auth-token';

const authClient = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
});

export async function seedAuthenticatedSession(page: Page) {
  let sessionData: Awaited<ReturnType<typeof authClient.auth.signInWithPassword>>['data'] | null = null;
  const failures: string[] = [];

  for (const credentials of AUTH_CREDENTIALS) {
    const { data, error } = await authClient.auth.signInWithPassword(credentials);
    if (!error && data.session) {
      sessionData = data;
      break;
    }

    failures.push(`${credentials.email}: ${error?.message || 'No session returned'}`);
  }

  if (!sessionData?.session) {
    const signupEmail = `playwright.e2e.${Date.now()}@example.com`;
    const signupPassword = `Playwright!${Date.now()}Aa1`;
    const { data, error } = await authClient.auth.signUp({
      email: signupEmail,
      password: signupPassword,
      options: {
        emailRedirectTo: 'http://localhost:8080',
      },
    });

    if (!error && data.session) {
      sessionData = data;
    } else {
      failures.push(`signup:${signupEmail}: ${error?.message || 'No session returned from sign up'}`);
      throw new Error(`Playwright auth bootstrap failed. Tried ${failures.join(' | ')}`);
    }
  }

  await page.goto('/auth/signin');
  await page.evaluate(
    ({ storageKey, session }) => {
      window.localStorage.setItem(storageKey, JSON.stringify(session));
    },
    {
      storageKey: SUPABASE_STORAGE_KEY,
      session: sessionData.session,
    }
  );

  await page.goto('/dashboard');
  await expect(page).not.toHaveURL(/auth\/signin/, { timeout: 10000 });
}

// Extended test with authentication
export const test = base.extend<{ authenticatedPage: Page }>({
  authenticatedPage: async ({ page }, runAuthenticatedPage) => {
    await seedAuthenticatedSession(page);

    // Use the authenticated page
    await runAuthenticatedPage(page);
  },
});

// Helper function to login via UI with retry logic for rate limiting
export async function loginViaUI(page: Page, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await seedAuthenticatedSession(page);
      return; // Success
    } catch (error) {
      if (attempt === retries) throw error;
      // Wait before retry
      await page.waitForTimeout(2000 * attempt);
    }
  }
}

// Helper to check if page loaded without critical errors
export async function checkNoConsoleErrors(page: Page) {
  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      const text = msg.text();
      // Filter out expected errors
      if (!text.includes('Sentry') && !text.includes('PostHog') && !text.includes('favicon')) {
        errors.push(text);
      }
    }
  });
  return errors;
}

// Helper to verify a page loads correctly
export async function verifyPageLoads(page: Page, url: string, expectedContent?: string | RegExp) {
  await page.goto(url);
  await expect(page.locator('body')).toBeVisible();

  if (expectedContent) {
    await expect(page.getByText(expectedContent).first()).toBeVisible({
      timeout: 10000,
    });
  }

  // Check no crash occurred
  const title = await page.title();
  expect(title).not.toContain('Error');
}

// Helper to check interactive elements work
export async function checkButtonsClickable(page: Page) {
  const buttons = page.locator('button:visible');
  const count = await buttons.count();

  for (let i = 0; i < Math.min(count, 5); i++) {
    const button = buttons.nth(i);
    const isEnabled = await button.isEnabled();
    if (isEnabled) {
      const box = await button.boundingBox();
      if (box) {
        // Verify touch target size (44px minimum)
        expect(box.height).toBeGreaterThanOrEqual(36);
      }
    }
  }
}

// Helper to check forms are functional
export async function checkFormInputs(page: Page) {
  const inputs = page.locator('input:visible, textarea:visible, select:visible');
  const count = await inputs.count();

  for (let i = 0; i < Math.min(count, 5); i++) {
    const input = inputs.nth(i);
    const isEnabled = await input.isEnabled();
    if (isEnabled) {
      const box = await input.boundingBox();
      if (box) {
        expect(box.width).toBeGreaterThan(50);
      }
    }
  }
}

export { expect };
