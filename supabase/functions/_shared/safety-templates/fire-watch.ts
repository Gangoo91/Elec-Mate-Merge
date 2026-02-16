import { renderPage, sectionHeader, kvGrid, checklist, signatureBlock, paragraph, type StatusColour, type Branding } from '../safety-html-base.ts';
const fmtDateTime = (d: string | null) => d ? new Date(d).toLocaleString('en-GB') : 'N/A';
const STATUS_MAP: Record<string, StatusColour> = { completed: 'success', active: 'warning', extended: 'info' };
// deno-lint-ignore no-explicit-any
export function fireWatchTemplate(record: any, branding: Branding): string {
  const statusKey = (record.status || '').toLowerCase();
  const statusColour: StatusColour = STATUS_MAP[statusKey] || 'grey';
  let body = '';
  body += sectionHeader('Fire Watch Details');
  body += kvGrid([
    { label: 'Start Time', value: fmtDateTime(record.start_time) },
    { label: 'End Time', value: fmtDateTime(record.end_time) },
    { label: 'Duration', value: record.duration_minutes ? `${record.duration_minutes} minutes` : 'N/A' },
    { label: 'Completed By', value: record.completed_by || 'N/A' },
    { label: 'Status', value: (record.status || 'N/A').toUpperCase() },
  ]);
  const items = (record.checklist as any[]) || [];
  body += sectionHeader('Fire Watch Checklist');
  if (items.length > 0) {
    body += checklist(items.map((i: any) => ({ label: (i.label || i.item || 'Check') as string, passed: i.checked === true || i.result === 'pass' })));
  } else { body += paragraph('No checklist items recorded.', true); }
  if (record.completed_signature) {
    body += sectionHeader('Signatures');
    body += signatureBlock([{ role: 'Completed By', name: record.completed_by || 'Signed', date: record.end_time ? new Date(record.end_time).toLocaleDateString('en-GB') : undefined, signatureDataUrl: record.completed_signature || undefined }]);
  }
  return renderPage({ title: 'Fire Watch Record', refId: record.id, statusLabel: record.status || 'Unknown', statusColour, branding, bodyHtml: body, footerNote: 'Fire watch procedures must comply with the site fire safety management plan. This record must be retained for audit purposes.' });
}
