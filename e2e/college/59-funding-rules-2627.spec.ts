/**
 * Journey 59 — the 2026/27 apprenticeship funding rules, applied by start year
 * (ELE-2038, 2039, 2041, 2042, 2044).
 *
 * Funding rules 2026/27 v3, each paragraph checked against the PDF:
 *   2–3      a learner follows the rules of the year they started;
 *   86.2     no programme below 187 hours; 77 minimum 8-month practical period;
 *   38.2     skills scan; 39.3 price reduction (at least half the RPL % off the band);
 *   96–98    hours statement when ACTUAL < PLANNED, within 12 weeks;
 *   99–101   training plan agreed, para 100 contents, delivered agreement at the end;
 *   103.4.1  re-signed after a change; 346–347 irrefutable e-signatures;
 *   143 / 382 EPA organisation 6 months before gateway / at the start (revised plans);
 *   145.1    EPAO on the ILR. (2025/26 and 2024/25 numbers come from the same map.)
 *
 * Server (real RLS, real functions, as the fixture tutor, learner and an
 * anonymous employer): evidence pack citations per start year; EPAO due and
 * saved; RPL floors and price enforced; HRS4 written; the hours statement uses
 * verified hours and refuses one that is not needed; a training plan issued,
 * signed by all three (provider signed in, apprentice signed in, employer by
 * link), in force, HRS1 fed, signatures immutable and verifiable, version 2
 * needs a reason, and the delivered agreement completes.
 * Browser, desktop 1440 and phone 390: the builder lists what para 100 still
 * needs; the provider signs in the sheet; the apprentice and employer sign on
 * the public page; the plan card, EPAO card (saved on the phone), hours basis
 * and evidence pack citations render with no horizontal scroll.
 *
 * Fixture data only (Demo Learner at Northgate). Everything created is deleted
 * by id and the learner's hours, ILR and starting point are put back.
 */
import { test, expect, type Page } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';
import {
  RUN,
  SUPABASE_URL,
  actor,
  admin,
  adminAvailable,
  haveCreds,
  learnerRoll,
  lit,
  signedInPage,
} from './support';

const ANON =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0d3lnYmVjZXVuZGZnbmtpcm9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyMTc2OTUsImV4cCI6MjA2MTc5MzY5NX0.NgMOzzNkreOiJ2_t_f90NJxIJTcpUninWPYnM7RkrY8';
const BASE = process.env.E2E_BASE_URL ?? 'http://localhost:8080';
const SHOTS = process.env.FR_SHOTS;
const AISHA = 'fc000000-1852-4000-8005-00000000000d'; // 2024/25 start
const CALLUM = 'fc000000-1852-4000-8005-00000000000e'; // 2025/26 start

test.skip(!haveCreds(), 'College fixture credentials are not available');
test.skip(() => !adminAvailable(), 'No Supabase CLI login: cannot clean up');
test.describe.configure({ mode: 'serial' });

let studentId = '';
let learnerUid = '';
let baseline: {
  otj_required_hours: number | null;
  had_sp: boolean;
  had_ilr: boolean;
  stmt_ids: string[];
} = { otj_required_hours: null, had_sp: false, had_ilr: false, stmt_ids: [] };
const newStatementIds: string[] = [];
let planId = '';
let plan2Id = '';

async function rpc<T = unknown>(
  who: 'tutor' | 'learner',
  fn: string,
  args: Record<string, unknown>
) {
  const a = await actor(who);
  const { data, error } = await a.db.rpc(fn, args);
  return { data: data as T, error };
}
const anonDb = () =>
  createClient(SUPABASE_URL, ANON, { auth: { persistSession: false, autoRefreshToken: false } });

async function noHorizontalScroll(page: Page) {
  const over = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth
  );
  expect(over).toBeLessThanOrEqual(1);
}

