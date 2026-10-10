/**
 * Journey 45 — compliance and interchange (ELE-1884, ELE-1910, ELE-1976, ELE-1974).
 *
 *  A. Data and API page (tutor): counts in the header, six datasets, a CSV
 *     export whose header is exactly the documented columns, the ILR format
 *     check, the API reference. Desktop 1440 and phone 390.
 *  B. The read API, end to end against the deployed college-data-api: a key
 *     minted (owner SQL, the same internal creator the admin RPC uses), index
 *     and dataset reads, columns equal the page's dictionary, out-of-scope 403,
 *     rate limit 429, revoked 401, every call in the access log, the key never
 *     stored. A tutor (no settings.manage) is refused minting.
 *  C. Inspector questions (ELE-1910): the six record answers render with a
 *     headline from counts and lines that open the record they cite.
 *  D. Four nations (ELE-1976): with Northgate set to Scotland for the test,
 *     the EPA question and the ILR note use Scotland's words; reset after.
 *  E. Evidence import (ELE-1974): a CSV for the fixture learner is mapped,
 *     checked and imported; the learner sees it on Today and adds it; the
 *     tutor records the carried-over decision. Every row is removed after,
 *     and the learner's criterion coverage is restored to what it was.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { test, expect, type Page } from '@playwright/test';
import {
  actor,
  admin as adminOnce,
  adminAvailable,
  haveCreds,
  learnerRoll,
  lit,
  NORTHGATE,
  RUN,
  signedInPage,
  SUPABASE_URL,
} from './support';
import { INTERCHANGE_DATASETS } from '../../src/lib/college/interchange';

test.skip(!haveCreds(), 'College fixture credentials are not available');
test.skip(() => !adminAvailable(), 'No Supabase CLI login: cannot mint a test key or clean up');
test.describe.configure({ mode: 'serial' });

const API = `${SUPABASE_URL}/functions/v1/college-data-api`;

/** Owner SQL with a retry: parallel sessions sometimes collide on the CLI's login role. */
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
const cols = (k: string) =>
  INTERCHANGE_DATASETS.find((d) => d.key === k)!.columns.map((c) => c.key);

const SHOTS = process.env.COMPLIANCE_SHOTS;
async function shot(page: Page, name: string) {
  if (!SHOTS) return;
  fs.mkdirSync(SHOTS, { recursive: true });
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(SHOTS, `${name}.png`), fullPage: false });
}

async function noOverflow(page: Page, name: string) {
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth
  );
  expect(overflow, `${name} overflows the phone by ${overflow}px`).toBeLessThanOrEqual(1);
}

for (const vp of ['desktop', 'phone'] as const) {
  test(`A. Data and API page (${vp})`, async ({ browser }) => {
    const { context, page, errors } = await signedInPage(browser, 'tutor', vp);
    await page.goto('/college/settings/data');
    await expect(page.getByRole('heading', { name: 'Your data, out to your MIS' })).toBeVisible({
      timeout: 45_000,
    });
    await expect(page.getByText(/\d+ learners on record, \d+ with a ULN/)).toBeVisible({
      timeout: 30_000,
    });
    await shot(page, `data-top-${vp}`);
    for (const d of INTERCHANGE_DATASETS) {
      await expect(page.getByTestId(`export-${d.key}-csv`)).toBeVisible();
    }
    // CSV header is exactly the documented columns.
    const [dl] = await Promise.all([
      page.waitForEvent('download'),
      page.getByTestId('export-learners-csv').click(),
    ]);
    const file = path.join(os.tmpdir(), `e2e-learners-${Date.now()}.csv`);
    await dl.saveAs(file);
    const header = fs.readFileSync(file, 'utf8').split(/\r?\n/)[0];
    expect(header).toBe(cols('learners').join(','));
    // ILR format check.
    // The page has a header button (sm and up) and a full-width phone button; click whichever shows.
    await page.locator('button:visible', { hasText: 'Check the ILR export' }).first().click();
    await expect(page.getByText(/learners pass the format checks/)).toBeVisible({
      timeout: 30_000,
    });
    await page.getByText(/learners pass the format checks/).scrollIntoViewIfNeeded();
    await shot(page, `data-ilr-${vp}`);
    // API reference columns.
    await page.getByRole('button', { name: /ilr · ILR fields/ }).click();
    await expect(page.getByText('HRS3_ActualOTJHours', { exact: true })).toBeVisible();
    // Keys need a real admin or head of department (10 Oct): the "no manager
    // yet" bootstrap lets tutors run the basics, never mint a data key.
    await expect(page.getByRole('heading', { name: 'API keys' })).toBeVisible();
    if (vp === 'desktop') {
      await page.getByRole('button', { name: 'Create a key' }).click();
      await page.getByLabel('What it is for').fill(`${RUN} UI key`);
      await page.getByRole('button', { name: 'Create key' }).click();
      await expect(page.getByText(/college admin or head of department/).first()).toBeVisible({
        timeout: 20_000,
      });
      const k = admin<{ n: number }>(
        `select count(*)::int as n from public.college_api_keys where label = ${lit(`${RUN} UI key`)}`
      )[0];
      expect(Number(k.n), 'no key was created for a tutor').toBe(0);
    }
    if (vp === 'phone') await noOverflow(page, 'Data and API');
    expect(errors, errors.join('\n')).toEqual([]);
    await context.close();
  });
}

