
export type InspectionOutcome = 'acceptable' | 'c1' | 'c2' | 'c3' | 'lim' | 'na' | 'fir';

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

export const outcomeDefinitions: Record<InspectionOutcome, {
  label: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
}> = {
  acceptable: {
    label: 'Acceptable - No issues identified',
    description: 'Installation meets requirements',
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
    borderColor: 'border-green-500/30'
  },
  c1: {
    label: 'C1 - Improvement recommended',
    description: 'Improvement recommended to enhance safety',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
    borderColor: 'border-blue-500/30'
  },
  c2: {
    label: 'C2 - Investigation required',
    description: 'Urgent investigation without delay',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/20',
    borderColor: 'border-orange-500/30'
  },
  c3: {
    label: 'C3 - Immediate action required',
    description: 'Danger present - immediate action required',
    color: 'text-red-400',
    bgColor: 'bg-red-500/20',
    borderColor: 'border-red-500/30'
  },
  lim: {
    label: 'LIM - Limitation',
    description: 'Limitation on extent of inspection',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/20',
    borderColor: 'border-purple-500/30'
  },
  na: {
    label: 'N/A - Not applicable',
    description: 'Not applicable to this installation',
    color: 'text-gray-400',
    bgColor: 'bg-gray-500/20',
    borderColor: 'border-gray-500/30'
  },
  fir: {
    label: 'FIR - Further investigation required',
    description: 'Further investigation required',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/20',
    borderColor: 'border-yellow-500/30'
  }
};

