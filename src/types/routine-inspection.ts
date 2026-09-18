import {
  getDefaultRoutineInspectionItems,
  DEFAULT_VISIT_TYPE,
  type RoutineInspectionItem,
  type VisitType,
} from '@/data/routineInspectionItems';

/**
 * Routine Inspection & Thermal Imaging Report (ELE-1110).
 *
 * A planned-maintenance visit record for the yearly-contract work electricians
 * increasingly sell: one to two hours on site, torque checks, a thermal sweep
 * under load, photographic evidence. Distinct from an EICR, and not a
 * replacement for one.
 *
 * 🔴 NOT a BS 7671 model form. See the header of `data/routineInspectionItems.ts`
 * for the full reasoning and the verified sources.
 */

/**
 * 🔴 Reads a stored field that the TYPE says is a string.
 *
 * It is not safe to call `.trim()` on these directly. The page hydrates with
 * `{ ...defaults, ...stored }`, and a stored key holding `null` — or an anomaly
 * written before a field existed — overwrites the default rather than falling
 * back to it. `null.trim()` then throws while RENDERING the thermal step, which
 * white-screens the whole report rather than degrading.
 *
 * TypeScript cannot catch this: the value came out of a JSON column, so the
 * compiler believes the declared type and the runtime does not.
 */
const stored = (v: unknown): string => (typeof v === 'string' ? v.trim() : '');

/* ═══════════════════════════════════════════════════════════════════════════
 * THERMOGRAPHY
 * ═══════════════════════════════════════════════════════════════════════════ */

/**
 * What the temperature rise was measured AGAINST.
 *
 * 🔴 This is not cosmetic — it selects a different set of severity bands, and
 * the two sets are not interchangeable. See `THERMAL_BANDS`.
 */
export type ThermalReference = '' | 'similar-component' | 'ambient';

/**
 * Severity, 1 (worst) to 4. Stored as a string so '' means "not yet rated"
 * without colliding with a numeric 0.
 */
export type ThermalPriority = '' | '1' | '2' | '3' | '4';

/**
 * §8.5 — a real distinction, not a preference.
 *
 * A QUALITATIVE survey uses a thermal imager to find anomalies by pattern. It
 * produces no calibrated temperatures, so it carries no ΔT, no emissivity and
 * no priority rating — and must not pretend to.
 *
 * A QUANTITATIVE survey uses a radiometer to measure. Only then do the ΔT
 * criteria and the §9.3 record fields apply.
 */
export type SurveyMode = '' | 'qualitative' | 'quantitative';

/**
 * 🔴 THE SEVERITY TABLE.
 *
 * Source: Infraspection Institute, *Standard for Infrared Inspection of
 * Electrical Systems & Rotating Equipment*, 2016 Edition, §10.1 — reproducing
 * the NETA Maintenance Testing Specifications table for electrical equipment.
 * Read from the document, not recalled.
 *
 * ⚠️ PRIORITY 2 EXISTS ONLY AGAINST AMBIENT. There is no similar-component
 * equivalent — the standard prints a dash. A single shared severity picker
 * would let someone record a Priority 2 against a similar-component comparison,
 * which is a rating the standard does not define.
 *
 * ⚠️ §10.1.1: "The priority values listed in the above tables are provided for
 * reference purposes and may not appear as part of the referenced document."
 * So the app SUGGESTS a priority from the measured ΔT and the inspector may
 * override it. The report presents it as guidance, never as a NETA verdict.
 */
interface ThermalBand {
  priority: Exclude<ThermalPriority, ''>;
  /** Inclusive lower bound, in whole °C. */
  min: number;
  /** Inclusive upper bound in whole °C, or null for open-ended. */
  max: number | null;
  /** The standard's own wording for the range, printed on the report. */
  range: string;
  action: string;
}

/*
 * ⚠️ The standard's ranges are contiguous only in WHOLE degrees: "1 to 3" is
 * followed by "4 to 15", so 3.4 °C falls between two printed rows. Banding
 * therefore rounds to the nearest whole degree first (see `thermalBandFor`),
 * which reproduces the table exactly and leaves no gap for a reading to vanish
 * into. Interpolating instead would have made 3.4 a Priority 4 and 20.4 a
 * Priority 3 — the same half-degree treated two different ways.
 */
