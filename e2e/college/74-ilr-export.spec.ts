/**
 * Journey 74: the ILR 2026/27 return (ELE-2087).
 *
 *  A. API, against the deployed college-ilr-return: a throwaway fixture learner
 *     at Northgate with every field an apprenticeship needs. Its R03 file
 *     matches the published 2026/27 XSD (and native xmllint agrees), passes
 *     every implemented rule, carries HRS1 from the learner record and no HRS3
 *     while continuing. The response says "checked against", never "DfE
 *     validated".
 *  B. Broken fields: a mistyped ULN gives rule ULN_04 in plain English,
 *     pointing at the ULN field and its specification page; a missing college
 *     UKPRN makes the file fail the schema with a plain-English message.
 *  C. HRS3 is verified hours only: for the fixture learner with OTJ entries,
 *     the hours the return uses equal the verified and employer-attested total.
 *  D. The ILR return panel on Data and API, desktop 1440 and phone 390: build
 *     R03, see the statement, find the broken learner, open the ULN field from
 *     the error.
 *  E. Apprenticeship Units (ELE-2053): a throwaway unit course and a learner on
 *     it with no programme type recorded go out as ProgType 34, FundModel 39,
 *     a ZPROG001 programme aim plus one component aim (the unit's aim
 *     reference) with the same dates; the file still matches the XSD (and
 *     xmllint agrees) and passes the implemented rules. A 20-week planned end
 *     gives LearnPlanEndDate_04 and an under-19 date of birth DateOfBirth_61.
 *     The course, learner and ILR row are deleted by id.
 *
 * Northgate's UKPRN and the fixture learner are put back or removed after.
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { test, expect, type Page } from '@playwright/test';
import {
  actor,
  admin as adminOnce,
  adminAvailable,
  haveCreds,
  lit,
  NORTHGATE,
  RUN,
  signedInPage,
  SUPABASE_URL,
} from './support';

test.skip(!haveCreds(), 'College fixture credentials are not available');
test.skip(() => !adminAvailable(), 'No Supabase CLI login: cannot create the fixture or clean up');
test.describe.configure({ mode: 'serial' });

const FN = `${SUPABASE_URL}/functions/v1/college-ilr-return`;
const ANON =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0d3lnYmVjZXVuZGZnbmtpcm9mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyMTc2OTUsImV4cCI6MjA2MTc5MzY5NX0.NgMOzzNkreOiJ2_t_f90NJxIJTcpUninWPYnM7RkrY8';
const XSD = path.resolve(
  process.cwd(),
  'supabase/functions/_shared/ilr/2627/ILR-2026-27-schemafile-January.xsd'
);
const OUT = process.env.ILR_SHOTS || '/tmp/em-qa/w5-ilr/shots';

// Fictional values. ULN 2468135791 and EmpId 123456789 pass their check digits
// (DD01, DD05); 2468135790 does not.
const GOOD_ULN = '2468135791';
const BAD_ULN = '2468135790';
const FIXTURE_UKPRN = '10099999';

function admin<T = Record<string, unknown>>(q: string): T[] {
  for (let i = 0; ; i++) {
    try {
      return adminOnce<T>(q);
    } catch (e) {
      if (i < 3 && /concurrently updated|login role/i.test(String((e as Error).message))) continue;
      throw e;
    }
  }
}

interface Issue {
  rule: string;
  official: boolean;
  severity: string;
  message: string;
  learnerId: string | null;
  fix: string | null;
  spec: { field: string; url: string } | null;
}
interface ReturnResponse {
  error?: string;
  file_name: string;
  xml: string;
  schema: {
    valid: boolean;
    errors: Array<{ message: string; plain: string; fix: string | null; element: string | null }>;
    sha256: string;
  };
  rules: { implemented: string[]; implemented_count: number; published: number };
  issues: Issue[];
  learners: Array<{ learner_id: string; name: string; verified_otj_hours: number }>;
  summary: { learners: number; errors: number; schema_valid: boolean; ready: boolean };
  statement: string;
}

async function buildReturn(body: Record<string, unknown>): Promise<ReturnResponse> {
  const t = await actor('tutor');
  const r = await fetch(FN, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${t.session.access_token}`,
      apikey: ANON,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ college_id: NORTHGATE, period: 'R03', ...body }),
  });
  const j = (await r.json()) as ReturnResponse;
  expect(r.status, j.error ?? '').toBe(200);
  return j;
}

let studentId = '';
let ukprnBefore: string | null = null;
const learnerName = `${RUN} ILR learner (fixture)`;

test.beforeAll(() => {
  ukprnBefore =
    admin<{ ukprn: string | null }>(
      `select ukprn from public.colleges where id = ${lit(NORTHGATE)}`
    )[0]?.ukprn ?? null;
  admin(`update public.colleges set ukprn = ${lit(FIXTURE_UKPRN)} where id = ${lit(NORTHGATE)}`);
  studentId = admin<{ id: string }>(`
    insert into public.college_students (college_id, name, email, status, uln, date_of_birth, ni_number, start_date, expected_end_date)
    values (${lit(NORTHGATE)}, ${lit(learnerName)}, ${lit(`ilr-${Date.now()}@example.invalid`)}, 'Active',
            ${lit(GOOD_ULN)}, '2006-03-14', 'AB123456C', '2026-09-01', '2030-08-31')
    returning id`)[0].id;
  admin(`
    update public.college_students set otj_required_hours = 550 where id = ${lit(studentId)};
    insert into public.college_student_ilr (student_id, college_id, learn_ref_number, family_name, given_names, sex,
      ethnicity, lldd_health_prob, prior_level, prior_level_date, postcode_prior, postcode, learn_aim_ref, prog_type,
      std_code, fund_model, del_loc_postcode, epa_org_id, emp_stat, emp_id, esm_eii, esm_loe, date_emp_stat_app,
      tnp1_price, tnp2_price)
    values (${lit(studentId)}, ${lit(NORTHGATE)}, 'EMFIX74', 'Fixture', 'Ilr', 'F', 31, 2, 3, '2024-07-01',
      'LS1 4AP', 'LS1 4AP', '60336290', 25, 152, 36, 'LS1 4AP', 'EPA0001', 10, 123456789, 3, 4, '2026-08-31',
      15000, 3000)`);
});

test.afterAll(() => {
  admin(
    `update public.colleges set ukprn = ${ukprnBefore ? lit(ukprnBefore) : 'null'} where id = ${lit(NORTHGATE)}`
  );
  if (!studentId) return;
  const S = lit(studentId);
  admin(`
    set session_replication_role = replica;
    do $$
    declare r record;
    begin
      for r in select c.conrelid::regclass t, a.attname col
                 from pg_constraint c join pg_attribute a on a.attrelid = c.conrelid and a.attnum = c.conkey[1]
                where c.contype = 'f' and c.confrelid = 'public.college_students'::regclass loop
        execute format('delete from %s where %I = %L', r.t, r.col, ${S});
      end loop;
    end $$;
    delete from public.college_students where id = ${S};
    set session_replication_role = origin;
  `);
  // The return reads are logged; drop this run's log rows.
  admin(
    `delete from public.college_data_access_log where college_id = ${lit(NORTHGATE)} and dataset = 'ilr' and detail like 'ilr_xml%' and created_at > now() - interval '1 hour' and actor_id = (select id from auth.users where email ilike 'founder+collegedemo-tutor@elec-mate.com')`
  );
});

test('A. the fixture learner’s R03 file matches the schema and passes the implemented rules', async () => {
  const j = await buildReturn({ learner_ids: [studentId] });
  expect(j.summary.learners).toBe(1);
  expect(j.schema.errors, JSON.stringify(j.schema.errors)).toEqual([]);
  expect(j.schema.valid).toBe(true);
  const errors = j.issues.filter((i) => i.severity === 'Error');
  expect(errors, JSON.stringify(errors)).toEqual([]);
  expect(j.summary.ready).toBe(true);
  expect(j.file_name).toMatch(new RegExp(`^ILR-${FIXTURE_UKPRN}-2627-\\d{8}-\\d{6}-01\\.xml$`));

  // The wording: checked against, never DfE validated.
  expect(j.statement).toMatch(
    new RegExp(
      `^Checked against the published 2026/27 schema and ${j.rules.implemented_count} validation rules`
    )
  );
  expect(j.statement).toContain('This is not a DfE validation');
  expect(j.statement).not.toMatch(/DfE validated/i);
  expect(j.rules.implemented_count).toBeGreaterThanOrEqual(100);
  expect(j.rules.published).toBe(866);
  expect(j.schema.sha256).toBe('ffdc38e373f85a5eb5fb0ab7acf9de2c18fc9192c5dcaa4ad4f21d538d086c29');

  // What went into the file.
  const x = j.xml;
  expect(x).toContain('<Message xmlns="ILR/2026-27"');
  expect(x).toContain(`<UKPRN>${FIXTURE_UKPRN}</UKPRN>`);
  expect(x).toContain(`<ULN>${GOOD_ULN}</ULN>`);
  expect(x).toContain('<LearnAimRef>ZPROG001</LearnAimRef>');
  expect(x).toContain('<LearnAimRef>60336290</LearnAimRef>');
  expect(x).toContain('<EPAOrgID>EPA0001</EPAOrgID>');
  expect(x).toMatch(/<HRSCode>1<\/HRSCode>\s*<HRSAmount>550<\/HRSAmount>/);
  // Continuing: no actual hours yet (HRS3 goes out at completion or withdrawal).
  expect(x).not.toMatch(/<HRSCode>3<\/HRSCode>/);

  // An independent check: native libxml2 (xmllint) against the same XSD.
  fs.mkdirSync(OUT, { recursive: true });
  const file = path.join(OUT, j.file_name);
  fs.writeFileSync(file, x);
  let xmllint = true;
  try {
    execFileSync('xmllint', ['--version'], { stdio: 'ignore' });
  } catch {
    xmllint = false;
  }
  if (xmllint) {
    const out = execFileSync(
      'sh',
      ['-c', `xmllint --noout --schema "${XSD}" "${file}" 2>&1; true`],
      {
        encoding: 'utf8',
      }
    );
    expect(out).toContain(`${file} validates`);
  }
});

test('B. broken fields give the right plain-English errors', async () => {
  // 1. A mistyped ULN: rule ULN_04, pointing at the ULN field.
  admin(`update public.college_students set uln = ${lit(BAD_ULN)} where id = ${lit(studentId)}`);
  const j = await buildReturn({ learner_ids: [studentId] });
  const uln = j.issues.find((i) => i.rule === 'ULN_04');
  expect(uln, JSON.stringify(j.issues)).toBeTruthy();
  expect(uln!.official).toBe(true);
  expect(uln!.severity).toBe('Error');
  expect(uln!.message).toBe(
    `ULN ${BAD_ULN} fails the ULN check digit, so it has been mistyped. Check it against the Learner Record Service.`
  );
  expect(uln!.learnerId).toBe(studentId);
  expect(uln!.fix).toBe('uln');
  expect(uln!.spec).toEqual({
    field: 'Learner.ULN',
    url: 'https://guidance.submit-learner-data.service.gov.uk/26-27/ilr/entity/Learner/field/ULN',
  });
  expect(j.summary.ready).toBe(false);
  expect(j.schema.valid).toBe(true); // the schema cannot see a check digit

  // 2. No college UKPRN: the file fails the schema, in plain English.
  admin(`update public.colleges set ukprn = null where id = ${lit(NORTHGATE)}`);
  try {
    const k = await buildReturn({ learner_ids: [studentId] });
    expect(k.schema.valid).toBe(false);
    const plain = k.schema.errors.map((e) => e.plain);
    expect(plain).toContain('The college UKPRN is missing, and the file needs it.');
    expect(k.schema.errors.every((e) => e.fix === 'college:ukprn')).toBe(true);
    const em = k.issues.find((i) => i.rule === 'EM_UKPRN');
    expect(em?.official).toBe(false);
    expect(em?.message).toBe('Add your college UKPRN (8 digits). Every ILR file carries it.');
  } finally {
    admin(`update public.colleges set ukprn = ${lit(FIXTURE_UKPRN)} where id = ${lit(NORTHGATE)}`);
  }
});

test('C. HRS3 counts verified and employer-attested hours only', async () => {
  const j = await buildReturn({});
  const row = admin<{ id: string; verified: number; all_min: number }>(`
    select cs.id,
           coalesce(sum(o.duration_minutes) filter (where o.verification_status in ('verified','verified_by_employer')), 0)::int as verified,
           coalesce(sum(o.duration_minutes), 0)::int as all_min
      from public.college_students cs
      join public.college_otj_entries o on o.student_id = cs.user_id
     where cs.college_id = ${lit(NORTHGATE)}
     group by cs.id
     order by count(*) filter (where o.verification_status not in ('verified','verified_by_employer')) desc
     limit 1`)[0];
  test.skip(!row, 'No Northgate learner has OTJ entries');
  const l = j.learners.find((x) => x.learner_id === row.id);
  expect(l, 'the learner is in the R03 return').toBeTruthy();
  expect(l!.verified_otj_hours).toBe(Math.round((Number(row.verified) / 60) * 10) / 10);
  if (Number(row.all_min) > Number(row.verified))
    expect(l!.verified_otj_hours).toBeLessThan(Math.round((Number(row.all_min) / 60) * 10) / 10);
});

test('E. an Apprenticeship Unit learner goes out as ProgType 34 and FundModel 39', async () => {
  const unitName = `${RUN} ILR unit programme`;
  let courseId = '';
  let unitId = '';
  try {
    courseId = admin<{ id: string }>(`
      insert into public.college_courses (college_id, name, course_type, unit_planned_hours, unit_aim_ref, unit_duration_weeks)
      values (${lit(NORTHGATE)}, ${lit(unitName)}, 'apprenticeship_unit', 60, 'E2ETEST1', 12)
      returning id`)[0].id;
    // 1 Sep to 24 Nov 2026: 12 weeks. No programme type, funding model or aim reference recorded.
    unitId = admin<{ id: string }>(`
      insert into public.college_students (college_id, name, email, status, course_id, uln, date_of_birth, ni_number, start_date, expected_end_date)
      values (${lit(NORTHGATE)}, ${lit(`${RUN} ILR unit learner (fixture)`)}, ${lit(`ilr-unit-${Date.now()}@example.invalid`)}, 'Active',
              ${lit(courseId)}, ${lit(GOOD_ULN)}, '2000-03-14', 'AB123456C', '2026-09-01', '2026-11-24')
      returning id`)[0].id;
    admin(`
      insert into public.college_student_ilr (student_id, college_id, learn_ref_number, family_name, given_names, sex,
        ethnicity, lldd_health_prob, prior_level, prior_level_date, postcode_prior, postcode, del_loc_postcode,
        emp_stat, emp_id, esm_eii, esm_loe, date_emp_stat_app, agreem_id)
      values (${lit(unitId)}, ${lit(NORTHGATE)}, 'EMFIX74U', 'Fixture', 'Unit', 'M', 31, 2, 3, '2024-07-01',
        'LS1 4AP', 'LS1 4AP', 'LS1 4AP', 10, 123456789, 3, 4, '2026-08-31', 'A123456')`);

    const j = await buildReturn({ learner_ids: [unitId] });
    expect(j.summary.learners).toBe(1);
    const x = j.xml;
    const aims = [...x.matchAll(/<LearningDelivery>([\s\S]*?)<\/LearningDelivery>/g)].map(
      (m) => m[1]
    );
    expect(aims).toHaveLength(2);
    const tag = (a: string, t: string) => a.match(new RegExp(`<${t}>([^<]*)</${t}>`))?.[1] ?? null;
    const [prog, comp] = aims;
    expect(tag(prog, 'LearnAimRef')).toBe('ZPROG001');
    expect(tag(prog, 'AimType')).toBe('1');
    expect(tag(comp, 'LearnAimRef')).toBe('E2ETEST1');
    expect(tag(comp, 'AimType')).toBe('3');
    for (const a of aims) {
      expect(tag(a, 'ProgType')).toBe('34');
      expect(tag(a, 'FundModel')).toBe('39');
      expect(tag(a, 'LearnStartDate')).toBe('2026-09-01');
      expect(tag(a, 'LearnPlanEndDate')).toBe('2026-11-24');
      expect(tag(a, 'StdCode')).toBeNull();
      expect(a).not.toContain('<HRSRecord>');
      expect(a).not.toContain('<AppFinRecord>');
      expect(a).not.toContain('<LearnDelFAMType>ACT</LearnDelFAMType>');
    }
    expect(x).not.toContain('<ProgType>25</ProgType>');
    expect(x).not.toContain('<FundModel>36</FundModel>');
    expect(x).toContain('<AgreemId>A123456</AgreemId>');

    expect(j.schema.errors, JSON.stringify(j.schema.errors)).toEqual([]);
    expect(j.schema.valid).toBe(true);
    const errors = j.issues.filter((i) => i.severity === 'Error');
    expect(errors, JSON.stringify(errors)).toEqual([]);
    for (const id of [
      'ProgType_25',
      'FundModel_22',
      'R_159',
      'R_160',
      'AimType_10',
      'LearnPlanEndDate_04',
      'DateOfBirth_61',
      'CompStatus_11',
    ])
      expect(j.rules.implemented).toContain(id);
    expect(j.issues.find((i) => i.rule === 'EM_UNIT_MILESTONE')?.severity).toBe('Warning');
    expect(j.statement).not.toMatch(/DfE validated/i);

    fs.mkdirSync(OUT, { recursive: true });
    const file = path.join(OUT, `unit-${j.file_name}`);
    fs.writeFileSync(file, x);
    let xmllint = true;
    try {
      execFileSync('xmllint', ['--version'], { stdio: 'ignore' });
    } catch {
      xmllint = false;
    }
    if (xmllint) {
      const out = execFileSync(
        'sh',
        ['-c', `xmllint --noout --schema "${XSD}" "${file}" 2>&1; true`],
        {
          encoding: 'utf8',
        }
      );
      expect(out).toContain(`${file} validates`);
    }

    // A 20-week planned end and an under-19 learner.
    admin(
      `update public.college_students set expected_end_date = '2027-01-19', date_of_birth = '2010-01-01' where id = ${lit(unitId)}`
    );
    const k = await buildReturn({ learner_ids: [unitId] });
    const end = k.issues.find((i) => i.rule === 'LearnPlanEndDate_04');
    expect(end, JSON.stringify(k.issues)).toBeTruthy();
    expect(end!.severity).toBe('Error');
    expect(end!.fix).toBe('record:planned_end_date');
    expect(end!.message).toContain('more than 16 weeks after the start');
    const age = k.issues.find((i) => i.rule === 'DateOfBirth_61');
    expect(age, JSON.stringify(k.issues)).toBeTruthy();
    expect(age!.fix).toBe('date_of_birth');
    expect(age!.message).toContain('aged 19 or over at the start');
    expect(k.summary.ready).toBe(false);
  } finally {
    if (unitId)
      admin(`
        set session_replication_role = replica;
        do $$
        declare r record;
        begin
          for r in select c.conrelid::regclass t, a.attname col
                     from pg_constraint c join pg_attribute a on a.attrelid = c.conrelid and a.attnum = c.conkey[1]
                    where c.contype = 'f' and c.confrelid = 'public.college_students'::regclass loop
            execute format('delete from %s where %I = %L', r.t, r.col, ${lit(unitId)});
          end loop;
        end $$;
        delete from public.college_students where id = ${lit(unitId)};
        set session_replication_role = origin;
      `);
    if (courseId)
      admin(
        `delete from public.college_activity where entity_id = ${lit(courseId)}; delete from public.college_courses where id = ${lit(courseId)}`
      );
  }
  const left = admin<{ n: number }>(
    `select (select count(*) from public.college_courses where college_id = ${lit(NORTHGATE)} and name = ${lit(unitName)})
          + (select count(*) from public.college_students where college_id = ${lit(NORTHGATE)} and name like ${lit(`${RUN} ILR unit learner%`)}) as n`
  )[0];
  expect(Number(left.n)).toBe(0);
});

async function noOverflow(page: Page) {
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth
  );
  expect(overflow, `Data and API overflows the phone by ${overflow}px`).toBeLessThanOrEqual(1);
}

for (const vp of ['desktop', 'phone'] as const) {
  test(`D. ILR return panel (${vp})`, async ({ browser }) => {
    test.setTimeout(180_000);
    // The fixture learner still carries the mistyped ULN from B.
    admin(`update public.college_students set uln = ${lit(BAD_ULN)} where id = ${lit(studentId)}`);
    const { context, page, errors } = await signedInPage(browser, 'tutor', vp);
    await page.goto('/college/settings/data#ilr-return');
    await expect(page.getByRole('heading', { name: 'Your data, out to your MIS' })).toBeVisible({
      timeout: 45_000,
    });
    const run = page.getByTestId('ilr-return-run');
    await run.scrollIntoViewIfNeeded();
    await expect(run).toBeEnabled({ timeout: 30_000 });
    await run.click();
    const result = page.getByTestId('ilr-return-result');
    await expect(result).toBeVisible({ timeout: 90_000 });
    const statement = page.getByTestId('ilr-return-statement');
    await expect(statement).toContainText(
      /Checked against the published 2026\/27 schema and \d+ validation rules/
    );
    await expect(statement).toContainText('This is not a DfE validation');
    await statement.scrollIntoViewIfNeeded();
    fs.mkdirSync(OUT, { recursive: true });
    await page.screenshot({ path: path.join(OUT, `ilr-return-summary-${vp}.png`) });

    // Find the fixture learner (the list shows ten, most errors first).
    const showAll = page.getByRole('button', { name: /^Show all \d+ learners$/ });
    if (await showAll.isVisible()) await showAll.click();
    const shortName = learnerName.replace(/\s*\([^)]*\)\s*$/, '');
    const row = page.getByTestId('ilr-return-learner').filter({ hasText: shortName });
    await expect(row).toHaveCount(1);
    const head = row.getByRole('button', {
      name: new RegExp(shortName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
    });
    if ((await head.getAttribute('aria-expanded')) !== 'true') await head.click();
    const issue = row.locator('[data-testid="ilr-return-issue"][data-rule="ULN_04"]');
    await expect(issue).toContainText(`ULN ${BAD_ULN} fails the ULN check digit`);
    await expect(issue).toContainText('Rule ULN_04');
    await expect(
      issue.getByRole('link', { name: /Learner\.ULN in the ILR 2026\/27 specification/ })
    ).toHaveAttribute(
      'href',
      'https://guidance.submit-learner-data.service.gov.uk/26-27/ilr/entity/Learner/field/ULN'
    );
    await issue.scrollIntoViewIfNeeded();
    await page.screenshot({ path: path.join(OUT, `ilr-return-issue-${vp}.png`) });
    if (vp === 'phone') await noOverflow(page);

    // Fix opens the learner's ILR fields at the ULN.
    await issue.getByTestId('ilr-return-fix').click();
    const field = page.locator('#ilr-uln');
    await expect(field).toBeVisible({ timeout: 15_000 });
    await expect(field).toHaveValue(BAD_ULN);
    await expect(page.locator('#ilr-field-uln')).toBeInViewport();
    await page.screenshot({ path: path.join(OUT, `ilr-return-fix-${vp}.png`) });

    expect(errors, errors.join('\n')).toEqual([]);
    await context.close();
  });
}
