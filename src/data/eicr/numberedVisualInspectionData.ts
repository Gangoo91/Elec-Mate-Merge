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
    title: 'External Condition of Intake Equipment or Service Cable',
    description: 'Visual inspection of service cable, intake equipment, and associated infrastructure',
    regulation: 'BS 7671:2018+A2:2022 - Schedule of Inspections Item 1',
    items: [
      {
        id: 'item-1-1',
        number: '1.1',
        item: 'Service cable',
        description: 'Check condition of incoming service cable for damage, deterioration, or inadequate support',
        regulation: 'BS 7671 Schedule of Inspections',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: 'item-1-2',
        number: '1.2',
        item: 'Service head',
        description: 'Inspect service head/cut-out for security, damage, and proper sealing',
        regulation: 'BS 7671 Schedule of Inspections',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: 'item-1-3',
        number: '1.3',
        item: 'Earthing conductor',
        description: 'Check main earthing conductor connection, size, and condition',
        regulation: 'BS 7671 Schedule of Inspections',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: 'item-1-4',
        number: '1.4',
        item: 'Earthing conductor connection to earth electrode',
        description: 'Verify earthing conductor connection to earth electrode is secure and properly identified',
        regulation: 'BS 7671 Schedule of Inspections',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: 'item-1-5',
        number: '1.5',
        item: 'Metering equipment',
        description: 'Check metering equipment installation, security, and accessibility',
        regulation: 'BS 7671 Schedule of Inspections',
        outcome: 'acceptable',
        notes: '',
        isCritical: false,
        requiresAction: false
      }
    ],
    isComplete: false,
    completedAt: null
  },
  {
    id: 'section-2',
    number: '2.0',
    title: 'Parallel or Switched Alternative Sources',
    description: 'Inspection of alternative supply arrangements and changeover systems',
    regulation: 'BS 7671:2018+A2:2022 - Schedule of Inspections Item 2',
    items: [
      {
        id: 'item-2-1',
        number: '2.1',
        item: 'Presence of adequate arrangements',
        description: 'Verify adequate arrangements exist to prevent parallel connection of sources',
        regulation: 'BS 7671 Schedule of Inspections',
        outcome: 'na',
        notes: '',
        isCritical: true,
        requiresAction: false
      }
    ],
    isComplete: false,
    completedAt: null
  },
  {
    id: 'section-3',
    number: '3.0',
    title: 'Automatic Disconnection of Supply',
    description: 'Inspection of protective measures for automatic disconnection including earthing, bonding, and protective devices',
    regulation: 'BS 7671:2018+A2:2022 - Schedule of Inspections Item 3',
    items: [
      {
        id: 'item-3-1',
        number: '3.1',
        item: 'Presence and condition of earthing conductor',
        description: 'Check main earthing conductor is present, correctly sized, and in good condition',
        regulation: 'BS 7671 Regulation 542.3',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: 'item-3-2',
        number: '3.2',
        item: 'Presence and condition of circuit protective conductors',
        description: 'Verify circuit protective conductors are present and correctly installed',
        regulation: 'BS 7671 Chapter 54',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: 'item-3-3',
        number: '3.3',
        item: 'Presence and condition of protective bonding conductors',
        description: 'Check main and supplementary bonding conductors are present and correctly connected',
        regulation: 'BS 7671 Regulation 544.1',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: 'item-3-4',
        number: '3.4',
        item: 'Presence and condition of earthing arrangements for combined protective and functional purposes',
        description: 'Inspect arrangements where earthing serves both protective and functional purposes',
        regulation: 'BS 7671 Regulation 542.1.2',
        outcome: 'acceptable',
        notes: '',
        isCritical: false,
        requiresAction: false
      },
      {
        id: 'item-3-5',
        number: '3.5',
        item: 'Presence of earthing conductor connection to earth',
        description: 'Verify earthing conductor is properly connected to the earth electrode or earthing facility',
        regulation: 'BS 7671 Regulation 542.3.1',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: 'item-3-6',
        number: '3.6',
        item: 'Presence of circuit protective conductors',
        description: 'Check all circuits have appropriate circuit protective conductors installed',
        regulation: 'BS 7671 Chapter 54',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: 'item-3-7',
        number: '3.7',
        item: 'Presence of protective devices for automatic disconnection',
        description: 'Verify appropriate protective devices (MCBs, RCDs, etc.) are installed for automatic disconnection',
        regulation: 'BS 7671 Chapter 41',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: 'item-3-8',
        number: '3.8',
        item: 'Correct connection of single-pole devices for protection or switching of line conductors only',
        description: 'Check single-pole devices are connected to interrupt line conductors only, not neutral',
        regulation: 'BS 7671 Regulation 132.14.1',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: 'item-3-9',
        number: '3.9',
        item: 'Correct connection of 3-phase consumers equipment to 3-phase supplies',
        description: 'Verify 3-phase equipment is correctly connected with proper phase sequence',
        regulation: 'BS 7671 Regulation 512.1.2',
        outcome: 'acceptable',
        notes: '',
        isCritical: false,
        requiresAction: false
      }
    ],
    isComplete: false,
    completedAt: null
  },
  {
    id: 'section-4',
    number: '4.0',
    title: 'Other Methods of Protection',
    description: 'Non-conducting location, earth-free local equipotential bonding, electrical separation',
    regulation: 'BS 7671:2018+A2:2022 - Schedule of Inspections Item 4',
    items: [
      {
        id: 'item-4-1',
        number: '4.1',
        item: 'Presence of measures to prevent touch to live parts and between exposed conductive parts',
        description: 'Check adequate measures exist to prevent simultaneous contact',
        regulation: 'BS 7671 Schedule of Inspections',
        outcome: 'na',
        notes: '',
        isCritical: true,
        requiresAction: false
      }
    ],
    isComplete: false,
    completedAt: null
  },
  {
    id: 'section-5',
    number: '5.0',
    title: 'Prevention of Mutual Detrimental Influence',
    description: 'Segregation of safety circuits and other electrical services',
    regulation: 'BS 7671:2018+A2:2022 - Schedule of Inspections Item 5',
    items: [
      {
        id: 'item-5-1',
        number: '5.1',
        item: 'Segregation of Band I and Band II circuits or use of Band II insulation',
        description: 'Check proper segregation between different voltage bands',
        regulation: 'BS 7671 Schedule of Inspections',
        outcome: 'acceptable',
        notes: '',
        isCritical: false,
        requiresAction: false
      }
    ],
    isComplete: false,
    completedAt: null
  },
  {
    id: 'section-6',
    number: '6.0',
    title: 'Identification and Notices',
    description: 'Labelling, identification, and safety notices throughout the installation',
    regulation: 'BS 7671:2018+A2:2022 - Schedule of Inspections Item 6',
    items: [
      {
        id: 'item-6-1',
        number: '6.1',
        item: 'Presence of diagrams, instructions, circuit charts and similar information',
        description: 'Check required documentation and charts are present and accessible',
        regulation: 'BS 7671 Schedule of Inspections',
        outcome: 'acceptable',
        notes: '',
        isCritical: false,
        requiresAction: false
      },
      {
        id: 'item-6-2',
        number: '6.2',
        item: 'Presence of danger notices and other warning notices',
        description: 'Verify appropriate warning and danger notices are displayed',
        regulation: 'BS 7671 Schedule of Inspections',
        outcome: 'acceptable',
        notes: '',
        isCritical: false,
        requiresAction: false
      },
      {
        id: 'item-6-3',
        number: '6.3',
        item: 'Presence of labels for protective devices, switches and terminals',
        description: 'Check all devices and terminals are properly labelled',
        regulation: 'BS 7671 Schedule of Inspections',
        outcome: 'acceptable',
        notes: '',
        isCritical: false,
        requiresAction: false
      },
      {
        id: 'item-6-4',
        number: '6.4',
        item: 'Identification of circuits, fuses, circuit-breakers and switches',
        description: 'Verify all circuits and protective devices are clearly identified',
        regulation: 'BS 7671 Schedule of Inspections',
        outcome: 'acceptable',
        notes: '',
        isCritical: false,
        requiresAction: false
      },
      {
        id: 'item-6-5',
        number: '6.5',
        item: 'Identification of conductors',
        description: 'Check conductors are properly identified by colour or marking',
        regulation: 'BS 7671 Schedule of Inspections',
        outcome: 'acceptable',
        notes: '',
        isCritical: false,
        requiresAction: false
      }
    ],
    isComplete: false,
    completedAt: null
  },
  {
    id: 'section-7',
    number: '7.0',
    title: 'General Condition',
    description: 'Overall condition, deterioration, and damage assessment',
    regulation: 'BS 7671:2018+A2:2022 - Schedule of Inspections Item 7',
    items: [
      {
        id: 'item-7-1',
        number: '7.1',
        item: 'Presence of adequate working space and access to switchgear',
        description: 'Check sufficient working space and access around electrical equipment',
        regulation: 'BS 7671 Schedule of Inspections',
        outcome: 'acceptable',
        notes: '',
        isCritical: false,
        requiresAction: false
      },
      {
        id: 'item-7-2',
        number: '7.2',
        item: 'Security of fixtures, fittings and enclosures',
        description: 'Verify all electrical fixtures and enclosures are securely mounted',
        regulation: 'BS 7671 Schedule of Inspections',
        outcome: 'acceptable',
        notes: '',
        isCritical: false,
        requiresAction: false
      },
      {
        id: 'item-7-3',
        number: '7.3',
        item: 'Condition with regard to damage, deterioration, defects or corrosion',
        description: 'Assess overall condition for any signs of damage or deterioration',
        regulation: 'BS 7671 Schedule of Inspections',
        outcome: 'acceptable',
        notes: '',
        isCritical: false,
        requiresAction: false
      }
    ],
    isComplete: false,
    completedAt: null
  },
  {
    id: 'section-8',
    number: '8.0',
    title: 'Cables and Conductors',
    description: 'Cable routing, support, protection, and condition assessment',
    regulation: 'BS 7671:2018+A2:2022 - Schedule of Inspections Item 8',
    items: [
      {
        id: 'item-8-1',
        number: '8.1',
        item: 'Routing of cables in prescribed zones',
        description: 'Check cables are routed in safe zones as per regulations',
        regulation: 'BS 7671 Schedule of Inspections',
        outcome: 'acceptable',
        notes: '',
        isCritical: false,
        requiresAction: false
      },
      {
        id: 'item-8-2',
        number: '8.2',
        item: 'Cables correctly supported throughout their run',
        description: 'Verify cables have adequate support along their entire length',
        regulation: 'BS 7671 Schedule of Inspections',
        outcome: 'acceptable',
        notes: '',
        isCritical: false,
        requiresAction: false
      },
      {
        id: 'item-8-3',
        number: '8.3',
        item: 'Condition of cables, including old cables',
        description: 'Assess condition of all cables including legacy installations',
        regulation: 'BS 7671 Schedule of Inspections',
        outcome: 'acceptable',
        notes: '',
        isCritical: false,
        requiresAction: false
      },
      {
        id: 'item-8-4',
        number: '8.4',
        item: 'Connection of conductors',
        description: 'Check all conductor connections are properly made and secure',
        regulation: 'BS 7671 Schedule of Inspections',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      },
      {
        id: 'item-8-5',
        number: '8.5',
        item: 'Adequacy of protective devices for cables and conductors',
        description: 'Verify protective devices are correctly rated for cable protection',
        regulation: 'BS 7671 Schedule of Inspections',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      }
    ],
    isComplete: false,
    completedAt: null
  },
  {
    id: 'section-9',
    number: '9.0',
    title: 'General Equipment',
    description: 'Electrical equipment, accessories, and appliance condition',
    regulation: 'BS 7671:2018+A2:2022 - Schedule of Inspections Item 9',
    items: [
      {
        id: 'item-9-1',
        number: '9.1',
        item: 'Condition and security of electrical equipment and accessories',
        description: 'Check all electrical equipment is secure and in good condition',
        regulation: 'BS 7671 Schedule of Inspections',
        outcome: 'acceptable',
        notes: '',
        isCritical: false,
        requiresAction: false
      },
      {
        id: 'item-9-2',
        number: '9.2',
        item: 'Adequacy of access to electrical equipment',
        description: 'Verify adequate access is maintained to all electrical equipment',
        regulation: 'BS 7671 Schedule of Inspections',
        outcome: 'acceptable',
        notes: '',
        isCritical: false,
        requiresAction: false
      },
      {
        id: 'item-9-3',
        number: '9.3',
        item: 'Particular protective measures for special installations and locations',
        description: 'Check special protective measures in bathrooms, outdoor locations, etc.',
        regulation: 'BS 7671 Schedule of Inspections',
        outcome: 'acceptable',
        notes: '',
        isCritical: true,
        requiresAction: false
      }
    ],
    isComplete: false,
    completedAt: null
  },
  {
    id: 'section-10',
    number: '10.0',
    title: 'Tariff and Control Equipment',
    description: 'Metering, control systems, and tariff equipment inspection',
    regulation: 'BS 7671:2018+A2:2022 - Schedule of Inspections Item 10',
    items: [
      {
        id: 'item-10-1',
        number: '10.1',
        item: 'Condition and security of tariff control equipment',
        description: 'Check tariff control equipment is secure and functioning properly',
        regulation: 'BS 7671 Schedule of Inspections',
        outcome: 'acceptable',
        notes: '',
        isCritical: false,
        requiresAction: false
      },
      {
        id: 'item-10-2',
        number: '10.2',
        item: 'Adequacy of control and monitoring equipment',
        description: 'Verify control and monitoring systems are adequate for the installation',
        regulation: 'BS 7671 Schedule of Inspections',
        outcome: 'acceptable',
        notes: '',
        isCritical: false,
        requiresAction: false
      }
    ],
    isComplete: false,
    completedAt: null
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
