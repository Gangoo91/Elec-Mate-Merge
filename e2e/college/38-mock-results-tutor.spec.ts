/**
 * Journey 38 — learners' own mock exam results reach their tutor (ELE-1763).
 *
 * As the fixture tutor: the Curriculum hub card states the same mocks, learners
 * and weakest topics as get_cohort_mock_summary; "See every learner" lists
 * every learner, and a row opens that learner's mocks in Student 360. A
 * learner cannot read the cohort view. The demo learners' mock history is
 * seeded by scripts/college-demo/seed_fixture_mocks.sql (source 'fixture').
 */
import { test, expect } from '@playwright/test';
import { actor, haveCreds, signedInPage } from './support';

test.skip(!haveCreds(), 'College fixture credentials are not available');

type Summary = {
  cohorts: string[];
  totals: { learners: number; active_90: number; attempts_90: number };
  learners: Array<{ roll_id: string; name: string }>;
  topics: Array<{ topic: string; pct: number }>;
};

test('the cohort view is the tutor’s, never a learner’s', async () => {
  const t = await actor('tutor');
  const { data, error } = await t.db.rpc('get_cohort_mock_summary' as never, {} as never);
  expect(error).toBeNull();
  const d = data as unknown as Summary;
  expect(d.cohorts.length).toBeGreaterThan(0);
  expect(d.totals.attempts_90, 'the demo cohorts have mock history').toBeGreaterThan(0);
  const l = await actor('learner');
  const r = await l.db.rpc('get_cohort_mock_summary' as never, { p_cohort: d.cohorts[0] } as never);
  expect(r.error?.message ?? '', 'a learner is refused').toMatch(/not allowed/);
});

for (const size of ['desktop', 'phone'] as const) {
  test(`tutor sees the class's mock results and opens a learner (${size})`, async ({ browser }) => {
    test.setTimeout(2 * 60_000);
    const t = await actor('tutor');
    const d = (await t.db.rpc('get_cohort_mock_summary' as never, {} as never))
      .data as unknown as Summary;
    const { context, page, errors } = await signedInPage(browser, 'tutor', size);
    try {
      await page.goto('/college?section=curriculumhub');
      const card = page.getByTestId('mocks-card');
      await card.scrollIntoViewIfNeeded({ timeout: 30_000 });
      await expect(card).toContainText(
        `${d.totals.attempts_90} mocks sat by ${d.totals.active_90} of ${d.totals.learners}`
      );
      for (const topic of d.topics.slice(0, 3)) {
        await expect(card).toContainText(`${topic.topic} (${topic.pct}%)`);
      }

      await card.getByRole('button', { name: 'See every learner' }).click();
      const sheet = page.getByRole('dialog').last();
      await expect(sheet).toBeVisible();
      for (const l of d.learners.slice(0, 5)) await expect(sheet).toContainText(l.name);
      await page.waitForTimeout(500);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, 'no sideways scroll').toBeLessThanOrEqual(1);

      const first = sheet.getByRole('button', { name: /\(fixture\)/ }).first();
      const name = ((await first.textContent()) ?? '').split('(fixture)')[0].trim();
      await first.click();
      await expect(page).toHaveURL(/section=student360.*#mocks/);
      await expect(page.getByRole('heading', { name: 'Mock exams' })).toBeVisible({ timeout: 20_000 });
      await expect(page.getByText(name).first()).toBeVisible();
      expect(errors).toEqual([]);
    } finally {
      await context.close();
    }
  });
}