const FULL_PLAN = (hours: number) => ({
  apprentice: {
    name: 'Demo Learner (fixture)',
    job_role: 'Apprentice electrician',
    weekly_hours: 37.5,
  },
  parties: {
    provider: 'Northgate College (fixture)',
    employer: 'Fixture Electrical Ltd',
    subcontractors: '',
    epao: 'NET (fixture)',
  },
  initial_assessment_summary: `${RUN} English level 2, maths level 1, no relevant prior learning`,
  programme: {
    standard: 'Installation and maintenance electrician (ST0152)',
    level: '3',
    start_date: '2026-10-06',
    end_date: '2028-10-31',
    practical_start: '2026-10-06',
    practical_end: '2028-07-14',
  },
  planned_otj_hours: hours,
  delivery_model: 'Day release',
  occupational_training: [
    {
      content: 'K1 to K15 knowledge units',
      hours,
      in_otj: true,
      when: 'Year 1 and 2, every Monday',
      who: 'College',
    },
  ],
  english_maths: { english: 'achieved', maths: 'to_deliver', not_in_otj: true, details: null },
  prior_learning: { recorded: true, hours_reduced: 0, summary: 'None found' },
  support: null,
  employer_otj_confirmation: true,
  reviews: { frequency_months: 3, format: 'Three-way review, face to face or online' },
  complaints:
    'Tutor, then apprenticeship manager, then Apprenticeship Service Support on 08000 150 600.',
});

test.beforeAll(async () => {
  const roll = await learnerRoll();
  studentId = roll.id;
  learnerUid = (await actor('learner')).userId;
  const S = lit(studentId);
  const b = admin<{
    otj: string | null;
    sp: number;
    ilr: number;
    stmts: string[] | null;
  }>(`select (select otj_required_hours from college_students where id = ${S})::text otj,
            (select count(*) from college_learner_starting_points where student_id = ${S})::int sp,
            (select count(*) from college_student_ilr where student_id = ${S})::int ilr,
            (select array_agg(id) from otj_hours_statements where college_student_id = ${S} and superseded_at is null) stmts`)[0];
  baseline = {
    otj_required_hours: b.otj == null ? null : Number(b.otj),
    had_sp: b.sp > 0,
    had_ilr: b.ilr > 0,
    stmt_ids: b.stmts ?? [],
  };
  // A crashed earlier run: no builder plan may be left on the fixture.
  admin(`delete from college_training_plans where student_id = ${S};
         delete from college_learner_epao where student_id = ${S};`);
});

test.afterAll(async () => {
  if (!studentId) return;
  const S = lit(studentId);
  admin(`
    delete from college_training_plans where student_id = ${S};
    delete from college_learner_epao where student_id = ${S};
    delete from user_notifications where user_id = ${lit(learnerUid)} and (
      (type = 'training_plan' and metadata->>'plan_id' in (${[planId, plan2Id].filter(Boolean).map(lit).join(',') || "''"}))
      or (type = 'otj_statement' and metadata->>'statement_id' in (${newStatementIds.map(lit).join(',') || "''"})));
    ${newStatementIds.length ? `delete from otj_hours_statements where id in (${newStatementIds.map(lit).join(',')});` : ''}
    ${baseline.stmt_ids.length ? `update otj_hours_statements set superseded_at = null where id in (${baseline.stmt_ids.map(lit).join(',')});` : ''}
    update college_students set otj_required_hours = ${baseline.otj_required_hours ?? 'null'} where id = ${S};
    ${baseline.had_sp ? '' : `delete from college_learner_starting_points where student_id = ${S};`}
    ${baseline.had_ilr ? '' : `delete from college_student_ilr where student_id = ${S};`}
  `);
  const left = admin<{ n: number }>(
    `select ((select count(*) from college_training_plans where student_id = ${S})
           + (select count(*) from college_learner_epao where student_id = ${S}))::int n`
  )[0];
  expect(left.n).toBe(0);
});

