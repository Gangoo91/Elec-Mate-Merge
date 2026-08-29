/**
 * Visual Condition Report — inspection schedule.
 *
 * 🔴 THIS IS NOT A BS 7671 MODEL FORM, and the app must never imply that it is.
 * BS 7671 Part 6 specifies three: the Electrical Installation Certificate, the
 * Minor Electrical Installation Works Certificate, and the Electrical
 * Installation Condition Report. A visual-only record is not among them.
 *
 * It is modelled on the NICEIC **Domestic Visual Condition Report**, which is a
 * real scheme-issued document for reporting the condition of an existing
 * domestic installation — up to 100 A single phase — by visual inspection
 * alone, identifying "damage, deterioration or defects which may give rise to
 * danger".
 *
 * The regulatory anchor for the SCOPE of an inspection is Regulation 642.3:
 * the inspection shall include at least the checking of the listed items where
 * relevant. Verified against `bs7671_facets` (A4:2026), not recalled.
 *
 * ── WHY THESE ITEMS AND NOT THE EIC's 14 ──────────────────────────────────
 * The EIC schedule (`bs7671EICChecklistData.ts`) assumes testing has happened —
 * "Protective measure: Automatic Disconnection of Supply" cannot honestly be
 * signed off without a Zs measurement. Reusing it here would invite an
 * electrician to record a satisfactory result they had no way to verify.
 *
 * So this schedule is built from what is genuinely OBSERVABLE: condition,
 * presence, security, damage, labelling. Anything that needs an instrument to
 * confirm is either absent from this list or carries `requiresTest`, which the
 * UI uses to steer the outcome to Further Investigation rather than Satisfactory.
 */

/** What an inspector can honestly conclude from looking. */
export type VisualOutcome =
  | ''
  /** Visually sound, no defect apparent. */
  | 'satisfactory'
  /** Not present, or does not apply to this installation. */
  | 'not-applicable'
  /** A defect was seen — record it as an observation and code it. */
  | 'unsatisfactory'
  /**
   * Cannot be concluded by looking. On a visual-only report this is the
   * honest answer far more often than on an EICR, because no test was done.
   */
  | 'further-investigation'
  /** Could not be reached or seen — record why in the limitations. */
  | 'not-verified';

export interface VisualInspectionItem {
  id: string;
  /** Section grouping, used for the accordion headings. */
  group: string;
  itemNumber: string;
  description: string;
  outcome: VisualOutcome;
  notes?: string;
  /**
   * True where a measurement, not an eye, is what actually settles it. The
   * form offers Further investigation first on these and will not let them be
   * marked Satisfactory without a note saying what was relied on.
   */
  requiresTest?: boolean;
  /** Shown as a hint under the item. Plain English, no regulation numbers
   *  unless they have been verified in the RAG. */
  hint?: string;
}

