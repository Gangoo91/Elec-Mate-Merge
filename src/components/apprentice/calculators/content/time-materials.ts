import type { CalculatorContent } from './types';

/**
 * Time & materials — commercial tool (no governing standard).
 */
export const timeMaterialsContent: CalculatorContent = {
  slug: 'time-materials',
  governingStandards: ['none'],

  whyItMatters: [
    'A job price is labour (hours × rate) plus materials (with markup) plus overheads — getting any part wrong eats the margin.',
    'Accurate labour estimating is the hardest and most valuable skill: under-estimate and you work for free, over-estimate and you lose the job.',
    'Separating cost from price (adding markup and overheads) is what turns a break-even number into a sustainable business.',
    'A clear breakdown also makes quotes transparent and easier to justify to the customer.',
  ],

  whenToCheck: [
    'Pricing a job from estimated hours and a materials list',
    'Building a quote with labour, materials, markup and overheads',
    'Checking a job made money after completion (estimate vs actual)',
    'Setting or reviewing an hourly charge-out rate',
  ],

  commonMistakes: [
    'Forgetting overheads (van, tools, insurance, travel, admin)',
    'Pricing materials at cost with no markup',
    'Under-estimating labour hours (especially access, testing and snagging)',
    'Confusing charge-out rate with take-home pay',
  ],

  workedExample: {
    scenario: '6 hours at £45/hr, £120 materials with 20% markup.',
    inputs: [
      { label: 'Labour', value: '6 h × £45' },
      { label: 'Materials', value: '£120 + 20%' },
    ],
    steps: [
      'Labour = 6 × £45 = £270',
      'Materials = £120 × 1.20 = £144',
      'Subtotal = £270 + £144 = £414 (before overheads / VAT)',
    ],
    result: '£414 subtotal — add overheads and VAT for the final quote.',
  },

  standards: [],

  _grounding: {
    status: 'verified',
    generatedAt: '2026-06-01',
    notes: 'Commercial tool — no governing standard. Arithmetic exact.',
  },
};