test('ELE-2038 evidence pack cites the rules of each learner’s start year', async () => {
  const items = async (id: string) => {
    const { data, error } = await rpc<{
      rules: { year: string; evidence_section: string };
      items: Array<Record<string, string | boolean | null>>;
    }>('tutor', 'get_learner_evidence_pack', { p_student: id });
    expect(error).toBeNull();
    return data;
  };
  const p27 = await items(studentId);
  expect(p27.rules.year).toBe('2026/27');
  expect(p27.rules.evidence_section).toBe('344–354');
  const by = (p: typeof p27, k: string) => p.items.find((i) => i.key === k)!;
  expect(by(p27, 'reviews').para).toBe('102–103');
  expect(by(p27, 'training_plan').para).toBe('99–100; 103.4.1');
  expect(by(p27, 'otj_statement').para).toBe('96–98');
  expect(by(p27, 'epa_employment').para).toBe('148; box after 157');
  expect(by(p27, 'training_plan_delivered').para).toBe('101');
  expect(by(p27, 'epao_on_time').para).toBe('143; 100.2.1');
  expect(by(p27, 'prior_learning').para).toBe('39; 39.3; 86.2');
  // Every rules item is either a verified citation or says it is not checked.
  for (const it of p27.items.filter((i) => !i.custom)) {
    expect(it.rules_year).toBe('2026/27');
    if (it.para) expect(it.para_verified).toBe(true);
    else expect(String(it.para_note ?? '')).not.toBe('');
  }
  const p26 = await items(CALLUM);
  expect(p26.rules.year).toBe('2025/26');
  expect(by(p26, 'reviews').para).toBe('97–98');
  expect(by(p26, 'training_plan_delivered').status).toBe('not_applicable');
  const p25 = await items(AISHA);
  expect(p25.rules.year).toBe('2024/25');
  expect(by(p25, 'reviews').para).toBe('101–102');
  expect(by(p25, 'english_maths').para).toBeNull(); // not pinned for 2024/25: shown as unverified
});

test('ELE-2041 EPA organisation: due date, refusal of a future date, saved to the ILR, Needs you', async () => {
  const before = await rpc<{ due: { status: string; due_date: string; para: string } }>(
    'tutor',
    'get_learner_epao',
    {
      p_student: studentId,
    }
  );
  expect(before.error).toBeNull();
  expect(before.data.due.due_date).toBe('2028-01-14'); // 6 months before 14 Jul 2028
  expect(before.data.due.status).toBe('not_yet_due');
  const future = await rpc('tutor', 'set_learner_epao', {
    p_student: studentId,
    p_name: 'NET (fixture)',
    p_org_id: 'EPA0001',
    p_plan: 'current',
    p_chosen_on: '2099-01-01',
    p_price: null,
    p_agreement_signed_on: null,
    p_notes: RUN,
  });
  expect(future.error?.message).toContain('not in the future');
  const learnerTry = await rpc('learner', 'set_learner_epao', {
    p_student: studentId,
    p_name: 'NET',
    p_org_id: null,
    p_plan: null,
    p_chosen_on: '2026-10-08',
    p_price: null,
    p_agreement_signed_on: null,
    p_notes: null,
  });
  expect(learnerTry.error).not.toBeNull();
  const ok = await rpc<{ due: { status: string } }>('tutor', 'set_learner_epao', {
    p_student: studentId,
    p_name: 'NET (fixture)',
    p_org_id: 'epa 0001',
    p_plan: 'current',
    p_chosen_on: '2026-10-08',
    p_price: 950,
    p_agreement_signed_on: null,
    p_notes: RUN,
  });
  expect(ok.error).toBeNull();
  expect(ok.data.due.status).toBe('ok');
  expect(
    admin<{ id: string }>(
      `select epa_org_id id from college_student_ilr where student_id = ${lit(studentId)}`
    )[0].id
  ).toBe('EPA0001');
  // Aisha (planned end 18 Dec 2026, no EPAO) is overdue in the tutor's inbox.
  const inbox = await rpc<{
    items: Array<{ kind: string; student_id: string; title: string; urgent: boolean }>;
  }>('tutor', 'get_college_inbox', { p_college: null });
  const aisha = inbox.data.items.find((i) => i.kind === 'deadline' && i.student_id === AISHA);
  expect(aisha?.title).toBe('EPA organisation overdue');
  expect(aisha?.urgent).toBe(true);
  expect(inbox.data.items.some((i) => i.kind === 'deadline' && i.student_id === studentId)).toBe(
    false
  );
});

