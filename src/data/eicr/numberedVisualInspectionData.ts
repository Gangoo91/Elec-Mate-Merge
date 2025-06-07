
export type InspectionOutcome = 'acceptable' | 'c1' | 'c2' | 'c3' | 'not-verified' | 'limitation' | 'not-applicable';

export interface NumberedInspectionItem {
  id: string;
  number: string;
  item: string;
  regulation: string;
  outcome: InspectionOutcome;
  notes?: string;
}

export interface NumberedInspectionSection {
  id: string;
  number: string;
  title: string;
  description: string;
  regulation: string;
  items: NumberedInspectionItem[];
  isComplete: boolean;
}

export const outcomeDefinitions = {
  acceptable: {
    label: 'Acceptable',
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
    borderColor: 'border-green-500/30'
  },
  c1: {
    label: 'C1 - Danger Present',
    color: 'text-red-400',
    bgColor: 'bg-red-500/20',
    borderColor: 'border-red-500/30'
  },
  c2: {
    label: 'C2 - Potentially Dangerous',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/20',
    borderColor: 'border-orange-500/30'
  },
  c3: {
    label: 'C3 - Improvement Recommended',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/20',
    borderColor: 'border-yellow-500/30'
  },
  'not-verified': {
    label: 'N/V - Not Verified',
    color: 'text-gray-400',
    bgColor: 'bg-gray-500/20',
    borderColor: 'border-gray-500/30'
  },
  limitation: {
    label: 'LIM - Limitation',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/20',
    borderColor: 'border-purple-500/30'
  },
  'not-applicable': {
    label: 'N/A - Not Applicable',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
    borderColor: 'border-blue-500/30'
  }
};

