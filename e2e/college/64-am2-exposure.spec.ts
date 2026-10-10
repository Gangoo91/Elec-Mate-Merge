/**
 * Journey 64 — AM2 practice on site (ELE-2049).
 *
 * The fixture learner gets one evidence item and one site diary day, written
 * as themselves and marked with this run's marker, whose words mention fault
 * finding, insulation resistance and safe isolation. Then, desktop and phone:
 *   - the learner's EPA page shows "AM2 practice on site" with the three
 *     areas and NET's tasks, suggests tags from those words, and a tap on
 *     "Tag fault finding" counts it; the sheet tags the diary day too;
 *   - the tutor's Student 360 shows the same counts, and /college/am2-exposure
 *     lists the learner with the college's N weeks;
 *   - the weekly alert function, run for this learner as of 60 days ahead,
 *     records an alert and rings the fixture tutor's bell, and the learner's
 *     card then says the tutor was told.
 * Everything it made is deleted by id when the test ends.
 */
import { test, expect, type Page } from '@playwright/test';
import {
  RUN,
  actor,
  admin,
  adminAvailable,
  haveCreds,
  learnerRoll,
  lit,
  signedInPage,
  londonDate,
} from './support';

test.skip(!haveCreds(), 'College fixture credentials are not available');

const SHOTS = process.env.W3_SHOTS;
let itemId = '';
let diaryId = '';

async function seed() {
  const l = await actor('learner');
  const { data: item, error: e1 } = await l.db
    .from('portfolio_items')
    .insert({
      user_id: l.userId,
      title: `${RUN} Found a fault on a tripping RCD circuit`,
      description:
        'Proved dead and locked off, then insulation resistance tests to trace the fault.',
      category: 'site_work',
    })
    .select('id')
    .single();
  expect(e1).toBeNull();
  itemId = (item as { id: string }).id;
  const { data: diary, error: e2 } = await l.db
    .from('site_diary_entries')
    .insert({
      user_id: l.userId,
      date: londonDate(0),
      site_name: `${RUN} Kitchen rewire`,
      tasks_completed: ['Continuity and polarity checks on the new ring final'],
      what_i_learned: 'How to record R1+R2 on the schedule of test results.',
      share_with_tutor: true,
    })
    .select('id')
    .single();
  expect(e2).toBeNull();
  diaryId = (diary as { id: string }).id;
}

function cleanup(learnerId: string, tutorId: string) {
  admin(`
    delete from public.am2_exposure_tags where source_id in (${[itemId, diaryId].filter(Boolean).map(lit).join(',') || 'null'});
    delete from public.am2_exposure_alerts where learner_id = ${lit(learnerId)} and alerted_at > now() + interval '1 day';
    delete from public.user_notifications where user_id = ${lit(tutorId)} and type = 'am2_exposure_gap' and created_at > now() - interval '30 minutes';
    delete from public.portfolio_items where id = ${lit(itemId || '00000000-0000-0000-0000-000000000000')};
    delete from public.site_diary_entries where id = ${lit(diaryId || '00000000-0000-0000-0000-000000000000')};
  `);
}

async function noSideways(page: Page, size: string) {
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth
  );
  expect(overflow, `no sideways scroll (${size})`).toBeLessThanOrEqual(1);
}

