import { renderPage, sectionHeader, kvGrid, textBox, warningBanner, checklist, signatureBlock, paragraph, type StatusColour, type Branding } from '../safety-html-base.ts';
const fmtDate = (d: string | null) => d ? new Date(d).toLocaleDateString('en-GB') : 'N/A';
// deno-lint-ignore no-explicit-any
export function riddorTemplate(record: any, branding: Branding): string {
  const reported = record.riddor_reported || record.riddor_reported_date;
  const statusColour: StatusColour = reported ? 'success' : 'danger';
  const statusLabel = reported ? 'Reported' : 'Pending';
  let body = '';
  if (!reported) { body += warningBanner('RIDDOR REPORTABLE \u2014 Must be reported to HSE within the required timeframe'); }
  body += sectionHeader('RIDDOR Status');
  body += kvGrid([
    { label: 'Reportable', value: 'Yes' },
    { label: 'Category', value: record.riddor_category || 'To be determined' },
    { label: 'HSE Reference', value: record.riddor_reference || 'Pending' },
    { label: 'Deadline', value: fmtDate(record.riddor_deadline) },
    { label: 'Reported', value: reported ? `Yes \u2014 ${fmtDate(record.riddor_reported_date)}` : 'Not yet reported' },
  ]);
  body += sectionHeader('Incident Details');
  const dateTime = [fmtDate(record.incident_date), record.incident_time || ''].filter(Boolean).join(' ');
  body += kvGrid([
    { label: 'Injured Person', value: record.injured_name || 'N/A' },
    { label: 'Role / Occupation', value: record.injured_role || 'N/A' },
    { label: 'Employer', value: record.injured_employer || 'N/A' },
    { label: 'Date & Time', value: dateTime || 'N/A' },
    { label: 'Location', value: record.location || 'N/A' },
    { label: 'Severity', value: (record.severity || 'N/A').toUpperCase() },
  ]);
  body += sectionHeader('Injury Details');
  body += kvGrid([{ label: 'Injury Type', value: record.injury_type || 'N/A' }, { label: 'Body Part', value: record.body_part || 'N/A' }]);
  if (record.injury_description) { body += textBox(record.injury_description, '#ef4444'); }
  body += sectionHeader('Description of Incident');
  body += textBox(record.incident_description || 'Not provided', '#ef4444');
  body += sectionHeader('Witnesses');
  body += paragraph(record.witnesses || 'None recorded', !record.witnesses);
  body += sectionHeader('First Aid & Hospital');
  body += kvGrid([
    { label: 'First Aid Given', value: record.first_aid_given ? 'Yes' : 'No' },
    { label: 'First Aid Details', value: record.first_aid_details || 'N/A' },
    { label: 'First Aider', value: record.first_aider_name || 'N/A' },
    { label: 'Hospital Visit', value: record.hospital_visit ? 'Yes' : 'No' },
    { label: 'Hospital Name', value: record.hospital_name || 'N/A' },
  ]);
  if (record.time_off_work) {
    body += sectionHeader('Time Off Work');
    body += kvGrid([{ label: 'Days Off', value: record.days_off != null ? String(record.days_off) : 'N/A' }, { label: 'Return Date', value: fmtDate(record.return_date) }]);
  }
  if (record.corrective_actions) { body += sectionHeader('Corrective Actions'); body += textBox(record.corrective_actions, '#3b82f6'); }
  if (record.reporter_signature) {
    body += sectionHeader('Signatures');
    body += signatureBlock([{ role: 'Recorded By', name: record.recorded_by || 'Signed', date: fmtDate(record.created_at), signatureDataUrl: record.reporter_signature || undefined }]);
  }
  body += sectionHeader('F2508 Information Required');
  body += checklist([
    { label: 'Name, address & telephone of the person reporting', passed: true },
    { label: 'Date, time & location of the incident', passed: !!record.incident_date },
    { label: 'Name, address & occupation of the injured person', passed: !!record.injured_name },
    { label: 'Nature of injury or condition', passed: !!record.injury_type },
    { label: 'Brief description of the circumstances', passed: !!record.incident_description },
    { label: "Name & address of the injured person's employer", passed: !!record.injured_employer },
  ]);
  return renderPage({ title: 'RIDDOR Report', refId: record.id, statusLabel, statusColour, branding, bodyHtml: body, footerNote: 'RIDDOR 2013 \u2014 Reporting of Injuries, Diseases and Dangerous Occurrences Regulations. Report online: notifications.hse.gov.uk/riddorforms/Injury or call 0345 300 9923' });
}
