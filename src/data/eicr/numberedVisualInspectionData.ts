
export type InspectionOutcome = 'acceptable' | 'not_applicable' | 'unacceptable' | 'limitation' | 'c1' | 'c2' | 'c3';

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

// Official EICR Numbered Visual Inspection Data
// Based on BS 7671:2018+A2:2022 Schedule of Inspections
export const numberedVisualInspectionSections: NumberedInspectionSection[] = [
  {
    id: 'section-1',
    number: '1',
    title: 'External condition of intake equipment or overhead lines',
    description: 'Visual inspection of external electrical supply infrastructure',
    regulation: 'BS 7671:2018+A2:2022 - 132.16, 514.15.1',
    isComplete: false,
    items: [
      {
        id: '1.1',
        number: '1.1',
        item: 'Service head',
        regulation: 'BS 7671:2018+A2:2022 - 132.16',
        outcome: 'acceptable'
      },
      {
        id: '1.2',
        number: '1.2',
        item: 'Earthing conductor',
        regulation: 'BS 7671:2018+A2:2022 - 542.1.2.1',
        outcome: 'acceptable'
      },
      {
        id: '1.3',
        number: '1.3',
        item: 'Meter tails',
        regulation: 'BS 7671:2018+A2:2022 - 132.16',
        outcome: 'acceptable'
      },
      {
        id: '1.4',
        number: '1.4',
        item: 'Meter',
        regulation: 'BS 7671:2018+A2:2022 - 132.16',
        outcome: 'acceptable'
      }
    ]
  },
  {
    id: 'section-2',
    number: '2',
    title: 'Condition of intake equipment',
    description: 'Assessment of main intake electrical equipment condition',
    regulation: 'BS 7671:2018+A2:2022 - 132.16, 514.15.1',
    isComplete: false,
    items: [
      {
        id: '2.1',
        number: '2.1',
        item: 'Intake equipment',
        regulation: 'BS 7671:2018+A2:2022 - 132.16',
        outcome: 'acceptable'
      },
      {
        id: '2.2',
        number: '2.2',
        item: 'Distributor/supply undertaking equipment',
        regulation: 'BS 7671:2018+A2:2022 - 132.16',
        outcome: 'acceptable'
      }
    ]
  },
  {
    id: 'section-3',
    number: '3',
    title: 'Condition of final circuits',
    description: 'Visual inspection of final circuit installations',
    regulation: 'BS 7671:2018+A2:2022 - 134.1.1, 411.3.1.1',
    isComplete: false,
    items: [
      {
        id: '3.1',
        number: '3.1',
        item: 'Distributors and consumer units',
        regulation: 'BS 7671:2018+A2:2022 - 421.1.201, 526.5',
        outcome: 'acceptable'
      },
      {
        id: '3.2',
        number: '3.2',
        item: 'Adequacy of working space/accessibility',
        regulation: 'BS 7671:2018+A2:2022 - 132.12, 513.1',
        outcome: 'acceptable'
      },
      {
        id: '3.3',
        number: '3.3',
        item: 'Basic protection',
        regulation: 'BS 7671:2018+A2:2022 - 410.3.2, 416.2.1',
        outcome: 'acceptable'
      },
      {
        id: '3.4',
        number: '3.4',
        item: 'IP rating/mechanical protection',
        regulation: 'BS 7671:2018+A2:2022 - 416.2.1, 512.2.1',
        outcome: 'acceptable'
      },
      {
        id: '3.5',
        number: '3.5',
        item: 'Condition of enclosures',
        regulation: 'BS 7671:2018+A2:2022 - 416.2.1, 526.5',
        outcome: 'acceptable'
      }
    ]
  },
  {
    id: 'section-4',
    number: '4',
    title: 'Condition of installation',
    description: 'Overall installation condition assessment',
    regulation: 'BS 7671:2018+A2:2022 - 134.1.1',
    isComplete: false,
    items: [
      {
        id: '4.1',
        number: '4.1',
        item: 'Switchgear/controlgear',
        regulation: 'BS 7671:2018+A2:2022 - 536.4.1, 537.1.4',
        outcome: 'acceptable'
      },
      {
        id: '4.2',
        number: '4.2',
        item: 'Isolators and switching devices',
        regulation: 'BS 7671:2018+A2:2022 - 537.2.1.1, 537.2.1.5',
        outcome: 'acceptable'
      },
      {
        id: '4.3',
        number: '4.3',
        item: 'Protective equipment',
        regulation: 'BS 7671:2018+A2:2022 - 530.3.4, 531.1',
        outcome: 'acceptable'
      },
      {
        id: '4.4',
        number: '4.4',
        item: 'Monitoring equipment',
        regulation: 'BS 7671:2018+A2:2022 - 514.15.1',
        outcome: 'acceptable'
      }
    ]
  },
  {
    id: 'section-5',
    number: '5',
    title: 'Method of protection against electric shock',
    description: 'Assessment of shock protection measures',
    regulation: 'BS 7671:2018+A2:2022 - Part 4',
    isComplete: false,
    items: [
      {
        id: '5.1',
        number: '5.1',
        item: 'Basic protection (direct contact)',
        regulation: 'BS 7671:2018+A2:2022 - 410.3.2, 416.2.1',
        outcome: 'acceptable'
      },
      {
        id: '5.2',
        number: '5.2',
        item: 'Fault protection (indirect contact)',
        regulation: 'BS 7671:2018+A2:2022 - 411.3.1.1, 411.4.5',
        outcome: 'acceptable'
      },
      {
        id: '5.3',
        number: '5.3',
        item: 'Presence of RCD protection',
        regulation: 'BS 7671:2018+A2:2022 - 411.3.3, 415.1.1',
        outcome: 'acceptable'
      },
      {
        id: '5.4',
        number: '5.4',
        item: 'Choice and setting of protective devices',
        regulation: 'BS 7671:2018+A2:2022 - 411.3.2.1, 533.1.1',
        outcome: 'acceptable'
      }
    ]
  },
  {
    id: 'section-6',
    number: '6',
    title: 'Condition of wiring systems',
    description: 'Visual assessment of cable installations and routing',
    regulation: 'BS 7671:2018+A2:2022 - Chapter 52',
    isComplete: false,
    items: [
      {
        id: '6.1',
        number: '6.1',
        item: 'Routing of cables in prescribed/safe zones',
        regulation: 'BS 7671:2018+A2:2022 - 522.6.202, 522.6.203',
        outcome: 'acceptable'
      },
      {
        id: '6.2',
        number: '6.2',
        item: 'Cables appropriately supported',
        regulation: 'BS 7671:2018+A2:2022 - 522.8.5',
        outcome: 'acceptable'
      },
      {
        id: '6.3',
        number: '6.3',
        item: 'Condition of cables',
        regulation: 'BS 7671:2018+A2:2022 - 522.6.1, 522.8.1',
        outcome: 'acceptable'
      },
      {
        id: '6.4',
        number: '6.4',
        item: 'Non-sheathed cables protected by conduit/ducting',
        regulation: 'BS 7671:2018+A2:2022 - 521.10.1, 522.3.1',
        outcome: 'acceptable'
      },
      {
        id: '6.5',
        number: '6.5',
        item: 'Condition of accessories',
        regulation: 'BS 7671:2018+A2:2022 - 526.3, 553.1.201',
        outcome: 'acceptable'
      }
    ]
  },
  {
    id: 'section-7',
    number: '7',
    title: 'Condition of accessories and equipment',
    description: 'Visual inspection of electrical accessories and fixed equipment',
    regulation: 'BS 7671:2018+A2:2022 - Chapter 55',
    isComplete: false,
    items: [
      {
        id: '7.1',
        number: '7.1',
        item: 'Socket outlets and similar accessories',
        regulation: 'BS 7671:2018+A2:2022 - 553.1.201, 553.1.7',
        outcome: 'acceptable'
      },
      {
        id: '7.2',
        number: '7.2',
        item: 'Lighting points and switches',
        regulation: 'BS 7671:2018+A2:2022 - 559.5.1, 559.6.1.1',
        outcome: 'acceptable'
      },
      {
        id: '7.3',
        number: '7.3',
        item: 'Other equipment',
        regulation: 'BS 7671:2018+A2:2022 - 134.1.1, 422.3.1',
        outcome: 'acceptable'
      },
      {
        id: '7.4',
        number: '7.4',
        item: 'Flexible cords and their connections',
        regulation: 'BS 7671:2018+A2:2022 - 526.9.1, 553.1.201',
        outcome: 'acceptable'
      }
    ]
  },
  {
    id: 'section-8',
    number: '8',
    title: 'Method of connection of conductors',
    description: 'Assessment of conductor terminations and connections',
    regulation: 'BS 7671:2018+A2:2022 - Chapter 52',
    isComplete: false,
    items: [
      {
        id: '8.1',
        number: '8.1',
        item: 'Connections of conductors',
        regulation: 'BS 7671:2018+A2:2022 - 526.1, 526.3',
        outcome: 'acceptable'
      },
      {
        id: '8.2',
        number: '8.2',
        item: 'Correct connection of single pole devices',
        regulation: 'BS 7671:2018+A2:2022 - 132.14.1, 537.1.2',
        outcome: 'acceptable'
      },
      {
        id: '8.3',
        number: '8.3',
        item: 'Correct polarity',
        regulation: 'BS 7671:2018+A2:2022 - 612.6, 612.7',
        outcome: 'acceptable'
      },
      {
        id: '8.4',
        number: '8.4',
        item: 'Adequacy of connections',
        regulation: 'BS 7671:2018+A2:2022 - 526.1, 526.3',
        outcome: 'acceptable'
      }
    ]
  },
  {
    id: 'section-9',
    number: '9',
    title: 'Provision for disconnection of supply',
    description: 'Assessment of supply disconnection and isolation facilities',
    regulation: 'BS 7671:2018+A2:2022 - Chapter 53',
    isComplete: false,
    items: [
      {
        id: '9.1',
        number: '9.1',
        item: 'Presence of main switch',
        regulation: 'BS 7671:2018+A2:2022 - 537.1.4, 537.1.5',
        outcome: 'acceptable'
      },
      {
        id: '9.2',
        number: '9.2',
        item: 'Operation of switchgear',
        regulation: 'BS 7671:2018+A2:2022 - 537.2.1.1, 537.4.2.5',
        outcome: 'acceptable'
      },
      {
        id: '9.3',
        number: '9.3',
        item: 'Firefighter switches',
        regulation: 'BS 7671:2018+A2:2022 - 537.6.1, 537.6.2',
        outcome: 'acceptable'
      },
      {
        id: '9.4',
        number: '9.4',
        item: 'Emergency switching',
        regulation: 'BS 7671:2018+A2:2022 - 537.4.1.1, 537.4.2.1',
        outcome: 'acceptable'
      }
    ]
  },
  {
    id: 'section-10',
    number: '10',
    title: 'Provision of basic protective information',
    description: 'Assessment of safety documentation and labelling requirements',
    regulation: 'BS 7671:2018+A2:2022 - Chapter 51',
    isComplete: false,
    items: [
      {
        id: '10.1',
        number: '10.1',
        item: 'Presence of diagrams, instructions, circuit charts',
        regulation: 'BS 7671:2018+A2:2022 - 514.9.1, 514.15.1',
        outcome: 'acceptable'
      },
      {
        id: '10.2',
        number: '10.2',
        item: 'Warning labels present',
        regulation: 'BS 7671:2018+A2:2022 - 514.10.1, 514.11.1',
        outcome: 'acceptable'
      },
      {
        id: '10.3',
        number: '10.3',
        item: 'Periodic inspection recommendation',
        regulation: 'BS 7671:2018+A2:2022 - 514.12.1',
        outcome: 'acceptable'
      },
      {
        id: '10.4',
        number: '10.4',
        item: 'Schedule of test results',
        regulation: 'BS 7671:2018+A2:2022 - 514.15.1, 631.1',
        outcome: 'acceptable'
      }
    ]
  }
];

