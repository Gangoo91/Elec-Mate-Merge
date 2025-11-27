/**
 * EICR Defect Classification Constants
 * Source: Electrical Safety First Best Practice Guide 4 (Issue 4) & IET Guidance Note 3
 * 
 * These are the official EICR Classification Codes used in Electrical Installation Condition Reports
 * to categorize observations and defects found during inspections.
 */

export const BPG4_CLASSIFICATION_CODES = {
  C1: {
    code: 'C1',
    title: 'Danger Present',
    definition: 'Risk of injury. Immediate remedial action required.',
    action: 'The person ordering the work must be advised IMMEDIATELY in writing. The installation or affected part(s) should be isolated until remedial action is taken.',
    reportResult: 'UNSATISFACTORY',
    color: 'red',
    urgency: 'IMMEDIATE',
    bpg4Reference: 'Best Practice Guide 4, Page 11-12',
    gn3Reference: 'GN3 Section 3.2 - Immediate danger to life or property'
  },
  C2: {
    code: 'C2',
    title: 'Potentially Dangerous',
    definition: 'Urgent remedial action required. Could become C1 under certain conditions.',
    action: 'The person ordering the work must be advised as soon as possible in writing. Urgent attention required within 28 days.',
    reportResult: 'UNSATISFACTORY',
    color: 'orange',
    urgency: 'URGENT',
    bpg4Reference: 'Best Practice Guide 4, Page 13-14',
    gn3Reference: 'GN3 Section 3.3 - Potentially dangerous, urgent remedial action required'
  },
  C3: {
    code: 'C3',
    title: 'Improvement Recommended',
    definition: 'Does not comply with current BS 7671 but not immediately dangerous. Improvement recommended.',
    action: 'The person ordering the work should be advised that improvements would enhance safety, though not urgent.',
    reportResult: 'SATISFACTORY (with improvements recommended)',
    color: 'amber',
    urgency: 'RECOMMENDED',
    bpg4Reference: 'Best Practice Guide 4, Page 15-16',
    gn3Reference: 'GN3 Section 3.4 - Improvement recommended'
  },
  FI: {
    code: 'FI',
    title: 'Further Investigation Required',
    definition: 'Cannot confirm safety without further investigation. Requires immediate attention.',
    action: 'Further investigation required without delay to determine if C1, C2, or C3 classification is appropriate.',
    reportResult: 'REQUIRES INVESTIGATION',
    color: 'purple',
    urgency: 'INVESTIGATE',
    bpg4Reference: 'Best Practice Guide 4, Page 17',
    gn3Reference: 'GN3 Section 3.5 - Further investigation required without delay'
  }
};

/**
 * Official defect examples from Electrical Safety First Best Practice Guide 4
 * These represent common observations that typically warrant each classification
 */
