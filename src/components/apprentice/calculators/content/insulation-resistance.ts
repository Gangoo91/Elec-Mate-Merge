import type { CalculatorContent } from './types';

/**
 * Insulation resistance — turning a reading into a verdict.
 *
 * Table 64, Reg 643.3.2 and Reg 643.3.3 were read from the printed
 * BS 7671:2018+A4:2026 (Desktop/BS7671_ocr.pdf).
 *
 * 🔴 THE INTERPRETATION BANDS ARE GUIDANCE, NOT REQUIREMENTS. Table 64 sets the
 * pass/fail line and nothing else. Everything said about what a reading means
 * for the condition of the installation is GN3 and good practice, and is
 * labelled as such in the UI. This tool does NOT assign an EICR code.
 */
export const insulationResistanceContent: CalculatorContent = {
  slug: 'insulation-resistance',
  governingStandards: ['BS 7671', 'IET Guidance Note 3'],

  whyItMatters: [
    'The minimum in Table 64 is a floor, not a target. A circuit can pass at 1.1 MΩ and still be telling you the insulation is failing — new work typically reads hundreds of megohms.',
    'The test voltage is part of the requirement. A reading taken at the wrong voltage does not verify the circuit, however good the number looks.',
    'A falling trend matters more than a single value: 200 MΩ dropping to 5 MΩ between inspections is a deteriorating circuit even though both readings pass.',
    'Getting this wrong in either direction is costly — condemning sound old wiring, or signing off a circuit that is on its way to an earth fault.',
  ],

  whenToCheck: [
    'Initial verification, before the installation is energised',
    'On every EICR, as one of the core dead tests',
    'After any rewire, alteration or water ingress',
    'When an RCD trips intermittently with no obvious cause — low IR is a common culprit',
  ],

  commonMistakes: [
    'Reading the Table 64 minimum as “good” — 1 MΩ is the pass line, not a healthy installation',
    'Testing at 500 V DC on a SELV or PELV circuit, where Table 64 calls for 250 V',
    'Leaving current-using equipment connected — Reg 643.3.2 requires it disconnected',
    'Testing electronic equipment at 500 V and damaging it, instead of following Reg 643.3.3',
    'Ignoring a sharp fall from the previous reading because the current value still passes',
  ],

  workedExample: {
    scenario: 'A 230 V lighting circuit in a 1970s rewire reads 1.4 MΩ at 500 V DC. Previous EICR recorded 150 MΩ.',
    inputs: [
      { label: 'Reading', value: '1.4 MΩ' },
      { label: 'Circuit nominal voltage', value: '230 V (up to and including 500 V)' },
      { label: 'Test voltage applied', value: '500 V DC' },
      { label: 'Previous reading', value: '150 MΩ' },
    ],
    steps: [
      'Table 64 row for up to and including 500 V: test at 500 V DC, minimum 1.0 MΩ',
      '1.4 MΩ is above 1.0 MΩ, so the circuit PASSES the Regulations',
      'But it has fallen from 150 MΩ to 1.4 MΩ — roughly a hundredfold drop',
      'The pass is real; the trend is the finding. Investigate before the next inspection cycle.',
    ],
    result: 'Passes Table 64 at 1.4 MΩ — and the collapse from 150 MΩ is what actually needs acting on.',
  },

  standards: [
    {
      standard: 'BS 7671',
      citation: 'Table 64 — Minimum values of insulation resistance',
      clauseText:
        'SELV and PELV: test at 250 V DC, minimum 0.5 MΩ. Up to and including 500 V, with the exception of the above systems: test at 500 V DC, minimum 1.0 MΩ. Above 500 V: test at 1000 V DC, minimum 1.0 MΩ. Printed with the table: “Table 64 shall be applied when verifying insulation resistance between non-earthed protective conductors and Earth”, and FELV circuits shall be tested at the same test voltage as that applied to the primary side of the source.',
      tableRefs: ['Table 64'],
    },
    {
      standard: 'BS 7671',
      citation: 'Regulation 643.3.2 — the test condition, which is half the requirement',
      clauseText:
        'The insulation resistance measured with the test voltages indicated in Table 64 shall be considered satisfactory if the main switchboard AND EACH DISTRIBUTION CIRCUIT TESTED SEPARATELY, with all its final circuits connected but with CURRENT-USING EQUIPMENT DISCONNECTED, has an insulation resistance not less than the appropriate value given in Table 64. NOTE: more specific requirements are applicable for the wiring of fire detection and fire alarm systems in buildings — see BS 5839-1.',
      tableRefs: ['Reg 643.3.2', 'Table 64', 'BS 5839-1'],
    },
    {
      standard: 'BS 7671',
      citation: 'Regulation 643.3.3 — equipment that would be damaged or would skew the result',
      clauseText:
        'Where connected equipment is likely to influence the measurement or result of the test, or be damaged, the test shall be applied PRIOR TO the connection of such equipment, in accordance with Table 64. Following connection of the equipment, a test at 250 V DC shall be applied between live conductors and the protective conductor connected to the earthing arrangement. The insulation resistance shall have a value of at least 1 MΩ. NOTE: manufacturer’s instructions may recommend some equipment to be disconnected during 250 V DC insulation resistance tests as it may influence the results.',
      tableRefs: ['Reg 643.3.3'],
    },
    {
      standard: 'IET Guidance Note 3',
      citation: 'GN3 / good practice — the interpretation bands, which are NOT regulation',
      clauseText:
        'BS 7671 sets one line: the Table 64 minimum. It says nothing about what a passing value means for the condition of the installation. The working bands — a reading of 1–2 MΩ on an existing installation indicating deterioration worth investigating, values above 2 MΩ being acceptable on aged wiring, new work typically reading hundreds of megohms, and a result under 20 MΩ on a NEW installation warranting investigation — come from IET Guidance Note 3 and established practice. They are guidance and are presented as guidance. A sub-1 MΩ result on an EICR is commonly coded C1 or C2 depending on severity and context; that judgement belongs to the inspector, and this tool does not make it.',
      tableRefs: ['GN3'],
    },
  ],

  _grounding: {
    status: 'verified',
    generatedAt: '2026-08-09',
    notes:
      'Table 64 (all three rows, the non-earthed-protective-conductor application line and the FELV rule), Reg 643.3.2 and Reg 643.3.3 read word-for-word from the printed BS 7671:2018+A4:2026 (Desktop/BS7671_ocr.pdf). Two things the calculator did not previously surface were found on that read and are captured here: 643.3.2’s actual test CONDITION (each distribution circuit separately, final circuits connected, current-using equipment disconnected) and its NOTE pointing at BS 5839-1 for fire alarm wiring. ⚠️ The interpretation bands are explicitly separated from the regulation and attributed to GN3 / good practice — the numeric band edges are not verifiable from the BS 7671 text and are labelled guidance in both the content and the UI. No EICR code is assigned.',
  },
};
