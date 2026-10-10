/**
 * Journey 30 — one readiness answer everywhere, read-only (8 Oct 2026).
 *
 * For the fixture learner, reads the two sources of truth through the app's
 * own clients:
 *   get_portfolio_ac_state  criteria passed (passed + IQA confirmed) of total
 *   get_gateway_readiness   gateway lines met (green) of total
 * then checks every screen that shows those figures says the same thing, in
 * words: the learner's college home, their EPA page and Readiness view; and,
 * as the tutor, Student 360 (criteria and EPA areas), Gateway readiness
 * (/college/epa), Progress tracking and its quick view, EPA admin and the
 * Assessment hub. Nothing is written. Screenshots go to READINESS_SHOTS.
 */
import fs from 'node:fs';
import path from 'node:path';
import { test, expect, type Page } from '@playwright/test';
import { NORTHGATE, actor, haveCreds, learnerContext, signedInPage } from './support';

test.skip(!haveCreds(), 'College fixture credentials are not available');
const SHOTS = process.env.READINESS_SHOTS;

interface Truth {
  passed: number;
  total: number;
  met: number;
  lines: number;
  allMet: boolean;
  gatePassed: boolean;
}

async function truthFor(who: 'learner' | 'tutor', learnerId: string): Promise<Truth> {
  const a = await actor(who);
  const { data: ac, error: acErr } = await a.db.rpc('get_portfolio_ac_state', {
    p_user_id: learnerId,
  });
  expect(acErr, `get_portfolio_ac_state as ${who}`).toBeNull();
  const rows = (ac ?? []) as Array<{ state: string }>;
  const { data: gate, error: gErr } = await a.db.rpc('get_gateway_readiness', {
    p_learner: learnerId,
  });
  expect(gErr, `get_gateway_readiness as ${who}`).toBeNull();
  const items = ((gate as { items?: Array<{ state: string }> } | null)?.items ?? []) as Array<{
    state: string;
  }>;
  const met = items.filter((i) => i.state === 'green').length;
  return {
    passed: rows.filter((r) => r.state === 'passed' || r.state === 'iqa_confirmed').length,
    total: rows.length,
    met,
    lines: items.length,
    allMet: items.length > 0 && met === items.length,
    gatePassed: !!(gate as { gateway_passed?: boolean } | null)?.gateway_passed,
  };
}

