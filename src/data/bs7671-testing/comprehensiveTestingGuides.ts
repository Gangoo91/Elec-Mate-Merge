
export interface TestLimit {
  parameter: string;
  limit: string;
  unit: string;
}

export interface EnhancedTestGuide {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  purpose: string;
  regulationReferences: string[];
  prerequisites: string[];
  commonIssues: string[];
  testLimits: TestLimit[];
  steps: EnhancedTestStep[];
}

export interface EnhancedTestStep {
  id: string;
  title: string;
  instruction: string;
  expectedResult: string;
  safetyWarning?: string;
  tips?: string[];
  equipment: string[];
  troubleshooting?: string[];
  regulationNote?: string;
}

export const comprehensiveTestingGuides: EnhancedTestGuide[] = [
  {
    id: "safe-isolation-comprehensive",
    title: "Safe Isolation Procedure",
    description: "Complete safe isolation procedure with prove-before-use verification",
    duration: "10-15 mins",
    difficulty: "Beginner",
    purpose: "To ensure electrical circuits are safely isolated before work commences, preventing electric shock and ensuring worker safety",
    regulationReferences: ["BS 7671 Regulation 12", "GS38", "HSE Guidance Note GS38"],
    prerequisites: ["Valid electrical qualification", "Calibrated test equipment", "Understanding of circuit layout"],
    commonIssues: [
      "Failure to test voltage indicator before and after use",
      "Not isolating all sources of supply",
      "Inadequate securing of isolation points",
      "Missing or incorrect warning notices"
    ],
    testLimits: [],
    steps: [
      {
        id: "step-1",
        title: "Identify Circuit and Isolation Point",
        instruction: "Locate the correct circuit on drawings/schedules and identify the appropriate isolation device (MCB, isolator, or main switch).",
        expectedResult: "Circuit clearly identified with correct isolation point confirmed",
        safetyWarning: "Ensure you have the correct circuit - wrong circuit isolation can be fatal",
        tips: [
          "Use circuit schedules and drawings to verify circuit identity",
          "Check with client/responsible person if uncertain"
        ],
        equipment: ["Circuit schedules", "Installation drawings"],
        troubleshooting: [
          "If circuit identity unclear, use current clamp to trace circuit",
          "Check multiple sources of documentation for confirmation"
        ]
      },
      {
        id: "step-2",
        title: "Test Voltage Indicator",
        instruction: "Test your voltage indicator on a known live source to prove it's working correctly before use.",
        expectedResult: "Voltage indicator confirms presence of voltage on known live source",
        safetyWarning: "Never trust a voltage indicator that hasn't been proven to work",
        tips: [
          "Use a proving unit or known live socket outlet",
          "Check indicator responds correctly to voltage presence"
        ],
        equipment: ["Voltage indicator", "Proving unit", "Known live source"],
        regulationNote: "GS38 requires proving voltage indicators before and after use"
      },
      {
        id: "step-3",
        title: "Switch Off and Lock Off",
        instruction: "Switch off the isolation device and secure with appropriate locking device. Apply warning notices.",
        expectedResult: "Circuit isolated and secured against accidental re-energisation",
        tips: [
          "Use unique padlock with only you holding the key",
          "Apply clear warning notices stating work in progress"
        ],
        equipment: ["Padlock", "Warning notices", "Isolation tags"],
        troubleshooting: [
          "If locking not possible, implement alternative security measures",
          "Ensure all team members understand isolation procedures"
        ]
      },
      {
        id: "step-4",
        title: "Test Dead",
        instruction: "Use the voltage indicator to test between all live conductors and between live conductors and earth at the point of work.",
        expectedResult: "No voltage detected on any conductor combinations",
        safetyWarning: "If any voltage is detected, do not proceed - investigate source",
        tips: [
          "Test between L-N, L-E, and N-E on single phase",
          "Test all combinations on three-phase systems"
        ],
        equipment: ["Voltage indicator"],
        troubleshooting: [
          "If voltage still present, check for back-feed or parallel supply",
          "Verify correct isolation point has been operated"
        ]
      },
      {
        id: "step-5",
        title: "Re-prove Voltage Indicator",
        instruction: "Test the voltage indicator again on a known live source to ensure it's still working correctly.",
        expectedResult: "Voltage indicator still responds correctly to live source",
        safetyWarning: "If indicator doesn't work, repeat entire process with working equipment",
        equipment: ["Voltage indicator", "Known live source"],
        regulationNote: "GS38 requirement for post-use proving of test equipment"
      }
    ]
  },
  {
    id: "continuity-comprehensive",
    title: "Continuity of Protective Conductors (R1+R2)",
    description: "Comprehensive testing of circuit protective conductor continuity with detailed measurement procedures",
    duration: "15-20 mins",
    difficulty: "Intermediate",
    purpose: "To verify the continuity and resistance of protective conductors, ensuring effective earthing and equipotential bonding for safety",
    regulationReferences: ["BS 7671 Part 6", "Regulation 643.2.2", "IET Guidance Note 3"],
    prerequisites: ["Safe isolation completed", "MFT calibrated and functional", "Access to circuit ends"],
    commonIssues: [
      "High resistance readings indicating poor connections",
      "Open circuit readings suggesting broken conductors",
      "Inconsistent readings between similar circuits",
      "Temperature effects on resistance values"
    ],
    testLimits: [
      {
        parameter: "R1+R2 maximum",
        limit: "1.67 × line conductor resistance",
        unit: "Ω"
      }
    ],
    steps: [
      {
        id: "step-1",
        title: "Prepare Test Equipment",
        instruction: "Set MFT to continuity/low resistance mode (typically 200mA test current). Connect test leads and zero the instrument.",
        expectedResult: "MFT ready for testing with leads zeroed to eliminate lead resistance",
        tips: [
          "Short test leads together and press 'ZERO' or 'NULL'",
          "Use shortest practical test leads to minimise resistance"
        ],
        equipment: ["Multifunction Tester", "Test leads", "Crocodile clips"],
        troubleshooting: [
          "If unable to zero, check test lead continuity",
          "Ensure good electrical contact at lead connections"
        ]
      },
      {
        id: "step-2",
        title: "Connect Test Leads",
        instruction: "Connect one test lead to the line conductor at the distribution board and the other to the protective conductor at the same point.",
        expectedResult: "Secure electrical connection established at distribution board terminals",
        safetyWarning: "Ensure circuit is isolated and proven dead before making connections",
        tips: [
          "Clean connection points if oxidised or dirty",
          "Ensure firm connection to avoid high resistance joints"
        ],
        equipment: ["Test leads", "Terminal cleaning cloth"],
        regulationNote: "Test must be performed with circuit isolated from supply"
      },
      {
        id: "step-3",
        title: "Measure at Circuit Extremity",
        instruction: "At the furthest point of the circuit (socket outlet, light fitting, etc.), measure between line and earth terminals.",
        expectedResult: "Stable resistance reading displayed on MFT, typically 0.1Ω to 2Ω depending on circuit length and cable size",
        tips: [
          "Allow reading to stabilise before recording",
          "Take multiple readings if result seems inconsistent"
        ],
        equipment: ["MFT with connected leads"],
        troubleshooting: [
          "If reading very high, check for loose connections",
          "If open circuit, check for broken protective conductor"
        ]
      },
      {
        id: "step-4",
        title: "Record and Verify Results",
        instruction: "Record the R1+R2 value and compare with calculated maximum permissible value based on cable data.",
        expectedResult: "Measured value within acceptable limits and properly documented",
        tips: [
          "Calculate maximum value: 1.67 × line conductor resistance",
          "Record temperature if significantly different from 20°C"
        ],
        equipment: ["Test certificate", "Cable data tables"],
        troubleshooting: [
          "If reading exceeds limit, check all connections in circuit",
          "Consider temperature correction if ambient temperature high"
        ]
      }
    ]
  },
  {
    id: "insulation-resistance-comprehensive",
    title: "Insulation Resistance Testing",
    description: "Complete insulation resistance testing procedure with multiple voltage tests and safety precautions",
    duration: "20-30 mins",
    difficulty: "Intermediate",
    purpose: "To verify the insulation integrity between conductors and between conductors and earth, ensuring electrical safety and preventing dangerous touch voltages",
    regulationReferences: ["BS 7671 Regulation 643.3", "Table 64", "IET Guidance Note 3 Section 10.3"],
    prerequisites: ["Safe isolation completed", "Electronic equipment isolated", "Circuit accessories identified"],
    commonIssues: [
      "Low readings due to connected equipment not isolated",
      "Damage to electronic equipment from high test voltage",
      "Moisture ingress causing low insulation values",
      "Neutral-earth links in sub-circuits affecting readings"
    ],
    testLimits: [
      {
        parameter: "Minimum resistance (circuits ≤500V)",
        limit: "1",
        unit: "MΩ"
      },
      {
        parameter: "Minimum resistance (SELV/PELV)",
        limit: "0.5",
        unit: "MΩ"
      }
    ],
    steps: [
      {
        id: "step-1",
        title: "Isolate Electronic Equipment",
        instruction: "Disconnect or isolate all electronic equipment, fluorescent fittings, surge protection devices, and any equipment that could be damaged by the test voltage.",
        expectedResult: "All sensitive equipment isolated and protected from high test voltage",
        safetyWarning: "Failure to isolate electronic equipment will result in damage during testing",
        tips: [
          "Make a list of disconnected items for reconnection later",
          "Remove fluorescent tubes and LED lamps where possible",
          "Isolate dimmer switches and smart switches"
        ],
        equipment: ["Insulation tape", "Warning labels"],
        troubleshooting: [
          "If equipment cannot be disconnected, consider 250V test voltage",
          "Document any permanently connected equipment"
        ]
      },
      {
        id: "step-2",
        title: "Set Test Voltage",
        instruction: "Set MFT to insulation resistance mode with appropriate test voltage: 500V DC for circuits up to 500V AC, 250V DC for circuits with electronic components.",
        expectedResult: "MFT configured with correct test voltage for installation type",
        tips: [
          "Use 500V for lighting and power circuits where electronic equipment removed",
          "Use 250V where electronic equipment cannot be isolated"
        ],
        equipment: ["Multifunction Tester", "Insulation test leads"],
        regulationNote: "Test voltage selection critical to avoid equipment damage and ensure valid results"
      },
      {
        id: "step-3",
        title: "Test Line to Neutral",
        instruction: "Connect test leads between line and neutral conductors. Press and hold test button for minimum 1 second to allow reading to stabilise.",
        expectedResult: "Minimum 1MΩ reading displayed (0.5MΩ for SELV/PELV)",
        tips: [
          "Maintain steady pressure on test button",
          "Allow capacitive circuits time to charge before taking reading"
        ],
        equipment: ["MFT", "Insulation test leads"],
        troubleshooting: [
          "If reading low, check for connected equipment or damp conditions",
          "Investigate any reading below 2MΩ as potential issue"
        ]
      },
      {
        id: "step-4",
        title: "Test Line to Earth",
        instruction: "Connect test leads between line conductor and earth/CPC. Perform insulation test ensuring all switches in circuit are closed.",
        expectedResult: "Minimum 1MΩ reading between line and earth conductors",
        tips: [
          "Close all switches to test entire circuit wiring",
          "Test each line conductor separately in three-phase circuits"
        ],
        equipment: ["MFT", "Insulation test leads"],
        troubleshooting: [
          "Low readings may indicate damaged cable insulation",
          "Check for moisture ingress in outdoor installations"
        ]
      },
      {
        id: "step-5",
        title: "Test Neutral to Earth",
        instruction: "Connect test leads between neutral conductor and earth. Note that TN-C-S systems may show lower readings due to neutral-earth connection at origin.",
        expectedResult: "Minimum 1MΩ reading, though may be lower in TN-C-S installations",
        tips: [
          "TN-C-S systems: neutral-earth link may give lower reading",
          "TT systems: should achieve full insulation resistance"
        ],
        equipment: ["MFT", "Insulation test leads"],
        troubleshooting: [
          "Very low readings in TN-C-S may indicate local neutral-earth connection",
          "Check system type and earthing arrangements"
        ]
      }
    ]
  },
  {
    id: "polarity-comprehensive",
    title: "Polarity Testing",
    description: "Comprehensive polarity verification ensuring correct connection of line, neutral and earth conductors",
    duration: "15-20 mins",
    difficulty: "Beginner",
    purpose: "To verify that single-pole protective devices are connected in the line conductor only and that all connections maintain correct polarity throughout the installation",
    regulationReferences: ["BS 7671 Regulation 643.6", "Regulation 132.14", "Section 514"],
    prerequisites: ["Safe isolation completed", "Circuit layout understood", "Access to all connection points"],
    commonIssues: [
      "Reversed line and neutral connections at accessories",
      "Switch-line connections made to neutral conductor",
      "Incorrect polarity at lampholders and appliance connections",
      "Cross-connected conductors in junction boxes"
    ],
    testLimits: [],
    steps: [
      {
        id: "step-1",
        title: "Visual Inspection of Distribution Board",
        instruction: "Verify that all single-pole MCBs, RCBOs and switches are connected to line conductors only, with neutrals connected to neutral bar.",
        expectedResult: "All protective devices correctly connected in line conductors",
        tips: [
          "Check MCB connections are on line side of device",
          "Verify neutral conductors terminate at neutral bar only"
        ],
        equipment: ["Torch", "Voltage indicator"],
        troubleshooting: [
          "If polarity incorrect at board, isolate and correct before proceeding",
          "Check for any crossed connections behind accessories"
        ]
      },
      {
        id: "step-2",
        title: "Test Socket Outlet Polarity",
        instruction: "Using continuity tester, verify that line conductor at board connects to line terminal of socket outlet (left terminal in UK 13A sockets).",
        expectedResult: "Continuity confirmed between line at board and line terminal at socket",
        tips: [
          "UK 13A sockets: line = left, neutral = right, earth = top",
          "Test with socket switch in ON position"
        ],
        equipment: ["Continuity tester", "Test leads"],
        troubleshooting: [
          "If no continuity, check for open circuit or incorrect wiring",
          "Verify socket switch operation and internal connections"
        ]
      },
      {
        id: "step-3",
        title: "Test Lighting Circuit Polarity",
        instruction: "Verify that switches are connected in line conductor and that line conductor feeds to center contact of bayonet/Edison screw lampholders.",
        expectedResult: "Switches correctly wired in line conductor, lampholders have correct polarity",
        tips: [
          "Switch should interrupt line conductor only",
          "Edison screw: center contact must be line conductor"
        ],
        equipment: ["Continuity tester", "Test leads"],
        troubleshooting: [
          "If switch wired in neutral, immediate correction required",
          "Check two-way switching arrangements carefully"
        ],
        regulationNote: "Regulation 132.14 requires switches to be in line conductor only"
      },
      {
        id: "step-4",
        title: "Document Results",
        instruction: "Record polarity test results on test certificate, noting any corrections made and confirming all circuits have correct polarity.",
        expectedResult: "All polarity tests recorded as satisfactory with any remedial work documented",
        tips: [
          "Mark certificate clearly for each circuit tested",
          "Note any special arrangements or deviations"
        ],
        equipment: ["Test certificate", "Pen"],
        troubleshooting: [
          "If any polarity faults found, re-test after correction",
          "Ensure all team members aware of any special arrangements"
        ]
      }
    ]
  },
  {
    id: "earth-fault-loop-comprehensive",
    title: "Earth Fault Loop Impedance (Zs) Testing",
    description: "Complete Zs testing procedure including calculation verification and safety considerations",
    duration: "15-25 mins",
    difficulty: "Advanced",
    purpose: "To measure the earth fault loop impedance and verify that protective devices will operate within required time limits in the event of an earth fault",
    regulationReferences: ["BS 7671 Regulation 643.7", "Chapter 41", "Appendix 3"],
    prerequisites: ["All previous tests completed satisfactorily", "RCD temporarily bypassed if required", "Maximum Zs values calculated"],
    commonIssues: [
      "High Zs readings indicating poor earth connections",
      "RCD operation preventing Zs measurement",
      "Voltage drop during test affecting accuracy",
      "Parallel earth paths giving misleadingly low readings"
    ],
    testLimits: [
      {
        parameter: "Maximum Zs (depends on protective device)",
        limit: "As per BS 7671 Appendix 3",
        unit: "Ω"
      }
    ],
    steps: [
      {
        id: "step-1",
        title: "Calculate Maximum Zs",
        instruction: "Calculate the maximum permitted Zs value for the protective device using BS 7671 Appendix 3 tables or manufacturer's data.",
        expectedResult: "Maximum Zs value determined for comparison with measured value",
        tips: [
          "Use correct table for MCB type (B, C, D)",
          "Consider temperature correction factors if required"
        ],
        equipment: ["BS 7671 or data tables", "Calculator"],
        regulationNote: "Maximum Zs values ensure disconnection times per Chapter 41"
      },
      {
        id: "step-2",
        title: "Prepare for Zs Test",
        instruction: "If RCD protection present, either use RCD bypass function on MFT or temporarily link out RCD. Ensure main earth connection is secure.",
        expectedResult: "Test setup ready with RCD bypassed to prevent operation during test",
        safetyWarning: "If RCD bypassed manually, restore immediately after test completion",
        tips: [
          "Use MFT RCD bypass function where available",
          "Check earth connection at main earthing terminal"
        ],
        equipment: ["MFT with RCD bypass", "Earth connection tools"],
        troubleshooting: [
          "If RCD cannot be bypassed, use low current Zs test",
          "Ensure earth path continuity before testing"
        ]
      },
      {
        id: "step-3",
        title: "Perform Zs Measurement",
        instruction: "Connect MFT test leads between line and earth at the point to be tested. Initiate Zs test and record stable reading.",
        expectedResult: "Zs measurement obtained and displayed on MFT screen",
        tips: [
          "Allow reading to stabilise before recording",
          "Note supply voltage during test"
        ],
        equipment: ["MFT", "Zs test leads"],
        troubleshooting: [
          "If reading unstable, check all earth connections",
          "High readings may indicate loose connections"
        ]
      },
      {
        id: "step-4",
        title: "Verify Against Limits",
        instruction: "Compare measured Zs value with calculated maximum. Verify that protective device will provide adequate fault protection.",
        expectedResult: "Measured Zs value within acceptable limits for protection device",
        tips: [
          "Account for measurement uncertainty in comparison",
          "Consider temperature effects on conductor resistance"
        ],
        equipment: ["Calculator", "Reference tables"],
        troubleshooting: [
          "If Zs exceeds limit, investigate earth fault loop path",
          "Check R1+R2 and Ze values for consistency"
        ]
      }
    ]
  },
  {
    id: "rcd-testing-comprehensive",
    title: "RCD Testing and Verification",
    description: "Complete RCD testing including ramp test, trip times and verification of correct operation",
    duration: "20-25 mins",
    difficulty: "Intermediate",
    purpose: "To verify that RCD devices operate correctly within specified current and time limits to provide protection against electric shock and fire",
    regulationReferences: ["BS 7671 Regulation 643.8", "BS EN 61008", "BS EN 61009"],
    prerequisites: ["Circuit energised for testing", "RCD reset and functional", "Load circuits may be connected"],
    commonIssues: [
      "RCD will not reset indicating internal fault",
      "Trip times outside acceptable limits",
      "Failure to trip at rated current",
      "Nuisance tripping during normal operation"
    ],
    testLimits: [
      {
        parameter: "½ × IΔn trip test",
        limit: "Must not trip",
        unit: ""
      },
      {
        parameter: "1 × IΔn trip time",
        limit: "300",
        unit: "ms"
      },
      {
        parameter: "5 × IΔn trip time",
        limit: "40",
        unit: "ms"
      }
    ],
    steps: [
      {
        id: "step-1",
        title: "Visual and Mechanical Test",
        instruction: "Visually inspect RCD for damage. Operate test button to verify mechanical function. Reset RCD and confirm normal operation.",
        expectedResult: "RCD test button causes trip and device resets normally",
        safetyWarning: "If RCD will not reset or test button doesn't work, do not proceed with electrical testing",
        tips: [
          "Test button should be operated monthly in service",
          "Check for any signs of damage or overheating"
        ],
        equipment: ["Visual inspection"],
        troubleshooting: [
          "If test button doesn't work, RCD requires replacement",
          "If won't reset, check for earth leakage on protected circuits"
        ]
      },
      {
        id: "step-2",
        title: "Ramp Test (½ × IΔn)",
        instruction: "Using RCD tester, gradually increase leakage current from zero to ½ × rated tripping current (typically 15mA for 30mA RCD).",
        expectedResult: "RCD must not trip at or below ½ × IΔn",
        tips: [
          "Increase current slowly to avoid overshoot",
          "Test at both 0° and 180° phase angles"
        ],
        equipment: ["RCD tester", "Test leads"],
        troubleshooting: [
          "If RCD trips below ½ × IΔn, it may be too sensitive",
          "Check for background leakage current"
        ]
      },
      {
        id: "step-3",
        title: "Trip Time Test (1 × IΔn)",
        instruction: "Apply test current equal to RCD rated tripping current and measure trip time. Test at 0° and 180° phase angles.",
        expectedResult: "RCD trips within 300ms (200ms for socket outlet circuits)",
        tips: [
          "Record the longer of the two phase angle readings",
          "Typical trip times are 20-40ms for quality RCDs"
        ],
        equipment: ["RCD tester", "Test leads"],
        troubleshooting: [
          "If trip time exceeds limit, RCD may be faulty",
          "Check supply voltage is within normal limits"
        ],
        regulationNote: "Socket outlet circuits require ≤200ms trip time"
      },
      {
        id: "step-4",
        title: "High Current Trip Test (5 × IΔn)",
        instruction: "Apply 5 times rated tripping current and measure trip time. This verifies RCD operates quickly for high earth leakage.",
        expectedResult: "RCD trips within 40ms at 5 × IΔn",
        tips: [
          "This test simulates serious earth fault conditions",
          "Fast trip time essential for shock protection"
        ],
        equipment: ["RCD tester", "Test leads"],
        troubleshooting: [
          "Slow trip at high current indicates RCD deterioration",
          "Consider replacement if consistently slow"
        ]
      },
      {
        id: "step-5",
        title: "Record Results and Reset",
        instruction: "Document all test results on certificate. Reset RCD and verify normal operation of protected circuits.",
        expectedResult: "All tests recorded with satisfactory results and RCD restored to service",
        tips: [
          "Check all protected circuits function normally after testing",
          "Advise client on monthly test button operation"
        ],
        equipment: ["Test certificate", "Pen"],
        troubleshooting: [
          "If any test unsatisfactory, investigate cause before leaving RCD in service",
          "Provide client with RCD maintenance guidance"
        ]
      }
    ]
  }
];

export const getComprehensiveGuideById = (id: string): EnhancedTestGuide | undefined => {
  return comprehensiveTestingGuides.find(guide => guide.id === id);
};