export const THERMAL_BANDS: Record<'similar-component' | 'ambient', ThermalBand[]> = {
  /* ΔT between similar components under similar load. No Priority 2. */
  'similar-component': [
    { priority: '4', min: 1, max: 3, range: '1 to 3 °C', action: 'Possible deficiency; warrants investigation' },
    { priority: '3', min: 4, max: 15, range: '4 to 15 °C', action: 'Probable deficiency; repair as time permits' },
    { priority: '1', min: 16, max: null, range: 'greater than 15 °C', action: 'Major discrepancy; repair immediately' },
  ],
  /* ΔT over ambient air temperature. */
  ambient: [
    { priority: '4', min: 1, max: 10, range: '1 to 10 °C', action: 'Possible deficiency; warrants investigation' },
    { priority: '3', min: 11, max: 20, range: '11 to 20 °C', action: 'Probable deficiency; repair as time permits' },
    { priority: '2', min: 21, max: 40, range: '21 to 40 °C', action: 'Monitor until corrective measures can be accomplished' },
    { priority: '1', min: 41, max: null, range: 'greater than 40 °C', action: 'Major discrepancy; repair immediately' },
  ],
};

/**
 * The suggested band for a measured rise.
 *
 * Returns null below 1 °C — the standard defines no band there, and forcing a
 * Priority 4 onto a 0.4 °C difference would manufacture a finding out of
 * instrument noise.
 */
export function thermalBandFor(
  deltaT: number | null,
  reference: ThermalReference
): ThermalBand | null {
  if (deltaT === null || !Number.isFinite(deltaT)) return null;
  if (reference !== 'similar-component' && reference !== 'ambient') return null;
  /*
   * ⚠️ Test the RAW value against the floor before rounding.
   *
   * Rounding first makes 0.5 °C into 1 °C — JavaScript rounds halves up — and
   * so into a Priority 4 "possible deficiency". Half a degree is well inside
   * the accuracy of any handheld imager (typically ±2 °C), so that is a finding
   * manufactured out of instrument noise, printed on a document someone signs.
   */
  if (deltaT < 1) return null;
  const whole = Math.round(deltaT);
  return (
    THERMAL_BANDS[reference].find(
      (b) => whole >= b.min && (b.max === null || whole <= b.max)
    ) ?? null
  );
}

/** The priorities the standard defines for a given reference type. */
export function prioritiesFor(reference: ThermalReference): Exclude<ThermalPriority, ''>[] {
  if (reference !== 'similar-component' && reference !== 'ambient') {
    return ['1', '2', '3', '4'];
  }
  return THERMAL_BANDS[reference].map((b) => b.priority);
}

export const THERMAL_PRIORITY_ACTION: Record<Exclude<ThermalPriority, ''>, string> = {
  '1': 'Major discrepancy; repair immediately',
  '2': 'Monitor until corrective measures can be accomplished',
  '3': 'Probable deficiency; repair as time permits',
  '4': 'Possible deficiency; warrants investigation',
};

/**
 * One thermal exception. The standard's word for it is "exception" — anything
 * exhibiting an unusual thermal pattern or operating temperature.
 */
export interface ThermalAnomaly {
  id: string;
  /** §9.2.1 — the exact location. */
  location: string;
  /** §9.2.2 — what it is: phase, circuit number, ratings. */
  equipment: string;
  description: string;

  /* ── Quantitative measurements (§9.3) ───────────────────────────────── */
  /** Surface temperature of the exception, °C. */
  measuredTemp: string;
  /** Surface temperature of the defined reference, °C. */
  referenceTemp: string;
  /** What `referenceTemp` refers to. Drives which priorities are valid. */
  reference: ThermalReference;
  /** §9.3.3 — emittance used to calculate the temperature. */
  emissivity: string;
  /** §9.3.3 — reflected temperature, °C. */
  reflectedTemp: string;
  /** §9.3.2 — measured load at the time of inspection, A. */
  measuredLoad: string;
  /** §9.3.2 — rated load, A. */
  ratedLoad: string;

  /** The inspector's rating. Suggested from ΔT, overridable — see §10.1.1. */
  priority: ThermalPriority;
  /** True when the inspector changed it away from the suggestion. */
  priorityOverridden?: boolean;

  /** §8.7 / §9.2.4 — the thermogram AND the visible-light image. */
  thermalPhotos?: string[];
  visiblePhotos?: string[];

  /** What is to be done. */
  action: string;
}

/** ΔT for an anomaly, or null when it cannot be computed. */
export function anomalyDeltaT(a: ThermalAnomaly): number | null {
  const m = parseFloat(a.measuredTemp);
  const r = parseFloat(a.referenceTemp);
  if (!Number.isFinite(m) || !Number.isFinite(r)) return null;
  return Math.round((m - r) * 10) / 10;
}

/** §9.3.2.1 — percentage load, measured ÷ rated. Null when either is missing. */
export function anomalyLoadPercent(a: ThermalAnomaly): number | null {
  const m = parseFloat(a.measuredLoad);
  const r = parseFloat(a.ratedLoad);
  if (!Number.isFinite(m) || !Number.isFinite(r) || r <= 0) return null;
  return Math.round((m / r) * 100);
}

