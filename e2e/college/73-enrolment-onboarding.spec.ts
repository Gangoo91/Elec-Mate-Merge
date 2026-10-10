/**
 * Journey 73 — enrolment and eligibility in one onboarding flow (ELE-2088).
 *
 * For each of desktop (1440) and phone (390), on a throwaway learner and
 * employer at the Northgate demo college:
 *   - the tutor starts onboarding in Student 360 and issues the
 *     apprenticeship agreement (para 72); the initial assessment, prior
 *     learning and a signed training plan are set up through their own
 *     functions (ELE-2039/2042), not duplicated here;
 *   - the learner, with no account, opens their link and confirms
 *     eligibility and residency, uploads an ID photo (private bucket) and
 *     signs the agreement;
 *   - the employer opens their link with no login, confirms the employment,
 *     signs the agreement (a second signature by the learner's name is
 *     refused, para 71.1) and confirms the contract for services;
 *   - the tutor checks the ID, sees "Ready to start" in Student 360 and on
 *     /college/onboarding;
 *   - the evidence pack lists every completed item with its 2026/27 paragraph;
 *   - nothing can be altered (verify_onboarding) and records cannot be edited.
 * Clean-up: the uploaded file, then every row for the throwaway learner and
 * employer, by id.
 */
import { execFileSync } from 'node:child_process';
import { test, expect, type Browser, type Page } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';
import {
  actor,
  admin,
  adminAvailable,
  haveCreds,
  lit,
  londonDate,
  NORTHGATE,
  PROJECT_REF,
  RUN,
  signedInPage,
  SUPABASE_URL,
} from './support';

test.skip(!haveCreds(), 'College fixture credentials are not available');
test.skip(!adminAvailable(), 'Needs the Supabase CLI to create and remove the throwaway learner');

const ANON =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0d3lnYmVjZXVuZGZnbmtpcm9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyMTc2OTUsImV4cCI6MjA2MTc5MzY5NX0.NgMOzzNkreOiJ2_t_f90NJxIJTcpUninWPYnM7RkrY8';
const anonDb = () =>
  createClient(SUPABASE_URL, ANON, { auth: { persistSession: false, autoRefreshToken: false } });

// A 1×1 PNG: the ID "photo".
const PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  'base64'
);

const PARAS = {
  onb_eligibility: '29; 30.2–30.4; 34; 345.2; 353',
  onb_residency: '29.1; 354–355; Annex A (358–375); 353',
  onb_id_rtw: 'box after 34; 30.2; 354',
  onb_employer_eligibility: '24; 30.5; 69; 69.2; 71.2; box after 34; 353',
  onb_agreement: '70–72; 99.4; 346–347',
  onb_contract_for_services: '208; 208.1; box after 211',
};

async function tutorRpc<T = unknown>(fn: string, args: Record<string, unknown>): Promise<T> {
  const t = await actor('tutor');
  const { data, error } = await t.db.rpc(fn, args);
  if (error) throw new Error(`${fn}: ${error.message}`);
  return data as T;
}

async function noLoginContext(browser: Browser, viewport: Record<string, unknown>) {
  const ctx = await browser.newContext({
    ...viewport,
    locale: 'en-GB',
    timezoneId: 'Europe/London',
  });
  // A real visitor answers the cookie banner once; on a phone it otherwise
  // sits over the confirm button.
  await ctx.addInitScript(() => {
    try {
      window.localStorage.setItem(
        'elec-mate-cookie-consent',
        JSON.stringify({
          necessary: true,
          analytics: false,
          marketing: false,
          timestamp: Date.now(),
        })
      );
    } catch {
      /* storage blocked */
    }
  });
  ctx.setDefaultTimeout(45_000);
  return ctx;
}

async function noSideways(page: Page, label: string) {
  const over = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth
  );
  expect(over, `no sideways scroll (${label})`).toBeLessThanOrEqual(1);
}

function serviceKey(): string | null {
  try {
    const out = execFileSync(
      'npx',
      ['--yes', 'supabase', 'projects', 'api-keys', '--project-ref', PROJECT_REF, '-o', 'json'],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }
    );
    const keys = JSON.parse(out.slice(out.indexOf('['))) as Array<{
      name: string;
      api_key: string;
    }>;
    return keys.find((k) => k.name === 'service_role')?.api_key ?? null;
  } catch {
    return null;
  }
}

