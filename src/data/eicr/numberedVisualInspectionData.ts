
export type InspectionOutcome = 'acceptable' | 'unacceptable' | 'not-verified' | 'not-applicable' | 'limitation' | 'further-investigation';

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
  isComplete?: boolean;
}

export const outcomeDefinitions = {
  'acceptable': {
    label: 'Acceptable - No defects observed',
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
    borderColor: 'border-green-500/30'
  },
  'unacceptable': {
    label: 'Unacceptable - Defect requires attention',
    color: 'text-red-400',
    bgColor: 'bg-red-500/20',
    borderColor: 'border-red-500/30'
  },
  'not-verified': {
    label: 'Not Verified - Could not verify compliance',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/20',
    borderColor: 'border-amber-500/30'
  },
  'not-applicable': {
    label: 'N/A - Not applicable to this installation',
    color: 'text-gray-400',
    bgColor: 'bg-gray-500/20',
    borderColor: 'border-gray-500/30'
  },
  'limitation': {
    label: 'Limitation - Inspection limited',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
    borderColor: 'border-blue-500/30'
  },
  'further-investigation': {
    label: 'FI - Further Investigation Required',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/20',
    borderColor: 'border-purple-500/30'
  }
};

export const numberedVisualInspectionSections: NumberedInspectionSection[] = [
  {
    id: 'section-1',
    number: '1',
    title: 'External condition of intake equipment or distributor\'s cut-out and earthing arrangement',
    description: 'Inspection of supply equipment, service head, earthing arrangements and main earthing terminal',
    regulation: 'BS 7671:2018+A2:2022 Section 411, 542',
    items: [
      {
        id: '1.1',
        number: '1.1',
        item: 'Service cable and service head',
        regulation: 'BS 7671 Section 132.8, Electricity Safety, Quality and Continuity Regulations 2002',
        outcome: 'acceptable'
      },
      {
        id: '1.2',
        number: '1.2',
        item: 'Earthing conductor connection and condition',
        regulation: 'BS 7671 Section 542.1, 542.3',
        outcome: 'acceptable'
      },
      {
        id: '1.3',
        number: '1.3',
        item: 'Earthing conductor size and identification',
        regulation: 'BS 7671 Section 542.3, Table 54.7',
        outcome: 'acceptable'
      },
      {
        id: '1.4',
        number: '1.4',
        item: 'Main earthing terminal accessibility and condition',
        regulation: 'BS 7671 Section 542.4.2',
        outcome: 'acceptable'
      }
    ]
  },
  {
    id: 'section-2',
    number: '2',
    title: 'Main switch or circuit-breaker and other equipment',
    description: 'Assessment of main isolation, protection devices and consumer unit condition',
    regulation: 'BS 7671:2018+A2:2022 Section 462, 536',
    items: [
      {
        id: '2.1',
        number: '2.1',
        item: 'Presence and adequacy of main switch',
        regulation: 'BS 7671 Section 462.1, 537.1.4',
        outcome: 'acceptable'
      },
      {
        id: '2.2',
        number: '2.2',
        item: 'Manual operation of main switch',
        regulation: 'BS 7671 Section 462.2',
        outcome: 'acceptable'
      },
      {
        id: '2.3',
        number: '2.3',
        item: 'Condition and security of consumer unit/distribution board',
        regulation: 'BS 7671 Section 421.1.201, 526.5',
        outcome: 'acceptable'
      },
      {
        id: '2.4',
        number: '2.4',
        item: 'Adequacy of working space and accessibility',
        regulation: 'BS 7671 Section 132.12, 513.1',
        outcome: 'acceptable'
      }
    ]
  },
  {
    id: 'section-3',
    number: '3',
    title: 'Condition of consumer unit(s) and distribution board(s)',
    description: 'Detailed inspection of distribution equipment including protective devices and enclosures',
    regulation: 'BS 7671:2018+A2:2022 Section 421, 526',
    items: [
      {
        id: '3.1',
        number: '3.1',
        item: 'Type and condition of protective devices',
        regulation: 'BS 7671 Section 432, 433, Chapter 53',
        outcome: 'acceptable'
      },
      {
        id: '3.2',
        number: '3.2',
        item: 'Correct type and rating of protective devices',
        regulation: 'BS 7671 Section 433.1, 435.1',
        outcome: 'acceptable'
      },
      {
        id: '3.3',
        number: '3.3',
        item: 'Condition of all connections',
        regulation: 'BS 7671 Section 526.5, 526.8',
        outcome: 'acceptable'
      },
      {
        id: '3.4',
        number: '3.4',
        item: 'Condition of enclosures and IP rating maintenance',
        regulation: 'BS 7671 Section 416.2, 526.5',
        outcome: 'acceptable'
      },
      {
        id: '3.5',
        number: '3.5',
        item: 'Presence and condition of barriers and obstacles',
        regulation: 'BS 7671 Section 416.2, 417.2',
        outcome: 'acceptable'
      }
    ]
  },
  {
    id: 'section-4',
    number: '4',
    title: 'Condition of cables with regard to routing, selection, erection, support, protection, condition and termination',
    description: 'Assessment of cable installation methods, support systems and termination quality',
    regulation: 'BS 7671:2018+A2:2022 Chapter 52',
    items: [
      {
        id: '4.1',
        number: '4.1',
        item: 'Cables suitably supported throughout their run',
        regulation: 'BS 7671 Section 522.8.5, Table 4A2',
        outcome: 'acceptable'
      },
      {
        id: '4.2',
        number: '4.2',
        item: 'Cables protected against mechanical damage',
        regulation: 'BS 7671 Section 522.6, 522.8.1',
        outcome: 'acceptable'
      },
      {
        id: '4.3',
        number: '4.3',
        item: 'Cables routed to avoid adverse environmental conditions',
        regulation: 'BS 7671 Section 522.2, 522.3',
        outcome: 'acceptable'
      },
      {
        id: '4.4',
        number: '4.4',
        item: 'Condition of cable insulation and sheathing',
        regulation: 'BS 7671 Section 526.4',
        outcome: 'acceptable'
      },
      {
        id: '4.5',
        number: '4.5',
        item: 'Adequacy of cable terminations',
        regulation: 'BS 7671 Section 526.8, 526.9',
        outcome: 'acceptable'
      }
    ]
  },
  {
    id: 'section-5',
    number: '5',
    title: 'Condition of accessories and current-using equipment',
    description: 'Inspection of sockets, switches, luminaires and other electrical accessories',
    regulation: 'BS 7671:2018+A2:2022 Section 55, Chapter 42',
    items: [
      {
        id: '5.1',
        number: '5.1',
        item: 'Sockets, switches and control equipment securely fixed',
        regulation: 'BS 7671 Section 553.1.5',
        outcome: 'acceptable'
      },
      {
        id: '5.2',
        number: '5.2',
        item: 'Condition of accessories and faceplates',
        regulation: 'BS 7671 Section 416.2.1',
        outcome: 'acceptable'
      },
      {
        id: '5.3',
        number: '5.3',
        item: 'Suitability of accessories for environment',
        regulation: 'BS 7671 Section 512.2, Appendix 5',
        outcome: 'acceptable'
      },
      {
        id: '5.4',
        number: '5.4',
        item: 'Condition of flexible cords and their termination',
        regulation: 'BS 7671 Section 521.9, 526.8',
        outcome: 'acceptable'
      }
    ]
  },
  {
    id: 'section-6',
    number: '6',
    title: 'Condition of protective bonding conductors',
    description: 'Assessment of main and supplementary protective bonding arrangements',
    regulation: 'BS 7671:2018+A2:2022 Section 411.3.1.2, 544',
    items: [
      {
        id: '6.1',
        number: '6.1',
        item: 'Presence of main protective bonding conductors',
        regulation: 'BS 7671 Section 411.3.1.2, 544.1.1',
        outcome: 'acceptable'
      },
      {
        id: '6.2',
        number: '6.2',
        item: 'Adequacy of main bonding conductor size',
        regulation: 'BS 7671 Section 544.1.1, Table 54.8',
        outcome: 'acceptable'
      },
      {
        id: '6.3',
        number: '6.3',
        item: 'Condition and security of bonding connections',
        regulation: 'BS 7671 Section 544.1.2, 526.3',
        outcome: 'acceptable'
      },
      {
        id: '6.4',
        number: '6.4',
        item: 'Presence of supplementary bonding where required',
        regulation: 'BS 7671 Section 415.2, 544.2',
        outcome: 'acceptable'
      }
    ]
  },
  {
    id: 'section-7',
    number: '7',
    title: 'Condition of earthing arrangements for any equipment within the installation',
    description: 'Inspection of circuit protective conductors and earthing connections',
    regulation: 'BS 7671:2018+A2:2022 Section 411, 543',
    items: [
      {
        id: '7.1',
        number: '7.1',
        item: 'Presence and condition of circuit protective conductors',
        regulation: 'BS 7671 Section 411.3.1.1, 543.1',
        outcome: 'acceptable'
      },
      {
        id: '7.2',
        number: '7.2',
        item: 'Adequacy of earthing conductor connections',
        regulation: 'BS 7671 Section 543.3.1',
        outcome: 'acceptable'
      },
      {
        id: '7.3',
        number: '7.3',
        item: 'Condition of exposed-conductive-parts connections',
        regulation: 'BS 7671 Section 411.3.1.1',
        outcome: 'acceptable'
      },
      {
        id: '7.4',
        number: '7.4',
        item: 'Earthing of Class I equipment',
        regulation: 'BS 7671 Section 411.3.3, 543.2.1',
        outcome: 'acceptable'
      }
    ]
  },
  {
    id: 'section-8',
    number: '8',
    title: 'Adequacy of working space and accessibility to equipment',
    description: 'Assessment of access requirements for operation and maintenance',
    regulation: 'BS 7671:2018+A2:2022 Section 132.12, 513.1',
    items: [
      {
        id: '8.1',
        number: '8.1',
        item: 'Adequate working space around electrical equipment',
        regulation: 'BS 7671 Section 132.12, 513.1',
        outcome: 'acceptable'
      },
      {
        id: '8.2',
        number: '8.2',
        item: 'Clear access to operate and maintain equipment',
        regulation: 'BS 7671 Section 132.12',
        outcome: 'acceptable'
      },
      {
        id: '8.3',
        number: '8.3',
        item: 'Adequate illumination of electrical areas',
        regulation: 'BS 7671 Section 513.1',
        outcome: 'acceptable'
      }
    ]
  },
  {
    id: 'section-9',
    number: '9',
    title: 'Presence and adequacy of danger notices and labels',
    description: 'Verification of warning signs, labels and identification requirements',
    regulation: 'BS 7671:2018+A2:2022 Section 514',
    items: [
      {
        id: '9.1',
        number: '9.1',
        item: 'Presence of main earthing and bonding labels',
        regulation: 'BS 7671 Section 514.13.1',
        outcome: 'acceptable'
      },
      {
        id: '9.2',
        number: '9.2',
        item: 'RCD test notice at or near consumer unit',
        regulation: 'BS 7671 Section 514.12.2',
        outcome: 'acceptable'
      },
      {
        id: '9.3',
        number: '9.3',
        item: 'Circuit identification and labelling',
        regulation: 'BS 7671 Section 514.8, 514.9',
        outcome: 'acceptable'
      },
      {
        id: '9.4',
        number: '9.4',
        item: 'Warning notices for voltage and isolation',
        regulation: 'BS 7671 Section 514.10, 514.11',
        outcome: 'acceptable'
      },
      {
        id: '9.5',
        number: '9.5',
        item: 'Presence of electrical installation certificate',
        regulation: 'BS 7671 Section 631.1, Appendix 6',
        outcome: 'acceptable'
      }
    ]
  },
  {
    id: 'section-10',
    number: '10',
    title: 'Presence and adequacy of diagrams, instructions and similar information',
    description: 'Verification of required documentation and schematic information',
    regulation: 'BS 7671:2018+A2:2022 Section 514.5, 514.9',
    items: [
      {
        id: '10.1',
        number: '10.1',
        item: 'Presence of installation schematic diagram',
        regulation: 'BS 7671 Section 514.5.1',
        outcome: 'acceptable'
      },
      {
        id: '10.2',
        number: '10.2',
        item: 'Circuit chart readily available at consumer unit',
        regulation: 'BS 7671 Section 514.9.1',
        outcome: 'acceptable'
      },
      {
        id: '10.3',
        number: '10.3',
        item: 'Operating instructions for equipment',
        regulation: 'BS 7671 Section 514.5.2',
        outcome: 'acceptable'
      },
      {
        id: '10.4',
        number: '10.4',
        item: 'Emergency switching information',
        regulation: 'BS 7671 Section 514.11.1',
        outcome: 'acceptable'
      }
    ]
  }
];

export const getInspectionStats = (sections: NumberedInspectionSection[]) => {
  const stats = {
    total: 0,
    acceptable: 0,
    unacceptable: 0,
    'not-verified': 0,
    'not-applicable': 0,
    limitation: 0,
    'further-investigation': 0
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
  const hasUnacceptable = sections.some(section => 
    section.items.some(item => item.outcome === 'unacceptable')
  );
  
  return hasUnacceptable ? 'unsatisfactory' : 'satisfactory';
};
