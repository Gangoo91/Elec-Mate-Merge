/**
 * Journey 32 — the gateway forecast, read-only (8 Oct 2026).
 *
 * get_gateway_forecast says when the fixture learner will be ready for
 * gateway at their current pace. This checks:
 *   - the answer as the tutor is the same as the answer as the learner, and
 *     the list call (get_gateway_forecast_many) agrees with the single one;
 *   - a learner the tutor cannot see is refused;
 *   - Student 360 (overview, criteria area, EPA area), Gateway readiness
 *     (/college/epa) and the learner's EPA page and college home all show the
 *     same forecast status and date (data-status / data-date on every
 *     data-testid="gateway-forecast"), in words;
 *   - no page errors, and no sideways scroll on a phone.
 * Nothing is written. Screenshots go to FORECAST_SHOTS when set.
 */
import fs from 'node:fs';
import path from 'node:path';
import { test, expect, type Page } from '@playwright/test';
import { actor, haveCreds, learnerContext, signedInPage } from './support';
import {
  forecastHeadline,
  forecastParts,
  type GatewayForecast,
} from '../../src/lib/epa/gatewayForecast';

test.skip(!haveCreds(), 'College fixture credentials are not available');
const SHOTS = process.env.FORECAST_SHOTS;

interface Forecast {
  status: string;
  forecast_date: string | null;
  first_forecast_on: string | null;
  planned_end_date: string | null;
  criteria: { total: number; passed: number };
  [k: string]: unknown;
}

const toDate = (iso: string) => new Date(`${iso.slice(0, 10)}T12:00:00`);
/** The date words every screen carries in data-date. */
function dateWords(f: Forecast): string {
  if (f.forecast_date)
    return toDate(f.forecast_date).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
  if (f.first_forecast_on)
    return toDate(f.first_forecast_on).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  return '';
}

/** Drop the clock and the caller-dependent list of other open lines. */
const comparable = (f: Forecast) => {
  const {
    taken_at: _t,
    open_lines: _o,
    ...rest
  } = f as Forecast & {
    taken_at?: unknown;
    open_lines?: unknown;
  };
  return rest;
};

async function settle(page: Page, name: string, phone: boolean) {
  await page.waitForLoadState('networkidle').catch(() => undefined);
  await page.waitForTimeout(1000);
  if (SHOTS) {
    fs.mkdirSync(SHOTS, { recursive: true });
    await page.screenshot({
      path: path.join(SHOTS, `${name}-${phone ? 'phone' : 'desk'}.png`),
      fullPage: true,
    });
  }
  if (phone) {
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    expect(overflow, `${name} overflows the phone by ${overflow}px`).toBeLessThanOrEqual(1);
  }
}

/** Another agent's hot reload can blank a page mid-check: reload and retry. */
async function expectForecast(
  page: Page,
  scope: ReturnType<Page['locator']> | Page,
  what: string,
  tries = 3
) {
  for (let i = 0; i < tries; i++) {
    try {
      const el = scope.getByTestId('gateway-forecast').first();
      await el.scrollIntoViewIfNeeded({ timeout: 30_000 });
      await expect(el, what).toBeVisible({ timeout: 30_000 });
      await expect(el, `${what}: status`).toHaveAttribute('data-status', truth.status);
      await expect(el, `${what}: date`).toHaveAttribute('data-date', expectedDate);
      if (expectedDate) await expect(el, `${what}: date in words`).toContainText(expectedDate);
      return el;
    } catch (e) {
      if (i === tries - 1) throw e;
      await page.reload({ waitUntil: 'domcontentloaded' });
    }
  }
  throw new Error('unreachable');
}

let truth: Forecast;
let expectedDate: string;