test('ELE-2042 prior learning: scan first, 187-hour floor, price reduction, HRS4', async () => {
  const noScan = await rpc('tutor', 'record_rpl_decision', {
    p_student: studentId,
    p_hours_reduced: 100,
    p_reason: RUN,
  });
  expect(noScan.error?.message).toContain('skills scan');
  const badScan = await rpc('tutor', 'save_ksb_skills_scan', {
    p_student: studentId,
    p_scan: [{ code: 'K1', kind: 'K', title: 'x', level: 'full', evidence: '', hours_credit: 50 }],
    p_assessed_on: '2026-10-08',
  });
  expect(badScan.error?.message).toContain('evidence');
  const scan = await rpc<{ suggested_hours: number }>('tutor', 'save_ksb_skills_scan', {
    p_student: studentId,
    p_scan: [
      {
        code: 'K1',
        kind: 'K',
        title: 'Health and safety',
        level: 'full',
        evidence: `${RUN} Level 2 Diploma unit 201`,
        hours_credit: 100,
      },
      {
        code: 'S1',
        kind: 'S',
        title: 'Safe isolation',
        level: 'none',
        evidence: '',
        hours_credit: null,
      },
    ],
    p_assessed_on: '2026-10-08',
  });
  expect(scan.error).toBeNull();
  expect(scan.data.suggested_hours).toBe(100);
  const floor = await rpc('tutor', 'record_rpl_decision', {
    p_student: studentId,
    p_hours_reduced: 900,
    p_reason: RUN,
  });
  expect(floor.error?.message).toContain('187 hours');
  expect(floor.error?.message).toContain('para 86.2');
  const ok = await rpc<{ required_hours: number; rpl_percent: number; rules_year: string }>(
    'tutor',
    'record_rpl_decision',
    {
      p_student: studentId,
      p_hours_reduced: 100,
      p_reason: `${RUN} unit 201 held`,
    }
  );
  expect(ok.error).toBeNull();
  expect(ok.data.rules_year).toBe('2026/27');
  expect(
    admin<{ h: number }>(
      `select hrs_planned_reduction h from college_student_ilr where student_id = ${lit(studentId)}`
    )[0].h
  ).toBe(100);
  const pct = ok.data.rpl_percent; // 100 / base
  const band = 18000;
  const maxPrice = Math.round((band - band * (pct / 100) * 0.5) * 100) / 100;
  const tooHigh = await rpc('tutor', 'record_rpl_price', {
    p_student: studentId,
    p_funding_band_max: band,
    p_agreed_price: band,
  });
  expect(tooHigh.error?.message).toContain('para 39.3');
  const price = await rpc<{ max_price: number }>('tutor', 'record_rpl_price', {
    p_student: studentId,
    p_funding_band_max: band,
    p_agreed_price: Math.floor(maxPrice),
  });
  expect(price.error).toBeNull();
  expect(Number(price.data.max_price)).toBeCloseTo(maxPrice, 1);
  const pack = await rpc<{ items: Array<{ key: string; status: string }> }>(
    'tutor',
    'get_learner_evidence_pack',
    { p_student: studentId }
  );
  expect(pack.data.items.find((i) => i.key === 'prior_learning')?.status).toBe('ok');
  // Put the hours back (the afterAll restores the exact baseline too).
  const reset = await rpc('tutor', 'record_rpl_decision', {
    p_student: studentId,
    p_hours_reduced: 0,
    p_reason: '',
  });
  expect(reset.error).toBeNull();
  admin(
    `update college_students set otj_required_hours = ${baseline.otj_required_hours ?? 'null'} where id = ${lit(studentId)}`
  );
});

