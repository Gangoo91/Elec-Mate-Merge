import type { CalculatorContent } from './types';

/**
 * Power quality (harmonics) — BS EN 50160 / ENA EREC G5.
 */
export const powerQualityContent: CalculatorContent = {
  slug: 'power-quality',
  governingStandards: ['BS EN 50160', 'ENA EREC G5'],

  whyItMatters: [
    'Non-linear loads (switch-mode supplies, drives, LED gear) draw distorted current, raising total harmonic distortion (THD) and the true (vs displacement) power factor.',
    'Harmonics overload neutrals (triplen harmonics add up there), derate transformers (K-factor) and can resonate with power-factor capacitors.',
    'ENA EREC G5 sets the harmonic limits for connection to the network; BS EN 50160 describes the supply voltage characteristics.',
    'Quantifying THD and K-factor guides neutral sizing, transformer derating and whether mitigation (filters, detuned capacitors) is needed.',
  ],

  whenToCheck: [
    'Assessing a site with many non-linear loads',
    'Sizing neutrals where triplen harmonics circulate',
    'Derating a transformer feeding harmonic-rich loads (K-factor)',
    'Checking compliance with the connection harmonic limits',
  ],

  commonMistakes: [
    'Sizing the neutral the same as the phases where triplen harmonics dominate',
    'Adding power-factor capacitors without checking for harmonic resonance',
    'Confusing displacement power factor with true power factor',
    'Ignoring transformer derating under high K-factor',
  ],

  workedExample: {
    scenario: 'Fundamental 10 A; harmonics 3rd 6 A, 5th 4 A, 7th 2 A.',
    inputs: [
      { label: 'Harmonic RMS', value: '√(6² + 4² + 2²) = 7.5 A' },
      { label: 'Fundamental', value: '10 A' },
    ],
    steps: [
      'THDi = (harmonic RMS ÷ fundamental) × 100',
      'THDi = (7.48 ÷ 10) × 100',
      'THDi ≈ 75% (a heavily distorted supply)',
    ],
    result: 'THDi ≈ 75% — expect neutral loading, transformer derating and possible resonance.',
  },

  standards: [
    {
      standard: 'ENA EREC G5',
      citation: 'ENA EREC G5 — harmonic voltage distortion limits',
      clauseText:
        'ENA Engineering Recommendation G5 sets the limits for harmonic distortion from non-linear equipment connecting to the public network. BS EN 50160 defines the supply voltage characteristics including harmonics.',
    },
  ],

  _grounding: {
    status: 'needs-review',
    generatedAt: '2026-06-01',
    notes:
      'THD/K-factor formulae match the engine; harmonic limits per ENA EREC G5 and supply characteristics per BS EN 50160 (not in BS 7671 facets).',
  },
};
