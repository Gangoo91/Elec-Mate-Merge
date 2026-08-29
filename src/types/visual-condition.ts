import {
  getDefaultVisualInspectionItems,
  type VisualInspectionItem,
} from '@/data/visualConditionInspectionItems';

/**
 * Visual Condition Report (ELE-1262).
 *
 * Requested by a customer who LEFT for iCertifi over it: "No visual inspection
 * certificate. I use this a lot ... for small jobs that don't warrant a minor
 * works. For example, changing a light fitting."
 *
 * He was right that a Minor Works Certificate is the wrong document. BS 7671
 * defines minor works as "additions and alterations to an installation that do
 * not extend to the provision of a new circuit" — a like-for-like fitting
 * replacement is neither an addition nor an alteration, so no MWC is called for.
 *
 * 🔴 This is a REPORT, not a certificate, and nothing in the UI or the PDF may
 * imply BS 7671 model-form status. See the header of
 * `data/visualConditionInspectionItems.ts` for the full reasoning.
 */

/** Same codes as an EICR — an electrician should not have to learn a second set. */
export type ObservationCode = 'C1' | 'C2' | 'C3' | 'FI';

export interface VisualObservation {
  id: string;
  /** Where in the installation. */
  location: string;
  /** What was seen. */
  description: string;
  code: ObservationCode | '';
  /** Links back to a schedule item when the observation came from one. */
  itemId?: string;
  /** Data URLs. Photographs are the whole point of a visual report. */
  photos?: string[];
}

export interface VisualConditionFormData {
  /* ── Identity ─────────────────────────────────────────────────────── */
  certificateNumber: string;
  /**
   * Per-report identity minted in form state, from which the create
   * idempotency key is derived (ELE-1592). Deliberately NOT a ref — a ref
   * survives into the next report and would bind new work to the old row.
   */
  _clientCertId: string;

  /* ── Client and installation ──────────────────────────────────────── */
  clientName: string;
  clientAddress: string;
  clientPhone: string;
  clientEmail: string;
  installationAddress: string;
  sameAsClientAddress: boolean;
  occupier: string;

  /* ── Scope ────────────────────────────────────────────────────────── */
  /** Why the report was requested — landlord check, pre-purchase, post-repair. */
  purpose: string;
  /** What was covered. */
  extent: string;
  /** What was NOT covered, and why. Prints prominently. */
  limitations: string;
  inspectionDate: string;

  /*
   * ⚠️ SCOPE GUARD. The NICEIC Domestic Visual Condition Report this is
   * modelled on is for domestic or similar small installations up to 100 A
   * single phase. Beyond that an EICR is the right instrument, and the form
   * says so rather than silently producing a document that does not fit.
   */
  supplyType: '' | 'single-phase' | 'three-phase';
  mainSwitchRating: string;
  premisesType: '' | 'domestic' | 'commercial' | 'industrial' | 'other';

  /* ── Supply particulars, AS OBSERVED ──────────────────────────────── */
  /**
   * Every field here is what the inspector could SEE. None of it is measured —
   * there is no Ze, no Ipf and no Zs on this report by design, because taking
   * those requires test instruments and this report does not involve testing.
   */
  earthingArrangement: string;
  boardLocation: string;
  /** Make and type together — "Hager, metal-clad". One field, one input. */
  boardMake: string;
  numberOfWays: string;
  rcdProtection: string;

  /* ── Inspection ───────────────────────────────────────────────────── */
  inspectionItems: VisualInspectionItem[];
  observations: VisualObservation[];

  /* ── Outcome ──────────────────────────────────────────────────────── */
  /**
   * Derived, never typed. Any C1, C2 or FI makes it Unsatisfactory — the same
   * rule as an EICR, so the two documents cannot disagree about what a code
   * means. See `deriveVisualAssessment`.
   */
  overallAssessment: '' | 'satisfactory' | 'unsatisfactory';
  /** Recommended date for inspection AND TESTING — not another visual. */
  nextInspectionDate: string;
  generalCondition: string;

  /* ── Declaration ──────────────────────────────────────────────────── */
  inspectorName: string;
  inspectorPosition: string;
  inspectorSignature: string;
  inspectorDate: string;
  companyName: string;

