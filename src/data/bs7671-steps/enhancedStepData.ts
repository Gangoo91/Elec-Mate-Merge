
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
  diagrams?: {
    type: 'safe-isolation' | 'continuity' | 'visual-inspection' | 'mft-connection' | 'insulation' | 'earth-fault-loop' | 'rcd' | 'polarity';
    title: string;
    description: string;
  }[];
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
    },
    diagrams: [
      {
        type: 'visual-inspection',
        title: 'Documentation Review Checklist',
        description: 'Visual guide to essential documentation and planning requirements'
      }
    ]
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
    },
    diagrams: [
      {
        type: 'visual-inspection',
        title: 'External Inspection Points',
        description: 'Key areas to inspect on external electrical installations'
      }
    ]
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
    nextSteps: "Prepare for safe isolation before electrical testing",
    diagrams: [
      {
        type: 'visual-inspection',
        title: 'Internal Inspection Areas',
        description: 'Comprehensive guide to internal electrical inspection points'
      }
    ]
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
    ],
    diagrams: [
      {
        type: 'safe-isolation',
        title: 'Safe Isolation Procedure',
        description: 'Step-by-step safe isolation and proving dead sequence'
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
    },
    diagrams: [
      {
        type: 'continuity',
        title: 'R1+R2 Testing Setup',
        description: 'MFT connections and ring circuit testing procedures'
      },
      {
        type: 'mft-connection',
        title: 'MFT Configuration',
        description: 'Detailed MFT setup for continuity measurements'
      }
    ]
  },
  {
    id: 6,
    title: "Insulation Resistance Testing",
    description: "Test insulation resistance between conductors and to earth",
    category: "Electrical Testing",
    checklist: [
      "Set MFT to insulation resistance test mode",
      "Select appropriate test voltage (250V, 500V, or 1000V)",
      "Ensure all electronic equipment is disconnected or bypassed",
      "Test between Line and Neutral conductors",
      "Test between Line and Earth conductors", 
      "Test between Neutral and Earth conductors",
      "Record all readings and compare with minimum values",
      "Investigate any readings below acceptable limits"
    ],
    safetyNotes: [
      "Disconnect or bypass electronic equipment to prevent damage",
      "Ensure all switches and circuit breakers are closed during testing",
      "Use appropriate test voltage for the installation voltage",
      "Be aware that some readings may take time to stabilise"
    ],
    regulations: [
      "BS7671 Section 612.3 - Insulation resistance",
      "IET Guidance Note 3 - Section 10.4",
      "BS7671 Table 61 - Minimum insulation resistance values"
    ],
    nextSteps: "Proceed to polarity testing",
    mftSettings: {
      testType: "Insulation Resistance",
      voltage: "500V DC (typical for 230V installations)",
      current: "1mA maximum",
      duration: "1 minute minimum",
      leads: ["Test lead to first conductor", "Test lead to second conductor/earth"]
    },
    connections: [
      "Connect first test lead to Line conductor",
      "Connect second test lead to Neutral conductor",
      "Repeat for Line to Earth and Neutral to Earth",
      "Ensure all circuits under test are connected in parallel"
    ],
    expectedResults: {
      acceptable: "≥1MΩ for 230V installations, ≥0.5MΩ for 120V installations",
      typical: "10MΩ to 100MΩ for new installations",
      investigate: "Readings below 1MΩ require investigation"
    },
    troubleshooting: [
      {
        issue: "Low insulation resistance reading",
        causes: ["Moisture in cables", "Damaged cable insulation", "Connected electronic equipment", "Dirty connections"],
        solutions: ["Check for moisture ingress", "Locate damaged cables", "Disconnect electronics", "Clean terminals"]
      },
      {
        issue: "Unstable readings",
        causes: ["Charging current in long cables", "Electronic equipment influence", "Poor connections"],
        solutions: ["Allow longer stabilisation time", "Disconnect electronics", "Check test lead connections"]
      }
    ],
    systemTypes: {
      singlePhase: [
        "Test L-N, L-E, N-E",
        "Simple two-conductor systems",
        "Check each circuit separately"
      ],
      threePhase: [
        "Test all combinations: L1-L2, L1-L3, L2-L3",
        "Test each line to neutral and earth",
        "Consider system earthing arrangement"
      ]
    },
    diagrams: [
      {
        type: 'insulation',
        title: 'Insulation Resistance Testing',
        description: 'MFT setup and conductor combinations for insulation testing'
      }
    ]
  },
  {
    id: 7,
    title: "Polarity Testing",
    description: "Verify correct polarity of all circuits and single-pole devices",
    category: "Electrical Testing", 
    checklist: [
      "Check polarity at the origin of the installation",
      "Verify polarity at all socket outlets",
      "Test polarity at all lighting points and switches",
      "Check single-pole devices are connected in line conductor only",
      "Verify Edison screw lampholders have line to centre contact",
      "Check polarity of all fixed appliances",
      "Ensure correct polarity at all distribution boards",
      "Record any polarity errors found"
    ],
    safetyNotes: [
      "Polarity testing can be done live or dead",
      "If testing live, use extreme caution and proper PPE",
      "Dead testing requires temporary connections for continuity",
      "Mark any circuits with incorrect polarity clearly"
    ],
    regulations: [
      "BS7671 Section 612.6 - Polarity",
      "BS7671 Section 643.7 - Polarity", 
      "IET Guidance Note 3 - Section 10.7"
    ],
    nextSteps: "Proceed to earth fault loop impedance testing",
    mftSettings: {
      testType: "Continuity or Live Polarity Test",
      voltage: "Low voltage DC or line voltage",
      current: "Test current as appropriate",
      duration: "Until reading obtained",
      leads: ["Line test lead", "Neutral/Earth test lead"]
    },
    connections: [
      "For dead testing: link L-N at consumer unit, test continuity to outlets",
      "For live testing: use appropriate polarity tester",
      "Check socket outlets using socket tester",
      "Test lighting circuits at switches and lampholders"
    ],
    expectedResults: {
      acceptable: "Correct polarity at all points tested",
      typical: "Line connected to correct terminals throughout",
      investigate: "Any incorrect polarity connections"
    },
    troubleshooting: [
      {
        issue: "Incorrect polarity at socket",
        causes: ["Wires crossed during installation", "Incorrect socket wiring", "Fault in distribution"],
        solutions: ["Check wiring at socket", "Trace back to distribution point", "Correct crossed conductors"]
      },
      {
        issue: "Switch in neutral instead of line",
        causes: ["Installation error", "Crossed conductors", "DIY work"],
        solutions: ["Rewire switch correctly", "Check all switching points", "Verify at consumer unit"]
      }
    ],
    diagrams: [
      {
        type: 'polarity',
        title: 'Polarity Testing Methods',
        description: 'Live and dead testing techniques for polarity verification'
      }
    ]
  },
  {
    id: 8,
    title: "Earth Fault Loop Impedance (Zs)",
    description: "Measure earth fault loop impedance to verify protective device operation",
    category: "Electrical Testing",
    checklist: [
      "Set up MFT for earth fault loop impedance testing",
      "Test Zs at the origin of the installation",
      "Measure Zs at all socket outlets and fixed equipment",
      "Test each distribution board",
      "Record all Zs readings accurately",
      "Compare readings with maximum permitted values",
      "Check RCD doesn't trip during testing (use no-trip mode if available)",
      "Verify protective device coordination"
    ],
    safetyNotes: [
      "This test is normally carried out live",
      "RCDs may trip during testing - use no-trip facilities where available",
      "High current test may affect sensitive equipment",
      "Ensure good connection to test probes"
    ],
    regulations: [
      "BS7671 Section 612.9 - Earth fault loop impedance",
      "BS7671 Section 411.5 - Additional protection",
      "IET Guidance Note 3 - Section 10.6"
    ],
    nextSteps: "Proceed to RCD testing if applicable",
    mftSettings: {
      testType: "Earth Fault Loop Impedance",
      voltage: "Line voltage",
      current: "Test current typically 15A-25A",
      duration: "Very short duration pulse",
      leads: ["Line test probe", "Earth test probe"]
    },
    connections: [
      "Connect line probe to line terminal at test point",
      "Connect earth probe to earth terminal",
      "Ensure good electrical contact",
      "Test at socket outlets using appropriate adaptors"
    ],
    expectedResults: {
      acceptable: "Zs ≤ maximum values in BS7671 tables",
      typical: "Domestic installations: typically 0.35Ω to 1.44Ω depending on protective device",
      investigate: "High Zs readings that exceed maximum permitted values"
    },
    troubleshooting: [
      {
        issue: "High Zs reading",
        causes: ["Poor earth connections", "High supply impedance", "Damaged earth conductor", "Corroded connections"],
        solutions: ["Check earth bonding", "Test supply Ze", "Inspect earth continuity", "Clean connections"]
      },
      {
        issue: "RCD trips during test",
        causes: ["Test current causing imbalance", "Sensitive RCD", "Leakage current present"],
        solutions: ["Use no-trip test facility", "Test RCD separately", "Check for earth leakage"]
      }
    ],
    diagrams: [
      {
        type: 'earth-fault-loop',
        title: 'Earth Fault Loop Testing',
        description: 'Zs measurement setup and protective device coordination'
      }
    ]
  },
  {
    id: 9,
    title: "RCD Testing",
    description: "Test RCD operation and disconnection times",
    category: "Electrical Testing",
    checklist: [
      "Test RCD using test button (functional test)",
      "Set up MFT for RCD testing mode",
      "Test at 50% of rated current (should not trip)",
      "Test at 100% of rated current (should trip)",
      "Test at 5× rated current for disconnection time",
      "Test both positive and negative half cycles",
      "Record trip times and currents",
      "Reset RCD after each test"
    ],
    safetyNotes: [
      "Always test RCD test button first",
      "Ensure RCD resets properly after each test",
      "Check no equipment is affected by RCD operation",
      "Some RCDs may require multiple tests to stabilise"
    ],
    regulations: [
      "BS7671 Section 612.10 - Additional protection",
      "BS7671 Section 531.3.3 - RCD requirements",
      "IET Guidance Note 3 - Section 10.8"
    ],
    nextSteps: "Complete testing documentation and certification",
    mftSettings: {
      testType: "RCD Test",
      voltage: "Line voltage",
      current: "½×, 1×, and 5× rated trip current",
      duration: "As per test sequence",
      leads: ["Line and neutral test leads", "Earth connection"]
    },
    connections: [
      "Connect test leads to line and neutral downstream of RCD",
      "Connect earth reference",
      "Select appropriate RCD rating on MFT",
      "Ensure RCD is energised and reset before testing"
    ],
    expectedResults: {
      acceptable: "Trip at 100% rated current, <300ms at 1× In, <40ms at 5× In",
      typical: "Trip times: 30A RCD ~20-40ms at 5× In, 100mA RCD ~15-25ms",
      investigate: "Failure to trip, slow trip times, or nuisance tripping"
    },
    troubleshooting: [
      {
        issue: "RCD won't trip during test",
        causes: ["Faulty RCD", "Incorrect test setup", "RCD bypassed", "Wrong rating selected"],
        solutions: ["Check RCD functionality", "Verify test connections", "Check RCD wiring", "Confirm RCD rating"]
      },
      {
        issue: "Slow trip times",
        causes: ["Worn RCD contacts", "Mechanical problems", "Interference", "Temperature effects"],
        solutions: ["Replace RCD", "Check mechanical operation", "Test in different conditions", "Verify test method"]
      }
    ],
    diagrams: [
      {
        type: 'rcd',
        title: 'RCD Testing Procedure',
        description: 'RCD test setup and trip time measurement methods'
      }
    ]
  },
  {
    id: 10,
    title: "Final Documentation and Certification",
    description: "Complete all testing documentation and issue certificates",
    category: "Documentation",
    checklist: [
      "Complete all test result schedules accurately",
      "Calculate maximum Zs values and verify compliance",
      "Document any defects or limitations found",
      "Prepare electrical installation certificate or inspection report",
      "Include recommendations for remedial work if required",
      "Provide client with appropriate certification",
      "File copies as required by company procedures",
      "Schedule any follow-up inspections needed"
    ],
    safetyNotes: [
      "Ensure all circuits are properly restored after testing",
      "Check all protective devices are correctly reset",
      "Verify normal operation of installation",
      "Brief client on any immediate safety concerns"
    ],
    regulations: [
      "BS7671 Part 6 - Inspection and testing",
      "IET Guidance Note 3 - Certification requirements",
      "Electrical Safety First Best Practice Guide 4"
    ],
    nextSteps: "Archive documentation and plan any required remedial work",
    installationTypes: {
      domestic: [
        "Electrical Installation Certificate (EIC) for new work",
        "Electrical Installation Condition Report (EICR) for existing",
        "Minor Works Certificate for small additions"
      ],
      commercial: [
        "Full inspection and test certificates required",
        "Emergency lighting and fire alarm certificates",
        "Detailed defect schedules and recommendations"
      ],
      industrial: [
        "Comprehensive documentation for complex installations",
        "Coordination with other trades and systems",
        "Detailed maintenance schedules and requirements"
      ]
    },
    diagrams: [
      {
        type: 'visual-inspection',
        title: 'Documentation Checklist',
        description: 'Essential certification and reporting requirements'
      }
    ]
  }
];
