/**
 * Journey 70 — reporting feed for college data teams (ELE-2057).
 *
 *   npx playwright test -c playwright.college.config.ts e2e/college/70-reporting-feed.spec.ts
 *
 *  A. The read API (deployed college-data-api, extended, not a second API):
 *     a key minted by the same internal creator the admin RPC uses (minting
 *     still needs a real admin or head of department; e2e/45 proves that).
 *     The index lists the five reporting datasets under the scopes that
 *     unlock them; each returns 200 with exactly the documented columns, as
 *     JSON and CSV, as a snapshot (since not applied). Numbers hold together:
 *     criterion states add up to the total and match get_portfolio_ac_state
 *     for the fixture learner; verified hours = college + employer;
 *     attendance % = (present + late) / marks. A key without the scope gets
 *     403 naming the scope it needs. Every call is in the access log.
 *  B. Data and API page, desktop 1440 and phone 390: the reporting views with
 *     their own exports (CSV header = documented columns), the API reference
 *     naming each view's scope, and the Power BI guide with a query that uses
 *     Web.Contents with RelativePath and Query (the refreshable form) and
 *     pages on next_offset.
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
  lit,
  NORTHGATE,
  RUN,
  signedInPage,
  SUPABASE_URL,
} from './support';
import {
  DATA_API_BASE,
  INTERCHANGE_DATASETS,
  REPORTING_DATASETS,
} from '../../src/lib/college/interchange';
import { POWER_BI_QUERY } from '../../src/lib/college/powerBi';

test.skip(!haveCreds(), 'College fixture credentials are not available');
test.skip(() => !adminAvailable(), 'No Supabase CLI login: cannot mint a test key or clean up');
test.describe.configure({ mode: 'serial' });
test.setTimeout(180_000);

const API = `${SUPABASE_URL}/functions/v1/college-data-api`;

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

function mint(
  label: string,
  scopes: string[],
  rate: number,
  by: string
): { id: string; key: string } {
  const made = admin<{ j: unknown }>(
    `select public._college_api_key_create(${lit(NORTHGATE)}::uuid, ${lit(label)}, array[${scopes.map(lit).join(',')}], ${rate}, ${lit(by)}::uuid) as j`
  )[0];
  return (typeof made.j === 'string' ? JSON.parse(made.j) : made.j) as { id: string; key: string };
}

test('A. Reporting datasets on the read API', async () => {
  const t = await actor('tutor');
  const l = await actor('learner');
  const full = mint(
    `${RUN} reporting key`,
    ['learners', 'hours', 'decisions', 'attendance', 'reviews'],
    60,
    t.userId
  );
  const narrow = mint(`${RUN} narrow key`, ['learners'], 10, t.userId);
  try {
    const h = { Authorization: `Bearer ${full.key}` };
    // The dictionary, the function and the database agree on five views.
    expect(REPORTING_DATASETS.map((d) => d.key)).toEqual([
      'learner_progress',
      'learner_hours',
      'learner_reviews',
      'learner_risk',
      'learner_attendance',
    ]);
    const idx = await fetch(`${API}/v1`, { headers: h });
    expect(idx.status).toBe(200);
    const idxJ = (await idx.json()) as {
      datasets: Record<string, { columns: string[]; scope: string; snapshot: boolean }>;
    };
    for (const d of REPORTING_DATASETS) {
      expect(idxJ.datasets[d.key], d.key).toBeTruthy();
      expect(idxJ.datasets[d.key].columns).toEqual(cols(d.key));
      expect(idxJ.datasets[d.key].scope).toBe(d.scope);
      expect(idxJ.datasets[d.key].snapshot).toBe(true);
    }
    expect(idxJ.datasets.ilr, 'no ilr scope, no ilr').toBeUndefined();
    expect(idxJ.datasets.learners.snapshot).toBe(false);

    const rows: Record<string, Array<Record<string, unknown>>> = {};
    for (const d of REPORTING_DATASETS) {
      const r = await fetch(`${API}/v1/${d.key}?limit=1000&since=2099-01-01`, { headers: h });
      expect(r.status, d.key).toBe(200);
      const j = (await r.json()) as {
        columns: string[];
        data: Array<Record<string, unknown>>;
        since: string | null;
        snapshot: boolean;
        count: number;
      };
      expect(j.columns).toEqual(cols(d.key));
      expect(j.snapshot).toBe(true);
      expect(j.since, 'since is not applied to a snapshot').toBeNull();
      expect(j.count, `${d.key} returns learners even with a future since`).toBeGreaterThan(0);
      expect(Object.keys(j.data[0])).toEqual(cols(d.key));
      rows[d.key] = j.data;
    }
    // CSV: the documented header.
    const csv = await fetch(`${API}/v1/learner_hours?format=csv&limit=2`, { headers: h });
    expect(csv.status).toBe(200);
    expect((await csv.text()).split('\r\n')[0]).toBe(cols('learner_hours').join(','));

    // The numbers hold together.
    for (const p of rows.learner_progress) {
      const parts = [
        'not_started',
        'suggested',
        'claimed',
        'submitted',
        'referred',
        'not_yet',
        'passed',
        'iqa_confirmed',
        'iqa_rejected',
      ]
        .map((k) => Number(p[`criteria_${k}`]))
        .reduce((a, b) => a + b, 0);
      expect(parts, `states add up for ${p.learner_id}`).toBe(Number(p.criteria_total));
      expect(Number(p.criteria_achieved)).toBe(
        Number(p.criteria_passed) + Number(p.criteria_iqa_confirmed)
      );
    }
    for (const r of rows.learner_hours) {
      expect(Number(r.verified_hours)).toBeCloseTo(
        Number(r.college_verified_hours) + Number(r.employer_verified_hours),
        0
      );
    }
    for (const a of rows.learner_attendance) {
      if (Number(a.sessions_marked) > 0)
        expect(Number(a.attendance_percent)).toBeCloseTo(
          (100 * (Number(a.present) + Number(a.late))) / Number(a.sessions_marked),
          0
        );
    }
    // learner_progress equals the one read model for the fixture learner.
    const roll = admin<{ id: string }>(
      `select id from public.college_students where user_id = ${lit(l.userId)} and college_id = ${lit(NORTHGATE)} limit 1`
    )[0];
    const truth = admin<{ total: number; achieved: number }>(
      `select c.total, (c.passed + c.iqa_confirmed) as achieved from public._college_ac_state_counts(${lit(l.userId)}::uuid) c`
    )[0];
    const mine = rows.learner_progress.find((p) => p.learner_id === roll.id)!;
    expect(mine, 'the fixture learner is in learner_progress').toBeTruthy();
    expect(Number(mine.criteria_total)).toBe(Number(truth.total));
    expect(Number(mine.criteria_achieved)).toBe(Number(truth.achieved));
    // And _college_ac_state_counts agrees with get_portfolio_ac_state read as the learner.
    const direct = await l.db.rpc(
      'get_portfolio_ac_state' as never,
      { p_user_id: l.userId } as never
    );
    expect(direct.error).toBeNull();
    const states = (direct.data as unknown as Array<{ state: string }>) ?? [];
    expect(states.length).toBe(Number(mine.criteria_total));
    expect(states.filter((s) => ['passed', 'iqa_confirmed'].includes(s.state)).length).toBe(
      Number(mine.criteria_achieved)
    );

    // Scope: a learners-only key reads learner_risk, not learner_hours.
    const nh = { Authorization: `Bearer ${narrow.key}` };
    expect((await fetch(`${API}/v1/learner_risk?limit=1`, { headers: nh })).status).toBe(200);
    const denied = await fetch(`${API}/v1/learner_hours?limit=1`, { headers: nh });
    expect(denied.status).toBe(403);
    expect(((await denied.json()) as { error: { message: string } }).error.message).toContain(
      'needs the "hours" scope'
    );

    const log = admin<{ dataset: string; status_code: number }>(
      `select dataset, status_code from public.college_data_access_log where key_id in (${lit(full.id)}, ${lit(narrow.id)})`
    );
    for (const d of REPORTING_DATASETS)
      expect(
        log.some((x) => x.dataset === d.key && Number(x.status_code) === 200),
        `${d.key} logged`
      ).toBe(true);
    expect(log.some((x) => x.dataset === 'learner_hours' && Number(x.status_code) === 403)).toBe(
      true
    );
  } finally {
    admin(
      `delete from public.college_data_access_log where key_id in (${lit(full.id)}, ${lit(narrow.id)}); delete from public.college_api_keys where id in (${lit(full.id)}, ${lit(narrow.id)})`
    );
  }
});

test('Power BI query is the refreshable, paging form', () => {
  expect(POWER_BI_QUERY).toContain(`Base = "${DATA_API_BASE}"`);
  expect(POWER_BI_QUERY).toMatch(/Web\.Contents\(Base, \[\s*RelativePath = "v1\/" & dataset,/);
  expect(POWER_BI_QUERY).toContain('Query = [limit = "1000", offset = Number.ToText(offset)]');
  expect(POWER_BI_QUERY).toContain('Headers = [Authorization = "Bearer " & ApiKey]');
  expect(POWER_BI_QUERY).toContain('p[next_offset] = null');
  expect(POWER_BI_QUERY).toContain('Table.FromRecords(Rows, First[columns], MissingField.UseNull)');
});

for (const vp of ['desktop', 'phone'] as const) {
  test(`B. Data and API page: reporting views and the Power BI guide (${vp})`, async ({
    browser,
  }) => {
    const { context, page, errors } = await signedInPage(browser, 'tutor', vp);
    await page.goto('/college/settings/data');
    await expect(page.getByRole('heading', { name: 'Your data, out to your MIS' })).toBeVisible({
      timeout: 45_000,
    });
    await expect(
      page.getByText(/\d+ learners on record, \d+ with a ULN.*6 datasets and 5 reporting views/)
    ).toBeVisible({ timeout: 30_000 });
    await expect(page.getByTestId('reporting-label')).toBeVisible();
    for (const d of REPORTING_DATASETS)
      await expect(page.getByTestId(`export-${d.key}-csv`)).toBeVisible();
    await page.getByTestId('reporting-label').scrollIntoViewIfNeeded();
    await shot(page, 'reporting-exports', vp === 'phone');
    if (vp === 'desktop') {
      const [dl] = await Promise.all([
        page.waitForEvent('download'),
        page.getByTestId('export-learner_progress-csv').click(),
      ]);
      const file = path.join(os.tmpdir(), `e2e-progress-${Date.now()}.csv`);
      await dl.saveAs(file);
      expect(fs.readFileSync(file, 'utf8').split(/\r?\n/)[0]).toBe(
        cols('learner_progress').join(',')
      );
    }
    await page.getByRole('button', { name: /learner_hours · Hours summary/ }).click();
    await expect(page.getByText('snapshot, needs the hours scope')).toBeVisible();
    await expect(page.getByText('hours_ahead_or_behind', { exact: true })).toBeVisible();
    const guide = page.getByTestId('power-bi-guide');
    await guide.scrollIntoViewIfNeeded();
    await expect(guide).toContainText('Connect Power BI in five steps');
    await expect(page.getByTestId('power-bi-query')).toContainText(
      'RelativePath = "v1/" & dataset'
    );
    await shot(page, 'power-bi-guide', vp === 'phone');
    expect(errors, errors.join('\n')).toEqual([]);
    await context.close();
  });
}
