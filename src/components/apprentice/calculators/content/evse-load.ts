import type { CalculatorContent } from './types';

/**
 * EVSE load (multiple charge points) — BS 7671 Section 722 + load/export management.
 */
export const evseLoadContent: CalculatorContent = {
  slug: 'evse-load',
  governingStandards: ['BS 7671', 'ENA EREC G100'],

  whyItMatters: [
    'Reg 311.1 lets you take diversity into account when determining maximum demand, and Reg 722.311.201 adds load curtailment — automatic or manual load reduction or disconnection — as something that may also be counted. What BS 7671 does not give you is a diversity table for EV charge points, so the factor you pick is yours to justify.',
    'Even curtailed, multiple chargers add a large continuous load — the incoming supply, main cable and protective device must all cope, or a DNO upgrade is needed.',
    'Where the supply can’t take the full connected load, a load- or export-management scheme (per ENA EREC G100) can cap demand to an agreed value instead of reinforcing the network.',
    'Every charge point still needs its own Section 722 protection (30 mA RCD at least Type A, DC fault protection under Reg 722.531.3.101, PEN-fault provision on PME).',
  ],

  whenToCheck: [
    'Designing a car park / fleet installation with several charge points',
    'Deciding between a supply upgrade and a load-management (G100) scheme',
    'Applying diversity appropriate to the use (domestic block vs commercial rapid bank)',
    'Confirming the main supply and submains carry the diversified continuous load',
  ],

  commonMistakes: [
    'Summing all charger ratings with no assessment of maximum demand at all',
    'Quoting a coincidence factor as though BS 7671 published one — it does not; Reg 311.1 permits diversity but leaves the figure to the designer to justify',
    'Applying domestic assumptions to a commercial rapid-charge site (they rarely diversify)',
    'Adding a 1.25 "continuous load" multiplier — that is NEC 625.41, not BS 7671. BS 7671 sizes by Reg 433.1.1, Ib ≤ In ≤ Iz',
    'Treating DC fault protection as a DC-rapid-charger issue — RDC-DD to BS IEC 62955 is specified for mode 3, i.e. AC charge points',
  ],

  workedExample: {
    scenario:
      '6 × 7.4 kW points on a small commercial site, 400 V 3-phase, diversity assessed at 0.6 by the designer.',
    inputs: [
      { label: 'Connected load', value: '6 × 7.4 = 44.4 kW' },
      { label: 'Diversity assumed (designer’s figure)', value: '0.6' },
      { label: 'Supply', value: '400 V, 3-phase, PF 0.95' },
    ],
    steps: [
      'Maximum demand after diversity = 44.4 × 0.6 = 26.6 kW',
      'Ib = P ÷ (√3 × U × PF) = 26 640 ÷ (1.732 × 400 × 0.95)',
      'Ib ≈ 40.5 A per phase',
      'Reg 433.1.1(a): select the next standard rating, In = 50 A',
      'Reg 433.1.1(b): confirm In ≤ Iz for the cable after Ca × Ci × Cg',
    ],
    result:
      '≈ 40.5 A/phase → In = 50 A; check Iz and voltage drop, and consider G100 if over capacity.',
  },

  standards: [
    {
      standard: 'BS 7671',
      citation: 'BS 7671 Section 722 — EV charging installations',
      clauseText:
        'Each charging point must meet Section 722 (30 mA RCD of at least Type A, DC fault-current protection per Reg 722.531.3.101, and PEN-fault measures on a PME earth for outdoor points).',
      tableRefs: ['Section 722'],
    },
    {
      standard: 'BS 7671',
      citation: 'BS 7671 Reg 311.1 and Reg 722.311.201 — maximum demand and diversity',
      clauseText:
        'Reg 311.1: “In determining the maximum demand of an installation or part thereof, diversity may be taken into account.” Reg 722.311.201: “Load curtailment, including load reduction or disconnection, either automatically or manually, may be taken into account when determining maximum demand of the installation or part thereof.”',
      tableRefs: ['311.1', '722.311'],
    },
    {
      standard: 'BS 7671',
      citation: 'BS 7671 Reg 433.1.1 — coordination between conductor and overload device',
      clauseText:
        'Ib ≤ In, In ≤ Iz and I2 ≤ 1.45 Iz. Reg 433.1.201: where the device is a BS EN 60898 circuit-breaker or a BS EN 61009-1 RCBO, compliance with (a) and (b) also gives compliance with (c).',
      tableRefs: ['433.1'],
    },
    {
      standard: 'ENA EREC G100',
      citation: 'ENA EREC G100 — export/import limitation',
      clauseText:
        'Where the agreed supply capacity would be exceeded, a compliant load- or export-limitation scheme (G100) may cap the demand to the agreed value rather than reinforcing the network.',
    },
  ],

  _grounding: {
    status: 'verified',
    generatedAt: '2026-08-06',
    notes:
      'Reg 722.311.201 and Reg 433.1.1/433.1.201 quoted from the printed BS 7671:2018+A4:2026. Reg 722.531.3.101 / RDC-DD scope confirmed from Appendix 1 (BS IEC 62955:2018 "RDC-DD to be used for mode 3 charging of electric vehicles") and the index entry. The 1.25 multiplier was removed: the only 1.25 in BS 7671 is Reg 712.433.1 (PV, 1.25 × Isc). G100 scope still to be confirmed against the ENA source.',
  },
};
