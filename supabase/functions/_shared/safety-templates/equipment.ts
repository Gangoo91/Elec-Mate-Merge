import { renderPage, sectionHeader, kvGrid, statBoxes, dataTable, signatureBlock, paragraph, type StatusColour, type Branding } from '../safety-html-base.ts';
const fmtDate = (d: string | null) => d ? new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }) : 'N/A';
const STATUS_MAP: Record<string, StatusColour> = { good: 'success', attention: 'warning', overdue: 'danger' };
// deno-lint-ignore no-explicit-any
export function equipmentTemplate(record: any, branding: Branding): string {
  const statusKey = (record.status || '').toLowerCase();
  const statusColour: StatusColour = STATUS_MAP[statusKey] || 'grey';
  let body = '';
  body += sectionHeader('Equipment Status');
  body += statBoxes([
    { label: 'Status', value: (record.status || 'N/A').toUpperCase(), colour: statusColour },
    { label: 'Type', value: record.equipment_type || 'N/A', colour: 'info' },
  ]);
  body += sectionHeader('Equipment Details');
  body += kvGrid([
    { label: 'Equipment Type', value: record.equipment_type || 'N/A' },
    { label: 'Name / Model', value: record.name || 'N/A' },
    { label: 'Serial Number', value: record.serial_number || 'N/A' },
    { label: 'Description', value: record.description || 'N/A' },
    { label: 'Location', value: record.location || 'N/A' },
    { label: 'Status', value: (record.status || 'N/A').toUpperCase() },
  ]);
  body += sectionHeader('Inspection & Calibration Schedule');
  body += dataTable(['Type', 'Date', 'Status'], [
    ['Last Inspection', fmtDate(record.last_inspection_date || record.last_inspection), record.last_inspection_date ? 'Completed' : 'Not recorded'],
    ['Next Inspection Due', fmtDate(record.next_inspection_date || record.next_inspection), 'Scheduled'],
    ['Last Calibration', fmtDate(record.calibration_date), record.calibration_date ? 'Completed' : 'Not recorded'],
  ]);
  if (record.notes) { body += sectionHeader('Notes'); body += paragraph(record.notes); }
  body += sectionHeader('Applicable Regulations');
  body += paragraph('PUWER 1998 Reg. 5-6 \u2014 Work equipment must be maintained in efficient working order. Reg. 9 \u2014 Training and information. LOLER 1998 Reg. 9 \u2014 Lifting equipment requires 6-monthly thorough examination. Electricity at Work Regulations 1989 \u2014 Electrical test equipment must be suitable and maintained.');
  body += sectionHeader('Responsible Person');
  body += signatureBlock([{ role: 'Responsible Person', name: record.assigned_to || undefined, date: fmtDate(record.updated_at || record.created_at) }]);
  return renderPage({ title: 'Equipment Register Record', refId: record.id, statusLabel: record.status || 'Unknown', statusColour, branding, bodyHtml: body, footerNote: 'PUWER 1998 / LOLER 1998 \u2014 All work equipment must be regularly inspected, maintained, and records kept for the lifetime of the equipment. Defective equipment must be taken out of service immediately.' });
}