export function getDefaultThermalAnomaly(): ThermalAnomaly {
  return {
    id: crypto.randomUUID(),
    location: '',
    equipment: '',
    description: '',
    measuredTemp: '',
    referenceTemp: '',
    reference: '',
    emissivity: '',
    reflectedTemp: '',
    measuredLoad: '',
    ratedLoad: '',
    priority: '',
    thermalPhotos: [],
    visiblePhotos: [],
    action: '',
  };
}

/* ═══════════════════════════════════════════════════════════════════════════
 * OBSERVATIONS
 * ═══════════════════════════════════════════════════════════════════════════ */

/** Same codes as an EICR — an electrician should not learn a second set. */
export type ObservationCode = 'C1' | 'C2' | 'C3' | 'FI';

/**
 * A photograph of the installation as a whole — the board as found, the meter
 * position, an alarm head, a label. Not tied to any one finding.
 *
 * Captioned, because a photograph on a report read by a landlord is evidence
 * only if it says what it is a photograph OF. An uncaptioned picture of a
 * consumer unit proves nothing in six months' time.
 */
export interface RoutineSitePhoto {
  id: string;
  /** Compressed data URI — see `SitePhotoGrid` for the compression used. */
  src: string;
  caption: string;
}

/* ═══════════════════════════════════════════════════════════════════════════
 * PHOTO BUDGET
 * ═══════════════════════════════════════════════════════════════════════════ */

/**
 * 🔴 THE LIMIT IS BYTES, NOT A COUNT OF PHOTOS.
 *
 * Measured through the app's own compression path (canvas at 1000px, JPEG
 * q0.75, the settings in `PhotoStrip`): a plain scene comes out at 91 KB of
 * base64 and a detail-heavy one — which is what a photograph of a consumer
 * unit actually is — at 505 KB. Five and a half times the difference. So "how
 * many photos" tells you almost nothing about how big the report is, and a
 * count-based cap would either block a job at six small pictures or wave
 * through a payload of twelve large ones.
 *
 * Why there has to be a limit at all: these photos are stored INLINE in the
 * report row and posted whole to PDFMonkey. The EICR learned this the
 * expensive way — photo-heavy certificates took 45–57s to render and timed
 * out, and ELE-1189 had to shrink images to keep the PDF under Brevo's
 * attachment limit after one reached 4.4MB. A report that cannot be generated,
 * or cannot be emailed, is worse than one with fewer pictures in it.
 *
 * The soft figure warns; the hard figure stops. Both are of base64 length,
 * which is what actually travels.
 */
export const PHOTO_BUDGET_WARN_BYTES = 4 * 1024 * 1024;
export const PHOTO_BUDGET_MAX_BYTES = 6 * 1024 * 1024;

/** Every photo on the report, whatever it is attached to. */
export function reportPhotoBytes(
  d: Pick<RoutineInspectionFormData, 'observations' | 'anomalies' | 'sitePhotos' | 'thermalSurveyCarriedOut'>
): { bytes: number; count: number } {
  let bytes = 0;
  let count = 0;
  const add = (src?: string) => {
    if (typeof src === 'string' && src) {
      bytes += src.length;
      count += 1;
    }
  };
  for (const o of d.observations ?? []) (o.photos ?? []).forEach(add);
  for (const p of d.sitePhotos ?? []) add(p.src);
  /* A survey switched off contributes nothing — it does not reach the PDF
     either. Same rule as `effectiveAnomalies`. */
  if (d.thermalSurveyCarriedOut) {
    for (const a of d.anomalies ?? []) {
      (a.thermalPhotos ?? []).forEach(add);
      (a.visiblePhotos ?? []).forEach(add);
    }
  }
  return { bytes, count };
}

/** "3.1 MB" — for a line the electrician reads on site, not a log. */
export const formatPhotoBytes = (bytes: number): string => {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  /* Rounding alone printed "0 KB" next to a photo that plainly exists, which
     reads as a failed upload rather than as a small file. */
  if (bytes > 0 && bytes < 1024) return '<1 KB';
  return `${Math.round(bytes / 1024)} KB`;
};

/* ═══════════════════════════════════════════════════════════════════════════
 * SPOT CHECKS
 * ═══════════════════════════════════════════════════════════════════════════ */

/**
 * 🔴 SPOT CHECKS ARE NOT A SCHEDULE OF TEST RESULTS, AND NOT "SAMPLING".
 *
 * An electrician on a maintenance visit does sometimes reach for an instrument
 * — an RCD trip time, a Zs at the far point, an IR test on a circuit that looks
 * wrong. Pretending otherwise just pushes those numbers into the notes field
 * where nothing can be said about them.
 *
 * But two words have to stay off this document:
 *
 *   "SAMPLING" — in BS 7671 and GN3 that is periodic inspection machinery:
 *   "sampling shall be documented, justified by risk assessment, and the
 *   details included in the Schedule of Inspections and Schedule of Test
 *   Results" (verified in `bs7671_facets`). Those are an EICR's schedules. A
 *   maintenance visit that prints a sampling schedule is a partial EICR, which
 *   is worse than either document done properly.
 *
 *   "SATISFACTORY" — against a reading. Judging a Zs needs the protective
 *   device, its rating and curve, the circuit, Cmin and the ambient
 *   temperature. This report holds none of that, so it records the value and
 *   says nothing about it. If the inspector thinks a reading is wrong, that is
 *   an OBSERVATION with a code, like every other finding — which also means a
 *   number can never silently move the overall verdict.
 *
 * What a spot check is: this value, at this point, on this day, with this
 * instrument. Nothing more is claimed, and the printed limitations say so.
 */
