export interface BS7671StepData {
  id: number;
  title: string;
  description: string;
  category: "Safety Critical" | "Electrical Testing" | "Visual Inspection" | "Documentation";
  checklist: string[];
  safetyNotes: string[];
  regulations: string[];
  nextSteps: string;
  installationTypes?: {
    domestic?: string[];
    commercial?: string[];
    industrial?: string[];
  };
  mftSettings?: {
    testType: string;
    voltage: string;
    current: string;
    duration: string;
    leads: string[];
  };
  connections?: string[];
  expectedResults?: {
    typical: string;
    minimum: string;
    maximum: string;
  };
  troubleshooting?: {
    issue: string;
    causes: string[];
    solutions: string[];
  }[];
  systemTypes?: {
    singlePhase?: string[];
    threePhase?: string[];
  };
}

export const enhancedBS7671Steps: BS7671StepData[] = [
  {
    id: 1,
    title: "Initial Verification Planning & Documentation Review",
    description: "Review installation documentation, drawings, and ensure compliance with BS 7671 before commencement of inspection and testing.",
    category: "Documentation",
    checklist: [
      "Review electrical installation drawings and specifications",
      "Verify design calculations and cable schedules are available",
      "Check protective device coordination schedules",
      "Confirm installation methods comply with manufacturer instructions",
      "Verify special location requirements have been identified",
      "Check earthing and bonding arrangements are documented",
      "Review risk assessment for inspection and testing activities",
      "Ensure all relevant British Standards and regulations are referenced"
    ],
    safetyNotes: [
      "Do not commence inspection until all documentation is reviewed",
      "Ensure competent persons are assigned for inspection and testing",
      "Verify installation is ready for inspection (not energised)",
      "Check test equipment is calibrated and suitable for the installation"
    ],
    regulations: [
      "BS 7671:2018 Regulation 610.1 - Initial verification requirements",
      "BS 7671:2018 Regulation 610.2 - Competent person requirements",
      "BS 7671:2018 Chapter 61 - Initial verification procedures",
      "BS 7671:2018 Appendix 6 - Model forms for certification"
    ],
    nextSteps: "Once documentation review is complete, proceed to visual inspection of the installation in accordance with the schedule of inspections.",
    installationTypes: {
      domestic: [
        "Check Part P Building Regulations compliance",
        "Verify consumer unit location and accessibility",
        "Review special location requirements (bathrooms, kitchens)",
        "Confirm RCD protection requirements for socket circuits"
      ],
      commercial: [
        "Review fire alarm and emergency lighting integration",
        "Check compliance with Workplace Regulations",
        "Verify discrimination and selectivity studies",
        "Confirm maintenance access arrangements"
      ],
      industrial: [
        "Review hazardous area classifications",
        "Check motor protection and control arrangements",
        "Verify compliance with relevant industry standards",
        "Confirm earthing and equipotential bonding requirements"
      ]
    }
  },
  {
    id: 2,
    title: "Visual Inspection - External Installation",
    description: "Systematic visual inspection of external electrical installation components including service position, earthing, and external equipment.",
    category: "Visual Inspection",
    checklist: [
      "Inspect service head and meter position for damage and security",
      "Verify earthing conductor size and connections comply with Table 54.7",
      "Check main equipotential bonding to water and gas services",
      "Inspect external equipment IP ratings for environmental suitability",
      "Verify cable entries are sealed against moisture ingress",
      "Check overhead line clearances and supports",
      "Inspect underground cable routes and protection",
      "Verify external isolation and switching arrangements"
    ],
    safetyNotes: [
      "Do not remove service head seals - contact DNO if inspection required",
      "Ensure safe access to all external equipment",
      "Be aware of live incoming supply at service position",
      "Use appropriate PPE for external inspection activities"
    ],
    regulations: [
      "BS 7671:2018 Section 544 - Earthing arrangements",
      "BS 7671:2018 Section 416 - Provisions for basic protection",
      "BS 7671:2018 Chapter 52 - Wiring systems",
      "BS 7671:2018 Regulation 544.1.2 - Main protective bonding"
    ],
    nextSteps: "Continue with internal visual inspection of consumer unit, circuits, and accessories.",
    installationTypes: {
      domestic: [
        "Check 10mm² main earthing conductor minimum",
        "Verify gas and water bonding within 600mm of entry",
        "Inspect meter cabinet and consumer unit locations",
        "Check external socket outlet RCD protection"
      ],
      commercial: [
        "Verify multiple service positions and earthing",
        "Check external emergency lighting provisions",
        "Inspect fire alarm cable entries and sealing",
        "Verify external isolation for maintenance"
      ],
      industrial: [
        "Check earthing arrangements for large installations",
        "Verify hazardous area equipment protection",
        "Inspect cable containment systems",
        "Check multiple supply arrangements"
      ]
    }
  },
  {
    id: 3,
    title: "Visual Inspection - Internal Installation",
    description: "Comprehensive visual inspection of internal electrical installation including consumer units, circuits, accessories, and connections.",
    category: "Visual Inspection",
    checklist: [
      "Inspect consumer unit/distribution board condition and labelling",
      "Verify protective device types and ratings match design",
      "Check RCD test button operation and quarterly test labels",
      "Inspect cable installation methods and support intervals",
      "Verify socket outlet RCD protection ≤20A circuits",
      "Check switch and accessory mounting and operation",
      "Inspect all visible connections for tightness and condition",
      "Verify circuit identification and labelling compliance"
    ],
    safetyNotes: [
      "Ensure installation is isolated before removing covers",
      "Do not operate RCD test buttons until ready for testing",
      "Check for signs of overheating or burning at connections",
      "Be aware of potential stored energy in capacitors"
    ],
    regulations: [
      "BS 7671:2018 Section 411.3.3 - Additional protection by RCD",
      "BS 7671:2018 Section 514.9 - Circuit identification",
      "BS 7671:2018 Section 526 - Electrical connections",
      "BS 7671:2018 Table 52.2 - Support intervals for cables"
    ],
    nextSteps: "Complete schedule of inspections documentation and prepare for electrical testing procedures.",
    installationTypes: {
      domestic: [
        "Check 30mA RCD protection for socket outlets ≤20A",
        "Verify bathroom zone requirements compliance",
        "Inspect kitchen socket outlet positioning",
        "Check supplementary bonding where required"
      ],
      commercial: [
        "Verify emergency lighting circuit protection",
        "Check fire alarm system cable segregation",
        "Inspect three-phase distribution arrangements",
        "Verify isolation arrangements for maintenance"
      ],
      industrial: [
        "Check motor circuit protection and isolation",
        "Verify control circuit arrangements",
        "Inspect hazardous area equipment installation",
        "Check earthing and equipotential bonding systems"
      ]
    }
  },
  {
    id: 4,
    title: "Safe Isolation",
    description: "Safely isolate electrical supplies and prove dead before commencing work",
    category: "Safety Critical",
    checklist: [
      "Identify all sources of supply to the work area",
      "Inform all relevant parties of planned isolation",
      "Secure isolation using appropriate devices and apply locks/labels",
      "Visually inspect test equipment and check calibration certificates",
      "Prove test equipment on known live source before testing",
      "Connect EARTH lead FIRST when proving dead",
      "Test all conductor combinations following correct sequence",
      "Remove earth lead LAST after completing all tests",
      "Re-prove test equipment on known live source after testing",
      "Apply warning notices and secure work area",
      "Brief all workers on isolation status and safety procedures"
    ],
    safetyNotes: [
      "CRITICAL: Always connect test leads to EARTH FIRST when proving dead - this practice can save your life",
      "Never assume a circuit is dead - always prove it using the complete test sequence",
      "Use only GS38 compliant test equipment with current calibration certificates",
      "If voltage is detected during proving dead, stop immediately and investigate",
      "Lock off procedures must use approved personal locks with unique keys",
      "If in any doubt about isolation safety, seek supervision before proceeding"
    ],
    regulations: [
      "BS 7671 Regulation 514.11.1 - Warning notices for isolation",
      "BS 7671 Regulation 462.2 - Isolation and switching requirements",
      "GS38 - Electrical test equipment for use by electricians",
      "Electricity at Work Regulations 1989 - Reg 12 & 13",
      "IET Code of Practice for In-Service Inspection and Testing",
      "BS EN 60204-1 - Safety of machinery electrical equipment"
    ],
    mftSettings: {
      testType: "Voltage Detection",
      voltage: "As per installation (230V/400V)",
      current: "N/A (Voltage detection only)",
      duration: "Continuous during test sequence",
      leads: ["L1 Test Lead", "L2 Test Lead", "L3 Test Lead", "N Test Lead", "E Test Lead"]
    },
    connections: [
      "Connect EARTH test lead to earth terminal FIRST - this is critical for safety",
      "Test between each live conductor and earth using appropriate test lead",
      "Test between live conductors where applicable (L1-L2, L2-L3, L1-L3)",
      "Test between neutral and earth conductors",
      "Remove earth test lead LAST after completing all voltage tests",
      "Always maintain contact with earth throughout the testing process"
    ],
    expectedResults: {
      typical: "0V between all conductor combinations when properly isolated",
      maximum: "Maximum 50V AC or 120V DC (above this indicates live circuit)",
      minimum: "Absolute minimum: 0V (any voltage reading requires investigation)"
    },
    systemTypes: {
      singlePhase: [
        "Test sequence: L-E, L-N, N-E (with earth connection maintained)",
        "Ensure neutral is also tested as it may be live in fault conditions",
        "Check for backfeed through connected equipment",
        "Verify isolation covers all poles of supply"
      ],
      threePhase: [
        "Complete test sequence: L1-E, L2-E, L3-E, L1-L2, L2-L3, L1-L3, L1-N, L2-N, L3-N, N-E",
        "Maintain earth connection throughout all tests",
        "Check for supply from alternative sources or parallel feeds",
        "Verify all phases are isolated simultaneously"
      ]
    },
    troubleshooting: [
      {
        issue: "Voltage detected during proving dead",
        cause: "Isolation not effective or alternative supply present",
        solution: "Investigate isolation points, check for backfeed, identify all supply sources"
      },
      {
        issue: "Test equipment gives inconsistent readings",
        cause: "Equipment fault or poor connection",
        solution: "Re-test on known live source, check test lead connections, replace if faulty"
      },
      {
        issue: "Unable to achieve secure isolation",
        cause: "Complex supply arrangement or unknown circuits",
        solution: "Trace all supply routes, consult drawings, seek technical assistance"
      }
    ],
    nextSteps: "Once safe isolation is confirmed and documented, proceed to continuity testing (R1+R2). Never skip or rush the isolation procedure.",
    installationTypes: {
      domestic: [
        "Isolation typically at consumer unit main switch",
        "Check for solar PV or other generation that may backfeed",
        "Consider smart meters and their communication systems",
        "Verify no temporary supplies or extension leads connected"
      ],
      commercial: [
        "May require multiple isolation points for different supplies",
        "Consider emergency lighting and fire alarm systems",
        "Check for UPS systems that may maintain power",
        "Coordinate with building management for safe isolation"
      ],
      industrial: [
        "Complex isolation procedures may be required",
        "Multiple supply sources and parallel feeds common",
        "High voltage supplies may be present",
        "Permit-to-work systems usually mandatory"
      ]
    }
  },
  {
    id: 5,
    title: "Continuity Testing (R1+R2)",
    description: "Testing the continuity of protective conductors and the combined resistance of line and protective conductors for each circuit.",
    category: "Electrical Testing",
    checklist: [
      "Verify safe isolation has been completed",
      "Set MFT to low resistance/continuity function",
      "Null the test leads together",
      "For ring circuits: perform end-to-end tests first",
      "Cross-connect ring circuit conductors",
      "Test R1+R2 at each socket outlet on ring circuits",
      "Test R1+R2 at the furthest point of radial circuits",
      "Record all readings on test results schedule"
    ],
    safetyNotes: [
      "Ensure circuit is isolated and proved dead",
      "Use test current of at least 200mA DC",
      "Check for voltage before connecting test leads",
      "Be aware that some electronic equipment may be damaged by test current"
    ],
    mftSettings: {
      testType: "Low Resistance/Continuity",
      voltage: "6-24V DC",
      current: "≥200mA DC",
      duration: "Instantaneous",
      leads: ["Red probe", "Black probe", "Long trailing leads for distant points"]
    },
    connections: [
      "Connect red lead to line terminal at consumer unit",
      "Connect black lead to earth terminal at circuit end point",
      "For ring circuits: cross-connect L1 to N2, L2 to N1 at CU",
      "Test between line and earth at each socket outlet"
    ],
    expectedResults: {
      typical: "0.05-2.0Ω depending on cable size and length",
      minimum: "No minimum specified",
      maximum: "Must enable disconnection times per Table 41.1"
    },
    troubleshooting: [
      {
        issue: "Very high resistance readings (>10Ω)",
        causes: ["Poor connection at terminations", "Damaged cable", "Incorrect test method"],
        solutions: ["Check and tighten all connections", "Inspect cable for damage", "Verify test lead connections"]
      },
      {
        issue: "Open circuit readings (OL)",
        causes: ["Broken conductor", "Loose connection", "Wrong terminals tested"],
        solutions: ["Check circuit continuity first", "Inspect all joints and terminations", "Verify test setup"]
      }
    ],
    regulations: [
      "BS 7671:2018 Section 643.2.3 - Continuity of protective conductors",
      "BS 7671:2018 Table 41.1 - Maximum disconnection times",
      "GS38 - Electrical test equipment safety"
    ],
    nextSteps: "Proceed with insulation resistance testing once all continuity tests are satisfactory.",
    systemTypes: {
      singlePhase: [
        "Test each circuit individually",
        "Record L-CPC resistance for each circuit"
      ],
      threePhase: [
        "Test each phase separately",
        "Consider load balancing when testing",
        "Test neutral integrity"
      ]
    }
  },
  {
    id: 6,
    title: "Insulation Resistance Testing",
    description: "Testing the insulation resistance between conductors and between conductors and earth to ensure adequate insulation.",
    category: "Electrical Testing",
    checklist: [
      "Disconnect or bypass all electronic equipment",
      "Ensure all switches and circuit breakers are closed",
      "Remove all lamps from lampholders",
      "Link line and neutral together for L-E and N-E tests",
      "Set MFT to insulation resistance function",
      "Select appropriate test voltage (250V, 500V, or 1000V)",
      "Test between all conductor combinations",
      "Record all readings ≥1MΩ (≥0.5MΩ for SELV)"
    ],
    safetyNotes: [
      "Disconnect electronic equipment to prevent damage",
      "Ensure no one touches conductors during test",
      "Be aware of stored charge after testing",
      "Use appropriate test voltage for circuit voltage"
    ],
    mftSettings: {
      testType: "Insulation Resistance",
      voltage: "500V DC (for low voltage circuits)",
      current: "1mA maximum",
      duration: "1 minute",
      leads: ["Red probe", "Black probe", "Earth probe"]
    },
    connections: [
      "Link line and neutral together with test lead",
      "Connect red probe to linked L+N",
      "Connect black probe to earth terminal",
      "Test each circuit individually"
    ],
    expectedResults: {
      typical: "10-100MΩ for new installations",
      minimum: "≥1MΩ for low voltage circuits, ≥0.5MΩ for SELV",
      maximum: "No maximum limit"
    },
    troubleshooting: [
      {
        issue: "Low insulation resistance (<1MΩ)",
        causes: ["Moisture ingress", "Damaged cable insulation", "Contamination", "Electronic equipment connected"],
        solutions: ["Check for damp conditions", "Inspect cable for damage", "Clean terminals", "Ensure all equipment disconnected"]
      },
      {
        issue: "Gradually decreasing readings",
        causes: ["Charging effect of long cables", "Electronic equipment partially connected"],
        solutions: ["Allow time for cable charging", "Double-check equipment isolation", "Use longer test duration"]
      }
    ],
    regulations: [
      "BS 7671:2018 Section 643.4 - Insulation resistance",
      "BS 7671:2018 Table 61 - Minimum insulation resistance values"
    ],
    nextSteps: "Continue with polarity testing to verify correct connection of line and neutral conductors.",
    systemTypes: {
      singlePhase: [
        "Test L-N, L-E, N-E combinations",
        "Use 500V test voltage for 230V circuits"
      ],
      threePhase: [
        "Test between all phase combinations",
        "Test each phase to neutral and earth",
        "Use 500V test for 400V systems"
      ]
    }
  },
  {
    id: 7,
    title: "Polarity Testing",
    description: "Verification that line and neutral conductors are correctly connected and that switches are in the line conductor.",
    category: "Electrical Testing",
    checklist: [
      "Verify safe isolation is maintained",
      "Check polarity at the origin of the installation",
      "Test polarity at each distribution board",
      "Verify switches are connected in line conductors only",
      "Check correct polarity at all socket outlets",
      "Test polarity at all fixed equipment connections",
      "Verify Edison screw lampholders have line to centre contact",
      "Record polarity as correct or incorrect for each circuit"
    ],
    safetyNotes: [
      "Maintain isolation throughout polarity testing",
      "Double-check connections before re-energising",
      "Incorrect polarity is a serious safety hazard",
      "Pay particular attention to lighting circuits"
    ],
    regulations: [
      "BS 7671:2018 Section 643.6 - Polarity testing",
      "BS 7671:2018 Regulation 132.14 - Protective conductor continuity"
    ],
    nextSteps: "If all polarity tests are correct, proceed with earth fault loop impedance testing (Zs).",
    systemTypes: {
      singlePhase: [
        "Verify L-N polarity throughout installation",
        "Check single-phase socket outlet wiring"
      ],
      threePhase: [
        "Verify phase sequence L1-L2-L3",
        "Check three-phase socket outlet connections",
        "Verify motor connection phase rotation"
      ]
    }
  },
  {
    id: 8,
    title: "Earth Fault Loop Impedance Testing (Zs)",
    description: "Measurement of the earth fault loop impedance to ensure automatic disconnection of supply will occur within required times.",
    category: "Electrical Testing",
    checklist: [
      "Ensure installation is fully energised and operational",
      "Set MFT to earth fault loop impedance function",
      "Test Zs at the origin of the installation",
      "Test Zs at each distribution board",
      "Test Zs at the furthest point of each circuit",
      "Compare results with maximum values in BS 7671",
      "Consider temperature correction factors",
      "Record all Zs readings on test schedule"
    ],
    safetyNotes: [
      "Installation must be energised for this test",
      "RCDs may trip during testing - use no-trip mode if available",
      "Be aware of parallel earth paths affecting readings",
      "Ensure proper earth connection at test point"
    ],
    mftSettings: {
      testType: "Earth Fault Loop Impedance (Zs)",
      voltage: "Supply voltage (230V/400V)",
      current: "15A test current (brief duration)",
      duration: "40ms typical",
      leads: ["Line probe", "Earth probe", "Neutral reference"]
    },
    connections: [
      "Connect line probe to line terminal",
      "Connect earth probe to earth terminal",
      "Ensure good earth connection at test point",
      "Use appropriate socket adapter for outlet testing"
    ],
    expectedResults: {
      typical: "0.1-2.0Ω for TN systems",
      minimum: "No minimum specified",
      maximum: "Per BS 7671 Tables 41.2-41.4 depending on protective device"
    },
    troubleshooting: [
      {
        issue: "Zs readings higher than maximum permitted",
        causes: ["Poor earth connections", "High external loop impedance (Ze)", "Cable size too small", "Long circuit length"],
        solutions: ["Check earth connections", "Verify Ze at origin", "Consider cable upgrade", "Install RCD protection"]
      },
      {
        issue: "RCD tripping during test",
        causes: ["Normal RCD operation during earth fault simulation", "Sensitive RCD settings"],
        solutions: ["Use no-trip test method", "Temporarily bypass RCD if safe to do so", "Calculate Zs from Ze + R1+R2"]
      }
    ],
    regulations: [
      "BS 7671:2018 Section 643.7 - Earth fault loop impedance",
      "BS 7671:2018 Chapter 41 - Protection against electric shock",
      "BS 7671:2018 Tables 41.2-41.4 - Maximum earth fault loop impedance"
    ],
    nextSteps: "Complete testing with RCD testing if RCDs are installed in the circuits.",
    systemTypes: {
      singlePhase: [
        "Test at each socket outlet and fixed equipment",
        "Verify disconnection times for MCBs/RCBOs"
      ],
      threePhase: [
        "Test each phase separately",
        "Consider phase-to-earth fault conditions",
        "Verify three-phase equipment protection"
      ]
    }
  },
  {
    id: 9,
    title: "RCD Testing",
    description: "Testing the operation of Residual Current Devices (RCDs) to ensure they provide additional protection against electric shock.",
    category: "Electrical Testing",
    checklist: [
      "Identify all RCDs in the installation",
      "Test RCD using integral test button first",
      "Set MFT to RCD test function",
      "Test at half rated current (should not trip)",
      "Test at rated current (should trip within limits)",
      "Test at 5x rated current for fast trip time",
      "Test ramp function to determine actual trip current",
      "Record trip times and currents for each RCD"
    ],
    safetyNotes: [
      "RCD testing will disconnect the supply temporarily",
      "Inform occupants before testing",
      "Check for equipment that may be affected by power interruption",
      "Ensure RCD resets properly after each test"
    ],
    mftSettings: {
      testType: "RCD Test",
      voltage: "Supply voltage",
      current: "½In, In, 5×In (where In = rated residual current)",
      duration: "Variable - measured by instrument",
      leads: ["Line probe", "Neutral probe", "Earth probe"]
    },
    connections: [
      "Connect to load side of RCD being tested",
      "Ensure proper line, neutral and earth connections",
      "Use RCD adapter or hard-wired connection as appropriate"
    ],
    expectedResults: {
      typical: "30mA RCD: <300ms at 1×In, <40ms at 5×In",
      minimum: "Must trip at rated current",
      maximum: "300ms at rated current, 40ms at 5× rated current"
    },
    troubleshooting: [
      {
        issue: "RCD does not trip at rated current",
        causes: ["Faulty RCD mechanism", "Incorrect test connections", "RCD current setting too high"],
        solutions: ["Replace RCD", "Check test lead connections", "Verify RCD rating and settings"]
      },
      {
        issue: "RCD trips at less than half rated current",
        causes: ["RCD too sensitive", "Existing earth leakage", "Faulty RCD"],
        solutions: ["Check for earth leakage in circuits", "Test individual circuits", "Consider RCD replacement"]
      }
    ],
    regulations: [
      "BS 7671:2018 Section 643.8 - Additional protection",
      "BS 4293 - Specification for residual current devices",
      "BS EN 61008 - RCD standards"
    ],
    nextSteps: "Complete all documentation including Electrical Installation Certificate and schedules of inspection and test results.",
    systemTypes: {
      singlePhase: [
        "Test main RCD and any additional RCDs",
        "Verify 30mA protection for socket circuits"
      ],
      threePhase: [
        "Test three-phase RCDs",
        "Check type A or type AC as appropriate",
        "Verify correct operation on all phases"
      ]
    }
  }
];
