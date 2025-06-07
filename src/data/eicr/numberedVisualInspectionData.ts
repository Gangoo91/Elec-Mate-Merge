
export interface NumberedInspectionItem {
  id: string;
  number: string;
  item: string;
  description?: string;
  regulation: string;
  outcome: InspectionOutcome;
  notes: string;
  isCritical: boolean;
  requiresAction: boolean;
}

export interface NumberedInspectionSection {
  id: string;
  number: string;
  title: string;
  description: string;
  regulation: string;
  items: NumberedInspectionItem[];
  isComplete: boolean;
  completedAt?: string;
}

export type InspectionOutcome = 'acceptable' | 'c1' | 'c2' | 'c3' | 'nv' | 'lim' | 'na';

export const outcomeDefinitions = {
  acceptable: {
    label: 'Acceptable',
    description: 'No defects found - installation complies',
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
    borderColor: 'border-green-500/30'
  },
  c1: {
    label: 'C1 - Danger Present',
    description: 'Immediate remedial action required',
    color: 'text-red-400',
    bgColor: 'bg-red-500/20',
    borderColor: 'border-red-500/30'
  },
  c2: {
    label: 'C2 - Potentially Dangerous',
    description: 'Urgent remedial action required',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/20',
    borderColor: 'border-orange-500/30'
  },
  c3: {
    label: 'C3 - Improvement Recommended',
    description: 'Enhancement recommended for safety',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/20',
    borderColor: 'border-yellow-500/30'
  },
  nv: {
    label: 'N/V - Not Verified',
    description: 'Unable to inspect - limitation',
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
    label: 'N/A - Not Applicable',
    description: 'Not applicable to this installation',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
    borderColor: 'border-blue-500/30'
  }
};

