
export type InspectionOutcome = 'acceptable' | 'na' | 'c1' | 'c2' | 'c3' | 'lim' | 'fi';

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
    label: 'Acceptable - Satisfactory',
    description: 'The installation is in a satisfactory condition',
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
    borderColor: 'border-green-500/30'
  },
  na: {
    label: 'N/A - Not Applicable',
    description: 'This inspection point is not applicable to this installation',
    color: 'text-gray-400',
    bgColor: 'bg-gray-500/20',
    borderColor: 'border-gray-500/30'
  },
  c1: {
    label: 'C1 - Danger Present',
    description: 'Danger present - Risk of injury. Immediate remedial action required',
    color: 'text-red-400',
    bgColor: 'bg-red-500/20',
    borderColor: 'border-red-500/30'
  },
  c2: {
    label: 'C2 - Potentially Dangerous',
    description: 'Potentially dangerous - Urgent remedial action required',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/20',
    borderColor: 'border-orange-500/30'
  },
  c3: {
    label: 'C3 - Improvement Recommended',
    description: 'Improvement recommended',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/20',
    borderColor: 'border-yellow-500/30'
  },
  lim: {
    label: 'LIM - Limitation',
    description: 'Limitation - Unable to inspect fully',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/20',
    borderColor: 'border-purple-500/30'
  },
  fi: {
    label: 'FI - Further Investigation',
    description: 'Further investigation required without delay',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
    borderColor: 'border-blue-500/30'
  }
};

