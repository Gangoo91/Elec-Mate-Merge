/**
 * Journey 22 — teaching and curriculum, every screen, read-only.
 *
 * As the fixture tutor: the curriculum and resources hubs, the qualification
 * browser, teaching resources, the learner notebook, schemes of work, the
 * document library, the timetable, registers, resource analytics, the mastery
 * queue, quizzes (list and one quiz), the marking queue, the AI notebook and
 * one assessment criterion, on desktop and phone. Opens the sheets that start
 * work (new quiz, take a register, plan a lesson for a criterion) and closes
 * them without saving, taps the filters and links on the way, and checks each
 * sheet's action sits on screen at 44px. Writes nothing: the one screen with no
 * demo data (schemes of work) is answered from memory. Fails on a page error
 * or phone overflow. Screenshots go to PORTFOLIO_TOUR_SHOTS when set.
 */
import fs from 'node:fs';
import path from 'node:path';
import { test, expect, type Page } from '@playwright/test';
import { actor, haveCreds, signedInPage } from './support';

test.skip(!haveCreds(), 'College fixture credentials are not available');
const SHOTS = process.env.PORTFOLIO_TOUR_SHOTS;

async function shot(page: Page, name: string, phone: boolean, full = true) {
  await page.waitForLoadState('networkidle').catch(() => undefined);
  await page.waitForTimeout(1200);
  if (SHOTS) {
    fs.mkdirSync(SHOTS, { recursive: true });
    await page.screenshot({
      path: path.join(SHOTS, `${name}-${phone ? 'phone' : 'desk'}.png`),
      fullPage: full,
    });
  }
  if (phone) {
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    expect(overflow, `${name} overflows the phone by ${overflow}px`).toBeLessThanOrEqual(1);
  }
}

/** An open sheet or dialog (the last one, if a sheet opened another). */
const openSheet = (page: Page) => page.getByRole('dialog').last();

/** A sheet's action must sit inside the screen without scrolling (sticky footer). */
async function expectOnScreen(page: Page, name: RegExp) {
  await page.waitForTimeout(700); // let the sheet finish sliding up
  const btn = openSheet(page).getByRole('button', { name }).last();
  await expect(btn).toBeVisible();
  const box = await btn.boundingBox();
  const vh = page.viewportSize()?.height ?? 0;
  expect(box, `${name} has no box`).not.toBeNull();
  expect(box!.y + box!.height, `${name} is below the fold`).toBeLessThanOrEqual(vh + 1);
  expect(box!.height, `${name} is under 44px`).toBeGreaterThanOrEqual(43.5);
}

/** Opens a sheet from a button, checks it opened, screenshots the screen, closes it. */
async function openSheetAndShot(page: Page, name: RegExp, shotName: string, phone: boolean) {
  const btn = page.getByRole('button', { name }).first();
  await expect(btn, `${name} button`).toBeVisible();
  await btn.click();
  await expect(openSheet(page)).toBeVisible();
  await shot(page, shotName, phone, false);
}

/**
 * Closes the open sheet with its own close button. Not Escape: inside
 * /college the dashboard's Escape shortcut also steps back a section (a
 * shared-file bug, reported), which would leave the screen under test.
 */
async function closeSheet(page: Page) {
  const close = openSheet(page)
    .getByRole('button', { name: /^Close$/ })
    .first();
  if (await close.isVisible().catch(() => false)) await close.click();
  else await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
}

const SECTIONS = [
  'curriculumhub',
  'resourceshub',
  'courses',
  'teachingresources',
  'tutornotebook',
  'schemesofwork',
  'documentlibrary',
  'timetable',
  'attendance',
  'resourceanalytics',
] as const;

