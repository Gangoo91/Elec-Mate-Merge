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
        'Protection against transient overvoltages shall be provided where the consequence caused by the overvoltage could result in: (a) serious injury to, or loss of, human life; (b) DELETED by BS 7671:2018+A2:2022, Corrigendum (May 2023); (c) significant financial or data loss. For all other cases, protection against transient overvoltages shall be provided unless the owner of the installation declares it is not required due to any loss or damage being tolerable and they accept the risk of damage to equipment and any consequential loss. Note that item (b) — “failure of a safety service, as defined in Part 2” — is NO LONGER a listed trigger; guidance still quoting three live conditions is out of date.',
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
        'Where Type 1 SPDs are required at or near the origin of the electrical installation, one of the following cases applies: (a) where NO risk analysis according to BS EN 62305-2 has been carried out, the impulse discharge current (Iimp) shall be not less than as given in Table 534.4; (b) where the risk analysis HAS been carried out, Iimp shall be determined according to the BS EN 62305 series. Table 534.4 is not a single figure — it is indexed by connection (L-N, L-PE, N-PE), by supply system (single- or three-phase) and by connection type. 12.5 kA is the L-N and L-PE value, but the N-PE connection carries substantially more, rising to 25 kA and 50 kA depending on the connection type and supply system. Read the cell that matches the installation; do not carry 12.5 kA across to N-PE. NOTE: the table refers to lightning protection levels (LPL) III and IV.',
    },
  ],

  _grounding: {
    status: 'needs-review',
    generatedAt: '2026-08-06',
    notes:
      'BS 7671 SPD clauses re-read against the PRINTED standard (Desktop/BS7671_ocr.pdf), which corrected two errors that a previous facets-based pass had marked verified. (1) Reg 443.4.1: item (b), “failure of a safety service, as defined in Part 2”, was DELETED by BS 7671:2018+A2:2022, Corrigendum (May 2023). The file had been stating it as a live trigger for mandatory transient-overvoltage protection. Note that the amendment-summary narrative in the front of the book still lists all three items — the regulation body is the authority, and they disagree. (2) Table 534.4 was reduced here to “12.5 kA for the L-N and L-PE connections”; the table is actually indexed by connection, supply system and connection type, and the N-PE connection reaches 25 kA and 50 kA. Specifying 12.5 kA on an N-PE connection could under-rate the SPD fourfold. Regs 534.4.1.3, 534.4.1.4 and 534.4.4.4.2(a)/(b) verified word-for-word. The BS EN 62305-2 risk model itself (Cd, PB, loss factors, tolerable risk RT, risk components) is NOT in the BS 7671 / GN3 / OSG corpus and remains unverified — the engine is an indicative screening tool, not a formal BS EN 62305-2 risk assessment.',
  },
};
