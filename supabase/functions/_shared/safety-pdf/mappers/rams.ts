import type { Mapper, Section } from '../contract.ts';
import { fmtDate, fmtDateTime, refFrom, rows, str, type Row } from '../common.ts';

/**
 * RAMS — risk assessment and method statement, from a generated RAMS
 * (rams_generation_jobs: rams_data + method_data, as saved after review).
 *
 * Built to be READ on site, which the old layout was not (23 pages, a column
 * grid per hazard, a "CDM 2015 Compliant" claim in the header). Order:
 *   1. On site in brief — the five highest risks with their controls, PPE and
 *      emergency arrangements: the page a briefing is given from.
 *   2. Scope, risk register, method statement, people and kit.
 *
 * Deliberately NOT printed: the draft's own regulation citations
 * (bs7671_cites, complianceRegulations). They are AI-drafted and have named a
 * regulation that does not exist before; nothing on a client document may
 * quote the Regulations unverified. No compliance claims of any kind.
 */

const band = (score: number): string =>
  score >= 15 ? 'Very high' : score >= 10 ? 'High' : score >= 5 ? 'Medium' : score > 0 ? 'Low' : '';

const rating = (score: unknown): string => {
  const n = Number(score);
  return Number.isFinite(n) && n > 0 ? `${n} · ${band(n)}` : '';
};

/** "ELIMINATE: … ENGINEERING CONTROLS: …" → one line per level. */
const controlsText = (v: unknown): string =>
  str(v)
    .replace(/\s*\n+\s*/g, ' ')
    .replace(/\s+(ENGINEERING CONTROLS|ADMINISTRATIVE CONTROLS|SUBSTITUTE|ISOLATE|PPE|ELIMINATE):/g, '\n$1:')
    .trim();

const listOf = (v: unknown): string[] =>
  Array.isArray(v)
    ? v
        .map((x) => (typeof x === 'string' ? x : str((x as Row)?.name ?? (x as Row)?.item ?? (x as Row)?.title)))
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

