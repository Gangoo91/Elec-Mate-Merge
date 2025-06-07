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
    title: "External condition of intake equipment or overhead lines",
    description: "Visual inspection of external electrical supply equipment including overhead lines, service heads, and intake arrangements",
    regulation: "BS 7671:2018+A2:2022 Section 132.12",
    isComplete: false,
    items: [
      {
        id: "1.1",
        number: "1.1",
        item: "Service cable",
        regulation: "BS 7671 Section 132.12",
        outcome: "acceptable"
      },
      {
        id: "1.2",
        number: "1.2", 
        item: "Service head",
        regulation: "BS 7671 Section 132.12",
        outcome: "acceptable"
      },
      {
        id: "1.3",
        number: "1.3",
        item: "Earthing arrangements",
        regulation: "BS 7671 Section 526.3",
        outcome: "acceptable"
      },
      {
        id: "1.4",
        number: "1.4",
        item: "Meter tails",
        regulation: "BS 7671 Section 512.2",
        outcome: "acceptable"
      },
      {
        id: "1.5",
        number: "1.5",
        item: "Metering equipment",
        regulation: "BS 7671 Section 512.2",
        outcome: "acceptable"
      },
      {
        id: "1.6",
        number: "1.6",
        item: "Isolator (where present)",
        regulation: "BS 7671 Section 512.2",
        outcome: "acceptable"
      }
    ]
  },
  {
    id: "section-2",
    number: "2.0",
    title: "Presence of adequate arrangements for parallel or switched alternative sources (551.6, 551.7)",
    description: "Assessment of arrangements for parallel or switched alternative sources where applicable",
    regulation: "BS 7671:2018+A2:2022 Section 551",
    isComplete: false,
    items: [
      {
        id: "2.1",
        number: "2.1",
        item: "Adequate arrangements present where a generating set operates in parallel with the public supply (551.7)",
        regulation: "BS 7671 Section 551.7",
        outcome: "acceptable"
      },
      {
        id: "2.2",
        number: "2.2",
        item: "Adequate arrangements where a generating set operates in parallel with the public supply (551.7)",
        regulation: "BS 7671 Section 551.7",
        outcome: "acceptable"
      }
    ]
  },
  {
    id: "section-3",
    number: "3.0",
    title: "Automatic disconnection of supply",
    description: "Assessment of automatic disconnection arrangements and earthing systems",
    regulation: "BS 7671:2018+A2:2022 Section 411",
    isComplete: false,
    items: [
      {
        id: "3.1",
        number: "3.1",
        item: "Main earthing / bonding arrangements (411.3, Chap 54)",
        regulation: "BS 7671 Section 411.3",
        outcome: "acceptable"
      },
      {
        id: "3.2",
        number: "3.2",
        item: "Presence of distributor's earthing arrangement (542.1.2.1; 542.1.2.2), or",
        regulation: "BS 7671 Section 542.1.2",
        outcome: "acceptable"
      },
      {
        id: "3.3",
        number: "3.3",
        item: "Presence of installation earth electrode or electrode arrangement (542.1.2.3)",
        regulation: "BS 7671 Section 542.1.2.3",
        outcome: "acceptable"
      },
      {
        id: "3.4",
        number: "3.4",
        item: "Presence of earthing conductor to an earth electrode (542.3; 543.1.1)",
        regulation: "BS 7671 Section 542.3",
        outcome: "acceptable"
      },
      {
        id: "3.5",
        number: "3.5",
        item: "Adequacy of earthing conductor cross-sectional area",
        regulation: "BS 7671 Section 543.1",
        outcome: "acceptable"
      },
      {
        id: "3.6",
        number: "3.6",
        item: "Adequacy of earthing conductor connections (542.3.2)",
        regulation: "BS 7671 Section 542.3.2",
        outcome: "acceptable"
      },
      {
        id: "3.7",
        number: "3.7",
        item: "Accessibility of earthing conductor connections (543.3.2)",
        regulation: "BS 7671 Section 543.3.2",
        outcome: "acceptable"
      },
      {
        id: "3.8",
        number: "3.8",
        item: "Adequacy of main protective bonding conductor sizes (544.1)",
        regulation: "BS 7671 Section 544.1",
        outcome: "acceptable"
      },
      {
        id: "3.9",
        number: "3.9",
        item: "Adequacy and location of main protective bonding conductor connections (543.3.2; 544.1.2)",
        regulation: "BS 7671 Section 543.3.2",
        outcome: "acceptable"
      },
      {
        id: "3.10",
        number: "3.10",
        item: "Accessibility of all protective bonding connections (543.3.2)",
        regulation: "BS 7671 Section 543.3.2",
        outcome: "acceptable"
      },
      {
        id: "3.11",
        number: "3.11",
        item: "Provision of earthing / bonding labels at all appropriate locations (514.13)",
        regulation: "BS 7671 Section 514.13",
        outcome: "acceptable"
      },
      {
        id: "3.12",
        number: "3.12",
        item: "FELV requirements satisfied (411.7; 411.7.1)",
        regulation: "BS 7671 Section 411.7",
        outcome: "acceptable"
      }
    ]
  },
  {
    id: "section-4",
    number: "4.0",
    title: "Other methods of protection (where any of the methods listed below are employed details should be provided on separate sheets)",
    description: "Assessment of alternative protection methods where employed",
    regulation: "BS 7671:2018+A2:2022 Section 410",
    isComplete: false,
    items: [
      {
        id: "4.1",
        number: "4.1",
        item: "Non-conducting location (418.1)",
        regulation: "BS 7671 Section 418.1",
        outcome: "acceptable"
      },
      {
        id: "4.2",
        number: "4.2",
        item: "Earth-free local equipotential bonding (418.2)",
        regulation: "BS 7671 Section 418.2",
        outcome: "acceptable"
      },
      {
        id: "4.3",
        number: "4.3",
        item: "Electrical separation (Section 413; 418.3)",
        regulation: "BS 7671 Section 413",
        outcome: "acceptable"
      },
      {
        id: "4.4",
        number: "4.4",
        item: "Double insulation (Section 412)",
        regulation: "BS 7671 Section 412",
        outcome: "acceptable"
      },
      {
        id: "4.5",
        number: "4.5",
        item: "Reduced low voltage (Section 412)",
        regulation: "BS 7671 Section 412",
        outcome: "acceptable"
      }
    ]
  },
  {
    id: "section-5",
    number: "5.0",
    title: "Distribution equipment",
    description: "Assessment of distribution equipment condition and accessibility",
    regulation: "BS 7671:2018+A2:2022 Section 132",
    isComplete: false,
    items: [
      {
        id: "5.1",
        number: "5.1",
        item: "Adequacy of working space / accessibility to equipment (132.12; 513.1)",
        regulation: "BS 7671 Section 132.12",
        outcome: "acceptable"
      },
      {
        id: "5.2",
        number: "5.2",
        item: "Security of fixing (134.1.1)",
        regulation: "BS 7671 Section 134.1.1",
        outcome: "acceptable"
      },
      {
        id: "5.3",
        number: "5.3",
        item: "Condition of enclosures of live parts (416.1)",
        regulation: "BS 7671 Section 416.1",
        outcome: "acceptable"
      },
      {
        id: "5.4",
        number: "5.4",
        item: "Adequacy / security of barriers (416.2)",
        regulation: "BS 7671 Section 416.2",
        outcome: "acceptable"
      },
      {
        id: "5.5",
        number: "5.5",
        item: "Condition of enclosure(s) in terms of IP rating etc (416.2)",
        regulation: "BS 7671 Section 416.2",
        outcome: "acceptable"
      },
      {
        id: "5.6",
        number: "5.6",
        item: "Condition of enclosure(s) in terms of fire rating etc (421.1.6; 421.1.201; 526.5)",
        regulation: "BS 7671 Section 421.1.6",
        outcome: "acceptable"
      },
      {
        id: "5.7",
        number: "5.7",
        item: "Enclosures not damaged / deteriorated so as to impair safety (651.2)",
        regulation: "BS 7671 Section 651.2",
        outcome: "acceptable"
      },
      {
        id: "5.8",
        number: "5.8",
        item: "Presence and effectiveness of obstacles (417.2)",
        regulation: "BS 7671 Section 417.2",
        outcome: "acceptable"
      },
      {
        id: "5.9",
        number: "5.9",
        item: "Presence of main switchgear linked where required (462.1; 462.1.201; 462.2)",
        regulation: "BS 7671 Section 462.1",
        outcome: "acceptable"
      },
      {
        id: "5.10",
        number: "5.10",
        item: "Operation of main switchgear (functional check) (643.10)",
        regulation: "BS 7671 Section 643.10",
        outcome: "acceptable"
      },
      {
        id: "5.11",
        number: "5.11",
        item: "Manual operation of circuit-breakers and RCDs (643.10)",
        regulation: "BS 7671 Section 643.10",
        outcome: "acceptable"
      },
      {
        id: "5.12",
        number: "5.12",
        item: "Confirmation that integral test button / switch causes RCD(s) to trip when operated (functional check)",
        regulation: "BS 7671 Section 643.10",
        outcome: "acceptable"
      },
      {
        id: "5.13",
        number: "5.13",
        item: "RCD(s) provided for fault protection - includes RCBO(s) (411.4.204; 411.5.2; 531.2)",
        regulation: "BS 7671 Section 411.4.204",
        outcome: "acceptable"
      },
      {
        id: "5.14",
        number: "5.14",
        item: "RCD(s) provided for additional protection / requirements, where required - includes RCBOs (411.3.3; 415.1)",
        regulation: "BS 7671 Section 411.3.3",
        outcome: "acceptable"
      },
      {
        id: "5.15",
        number: "5.15",
        item: "Presence of RCD six-monthly test notice at or near equipment, where required (514.12.2)",
        regulation: "BS 7671 Section 514.12.2",
        outcome: "acceptable"
      },
      {
        id: "5.16",
        number: "5.16",
        item: "Presence of diagrams, charts or schedules at or near equipment, where required (514.9.1)",
        regulation: "BS 7671 Section 514.9.1",
        outcome: "acceptable"
      }
    ]
  },
  {
    id: "section-6",
    number: "6.0",
    title: "Final circuits",
    description: "Assessment of final circuit arrangements and protection",
    regulation: "BS 7671:2018+A2:2022 Section 521",
    isComplete: false,
    items: [
      {
        id: "6.1",
        number: "6.1",
        item: "Identification of conductors (514.3.1)",
        regulation: "BS 7671 Section 514.3.1",
        outcome: "acceptable"
      },
      {
        id: "6.2",
        number: "6.2",
        item: "Cables correctly supported throughout their run (521.10.202; 522.8.5)",
        regulation: "BS 7671 Section 521.10.202",
        outcome: "acceptable"
      },
      {
        id: "6.3",
        number: "6.3",
        item: "Condition of insulation of live parts (416.1)",
        regulation: "BS 7671 Section 416.1",
        outcome: "acceptable"
      },
      {
        id: "6.4",
        number: "6.4",
        item: "Non-sheathed cables protected by enclosure in conduit, ducting or trunking (521.10.1)",
        regulation: "BS 7671 Section 521.10.1",
        outcome: "acceptable"
      },
      {
        id: "6.5",
        number: "6.5",
        item: "Suitability of containment systems for continued use (including flexible conduit) (Section 522)",
        regulation: "BS 7671 Section 522",
        outcome: "acceptable"
      },
      {
        id: "6.6",
        number: "6.6",
        item: "Cables correctly terminated in enclosures (526)",
        regulation: "BS 7671 Section 526",
        outcome: "acceptable"
      },
      {
        id: "6.7",
        number: "6.7",
        item: "Confirmation that all conductor connections, including connections to busbars, are correctly located in their terminals (526.1)",
        regulation: "BS 7671 Section 526.1",
        outcome: "acceptable"
      },
      {
        id: "6.8",
        number: "6.8",
        item: "Examination of cables for signs of unacceptable thermal or mechanical damage / deterioration (421.1; 522.6)",
        regulation: "BS 7671 Section 421.1",
        outcome: "acceptable"
      },
      {
        id: "6.9",
        number: "6.9",
        item: "Adequacy of cables' current-carrying capacity with regard for the type and nature of installation",
        regulation: "BS 7671 Section 523",
        outcome: "acceptable"
      },
      {
        id: "6.10",
        number: "6.10",
        item: "Adequacy of protective devices: type and rated current for fault protection (411.3)",
        regulation: "BS 7671 Section 411.3",
        outcome: "acceptable"
      },
      {
        id: "6.11",
        number: "6.11",
        item: "Adequacy of protective devices: type and rated current for overload protection (433.1; 533.2.1)",
        regulation: "BS 7671 Section 433.1",
        outcome: "acceptable"
      },
      {
        id: "6.12",
        number: "6.12",
        item: "Coordination between conductors and overload protective devices (433.1; 533.2.1)",
        regulation: "BS 7671 Section 433.1",
        outcome: "acceptable"
      },
      {
        id: "6.13",
        number: "6.13",
        item: "Cable installation methods / practices with regard to the type and nature of installation and external influences (Section 522)",
        regulation: "BS 7671 Section 522",
        outcome: "acceptable"
      },
      {
        id: "6.14",
        number: "6.14",
        item: "Where exposed to direct sunlight, cable of a suitable type (522.11.1)",
        regulation: "BS 7671 Section 522.11.1",
        outcome: "acceptable"
      },
      {
        id: "6.15",
        number: "6.15",
        item: "Cables concealed under floors, above ceilings, in walls / partitions less than 50 mm from a surface, and containing metal parts",
        regulation: "BS 7671 Section 522.6.202",
        outcome: "acceptable"
      },
      {
        id: "6.16",
        number: "6.16",
        item: "Cables installed in prescribed zones and protected against mechanical damage by nails, screws and the like (Section 527)",
        regulation: "BS 7671 Section 527",
        outcome: "acceptable"
      },
      {
        id: "6.17",
        number: "6.17",
        item: "Band I cables segregated / separated from Band II cables (528.1)",
        regulation: "BS 7671 Section 528.1",
        outcome: "acceptable"
      },
      {
        id: "6.18",
        number: "6.18",
        item: "Cables segregated / separated from non-electrical services (528.3)",
        regulation: "BS 7671 Section 528.3",
        outcome: "acceptable"
      },
      {
        id: "6.19",
        number: "6.19",
        item: "Condition of circuit accessories (651.2)",
        regulation: "BS 7671 Section 651.2",
        outcome: "acceptable"
      },
      {
        id: "6.20",
        number: "6.20",
        item: "Suitability of circuit accessories for external influences (512.2)",
        regulation: "BS 7671 Section 512.2",
        outcome: "acceptable"
      },
      {
        id: "6.21",
        number: "6.21",
        item: "Single-pole switching or protective devices in line conductors only (132.14.1; 530.3.3)",
        regulation: "BS 7671 Section 132.14.1",
        outcome: "acceptable"
      },
      {
        id: "6.22",
        number: "6.22",
        item: "Adequacy of connections, including cpcs, within accessories and to fixed and stationary equipment – identify / record numbers and locations of items inspected (Section 526)",
        regulation: "BS 7671 Section 526",
        outcome: "acceptable"
      },
      {
        id: "6.23",
        number: "6.23",
        item: "Presence, operation and correct location of appropriate devices for isolation and switching (Chapter 46; Section 537)",
        regulation: "BS 7671 Chapter 46",
        outcome: "acceptable"
      },
      {
        id: "6.24",
        number: "6.24",
        item: "General condition of wiring systems (651.2)",
        regulation: "BS 7671 Section 651.2",
        outcome: "acceptable"
      },
      {
        id: "6.25",
        number: "6.25",
        item: "Presence/nature of cable insulation (522.1.1; Table 52.1)",
        regulation: "BS 7671 Section 522.1.1",
        outcome: "acceptable"
      }
    ]
  },
  {
    id: "section-7",
    number: "7.0",
    title: "Final circuits",
    description: "Assessment of final circuit arrangements and protection",
    regulation: "BS 7671:2018+A2:2022 Section 521",
    isComplete: false,
    items: [
      {
        id: "7.1",
        number: "7.1",
        item: "Identification of conductors (514.3.1)",
        regulation: "BS 7671 Section 514.3.1",
        outcome: "acceptable"
      },
      {
        id: "7.2",
        number: "7.2",
        item: "Cables correctly supported throughout their run (521.10.202; 522.8.5)",
        regulation: "BS 7671 Section 521.10.202",
        outcome: "acceptable"
      },
      {
        id: "7.3",
        number: "7.3",
        item: "Condition of insulation of live parts (416.1)",
        regulation: "BS 7671 Section 416.1",
        outcome: "acceptable"
      }
    ]
  },
  {
    id: "section-8",
    number: "8.0",
    title: "Isolation and switching",
    description: "Assessment of isolation and switching arrangements",
    regulation: "BS 7671:2018+A2:2022 Section 462",
    isComplete: false,
    items: [
      {
        id: "8.1",
        number: "8.1",
        item: "Isolators (Section 462; 537.3)",
        regulation: "BS 7671 Section 462",
        outcome: "acceptable"
      },
      {
        id: "8.2",
        number: "8.2",
        item: "Presence and condition of appropriate devices (Section 462; 537.2.7)",
        regulation: "BS 7671 Section 462",
        outcome: "acceptable"
      },
      {
        id: "8.3",
        number: "8.3",
        item: "Emergency switching / stopping (Section 465; 537.3.3)",
        regulation: "BS 7671 Section 465",
        outcome: "acceptable"
      },
      {
        id: "8.4",
        number: "8.4",
        item: "Functional switching (Section 463; 537.3.1)",
        regulation: "BS 7671 Section 463",
        outcome: "acceptable"
      }
    ]
  },
  {
    id: "section-9",
    number: "9.0",
    title: "Current-using equipment (permanently connected)",
    description: "Assessment of permanently connected current-using equipment",
    regulation: "BS 7671:2018+A2:2022 Section 421",
    isComplete: false,
    items: [
      {
        id: "9.1",
        number: "9.1",
        item: "Connection of equipment in terms of IP rating etc (416.2)",
        regulation: "BS 7671 Section 416.2",
        outcome: "acceptable"
      },
      {
        id: "9.2",
        number: "9.2",
        item: "Equipment does not constitute a fire hazard (Section 421)",
        regulation: "BS 7671 Section 421",
        outcome: "acceptable"
      },
      {
        id: "9.3",
        number: "9.3",
        item: "Enclosures not damaged/deteriorated so as to impair safety (134.1.1; 416.2; 512.2)",
        regulation: "BS 7671 Section 134.1.1",
        outcome: "acceptable"
      },
      {
        id: "9.4",
        number: "9.4",
        item: "Suitability for the environment and external influences (512.2)",
        regulation: "BS 7671 Section 512.2",
        outcome: "acceptable"
      },
      {
        id: "9.5",
        number: "9.5",
        item: "Security of fixing (134.1.1)",
        regulation: "BS 7671 Section 134.1.1",
        outcome: "acceptable"
      },
      {
        id: "9.6",
        number: "9.6",
        item: "Cable entry holes in ceiling above luminaires, sized or sealed so as to restrict the spread of fire. List number and location of luminaires inspected (separate page) (527.2)",
        regulation: "BS 7671 Section 527.2",
        outcome: "acceptable"
      },
      {
        id: "9.7",
        number: "9.7",
        item: "Recessed luminaires (downlighters)",
        regulation: "BS 7671 Section 559.3.1.1",
        outcome: "acceptable"
      }
    ]
  },
  {
    id: "section-10",
    number: "10.0",
    title: "Special installations or locations",
    description: "Assessment of special installations or locations where applicable",
    regulation: "BS 7671:2018+A2:2022 Part 7",
    isComplete: false,
    items: [
      {
        id: "10.1",
        number: "10.1",
        item: "If any special installations or locations are present, list the particular inspections applied.",
        regulation: "BS 7671 Part 7",
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
