/**
 * Journey 14 — lesson plans, every screen, read-only.
 *
 * As the fixture tutor: the list, a generated plan, teach mode, slides and
 * print, plus the new-plan sheet, on desktop and phone. Fails on a page error
 * or phone overflow. Screenshots go to PORTFOLIO_TOUR_SHOTS when set.
 */
import fs from 'node:fs';
import path from 'node:path';
import { test, expect, type Page } from '@playwright/test';
import { actor, haveCreds, signedInPage } from './support';

test.skip(!haveCreds(), 'College fixture credentials are not available');
const SHOTS = process.env.PORTFOLIO_TOUR_SHOTS;

async function shot(page: Page, name: string, phone: boolean) {
  await page.waitForLoadState('networkidle').catch(() => undefined);
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
  test(`lesson plan screens (${viewport})`, async ({ browser }) => {
    const phone = viewport === 'phone';
    const t = await actor('tutor');
    const { data } = await t.db
      .from('college_lesson_plans')
      .select('id')
      .not('content', 'is', null)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    const id = (data as { id: string } | null)?.id;
    const { page, errors } = await signedInPage(browser, 'tutor', viewport);
    await page.goto('/college?section=lessonplans');
    await shot(page, 'les1-list', phone);
    const newPlan = page.getByRole('button', { name: /New plan/ }).first();
    if (await newPlan.isVisible().catch(() => false)) {
      await newPlan.click();
      await shot(page, 'les2-new-plan', phone);
      await page.keyboard.press('Escape');
    }
    if (id) {
      await page.goto(`/college/lessons/${id}`);
      await shot(page, 'les3-plan', phone);
      await page.goto(`/college/lessons/${id}/deliver`);
      await shot(page, 'les4-deliver', phone);
      await page.goto(`/college/lessons/${id}/slides`);
      await shot(page, 'les5-slides', phone);
      await page.goto(`/college/lessons/${id}/print`);
      await shot(page, 'les6-print', phone);
    }
    expect(errors).toEqual([]);
  });
}
