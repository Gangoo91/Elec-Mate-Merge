import type { CalculatorContent } from './types';

/**
 * Generator sizing — BS 7671 Section 551 context.
 */
export const generatorSizingContent: CalculatorContent = {
  slug: 'generator-sizing',
  governingStandards: ['BS 7671'],

  whyItMatters: [
    'A generator must cover both the running load (kW/kVA after diversity) and the worst-case motor starting (inrush) — the starting case often sizes the set, not the running load.',
    'Motor inrush draws several times full-load current and causes a voltage dip; an undersized set sags and may stall the motor or trip.',
    'Site conditions matter: altitude and high ambient temperature derate the engine output, so the nameplate must exceed the demand by the derating margin.',
    'Right-sizing avoids both a set that can’t start the load and an oversized set that wet-stacks at light load.',
  ],

  whenToCheck: [
    'Sizing a standby/prime generator for a mixed load',
    'Assessing the largest motor’s starting kVA against the set',
    'Applying altitude and temperature derating',
    'Choosing a starting method to limit inrush on big motors',
  ],

  commonMistakes: [
    'Sizing on running load and ignoring motor starting kVA',
    'Forgetting altitude/temperature derating of the engine',
    'No diversity on the connected load (oversizing) or too much (undersizing)',
    'Running a large set at very light load (wet-stacking)',
  ],

  workedExample: {
    scenario: 'Running 9 kVA diversified; largest motor adds 13 kVA starting.',
    inputs: [
      { label: 'Running (diversified)', value: '9 kVA' },
      { label: 'Peak with start', value: '~22 kVA' },
      { label: 'Margin', value: '×1.2' },
    ],
    steps: [
      'Peak = running + largest motor starting = 9 + 13 = 22 kVA',
      'Apply margin: 22 × ~0.85 (start) then ×1.2 ≈ 18.7 kVA design',
      'Select the next standard size up → 20 kVA',
    ],
    result: '≈ 20 kVA set — driven by the motor starting case, not the running load.',
  },

  standards: [
    {
      standard: 'BS 7671',
      citation: 'Regulation 551.1 — Scope: which of the three arrangements you are building',
      clauseText:
        'This section applies to low voltage and extra-low voltage installations which incorporate generating sets intended to supply, either continuously or occasionally, all or part of the installation. Requirements are included for: (a) supply to an installation which is NOT connected to a system for distribution of electricity to the public; (b) supply to an installation as an ALTERNATIVE to that system; and (c) supply to an installation IN PARALLEL with it. Which of the three you are doing decides which additional requirements bite.',
      tableRefs: ['Reg 551.1'],
    },
    {
      standard: 'BS 7671',
      citation: 'Regulation 551.6 / 551.7 — standby vs parallel operation',
      clauseText:
        'Reg 551.6 carries the additional requirements where the generating set provides a supply as a SWITCHED ALTERNATIVE to the distribution network (standby systems) — the changeover case. Reg 551.7 carries the additional requirements where the set MAY OPERATE IN PARALLEL with other sources including the public distribution network; A4:2026 added further requirements here for installations where the set or sets may operate in parallel. Sizing a set without deciding which of these applies leaves the protection and earthing undesigned.',
      tableRefs: ['Reg 551.6', 'Reg 551.7'],
    },
    {
      standard: 'BS 7671',
      citation: 'Regulation 551.8 — DELETED by A4:2026',
      clauseText:
        'Reg 551.8 has been deleted by BS 7671:2018+A4:2026, which directs the reader to the new Chapter 57 (Stationary Secondary Batteries). If you are working from an older copy, or from guidance that still cites 551.8, that reference is dead.',
      tableRefs: ['Chapter 57'],
    },
  ],
  _grounding: {
    status: 'verified',
    generatedAt: '2026-06-01',
    notes:
      'Section 551 sub-clause roles verified against the printed BS 7671:2018+A4:2026 contents and body (Desktop/BS7671_ocr.pdf): 551.1 scope (a)/(b)/(c), 551.6 standby/switched alternative, 551.7 parallel operation. \u26a0\ufe0f Reg 551.8 is DELETED by A4:2026 with a pointer to the new Chapter 57 \u2014 worth stating explicitly because plenty of circulating guidance still cites it. Running-plus-starting sizing and the derating arithmetic match the engine; the kVA/kW power-factor handling is a manufacturer matter, not a BS 7671 one.',
  },
};
