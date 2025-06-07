
export type InspectionOutcome = 
  | 'acceptable' 
  | 'c1' 
  | 'c2' 
  | 'c3' 
  | 'nv' 
  | 'lim' 
  | 'na';

export interface InspectionItem {
  id: string;
  item: string;
  regulation?: string;
  outcome: InspectionOutcome;
  notes: string;
  isCritical: boolean;
  requiresAction: boolean;
}

export interface InspectionSection {
  id: string;
  title: string;
  description: string;
  items: InspectionItem[];
}

export const visualInspectionSections: InspectionSection[] = [
  {
    id: 'external',
    title: '1. External Condition of Intake Equipment',
    description: 'Service head, meter, main earthing, main bonding',
    items: [
      {
        id: 'ext-1',
        item: 'Service head seal integrity and security',
        regulation: 'BS 7671 Chapter 54',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: 'ext-2',
        item: 'Meter tails condition and termination',
        regulation: 'BS 7671 Section 526',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: 'ext-3',
        item: 'Earthing conductor size and connection (Reg 544.1)',
        regulation: 'BS 7671 Section 544.1',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: 'ext-4',
        item: 'Main equipotential bonding conductor (Reg 411.3.1.2)',
        regulation: 'BS 7671 Section 411.3.1.2',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: 'ext-5',
        item: 'Water service bonding within 600mm of entry (Reg 544.1.2)',
        regulation: 'BS 7671 Section 544.1.2',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: 'ext-6',
        item: 'Gas service bonding at meter position',
        regulation: 'BS 7671 Section 544.1.2',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: 'ext-7',
        item: 'Other metallic services bonded where required',
        regulation: 'BS 7671 Section 544.1',
        outcome: 'acceptable',
        notes: '',
        isCritical: false,
        requiresAction: false
      },
      {
        id: 'ext-8',
        item: 'Bonding conductor sizes comply with Table 54.8',
        regulation: 'BS 7671 Table 54.8',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      }
    ]
  },
  {
    id: 'consumer-unit',
    title: '2. Consumer Unit/Distribution Board',
    description: 'Condition, suitability, and compliance',
    items: [
      {
        id: 'cu-1',
        item: 'Adequate access and working space around consumer unit',
        regulation: 'BS 7671 Section 132.12',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: 'cu-2',
        item: 'Enclosure suitable for environment and properly secured',
        regulation: 'BS 7671 Section 416.2',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: 'cu-3',
        item: 'All circuits properly identified and labelled',
        regulation: 'BS 7671 Section 514.9',
        outcome: 'acceptable',
        notes: '',
        isCritical: false,
        requiresAction: false
      },
      {
        id: 'cu-4',
        item: 'RCD(s) present and properly identified',
        regulation: 'BS 7671 Section 531.2',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: 'cu-5',
        item: 'MCB/RCBO ratings match circuit design',
        regulation: 'BS 7671 Chapter 43',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: 'cu-6',
        item: 'No signs of overheating or damage to enclosure',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: 'cu-7',
        item: 'Incoming supply correctly terminated',
        regulation: 'BS 7671 Section 526.8',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: 'cu-8',
        item: 'Busbar connections secure and properly rated',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      }
    ]
  },
  {
    id: 'earthing-bonding',
    title: '3. Earthing Arrangements and Conductors',
    description: 'Earthing and protective bonding systems',
    items: [
      {
        id: 'earth-1',
        item: 'Main earthing conductor present and adequately sized',
        regulation: 'BS 7671 Section 544.1.1',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: 'earth-2',
        item: 'Earthing conductor continuous and properly connected',
        regulation: 'BS 7671 Section 542.1.2',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: 'earth-3',
        item: 'Circuit protective conductors present and correctly sized',
        regulation: 'BS 7671 Section 543.1',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: 'earth-4',
        item: 'Equipotential bonding conductors adequately sized',
        regulation: 'BS 7671 Section 544.2',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: 'earth-5',
        item: 'Supplementary bonding present where required',
        regulation: 'BS 7671 Section 415.2',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: 'earth-6',
        item: 'Earth electrode system (where applicable) in good condition',
        regulation: 'BS 7671 Section 542.2',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      }
    ]
  },
  {
    id: 'wiring-systems',
    title: '4. Wiring Systems and Installation Methods',
    description: 'Cable installation, support, and protection',
    items: [
      {
        id: 'wire-1',
        item: 'Cables properly supported and protected from damage',
        regulation: 'BS 7671 Section 521.10.202',
        outcome: 'acceptable',
        notes: '',
        isCritical: false,
        requiresAction: false
      },
      {
        id: 'wire-2',
        item: 'Cables suitable for environmental conditions',
        regulation: 'BS 7671 Chapter 52',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: 'wire-3',
        item: 'Adequate protection against mechanical damage',
        regulation: 'BS 7671 Section 522.6',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: 'wire-4',
        item: 'Cable installation methods comply with current standards',
        regulation: 'BS 7671 Section 521.10',
        outcome: 'acceptable',
        notes: '',
        isCritical: false,
        requiresAction: false
      },
      {
        id: 'wire-5',
        item: 'Cable routes logical and avoid sharp bends',
        regulation: 'BS 7671 Section 522.8.5',
        outcome: 'acceptable',
        notes: '',
        isCritical: false,
        requiresAction: false
      },
      {
        id: 'wire-6',
        item: 'Segregation from non-electrical services maintained',
        regulation: 'BS 7671 Section 528.1',
        outcome: 'acceptable',
        notes: '',
        isCritical: false,
        requiresAction: false
      },
      {
        id: 'wire-7',
        item: 'Fire barriers and sealing adequate',
        regulation: 'BS 7671 Section 527.2',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      }
    ]
  },
  {
    id: 'accessories',
    title: '5. Accessories and Equipment',
    description: 'Socket outlets, switches, and fixed equipment',
    items: [
      {
        id: 'acc-1',
        item: 'Socket outlets and switches properly secured',
        outcome: 'acceptable',
        notes: '',
        isCritical: false,
        requiresAction: false
      },
      {
        id: 'acc-2',
        item: 'Adequate IP rating for location',
        regulation: 'BS 7671 Section 416.2',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: 'acc-3',
        item: 'No damage or deterioration evident',
        outcome: 'acceptable',
        notes: '',
        isCritical: false,
        requiresAction: false
      },
      {
        id: 'acc-4',
        item: 'Socket outlets RCD protected ≤20A (Reg 411.3.3)',
        regulation: 'BS 7671 Section 411.3.3',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: 'acc-5',
        item: 'Switches and isolators correctly rated',
        regulation: 'BS 7671 Section 537.1',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: 'acc-6',
        item: 'Mounting heights appropriate for accessibility',
        regulation: 'Building Regulations Part M',
        outcome: 'acceptable',
        notes: '',
        isCritical: false,
        requiresAction: false
      },
      {
        id: 'acc-7',
        item: 'Fixed equipment properly connected and supported',
        outcome: 'acceptable',
        notes: '',
        isCritical: false,
        requiresAction: false
      }
    ]
  },
  {
    id: 'connections',
    title: '6. Connections and Terminations',
    description: 'Joint boxes, connections, and terminations',
    items: [
      {
        id: 'conn-1',
        item: 'All connections tight and secure (Reg 526.1)',
        regulation: 'BS 7671 Section 526.1',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: 'conn-2',
        item: 'Conductor identification correct (Reg 514.3)',
        regulation: 'BS 7671 Section 514.3',
        outcome: 'acceptable',
        notes: '',
        isCritical: false,
        requiresAction: false
      },
      {
        id: 'conn-3',
        item: 'Junction boxes accessible for inspection',
        regulation: 'BS 7671 Section 526.3',
        outcome: 'acceptable',
        notes: '',
        isCritical: false,
        requiresAction: false
      },
      {
        id: 'conn-4',
        item: 'No signs of overheating or damage',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: 'conn-5',
        item: 'Proper termination methods used',
        regulation: 'BS 7671 Section 526.2',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: 'conn-6',
        item: 'Cable entries properly sealed',
        regulation: 'BS 7671 Section 416.2.4',
        outcome: 'acceptable',
        notes: '',
        isCritical: false,
        requiresAction: false
      }
    ]
  },
  {
    id: 'special-locations',
    title: '7. Special Locations (where applicable)',
    description: 'Bathrooms, kitchens, outdoor installations',
    items: [
      {
        id: 'special-1',
        item: 'Bathroom zones comply with BS 7671 requirements',
        regulation: 'BS 7671 Section 701',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: 'special-2',
        item: 'Kitchen requirements observed (where applicable)',
        regulation: 'BS 7671 Section 411.3.3',
        outcome: 'acceptable',
        notes: '',
        isCritical: false,
        requiresAction: false
      },
      {
        id: 'special-3',
        item: 'Outdoor installation IP ratings adequate',
        regulation: 'BS 7671 Section 416.2',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: 'special-4',
        item: 'Swimming pool requirements (if applicable)',
        regulation: 'BS 7671 Section 702',
        outcome: 'na',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: 'special-5',
        item: 'Agricultural/horticultural requirements (if applicable)',
        regulation: 'BS 7671 Section 705',
        outcome: 'na',
        notes: '',
        isCritical: true,
        requiresAction: false
      }
    ]
  },
  {
    id: 'rcd-protection',
    title: '8. RCD Protection',
    description: 'Residual current device installation and labelling',
    items: [
      {
        id: 'rcd-1',
        item: 'RCD manual test button operational',
        regulation: 'BS 7671 Section 643.8',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: 'rcd-2',
        item: 'RCD protection provided where required by regulation',
        regulation: 'BS 7671 Section 411.3.3',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: 'rcd-3',
        item: 'RCD ratings appropriate for circuits protected',
        regulation: 'BS 7671 Section 531.2',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: 'rcd-4',
        item: 'RCD quarterly test notice displayed',
        regulation: 'BS 7671 Section 514.12.2',
        outcome: 'acceptable',
        notes: '',
        isCritical: false,
        requiresAction: false
      },
      {
        id: 'rcd-5',
        item: 'Time-delayed RCDs correctly applied',
        regulation: 'BS 7671 Section 531.2.4',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      }
    ]
  },
  {
    id: 'isolation-switching',
    title: '9. Isolation and Switching',
    description: 'Means of isolation and emergency switching',
    items: [
      {
        id: 'iso-1',
        item: 'Main switch/isolator readily accessible',
        regulation: 'BS 7671 Section 537.2.1.1',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: 'iso-2',
        item: 'Emergency switching arrangements adequate',
        regulation: 'BS 7671 Section 537.4',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: 'iso-3',
        item: 'Isolation devices properly rated and marked',
        regulation: 'BS 7671 Section 537.2',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: 'iso-4',
        item: 'Local isolation provided where required',
        regulation: 'BS 7671 Section 537.2.1.6',
        outcome: 'acceptable',
        notes: '',
        isCritical: false,
        requiresAction: false
      },
      {
        id: 'iso-5',
        item: 'Warning notices and labels present',
        regulation: 'BS 7671 Section 514.11',
        outcome: 'acceptable',
        notes: '',
        isCritical: false,
        requiresAction: false
      }
    ]
  },
  {
    id: 'undervoltage',
    title: '10. Undervoltage Protective Devices',
    description: 'Undervoltage protection systems',
    items: [
      {
        id: 'uv-1',
        item: 'Undervoltage protection provided where required',
        regulation: 'BS 7671 Section 445.1',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: 'uv-2',
        item: 'Protection devices correctly rated',
        regulation: 'BS 7671 Section 445.1.1',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: 'uv-3',
        item: 'Manual reset facilities provided where required',
        regulation: 'BS 7671 Section 445.1.2',
        outcome: 'acceptable',
        notes: '',
        isCritical: false,
        requiresAction: false
      }
    ]
  }
];

