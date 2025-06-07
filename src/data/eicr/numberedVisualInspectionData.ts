
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
  number: string; // e.g., "1", "2"
  title: string;
  description: string;
  regulation: string;
  items: NumberedInspectionItem[];
  isComplete: boolean;
}

export const numberedVisualInspectionSections: NumberedInspectionSection[] = [
  {
    id: "section-1",
    number: "1",
    title: "External Condition of Electrical Equipment",
    description: "Visual inspection of external condition and suitability of electrical equipment",
    regulation: "BS 7671:2018 Section 611.2",
    isComplete: false,
    items: [
      {
        id: "1.1",
        number: "1.1",
        item: "Adequacy of electrical equipment for the environment",
        regulation: "BS 7671 Section 512.2",
        outcome: "acceptable"
      },
      {
        id: "1.2",
        number: "1.2", 
        item: "Security of electrical equipment and enclosures",
        regulation: "BS 7671 Section 526.5",
        outcome: "acceptable"
      },
      {
        id: "1.3",
        number: "1.3",
        item: "Presence and condition of warning notices, labels and signs",
        regulation: "BS 7671 Section 514",
        outcome: "acceptable"
      },
      {
        id: "1.4",
        number: "1.4",
        item: "Presence of diagrams, instructions and similar information",
        regulation: "BS 7671 Section 514.9",
        outcome: "acceptable"
      }
    ]
  },
  {
    id: "section-2",
    number: "2",
    title: "Condition of Conductor Terminations and Connections",
    description: "Inspection of all accessible conductor terminations and connections",
    regulation: "BS 7671:2018 Section 526",
    isComplete: false,
    items: [
      {
        id: "2.1",
        number: "2.1",
        item: "Condition of conductors and cable sheaths",
        regulation: "BS 7671 Section 526.1",
        outcome: "acceptable"
      },
      {
        id: "2.2",
        number: "2.2",
        item: "Adequacy of conductor terminations",
        regulation: "BS 7671 Section 526.2",
        outcome: "acceptable"
      },
      {
        id: "2.3",
        number: "2.3",
        item: "Security of connections",
        regulation: "BS 7671 Section 526.5",
        outcome: "acceptable"
      },
      {
        id: "2.4",
        number: "2.4",
        item: "Presence of adequate strain relief",
        regulation: "BS 7671 Section 526.6",
        outcome: "acceptable"
      }
    ]
  },
  {
    id: "section-3",
    number: "3",
    title: "Identification of Conductors",
    description: "Verification of proper conductor identification throughout the installation",
    regulation: "BS 7671:2018 Section 514.3",
    isComplete: false,
    items: [
      {
        id: "3.1",
        number: "3.1",
        item: "Identification of protective conductors",
        regulation: "BS 7671 Section 514.3.1",
        outcome: "acceptable"
      },
      {
        id: "3.2",
        number: "3.2",
        item: "Identification of neutral conductors",
        regulation: "BS 7671 Section 514.3.2",
        outcome: "acceptable"
      },
      {
        id: "3.3",
        number: "3.3",
        item: "Identification of line conductors",
        regulation: "BS 7671 Section 514.3.3",
        outcome: "acceptable"
      },
      {
        id: "3.4",
        number: "3.4",
        item: "Identification of PEN conductors",
        regulation: "BS 7671 Section 514.3.4",
        outcome: "acceptable"
      }
    ]
  },
  {
    id: "section-4",
    number: "4",
    title: "Routing of Cables in Prescribed Zones or Protected Against Mechanical Damage",
    description: "Verification of cable routing compliance and mechanical protection",
    regulation: "BS 7671:2018 Section 522",
    isComplete: false,
    items: [
      {
        id: "4.1",
        number: "4.1",
        item: "Cables routed in prescribed zones",
        regulation: "BS 7671 Section 522.6.201",
        outcome: "acceptable"
      },
      {
        id: "4.2",
        number: "4.2",
        item: "Adequate mechanical protection of cables",
        regulation: "BS 7671 Section 522.6",
        outcome: "acceptable"
      },
      {
        id: "4.3",
        number: "4.3",
        item: "Protection against thermal effects",
        regulation: "BS 7671 Section 522.2",
        outcome: "acceptable"
      },
      {
        id: "4.4",
        number: "4.4",
        item: "Cables buried in walls adequately protected",
        regulation: "BS 7671 Section 522.6.202",
        outcome: "acceptable"
      }
    ]
  },
  {
    id: "section-5",
    number: "5",
    title: "Selection of Conductors for Current-carrying Capacity and Voltage Drop",
    description: "Assessment of conductor sizing adequacy for load requirements",
    regulation: "BS 7671:2018 Section 523",
    isComplete: false,
    items: [
      {
        id: "5.1",
        number: "5.1",
        item: "Adequacy of conductor current-carrying capacity",
        regulation: "BS 7671 Section 523.1",
        outcome: "acceptable"
      },
      {
        id: "5.2",
        number: "5.2",
        item: "Consideration of grouping factors",
        regulation: "BS 7671 Section 523.5",
        outcome: "acceptable"
      },
      {
        id: "5.3",
        number: "5.3",
        item: "Thermal insulation derating applied",
        regulation: "BS 7671 Section 523.9",
        outcome: "acceptable"
      },
      {
        id: "5.4",
        number: "5.4",
        item: "Voltage drop within acceptable limits",
        regulation: "BS 7671 Section 525",
        outcome: "acceptable"
      }
    ]
  },
  {
    id: "section-6",
    number: "6",
    title: "Connection of Conductors",
    description: "Inspection of conductor connections and termination methods",
    regulation: "BS 7671:2018 Section 526",
    isComplete: false,
    items: [
      {
        id: "6.1",
        number: "6.1",
        item: "Adequacy of earthing conductor connections",
        regulation: "BS 7671 Section 543.3",
        outcome: "acceptable"
      },
      {
        id: "6.2",
        number: "6.2",
        item: "Adequacy of protective bonding conductor connections",
        regulation: "BS 7671 Section 544.1",
        outcome: "acceptable"
      },
      {
        id: "6.3",
        number: "6.3",
        item: "Prevention of mutual detrimental influence",
        regulation: "BS 7671 Section 515",
        outcome: "acceptable"
      },
      {
        id: "6.4",
        number: "6.4",
        item: "Segregation of circuits",
        regulation: "BS 7671 Section 528",
        outcome: "acceptable"
      }
    ]
  },
  {
    id: "section-7",
    number: "7",
    title: "Presence of Fire Barriers, Suitable Seals and Protection Against Thermal Effects",
    description: "Assessment of fire safety measures and thermal protection",
    regulation: "BS 7671:2018 Section 527",
    isComplete: false,
    items: [
      {
        id: "7.1",
        number: "7.1",
        item: "Sealing of wiring system penetrations",
        regulation: "BS 7671 Section 527.1",
        outcome: "acceptable"
      },
      {
        id: "7.2",
        number: "7.2",
        item: "Protection against spread of fire",
        regulation: "BS 7671 Section 527.1.3",
        outcome: "acceptable"
      },
      {
        id: "7.3",
        number: "7.3",
        item: "Protection against thermal effects",
        regulation: "BS 7671 Section 421",
        outcome: "acceptable"
      },
      {
        id: "7.4",
        number: "7.4",
        item: "Presence of fire barriers",
        regulation: "BS 7671 Section 527.1.4",
        outcome: "acceptable"
      }
    ]
  },
  {
    id: "section-8",
    number: "8",
    title: "Methods of Protection Against Electric Shock",
    description: "Verification of protective measures against electric shock",
    regulation: "BS 7671:2018 Section 411",
    isComplete: false,
    items: [
      {
        id: "8.1",
        number: "8.1",
        item: "Presence of earthing conductor",
        regulation: "BS 7671 Section 411.3.1.1",
        outcome: "acceptable"
      },
      {
        id: "8.2",
        number: "8.2",
        item: "Presence of protective bonding conductors",
        regulation: "BS 7671 Section 411.3.1.2",
        outcome: "acceptable"
      },
      {
        id: "8.3",
        number: "8.3",
        item: "PELV/SELV arrangements",
        regulation: "BS 7671 Section 414",
        outcome: "acceptable"
      },
      {
        id: "8.4",
        number: "8.4",
        item: "Presence and correct type of RCD protection",
        regulation: "BS 7671 Section 411.3.3",
        outcome: "acceptable"
      }
    ]
  },
  {
    id: "section-9",
    number: "9",
    title: "Prevention of Mutual Detrimental Influence",
    description: "Assessment of electromagnetic compatibility and interference prevention",
    regulation: "BS 7671:2018 Section 515",
    isComplete: false,
    items: [
      {
        id: "9.1",
        number: "9.1",
        item: "Separation of low voltage and ELV circuits",
        regulation: "BS 7671 Section 528.1",
        outcome: "acceptable"
      },
      {
        id: "9.2",
        number: "9.2",
        item: "Separation of safety circuits",
        regulation: "BS 7671 Section 560.6.1",
        outcome: "acceptable"
      },
      {
        id: "9.3",
        number: "9.3",
        item: "Electromagnetic compatibility provisions",
        regulation: "BS 7671 Section 515.1",
        outcome: "acceptable"
      },
      {
        id: "9.4",
        number: "9.4",
        item: "Protection against overvoltage",
        regulation: "BS 7671 Section 443",
        outcome: "acceptable"
      }
    ]
  },
  {
    id: "section-10",
    number: "10",
    title: "Presence and Correct Location of Appropriate Devices for Isolation and Switching",
    description: "Verification of isolation and switching device installation",
    regulation: "BS 7671:2018 Section 537",
    isComplete: false,
    items: [
      {
        id: "10.1",
        number: "10.1",
        item: "Presence of main switch or circuit-breaker",
        regulation: "BS 7671 Section 537.1.4",
        outcome: "acceptable"
      },
      {
        id: "10.2",
        number: "10.2",
        item: "Operation of switching and isolation devices",
        regulation: "BS 7671 Section 537.2.1.1",
        outcome: "acceptable"
      },
      {
        id: "10.3",
        number: "10.3",
        item: "Correct identification and labelling of circuits",
        regulation: "BS 7671 Section 514.8",
        outcome: "acceptable"
      },
      {
        id: "10.4",
        number: "10.4",
        item: "Accessibility of isolation devices",
        regulation: "BS 7671 Section 537.2.1.2",
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
