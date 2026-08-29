/**
 * Extraction schemas for importing a paper / PDF certificate (ELE-1368).
 *
 * ── 🔴 WHY THESE ARE A CURATED SUBSET, NOT THE WHOLE FORM ─────────────────
 * The EICR formatter emits 535 payload keys and returns 657 leaf paths. Asking
 * a vision model to fill 657 fields in one pass does not produce a usable
 * result — it produces a plausible one, which on a certificate is worse.
 *
 * So each schema below is a deliberately small, high-value set: the identity
 * and supply particulars that are genuinely legible on a scanned form and that
 * save the most retyping. The circuit-by-circuit schedule of test results is
 * NOT here — that is ELE-1607's problem (handwritten grids) and belongs in a
 * second pass through the board-scanner pipeline, not this one.
 *
 * ── 🔴 THE OUTPUT IS A DRAFT PROPOSAL, NEVER A CERTIFICATE ────────────────
 * Nothing here is signed, and nothing is written straight onto a report. The
 * electrician reviews every field before it becomes anything. Per-field
 * confidence exists so the review UI can point at the three fields worth
 * checking instead of making them re-read all thirty — which is the difference
 * between this saving time and merely moving the typing around.
 */

export type CertImportType = 'eicr' | 'eic' | 'minor-works';

export const CERT_IMPORT_TYPES: CertImportType[] = ['eicr', 'eic', 'minor-works'];

/**
 * Short names, for warning copy. "This looks like an EICR, not a Minor Works
 * Certificate" reads better in a banner than the full form titles — and the
 * articles are baked in, because a template that says "a EICR" undermines the
 * warning it is trying to deliver.
 */
export const CERT_IMPORT_SHORT: Record<CertImportType, string> = {
  eicr: 'an EICR',
  eic: 'an EIC',
  'minor-works': 'a Minor Works Certificate',
};

export const CERT_IMPORT_LABEL: Record<CertImportType, string> = {
  eicr: 'Electrical Installation Condition Report',
  eic: 'Electrical Installation Certificate',
  'minor-works': 'Minor Electrical Installation Works Certificate',
};

/** A field the model is asked to find. `key` matches the form's own field name. */
interface ImportField {
  key: string;
  /** Plain-English description, shown to the model AND used as the review label. */
  label: string;
  /** Extra steer for the model where the paper form's wording differs. */
  hint?: string;
}

/*
 * Shared across all three BS 7671 model forms. The wording follows the printed
 * forms rather than our internal names, because the model is reading the paper,
 * not our codebase.
 */
const IDENTITY: ImportField[] = [
  { key: 'certificateNumber', label: 'Certificate or report reference number' },
  { key: 'clientName', label: 'Client / person ordering the work' },
  { key: 'clientAddress', label: 'Client address' },
  { key: 'installationAddress', label: 'Address of the installation', hint: 'Often labelled "Installation address" or "Details of the installation".' },
  { key: 'occupier', label: 'Occupier, where stated' },
];

const SUPPLY: ImportField[] = [
  { key: 'earthingArrangement', label: 'Earthing arrangement', hint: 'TN-S, TN-C-S, TT or IT.' },
  { key: 'nominalVoltage', label: 'Nominal voltage U or U0, in volts' },
  { key: 'nominalFrequency', label: 'Nominal frequency, in Hz' },
  { key: 'ze', label: 'External earth fault loop impedance Ze, in ohms', hint: 'Under "Supply characteristics" — a measured value, copy it exactly as printed.' },
  { key: 'prospectiveFaultCurrent', label: 'Prospective fault current Ipf, in kA' },
  { key: 'mainSwitchRating', label: 'Main switch / main circuit-breaker rating, in amperes' },
  { key: 'mainSwitchLocation', label: 'Location of the main switch or consumer unit' },
  { key: 'numberOfPhases', label: 'Number of phases', hint: 'Single-phase or three-phase.' },
];

const SIGNATORY: ImportField[] = [
  { key: 'inspectorName', label: 'Name of the person who signed the certificate' },
  { key: 'companyName', label: 'Trading title of the contractor' },
  { key: 'companyAddress', label: 'Contractor address' },
  { key: 'registrationScheme', label: 'Registration body', hint: 'NICEIC, NAPIT, ELECSA, STROMA or similar, where printed.' },
  { key: 'registrationNumber', label: 'Registration or enrolment number' },
];

