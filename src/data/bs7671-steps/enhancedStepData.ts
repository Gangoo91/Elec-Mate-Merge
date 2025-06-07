
export interface BS7671StepData {
  id: number;
  title: string;
  description: string;
  category: string;
  checklist: string[];
  safetyNotes: string[];
  regulations: string[];
  nextSteps: string;
  mftSettings?: {
    testType: string;
    voltage: string;
    current: string;
    duration: string;
    leads: string[];
  };
  connections?: string[];
  expectedResults?: {
    acceptable: string;
    typical: string;
    investigate: string;
  };
  troubleshooting?: {
    issue: string;
    causes: string[];
    solutions: string[];
  }[];
  systemTypes?: {
    singlePhase: string[];
    threePhase: string[];
  };
  installationTypes?: {
    domestic: string[];
    commercial: string[];
    industrial: string[];
  };
}

export const enhancedBS7671Steps: BS7671StepData[] = [
  {
    id: 1,
    title: "Initial Documentation Review",
    description: "Review all available documentation before starting any physical inspection",
    category: "Documentation",
    checklist: [
      "Check for current electrical installation certificate (EIC)",
      "Review building plans and electrical drawings",
      "Identify the type of electrical installation (domestic/commercial/industrial)",
      "Note any previous inspection reports and remedial work",
      "Check for any specific client requirements or limitations",
      "Verify the scope of inspection required (full/partial/specific circuits)",
      "Identify supply characteristics (voltage, frequency, earthing arrangement)",
      "Note any special installations (swimming pools, medical locations, etc.)"
    ],
    safetyNotes: [
      "Ensure you have permission to access all areas",
      "Note any areas that may require special safety precautions",
      "Identify any potentially dangerous substances or environments",
      "Check for any ongoing work that might affect testing"
    ],
    regulations: [
      "BS7671 Chapter 64 - Initial verification",
      "IET Guidance Note 3 - Inspection & Testing",
      "BS7671 Section 511 - Compliance with standards"
    ],
    nextSteps: "Once documentation is reviewed, proceed to external visual inspection",
    installationTypes: {
      domestic: [
        "Single-phase supply typical",
        "Consumer unit with RCD protection",
        "Basic circuits: lighting, sockets, cooker, shower"
      ],
      commercial: [
        "Three-phase supply common",
        "Distribution boards with RCBO protection",
        "Emergency lighting and fire alarm systems",
        "IT equipment and air conditioning loads"
      ],
      industrial: [
        "High voltage supplies possible",
        "Motor control centres and variable speed drives",
        "Process control and instrumentation",
        "Hazardous area classifications may apply"
      ]
    }
  },
  {
    id: 2,
    title: "Visual Inspection - External",
    description: "Conduct a thorough external visual inspection of the electrical installation",
    category: "Visual Inspection",
    checklist: [
      "Check condition of incoming supply cables and supports",
      "Inspect meter position, sealing, and accessibility",
      "Examine earthing electrode and conductor condition",
      "Check main equipotential bonding to water, gas, and structural steel",
      "Inspect external distribution boards and IP ratings",
      "Check cable entry methods and sealing",
      "Verify adequate ventilation around equipment",
      "Look for signs of unauthorized modifications"
    ],
    safetyNotes: [
      "Do not remove any supplier seals - this is illegal",
      "Take photos for documentation but respect privacy",
      "Report any obvious damage to supplier equipment immediately",
      "Be aware of overhead lines and underground cables"
    ],
    regulations: [
      "BS7671 Section 512 - Operational conditions",
      "BS7671 Section 522 - Selection and erection of wiring systems",
      "BS7671 Section 544 - Earthing arrangements"
    ],
    nextSteps: "Move to internal visual inspection of consumer units and circuits",
    systemTypes: {
      singlePhase: [
        "230V between line and neutral",
        "Single earthing conductor from electrode",
        "Simple bonding arrangements"
      ],
      threePhase: [
        "400V between lines, 230V line to neutral",
        "May have separate or common neutral",
        "More complex earthing and bonding"
      ]
    }
  },
  {
    id: 3,
    title: "Visual Inspection - Internal", 
    description: "Detailed visual inspection of internal electrical installations",
    category: "Visual Inspection",
    checklist: [
      "Inspect consumer unit/distribution board condition and labelling",
      "Check all protective devices are correctly rated for circuits",
      "Verify cable types match current carrying capacity requirements",
      "Check cable supports, routing, and protection methods",
      "Examine socket outlets, switches, and accessories",
      "Inspect lighting circuits, fittings, and control systems",
      "Check for any signs of overheating, burning, or damage",
      "Verify compliance with current BS7671 requirements",
      "Look for non-standard or dangerous practices"
    ],
    safetyNotes: [
      "Do not remove covers while installation is live",
      "Look for signs of DIY work that may not comply with regulations",
      "Note any immediate safety concerns for urgent attention",
      "Check for presence of asbestos in older installations"
    ],
    regulations: [
      "BS7671 Section 526 - Electrical connections", 
      "BS7671 Section 543 - Protective conductors",
      "BS7671 Section 521 - Selection and erection of cables"
    ],
    nextSteps: "Prepare for safe isolation before electrical testing"
  },
  {
    id: 4,
    title: "Safe Isolation Procedures",
    description: "Critical safety step - proper isolation and proving dead",
    category: "Safety Critical",
    checklist: [
      "Identify the correct isolation point for the circuits to be tested",
      "Inform all relevant parties of isolation (building occupants, security, etc.)",
      "Isolate the supply using appropriate switching device",
      "Lock off the isolation point with approved lock and tag",
      "Test voltage indicator on known live source (prove before)",
      "Test all conductors (L-N, L-E, N-E) to confirm dead",
      "Test voltage indicator again on known live source (prove after)",
      "Apply warning notices at isolation point and work area"
    ],
    safetyNotes: [
      "NEVER skip proving dead - this is life critical",
      "Use appropriate PPE at all times during isolation",
      "If in doubt about isolation, get supervision immediately", 
      "Follow your company's isolation procedures exactly",
      "Use only GS38 compliant voltage indicators and test probes"
    ],
    regulations: [
      "HSE GS38 - Electrical test equipment for use by electricians",
      "BS7671 Section 462 - Isolation and switching",
      "Electricity at Work Regulations 1989"
    ],
    nextSteps: "Begin electrical testing with continuity measurements",
    mftSettings: {
      testType: "Voltage Detection",
      voltage: "As per installation voltage",
      current: "N/A",
      duration: "Continuous until proven dead",
      leads: ["Test probes to GS38", "Voltage indicator"]
    },
    troubleshooting: [
      {
        issue: "Voltage still present after isolation",
        causes: ["Wrong isolation point", "Parallel supply", "Backfeed from other circuits"],
        solutions: ["Re-check isolation point", "Trace all supply routes", "Isolate additional sources"]
      }
    ]
  },
  {
    id: 5,
    title: "Continuity Testing (R1+R2)",
    description: "Test the continuity of protective conductors and ring circuits",
    category: "Electrical Testing",
    checklist: [
      "Set up MFT for continuity testing (low resistance ohmmeter)",
      "Null test leads to remove their resistance from measurements",
      "Test each protective conductor from consumer unit to outlet",
      "Measure R1+R2 values for each final circuit",
      "For ring circuits, test end-to-end resistance of each conductor",
      "Cross-connect ring circuits to verify continuity and detect spurs",
      "Record all measurements accurately on test schedule",
      "Compare readings with calculated values and regulatory limits"
    ],
    safetyNotes: [
      "Ensure installation remains isolated during testing",
      "Double-check test lead connections are secure",
      "Be aware of parallel paths that may affect readings",
      "Remove or isolate electronic equipment that could be damaged"
    ],
    regulations: [
      "BS7671 Section 612.2 - Continuity of protective conductors",
      "IET Guidance Note 3 - Section 10.3",
      "BS7671 Appendix 15 - Ring and radial final circuit conductors"
    ],
    nextSteps: "Proceed to insulation resistance testing",
    mftSettings: {
      testType: "Continuity/Low Resistance",
      voltage: "4V to 24V DC",
      current: "≥200mA",
      duration: "Until stable reading obtained",
      leads: ["Red test lead to Line at consumer unit", "Black test lead to Earth at test point"]
    },
    connections: [
      "Connect red lead to Line terminal at consumer unit",
      "Connect black lead to Earth terminal at outlet being tested",
      "For ring circuits: test L-L, N-N, E-E end-to-end first",
      "Then cross-connect: L-N, L-E, N-E to verify ring integrity"
    ],
    expectedResults: {
      acceptable: "Low resistance values, typically <1Ω for most circuits",
      typical: "2.5mm² T&E: ~7.41mΩ/m, 1.5mm² T&E: ~12.02mΩ/m",
      investigate: "High resistance (>expected calculated value + 20%)"
    },
    troubleshooting: [
      {
        issue: "High R1+R2 reading",
        causes: ["Loose connections", "Damaged cable", "Wrong cable size", "Poor terminations"],
        solutions: ["Check all connections", "Inspect cable route", "Verify cable specification", "Re-terminate connections"]
      },
      {
        issue: "Open circuit reading",
        causes: ["Broken conductor", "Disconnected terminal", "Wrong test points"],
        solutions: ["Trace circuit path", "Check terminations", "Verify test point selection"]
      }
    ],
    systemTypes: {
      singlePhase: [
        "Test L-E path resistance",
        "Single phase circuits only",
        "Simpler ring circuit testing"
      ],
      threePhase: [
        "Test L1-E, L2-E, L3-E separately",
        "Consider load balancing",
        "More complex ring arrangements possible"
      ]
    }
  }
];
