
export type InspectionOutcome = 'acceptable' | 'c1' | 'c2' | 'c3' | 'lim' | 'na' | 'fi';

export interface NumberedInspectionItem {
  id: string;
  number: string;
  item: string;
  description?: string;
  regulation?: string;
  outcome: InspectionOutcome;
  notes: string;
  isCritical?: boolean;
  requiresAction?: boolean;
}

export interface NumberedInspectionSection {
  id: string;
  number: string;
  title: string;
  description: string;
  regulation: string;
  items: NumberedInspectionItem[];
  isComplete?: boolean;
  completedAt?: string;
}

export const outcomeDefinitions = {
  acceptable: {
    label: 'Acceptable - Satisfactory',
    description: 'The installation or component meets current standards and regulations',
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
    borderColor: 'border-green-500/30'
  },
  c1: {
    label: 'C1 - Danger Present',
    description: 'Immediate action required - danger present',
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
    description: 'Improvement recommended to enhance safety',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/20',
    borderColor: 'border-yellow-500/30'
  },
  lim: {
    label: 'LIM - Limitation',
    description: 'Inspection limitation preventing complete examination',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
    borderColor: 'border-blue-500/30'
  },
  na: {
    label: 'N/A - Not Applicable',
    description: 'Not applicable to this installation',
    color: 'text-gray-400',
    bgColor: 'bg-gray-500/20',
    borderColor: 'border-gray-500/30'
  },
  fi: {
    label: 'FI - Further Investigation',
    description: 'Further investigation required',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/20',
    borderColor: 'border-purple-500/30'
  }
};