test('B. Read API: scopes, rate limit, revoke, audit, hashing', async () => {
  const learner = await actor('learner');
  const refused = await learner.db.rpc(
    'college_api_key_mint' as never,
    {
      p_college: NORTHGATE,
      p_label: `${RUN} refused`,
      p_scopes: ['learners'],
      p_rate: 5,
    } as never
  );
  expect(refused.error?.message ?? '').toMatch(/college admin|head of department/);

  // A tutor is refused too (no admin at Northgate, but minting never rides on
  // the set-up bootstrap). The key for the API checks is made by the same
  // internal function the RPC uses, as the database owner.
  const t = await actor('tutor');
  const tutorTry = await t.db.rpc(
    'college_api_key_mint' as never,
    { p_college: NORTHGATE, p_label: `${RUN} tutor`, p_scopes: ['learners'], p_rate: 3 } as never
  );
  expect(tutorTry.error?.message ?? '').toMatch(/college admin|head of department/);
  const label = `${RUN} key`;
  const made = admin<{ j: { id: string; key: string } }>(
    `select public._college_api_key_create(${lit(NORTHGATE)}::uuid, ${lit(label)}, array['learners','hours'], 3, ${lit(t.session.user.id)}::uuid) as j`
  )[0];
  const { id, key } = (typeof made.j === 'string' ? JSON.parse(made.j) : made.j) as { id: string; key: string };
  try {
    expect(key).toMatch(/^emk_[0-9a-f]{48}$/);
    // Never stored in plain text: only the SHA-256 and a 12-character prefix.
    const stored = admin<{ plain: number; prefix: string; hashlen: number }>(
      `select count(*) filter (where key_hash = ${lit(key)}) as plain, max(key_prefix) as prefix, max(length(key_hash)) as hashlen from public.college_api_keys where id = ${lit(id)}`
    )[0];
    expect(Number(stored.plain)).toBe(0);
    expect(stored.prefix).toBe(key.slice(0, 12));
    expect(Number(stored.hashlen)).toBe(64);

    const h = { Authorization: `Bearer ${key}` };
    expect((await fetch(`${API}/v1`)).status).toBe(401);
    const idx = await fetch(`${API}/v1`, { headers: h });
    expect(idx.status).toBe(200);
    const idxJ = (await idx.json()) as {
      scopes: string[];
      datasets: Record<string, { columns: string[] }>;
    };
    expect(idxJ.scopes.sort()).toEqual(['hours', 'learners']);
    expect(idxJ.datasets.learners.columns).toEqual(cols('learners'));

    const lr = await fetch(`${API}/v1/learners?limit=2`, { headers: h });
    expect(lr.status).toBe(200);
    const lrJ = (await lr.json()) as {
      count: number;
      data: Record<string, unknown>[];
      next_offset: number | null;
    };
    expect(lrJ.count).toBe(2);
    expect(Object.keys(lrJ.data[0])).toEqual(cols('learners'));
    expect(lrJ.next_offset).toBe(2);

    expect((await fetch(`${API}/v1/ilr`, { headers: h })).status).toBe(403);
    // Three calls a minute (index, learners, ilr): the fourth is refused.
    expect((await fetch(`${API}/v1/hours?limit=1`, { headers: h })).status).toBe(429);

    const log = admin<{ status_code: number; n: number }>(
      `select status_code, count(*)::int as n from public.college_data_access_log where key_id = ${lit(id)} group by 1 order by 1`
    );
    const by = Object.fromEntries(log.map((r) => [Number(r.status_code), Number(r.n)]));
    expect(by[200]).toBe(2);
    expect(by[403]).toBe(1);
    expect(by[429]).toBe(1);

    admin(`update public.college_api_keys set revoked_at = now() where id = ${lit(id)}`);
    admin(`delete from public.college_data_access_log where key_id = ${lit(id)}`);
    const rv = await fetch(`${API}/v1`, { headers: h });
    expect(rv.status).toBe(401);
    expect(((await rv.json()) as { error: { code: string } }).error.code).toBe('revoked');
  } finally {
    admin(
      `delete from public.college_data_access_log where key_id = ${lit(id)}; delete from public.college_api_keys where id = ${lit(id)}`
    );
  }
});

