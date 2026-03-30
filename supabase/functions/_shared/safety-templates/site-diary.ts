import { renderPage, sectionHeader, kvGrid, textBox, signatureBlock, paragraph, type StatusColour, type Branding } from '../safety-html-base.ts';
const fmtDate = (d: string | null) => d ? new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }) : 'N/A';
// deno-lint-ignore no-explicit-any
export function siteDiaryTemplate(record: any, branding: Branding): string {
  let body = '';
  body += sectionHeader('Site Information');
  body += kvGrid([
    { label: 'Site Name', value: record.site_name || 'N/A' },
    { label: 'Site Address', value: record.site_address || 'N/A' },
    { label: 'Entry Date', value: fmtDate(record.entry_date) },
    { label: 'Weather Conditions', value: record.weather || 'N/A' },
  ]);
  body += sectionHeader('Working Hours & Resources');
  body += kvGrid([
    { label: 'Start Time', value: record.start_time || 'N/A' },
    { label: 'End Time', value: record.end_time || 'N/A' },
    { label: 'Personnel on Site', value: record.personnel_count != null ? String(record.personnel_count) : 'N/A' },
  ], 3);
  if (record.work_completed) { body += sectionHeader('Work Completed'); body += textBox(record.work_completed, '#22c55e'); }
  if (record.issues || record.delays) { body += sectionHeader('Issues, Delays & Variations'); body += textBox(record.issues || record.delays || 'None recorded', '#ef4444'); }
  if (record.materials_used) { body += sectionHeader('Materials Used / Delivered'); body += textBox(record.materials_used, '#3b82f6'); }
  if (record.notes) { body += sectionHeader('Additional Notes'); body += paragraph(record.notes); }
  body += sectionHeader('Applicable Regulations');
  body += paragraph('CDM 2015 Reg. 12 \u2014 The principal contractor must maintain a construction phase plan which may include site diary records. Site diaries form part of the project record and may be used as evidence in contractual disputes (JCT, NEC4). Records should be contemporaneous and factual.');
  body += sectionHeader('Declaration & Signature');
  body += paragraph('I confirm this is an accurate record of the work carried out and conditions observed on site for the date specified above.');
  body += signatureBlock([{ role: 'Recorded By', name: record.recorder_name || undefined, date: fmtDate(record.entry_date), signatureDataUrl: record.recorder_signature || undefined }]);
  return renderPage({ title: 'Site Diary Entry', refId: record.id, statusLabel: 'Recorded', statusColour: 'info' as StatusColour, branding, bodyHtml: body, footerNote: 'CDM 2015 \u2014 Site diary entries form part of the project record. Entries should be made daily and contemporaneously. Records may be used as evidence in disputes or HSE investigations.' });
}