export const numberedVisualInspectionSections: NumberedInspectionSection[] = [
  {
    id: 'section-1',
    number: '1',
    title: 'External Condition of Equipment',
    description: 'Visual inspection of the external condition of electrical equipment and enclosures',
    regulation: 'BS 7671:2018 Section 611.3',
    items: [
      {
        id: 'item-1-1',
        number: '1.1',
        item: 'Service cable',
        description: 'Visual inspection of service cable condition and support',
        regulation: 'BS 7671 Section 522',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'item-1-2',
        number: '1.2',
        item: 'Service head',
        description: 'Condition and security of service head/cut-out',
        regulation: 'BS 7671 Section 132.8',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'item-1-3',
        number: '1.3',
        item: 'Earthing conductor',
        description: 'Visual inspection of main earthing conductor',
        regulation: 'BS 7671 Section 542.3',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'item-1-4',
        number: '1.4',
        item: 'Main earthing terminal or bar',
        description: 'Condition and accessibility of main earthing terminal',
        regulation: 'BS 7671 Section 542.4',
        outcome: 'acceptable',
        notes: ''
      }
    ]
  },
  {
    id: 'section-2',
    number: '2',
    title: 'Parallel or Switched Alternative Sources',
    description: 'Inspection of arrangements for parallel operation or switching between alternative sources',
    regulation: 'BS 7671:2018 Section 551',
    items: [
      {
        id: 'item-2-1',
        number: '2.1',
        item: 'Adequate arrangements where a generator set operates in parallel',
        description: 'Verification of protective arrangements and synchronisation equipment for parallel operation of generator sets',
        regulation: 'BS 7671 Section 551.4.3',
        outcome: 'acceptable',
        notes: '',
        isCritical: true
      },
      {
        id: 'item-2-2',
        number: '2.2',
        item: 'Adequate arrangements for switching between sources',
        description: 'Inspection of changeover switching arrangements and interlocking systems between alternative sources',
        regulation: 'BS 7671 Section 551.6',
        outcome: 'acceptable',
        notes: '',
        isCritical: true
      }
    ]
  },
  {
    id: 'section-3',
    number: '3',
    title: 'Consumer Unit/Distribution Board',
    description: 'Inspection of main distribution equipment',
    regulation: 'BS 7671:2018 Section 421.1.201',
    items: [
      {
        id: 'item-3-1',
        number: '3.1',
        item: 'Adequate arrangements for disconnection of supply',
        description: 'Main switch or circuit breaker operation and accessibility',
        regulation: 'BS 7671 Section 462.1',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'item-3-2',
        number: '3.2',
        item: 'RCD operation by test button',
        description: 'Manual test of RCD test button operation',
        regulation: 'BS 7671 Section 643.10',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'item-3-3',
        number: '3.3',
        item: 'Correct identification of circuits',
        description: 'Circuit identification and labelling',
        regulation: 'BS 7671 Section 514.8.1',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'item-3-4',
        number: '3.4',
        item: 'Single-pole switching or control in line conductor only',
        description: 'Verification of single-pole devices in line conductor',
        regulation: 'BS 7671 Section 132.14.1',
        outcome: 'acceptable',
        notes: ''
      }
    ]
  },
  {
    id: 'section-4',
    number: '4',
    title: 'Isolators and Switching',
    description: 'Inspection of isolation and switching arrangements',
    regulation: 'BS 7671:2018 Section 462',
    items: [
      {
        id: 'item-4-1',
        number: '4.1',
        item: 'Isolators for motors, transformers and other equipment',
        description: 'Presence and operation of required isolators',
        regulation: 'BS 7671 Section 462.3',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'item-4-2',
        number: '4.2',
        item: 'Effectiveness of enclosures for live parts',
        description: 'IP rating and physical protection of enclosures',
        regulation: 'BS 7671 Section 416.2',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'item-4-3',
        number: '4.3',
        item: 'Presence and adequacy of barriers',
        description: 'Physical barriers and protection against direct contact',
        regulation: 'BS 7671 Section 416.2.1',
        outcome: 'acceptable',
        notes: ''
      }
    ]
  },
  {
    id: 'section-5',
    number: '5',
    title: 'Protective Conductors',
    description: 'Inspection of protective conductor arrangements',
    regulation: 'BS 7671:2018 Section 543',
    items: [
      {
        id: 'item-5-1',
        number: '5.1',
        item: 'Presence of circuit protective conductors',
        description: 'Visual verification of CPC presence in circuits',
        regulation: 'BS 7671 Section 543.1',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'item-5-2',
        number: '5.2',
        item: 'Presence of protective bonding conductors',
        description: 'Main and supplementary bonding conductors',
        regulation: 'BS 7671 Section 544.1',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'item-5-3',
        number: '5.3',
        item: 'Condition of protective conductors',
        description: 'Physical condition and connections',
        regulation: 'BS 7671 Section 526.5',
        outcome: 'acceptable',
        notes: ''
      }
    ]
  },
  {
    id: 'section-6',
    number: '6',
    title: 'Conductors',
    description: 'Inspection of circuit conductors and cables',
    regulation: 'BS 7671:2018 Section 522',
    items: [
      {
        id: 'item-6-1',
        number: '6.1',
        item: 'Routing of cables in safe zones',
        description: 'Cable routing compliance with safe zones',
        regulation: 'BS 7671 Section 522.6.204',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'item-6-2',
        number: '6.2',
        item: 'Cables correctly supported',
        description: 'Adequate support and fixing of cables',
        regulation: 'BS 7671 Section 522.8',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'item-6-3',
        number: '6.3',
        item: 'Condition of cables',
        description: 'Physical condition of cable insulation and sheath',
        regulation: 'BS 7671 Section 522.1',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'item-6-4',
        number: '6.4',
        item: 'Connection of conductors',
        description: 'Quality and security of conductor connections',
        regulation: 'BS 7671 Section 526.1',
        outcome: 'acceptable',
        notes: ''
      }
    ]
  },
  {
    id: 'section-7',
    number: '7',
    title: 'General',
    description: 'General installation requirements and compliance',
    regulation: 'BS 7671:2018 Various Sections',
    items: [
      {
        id: 'item-7-1',
        number: '7.1',
        item: 'Presence and condition of diagrams, instructions, circuit charts',
        description: 'Documentation and labelling requirements',
        regulation: 'BS 7671 Section 514.9',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'item-7-2',
        number: '7.2',
        item: 'Erection methods',
        description: 'Compliance with installation methods',
        regulation: 'BS 7671 Chapter 52',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'item-7-3',
        number: '7.3',
        item: 'Selection of equipment and protective measures',
        description: 'Appropriateness of equipment selection',
        regulation: 'BS 7671 Chapter 41',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'item-7-4',
        number: '7.4',
        item: 'Adequacy of working space and accessibility',
        description: 'Access for operation and maintenance',
        regulation: 'BS 7671 Section 132.12',
        outcome: 'acceptable',
        notes: ''
      }
    ]
  },
  {
    id: 'section-8',
    number: '8',
    title: 'Special Installations or Locations',
    description: 'Requirements for special installations and locations',
    regulation: 'BS 7671:2018 Part 7',
    items: [
      {
        id: 'item-8-1',
        number: '8.1',
        item: 'Bathroom zones and requirements',
        description: 'Compliance with bathroom zone requirements',
        regulation: 'BS 7671 Section 701',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'item-8-2',
        number: '8.2',
        item: 'Swimming pools and water features',
        description: 'Special requirements for wet locations',
        regulation: 'BS 7671 Section 702',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'item-8-3',
        number: '8.3',
        item: 'Agricultural and horticultural premises',
        description: 'Requirements for agricultural installations',
        regulation: 'BS 7671 Section 705',
        outcome: 'acceptable',
        notes: ''
      }
    ]
  },
  {
    id: 'section-9',
    number: '9',
    title: 'Environmental Conditions',
    description: 'Assessment of environmental factors affecting the installation',
    regulation: 'BS 7671:2018 Section 512',
    items: [
      {
        id: 'item-9-1',
        number: '9.1',
        item: 'Temperature considerations',
        description: 'Equipment rating for ambient temperature',
        regulation: 'BS 7671 Section 512.1.2',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'item-9-2',
        number: '9.2',
        item: 'Presence of water',
        description: 'IP rating appropriate for water exposure',
        regulation: 'BS 7671 Section 512.2',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'item-9-3',
        number: '9.3',
        item: 'Corrosive substances',
        description: 'Protection against corrosive environment',
        regulation: 'BS 7671 Section 512.2.3',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'item-9-4',
        number: '9.4',
        item: 'Mechanical stress',
        description: 'Protection against mechanical damage',
        regulation: 'BS 7671 Section 512.2.4',
        outcome: 'acceptable',
        notes: ''
      }
    ]
  },
  {
    id: 'section-10',
    number: '10',
    title: 'Safety Services',
    description: 'Emergency lighting and safety systems inspection',
    regulation: 'BS 7671:2018 Section 560',
    items: [
      {
        id: 'item-10-1',
        number: '10.1',
        item: 'Emergency lighting systems',
        description: 'Presence and condition of emergency lighting',
        regulation: 'BS 7671 Section 560.7',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'item-10-2',
        number: '10.2',
        item: 'Fire alarm systems',
        description: 'Installation compliance for fire alarm systems',
        regulation: 'BS 7671 Section 560.8',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'item-10-3',
        number: '10.3',
        item: 'Security systems',
        description: 'Electrical safety of security installations',
        regulation: 'BS 7671 Section 560.9',
        outcome: 'acceptable',
        notes: ''
      }
    ]
  }
];

// Helper functions for inspection statistics and assessment
export const getInspectionStats = (sections: NumberedInspectionSection[]) => {
  const stats = {
    total: 0,
    acceptable: 0,
    c1: 0,
    c2: 0,
    c3: 0,
    lim: 0,
    na: 0,
    fi: 0
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
  
  if (stats.c1 > 0) {
    return 'unsatisfactory';
  }
  
  if (stats.c2 > 0) {
    return 'requires improvement';
  }
  
  return 'satisfactory';
};

export const getSectionProgress = (section: NumberedInspectionSection): number => {
  const inspectedItems = section.items.filter(item => 
    item.outcome !== 'acceptable' || item.notes !== ''
  ).length;
  
  return section.items.length > 0 ? (inspectedItems / section.items.length) * 100 : 0;
};
