import type { CalculatorContent } from './types';

/**
 * Earth electrode (TT systems) — BS 7671 Reg 411.5 / 542.2.
 */
export const earthElectrodeContent: CalculatorContent = {
  slug: 'earth-electrode',
  governingStandards: ['BS 7671'],

  whyItMatters: [
    'On a TT system the installation makes its own connection to earth through an electrode, and its resistance (RA) decides whether an earth fault can be cleared safely.',
    'The key condition is RA × IΔn ≤ 50 V: the electrode resistance times the RCD’s rated residual current must keep the touch voltage at or below 50 V.',
    'Electrode resistance depends on soil resistivity, electrode length and type — a single rod in poor soil can be hundreds of ohms.',
    'Because earth fault current on TT is low, an RCD (not just an overcurrent device) is essential for disconnection.',
  ],

  whenToCheck: [
    'Designing or testing any TT installation',
    'Selecting the RCD so RA × IΔn ≤ 50 V is satisfied',
    'When soil conditions are poor (sandy/rocky) and resistance is high',
    'Adding parallel rods to bring resistance down',
  ],

  commonMistakes: [
    'Relying on overcurrent devices alone on TT (the fault current is too low)',
    'Ignoring seasonal variation — soil dries out and resistance rises',
    'Spacing parallel rods too close (less than their driven depth) so they barely help',
    'Forgetting the 50 V touch-voltage limit drives the RCD choice',
  ],

  workedExample: {
    scenario: 'Single 2.4 m rod in loam (ρ ≈ 50 Ω·m), protected by a 100 mA RCD.',
    inputs: [
      { label: 'Electrode resistance RA', value: '~21 Ω' },
      { label: 'RCD rating IΔn', value: '100 mA' },
    ],
    steps: ['Check RA × IΔn ≤ 50 V', 'RA × IΔn = 21 × 0.1 = 2.1 V', '2.1 V ≤ 50 V ✓'],
    result: 'RA × IΔn = 2.1 V — well within the 50 V limit; the RCD will disconnect safely.',
  },

  standards: [
    {
      standard: 'BS 7671',
      citation: 'Regulation 411.5.3 — RCD used for fault protection (the TT condition)',
      clauseText:
        'Where an RCD is used for fault protection, the following conditions shall be fulfilled: (a) the disconnection time shall be that required by Regulation 411.3.2.2 or 411.3.2.4; and (b) RA × IΔn ≤ 50 V, where RA is the sum of the resistances of the earth electrode and the protective conductor connecting it to the exposed-conductive-parts (in ohms) and IΔn is the rated residual operating current of the RCD. The requirements of this regulation are met if the earth fault loop impedance of the circuit protected by the RCD meets the requirements of Table 41.5. NOTE 2: Where RA is not known, it may be replaced by Zs.',
      tableRefs: ['Table 41.5'],
    },
    {
      standard: 'BS 7671',
      citation: 'Regulation 542.2.1 / 542.2.2 — the electrode itself',
      clauseText:
        'The design used for, and the construction of, an earth electrode shall be such as to withstand damage and to take account of possible increase in resistance due to corrosion (542.2.1). The types recognised are earth rods or pipes, earth tapes or wires, earth plates, underground structural metalwork embedded in foundations, welded metal reinforcement of concrete (except pre-stressed) embedded in the ground, and others listed in 542.2.2. Reg 542.2.4 requires the type and embedded depth to be such that soil drying and freezing will not raise the resistance above the required value — which is why a single-figure measurement on a dry day is not a design.',
      tableRefs: ['Reg 542.2.1', 'Reg 542.2.2', 'Reg 542.2.4'],
    },
    {
      standard: 'BS 7671',
      citation: 'Regulation 542.2.6 / 542.2.7 — what must NOT be used as an electrode',
      clauseText:
        'A metallic pipe for gases or flammable liquids shall not be used as an earth electrode. The metallic pipe of a water utility supply shall not be used as an earth electrode. Other metallic water supply pipework shall not be used as an earth electrode unless precautions are taken against its removal and it has been considered for such a use (542.2.6). An earth electrode shall not consist of a metal object immersed in water (542.2.7).',
      tableRefs: ['Reg 542.2.6', 'Reg 542.2.7'],
    },
    {
      standard: 'BS 7671',
      citation: 'Regulation 542.3.1 — the earthing conductor to the electrode',
      clauseText:
        'Every earthing conductor shall conform to Section 543 and, where PME conditions apply, shall meet Regulation 544.1.1 for the CSA of a main protective bonding conductor. In addition, where BURIED IN THE GROUND, the earthing conductor shall have a CSA not less than that stated in Table 54.1 — 25 mm² copper where unprotected against corrosion, falling to 2.5 mm² copper only where protected against BOTH corrosion and mechanical damage.',
      tableRefs: ['Table 54.1'],
    },
  ],
  _grounding: {
    status: 'verified',
    generatedAt: '2026-06-01',
    notes:
      '411.5.3 quoted verbatim from the printed BS 7671:2018+A4:2026 text (Desktop/BS7671_ocr.pdf): the condition is RA \u00d7 I\u0394n \u2264 50 V, it points to Table 41.5, and NOTE 2 permits Zs in place of RA where RA is unknown. The electrode regulations 542.2.1\u2013542.2.8 and the buried-conductor rule 542.3.1/Table 54.1 were added \u2014 the file previously cited only 542.2 generically. \u26a0\ufe0f A4:2026 introduced TWO NEW earth-electrode regulations, 542.2.3 (foundation electrodes) and 542.2.8 (connecting electrode parts by welding, pressure connectors or clamps). The rod-resistance model and RA \u00d7 I\u0394n arithmetic match the engine.',
  },
};
