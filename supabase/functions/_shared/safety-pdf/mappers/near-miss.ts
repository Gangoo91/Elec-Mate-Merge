import type { Mapper, Section, Tone } from '../contract.ts';
import { fmtDate, fmtDateTime, humanise, list, paras, refFrom, rows, signature, str, yesNo, type Row } from '../common.ts';
import { clock, evenFacts, labelOf, mergePhotos } from './_helpers.ts';

const CATEGORY: Record<string, string> = {
  electrical_hazard: 'Electrical hazard',
  fire_risk: 'Fire risk',
  fall_hazard: 'Fall hazard',
  ppe_failure: 'PPE failure or issue',
  worksite_hazard: 'Worksite hazard',
  tool_equipment: 'Tool or equipment issue',
  chemical_exposure: 'Chemical exposure',
  manual_handling: 'Manual handling',
  vehicle_incident: 'Vehicle incident',
  other: 'Other',
};
const WEATHER: Record<string, string> = {
  clear: 'Clear or sunny', overcast: 'Overcast', rain: 'Rain', wind: 'High wind', cold: 'Cold or frost', hot: 'Hot', dark: 'Dark or night',
};
const LIGHTING: Record<string, string> = {
  good: 'Good natural light', adequate: 'Adequate', poor: 'Poor', artificial: 'Artificial only', dark: 'Very dark or no light',
};
const STATUS: Record<string, { label: string; tone: Tone }> = {
  open: { label: 'Open', tone: 'warn' },
  reported: { label: 'Reported', tone: 'warn' },
  in_progress: { label: 'In progress', tone: 'warn' },
  closed: { label: 'Closed', tone: 'ok' },
};
const SEV_VERDICT: Record<string, string> = { low: 'ok', medium: 'warn', high: 'bad', critical: 'bad' };

/**
 * Near miss report. What happened, what could have happened, what was done on
 * the spot and what was put in place after — in the reporter's words. Witness
 * contact details stay in the app; the document names witnesses only.
 */
