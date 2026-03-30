import { renderPage, sectionHeader, kvGrid, statBoxes, textBox, signatureBlock, paragraph, type StatusColour, type Branding } from '../safety-html-base.ts';
const fmtDate = (d: string | null) => d ? new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }) : 'N/A';
const SEV_MAP: Record<string, StatusColour> = { critical: 'danger', high: 'danger', medium: 'warning', low: 'success' };
// deno-lint-ignore no-explicit-any
export function nearMissTemplate(record: any, branding: Branding): string {
  const sev = (record.severity || '').toLowerCase();
  const statusColour: StatusColour = SEV_MAP[sev] || 'grey';
  let body = '';
  body += sectionHeader('Incident Overview');
  body += statBoxes([
    { label: 'Severity', value: (record.severity || 'N/A').toUpperCase(), colour: statusColour },
    { label: 'Category', value: record.category || 'N/A', colour: 'info' },
    { label: 'Status', value: (record.status || 'Open').toUpperCase(), colour: record.status === 'closed' ? 'success' : 'warning' },
  ]);
  body += sectionHeader('Incident Details');
  body += kvGrid([
    { label: 'Category', value: record.category || 'N/A' },
    { label: 'Location', value: record.location || 'N/A' },
    { label: 'Incident Date', value: fmtDate(record.incident_date) },
    { label: 'Severity', value: (record.severity || 'N/A').toUpperCase() },
    { label: 'Status', value: (record.status || 'N/A').toUpperCase() },
    { label: 'Reported', value: fmtDate(record.created_at) },
  ]);
  body += sectionHeader('Description of Near Miss');
  const accent = sev === 'critical' || sev === 'high' ? '#ef4444' : sev === 'medium' ? '#f59e0b' : '#22c55e';
  body += textBox(record.description || 'Not provided', accent);
  if (record.immediate_actions) { body += sectionHeader('Immediate Actions Taken'); body += textBox(record.immediate_actions, '#3b82f6'); }
  if (record.root_cause) { body += sectionHeader('Root Cause Analysis'); body += textBox(record.root_cause, '#8b5cf6'); }
  if (record.corrective_actions) { body += sectionHeader('Corrective Actions'); body += textBox(record.corrective_actions, '#22c55e'); }
  body += sectionHeader('Applicable Regulations');
  body += paragraph('MHSWR 1999 Reg. 5 \u2014 Every employer shall make arrangements for effective health and safety management, including near miss reporting. CDM 2015 \u2014 Near misses on construction sites must be recorded. ISO 45001 \u2014 Organisations should investigate near misses to prevent incidents.');
  body += sectionHeader('Declaration & Signature');
  body += paragraph('I confirm this near miss report is an accurate account of the event. Near miss reporting is essential for preventing future accidents and improving workplace safety.');
  body += signatureBlock([{ role: 'Reporter', name: record.reporter_name || undefined, date: fmtDate(record.created_at), signatureDataUrl: record.reporter_signature || undefined }]);
  return renderPage({ title: 'Near Miss Report', refId: record.id, statusLabel: record.severity || 'Unknown', statusColour, branding, bodyHtml: body, footerNote: 'MHSWR 1999 \u2014 Near miss reporting is a legal requirement for employers. All near misses must be investigated and corrective actions implemented to prevent recurrence.' });
}
