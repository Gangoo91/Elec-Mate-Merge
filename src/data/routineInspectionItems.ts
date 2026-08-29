/**
 * Routine Inspection & Thermal Imaging Report — schedules (ELE-1110).
 *
 * 🔴 THIS IS NOT A BS 7671 MODEL FORM, and the app must never imply that it is.
 * BS 7671 Part 6 specifies three: the EIC, the Minor Works Certificate and the
 * EICR. A planned-maintenance visit record is not among them, and nothing in
 * BS 7671 governs thermographic survey at all — "thermal effects" is Chapter 42,
 * which is protection against overheating, a different subject entirely.
 *
 * ── WHAT DOES GIVE IT STANDING ────────────────────────────────────────────
 * The Electricity at Work Regulations 1989, via HSE guidance HSR25:
 *
 *   • Reg 4(2) — "As may be necessary to prevent danger, all systems shall be
 *     maintained so as to prevent, so far as is reasonably practicable, such
 *     danger."
 *   • HSR25 §68 — inspection and, where necessary, testing is "an essential
 *     part of any preventive maintenance programme", and the frequency of it
 *     "is a matter for the judgement of the dutyholder".
 *   • HSR25 §69 — records are NOT a legal requirement, but "without effective
 *     monitoring, dutyholders cannot be certain that the requirement for
 *     maintenance has been complied with".
 *
 * So this document is the record that lets a dutyholder evidence Reg 4(2). It
 * is not itself required by law and it does not replace an EICR.
 *
 * ── 🔴 THERE IS NO GN3 INTERVAL TABLE ─────────────────────────────────────
 * The originating ticket claimed GN3 sets "1 year routine / 5 year max" for
 * domestic, commercial, educational, offices, shops and labs alike. It does not.
 * Verified against `bs7671_facets` (A4:2026):
 *
 *   • Reg 652.1 — the frequency is determined by weighing type of installation,
 *     type of equipment, use and operation, frequency and quality of
 *     maintenance, external influences, and previous reports. No single factor
 *     alone is sufficient.
 *   • "5 years to the first periodic inspection" for domestic is an ILLUSTRATIVE
 *     designer's recommendation, not a rule.
 *   • 5 years maximum is statutory only for private rented in England (the
 *     Electrical Safety Standards in the Private Rented Sector (England)
 *     Regulations 2020), and shorter at the inspector's discretion.
 *   • Nothing is published for commercial, educational, offices, shops or labs.
 *
 * The form therefore does NOT auto-suggest an interval. It captures the
 * inspector's recommendation and the reasoning behind it, which is what
 * Reg 652.1 and HSR25 §68 both actually ask for.
 *
 * Note also that GN3's own term "routine checks" means the visual and
 * functional examinations carried out DURING verification and recorded in the
 * Schedule of Inspections. It does not mean a periodic maintenance visit. This
 * report is not a GN3 "routine check" and does not use the phrase.
 */

/** What a maintenance visit can honestly conclude about an item. */
export type RoutineOutcome =
  | ''
  /** Checked, no defect found. */
  | 'satisfactory'
  /** A defect was found — record it as an observation. */
  | 'defect'
  /** Not present, or does not apply to this installation. */
  | 'not-applicable'
  /** Could not be reached, opened or seen. Prints in the limitations. */
  | 'not-verified';

export interface RoutineInspectionItem {
  id: string;
  group: string;
  itemNumber: string;
  description: string;
  outcome: RoutineOutcome;
  notes?: string;
  /** Shown as a hint under the item. Plain English. */
  hint?: string;
}

/**
 * The maintenance schedule.
 *
 * Deliberately NOT the EICR schedule. An EICR is a condition assessment of the
 * whole installation backed by testing; this is a planned-maintenance visit of
 * one to two hours. Reusing the EICR items would invite an electrician to sign
 * off ADS, Zs and insulation resistance from a visit where none of them were
 * measured — which is the precise failure this document must not enable.
 *
 * What is here is what a maintenance visit genuinely covers: security of
 * connections, condition of enclosures and equipment, cleanliness, ventilation,
 * labelling, and the operation of what can be operated without a test
 * instrument.
 */
