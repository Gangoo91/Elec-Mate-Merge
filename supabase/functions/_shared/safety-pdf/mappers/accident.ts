import type { Mapper, Section, Signature, Tone } from '../contract.ts';
import { fmtDate, fmtDateTime, humanise, list, paras, refFrom, rows, signature, str, yesNo, type Row } from '../common.ts';
import { clock, evenFacts, isPast, labelOf, mergePhotos, plural } from './_helpers.ts';

export const INJURY: Record<string, string> = {
  'cut-laceration': 'Cut or laceration',
  burn: 'Burn (thermal or chemical)',
  'electric-shock': 'Electric shock',
  fracture: 'Fracture or break',
  'sprain-strain': 'Sprain or strain',
  'bruise-contusion': 'Bruise or contusion',
  'eye-injury': 'Eye injury',
  'chemical-exposure': 'Chemical exposure',
  'fall-injury': 'Fall injury',
  'crush-injury': 'Crush injury',
  'head-injury': 'Head injury',
  respiratory: 'Respiratory issue',
  other: 'Other',
};
export const BODY: Record<string, string> = {
  head: 'Head', face: 'Face', eyes: 'Eyes', neck: 'Neck', shoulder: 'Shoulder', arm: 'Arm or elbow',
  'hand-fingers': 'Hand or fingers', chest: 'Chest', back: 'Back', abdomen: 'Abdomen', hip: 'Hip or pelvis',
  leg: 'Leg or thigh', knee: 'Knee', 'foot-toes': 'Foot or toes', multiple: 'Multiple areas',
};
export const SEV_TONE: Record<string, Tone> = { minor: 'neutral', moderate: 'warn', major: 'bad', fatal: 'bad' };

/**
 * The RIDDOR position in words. Only the user's own `riddor_reported` tick says
 * a report was made, and the wording keeps it as theirs ("recorded as
 * reported"): the app does not submit anything to the HSE.
 */
export function riddorPosition(r: Row): { reported: boolean; text: string } {
  if (r.riddor_reported === true) {
    const on = fmtDate(r.riddor_reported_date);
    const ref = str(r.riddor_reference);
    return {
      reported: true,
      text: `Recorded as reported to the HSE${on ? ` on ${on}` : ' (date not recorded)'}${ref ? `, reference ${ref}` : ', no reference recorded'}.`,
    };
  }
  return { reported: false, text: 'Not yet recorded as reported to the HSE.' };
}

/** RIDDOR rows shared by the accident and RIDDOR documents. */
export function riddorRows(r: Row) {
  const pos = riddorPosition(r);
  return rows([
    ['Reportable under RIDDOR', r.is_riddor_reportable === true ? 'Yes — from the details entered' : r.is_riddor_reportable === false ? 'Not flagged from the details entered' : ''],
    ['Reasons recorded', r.riddor_category],
    ['Reporting deadline', r.is_riddor_reportable ? fmtDate(r.riddor_deadline) : ''],
    ['Reported to the HSE', r.is_riddor_reportable || r.riddor_reported ? pos.text : ''],
  ]);
}

export function accidentSignatures(r: Row, remote: Record<string, { name: string; signedAt: string; image: string }>): Signature[] {
  const sup = remote['supervisor'];
  return [
    signature('Recorded by', r.recorded_by, r.reporter_signature, r.created_at),
    sup ? signature('Supervisor review', sup.name, sup.image, sup.signedAt, 'link') : null,
  ].filter(Boolean) as Signature[];
}

/**
 * Accident book entry. The injured person, the injury, treatment and time off,
 * witnesses, investigation, and the RIDDOR position stated exactly as the user
 * recorded it.
 */
