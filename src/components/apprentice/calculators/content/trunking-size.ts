import type { CalculatorContent } from './types';

/**
 * Trunking sizing — 45% space factor.
 *
 * CORRECTION: previously headed "IET On-Site Guide / BS 7671 Reg 522.8.1". BS 7671:2018+A4:2026
 * contains no trunking fill or space factor anywhere; Reg 522.8.1 is about avoiding damage to
 * the sheath, insulation and terminations (and bans detrimental lubricants), and the "undue
 * mechanical strain" requirement is Reg 522.8.5.
 *
 * The 45% space factor IS now verified — read from IET On-Site Guide Appendix E (the note under
 * Table E6, and the paragraph covering sizes/types outside Tables E5/E6, which sanctions exactly
 * the percentage-area method this calculator uses). It is On-Site Guide guidance, not a BS 7671
 * requirement — BS 7671 contains no trunking fill or space factor anywhere.
 */
export const trunkingSizeContent: CalculatorContent = {
  slug: 'trunking-size',
  governingStandards: ['IET On-Site Guide', 'BS 7671'],

  whyItMatters: [
    'Cable trunking is sized so the cables occupy no more than about 45% of its internal cross-section — enough room to lay cables in without damage. This 45% space factor is IET On-Site Guide Appendix E guidance, not a BS 7671 requirement — BS 7671 sets no trunking fill figure at all.',
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
    'Forgetting grouping derating (Reg 523.5, Table 4C1) for cables bunched in trunking — it applies even where the trunking has an internal barrier or partition (Table 4A2 note b)',
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
      citation: 'Regulation 523.5 — Groups containing more than one circuit',
      clauseText:
        'The group rating factors, see Tables 4C1 to 4C6 of Appendix 4, are applicable to groups of non-sheathed or sheathed cables having the same maximum operating temperature. For groups containing cables having DIFFERENT maximum operating temperatures, the current-carrying capacity of all the cables in the group shall be based on the LOWEST maximum operating temperature of any cable in the group, together with the appropriate group rating factor. If, due to known operating conditions, a cable is expected to carry a current not greater than 30% of its grouped current-carrying capacity, it may be ignored for the purpose of obtaining the rating factor. Table 4A2 note (b) confirms that where there is more than one circuit in the trunking the Table 4C1 group rating factor applies, irrespective of the presence of an internal barrier or partition.',
      tableRefs: ['Table 4C1', 'Table 4A2 note (b)'],
    },
    {
      standard: 'IET On-Site Guide',
      citation: 'On-Site Guide Appendix E — the 45% space factor, quoted',
      clauseText:
        'Two methods sit side by side. For the cables and trunking listed in Tables E5 and E6, add the cable factors and compare with the trunking factors; the note printed under Table E6 records that “space factor is 45% with trunking thickness taken into account”. For anything NOT listed: “For sizes and types of cable or trunking other than those given in Tables E5 and E6, the number of cables installed should be such that the resulting space factor does not exceed 45% of the net internal cross-sectional area.” Space factor is defined as “the ratio (expressed as a percentage) of the sum of the overall cross-sectional areas of cables (including insulation and any sheath) to the internal cross-sectional area of the trunking”. The effective overall cross-sectional area of a NON-CIRCULAR cable is taken as that of a circle of diameter equal to the major axis of the cable. Care should be taken to use trunking bends that do not impose bending radii less than Table D5 requires. This is On-Site Guide guidance; BS 7671 itself sets no trunking fill percentage.',
      tableRefs: ['OSG Appendix E', 'OSG Tables E5, E6', 'OSG Table D5'],
    },
  ],

  _grounding: {
    status: 'verified',
    generatedAt: '2026-08-06',
    notes:
      'CITATION CORRECTED: the grouping clause quoted here was numbered 523.4, but Reg 523.4 is AMBIENT TEMPERATURE (“the temperature of the surrounding medium…”). Groups containing more than one circuit is Reg 523.5 — confirmed word-for-word against the printed BS 7671:2018+A4:2026 (Desktop/BS7671_ocr.pdf), which also yielded two rules the file was missing: mixed-temperature groups are rated on the LOWEST maximum operating temperature in the group, and a cable expected to carry ≤30% of its grouped capacity may be ignored when obtaining the rating factor. Reg 522.8.1, 522.8.5 and Table 4A2 note (b) verified against BS 7671:2018+A4:2026. The 45% space factor is NOT in BS 7671 — full-text search finds no trunking space factor — and could not be verified in the On-Site Guide corpus either, so it is presented as OSG/industry guidance. Trunking internal areas and SWA overall diameters in src/lib/calculators/bs7671-data/trunkingData.ts are manufacturer data, not verifiable from BS 7671; the SWA list holds one diameter per conductor size with no core-count dimension. \u2705 THE 45% FIGURE IS NOW VERIFIED, not merely \u201cindustry guidance\u201d. Read directly from the IET On-Site Guide Appendix E (\u007e/Desktop/untitled folder/OnSiteGuide_ocr.pdf, A4:2026-aligned edition): the note under Table E6 states the 45% space factor, and the following paragraph explicitly sanctions the percentage-area method this calculator implements for sizes and types not listed in Tables E5/E6 \u2014 which is exactly what the engine does. The OSG\u2019s own definition of space factor (sum of cable overall CSAs including insulation and sheath, over the internal CSA of the trunking) matches the engine\u2019s calculation, and the non-circular-cable rule (use a circle of diameter equal to the major axis) is now stated. Table D5 governs bending radii.',
  },
};
