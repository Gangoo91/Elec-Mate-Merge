import type { CalculatorContent } from './types';

/**
 * Bonding conductor size — main and supplementary protective bonding.
 *
 * Every figure below was read from the printed BS 7671:2018+A4:2026
 * (Desktop/BS7671_ocr.pdf), not from the RAG, which mis-attributes.
 *
 * 🔴 THIS IS NOT AN ADIABATIC CALCULATION. Bonding conductors are sized by
 * Reg 544.1 / 544.2 and Table 54.8 — a lookup and a fraction, not S = √(I²t)/k.
 * The adiabatic equation sizes a CPC for fault withstand, a different question.
 */
export const bondingConductorSizeContent: CalculatorContent = {
  slug: 'bonding-conductor-size',
  governingStandards: ['BS 7671'],

  whyItMatters: [
    'Main bonding ties the incoming metallic services to the main earthing terminal so that, during a fault, everything a person can touch rises together instead of a dangerous voltage appearing between the tap and the boiler.',
    'The sizing rule changes completely with the earthing arrangement: on PME (TN-C-S) it is a Table 54.8 lookup against the supply PEN conductor, and on TN-S or TT it is half the earthing conductor. Applying the wrong one is the single most common sizing error.',
    'Supplementary bonding is a different calculation again — a fraction of the circuit protective conductor, with a floor that rises when the conductor is not mechanically protected.',
    'An undersized main bond is one of the most frequently recorded departures on an EICR, and it is cheap to get right at first fix and expensive to put right afterwards.',
  ],

  whenToCheck: [
    'On any new installation or consumer unit change — the existing bond is often 6 mm² or 10 mm² and undersized for the current supply',
    'When the DNO upgrades the supply or the tails are increased, because Table 54.8 keys off the PEN conductor',
    'In a bathroom, swimming pool or agricultural location where supplementary bonding may be required',
    'On an EICR, before recording a departure — check the earthing arrangement first, then the rule that applies to it',
  ],

  commonMistakes: [
    'Using the adiabatic equation to size a bonding conductor — bonding is sized by Reg 544, not by S = √(I²t) ÷ k',
    'Applying the "half the earthing conductor" rule on a PME supply, where Table 54.8 governs instead',
    'Sizing from the tails rather than from the supply PEN conductor on PME',
    'Forgetting the 4 mm² floor for a supplementary bond that has no mechanical protection',
    'Assuming 10 mm² is always enough on PME — over 35 mm² PEN it is not, and the distributor may require more still',
  ],

  workedExample: {
    scenario: 'Domestic PME (TN-C-S) supply with a 25 mm² PEN conductor; sizing the main bond to gas and water.',
    inputs: [
      { label: 'Earthing arrangement', value: 'TN-C-S (PME)' },
      { label: 'Supply PEN conductor', value: '25 mm²' },
      { label: 'Rule that applies', value: 'Table 54.8 lookup' },
    ],
    steps: [
      'PME conditions apply, so Reg 544.1.1 sends us to Table 54.8 — not to the half-the-earthing-conductor rule',
      'Table 54.8 row: PEN of 35 mm² or less → 10 mm² minimum',
      '25 mm² falls in that row, so the minimum is 10 mm² copper',
      'Check the Table 54.8 NOTE: the local distributor may require a larger conductor',
    ],
    result: '10 mm² copper minimum to each extraneous-conductive-part — subject to the distributor’s own requirement.',
  },

  standards: [
    {
      standard: 'BS 7671',
      citation: 'Regulation 544.1.1 — main protective bonding, both rules',
      clauseText:
        'Except where PME conditions apply, a main protective bonding conductor shall have a cross-sectional area not less than HALF the cross-sectional area required for the earthing conductor of the installation. Where an installation serves more than one building, it shall be selected in accordance with the characteristics of the distribution circuit protective conductor for that particular building. The cross-sectional area shall be not less than 6 mm², and need not exceed 25 mm² if the bonding conductor is of copper or a cross-sectional area affording equivalent conductance in other metals. EXCEPT FOR HIGHWAY POWER SUPPLIES AND STREET FURNITURE, where PME conditions apply the main protective bonding conductor shall be selected in accordance with the PEN conductor of the supply and Table 54.8. Where an installation has more than one source of supply to which PME conditions apply, it shall be selected according to the LARGEST PEN conductor of the supply.',
      tableRefs: ['Reg 544.1.1', 'Table 54.8'],
    },
    {
      standard: 'BS 7671',
      citation: 'Table 54.8 — minimum CSA of the main bond against the supply PEN',
      clauseText:
        'PEN 35 mm² or less → 10 mm². Over 35 up to 50 mm² → 16 mm². Over 50 up to 95 mm² → 25 mm². Over 95 up to 150 mm² → 35 mm². Over 150 mm² → 50 mm². The tabulated figure is a minimum COPPER EQUIVALENT area — either a copper conductor of that size, or a conductor of another metal affording equivalent conductance. NOTE (printed with the table): “Local distributor’s network conditions may require a larger conductor.” That note is not decorative; it is the thing that catches people out.',
      tableRefs: ['Table 54.8'],
    },
    {
      standard: 'BS 7671',
      citation: 'Regulation 544.1.2 — WHERE the connection is made',
      clauseText:
        'The main protective bonding connection to any extraneous-conductive-part such as gas, water or other metallic pipework or service shall be made as near as practicable to the point of entry of that part into the premises. Where there is a meter, isolation point or union, the connection shall be made to the consumer’s hard metal pipework and BEFORE any branch pipework. Where practicable the connection shall be made within 600 mm of the meter outlet union, or at the point of entry to the building if the meter is external. A correctly sized bond in the wrong place is still a departure.',
      tableRefs: ['Reg 544.1.2'],
    },
    {
      standard: 'BS 7671',
      citation: 'Regulations 544.2.1 / 544.2.2 / 544.2.3 — supplementary bonding',
      clauseText:
        'Two EXPOSED-conductive-parts (544.2.1): conductance, if sheathed or otherwise provided with mechanical protection, not less than that of the SMALLER protective conductor connected to them; if mechanical protection is not provided, not less than 4 mm². An exposed- to an EXTRANEOUS-conductive-part (544.2.2): conductance, if mechanically protected, not less than HALF that of the protective conductor connected to the exposed-conductive-part; if not mechanically protected, not less than 4 mm². Two EXTRANEOUS-conductive-parts (544.2.3): not less than 2.5 mm² if sheathed or otherwise mechanically protected, or 4 mm² if not.',
      tableRefs: ['Reg 544.2.1', 'Reg 544.2.2', 'Reg 544.2.3'],
    },
  ],

  _grounding: {
    status: 'verified',
    generatedAt: '2026-08-09',
    notes:
      'Every figure re-read from the printed BS 7671:2018+A4:2026 (Desktop/BS7671_ocr.pdf): all five Table 54.8 rows, the copper-equivalent footnote, the distributor NOTE, the non-PME half/6/25 rule, the largest-PEN rule for multiple sources, and 544.2.1/.2/.3 verbatim. Two qualifiers the calculator did not previously surface were found on that read and are captured here: Table 54.8 does NOT apply to highway power supplies and street furniture, and Reg 544.1.2 fixes WHERE the connection is made (consumer’s hard metal pipework, before any branch, within 600 mm of the meter outlet union where practicable). This calculator deliberately does NOT assign an EICR code — the code depends on the specific installation and is the inspector’s judgement.',
  },
};
