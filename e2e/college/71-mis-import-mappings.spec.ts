/**
 * Journey 71 — MIS sync, step 1: saved, re-runnable import mappings (ELE-2058).
 *
 *   npx playwright test -c playwright.college.config.ts e2e/college/71-mis-import-mappings.spec.ts
 *
 *  1. The helpers on their own: header guessing (ILR names and common MIS
 *     words, exact before contained), dates in day-, year- and month-first
 *     order, impossible dates refused, a CSV record to the row the server takes.
 *  2. Journey, desktop 1440: the tutor imports an "ebs" CSV for the fixture
 *     learner (matched by email) plus a new person and a bad row. The columns
 *     are guessed; the check changes nothing and lists the planned end change,
 *     the new learner and the skipped row; the mapping is saved; applying
 *     sends the new person to the roster import (INTERCEPTED here: no login is
 *     made and no email is sent) and updates the fixture learner. The run is
 *     in the history. Re-running the saved mapping with next month's file
 *     keeps the columns and finds the learner already up to date. An ILR XML
 *     file is read with no mapping. Then the fixture learner's planned end and
 *     learner reference are restored and the mapping and runs deleted.
 *  3. Phone 390: the page, the check and the direct-connection designs
 *     (Maytas and ebs need the college's credentials) with no overflow.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { test, expect, type Page } from '@playwright/test';
import {
  admin as adminOnce,
  adminAvailable,
  haveCreds,
  lit,
  NORTHGATE,
  RUN,
  signedInPage,
} from './support';
import { guessMisColumns, parseMisDate, toMisRow } from '../../src/lib/college/misImport';

test.setTimeout(240_000);
test.describe.configure({ mode: 'serial' });

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

const OUT = process.env.W3_SHOTS;
async function shot(page: Page, name: string, phone: boolean) {
  await page.waitForTimeout(500);
  if (OUT) {
    fs.mkdirSync(OUT, { recursive: true });
    await page.screenshot({ path: `${OUT}/${name}-${phone ? 'phone' : 'desk'}.png` });
  }
  if (phone) {
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    expect(overflow, `${name} overflows the phone by ${overflow}px`).toBeLessThanOrEqual(1);
  }
}

const LEARNER_EMAIL = 'founder+collegedemo-learner@elec-mate.com';
const REF = `E2E${Date.now().toString(36).toUpperCase().slice(-6)}`;
const NEW_EMAIL = `e2e-mis-${Date.now().toString(36)}@example.com`;
const HEADERS =
  'Person Code,Forename,Surname,Email,Date of Birth,Start Date,Expected End Date,Group Code';

test('1. Helpers: guessing, dates, rows', () => {
  const m = guessMisColumns(HEADERS.split(','));
  expect(m.learner_ref).toBe('Person Code');
  expect(m.given_names).toBe('Forename');
  expect(m.family_name).toBe('Surname');
  expect(m.email).toBe('Email');
  expect(m.date_of_birth).toBe('Date of Birth');
  expect(m.start_date).toBe('Start Date');
  expect(m.planned_end_date).toBe('Expected End Date');
  expect(m.cohort_code).toBe('Group Code');
  const ilr = guessMisColumns([
    'LearnRefNumber',
    'ULN',
    'FamilyName',
    'GivenNames',
    'DateOfBirth',
    'LearnStartDate',
    'LearnPlanEndDate',
    'LearnActEndDate',
  ]);
  expect(ilr).toMatchObject({
    learner_ref: 'LearnRefNumber',
    uln: 'ULN',
    family_name: 'FamilyName',
    given_names: 'GivenNames',
    date_of_birth: 'DateOfBirth',
    start_date: 'LearnStartDate',
    planned_end_date: 'LearnPlanEndDate',
    actual_end_date: 'LearnActEndDate',
  });
  expect(parseMisDate('14/03/2026')).toBe('2026-03-14');
  expect(parseMisDate('14-3-26')).toBe('2026-03-14');
  expect(parseMisDate('2026-03-14T00:00:00')).toBe('2026-03-14');
  expect(parseMisDate('03/14/2026', 'mdy')).toBe('2026-03-14');
  expect(parseMisDate('2026/03/14', 'ymd')).toBe('2026-03-14');
  expect(parseMisDate('31/02/2026')).toBeNull();
  expect(parseMisDate('14/13/2026')).toBeNull();
  const row = toMisRow(
    {
      'Person Code': 'A1',
      Forename: 'Jo',
      Surname: 'Bloggs',
      Email: 'jo@x.com',
      'Start Date': '01/09/2026',
      'Expected End Date': 'soon',
    },
    0,
    m,
    'dmy'
  );
  expect(row).toMatchObject({
    row: 2,
    learner_ref: 'A1',
    name: 'Jo Bloggs',
    email: 'jo@x.com',
    start_date: '2026-09-01',
    planned_end_date: null,
    bad_dates: ['planned_end_date'],
  });
});

test('2. Journey: map, check, save, apply, re-run, ILR XML (desktop)', async ({ browser }) => {
  test.skip(
    !haveCreds() || !adminAvailable(),
    'Needs fixture credentials and a Supabase CLI login'
  );
  const before = admin<{
    id: string;
    expected_end_date: string;
    learn_ref_number: string | null;
    ilr_exists: boolean;
  }>(
    `select cs.id, cs.expected_end_date::text, i.learn_ref_number, (i.student_id is not null) as ilr_exists
       from public.college_students cs left join public.college_student_ilr i on i.student_id = cs.id
      where cs.college_id = ${lit(NORTHGATE)} and lower(cs.email) = ${lit(LEARNER_EMAIL)}`
  )[0];
  expect(before, 'fixture learner on the Northgate roll').toBeTruthy();
  const newEnd = new Date(new Date(`${before.expected_end_date}T12:00:00Z`).getTime() + 7 * 864e5)
    .toISOString()
    .slice(0, 10);
  const ukEnd = `${newEnd.slice(8, 10)}/${newEnd.slice(5, 7)}/${newEnd.slice(0, 4)}`;
  const ukEndOld = `${before.expected_end_date.slice(8, 10)}/${before.expected_end_date.slice(5, 7)}/${before.expected_end_date.slice(0, 4)}`;
  const fmt = (iso: string) =>
    new Date(`${iso}T12:00`).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'e2e-mis-'));
  const csv1 = path.join(dir, 'ebs-learners-october.csv');
  fs.writeFileSync(
    csv1,
    [
      HEADERS,
      `${REF},Demo,Learner,${LEARNER_EMAIL},,06/10/2026,${ukEnd},L2E-26A`,
      `E2ENEW1,E2E,Newperson,${NEW_EMAIL},01/02/2005,06/10/2026,14/07/2028,L2E-26A`,
      `E2EBAD1,,,,,,,`,
    ].join('\n')
  );
  const csv2 = path.join(dir, 'ebs-learners-november.csv');
  fs.writeFileSync(
    csv2,
    [HEADERS, `${REF},Demo,Learner,${LEARNER_EMAIL},,06/10/2026,${ukEnd},L2E-26A`].join('\n')
  );
  const xml = path.join(dir, 'ILR-10000000-2627-20261010-120000-01.xml');
  fs.writeFileSync(
    xml,
    `<?xml version="1.0" encoding="utf-8"?>
<Message xmlns="ESFA/ILR/2026-27">
  <Header><CollectionDetails><Collection>ILR</Collection><Year>2627</Year><FilePreparationDate>2026-10-10</FilePreparationDate></CollectionDetails></Header>
  <LearningProvider><UKPRN>10000000</UKPRN></LearningProvider>
  <Learner>
    <LearnRefNumber>${REF}</LearnRefNumber>
    <FamilyName>Learner</FamilyName><GivenNames>Demo</GivenNames>
    <LearningDelivery><LearnAimRef>ZPROG001</LearnAimRef><AimType>1</AimType><LearnStartDate>2026-10-06</LearnStartDate><LearnPlanEndDate>${newEnd}</LearnPlanEndDate></LearningDelivery>
  </Learner>
</Message>`
  );

  let mappingId: string | null = null;
  try {
    const { context, page, errors } = await signedInPage(browser, 'tutor', 'desktop');
    const rosterCalls: string[] = [];
    await page.route('**/functions/v1/college-roster-import', async (route) => {
      rosterCalls.push(route.request().postData() ?? '');
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          dry_run: false,
          summary: {
            total: 1,
            created: 1,
            matched: 0,
            already: 0,
            skipped: 0,
            failed: 0,
            emailed: 0,
          },
          items: [],
        }),
      });
    });
    await page.goto('/college/settings/mis');
    await expect(page.getByRole('heading', { name: 'Keep in step with your MIS' })).toBeVisible({
      timeout: 45_000,
    });
    await expect(page.getByText(/\d+ saved mappings? and \d+ learners on your roll/)).toBeVisible({
      timeout: 30_000,
    });
    await page.getByTestId('mis-system').getByRole('button', { name: 'Tribal ebs' }).click();
    await page.getByTestId('mis-file').setInputFiles(csv1);
    await expect(page.getByTestId('mis-file-summary')).toContainText(
      'ebs-learners-october.csv: 3 rows, 8 columns'
    );
    await expect(page.getByTestId('mis-map')).toContainText('Person Code');
    await page.getByTestId('mis-name').fill(`${RUN} ebs learners`);
    await page.getByTestId('mis-check').click();
    const plan = page.getByTestId('mis-plan');
    await expect(
      page.getByText('3 rows checked: 1 to update, 0 already up to date, 1 new, 1 skipped')
    ).toBeVisible({ timeout: 30_000 });
    await expect(plan).toContainText(
      `planned end ${fmt(before.expected_end_date)} to ${fmt(newEnd)}`
    );
    await expect(plan).toContainText(`learner reference empty to ${REF}`);
    await expect(plan).toContainText(`new learner E2E Newperson (${NEW_EMAIL})`);
    await expect(plan).toContainText('skipped: Matches nobody');
    // The check changed nothing.
    const mid = admin<{ e: string }>(
      `select expected_end_date::text as e from public.college_students where id = ${lit(before.id)}`
    )[0];
    expect(mid.e).toBe(before.expected_end_date);
    await page.getByTestId('mis-plan').scrollIntoViewIfNeeded();
    await shot(page, 'mis-check', false);

    await page.getByTestId('mis-save').click();
    await expect(page.getByTestId('mis-mappings')).toContainText(`${RUN} ebs learners`, {
      timeout: 20_000,
    });
    mappingId =
      admin<{ id: string }>(
        `select id from public.college_mis_mappings where college_id = ${lit(NORTHGATE)} and name = ${lit(`${RUN} ebs learners`)}`
      )[0]?.id ?? null;
    expect(mappingId).toBeTruthy();
    const saved = admin<{ m: Record<string, string>; sys: string }>(
      `select column_map as m, mis_system as sys from public.college_mis_mappings where id = ${lit(mappingId!)}`
    )[0];
    expect(saved.sys).toBe('ebs');
    expect((typeof saved.m === 'string' ? JSON.parse(saved.m) : saved.m).learner_ref).toBe(
      'Person Code'
    );

    await page.getByTestId('mis-apply').click();
    await expect(
      page.getByText(/Applied: 1 updated, 0 already up to date, 1 new, 1 skipped/)
    ).toBeVisible({ timeout: 30_000 });
    expect(rosterCalls.length, 'the new learner went to the roster import').toBe(1);
    const sent = JSON.parse(rosterCalls[0]) as {
      kind: string;
      rows: Array<{ email: string; name: string }>;
      send_email: boolean;
    };
    expect(sent.kind).toBe('learners');
    expect(sent.rows).toHaveLength(1);
    expect(sent.rows[0]).toMatchObject({ email: NEW_EMAIL, name: 'E2E Newperson' });
    expect(sent.send_email).toBe(false);
    const after = admin<{ e: string; ref: string | null }>(
      `select cs.expected_end_date::text as e, i.learn_ref_number as ref from public.college_students cs left join public.college_student_ilr i on i.student_id = cs.id where cs.id = ${lit(before.id)}`
    )[0];
    expect(after.e).toBe(newEnd);
    expect(after.ref).toBe(REF);
    const run = admin<{ updated: number; new_learners: number; items: unknown }>(
      `select updated, new_learners, items from public.college_mis_runs where mapping_id = ${lit(mappingId!)} order by created_at desc limit 1`
    )[0];
    expect(Number(run.updated)).toBe(1);
    expect(Number(run.new_learners)).toBe(1);
    expect(JSON.stringify(run.items), 'the audit keeps field names, not values').not.toContain(
      newEnd
    );
    await expect(page.getByTestId('mis-runs')).toContainText(
      'ebs-learners-october.csv: 3 rows, 1 updated, 1 new, 1 skipped'
    );

    // Next month: the saved mapping, a new file, nothing to re-map.
    await page.getByTestId('mis-rerun').first().click();
    await page.getByTestId('mis-file').setInputFiles(csv2);
    await expect(page.getByTestId('mis-file-summary')).toContainText(
      'ebs-learners-november.csv: 1 row'
    );
    await expect(page.getByTestId('mis-missing-headers')).toHaveCount(0);
    await page.getByTestId('mis-check').click();
    await expect(
      page.getByText('1 row checked: 0 to update, 1 already up to date, 0 new, 0 skipped')
    ).toBeVisible({ timeout: 30_000 });
    await expect(page.getByTestId('mis-apply')).toHaveCount(0);

    // ILR XML: no mapping, matched by the learner reference just set.
    await page.getByTestId('mis-file').setInputFiles(xml);
    await expect(page.getByText(/ILR XML for 2026\/27, UKPRN 10000000: 1 learners/)).toBeVisible();
    await expect(page.getByTestId('mis-map')).toHaveCount(0);
    await page.getByTestId('mis-check').click();
    await expect(
      page.getByText('1 row checked: 0 to update, 1 already up to date, 0 new, 0 skipped')
    ).toBeVisible({ timeout: 30_000 });
    expect(errors, errors.join('\n')).toEqual([]);
    await context.close();
  } finally {
    admin(`
      update public.college_students set expected_end_date = ${lit(before.expected_end_date)}::date where id = ${lit(before.id)};
      ${
        before.ilr_exists
          ? `update public.college_student_ilr set learn_ref_number = ${before.learn_ref_number ? lit(before.learn_ref_number) : 'null'} where student_id = ${lit(before.id)};`
          : `delete from public.college_student_ilr where student_id = ${lit(before.id)};`
      }
      delete from public.college_mis_runs where college_id = ${lit(NORTHGATE)} and (mapping_id in (select id from public.college_mis_mappings where name like ${lit(`${RUN}%`)}) or file_name like 'ebs-learners-%' or file_name like 'ILR-10000000-%');
      delete from public.college_mis_mappings where college_id = ${lit(NORTHGATE)} and name like ${lit(`${RUN}%`)};`);
    void ukEndOld;
  }
  const restored = admin<{ e: string; ref: string | null }>(
    `select cs.expected_end_date::text as e, i.learn_ref_number as ref from public.college_students cs left join public.college_student_ilr i on i.student_id = cs.id where cs.id = ${lit(before.id)}`
  )[0];
  expect(restored.e).toBe(before.expected_end_date);
  expect(restored.ref ?? null).toBe(before.learn_ref_number ?? null);
});

