
// Official EICR Numbered Visual Inspection Data
// Based on BS 7671:2018+A3:2024 Schedule of Inspections

export type InspectionOutcome = 'acceptable' | 'c1' | 'c2' | 'c3' | 'not_verified' | 'limitation' | 'not_applicable';

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
  acceptable: {
    label: 'Acceptable - ✓',
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
  not_verified: {
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
  not_applicable: {
    label: 'N/A - Not Applicable',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
    borderColor: 'border-blue-500/30'
  }
};

export const numberedVisualInspectionSections: NumberedInspectionSection[] = [
  {
    id: 'section-1',
    number: '1',
    title: 'EXTERNAL CONDITION OF INTAKE EQUIPMENT OR GENERATOR',
    description: 'Visual inspection of external electrical intake equipment',
    regulation: 'BS 7671:2018+A2:2022 Section 514',
    items: [
      {
        id: '1.1',
        number: '1.1',
        item: 'Service head',
        regulation: 'BS 7671 Section 444',
        outcome: 'acceptable'
      },
      {
        id: '1.2',
        number: '1.2',
        item: 'Earthing conductor',
        regulation: 'BS 7671 Section 544',
        outcome: 'acceptable'
      },
      {
        id: '1.3',
        number: '1.3',
        item: 'Earthing conductor connection',
        regulation: 'BS 7671 Section 544.1',
        outcome: 'acceptable'
      },
      {
        id: '1.4',
        number: '1.4',
        item: 'Earthing conductor identification',
        regulation: 'BS 7671 Section 514.3',
        outcome: 'acceptable'
      }
    ]
  },
  {
    id: 'section-2',
    number: '2',
    title: 'PARALLEL OR SWITCHED ALTERNATIVE SOURCES OF SUPPLY',
    description: 'Inspection of alternative supply arrangements',
    regulation: 'BS 7671:2018+A2:2022 Section 551',
    items: [
      {
        id: '2.1',
        number: '2.1',
        item: 'Adequate arrangements where multiple sources of supply exist',
        regulation: 'BS 7671 Section 551.4',
        outcome: 'acceptable'
      }
    ]
  },
  {
    id: 'section-3',
    number: '3',
    title: 'AUTOMATIC DISCONNECTION OF SUPPLY',
    description: 'Verification of protective measures',
    regulation: 'BS 7671:2018+A2:2022 Section 411',
    items: [
      {
        id: '3.1',
        number: '3.1',
        item: 'Presence of earthing conductor',
        regulation: 'BS 7671 Section 411.3.1.1',
        outcome: 'acceptable'
      },
      {
        id: '3.2',
        number: '3.2',
        item: 'Presence of circuit protective conductors',
        regulation: 'BS 7671 Section 411.3.1.1',
        outcome: 'acceptable'
      },
      {
        id: '3.3',
        number: '3.3',
        item: 'Presence of main equipotential bonding conductors',
        regulation: 'BS 7671 Section 411.3.1.2',
        outcome: 'acceptable'
      },
      {
        id: '3.4',
        number: '3.4',
        item: 'Presence of supplementary equipotential bonding conductors',
        regulation: 'BS 7671 Section 415.2',
        outcome: 'acceptable'
      },
      {
        id: '3.5',
        number: '3.5',
        item: 'Presence of earthing arrangements for combined protective and functional purposes',
        regulation: 'BS 7671 Section 543.6',
        outcome: 'acceptable'
      },
      {
        id: '3.6',
        number: '3.6',
        item: 'Presence of adequate arrangements where IT system used',
        regulation: 'BS 7671 Section 411.6',
        outcome: 'acceptable'
      }
    ]
  },
  {
    id: 'section-4',
    number: '4',
    title: 'OTHER PROTECTIVE MEASURES',
    description: 'Additional protective measures verification',
    regulation: 'BS 7671:2018+A2:2022 Sections 412-418',
    items: [
      {
        id: '4.1',
        number: '4.1',
        item: 'Presence of obstacles',
        regulation: 'BS 7671 Section 417',
        outcome: 'acceptable'
      },
      {
        id: '4.2',
        number: '4.2',
        item: 'Placing out of reach',
        regulation: 'BS 7671 Section 417',
        outcome: 'acceptable'
      },
      {
        id: '4.3',
        number: '4.3',
        item: 'Non-conducting location',
        regulation: 'BS 7671 Section 418',
        outcome: 'acceptable'
      },
      {
        id: '4.4',
        number: '4.4',
        item: 'Earth-free local equipotential bonding',
        regulation: 'BS 7671 Section 418',
        outcome: 'acceptable'
      },
      {
        id: '4.5',
        number: '4.5',
        item: 'Electrical separation',
        regulation: 'BS 7671 Section 413',
        outcome: 'acceptable'
      }
    ]
  },
  {
    id: 'section-5',
    number: '5',
    title: 'DISTRIBUTION EQUIPMENT',
    description: 'Consumer units, distribution boards and switchgear',
    regulation: 'BS 7671:2018+A2:2022 Section 530',
    items: [
      {
        id: '5.1',
        number: '5.1',
        item: 'Adequate access to switchgear',
        regulation: 'BS 7671 Section 132.12',
        outcome: 'acceptable'
      },
      {
        id: '5.2',
        number: '5.2',
        item: 'Adequate working space/access to equipment',
        regulation: 'BS 7671 Section 132.12',
        outcome: 'acceptable'
      },
      {
        id: '5.3',
        number: '5.3',
        item: 'Particular protective measures for special installations and locations',
        regulation: 'BS 7671 Part 7',
        outcome: 'acceptable'
      },
      {
        id: '5.4',
        number: '5.4',
        item: 'Enclosures suitable for external influences',
        regulation: 'BS 7671 Section 512.2',
        outcome: 'acceptable'
      },
      {
        id: '5.5',
        number: '5.5',
        item: 'Compatibility of equipment',
        regulation: 'BS 7671 Section 512.1',
        outcome: 'acceptable'
      },
      {
        id: '5.6',
        number: '5.6',
        item: 'Single-pole switching or control in line conductor only',
        regulation: 'BS 7671 Section 132.14.1',
        outcome: 'acceptable'
      },
      {
        id: '5.7',
        number: '5.7',
        item: 'Protection against mechanical damage',
        regulation: 'BS 7671 Section 522.6',
        outcome: 'acceptable'
      },
      {
        id: '5.8',
        number: '5.8',
        item: 'Protection against effects of moisture',
        regulation: 'BS 7671 Section 512.2',
        outcome: 'acceptable'
      },
      {
        id: '5.9',
        number: '5.9',
        item: 'Protection against corrosion',
        regulation: 'BS 7671 Section 512.2',
        outcome: 'acceptable'
      },
      {
        id: '5.10',
        number: '5.10',
        item: 'Adequate arrangements for disconnection of installation or part thereof',
        regulation: 'BS 7671 Section 537.1',
        outcome: 'acceptable'
      },
      {
        id: '5.11',
        number: '5.11',
        item: 'Adequate arrangements for isolation',
        regulation: 'BS 7671 Section 537.2',
        outcome: 'acceptable'
      },
      {
        id: '5.12',
        number: '5.12',
        item: 'RCD provided for fault protection',
        regulation: 'BS 7671 Section 411.4',
        outcome: 'acceptable'
      },
      {
        id: '5.13',
        number: '5.13',
        item: 'RCD provided for additional protection',
        regulation: 'BS 7671 Section 415.1',
        outcome: 'acceptable'
      },
      {
        id: '5.14',
        number: '5.14',
        item: 'Correct identification of circuits, fuses, switches, terminals',
        regulation: 'BS 7671 Section 514.8',
        outcome: 'acceptable'
      },
      {
        id: '5.15',
        number: '5.15',
        item: 'Presence of diagrams, instructions, circuit charts and similar information',
        regulation: 'BS 7671 Section 514.9',
        outcome: 'acceptable'
      },
      {
        id: '5.16',
        number: '5.16',
        item: 'Presence of warning notice - isolation',
        regulation: 'BS 7671 Section 514.11',
        outcome: 'acceptable'
      },
      {
        id: '5.17',
        number: '5.17',
        item: 'Presence of warning notice - earthing and bonding connections',
        regulation: 'BS 7671 Section 514.13.1',
        outcome: 'acceptable'
      },
      {
        id: '5.18',
        number: '5.18',
        item: 'Presence of warning notice - alternative supplies',
        regulation: 'BS 7671 Section 514.15',
        outcome: 'acceptable'
      },
      {
        id: '5.19',
        number: '5.19',
        item: 'Presence of warning notice - nominal voltage',
        regulation: 'BS 7671 Section 514.10',
        outcome: 'acceptable'
      },
      {
        id: '5.20',
        number: '5.20',
        item: 'Presence of warning notice - periodic inspection and testing',
        regulation: 'BS 7671 Section 514.12.1',
        outcome: 'acceptable'
      },
      {
        id: '5.21',
        number: '5.21',
        item: 'Presence of warning notice - RCD quarterly testing',
        regulation: 'BS 7671 Section 514.12.2',
        outcome: 'acceptable'
      },
      {
        id: '5.22',
        number: '5.22',
        item: 'Presence of warning notice - non-standard colours',
        regulation: 'BS 7671 Section 514.14',
        outcome: 'acceptable'
      },
      {
        id: '5.23',
        number: '5.23',
        item: 'Presence of fire barriers, suitable seals and protection against thermal effects',
        regulation: 'BS 7671 Section 527',
        outcome: 'acceptable'
      },
      {
        id: '5.24',
        number: '5.24',
        item: 'Band II circuits separated from Band I circuits',
        regulation: 'BS 7671 Section 528.1',
        outcome: 'acceptable'
      }
    ]
  },
  {
    id: 'section-6',
    number: '6',
    title: 'FINAL CIRCUITS',
    description: 'Final circuit wiring and accessories',
    regulation: 'BS 7671:2018+A2:2022 Chapter 52',
    items: [
      {
        id: '6.1',
        number: '6.1',
        item: 'Identification of conductors',
        regulation: 'BS 7671 Section 514.3',
        outcome: 'acceptable'
      },
      {
        id: '6.2',
        number: '6.2',
        item: 'Cables correctly supported throughout their run',
        regulation: 'BS 7671 Section 522.8',
        outcome: 'acceptable'
      },
      {
        id: '6.3',
        number: '6.3',
        item: 'Condition of insulation of live parts',
        regulation: 'BS 7671 Section 416.1',
        outcome: 'acceptable'
      },
      {
        id: '6.4',
        number: '6.4',
        item: 'Non-sheathed cables protected by enclosure in conduit, ducting or trunking',
        regulation: 'BS 7671 Section 521.10.1',
        outcome: 'acceptable'
      },
      {
        id: '6.5',
        number: '6.5',
        item: 'Adequate protection against mechanical damage',
        regulation: 'BS 7671 Section 522.6',
        outcome: 'acceptable'
      },
      {
        id: '6.6',
        number: '6.6',
        item: 'Cables installed in prescribed zones',
        regulation: 'BS 7671 Section 522.6.202',
        outcome: 'acceptable'
      },
      {
        id: '6.7',
        number: '6.7',
        item: 'Cables concealed under floors, above ceilings or in walls/partitions suitably protected against damage',
        regulation: 'BS 7671 Section 522.6.203',
        outcome: 'acceptable'
      },
      {
        id: '6.8',
        number: '6.8',
        item: 'Provision of additional protection by 30mA RCD for socket-outlets',
        regulation: 'BS 7671 Section 411.3.3',
        outcome: 'acceptable'
      },
      {
        id: '6.9',
        number: '6.9',
        item: 'Provision of additional protection by 30mA RCD for mobile equipment outdoors',
        regulation: 'BS 7671 Section 411.3.3',
        outcome: 'acceptable'
      },
      {
        id: '6.10',
        number: '6.10',
        item: 'Provision of additional protection by 30mA RCD for cables concealed in walls',
        regulation: 'BS 7671 Section 522.6.202',
        outcome: 'acceptable'
      }
    ]
  },
  {
    id: 'section-7',
    number: '7',
    title: 'LOCATION(S) CONTAINING A BATH OR SHOWER',
    description: 'Special requirements for bathroom installations',
    regulation: 'BS 7671:2018+A2:2022 Section 701',
    items: [
      {
        id: '7.1',
        number: '7.1',
        item: 'Appropriate IP rating',
        regulation: 'BS 7671 Section 701.512.2',
        outcome: 'acceptable'
      },
      {
        id: '7.2',
        number: '7.2',
        item: 'Circuits comply with requirements for the respective zones',
        regulation: 'BS 7671 Section 701.512',
        outcome: 'acceptable'
      },
      {
        id: '7.3',
        number: '7.3',
        item: 'Supplementary equipotential bonding',
        regulation: 'BS 7671 Section 701.415.2',
        outcome: 'acceptable'
      }
    ]
  },
  {
    id: 'section-8',
    number: '8',
    title: 'OTHER SPECIAL INSTALLATIONS OR LOCATIONS',
    description: 'Additional special location requirements',
    regulation: 'BS 7671:2018+A2:2022 Part 7',
    items: [
      {
        id: '8.1',
        number: '8.1',
        item: 'Appropriate to the particular requirements',
        regulation: 'BS 7671 Part 7',
        outcome: 'acceptable'
      }
    ]
  },
  {
    id: 'section-9',
    number: '9',
    title: 'GENERAL',
    description: 'General installation requirements',
    regulation: 'BS 7671:2018+A2:2022 Various',
    items: [
      {
        id: '9.1',
        number: '9.1',
        item: 'Accessories and equipment properly fixed and secure',
        regulation: 'BS 7671 Section 134.1.1',
        outcome: 'acceptable'
      },
      {
        id: '9.2',
        number: '9.2',
        item: 'Suitability of accessories and equipment for external influences',
        regulation: 'BS 7671 Section 512.2',
        outcome: 'acceptable'
      },
      {
        id: '9.3',
        number: '9.3',
        item: 'Adequacy of working space/accessibility to equipment',
        regulation: 'BS 7671 Section 132.12',
        outcome: 'acceptable'
      },
      {
        id: '9.4',
        number: '9.4',
        item: 'Presence of danger notices and other warning notices',
        regulation: 'BS 7671 Section 514.10',
        outcome: 'acceptable'
      },
      {
        id: '9.5',
        number: '9.5',
        item: 'Presence of diagrams, instructions, circuit charts and similar information',
        regulation: 'BS 7671 Section 514.9',
        outcome: 'acceptable'
      },
      {
        id: '9.6',
        number: '9.6',
        item: 'Erection methods used',
        regulation: 'BS 7671 Chapter 52',
        outcome: 'acceptable'
      }
    ]
  },
  {
    id: 'section-10',
    number: '10',
    title: 'CONDITION REPORT INSPECTION',
    description: 'Specific EICR inspection requirements',
    regulation: 'BS 7671:2018+A2:2022 Appendix 6',
    items: [
      {
        id: '10.1',
        number: '10.1',
        item: 'Connection of conductors',
        regulation: 'BS 7671 Section 526',
        outcome: 'acceptable'
      },
      {
        id: '10.2',
        number: '10.2',
        item: 'Condition of accessories including socket-outlets, isolation and switching devices',
        regulation: 'BS 7671 Section 543.3',
        outcome: 'acceptable'
      },
      {
        id: '10.3',
        number: '10.3',
        item: 'Condition of wiring systems including cables and conductors',
        regulation: 'BS 7671 Chapter 52',
        outcome: 'acceptable'
      }
    ]
  }
];

// Utility functions for statistics and assessment
export const getInspectionStats = (sections: NumberedInspectionSection[]) => {
  const stats = {
    acceptable: 0,
    c1: 0,
    c2: 0,
    c3: 0,
    not_verified: 0,
    limitation: 0,
    not_applicable: 0,
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
      reason: 'Immediate danger present (C1 codes found)',
      priority: 'immediate'
    };
  }
  
  if (stats.c2 > 0) {
    return {
      status: 'unsatisfactory',
      reason: 'Potentially dangerous defects found (C2 codes)',
      priority: 'urgent'
    };
  }
  
  if (stats.c3 > 0) {
    return {
      status: 'satisfactory',
      reason: 'Installation generally satisfactory with recommendations',
      priority: 'improvement'
    };
  }
  
  return {
    status: 'satisfactory',
    reason: 'No defects found - installation satisfactory',
    priority: 'routine'
  };
};

// Export total item count for validation
export const TOTAL_INSPECTION_ITEMS = numberedVisualInspectionSections.reduce(
  (total, section) => total + section.items.length, 
  0
);

console.log(`Total numbered inspection items: ${TOTAL_INSPECTION_ITEMS}`);
