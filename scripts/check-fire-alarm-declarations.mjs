#!/usr/bin/env node
/**
 * BS 5839-1:2025 Annex G — statements of conformity on the fire alarm certificates.
 *
 * Annex G allows a certificate of a different layout "provided that, as a
 * minimum, the information and statements of conformity within the model
 * certificates are present". Five things carry that minimum, and all five were
 * missing from every one of G1, G2, G3, G6 and G7 until 19 Sep 2026:
 *
 *   1. the competent-person attribution, which ties the statement to the signature
 *   2. "to the best of my/our knowledge and belief" — an honest professional
 *      opinion, not a guarantee
 *   3. the applicable Section/Clause, rather than the standard as a whole
 *   4. the variations carve-out
 *   5. "The extent of liability of the signatory is limited to the system…"
 *
 * WHY THIS GUARD EXISTS RATHER THAN A COMMENT
 * ───────────────────────────────────────────
 * The declaration is written twice: once in the tab component the electrician
 * reads and signs against, and once in the PDFMonkey Liquid template that
 * becomes the certificate. Nothing joins them. They had already drifted — the
 * G6 tab said "the system is ready for use" while the G6 template said "all
 * tests on the planned sample have been carried out". Neither was Annex G, and
 * the two were not even each other.
 *
 * This checks the repo half. The template half lives in PDFMonkey and cannot be
 * reached from CI, so the tab text is the thing held still: if someone reworks a
 * declaration screen, this fails and the template gets revisited with it.
 *
 * It also bans the three absolute claims that were removed, because each
 * certified more than the signatory can know:
 *   G1  unqualified "adequate" coverage
 *   G2  "complete and ready for commissioning" — the commissioning engineer's
 *       finding under Clause 37, not the installer's
 *   G7  "the entire system remains compliant" off the back of a modification
 */
import { readFileSync, existsSync, readdirSync } from 'node:fs';

const DIR = 'src/components/inspection/fire-alarm/tabs';

/*
 * Clause 45 = Extensions, Clause 46 = Modifications — verified in the standard.
 *
 * `variations` is the form field the statement's carve-out points at. Adding
 * the Annex G wording without one was a real defect, caught the same day it was
 * introduced: G3, G6 and G7 all promised "the variations, if any, stated in
 * this certificate" while having nowhere whatsoever to state them. G2's field
 * exists but lives on the equipment tab, so it is checked across the whole
 * component tree rather than in the declaration file.
 */
const CERTS = [
  { id: 'G1', file: 'FAG1Declaration.tsx', role: 'design', scope: 'Section 2',
    variations: 'designDeviations' },
  { id: 'G2', file: 'FADeclarations.tsx', role: 'installation', scope: 'Section 4',
    variations: 'variationsFromDesign', variationsElsewhere: true },
  { id: 'G3', file: 'FAG3Declaration.tsx', role: 'commissioning', scope: 'Clause 37',
    variations: 'commissioningVariations' },
  { id: 'G6', file: 'FAG6Declaration.tsx', role: 'servicing', scope: 'Clause 43',
    variations: 'inspectionVariations' },
  // G7 renders the clause from `modificationType`, so the literal in the source
  // is the fallback branch; annexGWork() holds 45 and 46 and is checked below.
  { id: 'G7', file: 'FAG7Declaration.tsx', role: null, scope: 'Clause 45 or Clause 46',
    variations: 'modificationVariations' },
];

/** Each variations field must survive the trip to the certificate payload. */
const FORMATTERS = {
  G1: ['src/utils/fireAlarmG1JsonFormatter.ts', 'designDeviations'],
  G2: ['src/utils/fireAlarmG2JsonFormatter.ts', 'variationsFromDesign'],
  G3: ['src/utils/fireAlarmG3JsonFormatter.ts', 'commissioningVariations'],
  G6: ['src/utils/fireAlarmG6JsonFormatter.ts', 'inspectionVariations'],
  G7: ['src/utils/fireAlarmG7JsonFormatter.ts', 'modificationVariations'],
};