export type SpotCheckType = '' | 'rcd' | 'zs' | 'ir' | 'continuity' | 'ze' | 'other';

/** What each reading is, and the unit it is recorded in. */
export const SPOT_CHECK_KINDS: {
  value: Exclude<SpotCheckType, ''>;
  label: string;
  unit: string;
  /** RCD is the one reading that needs two figures. */
  hasX5?: boolean;
  hint?: string;
}[] = [
  {
    value: 'rcd',
    label: 'RCD trip time',
    unit: 'ms',
    hasX5: true,
    hint: 'At ×1 and ×5 rated residual current. The test button alone proves only the mechanism.',
  },
  { value: 'zs', label: 'Earth fault loop impedance (Zs)', unit: 'Ω' },
  { value: 'ir', label: 'Insulation resistance', unit: 'MΩ', hint: 'The circuit must be isolated — a deliberate act, not a routine one.' },
  { value: 'continuity', label: 'Continuity (R1+R2 or R2)', unit: 'Ω' },
  { value: 'ze', label: 'External earth fault loop impedance (Ze)', unit: 'Ω' },
  { value: 'other', label: 'Other reading', unit: '' },
];

export interface RoutineSpotCheck {
  id: string;
  type: SpotCheckType;
  /** Names the reading when `type` is 'other'. */
  customType: string;
  /** Free unit for an 'other' reading; the rest take theirs from the kind. */
  customUnit: string;
  /** Where, or which circuit — a reading with no location is not evidence. */
  location: string;
  value: string;
  /** RCD only: the ×5 figure. */
  valueX5: string;
  notes: string;
}

export const getDefaultSpotCheck = (): RoutineSpotCheck => ({
  id: crypto.randomUUID(),
  type: '',
  customType: '',
  customUnit: '',
  location: '',
  value: '',
  valueX5: '',
  notes: '',
});

/** The unit shown and printed for a reading. */
export const spotCheckUnit = (c: Pick<RoutineSpotCheck, 'type' | 'customUnit'>): string =>
  c.type === 'other'
    ? stored(c.customUnit)
    : (SPOT_CHECK_KINDS.find((k) => k.value === c.type)?.unit ?? '');

/** The name shown and printed for a reading. */
export const spotCheckLabel = (c: Pick<RoutineSpotCheck, 'type' | 'customType'>): string =>
  c.type === 'other'
    ? stored(c.customType)
    : (SPOT_CHECK_KINDS.find((k) => k.value === c.type)?.label ?? '');

/**
 * Readings with something actually in them.
 *
 * ⚠️ Gated on `spotChecksCarriedOut`, exactly like `effectiveAnomalies` gates
 * the thermal findings. Switching the section off must remove the readings from
 * the report AND from the limitations paragraph together — a report that says
 * no readings were taken while printing three of them is the worst of both.
 */
export function effectiveSpotChecks(
  d: Pick<RoutineInspectionFormData, 'spotChecksCarriedOut' | 'spotChecks'>
): RoutineSpotCheck[] {
  if (!d.spotChecksCarriedOut) return [];
  /* ⚠️ `stored`, not `.trim()`. These come back out of a JSON column, so a key
     holding null overwrites the default instead of falling back to it — and
     this function runs during RENDER, so a throw here white-screens the report
     rather than degrading. See the helper's note at the top of this file. */
  return (d.spotChecks ?? []).filter((c) => c?.type && stored(c.value) !== '');
}

export interface RoutineObservation {
  id: string;
  location: string;
  description: string;
  code: ObservationCode | '';
  /**
   * Set when the inspector has decided this finding should NOT be priced.
   *
   * ⚠️ Opt-OUT, not opt-in, and deliberately so. The default has to be that a
   * finding needing action reaches the quote, because the failure that costs
   * somebody money is a C2 quietly left off it — not an extra line the
   * electrician deletes in the builder.
   *
   * It only affects quoting. The finding still prints on the report, still
   * carries its code, and still counts towards the verdict: this is about what
   * gets priced, never about what gets recorded.
   */
  excludeFromQuote?: boolean;
  /** Links back to a schedule item when the observation came from one. */
  itemId?: string;
  photos?: string[];
}

