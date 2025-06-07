
export type InspectionOutcome = 'acceptable' | 'c1' | 'c2' | 'c3' | 'nv' | 'lim' | 'na';

export interface InspectionItem {
  id: string;
  item: string;
  regulation?: string;
  outcome: InspectionOutcome;
  notes: string;
  isCritical?: boolean;
  requiresAction?: boolean;
}

export interface InspectionSection {
  id: string;
  title: string;
  description: string;
  regulation: string;
  items: InspectionItem[];
  isComplete: boolean;
  completedAt?: string;
}

export const outcomeDefinitions = {
  acceptable: {
    label: 'Acceptable',
    description: 'No defects found - installation complies with BS 7671',
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
    borderColor: 'border-green-500/30'
  },
  c1: {
    label: 'C1 - Danger Present',
    description: 'Immediate remedial action required - installation is dangerous',
    color: 'text-red-400',
    bgColor: 'bg-red-500/20',
    borderColor: 'border-red-500/30'
  },
  c2: {
    label: 'C2 - Potentially Dangerous',
    description: 'Urgent remedial action required - installation is potentially dangerous',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/20',
    borderColor: 'border-orange-500/30'
  },
  c3: {
    label: 'C3 - Improvement Recommended',
    description: 'Improvement recommended for enhanced safety and performance',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/20',
    borderColor: 'border-yellow-500/30'
  },
  nv: {
    label: 'N/V - Not Verified',
    description: 'Unable to inspect due to accessibility or other limitations',
    color: 'text-gray-400',
    bgColor: 'bg-gray-500/20',
    borderColor: 'border-gray-500/30'
  },
  lim: {
    label: 'LIM - Limitation',
    description: 'Limitation encountered during inspection process',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/20',
    borderColor: 'border-purple-500/30'
  },
  na: {
    label: 'N/A - Not Applicable',
    description: 'Not applicable to this type of installation',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
    borderColor: 'border-blue-500/30'
  }
} as const;

