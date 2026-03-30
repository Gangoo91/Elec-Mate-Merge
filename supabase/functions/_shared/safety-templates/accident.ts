import {
  renderPage, sectionHeader, kvGrid, statBoxes, textBox, warningBanner,
  signatureBlock, paragraph, dataTable, type StatusColour, type Branding,
} from '../safety-html-base.ts';

const fmtDate = (d: string | null) =>
  d ? new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }) : 'N/A';
const fmtDateTime = (d: string | null) =>
  d ? new Date(d).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'N/A';

const SEV_MAP: Record<string, StatusColour> = { minor: 'success', moderate: 'warning', major: 'danger', fatal: 'danger' };

// deno-lint-ignore no-explicit-any
export function accidentTemplate(record: any, branding: Branding): string {
  const sev = (record.severity || '').toLowerCase();
  const statusColour: StatusColour = SEV_MAP[sev] || 'warning';
  let body = '';

  if (record.is_riddor_reportable) {
    body += warningBanner('RIDDOR REPORTABLE \u2014 This incident must be reported to the HSE. Report online: notifications.hse.gov.uk/riddorforms or call 0345 300 9923.');
  }

  body += sectionHeader('Incident Overview');
  body += statBoxes([
    { label: 'Severity', value: (record.severity || 'N/A').toUpperCase(), colour: statusColour },
    { label: 'RIDDOR', value: record.is_riddor_reportable ? 'YES' : 'NO', colour: record.is_riddor_reportable ? 'danger' : 'grey' },
    { label: 'First Aid', value: record.first_aid_given ? 'YES' : 'NO', colour: record.first_aid_given ? 'info' : 'grey' },
    { label: 'Hospital', value: record.hospital_visit ? 'YES' : 'NO', colour: record.hospital_visit ? 'danger' : 'grey' },
  ]);

  const dateTime = [fmtDate(record.incident_date), record.incident_time || ''].filter(Boolean).join(' at ');
  body += sectionHeader('Incident Details');
  body += kvGrid([
    { label: 'Injured Person', value: record.injured_name || 'N/A' },
    { label: 'Date & Time', value: dateTime || 'N/A' },
    { label: 'Location', value: record.location || 'N/A' },
    { label: 'Severity', value: (record.severity || 'N/A').toUpperCase() },
    { label: 'Injury Type', value: record.injury_type || 'N/A' },
    { label: 'Body Part Affected', value: record.body_part || 'N/A' },
  ]);

  body += sectionHeader('Description of Incident');
  body += textBox(record.incident_description || 'Not provided', '#ef4444');

  body += sectionHeader('Witnesses');
  body += paragraph(record.witnesses || 'None recorded');

  body += sectionHeader('First Aid & Medical Treatment');
  body += kvGrid([
    { label: 'First Aid Given', value: record.first_aid_given ? 'Yes' : 'No' },
    { label: 'First Aid Details', value: record.first_aid_details || 'N/A' },
    { label: 'First Aider Name', value: record.first_aider || 'N/A' },
    { label: 'Hospital Visit', value: record.hospital_visit ? 'Yes' : 'No' },
  ]);

  if (record.time_off_work || record.days_off) {
    body += sectionHeader('Time Off Work');
    body += kvGrid([
      { label: 'Time Off Required', value: 'Yes' },
      { label: 'Days Off', value: record.days_off != null ? String(record.days_off) : 'N/A' },
      { label: 'Return Date', value: fmtDate(record.return_date) },
    ], 3);
  }

  if (record.is_riddor_reportable) {
    body += sectionHeader('RIDDOR Reporting');
    body += kvGrid([
      { label: 'RIDDOR Category', value: record.riddor_category || 'N/A' },
      { label: 'HSE Reference', value: record.riddor_reference || 'Pending' },
      { label: 'Reported', value: record.riddor_reference ? 'Yes' : 'Not yet' },
    ], 3);
  }

  body += sectionHeader('Applicable Regulations');
  body += paragraph('RIDDOR 2013 \u2014 Deaths and specified injuries reported without delay. Over-7-day incapacitation within 15 days. Social Security (Claims and Payments) Regulations 1979 \u2014 BI 510 accident book. MHSWR 1999 Reg. 5 \u2014 Employers must investigate to prevent recurrence.');

  body += sectionHeader('Declaration & Signature');
  body += paragraph('I confirm this is an accurate account of the incident as described. The information is true to the best of my knowledge.');
  body += signatureBlock([{ role: 'Recorded By', name: record.recorded_by || undefined, date: fmtDate(record.created_at), signatureDataUrl: record.reporter_signature || undefined }]);

  body += sectionHeader('Audit Trail');
  const timeline: string[][] = [['Incident Occurred', dateTime || 'N/A'], ['Record Created', fmtDateTime(record.created_at)]];
  if (record.riddor_reference) timeline.push(['RIDDOR Reported', record.riddor_reference]);
  body += dataTable(['Event', 'Date / Time'], timeline);

  return renderPage({
    title: 'Accident Report (BI 510)',
    refId: record.id,
    statusLabel: record.severity || 'Unknown',
    statusColour,
    branding,
    bodyHtml: body,
    footerNote: 'RIDDOR 2013 \u2014 Records retained minimum 3 years. GDPR: Personal data handled per Data Protection Act 2018.',
  });
}
