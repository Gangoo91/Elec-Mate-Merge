/**
 * Journey 31 — criteria gaps by cohort, and EPA on track (8 Oct 2026). Read-only.
 *
 * Truth: get_portfolio_ac_state for every learner on the fixture cohort
 * (L2 Electrical 2025-A), called one by one as the tutor. The server's
 * get_cohort_criteria_gaps must give the same counts for every criterion,
 * and the screen must say them in words:
 *   Curriculum hub card → Criteria gaps (the cohort) → the weakest unit's
 *   criteria → who is where on one → tick two criteria → "Plan a lesson for
 *   these" opens the lesson composer with them and the cohort picked (never
 *   generated) → Back to the hub. Then the Quality dashboard's EPA on track
 *   sentence against get_college_epa_pace.
 * Desktop 1440 and phone 390; no page errors, no phone overflow.
 * Screenshots go to GAPS_SHOTS when set.
 */
import fs from 'node:fs';
import path from 'node:path';
import { test, expect, type Page } from '@playwright/test';
import { actor, haveCreds, signedInPage } from './support';

test.skip(!haveCreds(), 'College fixture credentials are not available');

const SHOTS = process.env.GAPS_SHOTS;
const COHORT = '33333333-cccc-4000-8000-000000000001';
const COHORT_NAME = 'L2 Electrical 2025-A';

type Bucket = 'passed' | 'with_assessor' | 'sent_back' | 'claimed' | 'nothing';
const bucketOf = (s: string): Bucket =>
  s === 'passed' || s === 'iqa_confirmed'
    ? 'passed'
    : s === 'submitted' || s === 'iqa_rejected'
      ? 'with_assessor'
      : s === 'referred' || s === 'not_yet'
        ? 'sent_back'
        : s === 'claimed'
          ? 'claimed'
          : 'nothing';

interface Crit {
  ac_code: string;
  passed: number;
  with_assessor: number;
  sent_back: number;
  claimed: number;
  nothing: number;
  states: string[];
}
interface Unit {
  unit_code: string;
  criteria: Crit[];
}
interface Gaps {
  cohorts: { id: string; name: string }[];
  hidden: number;
  qualifications: {
    code: string;
    learners: { user_id: string; roll_id: string; name: string }[];
    units: Unit[];
  }[];
}

let gaps: Gaps;
let weakest: { unit: Unit; share: number; untouched: number };
let totalUntouched = 0;
let n = 0;

const unitName = (code: string) => (/^\d/.test(code) ? `Unit ${code}` : code);
const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

test.beforeAll(async () => {
  const t = await actor('tutor');
  const { data, error } = await t.db.rpc('get_cohort_criteria_gaps', { p_cohort: COHORT });
  expect(error, 'get_cohort_criteria_gaps as the tutor').toBeNull();
  gaps = data as Gaps;
  expect(gaps.hidden).toBe(0);
  expect(gaps.qualifications.length).toBe(1);
  const q = gaps.qualifications[0];
  n = q.learners.length;

  // The roll, read separately, is the same learners.
  const { data: roll } = await t.db
    .from('college_students')
    .select('user_id, status')
    .eq('cohort_id', COHORT)
    .not('user_id', 'is', null);
  const rollIds = ((roll ?? []) as { user_id: string; status: string | null }[])
    .filter((r) => !/^(withdrawn|archived|completed)$/i.test(r.status ?? ''))
    .map((r) => r.user_id)
    .sort();
  expect(q.learners.map((l) => l.user_id).sort()).toEqual(rollIds);

  // Every learner's get_portfolio_ac_state, one by one: the truth.
  const truth = new Map<string, Record<Bucket, number>>();
  for (const l of q.learners) {
    const { data: rows, error: e } = await t.db.rpc('get_portfolio_ac_state', {
      p_user_id: l.user_id,
    });
    expect(e, `get_portfolio_ac_state for ${l.name}`).toBeNull();
    for (const r of (rows ?? []) as { unit_code: string; ac_code: string; state: string }[]) {
      const k = `${r.unit_code}|${r.ac_code}`;
      const c = truth.get(k) ?? {
        passed: 0,
        with_assessor: 0,
        sent_back: 0,
        claimed: 0,
        nothing: 0,
      };
      c[bucketOf(r.state)] += 1;
      truth.set(k, c);
    }
  }
  let compared = 0;
  for (const u of q.units) {
    for (const c of u.criteria) {
      const want = truth.get(`${u.unit_code}|${c.ac_code}`);
      expect(want, `${u.unit_code} ${c.ac_code} is in get_portfolio_ac_state`).toBeTruthy();
      expect(
        {
          passed: c.passed,
          with_assessor: c.with_assessor,
          sent_back: c.sent_back,
          claimed: c.claimed,
          nothing: c.nothing,
        },
        `${u.unit_code} ${c.ac_code}`
      ).toEqual(want);
      expect(c.states.length).toBe(n);
      compared++;
    }
  }
  expect(compared).toBe(truth.size);

  // The headline, worked out here independently.
  const ranked = q.units
    .map((u) => {
      const passed = u.criteria.reduce((s, c) => s + c.passed, 0);
      const untouched = u.criteria.filter((c) => c.nothing === n).length;
      return { unit: u, share: passed / (u.criteria.length * n), untouched };
    })
    .sort(
      (a, b) =>
        a.share - b.share ||
        b.untouched - a.untouched ||
        a.unit.unit_code.localeCompare(b.unit.unit_code, 'en-GB', { numeric: true })
    );
  weakest = ranked[0];
  totalUntouched = ranked.reduce((s, r) => s + r.untouched, 0);
});

