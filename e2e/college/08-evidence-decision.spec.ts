/**
 * Journey 8 — evidence submit → assessor decision → learner sees the outcome.
 *
 * READ-ONLY, deliberately. A write version was built and run on 7 Oct and it
 * cannot be made clean: every evidence, submission and decision event is
 * copied into portfolio_audit_events, which is append-only to EVERY role
 * (trg_pae_immutable raises even for the project owner) — that is the point of
 * an audit trail. Each run would leave seven permanent rows on the fixture
 * learner's record. So this checks the far end of the journey against the
 * decisions already on the fixture learner: the assessor's decisions read the
 * same to the learner and to the tutor, and the learner's qualification page
 * shows them per unit.
 */
import { test, expect } from '@playwright/test';
import { actor, haveCreds, learnerContext, signedInPage } from './support';

test.skip(!haveCreds(), 'College fixture credentials are not available');

interface AcRow {
  unit_code: string;
  ac_code: string;
  state: string;
}

test('assessor decisions show the same to learner and tutor, per unit', async ({ browser }) => {
  const l = await actor('learner');
  const t = await actor('tutor');
  const ctx = await learnerContext();

  const mine = await l.db.rpc('get_portfolio_ac_state', { p_user_id: l.userId });
  const theirs = await t.db.rpc('get_portfolio_ac_state', { p_user_id: l.userId });
  expect(mine.error, mine.error?.message).toBeNull();
  expect(theirs.error, theirs.error?.message).toBeNull();
  const passed = (rows: AcRow[]) => rows.filter((r) => r.state === 'passed' || r.state === 'iqa_confirmed');
  const learnerPassed = passed((mine.data ?? []) as AcRow[]);
  expect(learnerPassed.length, 'the fixture learner has assessed criteria').toBeGreaterThan(0);
  expect(passed((theirs.data ?? []) as AcRow[]).length, 'tutor and learner read the same decisions').toBe(learnerPassed.length);

  // Per unit: "N of M passed" on the learner's qualification page.
  const byUnit = new Map<string, { passed: number; total: number }>();
  for (const r of (mine.data ?? []) as AcRow[]) {
    const u = byUnit.get(r.unit_code) ?? { passed: 0, total: 0 };
    u.total += 1;
    if (r.state === 'passed' || r.state === 'iqa_confirmed') u.passed += 1;
    byUnit.set(r.unit_code, u);
  }
  const learner = await signedInPage(browser, 'learner');
  await learner.page.goto('/apprentice/college/progress');
  for (const [, u] of byUnit) {
    if (u.passed === 0) continue;
    await expect(learner.page.getByText(new RegExp(`^${u.passed} of ${u.total} passed`)).first()).toBeVisible();
  }

  // Tutor: the learner's assessment area opens on the same record.
  const tutor = await signedInPage(browser, 'tutor');
  await tutor.page.goto(`/college?section=student360&studentId=${ctx.student_id}#assess`);
  await expect(tutor.page.getByText('Demo Learner (fixture)').first()).toBeVisible();
  expect([...learner.errors, ...tutor.errors]).toEqual([]);
});
