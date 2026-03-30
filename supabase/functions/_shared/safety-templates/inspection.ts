import { renderPage, sectionHeader, kvGrid, statBoxes, checklist, signatureBlock, paragraph, type StatusColour, type Branding } from '../safety-html-base.ts';

const fmtDate = (d: string | null) => d ? new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }) : 'N/A';

// deno-lint-ignore no-explicit-any
export function inspectionTemplate(record: any, branding: Branding): string {
  const result = (record.overall_result || '').toLowerCase();
  const statusColour: StatusColour = result === 'pass' ? 'success' : result === 'fail' ? 'danger' : 'warning';

  let body = '';

  // Summary details
  body += sectionHeader('Inspection Details');
  body += kvGrid([
    { label: 'Inspector', value: record.inspector_name || 'N/A' },
    { label: 'Inspection Date', value: fmtDate(record.date) },
    { label: 'Location / Site', value: record.location || 'N/A' },
    { label: 'Overall Result', value: (record.overall_result || 'N/A').toUpperCase() },
  ]);

  // Results overview — stat boxes
  if (record.pass_count != null) {
    body += sectionHeader('Results Overview');
    const passRate = record.total_items > 0
      ? Math.round((record.pass_count / record.total_items) * 100)
      : 0;
    body += statBoxes([
      { label: 'Pass', value: record.pass_count || 0, colour: 'success' },
      { label: 'Fail', value: record.fail_count || 0, colour: record.fail_count > 0 ? 'danger' : 'grey' },
      { label: 'N/A', value: record.na_count || 0, colour: 'grey' },
      { label: 'Pass Rate', value: `${passRate}%`, colour: passRate >= 80 ? 'success' : passRate >= 50 ? 'warning' : 'danger' },
    ]);
  }

  // Checklist sections
  // deno-lint-ignore no-explicit-any
  const sections = (record.sections as any[]) || [];
  for (const sec of sections) {
    body += sectionHeader(sec.title || 'Checklist');
    // deno-lint-ignore no-explicit-any
    const items = (sec.items as any[]) || [];
    if (items.length > 0) {
      // deno-lint-ignore no-explicit-any
      body += checklist(items.map((i: any) => ({
        label: i.text || i.label || 'Item',
        passed: i.result === 'pass' || i.result === true,
        na: i.result === 'na' || i.result === 'n/a',
        notes: i.notes || undefined,
      })));
    } else {
      body += paragraph('No items recorded.', true);
    }
  }

  // Additional notes
  if (record.additional_notes) {
    body += sectionHeader('Additional Notes');
    body += paragraph(record.additional_notes);
  }

  // Signatures
  if (record.inspector_signature) {
    body += sectionHeader('Declaration & Signature');
    body += paragraph('I confirm that this inspection has been carried out in accordance with current health and safety legislation and the results recorded are an accurate representation of the conditions observed.');
    body += signatureBlock([{
      role: 'Inspector',
      name: record.inspector_signature_name || record.inspector_name || 'Signed',
      date: fmtDate(record.date),
      signatureDataUrl: record.inspector_signature || undefined,
    }]);
  }

  return renderPage({
    title: record.template_title || 'Workplace Inspection Report',
    refId: record.id,
    statusLabel: record.overall_result || 'Pending',
    statusColour,
    branding,
    bodyHtml: body,
    footerNote: 'This inspection record must be retained for a minimum of 5 years in accordance with workplace health and safety regulations. The Workplace (Health, Safety and Welfare) Regulations 1992.',
  });
}