async function settle(page: Page, name: string, phone: boolean) {
  await page.waitForLoadState('networkidle').catch(() => undefined);
  await page.waitForTimeout(800);
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
async function expectVisible(page: Page, find: () => ReturnType<Page['getByText']>, what: string) {
  for (let i = 0; i < 3; i++) {
    try {
      await expect(find().first(), what).toBeVisible({ timeout: 30_000 });
      return;
    } catch (e) {
      if (i === 2) throw e;
      await page.reload({ waitUntil: 'domcontentloaded' });
    }
  }
}

const section = (page: Page) => new URL(page.url()).searchParams.get('section');

for (const viewport of ['desktop', 'phone'] as const) {
  test(`criteria gaps: counts, lesson composer, back (${viewport})`, async ({ browser }) => {
    const phone = viewport === 'phone';
    const { page, errors } = await signedInPage(browser, 'tutor', viewport);
    const headline = new RegExp(
      `${totalUntouched} criteri(on|a) nobody in ${esc(COHORT_NAME)} has started\\. ${esc(unitName(weakest.unit.unit_code))} is the weakest, ${Math.round(weakest.share * 100)}% passed\\.`
    );

    // Curriculum hub: the card, then into the section.
    await page.goto('/college?section=curriculumhub');
    await expectVisible(page, () => page.getByTestId('gaps-card'), 'curriculum hub card');
    await expect(page.getByTestId('gaps-card')).toContainText('Where your classes are weakest');
    await expect(page.getByTestId('gaps-card')).not.toContainText('Reading every learner', {
      timeout: 30_000,
    });
    await settle(page, 'g1-curriculum-hub', phone);
    await page
      .getByTestId('gaps-card')
      .getByRole('button', { name: 'See every criterion' })
      .click();
    await expect.poll(() => section(page)).toBe('criteriagaps');

    // Pick the fixture cohort.
    await page.getByRole('button', { name: COHORT_NAME, exact: true }).click();
    await expect.poll(() => new URL(page.url()).searchParams.get('cohortId')).toBe(COHORT);
    await expectVisible(page, () => page.getByText(headline), 'headline sentence');
    await expect(page.getByText(new RegExp(`${n} learners counted`))).toBeVisible();

    // Units weakest first; the first is open.
    const firstUnit = page.getByTestId('gaps-unit').first();
    await expect(firstUnit).toHaveAttribute('data-unit', weakest.unit.unit_code);
    const rows = firstUnit.getByTestId('gaps-criterion');
    await expect(rows).toHaveCount(weakest.unit.criteria.length);

    // Each criterion's words say the server's counts.
    for (let i = 0; i < Math.min(5, weakest.unit.criteria.length); i++) {
      const c = weakest.unit.criteria[i];
      const lead =
        c.passed === n
          ? `All ${n} passed`
          : c.nothing > 0
            ? `${c.nothing} of ${n} ${c.nothing === 1 ? 'has' : 'have'} nothing yet`
            : `${c.passed} of ${n} passed`;
      await expect(rows.nth(i).getByTestId('gaps-words')).toContainText(lead);
    }
    await settle(page, 'g2-gaps-section', phone);

    // Tap a criterion: who is where, each learner once.
    const c0 = weakest.unit.criteria[0];
    await rows.nth(0).getByRole('button').first().click();
    const sheet = page.getByRole('dialog');
    await expect(sheet).toBeVisible();
    await expect(sheet.getByTestId('gaps-learners').getByRole('button')).toHaveCount(n);
    const nothingNow = c0.states.filter((s) => bucketOf(s) === 'nothing').length;
    if (nothingNow > 0) await expect(sheet.getByText(`Nothing yet (${nothingNow})`)).toBeVisible();
    await settle(page, 'g3-who-is-where', phone);
    await page.keyboard.press('Escape');
    await expect(sheet).toBeHidden();

    // Tick two criteria and plan a lesson for them.
    const picks = weakest.unit.criteria.slice(0, 2).map((c) => c.ac_code);
    for (const code of picks) {
      await firstUnit.getByRole('checkbox', { name: `Select ${code}` }).click();
    }
    await expect(page.getByTestId('gaps-selection')).toContainText(
      `2 criteria from ${unitName(weakest.unit.unit_code)} selected`
    );
    await page.getByRole('button', { name: 'Plan a lesson for these' }).click();
    const composer = page.getByRole('dialog');
    await expect(composer.getByText('Shape the session')).toBeVisible({ timeout: 30_000 });
    await expect(composer.getByText(`Change (2 of ${weakest.unit.criteria.length})`)).toBeVisible();
    for (const code of picks)
      await expect(composer.getByText(code, { exact: true }).first()).toBeVisible();
    // The cohort is preselected (the chosen chip, aria-pressed) once the cohorts load.
    const cohortChip = composer.getByRole('button', { name: new RegExp(`^${esc(COHORT_NAME)}`) });
    await expect(cohortChip).toHaveAttribute('aria-pressed', 'true', { timeout: 30_000 });
    await settle(page, 'g4-composer', phone);
    // Close without generating.
    await page.keyboard.press('Escape');
    await expect(composer.getByText('Shape the session')).toBeHidden();

    // ELE-1905: the same two criteria as a quiz for the class. The draft call
    // is intercepted, so no quiz is written and no AI call is made; the sheet
    // must carry both criteria with their unit (codes repeat across units).
    let authored: { ac_codes?: string[]; cohort_id?: string } | null = null;
    await page.route('**/functions/v1/ai-author-quiz**', async (route) => {
      authored = JSON.parse(route.request().postData() || '{}');
      await route.fulfill({ status: 503, body: JSON.stringify({ error: 'test: not drafting' }) });
    });
    await page.getByRole('button', { name: 'Set a quiz for these' }).click();
    const quizSheet = page.getByRole('dialog').last();
    await expect(quizSheet).toBeVisible();
    await expect
      .poll(() => authored?.ac_codes ?? [], { timeout: 20_000 })
      .toEqual(picks.map((code) => `${weakest.unit.unit_code}:${code}`));
    expect(authored?.cohort_id, 'drafted for the cohort').toBe(COHORT);
    await page.unroute('**/functions/v1/ai-author-quiz**');
    await page.keyboard.press('Escape');
    await expect(quizSheet).toBeHidden();

    // Back returns to the Curriculum hub.
    await page.getByRole('button', { name: '← Back' }).first().click();
    await expect.poll(() => section(page)).toBe('curriculumhub');

    expect(errors).toEqual([]);
  });

  test(`EPA on track says the server's figure (${viewport})`, async ({ browser }) => {
    const phone = viewport === 'phone';
    const t = await actor('tutor');
    const { data, error } = await t.db.rpc('get_college_epa_pace');
    expect(error).toBeNull();
    const pace = data as { measured: number; on_pace: number; tolerance_pct: number };
    expect(pace.measured).toBeGreaterThan(0);

    const { page, errors } = await signedInPage(browser, 'tutor', viewport);
    await page.goto('/college?section=qualitydashboard');
    await expectVisible(
      page,
      () => page.getByText(`${pace.on_pace} of ${pace.measured} learners on pace for EPA`),
      'EPA on track sentence'
    );
    await expect(page.getByText('EPA on track').first()).toBeVisible();
    await settle(page, 'g5-quality', phone);
    expect(errors).toEqual([]);
  });

  test(`a cohort card links to its gaps (${viewport})`, async ({ browser }) => {
    const phone = viewport === 'phone';
    const { page, errors } = await signedInPage(browser, 'tutor', viewport);
    await page.goto(`/college?section=students&cohort=${COHORT}`);
    await expectVisible(page, () => page.getByTestId('gaps-card'), 'cohort roster card');
    await expect(page.getByTestId('gaps-card')).toContainText('Where this class is weakest');
    await expect(page.getByTestId('gaps-card')).toContainText(
      `nobody in ${COHORT_NAME} has started`,
      { timeout: 30_000 }
    );
    await settle(page, 'g6-cohort-roster', phone);
    expect(errors).toEqual([]);
  });
}
