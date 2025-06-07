export type InspectionOutcome = 'acceptable' | 'c1' | 'c2' | 'c3' | 'fi' | 'lim' | 'na';

export interface NumberedInspectionItem {
  id: string;
  number: string; // e.g., "1.1", "1.2"
  item: string;
  regulation: string;
  outcome: InspectionOutcome;
  notes?: string;
  isCritical?: boolean;
  requiresAction?: boolean;
  description?: string;
}

export interface NumberedInspectionSection {
  id: string;
  number: string; // e.g., "1.0", "2.0"
  title: string;
  description: string;
  regulation: string;
  items: NumberedInspectionItem[];
  isComplete: boolean;
}

export const numberedVisualInspectionSections: NumberedInspectionSection[] = [
  {
    id: "section-1",
    number: "1.0",
    title: "External condition of intake equipment",
    description: "Visual inspection of the external condition and suitability of intake equipment including meter tails, cut-out, and supply arrangements",
    regulation: "BS 7671:2018+A2:2022 Section 611.2",
    isComplete: false,
    items: [
      {
        id: "1.1",
        number: "1.1",
        item: "Condition and security of meter tails and supply cables",
        regulation: "BS 7671 Section 526.5",
        outcome: "acceptable"
      },
      {
        id: "1.2",
        number: "1.2", 
        item: "Condition of cut-out and service head",
        regulation: "BS 7671 Section 131.6",
        outcome: "acceptable"
      },
      {
        id: "1.3",
        number: "1.3",
        item: "Earthing and bonding arrangements at intake",
        regulation: "BS 7671 Section 544.1",
        outcome: "acceptable"
      },
      {
        id: "1.4",
        number: "1.4",
        item: "Meter installation and accessibility",
        regulation: "BS 7671 Section 132.12",
        outcome: "acceptable"
      }
    ]
  },
  {
    id: "section-2",
    number: "2.0",
    title: "Condition of main switch or circuit-breaker",
    description: "Assessment of the main switch or circuit-breaker including operation, condition and suitability",
    regulation: "BS 7671:2018+A2:2022 Section 537.1",
    isComplete: false,
    items: [
      {
        id: "2.1",
        number: "2.1",
        item: "Operation and condition of main switch",
        regulation: "BS 7671 Section 537.1.2",
        outcome: "acceptable"
      },
      {
        id: "2.2",
        number: "2.2",
        item: "Adequacy of breaking capacity and rating",
        regulation: "BS 7671 Section 432.1",
        outcome: "acceptable"
      },
      {
        id: "2.3",
        number: "2.3",
        item: "Condition of main switch connections",
        regulation: "BS 7671 Section 526.5",
        outcome: "acceptable"
      },
      {
        id: "2.4",
        number: "2.4",
        item: "Identification and labelling of main switch",
        regulation: "BS 7671 Section 514.11",
        outcome: "acceptable"
      }
    ]
  },
  {
    id: "section-3",
    number: "3.0",
    title: "Condition of consumer unit/distribution board",
    description: "Inspection of consumer unit or distribution board condition, type and suitability for the installation",
    regulation: "BS 7671:2018+A2:2022 Section 421.1.201",
    isComplete: false,
    items: [
      {
        id: "3.1",
        number: "3.1",
        item: "Type and condition of consumer unit/distribution board",
        regulation: "BS 7671 Section 421.1.201",
        outcome: "acceptable"
      },
      {
        id: "3.2",
        number: "3.2",
        item: "Condition of enclosure and IP rating suitability",
        regulation: "BS 7671 Section 416.2",
        outcome: "acceptable"
      },
      {
        id: "3.3",
        number: "3.3",
        item: "Condition of busbars and connections within board",
        regulation: "BS 7671 Section 526.5",
        outcome: "acceptable"
      },
      {
        id: "3.4",
        number: "3.4",
        item: "Adequacy of circuit identification and labelling",
        regulation: "BS 7671 Section 514.8",
        outcome: "acceptable"
      }
    ]
  },
  {
    id: "section-4",
    number: "4.0",
    title: "Condition of protective devices",
    description: "Assessment of circuit protective devices including MCBs, RCBOs, fuses and their suitability",
    regulation: "BS 7671:2018+A2:2022 Section 431",
    isComplete: false,
    items: [
      {
        id: "4.1",
        number: "4.1",
        item: "Type and rating of protective devices",
        regulation: "BS 7671 Section 431.1",
        outcome: "acceptable"
      },
      {
        id: "4.2",
        number: "4.2",
        item: "Condition and operation of circuit breakers",
        regulation: "BS 7671 Section 531.3",
        outcome: "acceptable"
      },
      {
        id: "4.3",
        number: "4.3",
        item: "Adequacy of discrimination between devices",
        regulation: "BS 7671 Section 536.1",
        outcome: "acceptable"
      },
      {
        id: "4.4",
        number: "4.4",
        item: "Condition of fuse carriers and fuses",
        regulation: "BS 7671 Section 533.1",
        outcome: "acceptable"
      }
    ]
  },
  {
    id: "section-5",
    number: "5.0",
    title: "Condition of accessories and switchgear",
    description: "Inspection of switches, socket outlets and other electrical accessories for condition and suitability",
    regulation: "BS 7671:2018+A2:2022 Section 553",
    isComplete: false,
    items: [
      {
        id: "5.1",
        number: "5.1",
        item: "Condition and security of socket outlets",
        regulation: "BS 7671 Section 553.1",
        outcome: "acceptable"
      },
      {
        id: "5.2",
        number: "5.2",
        item: "Condition and operation of switches and control equipment",
        regulation: "BS 7671 Section 537.1",
        outcome: "acceptable"
      },
      {
        id: "5.3",
        number: "5.3",
        item: "Condition of joint boxes and junction points",
        regulation: "BS 7671 Section 526.3",
        outcome: "acceptable"
      },
      {
        id: "5.4",
        number: "5.4",
        item: "Presence and condition of covers and enclosures",
        regulation: "BS 7671 Section 416.2.1",
        outcome: "acceptable"
      }
    ]
  },
  {
    id: "section-6",
    number: "6.0",
    title: "Condition of wiring systems and cables",
    description: "Assessment of cable conditions, routing, support and mechanical protection arrangements",
    regulation: "BS 7671:2018+A2:2022 Section 522",
    isComplete: false,
    items: [
      {
        id: "6.1",
        number: "6.1",
        item: "Condition of cables and cable sheaths",
        regulation: "BS 7671 Section 522.1",
        outcome: "acceptable"
      },
      {
        id: "6.2",
        number: "6.2",
        item: "Adequacy of cable support and routing",
        regulation: "BS 7671 Section 522.8",
        outcome: "acceptable"
      },
      {
        id: "6.3",
        number: "6.3",
        item: "Mechanical protection of cables",
        regulation: "BS 7671 Section 522.6",
        outcome: "acceptable"
      },
      {
        id: "6.4",
        number: "6.4",
        item: "Cables routed in prescribed zones or adequately protected",
        regulation: "BS 7671 Section 522.6.202",
        outcome: "acceptable"
      }
    ]
  },
  {
    id: "section-7",
    number: "7.0",
    title: "Earthing and protective conductor arrangements",
    description: "Verification of earthing arrangements, protective conductor installations and connections",
    regulation: "BS 7671:2018+A2:2022 Section 543",
    isComplete: false,
    items: [
      {
        id: "7.1",
        number: "7.1",
        item: "Condition and adequacy of earthing conductor",
        regulation: "BS 7671 Section 543.1",
        outcome: "acceptable"
      },
      {
        id: "7.2",
        number: "7.2",
        item: "Condition of earthing conductor connections",
        regulation: "BS 7671 Section 543.3",
        outcome: "acceptable"
      },
      {
        id: "7.3",
        number: "7.3",
        item: "Adequacy of protective conductor arrangements",
        regulation: "BS 7671 Section 543.2",
        outcome: "acceptable"
      },
      {
        id: "7.4",
        number: "7.4",
        item: "Identification of protective conductors",
        regulation: "BS 7671 Section 514.3.1",
        outcome: "acceptable"
      }
    ]
  },
  {
    id: "section-8",
    number: "8.0",
    title: "Protective bonding arrangements",
    description: "Assessment of main and supplementary protective bonding conductor installations and connections",
    regulation: "BS 7671:2018+A2:2022 Section 544",
    isComplete: false,
    items: [
      {
        id: "8.1",
        number: "8.1",
        item: "Presence and condition of main protective bonding conductors",
        regulation: "BS 7671 Section 544.1.1",
        outcome: "acceptable"
      },
      {
        id: "8.2",
        number: "8.2",
        item: "Main bonding conductor connections and clamps",
        regulation: "BS 7671 Section 544.1.2",
        outcome: "acceptable"
      },
      {
        id: "8.3",
        number: "8.3",
        item: "Supplementary bonding where required",
        regulation: "BS 7671 Section 544.2",
        outcome: "acceptable"
      },
      {
        id: "8.4",
        number: "8.4",
        item: "Adequacy of bonding conductor cross-sectional areas",
        regulation: "BS 7671 Section 544.1.1",
        outcome: "acceptable"
      }
    ]
  },
  {
    id: "section-9",
    number: "9.0",
    title: "RCD/RCBO protection and operation",
    description: "Verification of residual current device installation, operation and labelling requirements",
    regulation: "BS 7671:2018+A2:2022 Section 411.3.3",
    isComplete: false,
    items: [
      {
        id: "9.1",
        number: "9.1",
        item: "Presence of RCD protection where required",
        regulation: "BS 7671 Section 411.3.3",
        outcome: "acceptable"
      },
      {
        id: "9.2",
        number: "9.2",
        item: "Correct type and rating of RCD/RCBO devices",
        regulation: "BS 7671 Section 531.3.1",
        outcome: "acceptable"
      },
      {
        id: "9.3",
        number: "9.3",
        item: "RCD test button operation and labelling",
        regulation: "BS 7671 Section 514.12.2",
        outcome: "acceptable"
      },
      {
        id: "9.4",
        number: "9.4",
        item: "Time delay coordination between RCD devices",
        regulation: "BS 7671 Section 531.2.9",
        outcome: "acceptable"
      }
    ]
  },
  {
    id: "section-10",
    number: "10.0",
    title: "Special locations (if applicable)",
    description: "Additional requirements for special locations such as bathrooms, swimming pools, and other Part 7 locations",
    regulation: "BS 7671:2018+A2:2022 Part 7",
    isComplete: false,
    items: [
      {
        id: "10.1",
        number: "10.1",
        item: "Bathroom zones and IP ratings compliance",
        regulation: "BS 7671 Section 701.512.3",
        outcome: "acceptable"
      },
      {
        id: "10.2",
        number: "10.2",
        item: "Supplementary bonding in special locations",
        regulation: "BS 7671 Section 701.415.2",
        outcome: "acceptable"
      },
      {
        id: "10.3",
        number: "10.3",
        item: "RCD protection in special locations",
        regulation: "BS 7671 Section 701.411.3.3",
        outcome: "acceptable"
      },
      {
        id: "10.4",
        number: "10.4",
        item: "Electrical equipment suitability for location",
        regulation: "BS 7671 Section 701.512.1",
        outcome: "acceptable"
      }
    ]
  }
];