/* ═══════════════════════════════════════════════════════════════════════════
 * THE FORM
 * ═══════════════════════════════════════════════════════════════════════════ */

export type RoutineAssessment = '' | 'satisfactory' | 'requires-attention' | 'unsatisfactory';

export interface RoutineInspectionFormData {
  certificateNumber: string;
  /** Per-report identity; the create idempotency key derives from it (ELE-1592). */
  _clientCertId: string;

  /**
   * 🔴 WHAT KIND OF VISIT THIS IS — and therefore which schedule, which legal
   * frame is printed, and which steps the form shows.
   *
   * Not a cosmetic filter. The two visit types rest on different law: a
   * landlord annual visit evidences the repairing duty under the Landlord and
   * Tenant Act 1985 s11(1)(b) (or Housing (Scotland) Act 2014 s13), and a
   * commercial maintenance visit evidences EAWR 1989 Reg 4(2). Printing one of
   * those on a report governed by the other is an overclaim on a signed
   * document. See `VisitType` in `data/routineInspectionItems.ts`.
   */
  visitType: VisitType;

  /* ── Client and site ──────────────────────────────────────────────── */
  clientName: string;
  clientAddress: string;
  clientPhone: string;
  clientEmail: string;
  installationAddress: string;
  sameAsClientAddress: boolean;
  occupier: string;

  /* ── Landlord and agent (landlord visits) ─────────────────────────── */
  /**
   * Who manages the property, where that is not the landlord.
   *
   * Kept apart from `clientName` on purpose: the agent instructs and is
   * invoiced, the landlord carries the repairing duty, and the report has to
   * be able to name both without pretending they are the same person.
   */
  lettingAgent: string;
  /**
   * The landlord's or agent's own reference for the property — a unit number,
   * a portfolio code. Meaningless to us and the first thing they search on.
   */
  propertyReference: string;

  /**
   * 🔴 Drives which requirements are RELEVANT, not merely a label.
   *
   * Reg 421.1.7 makes AFDD protection of socket-outlet final circuits rated
   * 32 A or less MANDATORY in houses in multiple occupation, purpose-built
   * student accommodation, care homes and higher-risk residential buildings,
   * and recommends it elsewhere. GN3 also flags HMOs as premises that may
   * require periodic inspection in their own right. A form that cannot tell an
   * HMO from a two-bed flat cannot raise either point.
   */
  dwellingType: '' | 'house' | 'flat' | 'hmo' | 'student' | 'care-home' | 'hrrb';

  /* ── Compliance record ────────────────────────────────────────────── */
  /**
   * The date of the last EICR and when it falls due.
   *
   * 🔴 RECORDED, NOT ASSESSED. This visit carries out no testing, so it cannot
   * form a view on the EICR's findings — it reports the dates it was shown. The
   * value is that a yearly visit is the moment the five-yearly renewal becomes
   * visible, to a landlord who will otherwise meet it as a surprise.
   *
   * For a private rented property in England the interval is not more than 5
   * years, or shorter where the inspector said so (Electrical Safety Standards
   * in the Private Rented Sector (England) Regulations 2020). `eicrNextDue` is
   * what the inspector was told or shown — never a date this form calculated.
   */
  eicrDate: string;
  eicrNextDue: string;

  /* ── The visit ────────────────────────────────────────────────────── */
  purpose: string;
  extent: string;
  limitations: string;
  inspectionDate: string;
  premisesType: '' | 'domestic' | 'commercial' | 'industrial' | 'other';
  supplyType: '' | 'single-phase' | 'three-phase';
  /** Free text — a maintenance visit may cover several boards. */
  boardsCovered: string;

  /* ── Maintenance schedule ─────────────────────────────────────────── */
  inspectionItems: RoutineInspectionItem[];
  observations: RoutineObservation[];
  /**
   * Photographs of the installation as a whole, printed on the report.
   *
   * ⚠️ Deliberately NOT `SitePhotosSection`/`useInspectionPhotos`, which the
   * EICR uses. Those are storage-backed and their own header records that they
   * DO NOT PRINT — no formatter emits a non-defect photo, because printing them
   * broke generation and delivery on photo-heavy certificates. These are inline
   * and do print, which is the whole point, and is why `reportPhotoBytes`
   * exists to keep the total honest.
   */
  sitePhotos: RoutineSitePhoto[];

  /* ── Spot checks ──────────────────────────────────────────────────── */
  /**
   * 🔴 The whole readings section is gated on this, and so is the wording of
   * the printed limitations. See `SpotCheckType` for why this document records
   * readings but refuses to call them a schedule of test results.
   */
  spotChecksCarriedOut: boolean;
  /** The instrument. A reading with no instrument named cannot be relied on —
   *  the same rule this form already applies to the torque wrench below. */
  testInstrument: string;
  testInstrumentSerial: string;
  testInstrumentCalDate: string;
  spotChecks: RoutineSpotCheck[];

