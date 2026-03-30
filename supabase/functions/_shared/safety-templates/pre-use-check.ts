import {
  renderPage, sectionHeader, kvGrid, statBoxes, checklist, warningBanner,
  signatureBlock, paragraph, textBox, type StatusColour, type Branding,
} from '../safety-html-base.ts';

const fmtDate = (d: string | null) =>
  d ? new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }) : 'N/A';

const TYPE_LABELS: Record<string, string> = {
  ladder: 'Ladder',
  scaffold: 'Scaffold',
  power_tool: 'Power Tool',
  test_instrument: 'Test Instrument',
  access_equipment: 'Access Equipment',
};

const REGULATION_NOTES: Record<string, string> = {
  ladder: 'LOLER 1998 Reg. 9 — Ladders used as a workplace require 6-monthly thorough examination. BS EN 131 — Classification and duty rating must be appropriate for the task. INDG 455 — Visual inspection required before each use.',
  scaffold: 'Work at Height Regulations 2005 Reg. 12 — Scaffold must be inspected before first use, after alteration, and at intervals not exceeding 7 days. NASC SG4:15 / TG20:13 — Erection and inspection by CISRS competent person.',
  power_tool: 'PUWER 1998 Reg. 5 — Work equipment must be maintained in efficient working order. Electricity at Work Regulations 1989 — Portable appliances require periodic testing (PAT). IET Code of Practice for In-Service Inspection and Testing.',
  test_instrument: 'HSE GS38 (4th Edition) — Test probes must have shrouded tips (max 4mm / 2mm for voltage detection), finger guards, fused leads, and be suitable for the intended measurement category (CAT III/IV). BS 7671 Chapter 64.',
  access_equipment: 'LOLER 1998 Reg. 9 — Mobile access towers require 6-monthly thorough examination. PASMA guidance — Erection by trained person only. Height-to-base ratio: 3:1 indoor, 2.5:1 outdoor.',
};

// deno-lint-ignore no-explicit-any
export function preUseCheckTemplate(record: any, branding: Branding): string {
  const result = (record.overall_result || '').toLowerCase();
  const statusColour: StatusColour = result === 'pass' ? 'success' : result === 'fail' ? 'danger' : 'warning';
  const eqType = record.equipment_type || 'unknown';
  // deno-lint-ignore no-explicit-any
  const items: any[] = record.items || [];

  const passCount = items.filter((i) => i.result === 'pass').length;
  const failCount = items.filter((i) => i.result === 'fail').length;
  const naCount = items.filter((i) => i.result === 'na').length;
  const total = items.length;

  let body = '';

  // Equipment details
  body += sectionHeader('Equipment Details');
  body += kvGrid([
    { label: 'Equipment Type', value: TYPE_LABELS[eqType] || eqType },
    { label: 'Description / Serial No.', value: record.equipment_description || 'N/A' },
    { label: 'Site / Location', value: record.site_address || 'N/A' },
    { label: 'Inspection Date', value: fmtDate(record.check_date || record.created_at) },
  ]);

  // Results overview — stat boxes
  body += sectionHeader('Results Overview');
  if (result === 'fail') {
    body += warningBanner('EQUIPMENT FAILED PRE-USE CHECK — Do not use until all defects are rectified and a re-check is performed.');
  }
  body += statBoxes([
    { label: 'Pass', value: passCount, colour: 'success' },
    { label: 'Fail', value: failCount, colour: failCount > 0 ? 'danger' : 'grey' },
    { label: 'N/A', value: naCount, colour: 'grey' },
    { label: 'Result', value: result.toUpperCase(), colour: statusColour },
  ]);

  // Checklist items — grouped by section
  const sectionOrder: string[] = [];
  // deno-lint-ignore no-explicit-any
  const sectionItems = new Map<string, any[]>();
  for (const item of items) {
    const sec = item.section || 'General';
    if (!sectionItems.has(sec)) {
      sectionItems.set(sec, []);
      sectionOrder.push(sec);
    }
    sectionItems.get(sec)!.push(item);
  }

  for (const secName of sectionOrder) {
    const secItems = sectionItems.get(secName)!;
    body += sectionHeader(secName);
    body += checklist(secItems.map((i) => ({
      label: i.label || i.name || 'Check item',
      passed: i.result === 'pass',
      na: i.result === 'na' || i.result === 'n/a',
      notes: i.notes || undefined,
    })));
  }

  // Defects summary (only if any failures)
  if (failCount > 0) {
    body += sectionHeader('Defects Identified');
    const failedItems = items.filter((i) => i.result === 'fail');
    body += `<ul class="bullet-list">${failedItems.map((i) =>
      `<li><strong>${i.label || 'Item'}</strong>${i.notes ? ` — ${i.notes}` : ''}</li>`
    ).join('')}</ul>`;
    if (record.actions_required) {
      body += textBox(record.actions_required, '#ef4444');
    }
  }

  // Regulation reference
  if (REGULATION_NOTES[eqType]) {
    body += sectionHeader('Applicable Regulations');
    body += paragraph(REGULATION_NOTES[eqType]);
  }

  // Declaration & signatures
  body += sectionHeader('Declaration & Signature');
  body += paragraph('I confirm that this pre-use equipment check has been carried out in accordance with current health and safety legislation. The results recorded are an accurate representation of the condition of the equipment at the time of inspection.');
  // deno-lint-ignore no-explicit-any
  const parties: any[] = [{
    role: 'Checked By',
    name: record.checked_by || undefined,
    date: fmtDate(record.check_date || record.created_at),
    signatureDataUrl: record.signature || undefined,
  }];
  if (record.approval_signature) {
    parties.push({
      role: 'Approved By',
      name: record.approved_by || undefined,
      date: fmtDate(record.approved_at || record.created_at),
      signatureDataUrl: record.approval_signature,
    });
  }
  body += signatureBlock(parties);

  const regShort = eqType === 'scaffold' ? 'WAHR 2005' :
    eqType === 'test_instrument' ? 'GS38 4th Ed' :
    eqType === 'power_tool' ? 'PUWER 1998' : 'LOLER 1998';

  return renderPage({
    title: `Pre-Use ${TYPE_LABELS[eqType] || 'Equipment'} Check`,
    refId: record.id,
    statusLabel: result.toUpperCase() || 'PENDING',
    statusColour,
    branding,
    bodyHtml: body,
    footerNote: `${regShort} — All work equipment must be inspected before use. Defective equipment must be taken out of service immediately and not used until defects are rectified.`,
  });
}