export const numberedVisualInspectionSections: NumberedInspectionSection[] = [
  {
    id: 'external-intake',
    number: '1',
    title: 'External Intake Equipment',
    description: 'Visual inspection of service intake equipment and main earthing arrangements',
    regulation: 'BS 7671 Section 544',
    isComplete: false,
    items: [
      {
        id: '1.1',
        number: '1.1',
        item: 'Service head seal integrity and security',
        description: 'Check service head is properly sealed and secure',
        regulation: 'BS 7671 Section 544.1',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: '1.2',
        number: '1.2',
        item: 'Meter tails condition and termination',
        description: 'Inspect meter tails for damage and proper termination',
        regulation: 'BS 7671 Section 526',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: '1.3',
        number: '1.3',
        item: 'Main earthing conductor size and connection',
        description: 'Verify main earthing conductor is adequately sized and connected',
        regulation: 'BS 7671 Section 544.1',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: '1.4',
        number: '1.4',
        item: 'Main equipotential bonding conductor',
        description: 'Check main bonding conductors are present and adequate',
        regulation: 'BS 7671 Section 544.1',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      }
    ]
  },
  {
    id: 'consumer-unit',
    number: '2',
    title: 'Consumer Unit/Distribution Board',
    description: 'Inspection of main distribution equipment and associated components',
    regulation: 'BS 7671 Chapter 53',
    isComplete: false,
    items: [
      {
        id: '2.1',
        number: '2.1',
        item: 'Adequate access and working space',
        description: 'Verify adequate access for operation and maintenance',
        regulation: 'BS 7671 Section 513.1',
        outcome: 'acceptable',
        notes: '',
        isCritical: false,
        requiresAction: false
      },
      {
        id: '2.2',
        number: '2.2',
        item: 'Enclosure suitable for environment',
        description: 'Check enclosure IP rating suitable for location',
        regulation: 'BS 7671 Section 512.2',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: '2.3',
        number: '2.3',
        item: 'All circuits properly identified and labelled',
        description: 'Verify all circuits are clearly identified',
        regulation: 'BS 7671 Section 514.9',
        outcome: 'acceptable',
        notes: '',
        isCritical: false,
        requiresAction: false
      },
      {
        id: '2.4',
        number: '2.4',
        item: 'RCD(s) present and properly identified',
        description: 'Check RCDs are present where required and labelled',
        regulation: 'BS 7671 Section 531.2',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      }
    ]
  },
  {
    id: 'earthing-arrangements',
    number: '3',
    title: 'Earthing Arrangements',
    description: 'Comprehensive inspection of earthing and bonding systems',
    regulation: 'BS 7671 Section 544',
    isComplete: false,
    items: [
      {
        id: '3.1',
        number: '3.1',
        item: 'Main earthing conductor present and adequately sized',
        description: 'Verify main earthing conductor compliance with Table 54.7',
        regulation: 'BS 7671 Section 544.1',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: '3.2',
        number: '3.2',
        item: 'Circuit protective conductors present',
        description: 'Check all circuits have adequate protective conductors',
        regulation: 'BS 7671 Section 543',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: '3.3',
        number: '3.3',
        item: 'Equipotential bonding conductors adequate',
        description: 'Verify main bonding conductors comply with Section 544.1',
        regulation: 'BS 7671 Section 544.1',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: '3.4',
        number: '3.4',
        item: 'Supplementary bonding where required',
        description: 'Check supplementary bonding in special locations',
        regulation: 'BS 7671 Section 544.2',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      }
    ]
  },
  {
    id: 'wiring-systems',
    number: '4',
    title: 'Wiring Systems and Cable Management',
    description: 'Inspection of cable installation, support and protection methods',
    regulation: 'BS 7671 Chapter 52',
    isComplete: false,
    items: [
      {
        id: '4.1',
        number: '4.1',
        item: 'Cables properly supported and protected',
        description: 'Verify cables are adequately supported at proper intervals',
        regulation: 'BS 7671 Section 522',
        outcome: 'acceptable',
        notes: '',
        isCritical: false,
        requiresAction: false
      },
      {
        id: '4.2',
        number: '4.2',
        item: 'Cables suitable for environmental conditions',
        description: 'Check cable types appropriate for installation conditions',
        regulation: 'BS 7671 Section 522.2',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: '4.3',
        number: '4.3',
        item: 'Adequate protection against mechanical damage',
        description: 'Verify protection from mechanical damage where required',
        regulation: 'BS 7671 Section 522.6',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: '4.4',
        number: '4.4',
        item: 'Segregation from non-electrical services',
        description: 'Check separation from gas, water and other services',
        regulation: 'BS 7671 Section 528',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      }
    ]
  },
  {
    id: 'accessories-equipment',
    number: '5',
    title: 'Accessories and Fixed Equipment',
    description: 'Inspection of electrical accessories, switches and fixed equipment',
    regulation: 'BS 7671 Section 411',
    isComplete: false,
    items: [
      {
        id: '5.1',
        number: '5.1',
        item: 'Socket outlets RCD protected ≤20A',
        description: 'Verify socket outlets ≤20A have 30mA RCD protection',
        regulation: 'BS 7671 Section 411.3.3',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: '5.2',
        number: '5.2',
        item: 'Adequate IP rating for location',
        description: 'Check accessories have appropriate IP rating',
        regulation: 'BS 7671 Section 512.2',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: '5.3',
        number: '5.3',
        item: 'Switches and isolators correctly rated',
        description: 'Verify switches are appropriately rated for circuits',
        regulation: 'BS 7671 Section 537.1',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: '5.4',
        number: '5.4',
        item: 'No damage or deterioration evident',
        description: 'Check for signs of damage, burning or deterioration',
        regulation: 'BS 7671 Section 134.1',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      }
    ]
  },
  {
    id: 'connections-terminations',
    number: '6',
    title: 'Connections and Terminations',
    description: 'Inspection of electrical connections and conductor terminations',
    regulation: 'BS 7671 Section 526',
    isComplete: false,
    items: [
      {
        id: '6.1',
        number: '6.1',
        item: 'All connections tight and secure',
        description: 'Verify all accessible connections are properly tightened',
        regulation: 'BS 7671 Section 526.5',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: '6.2',
        number: '6.2',
        item: 'Conductor identification correct',
        description: 'Check conductor colours comply with Table 51',
        regulation: 'BS 7671 Section 514.3',
        outcome: 'acceptable',
        notes: '',
        isCritical: false,
        requiresAction: false
      },
      {
        id: '6.3',
        number: '6.3',
        item: 'Junction boxes accessible for inspection',
        description: 'Verify all junction boxes remain accessible',
        regulation: 'BS 7671 Section 526.3',
        outcome: 'acceptable',
        notes: '',
        isCritical: false,
        requiresAction: false
      },
      {
        id: '6.4',
        number: '6.4',
        item: 'No signs of overheating or damage',
        description: 'Check for evidence of overheating at connections',
        regulation: 'BS 7671 Section 134.1',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      }
    ]
  },
  {
    id: 'special-locations',
    number: '7',
    title: 'Special Locations',
    description: 'Inspection requirements for bathrooms, kitchens and outdoor installations',
    regulation: 'BS 7671 Part 7',
    isComplete: false,
    items: [
      {
        id: '7.1',
        number: '7.1',
        item: 'Bathroom zones comply with BS 7671',
        description: 'Verify bathroom installations comply with Section 701',
        regulation: 'BS 7671 Section 701',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: '7.2',
        number: '7.2',
        item: 'Kitchen requirements observed',
        description: 'Check kitchen installations for compliance',
        regulation: 'BS 7671 Section 411.3.3',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: '7.3',
        number: '7.3',
        item: 'Outdoor installation IP ratings adequate',
        description: 'Verify external equipment has appropriate IP rating',
        regulation: 'BS 7671 Section 512.2',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: '7.4',
        number: '7.4',
        item: 'Swimming pool requirements (if applicable)',
        description: 'Check swimming pool installations comply with Section 702',
        regulation: 'BS 7671 Section 702',
        outcome: 'na',
        notes: '',
        isCritical: true,
        requiresAction: false
      }
    ]
  },
  {
    id: 'rcd-protection',
    number: '8',
    title: 'RCD Protection Systems',
    description: 'Inspection of residual current device installations and operation',
    regulation: 'BS 7671 Section 531',
    isComplete: false,
    items: [
      {
        id: '8.1',
        number: '8.1',
        item: 'RCD manual test button operational',
        description: 'Verify RCD test button operates correctly',
        regulation: 'BS 7671 Section 531.2.4',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: '8.2',
        number: '8.2',
        item: 'RCD protection provided where required',
        description: 'Check RCD protection compliance with Section 411.3.3',
        regulation: 'BS 7671 Section 411.3.3',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: '8.3',
        number: '8.3',
        item: 'RCD ratings appropriate for circuits',
        description: 'Verify RCD ratings suit protected circuits',
        regulation: 'BS 7671 Section 531.2',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: '8.4',
        number: '8.4',
        item: 'RCD quarterly test notice displayed',
        description: 'Check quarterly test notice is prominently displayed',
        regulation: 'BS 7671 Section 514.12.2',
        outcome: 'acceptable',
        notes: '',
        isCritical: false,
        requiresAction: false
      }
    ]
  },
  {
    id: 'isolation-switching',
    number: '9',
    title: 'Isolation and Switching',
    description: 'Inspection of isolation devices and emergency switching arrangements',
    regulation: 'BS 7671 Section 537',
    isComplete: false,
    items: [
      {
        id: '9.1',
        number: '9.1',
        item: 'Main switch/isolator readily accessible',
        description: 'Verify main isolation is readily accessible',
        regulation: 'BS 7671 Section 537.1.4',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: '9.2',
        number: '9.2',
        item: 'Emergency switching arrangements adequate',
        description: 'Check emergency switching where required',
        regulation: 'BS 7671 Section 537.4',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: '9.3',
        number: '9.3',
        item: 'Isolation devices properly rated and marked',
        description: 'Verify isolation devices are appropriately rated',
        regulation: 'BS 7671 Section 537.2',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: '9.4',
        number: '9.4',
        item: 'Warning notices and labels present',
        description: 'Check all required warning notices are displayed',
        regulation: 'BS 7671 Section 514.10',
        outcome: 'acceptable',
        notes: '',
        isCritical: false,
        requiresAction: false
      }
    ]
  },
  {
    id: 'protection-systems',
    number: '10',
    title: 'Protection Systems and Devices',
    description: 'Inspection of overcurrent protection and safety devices',
    regulation: 'BS 7671 Chapter 43',
    isComplete: false,
    items: [
      {
        id: '10.1',
        number: '10.1',
        item: 'Overcurrent protection devices correctly rated',
        description: 'Verify protective devices suit circuit requirements',
        regulation: 'BS 7671 Section 433.1',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: '10.2',
        number: '10.2',
        item: 'Protection devices accessible for operation',
        description: 'Check protective devices are accessible',
        regulation: 'BS 7671 Section 132.12',
        outcome: 'acceptable',
        notes: '',
        isCritical: false,
        requiresAction: false
      },
      {
        id: '10.3',
        number: '10.3',
        item: 'Surge protection devices where required',
        description: 'Verify SPD installation where required by Section 443',
        regulation: 'BS 7671 Section 443.4',
        outcome: 'acceptable',
        notes: '',
        isCritical: false,
        requiresAction: false
      },
      {
        id: '10.4',
        number: '10.4',
        item: 'Arc fault detection devices (AFDD) where specified',
        description: 'Check AFDD installation where required',
        regulation: 'BS 7671 Section 421.1.7',
        outcome: 'acceptable',
        notes: '',
        isCritical: false,
        requiresAction: false
      }
    ]
  }
];

export const getInspectionStats = (sections: NumberedInspectionSection[]) => {
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

export const getOverallAssessment = (sections: NumberedInspectionSection[]): string => {
  const stats = getInspectionStats(sections);
  
  if (stats.c1 > 0) return 'unsatisfactory';
  if (stats.c2 > 0) return 'unsatisfactory';
  if (stats.c3 > 0) return 'satisfactory with improvements';
  
  return 'satisfactory';
};
