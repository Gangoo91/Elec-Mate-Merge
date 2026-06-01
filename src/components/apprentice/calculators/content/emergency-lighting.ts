import type { CalculatorContent } from './types';

/**
 * Emergency lighting — BS 5266-1.
 */
export const emergencyLightingContent: CalculatorContent = {
  slug: 'emergency-lighting',
  governingStandards: ['BS 5266'],

  whyItMatters: [
    'Emergency lighting keeps escape routes usable when the normal supply fails — BS 5266-1 sets the minimum illuminance, duration and coverage.',
    'Escape routes need at least 1 lux along the centre line; open (anti-panic) areas and high-risk task areas have their own minimums.',
    'Duration is typically 3 hours (or 1 hour where premises are evacuated and not reoccupied until recharged) — it sizes the battery.',
    'Luminaires must be sited at key points (exits, stairs, changes of direction, fire equipment) regardless of the spacing calculation.',
  ],

  whenToCheck: [
    'Designing escape-route and open-area emergency lighting',
    'Sizing the battery/inverter for the required duration',
    'Placing luminaires at the mandatory points (exits, stairs, call points)',
    'Verifying illuminance and duration at commissioning and on test',
  ],

  commonMistakes: [
    'Designing to spacing alone and missing the mandatory point locations',
    'Under-sizing the battery for the full rated duration (allow for inverter losses)',
    'Using the wrong minimum lux for the area type (route vs open vs high-risk)',
    'Forgetting the routine test regime (monthly function, annual full-duration)',
  ],

  workedExample: {
    scenario: '100 m² open-plan area (anti-panic), 3-hour duration, 3 W LED emergency fittings.',
    inputs: [
      { label: 'Area type', value: 'Open / anti-panic' },
      { label: 'Minimum illuminance', value: '0.5 lux (open area); escape routes 1 lux' },
      { label: 'Duration', value: '3 hours' },
    ],
    steps: [
      'Place fittings at exits, stairs and direction changes first',
      'Add fittings to meet the open-area minimum and uniformity',
      'Size the battery for the total emergency load over 3 hours (allow inverter losses)',
    ],
    result: 'Coverage by mandatory points + spacing; battery sized to the 3-hour load.',
  },

  standards: [
    {
      standard: 'BS 5266',
      citation: 'BS 5266-1 — Emergency lighting (code of practice)',
      clauseText:
        'BS 5266-1 specifies the minimum illuminance for escape routes (≥1 lux centre line), open areas and high-risk task areas, the required duration (typically 3 h), luminaire siting at key points, and the testing regime.',
    },
  ],

  _grounding: {
    status: 'needs-review',
    generatedAt: '2026-06-01',
    notes:
      'BS 5266-1 illuminance/duration/siting authored from the code of practice (not in BS 7671 facets). Battery sizing now includes inverter losses (corrected in this pass). Confirm figures against BS 5266-1.',
  },
};
