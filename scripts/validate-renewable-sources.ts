#!/usr/bin/env tsx
/**
 * Renewable course source-grounding validator.
 *
 * Scans src/pages/upskilling/RenewableEnergy*.tsx for <RegsCallout> and
 * <CommonMistake> blocks and verifies each claim resolves to a row in
 * bs7671_facets / bs7671_regulations / practical_work_intelligence.
 *
 * Usage:
 *   tsx scripts/validate-renewable-sources.ts          # report only
 *   tsx scripts/validate-renewable-sources.ts --strict # exit 1 on unresolved
 *
 * Env: SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY (or VITE_SUPABASE_URL +
 * SUPABASE_ANON_KEY for read-only validation).
 */
import { createClient } from '@supabase/supabase-js';
import { readFile } from 'node:fs/promises';
import { glob } from 'glob';

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  '';

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing SUPABASE_URL / SUPABASE_*_KEY env vars.');
  process.exit(2);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const strict = process.argv.includes('--strict');

type FindingType = 'reg' | 'mistake';
interface Finding {
  file: string;
  type: FindingType;
  claim: string;
  resolved: boolean;
  reason?: string;
}

const REGS_CALLOUT_RE = /<RegsCallout[^>]*\bsource=\{?["']([^"']+)["']/g;
const COMMON_MISTAKE_RE = /<CommonMistake[^>]*\btitle=\{?["']([^"']+)["']/g;
const REG_NUMBER_RE = /(?:Reg|Regulation|Section|Chapter)\s+([\d.]+(?:\.\d+)*)/i;

async function resolveRegCite(source: string): Promise<{ ok: boolean; reason?: string }> {
  const regMatch = source.match(REG_NUMBER_RE);
  if (!regMatch) return { ok: false, reason: 'no reg number parsed from source string' };
  const regNumber = regMatch[1];

  const reg = await supabase
    .from('bs7671_regulations')
    .select('id', { count: 'exact', head: true })
    .eq('reg_number', regNumber);
  if ((reg.count ?? 0) > 0) return { ok: true };

  const facet = await supabase
    .from('bs7671_facets')
    .select('id', { count: 'exact', head: true })
    .ilike('primary_topic', `%${regNumber}%`);
  if ((facet.count ?? 0) > 0) return { ok: true };

  return { ok: false, reason: `reg_number ${regNumber} not found in bs7671_regulations or bs7671_facets` };
}

async function resolveCommonMistake(title: string): Promise<{ ok: boolean; reason?: string }> {
  const query = title.split(/\s+/).slice(0, 5).join(' ');
  if (!query) return { ok: false, reason: 'empty title' };

  const pwi = await supabase
    .from('practical_work_intelligence')
    .select('id', { count: 'exact', head: true })
    .textSearch('tsv', query.replace(/[^\w\s]/g, ' '));
  if ((pwi.count ?? 0) > 0) return { ok: true };

  return { ok: false, reason: `no practical_work_intelligence row matched "${query}"` };
}

async function main(): Promise<void> {
  const files = await glob('src/pages/upskilling/RenewableEnergy*.tsx');
  if (files.length === 0) {
    console.warn('No renewable course files found. Nothing to validate.');
    return;
  }

  const findings: Finding[] = [];

  for (const file of files) {
    const text = await readFile(file, 'utf8');

    let m: RegExpExecArray | null;
    REGS_CALLOUT_RE.lastIndex = 0;
    while ((m = REGS_CALLOUT_RE.exec(text)) !== null) {
      const source = m[1];
      const { ok, reason } = await resolveRegCite(source);
      findings.push({ file, type: 'reg', claim: source, resolved: ok, reason });
    }

    COMMON_MISTAKE_RE.lastIndex = 0;
    while ((m = COMMON_MISTAKE_RE.exec(text)) !== null) {
      const title = m[1];
      const { ok, reason } = await resolveCommonMistake(title);
      findings.push({ file, type: 'mistake', claim: title, resolved: ok, reason });
    }
  }

  const regs = findings.filter((f) => f.type === 'reg');
  const mistakes = findings.filter((f) => f.type === 'mistake');
  const unresolved = findings.filter((f) => !f.resolved);

  console.log('\nRenewable course source-grounding validator');
  console.log('  Files scanned:        ', files.length);
  console.log('  <RegsCallout> blocks: ', regs.length, `(${regs.filter((r) => r.resolved).length} resolved)`);
  console.log('  <CommonMistake> blocks:', mistakes.length, `(${mistakes.filter((r) => r.resolved).length} resolved)`);
  console.log('  Unresolved total:     ', unresolved.length);

  if (unresolved.length > 0) {
    console.log('\nUnresolved claims:');
    for (const f of unresolved) {
      console.log(`  [${f.type}] ${f.file}`);
      console.log(`    claim:  ${f.claim}`);
      if (f.reason) console.log(`    reason: ${f.reason}`);
    }
    if (strict) {
      console.error('\n--strict mode: failing build.');
      process.exit(1);
    }
  } else if (findings.length > 0) {
    console.log('\nAll claims grounded.');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
