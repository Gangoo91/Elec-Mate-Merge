/**
 * Journey 66 — the road to Gold Card after the AM2S (ELE-2055).
 *
 * The fixture learner starts with no steps ticked. Desktop and phone:
 *   - the EPA page shows "After your AM2S: road to Gold Card", 0 of 8 steps,
 *     next "Pass your AM2S", and opens the full list;
 *   - every step links to its official page (ECS or NET), and the
 *     England-only MyECS note (NET → MyECS since 3 Aug 2026) is shown;
 *   - the learner ticks two steps and un-ticks one;
 *   - the tutor sees the same list in Student 360, read-only.
 * The learner's ticks are deleted at the end.
 */
import { test, expect, type Page } from '@playwright/test';
import { actor, admin, adminAvailable, haveCreds, learnerRoll, lit, signedInPage } from './support';

test.skip(!haveCreds(), 'College fixture credentials are not available');

const SHOTS = process.env.W3_SHOTS;

function cleanup(learnerId: string) {
  admin(`delete from public.gold_card_steps where learner_id = ${lit(learnerId)};`);
}

async function noSideways(page: Page, size: string) {
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth
  );
  expect(overflow, `no sideways scroll (${size})`).toBeLessThanOrEqual(1);
}

test.describe.serial('Road to Gold Card', () => {
  test.skip(() => !adminAvailable(), 'Needs the Supabase CLI to clean up');

  test.beforeAll(async () => cleanup((await actor('learner')).userId));
  test.afterAll(async () => cleanup((await actor('learner')).userId));

  test('learner opens the steps from the EPA page and ticks them (desktop)', async ({
    browser,
  }) => {
    test.setTimeout(3 * 60_000);
    const { context, page, errors } = await signedInPage(browser, 'learner', 'desktop');
    try {
      await page.goto('/apprentice/epa-simulator?tab=readiness');
      const card = page.getByTestId('gold-card-road');
      await expect(async () => {
        await card.scrollIntoViewIfNeeded({ timeout: 10_000 });
      }).toPass({ timeout: 60_000 });
      await expect(card.getByTestId('gold-card-headline')).toHaveText(
        'You have done 0 of 8 steps. Next: Pass your AM2S.'
      );
      await card.getByTestId('gold-card-open').click();
      await expect(page).toHaveURL(/\/apprentice\/gold-card$/);

      const road = page.getByTestId('gold-card-road');
      await expect(road.locator('[data-step]')).toHaveCount(8);
      for (const step of [
        'myecs_registered',
        'hse_assessment',
        'documents_ready',
        'gold_card_applied',
        'gold_card_received',
        'jib_grade_applied',
        'approved_grade_plan',
      ]) {
        const href = await road
          .locator(`[data-step="${step}"] a`, { hasText: 'Source:' })
          .getAttribute('href');
        expect(href, step).toMatch(/^https:\/\/www\.ecscard\.org\.uk\//);
      }
      expect(
        await road
          .locator('[data-step="am2s_passed"] a', { hasText: 'Source:' })
          .getAttribute('href')
      ).toMatch(/^https:\/\/www\.netservices\.org\.uk\//);
      await expect(road.locator('[data-step="myecs_registered"]')).toContainText(
        'Since 3 August 2026'
      );
      await expect(road.locator('[data-step="hse_assessment"]')).toContainText(
        'The CITB (CSCS) test is not accepted'
      );

      await road
        .locator('[data-step="am2s_passed"]')
        .getByRole('button', { name: 'Mark as done' })
        .click();
      await expect(road.getByTestId('gold-card-headline')).toHaveText(
        'You have done 1 of 8 steps. Next: Register for MyECS.',
        { timeout: 20_000 }
      );
      await road
        .locator('[data-step="myecs_registered"]')
        .getByRole('button', { name: 'Mark as done' })
        .click();
      await expect(road.getByTestId('gold-card-headline')).toContainText('2 of 8', {
        timeout: 20_000,
      });
      await road
        .locator('[data-step="myecs_registered"]')
        .getByRole('button', { name: 'Not done' })
        .click();
      await expect(road.getByTestId('gold-card-headline')).toContainText('1 of 8', {
        timeout: 20_000,
      });
      await noSideways(page, 'desktop');
      if (SHOTS)
        await page
          .screenshot({ timeout: 15_000, path: `${SHOTS}/66-learner-desktop.png` })
          .catch(() => undefined);
      expect(errors).toEqual([]);
    } finally {
      await context.close();
    }
  });

  test('learner page on a phone', async ({ browser }) => {
    test.setTimeout(2 * 60_000);
    const { context, page, errors } = await signedInPage(browser, 'learner', 'phone');
    try {
      await page.goto('/apprentice/gold-card');
      await expect(page.getByTestId('gold-card-headline')).toContainText('1 of 8', {
        timeout: 60_000,
      });
      await noSideways(page, 'phone');
      if (SHOTS)
        await page
          .screenshot({ timeout: 15_000, path: `${SHOTS}/66-learner-phone.png` })
          .catch(() => undefined);
      expect(errors).toEqual([]);
    } finally {
      await context.close();
    }
  });

  for (const size of ['desktop', 'phone'] as const) {
    test(`tutor sees the same steps, read-only (${size})`, async ({ browser }) => {
      test.setTimeout(2 * 60_000);
      const roll = await learnerRoll();
      const { context, page, errors } = await signedInPage(browser, 'tutor', size);
      try {
        await page.goto(`/college?section=student360&studentId=${roll.id}#epa`);
        const road = page.getByTestId('gold-card-road').first();
        await expect(async () => {
          await road.scrollIntoViewIfNeeded({ timeout: 10_000 });
        }).toPass({ timeout: 60_000 });
        await expect(road.getByTestId('gold-card-headline')).toContainText('has done 1 of 8 steps');
        await expect(road.locator('[data-step="am2s_passed"]')).toContainText('Done');
        await expect(road.getByRole('button', { name: 'Mark as done' })).toHaveCount(0);
        await noSideways(page, size);
        if (SHOTS)
          await road
            .screenshot({ timeout: 15_000, path: `${SHOTS}/66-tutor-${size}.png` })
            .catch(() => undefined);
        expect(errors).toEqual([]);
      } finally {
        await context.close();
      }
    });
  }
});