test.beforeAll(async () => {
  const l = await actor('learner');
  const t = await actor('tutor');
  const asLearner = await l.db.rpc('get_gateway_forecast', { p_learner: l.userId });
  expect(asLearner.error, 'get_gateway_forecast as the learner').toBeNull();
  const asTutor = await t.db.rpc('get_gateway_forecast', { p_learner: l.userId });
  expect(asTutor.error, 'get_gateway_forecast as the tutor').toBeNull();
  truth = asLearner.data as Forecast;
  expect(comparable(asTutor.data as Forecast), 'tutor and learner get the same forecast').toEqual(
    comparable(truth)
  );
  // The learner's own call with no argument is the same learner.
  const own = await l.db.rpc('get_gateway_forecast', {});
  expect(comparable(own.data as Forecast)).toEqual(comparable(truth));

  const many = await t.db.rpc('get_gateway_forecast_many', { p_learners: [l.userId] });
  expect(many.error, 'get_gateway_forecast_many as the tutor').toBeNull();
  const fromMany = (many.data as Record<string, Forecast>)[l.userId];
  expect(fromMany, 'the list call includes the learner').toBeTruthy();
  expect(comparable(fromMany!)).toEqual(comparable(truth));

  // Someone the tutor cannot see: refused singly, left out of the list.
  const stranger = '00000000-0000-4000-8000-00000000f0ca';
  const refused = await t.db.rpc('get_gateway_forecast', { p_learner: stranger });
  expect(refused.error, 'a learner the tutor cannot see is refused').not.toBeNull();
  const learnerOnTutor = await l.db.rpc('get_gateway_forecast_many', {
    p_learners: [stranger, t.userId],
  });
  expect(learnerOnTutor.data ?? {}, 'a learner reads nobody else').toEqual({});

  expect(
    [
      'on_pace',
      'at_risk',
      'off_pace',
      'not_enough_history',
      'no_end_date',
      'gateway_passed',
      'stopped',
    ],
    'a known status'
  ).toContain(truth.status);
  if (truth.forecast_date && truth.planned_end_date && truth.status !== 'no_end_date') {
    const late =
      (Date.parse(truth.forecast_date) - Date.parse(truth.planned_end_date)) / 86_400_000;
    const want = late <= 0 ? 'on_pace' : late <= 56 ? 'at_risk' : 'off_pace';
    expect(truth.status, 'status follows the date against the planned end').toBe(want);
  }
  expectedDate = dateWords(truth);
});

for (const viewport of ['desktop', 'phone'] as const) {
  test(`learner sees the gateway forecast (${viewport})`, async ({ browser }) => {
    const phone = viewport === 'phone';
    const { page, errors } = await signedInPage(browser, 'learner', viewport);

    await page.goto('/apprentice/college/epa');
    const card = page.getByTestId('my-gateway-card');
    await expect(card).toBeVisible({ timeout: 30_000 });
    if (truth.status !== 'gateway_passed') {
      const el = await expectForecast(page, card, 'EPA page: gateway card');
      await expect(el).toContainText(/gateway/i);
    }
    await settle(page, 'f-l1-college-epa', phone);

    await page.goto('/apprentice/college-plan');
    if (truth.status !== 'gateway_passed') await expectForecast(page, page, 'college home: EPA');
    await settle(page, 'f-l2-college-home', phone);

    expect(errors).toEqual([]);
  });

  test(`tutor sees the same gateway forecast (${viewport})`, async ({ browser }) => {
    const phone = viewport === 'phone';
    const ctx = await learnerContext();
    const { page, errors } = await signedInPage(browser, 'tutor', viewport);

    // Student 360 overview: the forecast line under the four figures.
    await page.goto(`/college?section=student360&studentId=${ctx.student_id}`);
    await expectForecast(page, page, 'Student 360 overview');
    await settle(page, 'f-t1-s360-overview', phone);

    // Criteria area: the full panel.
    await page.goto(`/college?section=student360&studentId=${ctx.student_id}#assess`);
    await expectForecast(page, page, 'Student 360 criteria area');
    await settle(page, 'f-t2-s360-assess', phone);

    // EPA area: the full panel above EPA readiness.
    await page.goto(`/college?section=student360&studentId=${ctx.student_id}#epa`);
    await expectForecast(page, page, 'Student 360 EPA area');
    await expect(page.getByText(/not a decision/).first()).toBeVisible();
    await settle(page, 'f-t3-s360-epa', phone);

    // Gateway readiness: the learner's row, the Off pace filter and the sort.
    await page.goto('/college/epa');
    const row = page.locator('li').filter({ hasText: 'Demo Learner (fixture)' }).first();
    await expect(row).toBeVisible({ timeout: 30_000 });
    await expectForecast(page, row, 'Gateway readiness row');
    const offPace = page.getByRole('tab', { name: /^Off pace \d+/ }).first();
    await expect(offPace).toBeVisible();
    await offPace.click();
    const behind = truth.status === 'off_pace' || truth.status === 'at_risk';
    await expect(
      page.locator('li').filter({ hasText: 'Demo Learner (fixture)' }),
      'Off pace keeps the learner exactly when they are behind or close'
    ).toHaveCount(behind ? 1 : 0);
    await offPace.click();
    // The sort steps through to Soonest forecast.
    for (let i = 0; i < 5; i++) {
      if (await page.getByRole('button', { name: 'Soonest forecast' }).isVisible()) break;
      await page
        .getByRole('button', { name: /^(Most ready|Fewest to do|Name|Oldest verdict)$/ })
        .first()
        .click();
    }
    await expect(page.getByRole('button', { name: 'Soonest forecast' })).toBeVisible();
    await settle(page, 'f-t4-cohort-epa', phone);

    expect(errors).toEqual([]);
  });
}

