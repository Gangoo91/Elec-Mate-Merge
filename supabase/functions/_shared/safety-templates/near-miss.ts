import { renderPage, sectionHeader, kvGrid, textBox, signatureBlock, paragraph, type StatusColour, type Branding } from '../safety-html-base.ts';
const fmtDate = (d: string | null) => d ? new Date(d).toLocaleDateString('en-GB') : 'N/A';
const SEV_MAP: Record<string, StatusColour> = { critical: 'danger', high: 'danger', medium: 'warning', low: 'success' };
// deno-lint-ignore no-explicit-any
export function nearMissTemplate(record: any, branding: Branding): string {
  const sev = (record.severity || '').toLowerCase();
  const statusColour: StatusColour = SEV_MAP[sev] || 'grey';
  let body = '';
  body += sectionHeader('Incident Details');
  body += kvGrid([
    { label: 'Category', value: record.category || 'N/A' },
    { label: 'Location', value: record.location || 'N/A' },
    { label: 'Incident Date', value: fmtDate(record.incident_date) },
    { label: 'Status', value: (record.status || 'N/A').toUpperCase() },
    { label: 'Severity', value: (record.severity || 'N/A').toUpperCase() },
    { label: 'Reported', value: fmtDate(record.created_at) },
  ]);
  body += sectionHeader('Description');
  const accentColour = sev === 'critical' || sev === 'high' ? '#ef4444' : sev === 'medium' ? '#f59e0b' : '#22c55e';
  body += textBox(record.description || 'Not provided', accentColour);
  if (record.immediate_actions) { body += sectionHeader('Immediate Actions Taken'); body += textBox(record.immediate_actions, '#3b82f6'); }
  if (record.reporter_signature) {
    body += sectionHeader('Signatures');
    body += signatureBlock([{ role: 'Reporter', name: record.reporter_name || 'Signed', date: fmtDate(record.created_at), signatureDataUrl: record.reporter_signature || undefined }]);
  }
  return renderPage({ title: 'Near Miss Report', refId: record.id, statusLabel: record.severity || 'Unknown', statusColour, branding, bodyHtml: body, footerNote: 'Near miss reporting is essential for preventing future accidents. All near misses must be investigated and corrective actions implemented.' });
}
