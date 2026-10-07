/**
 * Journey 6 — tutor sets an ILP goal, the learner acknowledges it and replies,
 * and the tutor sees the reply on the learner's record (Student 360).
 *
 * The goal is added to the fixture learner's current ILP as the fixture tutor
 * (the same insert the goal sheet makes), the learner side is driven in the
 * browser, and the goal is deleted by id afterwards.
 */
import { test, expect } from '@playwright/test';
import { actor, admin, adminAvailable, haveCreds, learnerRoll, lit, londonDate, RUN, signedInPage } from './support';

test.skip(!haveCreds(), 'College fixture credentials are not available');

test('goal → learner acknowledges and replies → tutor sees the reply', async ({ browser }) => {
  const t = await actor('tutor');
  const roll = await learnerRoll();
  const { data: ilp } = await t.db
    .from('college_ilps')
    .select('id')
    .eq('student_id', roll.id)
    .eq('is_current', true)
    .order('version', { ascending: false })
    .limit(1)
    .maybeSingle();
  test.skip(!ilp, 'Fixture learner has no current ILP');

  const title = `${RUN} goal: label every circuit on the practice board`;
  const reply = `${RUN} reply: done the first two, finishing Thursday`;
  const { data: row, error } = await t.db
    .from('college_ilp_goals')
    .insert({
      ilp_id: (ilp as { id: string }).id,
      student_id: roll.id,
      college_id: roll.college_id,
      title,
      description: 'Created by the College Hub journey test. Deleted when the test ends.',
      category: 'skills',
      priority: 'low',
      status: 'not_started',
      source: 'tutor',
      position: 99,
      target_date: londonDate(14),
      created_by: t.userId,
    })
    .select('id')
    .single();
  expect(error, error?.message).toBeNull();
  const id = (row as { id: string }).id;

  try {
    // Learner: open the goal (opening it acknowledges it), reply.
    const learner = await signedInPage(browser, 'learner');
    await learner.page.goto('/apprentice/college/plan');
    await learner.page.getByText(title).first().click();
    const box = learner.page.getByPlaceholder("Let your tutor know how it's going, ask a question, or share progress.");
    await box.fill(reply);
    await learner.page.getByRole('button', { name: 'Send reply' }).click();
    await expect(learner.page.getByText('Reply sent').first()).toBeVisible();

    const { data: after } = await t.db
      .from('college_ilp_goals')
      .select('student_acknowledged, student_comment')
      .eq('id', id)
      .single();
    expect(after).toMatchObject({ student_acknowledged: true, student_comment: reply });

    // Tutor: the reply is on the learner's ILP in Student 360.
    const tutor = await signedInPage(browser, 'tutor');
    await tutor.page.goto(`/college?section=student360&studentId=${roll.id}#ilp`);
    await expect(tutor.page.getByText(reply).first()).toBeVisible();
    expect([...learner.errors, ...tutor.errors]).toEqual([]);
  } finally {
    const { error: delErr } = await t.db.from('college_ilp_goals').delete().eq('id', id);
    if (delErr && adminAvailable()) admin(`delete from public.college_ilp_goals where id = ${lit(id)}`);
  }
  const { data: gone } = await t.db.from('college_ilp_goals').select('id').eq('id', id);
  expect(gone ?? [], 'the goal was cleaned up').toHaveLength(0);
});