export const BPG4_DEFECT_EXAMPLES = {
  // C1 - Danger Present (Almost always C1)
  C1_DANGER_PRESENT: {
    category: 'C1',
    examples: [
      {
        defect: 'Exposed live parts accessible to touch',
        regulation: '416.2.1',
        description: 'Basic protection compromised - live conductors accessible',
        visualIndicators: ['bare conductors visible', 'missing accessory covers', 'damaged enclosures with live parts visible'],
        bpg4Page: 11
      },
      {
        defect: 'Conductive parts have become live as result of a fault',
        regulation: '411.3.1.1',
        description: 'Fault protection compromised - exposed-conductive-parts are live',
        visualIndicators: ['metal parts showing voltage', 'visible damage to protective conductor', 'corrosion or damage to earthing'],
        bpg4Page: 11
      },
      {
        defect: 'Incorrect polarity (live and neutral reversed)',
        regulation: '612.6',
        description: 'Reversed polarity creates shock risk even when switched off',
        visualIndicators: ['testing reveals reversed L-N', 'single pole switches on neutral'],
        bpg4Page: 11
      },
      {
        defect: 'Missing or inadequate basic protection',
        regulation: '416.2',
        description: 'Barriers or enclosures missing, allowing contact with live parts',
        visualIndicators: ['missing knockouts in enclosures', 'broken accessory fronts', 'exposed terminals'],
        bpg4Page: 12
      },
      {
        defect: 'Overheating connections causing fire risk',
        regulation: '526.1',
        description: 'Connections showing signs of overheating or arcing',
        visualIndicators: ['charring', 'discoloured insulation', 'melted accessories', 'burning smell'],
        bpg4Page: 12
      }
    ],
    alwaysTriggers: ['exposed live', 'incorrect polarity', 'live parts accessible', 'arcing', 'burning', 'charred']
  },

  // C2 - Potentially Dangerous (Usually C2, context can escalate to C1)
  C2_POTENTIALLY_DANGEROUS: {
    category: 'C2',
    examples: [
      {
        defect: 'Absence of a reliable and effective means of earthing',
        regulation: '411.3.1.1, 542.1.1',
        description: 'No protective earthing or bonding present',
        visualIndicators: ['no main earthing conductor', 'disconnected earth', 'inadequate bonding'],
        contextEscalation: { to: 'C1', when: 'no earth at all and metal-cased equipment present' },
        bpg4Page: 13
      },
      {
        defect: 'Earth fault loop impedance (Zs) exceeds maximum permitted',
        regulation: '411.4.4, Table 41.3',
        description: 'Zs value greater than BS 7671 Table 41.3 maximum for the protective device',
        visualIndicators: ['test results show excessive Zs', 'long cable runs', 'undersized conductors'],
        bpg4Page: 13
      },
      {
        defect: 'Insulation resistance less than 1 MΩ',
        regulation: '612.3.2',
        description: 'IR reading below acceptable minimum indicating insulation degradation',
        visualIndicators: ['IR test shows <1MΩ', 'damp circuits', 'aged cable'],
        bpg4Page: 13
      },
      {
        defect: 'Absence of RCD protection for bathroom circuits',
        regulation: '701.512.3',
        description: 'Socket-outlets or circuits in bathroom locations without 30mA RCD',
        visualIndicators: ['bathroom without RCD', 'zone 1/2 equipment unprotected'],
        contextEscalation: { to: 'C1', when: 'equipment in Zone 0 or Zone 1 without RCD' },
        bpg4Page: 14
      },
      {
        defect: 'Equipment with inappropriately selected IP rating',
        regulation: '416.2, Section 701',
        description: 'Equipment in special location (bathroom, outdoor) without adequate IP rating',
        visualIndicators: ['non-IP rated equipment in bathroom', 'outdoor socket not IP rated'],
        bpg4Page: 14
      },
      {
        defect: 'Circuit overloaded - cable undersized for protection',
        regulation: '433.1.1',
        description: 'Cable current-carrying capacity less than protective device rating',
        visualIndicators: ['1.5mm² cable on 32A MCB', 'visible overheating on cable'],
        bpg4Page: 14
      }
    ],
    usuallyTriggers: ['no earthing', 'no RCD', 'Zs exceeded', 'insulation low', 'overloaded', 'IP rating']
  },

  // C3 - Improvement Recommended (Not dangerous but enhances safety)
  C3_IMPROVEMENT_RECOMMENDED: {
    category: 'C3',
    examples: [
      {
        defect: 'Absence of RCD protection for general socket-outlets',
        regulation: '411.3.3',
        description: 'Socket-outlets without 30mA RCD protection (unless outdoor/bathroom)',
        visualIndicators: ['indoor sockets without RCD'],
        note: 'This is C3 for general indoor sockets, but C2 for outdoor/bathroom',
        bpg4Page: 15
      },
      {
        defect: 'Absence of RCD protection for cables at less than 50mm depth',
        regulation: '522.6.202, 522.6.203',
        description: 'Concealed cables in walls/partitions without RCD and likely <50mm depth',
        visualIndicators: ['surface-run cables chased in', 'no RCD on lighting circuits'],
        bpg4Page: 15
      },
      {
        defect: 'Old wiring colours without identification',
        regulation: '514.3.1',
        description: 'Red/black cables present without warning notice at distribution board',
        visualIndicators: ['red/black/yellow/blue cables', 'no identification notice'],
        bpg4Page: 16
      },
      {
        defect: 'No surge protection device (SPD)',
        regulation: '443.4',
        description: 'Installations from 2019 onwards should have SPD (unless risk assessment shows otherwise)',
        visualIndicators: ['consumer unit without SPD', 'post-2019 installation'],
        bpg4Page: 16
      },
      {
        defect: 'Inadequate circuit labelling or schedules',
        regulation: '514.8.1, 514.9.1',
        description: 'Circuits not adequately identified at distribution board',
        visualIndicators: ['no circuit chart', 'unclear labels', 'missing schedules'],
        bpg4Page: 16
      },
      {
        defect: 'Absence of arc fault detection device (AFDD)',
        regulation: '421.1.7',
        description: 'AFDD recommended for certain circuits (bedrooms, escape routes)',
        visualIndicators: ['no AFDD present', 'sleeping accommodation without AFDD'],
        bpg4Page: 16
      }
    ],
    neverC1: ['old colours', 'no SPD', 'poor labelling', 'no AFDD', 'plastic consumer unit']
  },

  // FI - Further Investigation Required
  FI_FURTHER_INVESTIGATION: {
    category: 'FI',
    examples: [
      {
        defect: 'Supply characteristics do not conform to supply industry norms',
        regulation: '313.1',
        description: 'Cannot verify supply parameters (voltage, frequency, prospective fault current)',
        visualIndicators: ['unusual supply arrangement', 'cannot access supply'],
        bpg4Page: 17
      },
      {
        defect: 'Cannot verify concealed wiring or connections',
        regulation: '611.3',
        description: 'Parts of installation concealed and cannot be inspected',
        visualIndicators: ['buried cables', 'inaccessible junction boxes', 'concealed under floors'],
        bpg4Page: 17
      },
      {
        defect: 'Earth electrode resistance unknown - cannot access',
        regulation: '542.2.3',
        description: 'TT system but earth electrode cannot be located or tested',
        visualIndicators: ['earth rod not visible', 'electrode inaccessible'],
        bpg4Page: 17
      },
      {
        defect: 'Distribution board or protective devices inaccessible for testing',
        regulation: '132.12',
        description: 'Cannot access DB or circuits to carry out full testing',
        visualIndicators: ['locked rooms', 'concealed DB', 'tenant refused access'],
        bpg4Page: 17
      },
      {
        defect: 'Circuits that cannot be readily identified or traced',
        regulation: '514.1.1',
        description: 'Cannot determine circuit routing or connected equipment',
        visualIndicators: ['unlabelled circuits', 'complex installation', 'no drawings'],
        bpg4Page: 17
      }
    ]
  }
};

