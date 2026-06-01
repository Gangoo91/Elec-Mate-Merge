import type { CalculatorContent } from './types';

/**
 * Energy cost — commercial tool (no governing standard).
 */
export const energyCostContent: CalculatorContent = {
  slug: 'energy-cost',
  governingStandards: ['none'],

  whyItMatters: [
    'Running cost is power (kW) × hours × unit price (£/kWh) — a simple sum that turns a load into a real bill.',
    'It puts numbers on efficiency advice: a high-power appliance run for long hours dominates the bill, while standby loads add up quietly.',
    'Helps customers compare the lifetime running cost of options (e.g. heating types) against their purchase price.',
    'Useful for sizing the value of efficiency measures, solar self-consumption or load shifting to cheaper tariffs.',
  ],

  whenToCheck: [
    'Estimating the annual running cost of an appliance or circuit',
    'Comparing the running cost of two options',
    'Quantifying the saving from an efficiency upgrade or tariff change',
    'Sense-checking a customer’s bill against their loads',
  ],

  commonMistakes: [
    'Mixing watts and kilowatts (divide W by 1000 for kWh)',
    'Using the wrong unit price (day vs night, or ex-VAT vs inc-VAT)',
    'Forgetting standing charges and standby consumption',
    'Assuming continuous running when the appliance cycles (e.g. a fridge or heater on a thermostat)',
  ],

  workedExample: {
    scenario: 'A 3 kW immersion heater run 2 hours a day at 28p/kWh.',
    inputs: [
      { label: 'Power', value: '3 kW' },
      { label: 'Hours/day', value: '2 h' },
      { label: 'Unit price', value: '£0.28/kWh' },
    ],
    steps: [
      'Daily energy = 3 × 2 = 6 kWh',
      'Daily cost = 6 × £0.28 = £1.68',
      'Annual ≈ £1.68 × 365 = £613',
    ],
    result: '≈ £1.68/day, about £613/year.',
  },

  standards: [],

  _grounding: {
    status: 'verified',
    generatedAt: '2026-06-01',
    notes: 'Commercial tool — no governing standard. Cost arithmetic exact.',
  },
};
