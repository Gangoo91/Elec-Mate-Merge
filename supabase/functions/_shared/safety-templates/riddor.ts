import { renderPage, sectionHeader, kvGrid, statBoxes, textBox, warningBanner, checklist, signatureBlock, paragraph, dataTable, type StatusColour, type Branding } from '../safety-html-base.ts';
const fmtDate = (d: string | null) => d ? new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }) : 'N/A';
const fmtDateTime = (d: string | null) => d ? new Date(d).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'N/A';
// deno-lint-ignore no-explicit-any
export function riddorTemplate(record: any, branding: Branding): string {
  const reported = record.riddor_reported || record.riddor_reported_date;
  const statusColour: StatusColour = reported ? 'success' : 'danger';
  let body = '';
  if (!reported) { body += warningBanner('RIDDOR REPORTABLE \u2014 Must be reported to HSE. Deaths and specified injuries: immediately. Over-7-day incapacitation: within 15 days. Report at notifications.hse.gov.uk/riddorforms or call 0345 300 9923.'); }
  body += sectionHeader('Reporting Status');
  body += statBoxes([
    { label: 'Status', value: reported ? 'REPORTED' : 'PENDING', colour: statusColour },
    { label: 'Category', value: record.riddor_category || 'TBD', colour: 'warning' },
    { label: 'Severity', value: (record.severity || 'N/A').toUpperCase(), colour: record.severity === 'fatal' || record.severity === 'major' ? 'danger' : 'warning' },
    { label: 'Hospital', value: record.hospital_visit ? 'YES' : 'NO', colour: record.hospital_visit ? 'danger' : 'grey' },
  ]);
  body += sectionHeader('RIDDOR Details');
  body += kvGrid([
    { label: 'Reportable', value: 'Yes' },
    { label: 'RIDDOR Category', value: record.riddor_category || 'To be determined' },
    { label: 'HSE Reference', value: record.riddor_reference || 'Pending' },
    { label: 'Reporting Deadline', value: fmtDate(record.riddor_deadline) },
    { label: 'Date Reported', value: reported ? fmtDate(record.riddor_reported_date) : 'Not yet reported' },
  ]);
  const dateTime = [fmtDate(record.incident_date), record.incident_time || ''].filter(Boolean).join(' at ');
  body += sectionHeader('Incident Details');
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
  body += paragraph(record.witnesses || 'None recorded');
  body += sectionHeader('First Aid & Medical Treatment');
  body += kvGrid([
    { label: 'First Aid Given', value: record.first_aid_given ? 'Yes' : 'No' },
    { label: 'First Aid Details', value: record.first_aid_details || 'N/A' },
    { label: 'First Aider', value: record.first_aider_name || 'N/A' },
    { label: 'Hospital Visit', value: record.hospital_visit ? 'Yes' : 'No' },
    { label: 'Hospital Name', value: record.hospital_name || 'N/A' },
  ]);
  if (record.time_off_work || record.days_off) {
    body += sectionHeader('Time Off Work');
    body += kvGrid([{ label: 'Days Off', value: record.days_off != null ? String(record.days_off) : 'N/A' }, { label: 'Return Date', value: fmtDate(record.return_date) }]);
  }
  if (record.corrective_actions) { body += sectionHeader('Corrective Actions'); body += textBox(record.corrective_actions, '#3b82f6'); }
  body += sectionHeader('F2508 Submission Checklist');
  body += checklist([
    { label: 'Name, address & telephone of the reporting person', passed: true },
    { label: 'Date, time & location of the incident', passed: !!record.incident_date },
    { label: 'Name, address & occupation of the injured person', passed: !!record.injured_name },
    { label: 'Nature of injury or condition', passed: !!record.injury_type },
    { label: 'Brief description of the circumstances', passed: !!record.incident_description },
    { label: "Name & address of the injured person's employer", passed: !!record.injured_employer },
  ]);
  body += sectionHeader('Applicable Regulations');
  body += paragraph('RIDDOR 2013 \u2014 Reporting of Injuries, Diseases and Dangerous Occurrences Regulations. Schedule 1: Specified injuries (fractures, amputations, burns, loss of consciousness). Schedule 2: Reportable dangerous occurrences. Regulation 4: Deaths. Regulation 5: Non-fatal injuries to workers. Regulation 7: Dangerous occurrences.');
  body += sectionHeader('Declaration & Signature');
  body += paragraph('I confirm this report is an accurate and complete account of the incident. The information provided will be used for statutory reporting to the Health and Safety Executive under RIDDOR 2013.');
  body += signatureBlock([{ role: 'Recorded By', name: record.recorded_by || undefined, date: fmtDate(record.created_at), signatureDataUrl: record.reporter_signature || undefined }]);
  body += sectionHeader('Audit Trail');
  const timeline: string[][] = [['Incident Occurred', dateTime || 'N/A'], ['Record Created', fmtDateTime(record.created_at)]];
  if (reported) timeline.push(['Reported to HSE', fmtDate(record.riddor_reported_date)]);
  body += dataTable(['Event', 'Date / Time'], timeline);
  return renderPage({ title: 'RIDDOR Report (F2508)', refId: record.id, statusLabel: reported ? 'Reported' : 'Pending', statusColour, branding, bodyHtml: body, footerNote: 'RIDDOR 2013 \u2014 Report online: notifications.hse.gov.uk/riddorforms or call 0345 300 9923. Records must be retained for minimum 3 years. Failure to report is a criminal offence.' });
}
