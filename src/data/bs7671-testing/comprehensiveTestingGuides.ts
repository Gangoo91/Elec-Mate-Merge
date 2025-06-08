
export interface EnhancedTestStep {
  id: string;
  title: string;
  instruction: string;
  expectedResult: string;
  safetyWarning?: string;
  tips?: string[];
  equipment: string[];
  technicalNotes?: string;
  troubleshooting?: string[];
  regulationReferences?: string[];
  estimatedTime?: string;
  difficulty?: "Basic" | "Intermediate" | "Advanced";
}

export interface EnhancedTestGuide {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  steps: EnhancedTestStep[];
  purpose: string;
  regulationReferences: string[];
  prerequisites: string[];
  commonIssues: string[];
  testLimits: {
    parameter: string;
    limit: string;
    unit: string;
  }[];
}

export const comprehensiveTestingGuides: EnhancedTestGuide[] = [
  {
    id: "safe-isolation-procedure",
    title: "Safe Isolation Procedure",
    description: "Critical safety procedure that must be followed before any electrical testing work",
    duration: "5-10 mins",
    difficulty: "Beginner",
    purpose: "To ensure the electrical installation is safely isolated before testing, preventing electric shock and equipment damage",
    regulationReferences: ["BS 7671 Regulation 612.1", "GS 38 Test Probe Guidance", "HSE Guidance HSG85"],
    prerequisites: ["Valid electrical qualification", "Appropriate test equipment", "Understanding of the installation"],
    commonIssues: [
      "Failure to test voltage indicator on known live source",
      "Not checking all phases in 3-phase supplies",
      "Inadequate locking off procedures"
    ],
    testLimits: [],
    steps: [
      {
        id: "identify-circuit",
        title: "Identify the Circuit",
        instruction: "Clearly identify the circuit to be isolated using circuit diagrams, labels, or distribution board schedules. Confirm the circuit supplies the correct installation area.",
        expectedResult: "Circuit clearly identified and confirmed to supply the correct area",
        safetyWarning: "Never assume circuit identification is correct - always verify",
        tips: [
          "Use a circuit tracer if circuit identification is unclear",
          "Check multiple outlets to confirm circuit extent",
          "Refer to updated circuit diagrams where available"
        ],
        equipment: ["Circuit diagrams", "Circuit tracer", "Torch"],
        technicalNotes: "Circuit identification errors are a leading cause of electrical accidents. Take time to verify circuit routes.",
        troubleshooting: [
          "If circuit labels are unclear, use a non-contact voltage detector to trace the circuit",
          "For unlabelled circuits, systematically switch off breakers while checking outlets"
        ],
        regulationReferences: ["BS 7671 Section 514", "IET Guidance Note 3 Section 2.3"],
        estimatedTime: "2-3 minutes",
        difficulty: "Basic"
      },
      {
        id: "switch-off-isolate",
        title: "Switch Off and Isolate",
        instruction: "Switch off the circuit at the distribution board. For circuits with local isolation, also isolate at the local switch. Remove fuses or lock off MCBs/RCBOs using appropriate locking devices.",
        expectedResult: "Circuit switched off at all relevant points and securely locked off",
        safetyWarning: "Use only approved locking devices - never rely on tape or sticky labels",
        tips: [
          "Use multiple locking devices where several people are working",
          "Attach warning notices to isolation points",
          "Keep isolation keys under your personal control"
        ],
        equipment: ["MCB lockout devices", "Warning labels", "Personal padlocks"],
        technicalNotes: "Isolation must be at a point that prevents re-energisation by others. Simple switching off is not sufficient.",
        troubleshooting: [
          "If MCB won't lock off, check you have the correct lockout device",
          "For old-style rewireable fuses, remove fuse wire completely"
        ],
        regulationReferences: ["BS 7671 Regulation 462.2", "HSE Guidance HSG85 Section 3"],
        estimatedTime: "1-2 minutes",
        difficulty: "Basic"
      },
      {
        id: "test-voltage-indicator",
        title: "Test Voltage Indicator",
        instruction: "Test your voltage indicator on a known live source (proving unit or another live circuit) to confirm it's working correctly. The device must indicate the presence of voltage clearly.",
        expectedResult: "Voltage indicator clearly indicates presence of voltage on known live source",
        safetyWarning: "Never proceed if voltage indicator fails to work on known live source",
        tips: [
          "Test voltage indicator immediately before and after use",
          "Use a proving unit that matches the voltage you'll be testing",
          "Check battery levels in electronic voltage indicators"
        ],
        equipment: ["Voltage indicator (GS38 compliant)", "Proving unit", "Known live source"],
        technicalNotes: "GS38 requires voltage indicators to have fused test prods, insulated leads, and finger guards. Non-contact detectors alone are not sufficient.",
        troubleshooting: [
          "If voltage indicator fails, use a backup device",
          "Check test lead continuity if voltage indicator seems faulty"
        ],
        regulationReferences: ["HSE GS38", "BS 7671 Regulation 612.2.1"],
        estimatedTime: "1 minute",
        difficulty: "Basic"
      },
      {
        id: "test-dead",
        title: "Test Dead",
        instruction: "Test the isolated circuit with the voltage indicator to confirm absence of voltage. Test between all live conductors and between live conductors and earth. In 3-phase supplies, test all six combinations.",
        expectedResult: "No voltage detected between any conductors",
        safetyWarning: "Test ALL conductor combinations - dangerous voltages may exist between unexpected points",
        tips: [
          "Test at the point of work, not just at the distribution board",
          "For 3-phase: test L1-L2, L1-L3, L2-L3, L1-E, L2-E, L3-E",
          "Use appropriate PPE even when testing 'dead' circuits"
        ],
        equipment: ["Voltage indicator", "PPE", "Test leads"],
        technicalNotes: "Backfeed from other circuits, induced voltages, or faulty switching can create unexpected live conductors.",
        troubleshooting: [
          "If voltage is detected, investigate source before proceeding",
          "Check for backfeed through neutral connections",
          "Verify all switching points are actually open"
        ],
        regulationReferences: ["BS 7671 Regulation 612.2.2", "IET Guidance Note 3 Section 2.3.2"],
        estimatedTime: "2-3 minutes",
        difficulty: "Intermediate"
      },
      {
        id: "retest-voltage-indicator",
        title: "Re-test Voltage Indicator",
        instruction: "Test the voltage indicator again on the known live source to confirm it's still working correctly after testing the dead circuit.",
        expectedResult: "Voltage indicator still indicates presence of voltage on known live source",
        safetyWarning: "If voltage indicator fails this test, the dead test results are invalid",
        tips: [
          "This confirms your voltage indicator didn't fail during the dead test",
          "Always complete this step even if you're confident the circuit is dead"
        ],
        equipment: ["Voltage indicator", "Proving unit or known live source"],
        technicalNotes: "This 'prove-test-prove' sequence is fundamental to electrical safety and is required by regulations.",
        troubleshooting: [
          "If voltage indicator fails, repeat entire isolation procedure with working device"
        ],
        regulationReferences: ["HSE GS38", "BS 7671 Regulation 612.2.1"],
        estimatedTime: "1 minute",
        difficulty: "Basic"
      }
    ]
  },
  {
    id: "protective-conductor-continuity",
    title: "Protective Conductor Continuity Testing",
    description: "Verify the continuity of protective conductors including main equipotential bonding, supplementary bonding, and circuit protective conductors",
    duration: "15-25 mins",
    difficulty: "Intermediate",
    purpose: "To ensure protective conductors can carry fault currents safely and provide effective earthing for shock protection",
    regulationReferences: ["BS 7671 Regulation 612.2.1", "IET Guidance Note 3 Section 10.3"],
    prerequisites: ["Safe isolation completed", "Access to all test points", "Calibrated low resistance ohmmeter"],
    commonIssues: [
      "High resistance joints in protective conductors",
      "Broken or damaged earth conductors",
      "Poor bonding connections"
    ],
    testLimits: [
      {
        parameter: "Protective conductor resistance",
        limit: "≤ 1.67 × line conductor resistance",
        unit: "Ω"
      },
      {
        parameter: "Main bonding conductor",
        limit: "≤ 0.05",
        unit: "Ω"
      },
      {
        parameter: "Supplementary bonding",
        limit: "≤ 0.05",
        unit: "Ω"
      }
    ],
    steps: [
      {
        id: "equipment-setup",
        title: "Equipment Setup and Calibration",
        instruction: "Set up low resistance ohmmeter and verify calibration. Select appropriate test current (typically 200mA minimum). Connect test leads and zero the instrument if required.",
        expectedResult: "Instrument shows stable zero reading when leads are connected together",
        safetyWarning: "Ensure circuit is isolated and proven dead before connecting test equipment",
        tips: [
          "Use the shortest possible test leads to minimise lead resistance",
          "Check test lead resistance and subtract from readings if necessary",
          "Ensure good electrical contact at test points"
        ],
        equipment: ["Low resistance ohmmeter", "Test leads", "Calibration certificate"],
        technicalNotes: "Test current must be between 4mA and 24V DC, with 200mA preferred for accurate readings on low resistance circuits.",
        troubleshooting: [
          "If instrument won't zero, check test lead connections",
          "Clean oxidised test points for better contact"
        ],
        regulationReferences: ["BS 7671 Regulation 612.2.1", "IET Guidance Note 3 Section 2.7.1"],
        estimatedTime: "3-5 minutes",
        difficulty: "Basic"
      },
      {
        id: "main-bonding-test",
        title: "Main Equipotential Bonding Test",
        instruction: "Test continuity from main earthing terminal to water pipes, gas pipes, oil pipes, and structural steelwork. Measure resistance of each bonding conductor.",
        expectedResult: "All main bonding conductors show resistance ≤ 0.05Ω",
        safetyWarning: "Ensure metallic services are properly identified - some may have insulating sections",
        tips: [
          "Test to the point where bonding clamp connects to the service",
          "Check bonding clamp tightness before testing",
          "Record the measured value even if within limits"
        ],
        equipment: ["Low resistance ohmmeter", "Test leads", "Access to MET and services"],
        technicalNotes: "Main bonding conductors must be minimum 10mm² copper for most domestic installations, larger for higher fault currents.",
        troubleshooting: [
          "High readings may indicate loose connections or corroded clamps",
          "Check clamp is making good contact with pipe/steelwork"
        ],
        regulationReferences: ["BS 7671 Section 411.3.1.2", "Regulation 544.1"],
        estimatedTime: "5-8 minutes",
        difficulty: "Intermediate"
      },
      {
        id: "circuit-cpc-test",
        title: "Circuit Protective Conductor Test",
        instruction: "Test each circuit's protective conductor from distribution board to furthest point. Connect between earth terminal at board and earth terminal at remote end.",
        expectedResult: "CPC resistance ≤ 1.67 × line conductor resistance for the same circuit",
        safetyWarning: "Ensure all parallel earth paths are considered - may need to disconnect some connections",
        tips: [
          "Test to socket outlets, switches, and fixed equipment",
          "Record both directions for verification",
          "Consider temperature effects on resistance"
        ],
        equipment: ["Low resistance ohmmeter", "Test leads", "Circuit schedules"],
        technicalNotes: "The 1.67 factor accounts for the lower cross-sectional area typically used for CPCs compared to line conductors.",
        troubleshooting: [
          "If readings are high, check for broken earth conductors",
          "Verify circuit identification is correct",
          "Check earth terminal connections are tight"
        ],
        regulationReferences: ["BS 7671 Table 54.7", "IET Guidance Note 3 Section 10.3.1"],
        estimatedTime: "2-3 minutes per circuit",
        difficulty: "Intermediate"
      },
      {
        id: "supplementary-bonding",
        title: "Supplementary Bonding Test",
        instruction: "In special locations (bathrooms, etc.), test supplementary bonding between simultaneously accessible metalwork. Test between all combinations of bonded metalwork.",
        expectedResult: "Resistance between bonded parts ≤ 0.05Ω",
        safetyWarning: "Remove paint or oxidation from contact points for accurate readings",
        tips: [
          "Test all combinations in bathroom: taps to radiator, taps to bath, etc.",
          "Check bonding extends to incoming services within the room",
          "Verify bonding conductor size meets requirements"
        ],
        equipment: ["Low resistance ohmmeter", "Test leads", "Wire brush for cleaning contacts"],
        technicalNotes: "Supplementary bonding may not be required if certain conditions are met, including 30mA RCD protection.",
        troubleshooting: [
          "High readings indicate poor bonding connections",
          "Check if plastic fittings are interrupting metallic continuity"
        ],
        regulationReferences: ["BS 7671 Section 415.2", "Special locations sections 701-753"],
        estimatedTime: "5-10 minutes",
        difficulty: "Advanced"
      }
    ]
  },
  {
    id: "insulation-resistance-comprehensive",
    title: "Insulation Resistance Testing",
    description: "Comprehensive testing of insulation resistance between conductors and to earth to verify electrical safety",
    duration: "20-30 mins",
    difficulty: "Intermediate",
    purpose: "To verify the insulation between conductors and earth can withstand normal operating voltages without breakdown",
    regulationReferences: ["BS 7671 Regulation 612.3", "IET Guidance Note 3 Section 10.4"],
    prerequisites: ["Safe isolation completed", "Electronic equipment disconnected", "Insulation tester calibrated"],
    commonIssues: [
      "Failure to disconnect electronic equipment causing damage",
      "Moisture in installation reducing readings",
      "Using wrong test voltage for circuit voltage"
    ],
    testLimits: [
      {
        parameter: "SELV/PELV circuits",
        limit: "≥ 0.5",
        unit: "MΩ"
      },
      {
        parameter: "Low voltage circuits (up to 500V)",
        limit: "≥ 1.0",
        unit: "MΩ"
      },
      {
        parameter: "High voltage circuits (above 500V)",
        limit: "≥ 1000V per kV + 1",
        unit: "MΩ"
      }
    ],
    steps: [
      {
        id: "preparation-disconnection",
        title: "Preparation and Equipment Disconnection",
        instruction: "Disconnect or isolate all electronic equipment, fluorescent fittings with electronic ballasts, dimmer switches, surge protection devices, and any equipment marked as sensitive to insulation testing.",
        expectedResult: "All sensitive equipment protected from test voltage",
        safetyWarning: "Failure to disconnect electronic equipment will cause permanent damage during insulation testing",
        tips: [
          "Make a list of items to reconnect after testing",
          "Consider using lower test voltage (250V) if some equipment cannot be disconnected",
          "Remove fluorescent tubes to isolate electronic ballasts",
          "Disconnect computer equipment and electronic timers"
        ],
        equipment: ["Circuit diagrams", "Labels for tracking disconnections"],
        technicalNotes: "Modern installations contain many electronic devices sensitive to the high voltages used in insulation testing (typically 500V or 1000V DC).",
        troubleshooting: [
          "If equipment list is unavailable, visually inspect for electronic devices",
          "When in doubt, disconnect - replacement costs are high"
        ],
        regulationReferences: ["IET Guidance Note 3 Section 10.4.2", "BS 7671 Regulation 612.3.2"],
        estimatedTime: "5-10 minutes",
        difficulty: "Intermediate"
      },
      {
        id: "test-voltage-selection",
        title: "Test Voltage Selection and Setup",
        instruction: "Select appropriate test voltage: 250V DC for SELV/PELV, 500V DC for low voltage up to 500V, 1000V DC for circuits above 500V. Set up insulation tester and verify operation.",
        expectedResult: "Correct test voltage selected and insulation tester ready for use",
        safetyWarning: "Using incorrect test voltage may damage equipment or give false readings",
        tips: [
          "When in doubt, use 250V DC to protect sensitive circuits",
          "Check circuit voltage rating before selecting test voltage",
          "Verify insulation tester calibration date"
        ],
        equipment: ["Insulation resistance tester", "Test voltage selection guide", "Calibration certificate"],
        technicalNotes: "Test voltage must be DC to avoid capacitive effects. Higher voltages provide more stress on insulation but may damage sensitive equipment.",
        troubleshooting: [
          "If unsure of circuit voltage, check nameplate ratings on equipment",
          "For mixed installations, use lowest appropriate voltage"
        ],
        regulationReferences: ["BS 7671 Table 61.1", "IET Guidance Note 3 Table 10.1"],
        estimatedTime: "2-3 minutes",
        difficulty: "Basic"
      },
      {
        id: "line-neutral-test",
        title: "Line to Neutral Insulation Test",
        instruction: "Connect test leads between line and neutral conductors with all switches closed to include all wiring. Apply test voltage for minimum 1 minute and record stabilised reading.",
        expectedResult: "Minimum 1MΩ for circuits up to 500V (0.5MΩ for SELV/PELV)",
        safetyWarning: "Ensure all personnel are clear of circuit during testing - lethal voltages present",
        tips: [
          "Close all switches to test complete circuit wiring",
          "Allow reading to stabilise before recording",
          "Test each phase separately in 3-phase circuits"
        ],
        equipment: ["Insulation tester", "Insulated test leads", "Timer"],
        technicalNotes: "Capacitive charging current may cause initial low readings. Allow 15-60 seconds for stabilisation depending on cable length.",
        troubleshooting: [
          "Low readings may indicate moisture, damaged insulation, or connected equipment",
          "Gradually disconnect circuit sections to locate faults"
        ],
        regulationReferences: ["BS 7671 Regulation 612.3.2", "Table 61.1"],
        estimatedTime: "3-5 minutes per circuit",
        difficulty: "Intermediate"
      },
      {
        id: "line-earth-test",
        title: "Line to Earth Insulation Test",
        instruction: "Connect test leads between line conductor and earth with switches closed. Apply test voltage and record reading after stabilisation. Repeat for each line conductor in multi-phase circuits.",
        expectedResult: "Minimum 1MΩ for circuits up to 500V",
        safetyWarning: "Ensure earth connection is secure and all metalwork bonding is intact",
        tips: [
          "Test includes all connected metalwork through protective bonding",
          "Higher readings typically obtained than line-neutral test",
          "Check each phase individually in 3-phase installations"
        ],
        equipment: ["Insulation tester", "Earth connection point", "Test leads"],
        technicalNotes: "This test verifies insulation between live conductors and all earthed metalwork including structural steel, pipework, and equipment cases.",
        troubleshooting: [
          "Extremely high readings (>999MΩ) may indicate poor earth connection",
          "Low readings may indicate earth faults or moisture ingress"
        ],
        regulationReferences: ["BS 7671 Regulation 612.3.2", "IET Guidance Note 3 Section 10.4.4"],
        estimatedTime: "2-3 minutes per phase",
        difficulty: "Intermediate"
      },
      {
        id: "neutral-earth-test",
        title: "Neutral to Earth Insulation Test",
        instruction: "Connect test leads between neutral conductor and earth. In TN-C-S systems, expect low readings due to neutral-earth connection at source. In TT and IT systems, expect high readings.",
        expectedResult: "TN systems: Low resistance path expected. TT/IT systems: Minimum 1MΩ",
        safetyWarning: "In TN-C-S systems, neutral and earth are connected - do not be alarmed by low readings",
        tips: [
          "Know your earthing system type before interpreting results",
          "TN-C-S: neutral-earth link exists at transformer",
          "TT: neutral and earth are separate - expect high readings"
        ],
        equipment: ["Insulation tester", "Earthing system identification"],
        technicalNotes: "Test results depend entirely on earthing arrangement. TN systems have intentional neutral-earth connection, TT systems have separate earth electrode.",
        troubleshooting: [
          "Unexpected low readings in TT systems indicate accidental neutral-earth connection",
          "Very high readings in TN systems may indicate broken neutral-earth link"
        ],
        regulationReferences: ["BS 7671 Part 8 definitions", "IET Guidance Note 3 Section 10.4.5"],
        estimatedTime: "2-3 minutes",
        difficulty: "Advanced"
      }
    ]
  }
];

export const getComprehensiveTestGuideById = (id: string): EnhancedTestGuide | undefined => {
  return comprehensiveTestingGuides.find(guide => guide.id === id);
};

export const getComprehensiveTestGuidesByDifficulty = (difficulty: "Beginner" | "Intermediate" | "Advanced"): EnhancedTestGuide[] => {
  return comprehensiveTestingGuides.filter(guide => guide.difficulty === difficulty);
};
