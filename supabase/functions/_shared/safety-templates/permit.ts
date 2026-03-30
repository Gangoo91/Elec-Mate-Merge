import {
  renderPage, sectionHeader, kvGrid, statBoxes, textBox, dataTable, badges,
  bulletList, signatureBlock, paragraph, warningBanner, type StatusColour, type Branding,
} from '../safety-html-base.ts';

const fmtDate = (d: string | null) =>
  d ? new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }) : 'N/A';
const fmtDateTime = (d: string | null) =>
  d ? new Date(d).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'N/A';

const STATUS_MAP: Record<string, StatusColour> = { active: 'success', expired: 'danger', closed: 'info', cancelled: 'grey', draft: 'grey' };

const TYPE_LABELS: Record<string, string> = {
  'hot-work': 'Hot Work Permit',
  'confined-space': 'Confined Space Entry Permit',
  'electrical-isolation': 'Electrical Isolation Permit',
  'working-at-height': 'Working at Height Permit',
  'excavation': 'Excavation Permit',
};

const TYPE_REGS: Record<string, string> = {
  'hot-work': 'Regulatory Reform (Fire Safety) Order 2005 (RRO), BS 9999, HSG168 — Fire watch minimum 60 minutes post-work. Combustible materials cleared within 10m radius. Fire extinguisher within 2m of work area.',
  'confined-space': 'Confined Spaces Regulations 1997, ACOP L101 — Continuous atmospheric monitoring required (O₂, LEL, CO, H₂S). Written rescue plan mandatory. Trained standby person at entry point.',
  'electrical-isolation': 'Electricity at Work Regulations 1989 (Reg 12-14), BS 7671:2018+A2:2022, HSE GS38 — 3-point prove dead test. Lock-off with personal padlock. Danger tags at all isolation points.',
  'working-at-height': 'Work at Height Regulations 2005, CDM 2015 — Guard rails (950mm min) + mid-rails + toe boards. Rescue plan in place. Equipment inspected before use. Weather assessment required.',
  'excavation': 'CDM 2015 (Reg 22), HSG47 — CAT & Genny scan completed. Service drawings obtained from all utility providers. Trench support for depths >1.2m. Hand-dig within 500mm of services.',
};

