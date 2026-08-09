import type { CalculatorContent } from './types';

/**
 * EVSE load (multiple charge points) — BS 7671 Section 722 + load/export management.
 */
export const evseLoadContent: CalculatorContent = {
  slug: 'evse-load',
  governingStandards: ['BS 7671', 'ENA EREC G100', 'Approved Document S'],

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
      standard: 'Approved Document S',
      citation:
        'Approved Document S (2021) §1.1 — how many charge points, which is what drives the load',
      clauseText:
        'Where associated parking spaces are provided for a NEW RESIDENTIAL BUILDING in England, the number of associated parking spaces with access to an electric vehicle charge point must be a minimum of either (a) the number of associated parking spaces, or (b) the number of dwellings the car park serves. NOTE: where no associated parking spaces are provided, there is no requirement to install a charge point. Each point must have a minimum nominal rated output of 7 kW (§6.2b) on a dedicated circuit — so the diversified load for a new development follows from the dwelling/space count, not from a guess. Where a space is exempted under §1.4–1.7, cable routes may still be required.',
      tableRefs: ['Approved Document S §1.1', 'Approved Document S §6.2'],
    },
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
    /*
      Verified against ENA EREC G100 Issue 2 Amendment 2 (2023), Form B —
      Desktop/hav/G100-Issue2-Amd2-2023.pdf. The document's own title confirms the
      scheme covers IMPORT as well as export limitation, which is what makes it the
      right route for capping EV charging demand rather than reinforcing the supply.
      The submission duty below is the part installers miss.
    */
    {
      standard: 'ENA EREC G100',
      citation: 'ENA EREC G100 Issue 2 Amd 2 (2023) — Customer Export or Import Limitation Schemes',
      clauseText:
        'A Customer Limitation Scheme (CLS) may limit import as well as export, so demand can be capped to an agreed value instead of reinforcing the supply. For a one-off installation the installer completes Form B to confirm the CLS has been tested against G100, and that form shall be submitted to the DNO BEFORE commissioning. The site limit is set at engineering access level so the system owner cannot override it (G100/2 §4.2), and the scheme must bring the site back to the agreed capacity within 5 seconds of an excursion.',
      tableRefs: ['G100/2 Form B', 'G100/2 §4.2'],
    },
  ],

  _grounding: {
    status: 'verified',
    generatedAt: '2026-08-06',
    notes:
      'G100 verified against ENA EREC G100 Issue 2 Amd 2 (2023) Form B (Desktop/hav): the scheme covers export OR IMPORT limitation, Form B is submitted to the DNO before commissioning, the limit is set at engineering access level (\u00a74.2), and the CLS returns the site to agreed capacity within 5 s. Section 722 and BS 7671 clauses verified separately against the printed regulations. APPROVED DOCUMENT S (2021) \u00a71.1 added from Desktop/hav/ApprovedDocS-EV-charging-2021.pdf \u2014 the provision rule that actually drives the connected load on a new residential development: one charge point per associated parking space, or per dwelling served, whichever gives the smaller count, with no requirement at all where no associated parking is provided. Part S is England only.',
  },
};
