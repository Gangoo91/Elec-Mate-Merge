#!/usr/bin/env node
/**
 * check:routine-inspection
 * ─────────────────────────────────────────────────────────────────────────────
 * Guards two contracts on the routine inspection report: which fields may
 * survive a DUPLICATE, and which legal duty each visit type may cite.
 *
 * THE FAILURE THIS EXISTS TO CATCH (the ELE-1443 shape):
 * `duplicateCertificate` keeps everything it is not explicitly told to strip.
 * So the moment somebody adds a field to `RoutineInspectionFormData` and does
 * not think about duplicate, that field silently carries LAST YEAR'S ANSWER
 * onto a brand-new visit — on a document someone signs. Nothing fails, nothing
 * warns, and the wrong value looks exactly like a right one.
 *
 * The rule enforced here: every field on the form is classified, deliberately,
 * as one of three things.
 *
 *   STRIPPED — belongs to the visit that happened. Must not carry.
 *   KEPT     — identity the universal strip removes, that this type puts back
 *              because the re-visit is the SAME property.
 *   CARRIED  — setup or the engineer's own kit. Listed below, by name, so that
 *              carrying it is a decision on the record rather than a default.
 *
 * A new field matches none of the three and this fails. That is the point:
 * the answer is usually obvious, and it takes ten seconds — but only if
 * somebody is asked the question.
 */

