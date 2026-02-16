import { renderPage, sectionHeader, kvGrid, textBox, dataTable, badges, bulletList, signatureBlock, paragraph, type StatusColour, type Branding } from '../safety-html-base.ts';
const fmtDate = (d: string | null) => d ? new Date(d).toLocaleDateString('en-GB') : 'N/A';
const fmtDateTime = (d: string | null) => d ? new Date(d).toLocaleString('en-GB') : 'N/A';
const STATUS_MAP: Record<string, StatusColour> = { active: 'success', expired: 'danger', closed: 'info', draft: 'grey' };
// deno-lint-ignore no-explicit-any
export function permitTemplate(record: any, branding: Branding): string {
  const statusColour: StatusColour = STATUS_MAP[(record.status || '').toLowerCase()] || 'grey';
  let body = '';
  body += sectionHeader('Permit Details');
  body += kvGrid([
    { label: 'Title', value: record.title || 'N/A' },
    { label: 'Type', value: record.type || 'N/A' },
    { label: 'Location', value: record.location || 'N/A' },
    { label: 'Duration', value: record.duration_hours ? `${record.duration_hours} hours` : 'N/A' },
    { label: 'Start', value: fmtDateTime(record.start_time) },
    { label: 'End', value: fmtDateTime(record.end_time) },
    { label: 'Issued', value: fmtDate(record.created_at) },
    { label: 'Status', value: (record.status || 'N/A').toUpperCase() },
  ]);
  if (record.description) { body += sectionHeader('Description of Work'); body += textBox(record.description); }
  const hazards = (record.hazards as any[]) || [];
  if (hazards.length > 0) {
    body += sectionHeader('Hazards & Control Measures');
    body += dataTable(['Hazard', 'Controls'], hazards.map((h: any) => [h.hazard || h.name || 'Hazard', h.controls || h.control || 'N/A']));
  }
  const precautions = (record.precautions as string[]) || [];
  if (precautions.length > 0) { body += sectionHeader('Precautions'); body += bulletList(precautions); }
  const ppe = (record.ppe_required as string[]) || [];
  if (ppe.length > 0) { body += sectionHeader('PPE Required'); body += badges(ppe, '#3b82f6'); }
  if (record.emergency_procedures) { body += sectionHeader('Emergency Procedures'); body += textBox(record.emergency_procedures, '#ef4444'); }
  body += sectionHeader('Authorisation');
  body += signatureBlock([
    { role: 'Permit Issuer', name: record.issuer_name || undefined, date: fmtDate(record.created_at) },
    { role: 'Permit Receiver', name: record.receiver_name || undefined, date: fmtDate(record.created_at) },
  ]);
  if (record.additional_notes) { body += sectionHeader('Additional Notes'); body += paragraph(record.additional_notes); }
  if (record.closed_at) {
    body += sectionHeader('Permit Closure');
    body += kvGrid([{ label: 'Closed At', value: fmtDateTime(record.closed_at) }, { label: 'Closed By', value: record.closed_by || 'N/A' }]);
  }
  return renderPage({ title: 'Permit to Work', refId: record.id, statusLabel: record.status || 'Draft', statusColour, branding, bodyHtml: body, footerNote: 'This permit must be displayed at the work location. All persons involved must be briefed on the hazards and precautions.' });
}
