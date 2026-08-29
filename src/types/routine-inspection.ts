import {
  getDefaultRoutineInspectionItems,
  type RoutineInspectionItem,
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

export interface RoutineObservation {
  id: string;
  location: string;
  description: string;
  code: ObservationCode | '';
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

  /* ── Client and site ──────────────────────────────────────────────── */
  clientName: string;
  clientAddress: string;
  clientPhone: string;
  clientEmail: string;
  installationAddress: string;
  sameAsClientAddress: boolean;
  occupier: string;

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
   */
  nextInspectionDate: string;
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

    clientName: '',
    clientAddress: '',
    clientPhone: '',
    clientEmail: '',
    installationAddress: '',
    sameAsClientAddress: false,
    occupier: '',

    purpose: '',
    extent: '',
    limitations: '',
    inspectionDate: today(),
    premisesType: '',
    supplyType: '',
    boardsCovered: '',

    inspectionItems: getDefaultRoutineInspectionItems(),
    observations: [],

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
    nextInspectionDate: '',
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
export const ROUTINE_INSPECTION_LIMITATIONS =
  'This report records a routine maintenance inspection of the installation on the date stated. ' +
  'It supports the duty under Regulation 4(2) of the Electricity at Work Regulations 1989 to maintain ' +
  'electrical systems so as to prevent danger, so far as is reasonably practicable. ' +
  'It is not an Electrical Installation Condition Report and does not replace one. ' +
  'No verification testing was carried out as part of this visit: there are no measured values for earth ' +
  'fault loop impedance, insulation resistance, continuity or residual current device operating time, and ' +
  'no assessment of compliance with BS 7671 has been made. ' +
  'Only those parts of the installation that were accessible and could be safely examined on the day have ' +
  'been inspected. A satisfactory result means no defect was found during this visit — it does not mean ' +
  'the installation has been proven safe by test.';

/** Added to the limitations only when a thermal survey was carried out. */
export const THERMAL_SURVEY_LIMITATIONS =
  'Thermographic survey detects temperature differences at the surfaces that were visible to the camera ' +
  'at the time of the survey, under the load then flowing. A component that is lightly loaded, concealed ' +
  'behind a cover or barrier, or not in line of sight cannot be assessed by this method, and a fault that ' +
  'is not generating heat will not be detected. The severity ratings quoted are the temperature-rise ' +
  'criteria published in the NETA Maintenance Testing Specifications; they are guidance for prioritising ' +
  'remedial work and are not a statement of compliance with any standard.';