export const numberedVisualInspectionSections: NumberedInspectionSection[] = [
  {
    id: 'section-1',
    number: '1',
    title: 'Electrical Connections',
    description: 'Inspection of electrical connections and terminations',
    regulation: 'BS 7671 Section 134, Regulation 526',
    items: [
      {
        id: '1-1',
        number: '1.1',
        item: 'Connections of conductors',
        description: 'All connections properly made and secure',
        regulation: 'Regulation 526.1',
        outcome: 'acceptable',
        notes: '',
        isCritical: true
      },
      {
        id: '1-2',
        number: '1.2',
        item: 'Adequacy of connections',
        description: 'Connections suitable for conductor type and current',
        regulation: 'Regulation 526.2',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: '1-3',
        number: '1.3',
        item: 'Security of connections',
        description: 'All connections mechanically and electrically secure',
        regulation: 'Regulation 526.9',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: '1-4',
        number: '1.4',
        item: 'Accessibility of connections',
        description: 'Connections accessible for inspection and maintenance',
        regulation: 'Regulation 526.3',
        outcome: 'acceptable',
        notes: ''
      }
    ]
  },
  {
    id: 'section-2',
    number: '2',
    title: 'Conductors',
    description: 'Inspection of conductors and their installation',
    regulation: 'BS 7671 Chapter 52',
    items: [
      {
        id: '2-1',
        number: '2.1',
        item: 'Identification of conductors',
        description: 'Proper identification of live, neutral and protective conductors',
        regulation: 'Regulation 514',
        outcome: 'acceptable',
        notes: '',
        isCritical: true
      },
      {
        id: '2-2',
        number: '2.2',
        item: 'Routing of cables',
        description: 'Cables routed to avoid damage and interference',
        regulation: 'Regulation 522',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: '2-3',
        number: '2.3',
        item: 'Selection and erection of wiring systems',
        description: 'Appropriate wiring system for environment',
        regulation: 'Chapter 52',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: '2-4',
        number: '2.4',
        item: 'Current-carrying capacity',
        description: 'Conductors sized appropriately for load',
        regulation: 'Section 523',
        outcome: 'acceptable',
        notes: ''
      }
    ]
  },
  {
    id: 'section-3',
    number: '3',
    title: 'General Condition',
    description: 'Overall condition of electrical installation',
    regulation: 'BS 7671 General Requirements',
    items: [
      {
        id: '3-1',
        number: '3.1',
        item: 'Presence of conditions for external influences',
        description: 'Installation suitable for environmental conditions',
        regulation: 'Section 512',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: '3-2',
        number: '3.2',
        item: 'Thermal effects',
        description: 'Protection against thermal effects',
        regulation: 'Section 421',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: '3-3',
        number: '3.3',
        item: 'Arcing or overheating',
        description: 'Evidence of arcing, overheating or burning',
        regulation: 'Section 421',
        outcome: 'acceptable',
        notes: '',
        isCritical: true
      },
      {
        id: '3-4',
        number: '3.4',
        item: 'Mechanical damage',
        description: 'Evidence of mechanical damage to equipment',
        regulation: 'Section 522',
        outcome: 'acceptable',
        notes: ''
      }
    ]
  },
  {
    id: 'section-4',
    number: '4',
    title: 'Protective Devices',
    description: 'Inspection of protective devices and their operation',
    regulation: 'BS 7671 Chapter 43',
    items: [
      {
        id: '4-1',
        number: '4.1',
        item: 'Selection and coordination of protective devices',
        description: 'Appropriate protective devices selected and coordinated',
        regulation: 'Chapter 43',
        outcome: 'acceptable',
        notes: '',
        isCritical: true
      },
      {
        id: '4-2',
        number: '4.2',
        item: 'Fault protection',
        description: 'Adequate fault protection provided',
        regulation: 'Section 411',
        outcome: 'acceptable',
        notes: '',
        isCritical: true
      },
      {
        id: '4-3',
        number: '4.3',
        item: 'RCD operation',
        description: 'RCDs installed and operating correctly',
        regulation: 'Section 411.3.3',
        outcome: 'acceptable',
        notes: '',
        isCritical: true
      },
      {
        id: '4-4',
        number: '4.4',
        item: 'Overcurrent protection',
        description: 'Adequate overcurrent protection',
        regulation: 'Section 433',
        outcome: 'acceptable',
        notes: ''
      }
    ]
  },
  {
    id: 'section-5',
    number: '5',
    title: 'Earthing Arrangements',
    description: 'Inspection of earthing and bonding arrangements',
    regulation: 'BS 7671 Chapter 54',
    items: [
      {
        id: '5-1',
        number: '5.1',
        item: 'Earthing arrangements',
        description: 'Adequate earthing arrangements in place',
        regulation: 'Chapter 54',
        outcome: 'acceptable',
        notes: '',
        isCritical: true
      },
      {
        id: '5-2',
        number: '5.2',
        item: 'Continuity of protective conductors',
        description: 'Protective conductors continuous and secure',
        regulation: 'Section 543',
        outcome: 'acceptable',
        notes: '',
        isCritical: true
      },
      {
        id: '5-3',
        number: '5.3',
        item: 'Main protective bonding',
        description: 'Main protective bonding connections present',
        regulation: 'Section 411.3.1.2',
        outcome: 'acceptable',
        notes: '',
        isCritical: true
      },
      {
        id: '5-4',
        number: '5.4',
        item: 'Supplementary bonding',
        description: 'Supplementary bonding where required',
        regulation: 'Section 415.2',
        outcome: 'acceptable',
        notes: ''
      }
    ]
  },
  {
    id: 'section-6',
    number: '6',
    title: 'Consumer Unit/Distribution Board',
    description: 'Inspection of consumer units and distribution boards',
    regulation: 'BS 7671 Section 530',
    items: [
      {
        id: '6-1',
        number: '6.1',
        item: 'Adequacy of access and working space',
        description: 'Adequate access and working space around equipment',
        regulation: 'Section 513',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: '6-2',
        number: '6.2',
        item: 'Secure fixing of equipment',
        description: 'Equipment securely fixed and properly supported',
        regulation: 'Section 134',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: '6-3',
        number: '6.3',
        item: 'Condition of enclosures',
        description: 'Enclosures in good condition with appropriate IP rating',
        regulation: 'Section 416',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: '6-4',
        number: '6.4',
        item: 'Labelling and identification',
        description: 'Proper labelling and identification of circuits',
        regulation: 'Section 514',
        outcome: 'acceptable',
        notes: ''
      }
    ]
  },
  {
    id: 'section-7',
    number: '7',
    title: 'RCD Protection',
    description: 'RCD protection arrangements',
    regulation: 'BS 7671 Section 411.3.3',
    items: [
      {
        id: '7-1',
        number: '7.1',
        item: 'RCD protection for socket outlets',
        description: 'RCD protection for socket outlets not exceeding 20A',
        regulation: 'Section 411.3.3',
        outcome: 'acceptable',
        notes: '',
        isCritical: true
      },
      {
        id: '7-2',
        number: '7.2',
        item: 'RCD protection for special locations',
        description: 'Additional RCD protection for special locations',
        regulation: 'Part 7',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: '7-3',
        number: '7.3',
        item: 'RCD discrimination',
        description: 'Proper discrimination between RCDs',
        regulation: 'Section 536',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: '7-4',
        number: '7.4',
        item: 'Test button operation',
        description: 'RCD test buttons accessible and operational',
        regulation: 'Section 643.8',
        outcome: 'acceptable',
        notes: ''
      }
    ]
  },
  {
    id: 'section-8',
    number: '8',
    title: 'Basic Protection',
    description: 'Basic protection against electric shock',
    regulation: 'BS 7671 Section 410',
    items: [
      {
        id: '8-1',
        number: '8.1',
        item: 'Insulation of live parts',
        description: 'Adequate insulation of live parts',
        regulation: 'Section 416.1',
        outcome: 'acceptable',
        notes: '',
        isCritical: true
      },
      {
        id: '8-2',
        number: '8.2',
        item: 'Barriers or enclosures',
        description: 'Appropriate barriers or enclosures provided',
        regulation: 'Section 416.2',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: '8-3',
        number: '8.3',
        item: 'Obstacles and placing out of reach',
        description: 'Obstacles and placing out of reach where applicable',
        regulation: 'Section 417',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: '8-4',
        number: '8.4',
        item: 'SELV or PELV systems',
        description: 'SELV or PELV systems properly implemented',
        regulation: 'Section 414',
        outcome: 'acceptable',
        notes: ''
      }
    ]
  },
  {
    id: 'section-9',
    number: '9',
    title: 'Special Installations',
    description: 'Special installations and locations',
    regulation: 'BS 7671 Part 7',
    items: [
      {
        id: '9-1',
        number: '9.1',
        item: 'Bathroom installations',
        description: 'Compliance with bathroom installation requirements',
        regulation: 'Section 701',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: '9-2',
        number: '9.2',
        item: 'Swimming pools',
        description: 'Swimming pool installations compliance',
        regulation: 'Section 702',
        outcome: 'na',
        notes: ''
      },
      {
        id: '9-3',
        number: '9.3',
        item: 'Agricultural installations',
        description: 'Agricultural and horticultural premises',
        regulation: 'Section 705',
        outcome: 'na',
        notes: ''
      },
      {
        id: '9-4',
        number: '9.4',
        item: 'Other special locations',
        description: 'Other special locations as applicable',
        regulation: 'Part 7',
        outcome: 'na',
        notes: ''
      }
    ]
  },
  {
    id: 'section-10',
    number: '10',
    title: 'Documentation',
    description: 'Installation documentation and certification',
    regulation: 'BS 7671 Part 6',
    items: [
      {
        id: '10-1',
        number: '10.1',
        item: 'Electrical installation certificate',
        description: 'Presence of electrical installation certificate',
        regulation: 'Part 6',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: '10-2',
        number: '10.2',
        item: 'Previous inspection reports',
        description: 'Previous EICR reports available',
        regulation: 'Part 6',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: '10-3',
        number: '10.3',
        item: 'Circuit charts and schedules',
        description: 'Circuit charts and schedules present and accurate',
        regulation: 'Part 6',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: '10-4',
        number: '10.4',
        item: 'Warning notices',
        description: 'Appropriate warning notices displayed',
        regulation: 'Section 514.13',
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
    lim: 0,
    na: 0,
    fir: 0,
    total: 0
  };

  sections.forEach(section => {
    section.items.forEach(item => {
      const outcome = item.outcome || 'acceptable';
      if (outcome in stats) {
        stats[outcome as keyof typeof stats]++;
      }
      stats.total++;
    });
  });

  return stats;
};

export const getOverallAssessment = (sections: NumberedInspectionSection[]) => {
  const stats = getInspectionStats(sections);
  
  if (stats.c3 > 0) {
    return 'unsatisfactory';
  } else if (stats.c2 > 0) {
    return 'requires_urgent_attention';
  } else if (stats.c1 > 0) {
    return 'satisfactory_with_improvements';
  } else {
    return 'satisfactory';
  }
};