async function settle(page: Page, name: string, phone: boolean) {
  await page.waitForLoadState('networkidle').catch(() => undefined);
  await page.waitForTimeout(1200);
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
async function expectText(page: Page, re: RegExp, what: string, tries = 3) {
  for (let i = 0; i < tries; i++) {
    try {
      await expect(page.getByText(re).first(), what).toBeVisible({ timeout: 20_000 });
      return;
    } catch (e) {
      if (i === tries - 1) throw e;
      await page.reload({ waitUntil: 'domcontentloaded' });
    }
  }
}

const gateWords = (t: Truth) =>
  t.gatePassed
    ? /Gateway passed/
    : t.allMet
      ? /Ready for gateway/
      : new RegExp(`${t.met} of ${t.lines} gateway lines met`);

let truth: Truth;
let learnerUserId: string;

test.beforeAll(async () => {
  const l = await actor('learner');
  learnerUserId = l.userId;
  truth = await truthFor('learner', l.userId);
  // The tutor's view of the same learner must be the same numbers.
  const asTutor = await truthFor('tutor', l.userId);
  expect(asTutor, 'tutor and learner read the same criteria and gate').toEqual(truth);
  expect(truth.total, 'the fixture learner has a qualification').toBeGreaterThan(0);
  expect(truth.lines, 'the fixture learner has gateway lines').toBeGreaterThan(0);
});

for (const viewport of ['desktop', 'phone'] as const) {
  test(`learner sees the same readiness everywhere (${viewport})`, async ({ browser }) => {
    const phone = viewport === 'phone';
    const crit = `${truth.passed} of ${truth.total}`;
    const { page, errors } = await signedInPage(browser, 'learner', viewport);

    // College home: the Progress and EPA areas.
    await page.goto('/apprentice/college-plan');
    await expectText(page, new RegExp(`${crit} criteria passed`), 'college home: criteria');
    await expectText(page, gateWords(truth), 'college home: gateway lines');
    await settle(page, 'r-l1-college-home', phone);

    // College EPA page: the gateway card.
    await page.goto('/apprentice/college/epa');
    const card = page.getByTestId('my-gateway-card');
    await expect(card).toBeVisible({ timeout: 30_000 });
    await expect(page.getByTestId('my-gateway-met')).toHaveText(
      `${truth.met} of ${truth.lines} gateway lines met`
    );
    await expect(page.getByTestId('my-gateway-criteria')).toHaveText(`${crit} criteria passed`);
    await settle(page, 'r-l2-college-epa', phone);

    // The portfolio Readiness view: the gate's criteria sentence.
    await page.goto('/apprentice/hub?tab=work&view=readiness');
    await expectText(page, new RegExp(`${crit} passed`), 'readiness view: criteria line');
    await settle(page, 'r-l3-readiness', phone);

    expect(errors).toEqual([]);
  });

  test(`tutor sees the same readiness everywhere (${viewport})`, async ({ browser }) => {
    const phone = viewport === 'phone';
    const ctx = await learnerContext();
    const crit = `${truth.passed} of ${truth.total}`;
    const t = await actor('tutor');

    // College-wide gate counts, as the Assessment hub and EPA admin count them.
    const { data: roll } = await t.db
      .from('college_students')
      .select('user_id, status')
      .eq('college_id', NORTHGATE)
      .ilike('status', 'active');
    const ids = ((roll ?? []) as Array<{ user_id: string | null }>)
      .map((r) => r.user_id)
      .filter((x): x is string => !!x)
      .slice(0, 100);
    const { data: many } = await t.db.rpc('get_gateway_readiness_many', { p_learners: ids });
    const gates = (many ?? {}) as Record<
      string,
      { gateway_passed?: boolean; items?: Array<{ state: string }> }
    >;
    let ready = 0;
    for (const id of ids) {
      const g = gates[id];
      if (!g?.items?.length || g.gateway_passed) continue;
      if (g.items.every((i) => i.state === 'green')) ready += 1;
    }
    // Same learner through the many-call as through the single one.
    const mine = gates[learnerUserId];
    if (mine?.items) {
      expect(mine.items.filter((i) => i.state === 'green').length).toBe(truth.met);
      expect(mine.items.length).toBe(truth.lines);
    }

    const { page, errors } = await signedInPage(browser, 'tutor', viewport);

    // Student 360, criteria area.
    await page.goto(`/college?section=student360&studentId=${ctx.student_id}#assess`);
    await expectText(page, new RegExp(crit), 'Student 360 criteria hero');
    await settle(page, 'r-t1-s360-assess', phone);

    // Student 360, EPA area: the readiness model's portfolio line and the gate card.
    await page.goto(`/college?section=student360&studentId=${ctx.student_id}#epa`);
    await expectText(page, new RegExp(`${crit} criteria passed`), 'Student 360 EPA portfolio');
    await expectText(page, new RegExp(`${crit} passed`), 'Student 360 gate criteria line');
    await settle(page, 'r-t2-s360-epa', phone);

    // Gateway readiness (/college/epa): the learner's criteria item.
    await page.goto('/college/epa');
    await expectText(page, new RegExp(`${crit} passed`), 'cohort EPA: criteria item');
    await settle(page, 'r-t3-cohort-epa', phone);

    // Progress tracking: the row figure, then the quick view.
    await page.goto('/college?section=progresstracking');
    await expectText(page, new RegExp(crit), 'progress tracking row');
    await settle(page, 'r-t4-progress', phone);
    const more = page.getByRole('button', { name: /More for Demo Learner \(fixture\)/ }).first();
    if (await more.isVisible().catch(() => false)) {
      await more.click();
      await page.getByRole('menuitem', { name: 'Quick view' }).click();
      await expect(page.getByTestId('sds-criteria')).toContainText(crit, { timeout: 20_000 });
      await settle(page, 'r-t5-quick-view', phone);
      await page.keyboard.press('Escape');
    }

    // EPA admin: the Gateway readiness card counts every-line-met.
    await page.goto('/college?section=epatracking');
    // The tutor's scope (mine / cohorts / whole college) is their own saved
    // setting, so the figure is at most the college-wide count, and exactly
    // it when nobody at the college has every line met.
    await expectText(page, /^\d+ of \d+$/, 'EPA admin gateway figure');
    const fig =
      (await page
        .getByText(/^\d+ of \d+$/)
        .first()
        .textContent()) ?? '';
    const shownReady = Number(fig.split(' of ')[0]);
    if (ready === 0) expect(shownReady).toBe(0);
    else expect(shownReady).toBeLessThanOrEqual(ready);
    await settle(page, 'r-t6-epa-admin', phone);

    // Assessment hub: Ready for gateway from the gate, not a typed stage.
    await page.goto('/college?section=assessmenthub');
    const kpi = page.getByRole('button', { name: /Ready for gateway/ }).first();
    await expect(kpi).toBeVisible({ timeout: 30_000 });
    await expect(kpi).toContainText(String(ready));
    await expect(page.getByText(/ready to submit/i)).toHaveCount(0);
    await settle(page, 'r-t7-assessment-hub', phone);

    // Home: if the learner is heading to EPA, their row shows the gate count.
    await page.goto('/college');
    await settle(page, 'r-t8-home', phone);
    const row = page.getByRole('button', { name: /Demo Learner \(fixture\)/ }).filter({
      hasText: /met$/,
    });
    if (await row.count())
      await expect(row.first()).toContainText(`${truth.met} of ${truth.lines}`);

    expect(errors).toEqual([]);
  });
}