export const numberedVisualInspectionSections: NumberedInspectionSection[] = [
  {
    id: 'section-1',
    number: '1.0',
    title: 'External Condition of Intake Equipment (Visual Only)',
    description: 'Visual inspection of service intake equipment and external connections',
    regulation: 'BS 7671:2018 Schedule of Inspections',
    items: [
      {
        id: 'item-1-1',
        number: '1.1',
        item: 'Service cable',
        description: 'Visual inspection of incoming service cable condition',
        regulation: 'BS 7671:2018 - Part 4',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'item-1-2',
        number: '1.2',
        item: 'Service head',
        description: 'Visual inspection of service head/cut-out condition',
        regulation: 'BS 7671:2018 - Part 4',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'item-1-3',
        number: '1.3',
        item: 'Earthing arrangements',
        description: 'Visual inspection of main earthing arrangements',
        regulation: 'BS 7671:2018 - Section 542',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'item-1-4',
        number: '1.4',
        item: 'Meter tails',
        description: 'Visual inspection of meter tail cables',
        regulation: 'BS 7671:2018 - Part 4',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'item-1-5',
        number: '1.5',
        item: 'Metering equipment',
        description: 'Visual inspection of metering equipment condition',
        regulation: 'BS 7671:2018 - Part 4',
        outcome: 'acceptable',
        notes: ''
      }
    ]
  },
  {
    id: 'section-2',
    number: '2.0',
    title: 'Parallel or Switched Alternative Sources',
    description: 'Inspection of alternative supply arrangements where applicable',
    regulation: 'BS 7671:2018 Section 551',
    items: [
      {
        id: 'item-2-1',
        number: '2.1',
        item: 'Parallel connected generators',
        description: 'Inspection of parallel generator connections and controls',
        regulation: 'BS 7671:2018 - Section 551.4',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'item-2-2',
        number: '2.2',
        item: 'Switched alternative supplies',
        description: 'Inspection of changeover switching arrangements',
        regulation: 'BS 7671:2018 - Section 551.5',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'item-2-3',
        number: '2.3',
        item: 'Uninterruptible power supplies (UPS)',
        description: 'Inspection of UPS installations and earthing',
        regulation: 'BS 7671:2018 - Section 551.6',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'item-2-4',
        number: '2.4',
        item: 'Safety source changeover time',
        description: 'Verification of safety source changeover arrangements',
        regulation: 'BS 7671:2018 - Section 560',
        outcome: 'acceptable',
        notes: ''
      }
    ]
  },
  {
    id: 'section-3',
    number: '3.0',
    title: 'Distributor\'s Earthing Arrangements',
    description: 'Inspection of supply earthing system and main earthing terminal',
    regulation: 'BS 7671:2018 Section 542',
    items: [
      {
        id: 'item-3-1',
        number: '3.1',
        item: 'Earthing conductor',
        description: 'Main earthing conductor connection and condition',
        regulation: 'BS 7671:2018 - Section 542.3',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'item-3-2',
        number: '3.2',
        item: 'Main earthing terminal',
        description: 'Main earthing terminal accessibility and labelling',
        regulation: 'BS 7671:2018 - Section 542.4',
        outcome: 'acceptable',
        notes: ''
      }
    ]
  },
  {
    id: 'section-4',
    number: '4.0',
    title: 'Consumer Unit/Distribution Board',
    description: 'Inspection of main distribution equipment',
    regulation: 'BS 7671:2018 Section 421',
    items: [
      {
        id: 'item-4-1',
        number: '4.1',
        item: 'Adequacy of working space',
        description: 'Adequate access and working space around equipment',
        regulation: 'BS 7671:2018 - Section 132.12',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'item-4-2',
        number: '4.2',
        item: 'Security of fixing',
        description: 'Secure mounting and mechanical condition',
        regulation: 'BS 7671:2018 - Section 134.1.1',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'item-4-3',
        number: '4.3',
        item: 'Condition of enclosure',
        description: 'Physical condition and IP rating compliance',
        regulation: 'BS 7671:2018 - Section 416',
        outcome: 'acceptable',
        notes: ''
      }
    ]
  },
  {
    id: 'section-5',
    number: '5.0',
    title: 'Earthing Conductor',
    description: 'Inspection of main earthing conductor',
    regulation: 'BS 7671:2018 Section 542',
    items: [
      {
        id: 'item-5-1',
        number: '5.1',
        item: 'Connection and condition',
        description: 'Earthing conductor connections and physical condition',
        regulation: 'BS 7671:2018 - Section 542.3',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'item-5-2',
        number: '5.2',
        item: 'Labelling',
        description: 'Proper identification and labelling',
        regulation: 'BS 7671:2018 - Section 514.13',
        outcome: 'acceptable',
        notes: ''
      }
    ]
  },
  {
    id: 'section-6',
    number: '6.0',
    title: 'Equipotential Bonding Conductors',
    description: 'Inspection of main and supplementary bonding',
    regulation: 'BS 7671:2018 Section 544',
    items: [
      {
        id: 'item-6-1',
        number: '6.1',
        item: 'Main protective bonding',
        description: 'Main bonding to incoming services',
        regulation: 'BS 7671:2018 - Section 544.1',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'item-6-2',
        number: '6.2',
        item: 'Supplementary bonding',
        description: 'Supplementary bonding in special locations',
        regulation: 'BS 7671:2018 - Section 544.2',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'item-6-3',
        number: '6.3',
        item: 'Bonding labels',
        description: 'Safety electrical connection labels present',
        regulation: 'BS 7671:2018 - Section 514.13',
        outcome: 'acceptable',
        notes: ''
      }
    ]
  },
  {
    id: 'section-7',
    number: '7.0',
    title: 'RCD Operation',
    description: 'Functional testing of RCD devices',
    regulation: 'BS 7671:2018 Section 411',
    items: [
      {
        id: 'item-7-1',
        number: '7.1',
        item: 'RCD test button operation',
        description: 'Test button functionality check',
        regulation: 'BS 7671:2018 - Section 643.10',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'item-7-2',
        number: '7.2',
        item: 'RCD labelling',
        description: 'Proper RCD identification and test notices',
        regulation: 'BS 7671:2018 - Section 514.12',
        outcome: 'acceptable',
        notes: ''
      }
    ]
  },
  {
    id: 'section-8',
    number: '8.0',
    title: 'Cables and Conductors',
    description: 'Inspection of cable installations',
    regulation: 'BS 7671:2018 Section 521',
    items: [
      {
        id: 'item-8-1',
        number: '8.1',
        item: 'Routing and support',
        description: 'Cable routes, support and protection',
        regulation: 'BS 7671:2018 - Section 522',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'item-8-2',
        number: '8.2',
        item: 'Connections and terminations',
        description: 'Cable connections and termination quality',
        regulation: 'BS 7671:2018 - Section 526',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'item-8-3',
        number: '8.3',
        item: 'Cable identification',
        description: 'Proper cable core identification',
        regulation: 'BS 7671:2018 - Section 514.3',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'item-8-4',
        number: '8.4',
        item: 'Segregation requirements',
        description: 'Segregation of different voltage systems',
        regulation: 'BS 7671:2018 - Section 528.1',
        outcome: 'acceptable',
        notes: ''
      }
    ]
  },
  {
    id: 'section-9',
    number: '9.0',
    title: 'General Condition',
    description: 'Overall installation condition assessment',
    regulation: 'BS 7671:2018 General',
    items: [
      {
        id: 'item-9-1',
        number: '9.1',
        item: 'Workmanship and compliance',
        description: 'Overall standard of electrical workmanship',
        regulation: 'BS 7671:2018 - Section 134',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'item-9-2',
        number: '9.2',
        item: 'Alterations and additions',
        description: 'Assessment of any alterations or additions',
        regulation: 'BS 7671:2018 - Section 132.16',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'item-9-3',
        number: '9.3',
        item: 'Protective devices coordination',
        description: 'Protective device selection and coordination',
        regulation: 'BS 7671:2018 - Section 536',
        outcome: 'acceptable',
        notes: ''
      }
    ]
  },
  {
    id: 'section-10',
    number: '10.0',
    title: 'Schedule of Items Inspected',
    description: 'Documentation of inspected items and limitations',
    regulation: 'BS 7671:2018 Schedule of Inspections',
    items: [
      {
        id: 'item-10-1',
        number: '10.1',
        item: 'Schedule completion',
        description: 'Completion of inspection schedule',
        regulation: 'BS 7671:2018 - Appendix 6',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'item-10-2',
        number: '10.2',
        item: 'Limitations recorded',
        description: 'Record of any inspection limitations',
        regulation: 'BS 7671:2018 - Part 6',
        outcome: 'acceptable',
        notes: ''
      },
      {
        id: 'item-10-3',
        number: '10.3',
        item: 'Departures from standard',
        description: 'Documentation of any departures from BS 7671',
        regulation: 'BS 7671:2018 - Section 120',
        outcome: 'acceptable',
        notes: ''
      }
    ]
  }
];

// Utility functions for inspection data processing
export const getInspectionStats = (sections: NumberedInspectionSection[]) => {
  const stats = {
    total: 0,
    acceptable: 0,
    na: 0,
    c1: 0,
    c2: 0,
    c3: 0,
    lim: 0,
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
  
  if (stats.c1 > 0) return 'unsatisfactory';
  if (stats.c2 > 0) return 'unsatisfactory';
  if (stats.c3 > 0) return 'satisfactory with recommendations';
  
  return 'satisfactory';
};

export const getSectionDefects = (section: NumberedInspectionSection) => {
  return section.items.filter(item => ['c1', 'c2', 'c3'].includes(item.outcome));
};

export const getTotalDefects = (sections: NumberedInspectionSection[]) => {
  return sections.reduce((total, section) => {
    return total + getSectionDefects(section).length;
  }, 0);
};