test('ELE-2044 hours statement: verified actual against planned, app time kept apart', async () => {
  const basis = await rpc<{
    planned_hours: number;
    verified_hours: number;
    app_tracked_hours: number;
    statement_needed: boolean;
  }>('tutor', 'get_hours_statement_basis', { p_user: learnerUid });
  expect(basis.error).toBeNull();
  expect(basis.data.planned_hours).toBeGreaterThan(0);
  const notNeeded = await rpc<{ error?: string }>('tutor', 'prepare_otj_hours_statement', {
    p_user: learnerUid,
    p_planned_hours: Math.max(0.1, basis.data.verified_hours - 0.5) || 0.1,
    p_reason: `${RUN} not needed check`,
    p_rpl_hours: 0,
  });
  const nn = notNeeded.data as { error?: string; success?: boolean; id?: string };
  if (nn.success && nn.id) newStatementIds.push(nn.id);
  if (basis.data.verified_hours > 0.6) expect(nn.error).toContain('No statement is needed');
  const made = await rpc<{ success: boolean; id: string }>('tutor', 'prepare_otj_hours_statement', {
    p_user: learnerUid,
    p_planned_hours: basis.data.planned_hours,
    p_reason: `${RUN} fewer hours delivered than planned`,
    p_rpl_hours: 0,
  });
  expect(made.error).toBeNull();
  expect(made.data.success).toBe(true);
  newStatementIds.push(made.data.id);
  const row = admin<{ actual_hours: string; verified_hours: string; app_learning_hours: string }>(
    `select actual_hours, verified_hours, app_learning_hours from otj_hours_statements where id = ${lit(made.data.id)}`
  )[0];
  expect(Number(row.actual_hours)).toBe(Number(row.verified_hours)); // never verified + app
  expect(Number(row.app_learning_hours)).toBeCloseTo(basis.data.app_tracked_hours, 1);
});