// Outcome definitions for the inspection results
export const outcomeDefinitions = {
  acceptable: {
    label: 'Acceptable - No action required',
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
    borderColor: 'border-green-500/30'
  },
  not_applicable: {
    label: 'N/A - Not applicable',
    color: 'text-gray-400',
    bgColor: 'bg-gray-500/20',
    borderColor: 'border-gray-500/30'
  },
  unacceptable: {
    label: 'Unacceptable - Requires attention',
    color: 'text-red-400',
    bgColor: 'bg-red-500/20',
    borderColor: 'border-red-500/30'
  },
  limitation: {
    label: 'LIM - Limitation on inspection',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
    borderColor: 'border-blue-500/30'
  },
  c1: {
    label: 'C1 - Danger present',
    color: 'text-red-500',
    bgColor: 'bg-red-600/20',
    borderColor: 'border-red-600/30'
  },
  c2: {
    label: 'C2 - Potentially dangerous',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/20',
    borderColor: 'border-orange-500/30'
  },
  c3: {
    label: 'C3 - Improvement recommended',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/20',
    borderColor: 'border-yellow-500/30'
  }
} as const;

// Utility functions for inspection statistics and assessment
export const getInspectionStats = (sections: NumberedInspectionSection[]) => {
  const stats = {
    total: 0,
    acceptable: 0,
    not_applicable: 0,
    unacceptable: 0,
    limitation: 0,
    c1: 0,
    c2: 0,
    c3: 0
  };

  sections.forEach(section => {
    section.items.forEach(item => {
      stats.total++;
      stats[item.outcome]++;
    });
  });

  return stats;
};

export const getOverallAssessment = (sections: NumberedInspectionSection[]): 'satisfactory' | 'unsatisfactory' => {
  const hasC1OrC2 = sections.some(section =>
    section.items.some(item => item.outcome === 'c1' || item.outcome === 'c2')
  );
  
  return hasC1OrC2 ? 'unsatisfactory' : 'satisfactory';
};
