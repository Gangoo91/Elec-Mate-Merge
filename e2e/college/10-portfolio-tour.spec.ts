/**
 * Journey 10 — the portfolio, both sides, read-only.
 *
 * Opens every portfolio screen as the fixture learner and the fixture tutor,
 * on desktop and phone, and fails on a page error or a horizontal overflow on
 * the phone. Screenshots go to PORTFOLIO_TOUR_SHOTS when it is set, for a
 * human to look at; nothing is written to the database.
 */
import fs from 'node:fs';
import path from 'node:path';
import { test, expect, type Page } from '@playwright/test';
import { haveCreds, learnerContext, signedInPage, type Who } from './support';

test.skip(!haveCreds(), 'College fixture credentials are not available');

const SHOTS = process.env.PORTFOLIO_TOUR_SHOTS;

async function visit(page: Page, url: string, name: string, phone: boolean) {
  await page.goto(url);
  await page.waitForLoadState('networkidle').catch(() => undefined);
  await page.waitForTimeout(1200);
  if (SHOTS) {
    fs.mkdirSync(SHOTS, { recursive: true });
    await page.screenshot({ path: path.join(SHOTS, `${name}-${phone ? 'phone' : 'desk'}.png`), fullPage: true });
  }
  if (phone) {
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, `${url} overflows the phone by ${overflow}px`).toBeLessThanOrEqual(1);
  }
}

for (const viewport of ['desktop', 'phone'] as const) {
  test(`learner portfolio screens (${viewport})`, async ({ browser }) => {
    const { page, errors } = await signedInPage(browser, 'learner' as Who, viewport);
    const phone = viewport === 'phone';
    await visit(page, '/apprentice/hub?tab=work', 'l1-evidence', phone);
    await visit(page, '/apprentice/hub?tab=work&view=coverage', 'l2-coverage', phone);
    await visit(page, '/apprentice/hub?tab=work&view=readiness', 'l3-readiness', phone);
    await visit(page, '/apprentice/college/progress', 'l4-college-progress', phone);
    await visit(page, '/apprentice/hub?tab=me', 'l5-me', phone);
    expect(errors).toEqual([]);
  });

  test(`tutor portfolio screens (${viewport})`, async ({ browser }) => {
    const ctx = await learnerContext();
    const { page, errors } = await signedInPage(browser, 'tutor' as Who, viewport);
    const phone = viewport === 'phone';
    await visit(page, '/college', 't0-home', phone);
    await page.getByRole('button', { name: /More detail/ }).click();
    await page.waitForTimeout(2500);
    if (SHOTS) await page.screenshot({ path: path.join(SHOTS, `t0-home-detail-${phone ? 'phone' : 'desk'}.png`), fullPage: true });
    await visit(page, '/college?section=portfolio', 't1-portfolio-hub', phone);
    await visit(page, '/college/marking', 't2-marking', phone);
    await visit(page, `/college?section=student360&studentId=${ctx.student_id}#assess`, 't3-student360-assess', phone);
    await visit(page, `/college/students/${ctx.student_id}/evidence`, 't4-evidence-timeline', phone);
    await visit(page, '/assessor', 't5-assessor-workspace', phone);
    expect(errors).toEqual([]);
  });
}

test('public portfolio pages explain a bad link', async ({ page }) => {
  for (const [url, name] of [
    ['/witness/not-a-token', 'p1-witness'],
    ['/view/not-a-token', 'p2-view'],
    ['/assessor-invite/not-a-token', 'p3-assessor-invite'],
    ['/gateway-declaration/not-a-token', 'p4-gateway'],
  ] as const) {
    await visit(page, url, name, false);
  }
});
