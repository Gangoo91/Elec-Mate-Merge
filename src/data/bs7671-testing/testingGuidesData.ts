
export interface TestStep {
  id: string;
  title: string;
  instruction: string;
  expectedResult: string;
  safetyWarning?: string;
  tips?: string[];
  equipment: string[];
}

export interface TestGuide {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  steps: TestStep[];
}

export const testingGuides: TestGuide[] = [
  {
    id: "continuity-protective-conductor",
    title: "Protective Conductor Continuity",
    description: "Test the continuity of protective conductors to ensure effective earthing",
    duration: "10-15 mins",
    difficulty: "Beginner",
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
        equipment: ["Multifunction Tester", "Test leads", "Voltage indicator"]
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
    id: "rcd-testing",
    title: "RCD Testing",
    description: "Comprehensive testing of RCD operation and trip times",
    duration: "15-20 mins",
    difficulty: "Intermediate",
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
  }
];

export const getTestGuideById = (id: string): TestGuide | undefined => {
  return testingGuides.find(guide => guide.id === id);
};

export const getTestGuidesByDifficulty = (difficulty: "Beginner" | "Intermediate" | "Advanced"): TestGuide[] => {
  return testingGuides.filter(guide => guide.difficulty === difficulty);
};
