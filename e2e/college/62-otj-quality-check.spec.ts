/**
 * Journey 62 — the off-the-job quality check before an entry is sent (ELE-2052).
 *
 * Funding rules 2026/27 (v3) paras 82 to 88, checked in code:
 * exams and testing (84.5), outside normal hours (84.6 / 84.6.1 / 82.1),
 * standalone English and maths (84.2), onboarding (84.1), progress reviews
 * (84.4), not linked to the KSBs or plan (84.3, 88), duplicate days (82.4).
 *
 *  1. The rules on their own: each flag fires where it should, and electrical
 *     "testing" (insulation resistance, RCD trip times) is never taken for an exam.
 *  2. Journey (desktop + phone): the learner writes up a unit test as training;
 *     the send is held, each flag is explained in plain words with its
 *     paragraph; the AI rewording is INTERCEPTED (no tokens) and marked as AI;
 *     "Fix it" goes to the field; after fixing, what is left can be sent with a
 *     note. The entry carries the check and the note, and the tutor's hours
 *     inbox shows it. The entry is deleted at the end.
 */
import { test, expect, type Page } from '@playwright/test';
import { checkOtjEntry, type OtjEntryInput } from '../../src/lib/otj/otjQualityCheck';
import { actor, admin, adminAvailable, haveCreds, learnersCohortTutorEmail, lit, signedInPage, FIXTURE_EMAIL, RUN } from './support';

test.setTimeout(240_000);

const OUT = process.env.W3_SHOTS;
async function shot(page: Page, name: string, phone: boolean) {
  await page.waitForTimeout(600);
  if (OUT) await page.screenshot({ path: `${OUT}/${name}-${phone ? 'phone' : 'desk'}.png` });
  if (phone) {
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, `${name} overflows the phone by ${overflow}px`).toBeLessThanOrEqual(1);
  }
}

const base: OtjEntryInput = {
  activity_date: '2026-10-07', // a Wednesday
  activity_type: 'theory',
  title: 'Course',
  description: 'Learned something new',
  duration_minutes: 60,
  unit_codes: ['304'],
  hours: 'in',
};
const ctx = { sameDay: [], qualificationUnits: ['301', '302', '304', '305'] };
const codes = (e: Partial<OtjEntryInput>, c: Parameters<typeof checkOtjEntry>[1] = ctx) =>
  checkOtjEntry({ ...base, ...e }, c).map((f) => `${f.code}:${f.severity}`);

test('para 88: compared with the training plan in force', () => {
  const plan = {
    ...ctx,
    planActivities: [
      'Safe isolation and proving dead on domestic circuits · workshop practical',
      'Consumer unit installation, Unit 304 · on site with a mentor',
    ],
  };
  // No plan in force: no plan flag.
  expect(codes({ title: 'Something unrelated', description: 'Watched a video on marketing', unit_codes: ['304'] }, { ...ctx, planActivities: null })).not.toContain('not_in_plan:check');
  // Nothing in the plan matches: flagged as a check, pointing at the description.
  const off = checkOtjEntry({ ...base, title: 'Customer service course', description: 'Online marketing and sales module', unit_codes: ['K3'] }, plan);
  const f = off.find((x) => x.code === 'not_in_plan');
  expect(f?.severity).toBe('check');
  expect(f?.para).toBe('88');
  expect(f?.fix).toContain('Safe isolation');
  // A shared meaningful word, or a unit code written into the plan, is enough.
  expect(codes({ title: 'Proving dead before work on a ring final', description: 'Practised safe isolation', unit_codes: ['K3'] }, plan)).not.toContain('not_in_plan:check');
  expect(codes({ title: 'Board change', description: 'Fitted a board', unit_codes: ['304'] }, plan)).not.toContain('not_in_plan:check');
  // Not linked at all: "not linked" says it, not the plan flag as well.
  expect(codes({ title: 'Customer service course', unit_codes: [] }, plan)).not.toContain('not_in_plan:check');
});

