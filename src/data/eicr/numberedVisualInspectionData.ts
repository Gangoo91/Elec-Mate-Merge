
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

export type InspectionOutcome = 'acceptable' | 'c1' | 'c2' | 'c3' | 'fi' | 'na';

export const outcomeDefinitions: Record<InspectionOutcome, {
  label: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
}> = {
  acceptable: {
    label: 'Acceptable - Satisfactory',
    description: 'Installation or item satisfactory',
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
    borderColor: 'border-green-500/30'
  },
  c1: {
    label: 'C1 - Danger Present',
    description: 'Danger present. Risk of injury. Immediate remedial action required.',
    color: 'text-red-400',
    bgColor: 'bg-red-500/20',
    borderColor: 'border-red-500/30'
  },
  c2: {
    label: 'C2 - Potentially Dangerous',
    description: 'Potentially dangerous. Urgent remedial action required.',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/20',
    borderColor: 'border-orange-500/30'
  },
  c3: {
    label: 'C3 - Improvement Recommended',
    description: 'Improvement recommended.',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/20',
    borderColor: 'border-yellow-500/30'
  },
  fi: {
    label: 'FI - Further Investigation',
    description: 'Further investigation required without delay.',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
    borderColor: 'border-blue-500/30'
  },
  na: {
    label: 'N/A - Not Applicable',
    description: 'Not applicable.',
    color: 'text-gray-400',
    bgColor: 'bg-gray-500/20',
    borderColor: 'border-gray-500/30'
  }
};