export const enhancedVisualInspectionSections: InspectionSection[] = [
  {
    id: 'external-intake',
    title: 'External Intake Equipment',
    description: 'Supply intake, service head, meter tails and main earthing',
    regulation: 'BS 7671 Section 544.1, 411.3.1.1',
    isComplete: false,
    items: [
      {
        id: 'service-head-seal',
        item: 'Service head seal integrity and security',
        regulation: 'BS 7671 544.1.1',
        outcome: 'acceptable',
        notes: '',
        isCritical: true
      },
      {
        id: 'meter-tails-condition',
        item: 'Meter tails condition, size and termination',
        regulation: 'BS 7671 526.3',
        outcome: 'acceptable',
        notes: '',
        isCritical: true
      },
      {
        id: 'main-earthing-conductor',
        item: 'Main earthing conductor size and connection',
        regulation: 'BS 7671 544.1.1',
        outcome: 'acceptable',
        notes: '',
        isCritical: true
      },
      {
        id: 'cutout-condition',
        item: 'Cutout condition and accessibility',
        regulation: 'BS 7671 132.12',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'meter-position',
        item: 'Meter position and condition',
        outcome: 'acceptable',
        notes: ''
      }
    ]
  },
  {
    id: 'consumer-unit',
    title: 'Consumer Unit / Distribution Board',
    description: 'Main distribution board, labelling, RCD protection',
    regulation: 'BS 7671 Chapter 53, Section 411',
    isComplete: false,
    items: [
      {
        id: 'adequate-access',
        item: 'Adequate access and working space',
        regulation: 'BS 7671 132.12',
        outcome: 'acceptable',
        notes: '',
        isCritical: true
      },
      {
        id: 'enclosure-suitable',
        item: 'Enclosure suitable for environment and conditions',
        regulation: 'BS 7671 512.2',
        outcome: 'acceptable',
        notes: '',
        isCritical: true
      },
      {
        id: 'circuits-identified',
        item: 'All circuits properly identified and labelled',
        regulation: 'BS 7671 514.8.1',
        outcome: 'acceptable',
        notes: '',
        isCritical: true
      },
      {
        id: 'rcd-present',
        item: 'RCD(s) present and properly identified',
        regulation: 'BS 7671 411.3.3',
        outcome: 'acceptable',
        notes: '',
        isCritical: true
      },
      {
        id: 'warning-notices',
        item: 'Warning notices and test button labels present',
        regulation: 'BS 7671 514.12.2',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'protective-devices',
        item: 'Protective devices correctly rated and type',
        regulation: 'BS 7671 533.1',
        outcome: 'acceptable',
        notes: '',
        isCritical: true
      }
    ]
  },
  {
    id: 'earthing-arrangements',
    title: 'Earthing and Bonding Arrangements',
    description: 'Main earthing, equipotential bonding, earth electrodes',
    regulation: 'BS 7671 Section 544, Chapter 54',
    isComplete: false,
    items: [
      {
        id: 'main-earthing-adequate',
        item: 'Main earthing conductor present and adequately sized',
        regulation: 'BS 7671 544.1.1',
        outcome: 'acceptable',
        notes: '',
        isCritical: true
      },
      {
        id: 'cpc-present',
        item: 'Circuit protective conductors present throughout',
        regulation: 'BS 7671 543.1',
        outcome: 'acceptable',
        notes: '',
        isCritical: true
      },
      {
        id: 'equipotential-bonding',
        item: 'Main equipotential bonding conductors adequate',
        regulation: 'BS 7671 544.1.2',
        outcome: 'acceptable',
        notes: '',
        isCritical: true
      },
      {
        id: 'supplementary-bonding',
        item: 'Supplementary bonding where required',
        regulation: 'BS 7671 415.2',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'earth-electrode',
        item: 'Earth electrode (where applicable) condition',
        regulation: 'BS 7671 542.2',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'bonding-labels',
        item: 'Earth and bonding conductor labels present',
        regulation: 'BS 7671 514.13.1',
        outcome: 'acceptable',
        notes: ''
      }
    ]
  },
  {
    id: 'wiring-systems',
    title: 'Wiring Systems and Cable Management',
    description: 'Cable routes, supports, protection and segregation',
    regulation: 'BS 7671 Chapter 52',
    isComplete: false,
    items: [
      {
        id: 'cables-supported',
        item: 'Cables properly supported and protected from damage',
        regulation: 'BS 7671 522.8.5',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'cables-suitable',
        item: 'Cables suitable for environmental conditions',
        regulation: 'BS 7671 522.1',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'mechanical-protection',
        item: 'Adequate protection against mechanical damage',
        regulation: 'BS 7671 522.6',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'cable-segregation',
        item: 'Proper segregation from non-electrical services',
        regulation: 'BS 7671 528.1',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'cable-identification',
        item: 'Cable core identification correct',
        regulation: 'BS 7671 514.3',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'fire-barriers',
        item: 'Fire barriers and sealing arrangements',
        regulation: 'BS 7671 527.1',
        outcome: 'acceptable',
        notes: ''
      }
    ]
  },
  {
    id: 'accessories-equipment',
    title: 'Accessories and Fixed Equipment',
    description: 'Socket outlets, switches, fixed appliances and IP ratings',
    regulation: 'BS 7671 Section 553, 411.3.3',
    isComplete: false,
    items: [
      {
        id: 'socket-rcd-protection',
        item: 'Socket outlets ≤20A have RCD protection',
        regulation: 'BS 7671 411.3.3',
        outcome: 'acceptable',
        notes: '',
        isCritical: true
      },
      {
        id: 'adequate-ip-rating',
        item: 'Adequate IP rating for location and environment',
        regulation: 'BS 7671 512.2',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'switches-isolators',
        item: 'Switches and isolators correctly rated and marked',
        regulation: 'BS 7671 537.1',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'no-damage-evident',
        item: 'No visible damage or deterioration evident',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'fixed-equipment',
        item: 'Fixed equipment properly connected and secured',
        regulation: 'BS 7671 553.1',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'outdoor-equipment',
        item: 'Outdoor equipment weatherproof and secure',
        regulation: 'BS 7671 522.3',
        outcome: 'acceptable',
        notes: ''
      }
    ]
  },
  {
    id: 'connections-terminations',
    title: 'Connections and Terminations',
    description: 'Junction boxes, connections, conductor terminations',
    regulation: 'BS 7671 Section 526',
    isComplete: false,
    items: [
      {
        id: 'connections-secure',
        item: 'All connections tight, secure and accessible',
        regulation: 'BS 7671 526.3',
        outcome: 'acceptable',
        notes: '',
        isCritical: true
      },
      {
        id: 'conductor-identification',
        item: 'Conductor identification correct throughout',
        regulation: 'BS 7671 514.3',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'junction-boxes',
        item: 'Junction boxes accessible for inspection',
        regulation: 'BS 7671 526.3',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'no-overheating',
        item: 'No signs of overheating or arcing damage',
        outcome: 'acceptable',
        notes: '',
        isCritical: true
      },
      {
        id: 'terminal-ratings',
        item: 'Terminals adequate for conductor size and type',
        regulation: 'BS 7671 526.1',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'enclosure-integrity',
        item: 'Enclosure integrity maintained at terminations',
        regulation: 'BS 7671 526.5',
        outcome: 'acceptable',
        notes: ''
      }
    ]
  },
  {
    id: 'special-locations',
    title: 'Special Locations and Environments',
    description: 'Bathrooms, kitchens, swimming pools, outdoor areas',
    regulation: 'BS 7671 Part 7',
    isComplete: false,
    items: [
      {
        id: 'bathroom-zones',
        item: 'Bathroom zones comply with BS 7671 Part 7 Section 701',
        regulation: 'BS 7671 701.55',
        outcome: 'acceptable',
        notes: '',
        isCritical: true
      },
      {
        id: 'kitchen-requirements',
        item: 'Kitchen installation requirements observed',
        regulation: 'BS 7671 411.3.3',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'outdoor-ip-ratings',
        item: 'Outdoor installation IP ratings adequate',
        regulation: 'BS 7671 522.3',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'swimming-pool',
        item: 'Swimming pool requirements (if applicable)',
        regulation: 'BS 7671 702',
        outcome: 'na',
        notes: ''
      },
      {
        id: 'agricultural-locations',
        item: 'Agricultural/horticultural locations (if applicable)',
        regulation: 'BS 7671 705',
        outcome: 'na',
        notes: ''
      },
      {
        id: 'medical-locations',
        item: 'Medical locations (if applicable)',
        regulation: 'BS 7671 710',
        outcome: 'na',
        notes: ''
      }
    ]
  },
  {
    id: 'rcd-protection',
    title: 'RCD Protection and Operation',
    description: 'RCD types, ratings, test facilities and labelling',
    regulation: 'BS 7671 Section 531, 411.4',
    isComplete: false,
    items: [
      {
        id: 'rcd-test-button',
        item: 'RCD manual test button operational',
        regulation: 'BS 7671 531.2.4',
        outcome: 'acceptable',
        notes: '',
        isCritical: true
      },
      {
        id: 'rcd-protection-provided',
        item: 'RCD protection provided where required by regulations',
        regulation: 'BS 7671 411.3.3',
        outcome: 'acceptable',
        notes: '',
        isCritical: true
      },
      {
        id: 'rcd-ratings',
        item: 'RCD ratings appropriate for protected circuits',
        regulation: 'BS 7671 531.2.1',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'rcd-test-notice',
        item: 'RCD quarterly test notice displayed prominently',
        regulation: 'BS 7671 514.12.2',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'rcd-selectivity',
        item: 'RCD selectivity and discrimination adequate',
        regulation: 'BS 7671 531.2.9',
        outcome: 'acceptable',
        notes: ''
      }
    ]
  },
  {
    id: 'isolation-switching',
    title: 'Isolation and Switching Arrangements',
    description: 'Main switches, isolators, emergency switching',
    regulation: 'BS 7671 Section 537',
    isComplete: false,
    items: [
      {
        id: 'main-switch-accessible',
        item: 'Main switch/isolator readily accessible',
        regulation: 'BS 7671 537.1.2',
        outcome: 'acceptable',
        notes: '',
        isCritical: true
      },
      {
        id: 'emergency-switching',
        item: 'Emergency switching arrangements adequate',
        regulation: 'BS 7671 537.4',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'isolation-devices',
        item: 'Isolation devices properly rated and marked',
        regulation: 'BS 7671 537.2',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'warning-notices-isolation',
        item: 'Warning notices and labels present at isolation points',
        regulation: 'BS 7671 514.11',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'local-isolation',
        item: 'Local isolation provided where required',
        regulation: 'BS 7671 537.2.1.1',
        outcome: 'acceptable',
        notes: ''
      }
    ]
  },
  {
    id: 'undervoltage-protection',
    title: 'Undervoltage and Additional Protection',
    description: 'Undervoltage devices, surge protection, monitoring',
    regulation: 'BS 7671 Section 445, 534',
    isComplete: false,
    items: [
      {
        id: 'undervoltage-protection',
        item: 'Undervoltage protection provided where required',
        regulation: 'BS 7671 445.1',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'protection-devices-rated',
        item: 'Protection devices correctly rated for application',
        regulation: 'BS 7671 533.1',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'manual-reset',
        item: 'Manual reset facilities where required',
        regulation: 'BS 7671 445.1.1',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'surge-protection',
        item: 'Surge protection devices (if fitted) condition',
        regulation: 'BS 7671 534.4',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'monitoring-systems',
        item: 'Monitoring and alarm systems operational',
        outcome: 'acceptable',
        notes: ''
      }
    ]
  }
];

export const getInspectionStats = (sections: InspectionSection[]) => {
  const stats = {
    total: 0,
    acceptable: 0,
    c1: 0,
    c2: 0,
    c3: 0,
    nv: 0,
    lim: 0,
    na: 0
  };

  sections.forEach(section => {
    section.items.forEach(item => {
      stats.total++;
      stats[item.outcome]++;
    });
  });

  return stats;
};

export const getOverallAssessment = (sections: InspectionSection[]): 'satisfactory' | 'unsatisfactory' => {
  const hasC1OrC2 = sections.some(section => 
    section.items.some(item => item.outcome === 'c1' || item.outcome === 'c2')
  );
  return hasC1OrC2 ? 'unsatisfactory' : 'satisfactory';
};
