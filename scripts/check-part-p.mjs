#!/usr/bin/env node
/**
 * Part P must never print for a premises we know is not a dwelling.
 *
 * ELE-1662. Part P of the Building Regulations is "Electrical safety —
 * Dwellings". Every place a certificate offers or prints a Part P /
 * building-control status must run it through `isKnownNonDwelling()` from
 * `src/utils/partP.ts`, on whichever field that form uses for the premises:
 *
 *   EV charging   installationType   (domestic | commercial | public)
 *   EIC           installationType   (domestic | commercial | industrial | …)
 *   EICR          propertyType       (house | flat | … | commercial | industrial)
 *
 * Minor Works has no premises field and is deliberately not gated.
 *
 * The check is on the FORMATTERS first — they are the last line before paper
 * — and on the form sections second. A new Part P key added to a formatter
 * without the gate fails here.
 */
import { readFileSync } from 'fs';

const problems = [];

// ELE-1663 — the EV and EIC forms must render the SHARED Building Regulations
// section and must not grow a second, unlinked Part P tick again.
for (const file of ['src/components/inspection/ev-charging/EVChargingDeclarations.tsx', 'src/components/eic/EICDeclarations.tsx']) {
  const src = readFileSync(file, 'utf8');
  if (!src.includes('<BuildingRegsNotification'))
    problems.push(`${file} no longer renders the shared BuildingRegsNotification section`);
  if (/id: 'buildingRegsCompliance'|buildingRegsCompliance\s*\|\|/.test(src))
    problems.push(`${file} has a separate Part P compliance tick again — it must be derived from the notification answer`);
}
const read = (p) => readFileSync(p, 'utf8');

const FORMATTERS = [
  // The notification keys are scoped to the building_regs_notification block —
  // `required:` and `submitted:` also appear in the DNO notification object,
  // which has nothing to do with Part P.
  ['src/utils/evChargingJsonFormatter.ts', ['building_regs:', 'building_regs_display:'], 'partPApplies'],
  ['src/utils/eicrJsonFormatter.ts', ['part_p_compliance:', 'building_regs_compliance:'], "isKnownNonDwelling(get('propertyType'))"],
  ['src/utils/eicJsonFormatter.ts', ['part_p_compliance:', 'building_regs_compliance:'], 'isKnownNonDwelling(formData.installationType)'],
];
for (const [file, keys, gate] of FORMATTERS) {
  const src = read(file);
  if (!src.includes("from '@/utils/partP'"))
    problems.push(`${file} does not import utils/partP — Part P is printed ungated`);
  for (const key of keys) {
    // every emission of the key must sit on a line (or the line above/below) that carries the gate
    const lines = src.split('\n');
    lines.forEach((l, i) => {
      if (!l.includes(key)) return;
      const window = lines.slice(Math.max(0, i - 2), i + 3).join('\n');
      if (!window.includes(gate))
        problems.push(`${file}:${i + 1} emits ${key.replace(':', '')} without ${gate}`);
    });
  }
}

{
  const src = read('src/utils/evChargingJsonFormatter.ts');
  const start = src.indexOf('building_regs_notification: {');
  const block = start < 0 ? '' : src.slice(start, src.indexOf('},', start));
  if (!block) problems.push('src/utils/evChargingJsonFormatter.ts: building_regs_notification block not found');
  for (const key of ['required:', 'via_scheme:', 'submitted:']) {
    const line = block.split('\n').find((l) => l.includes(key) && !l.includes('_display'));
    if (!line || !line.includes('partPApplies'))
      problems.push(`src/utils/evChargingJsonFormatter.ts: building_regs_notification.${key.replace(':', '')} is not gated on partPApplies`);
  }
}

const SECTIONS = [
  // ELE-1663 — the EV's two Part P areas became ONE shared section; the gate lives there.
  ['src/components/inspection/shared/BuildingRegsNotification.tsx', 'isKnownNonDwelling(f.installationType ?? f.propertyType)', 1],
  ['src/components/EICRSummary.tsx', 'isKnownNonDwelling(formData.propertyType)', 1],
];
// 30 Sep 2026 — the EIC asked Part P twice: chips on Standards, and the
// shared notification on Sign off. The chips went; the answer must still be
// written from the notification, and the second question must not return.
{
  const standards = read('src/components/eic/StandardsComplianceSection.tsx');
  if (/Part P compliance|onUpdate\('partPCompliance'/.test(standards))
    problems.push('src/components/eic/StandardsComplianceSection.tsx asks Part P again — it is answered once, on Sign off');
  const decl = read('src/components/eic/EICDeclarations.tsx');
  if (!/onUpdate\('partPCompliance'/.test(decl))
    problems.push('src/components/eic/EICDeclarations.tsx no longer writes partPCompliance from the notification answer — the EIC would print a blank Part P');
}

for (const [file, gate, atLeast] of SECTIONS) {
  const n = read(file).split(gate).length - 1;
  if (n < atLeast)
    problems.push(`${file} gates Part P ${n} time(s), expected at least ${atLeast} — a Part P control is showing for non-dwellings`);
}

// The rule itself: hide only on a KNOWN non-dwelling; blank stays available.
const util = read('src/utils/partP.ts');
if (!/new Set\(\['commercial', 'industrial', 'public'\]\)/.test(util))
  problems.push("src/utils/partP.ts: NON_DWELLING must stay exactly ['commercial','industrial','public'] — adding dwelling-shaped or blank values would strip Part P from real houses (533 EICRs carry no property type at all)");

if (problems.length) {
  console.error('✗ part p:\n' + problems.map((p) => `  - ${p}`).join('\n'));
  process.exit(1);
}
console.log('✓ part p: gated on the premises type in 3 formatters and 2 form sections, EIC asks once; blank premises keep Part P available');