test.describe.serial('AM2 exposure', () => {
  test.skip(() => !adminAvailable(), 'Needs the Supabase CLI to clean up');

  test.beforeAll(async () => {
    await seed();
  });
  test.afterAll(async () => {
    cleanup((await actor('learner')).userId, (await actor('tutor')).userId);
  });

  test('learner tags from a suggestion and from the sheet (desktop)', async ({ browser }) => {
    test.setTimeout(3 * 60_000);
    const { context, page, errors } = await signedInPage(browser, 'learner', 'desktop');
    try {
      await page.goto('/apprentice/epa-simulator?tab=readiness');
      const card = page.getByTestId('am2-exposure');
      await expect(async () => {
        await card.scrollIntoViewIfNeeded({ timeout: 10_000 });
      }).toPass({ timeout: 60_000 });
      await expect(card).toContainText('AM2 practice on site');
      for (const a of ['safe_isolation', 'inspection_testing', 'fault_finding'])
        await expect(card.locator(`[data-area="${a}"]`)).toBeVisible();
      await expect(card.locator('[data-area="fault_finding"]')).toContainText('NET task D');
      await expect(card.locator('[data-area="safe_isolation"]')).toContainText(
        'NET tasks A1 and C'
      );
      await expect(card).toContainText('44% lacked confidence in fault finding');

      const sug = card.locator(`[data-source="${itemId}"]`);
      await expect(sug).toBeVisible();
      await sug.getByRole('button', { name: 'Tag fault finding' }).click();
      await expect(card.locator('[data-area="fault_finding"]')).toContainText('Today', {
        timeout: 20_000,
      });
      await expect(card.locator('[data-area="fault_finding"] span').first()).toHaveText(
        /^[1-9]\d*$/
      );

      await card.getByTestId('am2-exposure-open').click();
      const sheet = page.getByTestId('am2-exposure-sheet');
      await expect(sheet).toBeVisible();
      const row = sheet.locator(`[data-source="${diaryId}"]`);
      await expect(row).toContainText('suggested: inspection and testing');
      await row.getByRole('button', { name: 'Inspection and testing' }).click();
      await expect(row.getByRole('button', { name: 'Inspection and testing' })).toHaveAttribute(
        'aria-pressed',
        'true',
        { timeout: 20_000 }
      );
      if (SHOTS)
        await page
          .screenshot({ timeout: 15_000, path: `${SHOTS}/64-learner-sheet-desktop.png` })
          .catch(() => undefined);
      await page.keyboard.press('Escape');
      await expect(card.locator('[data-area="inspection_testing"]')).toContainText('Today', {
        timeout: 20_000,
      });
      await noSideways(page, 'desktop');
      if (SHOTS)
        await card
          .screenshot({ timeout: 15_000, path: `${SHOTS}/64-learner-card-desktop.png` })
          .catch(() => undefined);
      expect(errors).toEqual([]);
    } finally {
      await context.close();
    }
  });

  test('learner card on a phone', async ({ browser }) => {
    test.setTimeout(2 * 60_000);
    const { context, page, errors } = await signedInPage(browser, 'learner', 'phone');
    try {
      await page.goto('/apprentice/epa-simulator?tab=readiness');
      const card = page.getByTestId('am2-exposure');
      await expect(async () => {
        await card.scrollIntoViewIfNeeded({ timeout: 10_000 });
      }).toPass({ timeout: 60_000 });
      await expect(card.locator('[data-area="fault_finding"]')).toContainText('Today');
      await noSideways(page, 'phone');
      if (SHOTS)
        await card
          .screenshot({ timeout: 15_000, path: `${SHOTS}/64-learner-card-phone.png` })
          .catch(() => undefined);
      expect(errors).toEqual([]);
    } finally {
      await context.close();
    }
  });

  for (const size of ['desktop', 'phone'] as const) {
    test(`tutor sees the same counts and the cohort list (${size})`, async ({ browser }) => {
      test.setTimeout(3 * 60_000);
      const roll = await learnerRoll();
      const { context, page, errors } = await signedInPage(browser, 'tutor', size);
      try {
        await page.goto(`/college?section=student360&studentId=${roll.id}#epa`);
        const card = page.getByTestId('am2-exposure').first();
        await expect(async () => {
          await card.scrollIntoViewIfNeeded({ timeout: 10_000 });
        }).toPass({ timeout: 60_000 });
        await expect(card.locator('[data-area="fault_finding"]')).toContainText('Today');
        await expect(card.locator('[data-area="inspection_testing"]')).toContainText('Today');
        if (SHOTS)
          await card
            .screenshot({ timeout: 15_000, path: `${SHOTS}/64-tutor-card-${size}.png` })
            .catch(() => undefined);
        await noSideways(page, size);

        await page.goto('/college/am2-exposure');
        await expect(
          page.getByRole('heading', { name: 'AM2 practice on site', level: 1 }).last()
        ).toBeVisible({ timeout: 60_000 });
        await expect(page.getByText(/of \d+ learners have gone \d+ weeks without/)).toBeVisible();
        await page.getByRole('tab', { name: /Everyone/ }).click();
        const row = page.locator(`[data-student="${roll.id}"]`);
        await expect(row).toBeVisible();
        await expect(row.locator('[data-area="fault_finding"]')).toContainText(/[1-9]/);
        await expect(page.getByTestId('am2-exposure-weeks')).toContainText(
          'Alert after weeks with none'
        );
        await noSideways(page, size);
        if (SHOTS)
          await page
            .screenshot({
              timeout: 15_000,
              path: `${SHOTS}/64-cohort-${size}.png`,
              fullPage: size === 'desktop',
            })
            .catch(() => undefined);
        expect(errors).toEqual([]);
      } finally {
        await context.close();
      }
    });
  }

  test('the weekly alert rings the tutor and the learner sees it', async ({ browser }) => {
    test.setTimeout(2 * 60_000);
    const l = await actor('learner');
    const t = await actor('tutor');
    const asOf = londonDate(60);
    const dry = admin<{
      r: Array<{ areas: string[]; employer: { contact_email: string } | null }>;
    }>(
      `select public.am2_exposure_due_alerts(${lit(asOf)}::date, ${lit(l.userId)}::uuid, true) as r`
    )[0].r;
    expect(dry.length).toBe(1);
    expect(dry[0].areas).toContain('fault_finding');
    const real = admin<{ r: Array<{ tutors_notified: number; alert_ids: string[] }> }>(
      `select public.am2_exposure_due_alerts(${lit(asOf)}::date, ${lit(l.userId)}::uuid, false) as r`
    )[0].r;
    expect(real[0].alert_ids.length).toBeGreaterThan(0);
    expect(real[0].tutors_notified).toBeGreaterThan(0);
    const bell = admin<{ n: number }>(
      `select count(*)::int as n from public.user_notifications where user_id = ${lit(t.userId)} and type = 'am2_exposure_gap' and created_at > now() - interval '5 minutes'`
    )[0].n;
    expect(bell).toBeGreaterThan(0);
    // A second run in the same window sends nothing more.
    const again = admin<{ r: unknown[] }>(
      `select public.am2_exposure_due_alerts(${lit(asOf)}::date, ${lit(l.userId)}::uuid, true) as r`
    )[0].r;
    expect(again.length).toBe(0);

    const { context, page } = await signedInPage(browser, 'learner', 'desktop');
    try {
      await page.goto('/apprentice/epa-simulator?tab=readiness');
      const card = page.getByTestId('am2-exposure');
      await expect(async () => {
        await card.scrollIntoViewIfNeeded({ timeout: 10_000 });
      }).toPass({ timeout: 60_000 });
      await expect(card).toContainText(/Tutor told on/);
    } finally {
      await context.close();
    }
  });
});