export const outcomeDefinitions = {
  acceptable: {
    label: 'Acceptable',
    description: 'No defects found - installation complies with current standards',
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
    borderColor: 'border-green-500/30'
  },
  c1: {
    label: 'C1 - Danger present',
    description: 'Danger present - immediate remedial action required',
    color: 'text-red-400',
    bgColor: 'bg-red-500/20',
    borderColor: 'border-red-500/30'
  },
  c2: {
    label: 'C2 - Potentially dangerous',
    description: 'Potentially dangerous - urgent remedial action required',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/20',
    borderColor: 'border-orange-500/30'
  },
  c3: {
    label: 'C3 - Improvement recommended',
    description: 'Improvement recommended to enhance safety',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/20',
    borderColor: 'border-yellow-500/30'
  },
  nv: {
    label: 'N/V - Not verified',
    description: 'Not verified - unable to inspect',
    color: 'text-gray-400',
    bgColor: 'bg-gray-500/20',
    borderColor: 'border-gray-500/30'
  },
  lim: {
    label: 'LIM - Limitation',
    description: 'Limitation encountered during inspection',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/20',
    borderColor: 'border-purple-500/30'
  },
  na: {
    label: 'N/A - Not applicable',
    description: 'Not applicable to this installation',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
    borderColor: 'border-blue-500/30'
  }
};
