import type { CalculatorContent } from './types';

/**
 * Lighting (lumen method) — BS EN 12464-1 lighting levels.
 */
export const lumenContent: CalculatorContent = {
  slug: 'lumen',
  governingStandards: ['BS EN 12464', 'Approved Document L'],

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
      standard: 'Approved Document L',
      citation: 'Approved Document L Vol 1 (2021) §6.57–6.60 — dwellings',
      clauseText:
        '§6.57: any fixed lighting should achieve lighting levels appropriate to the activity in the space, and SPACES SHOULD NOT BE OVER-ILLUMINATED — a lumen calculation that simply maximises lux is not the compliant answer. §6.58: where installed in a new or existing dwelling, each internal light fitting should have lamps with a minimum luminous efficacy of 75 LIGHT SOURCE LUMENS PER CIRCUIT-WATT. §6.59: internal fittings should have local controls allowing separate control of each space or zone, manual or automatic. §6.60: fixed EXTERNAL lighting should have automatic controls switching luminaires off in response to daylight, plus occupancy-off automatic controls where efficacy is 75 lm/circuit-watt or less — above that, manual control is acceptable.',
      tableRefs: ['Approved Document L Vol 1 §6.57', '§6.58', '§6.59', '§6.60'],
    },
    {
      standard: 'Approved Document L',
      citation: 'Approved Document L Vol 2 (2021) §6.60 — buildings other than dwellings',
      clauseText:
        'The commercial thresholds are different and higher. General lighting should either have an average LUMINAIRE efficacy of 95 luminaire lumens per circuit-watt, or use the Lighting Energy Numeric Indicator (LENI) method per Appendix B. Display lighting should either have an average LIGHT SOURCE efficacy of 80 light source lumens per circuit-watt, or a rated power usage no greater than 0.3 W/m² in each space, or use the LENI method. High excitation purity light sources: 65 light source lumens per circuit-watt. NOTE: Approved Document L does not set minimum standards for specialist lighting such as theatrical spotlights, stage lighting, gobo projectors or wall-washers.',
      tableRefs: ['Approved Document L Vol 2 §6.60', 'Appendix B (LENI)'],
    },
    {
      standard: 'BS EN 12464',
      citation: 'BS EN 12464-1 — Lighting of work places (indoor) — SOURCE NOT HELD',
      clauseText:
        'BS EN 12464-1 is the standard that sets maintained illuminance, uniformity and glare limits by task and area, and it is where the familiar lux figures for offices, corridors and workshops come from. That document is not held here, so no specific lux value is quoted from it — check the current edition before relying on a target illuminance. Approved Document L governs the EFFICIENCY of the installation; BS EN 12464-1 governs the amount and quality of light.',
    },
  ],
  _grounding: {
    status: 'needs-review',
    generatedAt: '2026-06-01',
    notes:
      'APPROVED DOCUMENT L Vol 1 \u00a76.57\u20136.60 and Vol 2 \u00a76.60 added, quoted from the held sources (Desktop/hav/ApprovedDocL-Vol1-Dwellings.pdf and -Vol2-NonDwellings.pdf) \u2014 both were unused by any calculator. These give hard, checkable numbers this tool previously had none of: 75 light source lm/circuit-watt for dwellings, 95 luminaire lm/circuit-watt for general commercial lighting, 80 for display, 65 for high excitation purity sources, and the 0.3 W/m\u00b2 display alternative. x is worth surfacing because a lumen calculator naturally pushes the other way. \u26a0\ufe0f BS EN 12464-1 IS STILL NOT HELD \u2014 the entry for it now says so explicitly and quotes no lux figure, where it previously asserted what the standard \u201cspecifies\u201d. Status stays needs-review for that reason. Part L is England only. Lumen-method and UF/MF arithmetic match the engine.',
  },
};