/**
 * Per-type fields. Deliberately different: an EICR has an outcome and an
 * observations list; an EIC records new work; minor works records one job.
 */
const PER_TYPE: Record<CertImportType, ImportField[]> = {
  eicr: [
    { key: 'inspectionDate', label: 'Date of the inspection', hint: 'ISO format, YYYY-MM-DD.' },
    { key: 'nextInspectionDate', label: 'Recommended date of the next inspection' },
    { key: 'purposeOfReport', label: 'Purpose for which the report is required' },
    { key: 'extentOfInstallation', label: 'Extent of the installation covered' },
    { key: 'limitations', label: 'Agreed limitations' },
    { key: 'overallAssessment', label: 'Overall assessment', hint: 'SATISFACTORY or UNSATISFACTORY exactly as ticked.' },
    { key: 'estimatedAge', label: 'Estimated age of the installation, in years' },
    { key: 'evidenceOfAlterations', label: 'Evidence of alterations or additions, and their age' },
  ],
  eic: [
    { key: 'inspectionDate', label: 'Date of inspection and testing' },
    { key: 'nextInspectionDate', label: 'Recommended interval to the next inspection' },
    { key: 'descriptionOfWork', label: 'Description of the installation work' },
    { key: 'extentOfInstallation', label: 'Extent of the installation covered' },
    { key: 'departures', label: 'Details of any departures from BS 7671' },
    { key: 'designerName', label: 'Name of the designer' },
    { key: 'constructorName', label: 'Name of the constructor' },
    { key: 'testerName', label: 'Name of the inspector and tester' },
  ],
  'minor-works': [
    { key: 'workDate', label: 'Date the minor works were completed' },
    { key: 'descriptionOfWork', label: 'Description of the minor works' },
    { key: 'circuitDescription', label: 'Description of the circuit altered or extended' },
    { key: 'protectiveDeviceType', label: 'Type and rating of the protective device for that circuit' },
    { key: 'earthFaultLoopImpedance', label: 'Measured earth fault loop impedance Zs, in ohms' },
    { key: 'insulationResistance', label: 'Measured insulation resistance, in megohms' },
    { key: 'rcdOperatingTime', label: 'Measured RCD operating time, in milliseconds' },
    { key: 'comments', label: 'Comments on the existing installation' },
  ],
};

export function fieldsFor(type: CertImportType): ImportField[] {
  /*
   * Minor works forms carry far less supply detail than an EICR or EIC — the
   * printed form has no Ze/Ipf block. Asking for fields the paper cannot
   * contain invites the model to invent them, so they are simply not requested.
   */
  const supply = type === 'minor-works' ? [] : SUPPLY;
  return [...IDENTITY, ...supply, ...PER_TYPE[type], ...SIGNATORY];
}

/**
 * The Gemini `responseSchema`.
 *
 * 🔴 Every value is typed STRING, including the numeric ones, on purpose. A
 * scanned form contains "0.35Ω", "<1", "N/A", "2.5 / 1.5" and blanks. Typing
 * them as numbers forces the model to either coerce or drop them, and a
 * silently coerced measurement on a certificate is exactly the kind of
 * plausible-but-wrong value this whole flow exists to avoid. Parsing is the
 * reviewer's job, with the original in front of them.
 */
export function responseSchemaFor(type: CertImportType) {
  const fields = fieldsFor(type);
  const properties: Record<string, unknown> = {};
  const confidence: Record<string, unknown> = {};
  for (const f of fields) {
    properties[f.key] = { type: 'string', description: f.hint ? `${f.label}. ${f.hint}` : f.label };
    confidence[f.key] = { type: 'number', description: `0-1 confidence for ${f.key}.` };
  }
  return {
    type: 'object',
    properties: {
      /*
       * 🔴 THE MISMATCH GUARD. The user tells us what they are uploading, but
       * somebody migrating a shoebox of old paperwork will mis-sort one. If the
       * model's own reading disagrees with the selection we stop and ask,
       * rather than mapping an EIC onto an EICR and producing a confidently
       * wrong certificate.
       */
      detected_document_type: {
        type: 'string',
        enum: ['eicr', 'eic', 'minor-works', 'other', 'unreadable'],
        description:
          'What this document actually is, judged from its printed title and layout alone — ignore what you were told it is.',
      },
      detected_confidence: { type: 'number', description: '0-1 confidence in detected_document_type.' },
      fields: { type: 'object', properties, description: 'Extracted values, verbatim. Empty string if not present.' },
      field_confidence: { type: 'object', properties: confidence },
      unreadable_fields: {
        type: 'array',
        items: { type: 'string' },
        description: 'Field keys that are present on the form but could not be read.',
      },
      notes: { type: 'string', description: 'Anything the reviewer should know: poor scan, ambiguity, handwriting.' },
    },
    required: ['detected_document_type', 'detected_confidence', 'fields'],
  };
}

