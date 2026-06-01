import type { CalculatorContent } from './types';

/**
 * EVSE load (multiple charge points) — BS 7671 Section 722 + load/export management.
 */
export const evseLoadContent: CalculatorContent = {
  slug: 'evse-load',
  governingStandards: ['BS 7671', 'ENA EREC G100'],

  whyItMatters: [
    'A bank of charge points is rarely used all at once, so applying a sensible diversity factor avoids hugely oversizing the supply.',
    'Even diversified, multiple chargers add a large continuous load — the incoming supply, main cable and protective device must all cope, or a DNO upgrade is needed.',
    'Where the supply can’t take the full connected load, a load- or export-management scheme (per ENA EREC G100) can cap demand to an agreed value instead of reinforcing the network.',
    'Every charge point still needs its own Section 722 protection (30 mA RCD, DC fault protection, PEN-fault provision on PME).',
  ],

  whenToCheck: [
    'Designing a car park / fleet installation with several charge points',
    'Deciding between a supply upgrade and a load-management (G100) scheme',
    'Applying diversity appropriate to the use (domestic block vs commercial rapid bank)',
    'Confirming the main supply and submains carry the diversified continuous load',
  ],

  commonMistakes: [
    'Summing all charger ratings with no diversity (massively oversizes the supply)',
    'Applying domestic diversity to a commercial rapid-charge site (they rarely diversify)',
    'Relying on diversity instead of a proper load-management scheme where the supply is the limit',
    'Forgetting each point still needs its own RCD and DC fault protection',
  ],

  workedExample: {
    scenario: '6 × 7.4 kW points on a small commercial site, 400 V 3-phase, diversity 0.6.',
    inputs: [
      { label: 'Connected load', value: '6 × 7.4 = 44.4 kW' },
      { label: 'Diversity', value: '0.6' },
      { label: 'Supply', value: '400 V, 3-phase, PF 0.95' },
    ],
    steps: [
      'Diversified load = 44.4 × 0.6 = 26.6 kW',
      'I = P ÷ (√3 × V × PF) = 26 640 ÷ (1.732 × 400 × 0.95)',
      'I ≈ 40.5 A per phase',
      'Add the 1.25 continuous factor and compare to the available supply',
    ],
    result: '≈ 40.5 A/phase diversified → check against supply; consider G100 if over capacity.',
  },

  standards: [
    {
      standard: 'BS 7671',
      citation: 'BS 7671 Section 722 — EV charging installations',
      clauseText:
        'Each charging point must meet Section 722 (30 mA RCD, DC residual-current protection, and PEN-fault measures on a PME earth for outdoor points).',
      tableRefs: ['Section 722'],
    },
    {
      standard: 'ENA EREC G100',
      citation: 'ENA EREC G100 — export/import limitation',
      clauseText:
        'Where the agreed supply capacity would be exceeded, a compliant load- or export-limitation scheme (G100) may cap the demand to the agreed value rather than reinforcing the network.',
    },
  ],

  _grounding: {
    status: 'needs-review',
    generatedAt: '2026-06-01',
    notes:
      'Section 722 + G100 load-management authored from the standards and match the engine; confirm 722 sub-clauses against A4:2026 facets and G100 scope against the source PDF.',
  },
};
