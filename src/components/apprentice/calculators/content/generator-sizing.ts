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
      citation: 'BS 7671 Section 551 — Low voltage generating sets',
      clauseText:
        'Generating sets must be selected and installed per Section 551, accounting for the load characteristics (including starting), the means of connection/changeover, and protection and earthing appropriate to the system.',
      tableRefs: ['Section 551'],
    },
  ],

  _grounding: {
    status: 'thin',
    generatedAt: '2026-06-01',
    notes:
      'Running + starting sizing and derating match the engine; Section 551 governs the installation. Confirm sub-clauses against A4:2026 facets.',
  },
};
