import type { CalculatorContent } from './types';

/**
 * Solar PV — renewable editorial.
 *
 * Verified against primary sources, not recalled: ENA EREC G99 Issue 2 2025 for the
 * G98/G99 threshold, MCS MIS 3002:2025 Issue 2.0 for the installation standard, and
 * the printed BS 7671 for Section 712.
 */
export const solarPvContent: CalculatorContent = {
  slug: 'solar-pv',
  governingStandards: ['BS 7671', 'ENA EREC G98', 'ENA EREC G99', 'MCS'],

  whyItMatters: [
    'System yield is what the customer is really buying — getting orientation, tilt and the performance ratio right is the difference between a quote that delivers and one that disappoints.',
    'The DNO connection route is decided by inverter output: up to and including 16 A per phase (≈3.68 kW single phase) connects under G98 (notify after); above that, G99 applies and you must apply for and receive agreement before energising.',
    'A compliant PV install needs DC-side isolation, correct labelling and array protection to BS 7671 Section 712 — the DC side can stay live whenever there is daylight.',
    'MCS certification (and a correct VAT rate) affects both grant/SEG eligibility and the customer’s final price.',
  ],

  whenToCheck: [
    'At quote stage, to size the array and predict annual yield against the customer’s usage',
    'When the inverter output approaches 16 A/phase — the G98 vs G99 decision point',
    'For shaded, east/west or non-optimal roofs where the orientation and tilt factors bite',
    'When advising on VAT — domestic GB installs are currently zero-rated (see below)',
  ],

  commonMistakes: [
    'Quoting nameplate kWp as delivered energy — always apply a performance ratio (typically 75–85%)',
    'Assuming G98 applies when the inverter exceeds 16 A per phase (it then needs G99)',
    'Forgetting the DC side stays live in daylight — isolation and labelling per BS 7671 Section 712',
    'Applying 5% or 20% VAT to a domestic GB install that currently qualifies for 0%',
  ],

  workedExample: {
    scenario: '4.0 kWp array, south-facing at 35°, London (≈1100 kWh/m²/yr), PR 80%.',
    inputs: [
      { label: 'System size', value: '4.0 kWp' },
      { label: 'Irradiance', value: '1100 kWh/m²/yr' },
      { label: 'Performance ratio', value: '80%' },
      { label: 'Inverter', value: '3.68 kW (G98)' },
    ],
    steps: [
      'Annual yield = kWp × irradiance × PR',
      'Annual yield = 4.0 × 1100 × 0.80',
      'Annual yield = 3520 kWh/yr',
      'Inverter ≤ 16 A/phase → connects under G98 (notify the DNO)',
    ],
    result: '≈ 3520 kWh/yr; G98 connection; domestic GB VAT 0%.',
  },

  standards: [
    {
      standard: 'ENA EREC G98',
      citation: 'ENA EREC G98 — micro-generation ≤ 16 A/phase',
      clauseText:
        'Fully type-tested micro-generation up to and including 16 A per phase (≈3.68 kW single phase) may be connected under G98, with notification to the DNO. Above this threshold, G99 applies.',
    },
    {
      standard: 'ENA EREC G99',
      citation: 'ENA EREC G99 — generation above the G98 threshold',
      clauseText:
        'Generation above the G98 threshold must be the subject of an application to, and agreement from, the DNO before the installation is energised and connected to the network.',
    },
    {
      standard: 'BS 7671',
      citation: 'BS 7671 Section 712 — Solar PV power supply systems',
      clauseText:
        'PV installations must meet the additional requirements of Section 712, including DC-side isolation, protection and labelling, recognising that the DC side cannot be switched off and remains live in daylight.',
      tableRefs: ['Section 712'],
    },
    /*
      Rewritten against the source (Desktop/hav/MCS-MIS3002-2025-Solar-PV.pdf,
      Issue 1.0, dated 01/01/2025).

      What was here before said MIS 3002 covers "system design, shading
      assessment and commissioning". The word "shading" does not appear anywhere
      in MIS 3002:2025 — that was an invented specific. And the standard does not
      set the design rules itself: §3.2.1 requires design and installation to the
      2nd Edition of the IET Code of Practice for Grid Connected Solar
      Photovoltaic Systems, with MIS 3002's own additions and exceptions on top.
    */
    {
      standard: 'MCS',
      citation: 'MCS MIS 3002:2025 Issue 2.0 — Solar PV installation standard',
      clauseText:
        'Specifies the requirements for MCS Contractors undertaking the supply, design, installation, set to work and commissioning of solar PV systems on permanent buildings, connected in parallel with the distribution network, up to a maximum DC output of 50 kWp (§1). Design and installation follow the 2nd Edition of the IET Code of Practice for Grid Connected Solar Photovoltaic Systems, with the additional requirements and exceptions in §3.3–3.9 (§3.2.1). Where a conflict arises, the latest version of BS 7671 takes precedence, with particular attention drawn to Part 7 Section 712 (§3.2.2).',
      tableRefs: ['MIS 3002 §1', 'MIS 3002 §3.2'],
    },
  ],

  _grounding: {
    status: 'verified',
    generatedAt: '2026-06-01',
    notes:
      'G98/G99 thresholds verified against ENA EREC G99 Issue 2 2025 §6.1.2 (\u2264 16 A per phase is G98 / micro-generator; above that G99) — Desktop/hav/G99-Issue2-2025.pdf. MIS 3002 rewritten against MIS 3002:2025 Issue 2.0 (Desktop/hav): 50 kWp DC scope, design to the IET Code of Practice 2nd Ed, BS 7671 takes precedence. The previous \u201cshading assessment\u201d claim was removed \u2014 that word does not appear in MIS 3002:2025. BS 7671 Section 712 verified separately. \u26a0\ufe0f MIS 3002 SUPERSEDED CHECK (2026-08-09): the held copy was Issue 1.0 (01/01/2025); the current issue is 2.0, dated 18/03/2026, now also held as MCS-MIS3002-2025-Solar-PV-Issue2.0-CURRENT.pdf. Its own amendment record gives the change as \u201cExtension to clause 5.5.5 and other small corrective amendments\u201d. The two clauses quoted here \u2014 the \u00a71 50 kWp DC scope and \u00a73.2.1/3.2.2 deferral to the IET Code of Practice 2nd Edition with BS 7671 taking precedence \u2014 were compared line-by-line across both issues and are UNCHANGED, so the substance stands; only the issue number was stale. Note MCS also runs a parallel \u2018Current Installer Scheme\u2019 MIS 3002 at Issue 6.0 (also 18/03/2026), held alongside it.',
  },
};
