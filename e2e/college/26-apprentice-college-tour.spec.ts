/**
 * Journey 26 — the apprentice's side of college, every screen, read-only.
 *
 * As the fixture learner: the college home ("Do next"), each section page,
 * a quiz set by the tutor, and the sheets a learner opens from them, on
 * desktop and phone. Nothing is submitted: OTJ verifications and portfolio
 * submissions are append-only, so the tour opens sheets and closes them.
 * Fails on a page error or phone overflow. Screenshots go to
 * PORTFOLIO_TOUR_SHOTS when set.
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
    await page.screenshot({
      path: path.join(SHOTS, `${name}-${phone ? 'phone' : 'desk'}.png`),
      fullPage: true,
    });
  }
  if (phone) {
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    expect(overflow, `${name} overflows the phone by ${overflow}px`).toBeLessThanOrEqual(1);
  }
}

/** Opens whatever `name` matches, screenshots it, then closes the sheet. */
async function openAndShoot(page: Page, name: RegExp, shotName: string, phone: boolean) {
  const target = page.getByRole('button', { name }).first();
  if (!(await target.isVisible().catch(() => false))) return false;
  await target.click();
  await page.waitForTimeout(600);
  await shot(page, shotName, phone);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(400);
  return true;
}

/**
 * A form sheet that should be wide: on desktop its body spans more than a
 * narrow column, and on any screen its primary button is on screen and 44px+
 * without scrolling. Opens it, checks, screenshots and closes it.
 */
async function openWideSheet(
  page: Page,
  name: RegExp,
  primary: RegExp,
  shotName: string,
  phone: boolean
) {
  const target = page.getByRole('button', { name }).first();
  await expect(target, `${shotName}: the button that opens it`).toBeVisible();
  await target.click();
  const dialog = page.getByRole('dialog').first();
  await expect(dialog).toBeVisible();
  await page.waitForTimeout(600);
  const save = dialog.getByRole('button', { name: primary }).first();
  await expect(save).toBeInViewport();
  const box = await save.boundingBox();
  expect(box?.height ?? 0, `${shotName}: save button height`).toBeGreaterThanOrEqual(44);
  if (!phone) {
    const width = await dialog.evaluate((d) =>
      Math.max(
        0,
        ...Array.from(d.querySelectorAll('div'))
          .filter((x) => /mx-auto w-full/.test(x.className))
          .map((x) => x.getBoundingClientRect().width)
      )
    );
    expect(width, `${shotName} is narrow on desktop`).toBeGreaterThan(900);
  }
  await shot(page, shotName, phone);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(400);
}

const SECTIONS = [
  'today',
  'plan',
  'progress',
  'activities',
  'epa',
  'voice',
  'compliance',
  'activity',
];

for (const viewport of ['desktop', 'phone'] as const) {
  test(`apprentice college screens (${viewport})`, async ({ browser }) => {
    const phone = viewport === 'phone';
    const l = await actor('learner');
    const { data: quiz } = await l.db
      .from('tutor_quizzes')
      .select('id')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    const quizId = (quiz as { id: string } | null)?.id;

    const { page, errors } = await signedInPage(browser, 'learner', viewport);

    // The bare /apprentice/college lands on the college home.
    await page.goto('/apprentice/college');
    await expect(page).toHaveURL(/\/apprentice\/college-plan/);
    await shot(page, 'app1-home', phone);

    // Every Do next row lands somewhere real. Tap each, screenshot where it
    // lands (nothing is saved), and come back.
    const rows = page.locator('section[aria-labelledby="do-next-title"] li button');
    const n = await rows.count();
    expect(n, 'the fixture learner has things to do').toBeGreaterThan(0);
    // Criteria read in words: no row leads with a bare code ("for 022 AC 2.1").
    const rowText = (await rows.allInnerTexts()).join('\n');
    expect(rowText).not.toMatch(/evidence for \S+ AC \d/i);
    for (let i = 0; i < n; i++) {
      await page.goto('/apprentice/college-plan');
      await page.locator('section[aria-labelledby="do-next-title"] li button').nth(i).click();
      await page.waitForTimeout(800);
      const sheetOpen = await page
        .getByRole('dialog')
        .first()
        .isVisible()
        .catch(() => false);
      const moved = !/\/apprentice\/college-plan$/.test(page.url());
      expect(sheetOpen || moved, `Do next row ${i} goes nowhere`).toBe(true);
      await shot(page, `app1-donext-${i}`, phone);
      await page.keyboard.press('Escape');
    }

    for (const [i, s] of SECTIONS.entries()) {
      await page.goto(`/apprentice/college/${s}`);
      await shot(page, `app${i + 2}-${s}`, phone);
      if (s === 'plan') {
        // A goal opens its sheet; the thread opens the message sheet.
        await openWideSheet(
          page,
          /Capture evidence|Finish the Level 3/i,
          /^Send reply$/,
          'app3b-goal-sheet',
          phone
        );
        // Suggesting a goal: opened and closed, never sent.
        await openWideSheet(
          page,
          /^Suggest a goal$/i,
          /^Send to tutor$/,
          'app3d-propose-goal',
          phone
        );
        await openAndShoot(
          page,
          /Open conversation|Read and reply|Message your tutor/i,
          'app3c-message',
          phone
        );
      }
      if (s === 'activities') {
        await openAndShoot(page, /^Log work activity$/i, 'app5b-log-hours', phone);
      }
      if (s === 'progress') {
        await openAndShoot(page, /Ask a witness to sign/i, 'app4b-witness', phone);
      }
      if (s === 'voice') {
        // The reflection sheet: opened and closed, never saved.
        await openWideSheet(page, /Capture today/i, /^Save reflection$/, 'app7b-reflection', phone);
      }
    }

    if (quizId) {
      await page.goto(`/apprentice/college/quiz/${quizId}`);
      await shot(page, 'app10-quiz', phone);
    }

    expect(errors).toEqual([]);
  });
}
