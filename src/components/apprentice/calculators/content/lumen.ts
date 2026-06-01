import type { CalculatorContent } from './types';

/**
 * Lighting (lumen method) — BS EN 12464-1 lighting levels.
 */
export const lumenContent: CalculatorContent = {
  slug: 'lumen',
  governingStandards: ['BS EN 12464'],

  whyItMatters: [
    'The lumen method sizes lighting from the target illuminance (lux) and the room area, then divides by the fittings’ output to get the number needed.',
    'BS EN 12464-1 sets recommended maintained illuminance by task — e.g. ~300 lux for general office work, more for detailed tasks.',
    'Real installations lose light to dirt and ageing (maintenance factor) and to room surfaces (utilisation factor), so the design lumens exceed the bare lux × area figure.',
    'Right-sizing avoids gloomy under-lit spaces or wasteful over-lighting.',
  ],

  whenToCheck: [
    'Designing general lighting for a room to a target lux level',
    'Selecting the number and output of luminaires',
    'Applying maintenance and utilisation factors to a scheme',
    'Checking an existing installation against the recommended task illuminance',
  ],

  commonMistakes: [
    'Ignoring the maintenance factor (light output falls with dirt and age)',
    'Forgetting the utilisation factor for room shape and surface reflectance',
    'Designing to the minimum rather than the maintained illuminance',
    'Confusing lumens (output) with lux (level on the surface)',
  ],

  workedExample: {
    scenario: '20 m² office at 300 lux, UF 0.6, MF 0.8, 3000 lm fittings.',
    inputs: [
      { label: 'Lux × area', value: '300 × 20 = 6000 lm' },
      { label: 'UF × MF', value: '0.6 × 0.8 = 0.48' },
      { label: 'Fitting output', value: '3000 lm' },
    ],
    steps: [
      'Design lumens = (lux × area) ÷ (UF × MF) = 6000 ÷ 0.48 = 12 500 lm',
      'Number of fittings = 12 500 ÷ 3000',
      '≈ 4.2 → 5 fittings',
    ],
    result: '≈ 12 500 design lumens → 5 × 3000 lm fittings.',
  },

  standards: [
    {
      standard: 'BS EN 12464',
      citation: 'BS EN 12464-1 — Lighting of work places (indoor)',
      clauseText:
        'BS EN 12464-1 specifies maintained illuminance, uniformity and glare limits by task and area. Lighting schemes should meet the recommended maintained illuminance for the activity.',
    },
  ],

  _grounding: {
    status: 'needs-review',
    generatedAt: '2026-06-01',
    notes:
      'Lumen method and UF/MF approach match the engine; task illuminance levels per BS EN 12464-1. Confirm specific lux figures against the standard.',
  },
};
