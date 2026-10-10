/**
 * Journey 40 — demo mode (ELE-1856).
 *
 * Fixture (demo college) accounts never see the push-notification prompt, the
 * optional app-update banner, the cookie bar or the first-week checklist, so a
 * demo on a real phone shows only the product. The flag is cached so the
 * cookie bar can read it before anything else loads.
 */
import { test, expect } from '@playwright/test';
import { haveCreds, signedInPage } from './support';

test.skip(!haveCreds(), 'College fixture credentials are not available');

for (const size of ['desktop', 'phone'] as const) {
  for (const who of ['tutor', 'learner'] as const) {
    test(`demo mode hides the prompts for the ${who} (${size})`, async ({ browser }) => {
      test.setTimeout(90_000);
      const { context, page, errors } = await signedInPage(browser, who, size);
      try {
        const start = who === 'tutor' ? '/college' : '/apprentice/college-plan';
        await page.goto(start);
        await page.waitForLoadState('networkidle').catch(() => undefined);
        await expect
          .poll(() => page.evaluate(() => window.localStorage.getItem('em-demo-mode')), {
            message: 'the account is recognised as a demo account',
          })
          .toBe('1');
        await page.waitForTimeout(1500); // the push prompt appears after a delay
        await expect(page.getByText('Enable notifications')).toHaveCount(0);
        await expect(page.getByText(/Update available|new version/i)).toHaveCount(0);
        await expect(page.getByText('From Elec-Mate', { exact: false })).toHaveCount(0);
        // Cookie bar: the harness re-sets consent on every load, so the bar
        // can't be shown here. CookieConsent hides itself when isDemoMode()
        // reads this flag; check it survives a reload.
        await page.reload();
        await page.waitForLoadState('networkidle').catch(() => undefined);
        expect(await page.evaluate(() => window.localStorage.getItem('em-demo-mode'))).toBe('1');
        expect(errors).toEqual([]);
      } finally {
        await context.close();
      }
    });
  }
}