export const numberedVisualInspectionSections: NumberedInspectionSection[] = [
  {
    id: 'section-1',
    number: '1',
    title: 'External Condition of Intake Equipment (Visual Only)',
    description: 'Visual inspection of service intake equipment and external installations',
    regulation: 'BS 7671:2018 Section 611.2',
    items: [
      {
        id: 'item-1-1',
        number: '1.1',
        item: 'Service cable',
        description: 'Visual inspection of incoming service cable condition and support',
        regulation: 'BS 7671:2018 Regulation 132.12',
        outcome: 'acceptable',
        notes: '',
        isCritical: true
      },
      {
        id: 'item-1-2',
        number: '1.2',
        item: 'Service head',
        description: 'Condition of service head and sealing arrangements',
        regulation: 'BS 7671:2018 Section 444',
        outcome: 'acceptable',
        notes: '',
        isCritical: true
      },
      {
        id: 'item-1-3',
        number: '1.3',
        item: 'Earthing arrangements',
        description: 'Main earthing terminal and earthing conductor connections',
        regulation: 'BS 7671:2018 Chapter 54',
        outcome: 'acceptable',
        notes: '',
        isCritical: true
      },
      {
        id: 'item-1-4',
        number: '1.4',
        item: 'Meter tails',
        description: 'Condition and installation of meter tails',
        regulation: 'BS 7671:2018 Section 444.5',
        outcome: 'acceptable',
        notes: '',
        isCritical: true
      },
      {
        id: 'item-1-5',
        number: '1.5',
        item: 'Metering equipment',
        description: 'Condition of metering equipment and associated enclosures',
        regulation: 'BS 7671:2018 Section 132.12',
        outcome: 'acceptable',
        notes: '',
        isCritical: false
      }
    ]
  },
  {
    id: 'section-2',
    number: '2',
    title: 'Parallel or Alternative Sources of Supply',
    description: 'Inspection of alternative supply sources and changeover arrangements',
    regulation: 'BS 7671:2018 Section 551',
    items: [
      {
        id: 'item-2-1',
        number: '2.1',
        item: 'Parallel sources',
        description: 'Alternative supply sources and parallel connections',
        regulation: 'BS 7671:2018 Section 551.4',
        outcome: 'acceptable',
        notes: ''
      }
    ]
  },
  {
    id: 'section-3',
    number: '3',
    title: 'Earthing and Bonding Arrangements',
    description: 'Main earthing and supplementary bonding connections',
    regulation: 'BS 7671:2018 Chapter 54',
    items: [
      {
        id: 'item-3-1',
        number: '3.1',
        item: 'Earthing conductor',
        description: 'Main earthing conductor size, condition and connections',
        regulation: 'BS 7671:2018 Section 543.1',
        outcome: 'acceptable',
        notes: '',
        isCritical: true
      },
      {
        id: 'item-3-2',
        number: '3.2',
        item: 'Main equipotential bonding',
        description: 'Main protective bonding conductors to services',
        regulation: 'BS 7671:2018 Section 544.1',
        outcome: 'acceptable',
        notes: '',
        isCritical: true
      },
      {
        id: 'item-3-3',
        number: '3.3',
        item: 'Supplementary bonding',
        description: 'Supplementary equipotential bonding where required',
        regulation: 'BS 7671:2018 Section 544.2',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'item-3-4',
        number: '3.4',
        item: 'Earthing labels',
        description: 'Presence and condition of earthing and bonding labels',
        regulation: 'BS 7671:2018 Section 514.13',
        outcome: 'acceptable',
        notes: ''
      }
    ]
  },
  {
    id: 'section-4',
    number: '4',
    title: 'Consumer Unit/Distribution Board',
    description: 'Main consumer unit or distribution board inspection',
    regulation: 'BS 7671:2018 Section 421',
    items: [
      {
        id: 'item-4-1',
        number: '4.1',
        item: 'Enclosure condition',
        description: 'Physical condition of consumer unit enclosure',
        regulation: 'BS 7671:2018 Section 421.1.6',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'item-4-2',
        number: '4.2',
        item: 'IP rating suitability',
        description: 'Appropriate IP rating for location and environment',
        regulation: 'BS 7671:2018 Section 416.2',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'item-4-3',
        number: '4.3',
        item: 'Fire barriers',
        description: 'Presence of fire barriers where required',
        regulation: 'BS 7671:2018 Section 421.1.6',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'item-4-4',
        number: '4.4',
        item: 'Circuit labelling',
        description: 'Clear identification and labelling of circuits',
        regulation: 'BS 7671:2018 Section 514.8',
        outcome: 'acceptable',
        notes: ''
      }
    ]
  },
  {
    id: 'section-5',
    number: '5',
    title: 'Protective Devices and Switches',
    description: 'Circuit protection devices and isolation switches',
    regulation: 'BS 7671:2018 Chapter 43',
    items: [
      {
        id: 'item-5-1',
        number: '5.1',
        item: 'MCB/RCBO condition',
        description: 'Physical condition of miniature circuit breakers',
        regulation: 'BS 7671:2018 Section 432.1',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'item-5-2',
        number: '5.2',
        item: 'RCD operation',
        description: 'RCD test button operation check',
        regulation: 'BS 7671:2018 Section 411.3.3',
        outcome: 'acceptable',
        notes: '',
        isCritical: true
      },
      {
        id: 'item-5-3',
        number: '5.3',
        item: 'Main switch operation',
        description: 'Main isolator switch operation and condition',
        regulation: 'BS 7671:2018 Section 462.1',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'item-5-4',
        number: '5.4',
        item: 'Device ratings',
        description: 'Protective device ratings appropriate for circuits',
        regulation: 'BS 7671:2018 Section 433.1',
        outcome: 'acceptable',
        notes: ''
      }
    ]
  },
  {
    id: 'section-6',
    number: '6',
    title: 'Conductors',
    description: 'Cable types, sizing and installation methods',
    regulation: 'BS 7671:2018 Chapter 52',
    items: [
      {
        id: 'item-6-1',
        number: '6.1',
        item: 'Cable types',
        description: 'Appropriate cable types for installation environment',
        regulation: 'BS 7671:2018 Section 521.5',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'item-6-2',
        number: '6.2',
        item: 'Cable sizing',
        description: 'Cable sizes appropriate for circuit loading',
        regulation: 'BS 7671:2018 Section 523.1',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'item-6-3',
        number: '6.3',
        item: 'Cable support',
        description: 'Adequate cable support and fixing',
        regulation: 'BS 7671:2018 Section 522.8',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'item-6-4',
        number: '6.4',
        item: 'Cable protection',
        description: 'Mechanical protection where required',
        regulation: 'BS 7671:2018 Section 522.6',
        outcome: 'acceptable',
        notes: ''
      }
    ]
  },
  {
    id: 'section-7',
    number: '7',
    title: 'General Condition of Accessories',
    description: 'Socket outlets, switches and other accessories',
    regulation: 'BS 7671:2018 Section 553',
    items: [
      {
        id: 'item-7-1',
        number: '7.1',
        item: 'Socket outlets',
        description: 'Condition and security of socket outlets',
        regulation: 'BS 7671:2018 Section 553.1',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'item-7-2',
        number: '7.2',
        item: 'Light switches',
        description: 'Operation and condition of lighting switches',
        regulation: 'BS 7671:2018 Section 553.1',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'item-7-3',
        number: '7.3',
        item: 'Connection points',
        description: 'Junction boxes and connection points',
        regulation: 'BS 7671:2018 Section 526.3',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'item-7-4',
        number: '7.4',
        item: 'Enclosure integrity',
        description: 'Accessory enclosures and mounting',
        regulation: 'BS 7671:2018 Section 416.2',
        outcome: 'acceptable',
        notes: ''
      }
    ]
  },
  {
    id: 'section-8',
    number: '8',
    title: 'Fixed Equipment',
    description: 'Permanently connected electrical equipment',
    regulation: 'BS 7671:2018 Chapter 55',
    items: [
      {
        id: 'item-8-1',
        number: '8.1',
        item: 'Fixed appliances',
        description: 'Condition of fixed electrical appliances',
        regulation: 'BS 7671:2018 Section 554.1',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'item-8-2',
        number: '8.2',
        item: 'Heating systems',
        description: 'Fixed heating and cooling systems',
        regulation: 'BS 7671:2018 Section 554.4',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'item-8-3',
        number: '8.3',
        item: 'Control systems',
        description: 'Control gear and automatic systems',
        regulation: 'BS 7671:2018 Section 537.1',
        outcome: 'acceptable',
        notes: ''
      }
    ]
  },
  {
    id: 'section-9',
    number: '9',
    title: 'Safety Measures',
    description: 'Protection against electric shock and fire',
    regulation: 'BS 7671:2018 Part 4',
    items: [
      {
        id: 'item-9-1',
        number: '9.1',
        item: 'Basic protection',
        description: 'Protection against direct contact',
        regulation: 'BS 7671:2018 Section 416.1',
        outcome: 'acceptable',
        notes: '',
        isCritical: true
      },
      {
        id: 'item-9-2',
        number: '9.2',
        item: 'Fault protection',
        description: 'Protection against indirect contact',
        regulation: 'BS 7671:2018 Section 411.3',
        outcome: 'acceptable',
        notes: '',
        isCritical: true
      },
      {
        id: 'item-9-3',
        number: '9.3',
        item: 'Additional protection',
        description: 'RCD protection where required',
        regulation: 'BS 7671:2018 Section 411.3.3',
        outcome: 'acceptable',
        notes: '',
        isCritical: true
      }
    ]
  },
  {
    id: 'section-10',
    number: '10',
    title: 'Special Locations',
    description: 'Bathrooms, outdoor installations and special locations',
    regulation: 'BS 7671:2018 Part 7',
    items: [
      {
        id: 'item-10-1',
        number: '10.1',
        item: 'Bathroom zones',
        description: 'Equipment suitability for bathroom zones',
        regulation: 'BS 7671:2018 Section 701.512',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'item-10-2',
        number: '10.2',
        item: 'Outdoor installations',
        description: 'Weather protection and IP ratings',
        regulation: 'BS 7671:2018 Section 522.3',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'item-10-3',
        number: '10.3',
        item: 'Swimming pools',
        description: 'Special requirements for pool areas',
        regulation: 'BS 7671:2018 Section 702',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'item-10-4',
        number: '10.4',
        item: 'Agricultural locations',
        description: 'Requirements for agricultural and horticultural premises',
        regulation: 'BS 7671:2018 Section 705',
        outcome: 'acceptable',
        notes: ''
      }
    ]
  }
];

