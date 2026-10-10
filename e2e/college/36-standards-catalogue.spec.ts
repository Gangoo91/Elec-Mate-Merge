/**
 * Journey 36 — the standards catalogue has one read API (ELE-1903).
 *
 * catalogue_for() returns standard → qualification → unit → LO → AC for a
 * learner, picking the version by their start date:
 *   - the fixture learner (C&G 5357, started 6 Oct 2026) sits under ST0152
 *     v1.2 (approved for starts 21 Jul 2025 – 16 Dec 2026), whose end
 *     assessment for a 2026 registration is the AM2S v1;
 *   - the AC tree matches qualification_requirements exactly (nothing added);
 *   - an earlier start date finds no recorded version and says so in "gaps";
 *   - aliases resolve (3529 → 2365-03 rows; an EAL apprenticeship code →
 *     601/7345/2 rows) and EAL never borrows City & Guilds study links;
 *   - the tutor reads it for their learner; nobody reads another learner's.
 * Read-only: nothing is written.
 */
import { test, expect } from '@playwright/test';
import { actor, haveCreds, learnerRoll } from './support';

test.skip(!haveCreds(), 'College fixture credentials are not available');

type Ac = { id: string; ac_code: string; links: Array<{ kind: string; via: string }> };
type Catalogue = {
  as_of: string;
  learner_start_date: string | null;
  qualification: {
    code: string;
    requirement_code: string;
    aliases: string[];
    version_match: string;
  };
  standard: null | {
    code: string;
    version: string;
    version_match: string;
    end_assessment: { assessment_code: string; assessment_version: string } | null;
    ksbs: Array<{ code: string; type: string; criteria: string[] }>;
  };
  units: Array<{ unit_code: string; los: Array<{ lo_number: number; acs: Ac[] }> }>;
  counts: { units: number; los: number; acs: number; acs_with_study: number; acs_with_practise: number };
  gaps: string[];
};

const acsOf = (c: Catalogue) => c.units.flatMap((u) => u.los.flatMap((l) => l.acs));

test('the learner’s catalogue: ST0152 v1.2 by start date, AM2S v1, every criterion once', async () => {
  const l = await actor('learner');
  const { data, error } = await l.db.rpc('catalogue_for' as never, {} as never);
  expect(error).toBeNull();
  const c = data as unknown as Catalogue;

  expect(c.qualification.code).toBe('5357');
  expect(c.as_of).toBe(c.learner_start_date);
  expect(c.standard?.code).toBe('ST0152');
  expect(c.standard?.version).toBe('1.2');
  expect(c.standard?.version_match).toBe('in_range');
  expect(c.standard?.end_assessment?.assessment_code).toBe('AM2S');
  expect(c.standard?.end_assessment?.assessment_version).toBe('v1');

  // The tree is the qualification's own rows, no more and no fewer.
  const { count } = await l.db
    .from('qualification_requirements')
    .select('id', { count: 'exact', head: true })
    .eq('qualification_code', c.qualification.requirement_code);
  const acs = acsOf(c);
  expect(acs.length).toBe(count);
  expect(c.counts.acs).toBe(count);
  expect(new Set(acs.map((a) => a.id)).size, 'no criterion twice').toBe(acs.length);
  expect(c.counts.units).toBe(c.units.length);
  expect(c.counts.acs_with_study).toBe(acs.filter((a) => a.links.some((x) => x.kind === 'study')).length);

  // KSBs come through; links to criteria are a human job and the API says so.
  expect(c.standard?.ksbs.length).toBeGreaterThan(0);
  expect(c.gaps).toContain('ksb_criteria_links');
  expect(c.gaps).toContain('qualification_version_dates');
});

test('an earlier start date finds no recorded ST0152 version, and says so', async () => {
  const l = await actor('learner');
  const { data } = await l.db.rpc('catalogue_for' as never, { p_as_of: '2024-01-15' } as never);
  const c = data as unknown as Catalogue;
  expect(c.as_of).toBe('2024-01-15');
  expect(c.standard?.version_match).toBe('no_version_for_date');
  expect(c.gaps).toContain('standard_version_for_date');
  // A 2024 registration is still after Sept 2023, so AM2S v1 applies.
  expect(c.standard?.end_assessment?.assessment_code).toBe('AM2S');
  // Before Sept 2023 nothing is recorded: no end assessment is invented.
  const { data: old } = await l.db.rpc('catalogue_for' as never, { p_as_of: '2022-09-01' } as never);
  const o = old as unknown as Catalogue;
  expect(o.standard?.end_assessment).toBeNull();
  expect(o.gaps).toContain('end_assessment_for_date');
});

test('aliases resolve to their criteria rows, and EAL never borrows C&G links', async () => {
  const l = await actor('learner');
  const bse = (await l.db.rpc('catalogue_for' as never, { p_qualification_code: '3529' } as never))
    .data as unknown as Catalogue;
  expect(bse.qualification.requirement_code).toBe('2365-03');
  expect(bse.counts.acs).toBeGreaterThan(0);
  expect(bse.counts.acs_with_study, '2365-03 lessons carry their own AC headers').toBeGreaterThan(0);

  const eal = (await l.db.rpc('catalogue_for' as never, { p_qualification_code: '603/5806/9' } as never))
    .data as unknown as Catalogue;
  expect(eal.qualification.requirement_code).toBe('601/7345/2');
  expect(eal.qualification.aliases).toContain('603/3895/8');
  expect(eal.counts.acs).toBe(304);
  expect(eal.counts.acs_with_study, 'no EAL ↔ C&G cross-links').toBe(0);
});

test('the tutor reads their learner’s catalogue; a learner cannot read someone else’s', async () => {
  const t = await actor('tutor');
  const roll = await learnerRoll();
  const mine = (await t.db.rpc('catalogue_for' as never, { p_student_id: roll.id } as never))
    .data as unknown as Catalogue;
  expect(mine.qualification.code).toBe('5357');

  const { data: other } = await t.db
    .from('college_students')
    .select('id')
    .eq('college_id', roll.college_id)
    .neq('id', roll.id)
    .limit(1)
    .single();
  const l = await actor('learner');
  const r = await l.db.rpc('catalogue_for' as never, { p_student_id: (other as { id: string }).id } as never);
  expect(r.error?.message ?? '').toMatch(/not allowed/);
});