test('the rules, in code', () => {
  expect(codes({ title: 'Sat my unit 304 online test', description: 'Multiple choice exam at college' })).toEqual(['exam_testing:likely']);
  expect(codes({ title: 'Revision for the unit 304 exam', description: 'Practice papers on safe isolation' })).toEqual(['exam_testing:check']);
  expect(codes({ title: 'Insulation resistance testing on the rig', description: 'IR and RCD trip time testing' })).toEqual([]);
  expect(codes({ activity_type: 'assessment' })).toEqual(['exam_testing:likely']);
  expect(codes({ title: 'Functional skills maths', description: 'Level 2 maths' })).toEqual(['english_maths:likely']);
  expect(codes({ title: 'Apprenticeship induction', description: 'Onboarding day' })).toEqual(['onboarding:likely']);
  expect(codes({ title: 'Progress review with my tutor' })).toEqual(['progress_review:likely']);
  expect(codes({ hours: 'outside_paid' })).toEqual(['outside_hours:check']);
  expect(codes({ activity_date: '2026-10-10' })).toEqual(['weekend:check']); // a Saturday
  expect(codes({ duration_minutes: 700 })).toEqual(['long_day:check']);
  expect(codes({ unit_codes: [] })).toEqual(['not_linked:check']);
  expect(codes({ unit_codes: ['999', 'K3'] })).toEqual(['unknown_units:check']);
  expect(codes({ unit_codes: ['999'] }, { sameDay: [], qualificationUnits: null })).toEqual([]);
  expect(
    codes({ title: 'Hager EV course' }, { sameDay: [{ title: 'Hager EV course', duration_minutes: 120, activity_type: 'manufacturer_training' }], qualificationUnits: null })
  ).toEqual(['duplicate:likely']);
  expect(
    codes({ title: 'Other course', duration_minutes: 300 }, { sameDay: [{ title: 'Long course', duration_minutes: 400, activity_type: 'workshop' }], qualificationUnits: null })
  ).toEqual(['day_total:check']);
  // Every flag names its paragraph and says what to change.
  for (const f of checkOtjEntry({ ...base, title: 'Sat my exam', unit_codes: [] }, ctx)) {
    expect(f.para).toMatch(/^8\d/);
    expect(f.explanation.length).toBeGreaterThan(40);
    expect(f.fix.length).toBeGreaterThan(10);
    expect(f.explanation + f.fix).not.toMatch(/—/);
  }
});

