export interface NumberedInspectionItem {
  id: string;
  number: string;
  item: string;
  description?: string;
  regulation?: string;
  isCritical: boolean;
  outcome: InspectionOutcome;
  notes: string;
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

export type InspectionOutcome = 'acceptable' | 'c1' | 'c2' | 'c3' | 'fir' | 'lim' | 'na';

export const outcomeDefinitions = {
  acceptable: {
    label: 'Acceptable',
    description: 'Item meets requirements',
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
    borderColor: 'border-green-500/30'
  },
  c1: {
    label: 'C1 - Danger Present',
    description: 'Danger present - immediate remedial action required',
    color: 'text-red-400',
    bgColor: 'bg-red-500/20',
    borderColor: 'border-red-500/30'
  },
  c2: {
    label: 'C2 - Potentially Dangerous',
    description: 'Potentially dangerous - urgent remedial action required',
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
  fir: {
    label: 'FIR - Further Investigation',
    description: 'Further investigation required without delay',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/20',
    borderColor: 'border-purple-500/30'
  },
  lim: {
    label: 'LIM - Limitation',
    description: 'Limitation on inspection or testing',
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
  }
};

export const numberedVisualInspectionSections: NumberedInspectionSection[] = [
  {
    id: 'section-1',
    number: '1',
    title: 'External Condition of Intake Equipment',
    description: 'Inspection of service head, meter, earthing and bonding arrangements',
    regulation: 'BS 7671:2018 Section 132, Regulation 134.1.1',
    isComplete: false,
    items: [
      {
        id: 'item-1-1',
        number: '1.1',
        item: 'Service cable',
        description: 'Check condition and adequacy of incoming service cable',
        regulation: 'BS 7671:2018 Regulation 132.16',
        isCritical: true,
        outcome: 'acceptable',
        notes: '',
        requiresAction: false
      },
      {
        id: 'item-1-2',
        number: '1.2',
        item: 'Service head',
        description: 'Inspect service head for damage, security and accessibility',
        regulation: 'BS 7671:2018 Regulation 132.12',
        isCritical: true,
        outcome: 'acceptable',
        notes: '',
        requiresAction: false
      },
      {
        id: 'item-1-3',
        number: '1.3',
        item: 'Earthing conductor',
        description: 'Check main earthing conductor connection and condition',
        regulation: 'BS 7671:2018 Section 542',
        isCritical: true,
        outcome: 'acceptable',
        notes: '',
        requiresAction: false
      },
      {
        id: 'item-1-4',
        number: '1.4',
        item: 'Main equipotential bonding conductors',
        description: 'Inspect main bonding conductors to extraneous-conductive-parts',
        regulation: 'BS 7671:2018 Section 544',
        isCritical: true,
        outcome: 'acceptable',
        notes: '',
        requiresAction: false
      },
      {
        id: 'item-1-5',
        number: '1.5',
        item: 'Metering equipment',
        description: 'Check condition and security of meter installation and associated equipment',
        regulation: 'BS 7671:2018 Regulation 132.12',
        isCritical: false,
        outcome: 'acceptable',
        notes: '',
        requiresAction: false
      }
    ]
  },
  {
    id: 'section-2',
    number: '2',
    title: 'Parallel or Switched Alternative Sources',
    description: 'Inspection of generator installations and alternative supply systems including protective arrangements',
    regulation: 'BS 7671:2018 Section 551, BS 7909',
    isComplete: false,
    items: [
      {
        id: 'item-2-1',
        number: '2.1',
        item: 'Generator sets - Electrical installation',
        description: 'Check electrical connections, control systems, and protective devices for generator installations',
        regulation: 'BS 7671:2018 Section 551.4, BS 7909',
        isCritical: true,
        outcome: 'acceptable',
        notes: '',
        requiresAction: false
      },
      {
        id: 'item-2-2',
        number: '2.2',
        item: 'Generator sets - Safety systems and interlocks',
        description: 'Verify safety shutdown systems, emergency stops, and changeover switching arrangements',
        regulation: 'BS 7671:2018 Regulation 551.4.3, BS 7909',
        isCritical: true,
        outcome: 'acceptable',
        notes: '',
        requiresAction: false
      }
    ]
  },
  {
    id: 'section-3',
    number: '3',
    title: 'Automatic Disconnection of Supply',
    description: 'Inspection of protective devices, RCDs, and earthing arrangements for automatic disconnection',
    regulation: 'BS 7671:2018 Section 411',
    isComplete: false,
    items: [
      {
        id: 'item-3-1',
        number: '3.1',
        item: 'Presence of earthing conductor',
        description: 'Verify earthing conductor is present and correctly connected',
        regulation: 'BS 7671:2018 Regulation 411.3.1.1',
        isCritical: true,
        outcome: 'acceptable',
        notes: '',
        requiresAction: false
      },
      {
        id: 'item-3-2',
        number: '3.2',
        item: 'Presence of circuit protective conductors',
        description: 'Check circuit protective conductors are present in all circuits',
        regulation: 'BS 7671:2018 Regulation 411.3.1.1',
        isCritical: true,
        outcome: 'acceptable',
        notes: '',
        requiresAction: false
      },
      {
        id: 'item-3-3',
        number: '3.3',
        item: 'Presence of main equipotential bonding conductors',
        description: 'Verify main bonding conductors connect extraneous-conductive-parts',
        regulation: 'BS 7671:2018 Regulation 411.3.1.2',
        isCritical: true,
        outcome: 'acceptable',
        notes: '',
        requiresAction: false
      },
      {
        id: 'item-3-4',
        number: '3.4',
        item: 'Presence of supplementary equipotential bonding conductors',
        description: 'Check supplementary bonding where required for special locations',
        regulation: 'BS 7671:2018 Regulation 415.2',
        isCritical: false,
        outcome: 'acceptable',
        notes: '',
        requiresAction: false
      },
      {
        id: 'item-3-5',
        number: '3.5',
        item: 'Presence of residual current devices',
        description: 'Verify RCDs are installed where required by regulations',
        regulation: 'BS 7671:2018 Regulation 411.3.3',
        isCritical: true,
        outcome: 'acceptable',
        notes: '',
        requiresAction: false
      },
      {
        id: 'item-3-6',
        number: '3.6',
        item: 'Choice and setting of protective and monitoring devices',
        description: 'Check protective devices are correctly rated and coordinated',
        regulation: 'BS 7671:2018 Chapter 43',
        isCritical: true,
        outcome: 'acceptable',
        notes: '',
        requiresAction: false
      },
      {
        id: 'item-3-7',
        number: '3.7',
        item: 'Accessibility of protective devices',
        description: 'Ensure protective devices are accessible for operation and maintenance',
        regulation: 'BS 7671:2018 Regulation 132.12',
        isCritical: false,
        outcome: 'acceptable',
        notes: '',
        requiresAction: false
      },
      {
        id: 'item-3-8',
        number: '3.8',
        item: 'Effectiveness of protective measures',
        description: 'Assess overall effectiveness of protective arrangements',
        regulation: 'BS 7671:2018 Section 411',
        isCritical: true,
        outcome: 'acceptable',
        notes: '',
        requiresAction: false
      },
      {
        id: 'item-3-9',
        number: '3.9',
        item: 'Additional protection by RCD',
        description: 'Verify additional protection by 30mA RCD where required',
        regulation: 'BS 7671:2018 Regulation 411.3.3',
        isCritical: true,
        outcome: 'acceptable',
        notes: '',
        requiresAction: false
      }
    ]
  },
  {
    id: 'section-4',
    number: '4',
    title: 'Other Methods of Protection',
    description: 'Inspection of SELV, PELV, electrical separation and other protective measures',
    regulation: 'BS 7671:2018 Sections 412, 413, 414',
    isComplete: false,
    items: [
      {
        id: 'item-4-1',
        number: '4.1',
        item: 'SELV and PELV circuits',
        description: 'Check separated extra-low voltage circuits meet safety requirements',
        regulation: 'BS 7671:2018 Section 414',
        isCritical: true,
        outcome: 'acceptable',
        notes: '',
        requiresAction: false
      },
      {
        id: 'item-4-2',
        number: '4.2',
        item: 'Electrical separation',
        description: 'Verify electrical separation for individual items of equipment',
        regulation: 'BS 7671:2018 Section 413',
        isCritical: false,
        outcome: 'acceptable',
        notes: '',
        requiresAction: false
      },
      {
        id: 'item-4-3',
        number: '4.3',
        item: 'Non-conducting location',
        description: 'Check requirements for non-conducting locations where applicable',
        regulation: 'BS 7671:2018 Section 418',
        isCritical: false,
        outcome: 'acceptable',
        notes: '',
        requiresAction: false
      },
      {
        id: 'item-4-4',
        number: '4.4',
        item: 'Earth-free local equipotential bonding',
        description: 'Inspect earth-free equipotential bonding arrangements',
        regulation: 'BS 7671:2018 Section 419',
        isCritical: false,
        outcome: 'acceptable',
        notes: '',
        requiresAction: false
      }
    ]
  },
  {
    id: 'section-5',
    number: '5',
    title: 'Prevention of Mutual Detrimental Influence',
    description: 'Inspection of segregation and protection against electromagnetic interference',
    regulation: 'BS 7671:2018 Section 515',
    isComplete: false,
    items: [
      {
        id: 'item-5-1',
        number: '5.1',
        item: 'Proximity of non-electrical services',
        description: 'Check separation from gas, water, and other non-electrical services',
        regulation: 'BS 7671:2018 Regulation 528.1',
        isCritical: true,
        outcome: 'acceptable',
        notes: '',
        requiresAction: false
      },
      {
        id: 'item-5-2',
        number: '5.2',
        item: 'Segregation of circuits',
        description: 'Verify different voltage circuits are properly segregated',
        regulation: 'BS 7671:2018 Section 528',
        isCritical: false,
        outcome: 'acceptable',
        notes: '',
        requiresAction: false
      },
      {
        id: 'item-5-3',
        number: '5.3',
        item: 'Electromagnetic compatibility',
        description: 'Check measures to prevent electromagnetic interference',
        regulation: 'BS 7671:2018 Section 444',
        isCritical: false,
        outcome: 'acceptable',
        notes: '',
        requiresAction: false
      }
    ]
  },
  {
    id: 'section-6',
    number: '6',
    title: 'Identification',
    description: 'Inspection of labelling, marking and identification of equipment and circuits',
    regulation: 'BS 7671:2018 Section 514',
    isComplete: false,
    items: [
      {
        id: 'item-6-1',
        number: '6.1',
        item: 'Presence of diagrams, instructions and similar information',
        description: 'Check electrical installation certificate and schedules are available',
        regulation: 'BS 7671:2018 Regulation 514.9.1',
        isCritical: false,
        outcome: 'acceptable',
        notes: '',
        requiresAction: false
      },
      {
        id: 'item-6-2',
        number: '6.2',
        item: 'Presence of danger notices and other warning notices',
        description: 'Verify appropriate warning labels and danger notices are present',
        regulation: 'BS 7671:2018 Regulation 514.10.1',
        isCritical: true,
        outcome: 'acceptable',
        notes: '',
        requiresAction: false
      },
      {
        id: 'item-6-3',
        number: '6.3',
        item: 'Labelling of protective devices, switches and terminals',
        description: 'Check all protective devices and switches are properly labelled',
        regulation: 'BS 7671:2018 Regulation 514.8.1',
        isCritical: false,
        outcome: 'acceptable',
        notes: '',
        requiresAction: false
      },
      {
        id: 'item-6-4',
        number: '6.4',
        item: 'Identification of conductors',
        description: 'Verify conductors are identified by colour or marking',
        regulation: 'BS 7671:2018 Section 514',
        isCritical: false,
        outcome: 'acceptable',
        notes: '',
        requiresAction: false
      }
    ]
  },
  {
    id: 'section-7',
    number: '7',
    title: 'General',
    description: 'General inspection of workmanship, damage, corrosion, wear and environmental conditions',
    regulation: 'BS 7671:2018 Section 134',
    isComplete: false,
    items: [
      {
        id: 'item-7-1',
        number: '7.1',
        item: 'Workmanship and general condition',
        description: 'Assess overall workmanship and general condition of installation',
        regulation: 'BS 7671:2018 Regulation 134.1.1',
        isCritical: false,
        outcome: 'acceptable',
        notes: '',
        requiresAction: false
      },
      {
        id: 'item-7-2',
        number: '7.2',
        item: 'Damage, deterioration, defects, corrosion and wear',
        description: 'Check for visible damage, deterioration or signs of wear',
        regulation: 'BS 7671:2018 Regulation 132.16',
        isCritical: true,
        outcome: 'acceptable',
        notes: '',
        requiresAction: false
      },
      {
        id: 'item-7-3',
        number: '7.3',
        item: 'Environmental conditions',
        description: 'Assess suitability for environmental conditions present',
        regulation: 'BS 7671:2018 Chapter 32',
        isCritical: false,
        outcome: 'acceptable',
        notes: '',
        requiresAction: false
      }
    ]
  },
  {
    id: 'section-8',
    number: '8',
    title: 'Selection and Erection',
    description: 'Inspection of cable selection, installation methods and protection',
    regulation: 'BS 7671:2018 Chapters 52, 53',
    isComplete: false,
    items: [
      {
        id: 'item-8-1',
        number: '8.1',
        item: 'Cables and conductors',
        description: 'Check cable types are suitable for installation conditions',
        regulation: 'BS 7671:2018 Chapter 52',
        isCritical: false,
        outcome: 'acceptable',
        notes: '',
        requiresAction: false
      },
      {
        id: 'item-8-2',
        number: '8.2',
        item: 'Selection and erection of wiring systems',
        description: 'Verify wiring systems are appropriate for the environment',
        regulation: 'BS 7671:2018 Chapter 52',
        isCritical: false,
        outcome: 'acceptable',
        notes: '',
        requiresAction: false
      },
      {
        id: 'item-8-3',
        number: '8.3',
        item: 'Connection of conductors',
        description: 'Check conductor connections are secure and appropriate',
        regulation: 'BS 7671:2018 Section 526',
        isCritical: true,
        outcome: 'acceptable',
        notes: '',
        requiresAction: false
      },
      {
        id: 'item-8-4',
        number: '8.4',
        item: 'Routing of cables in safe zones or mechanical protection',
        description: 'Verify cables are in safe zones or have mechanical protection',
        regulation: 'BS 7671:2018 Regulation 522.6.204',
        isCritical: true,
        outcome: 'acceptable',
        notes: '',
        requiresAction: false
      }
    ]
  },
  {
    id: 'section-9',
    number: '9',
    title: 'Safety Services',
    description: 'Inspection of emergency lighting, fire alarm and other safety systems',
    regulation: 'BS 7671:2018 Chapter 56',
    isComplete: false,
    items: [
      {
        id: 'item-9-1',
        number: '9.1',
        item: 'Emergency lighting systems',
        description: 'Check emergency lighting installation and operation',
        regulation: 'BS 7671:2018 Section 560, BS 5266',
        isCritical: false,
        outcome: 'acceptable',
        notes: '',
        requiresAction: false
      },
      {
        id: 'item-9-2',
        number: '9.2',
        item: 'Fire alarm and detection systems',
        description: 'Inspect fire alarm system installation',
        regulation: 'BS 7671:2018 Section 560, BS 5839',
        isCritical: false,
        outcome: 'acceptable',
        notes: '',
        requiresAction: false
      },
      {
        id: 'item-9-3',
        number: '9.3',
        item: 'Safety services supply arrangements',
        description: 'Check supply arrangements for safety services',
        regulation: 'BS 7671:2018 Chapter 56',
        isCritical: false,
        outcome: 'acceptable',
        notes: '',
        requiresAction: false
      }
    ]
  },
  {
    id: 'section-10',
    number: '10',
    title: 'Special Installations or Locations',
    description: 'Inspection of bathrooms, swimming pools, agricultural premises and other special locations',
    regulation: 'BS 7671:2018 Part 7',
    isComplete: false,
    items: [
      {
        id: 'item-10-1',
        number: '10.1',
        item: 'Locations containing bath or shower',
        description: 'Check compliance with bathroom installation requirements',
        regulation: 'BS 7671:2018 Section 701',
        isCritical: true,
        outcome: 'acceptable',
        notes: '',
        requiresAction: false
      },
      {
        id: 'item-10-2',
        number: '10.2',
        item: 'Swimming pools and other basins',
        description: 'Inspect special requirements for swimming pool areas',
        regulation: 'BS 7671:2018 Section 702',
        isCritical: true,
        outcome: 'acceptable',
        notes: '',
        requiresAction: false
      },
      {
        id: 'item-10-3',
        number: '10.3',
        item: 'Hot air saunas',
        description: 'Check sauna electrical installation requirements',
        regulation: 'BS 7671:2018 Section 703',
        isCritical: false,
        outcome: 'acceptable',
        notes: '',
        requiresAction: false
      },
      {
        id: 'item-10-4',
        number: '10.4',
        item: 'Construction and demolition site installations',
        description: 'Verify temporary installation requirements',
        regulation: 'BS 7671:2018 Section 704',
        isCritical: false,
        outcome: 'acceptable',
        notes: '',
        requiresAction: false
      },
      {
        id: 'item-10-5',
        number: '10.5',
        item: 'Agricultural and horticultural premises',
        description: 'Check compliance with agricultural installation requirements',
        regulation: 'BS 7671:2018 Section 705',
        isCritical: false,
        outcome: 'acceptable',
        notes: '',
        requiresAction: false
      },
      {
        id: 'item-10-6',
        number: '10.6',
        item: 'Conducting locations with restricted movement',
        description: 'Inspect boiler rooms and similar restricted locations',
        regulation: 'BS 7671:2018 Section 706',
        isCritical: false,
        outcome: 'acceptable',
        notes: '',
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
    fir: 0,
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
  
  if (stats.c1 > 0 || stats.c2 > 0) {
    return 'unsatisfactory';
  }
  
  if (stats.c3 > 0 || stats.fir > 0) {
    return 'satisfactory_with_recommendations';
  }
  
  return 'satisfactory';
};

export type { NumberedInspectionItem, NumberedInspectionSection, InspectionOutcome };
