import { renderPage, sectionHeader, kvGrid, checklist, warningBanner, signatureBlock, type StatusColour, type Branding } from '../safety-html-base.ts';
const fmtDate = (d: string | null) => d ? new Date(d).toLocaleDateString('en-GB') : 'N/A';
const STATUS_MAP: Record<string, StatusColour> = { isolated: 'danger', re_energised: 'success', in_progress: 'warning', cancelled: 'grey' };
// deno-lint-ignore no-explicit-any
export function safeIsolationTemplate(record: any, branding: Branding): string {
  const statusKey = (record.status || 'in_progress').toLowerCase();
  const statusColour: StatusColour = STATUS_MAP[statusKey] || 'grey';
  let body = '';
  if (statusKey === 'isolated') { body += warningBanner('CIRCUIT CURRENTLY ISOLATED \u2014 DO NOT RE-ENERGISE WITHOUT AUTHORISATION'); }
  body += sectionHeader('Circuit Details');
  body += kvGrid([
    { label: 'Site Address', value: record.site_address || 'N/A' },
    { label: 'Circuit Description', value: record.circuit_description || 'N/A' },
    { label: 'Distribution Board', value: record.distribution_board || 'N/A' },
    { label: 'Date', value: fmtDate(record.created_at) },
  ]);
  body += sectionHeader('Voltage Detector');
  body += kvGrid([
    { label: 'Serial Number', value: record.voltage_detector_serial || 'N/A' },
    { label: 'Calibration Date', value: fmtDate(record.voltage_detector_calibration_date) },
  ]);
  const steps = (record.steps as any[]) || [];
  body += sectionHeader('Isolation Steps');
  if (steps.length > 0) {
    body += checklist(steps.map((s: any) => ({ label: s.label || s.name || 'Step', passed: s.completed === true, notes: s.notes || undefined })));
  } else { body += '<p class="body-text text-secondary">No steps recorded</p>'; }
  body += sectionHeader('Signatures');
  body += signatureBlock([
    { role: 'Isolated By', name: record.isolator_name || undefined, date: fmtDate(record.created_at) },
    { role: 'Verified By', name: record.verifier_name || undefined, date: fmtDate(record.created_at) },
  ]);
  return renderPage({ title: 'Safe Isolation Record', refId: record.id, statusLabel: record.status || 'In Progress', statusColour, branding, bodyHtml: body, footerNote: 'BS 7671:2018+A2:2022 Compliance \u2014 Safe isolation procedures must be followed at all times. This record must be retained as evidence of compliance.' });
}