export const nearMissMapper: Mapper = (r: Row, ctx) => {
  const sev = str(r.severity).toLowerCase();
  const sevLabel = humanise(sev);
  const st = str(r.status).toLowerCase() || 'open';
  const status = STATUS[st] ?? { label: humanise(st), tone: 'neutral' as Tone };
  const category = labelOf(CATEGORY, r.category);
  const when = [fmtDate(r.incident_date), clock(r.incident_time)].filter(Boolean).join(', ');

  const witnesses = (Array.isArray(r.witnesses) ? r.witnesses : [])
    .map((w: Row | string) => str(typeof w === 'string' ? w : w?.name))
    .filter(Boolean);
  const whys = (Array.isArray(r.five_whys) ? r.five_whys : []).filter((w: Row) => str(w?.answer));
  const factors = list(r.contributing_factors);

  const sections: Section[] = [
    {
      heading: 'What happened',
      kind: 'kv',
      rows: rows([
        ['Date and time', when],
        ['Location', r.location],
        ['Category', category],
        ['Severity (potential)', sevLabel],
        ['Weather', labelOf(WEATHER, r.weather_conditions)],
        ['Lighting', labelOf(LIGHTING, r.lighting_conditions)],
        ['Equipment involved', r.equipment_involved],
        ['Equipment faulty', r.equipment_involved ? yesNo(r.equipment_faulty) : '', r.equipment_faulty ? r.equipment_fault_details : ''],
        ['Third party involved', yesNo(r.third_party_involved), r.third_party_involved ? r.third_party_details : ''],
      ]),
    },
  ];
  const desc = paras(r.description);
  if (desc.length) sections.push({ heading: 'Description', kind: 'text', paragraphs: desc });
  const cons = paras(r.potential_consequences);
  if (cons.length) sections.push({ heading: 'Potential consequences', kind: 'text', paragraphs: cons });
  const imm = paras(r.immediate_actions);
  if (imm.length) sections.push({ heading: 'Immediate actions taken', kind: 'text', paragraphs: imm });
  const prev = paras(r.preventive_measures);
  if (prev.length) sections.push({ heading: 'Preventive measures', kind: 'text', paragraphs: prev });
  if (witnesses.length) sections.push({ heading: 'Witnesses', kind: 'items', items: witnesses });
  const similar = paras(r.previous_similar_incidents);
  if (similar.length) sections.push({ heading: 'Previous similar incidents', kind: 'text', paragraphs: similar });

  const rca = paras(r.root_cause_analysis);
  if (str(r.root_cause_category) || rca.length || factors.length)
    sections.push({
      heading: 'Root cause',
      kind: 'kv',
      rows: rows([
        ['Root cause category', humanise(r.root_cause_category)],
        ['Contributing factors', factors.join(', ')],
        ['Analysis', rca.join(' ')],
      ]),
    });
  if (whys.length)
    sections.push({
      heading: 'Five whys',
      kind: 'table',
      columns: ['#', 'Question', 'Answer'],
      rows: whys.map((w: Row, i: number) => [String(i + 1), str(w.why) || 'Why?', str(w.answer)]),
    });

  const follow = rows([
    ['Follow-up required', yesNo(r.follow_up_required)],
    ['Due', fmtDate(r.due_date)],
    ['Completed', fmtDate(r.completed_date)],
    ['Supervisor notified', yesNo(r.supervisor_notified), r.supervisor_notified ? r.supervisor_name : ''],
    ['Escalated', r.escalated ? `Yes${str(r.escalated_to) ? ` — to ${str(r.escalated_to)}` : ''}` : ''],
    ['Briefed to the team', r.briefed_to_team ? `Yes${r.briefing_created_at ? `, ${fmtDate(r.briefing_created_at)}` : ''}` : ''],
  ]);
  if (follow.length) sections.push({ heading: 'Follow-up', kind: 'kv', rows: follow });

  const sig = signature('Reported by', r.reporter_name, r.reporter_signature, r.created_at);

  return {
    meta: {
      kind: 'Near miss report',
      title: category || 'Near miss',
      subtitle: 'An event that could have caused harm but did not, as reported.',
      reference: str(r.incident_number) || refFrom('NM', r.id),
      issued: fmtDate(r.created_at),
    },
    status,
    job: { site: str(r.location) || ctx.job.site },
    prepared_by: str(r.reporter_name) || ctx.preparedBy,
    cover_facts: evenFacts([
      { label: 'When', value: when },
      {
        label: 'Follow-up',
        value: r.follow_up_required
          ? r.completed_date
            ? `Done ${fmtDate(r.completed_date)}`
            : r.due_date
              ? `Due ${fmtDate(r.due_date)}`
              : 'Outstanding'
          : r.follow_up_required === false
            ? 'None required'
            : '',
      },
    ]),
    headline: sev
      ? [{ label: 'Potential severity', value: sevLabel, verdict: SEV_VERDICT[sev] ?? 'neutral', verdict_label: sev === 'critical' || sev === 'high' ? 'Serious harm possible' : sev === 'medium' ? 'Minor injury possible' : 'Injury unlikely' }]
      : undefined,
    alert:
      r.follow_up_required && !r.completed_date && st !== 'closed'
        ? { tone: 'warn', title: 'Follow-up outstanding.', text: r.due_date ? `Follow-up action was due ${fmtDate(r.due_date)} and is not recorded as complete.` : 'Follow-up action is not recorded as complete.' }
        : undefined,
    sections,
    signatures: sig ? [sig] : [],
    photos: mergePhotos(ctx.photoUrl, [r.photos], [r.photos_attached]),
    audit: [
      { event: 'Report created', at: fmtDateTime(r.created_at) },
      ...(r.escalated_at ? [{ event: 'Escalated', at: fmtDateTime(r.escalated_at) }] : []),
      ...(r.briefing_created_at ? [{ event: 'Shared as a team briefing', at: fmtDateTime(r.briefing_created_at) }] : []),
      ...(r.completed_date ? [{ event: 'Follow-up completed', at: fmtDate(r.completed_date) }] : []),
    ],
    disclaimer: 'A near miss as reported by the person named. Severity is their assessment of what could have happened.',
  };
};
