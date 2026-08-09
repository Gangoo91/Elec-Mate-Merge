import type { CalculatorContent } from './types';

/**
 * Emergency lighting — BS 5266-1:2025.
 *
 * ⚠️ The illuminance figures here are REPORTED from a secondary summary, not read
 * from the standard. BS 5266-1 is copyright BSI and must be licensed to ground
 * clause-level claims. Do not promote this file to `verified` on the strength of
 * the summary note.
 */
export const emergencyLightingContent: CalculatorContent = {
  slug: 'emergency-lighting',
  governingStandards: ['BS 5266'],

  whyItMatters: [
    'Emergency lighting keeps escape routes usable when the normal supply fails — BS 5266-1 sets the minimum illuminance, duration and coverage.',
    'Escape routes need at least 1 lux — BS 5266-1:2025 is reported to require this across the full route width, not just the centre line, so a design scraping 1 lux down the middle can still fail.',
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
      citation: 'BS 5266-1:2025 — Emergency lighting, code of practice',
      clauseText:
        'BS 5266-1:2025 came into force on 31 October 2025 and supersedes BS 5266-1:2016, which is withdrawn. It aligns with BS EN 1838:2024 (performance) and BS EN 50172:2024 (system requirements), and widens scope from escape lighting to escape, local area and standby lighting. Reported design minima: escape routes 1 lux across the full route width; open (anti-panic) areas 0.5 lux at floor level; high-risk task areas 15 lux or 10% of normal lighting, whichever is greater; points of emphasis 5 lux vertical. Testing remains a monthly functional test plus an annual full-duration test, with photometric verification newly required initially and then every five years.',
    },
  ],

  _grounding: {
    status: 'needs-review',
    generatedAt: '2026-06-01',
    notes:
      'Edition brought up to date from Desktop/hav/NOTE-BS5266-1-2025-emergency-lighting-changes.md: BS 5266-1:2025 in force 31 Oct 2025, superseding the withdrawn 2016 edition, aligned to BS EN 1838:2024 and BS EN 50172:2024. \u26a0\ufe0f THAT NOTE IS A SECONDARY SUMMARY of public commentary, NOT the standard \u2014 it says so itself. The lux figures and the full-route-width point are therefore REPORTED, not verified, and must be confirmed against a licensed copy of BS 5266-1:2025 (BSI/BSOL) before anyone relies on them. Status stays needs-review for that reason. Battery sizing includes inverter losses and matches the engine.',
  },
};
