export interface Standard {
  code: string;
  title: string;
  description: string;
  scope: string;
  useCases: string[];
  keyPoints: string[];
  sections: string[];
  notes?: string;
}

export const ukElectricalStandards: Standard[] = [
  {
    code: "BS 7671:2018+A2:2022",
    title: "Requirements for Electrical Installations",
    description: "IET Wiring Regulations - 18th Edition",
    scope: "Covers design, installation, inspection and testing of electrical installations in buildings up to 1000V AC",
    useCases: [
      "Cable sizing calculations",
      "Earthing and bonding requirements", 
      "Circuit protection design",
      "Installation methods and clearances"
    ],
    keyPoints: [
      "Fundamental principles for safety",
      "Design requirements and calculations",
      "Installation methods and practices",
      "Inspection and testing procedures"
    ],
    sections: [
      "Part 4 - Protection for Safety",
      "Chapter 52 - Selection and erection of wiring systems",
      "Appendix 4 - Current-carrying capacity and voltage drop",
      "Chapter 41 - Protection against electric shock"
    ],
    notes: "Primary standard for electrical installations in the UK"
  },
  {
    code: "BS EN 60898-1:2019",
    title: "Circuit-breakers for overcurrent protection",
    description: "MCB standards, ratings and characteristics",
    scope: "Specifies requirements for AC circuit-breakers for household and similar installations",
    useCases: [
      "MCB selection and sizing",
      "Breaking capacity calculations",
      "Trip curve characteristics",
      "Installation and coordination"
    ],
    keyPoints: [
      "Breaking capacity requirements (6kA, 10kA)",
      "Trip characteristics (B, C, D curves)",
      "Rated currents and voltages",
      "Testing and performance standards"
    ],
    sections: [
      "Breaking capacity requirements",
      "Trip characteristics (B, C, D curves)", 
      "Installation and testing requirements",
      "Coordination with other devices"
    ],
    notes: "Essential for protective device selection"
  },
  {
    code: "BS EN 61008-1:2012",
    title: "Residual current operated circuit-breakers",
    description: "RCD standards and requirements",
    scope: "Covers RCDs without integral overcurrent protection for AC applications",
    useCases: [
      "RCD selection and sizing",
      "Earth fault protection",
      "Additional protection requirements",
      "Testing procedures"
    ],
    keyPoints: [
      "Trip current ratings (30mA, 100mA, 300mA)",
      "Trip time requirements (instantaneous, time-delayed)",
      "Breaking capacity specifications",
      "Testing and maintenance procedures"
    ],
    sections: [
      "Trip current ratings (30mA, 100mA, 300mA)",
      "Trip time requirements",
      "Testing procedures",
      "Installation requirements"
    ],
    notes: "Critical for earth fault protection and safety"
  },
  {
    code: "BS EN 60439-3:2004",
    title: "Low-voltage switchgear and controlgear assemblies",
    description: "Distribution boards and consumer units",
    scope: "Requirements for low-voltage switchgear assemblies intended for use by ordinary persons",
    useCases: [
      "Consumer unit design",
      "Distribution board layout",
      "Enclosure requirements",
      "Safety and accessibility"
    ],
    keyPoints: [
      "Enclosure and construction requirements",
      "Safety and accessibility standards",
      "Temperature rise limits",
      "Short-circuit and earth fault protection"
    ],
    sections: [
      "General requirements",
      "Design verification",
      "Routine tests",
      "Safety requirements"
    ],
    notes: "Applies to domestic and commercial distribution equipment"
  }
];

export const voltageDropLimits = [
  { 
    circuit: "Lighting circuits", 
    limit: "3%", 
    reference: "BS 7671 - 525.201",
    application: "All lighting installations",
    calculation: "At design current under normal conditions"
  },
  { 
    circuit: "Power circuits", 
    limit: "5%", 
    reference: "BS 7671 - 525.201",
    application: "Socket outlets and fixed equipment",
    calculation: "At design current under normal conditions"
  },
  { 
    circuit: "Fixed heating", 
    limit: "5%", 
    reference: "BS 7671 - 525.201",
    application: "Electric heating installations",
    calculation: "At design current including diversity"
  },
  { 
    circuit: "Motor circuits (starting)", 
    limit: "10%", 
    reference: "BS 7671 - 525.202",
    application: "Motor starting conditions only",
    calculation: "During starting period with starting current"
  }
];