/* ═══════════════════════════════════════════════════════════════════════════
 * DETERMINISTIC VALIDATION
 *
 * 🔴 Confidence is not enough on its own.
 *
 * On a degraded scan every field came back at 1.0 — the model was certain, and
 * right, but certainty is not evidence. A misread "0.35" as "035", or a UK date
 * read as US, arrives with the same 0.99 as everything else. These checks are
 * code, not judgement: they either parse or they do not.
 *
 * Nothing here BLOCKS. A warning marks the field for the reviewer, because the
 * paper is the authority and an odd-looking value may simply be what it says.
 * ═══════════════════════════════════════════════════════════════════════════ */

const DATE_FIELDS = ['inspectionDate', 'nextInspectionDate', 'workDate'];
const NUMERIC_FIELDS = [
  'ze', 'prospectiveFaultCurrent', 'mainSwitchRating', 'nominalVoltage',
  'nominalFrequency', 'earthFaultLoopImpedance', 'insulationResistance',
  'rcdOperatingTime',
];
/** The only earthing arrangements BS 7671 defines. */
const EARTHING = ['TN-S', 'TN-C-S', 'TT', 'IT', 'TN-C'];

export interface Validated {
  values: Record<string, string>;
  warnings: Record<string, string>;
  /**
   * 🔴 Is this certificate already past its own next-inspection date?
   *
   * Importing a back-catalogue means importing HISTORY, and most of it is
   * expired — measured on live data, 371 EICR/EIC are already past due. The
   * renewal cron only ever looks forward (`>= today`), so every one of those is
   * invisible to it: a property that legally needs re-testing, and a job nobody
   * is being told about.
   *
   * Surfacing it at import is the one moment the electrician is looking
   * straight at the certificate and can act on it.
   */
  overdue: { is: boolean; date: string; years: number } | null;
}