  /* ── Torque ───────────────────────────────────────────────────────── */
  torqueChecked: boolean;
  /** Instrument used — a torque figure with no instrument named is unverifiable. */
  torqueInstrument: string;
  torqueSettings: string;

  /* ── Thermal survey (optional bolt-on) ────────────────────────────── */
  /**
   * 🔴 The whole thermal section is gated on this. Most electricians do not own
   * a camera, and a form that demanded emissivity before it would save would be
   * unusable for the majority of the people it is built for.
   */
  thermalSurveyCarriedOut: boolean;
  surveyMode: SurveyMode;
  thermalCamera: string;
  /**
   * §8.1 — "Equipment to be inspected shall be energized and under adequate
   * load; ideally this is normal operating load." A survey at no load proves
   * nothing, so this is required whenever a survey was carried out.
   */
  loadAtSurvey: string;
  /** Ambient air temperature at the time of survey, °C. */
  ambientTemp: string;
  /** §9.2.3 — environmental conditions where significant. */
  environmentalConditions: string;
  thermographerQualification: string;
  anomalies: ThermalAnomaly[];

  /* ── Outcome ──────────────────────────────────────────────────────── */
  /** Derived, never typed. See `deriveRoutineAssessment`. */
  overallAssessment: RoutineAssessment;
  generalCondition: string;
  recommendations: string;
  /**
   * 🔴 The inspector's recommendation, NOT looked up from a table.
   * There is no GN3 interval table — see `data/routineInspectionItems.ts`.
   *
   * 🔴 THE KEY NAME IS LOAD-BEARING. `sync_report_next_due()` — a BEFORE
   * trigger on `reports` — populates the `next_inspection_due` COLUMN from
   * `data->>'nextInspectionDue'` (or `nextTestDue`) and from nothing else.
   * That column is what the daily `notify_cert_reinspections()` cron reads to
   * nudge the electrician 30 days out, and what the Renewals Book prefers over
   * every JSON fallback.
   *
   * This field was `nextInspectionDate` and therefore reached neither. A visit
   * record whose entire purpose is to recur was the one report type that never
   * asked to be rebooked. Renaming it is the whole fix — no migration, and no
   * change to a trigger shared with every other certificate.
   */
  nextInspectionDue: string;
  nextInspectionReasoning: string;

  /* ── Declaration ──────────────────────────────────────────────────── */
  inspectorName: string;
  inspectorPosition: string;
  inspectorSignature: string;
  inspectorDate: string;
  companyName: string;

  completedSections: Record<string, boolean>;
}

/**
 * The overall result.
 *
 * 🔴 IT MUST CONSIDER THE SCHEDULE, THE OBSERVATIONS AND THE THERMAL FINDINGS.
 *
 * All three arguments are REQUIRED, deliberately. The equivalent function on
 * the Visual Condition Report shipped with an optional parameter defaulting to
 * `[]`, which silently kept the old — wrong — behaviour at every call site and
 * produced a SATISFACTORY verdict on a report where every item had failed.
 * Requiring them makes the compiler point at each caller.
 *
 * The rule:
 *   • C1, C2, or a thermal Priority 1  → Unsatisfactory (act now)
 *   • any defect item, C3, FI, or a
 *     thermal Priority 2, 3 or 4        → Requires attention
 *   • otherwise                         → Satisfactory
 *
 * `not-verified` does NOT fail the report: something that could not be reached
 * is a limitation, and it is disclosed as one rather than recast as a finding.
 */
/**
 * 🔴 The thermal findings that COUNT — none at all if no survey was carried out.
 *
 * Toggling the survey off does not delete the findings, because it is often a
 * mis-tap and retyping a thermal survey is punishing. But leaving them in play
 * produced the worst kind of wrong document: record a Priority 1, toggle the
 * survey off, and the report printed UNSATISFACTORY while the thermal section
 * and the priority counts were both suppressed. The verdict had no visible
 * cause anywhere on the page.
 *
 * That is the same failure the Visual Condition Report shipped with — a verdict
 * that disagrees with everything shown beneath it. Every consumer of the
 * findings goes through here so the two cannot drift apart again.
 */
export function effectiveAnomalies(
  d: Pick<RoutineInspectionFormData, 'thermalSurveyCarriedOut' | 'anomalies'>
): ThermalAnomaly[] {
  return d.thermalSurveyCarriedOut ? (d.anomalies ?? []) : [];
}

