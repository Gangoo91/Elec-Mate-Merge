/**
 * Reading handwritten TEST RESULTS off a site sheet (ELE-1607).
 *
 * Sean: *"Would it be possible to upload handwritten test results using the AI
 * scanner?"* — asked straight after praising the board scanner on a live EICR.
 *
 * ── 🔴 SCOPE: EXACTLY WHAT THE BOARD SCANNER LEAVES BLANK ─────────────────
 * The board scanner writes circuit identity, the protective device, cable sizes
 * and a COMPUTED max Zs, then deliberately leaves every measured field empty
 * (see `handleApplyAICircuits` in EICRScheduleOfTests.tsx). This module reads
 * that complement and nothing else. Identity is never read from the test sheet
 * — the circuits are already on the schedule and are passed in as context.
 *
 * ── 🔴 THE HARD PROBLEM IS NOT MISREADING A DIGIT ─────────────────────────
 * It is that a real test sheet is mostly EMPTY. Measured across 448 live EICRs
 * with four or more circuits:
 *
 *   • polarity identical on every circuit ....... 54%
 *   • insulation L-E identical on every circuit .. 46%
 *   • RCD time identical ......................... 18%
 *   • Zs identical ............................... 8%
 *
 * So roughly half the time insulation and polarity are ONE mark covering the
 * whole board — "all >200", a tick, an arrow down the column — while Zs is
 * genuinely per-circuit because it varies with circuit length.
 *
 * 🔴 Blank and ditto look identical on paper, and that is the whole danger.
 * Expanding "all >200" to eight rows reads the electrician's intent and is
 * right. Filling a gap from the value above INVENTS A MEASUREMENT THAT WAS
 * NEVER TAKEN, on a document somebody signs. So `scope` is a first-class part
 * of the schema: the model must say whether a mark covers the board or one
 * circuit, and silence must come back as silence.
 */

/**
 * The measured columns, and only those.
 *
 * Verified against `handleApplyAICircuits` — every key here is one the board
 * scanner explicitly writes as `''`. If that list ever changes, this must too,
 * or the two tools will start overwriting each other.
 */
export const MEASURED_COLUMNS = [
  'r1r2',
  'r2',
  'ringR1',
  'ringRn',
  'ringR2',
  'insulationLiveNeutral',
  'insulationLiveEarth',
  'polarity',
  'zs',
  'rcdOneX',
  'rcdTestButton',
  'afddTest',
  /*
   * ⚠️ `pfc` is deliberately NOT read.
   *
   * It is filled on only 508 of 5,144 live rows (10%), and in testing the model
   * lifted "PFC 1.6kA" from a footer note and stamped it on every circuit —
   * prospective fault current at the origin is not a per-circuit measurement.
   * One less column to misread, and one less unasked-for inference.
   */
] as const;

export type MeasuredColumn = (typeof MEASURED_COLUMNS)[number];

/** What an electrician calls each column on paper — fed to the model as synonyms. */
export const COLUMN_HINTS: Record<MeasuredColumn, string> = {
  r1r2: 'R1+R2 continuity, ohms. Also written "R1+R2", "R1R2", "cont", "(R1+R2)".',
  r2: 'R2 continuity (protective conductor only), ohms.',
  ringR1: 'Ring final r1 (line loop), ohms.',
  ringRn: 'Ring final rn (neutral loop), ohms. Also "rN".',
  ringR2: 'Ring final r2 (cpc loop), ohms.',
  insulationLiveNeutral:
    'Insulation resistance Live-Neutral, megohms. Column often "L-N" or "IR L-N".',
  insulationLiveEarth:
    'Insulation resistance Live-Earth, megohms. Column often "L-E", "IR", "Insulation". ' +
    'Commonly written ">200", ">999", ">299", "LIM", "∞", or "N/A".',
  polarity: 'Polarity. Usually a tick, "✓", "OK", "P", or "N/A" — rarely a number.',
  zs: 'Earth fault loop impedance Zs, ohms. Two decimals is normal (e.g. 0.35, 1.24).',
  rcdOneX:
    'RCD disconnection time at 1x IΔn, milliseconds. Whole numbers, typically 15-40. ' +
    'Column often "RCD", "1x", "trip time", "ms".',
  rcdTestButton: 'RCD test button operation. A tick, "OK", or "N/A".',
  afddTest: 'AFDD manual test button. A tick, "OK", or "N/A".',
};

/** A circuit already on the schedule, passed in so the model never guesses identity. */
export interface CircuitContext {
  /** `circuitNumber` — the way number as it appears on the schedule. */
  number: string;
  /** `circuitDescription` — what it feeds, for matching against a scruffy sheet. */
  description: string;
  /** Whether it is a ring final, so ring columns are only expected where they apply. */
  isRing?: boolean;
}