test('3. Phone: page, check and direct-connection designs', async ({ browser }) => {
  test.skip(!haveCreds(), 'Needs fixture credentials');
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'e2e-mis-'));
  const csv = path.join(dir, 'unit-e-export.csv');
  fs.writeFileSync(
    csv,
    ['Learner Name,Email,Start Date', `Demo Learner,${LEARNER_EMAIL},06/10/2026`].join('\n')
  );
  const { context, page, errors } = await signedInPage(browser, 'tutor', 'phone');
  await page.goto('/college/settings/mis');
  await expect(page.getByRole('heading', { name: 'Keep in step with your MIS' })).toBeVisible({
    timeout: 45_000,
  });
  await shot(page, 'mis-top', true);
  await page.getByTestId('mis-system').getByRole('button', { name: 'UNIT-e' }).click();
  await page.getByTestId('mis-file').setInputFiles(csv);
  await page.getByTestId('mis-check').click();
  await expect(
    page.getByText('1 row checked: 0 to update, 1 already up to date, 0 new, 0 skipped')
  ).toBeVisible({ timeout: 30_000 });
  const conn = page.getByTestId('mis-connectors');
  await conn.scrollIntoViewIfNeeded();
  await expect(conn).toContainText('Tribal Maytas');
  await expect(conn).toContainText('Needs your credentials');
  await expect(conn).toContainText('100 calls per connection per 60 seconds');
  await expect(conn).toContainText('Tribal ebs');
  await shot(page, 'mis-connectors', true);
  expect(errors, errors.join('\n')).toEqual([]);
  await context.close();
});