import { readFileSync, unlinkSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';
import { tmpdir } from 'node:os';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const TYPES = 'src/types/routine-inspection.ts';
const DUP = 'src/utils/duplicateCertificate.ts';
const FMT = 'src/utils/routineInspectionJsonFormatter.ts';
const TPL = 'supabase/functions/generate-routine-inspection-pdf/template.html';
const read = (p) => readFileSync(resolve(root, p), 'utf8');

/**
 * ── THE LEGAL FRAMING CONTRACT ───────────────────────────────────────────────
 *
 * A landlord visit and a commercial maintenance visit evidence DIFFERENT duties,
 * and the report states which in two separate places — the masthead line
 * (`metadata.legal_basis`) and the printed limitations paragraph
 * (`routineInspectionLimitations`). Both are signed by a named person.
 *
 * 🔴 THIS HAS ALREADY GONE WRONG TWICE. The report shipped citing EAWR 1989
 * Reg 4(2) — the duty on a dutyholder to maintain systems AT WORK — on every
 * report including a tenant's home, and when the masthead was fixed the
 * limitations paragraph was still doing it. Neither failed a type check, a lint
 * or a render: it is prose, and prose that is confidently wrong looks exactly
 * like prose that is right.
 *
 * So the phrases are asserted here, per visit type, in both places.
 */
const LEGAL_CONTRACT = [
  {
    where: 'routineInspectionLimitations (printed on the report)',
    src: TYPES,
    marker: 'export function routineInspectionLimitations',
  },
  {
    where: 'metadata.legal_basis (PDF masthead)',
    src: FMT,
    marker: 'legal_basis:',
  },
];

/*
 * Each entry is one citation that must be present on its own side and absent
 * from the other. Inner arrays are ACCEPTABLE SPELLINGS of the same citation —
 * the masthead is a subtitle with a line of space and abbreviates to "EAWR
 * 1989", while the limitations paragraph spells it out. Both are the same
 * statute, and a check that insisted on one spelling would be reporting a
 * house-style preference as a legal error.
 */
const LANDLORD_ONLY = [['Landlord and Tenant Act 1985'], ['Housing (Scotland) Act 2014']];
const COMMERCIAL_ONLY = [
  ['Electricity at Work Regulations 1989', 'EAWR 1989'],
  ['Regulation 4(2)'],
];
const shows = (text, spellings) => spellings.some((p) => text.includes(p));
/** A fully-answered schedule for the given visit type, so a test case's verdict
 *  is driven only by the finding under test. */
const itemsFor = (m, visitType) =>
  m.itemsForVisitType(visitType).map((i) => ({ ...i, outcome: 'satisfactory' }));
const name = (spellings) => spellings[0];

/**
 * Fields that carry, ON PURPOSE.
 *
 * Two kinds only: the property's own spec (it has not moved or changed supply
 * since last year) and the engineer's own kit and identity (retyping your own
 * torque wrench every visit is the tedium duplicate exists to remove).
 *
 * 🔴 Adding a name here is a decision that last year's value is still true this
 * year. If it describes what happened ON THE DAY, it belongs in the strip list.
 */
const DELIBERATELY_CARRIED = new Set([
  // What kind of visit it is. Next year's visit to the same rented flat is the
  // same kind of visit, so this carries — but note that `inspectionItems` is
  // stripped, so the copy arrives with a visit type and NO schedule. The form's
  // loader reconciles the two (see RoutineInspectionReport); without that, a
  // duplicated commercial visit would open with the landlord schedule.
  'visitType',
  // The property — unchanged between visits.
  'premisesType',
  'dwellingType',
  'supplyType',
  'boardsCovered',
  // Who manages it and what they call it. The whole point of a re-visit is that
  // this is the same property for the same landlord, so retyping the agent and
  // the portfolio reference every year is the tedium duplicate removes.
  'lettingAgent',
  'propertyReference',
  // The EICR is five-yearly, so next year's visit is almost always looking at
  // the SAME report — carrying the dates means the compliance panel is already
  // right, and wrong only in the year it actually changes, where the inspector
  // is being handed a new certificate anyway.
  'eicrDate',
  'eicrNextDue',
  // The engagement — the same contract, year on year.
  'purpose',
  'extent',
  // The engineer's own kit and practice.
  // The test instrument belongs to the ELECTRICIAN, not to the property — the
  // same distinction TYPE_SPECIFIC_FIELDS_TO_STRIP draws between an MFT serial
  // and the serial of kit bolted to a customer's wall. Retyping your own MFT
  // and its calibration date on every visit is the tedium duplicate removes.
  'testInstrument',
  'testInstrumentSerial',
  'testInstrumentCalDate',
  'torqueChecked',
  'torqueInstrument',
  'torqueSettings',
  'thermalSurveyCarriedOut',
  'surveyMode',
  'thermalCamera',
  'thermographerQualification',
  // The engineer.
  'inspectorName',
  'inspectorPosition',
  'companyName',
]);

/* Handled by the duplicate flow itself rather than by a list: the certificate
   number is reissued, and `_clientCertId` is stripped universally so the copy's
   first save is not mistaken for the original's (ELE-1592). */
const HANDLED_ELSEWHERE = new Set(['certificateNumber', '_clientCertId']);

/** Field names declared on the RoutineInspectionFormData interface. */
function formFields(src) {
  const start = src.indexOf('export interface RoutineInspectionFormData');
  if (start === -1) throw new Error(`Could not find RoutineInspectionFormData in ${TYPES}`);
  // Walk braces so a nested object type cannot end the block early.
  const open = src.indexOf('{', start);
  let depth = 0;
  let end = -1;
  for (let i = open; i < src.length; i++) {
    if (src[i] === '{') depth++;
    else if (src[i] === '}') {
      depth--;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }
  if (end === -1) throw new Error('Unbalanced braces in RoutineInspectionFormData');
  const body = src.slice(open + 1, end);
  const withoutComments = body.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g, '');
  const fields = new Set();
  // Only top-level members: depth 0 within the interface body.
  let d = 0;
  for (const line of withoutComments.split('\n')) {
    const trimmed = line.trim();
    if (d === 0) {
      const m = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)\??\s*:/);
      if (m) fields.add(m[1]);
    }
    d += (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
  }
  return fields;
}

/**
 * Quoted strings inside a balanced bracket pair starting at `open`.
 *
 * ⚠️ `open` must be the real opening bracket. Searching for the first `[` after
 * a declaration finds the one in `readonly string[]` — an empty pair that
 * closes immediately, yielding nothing and a guard that passes while checking
 * NOTHING. That is precisely the silent-pass this file exists to prevent, so it
 * happened here first; see `arrayAfter` and `recordEntry` below.
 */
