/**
 * Journey 39 — AM2 practice against NET's task list, for learner and tutor (ELE-1907).
 *
 * The fixture learner (C&G 5357 → ST0152 → AM2S v1) gets four practice runs,
 * written as themselves exactly as the simulator saves them and marked with
 * this run's marker:
 *   C safe isolation   two Assessment runs at 100%  → at the bar
 *   B testing          one Assessment run at 70%    → practising
 *   D fault diagnosis  one Assessment run at 50%, a missed open circuit → practising, weakest
 * Then, desktop and phone:
 *   - the learner's EPA page lists NET's AM2S v1 tasks (A1, A2–A6 with no
 *     simulator, B, C, D, E), "1 of 5 practisable tasks at the practice bar",
 *     says it is practice and not a prediction, and links the weakest task (D)
 *     to its drill;
 *   - the tutor's Student 360 shows the same list and the same weakest task.
 * The runs are deleted by marker when the test ends.
 */
import { test, expect, type Page } from '@playwright/test';
import { RUN, actor, admin, adminAvailable, haveCreds, learnerRoll, lit, signedInPage } from './support';

test.skip(!haveCreds(), 'College fixture credentials are not available');

const DAY = 86_400_000;

async function seed() {
  const l = await actor('learner');
  // Anything an earlier crashed run left behind.
  admin(
    `delete from public.am2_mock_sessions where user_id = ${lit(l.userId)} and session_data->>'e2e' like 'E2E·%'`
  );
  const at = (daysAgo: number) => new Date(Date.now() - daysAgo * DAY).toISOString();
  const run = (session_type: string, score: number, daysAgo: number, mistakes: { tag: string }[] = []) => ({
    user_id: l.userId,
    session_type,
    status: 'completed',
    overall_score: score,
    component_scores: { mode: 'assessment' },
    session_data: { e2e: RUN, mistakes },
    started_at: at(daysAgo),
    completed_at: at(daysAgo),
  });
  const { error } = await l.db.from('am2_mock_sessions').insert([
    run('safe_isolation', 100, 3),
    run('safe_isolation', 100, 1),
    run('testing_sequence', 70, 2),
    run('fault_diagnosis', 50, 1, [{ tag: 'missed_open_circuit' }]),
  ]);
  expect(error).toBeNull();
}

function cleanup(userId: string) {
  admin(`delete from public.am2_mock_sessions where user_id = ${lit(userId)} and session_data->>'e2e' = ${lit(RUN)}`);
}

async function checkList(page: Page, size: string) {
  const card = page.getByTestId('am2-task-readiness').first();
  await card.scrollIntoViewIfNeeded({ timeout: 45_000 });
  await expect(card).toContainText('AM2S practice against NET');
  await expect(card).toContainText('1 of 5 practisable tasks at the practice bar.');
  await expect(card).toContainText('not a prediction');
  for (const key of ['A1', 'A2–A6', 'B', 'C', 'D', 'E'])
    await expect(card.locator(`[data-task="${key}"]`)).toBeVisible();
  await expect(card.locator('[data-task="A2–A6"]')).toContainText('No simulator');
  await expect(card.locator('[data-task="C"]')).toContainText('At the bar');
  await expect(card.locator('[data-task="D"]')).toContainText('Last 50%');
  await expect(card.locator('[data-task="E"]')).toContainText('45 questions');
  await expect(card).toContainText('Weakest task: D · Fault diagnosis');
  await expect(card).toContainText('What does this reading tell you?');
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow, `no sideways scroll (${size})`).toBeLessThanOrEqual(1);
  if (process.env.ELE1907_SHOTS) await card.screenshot({ path: `${process.env.ELE1907_SHOTS}/${size}.png` });
  return card;
}

test.describe.serial('AM2 task list', () => {
  test.skip(() => !adminAvailable(), 'Needs the Supabase CLI to clean up');

  test.beforeAll(async () => {
    await seed();
  });
  test.afterAll(async () => {
    cleanup((await actor('learner')).userId);
  });

  for (const size of ['desktop', 'phone'] as const) {
    test(`learner sees practice against NET's AM2S v1 tasks, weakest linked to its drill (${size})`, async ({
      browser,
    }) => {
      test.setTimeout(2 * 60_000);
      const { context, page, errors } = await signedInPage(browser, 'learner', size);
      try {
        await page.goto('/apprentice/epa-simulator?tab=readiness');
        const card = await checkList(page, `learner-${size}`);
        await card.getByRole('button', { name: 'Start the drill' }).click();
        await expect(page).toHaveURL(/\/apprentice\/am2-simulator\?tab=b-drill&kinds=faultRead/);
        expect(errors).toEqual([]);
      } finally {
        await context.close();
      }
    });

    test(`tutor sees the same list in Student 360 (${size})`, async ({ browser }) => {
      test.setTimeout(2 * 60_000);
      const roll = await learnerRoll();
      const { context, page, errors } = await signedInPage(browser, 'tutor', size);
      try {
        await page.goto(`/college?section=student360&studentId=${roll.id}#epa`);
        const card = await checkList(page, `tutor-${size}`);
        await expect(card).toContainText('Suggested next: Drill: What does this reading tell you?');
        await expect(card.getByRole('button', { name: 'Start the drill' })).toHaveCount(0);
        expect(errors).toEqual([]);
      } finally {
        await context.close();
      }
    });
  }
});
