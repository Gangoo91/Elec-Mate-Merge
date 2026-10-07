/**
 * Journey 4 — messages both ways between tutor and learner, in the browser.
 *
 * The tutor starts a new thread from the learner's record (Student 360 →
 * messages), the learner reads it on "Learning plan & messages" and replies,
 * and the tutor sees the reply. Both pushes go to fixture accounts only: the
 * tutor's message to the learner, and the learner's reply to the tutor who
 * started the thread (notify-student-message routes a reply to the thread's
 * creator before the cohort tutor). Thread and messages are deleted by id.
 */
import { test, expect } from '@playwright/test';
import { actor, admin, adminAvailable, haveCreds, learnerRoll, lit, RUN, signedInPage } from './support';

test.skip(!haveCreds(), 'College fixture credentials are not available');
test.skip(() => !adminAvailable(), 'No Supabase CLI login / SUPABASE_ACCESS_TOKEN — cannot clean up the thread');

test('tutor → learner → tutor, on a new thread', async ({ browser }) => {
  const roll = await learnerRoll();
  const t = await actor('tutor');
  const subject = `${RUN} check-in`;
  const fromTutor = `${RUN} from tutor: bring your test sheet on Wednesday`;
  const fromLearner = `${RUN} from learner: will do, thanks`;
  let threadId: string | null = null;

  try {
    // Tutor starts the thread.
    const tutor = await signedInPage(browser, 'tutor');
    await tutor.page.goto(`/college?section=student360&studentId=${roll.id}#messages`);
    const dialog = tutor.page.getByRole('dialog');
    await dialog.getByRole('button', { name: 'New thread' }).first().click();
    await dialog.locator('#sm-subject').fill(subject);
    await dialog.getByPlaceholder(/Write a message/).fill(fromTutor);
    await dialog.getByRole('button', { name: 'Send', exact: true }).click();
    await expect(dialog.getByText(fromTutor).first()).toBeVisible();

    // The sheet shows the message optimistically; wait for the row itself.
    await expect
      .poll(async () => {
        const { data: th } = await t.db
          .from('student_message_threads')
          .select('id')
          .eq('student_id', roll.id)
          .eq('subject', subject)
          .maybeSingle();
        threadId = (th as { id: string } | null)?.id ?? null;
        return threadId;
      }, { message: 'the thread was created' })
      .toBeTruthy();

    // Learner reads it and replies.
    const learner = await signedInPage(browser, 'learner');
    await learner.page.goto('/apprentice/college/plan');
    await learner.page.getByRole('button', { name: /Read tutor message|Open conversation/ }).click();
    const sheet = learner.page.getByRole('dialog');
    // Two or more threads open as a list; pick ours.
    await sheet.getByRole('button', { name: new RegExp(subject) }).first().click();
    await expect(sheet.getByText(fromTutor).first()).toBeVisible();
    await sheet.getByPlaceholder('Write a message…').fill(fromLearner);
    await sheet.getByRole('button', { name: 'Send', exact: true }).click();
    await expect(sheet.getByText(fromLearner).first()).toBeVisible();

    // Tutor sees the reply.
    await tutor.page.goto('/college');
    await tutor.page.goto(`/college?section=student360&studentId=${roll.id}#messages`);
    const dialog2 = tutor.page.getByRole('dialog');
    await dialog2.getByRole('button', { name: new RegExp(subject) }).first().click();
    await expect(dialog2.getByText(fromLearner).first()).toBeVisible();
    expect([...tutor.errors, ...learner.errors]).toEqual([]);
  } finally {
    const T = threadId ? lit(threadId) : null;
    admin(`
      ${T ? `delete from public.student_messages where thread_id = ${T};` : ''}
      delete from public.student_messages where thread_id in (select id from public.student_message_threads where student_id = ${lit(roll.id)} and subject = ${lit(subject)});
      delete from public.student_message_threads where student_id = ${lit(roll.id)} and subject = ${lit(subject)};
      delete from public.user_notifications where (title like '%' || ${lit(RUN)} || '%' or message like '%' || ${lit(RUN)} || '%');
    `);
  }
  const left = admin<{ n: number }>(
    `select count(*)::int n from public.student_message_threads where student_id = ${lit(roll.id)} and subject = ${lit(subject)}`
  );
  expect(left[0]?.n, 'the thread was cleaned up').toBe(0);
});
