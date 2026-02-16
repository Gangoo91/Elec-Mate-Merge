import { renderPage, sectionHeader, kvGrid, checklist, warningBanner, signatureBlock, paragraph, type StatusColour, type Branding } from '../safety-html-base.ts';
const fmtDate = (d: string | null) => d ? new Date(d).toLocaleDateString('en-GB') : 'N/A';
// deno-lint-ignore no-explicit-any
export function preUseCheckTemplate(record: any, branding: Branding): string {
  const result = (record.overall_result || '').toLowerCase();
  const statusColour: StatusColour = result === 'pass' ? 'success' : result === 'fail' ? 'danger' : 'warning';
  let body = '';
  body += sectionHeader('Equipment Details');
  body += kvGrid([
    { label: 'Equipment Type', value: record.equipment_type || 'N/A' },
    { label: 'Description', value: record.equipment_description || 'N/A' },
    { label: 'Site Address', value: record.site_address || 'N/A' },
    { label: 'Date', value: fmtDate(record.created_at) },
  ]);
  body += sectionHeader('Overall Result');
  if (result === 'fail') { body += warningBanner('EQUIPMENT FAILED PRE-USE CHECK \u2014 Do not use until defects are rectified'); }
  body += paragraph(`Result: ${(record.overall_result || 'N/A').toUpperCase()}`);
  const items = (record.items as any[]) || [];
  if (items.length > 0) {
    body += sectionHeader('Check Items');
    body += checklist(items.map((i: any) => ({ label: i.label || i.name || 'Check', passed: i.result === 'pass' || i.result === true })));
  }
  body += sectionHeader('Signatures');
  const parties = [{ role: 'Checked By', name: record.checked_by || undefined, date: fmtDate(record.created_at), signatureDataUrl: record.signature || undefined }];
  if (record.approval_signature) { parties.push({ role: 'Approved By', name: record.approved_by || undefined, date: fmtDate(record.created_at), signatureDataUrl: record.approval_signature || undefined }); }
  body += signatureBlock(parties);
  return renderPage({ title: 'Pre-Use Equipment Check', refId: record.id, statusLabel: record.overall_result || 'Pending', statusColour, branding, bodyHtml: body, footerNote: 'PUWER 1998 \u2014 All work equipment must be inspected before use. Defective equipment must be taken out of service immediately.' });
}
