/**
 * Journey 51 — one read model: the retired duplicate schemas stay retired (ELE-1918).
 *
 * The truth for a criterion is get_portfolio_ac_state. These duplicates were
 * retired on 10 Oct 2026 and must not come back:
 *   unit_coverage_matrix, evidence_ksb_mapping, college_ac_signoff_proposals,
 *   college_conversations (learner chat), portfolio_evidence_files.
 *
 * Checks, read-only:
 *   1. the source tree has no read or write of any of them (types file aside),
 *   2. the learner's and tutor's main screens send no request to any of them,
 *      at desktop and phone width,
 *   3. the database labels them [LEGACY — DO NOT USE] and refuses app writes,
 *   4. the dead functions can no longer be called by a signed-in user.
 */
import fs from 'node:fs';
import path from 'node:path';
import { test, expect } from '@playwright/test';
import { actor, admin, adminAvailable, haveCreds, learnerContext, signedInPage } from './support';

test.skip(!haveCreds(), 'College fixture credentials are not available');

const RETIRED = [
  'unit_coverage_matrix',
  'evidence_ksb_mapping',
  'college_ac_signoff_proposals',
  'college_conversations',
  'portfolio_evidence_files',
];
const RETIRED_RE = new RegExp(`/rest/v1/(${RETIRED.join('|')})\\b`);

function walk(dir: string, out: string[] = []): string[] {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.(ts|tsx)$/.test(e.name)) out.push(p);
  }
  return out;
}

test('no source file reads or writes a retired table', () => {
  const offenders: string[] = [];
  for (const file of walk(path.resolve('src'))) {
    if (file.includes(`${path.sep}integrations${path.sep}supabase${path.sep}types`)) continue;
    const src = fs.readFileSync(file, 'utf8');
    for (const t of RETIRED) {
      if (new RegExp(`from\\(\\s*['"\`]${t}['"\`]|table:\\s*['"\`]${t}['"\`]`).test(src))
        offenders.push(`${file}: ${t}`);
    }
  }
  expect(offenders, offenders.join('\n')).toEqual([]);
  // The migration for a table that never existed is gone.
  expect(
    fs.existsSync(path.resolve('supabase/migrations/20260214_portfolio_evidence_files.sql'))
  ).toBe(false);
  // The drop is held back, never in migrations/.
  const held = fs
    .readdirSync(path.resolve('supabase/release-held'))
    .some((f) => f.includes('drop_retired_schemas_ele1918'));
  expect(held).toBe(true);
  expect(
    fs
      .readdirSync(path.resolve('supabase/migrations'))
      .some((f) => f.includes('drop_retired_schemas'))
  ).toBe(false);
});

for (const viewport of ['desktop', 'phone'] as const) {
  test(`learner and tutor screens send nothing to a retired table (${viewport})`, async ({
    browser,
  }) => {
    const ctx = await learnerContext();
    const hits: string[] = [];
    const routes: Array<['learner' | 'tutor', string]> = [
      ['learner', '/apprentice/hub'],
      ['learner', '/apprentice/hub?tab=progress'],
      ['learner', '/apprentice/college/voice'],
      ['tutor', '/college'],
      ['tutor', `/college?section=student360&studentId=${ctx.student_id}#portfolio`],
    ];
    for (const who of ['learner', 'tutor'] as const) {
      const { context, page, errors } = await signedInPage(browser, who, viewport);
      page.on('request', (r) => {
        if (RETIRED_RE.test(r.url())) hits.push(`${who} ${r.method()} ${r.url().slice(0, 160)}`);
      });
      for (const [w, url] of routes) {
        if (w !== who) continue;
        await page.goto(url);
        await page.waitForLoadState('networkidle').catch(() => undefined);
        await page.waitForTimeout(1500);
      }
      // The messages sheet's College tab used to list college_conversations.
      if (who === 'tutor') {
        const msgs = page.getByRole('button', { name: /messages/i }).first();
        if (await msgs.isVisible().catch(() => false)) {
          await msgs.click().catch(() => undefined);
          await page.waitForTimeout(2000);
          await page.keyboard.press('Escape');
        }
      }
      expect(errors, errors.join('\n')).toEqual([]);
      await context.close();
    }
    expect(hits, hits.join('\n')).toEqual([]);
  });
}

test('the database labels the retired tables and refuses app writes', async () => {
  test.skip(!adminAvailable(), 'Supabase CLI not logged in');
  const rows = admin<{ t: string; c: string | null }>(`
    select t, obj_description(to_regclass('public.'||t)) c
      from unnest(array['unit_coverage_matrix','evidence_ksb_mapping','college_ac_signoff_proposals','college_conversations']) t`);
  expect(rows.length).toBe(4);
  for (const r of rows) expect(r.c ?? '', r.t).toMatch(/^\[LEGACY — DO NOT USE\]/);
  const missing = admin<{ r: string | null }>(
    `select to_regclass('public.portfolio_evidence_files')::text r`
  );
  expect(missing[0]?.r ?? null).toBeNull();

  const l = await actor('learner');
  const { error: insErr } = await l.db.from('college_conversations').insert({
    institution_id: '00000000-0000-0000-0000-000000000000',
    conversation_type: 'student_tutor',
    participant_1_id: l.userId,
    participant_1_type: 'student',
    participant_2_id: l.userId,
    participant_2_type: 'staff',
  } as never);
  expect(insErr, 'a learner can no longer write college_conversations').not.toBeNull();

  const { error: rpcErr } = await l.db.rpc(
    'propose_ac_signoff' as never,
    {
      p_student_id: '00000000-0000-0000-0000-000000000000',
      p_ac_id: '00000000-0000-0000-0000-000000000000',
      p_ac_code: '1.1',
      p_ac_title: 'x',
      p_evidence_kind: 'quiz_attempt',
      p_evidence_id: '00000000-0000-0000-0000-000000000000',
      p_score_pct: 100,
    } as never
  );
  expect(rpcErr?.message ?? '', 'the mastery proposal producer is closed').toMatch(
    /permission denied|not find|does not exist/i
  );
});