const REQUIRED = [
  ['competent-person attribution', 'competent person(s) responsible'],
  ['knowledge-and-belief qualifier', 'best of my/our knowledge and belief'],
  ['variations carve-out', 'variations, if any'],
  ['extent-of-liability limitation', 'extent of liability of the signatory'],
];

/** Claims Annex G does not make. Each certifies more than the signatory knows. */
const BANNED = [
  ['unqualified adequacy of coverage', /provides adequate detection/i],
  ['installer declaring readiness to commission', /complete and ready for commissioning/i],
  ['whole-system compliance off a modification', /entire system remains compliant/i],
  ['whole-system readiness off an inspection', /system is ready for use/i],
];

const problems = [];

for (const cert of CERTS) {
  const path = `${DIR}/${cert.file}`;
  if (!existsSync(path)) {
    problems.push(`${cert.id}: ${path} is missing — has the declaration tab been renamed?`);
    continue;
  }
  // Collapse JSX line wrapping so a sentence split across lines still matches.
  const src = readFileSync(path, 'utf8');
  const flat = src.replace(/\s+/g, ' ');

  for (const [label, needle] of REQUIRED) {
    if (!flat.includes(needle)) problems.push(`${cert.id} (${cert.file}): no ${label}`);
  }
  if (!flat.includes(cert.scope)) {
    problems.push(`${cert.id} (${cert.file}): does not cite ${cert.scope}`);
  }
  if (cert.role && !flat.includes(`for the ${cert.role} of the fire detection`)) {
    problems.push(`${cert.id} (${cert.file}): statement does not name the ${cert.role} role`);
  }
  for (const [label, re] of BANNED) {
    if (re.test(flat)) problems.push(`${cert.id} (${cert.file}): reinstates ${label}`);
  }

  // The carve-out must have somewhere to point. G2 captures variations on the
  // equipment tab rather than beside its declaration, so widen the search to
  // the tab tree rather than skipping the check — "it's on another screen" must
  // not become "nobody is checking".
  const haystack = cert.variationsElsewhere
    ? readdirSync(DIR)
        .filter((f) => f.endsWith('.tsx'))
        .map((f) => readFileSync(`${DIR}/${f}`, 'utf8'))
        .join('\n')
    : flat;
  if (!haystack.includes(cert.variations)) {
    problems.push(
      `${cert.id} (${cert.file}): the statement excepts "variations … stated in this ` +
        `certificate" but there is no ${cert.variations} field to state them in`
    );
  }
  const [fmtPath, fmtField] = FORMATTERS[cert.id];
  if (!existsSync(fmtPath)) {
    problems.push(`${cert.id}: ${fmtPath} is missing`);
  } else if (!readFileSync(fmtPath, 'utf8').includes(fmtField)) {
    problems.push(`${cert.id}: ${fmtPath} does not carry ${fmtField} into the payload`);
  }
}

// G7 maps the form's three work types onto the two clauses. `alteration` and
// `replacement` are both modifications; only `extension` is Clause 45.
const g7 = readFileSync(`${DIR}/FAG7Declaration.tsx`, 'utf8').replace(/\s+/g, ' ');
for (const [needle, why] of [
  ["'extension'", 'the extension branch'],
  ['Clause 45', 'Clause 45 for extensions'],
  ['Clause 46', 'Clause 46 for modifications'],
]) {
  if (!g7.includes(needle)) problems.push(`G7 (FAG7Declaration.tsx): lost ${why}`);
}

if (problems.length) {
  console.error('✘ BS 5839-1:2025 Annex G statements of conformity — problems found:\n');
  for (const p of problems) console.error(`  • ${p}`);
  console.error(
    '\nAnnex G requires the model certificates\' statements of conformity to be present.\n' +
      'If you changed a declaration screen, change the matching PDFMonkey template too —\n' +
      'the wording signed on screen and the wording on the certificate must be one sentence.'
  );
  process.exit(1);
}

console.log(
  `✔ ${CERTS.length} fire alarm declarations carry the BS 5839-1:2025 Annex G ` +
    'statements of conformity — attribution, knowledge and belief, scope, variations, liability'
);
