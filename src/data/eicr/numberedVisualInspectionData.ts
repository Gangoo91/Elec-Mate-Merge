export type InspectionOutcome = 'satisfactory' | 'unsatisfactory' | 'not_applicable' | 'limitation' | 'acceptable' | 'na' | 'c1' | 'c2' | 'c3';

export interface NumberedInspectionItem {
  id: string;
  number: string;
  item: string;
  description: string;
  regulation?: string;
  outcome?: InspectionOutcome;
  notes?: string;
  limitationReason?: string;
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

export const outcomeDefinitions = {
  satisfactory: {
    label: 'Satisfactory',
    description: 'Installation meets current standards',
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
    borderColor: 'border-green-500/30'
  },
  unsatisfactory: {
    label: 'Unsatisfactory',
    description: 'Installation does not meet current standards',
    color: 'text-red-400',
    bgColor: 'bg-red-500/20',
    borderColor: 'border-red-500/30'
  },
  not_applicable: {
    label: 'Not Applicable',
    description: 'Item does not apply to this installation',
    color: 'text-gray-400',
    bgColor: 'bg-gray-500/20',
    borderColor: 'border-gray-500/30'
  },
  limitation: {
    label: 'Limitation',
    description: 'Assessment limited due to access or other factors',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/20',
    borderColor: 'border-yellow-500/30'
  },
  acceptable: {
    label: 'Acceptable',
    description: 'Installation condition is acceptable',
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
    borderColor: 'border-green-500/30'
  },
  na: {
    label: 'N/A',
    description: 'Not applicable to this installation',
    color: 'text-gray-400',
    bgColor: 'bg-gray-500/20',
    borderColor: 'border-gray-500/30'
  },
  c1: {
    label: 'C1 - Danger Present',
    description: 'Immediate danger requiring urgent attention',
    color: 'text-red-400',
    bgColor: 'bg-red-500/20',
    borderColor: 'border-red-500/30'
  },
  c2: {
    label: 'C2 - Potentially Dangerous',
    description: 'Potentially dangerous defect requiring improvement',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/20',
    borderColor: 'border-orange-500/30'
  },
  c3: {
    label: 'C3 - Improvement Recommended',
    description: 'Improvement recommended but not urgent',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/20',
    borderColor: 'border-yellow-500/30'
  }
};

export const getInspectionStats = (sections: NumberedInspectionSection[]) => {
  const stats = {
    satisfactory: 0,
    unsatisfactory: 0,
    not_applicable: 0,
    limitation: 0,
    acceptable: 0,
    na: 0,
    c1: 0,
    c2: 0,
    c3: 0,
    total: 0
  };

  sections.forEach(section => {
    section.items.forEach(item => {
      if (item.outcome) {
        stats[item.outcome]++;
      }
      stats.total++;
    });
  });

  return stats;
};

export const getOverallAssessment = (sections: NumberedInspectionSection[]) => {
  const stats = getInspectionStats(sections);
  
  if (stats.c1 > 0) {
    return 'unsatisfactory';
  } else if (stats.c2 > 0) {
    return 'satisfactory_with_observations';
  } else if (stats.c3 > 0) {
    return 'satisfactory_with_recommendations';
  } else {
    return 'satisfactory';
  }
};

export const numberedVisualInspectionSections: NumberedInspectionSection[] = [
  {
    id: "1.0",
    number: "1.0",
    title: "External condition of intake equipment or generator where used as a source of supply",
    description: "Assessment of external electrical supply equipment condition",
    regulation: "BS 7671:2018+A2:2022 Section 612.1",
    items: [
      {
        id: "1.1",
        number: "1.1",
        item: "Service cable",
        description: "Visual inspection of service cable condition, support and protection",
        regulation: "BS 7671:2018+A2:2022 Regulation 521.5",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      }
    ]
  },
  {
    id: "2.0", 
    number: "2.0",
    title: "Earthing conductor",
    description: "Assessment of main earthing conductor installation and condition",
    regulation: "BS 7671:2018+A2:2022 Section 542",
    items: [
      {
        id: "2.1",
        number: "2.1",
        item: "Earthing conductor connection and condition",
        description: "Visual inspection of earthing conductor connections, condition and accessibility",
        regulation: "BS 7671:2018+A2:2022 Regulation 542.3",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      },
      {
        id: "2.2",
        number: "2.2",
        item: "Earthing conductor continuity",
        description: "Assessment of earthing conductor continuity and integrity throughout installation",
        regulation: "BS 7671:2018+A2:2022 Regulation 542.4",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      }
    ]
  },
  {
    id: "3.0",
    number: "3.0",
    title: "Main equipotential bonding conductors",
    description: "Assessment of main equipotential bonding arrangements",
    regulation: "BS 7671:2018+A2:2022 Section 544",
    items: [
      {
        id: "3.1",
        number: "3.1",
        item: "Water installation pipes",
        description: "Bonding of incoming water supply pipes",
        regulation: "BS 7671:2018+A2:2022 Regulation 544.1",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      },
      {
        id: "3.2", 
        number: "3.2",
        item: "Gas installation pipes",
        description: "Bonding of incoming gas supply pipes",
        regulation: "BS 7671:2018+A2:2022 Regulation 544.1",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      },
      {
        id: "3.3",
        number: "3.3",
        item: "Oil installation pipes",
        description: "Bonding of oil supply pipes where present",
        regulation: "BS 7671:2018+A2:2022 Regulation 544.1",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      },
      {
        id: "3.4",
        number: "3.4",
        item: "Structural steelwork",
        description: "Bonding of structural steelwork where accessible",
        regulation: "BS 7671:2018+A2:2022 Regulation 544.1",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      },
      {
        id: "3.5",
        number: "3.5",
        item: "Lightning protection system",
        description: "Bonding to lightning protection system where present",
        regulation: "BS 7671:2018+A2:2022 Regulation 544.1",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      },
      {
        id: "3.6",
        number: "3.6",
        item: "Central heating and air conditioning",
        description: "Bonding of central heating and air conditioning systems",
        regulation: "BS 7671:2018+A2:2022 Regulation 544.1",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      },
      {
        id: "3.7",
        number: "3.7",
        item: "Exposed metallic parts of telecommunication cables",
        description: "Bonding of exposed metallic telecommunication cable parts",
        regulation: "BS 7671:2018+A2:2022 Regulation 544.1",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      },
      {
        id: "3.8",
        number: "3.8",
        item: "Other service pipes and ducting",
        description: "Bonding of other metallic service pipes and ducting",
        regulation: "BS 7671:2018+A2:2022 Regulation 544.1",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      }
    ]
  },
  {
    id: "4.0",
    number: "4.0",
    title: "Consumer unit(s)/distribution board(s)",
    description: "Assessment of consumer units and distribution boards",
    regulation: "BS 7671:2018+A2:2022 Section 526",
    items: [
      {
        id: "4.1",
        number: "4.1",
        item: "Adequate arrangements for isolation",
        description: "Assessment of main switch and isolation arrangements",
        regulation: "BS 7671:2018+A2:2022 Regulation 537.1",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      },
      {
        id: "4.2",
        number: "4.2",
        item: "Adequate arrangements for mechanical protection",
        description: "Assessment of enclosure mechanical protection",
        regulation: "BS 7671:2018+A2:2022 Regulation 522.6",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      },
      {
        id: "4.3",
        number: "4.3",
        item: "Condition of enclosure in terms of IP rating/ingress protection",
        description: "Assessment of enclosure IP rating suitability",
        regulation: "BS 7671:2018+A2:2022 Regulation 416.2",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      },
      {
        id: "4.4",
        number: "4.4",
        item: "Condition of enclosure in terms of fire rating",
        description: "Assessment of enclosure fire resistance",
        regulation: "BS 7671:2018+A2:2022 Regulation 526.5",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      },
      {
        id: "4.5",
        number: "4.5",
        item: "Adequacy of access and working space",
        description: "Assessment of access for operation and maintenance",
        regulation: "BS 7671:2018+A2:2022 Regulation 513.1",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      },
      {
        id: "4.6",
        number: "4.6",
        item: "Secure fixing",
        description: "Assessment of enclosure mounting and fixing",
        regulation: "BS 7671:2018+A2:2022 Regulation 526.3",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      }
    ]
  },
  {
    id: "5.0",
    number: "5.0",
    title: "Protective devices for overcurrent protection",
    description: "Assessment of overcurrent protective devices",
    regulation: "BS 7671:2018+A2:2022 Section 433",
    items: [
      {
        id: "5.1",
        number: "5.1",
        item: "Type and rating suitable for intended use",
        description: "Assessment of protective device type and rating suitability",
        regulation: "BS 7671:2018+A2:2022 Regulation 433.1",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      },
      {
        id: "5.2",
        number: "5.2",
        item: "Condition and clear identification",
        description: "Assessment of protective device condition and labelling",
        regulation: "BS 7671:2018+A2:2022 Regulation 514.1",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      }
    ]
  },
  {
    id: "6.0",
    number: "6.0",
    title: "Protective devices for protection against electric shock",
    description: "Assessment of electric shock protection devices",
    regulation: "BS 7671:2018+A2:2022 Section 411",
    items: [
      {
        id: "6.1",
        number: "6.1",
        item: "RCD operation by test button",
        description: "Test button operation of RCD devices",
        regulation: "BS 7671:2018+A2:2022 Regulation 411.4",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      }
    ]
  },
  {
    id: "7.0",
    number: "7.0",
    title: "Isolating and switching devices",
    description: "Assessment of isolation and switching arrangements",
    regulation: "BS 7671:2018+A2:2022 Section 537",
    items: [
      {
        id: "7.1",
        number: "7.1",
        item: "Proper location",
        description: "Assessment of switch and isolator positioning",
        regulation: "BS 7671:2018+A2:2022 Regulation 537.2",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      },
      {
        id: "7.2",
        number: "7.2",
        item: "Condition and operation",
        description: "Assessment of switch and isolator operation",
        regulation: "BS 7671:2018+A2:2022 Regulation 537.1",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      },
      {
        id: "7.3",
        number: "7.3",
        item: "Correct identification",
        description: "Assessment of switch and isolator labelling",
        regulation: "BS 7671:2018+A2:2022 Regulation 514.1",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      }
    ]
  },
  {
    id: "8.0",
    number: "8.0",
    title: "Fixed current using equipment",
    description: "Assessment of fixed electrical equipment",
    regulation: "BS 7671:2018+A2:2022 Section 551",
    items: [
      {
        id: "8.1",
        number: "8.1",
        item: "Suitability for environmental conditions",
        description: "Assessment of equipment environmental suitability",
        regulation: "BS 7671:2018+A2:2022 Regulation 512.2",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      },
      {
        id: "8.2",
        number: "8.2",
        item: "Secure fixing and condition",
        description: "Assessment of equipment mounting and condition",
        regulation: "BS 7671:2018+A2:2022 Regulation 526.3",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      },
      {
        id: "8.3",
        number: "8.3",
        item: "Connection of live conductors",
        description: "Assessment of live conductor connections",
        regulation: "BS 7671:2018+A2:2022 Regulation 526.1",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      },
      {
        id: "8.4",
        number: "8.4",
        item: "Connection of protective conductors",
        description: "Assessment of protective conductor connections",
        regulation: "BS 7671:2018+A2:2022 Regulation 543.2",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      }
    ]
  },
  {
    id: "9.0",
    number: "9.0",
    title: "Flexible cables and flexible cords",
    description: "Assessment of flexible cables and cords",
    regulation: "BS 7671:2018+A2:2022 Section 521",
    items: [
      {
        id: "9.1",
        number: "9.1",
        item: "Suitability and condition",
        description: "Assessment of flexible cable suitability and condition",
        regulation: "BS 7671:2018+A2:2022 Regulation 521.7",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      },
      {
        id: "9.2",
        number: "9.2",
        item: "Connections and terminations",
        description: "Assessment of flexible cable connections",
        regulation: "BS 7671:2018+A2:2022 Regulation 526.8",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      }
    ]
  },
  {
    id: "10.0",
    number: "10.0",
    title: "Wiring systems",
    description: "Assessment of wiring systems and cable management",
    regulation: "BS 7671:2018+A2:2022 Section 521",
    items: [
      {
        id: "10.1",
        number: "10.1",
        item: "Selection of cable and conductor type for current-carrying capacity and environmental conditions",
        description: "Assessment of cable selection for application",
        regulation: "BS 7671:2018+A2:2022 Regulation 512.1",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      },
      {
        id: "10.2",
        number: "10.2",
        item: "Cables and conductors correctly supported throughout their length",
        description: "Assessment of cable support systems",
        regulation: "BS 7671:2018+A2:2022 Regulation 521.10",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      },
      {
        id: "10.3",
        number: "10.3",
        item: "Non-sheathed cables protected by conduit, ducting or trunking",
        description: "Assessment of cable protection systems",
        regulation: "BS 7671:2018+A2:2022 Regulation 521.6",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      },
      {
        id: "10.4",
        number: "10.4",
        item: "Wiring system appropriate to the type and nature of installation",
        description: "Assessment of wiring system suitability",
        regulation: "BS 7671:2018+A2:2022 Regulation 521.1",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      },
      {
        id: "10.5",
        number: "10.5",
        item: "Wiring systems and finishes compatible",
        description: "Assessment of wiring system compatibility",
        regulation: "BS 7671:2018+A2:2022 Regulation 522.8",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      },
      {
        id: "10.6",
        number: "10.6",
        item: "Cables concealed in walls/partitions or underground protected against penetration by nails, screws and the like",
        description: "Assessment of concealed cable protection",
        regulation: "BS 7671:2018+A2:2022 Regulation 522.6",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      },
      {
        id: "10.7",
        number: "10.7",
        item: "Termination of cables at enclosures",
        description: "Assessment of cable termination methods",
        regulation: "BS 7671:2018+A2:2022 Regulation 526.6",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      },
      {
        id: "10.8",
        number: "10.8",
        item: "Condition of insulation of live parts",
        description: "Assessment of insulation condition",
        regulation: "BS 7671:2018+A2:2022 Regulation 416.1",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      },
      {
        id: "10.9",
        number: "10.9",
        item: "Routing of cables in prescribed zones or protected by 30mA RCD",
        description: "Assessment of cable routing compliance",
        regulation: "BS 7671:2018+A2:2022 Regulation 522.6",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      },
      {
        id: "10.10",
        number: "10.10",
        item: "Cables segregated from non-electrical services",
        description: "Assessment of cable segregation from other services",
        regulation: "BS 7671:2018+A2:2022 Regulation 528.1",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      },
      {
        id: "10.11",
        number: "10.11",
        item: "Condition of accessories including socket outlets",
        description: "Assessment of electrical accessories condition",
        regulation: "BS 7671:2018+A2:2022 Regulation 553.1",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      },
      {
        id: "10.12",
        number: "10.12",
        item: "Suitability of accessories for external influences",
        description: "Assessment of accessory environmental suitability",
        regulation: "BS 7671:2018+A2:2022 Regulation 512.2",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      },
      {
        id: "10.13",
        number: "10.13",
        item: "Single-pole switching or control devices in line conductors only",
        description: "Assessment of single pole switching arrangements",
        regulation: "BS 7671:2018+A2:2022 Regulation 537.1",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      }
    ]
  }
];

// Keep the original export for backwards compatibility
export const numberedVisualInspectionData = numberedVisualInspectionSections;
