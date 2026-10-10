/**
 * Journey 3 — learner submits off-the-job hours, tutor verifies, learner sees
 * them verified.
 *
 * Driven in the browser on both sides. Submitting pushes "X logged 30m
 * off-the-job" to the learner's COHORT tutor (notify-tutor-otj). That must be
 * a fixture account, so the test checks first and SKIPS when it is a real
 * person. Since 8 Oct (ELE-1857, scripts/college-demo/seed_demo_college.mjs)
 * the fixture learner sits in "L2 Electrical 2026-A (Sept intake)", tutored by
 * the fixture tutor, so this journey runs; the guard stays as a safety net.
 *
 * A verified entry is append-only to every app role, so it is deleted by id
 * through the admin cleanup path.
 */
import { test, expect } from '@playwright/test';
import {
  actor, admin, adminAvailable, FIXTURE_EMAIL, haveCreds, learnersCohortTutorEmail, lit, RUN, signedInPage,
} from './support';

test.skip(!haveCreds(), 'College fixture credentials are not available');
test.skip(() => !adminAvailable(), 'No Supabase CLI login / SUPABASE_ACCESS_TOKEN — cannot clean up a verified entry');

test('OTJ submit → tutor verifies → learner sees it verified', async ({ browser }) => {
  const recipient = await learnersCohortTutorEmail();
  test.skip(
    !recipient || !FIXTURE_EMAIL.test(recipient),
    'The fixture learner\'s cohort tutor is a real person; submitting would push their phone. Move the fixture learner to the fixture tutor\'s cohort to run this.'
  );

  const l = await actor('learner');
  const title = `${RUN} OTJ: manufacturer RCBO training`;
  let entryId: string | null = null;

  try {
    // Learner submits in the browser.
    const learner = await signedInPage(browser, 'learner');
    await learner.page.goto('/apprentice/college/activities');
    await learner.page.getByRole('button', { name: 'Log work activity' }).click();
    const sheet = learner.page.getByRole('dialog');
    await sheet.getByRole('button', { name: 'Manufacturer training' }).click();
    await sheet.getByPlaceholder('e.g. Hager EV charger installer course').fill(title);
    await sheet.getByRole('button', { name: '30m', exact: true }).click();
    await sheet.getByRole('button', { name: 'In my normal paid working hours' }).click();
    await sheet
      .getByPlaceholder(/Who ran it, what it covered/)
      .fill('Wholesaler session on RCBO selection and testing. Created by the College Hub journey test.');
    // ELE-2052: an entry must name the unit it covers, or the quality check holds it.
    const { data: acs } = await l.db.rpc('get_portfolio_ac_state', { p_user_id: l.userId });
    const unit = ((acs ?? []) as Array<{ unit_code: string }>)[0]?.unit_code ?? '';
    await sheet.getByPlaceholder('304, 305').fill(unit);
    // ...and a weekend day "in normal hours" is flagged too: use the last weekday.
    const d = new Date();
    while (d.getDay() === 0 || d.getDay() === 6) d.setDate(d.getDate() - 1);
    await sheet.locator('#otj-activity_date').fill(d.toLocaleDateString('en-CA'));
    await sheet.getByRole('button', { name: 'Send to tutor' }).click();
    await expect(learner.page.getByText('Sent to your tutor').first()).toBeVisible();

    await expect
      .poll(async () => {
        const { data } = await l.db.from('college_otj_entries').select('id').eq('student_id', l.userId).eq('title', title).maybeSingle();
        entryId = (data as { id: string } | null)?.id ?? null;
        return entryId;
      })
      .toBeTruthy();

    // Tutor verifies it from the hours inbox.
    const tutor = await signedInPage(browser, 'tutor');
    await tutor.page.goto('/college/otj/inbox');
    await tutor.page.getByText(title).first().click();
    await tutor.page.getByRole('button', { name: 'Verify hours' }).click();
    await expect
      .poll(async () => {
        const { data } = await l.db.from('college_otj_entries').select('verification_status').eq('id', entryId!).single();
        return (data as { verification_status: string }).verification_status;
      })
      .toBe('verified');

    // Learner sees it verified.
    await learner.page.goto('/apprentice/college/activities');
    const row = learner.page.locator('li, div', { hasText: title }).filter({ hasText: /verified/i }).last();
    await expect(row).toBeVisible();
    expect([...learner.errors, ...tutor.errors]).toEqual([]);
  } finally {
    admin(`
      delete from public.user_notifications where metadata->>'entry_id' in (select id::text from public.college_otj_entries where student_id = ${lit(l.userId)} and title = ${lit(title)});
      delete from public.college_otj_entries where student_id = ${lit(l.userId)} and title = ${lit(title)};
    `);
  }
  const left = admin<{ n: number }>(
    `select count(*)::int n from public.college_otj_entries where student_id = ${lit(l.userId)} and title = ${lit(title)}`
  );
  expect(left[0]?.n, 'the entry was cleaned up').toBe(0);
});

/**
 * Runs whatever the cohort tutor is: the learner's half up to, not including,
 * "Send to tutor" — so a broken form still goes red even while the full
 * journey above is skipped. Nothing is written.
 */
test('OTJ form fills and is ready to send (nothing submitted)', async ({ browser }) => {
  const learner = await signedInPage(browser, 'learner');
  await learner.page.goto('/apprentice/college/activities');
  await learner.page.getByRole('button', { name: 'Log work activity' }).click();
  const sheet = learner.page.getByRole('dialog');
  const send = sheet.getByRole('button', { name: 'Send to tutor' });
  await expect(send).toBeDisabled();
  await sheet.getByRole('button', { name: 'Manufacturer training' }).click();
  await sheet.getByPlaceholder('e.g. Hager EV charger installer course').fill(`${RUN} OTJ form check`);
  await sheet.getByRole('button', { name: '30m', exact: true }).click();
  await sheet.getByRole('button', { name: 'In my normal paid working hours' }).click();
  await sheet.getByPlaceholder(/Who ran it, what it covered/).fill('Form check only. Never sent.');
  await expect(send).toBeEnabled();
  await sheet.getByRole('button', { name: 'Cancel' }).click();
  expect(learner.errors).toEqual([]);
});
