import type { Mapper, Section, Tone } from '../contract.ts';
import { fmtDate, fmtDateTime, humanise, paras, refFrom, rows, str, yesNo, type Row } from '../common.ts';
import { BODY, INJURY, accidentSignatures, riddorPosition, riddorRows } from './accident.ts';
import { clock, evenFacts, isPast, labelOf, mergePhotos, plural } from './_helpers.ts';

/**
 * RIDDOR summary of an accident record: the details a responsible person needs
 * in front of them to make (or file) the report. Same row as the accident
 * record; the reporting position is only ever what the user ticked.
 */
export const riddorReportMapper: Mapper = (r: Row, ctx) => {
  const pos = riddorPosition(r);
  const reportable = r.is_riddor_reportable === true;
  const overdue = reportable && !pos.reported && isPast(r.riddor_deadline);
  const status: { label: string; tone: Tone } = pos.reported
    ? { label: 'Recorded as reported', tone: 'ok' }
    : reportable
      ? { label: overdue ? 'Past deadline' : 'Not yet reported', tone: overdue ? 'bad' : 'warn' }
      : { label: 'Not flagged', tone: 'neutral' };
  const when = [fmtDate(r.incident_date), str(r.incident_time) ? clock(r.incident_time) : ''].filter(Boolean).join(', ');
  const injury = labelOf(INJURY, r.injury_type);

  const checklist = [
    { label: 'Date, time and place of the incident', ok: !!(r.incident_date && str(r.location)) },
    { label: 'Injured person’s name', ok: !!str(r.injured_name) },
    { label: 'Injured person’s occupation', ok: !!str(r.injured_role) },
    { label: 'Injured person’s address', ok: !!str(r.injured_address) },
    { label: 'Injured person’s employer', ok: !!str(r.injured_employer) },
    { label: 'Nature of the injury', ok: !!str(r.injury_type) },
    { label: 'Description of what happened', ok: !!str(r.incident_description) },
  ];

  const sections: Section[] = [
    { heading: 'Reporting position', kind: 'kv', rows: riddorRows(r) },
    {
      heading: 'Details held in this record',
      intro: 'Whether each detail is filled in on the record. Missing details will be needed when the report is made.',
      kind: 'checklist',
      items: checklist.map((c) => ({ label: c.label, result: c.ok ? 'yes' : 'no', result_label: c.ok ? 'Held' : 'Missing' })),
    },
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
      heading: 'Incident and injury',
      kind: 'kv',
      rows: rows([
        ['Date and time', when],
        ['Location', [str(r.location), str(r.location_detail)].filter(Boolean).join(' — ')],
        ['Injury type', injury],
        ['Body part', labelOf(BODY, r.body_part)],
        ['Severity', humanise(r.severity)],
        ['Hospital visit', yesNo(r.hospital_visit), r.hospital_visit ? r.hospital_name : ''],
        ['Time off work', r.time_off_work ? (r.days_off != null ? plural(Number(r.days_off), 'day') : 'Yes') : yesNo(r.time_off_work)],
        ['Return date', r.time_off_work ? fmtDate(r.return_date) : ''],
      ]),
    },
  ];
  const desc = paras(r.incident_description);
  if (desc.length) sections.push({ heading: 'What happened', kind: 'text', paragraphs: desc });
  const injDesc = paras(r.injury_description);
  if (injDesc.length) sections.push({ heading: 'Injury details', kind: 'text', paragraphs: injDesc });
  const ca = paras(r.corrective_actions);
  if (ca.length) sections.push({ heading: 'Corrective actions', kind: 'text', paragraphs: ca });

  return {
    meta: {
      kind: 'RIDDOR summary',
      title: injury || 'Reportable incident',
      subtitle: 'The RIDDOR position of an accident record and the details held for the report.',
      reference: refFrom('RIDDOR', r.id),
      issued: fmtDate(r.created_at),
    },
    status,
    job: { site: str(r.location) || ctx.job.site },
    prepared_by: str(r.recorded_by) || ctx.preparedBy,
    cover_facts: evenFacts([
      { label: 'Injured person', value: str(r.injured_name) },
      { label: 'When', value: when },
      { label: 'Deadline', value: reportable ? fmtDate(r.riddor_deadline) || 'Not recorded' : '' },
      { label: 'HSE reference', value: pos.reported ? str(r.riddor_reference) || 'Not recorded' : '' },
    ]),
    headline: [
      {
        label: 'Reported to the HSE',
        value: pos.reported ? 'Yes' : 'No',
        verdict: pos.reported ? 'ok' : reportable ? (overdue ? 'bad' : 'warn') : 'neutral',
        verdict_label: pos.reported ? 'As recorded' : reportable ? (overdue ? 'Deadline passed' : 'Outstanding') : 'Not flagged',
      },
    ],
    alert: reportable && !pos.reported
      ? {
          tone: overdue ? 'bad' : 'warn',
          title: 'Not yet recorded as reported.',
          text: `${r.riddor_deadline ? `The deadline recorded is ${fmtDate(r.riddor_deadline)}. ` : ''}The responsible person makes the report to the HSE; the app does not submit it.`,
        }
      : undefined,
    sections,
    signatures: accidentSignatures(r, ctx.remote),
    photos: mergePhotos(ctx.photoUrl, [r.photos], [r.photo_urls]),
    audit: [
      ...(when ? [{ event: 'Incident occurred', at: when }] : []),
      { event: 'Accident record created', at: fmtDateTime(r.created_at) },
      ...(pos.reported && r.riddor_reported_date ? [{ event: 'Recorded as reported to the HSE', at: fmtDate(r.riddor_reported_date) }] : []),
    ],
    disclaimer:
      'A summary of an accident record. Whether the incident is reportable was worked out from the details entered and should be confirmed by the responsible person. The app does not report to the HSE; "recorded as reported" means the user marked it reported.',
  };
};