test('ELE-2039 training plan: para 100, three signatures, in force, HRS1, immutable, versions, delivered', async ({
  browser,
}) => {
  test.setTimeout(420_000);
  // Builder in the browser (desktop): save a thin draft and see what para 100 still needs.
  const { context, page, errors } = await signedInPage(browser, 'tutor', 'desktop');
  await page.goto(`${BASE}/college?section=student360&studentId=${studentId}#training-plan`);
  await expect(page.getByTestId('training-plan-sentence')).toContainText(
    /No plan built yet|draft/,
    { timeout: 45_000 }
  );
  await page.getByTestId('training-plan-build').click();
  await page.getByTestId('tp-job-role').fill('Apprentice electrician');
  await page.getByTestId('tp-save').click();
  await expect(page.getByTestId('tp-missing')).toContainText('(100.12)', { timeout: 20_000 });
  await expect(page.getByTestId('tp-missing')).toContainText('(100.7)');
  if (SHOTS) await page.screenshot({ path: `${SHOTS}/tp-builder-desktop.png` });
  await page.keyboard.press('Escape');

  // Complete it through the same function the builder uses, then issue.
  const hours = (baseline.otj_required_hours ?? 1066) + 34;
  const saved = await rpc<{ id: string; missing: string[] }>('tutor', 'save_training_plan_draft', {
    p_student: studentId,
    p_content: FULL_PLAN(hours),
    p_change_reason: null,
  });
  expect(saved.error).toBeNull();
  expect(saved.data.missing).toEqual([]);
  planId = saved.data.id;
  const issued = await rpc<{ ok: boolean; content_hash: string }>('tutor', 'issue_training_plan', {
    p_plan: planId,
  });
  expect(issued.data.ok).toBe(true);
  expect(issued.data.content_hash).toMatch(/^[0-9a-f]{64}$/);
  const learnerCannotRead = await rpc('learner', 'get_training_plan_links', { p_plan: planId });
  expect(learnerCannotRead.error).not.toBeNull();
  const links = (
    await rpc<Array<{ purpose: string; role: string; token: string }>>(
      'tutor',
      'get_training_plan_links',
      { p_plan: planId }
    )
  ).data;
  const tok = (purpose: string, role: string) =>
    links.find((l) => l.purpose === purpose && l.role === role)!.token;

  // Provider signs in the sheet.
  await page.reload();
  await expect(page.getByTestId('training-plan-sentence')).toContainText('waiting for', {
    timeout: 45_000,
  });
  await page.getByTestId('training-plan-sign-provider').click();
  await page.getByTestId('provider-sign-name').fill('Demo Tutor (fixture)');
  await page.getByTestId('provider-sign-agree').click();
  await page.getByTestId('provider-sign-submit').click();
  await expect(page.getByTestId('training-plan-sentence')).toContainText('apprentice, employer', {
    timeout: 20_000,
  });

  // The apprentice must be signed in as themself: anonymously the link refuses.
  const anonTry = await anonDb().rpc('sign_training_plan_by_link', {
    p_token: tok('plan', 'apprentice'),
    p_name: 'Someone',
  });
  expect((anonTry.data as { needs_sign_in?: boolean }).needs_sign_in).toBe(true);
  const ap = await signedInPage(browser, 'learner', 'phone');
  await ap.page.goto(`${BASE}/training-plan/sign/${tok('plan', 'apprentice')}`);
  await expect(ap.page.getByTestId('plan-content')).toContainText('Apprentice electrician', {
    timeout: 45_000,
  });
  await ap.page.getByTestId('sign-name').fill('Demo Learner (fixture)');
  await ap.page.getByTestId('sign-agree').click();
  await ap.page.getByTestId('sign-submit').click();
  await expect(ap.page.getByTestId('plan-signed')).toBeVisible({ timeout: 20_000 });
  await noHorizontalScroll(ap.page);
  if (SHOTS) await ap.page.screenshot({ path: `${SHOTS}/tp-apprentice-phone.png`, fullPage: true });
  expect(ap.errors).toEqual([]);
  await ap.context.close();

  // The employer signs by link with no account (desktop).
  const emp = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'en-GB' });
  const ep = await emp.newPage();
  const epErrors: string[] = [];
  ep.on('pageerror', (e) => epErrors.push(String(e)));
  await ep.goto(`${BASE}/training-plan/sign/${tok('plan', 'employer')}`);
  await expect(ep.getByTestId('plan-content')).toBeVisible({ timeout: 45_000 });
  await ep.getByTestId('sign-name').fill('Fixture Employer');
  await ep.getByTestId('sign-company').fill('Fixture Electrical Ltd');
  await ep.getByTestId('sign-agree').click();
  await ep.getByTestId('sign-submit').click();
  await expect(ep.getByTestId('plan-signed')).toBeVisible({ timeout: 20_000 });
  expect(epErrors).toEqual([]);
  await emp.close();

  // In force; HRS1 fed; irrefutable.
  await page.reload();
  await expect(page.getByTestId('training-plan-sentence')).toContainText(`in force since`, {
    timeout: 45_000,
  });
  await expect(page.getByTestId('training-plan-sentence')).toContainText(
    `${hours} planned off-the-job hours`
  );
  if (SHOTS) await page.screenshot({ path: `${SHOTS}/tp-in-force-desktop.png`, fullPage: true });
  expect(
    Number(
      admin<{ h: string }>(
        `select otj_required_hours h from college_students where id = ${lit(studentId)}`
      )[0].h
    )
  ).toBe(hours);
  const v = await rpc<{ content_unchanged: boolean; signatures_intact: boolean }>(
    'tutor',
    'verify_training_plan',
    { p_plan: planId }
  );
  expect(v.data).toMatchObject({ content_unchanged: true, signatures_intact: true });
  expect(() =>
    admin(
      `update college_training_plan_signatures set signer_name = 'X' where plan_id = ${lit(planId)}`
    )
  ).toThrow();
  expect(() =>
    admin(`update college_training_plans set content = '{}'::jsonb where id = ${lit(planId)}`)
  ).toThrow();

  // Version 2 needs a reason (103.4.1); version 1 stays in force while it waits.
  const noReason = await rpc('tutor', 'save_training_plan_draft', {
    p_student: studentId,
    p_content: FULL_PLAN(hours),
    p_change_reason: '',
  });
  expect(noReason.error?.message).toContain('103.4.1');
  const v2 = await rpc<{ id: string }>('tutor', 'save_training_plan_draft', {
    p_student: studentId,
    p_content: FULL_PLAN(hours + 10),
    p_change_reason: `${RUN} end date moved at review`,
  });
  plan2Id = v2.data.id;
  expect(
    (await rpc<{ ok: boolean }>('tutor', 'issue_training_plan', { p_plan: plan2Id })).data.ok
  ).toBe(true);
  await page.reload();
  await expect(page.getByTestId('training-plan-sentence')).toContainText(
    'Version 1 stays in force',
    { timeout: 45_000 }
  );
  await expect(page.getByTestId('training-plan-versions')).toContainText('Version 2');

  // The delivered agreement (para 101) on version 1.
  await page.getByTestId('training-plan-ask-delivered').click();
  await page.getByTestId('training-plan-delivered-sign').click({ timeout: 20_000 });
  await page.getByTestId('provider-sign-name').fill('Demo Tutor (fixture)');
  await page.getByTestId('provider-sign-agree').click();
  await page.getByTestId('provider-sign-submit').click();
  const links2 = (
    await rpc<Array<{ purpose: string; role: string; token: string }>>(
      'tutor',
      'get_training_plan_links',
      { p_plan: planId }
    )
  ).data;
  const dTok = (role: string) =>
    links2.find((l) => l.purpose === 'delivered' && l.role === role)!.token;
  const lr = await rpc<{ ok: boolean }>('learner', 'sign_training_plan_by_link', {
    p_token: dTok('apprentice'),
    p_name: 'Demo Learner (fixture)',
  });
  expect(lr.data.ok).toBe(true);
  const er = await anonDb().rpc('sign_training_plan_by_link', {
    p_token: dTok('employer'),
    p_name: 'Fixture Employer',
    p_company: 'Fixture Electrical Ltd',
  });
  expect((er.data as { complete: boolean }).complete).toBe(true);
  await page.reload();
  await expect(page.getByTestId('training-plan-delivered')).toContainText('All three agreed', {
    timeout: 45_000,
  });
  const pack = await rpc<{ items: Array<{ key: string; status: string }> }>(
    'tutor',
    'get_learner_evidence_pack',
    { p_student: studentId }
  );
  expect(pack.data.items.find((i) => i.key === 'training_plan_delivered')?.status).toBe('ok');
  expect(pack.data.items.find((i) => i.key === 'training_plan')?.status).toBe('attention'); // v2 waiting
  await noHorizontalScroll(page);
  expect(errors).toEqual([]);
  await context.close();
});

