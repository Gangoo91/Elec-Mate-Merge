
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
        item: "Condition of overhead line supports and conductors",
        regulation: "BS 7671 Section 132.12",
        outcome: "acceptable"
      },
      {
        id: "1.2",
        number: "1.2", 
        item: "Service head condition and security",
        regulation: "BS 7671 Section 132.12",
        outcome: "acceptable"
      },
      {
        id: "1.3",
        number: "1.3",
        item: "Meter tails condition and support",
        regulation: "BS 7671 Section 526.3",
        outcome: "acceptable"
      },
      {
        id: "1.4",
        number: "1.4",
        item: "External intake equipment weatherproofing",
        regulation: "BS 7671 Section 512.2",
        outcome: "acceptable"
      }
    ]
  },
  {
    id: "section-2",
    number: "2.0",
    title: "Condition of equipment, switchgear and components",
    description: "Assessment of electrical equipment condition including distribution boards, switches, and control equipment",
    regulation: "BS 7671:2018+A2:2022 Section 511",
    isComplete: false,
    items: [
      {
        id: "2.1",
        number: "2.1",
        item: "Consumer unit or distribution board condition",
        regulation: "BS 7671 Section 511.1",
        outcome: "acceptable"
      },
      {
        id: "2.2",
        number: "2.2",
        item: "Switchgear operation and condition",
        regulation: "BS 7671 Section 537.1",
        outcome: "acceptable"
      },
      {
        id: "2.3",
        number: "2.3",
        item: "Equipment mounting and fixing security",
        regulation: "BS 7671 Section 134.1.1",
        outcome: "acceptable"
      },
      {
        id: "2.4",
        number: "2.4",
        item: "Equipment suitability for environment",
        regulation: "BS 7671 Section 512.2",
        outcome: "acceptable"
      }
    ]
  },
  {
    id: "section-3",
    number: "3.0",
    title: "Condition of all conductors",
    description: "Inspection of all electrical conductors including cables, flexible cords, and conductor connections",
    regulation: "BS 7671:2018+A2:2022 Section 522",
    isComplete: false,
    items: [
      {
        id: "3.1",
        number: "3.1",
        item: "Fixed wiring conductor condition",
        regulation: "BS 7671 Section 522.1",
        outcome: "acceptable"
      },
      {
        id: "3.2",
        number: "3.2",
        item: "Flexible cord and cable condition",
        regulation: "BS 7671 Section 521.9",
        outcome: "acceptable"
      },
      {
        id: "3.3",
        number: "3.3",
        item: "Conductor support and protection",
        regulation: "BS 7671 Section 522.8",
        outcome: "acceptable"
      },
      {
        id: "3.4",
        number: "3.4",
        item: "Conductor termination condition",
        regulation: "BS 7671 Section 526.1",
        outcome: "acceptable"
      }
    ]
  },
  {
    id: "section-4",
    number: "4.0",
    title: "Condition of all accessories including socket outlets, switches and joint boxes",
    description: "Assessment of socket outlets, switches, lighting accessories, and other electrical equipment",
    regulation: "BS 7671:2018+A2:2022 Section 553",
    isComplete: false,
    items: [
      {
        id: "4.1",
        number: "4.1",
        item: "Socket outlet condition and security",
        regulation: "BS 7671 Section 553.1",
        outcome: "acceptable"
      },
      {
        id: "4.2",
        number: "4.2",
        item: "Switch and control equipment condition",
        regulation: "BS 7671 Section 537.2",
        outcome: "acceptable"
      },
      {
        id: "4.3",
        number: "4.3",
        item: "Lighting accessories and fittings",
        regulation: "BS 7671 Section 559.4",
        outcome: "acceptable"
      },
      {
        id: "4.4",
        number: "4.4",
        item: "Other electrical accessories condition",
        regulation: "BS 7671 Section 553.2",
        outcome: "acceptable"
      }
    ]
  },
  {
    id: "section-5",
    number: "5.0",
    title: "Connection of conductors",
    description: "Inspection of conductor connections, joints, and terminations throughout the installation",
    regulation: "BS 7671:2018+A2:2022 Section 526",
    isComplete: false,
    items: [
      {
        id: "5.1",
        number: "5.1",
        item: "Main switch and distribution connections",
        regulation: "BS 7671 Section 526.5",
        outcome: "acceptable"
      },
      {
        id: "5.2",
        number: "5.2",
        item: "Circuit protective device connections",
        regulation: "BS 7671 Section 526.5",
        outcome: "acceptable"
      },
      {
        id: "5.3",
        number: "5.3",
        item: "Accessory and equipment connections",
        regulation: "BS 7671 Section 526.1",
        outcome: "acceptable"
      },
      {
        id: "5.4",
        number: "5.4",
        item: "Junction box and joint connections",
        regulation: "BS 7671 Section 526.3",
        outcome: "acceptable"
      }
    ]
  },
  {
    id: "section-6",
    number: "6.0",
    title: "Identification of conductors",
    description: "Verification of proper identification, labelling, and marking of conductors and protective devices",
    regulation: "BS 7671:2018+A2:2022 Section 514",
    isComplete: false,
    items: [
      {
        id: "6.1",
        number: "6.1",
        item: "Conductor identification and colour coding",
        regulation: "BS 7671 Section 514.3",
        outcome: "acceptable"
      },
      {
        id: "6.2",
        number: "6.2",
        item: "Circuit identification and labelling",
        regulation: "BS 7671 Section 514.8",
        outcome: "acceptable"
      },
      {
        id: "6.3",
        number: "6.3",
        item: "Protective device identification",
        regulation: "BS 7671 Section 514.8",
        outcome: "acceptable"
      },
      {
        id: "6.4",
        number: "6.4",
        item: "Emergency switching identification",
        regulation: "BS 7671 Section 514.11",
        outcome: "acceptable"
      }
    ]
  },
  {
    id: "section-7",
    number: "7.0",
    title: "Single pole switching or control in line conductors only",
    description: "Verification that single pole switching and control devices are connected in line conductors only",
    regulation: "BS 7671:2018+A2:2022 Section 132.14.1",
    isComplete: false,
    items: [
      {
        id: "7.1",
        number: "7.1",
        item: "Single pole switch connections",
        regulation: "BS 7671 Section 132.14.1",
        outcome: "acceptable"
      },
      {
        id: "7.2",
        number: "7.2",
        item: "Control device pole configuration",
        regulation: "BS 7671 Section 537.2.1",
        outcome: "acceptable"
      },
      {
        id: "7.3",
        number: "7.3",
        item: "Neutral conductor switching",
        regulation: "BS 7671 Section 132.14.2",
        outcome: "acceptable"
      },
      {
        id: "7.4",
        number: "7.4",
        item: "Emergency switching arrangements",
        regulation: "BS 7671 Section 537.4",
        outcome: "acceptable"
      }
    ]
  },
  {
    id: "section-8",
    number: "8.0",
    title: "Correct connection of socket outlets, lamps and equipment",
    description: "Verification of proper connection and polarity of socket outlets, lighting, and fixed electrical equipment",
    regulation: "BS 7671:2018+A2:2022 Section 612.6",
    isComplete: false,
    items: [
      {
        id: "8.1",
        number: "8.1",
        item: "Socket outlet polarity and connections",
        regulation: "BS 7671 Section 612.6",
        outcome: "acceptable"
      },
      {
        id: "8.2",
        number: "8.2",
        item: "Lighting circuit connections and polarity",
        regulation: "BS 7671 Section 612.6",
        outcome: "acceptable"
      },
      {
        id: "8.3",
        number: "8.3",
        item: "Fixed equipment connections",
        regulation: "BS 7671 Section 554.1",
        outcome: "acceptable"
      },
      {
        id: "8.4",
        number: "8.4",
        item: "Earth terminal connections",
        regulation: "BS 7671 Section 543.3",
        outcome: "acceptable"
      }
    ]
  },
  {
    id: "section-9",
    number: "9.0",
    title: "Presence and correct connection of earthing and bonding conductors",
    description: "Assessment of earthing arrangements and main protective bonding conductor installations and connections",
    regulation: "BS 7671:2018+A2:2022 Section 544.1",
    isComplete: false,
    items: [
      {
        id: "9.1",
        number: "9.1",
        item: "Main earthing conductor presence and condition",
        regulation: "BS 7671 Section 543.1",
        outcome: "acceptable"
      },
      {
        id: "9.2",
        number: "9.2",
        item: "Main bonding conductor connections",
        regulation: "BS 7671 Section 544.1.1",
        outcome: "acceptable"
      },
      {
        id: "9.3",
        number: "9.3",
        item: "Supplementary bonding where required",
        regulation: "BS 7671 Section 544.2",
        outcome: "acceptable"
      },
      {
        id: "9.4",
        number: "9.4",
        item: "Circuit protective conductor continuity",
        regulation: "BS 7671 Section 543.2",
        outcome: "acceptable"
      }
    ]
  },
  {
    id: "section-10",
    number: "10.0",
    title: "Adequacy of arrangement for other safety services",
    description: "Assessment of safety service arrangements including emergency lighting, fire alarm systems, and other safety installations",
    regulation: "BS 7671:2018+A2:2022 Section 560",
    isComplete: false,
    items: [
      {
        id: "10.1",
        number: "10.1",
        item: "Emergency lighting system adequacy",
        regulation: "BS 7671 Section 560.7",
        outcome: "acceptable"
      },
      {
        id: "10.2",
        number: "10.2",
        item: "Fire alarm and detection systems",
        regulation: "BS 7671 Section 560.8",
        outcome: "acceptable"
      },
      {
        id: "10.3",
        number: "10.3",
        item: "Safety service supply arrangements",
        regulation: "BS 7671 Section 560.5",
        outcome: "acceptable"
      },
      {
        id: "10.4",
        number: "10.4",
        item: "Segregation of safety circuits",
        regulation: "BS 7671 Section 528.1",
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
