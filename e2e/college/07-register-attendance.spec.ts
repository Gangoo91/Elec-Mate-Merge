/**
 * Journey 7 — the tutor takes a register and the learner sees their attendance.
 *
 * The register is written as the fixture tutor through the same table and RLS
 * the register sheet uses, for the fixture learner ONLY: the sheet marks a
 * whole cohort at once, and the fixture learner's cohort has real learners in
 * it. The learner's side is checked in the browser. The row is deleted by id
 * afterwards (as the tutor, whose same-college policy allows it).
 */
import { test, expect } from '@playwright/test';
import { actor, haveCreds, learnerRoll, londonDate, RUN, signedInPage } from './support';

test.skip(!haveCreds(), 'College fixture credentials are not available');

test('a register mark shows on the learner\'s attendance card', async ({ browser }) => {
  const t = await actor('tutor');
  const roll = await learnerRoll();

  // The newest day in the last month the learner has no mark for (one mark per day).
  const { data: existing } = await t.db
    .from('college_attendance')
    .select('date')
    .eq('student_id', roll.id)
    .gte('date', londonDate(-30));
  const taken = new Set(((existing ?? []) as { date: string }[]).map((r) => r.date));
  let date = '';
  for (let d = -1; d >= -30 && !date; d--) if (!taken.has(londonDate(d))) date = londonDate(d);
  test.skip(!date, 'No free day in the last month to mark');

  const { data: row, error } = await t.db
    .from('college_attendance')
    .insert({ student_id: roll.id, cohort_id: roll.cohort_id, date, status: 'Late', notes: `${RUN} register`, recorded_by: t.userId })
    .select('id')
    .single();
  expect(error, error?.message).toBeNull();
  const id = (row as { id: string }).id;

  try {
    const label = new Date(date).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
    const { page, errors } = await signedInPage(browser, 'learner');
    await page.goto('/apprentice/college/today');
    const mark = page.locator('div.flex', { has: page.getByText(label, { exact: true }) }).last();
    await expect(mark).toBeVisible();
    await expect(mark).toContainText('Late');
    expect(errors).toEqual([]);
  } finally {
    const { error: delErr } = await t.db.from('college_attendance').delete().eq('id', id);
    expect(delErr, `cleanup of attendance ${id}`).toBeNull();
  }
  const { data: gone } = await t.db.from('college_attendance').select('id').eq('id', id);
  expect(gone ?? [], 'the register mark was cleaned up').toHaveLength(0);
});