export function deriveRoutineAssessment(
  items: RoutineInspectionItem[],
  observations: RoutineObservation[],
  /** 🔴 Pass `effectiveAnomalies(form)`, never `form.anomalies`. */
  anomalies: ThermalAnomaly[]
): Exclude<RoutineAssessment, ''> {
  const urgent =
    observations.some((o) => o.code === 'C1' || o.code === 'C2') ||
    anomalies.some((a) => a.priority === '1');
  if (urgent) return 'unsatisfactory';

  const attention =
    items.some((i) => i.outcome === 'defect') ||
    observations.some((o) => o.code === 'C3' || o.code === 'FI') ||
    anomalies.some((a) => a.priority === '2' || a.priority === '3' || a.priority === '4');
  return attention ? 'requires-attention' : 'satisfactory';
}

export const ROUTINE_ASSESSMENT_LABEL: Record<Exclude<RoutineAssessment, ''>, string> = {
  satisfactory: 'SATISFACTORY',
  'requires-attention': 'REQUIRES ATTENTION',
  unsatisfactory: 'UNSATISFACTORY',
};

/**
 * Warnings about the survey itself, from the standard's own requirements.
 * These never block — they tell the inspector what the report will be missing.
 */
export function thermalSurveyWarnings(d: RoutineInspectionFormData): string[] {
  if (!d.thermalSurveyCarriedOut) return [];
  const out: string[] = [];

  if (!stored(d.loadAtSurvey)) {
    out.push(
      'Record the load at the time of the survey. Equipment must be energised and under adequate load — ideally normal operating load. A survey carried out at little or no load can miss a developing fault entirely.'
    );
  }
  if (d.surveyMode === 'quantitative') {
    if (!stored(d.ambientTemp)) {
      out.push('Record the ambient air temperature — any rise measured over ambient is meaningless without it.');
    }
    const missingOptics = (d.anomalies ?? []).filter(
      (a) => !stored(a.emissivity) || !stored(a.reflectedTemp)
    ).length;
    if (missingOptics > 0) {
      out.push(
        `${missingOptics} ${missingOptics === 1 ? 'finding is' : 'findings are'} missing emissivity or reflected temperature. A quantitative survey must state the values used to calculate the temperature, or the reading cannot be checked by anyone else.`
      );
    }
  }
  const missingImages = (d.anomalies ?? []).filter(
    (a) => !a.thermalPhotos?.length || !a.visiblePhotos?.length
  ).length;
  if (missingImages > 0) {
    out.push(
      `${missingImages} ${missingImages === 1 ? 'finding needs' : 'findings need'} both a thermal image and a visible-light image. The pair is what lets a client see what was hot and what it was.`
    );
  }
  return out;
}

const today = () => new Date().toISOString().slice(0, 10);

export function getDefaultRoutineInspectionFormData(): RoutineInspectionFormData {
  return {
    certificateNumber: '',
    _clientCertId: crypto.randomUUID(),

    visitType: DEFAULT_VISIT_TYPE,

    clientName: '',
    clientAddress: '',
    clientPhone: '',
    clientEmail: '',
    installationAddress: '',
    sameAsClientAddress: false,
    occupier: '',

    lettingAgent: '',
    propertyReference: '',
    dwellingType: '',
    eicrDate: '',
    eicrNextDue: '',

    purpose: '',
    extent: '',
    limitations: '',
    inspectionDate: today(),
    premisesType: '',
    supplyType: '',
    boardsCovered: '',

    /* Seeded FROM the default visit type, never independently — a blank report
       whose selector says one thing and whose schedule is the other shows a
       full set of questions the inspector cannot answer. */
    inspectionItems: getDefaultRoutineInspectionItems(DEFAULT_VISIT_TYPE),
    observations: [],
    sitePhotos: [],

    spotChecksCarriedOut: false,
    testInstrument: '',
    testInstrumentSerial: '',
    testInstrumentCalDate: '',
    spotChecks: [],

    torqueChecked: false,
    torqueInstrument: '',
    torqueSettings: '',

    thermalSurveyCarriedOut: false,
    surveyMode: '',
    thermalCamera: '',
    loadAtSurvey: '',
    ambientTemp: '',
    environmentalConditions: '',
    thermographerQualification: '',
    anomalies: [],

    overallAssessment: '',
    generalCondition: '',
    recommendations: '',
    nextInspectionDue: '',
    nextInspectionReasoning: '',

    inspectorName: '',
    inspectorPosition: '',
    inspectorSignature: '',
    inspectorDate: today(),
    companyName: '',

    completedSections: {},
  };
}

/**
 * 🔴 Prints on the report, and must not be softened.
 *
 * Without it a client, a landlord or an insurer could take this for an EICR.
 * It says what a maintenance visit is, what it is not, and what it cannot be
 * relied on for.
 */
/**
 * The fixed limitations, printed on every report and not editable.
 *
 * 🔴 THE DUTY SENTENCE FOLLOWS THE VISIT TYPE.
 *
 * This block used to name EAWR 1989 Reg 4(2) unconditionally — the duty on a
 * dutyholder to maintain systems AT WORK. Printed on a landlord's report about
 * a tenant's home that is simply the wrong statute, cited in the one paragraph
 * whose entire job is to state precisely what the document does and does not
 * claim. Everything after the first two sentences is common to both, because
 * what the visit did NOT do does not vary with who commissioned it.
 *
 * Sources verified in `bs7671_facets`; see `data/landlordInspectionItems.ts`.
 */
