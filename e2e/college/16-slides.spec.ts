/**
 * Journey 16 — the slide deck for a lesson plan, as the fixture tutor.
 *
 * Opens /college/lessons/:id/slides for a plan with content and screenshots
 * the deck overview, one slide in edit mode, presenter mode (with the notes
 * view) and the PowerPoint download, on desktop (1440) and phone (390).
 *
 * Building a deck calls the AI (it costs money), so it only runs when
 * RUN_SLIDES_BUILD=1, and then only on a plan with content and no deck yet.
 * A normal run views an existing deck and never writes.
 *
 * Screenshots go to SLIDES_SHOTS (or PORTFOLIO_TOUR_SHOTS) when set.
 * SLIDES_PLAN_ID pins the plan.
 */
import fs from 'node:fs';
import path from 'node:path';
import { test, expect, type Page } from '@playwright/test';
import { actor, haveCreds, signedInPage } from './support';

test.skip(!haveCreds(), 'College fixture credentials are not available');
const SHOTS = process.env.SLIDES_SHOTS || process.env.PORTFOLIO_TOUR_SHOTS;
const BUILD = process.env.RUN_SLIDES_BUILD === '1';

async function shot(page: Page, name: string, phone: boolean, fullPage = true) {
  await page.waitForLoadState('networkidle').catch(() => undefined);
  await page.waitForTimeout(900);
  if (SHOTS) {
    fs.mkdirSync(SHOTS, { recursive: true });
    await page.screenshot({
      path: path.join(SHOTS, `sl-${name}-${phone ? 'phone' : 'desk'}.png`),
      fullPage,
    });
  }
  if (phone) {
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    expect(overflow, `${name} overflows the phone by ${overflow}px`).toBeLessThanOrEqual(1);
  }
}

interface PlanPick {
  id: string;
  slides: number;
}

async function pickPlan(): Promise<PlanPick | null> {
  const t = await actor('tutor');
  const pinned = process.env.SLIDES_PLAN_ID;
  const q = t.db
    .from('college_lesson_plans')
    .select('id, slide_deck_json')
    .not('content', 'is', null)
    .order('created_at', { ascending: false })
    .limit(30);
  const { data, error } = pinned ? await q.eq('id', pinned) : await q;
  if (error) throw error;
  const rows = (
    (data ?? []) as Array<{ id: string; slide_deck_json: { slides?: unknown[] } | null }>
  ).map((r) => ({ id: r.id, slides: r.slide_deck_json?.slides?.length ?? 0 }));
  if (pinned) return rows[0] ?? null;
  if (BUILD) return rows.find((r) => r.slides === 0) ?? null;
  return rows.find((r) => r.slides > 0) ?? null;
}

test.describe.configure({ mode: 'serial' });

let plan: PlanPick | null = null;

test.beforeAll(async () => {
  plan = await pickPlan();
});

test('build the deck when asked (RUN_SLIDES_BUILD=1)', async ({ browser }) => {
  test.skip(!BUILD, 'Set RUN_SLIDES_BUILD=1 to build a deck (calls the AI)');
  test.skip(!plan, 'No plan with content to build from');
  test.setTimeout(420_000);
  const { page, errors } = await signedInPage(browser, 'tutor', 'desktop');
  await page.goto(`/college/lessons/${plan!.id}/slides`);
  if (plan!.slides === 0) {
    await page
      .getByRole('button', { name: /Build the slide deck/ })
      .first()
      .click();
    await shot(page, '0-preflight', false, false);
    await page.getByRole('button', { name: /^Generate \d+ slides$/ }).click();
    await page.waitForTimeout(2500);
    await shot(page, '0-building', false, false);
    await expect(page.getByTestId('slide-thumb').first()).toBeVisible({ timeout: 300_000 });
    // Let the photos stream in before the screenshot.
    await page.waitForTimeout(60_000);
    await shot(page, '0-built', false);
  }
  expect(errors).toEqual([]);
});

