import { renderPage, sectionHeader, kvGrid, dataTable, checklist, signatureBlock, paragraph, type StatusColour, type Branding } from '../safety-html-base.ts';
const fmtDate = (d: string | null) => d ? new Date(d).toLocaleDateString('en-GB') : 'N/A';
// deno-lint-ignore no-explicit-any
export function inspectionTemplate(record: any, branding: Branding): string {
  const result = (record.overall_result || '').toLowerCase();
  const statusColour: StatusColour = result === 'pass' ? 'success' : result === 'fail' ? 'danger' : 'warning';
  let body = '';
  body += sectionHeader('Inspection Summary');
  body += kvGrid([
    { label: 'Inspector', value: record.inspector_name || 'N/A' },
    { label: 'Date', value: fmtDate(record.date) },
    { label: 'Location', value: record.location || 'N/A' },
    { label: 'Overall Result', value: (record.overall_result || 'N/A').toUpperCase() },
  ]);
  if (record.pass_count != null) {
    body += sectionHeader('Results Overview');
    body += dataTable(['Pass', 'Fail', 'N/A', 'Total'], [[String(record.pass_count || 0), String(record.fail_count || 0), String(record.na_count || 0), String(record.total_items || 0)]]);
  }
  const sections = (record.sections as any[]) || [];
  for (const sec of sections) {
    body += sectionHeader(sec.title || 'Checklist');
    const items = (sec.items as any[]) || [];
    if (items.length > 0) {
      body += checklist(items.map((i: any) => ({ label: i.text || i.label || 'Item', passed: i.result === 'pass' || i.result === true, notes: i.notes || undefined })));
    } else { body += paragraph('No items recorded.', true); }
  }
  if (record.additional_notes) { body += sectionHeader('Additional Notes'); body += paragraph(record.additional_notes); }
  if (record.inspector_signature) {
    body += sectionHeader('Signatures');
    body += signatureBlock([{ role: 'Inspector', name: record.inspector_signature_name || record.inspector_name || 'Signed', date: fmtDate(record.date), signatureDataUrl: record.inspector_signature || undefined }]);
  }
  return renderPage({ title: record.template_title || 'Workplace Inspection', refId: record.id, statusLabel: record.overall_result || 'Pending', statusColour, branding, bodyHtml: body, footerNote: 'This inspection record must be retained for a minimum of 5 years in accordance with workplace health and safety regulations.' });
}