export function validateExtraction(fields: Record<string, string>): Validated {
  const values = { ...fields };
  const warnings: Record<string, string> = {};

  for (const key of DATE_FIELDS) {
    const v = values[key];
    if (!v) continue;
    if (/^\d{4}-\d{2}-\d{2}$/.test(v)) {
      /*
       * ⚠️ ROUND-TRIP, do not just check for NaN.
       *
       * `new Date('2026-02-31')` does not fail — JavaScript rolls it forward to
       * 3 March and hands back a perfectly valid Date. So an impossible date
       * read off a form passes every obvious test and lands on the certificate
       * three days out. The only reliable check is whether formatting it back
       * gives the same string.
       */
      const d = new Date(`${v}T00:00:00Z`);
      if (Number.isNaN(d.getTime()) || d.toISOString().slice(0, 10) !== v) {
        warnings[key] = 'That is not a real date — check it against the document.';
      }
      continue;
    }
    /*
     * A UK form writes 03/04/2024 for 3 April. Read as US it becomes 4 March —
     * silently, and eleven months out. Converted here on the UK reading, and
     * flagged either way so somebody looks.
     */
    const uk = v.match(/^(\d{1,2})[/.-](\d{1,2})[/.-](\d{2,4})$/);
    if (uk) {
      const [, d, m, y] = uk;
      const year = y.length === 2 ? `20${y}` : y;
      values[key] = `${year}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
      warnings[key] = 'Read as a UK date (day first). Check the day and month are the right way round.';
    } else {
      warnings[key] = 'Could not be read as a date — check it.';
    }
  }

  /* Next inspection before the inspection itself is always wrong. */
  const from = values.inspectionDate || values.workDate;
  if (from && values.nextInspectionDate && values.nextInspectionDate <= from) {
    warnings.nextInspectionDate =
      'This is on or before the date of inspection, which cannot be right.';
  }

  for (const key of NUMERIC_FIELDS) {
    const v = values[key];
    if (v && !/\d/.test(v)) {
      warnings[key] = 'No number in this value — check it against the document.';
    }
  }

  const ea = values.earthingArrangement;
  if (ea) {
    const upper = ea.toUpperCase().replace(/\s+/g, '');
    const hit = EARTHING.find((e) => upper.includes(e.replace(/-/g, '')) || upper.includes(e));
    if (!hit) {
      warnings.earthingArrangement =
        'Not one of TN-S, TN-C-S, TT or IT — check what the document says.';
    }
  }

  const oa = values.overallAssessment;
  if (oa && !/^(satisfactory|unsatisfactory)$/i.test(oa.trim())) {
    warnings.overallAssessment =
      'Should read SATISFACTORY or UNSATISFACTORY — check which box is ticked.';
  }

  /* ── Overdue read ─────────────────────────────────────────────────── */
  let overdue: Validated['overdue'] = null;
  const due = values.nextInspectionDate;
  if (/^\d{4}-\d{2}-\d{2}$/.test(due ?? '')) {
    const dueMs = Date.parse(`${due}T00:00:00Z`);
    const nowMs = Date.now();
    if (Number.isFinite(dueMs) && dueMs < nowMs) {
      overdue = {
        is: true,
        date: due,
        years: Math.round(((nowMs - dueMs) / 31_557_600_000) * 10) / 10,
      };
    }
  }

  return { values, warnings, overdue };
}

/* ═══════════════════════════════════════════════════════════════════════════
 * SECOND PASS — VERIFICATION, NOT RE-EXTRACTION
 *
 * 🔴 Running the extraction twice and comparing proves NOTHING. Measured: at
 * temperature 0 the same document returned byte-identical output on three
 * consecutive runs. A repeat always agrees, so it would double the cost and
 * hand back a false sense of having been checked — worse than no check at all,
 * because the agreement looks like evidence.
 *
 * So the second pass asks a DIFFERENT question. The first says "what does this
 * document say?"; this one says "here is a value — is that actually what the
 * document says?". Checking is not the same task as reading, and a confident
 * misreading that survives the first is not guaranteed to survive the second.
 *
 * It never overwrites. A disagreement is surfaced with BOTH readings so the
 * electrician decides, because either one of them could be the wrong one.
 * ═══════════════════════════════════════════════════════════════════════════ */

export type VerifyStatus = 'confirmed' | 'wrong' | 'not_found' | 'unclear';

/*
 * ⚠️ An ARRAY of checks, not an object keyed by field.
 *
 * The first cut declared every field as an optional property of one object.
 * Gemini filled in TWO of thirteen and returned — technically valid against the
 * schema, and useless: eleven fields came back with no verdict at all while the
 * response looked successful. A sparse object with dozens of optional keys is
 * an invitation to answer some of them. A list of {field, status} with the
 * field named in each row is a single repeated shape, and it gets filled.
 */
export function verifySchemaFor(_type: CertImportType) {
  return {
    type: 'object',
    properties: {
      checks: {
        type: 'array',
        description: 'One entry for EVERY value supplied — do not omit any.',
        items: {
          type: 'object',
          properties: {
            field: { type: 'string', description: 'The field key exactly as given.' },
            status: { type: 'string', enum: ['confirmed', 'wrong', 'not_found', 'unclear'] },
            suggested: { type: 'string', description: 'Only when status is "wrong": what the document actually says.' },
          },
          required: ['field', 'status'],
        },
      },
    },
    required: ['checks'],
  };
}

export function verifyPromptFor(
  type: CertImportType,
  values: Record<string, string>
): string {
  const lines = Object.entries(values)
    .map(([k, v]) => `- ${k}: "${v}"`)
    .join('\n');
  return `You are checking a transcription of a UK ${CERT_IMPORT_LABEL[type]} against the document itself.

Someone has read these values off the attached document:

${lines}

For EACH one, look at the document and say whether it is right:
- "confirmed" — the document says exactly this.
- "wrong" — the document says something different. Put what it actually says in "suggested".
- "not_found" — you cannot find this on the document at all.
- "unclear" — it is there but too unclear to confirm either way.

Judge each value on what you can see NOW. Do not assume the transcription is correct because
it looks plausible — a value that reads sensibly can still be a misreading, and that is
exactly what this check is for. Minor differences in spacing or letter case are "confirmed";
a different number, date, name or word is "wrong".

Return one entry for EVERY value listed above — all ${Object.keys(values).length} of them. Do not leave any out.`;
}

export function promptFor(type: CertImportType): string {
  const fields = fieldsFor(type);
  const list = fields.map((f) => `- ${f.key}: ${f.label}${f.hint ? ` (${f.hint})` : ''}`).join('\n');
  return `You are reading a UK electrical certificate so it can be copied into a digital system. The user says this is a ${CERT_IMPORT_LABEL[type]}.

Extract ONLY the fields listed below, exactly as they appear on the document.

${list}

Rules, all of which matter more than completeness:
- Transcribe verbatim. Do not tidy, convert units, expand abbreviations or reformat values. "0.35Ω" stays "0.35Ω".
- A cell filled with only a dash, slash or dots ("-", "–", "—", "/", "...") is EMPTY. Return an empty string for it, never the placeholder glyph. "N/A" or "None" written by hand IS an answer — keep those.
- If a field is blank, absent or you cannot read it, return an empty string. NEVER guess, infer or fill a value from typical practice. A blank the electrician fills in is fine; an invented measurement on a certificate is not.
- If a value is handwritten and ambiguous, return your best reading, give it a low confidence, and list the key in unreadable_fields.
- Dates: return ISO YYYY-MM-DD. UK forms are day/month/year — 03/04/2024 is 3 April 2024, not 4 March.
- Set detected_document_type from the document's own printed title and layout, independently of what you were told. Say 'other' if it is a different form, 'unreadable' if you cannot tell.
- field_confidence: 1.0 only for clearly printed text you are certain of. Handwriting should rarely exceed 0.8.`;
}


/* ═══════════════════════════════════════════════════════════════════════════
 * THE SCHEDULE OF TEST RESULTS
 *
 * 🔴 This is where the hours actually are. A certificate header is ~30 fields
 * and saves five minutes of typing. A schedule is 20-60 circuits across ~15
 * columns — 300 to 900 values — and saves an hour. It is also the part people
 * most dread re-keying, which is why it is the thing worth getting right.
 *
 * Field names below are the REAL ones, taken from 5,128 live circuit rows in
 * `data->scheduleOfTests` rather than invented, so an imported row drops
 * straight into the existing schedule with no mapping layer.
 *
 * ⚠️ Curated, like the header. The live rows carry 40+ keys, but many are
 * internal (`id`, `boardId`, `autoFilled`) or derived. Only what is actually
 * PRINTED on a BS 7671 schedule is requested — asking for a field the paper
 * cannot contain is an invitation to invent one.
 * ═══════════════════════════════════════════════════════════════════════════ */

interface ScheduleColumn {
  key: string;
  label: string;
}

/*
 * ⚠️ FOURTEEN COLUMNS, not the twenty-six the live rows can hold.
 *
 * Twenty-six columns across a ten-page document did not merely read badly — it
 * read ONE row of five, then timed out entirely when the prompt grew. The task
 * scales with rows × columns, and past a point the model stops rather than
 * finishes. Half the columns is not half the value: these are the ones that
 * take the longest to key in and appear on essentially every schedule.
 *
 * What was dropped and why: typeOfWiring / referenceMethod / pointsServed are
 * usually one repeated value the electrician sets once; ring r1/rn/r2 only
 * apply to ring finals; maxZs is looked up rather than measured; rcdType and
 * rcdBsStandard follow from the device. All remain editable in the schedule.
 */
/*
 * 🔴 CIRCUIT IDENTITY ONLY — NO TEST MEASUREMENTS. Both halves matter.
 *
 * ── Why not the measurements ──────────────────────────────────────────────
 * This import creates a DRAFT OF A NEW CERTIFICATE. Carrying Zs, R1+R2,
 * insulation resistance or RCD times off an old document would put somebody
 * else's readings, taken years ago, onto a certificate the current electrician
 * signs. That is the exact failure this whole feature is built to avoid: a
 * plausible value nobody measured. Re-testing means new readings, so the old
 * ones have no business being pre-filled.
 *
 * ── Why this is also what made it work ────────────────────────────────────
 * Fourteen columns produced output the model could not finish: at 12k tokens
 * the JSON truncated mid-string, at 48k it ran on until it timed out, and the
 * whole page was lost either way. Seven short fields per row is a fraction of
 * the output and lands cleanly.
 *
 * ── Why it does not duplicate the board scanner ───────────────────────────
 * The board scanner reads the PHYSICAL consumer unit — devices, ratings, ways —
 * and carries no measurements at all. It tells you what is in front of you now.
 * This tells you what the circuits were CALLED, which is the part that is
 * tedious to retype and is not visible on a board at all.
 */
const SCHEDULE_COLUMNS: ScheduleColumn[] = [
  { key: 'circuitNumber', label: 'Circuit number / way' },
  { key: 'circuitDescription', label: 'Circuit description' },
  { key: 'bsStandard', label: 'Protective device BS (EN) number' },
  { key: 'protectiveDeviceCurve', label: 'Device curve or type letter, e.g. B, C, D' },
  { key: 'protectiveDeviceRating', label: 'Device rating in amperes' },
  { key: 'liveSize', label: 'Live conductor csa in mm²' },
  { key: 'cpcSize', label: 'cpc csa in mm²' },
];

export function scheduleSchemaFor() {
  const properties: Record<string, unknown> = {};
  for (const c of SCHEDULE_COLUMNS) {
    properties[c.key] = { type: 'string', description: c.label };
  }
  return {
    type: 'object',
    properties: {
      circuits: {
        type: 'array',
        description: 'One entry per circuit ROW on the schedule, in the order printed.',
        items: { type: 'object', properties, required: ['circuitNumber'] },
      },
      /*
       * Asked for explicitly rather than inferred from `circuits.length`. A
       * model that read 12 of 20 rows still returns a well-formed array of 12,
       * and there is nothing in that array to say 8 are missing. Comparing the
       * two is the only way to notice a truncated read.
       */
      rows_seen: {
        type: 'number',
        description: 'How many circuit rows are printed on the schedule in total, including any you could not read.',
      },
      schedule_found: { type: 'boolean', description: 'Whether a schedule of test results was present at all.' },
    },
    required: ['circuits', 'schedule_found'],
  };
}

export function schedulePrompt(): string {
  const cols = SCHEDULE_COLUMNS.map((c) => `- ${c.key}: ${c.label}`).join('\n');
  return `The attached document is a UK electrical certificate. Find the SCHEDULE OF TEST RESULTS — the wide table with one row per circuit — and transcribe it.

For each circuit row, return these columns:

${cols}

Rules, all of which matter more than completeness:
- One entry per printed row, in the order they appear. Do not merge, reorder or invent rows.
- Transcribe verbatim. Do not convert units, tidy values or compute anything. "0.35" stays "0.35".
- A cell containing only a dash, a slash or dots is EMPTY — return an empty string, never the glyph.
- Blank or unreadable cell → empty string for that column. NEVER guess. An invented value on a certificate is far worse than a gap the electrician fills in.
- 🔴 Do NOT return test measurements — no Zs, no R1+R2, no insulation resistance, no RCD times. Only what identifies the circuit and its protective device.
- Set rows_seen to the number of circuit rows PRINTED, even where you could not read them all. If the schedule runs over more than one page, count every page.
- If there is no schedule of test results in the document, set schedule_found false and return an empty array.

- 🔴 Return EVERY row. circuits.length must equal rows_seen. Do not stop early.`;
}


/**
 * A cheap "which pages hold the schedule?" pass.
 *
 * 🔴 Reading all ten pages properly is the wrong shape of work. Measured on a
 * real EICR whose schedule sits entirely on page 7:
 *   • all pages at once  → 1 row of 5 (quality collapses under concurrency)
 *   • three at a time    → accurate, but 150s and past every timeout
 *   • page 7 on its own  → 5 of 5, in 19s
 *
 * So find the page first. This asks for one boolean per page and nothing else,
 * which is a small enough answer to come back in seconds, and then only the
 * pages that matter get the expensive read.
 */
export function schedulePagePrompt(pageCount: number): string {
  return `You are given ${pageCount} images. They are consecutive pages of one UK electrical certificate.

For EACH page, say whether it contains the SCHEDULE OF TEST RESULTS — the wide table with one row per circuit, carrying columns such as circuit number, description, conductor sizes, protective device, R1+R2, insulation resistance and Zs.

A page counts only if it holds actual circuit ROWS. A page that merely mentions the schedule in a heading, a contents list or a continuation note does NOT count. The schedule may run across more than one page; list every page that carries rows.

Return the 1-based page numbers, nothing else.`;
}

export function schedulePageSchema() {
  return {
    type: 'object',
    properties: {
      pages: {
        type: 'array',
        items: { type: 'number' },
        description: '1-based page numbers that carry circuit rows. Empty if none do.',
      },
    },
    required: ['pages'],
  };
}