for (const viewport of ['desktop', 'phone'] as const) {
  test(`slide deck screens (${viewport})`, async ({ browser }) => {
    test.skip(!plan, 'No plan with a deck');
    test.setTimeout(180_000);
    const phone = viewport === 'phone';
    const { page, errors } = await signedInPage(browser, 'tutor', viewport);
    await page.goto(`/college/lessons/${plan!.id}/slides`);
    const thumbs = page.getByTestId('slide-thumb');
    await expect(thumbs.first()).toBeVisible({ timeout: 30_000 });
    await shot(page, '1-overview', phone);

    // Find the regulation slide while the grid is showing.
    const n = await thumbs.count();
    const regIndex = await page.evaluate(() =>
      Array.from(document.querySelectorAll('[data-testid="slide-thumb"]')).findIndex((el) =>
        /Regulation/.test(el.getAttribute('aria-label') ?? '')
      )
    );

    const activityIndex = await page.evaluate(() =>
      Array.from(document.querySelectorAll('[data-testid="slide-thumb"]')).findIndex((el) =>
        /Activity/.test(el.getAttribute('aria-label') ?? '')
      )
    );

    // Edit mode: open the second slide (the first is the title).
    await thumbs.nth(Math.min(1, n - 1)).click();
    await expect(page.getByTestId('slide-editor')).toBeVisible();
    await shot(page, '2-edit', phone);

    // The regulation slide, if the deck has one.
    if (regIndex >= 0) {
      await page.getByTestId('slide-jump').nth(regIndex).click();
      await expect(page.getByText(`Slide ${regIndex + 1} of ${n}`)).toBeVisible();
      await shot(page, '2b-edit-reg', phone);
    }

    // Regenerate-with-a-note sheet (opened, never submitted).
    await page
      .getByRole('button', { name: /^Regenerate/ })
      .first()
      .click();
    await expect(page.getByText('What should change?')).toBeVisible();
    await shot(page, '3-regenerate', phone, false);
    await page.keyboard.press('Escape');

    // Present mode, then the presenter view with notes, next slide and timer.
    await page
      .getByRole('button', { name: /^Present/ })
      .first()
      .click();
    const stage = page.getByTestId('present-stage');
    await expect(stage).toBeVisible();
    await shot(page, '4-present', phone, false);
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await shot(page, '4b-present-next', phone, false);
    if (activityIndex >= 0 && !phone) {
      // The activity countdown: T starts it on an activity slide.
      await page.keyboard.press('Home');
      for (let i = 0; i < activityIndex; i++) await page.keyboard.press('ArrowRight');
      await page.keyboard.press('t');
      await page.waitForTimeout(2200);
      await expect(page.getByText('Time left')).toBeVisible();
      await shot(page, '4c-activity-timer', phone, false);
    }
    if (!phone) {
      await page.keyboard.press('n');
      await expect(page.getByTestId('presenter-notes')).toBeVisible();
      await shot(page, '5-presenter-view', phone, false);
      // Walk the whole deck in presenter view to catch a slide that breaks.
      for (let i = 0; i < n; i++) await page.keyboard.press('ArrowRight');
      await shot(page, '5b-presenter-last', phone, false);
    } else {
      await page.getByRole('button', { name: /Notes/ }).click();
      await expect(page.getByTestId('presenter-notes')).toBeVisible();
      await shot(page, '5-presenter-view', phone, false);
    }
    await page.keyboard.press('Escape');
    await expect(stage).toBeHidden();

    // Download: a real .pptx (a zip) with one slide per deck slide.
    const [download] = await Promise.all([
      page.waitForEvent('download', { timeout: 90_000 }),
      page
        .getByRole('button', { name: /Download PowerPoint/ })
        .first()
        .click(),
    ]);
    expect(download.suggestedFilename()).toMatch(/\.pptx$/);
    const file = await download.path();
    const head = fs.readFileSync(file).subarray(0, 2).toString('latin1');
    expect(head).toBe('PK');
    if (SHOTS) fs.copyFileSync(file, path.join(SHOTS, `deck-${viewport}.pptx`));
    await shot(page, '6-after-download', phone, false);

    expect(errors).toEqual([]);
  });
}
