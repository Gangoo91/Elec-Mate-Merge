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
  harness: 'Harness & Lanyard',
  extension_lead: 'Extension Lead / Cable Reel',
  portable_rcd: 'Portable RCD',
  generator: 'Generator',
  fire_extinguisher: 'Fire Extinguisher',
  first_aid_kit: 'First Aid Kit',
  ppe: 'PPE (General)',
  mewp: 'MEWP / Cherry Picker',
};

const REGULATION_NOTES: Record<string, string> = {
  ladder: 'LOLER 1998 Reg. 9 \u2014 Ladders used as a workplace require 6-monthly thorough examination. BS EN 131 \u2014 Classification and duty rating must be appropriate for the task. INDG 455 \u2014 Visual inspection required before each use.',
  scaffold: 'Work at Height Regulations 2005 Reg. 12 \u2014 Scaffold must be inspected before first use, after alteration, and at intervals not exceeding 7 days. NASC SG4:15 / TG20:13 \u2014 Erection and inspection by CISRS competent person.',
  power_tool: 'PUWER 1998 Reg. 5 \u2014 Work equipment must be maintained in efficient working order. Electricity at Work Regulations 1989 \u2014 Portable appliances require periodic testing (PAT). IET Code of Practice for In-Service Inspection and Testing.',
  test_instrument: 'HSE GS38 (4th Edition) \u2014 Test probes must have shrouded tips (max 4mm / 2mm for voltage detection), finger guards, fused leads, and be suitable for the intended measurement category (CAT III/IV). BS 7671 Chapter 64.',
  access_equipment: 'LOLER 1998 Reg. 9 \u2014 Mobile access towers require 6-monthly thorough examination. PASMA guidance \u2014 Erection by trained person only. Height-to-base ratio: 3:1 indoor, 2.5:1 outdoor.',
  harness: 'LOLER 1998 Reg. 9 \u2014 Fall arrest harnesses require 6-monthly thorough examination. BS EN 361 \u2014 Full body harnesses. BS EN 355 \u2014 Energy absorbers. Visual inspection before each use mandatory.',
  extension_lead: 'PUWER 1998 Reg. 5 \u2014 Work equipment maintained in efficient working order. EAW 1989 \u2014 Electrical equipment must be suitable and maintained. IET Code of Practice \u2014 PAT testing at risk-appropriate intervals.',
  portable_rcd: 'EAW 1989 Reg. 4 \u2014 All electrical systems shall be constructed and maintained to prevent danger. BS 7671 Reg. 411.3.3 \u2014 RCD protection required. BS EN 61008/61009 \u2014 RCD performance standards.',
  generator: 'PUWER 1998 Reg. 5-6 \u2014 Equipment maintenance and inspection. EAW 1989 \u2014 Electrical safety requirements. BS 7430 \u2014 Code of practice for protective earthing of electrical installations. BS 7671 \u2014 Temporary installations.',
  fire_extinguisher: 'Regulatory Reform (Fire Safety) Order 2005 Art. 13 \u2014 Fire-fighting equipment must be maintained. BS 5306-3 \u2014 Commissioning and maintenance of portable fire extinguishers. Monthly visual inspections required.',
  first_aid_kit: 'Health & Safety (First-Aid) Regulations 1981 Reg. 3 \u2014 Employers must provide adequate first-aid equipment. BS 8599-1:2019 \u2014 Workplace first aid kit specification. Contents must be checked regularly and replenished.',
  ppe: 'Personal Protective Equipment at Work Regulations 2022 Reg. 4-7 \u2014 PPE must be suitable, properly fitting, maintained and replaced when defective. Individual BS EN standards apply per PPE type.',
  mewp: 'LOLER 1998 Reg. 9 \u2014 6-monthly thorough examination required. PUWER 1998 Reg. 5-9 \u2014 Maintenance, inspection and training. IPAF \u2014 Operators must hold valid licence for the category of MEWP being operated.',
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