export const numberedVisualInspectionSections: NumberedInspectionSection[] = [
  {
    id: 'external-intake',
    number: '1',
    title: 'EXTERNAL INTAKE EQUIPMENT',
    description: 'Service head, earthing and meter arrangements',
    regulation: 'BS 7671 Section 444, 542, 543',
    isComplete: false,
    items: [
      {
        id: '1.1',
        number: '1.1',
        item: 'Service cable',
        regulation: 'BS 7671 Section 444',
        outcome: 'acceptable'
      },
      {
        id: '1.2',
        number: '1.2', 
        item: 'Service head',
        regulation: 'BS 7671 Section 444',
        outcome: 'acceptable'
      },
      {
        id: '1.3',
        number: '1.3',
        item: 'Earthing conductor',
        regulation: 'BS 7671 Section 542',
        outcome: 'acceptable'
      },
      {
        id: '1.4',
        number: '1.4',
        item: 'Main earthing terminal',
        regulation: 'BS 7671 Section 542.4',
        outcome: 'acceptable'
      }
    ]
  },
  {
    id: 'parallel-conductors',
    number: '2',
    title: 'PARALLEL CONDUCTORS',
    description: 'Assessment of parallel conductor arrangements',
    regulation: 'BS 7671 Section 523',
    isComplete: false,
    items: [
      {
        id: '2.1',
        number: '2.1',
        item: 'Parallel conductors of live conductors',
        regulation: 'BS 7671 Section 523.7',
        outcome: 'acceptable'
      },
      {
        id: '2.2',
        number: '2.2',
        item: 'Parallel conductors of protective conductors',
        regulation: 'BS 7671 Section 523.7',
        outcome: 'acceptable'
      }
    ]
  },
  {
    id: 'conductor-identification',
    number: '3',
    title: 'CONDUCTOR IDENTIFICATION',
    description: 'Verification of conductor colour coding and identification',
    regulation: 'BS 7671 Section 514',
    isComplete: false,
    items: [
      {
        id: '3.1',
        number: '3.1',
        item: 'Live conductors',
        regulation: 'BS 7671 Section 514.3',
        outcome: 'acceptable'
      },
      {
        id: '3.2',
        number: '3.2',
        item: 'Protective conductors',
        regulation: 'BS 7671 Section 514.4',
        outcome: 'acceptable'
      },
      {
        id: '3.3',
        number: '3.3',
        item: 'PEN conductors',
        regulation: 'BS 7671 Section 514.4.2',
        outcome: 'acceptable'
      }
    ]
  },
  {
    id: 'connections',
    number: '4',
    title: 'CONNECTIONS',
    description: 'Assessment of electrical connections and terminations',
    regulation: 'BS 7671 Section 526',
    isComplete: false,
    items: [
      {
        id: '4.1',
        number: '4.1',
        item: 'Connections of live conductors',
        regulation: 'BS 7671 Section 526.1',
        outcome: 'acceptable'
      },
      {
        id: '4.2',
        number: '4.2',
        item: 'Connections of protective conductors',
        regulation: 'BS 7671 Section 526.1',
        outcome: 'acceptable'
      }
    ]
  },
  {
    id: 'distribution-equipment',
    number: '5',
    title: 'DISTRIBUTION EQUIPMENT',
    description: 'Consumer units, distribution boards and switching equipment',
    regulation: 'BS 7671 Section 530, 531, 537',
    isComplete: false,
    items: [
      {
        id: '5.1',
        number: '5.1',
        item: 'Presence and condition of appropriate devices for isolation and switching',
        regulation: 'BS 7671 Section 537',
        outcome: 'acceptable'
      },
      {
        id: '5.2',
        number: '5.2',
        item: 'Presence of undervoltage protective devices',
        regulation: 'BS 7671 Section 445',
        outcome: 'acceptable'
      },
      {
        id: '5.3',
        number: '5.3',
        item: 'Choice and setting of protective and monitoring devices',
        regulation: 'BS 7671 Chapter 43',
        outcome: 'acceptable'
      },
      {
        id: '5.4',
        number: '5.4',
        item: 'Presence of RCD(s)',
        regulation: 'BS 7671 Section 531.2',
        outcome: 'acceptable'
      },
      {
        id: '5.5',
        number: '5.5',
        item: 'RCD operating times and the selectivity between RCDs',
        regulation: 'BS 7671 Section 531.2.9',
        outcome: 'acceptable'
      },
      {
        id: '5.6',
        number: '5.6',
        item: 'Presence of circuit charts, labels and warnings',
        regulation: 'BS 7671 Section 514.8',
        outcome: 'acceptable'
      },
      {
        id: '5.7',
        number: '5.7',
        item: 'Presence of non-standard mix of equipment',
        regulation: 'BS 7671 Section 530.3',
        outcome: 'acceptable'
      },
      {
        id: '5.8',
        number: '5.8',
        item: 'Presence of adequate arrangements for alternative supplies',
        regulation: 'BS 7671 Section 551',
        outcome: 'acceptable'
      },
      {
        id: '5.9',
        number: '5.9',
        item: 'Presence of adequate arrangements for isolation of electric vehicle charging point',
        regulation: 'BS 7671 Section 722.537.2',
        outcome: 'acceptable'
      },
      {
        id: '5.10',
        number: '5.10',
        item: 'Presence of fire barriers, sealing arrangements',
        regulation: 'BS 7671 Section 527.2',
        outcome: 'acceptable'
      },
      {
        id: '5.11',
        number: '5.11',
        item: 'Adequacy of access to switchgear',
        regulation: 'BS 7671 Section 513.1',
        outcome: 'acceptable'
      },
      {
        id: '5.12',
        number: '5.12',
        item: 'Particular protective measures for special installations and locations',
        regulation: 'BS 7671 Part 7',
        outcome: 'acceptable'
      },
      {
        id: '5.13',
        number: '5.13',
        item: 'Connection of single-pole devices for protection or switching in line conductors only',
        regulation: 'BS 7671 Section 530.3.3',
        outcome: 'acceptable'
      },
      {
        id: '5.14',
        number: '5.14',
        item: 'Correct connection of accessories and equipment',
        regulation: 'BS 7671 Section 526',
        outcome: 'acceptable'
      },
      {
        id: '5.15',
        number: '5.15',
        item: 'Presence of danger notices and warning labels',
        regulation: 'BS 7671 Section 514.13',
        outcome: 'acceptable'
      },
      {
        id: '5.16',
        number: '5.16',
        item: 'Presence of diagrams, instructions and similar information',
        regulation: 'BS 7671 Section 514.9',
        outcome: 'acceptable'
      },
      {
        id: '5.17',
        number: '5.17',
        item: 'Erection methods',
        regulation: 'BS 7671 Chapter 52',
        outcome: 'acceptable'
      },
      {
        id: '5.18',
        number: '5.18',
        item: 'Selection of equipment and protective measures appropriate to external influences',
        regulation: 'BS 7671 Section 512.2',
        outcome: 'acceptable'
      },
      {
        id: '5.19',
        number: '5.19',
        item: 'Adequacy of working space/accessibility to equipment',
        regulation: 'BS 7671 Section 513.1',
        outcome: 'acceptable'
      },
      {
        id: '5.20',
        number: '5.20',
        item: 'Presence of basic protection by insulation of live parts',
        regulation: 'BS 7671 Section 416',
        outcome: 'acceptable'
      },
      {
        id: '5.21',
        number: '5.21',
        item: 'Presence of basic protection by barriers or enclosures',
        regulation: 'BS 7671 Section 417',
        outcome: 'acceptable'
      },
      {
        id: '5.22',
        number: '5.22',
        item: 'Presence of additional protection by RCD',
        regulation: 'BS 7671 Section 415.1',
        outcome: 'acceptable'
      },
      {
        id: '5.23',
        number: '5.23',
        item: 'Presence of earthing arrangements for combined protective and functional purposes',
        regulation: 'BS 7671 Section 543.7',
        outcome: 'acceptable'
      },
      {
        id: '5.24',
        number: '5.24',
        item: 'Presence of adequate arrangements where a generating set operates as a switched alternative to the public supply',
        regulation: 'BS 7671 Section 551.4',
        outcome: 'acceptable'
      }
    ]
  },
  {
    id: 'final-circuits',
    number: '6',
    title: 'FINAL CIRCUITS',
    description: 'Final circuit wiring, outlets and accessories',
    regulation: 'BS 7671 Chapter 41, 52',
    isComplete: false,
    items: [
      {
        id: '6.1',
        number: '6.1',
        item: 'Routing of cables in prescribed zones',
        regulation: 'BS 7671 Section 522.6.101',
        outcome: 'acceptable'
      },
      {
        id: '6.2',
        number: '6.2',
        item: 'Cables incorporating earthed armour or sheath, or run within an earthed wiring system',
        regulation: 'BS 7671 Section 543.2.1',
        outcome: 'acceptable'
      },
      {
        id: '6.3',
        number: '6.3',
        item: 'Additional protection for cables concealed in walls',
        regulation: 'BS 7671 Section 522.6.103',
        outcome: 'acceptable'
      },
      {
        id: '6.4',
        number: '6.4',
        item: 'Additional protection for socket outlets',
        regulation: 'BS 7671 Section 411.3.3',
        outcome: 'acceptable'
      }
    ]
  },
  {
    id: 'location-environment',
    number: '7',
    title: 'LOCATION/ENVIRONMENT',
    description: 'Special locations and environmental considerations',
    regulation: 'BS 7671 Part 7',
    isComplete: false,
    items: [
      {
        id: '7.1',
        number: '7.1',
        item: 'Bathroom/shower room installations',
        regulation: 'BS 7671 Section 701',
        outcome: 'acceptable'
      },
      {
        id: '7.2',
        number: '7.2',
        item: 'Swimming pools and fountains',
        regulation: 'BS 7671 Section 702',
        outcome: 'acceptable'
      },
      {
        id: '7.3',
        number: '7.3',
        item: 'Hot air saunas',
        regulation: 'BS 7671 Section 703',
        outcome: 'acceptable'
      },
      {
        id: '7.4',
        number: '7.4',
        item: 'Construction and demolition site installations',
        regulation: 'BS 7671 Section 704',
        outcome: 'acceptable'
      }
    ]
  },
  {
    id: 'general',
    number: '8',
    title: 'GENERAL',
    description: 'General installation requirements and compliance',
    regulation: 'BS 7671 Chapter 13, 51',
    isComplete: false,
    items: [
      {
        id: '8.1',
        number: '8.1',
        item: 'Adequacy of conductor cross-sectional area with respect to shock risk and thermal effects',
        regulation: 'BS 7671 Section 524',
        outcome: 'acceptable'
      },
      {
        id: '8.2',
        number: '8.2',
        item: 'Coordination between conductor and overload protective device',
        regulation: 'BS 7671 Section 433',
        outcome: 'acceptable'
      },
      {
        id: '8.3',
        number: '8.3',
        item: 'Presence of fire barriers, sealing arrangements and protection against thermal effects',
        regulation: 'BS 7671 Section 527',
        outcome: 'acceptable'
      }
    ]
  },
  {
    id: 'schedule-items',
    number: '9',
    title: 'SCHEDULE OF ITEMS INSPECTED',
    description: 'Additional specific items requiring inspection',
    regulation: 'BS 7671 Schedule of Inspections',
    isComplete: false,
    items: [
      {
        id: '9.1',
        number: '9.1',
        item: 'Other items inspected (specify)',
        regulation: 'BS 7671 Schedule of Inspections',
        outcome: 'acceptable'
      }
    ]
  },
  {
    id: 'limitations',
    number: '10',
    title: 'LIMITATIONS',
    description: 'Areas not inspected and reasons',
    regulation: 'BS 7671 Schedule of Inspections',
    isComplete: false,
    items: [
      {
        id: '10.1',
        number: '10.1',
        item: 'Agreed limitations to inspection (specify)',
        regulation: 'BS 7671 Schedule of Inspections',
        outcome: 'limitation'
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
    'not-verified': 0,
    limitation: 0,
    'not-applicable': 0,
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
      status: 'unsatisfactory',
      code: 'C1',
      description: 'Danger present - immediate remedial action required',
      priority: 'immediate'
    };
  }
  
  if (stats.c2 > 0) {
    return {
      status: 'unsatisfactory', 
      code: 'C2',
      description: 'Potentially dangerous - urgent remedial action required',
      priority: 'urgent'
    };
  }
  
  if (stats.c3 > 0) {
    return {
      status: 'satisfactory',
      code: 'C3', 
      description: 'Improvement recommended',
      priority: 'improvement'
    };
  }
  
  return {
    status: 'satisfactory',
    code: '✓',
    description: 'Installation satisfactory',
    priority: 'none'
  };
};