for (const vp of ['desktop', 'phone'] as const) {
  test(`C. Inspector questions answered from the record (${vp})`, async ({ browser }) => {
    const { context, page, errors } = await signedInPage(browser, 'tutor', vp);
    await page.goto('/college/compliance#showme');
    await expect(page.getByTestId('inspector-q-employer_coplanning')).toBeVisible({
      timeout: 45_000,
    });
    for (const q of [
      'employer_coplanning',
      'otj_quantified',
      'safeguarding_under18',
      'english_maths',
      'progress_standard',
      'epa_readiness',
    ]) {
      await page.getByTestId(`inspector-q-${q}`).click();
      await expect(page.getByTestId('record-answer-headline')).toBeVisible({ timeout: 30_000 });
      await expect(page.getByTestId('record-answer-headline')).not.toHaveText('');
      await expect(page.getByTestId('record-answer-line').first()).toBeVisible();
    }
    await shot(page, `showme-answer-${vp}`);
    if (vp === 'phone') await noOverflow(page, 'Inspector questions');
    // A line opens the record it cites.
    await page.getByTestId('inspector-q-otj_quantified').click();
    await page.getByTestId('record-answer-line').first().click();
    await expect(page).toHaveURL(/section=student360&studentId=.*#otj/);
    expect(errors, errors.join('\n')).toEqual([]);
    await context.close();
  });
}

test('D. Four nations: wording follows the college nation', async ({ browser }) => {
  const before =
    admin<{ nation: string | null }>(
      `select nation from public.colleges where id = ${lit(NORTHGATE)}`
    )[0]?.nation ?? null;
  admin(`update public.colleges set nation = 'scotland' where id = ${lit(NORTHGATE)}`);
  try {
    const { context, page, errors } = await signedInPage(browser, 'tutor', 'desktop');
    await page.goto('/college/compliance#showme');
    await expect(page.getByTestId('inspector-q-epa_readiness')).toHaveText(/ready for FICA/, {
      timeout: 30_000,
    });
    await expect(page.getByTestId('inspector-q-otj_quantified')).toHaveText(
      /college and off-site training/
    );
    await page.goto('/college/settings/data');
    await expect(page.getByTestId('ilr-nation-note')).toContainText('Scotland');
    expect(errors, errors.join('\n')).toEqual([]);
    await context.close();
  } finally {
    admin(
      `update public.colleges set nation = ${before ? lit(before) : 'null'} where id = ${lit(NORTHGATE)}`
    );
  }
});

test('E. Evidence import: map, check, learner confirms, decision carried over', async ({
  browser,
}) => {
  const roll = await learnerRoll();
  const l = await actor('learner');
  // A criterion in the learner's qualification that nothing of theirs touches yet
  // (no decision, no evidence claim, no plan line), so recording the carried-over
  // decision supersedes nothing, closes no submission and meets no plan item.
  const L = lit(l.userId);
  const ac = admin<{ unit_code: string; ac_code: string; code: string }>(
    `select q.unit_code, q.ac_code, r.requirement_code as code
       from public._resolve_qualification(${L}::uuid, null) r
       join public.qualification_requirements q on q.qualification_code = r.requirement_code
      where not exists (select 1 from public.portfolio_assessment_decisions d where d.learner_id = ${L} and d.unit_code = q.unit_code and d.ac_code = q.ac_code)
        and not exists (select 1 from public.portfolio_item_criteria c where c.learner_id = ${L} and c.unit_code = q.unit_code and c.ac_code = q.ac_code)
        and not exists (select 1 from public.portfolio_assessment_plan_criteria pc where pc.learner_id = ${L} and pc.unit_code = q.unit_code and pc.ac_code = q.ac_code)
      order by q.unit_code desc, q.ac_code desc limit 1`
  )[0];
  expect(ac, 'fixture learner has a qualification with criteria').toBeTruthy();
  const cov = admin<Record<string, unknown>>(
    `select id, status, assessor_id, last_assessed_at, notes, evidence_count, last_evidence_at from public.student_ac_coverage
      where student_id = ${lit(roll.id)} and qualification_code = ${lit(ac.code)} and unit_code = ${lit(ac.unit_code)} and ac_code = ${lit(ac.ac_code)}`
  )[0];
  const title = `${RUN} imported wiring evidence`;
  const csv = [
    'Learner Email,Evidence Title,Description,Criteria,Assessor,Date Assessed,Outcome,Evidence ID,Attachment',
    `founder+collegedemo-learner@elec-mate.com,${title},Consumer unit change,"Unit ${ac.unit_code} AC ${ac.ac_code}",Jo Old-Assessor,14/03/2026,Achieved,OF-123,photo-1.png; notes.txt`,
    `nobody@example.com,${RUN} stray row,,301 1.1,X,01/01/2026,Achieved,OF-999,`,
  ].join('\n');
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'e2e-import-'));
  fs.writeFileSync(path.join(dir, 'evidence.csv'), csv);
  // A real 1x1 PNG (a portfolio accepts images), and a .txt it does not.
  fs.writeFileSync(
    path.join(dir, 'photo-1.png'),
    Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
      'base64'
    )
  );
  fs.writeFileSync(path.join(dir, 'notes.txt'), 'test file');

  let importId: string | null = null;
  try {
    for (const vp of ['phone', 'desktop'] as const) {
      const { context, page, errors } = await signedInPage(browser, 'tutor', vp);
      await page.goto('/college/import');
      await expect(
        page.getByRole('heading', { name: 'Import evidence from another e-portfolio' })
      ).toBeVisible({ timeout: 45_000 });
      await page.getByTestId('import-source').getByRole('button', { name: 'OneFile' }).click();
      await page.getByTestId('import-csv').setInputFiles(path.join(dir, 'evidence.csv'));
      await page
        .getByTestId('import-files')
        .setInputFiles([path.join(dir, 'photo-1.png'), path.join(dir, 'notes.txt')]);
      await expect(
        page.getByText(/1 of 2 rows ready\. 1 criterion read; 1 file found, 1 of a type/)
      ).toBeVisible({ timeout: 20_000 });
      await expect(page.getByTestId('import-problems')).toContainText(
        '1 row does not match a learner'
      );
      await expect(page.getByTestId('import-preview')).toContainText(
        `${ac.unit_code} AC ${ac.ac_code}`
      );
      await expect(page.getByTestId('import-preview')).toContainText('Files 1 of 2 found');
      await expect(page.getByTestId('import-preview')).toContainText(
        'Left behind (type not accepted): notes.txt'
      );
      await page.getByTestId('import-preview').scrollIntoViewIfNeeded();
      await shot(page, `import-preview-${vp}`);
      if (vp === 'phone') {
        await noOverflow(page, 'Evidence import');
        expect(errors, errors.join('\n')).toEqual([]);
        await context.close();
        continue;
      }
      await page.getByTestId('run-import').click();
      await expect(page.getByText(/1 item sent to learners to check/).first()).toBeVisible({
        timeout: 30_000,
      });
      await expect(page.getByTestId('import-history')).toContainText('1 item: 1 waiting', {
        timeout: 20_000,
      });
      expect(errors, errors.join('\n')).toEqual([]);
      await context.close();
    }
    const imp = admin<{ id: string; item: string; found: boolean }>(
      `select i.id, it.id as item, (it.criteria->0->>'found')::boolean as found
         from public.college_evidence_imports i join public.college_evidence_import_items it on it.import_id = i.id
        where it.title = ${lit(title)}`
    )[0];
    importId = imp.id;
    expect(imp.found).toBe(true);

    // The learner sees it on Today and adds it.
    const lp = await signedInPage(browser, 'learner', 'phone');
    await lp.page.goto('/apprentice/today');
    const card = lp.page.getByTestId('imported-evidence-card');
    await expect(card).toContainText(title, { timeout: 45_000 });
    await expect(card).toContainText('Assessed by Jo Old-Assessor');
    // The weekly recap sheet can open over Today on a Saturday: close it first.
    for (let i = 0; i < 3 && (await lp.page.getByRole('dialog').count()) > 0; i++) {
      await lp.page.keyboard.press('Escape');
      await lp.page.waitForTimeout(400);
    }
    await card.scrollIntoViewIfNeeded();
    await shot(lp.page, 'learner-imported-card-phone');
    await card.getByRole('button', { name: 'Yes, add it' }).first().click();
    await expect(lp.page.getByText(/Added to your portfolio|Not added/).first()).toBeVisible({
      timeout: 30_000,
    });
    const toastText = await lp.page
      .getByText(/Added to your portfolio|Not added/)
      .first()
      .evaluate((el) => el.parentElement?.innerText ?? '');
    expect(toastText, toastText).toContain('Added to your portfolio');
    await noOverflow(lp.page, 'Learner Today');
    expect(lp.errors, lp.errors.join('\n')).toEqual([]);
    await lp.context.close();

    const pi = admin<{ id: string; src: string; files: number }>(
      `select p.id, p.metadata->'imported'->>'original_assessor' as src, jsonb_array_length(p.storage_urls) as files
         from public.portfolio_items p join public.college_evidence_import_items it on it.portfolio_item_id = p.id
        where it.id = ${lit(imp.item)}`
    )[0];
    expect(pi.src).toBe('Jo Old-Assessor');
    expect(Number(pi.files)).toBe(1);

    // The tutor records the carried-over decision.
    const tp = await signedInPage(browser, 'tutor', 'desktop');
    await tp.page.goto('/college/import');
    await tp.page
      .getByRole('button', { name: /Record 1 carried-over/ })
      .first()
      .click();
    await expect(tp.page.getByText(/1 carried-over decision recorded/)).toBeVisible({
      timeout: 30_000,
    });
    await tp.context.close();
    const dec = admin<{ method: string; feedback: string; assessor_id: string }>(
      `select method, feedback, assessor_id from public.portfolio_assessment_decisions
        where learner_id = ${lit(l.userId)} and ${lit(pi.id)}::uuid = any (evidence_item_ids)`
    )[0];
    const tutor = await actor('tutor');
    expect(dec.method).toBe('imported');
    expect(dec.assessor_id).toBe(tutor.userId);
    expect(dec.feedback).toContain('previously assessed by Jo Old-Assessor on 14 Mar 2026');
  } finally {
    // Remove everything this run made, and put the coverage row back.
    const items = admin<{ pid: string | null; files: string | null }>(
      `select it.portfolio_item_id as pid, it.files::text as files from public.college_evidence_import_items it
         join public.college_evidence_imports i on i.id = it.import_id
        where i.college_id = ${lit(NORTHGATE)} and it.title like 'E2E·%'`
    );
    const mine = admin<{ name: string }>(
      `select name from storage.objects where bucket_id = 'portfolio-evidence' and name like ${lit(`${l.userId}/imported/%`)}`
    ).map((o) => o.name);
    if (mine.length) await l.db.storage.from('portfolio-evidence').remove(mine);
    for (const it of items) {
      if (it.pid) {
        // portfolio_audit_events is append-only by design: its rows stay.
        admin(
          `delete from public.portfolio_assessment_decisions where ${lit(it.pid)}::uuid = any (evidence_item_ids) and method = 'imported'`
        );
        admin(
          `delete from public.portfolio_item_criteria where portfolio_item_id = ${lit(it.pid)}`
        );
        admin(
          `update public.college_evidence_import_items set portfolio_item_id = null where portfolio_item_id = ${lit(it.pid)}`
        );
        admin(`delete from public.portfolio_items where id = ${lit(it.pid)}`);
      }
    }
    admin(
      `set local storage.allow_delete_query = 'true';
       delete from storage.objects where (bucket_id = 'college-learner-evidence' and name like ${lit(`${NORTHGATE}/imports/%`)} and created_at > now() - interval '2 hours')
          or (bucket_id = 'portfolio-evidence' and name like ${lit(`${l.userId}/imported/%`)})`
    );
    admin(
      `delete from public.college_evidence_imports where college_id = ${lit(NORTHGATE)} and id in (select import_id from public.college_evidence_import_items where title like 'E2E·%')`
    );
    if (importId) admin(`delete from public.college_evidence_imports where id = ${lit(importId)}`);
    if (cov) {
      admin(
        `update public.student_ac_coverage set status = ${lit(String(cov.status))},
           assessor_id = ${cov.assessor_id ? `${lit(String(cov.assessor_id))}::uuid` : 'null'},
           last_assessed_at = ${cov.last_assessed_at ? `${lit(String(cov.last_assessed_at))}::timestamptz` : 'null'},
           notes = ${cov.notes ? lit(String(cov.notes)) : 'null'},
           evidence_count = ${Number(cov.evidence_count ?? 0)},
           last_evidence_at = ${cov.last_evidence_at ? `${lit(String(cov.last_evidence_at))}::timestamptz` : 'null'}
         where id = ${lit(String(cov.id))}`
      );
    }
  }
});

