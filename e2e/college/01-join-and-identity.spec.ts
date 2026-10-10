/**
 * Journey 1 — join by code, and the college identity shows on the learner side.
 *
 * READ-ONLY on purpose: the fixture learner joined with NTCY2DEMO on 6 Oct and
 * cannot join twice, and making a fresh account per run would leave auth users
 * behind. So this proves the far end of the journey: opening the join link as
 * a member lands on their college, cohort and tutor, and the same identity is
 * on the college home — taken from the database, not hard-coded.
 */
import { test, expect } from '@playwright/test';
import { haveCreds, learnerContext, signedInPage } from './support';

test.skip(!haveCreds(), 'College fixture credentials are not available');

test('join link and college home show the learner their college, cohort and tutor', async ({
  browser,
}) => {
  const ctx = await learnerContext();
  expect(ctx.cohort_name, 'the join code put the learner in a cohort').toBeTruthy();
  expect(ctx.tutor_name, 'the cohort has a tutor').toBeTruthy();

  const { page, errors } = await signedInPage(browser, 'learner');
  for (const url of ['/college/join/NTCY2DEMO', '/apprentice/college-plan']) {
    await page.goto(url);
    await expect(page.getByText(ctx.college_name).first()).toBeVisible();
    await expect(page.getByText(ctx.cohort_name!).first()).toBeVisible();
    await expect(
      page.getByText(new RegExp(`Tutor:? ${ctx.tutor_name!.replace(/[()]/g, '\\$&')}`)).first()
    ).toBeVisible();
  }
  expect(errors, 'no uncaught page errors').toEqual([]);
});

test('a learner is kept out of the staff hub', async ({ browser }) => {
  const { page } = await signedInPage(browser, 'learner');
  await page.goto('/college');
  await expect(page).toHaveURL(/\/apprentice\/college-plan/);
});