/**
 * Context-dependent escalation rules from BPG4
 * Some defects change classification based on location or circumstances
 */
export const CONTEXT_ESCALATION_RULES = {
  rcdAbsence: {
    baseClassification: 'C3',
    escalations: [
      { context: 'bathroom zone 0 or 1', escalateTo: 'C1', reason: 'Immediate shock risk in wet location' },
      { context: 'bathroom zone 2', escalateTo: 'C2', reason: 'Wet location requires RCD protection' },
      { context: 'outdoor socket', escalateTo: 'C2', reason: 'Outdoor circuits require RCD per 411.3.3' },
      { context: 'general indoor socket', classification: 'C3', reason: 'Improvement recommended per BPG4 page 15' }
    ]
  },
  cableSheath: {
    baseClassification: 'C3',
    escalations: [
      { context: 'conductors accessible to touch', escalateTo: 'C2', reason: 'Risk of contact with live parts' },
      { context: 'conductors not accessible', classification: 'C3', reason: 'Poor workmanship but not dangerous' }
    ]
  },
  bonding: {
    baseClassification: 'C2',
    escalations: [
      { context: 'no main protective bonding at all', escalateTo: 'C1', reason: 'Complete absence creates immediate danger' },
      { context: 'undersized bonding conductors', classification: 'C2', reason: 'May not carry fault current' }
    ]
  }
};

/**
 * Source attribution for compliance and traceability
 */
export const SOURCE_ATTRIBUTION = {
  primary: 'Electrical Safety First Best Practice Guide 4 (Issue 4)',
  secondary: 'IET Guidance Note 3: Inspection & Testing (BS 7671:2018+A3:2024)',
  regulation: 'BS 7671:2018+A3:2024 Requirements for Electrical Installations',
  website: 'https://www.electricalsafetyfirst.org.uk'
};