for (const vp of ['desktop', 'phone'] as const) {
  test(`renders on ${vp}: EPAO card, plan card, hours basis, evidence pack citations`, async ({
    browser,
  }) => {
    test.setTimeout(240_000);
    const { context, page, errors } = await signedInPage(browser, 'tutor', vp);
    await page.goto(`${BASE}/college?section=student360&studentId=${studentId}#epao`);
    await expect(page.getByTestId('epao-card')).toBeVisible({ timeout: 45_000 });
    await expect(page.getByTestId('training-plan')).toBeVisible();
    if (vp === 'phone') {
      // ELE-2041 in the UI: change the organisation on a phone.
      await page.getByTestId('epao-edit').click();
      await page.getByTestId('epao-name').fill('NET (fixture, phone)');
      await page.getByTestId('epao-save').click();
      await expect(page.getByTestId('epao-card')).toContainText('NET (fixture, phone)', {
        timeout: 20_000,
      });
    }
    await expect(page.getByTestId('epao-status')).toContainText('Chosen on time');
    await noHorizontalScroll(page);
    if (SHOTS) await page.screenshot({ path: `${SHOTS}/s360-epao-${vp}.png`, fullPage: true });

    await page.goto(`${BASE}/college?section=student360&studentId=${studentId}#otj`);
    await expect(page.getByTestId('hours-basis-app')).toContainText('not in', { timeout: 45_000 });
    await noHorizontalScroll(page);

    await page.goto(`${BASE}/college/evidence-pack/${studentId}`);
    await expect(page.getByText('Funding rules 2026/27 para 102–103')).toBeVisible({
      timeout: 45_000,
    });
    await expect(page.getByTestId('pack-rules-source')).toContainText('2026/27');
    await expect(page.getByTestId('pack-rules-source')).toContainText('344–354');
    await noHorizontalScroll(page);
    if (SHOTS) await page.screenshot({ path: `${SHOTS}/pack-${vp}.png`, fullPage: true });
    expect(errors).toEqual([]);
    await context.close();
  });
}