test('F. Four nations in the course catalogue (structure, no save)', async ({ browser }) => {
  const { context, page, errors } = await signedInPage(browser, 'tutor', 'desktop');
  await page.goto('/college/setup');
  const step = page.locator('li', { hasText: /^.*courses/i }).filter({ has: page.getByRole('button') }).first();
  await expect(step).toBeVisible({ timeout: 45_000 });
  await step.getByRole('button').first().click();
  await expect(page.getByTestId('catalogue-nation')).toBeVisible({ timeout: 20_000 });
  await expect(page.getByTestId('catalogue-nation-line')).toContainText('England: apprenticeship standard set by Skills England');
  await page.getByTestId('catalogue-nation').getByRole('button', { name: 'Wales' }).click();
  await expect(page.getByTestId('catalogue-nation-line')).toContainText('Apprenticeship Certification Wales (ACW)');
  await expect(page.getByTestId('catalogue-nation-line')).toContainText('minimum on-the-job and off-the-job hours');
  await page.getByTestId('catalogue-nation').getByRole('button', { name: 'Scotland' }).click();
  await expect(page.getByTestId('catalogue-nation-line')).toContainText('end assessment FICA');
  await page.getByTestId('catalogue-nation').getByRole('button', { name: 'Northern Ireland' }).click();
  await expect(page.getByTestId('catalogue-nation-line')).toContainText('Duration is agreed');
  await shot(page, 'catalogue-nation-desktop');
  await page.getByRole('button', { name: 'Cancel' }).click();
  expect(errors, errors.join('\n')).toEqual([]);
  await context.close();
});
