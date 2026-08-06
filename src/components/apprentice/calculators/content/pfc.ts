import type { CalculatorContent } from './types';

/**
 * Prospective fault current (PFC) — grounded against BS 7671:2018+A4:2026.
 *
 * CORRECTION (audit): this file previously cited "Regulation 434.5.2" as the
 * breaking-capacity clause and backed it with two facet ids that say nothing
 * about breaking capacity.
 *   - 434.5.2 is the *energy let-through / operating characteristic* clause
 *     (it carries the k factor from Tables 43.1 and 54.2–54.6 and cross-refers
 *     to Appendix 4 Sections 2.3.3.1 and 6). It is the adiabatic requirement,
 *     not the breaking-capacity requirement.
 *   - The printed index of BS 7671:2018+A4:2026 lists "Breaking capacity —
 *     432.3, 434.5.1, 536.4.2". Reg 536.6 states "Regulation 434.5.1 permits a
 *     device with a lower rated breaking capacity than the prospective
 *     short-circuit current at its point of installation to be used in
 *     specific conditions."
 * The citations below are now taken verbatim from clauses that were read in
 * full (Reg 434.1, 432.1, 432.3, 536.4.5, Appendix 14) rather than paraphrased
 * onto a clause number that does not carry the requirement.
 */
export const pfcContent: CalculatorContent = {
  slug: 'pfc',
  governingStandards: ['BS 7671', 'IET Guidance Note 3', 'IET On-Site Guide'],

  whyItMatters: [
    'Prospective fault current (PFC) is the highest current that would flow on a dead short at a point in the installation — it sets the breaking capacity every protective device must meet.',
    'In a single-phase system the PFC is the GREATER of the fault current between line and neutral and the fault current between line and Earth (BS 7671 Appendix 14). Taking the earth fault loop value alone can badly under-state it, because on a TN-C-S supply the line–neutral loop is usually the lower impedance of the two.',
    'In a three-phase installation the highest PFC occurs on a simultaneous fault between all three line conductors, and is approximately twice the line–neutral value (Appendix 14). Quoting the single-phase figure on a three-phase board halves the answer.',
    'A device with a breaking capacity below the PFC at its location can fail catastrophically during a fault, so this value must be determined and recorded.',
    'PFC is highest at the origin and falls with distance as cable impedance is added.',
  ],

  whenToCheck: [
    'At the origin of the installation, to confirm the main device’s breaking capacity',
    'When measuring PFC during initial verification (it is a recorded test result — Reg 643.7.3.201)',
    'Before selecting devices for a new board or sub-distribution',
    'When the DNO declares a maximum prospective fault current at the supply',
    'Whenever an additional source (embedded generation, storage, UPS) can contribute to the fault — Appendix 14 requires all combinations of supply arrangements to be considered',
  ],

  commonMistakes: [
    'Recording only the line–earth value and ignoring the line–neutral value — Appendix 14 says the PFC is the greater of the two',
    'Reporting the single-phase figure on a three-phase board — the highest three-phase value is about twice the line–neutral value',
    'Confusing 400 V with U₀ — the loop impedance calculation uses the nominal line-to-neutral voltage (230 V), not the line-to-line voltage',
    'Selecting a device whose breaking capacity is below the PFC at its position',
    'Assuming PFC is the same throughout the installation — it falls with distance from the source',
    'Confusing the measured PFC with the design fault current used in the adiabatic check',
    'Asking for a "16 kA MCB" — 16 kA in BS 7671 is the conditional short-circuit rating of a consumer unit assembly (Reg 536.4.5, Annex ZB of BS EN 61439-3), not a device breaking capacity',
  ],

  workedExample: {
    scenario:
      'Three-phase board, U₀ 230 V. Earth fault loop Ze 0.35 Ω + (R1+R2) 0.05 Ω. Line–neutral loop measured at 0.30 Ω.',
    inputs: [
      { label: 'External loop (Ze)', value: '0.35 Ω' },
      { label: 'Circuit (R1+R2)', value: '0.05 Ω' },
      { label: 'Line–neutral loop', value: '0.30 Ω' },
      { label: 'Nominal line-to-neutral voltage (U₀)', value: '230 V' },
    ],
    steps: [
      'Earth fault loop: Zs = Ze + (R1 + R2) = 0.35 + 0.05 = 0.40 Ω',
      'Prospective earth fault current = U₀ ÷ Zs = 230 ÷ 0.40 = 575 A',
      'Prospective short-circuit current (line–neutral) = U₀ ÷ 0.30 = 767 A',
      'Highest three-phase value ≈ line–neutral × 2 = 767 × 2 = 1533 A (Appendix 14)',
      'PFC = greatest of the three = 1533 A ≈ 1.53 kA',
    ],
    result:
      '≈ 1.53 kA. Note the single-phase earth fault figure alone (575 A) would have under-stated this by a factor of about 2.7.',
  },

  standards: [
    {
      standard: 'BS 7671',
      citation: 'Regulation 434.1',
      clauseText:
        'The prospective fault current shall be determined at every relevant point of the installation. This shall be done by calculation, measurement or enquiry.',
      tableRefs: ['Appendix 14', 'Regulation 643.7.3.201'],
    },
    {
      standard: 'BS 7671',
      citation: 'Appendix 14 — Determination of prospective fault current',
      clauseText:
        'In a three-phase installation the highest prospective fault current occurs with a simultaneous fault between all line conductors. An approximation of the prospective fault current between line conductors can be determined by a measurement between a line conductor and neutral multiplied by √3. An approximation of the prospective fault current due to a simultaneous short-circuit fault between all line conductors is determined by measurement between line and neutral multiplied by 2. In a single-phase system the prospective fault current is the greater of either the fault current between the line conductor and neutral or the fault current between line conductor and Earth.',
      tableRefs: ['Regulation 434.1', 'Regulation 643.7.3.201'],
    },
    {
      standard: 'BS 7671',
      citation: 'Regulation 432.1 / 432.3',
      clauseText:
        'Except as permitted by Regulation 434.5.1, a device providing protection against both overload and fault current shall be capable of breaking, and for a circuit-breaker making, any overcurrent up to and including the maximum prospective fault current at the point where the device is installed. The same requirement applies to a device providing protection against fault current only.',
      tableRefs: ['Regulation 434.5.1', 'Regulation 536.4.2'],
    },
    {
      standard: 'BS 7671',
      citation: 'Regulation 434.5.1 (via Regulation 536.6)',
      clauseText:
        'Regulation 434.5.1 permits a device with a lower rated breaking capacity than the prospective short-circuit current at its point of installation to be used in specific conditions. Where combined short-circuit protection is used, reference shall be made to the instructions of the manufacturer of the downstream device; where no such information is available, combined short-circuit protection shall not be used and each device shall have the required short-circuit capability at its point of installation.',
      tableRefs: ['Regulation 536.4.2.1', 'Regulation 536.6', 'Regulation 826.1.2.3'],
    },
    {
      standard: 'BS 7671',
      citation: 'Regulation 536.4.5',
      clauseText:
        'For an installation with a 230 V single-phase supply rated up to 100 A that is under the control of ordinary persons, switchgear and controlgear assemblies shall either comply with BS EN 61439-3 having a suitable fault current (short-circuit) rating for the maximum prospective fault current at the point of connection to the system, or be a consumer unit incorporating components and protective devices specified by the manufacturer complying with BS EN 61439-3, including the 16 kA conditional short-circuit test described in Annex ZB of that standard.',
      tableRefs: ['Appendix 14'],
    },
    {
      standard: 'BS 7671',
      citation: 'Regulation 533.3',
      clauseText:
        'Where the standard covering a protective device specifies both a rated service short-circuit breaking capacity and a rated ultimate short-circuit breaking capacity, it is acceptable to select the protective device on the basis of the ultimate short-circuit breaking capacity for the maximum fault current conditions. Operational circumstances may, however, make it desirable to select on the service short-circuit breaking capacity, for example where a protective device is placed at the origin of the installation.',
    },
    {
      standard: 'IET Guidance Note 3',
      citation: 'Chapter 2, clause 2.29',
      clauseText:
        'Where an instrument cannot measure voltage between line conductors directly, it can be assumed that for three-phase supplies the maximum balanced prospective short-circuit level will be, as a rule of thumb, approximately twice the single-phase value. This assumption errs on the side of safety.',
    },
    {
      standard: 'IET On-Site Guide',
      citation: 'Chapter 10, clause 10.3.7',
      clauseText:
        'For three-phase supplies, prospective fault current measurements should be made at the distribution board between the relevant conductors (live-to-live and live-to-earth); the maximum possible fault level will be approximately twice that of the single-phase value.',
    },
  ],

  _grounding: {
    status: 'verified',
    generatedAt: '2026-08-06',
    notes:
      'Re-grounded after audit. Previous citation "Regulation 434.5.2" was wrong for breaking capacity (434.5.2 is the energy let-through / adiabatic clause; the printed index lists breaking capacity under 432.3, 434.5.1 and 536.4.2) and its two sourceFacetIds pointed at a Symbols-table fragment under Reg 434.53 and a cross-reference stub under Reg 434.2.2 — neither mentions breaking capacity. Those ids are removed. Appendix 14 text quoted verbatim from the printed standard; GN3 2.29 and OSG 10.3.7 corroborate the ×2 three-phase rule.',
  },
};