export type EicrTone = 'ok' | 'soon' | 'overdue';

/**
 * How the EICR on file stands, relative to today.
 *
 * 🔴 ONE SOURCE, used by the form AND the PDF. These were briefly two
 * implementations — the screen said one thing and the document would have said
 * another about the same date, which is the kind of disagreement nobody spots
 * until a client does.
 *
 * ⚠️ Derived from the due date the inspector was SHOWN, never calculated from
 * the EICR date. Five years is the MAXIMUM for a private rented property in
 * England (Electrical Safety Standards in the Private Rented Sector (England)
 * Regulations 2020) — it is not a rule this app may apply to a property whose
 * inspector recommended three, or which is not in England. With no due date
 * there is nothing honest to say, and it returns null.
 */
export function eicrStatus(nextDue: string): { tone: EicrTone; message: string } | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(nextDue)) return null;
  const due = new Date(`${nextDue}T00:00:00`);
  if (Number.isNaN(due.getTime())) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days = Math.round((due.getTime() - today.getTime()) / 86400000);

  if (days < 0) {
    const n = Math.abs(days);
    return {
      tone: 'overdue',
      message: `Overdue by ${n} day${n === 1 ? '' : 's'}. A new condition report is needed — this visit does not substitute for one.`,
    };
  }
  if (days <= 365) {
    return {
      tone: 'soon',
      message: `Due in ${days} day${days === 1 ? '' : 's'}.`,
    };
  }
  return { tone: 'ok', message: 'In date.' };
}

export function routineInspectionLimitations(
  visitType: VisitType,
  /**
   * 🔴 TRUE WHEN ANY READING WAS RECORDED, AND IT CHANGES WHAT THIS PARAGRAPH
   * CAN HONESTLY SAY.
   *
   * The no-testing sentence is categorical: "there are no measured values for
   * earth fault loop impedance, insulation resistance, continuity or residual
   * current device operating time". Print that on a report carrying an RCD trip
   * time and the document contradicts itself, in the one paragraph whose entire
   * job is to state precisely what it does and does not claim — over somebody's
   * signature.
   *
   * So the two move together or not at all. `effectiveSpotChecks` is what
   * decides, so switching the section off puts the categorical sentence back.
   */
  hasSpotChecks = false
): string {
  const duty =
    visitType === 'landlord'
      ? 'This report records a routine maintenance inspection of the installation on the date stated. ' +
        'It supports the landlord’s duty to keep the installation in repair and in proper working order — ' +
        'section 11(1)(b) of the Landlord and Tenant Act 1985 in England and Wales, or section 13 of the ' +
        'Housing (Scotland) Act 2014 in Scotland. '
      : 'This report records a routine maintenance inspection of the installation on the date stated. ' +
        'It supports the duty under Regulation 4(2) of the Electricity at Work Regulations 1989 to maintain ' +
        'electrical systems so as to prevent danger, so far as is reasonably practicable. ';

  const testing = hasSpotChecks
    ? 'A limited number of spot-check measurements were taken during this visit and are recorded on this ' +
      'report. They are individual readings at the points stated — not a schedule of test results and not a ' +
      'sampling exercise. No circuit has been tested in full, no sampling plan has been applied, and no ' +
      'assessment of compliance with BS 7671 has been made. A reading recorded here is evidence of what was ' +
      'measured at that point, on that day, with the instrument stated, and nothing more. '
    : 'No verification testing was carried out as part of this visit: there are no measured values for earth ' +
      'fault loop impedance, insulation resistance, continuity or residual current device operating time, and ' +
      'no assessment of compliance with BS 7671 has been made. ';

  return (
    duty +
    'It is not an Electrical Installation Condition Report and does not replace one. ' +
    testing +
    'Only those parts of the installation that were accessible and could be safely examined on the day have ' +
    'been inspected. A satisfactory result means no defect was found during this visit — it does not mean ' +
    'the installation has been proven safe by test.'
  );
}

/** Added to the limitations only when a thermal survey was carried out. */
export const THERMAL_SURVEY_LIMITATIONS =
  'Thermographic survey detects temperature differences at the surfaces that were visible to the camera ' +
  'at the time of the survey, under the load then flowing. A component that is lightly loaded, concealed ' +
  'behind a cover or barrier, or not in line of sight cannot be assessed by this method, and a fault that ' +
  'is not generating heat will not be detected. The severity ratings quoted are the temperature-rise ' +
  'criteria published in the NETA Maintenance Testing Specifications; they are guidance for prioritising ' +
  'remedial work and are not a statement of compliance with any standard.';