// Outcome definitions for inspection results
export const outcomeDefinitions = {
  acceptable: {
    label: 'Acceptable - No defects observed',
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
    borderColor: 'border-green-500/30'
  },
  c1: {
    label: 'C1 - Danger present, immediate remedial action required',
    color: 'text-red-400',
    bgColor: 'bg-red-500/20',
    borderColor: 'border-red-500/30'
  },
  c2: {
    label: 'C2 - Potentially dangerous, urgent remedial action required',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/20',
    borderColor: 'border-orange-500/30'
  },
  c3: {
    label: 'C3 - Improvement recommended',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/20',
    borderColor: 'border-yellow-500/30'
  },
  fi: {
    label: 'FI - Further investigation required',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
    borderColor: 'border-blue-500/30'
  },
  lim: {
    label: 'LIM - Limitation prevented full inspection',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/20',
    borderColor: 'border-purple-500/30'
  },
  na: {
    label: 'N/A - Not applicable',
    color: 'text-gray-400',
    bgColor: 'bg-gray-500/20',
    borderColor: 'border-gray-500/30'
  }
};

// Utility function to calculate inspection statistics
export const getInspectionStats = (sections: NumberedInspectionSection[]) => {
  const stats = {
    total: 0,
    acceptable: 0,
    c1: 0,
    c2: 0,
    c3: 0,
    fi: 0,
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

// Utility function to determine overall assessment
export const getOverallAssessment = (sections: NumberedInspectionSection[]): 'satisfactory' | 'unsatisfactory' => {
  const hasC1OrC2 = sections.some(section => 
    section.items.some(item => item.outcome === 'c1' || item.outcome === 'c2')
  );
  
  return hasC1OrC2 ? 'unsatisfactory' : 'satisfactory';
};
