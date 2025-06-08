
export interface TestLimit {
  parameter: string;
  limit: string;
  unit: string;
}

export interface TestEquipment {
  name: string;
  purpose: string;
  settings?: string[];
}

export interface SafetyWarning {
  level: 'HIGH' | 'MEDIUM' | 'LOW';
  message: string;
}

export interface TestStep {
  id: string;
  title: string;
  instruction: string;
  safetyWarnings?: SafetyWarning[];
  tips?: string[];
  expectedResult: string;
  troubleshooting?: string[];
  regulationReference?: string;
}

export interface EnhancedTestGuide {
  id: string;
  title: string;
  description: string;
  purpose: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: 'Initial Verification' | 'Periodic Inspection' | 'Visual Inspection';
  regulationReference: string;
  equipment: TestEquipment[];
  testLimits: TestLimit[];
  safetyPrecautions: string[];
  commonIssues: string[];
  steps: TestStep[];
  professionalTips: string[];
  troubleshootingGuide: {
    symptom: string;
    possibleCauses: string[];
    solutions: string[];
  }[];
}

export const comprehensiveTestingGuides: EnhancedTestGuide[] = [
  {
    id: "visual-inspection",
    title: "Visual Inspection",
    description: "Comprehensive visual examination of electrical installation components",
    purpose: "To identify obvious defects, damage, and non-compliance without dismantling or testing",
    duration: "30-45 mins",
    difficulty: "Beginner",
    category: "Visual Inspection",
    regulationReference: "BS 7671:2018 Part 6, Section 611",
    equipment: [
      { name: "Torch/Flashlight", purpose: "Illuminate dark areas and enclosed spaces" },
      { name: "Screwdriver Set", purpose: "Remove covers and access panels safely" },
      { name: "Voltage Indicator", purpose: "Prove dead before opening equipment" },
      { name: "Digital Camera", purpose: "Document defects and observations" }
    ],
    testLimits: [],
    safetyPrecautions: [
      "Ensure installation is properly isolated before opening equipment",
      "Use appropriate PPE including safety glasses and gloves",
      "Be aware of live parts that may remain energised",
      "Never touch conductors or terminals without proving dead"
    ],
    commonIssues: [
      "Damaged cable insulation or sheathing",
      "Loose connections or overheated terminals",
      "Missing earth connections",
      "Inadequate IP ratings for environment",
      "Non-compliant cable management"
    ],
    steps: [
      {
        id: "external-condition",
        title: "External Condition of Equipment",
        instruction: "Examine all electrical equipment for signs of damage, corrosion, or deterioration. Check enclosure integrity and IP ratings.",
        expectedResult: "All equipment in good condition with appropriate IP ratings for location",
        tips: [
          "Look for cracks in plastic enclosures",
          "Check for signs of water ingress",
          "Verify equipment is suitable for environment"
        ],
        regulationReference: "611.2(i)"
      },
      {
        id: "conductors-connections",
        title: "Conductors and Connections",
        instruction: "Inspect all visible conductors for damage and examine accessible connections for security and condition.",
        expectedResult: "All conductors intact with secure, clean connections showing no signs of overheating",
        safetyWarnings: [
          {
            level: "HIGH",
            message: "Prove dead before examining any connections"
          }
        ],
        tips: [
          "Look for discoloured terminals indicating overheating",
          "Check conductor identification and sizing",
          "Verify proper connection methods used"
        ],
        troubleshooting: [
          "Discoloured terminals may indicate loose connections",
          "Damaged insulation requires immediate attention"
        ],
        regulationReference: "611.2(ii)"
      },
      {
        id: "identification-notices",
        title: "Identification and Notices",
        instruction: "Verify all circuits are properly identified and required notices/labels are present and legible.",
        expectedResult: "All circuits clearly identified with durable labels, all required notices present",
        tips: [
          "Check circuit charts match actual installation",
          "Verify emergency switching notices are present",
          "Ensure warning labels are clearly visible"
        ],
        regulationReference: "611.2(iii)"
      },
      {
        id: "protective-measures",
        title: "Protective Measures",
        instruction: "Examine protective devices, RCDs, and earthing arrangements for correct type and rating.",
        expectedResult: "All protective devices correctly rated and properly installed",
        tips: [
          "Verify RCD ratings match circuit requirements",
          "Check earth bonding is complete and secure",
          "Ensure protective device discrimination"
        ],
        regulationReference: "611.2(iv)"
      }
    ],
    professionalTips: [
      "Use a systematic approach - work from incoming supply outwards",
      "Document everything with photos for future reference",
      "Pay special attention to any modifications or additions",
      "Look for signs of DIY work that may not comply"
    ],
    troubleshootingGuide: [
      {
        symptom: "Discoloured or burnt terminals",
        possibleCauses: ["Loose connections", "Overloaded circuit", "Poor contact resistance"],
        solutions: ["Retighten connections", "Check load calculations", "Replace damaged terminals"]
      }
    ]
  },
  {
    id: "continuity-protective-conductor",
    title: "Continuity of Protective Conductors",
    description: "Test continuity of protective conductors (CPC) throughout installation",
    purpose: "To verify protective conductors provide continuous path to earth for fault current",
    duration: "15-25 mins",
    difficulty: "Beginner",
    category: "Initial Verification",
    regulationReference: "BS 7671:2018 Section 612.2.1",
    equipment: [
      { 
        name: "Multifunction Tester", 
        purpose: "Measure low resistance with test current ≥200mA",
        settings: ["Continuity mode", "Test current 200mA minimum", "Resolution 0.01Ω"]
      },
      { name: "Test Leads", purpose: "High quality leads with secure connections" },
      { name: "Crocodile Clips", purpose: "Secure connection to terminals" }
    ],
    testLimits: [
      { parameter: "Maximum Resistance", limit: "R1 + R2 values per Table 54.7", unit: "Ω" },
      { parameter: "Test Current", limit: "≥ 200", unit: "mA" }
    ],
    safetyPrecautions: [
      "Ensure all circuits are isolated and proved dead",
      "Remove or disconnect electronic equipment that may be damaged",
      "Lock off supply and post warning notices",
      "Verify test equipment is functioning correctly"
    ],
    commonIssues: [
      "High resistance readings indicating poor connections",
      "Open circuit in protective conductor",
      "Incorrect conductor sizing",
      "Missing earth connections at accessories"
    ],
    steps: [
      {
        id: "isolation-setup",
        title: "Safe Isolation and Setup",
        instruction: "Isolate all circuits, prove dead, and set up multifunction tester in continuity mode with test current ≥200mA.",
        safetyWarnings: [
          {
            level: "HIGH",
            message: "Ensure complete isolation before connecting test equipment"
          }
        ],
        expectedResult: "All circuits safely isolated, tester calibrated and ready",
        tips: [
          "Use appropriate test current for accurate measurement",
          "Check tester calibration before use",
          "Ensure secure test lead connections"
        ],
        regulationReference: "612.1"
      },
      {
        id: "identify-conductors",
        title: "Identify Test Points",
        instruction: "Identify protective conductor connections at distribution board and furthest points of each circuit.",
        expectedResult: "Clear identification of all protective conductor test points",
        tips: [
          "Mark conductors to avoid confusion",
          "Start with shortest circuits first",
          "Document test point locations"
        ]
      },
      {
        id: "measure-continuity",
        title: "Measure Continuity",
        instruction: "Connect test leads between earth terminal at DB and protective conductor at each point. Record resistance values.",
        expectedResult: "Resistance values within acceptable limits for conductor size and length",
        tips: [
          "Allow readings to stabilise before recording",
          "Test each circuit separately",
          "Include socket outlets and fixed equipment"
        ],
        troubleshooting: [
          "High readings may indicate loose connections",
          "Open circuit indicates broken conductor"
        ],
        regulationReference: "612.2.1"
      },
      {
        id: "verify-bonding",
        title: "Test Main Bonding Conductors",
        instruction: "Test continuity between main earthing terminal and all bonded services (gas, water, etc.).",
        expectedResult: "All bonding conductors showing continuity with resistance ≤0.05Ω",
        tips: [
          "Clean connection points for accurate readings",
          "Test to actual service pipes, not just clamps",
          "Check supplementary bonding if required"
        ],
        regulationReference: "612.2.1"
      }
    ],
    professionalTips: [
      "Temperature affects resistance - take ambient temperature into account",
      "Long test leads can affect readings - use shortest practical length",
      "Document all readings even if within limits for future comparison",
      "Pay attention to any readings that seem unusual"
    ],
    troubleshootingGuide: [
      {
        symptom: "Very high resistance reading",
        possibleCauses: ["Loose terminal connection", "Broken conductor", "Poor test lead contact"],
        solutions: ["Check all connections", "Inspect conductor integrity", "Clean contact points"]
      },
      {
        symptom: "Inconsistent readings",
        possibleCauses: ["Temperature variation", "Poor connections", "Faulty test equipment"],
        solutions: ["Allow temperature stabilisation", "Retighten connections", "Check equipment calibration"]
      }
    ]
  },
  {
    id: "continuity-ring-final",
    title: "Continuity of Ring Final Circuit Conductors",
    description: "Comprehensive testing to verify ring circuit integrity and correct connections",
    purpose: "To ensure ring circuits are complete and correctly wired with proper conductor sizing",
    duration: "20-30 mins",
    difficulty: "Intermediate",
    category: "Initial Verification",
    regulationReference: "BS 7671:2018 Section 612.2.2",
    equipment: [
      { 
        name: "Multifunction Tester", 
        purpose: "Low resistance measurement",
        settings: ["Continuity mode", "Test current ≥200mA"]
      },
      { name: "Test Leads", purpose: "Quality leads for accurate measurement" },
      { name: "Socket Tester", purpose: "Verify socket wiring" }
    ],
    testLimits: [
      { parameter: "End-to-end resistance", limit: "Typically < 1.0", unit: "Ω" },
      { parameter: "R1+R2 at each socket", limit: "Approximately 1/4 of end-to-end", unit: "Ω" }
    ],
    safetyPrecautions: [
      "Ensure ring circuit is completely isolated",
      "Disconnect all equipment connected to ring",
      "Verify isolation at each socket outlet",
      "Use only calibrated test equipment"
    ],
    commonIssues: [
      "Broken ring creating radial circuit",
      "Interconnections between rings",
      "Spurs exceeding regulation limits",
      "Incorrect conductor sizing"
    ],
    steps: [
      {
        id: "identify-ring-ends",
        title: "Identify Ring Circuit Ends",
        instruction: "At the distribution board, identify and separate the two ends of the ring circuit conductors (Line, Neutral, and Earth).",
        expectedResult: "Clear identification of both legs of ring circuit with proper labelling",
        safetyWarnings: [
          {
            level: "HIGH",
            message: "Ensure circuit is isolated and proved dead before working"
          }
        ],
        tips: [
          "Use temporary labels to avoid confusion",
          "Verify isolation with approved voltage indicator",
          "Ensure no interconnections with other circuits"
        ]
      },
      {
        id: "end-to-end-test",
        title: "End-to-End Continuity Test",
        instruction: "Measure resistance between the two ends of each conductor separately (L1-L2, N1-N2, E1-E2).",
        expectedResult: "Similar resistance values for line and neutral, earth may be slightly different",
        tips: [
          "Record all three measurements",
          "Readings should be consistent with conductor length",
          "Significant differences indicate potential issues"
        ],
        troubleshooting: [
          "Very high reading indicates broken conductor",
          "Zero reading may indicate short circuit"
        ]
      },
      {
        id: "figure-of-eight-test",
        title: "Figure-of-Eight Test",
        instruction: "Connect L1 to N2 and N1 to L2, then test between L and N at each socket outlet on the ring.",
        expectedResult: "Each socket should show approximately the same resistance reading",
        tips: [
          "This test reveals the ring structure",
          "Readings should decrease towards middle of ring",
          "Significant variations indicate spurs or faults"
        ],
        regulationReference: "612.2.2"
      },
      {
        id: "final-ring-verification",
        title: "Final Ring Verification",
        instruction: "Reconnect conductors correctly and verify R1+R2 values at each socket outlet.",
        expectedResult: "R1+R2 values approximately 1/4 of end-to-end readings",
        tips: [
          "This confirms correct reconnection",
          "Values should be consistent around ring",
          "Higher values at spurs are acceptable"
        ]
      }
    ],
    professionalTips: [
      "Always perform tests in correct sequence to avoid confusion",
      "Document socket positions and readings for future reference",
      "Pay attention to any unusual readings that may indicate hidden faults",
      "Consider load diversity when planning circuit modifications"
    ],
    troubleshootingGuide: [
      {
        symptom: "Open circuit reading on one conductor",
        possibleCauses: ["Broken conductor", "Loose connection", "Incorrectly identified conductors"],
        solutions: ["Trace conductor path", "Check all connections", "Re-verify conductor identification"]
      },
      {
        symptom: "Uneven readings around ring",
        possibleCauses: ["Spurious interconnections", "Hidden junction boxes", "Conductor damage"],
        solutions: ["Investigate wiring routes", "Check for unauthorized connections", "Consider circuit modifications"]
      }
    ]
  },
  {
    id: "insulation-resistance",
    title: "Insulation Resistance Testing",
    description: "Test insulation resistance between conductors and to earth",
    purpose: "To verify adequate insulation between conductors and to earth to prevent dangerous leakage currents",
    duration: "25-35 mins",
    difficulty: "Intermediate",
    category: "Initial Verification",
    regulationReference: "BS 7671:2018 Section 612.3",
    equipment: [
      { 
        name: "Insulation Resistance Tester", 
        purpose: "Apply test voltage and measure resistance",
        settings: ["500V DC for circuits ≤500V", "1000V DC for circuits >500V"]
      },
      { name: "Insulation Test Leads", purpose: "High voltage test leads" }
    ],
    testLimits: [
      { parameter: "Minimum IR (≤500V)", limit: "≥ 1.0", unit: "MΩ" },
      { parameter: "Minimum IR (>500V)", limit: "≥ 1.0", unit: "MΩ" },
      { parameter: "SELV/PELV circuits", limit: "≥ 0.25", unit: "MΩ" }
    ],
    safetyPrecautions: [
      "Remove or disconnect all electronic equipment",
      "Ensure all switches and contactors are closed",
      "Disconnect surge protection devices",
      "Warn others of high voltage testing in progress"
    ],
    commonIssues: [
      "Low readings due to damp conditions",
      "Electronic equipment causing low readings",
      "Neutral-earth connections in TN-C-S systems",
      "Inadequate cable insulation"
    ],
    steps: [
      {
        id: "preparation",
        title: "Test Preparation",
        instruction: "Remove/isolate electronic equipment, close all switches, disconnect SPDs. Set tester to appropriate voltage.",
        safetyWarnings: [
          {
            level: "HIGH",
            message: "High test voltage can damage electronic equipment"
          }
        ],
        expectedResult: "All sensitive equipment protected, circuit ready for testing",
        tips: [
          "Make list of disconnected equipment for reconnection",
          "Use 250V test voltage if electronic equipment cannot be removed",
          "Ensure test leads are suitable for test voltage"
        ]
      },
      {
        id: "line-neutral-test",
        title: "Line to Neutral Test",
        instruction: "Connect test leads between line and neutral conductors. Apply test voltage for minimum 1 minute.",
        expectedResult: "Minimum 1MΩ for circuits ≤500V, reading should be stable",
        tips: [
          "Allow reading to stabilise before recording",
          "Test each phase separately in 3-phase circuits",
          "Maintain steady test voltage throughout"
        ],
        troubleshooting: [
          "Low readings may indicate damp conditions",
          "Falling readings suggest current leakage"
        ]
      },
      {
        id: "line-earth-test",
        title: "Line to Earth Test",
        instruction: "Connect test leads between line conductor and earth. Apply test voltage and record reading.",
        expectedResult: "Minimum 1MΩ, consistent with line-neutral test",
        tips: [
          "Ensure good earth connection for accurate reading",
          "Test all phases to earth in polyphase circuits",
          "Note any significant difference from L-N test"
        ]
      },
      {
        id: "neutral-earth-test",
        title: "Neutral to Earth Test",
        instruction: "Connect test leads between neutral and earth conductors. Apply test and record final reading.",
        expectedResult: "Minimum 1MΩ (may be lower in TN-C-S systems due to multiple earth paths)",
        tips: [
          "Lower readings are acceptable in TN-C-S systems",
          "Very low readings may indicate N-E link",
          "Compare with supply system type"
        ]
      }
    ],
    professionalTips: [
      "Weather conditions significantly affect insulation resistance",
      "Always discharge circuits after insulation testing",
      "Document environmental conditions during testing",
      "Consider retesting if readings are marginal"
    ],
    troubleshootingGuide: [
      {
        symptom: "Low insulation resistance readings",
        possibleCauses: ["Moisture ingress", "Damaged cable insulation", "Connected equipment"],
        solutions: ["Allow time for drying", "Investigate cable routes", "Check all equipment is disconnected"]
      }
    ]
  },
  {
    id: "polarity-testing",
    title: "Polarity Testing",
    description: "Verify correct polarity of all connections in single-phase circuits",
    purpose: "To ensure line conductors are connected to correct terminals and switching devices interrupt line conductors only",
    duration: "15-20 mins",
    difficulty: "Beginner",
    category: "Initial Verification",
    regulationReference: "BS 7671:2018 Section 612.6",
    equipment: [
      { name: "Multifunction Tester", purpose: "Continuity testing between DB and outlets" },
      { name: "Socket Tester", purpose: "Quick polarity verification at socket outlets" },
      { name: "Test Lamp", purpose: "Visual indication of circuit energisation" }
    ],
    testLimits: [],
    safetyPrecautions: [
      "Complete polarity testing before energising circuits",
      "Ensure correct identification of line and neutral",
      "Verify switching arrangements before connection",
      "Use only approved test equipment"
    ],
    commonIssues: [
      "Line and neutral reversed at accessories",
      "Switches connected in neutral instead of line",
      "Incorrect polarity at lampholders",
      "Mixed up connections at distribution board"
    ],
    steps: [
      {
        id: "db-connections",
        title: "Distribution Board Connections",
        instruction: "Verify line connections go to MCB/RCBO line terminals and neutrals go to neutral bar.",
        expectedResult: "All line conductors connected to switching devices, neutrals to neutral bar",
        tips: [
          "Check each circuit systematically",
          "Verify correct MCB ratings",
          "Ensure proper neutral grouping"
        ]
      },
      {
        id: "switching-devices",
        title: "Switching Device Connections",
        instruction: "Test continuity to verify switches interrupt line conductors only, not neutrals.",
        expectedResult: "Continuity through switch when closed, open circuit when open (line side only)",
        tips: [
          "Test with switch in both positions",
          "Verify two-way switching arrangements",
          "Check intermediate switches if present"
        ]
      },
      {
        id: "socket-outlets",
        title: "Socket Outlet Polarity",
        instruction: "Use socket tester or continuity testing to verify correct polarity at all socket outlets.",
        expectedResult: "Line to right terminal (facing outlet), neutral to left, earth to top",
        tips: [
          "Use socket tester for quick verification",
          "Check both single and double sockets",
          "Verify correct terminal identification"
        ]
      },
      {
        id: "lighting-circuits",
        title: "Lighting Circuit Polarity",
        instruction: "Verify correct polarity at lamp holders, especially Edison screw types.",
        expectedResult: "Line connected to centre contact of ES lampholders, neutral to outer thread",
        safetyWarnings: [
          {
            level: "MEDIUM",
            message: "Incorrect polarity at ES lampholders creates shock risk during lamp changing"
          }
        ],
        tips: [
          "Pay special attention to ES lampholders",
          "Check pendant and ceiling roses",
          "Verify switch line connections"
        ]
      }
    ],
    professionalTips: [
      "Correct polarity is critical for safety and proper RCD operation",
      "Use systematic approach to avoid missing circuits",
      "Document any polarity corrections made",
      "Retest after any corrections"
    ],
    troubleshootingGuide: [
      {
        symptom: "RCD trips unexpectedly when circuit is energised",
        possibleCauses: ["Incorrect polarity causing N-E fault", "Mixed neutrals between RCD circuits"],
        solutions: ["Check polarity at all outlets", "Verify neutral separation", "Test with loads disconnected"]
      }
    ]
  },
  {
    id: "earth-electrode-resistance",
    title: "Earth Electrode Resistance",
    description: "Measure resistance of earth electrodes in TT systems",
    purpose: "To verify earth electrode provides adequate resistance for effective earthing in TT installations",
    duration: "30-40 mins",
    difficulty: "Advanced",
    category: "Initial Verification",
    regulationReference: "BS 7671:2018 Section 612.7",
    equipment: [
      { 
        name: "Earth Electrode Tester", 
        purpose: "3-terminal or 4-terminal measurement",
        settings: ["Fall of potential method", "Test current typically 25mA"]
      },
      { name: "Test Spikes", purpose: "Current and potential electrodes" },
      { name: "Test Leads", purpose: "Long leads for proper spacing" }
    ],
    testLimits: [
      { parameter: "Maximum resistance (30mA RCD)", limit: "≤ 1667", unit: "Ω" },
      { parameter: "Maximum resistance (100mA RCD)", limit: "≤ 500", unit: "Ω" }
    ],
    safetyPrecautions: [
      "Ensure installation is isolated from supply",
      "Disconnect earth electrode from installation",
      "Be aware of buried services when driving test spikes",
      "Use insulated test leads throughout"
    ],
    commonIssues: [
      "High resistance due to dry soil conditions",
      "Corroded electrode connections",
      "Inadequate electrode depth or size",
      "Poor soil conductivity"
    ],
    steps: [
      {
        id: "electrode-preparation",
        title: "Electrode Preparation",
        instruction: "Disconnect earth electrode from installation earthing system. Clean electrode connection point.",
        expectedResult: "Electrode isolated and connection clean for accurate testing",
        tips: [
          "Remove all corrosion from connections",
          "Ensure complete isolation from installation",
          "Document electrode type and installation method"
        ]
      },
      {
        id: "test-spike-positioning",
        title: "Position Test Spikes",
        instruction: "Drive current spike at distance >10× electrode length, potential spike at 62% of distance between.",
        expectedResult: "Proper geometric arrangement for accurate fall-of-potential measurement",
        safetyWarnings: [
          {
            level: "MEDIUM",
            message: "Check for buried services before driving spikes"
          }
        ],
        tips: [
          "Use straight line arrangement if possible",
          "Ensure spikes make good ground contact",
          "Allow for cable routing to tester"
        ]
      },
      {
        id: "resistance-measurement",
        title: "Measure Electrode Resistance",
        instruction: "Connect tester and measure resistance using fall-of-potential method. Take multiple readings.",
        expectedResult: "Stable resistance reading within acceptable limits for RCD rating",
        tips: [
          "Take readings at different potential spike positions",
          "Ensure readings are consistent",
          "Note soil conditions and weather"
        ]
      },
      {
        id: "verification-test",
        title: "Verification and Documentation",
        instruction: "Verify reading stability and document results with soil conditions and electrode details.",
        expectedResult: "Documented proof of electrode performance with environmental conditions",
        tips: [
          "Include soil type and moisture conditions",
          "Document electrode material and dimensions",
          "Consider seasonal variations"
        ]
      }
    ],
    professionalTips: [
      "Soil moisture dramatically affects readings - consider seasonal testing",
      "Multiple electrodes in parallel reduce overall resistance",
      "Consider soil treatment if readings are consistently high",
      "Regular retesting recommended for TT installations"
    ],
    troubleshootingGuide: [
      {
        symptom: "Resistance too high for RCD rating",
        possibleCauses: ["Dry soil conditions", "Inadequate electrode", "Poor connections"],
        solutions: ["Consider additional electrodes", "Improve electrode connections", "Use lower rated RCD"]
      }
    ]
  },
  {
    id: "earth-fault-loop-impedance",
    title: "Earth Fault Loop Impedance (Zs)",
    description: "Measure earth fault loop impedance to verify protective device operation",
    purpose: "To ensure earth fault loop impedance is low enough for protective devices to operate within required time",
    duration: "20-30 mins",
    difficulty: "Intermediate",
    category: "Initial Verification",
    regulationReference: "BS 7671:2018 Section 612.9",
    equipment: [
      { 
        name: "Earth Fault Loop Impedance Tester", 
        purpose: "Measure Zs without RCD tripping",
        settings: ["No-trip test current <30mA", "Standard test for non-RCD circuits"]
      },
      { name: "Test Leads", purpose: "Connect to line and earth terminals" }
    ],
    testLimits: [
      { parameter: "Maximum Zs", limit: "Per BS 7671 Tables 41.2-41.4", unit: "Ω" },
      { parameter: "Temperature correction", limit: "Multiply by 0.8 for 70°C", unit: "-" }
    ],
    safetyPrecautions: [
      "Use no-trip mode for RCD protected circuits",
      "Ensure adequate earth connection for testing",
      "Verify test equipment is suitable for installation type",
      "Consider parallel earth paths in measurement"
    ],
    commonIssues: [
      "High Zs readings preventing protective device operation",
      "RCD tripping during standard Zs test",
      "Parallel earth paths affecting readings",
      "Temperature effects on conductor resistance"
    ],
    steps: [
      {
        id: "circuit-identification",
        title: "Circuit Identification and Preparation",
        instruction: "Identify circuit type, protective device rating, and required maximum Zs value from regulations.",
        expectedResult: "Clear understanding of acceptable Zs limits for each circuit",
        tips: [
          "Refer to BS 7671 Tables 41.2-41.4",
          "Consider protective device characteristics",
          "Note any special requirements"
        ]
      },
      {
        id: "test-method-selection",
        title: "Select Appropriate Test Method",
        instruction: "Choose no-trip method for RCD circuits, standard method for non-RCD circuits.",
        expectedResult: "Correct test method selected to avoid unwanted RCD tripping",
        tips: [
          "Use no-trip for RCD/RCBO protected circuits",
          "Standard test acceptable for MCB-only circuits",
          "Consider supply impedance in calculations"
        ]
      },
      {
        id: "zs-measurement",
        title: "Measure Earth Fault Loop Impedance",
        instruction: "Connect tester between line and earth at furthest point of circuit. Record Zs reading.",
        expectedResult: "Zs reading within acceptable limits considering temperature correction",
        tips: [
          "Test at furthest point from origin",
          "Allow reading to stabilise",
          "Apply temperature correction factor"
        ],
        troubleshooting: [
          "High readings may indicate poor earth connections",
          "Very low readings suggest parallel earth paths"
        ]
      },
      {
        id: "verification-calculation",
        title: "Verify Against Regulations",
        instruction: "Compare measured Zs with maximum permitted values, applying temperature correction if necessary.",
        expectedResult: "All circuits comply with maximum Zs requirements",
        tips: [
          "Apply 0.8 multiplier for ambient temperature correction",
          "Consider actual operating temperature",
          "Document any marginal readings"
        ]
      }
    ],
    professionalTips: [
      "External loop impedance (Ze) affects all circuit measurements",
      "Consider diversity factor for final circuit calculations",
      "Parallel earth paths can give misleadingly low readings",
      "Regular Ze testing recommended for supply verification"
    ],
    troubleshootingGuide: [
      {
        symptom: "Zs reading exceeds maximum permitted value",
        possibleCauses: ["High external impedance", "Poor circuit earth connection", "Undersized conductors"],
        solutions: ["Check Ze at origin", "Improve earth connections", "Consider circuit modification"]
      }
    ]
  },
  {
    id: "rcd-testing",
    title: "RCD Testing (Residual Current Device)",
    description: "Comprehensive testing of RCD operation including trip times and sensitivity",
    purpose: "To verify RCDs operate correctly within specified time limits for personal protection",
    duration: "25-35 mins",
    difficulty: "Intermediate",
    category: "Initial Verification",
    regulationReference: "BS 7671:2018 Section 612.13",
    equipment: [
      { 
        name: "RCD Tester", 
        purpose: "Test trip current and time",
        settings: ["Test currents: ½×IΔn, 1×IΔn, 5×IΔn", "Phase angles: 0° and 180°"]
      },
      { name: "Test Leads", purpose: "Connect to line, neutral and earth" }
    ],
    testLimits: [
      { parameter: "Trip time at 1×IΔn", limit: "≤ 300", unit: "ms" },
      { parameter: "Trip time at 5×IΔn", limit: "≤ 40", unit: "ms" },
      { parameter: "No trip at ½×IΔn", limit: "∞", unit: "ms" }
    ],
    safetyPrecautions: [
      "Test RCD push-button operation first",
      "Ensure downstream circuits are isolated during testing",
      "Use appropriate test equipment for RCD type",
      "Reset RCD after each test"
    ],
    commonIssues: [
      "RCD not tripping within time limits",
      "Nuisance tripping during normal operation",
      "Failure to reset after test",
      "Incorrect RCD type for application"
    ],
    steps: [
      {
        id: "push-button-test",
        title: "Push Button Test",
        instruction: "Operate RCD test button to verify mechanical operation. RCD should trip and be resettable.",
        expectedResult: "RCD trips reliably and can be reset without difficulty",
        safetyWarnings: [
          {
            level: "HIGH",
            message: "If push button test fails, do not proceed with electrical testing"
          }
        ],
        tips: [
          "Test button should be operated monthly",
          "RCD should trip immediately when pressed",
          "Check reset operation is smooth"
        ]
      },
      {
        id: "half-rated-current-test",
        title: "Half Rated Current Test",
        instruction: "Apply test current of ½×IΔn for maximum test duration. RCD should NOT trip.",
        expectedResult: "RCD remains closed throughout test period",
        tips: [
          "This tests RCD sensitivity threshold",
          "Test should run for full duration without trip",
          "Check both 0° and 180° phase angles"
        ]
      },
      {
        id: "rated-current-test",
        title: "Rated Current Test (1×IΔn)",
        instruction: "Apply test current of 1×IΔn and measure trip time. Test at both 0° and 180° phase angles.",
        expectedResult: "Trip time ≤300ms at worst case phase angle",
        tips: [
          "Record the longer of the two trip times",
          "Ensure RCD resets between tests",
          "Note any significant difference between angles"
        ]
      },
      {
        id: "five-times-current-test",
        title: "Five Times Current Test (5×IΔn)",
        instruction: "Apply test current of 5×IΔn and measure trip time for fast disconnection verification.",
        expectedResult: "Trip time ≤40ms ensuring rapid fault clearance",
        tips: [
          "This tests fast trip capability",
          "Essential for shock protection",
          "Should be consistently fast"
        ]
      },
      {
        id: "ramp-test",
        title: "Ramp Test (Optional)",
        instruction: "Gradually increase test current to determine actual trip threshold.",
        expectedResult: "Trip current between 50% and 100% of rated residual current",
        tips: [
          "Useful for determining RCD sensitivity",
          "Should trip between ½IΔn and IΔn",
          "Indicates RCD condition"
        ]
      }
    ],
    professionalTips: [
      "Test RCDs quarterly in commercial installations",
      "Document any deterioration in performance over time",
      "Consider Type A or Type F RCDs for electronic loads",
      "Ensure correct discrimination between RCDs"
    ],
    troubleshootingGuide: [
      {
        symptom: "RCD fails to trip at rated current",
        possibleCauses: ["Faulty RCD mechanism", "Incorrect test connections", "Electronic interference"],
        solutions: ["Replace RCD", "Check test lead connections", "Test with loads isolated"]
      },
      {
        symptom: "Trip time exceeds limits",
        possibleCauses: ["Worn RCD contacts", "Mechanical wear", "Temperature effects"],
        solutions: ["Replace RCD", "Check operating temperature", "Consider environmental factors"]
      }
    ]
  },
  {
    id: "prospective-short-circuit-current",
    title: "Prospective Short Circuit Current (PSCC)",
    description: "Measure maximum fault current to verify protective device breaking capacity",
    purpose: "To ensure protective devices can safely interrupt maximum prospective fault currents",
    duration: "20-25 mins",
    difficulty: "Advanced",
    category: "Initial Verification",
    regulationReference: "BS 7671:2018 Section 612.11",
    equipment: [
      { 
        name: "Prospective Short Circuit Current Tester", 
        purpose: "Measure fault current capacity",
        settings: ["Test between L-N and L-E", "No-trip mode for safety"]
      },
      { name: "Loop Impedance Tester", purpose: "Alternative calculation method" }
    ],
    testLimits: [
      { parameter: "PSCC at origin", limit: "Must not exceed protective device breaking capacity", unit: "kA" },
      { parameter: "Minimum PSCC", limit: "Must ensure protective device operation", unit: "A" }
    ],
    safetyPrecautions: [
      "Use no-trip test methods only",
      "Ensure all equipment rated for measured fault levels",
      "Verify protective device breaking capacity",
      "Consider supply authority fault levels"
    ],
    commonIssues: [
      "PSCC exceeding protective device rating",
      "Insufficient fault current for protection operation",
      "Supply impedance changes affecting calculations",
      "Parallel path effects on measurements"
    ],
    steps: [
      {
        id: "breaking-capacity-verification",
        title: "Verify Protective Device Ratings",
        instruction: "Check breaking capacity (Icn or Ics) of all protective devices against expected fault levels.",
        expectedResult: "All devices have adequate breaking capacity for installation",
        tips: [
          "Check device nameplate ratings",
          "Consider both MCB and RCD ratings",
          "Verify coordination between devices"
        ]
      },
      {
        id: "pscc-measurement-ln",
        title: "Measure Line-Neutral PSCC",
        instruction: "Connect tester between line and neutral at origin. Measure prospective fault current.",
        expectedResult: "PSCC reading within protective device breaking capacity",
        tips: [
          "Test at main distribution board",
          "Use no-trip measurement mode",
          "Record maximum value"
        ]
      },
      {
        id: "pscc-measurement-le",
        title: "Measure Line-Earth PSCC",
        instruction: "Connect tester between line and earth to measure earth fault current capacity.",
        expectedResult: "Earth fault current sufficient for protective device operation",
        tips: [
          "Usually lower than L-N fault current",
          "Critical for earth fault protection",
          "Compare with Zs measurements"
        ]
      },
      {
        id: "downstream-verification",
        title: "Verify Downstream Protection",
        instruction: "Calculate or measure PSCC at downstream distribution boards and major circuits.",
        expectedResult: "All downstream devices adequately rated for local fault levels",
        tips: [
          "Fault current reduces with distance",
          "Consider cable impedance effects",
          "Check sub-main protection coordination"
        ]
      }
    ],
    professionalTips: [
      "Supply authority can provide fault level data",
      "PSCC can change with supply modifications",
      "Consider future load increases in calculations",
      "Document fault levels for future reference"
    ],
    troubleshootingGuide: [
      {
        symptom: "PSCC exceeds device breaking capacity",
        possibleCauses: ["Undersized protective devices", "High supply fault level", "Parallel supply paths"],
        solutions: ["Install higher rated devices", "Add current limiting devices", "Modify supply arrangement"]
      }
    ]
  },
  {
    id: "phase-sequence",
    title: "Phase Sequence Testing",
    description: "Verify correct phase rotation in three-phase installations",
    purpose: "To ensure three-phase equipment operates correctly with proper phase sequence",
    duration: "10-15 mins",
    difficulty: "Beginner",
    category: "Initial Verification",
    regulationReference: "BS 7671:2018 Section 612.12",
    equipment: [
      { name: "Phase Sequence Indicator", purpose: "Visual indication of phase rotation" },
      { name: "Three-phase Socket Tester", purpose: "Quick verification at outlets" },
      { name: "Multimeter", purpose: "Phase-to-phase voltage verification" }
    ],
    testLimits: [
      { parameter: "Phase sequence", limit: "L1, L2, L3 (clockwise rotation)", unit: "-" },
      { parameter: "Phase voltage balance", limit: "Within ±5% of nominal", unit: "V" }
    ],
    safetyPrecautions: [
      "Verify safe working voltage before testing",
      "Use appropriate category test equipment",
      "Ensure proper phase identification before energising loads",
      "Test on isolated circuits where possible"
    ],
    commonIssues: [
      "Incorrect phase sequence causing motor reverse rotation",
      "Phase imbalance affecting equipment operation",
      "Swapped phases in distribution systems",
      "Inconsistent phase labelling"
    ],
    steps: [
      {
        id: "supply-verification",
        title: "Supply Phase Verification",
        instruction: "Verify three-phase supply at main distribution board using phase sequence indicator.",
        expectedResult: "Correct L1-L2-L3 sequence confirmed at supply origin",
        tips: [
          "Connect indicator to incoming supply",
          "Verify with supply documentation",
          "Check phase voltage balance"
        ]
      },
      {
        id: "distribution-sequence",
        title: "Distribution Board Sequence",
        instruction: "Verify phase sequence maintained throughout distribution system.",
        expectedResult: "Consistent phase sequence at all distribution points",
        tips: [
          "Check each distribution board systematically",
          "Verify correct phase identification labels",
          "Ensure no inadvertent phase swapping"
        ]
      },
      {
        id: "motor-connections",
        title: "Motor Connection Verification",
        instruction: "Verify correct phase sequence at motor connection points before energising.",
        expectedResult: "Motors will rotate in correct direction when energised",
        safetyWarnings: [
          {
            level: "MEDIUM",
            message: "Incorrect sequence may damage equipment or create safety hazards"
          }
        ],
        tips: [
          "Test before connecting motor loads",
          "Document correct connections",
          "Consider direction of rotation requirements"
        ]
      },
      {
        id: "three-phase-outlets",
        title: "Three-Phase Outlet Testing",
        instruction: "Test phase sequence at all three-phase socket outlets using appropriate tester.",
        expectedResult: "All outlets provide correct phase sequence for connected equipment",
        tips: [
          "Use three-phase socket tester",
          "Check industrial outlets and CEE connections",
          "Verify outlet labelling matches actual phases"
        ]
      }
    ],
    professionalTips: [
      "Phase sequence affects motor rotation and equipment operation",
      "Document phase arrangements for future maintenance",
      "Consider using phase monitoring relays for critical equipment",
      "Check sequence after any electrical modifications"
    ],
    troubleshootingGuide: [
      {
        symptom: "Motor rotating in wrong direction",
        possibleCauses: ["Incorrect phase sequence", "Swapped motor connections", "Wrong phase at outlet"],
        solutions: ["Correct phase sequence", "Swap any two motor phases", "Rectify outlet connections"]
      }
    ]
  }
];

export const getTestGuideById = (id: string): EnhancedTestGuide | undefined => {
  return comprehensiveTestingGuides.find(guide => guide.id === id);
};

export const getTestGuidesByDifficulty = (difficulty: 'Beginner' | 'Intermediate' | 'Advanced'): EnhancedTestGuide[] => {
  return comprehensiveTestingGuides.filter(guide => guide.difficulty === difficulty);
};

export const getTestGuidesByCategory = (category: 'Initial Verification' | 'Periodic Inspection' | 'Visual Inspection'): EnhancedTestGuide[] => {
  return comprehensiveTestingGuides.filter(guide => guide.category === category);
};