export const getInspectionStats = (sections: NumberedInspectionSection[]) => {
  const stats = {
    acceptable: 0,
    c1: 0,
    c2: 0,
    c3: 0,
    fi: 0,
    na: 0,
    total: 0
  };

  sections.forEach(section => {
    section.items.forEach(item => {
      stats[item.outcome]++;
      stats.total++;
    });
  });

  return stats;
};

export const getOverallAssessment = (sections: NumberedInspectionSection[]) => {
  const stats = getInspectionStats(sections);
  
  if (stats.c1 > 0) {
    return {
      level: 'unsatisfactory',
      message: 'Unsatisfactory - Danger present requiring immediate attention',
      recommendation: 'Immediate remedial action required before continued use'
    };
  }
  
  if (stats.c2 > 0) {
    return {
      level: 'unsatisfactory', 
      message: 'Unsatisfactory - Urgent remedial action required',
      recommendation: 'Urgent remedial action required'
    };
  }
  
  if (stats.c3 > 0) {
    return {
      level: 'satisfactory',
      message: 'Satisfactory - Improvement recommended',
      recommendation: 'Improvement recommended for enhanced safety'
    };
  }
  
  if (stats.fi > 0) {
    return {
      level: 'requires-investigation',
      message: 'Further investigation required',
      recommendation: 'Further investigation required without delay'
    };
  }
  
  return {
    level: 'satisfactory',
    message: 'Satisfactory - No immediate action required',
    recommendation: 'Installation meets current safety standards'
  };
};
