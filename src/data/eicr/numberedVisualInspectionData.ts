
export type InspectionOutcome = 'satisfactory' | 'unsatisfactory' | 'not_applicable' | 'limitation';

export interface NumberedInspectionItem {
  id: string;
  description: string;
  outcome?: InspectionOutcome;
  notes?: string;
  limitationReason?: string;
}

export interface NumberedInspectionSection {
  id: string;
  title: string;
  description: string;
  items: NumberedInspectionItem[];
}

export const numberedVisualInspectionData: NumberedInspectionSection[] = [
  {
    id: "1.0",
    title: "External condition of intake equipment or generator where used as a source of supply",
    description: "Assessment of external electrical supply equipment condition",
    items: [
      {
        id: "1.1",
        description: "Service cable",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      }
    ]
  },
  {
    id: "2.0", 
    title: "Earthing conductor",
    description: "Assessment of main earthing conductor installation and condition",
    items: [
      {
        id: "2.1",
        description: "Earthing conductor connection and condition",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      },
      {
        id: "2.2",
        description: "Earthing conductor continuity",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      }
    ]
  },
  {
    id: "3.0",
    title: "Main equipotential bonding conductors",
    description: "Assessment of main equipotential bonding arrangements",
    items: [
      {
        id: "3.1",
        description: "Water installation pipes",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      },
      {
        id: "3.2", 
        description: "Gas installation pipes",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      },
      {
        id: "3.3",
        description: "Oil installation pipes",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      },
      {
        id: "3.4",
        description: "Structural steelwork",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      },
      {
        id: "3.5",
        description: "Lightning protection system",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      },
      {
        id: "3.6",
        description: "Central heating and air conditioning",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      },
      {
        id: "3.7",
        description: "Exposed metallic parts of telecommunication cables",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      },
      {
        id: "3.8",
        description: "Other service pipes and ducting",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      }
    ]
  },
  {
    id: "4.0",
    title: "Consumer unit(s)/distribution board(s)",
    description: "Assessment of consumer units and distribution boards",
    items: [
      {
        id: "4.1",
        description: "Adequate arrangements for isolation",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      },
      {
        id: "4.2",
        description: "Adequate arrangements for mechanical protection",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      },
      {
        id: "4.3",
        description: "Condition of enclosure in terms of IP rating/ingress protection",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      },
      {
        id: "4.4",
        description: "Condition of enclosure in terms of fire rating",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      },
      {
        id: "4.5",
        description: "Adequacy of access and working space",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      },
      {
        id: "4.6",
        description: "Secure fixing",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      }
    ]
  },
  {
    id: "5.0",
    title: "Protective devices for overcurrent protection",
    description: "Assessment of overcurrent protective devices",
    items: [
      {
        id: "5.1",
        description: "Type and rating suitable for intended use",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      },
      {
        id: "5.2",
        description: "Condition and clear identification",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      }
    ]
  },
  {
    id: "6.0",
    title: "Protective devices for protection against electric shock",
    description: "Assessment of electric shock protection devices",
    items: [
      {
        id: "6.1",
        description: "RCD operation by test button",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      }
    ]
  },
  {
    id: "7.0",
    title: "Isolating and switching devices",
    description: "Assessment of isolation and switching arrangements",
    items: [
      {
        id: "7.1",
        description: "Proper location",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      },
      {
        id: "7.2",
        description: "Condition and operation",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      },
      {
        id: "7.3",
        description: "Correct identification",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      }
    ]
  },
  {
    id: "8.0",
    title: "Fixed current using equipment",
    description: "Assessment of fixed electrical equipment",
    items: [
      {
        id: "8.1",
        description: "Suitability for environmental conditions",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      },
      {
        id: "8.2",
        description: "Secure fixing and condition",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      },
      {
        id: "8.3",
        description: "Connection of live conductors",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      },
      {
        id: "8.4",
        description: "Connection of protective conductors",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      }
    ]
  },
  {
    id: "9.0",
    title: "Flexible cables and flexible cords",
    description: "Assessment of flexible cables and cords",
    items: [
      {
        id: "9.1",
        description: "Suitability and condition",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      },
      {
        id: "9.2",
        description: "Connections and terminations",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      }
    ]
  },
  {
    id: "10.0",
    title: "Wiring systems",
    description: "Assessment of wiring systems and cable management",
    items: [
      {
        id: "10.1",
        description: "Selection of cable and conductor type for current-carrying capacity and environmental conditions",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      },
      {
        id: "10.2",
        description: "Cables and conductors correctly supported throughout their length",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      },
      {
        id: "10.3",
        description: "Non-sheathed cables protected by conduit, ducting or trunking",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      },
      {
        id: "10.4",
        description: "Wiring system appropriate to the type and nature of installation",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      },
      {
        id: "10.5",
        description: "Wiring systems and finishes compatible",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      },
      {
        id: "10.6",
        description: "Cables concealed in walls/partitions or underground protected against penetration by nails, screws and the like",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      },
      {
        id: "10.7",
        description: "Termination of cables at enclosures",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      },
      {
        id: "10.8",
        description: "Condition of insulation of live parts",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      },
      {
        id: "10.9",
        description: "Routing of cables in prescribed zones or protected by 30mA RCD",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      },
      {
        id: "10.10",
        description: "Cables segregated from non-electrical services",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      },
      {
        id: "10.11",
        description: "Condition of accessories including socket outlets",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      },
      {
        id: "10.12",
        description: "Suitability of accessories for external influences",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      },
      {
        id: "10.13",
        description: "Single-pole switching or control devices in line conductors only",
        outcome: undefined,
        notes: "",
        limitationReason: ""
      }
    ]
  }
];
