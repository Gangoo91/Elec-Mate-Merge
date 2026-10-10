/**
 * Journey 67 — the assessment plan version by start date (ELE-2054).
 *
 *   - get_learner_plan_version picks the Skills England version window for
 *     the date and NET's end assessment for it: the fixture learner (started
 *     6 Oct 2026) is on ST0152 1.2 with the AM2S v1; as of 17 Dec 2026 they
 *     would be on the revised plan with no end assessment recorded (a gap to
 *     load, not the AM2S v1); 2024 starts are on 1.1 (AM2S v1); 2022 starts
 *     on 1.0 (original AM2S).
 *   - Desktop and phone: the learner's EPA page and the tutor's Student 360
 *     show the plan card, and the AM2S v1 task list still shows for a 1.2
 *     learner. The tutor also sees what is still to load.
 * Reads only; nothing to clean up.
 */
import { test, expect, type Page } from '@playwright/test';
import { actor, haveCreds, learnerRoll, signedInPage } from './support';

test.skip(!haveCreds(), 'College fixture credentials are not available');

const SHOTS = process.env.W3_SHOTS;

interface Plan {
  status: string;
  standard: { code: string; version?: string } | null;
  end_assessment: { assessment_code: string; assessment_version: string } | null;
  gaps: string[];
}

async function plan(asOf?: string): Promise<Plan> {
  const t = await actor('tutor');
  const l = await actor('learner');
  const { data, error } = await t.db.rpc('get_learner_plan_version', {
    p_user_id: l.userId,
    p_student_id: null,
    p_as_of: asOf ?? null,
  });
  expect(error).toBeNull();
  return data as Plan;
}

async function noSideways(page: Page, size: string) {
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth
  );
  expect(overflow, `no sideways scroll (${size})`).toBeLessThanOrEqual(1);
}

test('the plan version follows the start date', async () => {
  const now = await plan();
  expect(now.status).toBe('current');
  expect(now.standard?.code).toBe('ST0152');
  expect(now.standard?.version).toBe('1.2');
  expect(now.end_assessment?.assessment_code).toBe('AM2S');
  expect(now.end_assessment?.assessment_version).toBe('v1');

  const lastV12 = await plan('2026-12-16');
  expect(lastV12.standard?.version).toBe('1.2');

  const revised = await plan('2026-12-17');
  expect(revised.status).toBe('revised_plan');
  expect(revised.standard?.version).toBe('revised-2026-12-17');
  expect(revised.end_assessment).toBeNull();
  expect(revised.gaps).toEqual(
    expect.arrayContaining(['end_assessment_for_date', 'criteria_map_for_revised_plan'])
  );

  const v11 = await plan('2024-01-10');
  expect(v11.standard?.version).toBe('1.1');
  expect(v11.end_assessment?.assessment_version).toBe('v1');

  const v10 = await plan('2022-01-10');
  expect(v10.standard?.version).toBe('1.0');
  expect(v10.end_assessment?.assessment_version).toBe('original');
});

test('a learner cannot read someone else’s plan', async () => {
  const l = await actor('learner');
  const roll = await learnerRoll();
  const { error } = await l.db.rpc('get_learner_plan_version', {
    p_user_id: '00000000-0000-0000-0000-000000000001',
    p_student_id: null,
    p_as_of: null,
  });
  expect(error?.message).toMatch(/not allowed/);
  expect(roll.id).toBeTruthy();
});

for (const size of ['desktop', 'phone'] as const) {
  test(`learner sees their plan and the AM2S v1 task list (${size})`, async ({ browser }) => {
    test.setTimeout(2 * 60_000);
    const { context, page, errors } = await signedInPage(browser, 'learner', size);
    try {
      await page.goto('/apprentice/epa-simulator?tab=readiness');
      const card = page.getByTestId('plan-version');
      await expect(async () => {
        await card.scrollIntoViewIfNeeded({ timeout: 10_000 });
      }).toPass({ timeout: 60_000 });
      await expect(card.getByTestId('plan-version-headline')).toHaveText(
        'ST0152 v1.2, for starts 21 Jul 2025 to 16 Dec 2026. End assessment: AM2S v1.'
      );
      await expect(card).toHaveAttribute('data-status', 'current');
      await expect(card.getByTestId('plan-version-gaps')).toHaveCount(0);
      await expect(page.getByTestId('am2-task-readiness').locator('[data-task="E"]')).toBeVisible();
      await noSideways(page, size);
      if (SHOTS)
        await card
          .screenshot({ timeout: 15_000, path: `${SHOTS}/67-learner-${size}.png` })
          .catch(() => undefined);
      expect(errors).toEqual([]);
    } finally {
      await context.close();
    }
  });

  test(`tutor sees the plan and what is still to load (${size})`, async ({ browser }) => {
    test.setTimeout(2 * 60_000);
    const roll = await learnerRoll();
    const { context, page, errors } = await signedInPage(browser, 'tutor', size);
    try {
      await page.goto(`/college?section=student360&studentId=${roll.id}#epa`);
      const card = page.getByTestId('plan-version').first();
      await expect(async () => {
        await card.scrollIntoViewIfNeeded({ timeout: 10_000 });
      }).toPass({ timeout: 60_000 });
      await expect(card.getByTestId('plan-version-headline')).toContainText('ST0152 v1.2');
      await expect(card.getByTestId('plan-version-gaps')).toContainText(
        'the qualification specification version'
      );
      await noSideways(page, size);
      if (SHOTS)
        await card
          .screenshot({ timeout: 15_000, path: `${SHOTS}/67-tutor-${size}.png` })
          .catch(() => undefined);
      expect(errors).toEqual([]);
    } finally {
      await context.close();
    }
  });
}
