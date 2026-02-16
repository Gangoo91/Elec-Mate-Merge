import { renderPage, sectionHeader, kvGrid, textBox, signatureBlock, paragraph, type StatusColour, type Branding } from '../safety-html-base.ts';
const fmtDate = (d: string | null) => d ? new Date(d).toLocaleDateString('en-GB') : 'N/A';
// deno-lint-ignore no-explicit-any
export function siteDiaryTemplate(record: any, branding: Branding): string {
  let body = '';
  body += sectionHeader('Site Information');
  body += kvGrid([
    { label: 'Site Name', value: record.site_name || 'N/A' },
    { label: 'Site Address', value: record.site_address || 'N/A' },
    { label: 'Entry Date', value: fmtDate(record.entry_date) },
    { label: 'Weather', value: record.weather || 'N/A' },
  ]);
  body += sectionHeader('Working Hours');
  body += kvGrid([
    { label: 'Start Time', value: record.start_time || 'N/A' },
    { label: 'End Time', value: record.end_time || 'N/A' },
    { label: 'Personnel Count', value: record.personnel_count != null ? String(record.personnel_count) : 'N/A' },
  ], 3);
  if (record.work_completed) { body += sectionHeader('Work Completed'); body += textBox(record.work_completed, '#22c55e'); }
  if (record.issues) { body += sectionHeader('Issues & Delays'); body += textBox(record.issues, '#ef4444'); }
  if (record.materials_used) { body += sectionHeader('Materials Used'); body += textBox(record.materials_used, '#3b82f6'); }
  if (record.notes) { body += sectionHeader('Additional Notes'); body += paragraph(record.notes); }
  if (record.recorder_signature) {
    body += sectionHeader('Signatures');
    body += signatureBlock([{ role: 'Recorded By', name: record.recorder_name || 'Signed', date: fmtDate(record.entry_date), signatureDataUrl: record.recorder_signature || undefined }]);
  }
  return renderPage({ title: 'Site Diary', refId: record.id, statusLabel: 'Recorded', statusColour: 'info' as StatusColour, branding, bodyHtml: body, footerNote: 'Site diary entries form part of the project record and may be used as evidence in disputes. Entries should be made daily.' });
}
