import type { CalculatorContent } from './types';

/**
 * Lightning protection risk assessment — BS EN 62305.
 */
export const lightningProtectionContent: CalculatorContent = {
  slug: 'lightning-protection',
  governingStandards: ['BS EN 62305'],

  whyItMatters: [
    'BS EN 62305 decides whether a structure needs a lightning protection system by comparing the calculated risk against a tolerable level.',
    'The expected number of strikes depends on the structure’s collection area, its location’s ground flash density and an environmental factor.',
    'Risk is then weighed against loss factors (life, service, heritage) — only if it exceeds the tolerable risk is protection required, and to a specific protection level (LPL I–IV).',
    'It turns a subjective “does it need protection?” into a defensible, documented assessment.',
  ],

  whenToCheck: [
    'Deciding whether a structure needs a lightning protection system',
    'Determining the required protection level (LPL/Class)',
    'Assessing risk to life, services and contents',
    'Documenting a BS EN 62305-2 risk assessment',
  ],

  commonMistakes: [
    'Assuming protection is needed without doing the risk calculation',
    'Using the wrong collection area for the structure’s height and footprint',
    'Ignoring incoming services (power, comms) as a strike/surge path',
    // Reg 443.4.1 (BS 7671:2018+A4:2026) — SPDs are the default, so "no SPD" is an
    // owner declaration, not an outcome of a lightning risk calculation.
    'Treating SPDs as optional — Reg 443.4.1 requires protection against transient overvoltages unless the owner declares in writing that it is not required',
    'Fitting a Type 2 SPD where the structure has an external LPS — Reg 534.4.1.3 calls for Type 1 as close as possible to the origin',
  ],

  workedExample: {
    scenario: 'Cottage 10 × 8 × 6 m, ground flash density Ng = 1.2.',
    inputs: [
      { label: 'Collection area Ad', value: '~1746 m²' },
      { label: 'Ng', value: '1.2 /km²/yr' },
      { label: 'Tolerable risk', value: '1×10⁻⁵' },
    ],
    steps: [
      'Expected strikes Nd = Ng × Ad × Cd × 10⁻⁶',
      'Nd ≈ 1.2 × 1746 × 1.0 × 10⁻⁶ ≈ 0.0021/yr',
      'Resulting risk (~5×10⁻⁶) is below the tolerable 1×10⁻⁵',
    ],
    result: 'Risk below tolerable → no LPS required for this structure.',
  },

  standards: [
    {
      standard: 'BS EN 62305',
      citation: 'BS EN 62305-2 — Risk management',
      clauseText:
        'BS EN 62305-2 sets out the risk assessment: calculate the risk components from the expected number of dangerous events and the probabilities and losses, and compare against the tolerable risk (typically 1×10⁻⁵ for loss of life) to decide the need and class of protection.',
    },
    {
      standard: 'BS 7671',
      citation: 'BS 7671:2018+A4:2026 Reg 443.4.1 — Protection against transient overvoltages',
      clauseText:
        'Protection against transient overvoltages shall be provided where the consequence caused by the overvoltage could result in (a) serious injury to, or loss of, human life; (b) failure of a safety service, as defined in Part 2; or (c) significant financial or data loss. For all other cases, protection against transient overvoltages shall be provided unless the owner of the installation declares it is not required, on the basis that any loss or damage is tolerable and that they accept the risk of damage to equipment and any consequential loss.',
    },
    {
      standard: 'BS 7671',
      citation: 'BS 7671:2018+A4:2026 Regs 534.4.1.3 and 534.4.1.4 — SPD type at the origin',
      clauseText:
        'Where the installation of SPDs is required by Section 443 and the structure is equipped with an external lightning protection system or protection against the effects of direct lightning, Type 1 SPDs shall be installed as close as possible to the origin of the electrical installation (534.4.1.3). Where the structure is not so equipped, or does not require protection against the effects of direct lightning, Type 2 SPDs shall be installed as close as possible to the origin (534.4.1.4).',
    },
    {
      standard: 'BS 7671',
      citation: 'BS 7671:2018+A4:2026 Reg 534.4.4.4.2 and Table 534.4 — impulse discharge current',
      clauseText:
        'Where Type 1 SPDs are required at or near the origin and no risk analysis to BS EN 62305-2 has been carried out, the impulse discharge current Iimp shall be not less than the values in Table 534.4 (12.5 kA for the L-N and L-PE connections; the table refers to lightning protection levels III and IV). Where a risk analysis to BS EN 62305-2 has been carried out, Iimp shall be determined to the BS EN 62305 series.',
    },
  ],

  _grounding: {
    status: 'needs-review',
    generatedAt: '2026-08-06',
    notes:
      'BS 7671 SPD clauses (443.4.1, 534.4.1.3, 534.4.1.4, 534.4.4.4.2 / Table 534.4) verified against bs7671_facets A4:2026 and the printed standard. The BS EN 62305-2 risk model itself (Cd, PB, loss factors, tolerable risk RT, risk components) is NOT in the BS 7671 / GN3 / OSG corpus and remains unverified — the engine is an indicative screening tool, not a formal BS EN 62305-2 risk assessment.',
  },
};