// deno-lint-ignore no-explicit-any
export function permitTemplate(record: any, branding: Branding): string {
  const statusKey = (record.status || 'draft').toLowerCase();
  const statusColour: StatusColour = STATUS_MAP[statusKey] || 'grey';
  const permitType = record.type || 'general';
  // deno-lint-ignore no-explicit-any
  const hazards: any[] = record.hazards || [];
  const precautions: string[] = record.precautions || [];
  const ppe: string[] = record.ppe_required || [];

  let body = '';

  // Active permit warning
  if (statusKey === 'active') {
    body += warningBanner(`THIS PERMIT IS ACTIVE \u2014 Valid from ${fmtDateTime(record.start_time)} to ${fmtDateTime(record.end_time)}. Must be displayed at the work location.`);
  } else if (statusKey === 'expired') {
    body += warningBanner('THIS PERMIT HAS EXPIRED \u2014 All work must cease. A new permit is required to continue.');
  }

  // Status overview
  body += sectionHeader('Permit Status');
  body += statBoxes([
    { label: 'Status', value: statusKey.toUpperCase(), colour: statusColour },
    { label: 'Duration', value: record.duration_hours ? `${record.duration_hours}h` : 'N/A', colour: 'info' },
    { label: 'Hazards', value: hazards.length, colour: hazards.length > 0 ? 'warning' : 'grey' },
    { label: 'PPE Items', value: ppe.length, colour: ppe.length > 0 ? 'info' : 'grey' },
  ]);

  // Permit details
  body += sectionHeader('Permit Details');
  body += kvGrid([
    { label: 'Permit Title', value: record.title || 'N/A' },
    { label: 'Permit Type', value: TYPE_LABELS[permitType] || permitType },
    { label: 'Location', value: record.location || 'N/A' },
    { label: 'Duration', value: record.duration_hours ? `${record.duration_hours} hours` : 'N/A' },
    { label: 'Valid From', value: fmtDateTime(record.start_time) },
    { label: 'Valid Until', value: fmtDateTime(record.end_time) },
    { label: 'Date Issued', value: fmtDate(record.created_at) },
    { label: 'Status', value: (record.status || 'N/A').toUpperCase() },
  ], 4);

  // Description of work
  if (record.description) {
    body += sectionHeader('Description of Work');
    body += textBox(record.description);
  }

  // Hazards & control measures
  if (hazards.length > 0) {
    body += sectionHeader('Hazard Assessment & Control Measures');
    body += dataTable(
      ['#', 'Identified Hazard', 'Control Measures'],
      hazards.map((h, i) => [String(i + 1), h.hazard || h.name || h.description || 'Hazard', h.controls || h.control || 'N/A'])
    );
  }

  // Precautions
  if (precautions.length > 0) {
    body += sectionHeader('Required Precautions');
    body += bulletList(precautions);
  }

  // PPE
  if (ppe.length > 0) {
    body += sectionHeader('Personal Protective Equipment Required');
    body += badges(ppe, '#3b82f6');
  }

  // Emergency procedures
  if (record.emergency_procedures) {
    body += sectionHeader('Emergency Procedures');
    body += textBox(record.emergency_procedures, '#ef4444');
  }

  // Applicable regulations
  if (TYPE_REGS[permitType]) {
    body += sectionHeader('Applicable Regulations');
    body += paragraph(TYPE_REGS[permitType]);
  }

  // Authorisation & signatures
  body += sectionHeader('Authorisation & Signatures');
  body += paragraph('I confirm that the hazards have been identified, control measures are in place, and all persons involved have been briefed on the contents of this permit. Work may proceed subject to the conditions stated above.');
  // deno-lint-ignore no-explicit-any
  const sigParties: any[] = [
    { role: 'Permit Issuer (Authorising Person)', name: record.issuer_name || undefined, date: fmtDateTime(record.start_time || record.created_at), signatureDataUrl: record.issuer_signature || undefined },
    { role: 'Permit Receiver (Competent Person)', name: record.receiver_name || undefined, date: fmtDateTime(record.start_time || record.created_at), signatureDataUrl: record.receiver_signature || undefined },
  ];
  if (record.approval_signature) {
    sigParties.push({ role: 'Approved By (Supervisor)', name: record.approved_by || undefined, date: fmtDateTime(record.approved_at), signatureDataUrl: record.approval_signature });
  }
  body += signatureBlock(sigParties);

  // Additional notes
  if (record.additional_notes) {
    body += sectionHeader('Additional Notes');
    body += paragraph(record.additional_notes);
  }

  // Permit closure
  if (record.closed_at) {
    body += sectionHeader('Permit Closure');
    body += kvGrid([
      { label: 'Closed By', value: record.closed_by || 'N/A' },
      { label: 'Closed At', value: fmtDateTime(record.closed_at) },
    ]);
    body += paragraph('This permit has been closed. The work area has been made safe and all persons have been notified.');
  }

  // Audit trail
  body += sectionHeader('Audit Trail');
  const timeline: string[][] = [];
  timeline.push(['Permit Issued', fmtDateTime(record.created_at)]);
  if (record.start_time) timeline.push(['Permit Active From', fmtDateTime(record.start_time)]);
  if (record.end_time) timeline.push(['Permit Expires', fmtDateTime(record.end_time)]);
  if (record.approved_at) timeline.push([`Approved by ${record.approved_by || 'Supervisor'}`, fmtDateTime(record.approved_at)]);
  if (record.closed_at) timeline.push([`Closed by ${record.closed_by || 'N/A'}`, fmtDateTime(record.closed_at)]);
  body += dataTable(['Event', 'Date / Time'], timeline);

  return renderPage({
    title: TYPE_LABELS[permitType] || 'Permit to Work',
    refId: record.id,
    statusLabel: (record.status || 'Draft').toUpperCase(),
    statusColour,
    branding,
    bodyHtml: body,
    footerNote: 'HSG250 \u2014 This permit must be displayed at the work location for the duration of the work. All persons involved must be briefed on the hazards, precautions, and emergency procedures before work commences. The permit holder is responsible for ensuring compliance.',
  });
}
