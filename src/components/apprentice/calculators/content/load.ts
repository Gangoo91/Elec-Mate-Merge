import type { CalculatorContent } from './types';

/**
 * Load assessment — BS 7671 Reg 311.1 / 433.1.
 */
export const loadContent: CalculatorContent = {
  slug: 'load',
  governingStandards: ['BS 7671', 'IET On-Site Guide'],

  whyItMatters: [
    'Adding up the connected loads (with diversity) gives the maximum demand that the circuit, board and supply must carry.',
    'From the demand you get the current — I = P ÷ V single-phase, or P ÷ (√3·V·pf) three-phase — which sizes the device and cable so Ib ≤ In ≤ Iz.',
    'A design margin (commonly ×1.25 for continuous loads) keeps the cable and device comfortably within rating.',
    'Under-assessing overloads the installation; over-assessing wastes copper and supply capacity.',
  ],

  whenToCheck: [
    'Estimating the demand and current for a board or sub-main',
    'Sizing the protective device and cable for a mix of loads',
    'Applying diversity to avoid oversizing the supply',
    'Checking spare capacity before adding a load',
  ],

  commonMistakes: [
    'Summing connected load with no diversity',
    'Omitting the continuous-load design margin',
    'Mixing kW and kVA when converting to current',
    'Letting the device rating fall outside Ib ≤ In ≤ Iz',
  ],

  workedExample: {
    scenario: 'Diversified demand 9.2 kW, single-phase 230 V.',
    inputs: [
      { label: 'Maximum demand', value: '9.2 kW' },
      { label: 'Supply', value: '230 V' },
    ],
    steps: [
      'I = P ÷ V = 9200 ÷ 230 = 40 A',
      'Apply margin for continuous load (×1.25): 50 A design current',
      'Select device and cable so Ib ≤ In ≤ Iz',
    ],
    result: '≈ 40 A demand → size the circuit (with margin) so Ib ≤ In ≤ Iz.',
  },

  standards: [
    {
      standard: 'BS 7671',
      citation: 'Regulation 311.1 / 433.1.1',
      clauseText:
        'The maximum demand (taking diversity into account) shall be assessed (311.1), and the protective device shall satisfy Ib ≤ In ≤ Iz with I2 ≤ 1.45 Iz (433.1.1).',
      tableRefs: ['On-Site Guide Appendix A'],
    },
    /*
      Restored after the hand-rolled "Regs at a Glance" block was removed. That
      block said only "525: Voltage drop limits: 3% lighting, 5% other uses from
      origin", which is imprecise in a way that matters: Section 525 sets no
      numbers at all. 525.202 is a DEEMING provision — it says the requirements of
      525.1 and 525.201 are satisfied if the drop does not exceed what Appendix 4
      Section 6.4 states. The figures live in Table 4Ab.

      Verified against the printed regulations (Desktop/BS7671_ocr.pdf), not the
      RAG: the corpus files this text under Reg 125.8, which is a breadcrumb
      mis-attribution — it is Appendix 4 Section 6.4 in the book.
    */
    {
      standard: 'BS 7671',
      citation: 'Regulation 525.202 with Appendix 4, Section 6.4',
      clauseText:
        'Regulations 525.1 and 525.201 require the voltage at fixed current-using equipment to stay above the lower limit of its product standard, or not to impair safe functioning where there is none. Reg 525.202 deems those satisfied if the drop between the origin and a socket-outlet or equipment terminals does not exceed Appendix 4 Section 6.4. Table 4Ab gives 3% lighting / 5% other uses for a public LV supply, and 6% / 8% from a private LV supply — with the drop in each final circuit still capped at the row (a) figures. Note the wording is "should not be greater", so these are recommended maxima rather than an absolute limit.',
      tableRefs: ['Appendix 4, Table 4Ab'],
    },
    {
      standard: 'BS 7671',
      citation: 'Appendix 4, Section 6.4 — long wiring systems and motor starting',
      clauseText:
        'Where the wiring systems of the installation exceed 100 m, the tabulated drops may be increased by 0.005% per metre beyond 100 m, capped at an extra 0.5%. The drop is determined from the demand of the current-using equipment with diversity applied, or from the circuit design current. Reg 525.203 additionally allows a greater drop for a motor during starting, or other equipment with high inrush, provided the voltage variations stay within the relevant product standard or the manufacturer’s recommendations.',
      tableRefs: ['Appendix 4, Table 4Ab'],
    },
  ],

  _grounding: {
    status: 'verified',
    generatedAt: '2026-06-01',
    notes:
      'Reg 311.1 (maximum demand) and 433.1.1 (coordination) are foundational; current conversion matches the engine.',
  },
};
