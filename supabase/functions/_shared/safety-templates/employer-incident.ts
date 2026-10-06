// Employer Hub incident report (ELE-1945). Built from employer_incidents —
// the firm's register — not the sole-trader accident_records table.
//
// Wording rule: describe what the firm recorded and what RIDDOR 2013 asks
// for. Never claim a duty that does not exist (e.g. "near miss reporting is a
// legal requirement" — it is not, in general).
import {
  renderPage,
  sectionHeader,
  kvGrid,
  statBoxes,
  textBox,
  warningBanner,
  dataTable,
  paragraph,
  photoGrid,
  signatureBlock,
  type StatusColour,
  type Branding,
} from '../safety-html-base.ts';

export const RIDDOR_CATEGORY_LABEL: Record<string, string> = {
  death: 'Death',
  specified_injury: 'Specified injury (Reg. 4)',
  over_7_day: 'Over-7-day incapacitation (Reg. 4)',
  non_worker_hospital: 'Non-worker taken to hospital (Reg. 5)',
  dangerous_occurrence: 'Dangerous occurrence (Reg. 7)',
  occupational_disease: 'Occupational disease (Regs. 8–10)',
  not_reportable: 'Assessed: not reportable',
};

export const isRiddorReportable = (cat?: string | null) => !!cat && cat !== 'not_reportable';

/** HSE deadlines from the date of the incident. Disease is reported on diagnosis. */
export function riddorDeadline(cat: string | null | undefined, occurredAt: string): Date | null {
  if (!isRiddorReportable(cat) || cat === 'occupational_disease') return null;
  const days = cat === 'over_7_day' ? 15 : 10;
  const d = new Date(occurredAt);
  d.setDate(d.getDate() + days);
  return d;
}

const TYPE_LABEL: Record<string, string> = {
  near_miss: 'Near miss',
  unsafe_practice: 'Unsafe practice',
  faulty_equipment: 'Faulty equipment',
  injury: 'Injury',
  property_damage: 'Property damage',
  environmental: 'Environmental',
  security: 'Security',
  other: 'Other',
};

const fmtDate = (d?: string | Date | null) =>
  d ? new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'Europe/London' }) : '';
const fmtDateTime = (d?: string | Date | null) =>
  d
    ? new Date(d).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'Europe/London' })
    : '';

export interface CorrectiveAction {
  id?: string;
  action?: string;
  owner_name?: string | null;
  due_date?: string | null;
  done_at?: string | null;
}

export interface IncidentReportInput {
  // deno-lint-ignore no-explicit-any
  incident: any;
  reporterName: string;
  jobTitle?: string | null;
  closedByName?: string | null;
  acknowledgedByName?: string | null;
  photoUrls: string[];
}