export const ramsMapper: Mapper = (row: Row, ctx) => {
  const r: Row = row.rams_data ?? {};
  const m: Row = row.method_data ?? {};
  const review: Row | undefined = r.review;
  const reviewed = !!review?.confirmedAt && !!str(review?.name);

  const risks: Row[] = (Array.isArray(r.risks) ? r.risks : []).filter((x: Row) => str(x?.hazard));
  const ranked = [...risks].sort((a, b) => (Number(b.riskRating) || 0) - (Number(a.riskRating) || 0));
  const steps: Row[] = Array.isArray(m.steps) ? m.steps : [];
  const ppe = [
    ...listOf(r.requiredPPE),
    ...(Array.isArray(r.ppeDetails) ? r.ppeDetails.map((p: Row) => str(p?.ppeType)) : []),
  ].filter((v, i, a) => v && a.indexOf(v) === i);

  const highest = ranked[0] ? Number(ranked[0].riskRating) || 0 : 0;
  const residualHigh = risks.filter((x) => (Number(x.residualRisk) || 0) >= 10).length;

  // Emergency: what was entered, and plainly what was not.
  const emergency = rows([
    ['First aider', [str(r.firstAiderName), str(r.firstAiderPhone)].filter(Boolean).join(' · ') || 'Not recorded — agree before work starts'],
    ['Assembly point', str(r.assemblyPoint) || 'Not recorded — agree before work starts'],
    ['Site manager or supervisor', [str(r.siteManagerName) || str(r.supervisor), str(r.siteManagerPhone)].filter(Boolean).join(' · ')],
    ['Emergency services', '999'],
  ]);

  // 'rams' = risk assessment only; 'method' = method statement only.
  const variant = str(row.__variant) || 'combined';
  const withRisk = variant !== 'method';
  const withMethod = variant !== 'rams';
  const sections: Section[] = [];

  if (ranked.length && withRisk)
    sections.push({
      heading: 'On site in brief',
      intro: 'The highest-rated hazards for this job and how they are controlled. Brief everyone on site from this page; the full register follows.',
      kind: 'table',
      columns: ['#', 'Hazard', 'Key controls', 'Rating'],
      widths: ['9mm', '28%', '', '25mm'],
      rows: ranked.slice(0, 5).map((x, i) => [
        String(i + 1),
        str(x.hazard),
        controlsText(x.controls).split('\n').slice(0, 2).join(' '),
        rating(x.riskRating),
      ]),
    });
  if (ppe.length) sections.push({ heading: 'PPE required', kind: 'items', items: ppe });
  sections.push({ heading: 'Emergency arrangements', kind: 'kv', rows: emergency });

  const scope = str(m.executive_summary) || str(m.scope) || str(m.description);
  if (scope) sections.push({ heading: 'Scope of work', kind: 'text', paragraphs: [scope] });
  const exclusions = listOf(m.exclusions);
  if (exclusions.length) sections.push({ heading: 'Not included', kind: 'items', items: exclusions });

  if (risks.length && withRisk)
    sections.push({
      heading: `Risk assessment · ${risks.length} hazards`,
      intro: 'Rating = likelihood × severity (1–25) before controls; residual is the rating with the controls in place.',
      kind: 'table',
      columns: ['#', 'Hazard and who is at risk', 'Controls', 'Before', 'Residual'],
      widths: ['9mm', '25%', '', '22mm', '22mm'],
      rows: risks.map((x, i) => [
        String(i + 1),
        [str(x.hazard), str(x.risk)].filter(Boolean).join(' — '),
        controlsText(x.controls),
        rating(x.riskRating),
        rating(x.residualRisk),
      ]),
    });

  if (steps.length && withMethod)
    sections.push({
      heading: `Method statement · ${steps.length} steps`,
      kind: 'steps',
      steps: steps.map((s, i) => {
        const extra = [
          listOf(s.hold_points).length ? `Hold point: ${listOf(s.hold_points).join('; ')}` : '',
          listOf(s.stop_work_triggers).length ? `Stop work if: ${listOf(s.stop_work_triggers).join('; ')}` : '',
          listOf(s.acceptance_criteria).length ? `Done when: ${listOf(s.acceptance_criteria).join('; ')}` : '',
        ]
          .filter(Boolean)
          .join(' · ');
        return {
          n: str(s.stepNumber) || String(i + 1),
          title: str(s.title),
          detail: str(s.description),
          extra,
          done: false,
          when: str(s.estimatedDuration || s.estimated_duration),
        };
      }),
    });

  const people = rows([
    ['Team size', m.teamSize],
    ['Duration', m.duration || m.totalEstimatedTime],
    ['Qualifications', listOf(m.requiredQualifications).join(', ')],
  ]);
  if (people.length) sections.push({ heading: 'People and time', kind: 'kv', rows: people });
  const tools = listOf(m.toolsRequired);
  if (tools.length) sections.push({ heading: 'Tools and equipment', kind: 'items', items: tools });
  const materials = listOf(m.materialsRequired);
  if (materials.length) sections.push({ heading: 'Materials', kind: 'items', items: materials });

  const meta = (row.__filing ?? {}) as { version?: number; previous?: { version: number; at: string }[] };

  return {
    meta: {
      kind: variant === 'rams' ? 'Risk assessment' : variant === 'method' ? 'Method statement' : 'Risk assessment & method statement',
      title: str(r.projectName) || str(m.jobTitle) || 'RAMS',
      subtitle: 'Site-specific risk assessment and safe system of work for this job.',
      reference: refFrom('RAMS', row.id),
      issued: fmtDate(r.date) || fmtDate(row.created_at),
      version: meta.version ? String(meta.version) : '',
    },
    status: reviewed ? { label: 'Reviewed', tone: 'ok' } : { label: 'Draft — not reviewed', tone: 'warn' },
    job: { site: str(r.location) || ctx.job.site },
    prepared_by: str(r.assessor) || ctx.preparedBy,
    prepared_by_label: 'Assessor',
    cover_facts: [
      { label: 'Reviewed by', value: reviewed ? `${str(review!.name)}, ${fmtDate(review!.confirmedAt)}` : 'Not yet reviewed' },
      { label: 'Contractor', value: str(r.contractor) || str(m.contractor) },
      { label: 'Supervisor', value: str(r.supervisor) || str(r.siteManagerName) },
      { label: 'Duration', value: str(m.duration) },
      { label: 'Work type', value: str(m.workType) ? str(m.workType).charAt(0).toUpperCase() + str(m.workType).slice(1) : '' },
    ].filter((f) => f.value),
    headline: [
      { label: 'Hazards assessed', value: String(risks.length) },
      ...(highest ? [{ label: 'Highest rating', value: String(highest), verdict: highest >= 15 ? 'fail' : highest >= 10 ? 'warn' : 'pass', verdict_label: band(highest) }] : []),
      ...(steps.length ? [{ label: 'Method steps', value: String(steps.length) }] : []),
    ],
    alert: reviewed
      ? residualHigh
        ? { tone: 'warn', title: `${residualHigh} hazard${residualHigh === 1 ? '' : 's'} still rated high with controls in place.`, text: 'Check these controls are achievable on this site before work starts.' }
        : undefined
      : { tone: 'warn', title: 'Not yet reviewed.', text: 'This RAMS was drafted with AI assistance and has not been recorded as checked by a competent person for this site.' },
    sections,
    signatures: [
      r.assessor ? { role: 'Assessor', name: str(r.assessor), when: fmtDate(r.date), method: 'Name entered on the RAMS' } : null,
      reviewed ? { role: 'Reviewed by', name: str(review!.name), when: fmtDateTime(review!.confirmedAt), method: 'Review recorded in the app before issue' } : null,
    ].filter(Boolean) as { role: string; name: string; when?: string; method?: string }[],
    audit: [
      { event: 'RAMS drafted', at: fmtDateTime(row.created_at) },
      ...(meta.previous ?? []).map((p) => ({ event: `Version ${p.version} issued`, at: fmtDateTime(p.at) })),
      ...(reviewed ? [{ event: `Reviewed by ${str(review!.name)}`, at: fmtDateTime(review!.confirmedAt) }] : []),
    ],
    disclaimer:
      'Drafted with AI assistance from the job details given, then edited and reviewed by the people named. It is a starting point for this job, not a guarantee that the work is safe: hazards and controls must be checked on site and the RAMS reviewed if the work or conditions change.',
  };
};
