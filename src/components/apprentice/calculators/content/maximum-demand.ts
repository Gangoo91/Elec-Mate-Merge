import type { CalculatorContent } from './types';

/**
 * Maximum demand — BS 7671 Reg 311.1 + IET On-Site Guide diversity.
 */
export const maximumDemandContent: CalculatorContent = {
  slug: 'maximum-demand',
  governingStandards: ['BS 7671', 'IET On-Site Guide'],

  whyItMatters: [
    'Maximum demand is the realistic peak load after diversity — it sizes the supply, tails and any DNO connection.',
    'BS 7671 Reg 311.1 requires the maximum demand to be determined; diversity may be taken into account in determining it.',
    'Reg 536.4.202 (A4:2026): diversity shall not be used as a means of load curtailment, load control or overload protection — the rated current of a consumer unit or distribution board is a separate check.',
    'A single-phase domestic supply is typically limited around 80–100 A; exceeding it means a three-phase or upgraded supply.',
    'Getting it wrong either overloads the intake or pays for an unnecessary upgrade.',
  ],

  whenToCheck: [
    'At design stage for a new installation or a major addition',
    'Before adding a heavy load (EV charger, heat pump, shower)',
    'When deciding single- vs three-phase supply',
    'When a DNO connection or upgrade may be needed',
  ],

  commonMistakes: [
    'Summing connected load with no diversity (overstates demand)',
    'Forgetting non-diversified loads like EV chargers and heat pumps',
    'Ignoring the practical single-phase supply limit',
    'Mixing up kW and kVA when converting to current',
  ],

  workedExample: {
    scenario: 'Diversified demand 18 kW, single-phase 230 V.',
    inputs: [
      { label: 'Maximum demand', value: '18 kW' },
      { label: 'Supply', value: '230 V, 1-phase' },
    ],
    steps: ['I = (MD × 1000) ÷ V', 'I = 18 000 ÷ 230', 'I ≈ 78 A'],
    result: '≈ 78 A — within a typical 80–100 A single-phase supply, but close; check headroom.',
  },

  standards: [
    {
      standard: 'BS 7671',
      citation: 'Regulation 311.1 — Maximum demand and diversity',
      clauseText:
        'For economic and reliable design of an installation within thermal limits and admissible voltage drop, the maximum demand shall be determined. In determining the maximum demand of an installation or part thereof, diversity may be taken into account.',
      tableRefs: ['Reg 311.1'],
    },
    {
      standard: 'IET On-Site Guide',
      citation:
        'On-Site Guide Appendix A / Table A2 — where the allowances live, and the household cooking rule',
      clauseText:
        'BS 7671 permits diversity but publishes no allowances for it. The percentage figures every electrician quotes are from the IET On-Site Guide, Appendix A, Table A2. For a household cooking appliance the allowance is 10 A + 30% of the full-load current of connected cooking appliances IN EXCESS OF 10 A, plus 5 A if a socket-outlet is incorporated in the control unit \u2014 note it is the first 10 A that is taken at 100%, not the whole of the largest appliance. (The 100%-of-largest-plus-80%-of-second form applies to cooking appliances in SHOPS and HOTELS, not in a house.) Household lighting is 66% of total current demand; thermostatically controlled water heaters, floor warming and thermal storage space heating get NO diversity at all. These are guidance for typical installations, not regulation, and Reg 311.1 puts the duty to determine maximum demand on the designer.',
      tableRefs: ['On-Site Guide Appendix A'],
    },
    {
      standard: 'BS 7671',
      citation: 'Regulation 536.4.202 — the limit on what diversity may be used FOR',
      clauseText:
        'The device protecting a low voltage switchgear and controlgear assembly against overload shall satisfy one of: (a) the rated current or setting of the upstream device is ≤ the rated current of the assembly (InA) and of any outgoing unit (Inc); or (b) load curtailment is used to limit the maximum current demand; or (c) the total connected load WITHOUT diversity does not exceed InA and Inc. Where load curtailment is used, InA and Inc shall be ≥ the limited maximum current demand — and, critically: “Diversity shall not be used as a means of load curtailment, load control or overload protection.” NOTE 1 confirms a distribution board and a consumer unit are such assemblies, and an RCCB is an outgoing unit.',
      tableRefs: ['Reg 536.4.202', 'Reg 551.7.2'],
    },
  ],
  _grounding: {
    status: 'verified',
    generatedAt: '2026-08-06',
    notes:
      'Reg 311.1 quoted verbatim from the printed BS 7671:2018+A4:2026 text \u2014 note the asymmetry the wording carries: maximum demand \u201cSHALL be determined\u201d, diversity \u201cMAY be taken into account\u201d. \u26a0\ufe0f BS 7671 itself publishes NO diversity allowances; the familiar percentages are IET On-Site Guide Appendix A guidance and are flagged as such rather than presented as regulation. Supply-limit figures are typical UK values derived from 100 A at the selected voltage, not from BS 7671 \u2014 supply capacity is a DNO/ESQCR matter. Reg 536.4.202 restored and quoted verbatim — it carries the line that bounds this whole calculator: diversity shall NOT be used as a means of load curtailment, load control or overload protection. A diversified figure sizes the supply; it does not license a board rated below the connected load. \ud83d\udd34 CORRECTION (2026-08-09): the illustrative figure here previously read \u201c100% of the largest cooker point plus 30% of the remainder plus 5 A\u201d. That conflates two different rows of On-Site Guide Table A2. For an INDIVIDUAL HOUSEHOLD installation the cooking allowance is \u201c10 A + 30% f.l. of connected cooking appliances in excess of 10 A + 5 A if a socket-outlet is incorporated in the control unit\u201d \u2014 the first 10 A, not the largest appliance. The 100%-of-largest + 80%-of-second + 60%-of-remainder form is the SHOPS and HOTELS column. Read from the On-Site Guide directly (\u007e/Desktop/untitled folder/OnSiteGuide_ocr.pdf, A4:2026-aligned edition); Table A2 is landscape and OCRs as gibberish, so pages 151\u2013152 were rendered as images and read visually. The Guide also warns in Appendix A that Table A2 \u201chas not been updated for some time and does not necessarily align with modern loads and usages\u201d.',
  },
};
