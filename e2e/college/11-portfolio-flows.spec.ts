/**
 * Journey 11 — portfolio flows a click deeper than the tour (journey 10).
 *
 * Opens what the tour cannot reach by URL alone: a learner's evidence detail,
 * the tutor's submission drawer, the tutor's EPA readiness area, and the
 * public shared-portfolio page for a short-lived link. The only row written is
 * that share link (and the view it logs); it is deleted by id at the end.
 * Screenshots go to PORTFOLIO_TOUR_SHOTS when it is set.
 */
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { test, expect, type Page } from '@playwright/test';
import { actor, haveCreds, learnerContext, signedInPage, RUN } from './support';

test.skip(!haveCreds(), 'College fixture credentials are not available');

const SHOTS = process.env.PORTFOLIO_TOUR_SHOTS;

async function shot(page: Page, name: string, phone: boolean) {
  await page.waitForTimeout(1200);
  if (SHOTS) {
    fs.mkdirSync(SHOTS, { recursive: true });
    await page.screenshot({ path: path.join(SHOTS, `${name}-${phone ? 'phone' : 'desk'}.png`), fullPage: true });
  }
  if (phone) {
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, `${name} overflows the phone by ${overflow}px`).toBeLessThanOrEqual(1);
  }
}

for (const viewport of ['desktop', 'phone'] as const) {
  const phone = viewport === 'phone';

  test(`learner evidence detail (${viewport})`, async ({ browser }) => {
    const l = await actor('learner');
    const { data } = await l.db
      .from('portfolio_items')
      .select('id')
      .eq('user_id', l.userId)
      .order('created_at', { ascending: false })
      .limit(4);
    const items = (data ?? []) as { id: string }[];
    expect(items.length, 'the fixture learner has evidence').toBeGreaterThan(0);
    const { page, errors } = await signedInPage(browser, 'learner', viewport);
    for (const [i, it] of items.entries()) {
      await page.goto(`/apprentice/hub?item=${it.id}`);
      await page.waitForLoadState('networkidle').catch(() => undefined);
      await shot(page, `f1-evidence-detail-${i}`, phone);
    }
    expect(errors).toEqual([]);
  });

  test(`tutor submission drawer and readiness (${viewport})`, async ({ browser }) => {
    const ctx = await learnerContext();
    const { page, errors } = await signedInPage(browser, 'tutor', viewport);
    await page.goto(`/college?section=student360&studentId=${ctx.student_id}`);
    await page.waitForLoadState('networkidle').catch(() => undefined);
    await shot(page, 'f0-student360-overview', phone);
    await page.goto(`/college?section=student360&studentId=${ctx.student_id}#portfolio`);
    await page.waitForLoadState('networkidle').catch(() => undefined);
    const row = page.getByRole('button', { name: /Submitted .* ago|Submitted (today|yesterday)/i }).first();
    await expect(row).toBeVisible();
    await row.click();
    await expect(page.getByText('Evidence sent').first()).toBeVisible();
    await shot(page, 'f2-submission-drawer', phone);
    await page.keyboard.press('Escape');

    await page.goto(`/college?section=student360&studentId=${ctx.student_id}#epa`);
    await page.waitForLoadState('networkidle').catch(() => undefined);
    await shot(page, 'f3-tutor-epa-readiness', phone);
    expect(errors).toEqual([]);
  });
}

test('shared portfolio page for a live link', async ({ browser }) => {
  const l = await actor('learner');
  const token = `e2e-${crypto.randomBytes(18).toString('hex')}`;
  const { data, error } = await l.db
    .from('portfolio_shares')
    .insert({
      user_id: l.userId,
      token,
      title: `${RUN} share`,
      is_active: true,
      expires_at: new Date(Date.now() + 86_400_000).toISOString(),
    } as never)
    .select('id')
    .single();
  expect(error, error?.message).toBeNull();
  const shareId = (data as { id: string }).id;
  try {
    for (const viewport of ['desktop', 'phone'] as const) {
      const context = await browser.newContext(
        viewport === 'phone'
          ? { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, locale: 'en-GB' }
          : { viewport: { width: 1440, height: 900 }, locale: 'en-GB' }
      );
      const page = await context.newPage();
      const errors: string[] = [];
      page.on('pageerror', (e) => errors.push(String(e).slice(0, 300)));
      await page.goto(`/view/${token}`);
      await page.waitForLoadState('networkidle').catch(() => undefined);
      await expect(page.getByText(/Assessment record/i).first()).toBeVisible();
      await shot(page, 'f4-shared-view', viewport === 'phone');
      expect(errors).toEqual([]);
      await context.close();
    }
  } finally {
    await l.db.from('portfolio_shares').delete().eq('id', shareId);
  }
});
