import type { KvRow, MapContext, Mapper, SafetyPayload, Section } from './contract.ts';
import { safeIsolationMapper } from './mappers/safe-isolation.ts';
import { ramsMapper } from './mappers/rams.ts';
import { briefingMapper } from './mappers/briefing.ts';
import { permitMapper } from './mappers/permit.ts';
import { nearMissMapper } from './mappers/near-miss.ts';
import { accidentMapper } from './mappers/accident.ts';
import { riddorReportMapper } from './mappers/riddor.ts';
import { coshhMapper } from './mappers/coshh.ts';
import { inspectionMapper } from './mappers/inspection.ts';
import { preUseCheckMapper } from './mappers/pre-use-check.ts';
import { fireWatchMapper } from './mappers/fire-watch.ts';
import { siteDiaryMapper } from './mappers/site-diary.ts';
import { observationMapper } from './mappers/observation.ts';
import { equipmentMapper } from './mappers/equipment.ts';
import { photoProjectMapper } from './mappers/photo-project.ts';

/**
 * docType → mapper for the PDFMonkey Safety Record template. A type missing
 * here falls back to the Browserless HTML template in generate-safety-record-pdf.
 */
export const SAFETY_MAPPERS: Partial<Record<string, Mapper>> = {
  'safe-isolation': safeIsolationMapper,
  rams: ramsMapper,
  briefing: briefingMapper,
  permit: permitMapper,
  'near-miss': nearMissMapper,
  accident: accidentMapper,
  'riddor-report': riddorReportMapper,
  coshh: coshhMapper,
  inspection: inspectionMapper,
  'pre-use-check': preUseCheckMapper,
  'fire-watch': fireWatchMapper,
  'site-diary': siteDiaryMapper,
  observation: observationMapper,
  equipment: equipmentMapper,
  'photo-project': photoProjectMapper,
};

export function buildSafetyPayload(
  docType: string,
  record: Record<string, unknown>,
  ctx: MapContext,
  company: Record<string, string>
): SafetyPayload | null {
  const mapper = SAFETY_MAPPERS[docType];
  if (!mapper) return null;
  const out = mapper(record, ctx);
  // A record history must read in time order, whatever order a mapper built
  // it in. Entries whose time cannot be read keep their place at the end.
  if (out.audit?.length) {
    const t = (s: string) => {
      const ms = Date.parse(s.replace(',', ''));
      return Number.isNaN(ms) ? Number.POSITIVE_INFINITY : ms;
    };
    out.audit = out.audit
      .map((a, i) => ({ a, i }))
      .sort((x, y) => t(x.a.at) - t(y.a.at) || x.i - y.i)
      .map((x) => x.a);
  }
  out.sections = compactSections(out.sections);
  return { ...out, company, job: { ...ctx.job, ...(out.job ?? {}) } } as SafetyPayload;
}

/**
 * A run of short sections — one short paragraph, or a short list — each drew
 * its own navy bar and box, so a one-line "Issues" note cost as much page as a
 * risk table and a site diary ran to three pages of mostly headings. Such runs
 * are merged into one ruled block of full-width fields, each keeping its own
 * label. Long text, tables, checklists and steps are left exactly as mapped.
 */
const SHORT_TEXT = 220;
function shortValue(s: Section): string | null {
  if (s.intro) return null;
  if (s.kind === 'text' && s.paragraphs.length === 1 && s.paragraphs[0].length <= SHORT_TEXT) return s.paragraphs[0];
  if (s.kind === 'items' && s.items.length <= 4 && s.items.every((i) => i.length <= 60)) return s.items.join(' · ');
  return null;
}
export function compactSections(sections: Section[]): Section[] {
  const out: Section[] = [];
  let run: { heading: string; value: string }[] = [];
  const flush = () => {
    if (run.length >= 2) {
      const rows: KvRow[] = run.map((r) => ({ label: r.heading, value: r.value, wide: true }));
      out.push({ heading: 'Details', kind: 'kv', rows });
    } else if (run.length === 1) {
      // A single short section on its own is fine as it was.
      out.push(...pending);
    }
    run = [];
    pending = [];
  };
  let pending: Section[] = [];
  for (const s of sections) {
    const v = shortValue(s);
    if (v !== null) {
      run.push({ heading: s.heading, value: v });
      pending.push(s);
    } else {
      flush();
      out.push(s);
    }
  }
  flush();
  return out;
}