async function cleanUp(studentId: string, employerId: string) {
  const S = lit(studentId);
  const E = lit(employerId);
  // Uploaded ID copies first: the rows are the only pointer to them.
  const paths = admin<{ file_path: string }>(
    `select file_path from public.college_onboarding_records where student_id = ${S} and file_path is not null`
  ).map((r) => r.file_path);
  if (paths.length) {
    const key = serviceKey();
    if (key) {
      const svc = createClient(SUPABASE_URL, key, { auth: { persistSession: false } });
      const { error } = await svc.storage.from('college-learner-evidence').remove(paths);
      if (error) throw new Error(`Could not remove the uploaded ID copy: ${error.message}`);
    }
  }
  // Records, signatures and filed evidence are append-only by design, so the
  // throwaway rows go with triggers off, child tables first.
  admin(`
    set session_replication_role = replica;
    delete from public.college_onboarding_records where student_id = ${S};
    delete from public.college_onboarding_links where onboarding_id in (select id from public.college_onboarding where student_id = ${S});
    delete from public.college_onboarding where student_id = ${S};
    delete from public.college_learner_evidence where student_id = ${S} or employer_id = ${E};
    delete from public.college_training_plan_signatures where plan_id in (select id from public.college_training_plans where student_id = ${S});
    delete from public.college_training_plan_links where plan_id in (select id from public.college_training_plans where student_id = ${S});
    delete from public.college_training_plans where student_id = ${S};
    delete from public.college_learner_starting_points where student_id = ${S};
    do $$
    declare r record;
    begin
      for r in select c.conrelid::regclass t, a.attname col
                 from pg_constraint c join pg_attribute a on a.attrelid = c.conrelid and a.attnum = c.conkey[1]
                where c.contype = 'f' and c.confrelid = 'public.college_students'::regclass loop
        execute format('delete from %s where %I = %L', r.t, r.col, ${S});
      end loop;
      for r in select c.conrelid::regclass t, a.attname col
                 from pg_constraint c join pg_attribute a on a.attrelid = c.conrelid and a.attnum = c.conkey[1]
                where c.contype = 'f' and c.confrelid = 'public.college_employers'::regclass loop
        execute format('delete from %s where %I = %L', r.t, r.col, ${E});
      end loop;
    end $$;
    delete from public.college_students where id = ${S};
    delete from public.college_employers where id = ${E};
    set session_replication_role = origin;
  `);
  return paths;
}