export const routineInspectionItems: RoutineInspectionItem[] = [
  // ── A. Intake and switchgear ────────────────────────────────────────────
  {
    id: 'rir_1_1',
    group: 'Intake and switchgear',
    itemNumber: '1.1',
    description: 'Intake position and metering equipment — condition, security, no overheating',
    outcome: '',
    hint: 'Do not disturb the supplier’s equipment. Report damage or broken seals to the DNO.',
  },
  {
    id: 'rir_1_2',
    group: 'Intake and switchgear',
    itemNumber: '1.2',
    description: 'Main switch and isolators — condition, operation and secure mounting',
    outcome: '',
  },
  {
    id: 'rir_1_3',
    group: 'Intake and switchgear',
    itemNumber: '1.3',
    description: 'Earthing conductor and main protective bonding — present, sound and accessible',
    outcome: '',
  },
  {
    id: 'rir_1_4',
    group: 'Intake and switchgear',
    itemNumber: '1.4',
    description: 'Access to and working space around switchgear unobstructed',
    outcome: '',
    hint: 'A board that cannot be reached in an emergency is a finding in its own right.',
  },

  // ── B. Distribution boards ──────────────────────────────────────────────
  {
    id: 'rir_2_1',
    group: 'Distribution boards',
    itemNumber: '2.1',
    description: 'Enclosure condition, secure fixing, covers and barriers in place',
    outcome: '',
  },
  {
    id: 'rir_2_2',
    group: 'Distribution boards',
    itemNumber: '2.2',
    description: 'No signs of overheating, arcing, discolouration or thermal damage',
    outcome: '',
    hint: 'Discolouration or a smell of hot plastic warrants opening up and a thermal check under load.',
  },
  {
    id: 'rir_2_3',
    group: 'Distribution boards',
    itemNumber: '2.3',
    description: 'Interior free from dust, debris, moisture and vermin ingress',
    outcome: '',
  },
  {
    id: 'rir_2_4',
    group: 'Distribution boards',
    itemNumber: '2.4',
    description: 'Ventilation and cooling paths clear; ambient within equipment rating',
    outcome: '',
  },
  {
    id: 'rir_2_5',
    group: 'Distribution boards',
    itemNumber: '2.5',
    description: 'Circuit identification, schedule and notices present and legible',
    outcome: '',
  },
  {
    id: 'rir_2_6',
    group: 'Distribution boards',
    itemNumber: '2.6',
    description: 'Spare ways blanked; no unused open knockouts',
    outcome: '',
  },

  // ── C. Terminations and connections ─────────────────────────────────────
  {
    id: 'rir_3_1',
    group: 'Terminations and connections',
    itemNumber: '3.1',
    description: 'Incoming and outgoing terminations checked for tightness',
    outcome: '',
    hint: 'Record the torque settings and the instrument used in the section below.',
  },
  {
    id: 'rir_3_2',
    group: 'Terminations and connections',
    itemNumber: '3.2',
    description: 'Busbar and device connections — condition, no discolouration',
    outcome: '',
  },
  {
    id: 'rir_3_3',
    group: 'Terminations and connections',
    itemNumber: '3.3',
    description: 'Earth bar and neutral bar connections secure and correctly identified',
    outcome: '',
  },
  {
    id: 'rir_3_4',
    group: 'Terminations and connections',
    itemNumber: '3.4',
    description: 'No signs of conductor damage, overheating or incorrect termination',
    outcome: '',
  },

  // ── D. Protective devices ───────────────────────────────────────────────
  {
    id: 'rir_4_1',
    group: 'Protective devices',
    itemNumber: '4.1',
    description: 'Devices secure, undamaged and correctly seated',
    outcome: '',
  },
  {
    id: 'rir_4_2',
    group: 'Protective devices',
    itemNumber: '4.2',
    description: 'RCD / RCBO test buttons operated and devices reset',
    outcome: '',
    hint: 'The test button proves the mechanism only. It does not measure trip time — that needs an instrument and is not part of this visit.',
  },
  {
    id: 'rir_4_3',
    group: 'Protective devices',
    itemNumber: '4.3',
    description: 'No evidence of nuisance tripping, repeated operation or heat damage',
    outcome: '',
  },
  {
    id: 'rir_4_4',
    group: 'Protective devices',
    itemNumber: '4.4',
    description: 'Surge protective device status indicators checked where fitted',
    outcome: '',
  },

  // ── E. Wiring systems and accessories ───────────────────────────────────
  {
    id: 'rir_5_1',
    group: 'Wiring systems and accessories',
    itemNumber: '5.1',
    description: 'Visible cables, trunking and containment — condition, support and fixing',
    outcome: '',
  },
  {
    id: 'rir_5_2',
    group: 'Wiring systems and accessories',
    itemNumber: '5.2',
    description: 'Accessories and equipment — condition, secure fixing, no accessible live parts',
    outcome: '',
  },
  {
    id: 'rir_5_3',
    group: 'Wiring systems and accessories',
    itemNumber: '5.3',
    description: 'Fire-stopping and sealing at penetrations intact where visible',
    outcome: '',
  },
  {
    id: 'rir_5_4',
    group: 'Wiring systems and accessories',
    itemNumber: '5.4',
    description: 'Equipment suitable for the environment and external influences present',
    outcome: '',
  },

  // ── F. Records and safety provision ─────────────────────────────────────
  {
    id: 'rir_6_1',
    group: 'Records and safety provision',
    itemNumber: '6.1',
    description: 'Previous inspection, test and maintenance records available on site',
    outcome: '',
    hint: 'HSR25 §69 — records are not a legal requirement, but without them a dutyholder cannot demonstrate that maintenance has been effective.',
  },
  {
    id: 'rir_6_2',
    group: 'Records and safety provision',
    itemNumber: '6.2',
    description: 'Emergency switching, isolation and lock-off provision available and identified',
    outcome: '',
  },
  {
    id: 'rir_6_3',
    group: 'Records and safety provision',
    itemNumber: '6.3',
    description: 'Warning, safety and instructional notices present and legible',
    outcome: '',
  },
];

/** Section order for rendering — derived so it cannot drift from the items. */
export const routineInspectionGroups: string[] = Array.from(
  new Set(routineInspectionItems.map((i) => i.group))
);

/** A fresh, unanswered copy. Never hand out the module-level array itself. */
export const getDefaultRoutineInspectionItems = (): RoutineInspectionItem[] =>
  routineInspectionItems.map((i) => ({ ...i, outcome: '', notes: '' }));