// The forecast counts passed criteria itself (so view-only staff can read it).
// It must never drift from the one criterion state every other screen reads.
test('forecast criteria agree with get_portfolio_ac_state', async () => {
  const l = await actor('learner');
  const st = await l.db.rpc('get_portfolio_ac_state' as never, {} as never);
  const rows = (st.data ?? []) as Array<{ state: string }>;
  const passed = rows.filter((r) => r.state === 'passed' || r.state === 'iqa_confirmed').length;
  const f = await l.db.rpc(
    'get_gateway_forecast' as never,
    { p_learner: l.session.user.id } as never
  );
  const c = (f.data as { criteria?: { passed: number; total: number } } | null)?.criteria;
  expect(c, 'forecast returns criteria').toBeTruthy();
  expect({ passed: c!.passed, total: c!.total }).toEqual({ passed, total: rows.length });
});

// 10 Oct: a learner far through their programme with only a handful of
// criteria passed lately is beyond the 15-year horizon. The words must say
// "behind" with the count, never a multi-decade figure.
test('a pace too slow to date reads as behind with the count, never years', () => {
  const base = {
    learner_id: 'x',
    college_student_id: null,
    status: 'off_pace',
    reason: 'stalled',
    forecast_date: null,
    ready_now: false,
    planned_end_date: '2026-12-01',
    start_date: '2025-01-06',
    weeks_on_programme: 92,
    first_forecast_on: null,
    days_after_end: null,
    lever: 'criteria',
    criteria: {
      state: 'stalled',
      total: 340,
      passed: 13,
      remaining: 327,
      passed_in_window: 3,
      window_weeks: 92,
      window_from: '2025-01-06',
      pace_basis: 'since_start',
      weekly_pace: 0.14,
      weekly_needed: 47,
      date: null,
    },
    hours: {
      state: 'forecast',
      required: 400,
      counted: 380,
      weekly_pace: 6,
      weekly_needed: 2,
      forecast_at_end: 420,
      date: '2026-11-01',
    },
    duration: { state: 'done', min_months: 12, met_on: '2026-01-06' },
    open_lines: null,
  } as unknown as GatewayForecast;
  for (const who of ['staff', 'learner'] as const) {
    const h = forecastHeadline(base, who);
    expect(h, who).not.toMatch(/\byears?\b/);
    expect(h, who).toContain('13 of 340');
  }
  expect(forecastHeadline(base, 'staff')).toMatch(/^Behind: /);
  const parts = forecastParts(base)
    .map((p) => p.text)
    .join(' ');
  expect(parts).not.toMatch(/15 years/);
  // A dated forecast far past the planned end is capped in words too.
  const late = {
    ...base,
    forecast_date: '2034-03-01',
    days_after_end: 2700,
    criteria: { ...base.criteria, state: 'forecast', date: '2034-03-01' },
  } as GatewayForecast;
  expect(forecastHeadline(late, 'staff')).toContain('more than 2 years after the planned end');
});
