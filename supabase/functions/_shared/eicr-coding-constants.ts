/**
 * EICR Defect Coding Constants
 * NAPIT Code Directory and BS 7671 References
 */

export const NAPIT_CODES = {
  // C1 - Danger Present
  C1_EXPOSED_LIVE: {
    code: 'C1-001',
    description: 'Exposed live parts accessible to touch',
    regulation: '416.2.1',
    category: 'C1'
  },
  C1_NO_EARTH: {
    code: 'C1-002',
    description: 'No protective earthing or bonding',
    regulation: '411.3.1.1, 542.1.1',
    category: 'C1'
  },
  C1_DAMAGED_CABLE: {
    code: 'C1-003',
    description: 'Severely damaged cable with exposed conductors',
    regulation: '522.5.1',
    category: 'C1'
  },
  C1_INCORRECT_POLARITY: {
    code: 'C1-004',
    description: 'Reversed polarity - live and neutral swapped',
    regulation: '612.6',
    category: 'C1'
  },

  // C2 - Potentially Dangerous
  C2_INADEQUATE_BONDING: {
    code: 'C2-001',
    description: 'Inadequate or missing supplementary bonding',
    regulation: '415.2, 701.415.2',
    category: 'C2'
  },
  C2_NO_RCD: {
    code: 'C2-002',
    description: 'Socket outlets without 30mA RCD protection',
    regulation: '411.3.3',
    category: 'C2'
  },
  C2_ZS_EXCEEDED: {
    code: 'C2-003',
    description: 'Earth fault loop impedance (Zs) exceeds maximum permitted',
    regulation: '411.4.4, Table 41.3',
    category: 'C2'
  },
  C2_OVERLOADED_CIRCUIT: {
    code: 'C2-004',
    description: 'Circuit overloaded - cable undersized for protection',
    regulation: '433.1.1',
    category: 'C2'
  },
  C2_BATHROOM_ZONE_BREACH: {
    code: 'C2-005',
    description: 'Equipment in bathroom zones without adequate protection',
    regulation: '701.512.3',
    category: 'C2'
  },

  // C3 - Improvement Recommended
  C3_NO_SPD: {
    code: 'C3-001',
    description: 'No surge protection device (post-2019 installations)',
    regulation: '443.4',
    category: 'C3'
  },
  C3_NO_AFDD: {
    code: 'C3-002',
    description: 'No arc fault detection device (where recommended)',
    regulation: '421.1.7',
    category: 'C3'
  },
  C3_OLD_WIRING_COLOURS: {
    code: 'C3-003',
    description: 'Old wiring colours without identification',
    regulation: '514.3.1',
    category: 'C3'
  },
  C3_POOR_LABELLING: {
    code: 'C3-004',
    description: 'Inadequate circuit labelling or schedules',
    regulation: '514.8.1, 514.9.1',
    category: 'C3'
  },
  C3_LACK_OF_DIVERSITY: {
    code: 'C3-005',
    description: 'Consumer unit lacks adequate circuit protection diversity',
    regulation: '536.1',
    category: 'C3'
  },

  // FI - Further Investigation
  FI_CONCEALED_WORK: {
    code: 'FI-001',
    description: 'Cannot verify concealed wiring or connections',
    regulation: '611.3',
    category: 'FI'
  },
  FI_UNKNOWN_EARTH: {
    code: 'FI-002',
    description: 'Earth electrode resistance unknown - cannot access',
    regulation: '542.2.3',
    category: 'FI'
  },
  FI_INACCESSIBLE_DB: {
    code: 'FI-003',
    description: 'Distribution board or protective devices inaccessible for testing',
    regulation: '132.12',
    category: 'FI'
  }
};

export const GN3_REFERENCES = {
  C1_GUIDANCE: 'GN3 Section 3.2 - Immediate danger to life or property',
  C2_GUIDANCE: 'GN3 Section 3.3 - Potentially dangerous, urgent remedial action required',
  C3_GUIDANCE: 'GN3 Section 3.4 - Improvement recommended',
  FI_GUIDANCE: 'GN3 Section 3.5 - Further investigation required without delay'
};

export const EICR_CODE_DEFINITIONS = {
  C1: {
    title: 'Danger Present',
    description: 'Immediate danger to persons or property. Isolation and urgent remedial action required.',
    color: 'red',
    urgency: 'IMMEDIATE'
  },
  C2: {
    title: 'Potentially Dangerous',
    description: 'Urgent remedial action required. Not immediate danger but could become C1 under certain conditions.',
    color: 'orange',
    urgency: 'URGENT'
  },
  C3: {
    title: 'Improvement Recommended',
    description: 'Does not comply with current BS 7671 but not immediately dangerous. Improvement recommended.',
    color: 'amber',
    urgency: 'RECOMMENDED'
  },
  FI: {
    title: 'Further Investigation',
    description: 'Cannot confirm safety without further investigation. Requires immediate attention.',
    color: 'purple',
    urgency: 'INVESTIGATE'
  }
};
