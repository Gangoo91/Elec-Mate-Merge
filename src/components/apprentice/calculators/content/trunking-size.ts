import type { CalculatorContent } from './types';

/**
 * Trunking sizing — 45% space factor.
 *
 * CORRECTION: previously headed "IET On-Site Guide / BS 7671 Reg 522.8.1". BS 7671:2018+A4:2026
 * contains no trunking fill or space factor anywhere; Reg 522.8.1 is about avoiding damage to
 * the sheath, insulation and terminations (and bans detrimental lubricants), and the "undue
 * mechanical strain" requirement is Reg 522.8.5. The 45% figure is IET On-Site Guide / industry
 * guidance only.
 */
export const trunkingSizeContent: CalculatorContent = {
  slug: 'trunking-size',
  governingStandards: ['IET On-Site Guide', 'BS 7671'],

  whyItMatters: [
    'Cable trunking is sized so the cables occupy no more than about 45% of its internal cross-section — enough room to lay cables in without damage. This 45% space factor is IET On-Site Guide guidance, not a BS 7671 requirement.',
    'The IET On-Site Guide uses a cable-factor / trunking-factor method: sum the cable factors and choose a trunking whose factor is at least that total.',
    'Overfilled trunking runs hot (apply grouping derating) and is hard to add to later.',
    'Right-sizing leaves capacity for future circuits and keeps the install tidy and compliant.',
  ],

  whenToCheck: [
    'Selecting trunking for a known set of cables',
    'When future spare capacity is wanted',
    'Where many circuits share the trunking (apply grouping derating too)',
    'Confirming the 45% space factor is not exceeded',
  ],

  commonMistakes: [
    'Treating a 45% fill pass as a compliance pass — fill is physical, not thermal',
    'Forgetting grouping derating (Reg 523.4, Table 4C1) for cables bunched in trunking — it applies even where the trunking has an internal barrier or partition (Table 4A2 note b)',
    'Leaving no spare capacity for additions',
    'Mixing cable factors and physical areas inconsistently',
  ],

  // CORRECTED. The old worked example used "2500 mm²" as the internal area of 50×50 trunking.
  // 2500 mm² is the gross 50×50 external envelope, not an internal area, and it contradicted
  // the calculator's own dataset on the same page (trunkingData.ts holds 1900 mm² for 50×50
  // PVC Maxi and 1800 mm² for 50×50 Steel). It also mixed On-Site Guide dimensionless "cable
  // factors" with physical mm² areas. Rewritten to use physical areas throughout, consistent
  // with the engine.
  workedExample: {
    scenario: 'Eight 2.5 mm² twin & earth cables in 50×50 mm PVC maxi trunking.',
    inputs: [
      { label: 'Cable area (2.5 mm² T&E, 11.0 × 7.3 mm)', value: '80.3 mm² each' },
      { label: 'Trunking internal area (50×50 PVC maxi)', value: '1900 mm²' },
      { label: 'Space factor', value: '45%' },
    ],
    steps: [
      'Total cable area = 8 × 80.3 = 642.4 mm²',
      'Usable area = internal area × 0.45 = 1900 × 0.45 = 855 mm²',
      'Required ≤ usable: 642.4 ≤ 855',
      'Fill = 642.4 ÷ 1900 = 33.8% — within the 45% space factor',
    ],
    result:
      '50×50 PVC maxi is adequate on fill (33.8%). Grouping derating is a separate check — see below.',
  },

  // CORRECTED citations. Reg 522.8.1 does not contain the "mechanical strain" wording (that is
  // 522.8.5) and BS 7671 contains no space factor at all, so the 45% figure is no longer
  // presented as a BS 7671 clause.
  standards: [
    {
      standard: 'BS 7671',
      citation: 'Regulation 522.8.1',
      clauseText:
        'A wiring system shall be selected and erected to avoid, during installation, use or maintenance, damage to the sheath or insulation of cables and their terminations. The use of any lubricants that can have a detrimental effect on the cable or wiring system is not permitted.',
      tableRefs: [],
    },
    {
      standard: 'BS 7671',
      citation: 'Regulation 522.8.5',
      clauseText:
        'Every cable or conductor shall be supported in such a way that it is not exposed to undue mechanical strain and so that there is no appreciable mechanical strain on the terminations of the conductors, account being taken of mechanical strain imposed by the supported weight of the cable or conductor itself.',
      tableRefs: [],
    },
    {
      standard: 'BS 7671',
      citation: 'Regulation 523.4',
      clauseText:
        'The group rating factors of Tables 4C1 to 4C6 of Appendix 4 apply to groups of non-sheathed or sheathed cables having the same maximum operating temperature. Table 4A2 note (b) confirms that where there is more than one circuit in the trunking the Table 4C1 group rating factor applies, irrespective of the presence of an internal barrier or partition.',
      tableRefs: ['Table 4C1', 'Table 4A2 note (b)'],
    },
    {
      standard: 'IET On-Site Guide',
      citation: '45% space factor',
      clauseText:
        'The 45% space factor and the cable-factor / trunking-factor method are IET On-Site Guide guidance. They are not requirements of BS 7671, which sets no trunking fill percentage.',
      tableRefs: ['On-Site Guide (trunking factors)'],
    },
  ],

  _grounding: {
    status: 'needs-review',
    generatedAt: '2026-08-06',
    notes:
      'Reg 522.8.1, 522.8.5, 523.4 and Table 4A2 note (b) verified against BS 7671:2018+A4:2026. The 45% space factor is NOT in BS 7671 — full-text search finds no trunking space factor — and could not be verified in the On-Site Guide corpus either, so it is presented as OSG/industry guidance. Trunking internal areas and SWA overall diameters in src/lib/calculators/bs7671-data/trunkingData.ts are manufacturer data, not verifiable from BS 7671; the SWA list holds one diameter per conductor size with no core-count dimension.',
  },
};