/**
 * 🔴 `scope` is the ditto-vs-blank guard, and `box` is what makes review fast.
 *
 * `box` uses Gemini's own bounding-box convention: [ymin, xmin, ymax, xmax]
 * normalised to 0-1000. The client crops the photo to it and shows that sliver
 * next to the proposed value, so checking a number is a glance rather than a
 * re-read of the whole sheet.
 */
export function readingsSchema() {
  return {
    type: 'object',
    properties: {
      sheet_found: {
        type: 'boolean',
        description: 'False if this photo does not show electrical test results at all.',
      },
      readings: {
        type: 'array',
        description: 'One entry per mark actually written. Never invent entries for blanks.',
        items: {
          type: 'object',
          properties: {
            column: { type: 'string', enum: [...MEASURED_COLUMNS] },
            scope: {
              type: 'string',
              enum: ['circuit', 'all'],
              description:
                '"circuit" = this mark belongs to one circuit. "all" = ONE mark covering ' +
                'every circuit, e.g. "all >200" written once, or a single tick spanning the column.',
            },
            circuit_number: {
              type: 'string',
              description:
                'The circuit this belongs to, matching a number supplied in the prompt. ' +
                'Empty when scope is "all".',
            },
            value: {
              type: 'string',
              description:
                'The measured value only, exactly as written — e.g. ">200", "0.35", "18", "✓". ' +
                'Keep a leading ">". No units, and NO scope words: "all >200" must be ">200".',
            },
            confidence: {
              type: 'number',
              description: '0-1. Below 0.75 the value is dropped rather than shown, so be honest.',
            },
            box: {
              type: 'array',
              description: '[ymin, xmin, ymax, xmax], normalised 0-1000, around this mark.',
              items: { type: 'number' },
            },
            image: {
              type: 'number',
              description:
                'Which photo this was read from, 1-based, in the order supplied. ' +
                'A sheet often runs to two sides — the crop is taken from this one.',
            },
          },
          required: ['column', 'scope', 'value', 'confidence'],
        },
      },
      unreadable: {
        type: 'array',
        description: 'Plain-English notes on anything written but not legible enough to report.',
        items: { type: 'string' },
      },
    },
    required: ['sheet_found', 'readings'],
  };
}

export function readingsPrompt(circuits: CircuitContext[]): string {
  const list = circuits
    .map((c) => `  ${c.number} — ${c.description}${c.isRing ? ' (ring final)' : ''}`)
    .join('\n');

  const columns = MEASURED_COLUMNS.map((k) => `  ${k}: ${COLUMN_HINTS[k]}`).join('\n');

  return `You are reading a UK electrician's handwritten test sheet for an EICR, so the measured values can be typed into a schedule of test results.

The schedule ALREADY has these circuits. Match what you read against them — never invent a circuit, and never report circuit descriptions or device ratings, only measured values:

${list}

Report ONLY these columns:

${columns}

🔴 The most important rule: a real test sheet is mostly empty, and blank does NOT mean "same as the row above".

- If one mark covers the whole board — "all >200", a single tick down a column, an arrow, a ditto mark, "as above" — report it ONCE with scope "all". Do not repeat it per circuit.
- If a mark clearly belongs to one circuit, report it with scope "circuit" and that circuit's number.
- If nothing is written for a circuit, REPORT NOTHING for it. Do not carry a value down from above, and do not guess from a neighbouring circuit. A gap the electrician fills in himself is safe; a number he never measured is not.

Other rules:
- Transcribe the MEASURED VALUE ONLY. "0.35" stays "0.35" — never round, never add units, never convert. Keep a leading ">" if it is written.
- 🔴 Do NOT put scope words in the value. A column marked "all >200" has value ">200" with scope "all" — never "all >200". Strip words like "all", "as above", "ditto", "same"; the scope field already carries that meaning.
- Decimal points matter enormously: 1.2 and 12 are different results. If a decimal point is ambiguous, lower your confidence rather than choosing.
- Be honest with confidence. Anything below 0.75 is discarded and left blank for the electrician, which is the safe outcome.
- Ring columns (ringR1, ringRn, ringR2) apply only to ring final circuits.
- If the photo is not a test sheet at all, set sheet_found false and return no readings.
- Give a bounding box for every reading so the electrician can be shown the mark you read.
- When several photos are supplied they are sides or pages of the SAME sheet. Set \`image\` to which one each reading came from (1-based, in the order given). Do not report the same circuit's value twice because it appears on two photos.`;
}
