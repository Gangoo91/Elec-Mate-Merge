
export interface BS7671TestStep {
  id: string;
  title: string;
  instruction: string;
  expectedResult: string;
  safetyWarning?: string;
  tips?: string[];
  equipment: string[];
  regulationReference?: string;
}

export interface BS7671Test {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  purpose: string;
  testLimits: Array<{
    parameter: string;
    limit: string;
    unit: string;
  }>;
  commonIssues: string[];
  steps: BS7671TestStep[];
  regulationClause: string;
}

export const allBS7671Tests: BS7671Test[] = [
  {
    id: "continuity-protective-conductor",
    title: "Protective Conductor Continuity",
    description: "Test the continuity of protective conductors to ensure effective earthing",
    duration: "10-15 mins",
    difficulty: "Beginner",
    purpose: "To verify the continuity of protective conductors and ensure they provide an effective earth fault path",
    testLimits: [
      { parameter: "Resistance", limit: "≤ 1.67 × line conductor resistance", unit: "Ω" }
    ],
    commonIssues: [
      "Poor connections at earth terminals",
      "Broken or damaged earth conductors",
      "High resistance readings due to corrosion"
    ],
    regulationClause: "BS 7671:2018 Section 612.2.1",
    steps: [
      {
        id: "setup",
        title: "Test Setup",
        instruction: "Set MFT to continuity/low resistance mode. Connect test leads to the protective conductor at the distribution board and at the furthest point of the circuit.",
        expectedResult: "MFT should be ready for testing with stable display",
        safetyWarning: "Ensure all circuits are isolated and proven dead before testing",
        tips: [
          "Use the lowest voltage setting on your MFT",
          "Ensure good electrical contact at test points"
        ],
        equipment: ["Multifunction Tester", "Test leads", "Voltage indicator"],
        regulationReference: "GN3 Section 10.3.1"
      },
      {
        id: "measure",
        title: "Take Measurement",
        instruction: "Press the test button on the MFT to measure the resistance of the protective conductor.",
        expectedResult: "Reading should be less than 1.67 times the line conductor resistance",
        tips: [
          "Record the reading accurately",
          "If reading is high, check connections"
        ],
        equipment: ["Multifunction Tester"]
      },
      {
        id: "record",
        title: "Record Results",
        instruction: "Document the measured value on the test certificate and compare with acceptable limits.",
        expectedResult: "All readings within acceptable limits and properly documented",
        tips: [
          "Use appropriate test certificate format",
          "Include circuit reference and reading"
        ],
        equipment: ["Test certificate", "Pen"]
      }
    ]
  },
  {
    id: "ring-circuit-continuity",
    title: "Ring Final Circuit Continuity",
    description: "Comprehensive testing of ring final circuits for continuity and correct wiring",
    duration: "15-20 mins",
    difficulty: "Intermediate",
    purpose: "To verify the continuity and correct wiring of ring final circuits",
    testLimits: [
      { parameter: "End-to-end resistance", limit: "Typically < 1", unit: "Ω" },
      { parameter: "Cross-connection test", limit: "Equal readings ±0.05", unit: "Ω" },
      { parameter: "Final R1+R2", limit: "≈ 1/4 of end-to-end", unit: "Ω" }
    ],
    commonIssues: [
      "Broken ring circuit",
      "Incorrect wiring of sockets",
      "Spurs wired as part of ring"
    ],
    regulationClause: "BS 7671:2018 Section 612.2.2",
    steps: [
      {
        id: "identify-ends",
        title: "Identify Circuit Ends",
        instruction: "At the distribution board, identify the two ends of the ring circuit (line, neutral, and earth conductors).",
        expectedResult: "Clear identification of both legs of the ring circuit",
        safetyWarning: "Ensure circuit is isolated and locked off",
        tips: [
          "Use a continuity tester to confirm circuit ends",
          "Label the conductors clearly"
        ],
        equipment: ["Continuity tester", "Labels", "Voltage indicator"]
      },
      {
        id: "end-to-end-test",
        title: "End-to-End Continuity",
        instruction: "Test continuity between the two ends of each conductor (L-L, N-N, E-E).",
        expectedResult: "Low resistance reading (typically less than 1Ω) for each conductor pair",
        tips: [
          "Record all three readings",
          "Readings should be similar for line and neutral"
        ],
        equipment: ["Multifunction Tester", "Test leads"]
      },
      {
        id: "cross-connection",
        title: "Cross-Connection Test",
        instruction: "Connect line of leg 1 to neutral of leg 2, and neutral of leg 1 to line of leg 2. Test between line and neutral at each socket outlet.",
        expectedResult: "Each socket should show approximately the same resistance reading",
        tips: [
          "This test confirms the ring is continuous and not broken",
          "Significant variation indicates a fault"
        ],
        equipment: ["Multifunction Tester", "Test leads"]
      },
      {
        id: "final-verification",
        title: "Final R1+R2 Test",
        instruction: "Reconnect conductors normally and measure R1+R2 at the furthest point from the board.",
        expectedResult: "R1+R2 reading should be approximately 1/4 of the end-to-end readings",
        tips: [
          "This confirms the ring integrity",
          "Record this value for Zs calculations"
        ],
        equipment: ["Multifunction Tester", "Test leads"]
      }
    ]
  },
  {
    id: "insulation-resistance-testing",
    title: "Insulation Resistance Testing",
    description: "Test insulation resistance between conductors to ensure electrical safety",
    duration: "15-25 mins",
    difficulty: "Intermediate",
    purpose: "To verify the integrity of cable insulation and prevent dangerous leakage currents",
    testLimits: [
      { parameter: "Circuits ≤ 500V", limit: "≥ 1", unit: "MΩ" },
      { parameter: "SELV/PELV circuits", limit: "≥ 0.25", unit: "MΩ" },
      { parameter: "Fire alarm circuits", limit: "≥ 0.5", unit: "MΩ" }
    ],
    commonIssues: [
      "Moisture ingress in cables",
      "Damaged cable insulation",
      "Electronic equipment not isolated"
    ],
    regulationClause: "BS 7671:2018 Section 612.3",
    steps: [
      {
        id: "preparation",
        title: "Test Preparation",
        instruction: "Remove or isolate all electronic equipment, fluorescent fittings, and surge protection devices. Set MFT to insulation resistance mode (500V DC for circuits up to 500V).",
        expectedResult: "All sensitive equipment protected and MFT ready for testing",
        safetyWarning: "Failure to isolate electronic equipment may damage it during testing",
        tips: [
          "Make a list of items to reconnect after testing",
          "Consider using 250V test voltage for circuits with electronic components"
        ],
        equipment: ["Multifunction Tester", "Insulation test leads"]
      },
      {
        id: "phase-neutral-test",
        title: "Phase to Neutral Test",
        instruction: "Connect test leads between phase and neutral conductors. Press and hold the test button for the full test duration.",
        expectedResult: "Minimum 1MΩ for circuits up to 500V (>1MΩ for SELV/PELV circuits)",
        tips: [
          "Maintain steady pressure on test button",
          "Allow reading to stabilize before recording"
        ],
        equipment: ["Multifunction Tester", "Insulation test leads"]
      },
      {
        id: "phase-earth-test",
        title: "Phase to Earth Test",
        instruction: "Connect test leads between phase conductor and earth. Perform insulation resistance test.",
        expectedResult: "Minimum 1MΩ for circuits up to 500V",
        tips: [
          "Ensure good contact with earth conductor",
          "Test each phase separately in three-phase circuits"
        ],
        equipment: ["Multifunction Tester", "Insulation test leads"]
      },
      {
        id: "neutral-earth-test",
        title: "Neutral to Earth Test",
        instruction: "Connect test leads between neutral conductor and earth. Perform final insulation resistance test.",
        expectedResult: "Minimum 1MΩ for circuits up to 500V",
        tips: [
          "This test may show lower readings in TN-C-S systems",
          "Record all readings accurately"
        ],
        equipment: ["Multifunction Tester", "Insulation test leads"]
      }
    ]
  },
  {
    id: "polarity-testing",
    title: "Polarity Testing",
    description: "Verify correct polarity of all electrical connections",
    duration: "10-15 mins",
    difficulty: "Beginner",
    purpose: "To ensure phase and neutral conductors are correctly connected and switches interrupt the phase conductor",
    testLimits: [
      { parameter: "Switch connections", limit: "Phase conductor only", unit: "-" },
      { parameter: "Socket outlets", limit: "Correct polarity", unit: "-" },
      { parameter: "Screw-in lampholders", limit: "Phase to center contact", unit: "-" }
    ],
    commonIssues: [
      "Reversed phase and neutral connections",
      "Switches connected to neutral instead of phase",
      "Incorrect socket wiring"
    ],
    regulationClause: "BS 7671:2018 Section 612.6",
    steps: [
      {
        id: "visual-inspection",
        title: "Visual Inspection",
        instruction: "Visually inspect all connections at distribution board, switches, and socket outlets for correct polarity.",
        expectedResult: "All connections appear correctly polarised",
        safetyWarning: "Ensure installation is isolated before inspection",
        tips: [
          "Check phase conductor (brown) connections",
          "Verify neutral conductor (blue) connections"
        ],
        equipment: ["Visual inspection"]
      },
      {
        id: "continuity-test",
        title: "Continuity Test Method",
        instruction: "With installation isolated, use continuity function to trace phase conductor from origin to each point of utilisation.",
        expectedResult: "Continuity confirmed between phase at origin and phase terminals at outlets",
        tips: [
          "Test each circuit separately",
          "Verify switches interrupt phase conductor only"
        ],
        equipment: ["Multifunction Tester", "Test leads"]
      },
      {
        id: "live-test",
        title: "Live Test Verification",
        instruction: "With installation energised, use approved voltage indicator to verify correct polarity at each outlet.",
        expectedResult: "Phase present only at designated terminals",
        safetyWarning: "Use appropriate PPE and follow safe working procedures",
        tips: [
          "Use proven voltage indicator",
          "Test indicator before and after use"
        ],
        equipment: ["Approved voltage indicator", "PPE"]
      }
    ]
  },
  {
    id: "earth-fault-loop-impedance",
    title: "Earth Fault Loop Impedance (Zs)",
    description: "Measure earth fault loop impedance to ensure adequate fault protection",
    duration: "10-15 mins",
    difficulty: "Intermediate",
    purpose: "To verify that the earth fault loop impedance is low enough to ensure automatic disconnection in the event of an earth fault",
    testLimits: [
      { parameter: "Ring circuits (32A Type B MCB)", limit: "≤ 1.44", unit: "Ω" },
      { parameter: "Radial circuits (20A Type B MCB)", limit: "≤ 2.3", unit: "Ω" },
      { parameter: "Lighting circuits (6A Type B MCB)", limit: "≤ 7.67", unit: "Ω" }
    ],
    commonIssues: [
      "High external earth fault loop impedance",
      "Poor earthing arrangements",
      "Long cable runs increasing impedance"
    ],
    regulationClause: "BS 7671:2018 Section 612.9",
    steps: [
      {
        id: "setup-test",
        title: "Test Setup",
        instruction: "Set MFT to earth fault loop impedance mode. Connect test leads to phase and earth at the point of test.",
        expectedResult: "MFT ready for Zs measurement",
        safetyWarning: "Ensure RCDs are temporarily bypassed or use no-trip mode",
        tips: [
          "Use no-trip function if available",
          "Ensure good contact at test points"
        ],
        equipment: ["Multifunction Tester", "Test leads"]
      },
      {
        id: "measure-zs",
        title: "Measure Zs",
        instruction: "Press test button to measure earth fault loop impedance. Record the reading.",
        expectedResult: "Reading within limits for the protective device rating",
        tips: [
          "Take reading at furthest point of circuit",
          "Account for temperature correction if required"
        ],
        equipment: ["Multifunction Tester"]
      },
      {
        id: "compare-limits",
        title: "Compare with Limits",
        instruction: "Compare measured Zs with maximum permitted values for the protective device.",
        expectedResult: "Measured Zs ≤ maximum permitted value",
        tips: [
          "Refer to BS 7671 Appendix 3 for limits",
          "Consider applying correction factors"
        ],
        equipment: ["BS 7671 regulations", "Calculator"]
      }
    ]
  },
  {
    id: "rcd-testing",
    title: "RCD Testing",
    description: "Comprehensive testing of RCD operation and trip times",
    duration: "15-20 mins",
    difficulty: "Intermediate",
    purpose: "To verify correct operation of residual current devices for additional protection",
    testLimits: [
      { parameter: "Trip current (general use)", limit: "≤ 30", unit: "mA" },
      { parameter: "Trip time at 1×IΔn", limit: "≤ 300", unit: "ms" },
      { parameter: "Trip time at 5×IΔn", limit: "≤ 40", unit: "ms" },
      { parameter: "Non-trip at 50% IΔn", limit: "No trip", unit: "-" }
    ],
    commonIssues: [
      "RCD fails to trip within time limits",
      "Nuisance tripping due to leakage",
      "Mechanical failure of RCD"
    ],
    regulationClause: "BS 7671:2018 Section 612.13",
    steps: [
      {
        id: "visual-check",
        title: "Visual and Push Button Test",
        instruction: "Visually inspect RCD for damage. Press the push button test to verify mechanical operation.",
        expectedResult: "RCD should trip and can be reset successfully",
        safetyWarning: "If push button test fails, do not proceed with electrical testing",
        tips: [
          "Test push button monthly as routine maintenance",
          "Check RCD resets properly after test"
        ],
        equipment: ["Visual inspection"]
      },
      {
        id: "ramp-test",
        title: "RCD Ramp Test",
        instruction: "Using RCD tester, perform ramp test to determine actual trip current (should be between 50% and 100% of rated current).",
        expectedResult: "RCD should not trip below 50% of rated current and must trip before 100%",
        tips: [
          "This test determines RCD sensitivity",
          "Slow ramp rate gives more accurate results"
        ],
        equipment: ["RCD Tester", "Test leads"]
      },
      {
        id: "trip-time-1x",
        title: "Trip Time Test at 1× Rated Current",
        instruction: "Test RCD trip time at 1× rated current (30mA for typical domestic RCD).",
        expectedResult: "Should trip within 300ms for general purpose RCDs",
        tips: [
          "Test at 0° and 180° phase angles",
          "Record the longer of the two readings"
        ],
        equipment: ["RCD Tester", "Test leads"]
      },
      {
        id: "trip-time-5x",
        title: "Trip Time Test at 5× Rated Current",
        instruction: "Test RCD trip time at 5× rated current (150mA for 30mA RCD).",
        expectedResult: "Should trip within 40ms",
        tips: [
          "This is the fastest trip time test",
          "Ensures RCD provides adequate shock protection"
        ],
        equipment: ["RCD Tester", "Test leads"]
      }
    ]
  },
  {
    id: "prospective-fault-current",
    title: "Prospective Fault Current (PFC)",
    description: "Measure prospective short circuit and earth fault currents",
    duration: "10-15 mins",
    difficulty: "Advanced",
    purpose: "To verify that protective devices can safely interrupt fault currents",
    testLimits: [
      { parameter: "Domestic installations", limit: "Typically 1-6", unit: "kA" },
      { parameter: "Commercial installations", limit: "Varies by supply", unit: "kA" },
      { parameter: "Breaking capacity", limit: "Must exceed PFC", unit: "kA" }
    ],
    commonIssues: [
      "PFC exceeds protective device rating",
      "High fault currents in urban areas",
      "Inadequate cable sizing for fault conditions"
    ],
    regulationClause: "BS 7671:2018 Section 612.11",
    steps: [
      {
        id: "setup-pfc-test",
        title: "Setup PFC Test",
        instruction: "Set MFT to prospective fault current mode. Connect test leads between phase and neutral for PSCC, and phase and earth for PEFC.",
        expectedResult: "MFT ready for PFC measurement",
        safetyWarning: "Ensure all RCDs are bypassed during test",
        tips: [
          "Test at origin of installation",
          "Use appropriate test leads rated for PFC testing"
        ],
        equipment: ["Multifunction Tester", "High current test leads"]
      },
      {
        id: "measure-pscc",
        title: "Measure PSCC",
        instruction: "Measure prospective short circuit current between phase and neutral conductors.",
        expectedResult: "PSCC value recorded",
        tips: [
          "This represents the maximum fault current between live conductors",
          "Usually higher than PEFC"
        ],
        equipment: ["Multifunction Tester"]
      },
      {
        id: "measure-pefc",
        title: "Measure PEFC",
        instruction: "Measure prospective earth fault current between phase and earth conductors.",
        expectedResult: "PEFC value recorded",
        tips: [
          "This represents the earth fault current",
          "Critical for protective device operation"
        ],
        equipment: ["Multifunction Tester"]
      },
      {
        id: "verify-ratings",
        title: "Verify Device Ratings",
        instruction: "Compare measured PFC values with breaking capacity of protective devices.",
        expectedResult: "All protective devices have adequate breaking capacity",
        tips: [
          "Check all MCBs, RCBOs, and fuses",
          "Upgrade devices if PFC exceeds rating"
        ],
        equipment: ["Device datasheets", "Calculator"]
      }
    ]
  },
  {
    id: "phase-sequence",
    title: "Phase Sequence Testing",
    description: "Verify correct phase sequence in three-phase installations",
    duration: "5-10 mins",
    difficulty: "Intermediate",
    purpose: "To ensure correct phase sequence for three-phase motors and equipment",
    testLimits: [
      { parameter: "Phase sequence", limit: "L1, L2, L3 (clockwise)", unit: "-" },
      { parameter: "Phase rotation", limit: "Correct for equipment", unit: "-" }
    ],
    commonIssues: [
      "Incorrect phase sequence causing motor reverse rotation",
      "Phase transposition errors",
      "Installation wiring errors"
    ],
    regulationClause: "BS 7671:2018 Section 612.12",
    steps: [
      {
        id: "setup-sequence-test",
        title: "Setup Phase Sequence Test",
        instruction: "Connect phase sequence indicator to L1, L2, and L3 terminals at the distribution board.",
        expectedResult: "Phase sequence indicator connected and ready",
        safetyWarning: "Ensure proper PPE and safe working procedures",
        tips: [
          "Verify supply is energised",
          "Ensure good contact at all three phases"
        ],
        equipment: ["Phase sequence indicator", "Test leads", "PPE"]
      },
      {
        id: "check-sequence",
        title: "Check Phase Sequence",
        instruction: "Observe the phase sequence indicator to verify correct L1, L2, L3 sequence.",
        expectedResult: "Indicator shows correct clockwise sequence",
        tips: [
          "Clockwise rotation indicates correct sequence",
          "Anti-clockwise indicates phases need swapping"
        ],
        equipment: ["Phase sequence indicator"]
      },
      {
        id: "correct-if-needed",
        title: "Correct if Required",
        instruction: "If phase sequence is incorrect, isolate supply and swap any two phases to correct the sequence.",
        expectedResult: "Correct phase sequence achieved",
        safetyWarning: "Always isolate supply before making any changes",
        tips: [
          "Swapping any two phases will reverse the sequence",
          "Re-test after making corrections"
        ],
        equipment: ["Isolation tools", "Phase sequence indicator"]
      }
    ]
  },
  {
    id: "functional-testing",
    title: "Functional Testing",
    description: "Test the correct operation of all electrical equipment and safety systems",
    duration: "20-30 mins",
    difficulty: "Intermediate",
    purpose: "To verify that all electrical equipment and safety systems operate correctly",
    testLimits: [
      { parameter: "Switch operation", limit: "Correct function", unit: "-" },
      { parameter: "Emergency lighting", limit: "3 hour duration", unit: "hours" },
      { parameter: "Fire alarm", limit: "Correct operation", unit: "-" }
    ],
    commonIssues: [
      "Switches not controlling correct circuits",
      "Emergency lighting insufficient duration",
      "Fire alarm system faults"
    ],
    regulationClause: "BS 7671:2018 Section 612.13",
    steps: [
      {
        id: "switch-testing",
        title: "Switch Operation Testing",
        instruction: "Test all switches, socket outlets, and control devices for correct operation.",
        expectedResult: "All switches operate correctly and control intended circuits",
        tips: [
          "Test each switch individually",
          "Verify correct circuit control"
        ],
        equipment: ["Visual observation", "Test equipment"]
      },
      {
        id: "emergency-lighting",
        title: "Emergency Lighting Test",
        instruction: "Test emergency lighting systems by simulating mains failure and checking illumination and duration.",
        expectedResult: "Emergency lighting operates for required duration with adequate illumination",
        tips: [
          "Test key switch operation",
          "Check battery condition and charging"
        ],
        equipment: ["Emergency lighting test key", "Lux meter"]
      },
      {
        id: "fire-alarm-test",
        title: "Fire Alarm System Test",
        instruction: "Test fire alarm detection and alarm systems according to BS 5839 requirements.",
        expectedResult: "Fire alarm system operates correctly with all detectors and sounders functioning",
        tips: [
          "Test different detector types separately",
          "Verify control panel indications"
        ],
        equipment: ["Smoke detector tester", "Heat source"]
      },
      {
        id: "other-systems",
        title: "Other Systems Testing",
        instruction: "Test any other electrical systems such as door entry, CCTV, or security systems.",
        expectedResult: "All additional systems operate according to specification",
        tips: [
          "Refer to manufacturer instructions",
          "Test all system functions"
        ],
        equipment: ["System-specific test equipment"]
      }
    ]
  }
];

export const getTestById = (id: string): BS7671Test | undefined => {
  return allBS7671Tests.find(test => test.id === id);
};

export const getTestsByDifficulty = (difficulty: "Beginner" | "Intermediate" | "Advanced"): BS7671Test[] => {
  return allBS7671Tests.filter(test => test.difficulty === difficulty);
};
