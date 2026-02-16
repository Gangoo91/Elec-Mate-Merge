import { renderPage, sectionHeader, kvGrid, textBox, warningBanner, signatureBlock, paragraph, type StatusColour, type Branding } from '../safety-html-base.ts';
const fmtDate = (d: string | null) => d ? new Date(d).toLocaleDateString('en-GB') : 'N/A';
const SEV_MAP: Record<string, StatusColour> = { minor: 'success', moderate: 'warning', major: 'danger', fatal: 'danger' };
// deno-lint-ignore no-explicit-any
export function accidentTemplate(record: any, branding: Branding): string {
  const sev = (record.severity || '').toLowerCase();
  const statusColour: StatusColour = SEV_MAP[sev] || 'warning';
  let body = '';
  if (record.is_riddor_reportable) { body += warningBanner('RIDDOR REPORTABLE \u2014 This incident must be reported to the HSE within the required timeframe'); }
  body += sectionHeader('Incident Details');
  const dateTime = [fmtDate(record.incident_date), record.incident_time || ''].filter(Boolean).join(' ');
  body += kvGrid([
    { label: 'Injured Person', value: record.injured_name || 'N/A' },
    { label: 'Date & Time', value: dateTime || 'N/A' },
    { label: 'Location', value: record.location || 'N/A' },
    { label: 'Severity', value: (record.severity || 'N/A').toUpperCase() },
    { label: 'Injury Type', value: record.injury_type || 'N/A' },
    { label: 'Body Part', value: record.body_part || 'N/A' },
  ]);
  body += sectionHeader('Description of Incident');
  body += textBox(record.incident_description || 'Not provided', '#ef4444');
  body += sectionHeader('Witnesses');
  body += paragraph(record.witnesses || 'None recorded', !record.witnesses);
  body += sectionHeader('First Aid');
  body += kvGrid([
    { label: 'First Aid Given', value: record.first_aid_given ? 'Yes' : 'No' },
    { label: 'First Aid Details', value: record.first_aid_details || 'N/A' },
  ]);
  body += sectionHeader('Hospital Visit');
  body += paragraph(record.hospital_visit ? 'Yes' : 'No');
  if (record.time_off_work) {
    body += sectionHeader('Time Off Work');
    body += kvGrid([{ label: 'Days Off', value: record.days_off != null ? String(record.days_off) : 'N/A' }, { label: 'Return Date', value: fmtDate(record.return_date) }]);
  }
  if (record.is_riddor_reportable) {
    body += sectionHeader('RIDDOR Details');
    body += kvGrid([{ label: 'Category', value: record.riddor_category || 'N/A' }, { label: 'Reference', value: record.riddor_reference || 'Pending' }]);
  }
  if (record.reporter_signature) {
    body += sectionHeader('Signatures');
    body += signatureBlock([{ role: 'Recorded By', name: record.recorded_by || 'Signed', date: fmtDate(record.created_at), signatureDataUrl: record.reporter_signature || undefined }]);
  }
  return renderPage({ title: 'Accident Report', refId: record.id, statusLabel: record.severity || 'Unknown', statusColour, branding, bodyHtml: body, footerNote: 'Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 (RIDDOR). All accidents must be recorded and retained for a minimum of 3 years.' });
}
