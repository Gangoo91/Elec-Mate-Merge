import type { CalculatorContent } from './types';

/**
 * Feed-in tariff / SEG — financial editorial (no governing electrical standard).
 */
export const feedInTariffContent: CalculatorContent = {
  slug: 'feed-in-tariff',
  governingStandards: ['none'],

  whyItMatters: [
    'The Feed-in Tariff (FIT) scheme closed to new applicants in 2019 — new generation now earns through the Smart Export Guarantee (SEG) for exported units, plus the bill savings from self-consumption.',
    'SEG rates vary widely by supplier (roughly 1–15p/kWh, with some time-of-use tariffs higher), so the chosen tariff materially changes the return.',
    'Most of the value for a typical domestic system comes from self-consumption (avoiding ~25–30p/kWh import), not from export — so usage patterns matter more than export price.',
    'MCS certification is required to qualify for SEG payments.',
  ],

  whenToCheck: [
    'Estimating annual return for a new install (SEG + self-consumption, not FIT)',
    'Comparing SEG tariffs between suppliers',
    'Weighing a battery to raise self-consumption vs exporting at a low SEG rate',
    'Modelling payback — keep the figures clearly indicative, not guaranteed',
  ],

  commonMistakes: [
    'Quoting closed FIT generation rates for a new system (only legacy systems still receive FIT)',
    'Assuming a high export price drives the return — self-consumption usually dominates',
    'Treating an indicative payback as a guarantee (rates and usage vary)',
    'Forgetting MCS certification is needed for SEG',
  ],

  workedExample: {
    scenario: '4 kWp system, ~3500 kWh/yr, 50% self-consumed, 25p import, 5.5p SEG.',
    inputs: [
      { label: 'Annual generation', value: '~3500 kWh' },
      { label: 'Self-consumption', value: '50%' },
      { label: 'Import / SEG', value: '25p / 5.5p' },
    ],
    steps: [
      'Self-consumption saving = 1750 kWh × £0.25 = £437.50',
      'Export income = 1750 kWh × £0.055 = £96.25',
      'Total ≈ £534/yr',
    ],
    result: '≈ £534/yr — dominated by self-consumption, not export.',
  },

  standards: [],

  _grounding: {
    status: 'verified',
    generatedAt: '2026-06-01',
    notes:
      'Commercial/financial tool — no governing electrical standard. FIT-closed / SEG framing is current; figures are indicative.',
  },
};
