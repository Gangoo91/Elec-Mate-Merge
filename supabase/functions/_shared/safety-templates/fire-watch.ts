import { renderPage, sectionHeader, kvGrid, statBoxes, checklist, warningBanner, signatureBlock, paragraph, type StatusColour, type Branding } from '../safety-html-base.ts';
const fmtDateTime = (d: string | null) => d ? new Date(d).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'N/A';
const STATUS_MAP: Record<string, StatusColour> = { completed: 'success', active: 'warning', extended: 'info' };
// deno-lint-ignore no-explicit-any
export function fireWatchTemplate(record: any, branding: Branding): string {
  const statusKey = (record.status || '').toLowerCase();
  const statusColour: StatusColour = STATUS_MAP[statusKey] || 'grey';
  // deno-lint-ignore no-explicit-any
  const items: any[] = record.checklist || [];
  const passCount = items.filter((i) => i.checked || i.result === 'pass').length;
  let body = '';
  if (statusKey === 'active') { body += warningBanner('FIRE WATCH IN PROGRESS \u2014 Area must be continuously monitored. Do not leave the fire watch location unattended.'); }
  body += sectionHeader('Fire Watch Status');
  body += statBoxes([
    { label: 'Status', value: (record.status || 'N/A').toUpperCase(), colour: statusColour },
    { label: 'Duration', value: record.duration_minutes ? `${record.duration_minutes} min` : 'N/A', colour: 'info' },
    { label: 'Checks', value: `${passCount}/${items.length}`, colour: passCount === items.length ? 'success' : 'warning' },
  ]);
  body += sectionHeader('Fire Watch Details');
  body += kvGrid([
    { label: 'Start Time', value: fmtDateTime(record.start_time) },
    { label: 'End Time', value: fmtDateTime(record.end_time) },
    { label: 'Duration', value: record.duration_minutes ? `${record.duration_minutes} minutes` : 'N/A' },
    { label: 'Completed By', value: record.completed_by || 'N/A' },
    { label: 'Permit Reference', value: record.permit_id ? record.permit_id.substring(0, 8).toUpperCase() : 'N/A' },
    { label: 'Status', value: (record.status || 'N/A').toUpperCase() },
  ]);
  body += sectionHeader('Fire Watch Checklist');
  if (items.length > 0) {
    body += checklist(items.map((i: {label?: string; item?: string; checked?: boolean; result?: string}) => ({ label: (i.label || i.item || 'Check') as string, passed: i.checked === true || i.result === 'pass' })));
  } else { body += paragraph('No checklist items recorded.', true); }
  body += sectionHeader('Applicable Regulations');
  body += paragraph('Regulatory Reform (Fire Safety) Order 2005 (RRO) \u2014 Fire safety management on construction sites. BS 9999 \u2014 Code of practice for fire safety in building design. HSG168 \u2014 Fire safety in construction work. Minimum 60-minute fire watch period after hot work completion.');
  body += sectionHeader('Declaration & Signature');
  body += paragraph('I confirm that a fire watch has been maintained for the required duration following the completion of hot work. The area has been inspected and no signs of fire, smouldering, or excessive heat have been observed.');
  body += signatureBlock([{ role: 'Fire Watch Person', name: record.completed_by || undefined, date: fmtDateTime(record.end_time || record.created_at), signatureDataUrl: record.completed_signature || undefined }]);
  return renderPage({ title: 'Fire Watch Record', refId: record.id, statusLabel: record.status || 'Unknown', statusColour, branding, bodyHtml: body, footerNote: 'RRO 2005 / HSG168 \u2014 Fire watch is mandatory after hot work. Minimum 60 minutes post-work monitoring required. This record must be retained as part of the fire safety management plan.' });
}