export function employerIncidentTemplate(input: IncidentReportInput, branding: Branding): string {
  const r = input.incident;
  const sev = String(r.severity || '').toLowerCase();
  const status = String(r.status || 'open').toLowerCase();
  const closed = status === 'closed' || status === 'resolved';
  const sevColour: StatusColour =
    sev === 'critical' || sev === 'high' ? 'danger' : sev === 'medium' ? 'warning' : 'success';
  const reportable = isRiddorReportable(r.riddor_category);
  const riddorValue = !r.riddor_category
    ? r.incident_type === 'injury' ? 'NOT ASSESSED' : 'N/A'
    : reportable
      ? r.riddor_reported_at ? 'REPORTED' : 'NOT YET REPORTED'
      : 'NOT REPORTABLE';
  const riddorColour: StatusColour = !r.riddor_category
    ? r.incident_type === 'injury' ? 'warning' : 'grey'
    : reportable
      ? r.riddor_reported_at ? 'success' : 'danger'
      : 'success';

  let body = '';

  if (reportable && !r.riddor_reported_at) {
    const deadline = riddorDeadline(r.riddor_category, r.reported_at);
    body += warningBanner(
      `Recorded as RIDDOR-reportable and not yet reported to the HSE.${
        deadline ? ` Deadline: ${fmtDate(deadline)}.` : ''
      } Report at notifications.hse.gov.uk/riddorforms.`
    );
  }

  body += statBoxes([
    { label: 'Type', value: (TYPE_LABEL[r.incident_type] || r.incident_type || 'N/A').toUpperCase(), colour: 'info' },
    { label: 'Severity', value: (sev || 'N/A').toUpperCase(), colour: sevColour },
    { label: 'Status', value: closed ? 'CLOSED' : status === 'investigating' ? 'INVESTIGATING' : 'OPEN', colour: closed ? 'success' : 'warning' },
    { label: 'RIDDOR', value: riddorValue, colour: riddorColour },
  ]);

  body += sectionHeader('What happened');
  body += kvGrid([
    { label: 'Date and time', value: fmtDateTime(r.reported_at) },
    { label: 'Location', value: r.location || '' },
    { label: 'Job', value: input.jobTitle || '' },
    { label: 'Reported by', value: input.reporterName },
    { label: 'Logged', value: fmtDateTime(r.created_at) },
    { label: 'Supervisor told', value: r.supervisor_notified ? r.supervisor_name || 'Yes' : 'No' },
  ]);
  body += textBox(r.description || 'No description recorded.', sevColour === 'danger' ? '#ef4444' : '#f59e0b');

  if (input.photoUrls.length > 0) {
    body += sectionHeader('Photos');
    body += photoGrid(input.photoUrls, 2);
  }

  if (r.incident_type === 'injury' || r.injured_person || r.injuries_sustained) {
    body += sectionHeader('Injury');
    body += kvGrid([
      { label: 'Injured person', value: r.injured_person || '' },
      { label: 'First aid given', value: r.first_aid_given ? 'Yes' : 'No' },
      { label: 'Went to hospital', value: r.hospital_visit ? 'Yes' : 'No' },
      { label: 'Days off work', value: r.days_off != null ? String(r.days_off) : '' },
    ]);
    if (r.injuries_sustained) body += textBox(r.injuries_sustained, '#ef4444');
  }

  if (r.actions_taken) {
    body += sectionHeader('Immediate action on the day');
    body += textBox(r.actions_taken, '#3b82f6');
  }

  if (r.witnesses) {
    body += sectionHeader('Witnesses');
    body += paragraph(r.witnesses);
  }

  if (r.root_cause || r.investigation_notes) {
    body += sectionHeader('Investigation');
    if (r.root_cause) {
      body += kvGrid([{ label: 'Root cause', value: r.root_cause }], 1);
    }
    if (r.investigation_notes) body += textBox(r.investigation_notes, '#8b5cf6');
  }

  const actions: CorrectiveAction[] = Array.isArray(r.corrective_actions) ? r.corrective_actions : [];
  if (actions.length > 0) {
    body += sectionHeader('Corrective actions');
    const today = new Date().toISOString().slice(0, 10);
    body += dataTable(
      ['Action', 'Owner', 'Due', 'Status'],
      actions.map((a) => [
        a.action || '',
        a.owner_name || 'Unassigned',
        a.due_date ? fmtDate(a.due_date) : '',
        a.done_at ? `Done ${fmtDate(a.done_at)}` : a.due_date && a.due_date < today ? 'Overdue' : 'Open',
      ])
    );
  }

  if (r.riddor_category) {
    body += sectionHeader('RIDDOR');
    const deadline = riddorDeadline(r.riddor_category, r.reported_at);
    body += kvGrid([
      { label: 'Decision', value: RIDDOR_CATEGORY_LABEL[r.riddor_category] || r.riddor_category },
      { label: 'Deadline', value: deadline ? fmtDate(deadline) : reportable ? 'On diagnosis' : '' },
      { label: 'Reported to HSE', value: r.riddor_reported_at ? fmtDate(r.riddor_reported_at) : reportable ? 'Not yet' : '' },
      { label: 'HSE reference', value: r.riddor_reference || '' },
    ]);
  }

  if (closed) {
    body += sectionHeader('Close-out');
    body += kvGrid([
      { label: 'Closed', value: fmtDateTime(r.closed_at) },
      { label: 'Closed by', value: input.closedByName || '' },
    ]);
    if (r.closeout_summary) body += textBox(r.closeout_summary, '#22c55e');
  }

  body += sectionHeader('Timeline');
  const timeline: string[][] = [
    ['Happened', fmtDateTime(r.reported_at)],
    ['Logged', fmtDateTime(r.created_at)],
  ];
  if (r.acknowledged_at) timeline.push(['Seen by the office', `${fmtDateTime(r.acknowledged_at)}${input.acknowledgedByName ? ` · ${input.acknowledgedByName}` : ''}`]);
  for (const a of actions) if (a.done_at) timeline.push([`Action done: ${a.action || ''}`.slice(0, 80), fmtDateTime(a.done_at)]);
  if (r.riddor_reported_at) timeline.push(['Reported to HSE', fmtDateTime(r.riddor_reported_at)]);
  if (closed && r.closed_at) timeline.push(['Closed', fmtDateTime(r.closed_at)]);
  body += dataTable(['Event', 'When'], timeline);

  body += signatureBlock([
    { role: 'Reviewed by', name: input.closedByName || input.acknowledgedByName || undefined, date: closed ? fmtDate(r.closed_at) : undefined },
  ]);

  const title = r.incident_type === 'near_miss' ? 'Near Miss Report' : 'Incident Report';
  return renderPage({
    title,
    refId: String(r.id).slice(0, 8).toUpperCase(),
    statusLabel: closed ? 'Closed' : 'Open',
    statusColour: closed ? 'success' : 'warning',
    branding,
    bodyHtml: body,
    footerNote:
      'Keep this record with your accident book. RIDDOR 2013 requires records of reportable incidents and over-3-day injuries to be kept for at least 3 years.',
  });
}
