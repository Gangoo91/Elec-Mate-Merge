/**
 * Journey 2 — a lesson planned for the learner's cohort shows on their day.
 *
 * The fixture tutor plans a lesson for the fixture learner's cohort tomorrow
 * (marked with the run id), the learner sees it on "Your day at college", and
 * the lesson is deleted by id. The cohort has other learners, who could see it
 * for the few seconds the test runs; nothing is sent to them (lesson plans
 * have no notification trigger).
 */
import { test, expect } from '@playwright/test';
import { actor, admin, adminAvailable, haveCreds, learnerRoll, lit, londonDate, RUN, signedInPage, tutorStaff } from './support';

test.skip(!haveCreds(), 'College fixture credentials are not available');

test('the learner sees a lesson planned for their cohort', async ({ browser }) => {
  const t = await actor('tutor');
  const roll = await learnerRoll();
  test.skip(!roll.cohort_id, 'Fixture learner has no cohort');
  const staff = await tutorStaff();
  const title = `${RUN} lesson: safe isolation refresher`;

  const { data: row, error } = await t.db
    .from('college_lesson_plans')
    .insert({
      college_id: roll.college_id,
      cohort_id: roll.cohort_id,
      tutor_id: staff.id,
      title,
      scheduled_date: londonDate(1),
      scheduled_start_time: '16:00',
      duration_minutes: 60,
      scheduled_room: 'E2E',
      status: 'ready',
    })
    .select('id')
    .single();
  expect(error, error?.message).toBeNull();
  const id = (row as { id: string }).id;

  try {
    const { page, errors } = await signedInPage(browser, 'learner');
    await page.goto('/apprentice/college/today');
    await expect(page.getByText(title).first()).toBeVisible();
    expect(errors).toEqual([]);
  } finally {
    const { error: delErr } = await t.db.from('college_lesson_plans').delete().eq('id', id);
    if (delErr && adminAvailable()) admin(`delete from public.college_lesson_plans where id = ${lit(id)}`);
  }
  const { data: gone } = await t.db.from('college_lesson_plans').select('id').eq('id', id);
  expect(gone ?? [], 'the lesson was cleaned up').toHaveLength(0);
});
