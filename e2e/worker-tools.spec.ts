import { test, expect } from '@playwright/test';
import { loginViaUI } from './fixtures/auth';

/**
 * Worker Tools routed pages — smoke coverage.
 *
 * After the bottom-sheet → routed-page rebuild, every tool is its own URL under
 * /electrician/worker-tools/*. These tests assert each route renders without
 * crashing (no error boundary, no blank screen) — regression protection so a
 * future change can't silently break a page the way the old sheets could.
 *
 * NOTE: pages render fully for a dev-whitelisted / team-linked account; other
 * accounts are redirected to the hub by the shell's access guard. The assertions
 * are intentionally lenient (render, no crash) rather than data-specific.
 */

const HUB = '/electrician/worker-tools';

const ROUTES = [
  '', // hub
  '/status',
  '/timesheets',
  '/pay',
  '/leave',
  '/comms',
  '/jobs',
  '/tasks',
  '/signoffs',
  '/credentials',
  '/equipment',
  '/progress-notes',
  '/expenses',
  '/reports',
  '/qs-reviews',
];

test.describe('Worker Tools pages', () => {
  test.beforeEach(async ({ page }) => {
    await loginViaUI(page);
  });

  for (const route of ROUTES) {
    const path = `${HUB}${route}`;
    test(`renders ${path}`, async ({ page }) => {
      const consoleErrors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
      });

      await page.goto(path);
      await expect(page.locator('body')).toBeVisible();
      await page.waitForTimeout(1500);

      // No React error boundary / blank crash.
      await expect(page.getByText(/something went wrong|application error/i)).toHaveCount(0);

      // Either the page rendered its own chrome, or the access guard sent us to
      // the hub — both are valid; a 500/blank is not.
      await expect(page.getByText(/worker tools|hello|join your team/i).first()).toBeVisible({
        timeout: 10000,
      });

      // Ignore noisy third-party + expected-auth console errors.
      const critical = consoleErrors.filter(
        (e) => !/sentry|posthog|favicon|manifest|websocket|realtime|service worker/i.test(e)
      );
      expect(critical).toHaveLength(0);
    });
  }
});
