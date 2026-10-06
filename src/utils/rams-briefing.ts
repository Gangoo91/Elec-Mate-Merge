import type { RAMSData } from '@/types/rams';
import type { MethodStatementData } from '@/types/method-statement';

/**
 * RAMS → team briefing.
 *
 * A RAMS is a document for the file; a briefing is what the people doing the
 * work actually hear and sign. Industry guidance is blunt that long RAMS are
 * not read on site, so the briefing is built as one short page: what the job
 * is, the few hazards that matter most (highest rated first) with their
 * controls, PPE, and who/where for emergencies. Everything is taken from the
 * reviewed RAMS — nothing is added — and the briefing stays editable.
 *
 * The briefing records which RAMS it covers (dynamic_fields), so it is clear
 * what people acknowledged. Acknowledging a briefing is not approval of the
 * RAMS and does not show competence.
 */

export const RAMS_BRIEFING_SEED_KEY = 'ramsBriefingSeed';

const clip = (s: string, n: number) => (s.length > n ? `${s.slice(0, n - 1).trimEnd()}…` : s);

export function buildBriefingFromRams(
  rams: RAMSData,
  method: Partial<MethodStatementData> | undefined,
  source: { generationJobId?: string; version?: number }
): Record<string, unknown> {
  const risks = [...(rams.risks ?? [])]
    .filter((r) => String(r.hazard ?? '').trim())
    .sort((a, b) => (b.riskRating || 0) - (a.riskRating || 0));
  const top = risks.slice(0, 5);
  const highest = top[0]?.riskRating ?? 0;
  const riskLevel = highest >= 15 ? 'high' : highest >= 8 ? 'medium' : 'low';

  const lines: string[] = [];
  const scope = String(method?.description || method?.jobTitle || rams.projectName || '').trim();
  if (scope) lines.push(`The job: ${clip(scope, 400)}`);
  if (top.length) {
    lines.push('', 'Main hazards and how we control them:');
    top.forEach((r, i) => {
      const controls = String(r.controls ?? '').trim();
      lines.push(
        `${i + 1}. ${clip(String(r.hazard).trim(), 120)}${controls ? ` — ${clip(controls, 260)}` : ' — no control recorded in the RAMS'}`
      );
    });
    if (risks.length > top.length)
      lines.push(`(${risks.length - top.length} more in the full RAMS.)`);
  }
  const ppe = (rams.requiredPPE ?? []).filter(Boolean);
  if (ppe.length) lines.push('', `PPE: ${ppe.join(', ')}`);

  const emergency = [
    rams.firstAiderName ? `First aider: ${rams.firstAiderName}` : '',
    rams.assemblyPoint ? `Assembly point: ${rams.assemblyPoint}` : '',
    rams.siteManagerName
      ? `Site manager: ${rams.siteManagerName}${rams.siteManagerPhone ? ` (${rams.siteManagerPhone})` : ''}`
      : '',
  ].filter(Boolean);
  // Said plainly when missing, rather than inventing arrangements.
  lines.push(
    '',
    emergency.length
      ? `Emergency: ${emergency.join(' · ')}`
      : 'Emergency: not recorded in the RAMS — agree first aider and assembly point before starting.'
  );

  return {
    briefing_name: clip(`Briefing: ${rams.projectName || 'RAMS'}`, 120),
    briefing_type: 'electrical',
    location: rams.location || '',
    site_address: rams.location || '',
    briefing_description: lines.join('\n'),
    identified_hazards: top.map((r) => clip(String(r.hazard).trim(), 60)),
    risk_level: riskLevel,
    dynamic_fields: {
      site_address: rams.location || null,
      source: 'rams',
      rams_generation_job_id: source.generationJobId ?? null,
      rams_version: source.version ?? null,
      rams_title: rams.projectName || null,
    },
  };
}