  /** Per-tab manual completion marks. */
  completedSections: Record<string, boolean>;
}

/**
 * The overall result.
 *
 * 🔴 IT MUST CONSIDER THE SCHEDULE, NOT JUST THE OBSERVATIONS.
 *
 * The first version read observation codes alone. That produced a report where
 * all 23 items were marked "further investigation" — nothing could be
 * determined about anything — and the verdict came out SATISFACTORY, because no
 * observation had been raised. Exactly the opposite of the stated rule, on the
 * one line of the document a landlord or a buyer actually reads.
 *
 * The rule, matching an EICR so the two documents cannot disagree:
 *   • any observation coded C1, C2 or FI  → Unsatisfactory
 *   • any schedule item marked a defect    → Unsatisfactory
 *   • any schedule item marked FI          → Unsatisfactory
 *   • C3 alone                             → Satisfactory
 *
 * FI counts because "I could not determine this" is not a pass. On a
 * visual-only report that is common, and it is the honest consequence of not
 * testing rather than a flaw in the form.
 *
 * `not-verified` deliberately does NOT fail the report: something you could not
 * reach is a limitation, and it is disclosed as one in the limitations block
 * rather than silently recast as a finding.
 */
/*
 * ⚠️ `items` is REQUIRED, deliberately. It was briefly optional with a `[]`
 * default, which meant every existing call site kept the old — wrong —
 * observations-only behaviour and nothing complained. Requiring it makes the
 * compiler point at each one.
 */
export function deriveVisualAssessment(
  observations: VisualObservation[],
  items: VisualInspectionItem[]
): 'satisfactory' | 'unsatisfactory' {
  const seriousObservation = observations.some(
    (o) => o.code === 'C1' || o.code === 'C2' || o.code === 'FI'
  );
  const seriousItem = items.some(
    (i) => i.outcome === 'unsatisfactory' || i.outcome === 'further-investigation'
  );
  return seriousObservation || seriousItem ? 'unsatisfactory' : 'satisfactory';
}

/**
 * True when the installation is outside the scope this report is meant for.
 * Does not block anything — it surfaces a warning pointing at the EICR, because
 * the electrician on site is better placed to judge than a rule in a form.
 */
export function isOutsideVisualScope(d: Pick<VisualConditionFormData,
  'supplyType' | 'mainSwitchRating' | 'premisesType'>): string | null {
  if (d.supplyType === 'three-phase') {
    return 'This report is intended for single-phase installations. For a three-phase installation, an EICR is the appropriate document.';
  }
  const rating = parseInt(String(d.mainSwitchRating).replace(/[^0-9]/g, ''), 10);
  if (Number.isFinite(rating) && rating > 100) {
    return `A ${rating} A supply is above the 100 A this report is intended for. Consider an EICR instead.`;
  }
  if (d.premisesType === 'industrial') {
    return 'Industrial installations are outside the scope of a visual condition report. An EICR is the appropriate document.';
  }
  return null;
}

const today = () => new Date().toISOString().slice(0, 10);

export function getDefaultVisualConditionFormData(): VisualConditionFormData {
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

    supplyType: '',
    mainSwitchRating: '',
    premisesType: '',

    earthingArrangement: '',
    boardLocation: '',
    boardMake: '',
    numberOfWays: '',
    rcdProtection: '',

    inspectionItems: getDefaultVisualInspectionItems(),
    observations: [],

    overallAssessment: '',
    nextInspectionDate: '',
    generalCondition: '',

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
 * Without this the document could be mistaken for an EICR by a landlord, an
 * agent or a buyer — none of whom are obliged to know the difference. It says
 * what was done, what was not, and what it cannot be relied on for.
 */
export const VISUAL_CONDITION_LIMITATIONS =
  'This report records the condition of the installation as seen on the date of inspection. ' +
  'It is based on visual inspection only. No electrical testing was carried out, and no part of ' +
  'the installation was dismantled. Concealed wiring, and anything not reasonably accessible at ' +
  'the time, has not been inspected. ' +
  'This report is not an Electrical Installation Condition Report and does not confirm that the ' +
  'installation complies with BS 7671. A satisfactory result means no defect was visible — it ' +
  'does not mean the installation has been proven safe by test.';