for (const size of ['desktop', 'phone'] as const) {
  test(`learner, employer and college complete onboarding (${size})`, async ({ browser }) => {
    test.setTimeout(6 * 60_000);
    const viewport =
      size === 'phone'
        ? { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }
        : { viewport: { width: 1440, height: 900 } };
    const learnerName = `${RUN} Onboard ${size}`;
    const start = londonDate(3);
    const made = admin<{ sid: string; eid: string }>(`
      with e as (insert into public.college_employers (college_id, company_name, contact_name)
                 values (${lit(NORTHGATE)}, ${lit(`${RUN} Sparks ${size} Ltd`)}, 'Fixture contact') returning id),
           s as (insert into public.college_students (college_id, name, email, status, employer_id, start_date, expected_end_date)
                 select ${lit(NORTHGATE)}, ${lit(learnerName)}, ${lit(`onboard-${size}-${Date.now()}@example.invalid`)},
                        'Active', e.id, ${lit(start)}::date, (${lit(start)}::date + interval '42 months')::date from e returning id)
      select (select id from s) sid, (select id from e) eid`)[0];
    const studentId = made.sid;
    const employerId = made.eid;
    let uploaded: string[] = [];
    try {
      // Initial assessment and prior learning, as Student 360 records them (ELE-2042).
      admin(`insert into public.college_learner_starting_points (student_id, college_id, assessed_on, english_level, maths_level, rpl_decision)
             values (${lit(studentId)}, ${lit(NORTHGATE)}, ${lit(londonDate(0))}::date, 'Level 2', 'Level 2', 'none')`);

      // ── College: start onboarding and issue the agreement (desktop or phone) ──
      const tutor = await signedInPage(browser, 'tutor', size);
      const tp = tutor.page;
      await tp.goto(`/college?section=student360&studentId=${studentId}#onboarding`);
      const card = tp.getByTestId('onboarding-card');
      await expect(async () => {
        await card.scrollIntoViewIfNeeded({ timeout: 10_000 });
      }).toPass({ timeout: 90_000 });
      await card.getByTestId('onboarding-start').click();
      await expect(card.getByTestId('onboarding-ready')).toHaveAttribute('data-ready', 'no', {
        timeout: 30_000,
      });
      await expect(card.getByTestId('onboarding-item-eligibility')).toContainText(
        `para ${PARAS.onb_eligibility}`
      );
      await card.getByTestId('onboarding-act-agreement').click();
      await tp.getByTestId('onboarding-agreement-place').fill('Leeds depot');
      // The fixture learner has no course, so nothing pre-fills these.
      await tp
        .getByTestId('onboarding-agreement-standard')
        .fill('Installation and maintenance electrician (ST0152)');
      await tp.getByTestId('onboarding-agreement-level').fill('3');
      await tp.getByTestId('onboarding-agreement-otj').fill('1100');
      await tp
        .getByTestId('onboarding-agreement-end')
        .fill(
          new Date(Date.parse(`${start}T12:00:00Z`) + 44 * 30 * 86_400_000)
            .toISOString()
            .slice(0, 10)
        );
      await tp.getByTestId('onboarding-agreement-issue').click();
      await expect(card.getByTestId('onboarding-item-agreement')).toHaveAttribute(
        'data-status',
        'waiting',
        { timeout: 30_000 }
      );
      await noSideways(tp, `college ${size}`);

      const onb = await tutorRpc<{ links: { apprentice: string; employer: string } }>(
        'get_onboarding',
        { p_student: studentId }
      );

      // ── Training plan, through ELE-2039's own functions ──
      const plan = await tutorRpc<{ id: string }>('save_training_plan_draft', {
        p_student: studentId,
        p_content: {
          apprentice: { name: learnerName, job_role: 'Apprentice electrician', weekly_hours: 37.5 },
          parties: {
            provider: 'Northgate',
            employer: `${RUN} Sparks`,
            subcontractors: '',
            epao: 'NET',
          },
          initial_assessment_summary: 'English level 2, maths level 2, no relevant prior learning',
          programme: {
            standard: 'Installation and maintenance electrician (ST0152)',
            level: '3',
            start_date: start,
            end_date: '2030-08-31',
            practical_start: start,
            practical_end: '2030-04-30',
          },
          planned_otj_hours: 1100,
          delivery_model: 'Day release',
          occupational_training: [
            {
              content: 'Knowledge units',
              hours: 1100,
              in_otj: true,
              when: 'Every Monday',
              who: 'College',
            },
          ],
          english_maths: {
            english: 'achieved',
            maths: 'achieved',
            not_in_otj: true,
            details: null,
          },
          prior_learning: { recorded: true, hours_reduced: 0, summary: 'None found' },
          employer_otj_confirmation: true,
          reviews: { frequency_months: 3, format: 'Three-way review' },
          complaints:
            'Tutor, then the apprenticeship manager, then Apprenticeship Service Support.',
        },
        p_change_reason: null,
      });
      await tutorRpc('issue_training_plan', { p_plan: plan.id });
      await tutorRpc('sign_training_plan_as_provider', {
        p_plan: plan.id,
        p_purpose: 'plan',
        p_name: 'Demo Tutor (fixture)',
        p_title: null,
      });
      const tLinks = await tutorRpc<Array<{ role: string; token: string; purpose: string }>>(
        'get_training_plan_links',
        { p_plan: plan.id }
      );
      for (const l of tLinks.filter((x) => x.purpose === 'plan')) {
        const { data } = await anonDb().rpc('sign_training_plan_by_link', {
          p_token: l.token,
          p_name: l.role === 'apprentice' ? learnerName : 'Pat Manager',
          p_title: null,
          p_company: l.role === 'employer' ? `${RUN} Sparks` : null,
          p_user_agent: 'e2e',
        });
        expect((data as { ok?: boolean }).ok).toBe(true);
      }

      // ── Learner: no account, their link, on this viewport ──
      const lctx = await noLoginContext(browser, viewport);
      const lp = await lctx.newPage();
      const lErrors: string[] = [];
      lp.on('pageerror', (e) => lErrors.push(String(e).slice(0, 300)));
      await lp.goto(`/start/${onb.links.apprentice}`);
      await expect(lp.getByTestId('onb-steps')).toBeVisible({ timeout: 60_000 });

      // Eligibility: the words shown state the learner's details and what is confirmed (353).
      await lp.getByTestId('onb-form-eligibility').getByTestId('onb-name').fill(learnerName);
      await expect(lp.getByTestId('onb-statement')).toContainText(`I, ${learnerName}`);
      await expect(lp.getByTestId('onb-statement')).toContainText('another apprenticeship');
      await lp.getByTestId('onb-agree').click();
      await lp.getByTestId('onb-submit').click();
      await expect(lp.getByTestId('onb-step-eligibility')).toHaveAttribute('data-done', 'yes', {
        timeout: 30_000,
      });

      // Residency.
      await lp.getByTestId('onb-residency-uk_3yrs').click();
      await lp.getByTestId('onb-form-residency').getByTestId('onb-name').fill(learnerName);
      await expect(lp.getByTestId('onb-statement')).toContainText('right to work in England');
      await lp.getByTestId('onb-agree').click();
      await lp.getByTestId('onb-submit').click();
      await expect(lp.getByTestId('onb-step-residency')).toHaveAttribute('data-done', 'yes', {
        timeout: 30_000,
      });

      // ID photo, to the private bucket.
      await lp.getByRole('button', { name: 'UK or Irish passport' }).click();
      await lp
        .getByTestId('onb-file')
        .setInputFiles({ name: 'passport.png', mimeType: 'image/png', buffer: PNG });
      await lp.getByTestId('onb-form-id_rtw').getByTestId('onb-name').fill(learnerName);
      await lp.getByTestId('onb-submit').click();
      await expect(lp.getByTestId('onb-step-id_rtw')).toHaveAttribute('data-done', 'yes', {
        timeout: 45_000,
      });

      // The agreement: shows the issued content and its fingerprint, then sign.
      await expect(lp.getByTestId('onb-agreement')).toContainText('Leeds depot');
      await lp.getByTestId('onb-form-agreement').getByTestId('onb-name').fill(learnerName);
      await lp.getByTestId('onb-agree').click();
      await lp.getByTestId('onb-submit').click();
      await expect(lp.getByTestId('onb-step-agreement')).toHaveAttribute('data-done', 'yes', {
        timeout: 30_000,
      });
      await noSideways(lp, `learner ${size}`);
      expect(lErrors).toEqual([]);
      await lctx.close();

      // The uploaded file is not public.
      const up = admin<{ file_path: string }>(
        `select file_path from public.college_onboarding_records where student_id = ${lit(studentId)} and item = 'id_upload'`
      );
      expect(up.length).toBe(1);
      uploaded = up.map((u) => u.file_path);
      const pub = await fetch(
        `${SUPABASE_URL}/storage/v1/object/public/college-learner-evidence/${uploaded[0]}`
      );
      expect(pub.status).not.toBe(200);
      const anonRead = await anonDb()
        .storage.from('college-learner-evidence')
        .download(uploaded[0]);
      expect(anonRead.data).toBeNull();

      // ── Employer: no login, their link ──
      const ectx = await noLoginContext(browser, viewport);
      const ep = await ectx.newPage();
      const eErrors: string[] = [];
      ep.on('pageerror', (e) => eErrors.push(String(e).slice(0, 300)));
      await ep.goto(`/start/${onb.links.employer}`);
      await expect(ep.getByTestId('onb-steps')).toBeVisible({ timeout: 60_000 });

      const ef = ep.getByTestId('onb-form-employer_eligibility');
      await ef.getByTestId('onb-name').fill('Pat Manager');
      await ef.getByTestId('onb-title').fill('Director');
      await ef.getByTestId('onb-line-manager').fill('Sam Supervisor');
      await expect(ep.getByTestId('onb-statement')).toContainText(
        'at least 50% of their working hours in England'
      );
      await ep.getByTestId('onb-agree').click();
      await ep.getByTestId('onb-submit').click();
      await expect(ep.getByTestId('onb-step-employer_eligibility')).toHaveAttribute(
        'data-done',
        'yes',
        {
          timeout: 30_000,
        }
      );

      // Para 71.1: nobody signs as both apprentice and employer.
      const same = await anonDb().rpc('submit_onboarding_step', {
        p_token: onb.links.employer,
        p_item: 'agreement',
        p_answers: { signer_name: learnerName, signer_company: `${RUN} Sparks` },
        p_user_agent: 'e2e',
      });
      expect((same.data as { error?: string }).error).toMatch(/71\.1/);

      const ag = ep.getByTestId('onb-form-agreement');
      await ag.getByTestId('onb-name').fill('Pat Manager');
      await ag.getByTestId('onb-title').fill('Director');
      await ep.getByTestId('onb-agree').click();
      await ep.getByTestId('onb-submit').click();
      await expect(ep.getByTestId('onb-step-agreement')).toHaveAttribute('data-done', 'yes', {
        timeout: 30_000,
      });

      const cf = ep.getByTestId('onb-form-contract_for_services');
      await cf.getByTestId('onb-name').fill('Pat Manager');
      await cf.getByTestId('onb-title').fill('Director');
      await cf.getByTestId('onb-reference').fill(`CFS-${size}-001`);
      await cf.getByTestId('onb-signed-on').fill(londonDate(-7));
      await expect(ep.getByTestId('onb-statement')).toContainText('eligible costs');
      await ep.getByTestId('onb-agree').click();
      await ep.getByTestId('onb-submit').click();
      await expect(ep.getByTestId('onb-step-contract_for_services')).toHaveAttribute(
        'data-done',
        'yes',
        {
          timeout: 30_000,
        }
      );
      await noSideways(ep, `employer ${size}`);
      expect(eErrors).toEqual([]);
      await ectx.close();

      // ── College: check the ID, then ready to start ──
      await tp.reload();
      await expect(async () => {
        await card.scrollIntoViewIfNeeded({ timeout: 10_000 });
      }).toPass({ timeout: 90_000 });
      await expect(card.getByTestId('onboarding-item-id_rtw')).toHaveAttribute(
        'data-status',
        'to_check',
        {
          timeout: 30_000,
        }
      );
      await card.getByTestId('onboarding-act-id_rtw').click();
      await expect(tp.getByTestId('onboarding-id-uploads')).toContainText('UK or Irish passport');
      await tp.getByRole('button', { name: 'UK or Irish passport', exact: true }).last().click();
      await tp.getByTestId('onboarding-id-confirm').click();
      await expect(card.getByTestId('onboarding-ready')).toHaveAttribute('data-ready', 'yes', {
        timeout: 30_000,
      });
      for (const k of [
        'eligibility',
        'residency',
        'id_rtw',
        'employer_eligibility',
        'agreement',
        'contract_for_services',
        'initial_assessment',
        'prior_learning',
        'training_plan',
      ]) {
        await expect(card.getByTestId(`onboarding-item-${k}`)).toHaveAttribute(
          'data-status',
          'done'
        );
      }
      await expect(card.getByTestId('onboarding-item-agreement')).toContainText(
        'Pat Manager (employer'
      );
      await noSideways(tp, `college ready ${size}`);

      // The list.
      await tp.goto('/college/onboarding');
      await tp.getByTestId('onb-filter-ready').click();
      const row = tp.locator(`[data-student="${studentId}"]`);
      await expect(row.getByTestId('onb-row-status')).toHaveText('Ready to start', {
        timeout: 60_000,
      });
      await noSideways(tp, `list ${size}`);

      // The evidence pack: every completed item, with its paragraph.
      await tp.goto(`/college/evidence-pack/${studentId}`);
      for (const [key, para] of Object.entries(PARAS)) {
        const title = {
          onb_eligibility: 'Onboarding: Eligibility declaration',
          onb_residency: 'Onboarding: Residency and right to work declaration',
          onb_id_rtw: 'Onboarding: ID and right to work checked',
          onb_employer_eligibility: 'Onboarding: Employer confirms the employment',
          onb_agreement: 'Onboarding: Apprenticeship agreement signed',
          onb_contract_for_services: 'Onboarding: Contract for services confirmed',
        }[key as keyof typeof PARAS];
        const item = tp.locator('li', { hasText: title }).first();
        await expect(item).toContainText(`para ${para}`, { timeout: 60_000 });
      }
      await noSideways(tp, `pack ${size}`);
      expect(tutor.errors).toEqual([]);
      await tutor.context.close();

      // Irrefutable: the chain verifies, and a record cannot be changed.
      const v = await tutorRpc<{
        records: number;
        signatures_intact: boolean;
        agreement_unchanged: boolean;
      }>('verify_onboarding', { p_student: studentId });
      expect(v.records).toBe(8);
      expect(v.signatures_intact).toBe(true);
      expect(v.agreement_unchanged).toBe(true);
      expect(() =>
        admin(
          `update public.college_onboarding_records set signer_name = 'Someone else' where student_id = ${lit(studentId)}`
        )
      ).toThrow();
    } finally {
      const removed = await cleanUp(studentId, employerId);
      const files = [...new Set([...removed, ...uploaded])];
      const left = admin<{ n: number }>(
        `select (select count(*) from public.college_students where id = ${lit(studentId)})
              + (select count(*) from storage.objects where bucket_id = 'college-learner-evidence'
                   and name in (${files.length ? files.map(lit).join(',') : "''"}))
              + (select count(*) from public.college_onboarding_records where student_id = ${lit(studentId)})
              + (select count(*) from public.college_learner_evidence where student_id = ${lit(studentId)}) as n`
      );
      expect(Number(left[0].n)).toBe(0);
    }
  });
}
