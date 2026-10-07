/**
 * Journey 5 — tutor sets a quiz, the learner takes it, the result reaches both.
 *
 * The quiz is created as the fixture tutor and assigned to the fixture learner
 * ONLY (no cohort), so the "new quiz" bell reaches nobody else. The learner
 * takes it in the browser; the tutor's quiz page shows the result. Quiz,
 * questions, attempt, the attempt's learning-log row and both bells are
 * deleted by id afterwards (the attempt and its learning-log row are the
 * learner's own record, so this needs the admin cleanup path).
 */
import { test, expect } from '@playwright/test';
import { actor, admin, adminAvailable, haveCreds, lit, londonDate, RUN, signedInPage } from './support';

test.skip(!haveCreds(), 'College fixture credentials are not available');
test.skip(() => !adminAvailable(), 'No Supabase CLI login / SUPABASE_ACCESS_TOKEN — cannot clean up the attempt');

const QUESTIONS = [
  {
    question_text: 'Which instrument is used to measure insulation resistance?',
    options: ['An insulation resistance tester', 'A clamp meter', 'A socket tester', 'A voltage indicator'],
  },
  {
    question_text: 'What must be proved before and after testing for dead?',
    options: ['That the voltage indicator works', 'That the RCD trips', 'That the lights work', 'That the meter is sealed'],
  },
];

/** Deletes the quiz and everything taking it wrote. */
function cleanupQuiz(quizId: string) {
  const Q = lit(quizId);
  admin(`
    delete from public.learning_activity_log where source_id in (select id::text from public.tutor_quiz_attempts where quiz_id = ${Q});
    delete from public.tutor_quiz_answer_grades where attempt_id in (select id from public.tutor_quiz_attempts where quiz_id = ${Q});
    delete from public.tutor_quiz_attempts where quiz_id = ${Q};
    delete from public.user_notifications where metadata->>'quiz_id' = ${Q} or metadata->>'ref_id' = ${Q} or link like '%' || ${Q} || '%';
    delete from public.tutor_quizzes where id = ${Q};
  `);
}

test('quiz set → learner takes it → result on both sides', async ({ browser }) => {
  const t = await actor('tutor');
  const l = await actor('learner');
  const title = `${RUN} quiz: testing basics`;
  const { data: quiz, error } = await t.db
    .from('tutor_quizzes')
    .insert({
      creator_id: t.userId,
      title,
      description: 'Created by the College Hub journey test. Deleted when the test ends.',
      kind: 'quiz',
      difficulty: 'easy',
      time_limit_minutes: 10,
      pass_mark: 50,
      is_published: true,
      published_at: new Date().toISOString(),
      due_date: londonDate(7),
      assigned_student_ids: [l.userId],
      source: 'manual',
    })
    .select('id')
    .single();
  expect(error, error?.message).toBeNull();
  const quizId = (quiz as { id: string }).id;

  try {
    const { error: qErr } = await t.db.from('tutor_quiz_questions').insert(
      QUESTIONS.map((q, i) => ({
        quiz_id: quizId,
        question_text: q.question_text,
        options: q.options,
        correct_answer_index: 0,
        question_kind: 'multi_choice',
        points: 1,
        sort_order: i,
        difficulty: 'easy',
      }))
    );
    expect(qErr, qErr?.message).toBeNull();

    // Learner: it is on their list, they take it.
    const learner = await signedInPage(browser, 'learner');
    await learner.page.goto('/apprentice/college/activities');
    await expect(learner.page.getByText(title).first()).toBeVisible();
    await learner.page.goto(`/apprentice/college/quiz/${quizId}`);
    await learner.page.getByRole('button', { name: /Start quiz/ }).click();
    for (let i = 0; i < QUESTIONS.length; i++) {
      await learner.page.getByRole('button', { name: QUESTIONS[i].options[0] }).click();
      await learner.page.getByRole('button', { name: i === QUESTIONS.length - 1 ? 'Review answers' : 'Next' }).click();
    }
    await learner.page.getByRole('button', { name: 'Submit quiz' }).click();
    await expect(learner.page.getByText(/cleared it/).first()).toBeVisible();

    // Tutor: the attempt and the score are on the quiz page.
    const tutor = await signedInPage(browser, 'tutor');
    await tutor.page.goto(`/college/quizzes/${quizId}`);
    await expect(tutor.page.getByText('Demo Learner (fixture)').first()).toBeVisible();
    await expect(tutor.page.getByText('100%').first()).toBeVisible();
    expect([...learner.errors, ...tutor.errors]).toEqual([]);
  } finally {
    cleanupQuiz(quizId);
  }
  const left = admin<{ n: number }>(`select count(*)::int n from public.tutor_quizzes where id = ${lit(quizId)}`);
  expect(left[0]?.n, 'the quiz was cleaned up').toBe(0);
});