for (const viewport of ['desktop', 'phone'] as const) {
  const phone = viewport === 'phone';

  test(`learner fixes or explains a flagged entry, the tutor sees it (${viewport})`, async ({ browser }) => {
    test.skip(!haveCreds(), 'College fixture credentials are not available');
    test.skip(!adminAvailable(), 'Needs the Supabase CLI to clean up');
    const recipient = await learnersCohortTutorEmail();
    test.skip(!recipient || !FIXTURE_EMAIL.test(recipient), 'The cohort tutor is a real person; sending would notify them.');
    const l = await actor('learner');
    const { data: acs } = await l.db.rpc('get_portfolio_ac_state', { p_user_id: l.userId });
    const unit = ((acs ?? []) as Array<{ unit_code: string }>)[0].unit_code;
    const title = `${RUN} unit test ${viewport}`;
    const weekday = new Date();
    while (weekday.getDay() === 0 || weekday.getDay() === 6) weekday.setDate(weekday.getDate() - 1);
    let entryId: string | null = null;
    let worded = 0;
    const { context, page, errors } = await signedInPage(browser, 'learner', viewport);
    await context.route('**/functions/v1/otj-quality-explain', async (route) => {
      const cors = { 'access-control-allow-origin': '*', 'access-control-allow-headers': '*' };
      if (route.request().method() === 'OPTIONS') return route.fulfill({ status: 200, headers: cors, body: 'ok' });
      worded += 1;
      const body = route.request().postDataJSON() as { flags: Array<{ code: string }> };
      return route.fulfill({
        status: 200,
        headers: { ...cors, 'content-type': 'application/json' },
        body: JSON.stringify({
          source: 'ai_worded',
          explanations: body.flags.map((f) => ({ code: f.code, text: `Reworded for your entry (${f.code}).` })),
        }),
      });
    });
    try {
      await page.goto('/apprentice/college/activities');
      await page.getByRole('button', { name: 'Log work activity' }).click();
      const sheet = page.getByRole('dialog').first();
      await sheet.locator('#otj-activity_date').fill(weekday.toLocaleDateString('en-CA'));
      await sheet.getByRole('button', { name: 'College or training centre' }).click();
      await sheet.getByPlaceholder('e.g. Hager EV charger installer course').fill(title);
      await sheet.getByRole('button', { name: '1h', exact: true }).click();
      await sheet.getByRole('button', { name: 'In my normal paid working hours' }).click();
      await sheet.getByPlaceholder(/Who ran it, what it covered/).fill('Sat the unit multiple choice test at college this morning.');
      await sheet.getByRole('button', { name: 'Send to tutor' }).click();

      const panel = sheet.getByTestId('otj-quality-panel');
      await expect(panel).toBeVisible({ timeout: 20_000 });
      await expect(panel.getByTestId('otj-flag-exam_testing')).toContainText('para 84.5');
      await expect(panel.getByTestId('otj-flag-not_linked')).toContainText('84.3, 88');
      await expect(panel.getByTestId('otj-flag-why-exam_testing')).toHaveText('Reworded for your entry (exam_testing).', { timeout: 15_000 });
      await expect(panel.getByText('uses AI').first()).toBeVisible();
      expect(worded).toBe(1);
      // Nothing was sent.
      const { data: none } = await l.db.from('college_otj_entries').select('id').eq('student_id', l.userId).eq('title', title);
      expect(none ?? []).toEqual([]);
      await shot(page, 'w62-held', phone);

      // Fix it: to the unit field, add a real unit; say it was revision.
      await panel.getByTestId('otj-flag-not_linked').getByRole('button', { name: 'Fix it' }).click();
      await expect(sheet.locator('#otj-unit_codes_text')).toBeFocused();
      await sheet.locator('#otj-unit_codes_text').fill(unit);
      await sheet.locator('#otj-description').fill('Revision for the unit test: practice papers on safe isolation and the test sequence.');
      await expect(panel.getByText(/You changed the entry/)).toBeVisible();
      await sheet.getByRole('button', { name: 'Send to tutor' }).click();
      // Revision mentioning a test is still worth a line: send it with a note.
      await expect(panel.getByTestId('otj-flag-exam_testing')).toContainText('Mentions an exam', { timeout: 20_000 });
      await expect(panel.getByTestId('otj-flag-not_linked')).toHaveCount(0);
      await panel.getByTestId('otj-qc-note').fill('It was revision before the test, not the test itself.');
      await sheet.getByRole('button', { name: 'Send with my note' }).click();
      await expect(page.getByText('Sent to your tutor').first()).toBeVisible({ timeout: 20_000 });

      await expect
        .poll(async () => {
          const { data } = await l.db.from('college_otj_entries').select('id').eq('student_id', l.userId).eq('title', title).maybeSingle();
          entryId = (data as { id: string } | null)?.id ?? null;
          return entryId;
        })
        .toBeTruthy();
      const { data: row } = await l.db.from('college_otj_entries').select('quality_check').eq('id', entryId!).single();
      const qc = (row as { quality_check: { flags: Array<{ code: string }>; learner_note: string; sent_with_flags: boolean } }).quality_check;
      expect(qc.sent_with_flags).toBe(true);
      expect(qc.flags.map((f) => f.code)).toEqual(['exam_testing']);
      expect(qc.learner_note).toMatch(/revision/);
      expect(errors, errors.join('\n')).toEqual([]);
      await context.close();

      // The tutor sees what it was sent with.
      const tut = await signedInPage(browser, 'tutor', viewport);
      await tut.page.goto('/college/otj/inbox');
      await tut.page.getByText(title).first().click();
      const q = tut.page.getByTestId('otj-inbox-quality').first();
      await expect(q).toBeVisible({ timeout: 20_000 });
      await expect(q).toContainText('para 84.5');
      await expect(q).toContainText('revision before the test');
      await q.scrollIntoViewIfNeeded();
      await shot(tut.page, 'w62-tutor', phone);
      expect(tut.errors, tut.errors.join('\n')).toEqual([]);
      await tut.context.close();
    } finally {
      await context.close().catch(() => undefined);
      admin(`
        delete from public.user_notifications where (title like '%${RUN}%' or message like '%${RUN}%');
        delete from public.college_otj_entries where student_id = ${lit(l.userId)} and title = ${lit(title)};
      `);
      const left = admin<{ n: number }>(`select count(*) n from public.college_otj_entries where student_id = ${lit(l.userId)} and title = ${lit(title)}`);
      expect(Number(left[0]?.n ?? 0)).toBe(0);
    }
  });
}
