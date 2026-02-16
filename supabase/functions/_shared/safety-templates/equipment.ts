import { renderPage, sectionHeader, kvGrid, dataTable, signatureBlock, paragraph, type StatusColour, type Branding } from '../safety-html-base.ts';
const fmtDate = (d: string | null) => d ? new Date(d).toLocaleDateString('en-GB') : 'N/A';
const STATUS_MAP: Record<string, StatusColour> = { good: 'success', attention: 'warning', overdue: 'danger' };
// deno-lint-ignore no-explicit-any
export function equipmentTemplate(record: any, branding: Branding): string {
  const statusKey = (record.status || '').toLowerCase();
  const statusColour: StatusColour = STATUS_MAP[statusKey] || 'grey';
  let body = '';
  body += sectionHeader('Equipment Details');
  body += kvGrid([
    { label: 'Equipment Type', value: record.equipment_type || 'N/A' },
    { label: 'Serial Number', value: record.serial_number || 'N/A' },
    { label: 'Status', value: record.status || 'N/A' },
    { label: 'Description', value: record.description || 'N/A' },
  ]);
  body += sectionHeader('Inspection & Calibration');
  body += dataTable(['Date Type', 'Date'], [
    ['Last Inspection', fmtDate(record.last_inspection_date)],
    ['Next Inspection', fmtDate(record.next_inspection_date)],
    ['Last Calibration', fmtDate(record.calibration_date)],
  ]);
  if (record.notes) { body += sectionHeader('Notes'); body += paragraph(record.notes); }
  body += sectionHeader('Signatures');
  body += signatureBlock([{ role: 'Responsible Person', name: record.assigned_to || undefined, date: fmtDate(record.updated_at || record.created_at) }]);
  return renderPage({ title: 'Safety Equipment Record', refId: record.id, statusLabel: record.status || 'Unknown', statusColour, branding, bodyHtml: body, footerNote: 'PUWER 1998 & LOLER 1998 \u2014 All safety equipment must be regularly inspected and maintained. Records must be kept for the lifetime of the equipment.' });
}
