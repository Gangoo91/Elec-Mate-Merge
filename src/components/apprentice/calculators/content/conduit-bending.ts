import type { CalculatorContent } from './types';

/**
 * Conduit bending — installation good practice (no governing standard).
 */
export const conduitBendingContent: CalculatorContent = {
  slug: 'conduit-bending',
  governingStandards: ['none'],

  whyItMatters: [
    'Accurate bends save material and make a neat, professional containment — the geometry (shrink, distance between bends, gain) is pure trigonometry.',
    'Keeping to a minimum bend radius stops the conduit kinking and damaging the cables drawn through it.',
    'Calculating shrink (how much the run shortens through a bend) lets you mark the conduit correctly the first time.',
    'Getting it wrong wastes conduit and leaves bends that foul fittings or won’t draw in.',
  ],

  whenToCheck: [
    'Marking out sets, offsets and saddles before bending',
    'Working out the shrink/gain for an offset',
    'Keeping within the minimum bend radius for the conduit size',
    'Spacing multiple bends along a run',
  ],

  commonMistakes: [
    'Forgetting shrink, so the run finishes short or long',
    'Bending tighter than the minimum radius (kinks and draw-in damage)',
    'Using the wrong multiplier for the chosen bend angle',
    'Not deducting the bend take-up from the measured length',
  ],

  workedExample: {
    scenario: 'A 30° offset with a 100 mm rise.',
    inputs: [
      { label: 'Angle', value: '30°' },
      { label: 'Rise', value: '100 mm' },
      { label: 'Distance multiplier', value: '2.0' },
    ],
    steps: [
      'Distance between bends = rise × multiplier = 100 × 2.0 = 200 mm',
      'Shrink ≈ rise × shrink-constant (0.134 at 30°) = 13.4 mm',
      'Mark the second bend 200 mm along, allowing the 13.4 mm shrink',
    ],
    result: 'Bends 200 mm apart; allow ~13 mm shrink on the run.',
  },

  standards: [],

  _grounding: {
    status: 'verified',
    generatedAt: '2026-06-01',
    notes: 'Bending geometry is trigonometry (good practice). Minimum bend radii follow manufacturer/installation guidance; the wiring system still complies with BS 7671 522.8 (avoid damage).',
  },
};