export const accidentMapper: Mapper = (r: Row, ctx) => {
  const sev = str(r.severity).toLowerCase();
  const when = [fmtDate(r.incident_date), str(r.incident_time) ? clock(r.incident_time) : ''].filter(Boolean).join(', ');
  const injury = labelOf(INJURY, r.injury_type);
  const body = labelOf(BODY, r.body_part);
  const pos = riddorPosition(r);
  const riddorDue = !!r.is_riddor_reportable && !pos.reported;
  const whys = (Array.isArray(r.five_whys) ? r.five_whys : []).filter((w: Row) => str(w?.answer));
  const factors = list(r.contributing_factors);

  const sections: Section[] = [
    {
      heading: 'Injured person',
      kind: 'kv',
      rows: rows([
        ['Name', r.injured_name],
        ['Role or occupation', r.injured_role],
        ['Employer', r.injured_employer],
        ['Address', r.injured_address],
      ]),
    },
    {
      heading: 'Incident',
      kind: 'kv',
      rows: rows([
        ['Date and time', when],
        ['Location', [str(r.location), str(r.location_detail)].filter(Boolean).join(' — ')],
        ['Activity at the time', r.activity_at_time],
        ['Cause', r.cause],
      ]),
    },
  ];
  const desc = paras(r.incident_description);
  if (desc.length) sections.push({ heading: 'What happened', kind: 'text', paragraphs: desc });
  sections.push({
    heading: 'Injury',
    kind: 'kv',
    rows: rows([
      ['Injury type', injury],
      ['Body part', body],
      ['Severity', humanise(sev)],
      ['Details', r.injury_description],
    ]),
  });
  sections.push({
    heading: 'Treatment and time off',
    kind: 'kv',
    rows: rows([
      ['First aid given', yesNo(r.first_aid_given), r.first_aid_given ? r.first_aid_details : ''],
      ['First aider', r.first_aid_given ? r.first_aider_name : ''],
      ['Hospital visit', yesNo(r.hospital_visit), r.hospital_visit ? r.hospital_name : ''],
      ['Time off work', yesNo(r.time_off_work)],
      ['Days off', r.time_off_work && r.days_off != null ? plural(Number(r.days_off), 'day') : ''],
      ['Return date', r.time_off_work ? fmtDate(r.return_date) : ''],
      ['Reported to', r.reported_to],
      ['Reported on', fmtDate(r.reported_date)],
    ]),
  });
  const wit = paras(r.witnesses);
  if (wit.length) sections.push({ heading: 'Witnesses', kind: 'text', paragraphs: wit });
  const rr = riddorRows(r);
  if (rr.length) sections.push({ heading: 'RIDDOR', kind: 'kv', rows: rr });
  const rca = paras(r.root_cause);
  if (str(r.investigation_status) || rca.length || factors.length || str(r.root_cause_category))
    sections.push({
      heading: 'Investigation',
      kind: 'kv',
      rows: rows([
        ['Status', humanise(r.investigation_status)],
        ['Root cause category', humanise(r.root_cause_category)],
        ['Root cause', rca.join(' ')],
        ['Contributing factors', factors.join(', ')],
        ['Completed', r.investigation_completed_at ? `${fmtDate(r.investigation_completed_at)}${str(r.investigation_completed_by) ? ` by ${str(r.investigation_completed_by)}` : ''}` : ''],
      ]),
    });
  if (whys.length)
    sections.push({
      heading: 'Five whys',
      kind: 'table',
      columns: ['#', 'Question', 'Answer'],
      rows: whys.map((w: Row, i: number) => [String(i + 1), str(w.why) || 'Why?', str(w.answer)]),
    });
  const ca = paras(r.corrective_actions);
  if (ca.length) sections.push({ heading: 'Corrective actions', kind: 'text', paragraphs: ca });

  const sup = ctx.remote['supervisor'];
  return {
    meta: {
      kind: 'Accident record',
      title: injury ? `${injury}${body ? ` — ${body.toLowerCase()}` : ''}` : 'Accident',
      subtitle: 'An accident book entry: who was hurt, how, and what was done about it.',
      reference: str(r.incident_number) || refFrom('ACC', r.id),
      issued: fmtDate(r.created_at),
    },
    status: { label: humanise(sev) || 'Recorded', tone: SEV_TONE[sev] ?? 'neutral' },
    job: { site: str(r.location) || ctx.job.site },
    prepared_by: str(r.recorded_by) || ctx.preparedBy,
    cover_facts: evenFacts([
      { label: 'Injured person', value: str(r.injured_name) },
      { label: 'When', value: when },
      { label: 'Location', value: str(r.location) },
      { label: 'RIDDOR', value: r.is_riddor_reportable ? (pos.reported ? 'Recorded as reported' : 'Not yet reported') : 'Not flagged' },
    ]),
    headline: [
      ...(typeof r.hospital_visit === 'boolean' ? [{ label: 'Hospital visit', value: r.hospital_visit ? 'Yes' : 'No' }] : []),
      ...(typeof r.first_aid_given === 'boolean' ? [{ label: 'First aid given', value: r.first_aid_given ? 'Yes' : 'No' }] : []),
      ...(r.time_off_work && r.days_off != null ? [{ label: 'Days off work', value: String(r.days_off) }] : []),
    ],
    alert: riddorDue
      ? {
          tone: isPast(r.riddor_deadline) ? 'bad' : 'warn',
          title: 'RIDDOR report not recorded.',
          text: `The details entered make this reportable to the HSE${r.riddor_deadline ? `, with a deadline of ${fmtDate(r.riddor_deadline)}` : ''}. No report is recorded yet. The app does not submit reports.`,
        }
      : undefined,
    sections,
    signatures: accidentSignatures(r, ctx.remote),
    photos: mergePhotos(ctx.photoUrl, [r.photos], [r.photo_urls]),
    audit: [
      ...(when ? [{ event: 'Incident occurred', at: when }] : []),
      { event: 'Record created', at: fmtDateTime(r.created_at) },
      ...(r.riddor_reported && r.riddor_reported_date ? [{ event: 'Recorded as reported to the HSE', at: fmtDate(r.riddor_reported_date) }] : []),
      ...(r.investigation_completed_at ? [{ event: 'Investigation completed', at: fmtDateTime(r.investigation_completed_at) }] : []),
      ...(sup ? [{ event: 'Supervisor signed by link', at: fmtDateTime(sup.signedAt) }] : []),
    ],
    notes: paras(r.additional_notes).length ? paras(r.additional_notes) : undefined,
    disclaimer:
      'An accident record as entered by the person named. Whether an injury is RIDDOR-reportable was worked out from the details entered and should be checked by the responsible person. Reports to the HSE are made by the responsible person, not by the app.',
  };
};