function literalsFrom(src, open, what) {
  let depth = 0;
  let end = -1;
  for (let i = open; i < src.length; i++) {
    if (src[i] === '[') depth++;
    else if (src[i] === ']') {
      depth--;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }
  if (end === -1) throw new Error(`Unbalanced brackets in ${what}`);
  const block = src
    .slice(open, end)
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/[^\n]*/g, '');
  const found = new Set([...block.matchAll(/'([^']+)'/g)].map((m) => m[1]));
  if (found.size === 0) throw new Error(`${what} resolved to an EMPTY list — extractor is wrong`);
  return found;
}

/** A top-level `const NAME = [ ... ]` array. */
function arrayAfter(src, name) {
  const at = src.indexOf(`const ${name}`);
  if (at === -1) throw new Error(`Could not find ${name} in ${DUP}`);
  const eq = src.indexOf('=', at);
  const open = src.indexOf('[', eq);
  if (open === -1) throw new Error(`No array literal for ${name}`);
  return literalsFrom(src, open, name);
}

/** One `'key': [ ... ]` entry inside a named record, found within that record. */
function recordEntry(src, recordName, key) {
  const at = src.indexOf(`const ${recordName}`);
  if (at === -1) throw new Error(`Could not find ${recordName} in ${DUP}`);
  // Start after the type annotation so `Record<..., readonly string[]>` is skipped.
  const body = src.indexOf('= {', at);
  if (body === -1) throw new Error(`No object literal for ${recordName}`);
  const entry = src.indexOf(`'${key}':`, body);
  if (entry === -1) throw new Error(`${recordName} has no '${key}' entry`);
  const open = src.indexOf('[', entry);
  if (open === -1) throw new Error(`${recordName}['${key}'] is not an array`);
  return literalsFrom(src, open, `${recordName}['${key}']`);
}

const typesSrc = read(TYPES);
const dupSrc = read(DUP);

const fields = formFields(typesSrc);
const universal = arrayAfter(dupSrc, 'IDENTITY_FIELDS_TO_STRIP');
const typeStrip = recordEntry(dupSrc, 'TYPE_SPECIFIC_FIELDS_TO_STRIP', 'routine-inspection');
const typeKeep = recordEntry(dupSrc, 'TYPE_SPECIFIC_FIELDS_TO_KEEP', 'routine-inspection');

const problems = [];

/* 1 — every form field is classified. */
const unclassified = [...fields].filter(
  (f) =>
    !universal.has(f) &&
    !typeStrip.has(f) &&
    !typeKeep.has(f) &&
    !DELIBERATELY_CARRIED.has(f) &&
    !HANDLED_ELSEWHERE.has(f)
);
if (unclassified.length) {
  problems.push(
    `${unclassified.length} field(s) on RoutineInspectionFormData are not classified for duplicate:\n` +
      unclassified.map((f) => `      • ${f}`).join('\n') +
      `\n\n    Decide for each one: does it describe THE VISIT THAT HAPPENED (add it to\n` +
      `    TYPE_SPECIFIC_FIELDS_TO_STRIP['routine-inspection'] in ${DUP}), or is it the\n` +
      `    property's spec or your own kit (add it to DELIBERATELY_CARRIED in this script)?`
  );
}

/* 2 — the strip and keep lists cannot disagree about the same field. */
const contradiction = [...typeKeep].filter((f) => typeStrip.has(f));
if (contradiction.length) {
  problems.push(
    `Field(s) both kept and stripped for routine-inspection: ${contradiction.join(', ')}.\n` +
      `    The keep pass runs last so it would win, which makes the strip entry a lie.`
  );
}

/* 3 — every name in either list is a real field. A typo is invisible at runtime:
       `delete cloned['inpsectionItems']` removes nothing and reports nothing. */
const ghosts = [...typeStrip, ...typeKeep].filter((f) => !fields.has(f));
if (ghosts.length) {
  problems.push(
    `Name(s) in the routine-inspection strip/keep lists are not fields on the form: ${ghosts.join(', ')}.\n` +
      `    A misspelt key deletes nothing and throws nothing — the field carries silently.`
  );
}

/* 4 — the findings must never carry. Stated separately from rule 1 because this
       is the one that puts an unwalked schedule onto a signed report: the page
       gates issue on `answered > 0`, and a carried schedule is already past it. */
for (const critical of ['inspectionItems', 'observations', 'anomalies']) {
  if (!typeStrip.has(critical)) {
    problems.push(
      `'${critical}' is no longer stripped for routine-inspection.\n` +
        `    A duplicate would open with last year's visit already answered, and the\n` +
        `    guard that stops an unwalked report being issued would already be satisfied.`
    );
  }
}

/* 5 — the next-visit date must reach the column the recall reads. */
if (!/nextInspectionDue:\s*string/.test(typesSrc)) {
  problems.push(
    `RoutineInspectionFormData no longer declares 'nextInspectionDue'.\n` +
      `    sync_report_next_due() fills reports.next_inspection_due from that key and no\n` +
      `    other, and it is what the daily re-inspection reminder reads. Renaming it\n` +
      `    silently stops the visit ever asking to be rebooked.`
  );
}
if (!universal.has('nextInspectionDue')) {
  problems.push(
    `'nextInspectionDue' is missing from IDENTITY_FIELDS_TO_STRIP.\n` +
      `    Every duplicable type would carry the previous job's re-inspection date.`
  );
}

/* ── 6 — each visit type cites its own duty, in BOTH places it is stated. ──
 *
 * 🔴 BY EXECUTION, NOT BY READING THE SOURCE.
 *
 * The first version of this check tried to split the landlord branch from the
 * commercial one by matching indentation in the file, and reported three
 * failures against code that was correct. A guard that cries wolf gets deleted,
 * and then the thing it guards breaks for real. So it bundles the actual
 * modules and asks them what they print.
 */
const { build } = await import('esbuild');
const tmp = resolve(tmpdir(), `routine-legal-${process.pid}.mjs`);
try {
  await build({
    stdin: {
      contents: `
        export { routineInspectionLimitations } from '@/types/routine-inspection';
        export { effectiveSpotChecks } from '@/types/routine-inspection';
        export { formatRoutineInspectionJson } from '@/utils/routineInspectionJsonFormatter';
        export { getDefaultRoutineInspectionFormData } from '@/types/routine-inspection';
      `,
      resolveDir: root,
      loader: 'ts',
    },
    bundle: true,
    format: 'esm',
    platform: 'node',
    outfile: tmp,
    alias: { '@': resolve(root, 'src') },
    logLevel: 'silent',
  });

  const mod = await import(pathToFileURL(tmp).href);
  const stated = (visitType) => {
    const form = { ...mod.getDefaultRoutineInspectionFormData(), visitType };
    return {
      'the printed limitations': mod.routineInspectionLimitations(visitType),
      'the PDF masthead': mod.formatRoutineInspectionJson(form, null).metadata.legal_basis,
    };
  };

  const landlord = stated('landlord');
  const commercial = stated('commercial');

  for (const where of Object.keys(landlord)) {
    for (const spellings of LANDLORD_ONLY) {
      if (!shows(landlord[where], spellings))
        problems.push(`${where}: a landlord report no longer cites ${name(spellings)}.`);
      if (shows(commercial[where], spellings))
        problems.push(
          `${where}: a COMMERCIAL report cites ${name(spellings)}.\n` +
            `    That is the repairing duty on a landlord. It does not bind a commercial dutyholder.`
        );
    }
    for (const spellings of COMMERCIAL_ONLY) {
      if (!shows(commercial[where], spellings))
        problems.push(`${where}: a commercial report no longer cites ${name(spellings)}.`);
      if (shows(landlord[where], spellings))
        problems.push(
          `${where}: a LANDLORD report cites ${name(spellings)}.\n` +
            `    EAWR is the duty to maintain systems AT WORK. It is not what binds a\n` +
            `    landlord over a tenant's home, and this report is signed by a named person.`
        );
    }
    // 🔴 The readings and the limitations paragraph move together or the
    // report contradicts itself. The categorical "no verification testing was
    // carried out" sentence is FALSE the moment one reading is recorded, and
    // it is printed over somebody's signature.
    if (where === 'the printed limitations') {
      const withChecks = mod.routineInspectionLimitations(
        where === 'the printed limitations' ? (landlord[where] === commercial[where] ? 'landlord' : 'landlord') : 'landlord',
        true
      );
      if (/No verification testing was carried out/i.test(withChecks)) {
        problems.push(
          `the printed limitations: still claims no testing was carried out when readings ARE recorded.\n` +
            `    That sentence is false on a report carrying an RCD trip time.`
        );
      }
      if (!/not a sampling|no sampling plan/i.test(withChecks)) {
        problems.push(
          `the printed limitations: no longer disclaims sampling.\n` +
            `    In BS 7671/GN3 "sampling" is periodic-inspection machinery whose results belong\n` +
            `    on a Schedule of Test Results — this document must say it did none.`
        );
      }
      if (!/not a schedule of test results/i.test(withChecks)) {
        problems.push(`the printed limitations: no longer disclaims being a schedule of test results.`);
      }
      // The word may appear only to deny it.
      for (const m of withChecks.match(/[^.]*sampling[^.]*/gi) ?? []) {
        if (!/\b(not a|no)\b[^.]*sampling/i.test(m)) {
          problems.push(`the printed limitations: "sampling" used without negating it — "${m.trim().slice(0, 70)}…"`);
        }
      }
    }

    // Whatever else changes, neither report may stop disclaiming the EICR.
    for (const [kind, text] of [['landlord', landlord[where]], ['commercial', commercial[where]]]) {
      if (!/not an Electrical Installation Condition Report|Not an EICR/i.test(text))
        problems.push(`${where}: a ${kind} report no longer says it is not an EICR.`);
    }
  }
} catch (err) {
  problems.push(
    `The legal framing check could not run: ${err.message}\n` +
      `    It is the check that matters most here — fix it rather than skipping it.`
  );
} finally {
  try { unlinkSync(tmp); } catch { /* best effort */ }
}

/* ── 7 — the PDF template must READ the duty line, not hard-code one. ──
 *
 * ⚠️ The LIVE PDFMonkey template is the source of truth and this repo file is a
 * seed, so this guards intent rather than production. It still catches the
 * exact regression that shipped: a masthead printing "Supports EAWR 1989
 * Regulation 4(2)" as a literal on every report, including a tenant's home.
 */
{
  const tpl = read(TPL);
  const masthead = tpl.slice(tpl.indexOf('class="doc-sub"'), tpl.indexOf('class="doc-ref"'));
  if (!masthead.includes('metadata.legal_basis')) {
    problems.push(
      `${TPL}: the masthead no longer prints {{ metadata.legal_basis }}.\n` +
        `    A duty line written into the template is the same statute on every report,\n` +
        `    whoever it was written for.`
    );
  }
  for (const literal of ['Supports EAWR 1989 Regulation 4(2)', 'Electricity at Work Regulations 1989']) {
    if (masthead.includes(literal)) {
      problems.push(`${TPL}: the masthead hard-codes "${literal}" again.`);
    }
  }
}

/* ── 8 — "what needs doing" can never contradict the verdict. ──
 *
 * The verdict is UNSATISFACTORY for a C1, a C2 **or a thermal Priority 1**.
 * Built from observations alone the action list omitted the thermal case, so a
 * survey whose only urgent finding was a P1 printed "Nothing requires action"
 * directly beneath the word UNSATISFACTORY. Executed, not read.
 */
try {
  const { build: build2 } = await import('esbuild');
  const tmp2 = resolve(tmpdir(), `routine-actions-${process.pid}.mjs`);
  await build2({
    stdin: {
      contents: `
        export { formatRoutineInspectionJson } from '@/utils/routineInspectionJsonFormatter';
        export { getDefaultRoutineInspectionFormData } from '@/types/routine-inspection';
        export { itemsForVisitType } from '@/data/routineInspectionItems';
      `,
      resolveDir: root,
      loader: 'ts',
    },
    bundle: true, format: 'esm', platform: 'node', outfile: tmp2,
    alias: { '@': resolve(root, 'src') }, logLevel: 'silent',
  });
  const m = await import(pathToFileURL(tmp2).href);
  const ok = itemsFor(m, 'commercial');

  const cases = [
    ['a C1 observation', { observations: [{ id: '1', code: 'C1', location: 'x', description: 'd', photos: [] }] }],
    ['a C2 observation', { observations: [{ id: '1', code: 'C2', location: 'x', description: 'd', photos: [] }] }],
    ['a thermal Priority 1', {
      thermalSurveyCarriedOut: true, surveyMode: 'quantitative',
      anomalies: [{ id: 'a', location: 'x', description: 'd', measuredTemp: '71', referenceTemp: '24', reference: 'ambient', priority: '1' }],
    }],
  ];
  for (const [label, extra] of cases) {
    const p = m.formatRoutineInspectionJson(
      { ...m.getDefaultRoutineInspectionFormData(), visitType: 'commercial', inspectionItems: ok, ...extra },
      null
    );
    const unsat = /unsatisfactory/i.test(p.outcome.assessment);
    if (unsat && !p.has_actions) {
      problems.push(
        `With ${label} the verdict is UNSATISFACTORY but the report says nothing\n` +
          `    requires action. Those two statements sit within an inch of each other on page 1.`
      );
    }
  }
  try { unlinkSync(tmp2); } catch { /* best effort */ }
} catch (err) {
  problems.push(`The actions/verdict agreement check could not run: ${err.message}`);
}

if (problems.length) {
  console.error(`\n✖ check:routine-inspection — ${problems.length} problem(s)\n`);
  for (const p of problems) console.error(`  ${p}\n`);
  process.exit(1);
}

console.log(
  `✓ check:routine-inspection — ${fields.size} form fields all classified ` +
    `(${typeStrip.size} stripped for this type, ${typeKeep.size} kept, ` +
    `${DELIBERATELY_CARRIED.size} carried by decision); ` +
    `legal framing distinct in ${LEGAL_CONTRACT.length} places; ` +
    `template + actions/verdict agreement checked`
);