export const visualConditionInspectionItems: VisualInspectionItem[] = [
  // ── A. Intake and supply ────────────────────────────────────────────────
  {
    id: 'vcr_1_1',
    group: 'Intake and supply',
    itemNumber: '1.1',
    description: "Service head, meter tails and metering equipment — condition and security",
    outcome: '',
    hint: 'Look for damage, overheating, missing seals or unsupported tails. Do not disturb the supplier’s equipment.',
  },
  {
    id: 'vcr_1_2',
    group: 'Intake and supply',
    itemNumber: '1.2',
    description: 'Earthing conductor — present, connections sound and accessible',
    outcome: '',
  },
  {
    id: 'vcr_1_3',
    group: 'Intake and supply',
    itemNumber: '1.3',
    description: 'Main protective bonding to water, gas and other services where visible',
    outcome: '',
    hint: 'Record what you could actually see. Buried or concealed bonding is Not verified, not Satisfactory.',
  },
  {
    id: 'vcr_1_4',
    group: 'Intake and supply',
    itemNumber: '1.4',
    description: 'Earthing and bonding conductor sizes adequate for the installation',
    outcome: '',
    requiresTest: true,
    hint: 'Sizing depends on the supply and the earthing arrangement — confirm against the certificate for the installation, or record for further investigation.',
  },

  // ── B. Consumer unit / distribution board ───────────────────────────────
  {
    id: 'vcr_2_1',
    group: 'Consumer unit or distribution board',
    itemNumber: '2.1',
    description: 'Enclosure condition, secure fixing, no visible damage',
    outcome: '',
  },
  {
    id: 'vcr_2_2',
    group: 'Consumer unit or distribution board',
    itemNumber: '2.2',
    description: 'Covers and barriers in place, no missing blanks or open knockouts',
    outcome: '',
    hint: 'A missing blank leaves live parts accessible — that is normally a C2 at least.',
  },
  {
    id: 'vcr_2_3',
    group: 'Consumer unit or distribution board',
    itemNumber: '2.3',
    description: 'No signs of overheating, arcing or thermal damage',
    outcome: '',
  },
  {
    id: 'vcr_2_4',
    group: 'Consumer unit or distribution board',
    itemNumber: '2.4',
    description: 'Circuit identification and schedule present and legible',
    outcome: '',
  },
  {
    id: 'vcr_2_5',
    group: 'Consumer unit or distribution board',
    itemNumber: '2.5',
    description: 'RCD or RCBO protection present',
    outcome: '',
    requiresTest: true,
    hint: 'Presence can be seen; operation cannot. Recording it as working needs a test.',
  },
  {
    id: 'vcr_2_6',
    group: 'Consumer unit or distribution board',
    itemNumber: '2.6',
    description: 'Protective devices appear appropriate and undamaged',
    outcome: '',
    requiresTest: true,
  },

  // ── C. Wiring systems ───────────────────────────────────────────────────
  {
    id: 'vcr_3_1',
    group: 'Wiring systems',
    itemNumber: '3.1',
    description: 'Visible cables — condition, support and protection against damage',
    outcome: '',
  },
  {
    id: 'vcr_3_2',
    group: 'Wiring systems',
    itemNumber: '3.2',
    description: 'No visible damage to cable insulation or sheathing',
    outcome: '',
  },
  {
    id: 'vcr_3_3',
    group: 'Wiring systems',
    itemNumber: '3.3',
    description: 'Joints and connections enclosed and accessible where required',
    outcome: '',
  },
  {
    id: 'vcr_3_4',
    group: 'Wiring systems',
    itemNumber: '3.4',
    description: 'Old cable colours present anywhere in the installation',
    outcome: '',
    hint: 'If old and harmonised colours are both present, a warning notice is required at the board.',
  },

  // ── D. Accessories and equipment ────────────────────────────────────────
  {
    id: 'vcr_4_1',
    group: 'Accessories and equipment',
    itemNumber: '4.1',
    description: 'Socket-outlets, switches and accessories — condition and secure fixing',
    outcome: '',
  },
  {
    id: 'vcr_4_2',
    group: 'Accessories and equipment',
    itemNumber: '4.2',
    description: 'No accessible live parts, no signs of burning or overheating',
    outcome: '',
  },
  {
    id: 'vcr_4_3',
    group: 'Accessories and equipment',
    itemNumber: '4.3',
    description: 'Luminaires and permanently connected equipment — condition',
    outcome: '',
  },
  {
    id: 'vcr_4_4',
    group: 'Accessories and equipment',
    itemNumber: '4.4',
    description: 'Accessories suitable for the conditions of the location',
    outcome: '',
  },

  // ── E. Special locations ────────────────────────────────────────────────
  {
    id: 'vcr_5_1',
    group: 'Special locations',
    itemNumber: '5.1',
    description: 'Room containing a bath or shower — equipment suitable for the zone',
    outcome: '',
  },
  {
    id: 'vcr_5_2',
    group: 'Special locations',
    itemNumber: '5.2',
    description: 'Outdoor and outbuilding equipment — enclosure condition and suitability',
    outcome: '',
  },

  // ── F. Notices and identification ───────────────────────────────────────
  {
    id: 'vcr_6_1',
    group: 'Notices and identification',
    itemNumber: '6.1',
    description: 'Periodic inspection and testing notice present',
    outcome: '',
  },
  {
    id: 'vcr_6_2',
    group: 'Notices and identification',
    itemNumber: '6.2',
    description: 'RCD quarterly test notice present where an RCD is fitted',
    outcome: '',
  },
  {
    id: 'vcr_6_3',
    group: 'Notices and identification',
    itemNumber: '6.3',
    description: 'Warning notices present where required',
    outcome: '',
    hint: 'Mixed cable colours, non-standard arrangements, or more than one supply.',
  },
];

/** Section order for rendering — derived so it cannot drift from the items. */
export const visualConditionGroups: string[] = Array.from(
  new Set(visualConditionInspectionItems.map((i) => i.group))
);

/** A fresh, unanswered copy. Never hand out the module-level array itself. */
export const getDefaultVisualInspectionItems = (): VisualInspectionItem[] =>
  visualConditionInspectionItems.map((i) => ({ ...i, outcome: '', notes: '' }));
