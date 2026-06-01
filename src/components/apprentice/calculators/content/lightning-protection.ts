import type { CalculatorContent } from './types';

/**
 * Lightning protection risk assessment — BS EN 62305.
 */
export const lightningProtectionContent: CalculatorContent = {
  slug: 'lightning-protection',
  governingStandards: ['BS EN 62305'],

  whyItMatters: [
    'BS EN 62305 decides whether a structure needs a lightning protection system by comparing the calculated risk against a tolerable level.',
    'The expected number of strikes depends on the structure’s collection area, its location’s ground flash density and an environmental factor.',
    'Risk is then weighed against loss factors (life, service, heritage) — only if it exceeds the tolerable risk is protection required, and to a specific protection level (LPL I–IV).',
    'It turns a subjective “does it need protection?” into a defensible, documented assessment.',
  ],

  whenToCheck: [
    'Deciding whether a structure needs a lightning protection system',
    'Determining the required protection level (LPL/Class)',
    'Assessing risk to life, services and contents',
    'Documenting a BS EN 62305-2 risk assessment',
  ],

  commonMistakes: [
    'Assuming protection is needed without doing the risk calculation',
    'Using the wrong collection area for the structure’s height and footprint',
    'Ignoring incoming services (power, comms) as a strike/surge path',
    'Forgetting surge protection as part of the overall scheme',
  ],

  workedExample: {
    scenario: 'Cottage 10 × 8 × 6 m, ground flash density Ng = 1.2.',
    inputs: [
      { label: 'Collection area Ad', value: '~1746 m²' },
      { label: 'Ng', value: '1.2 /km²/yr' },
      { label: 'Tolerable risk', value: '1×10⁻⁵' },
    ],
    steps: [
      'Expected strikes Nd = Ng × Ad × Cd × 10⁻⁶',
      'Nd ≈ 1.2 × 1746 × 1.0 × 10⁻⁶ ≈ 0.0021/yr',
      'Resulting risk (~5×10⁻⁶) is below the tolerable 1×10⁻⁵',
    ],
    result: 'Risk below tolerable → no LPS required for this structure.',
  },

  standards: [
    {
      standard: 'BS EN 62305',
      citation: 'BS EN 62305-2 — Risk management',
      clauseText:
        'BS EN 62305-2 sets out the risk assessment: calculate the risk components from the expected number of dangerous events and the probabilities and losses, and compare against the tolerable risk (typically 1×10⁻⁵ for loss of life) to decide the need and class of protection.',
    },
  ],

  _grounding: {
    status: 'needs-review',
    generatedAt: '2026-06-01',
    notes:
      'Collection area, Nd and risk-vs-tolerable approach per BS EN 62305-2 match the engine (not in BS 7671 facets).',
  },
};
