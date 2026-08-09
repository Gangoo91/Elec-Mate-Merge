import type { CalculatorContent } from './types';

/**
 * Conduit fill — space factors.
 *
 * Sourcing note: BS 7671 publishes NO numeric conduit fill percentage — the printed standard
 * contains no "space factor", "cable factor" or "conduit factor" text at all. Conduit capacity is
 * an IET On-Site Guide topic (OSG 2.4; OSG 7.25, Table 4.6 / Appendix H). BS EN 61386 is the
 * conduit PRODUCT standard (corrosion class, impact class, flame propagation, fire test — cited by
 * BS 7671 Regs 422.3.4, 522.16, 527.1.5, 705.522.16) and is not a source of fill limits.
 */
export const conduitFillContent: CalculatorContent = {
  slug: 'conduit-fill',
  governingStandards: ['IET On-Site Guide', 'BS 7671'],

  whyItMatters: [
    'Cables in conduit must not be packed too tightly — overfilling traps heat and makes drawing-in damage the insulation (Reg 522.8.3, Reg 522.8.6).',
    'The space factor (cable area as a percentage of the conduit bore) is a quick area check; the working limit the On-Site Guide conduit factors are built on is around 40%.',
    'The definitive UK method is the On-Site Guide cable-factor / conduit-factor tables, which are indexed by run length and number of bends — a single percentage cannot replace them.',
    'Fill and grouping are separate checks. Two circuits bunched in one conduit already derate to Cg = 0.80 under Table 4C1, whatever the conductor size.',
  ],

  whenToCheck: [
    'Choosing conduit size for a given number and size of cables',
    'On long runs or runs with several bends (the allowable conduit factor falls)',
    'Whenever more than one circuit shares a conduit — apply Cg from Table 4C1 (Reg 523.5)',
    'Before drawing in — confirm the fill is within the limit and a draw-in box is not needed',
  ],

  commonMistakes: [
    'Quoting a fill percentage as a BS 7671 or BS EN 61386 requirement — neither states one',
    'Using the US NEC 53% / 31% single- and two-cable percentages on a UK job',
    'Ignoring the effect of bends and run length on the allowable conduit factor',
    'Forgetting the grouping derating (Cg) for cables bunched in conduit',
  ],

  workedExample: {
    scenario:
      '6 × 2.5 mm² PVC singles (6491X, 11.9 mm² each) in 20 mm PVC conduit (bore ≈ 16.0 mm, area ≈ 201 mm²), two circuits sharing the conduit.',
    inputs: [
      { label: 'Total cable area', value: '6 × 11.9 = 71.4 mm²' },
      { label: 'Conduit bore area', value: '≈ 201 mm²' },
      { label: 'Space factor used', value: '40%' },
    ],
    steps: [
      'Fill % = total cable area ÷ bore area × 100',
      'Fill % = 71.4 ÷ 201 × 100 ≈ 35.5%',
      'Within the ~40% space factor — but confirm against the On-Site Guide conduit factor for the actual run length and bends',
      'Grouping: 2 circuits bunched → Cg = 0.80 from Table 4C1',
    ],
    result:
      '≈ 36% fill — within the working space factor; apply Cg = 0.80 to each circuit and check the On-Site Guide conduit factor for the run.',
  },

  standards: [
    {
      standard: 'IET On-Site Guide',
      citation: 'Which method this calculator uses — and how it differs from Appendix E',
      clauseText:
        'Be aware these are two different methods that will not always agree. The On-Site Guide Appendix E method is a FACTOR LOOKUP: cable factors summed against a tabulated conduit factor, with separate tables for runs over 3 m or with bends. This calculator instead works geometrically — it computes the summed cross-sectional area of the cables against the internal area of the conduit and compares that with a percentage fill target (40% by default). The percentage-area approach is long-standing practice and is the same approach the On-Site Guide itself sanctions for TRUNKING outside Tables E5/E6, but for conduit the Guide gives factors rather than a percentage. Where a run exceeds 3 m or contains bends, prefer the Appendix E Tables E3/E4 lookup — the geometric figure does not account for the extra difficulty of the pull.',
      tableRefs: ['OSG Appendix E'],
    },
    {
      standard: 'IET On-Site Guide',
      citation: 'On-Site Guide APPENDIX E — the cable-factor / conduit-factor method',
      clauseText:
        'Conduit capacity lives in Appendix E of the On-Site Guide, not Appendix H (Appendix H is standard final circuit arrangements). For single-core thermoplastic (PVC) cables in straight runs NOT EXCEEDING 3 m: take each cable’s factor from Table E1, add them, and compare the total with the conduit factors in Table E2 — “the minimum conduit size is that having a factor equal to or greater than the sum of the cable factors”. Table E1 (solid): 1 mm² = 22, 1.5 = 27, 2.5 = 39; (stranded): 1.5 = 31, 2.5 = 43, 4 = 58, 6 = 88, 10 = 146, 16 = 202, 25 = 385. Table E2 conduit factors: 16 mm = 290, 20 = 460, 25 = 800, 32 = 1400, 38 = 1900, 50 = 3500, 63 = 5600. For runs EXCEEDING 3 m, or runs of any length incorporating bends or sets, Tables E3 and E4 apply instead and the factors vary with length and number of bends. BS 7671 itself states no numeric conduit fill percentage.',
      tableRefs: ['OSG Appendix E', 'OSG Tables E1, E2', 'OSG Tables E3, E4'],
    },
    {
      standard: 'BS 7671',
      citation: 'Reg 523.5 and Table 4C1 — grouping',
      clauseText:
        'Group rating factors (Tables 4C1 to 4C6 of Appendix 4) apply to groups of cables having the same maximum operating temperature. Where more cables than a single circuit are installed in the same group, the group rating factors of Tables 4C1 to 4C3 need to be applied (Appendix 4, §2.3.1). For cables bunched in conduit, Table 4C1 item 1 gives 0.80 for 2 circuits, 0.70 for 3 and 0.65 for 4.',
      tableRefs: ['Reg 523.5', 'Table 4C1', 'Appendix 4 §2.3.1'],
    },
    {
      standard: 'BS 7671',
      citation: 'Regs 522.8.1, 522.8.3 and 522.8.6 — drawing in',
      clauseText:
        'The radius of every bend in a wiring system shall be such that conductors or cables do not suffer damage and terminations are not stressed (Reg 522.8.3) — no numeric radius is given. A wiring system intended for the drawing in or out of conductors shall have adequate means to do so; pulling tensions, lubricants and intermediate pulling equipment are to be considered (Reg 522.8.6 and its note). The use of any lubricants that can have a detrimental effect on the cable or wiring system is not permitted (Reg 522.8.1).',
      tableRefs: ['Reg 522.8.1', 'Reg 522.8.3', 'Reg 522.8.6'],
    },
  ],

  _grounding: {
    status: 'needs-review',
    generatedAt: '2026-08-06',
    notes:
      'Rewritten 2026-08-09 against the IET On-Site Guide itself (\u007e/Desktop/untitled folder/OnSiteGuide_ocr.pdf, the edition aligned to BS 7671:2018+A4:2026). \ud83d\udd34 CITATION CORRECTED: the file pointed at \u201cOSG 2.4, 7.25, Table 4.6 / Appendix H\u201d. Conduit capacity is in APPENDIX E; Appendix H is the standard final circuit arrangements. Tables E1 and E2 were read by RENDERING the Appendix E pages as images \u2014 the OCR text layer garbles them \u2014 and all their values are now transcribed into the content. BS 7671 side re-confirmed: it contains no space/cable/conduit factor and no numeric fill percentage; Reg 522.8.3 is a performance requirement with no numeric bend radius; Reg 522.8.1 prohibits detrimental lubricants; Reg 523.5 + App 4 \u00a72.3.1 + Table 4C1 govern grouping. \u26a0\ufe0f STATUS STAYS needs-review, and NOT for a sourcing reason \u2014 the sources are now held. The open item is a METHOD MISMATCH: the On-Site Guide sizes conduit by a cable-factor / conduit-factor lookup whose factors vary with run length and number of bends (Tables E3/E4), while this calculator computes a percentage area fill with a 40% default and no length or bend term. The two methods can disagree, and on a long or bendy run the geometric figure is the optimistic one. That is a product decision about what the tool should implement, not something more reading will resolve. Also still manufacturer data rather than standard: conduit bore diameters/areas and cable overall diameters (the latter now come from the shared bs7671-data/trunkingData module).',
  },
};