for (const viewport of ['desktop', 'phone'] as const) {
  test(`teaching and curriculum screens (${viewport})`, async ({ browser }) => {
    test.setTimeout(300_000);
    const phone = viewport === 'phone';
    const t = await actor('tutor');
    const { data: quiz } = await t.db
      .from('tutor_quizzes')
      .select('id')
      .eq('creator_id', t.userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    const quizId = (quiz as { id: string } | null)?.id;

    const { page, errors } = await signedInPage(browser, 'tutor', viewport);

    for (const [i, section] of SECTIONS.entries()) {
      await page.goto(`/college?section=${section}`);
      await shot(page, `t${String(i + 1).padStart(2, '0')}-${section}`, phone);
    }

    // Curriculum hub: New lesson plan opens the composer in place.
    await page.goto('/college?section=curriculumhub');
    await openSheetAndShot(page, /^New lesson plan$/, 't01b-new-plan', phone);
    await closeSheet(page);

    // Registers: take one (the sheet; no mark is tapped, so nothing saves).
    await page.goto('/college?section=attendance');
    await openSheetAndShot(page, /^Take a register$/, 't09b-register-sheet', phone);
    await expect(
      openSheet(page)
        .getByRole('button', { name: /Present/ })
        .first()
    ).toBeVisible();
    await closeSheet(page);

    // Schemes of work: the new-scheme sheet will not create without a title.
    await page.goto('/college?section=schemesofwork');
    await openSheetAndShot(page, /^New scheme$/, 't06b-new-scheme', phone);
    await expectOnScreen(page, /Create scheme/);
    await expect(openSheet(page).getByRole('button', { name: /Create scheme/ })).toBeDisabled();
    await closeSheet(page);

    // Teaching resources: add a link (not saved).
    await page.goto('/college?section=teachingresources');
    await openSheetAndShot(page, /^Add a link$/, 't04b-add-link', phone);
    await closeSheet(page);

    // Learner notebook: a ready question carries into the notebook.
    await page.goto('/college?section=tutornotebook');
    await page.getByRole('button', { name: /Gateway readiness/ }).click();
    await expect(page).toHaveURL(/\/college\/ai-notebook\?prompt=/);
    await expect(page.getByText(/Pick a learner and the notebook asks/)).toBeVisible();
    await shot(page, 't05b-notebook-with-question', phone);

    // Schemes of work, linked to lessons. The demo college has no scheme, and
    // this tour writes nothing, so the list read is answered with one
    // in-memory scheme for a real cohort; its lessons and coverage are live.
    const { data: cohort } = await t.db
      .from('college_cohorts')
      .select('id, college_id, name')
      .eq('name', 'L2 Electrical 2025-A')
      .limit(1)
      .maybeSingle();
    const c = cohort as { id: string; college_id: string; name: string } | null;
    if (c) {
      await page.route('**/rest/v1/schemes_of_work?*', async (route) => {
        if (route.request().method() !== 'GET') return route.continue();
        await route.fulfill({
          contentType: 'application/json',
          body: JSON.stringify([
            {
              id: '00000000-0000-4000-8000-0000000000e2',
              college_id: c.college_id,
              cohort_id: c.id,
              qualification_code: '5357',
              title: 'Preview: Level 2 electrical, year 1',
              academic_year: '2025/26',
              start_date: '2025-09-01',
              end_date: '2026-07-17',
              status: 'published',
              created_by: null,
              created_at: '2025-09-01T09:00:00Z',
              updated_at: '2025-09-01T09:00:00Z',
              cohort: { name: c.name },
            },
          ]),
        });
      });
      await page.goto('/college?section=schemesofwork');
      await shot(page, 't06c-scheme-list', phone);
      await page
        .getByRole('button', { name: /Preview: Level 2 electrical/ })
        .first()
        .click();
      await expect(openSheet(page)).toBeVisible();
      await expect(
        openSheet(page).getByText(/lesson plans? for L2 Electrical 2025-A/)
      ).toBeVisible();
      await expectOnScreen(page, /Plan a lesson for this cohort/);
      await shot(page, 't06d-scheme-sheet', phone, false);
      // Its "Plan a lesson for this cohort" opens the lesson composer.
      await openSheet(page)
        .getByRole('button', { name: /Plan a lesson for this cohort/ })
        .click();
      await expect(openSheet(page)).toBeVisible();
      await shot(page, 't06e-scheme-plan', phone, false);
      await closeSheet(page);
      await page.unroute('**/rest/v1/schemes_of_work?*');
    }

    // The qualification browser down to one criterion, and its
    // "Plan a lesson for this criterion" (opens the same composer as New plan).
    await page.goto('/college?section=courses');
    await page.waitForLoadState('networkidle').catch(() => undefined);
    // Filters narrow the list.
    const all = await page.getByTestId('qualification-card').count();
    await page.getByRole('button', { name: /^Level 2$/ }).click();
    expect(await page.getByTestId('qualification-card').count()).toBeLessThan(all);
    await page.getByRole('button', { name: /^All levels$/ }).click();
    await page.getByTestId('qualification-card').first().click();
    await shot(page, 't03b-qualification', phone);
    await page.getByTestId('unit-row').first().click();
    await shot(page, 't03c-unit', phone);
    await page.getByTestId('ac-row').first().click();
    await expect(openSheet(page)).toBeVisible();
    await shot(page, 't03d-criterion', phone, false);
    await openSheet(page)
      .getByRole('button', { name: /Plan a lesson for this criterion/ })
      .click();
    // The composer's shape step, with that one criterion picked; the
    // criterion sheet has closed underneath it.
    await expect(page.getByRole('dialog')).toHaveCount(1);
    await expect(openSheet(page).getByText(/Change \(1 of \d+\)/)).toBeVisible();
    await shot(page, 't03e-plan-lesson', phone, false);
    await closeSheet(page);
    // The criterion sheet links to the criterion page. Walked again from the
    // top, and retried, so a dev-server reload mid-run (other work in the
    // tree) cannot strand the step.
    await expect(async () => {
      await page.goto('/college?section=courses');
      await page.getByTestId('qualification-card').first().click({ timeout: 10_000 });
      await page.getByTestId('unit-row').first().click({ timeout: 10_000 });
      await page.getByTestId('ac-row').first().click({ timeout: 10_000 });
      await openSheet(page)
        .getByRole('button', { name: /Learners, resources and lessons/ })
        .click({ timeout: 10_000 });
      await expect(page).toHaveURL(/\/college\/curriculum\/ac\//, { timeout: 10_000 });
    }).toPass({ timeout: 90_000 });
    await expect(page.getByRole('heading', { name: /Assessment criterion/ })).toBeVisible();

    // Quizzes: the list, the new-quiz sheet, one quiz.
    await page.goto('/college/quizzes');
    await shot(page, 't20-quizzes', phone);
    await openSheetAndShot(page, /^New quiz$/, 't20b-new-quiz', phone);
    await expectOnScreen(page, /Draft the questions/);
    await closeSheet(page);
    if (quizId) {
      await page.goto(`/college/quizzes/${quizId}`);
      await shot(page, 't21-quiz', phone);
      // An attempt opens to mark (nothing saved).
      const attempt = page.getByRole('button', { name: /\(fixture\)/ }).first();
      if (await attempt.isVisible().catch(() => false)) {
        await attempt.click();
        await expect(openSheet(page)).toBeVisible();
        await shot(page, 't21b-attempt', phone, false);
        await closeSheet(page);
      }
    }

    await page.goto('/college/marking');
    await shot(page, 't22-marking', phone);
    // A row opens the attempt to mark (nothing approved, nothing saved).
    const row = page.locator('li[data-qkey]').first();
    if (await row.isVisible().catch(() => false)) {
      await row
        .getByText(/\(fixture\)/)
        .first()
        .click();
      await expect(openSheet(page)).toBeVisible();
      await shot(page, 't22b-mark-sheet', phone, false);
      await closeSheet(page);
    }
    await page.goto('/college/ai-notebook');
    await shot(page, 't23-ai-notebook', phone);
    await page.goto('/college/curriculum/ac/5357/113/1.1');
    await shot(page, 't24-criterion-page', phone);
    await expect(page.getByText(/learners? on this qualification/)).toBeVisible();
    await page
      .getByRole('button', { name: /Plan a lesson for this criterion/ })
      .first()
      .click();
    await expect(openSheet(page).getByText(/Change \(1 of \d+\)/)).toBeVisible();
    await shot(page, 't24b-criterion-plan', phone, false);
    await closeSheet(page);
    // A unit code with a slash (5357 unit 312/212) travels URL-encoded.
    await page.goto('/college/curriculum/ac/5357/312%2F212/5.5');
    await expect(page.getByRole('heading', { name: /Assessment criterion 5\.5/ })).toBeVisible();
    await shot(page, 't25-criterion-slash-unit', phone);

    expect(errors).toEqual([]);
  });
}
