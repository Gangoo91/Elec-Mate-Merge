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
      citation: 'ENA EREC G5 Issue 5 (2020) Table 1 — THDV planning levels',
      clauseText:
        'G5/5 sets planning levels for total harmonic voltage distortion at the point of common coupling, by nominal system voltage: V ≤ 0.4 kV → 5%; 0.4 < V ≤ 25 kV → 4.5%; 25 < V ≤ 66 kV → 3.7%; 66 < V ≤ 230 kV → 3%; V > 230 kV → 3%. All expressed as a percentage of the voltage at the fundamental frequency. Note that 5% at LV is a PLANNING level for the network operator, not a product limit and not a pass/fail line for an individual installation — G5/5 §6.2 sets out situations where planning levels may be exceeded.',
      tableRefs: ['G5 Issue 5 Table 1', 'G5 §5.2', 'G5 §6.2'],
    },
    {
      standard: 'ENA EREC G5',
      citation: 'EREC G5 Issue 5 — what changed from G5/4-1',
      clauseText:
        'Issue 5 came into implementation on 17 June 2020 and CHANGED the planning levels and compatibility levels carried in the previous issue. Assessments and limits quoted from G5/4 or G5/4-1 are not interchangeable with Issue 5 values. Tables 2 and 3 give the individual harmonic voltage planning levels for 0.4 kV and below, and above 0.4 kV up to 132 kV, respectively.',
      tableRefs: ['G5 Issue 5 Table 2', 'G5 Issue 5 Table 3'],
    },
    {
      standard: 'BS EN 50160',
      citation: 'BS EN 50160 — supply voltage characteristics (SOURCE NOT HELD)',
      clauseText:
        'BS EN 50160 defines the characteristics of the supply voltage at the customer’s terminals, including harmonics, and is the companion to G5 for judging supply quality. That document is not held here, so no figure is quoted from it.',
    },
  ],
  _grounding: {
    status: 'needs-review',
    generatedAt: '2026-06-01',
    notes:
      'ENA EREC G5 Issue 5 (2020) is now HELD (Desktop/hav/ENA-EREC-G5-Issue5-2020-Harmonics.pdf, downloaded from the official GB Distribution Code site dcode.org.uk on 2026-08-09, 104 pp). Table 1 THDV planning levels quoted verbatim. The file previously carried a single sentence asserting what G5 \u201csets\u201d with no figures at all. \u26a0\ufe0f Two cautions now stated in the content: these are PLANNING levels for the network operator rather than an installation pass/fail line, and Issue 5 CHANGED the levels from G5/4-1, so older assessments are not interchangeable. \u26a0\ufe0f BS EN 50160 is still NOT held and is now explicitly labelled as such rather than being described as if read. Status stays needs-review for that reason.',
  },
};
