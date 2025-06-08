
export interface WagoConnectionInstructions {
  connectorType: string;
  steps: string[];
  safetyTips?: string[];
  visualReference?: string;
}

export interface TestLimit {
  parameter: string;
  limit: string;
  unit: string;
}

export interface EnhancedTestStep {
  id: string;
  title: string;
  description: string;
  safetyWarnings?: string[];
  equipment?: string[];
  troubleshooting?: string[];
  wagoInstructions?: WagoConnectionInstructions;
  expectedResults?: string;
  regulationReference?: string;
}

export interface EnhancedTestGuide {
  id: string;
  title: string;
  description: string;
  purpose: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  testLimits: TestLimit[];
  commonIssues: string[];
  steps: EnhancedTestStep[];
}

export const comprehensiveTestingGuides: EnhancedTestGuide[] = [
  {
    id: "safe-isolation",
    title: "Safe Isolation Procedure",
    description: "Complete safe isolation procedure following HSE guidance and BS7671 requirements",
    purpose: "To ensure the electrical installation is safely isolated before testing or maintenance work",
    duration: "5-10 mins",
    difficulty: "Beginner",
    testLimits: [],
    commonIssues: [
      "Inadequate testing of voltage indicator",
      "Not testing all phases and neutral",
      "Failure to lock off adequately",
      "Not using appropriate PPE"
    ],
    steps: [
      {
        id: "identify-circuits",
        title: "Identify and Select Circuits",
        description: "Identify all circuits to be isolated using circuit schedules and labels",
        safetyWarnings: [
          "Verify circuit identification is accurate and up to date",
          "Consider all sources of supply including emergency lighting"
        ],
        equipment: ["Circuit schedules", "Torch", "Labels"],
        troubleshooting: [
          "If circuit labels are unclear, use a suitable detector to identify conductors",
          "Check for borrowed neutrals in older installations"
        ]
      },
      {
        id: "switch-off",
        title: "Switch Off and Disconnect",
        description: "Switch off the circuit at the distribution board and remove fuses or lock off MCBs",
        safetyWarnings: [
          "Ensure all poles are isolated including neutral where required",
          "Use appropriate lockout/tagout procedures"
        ],
        equipment: ["Lockout devices", "Warning tags", "Personal locks"],
        wagoInstructions: {
          connectorType: "Not applicable for isolation procedure",
          steps: [],
          safetyTips: ["Isolation must be made at the supply source, not with connectors"]
        },
        troubleshooting: [
          "If circuits cannot be isolated, consider alternative isolation methods",
          "Ensure all team members are aware of isolation status"
        ]
      },
      {
        id: "secure-isolation",
        title: "Secure the Isolation",
        description: "Lock off the circuit using appropriate lockout devices and apply warning notices",
        safetyWarnings: [
          "Use personal locks - never share lockout keys",
          "Apply clear warning notices visible to all personnel"
        ],
        equipment: ["Lockout devices", "Warning notices", "Personal padlocks"],
        troubleshooting: [
          "If lockout devices don't fit, use alternative securing methods",
          "Ensure notices are clearly visible and weather-resistant if outdoors"
        ]
      },
      {
        id: "test-dead",
        title: "Test Dead - Initial Test",
        description: "Test between all live conductors and between live conductors and earth using a suitable voltage indicator",
        safetyWarnings: [
          "Always test the voltage indicator before and after use",
          "Test all combinations of conductors in three-phase systems"
        ],
        equipment: ["Approved voltage indicator", "GS38 test leads", "Proving unit"],
        wagoInstructions: {
          connectorType: "Wago 773 Series (Push-In with Test Points)",
          steps: [
            "Strip 12mm of insulation from test lead",
            "Insert test lead into Wago 773 connector firmly",
            "Connect other test lead to earth point using second 773 connector",
            "Verify connection security before applying voltage indicator",
            "Use test points on connectors for safe measurement access"
          ],
          safetyTips: [
            "Connectors provide safe, secure test points",
            "Avoid direct contact with conductors during testing",
            "Test connectors ensure repeatable contact for accurate readings"
          ]
        },
        troubleshooting: [
          "If voltage is still present, check isolation procedure",
          "Consider other sources of supply or back-feeds"
        ]
      },
      {
        id: "test-voltage-indicator",
        title: "Test Voltage Indicator",
        description: "Test the voltage indicator on a known live source to ensure it's functioning correctly",
        safetyWarnings: [
          "Use appropriate PPE when testing on live circuits",
          "Ensure the proving unit is calibrated and functioning"
        ],
        equipment: ["Voltage indicator", "Proving unit", "Known live source"],
        troubleshooting: [
          "If indicator doesn't respond, check battery and leads",
          "Use alternative voltage indicator if primary device fails"
        ]
      },
      {
        id: "retest-dead",
        title: "Re-test Dead",
        description: "Repeat the dead testing procedure to confirm the circuit remains isolated",
        safetyWarnings: [
          "This is a critical safety check - never skip this step",
          "If any voltage is detected, investigate immediately"
        ],
        equipment: ["Approved voltage indicator", "GS38 test leads"],
        wagoInstructions: {
          connectorType: "Wago 773 Series (Push-In with Test Points)",
          steps: [
            "Reconnect test leads to the same Wago 773 connectors used previously",
            "Verify mechanical connection by gentle pull test",
            "Use connector test points for voltage measurement",
            "Test all conductor combinations systematically",
            "Document results clearly"
          ],
          safetyTips: [
            "Consistent connection points ensure reliable retesting",
            "Test connectors eliminate risk of poor contact during retesting"
          ]
        },
        troubleshooting: [
          "If voltage appears during retest, check for circuit restoration",
          "Verify isolation points haven't been disturbed"
        ]
      }
    ]
  },
  {
    id: "continuity-protective-conductor",
    title: "Continuity of Protective Conductors",
    description: "Test the continuity of protective conductors including earth and bonding conductors",
    purpose: "To verify that protective conductors provide an effective path for fault current",
    duration: "15-20 mins",
    difficulty: "Intermediate",
    testLimits: [
      { parameter: "Maximum resistance", limit: "As per circuit design", unit: "Ω" },
      { parameter: "Typical values", limit: "< 1", unit: "Ω" }
    ],
    commonIssues: [
      "High resistance due to poor connections",
      "Broken conductors not visible externally",
      "Corroded connections in damp environments",
      "Missing earth connections at accessories"
    ],
    steps: [
      {
        id: "setup-equipment",
        title: "Setup Test Equipment",
        description: "Configure multifunction tester for continuity testing and connect test leads",
        safetyWarnings: [
          "Ensure circuit is isolated and proven dead",
          "Check test leads for damage before use"
        ],
        equipment: ["Multifunction tester", "Test leads", "Continuity probes"],
        troubleshooting: [
          "If readings are unstable, check lead connections",
          "Null test leads to remove their resistance"
        ]
      },
      {
        id: "main-earth-terminal",
        title: "Test from Main Earth Terminal",
        description: "Connect one test lead to the main earth terminal at the consumer unit",
        safetyWarnings: [
          "Ensure good electrical contact at main earth terminal",
          "Verify terminal is clean and tight"
        ],
        equipment: ["Multifunction tester", "Test probe", "Wire brush if needed"],
        wagoInstructions: {
          connectorType: "Wago 221 Series (Lever Nuts) - 2-way connector",
          steps: [
            "Strip 10-11mm insulation from test lead end",
            "Open orange lever on 221 connector fully",
            "Insert test lead into connector until it stops",
            "Close lever firmly until it clicks",
            "Connect second conductor from main earth terminal to other side",
            "Verify secure connection with pull test"
          ],
          safetyTips: [
            "221 connectors provide reliable temporary test connections",
            "Visual verification possible through connector body",
            "Reusable for multiple test points"
          ]
        },
        troubleshooting: [
          "If no continuity to earth terminal, check terminal tightness",
          "Clean terminals if corrosion is present"
        ]
      },
      {
        id: "circuit-protective-conductors",
        title: "Test Circuit Protective Conductors",
        description: "Test continuity from main earth terminal to each circuit's protective conductor",
        safetyWarnings: [
          "Test each circuit systematically",
          "Record all readings accurately"
        ],
        equipment: ["Multifunction tester", "Circuit schedule", "Test leads"],
        wagoInstructions: {
          connectorType: "Wago 221 Series (Lever Nuts) - 3-way connector for T-connections",
          steps: [
            "Use 3-way 221 connector for branching test leads",
            "Connect main test lead to first position",
            "Connect circuit earth conductor to second position", 
            "Use third position for onward connection if testing multiple points",
            "Ensure all levers are fully closed and secure",
            "Test continuity through the established connection path"
          ],
          safetyTips: [
            "3-way connectors allow efficient testing of multiple circuits",
            "Maintain connection integrity throughout test sequence"
          ]
        },
        troubleshooting: [
          "High readings may indicate loose connections",
          "Check for broken conductors in flexible cables"
        ]
      },
      {
        id: "socket-outlets",
        title: "Test Socket Outlet Earth Connections",
        description: "Test continuity to earth pin of each socket outlet on the circuit",
        safetyWarnings: [
          "Remove socket faceplates to access earth terminals",
          "Check for additional earth connections (e.g., metal back boxes)"
        ],
        equipment: ["Multifunction tester", "Screwdriver set", "Test probes"],
        wagoInstructions: {
          connectorType: "Wago 221 Series (Lever Nuts) - 2-way connector",
          steps: [
            "At socket location, connect test lead to earth terminal using 221 connector",
            "Strip earth conductor to 10-11mm length",
            "Open lever and insert earth conductor fully",
            "Insert test lead into second position",
            "Close lever and verify secure connection",
            "Measure continuity back to main earth terminal"
          ],
          safetyTips: [
            "Secure connection ensures accurate readings",
            "No damage to conductor ends during testing"
          ]
        },
        troubleshooting: [
          "If socket outlet shows high resistance, check earth terminal tightness",
          "Verify earth sleeving hasn't been omitted"
        ]
      },
      {
        id: "supplementary-bonding",
        title: "Test Supplementary Bonding",
        description: "Test continuity of supplementary bonding conductors where installed",
        safetyWarnings: [
          "Check bonding is connected to correct points",
          "Verify bonding conductor size is adequate"
        ],
        equipment: ["Multifunction tester", "Test leads", "Bonding location list"],
        wagoInstructions: {
          connectorType: "Wago 221 Series (Lever Nuts) - appropriate size for bonding conductor",
          steps: [
            "Select appropriate 221 connector size for bonding conductor gauge",
            "Connect test lead to one side of bonding connection using connector",
            "Measure continuity to other bonded items",
            "Document resistance values for each bonding path",
            "Remove test connections when complete"
          ],
          safetyTips: [
            "Choose connector rated for bonding conductor size",
            "Ensure no damage to bonding conductor during testing"
          ]
        },
        troubleshooting: [
          "High resistance may indicate corroded connections",
          "Check bonding clamps are tight and clean"
        ]
      }
    ]
  },
  {
    id: "ring-circuit-continuity", 
    title: "Ring Final Circuit Continuity",
    description: "Comprehensive testing of ring final circuits including cross-connection method",
    purpose: "To verify ring circuit integrity and identify any breaks or interconnections",
    duration: "20-30 mins",
    difficulty: "Advanced",
    testLimits: [
      { parameter: "End-to-end resistance", limit: "< 1.67", unit: "Ω" },
      { parameter: "Socket resistance variation", limit: "< 0.05", unit: "Ω" },
      { parameter: "R1+R2 final reading", limit: "≈ 1/4 end-to-end", unit: "Ω" }
    ],
    commonIssues: [
      "Ring circuit not actually forming a ring (broken ring)",
      "Interconnected rings causing confusion",
      "Spurs incorrectly identified as part of ring",
      "Poor connections at socket outlets"
    ],
    steps: [
      {
        id: "identify-ring-ends",
        title: "Identify Ring Circuit Ends",
        description: "At the consumer unit, identify and separate the two ends of the ring final circuit",
        safetyWarnings: [
          "Ensure circuit is isolated and proven dead",
          "Verify you have the correct circuit before proceeding"
        ],
        equipment: ["Multifunction tester", "Labels", "Continuity tester"],
        wagoInstructions: {
          connectorType: "Wago 221 Series (Lever Nuts) - 2-way connectors for separation",
          steps: [
            "Carefully disconnect line conductors from MCB",
            "Use separate 221 connectors for each leg of the ring",
            "Connect one line conductor to first 221 connector",
            "Connect second line conductor to second 221 connector", 
            "Add test leads to each connector for identification",
            "Label each leg clearly (Leg 1, Leg 2)"
          ],
          safetyTips: [
            "221 connectors provide secure temporary isolation",
            "Clear labelling prevents confusion during testing",
            "Easy reconnection when testing complete"
          ]
        },
        troubleshooting: [
          "If uncertain which conductors form the ring, use continuity testing",
          "Check circuit schedule for ring circuit identification"
        ]
      },
      {
        id: "end-to-end-continuity",
        title: "End-to-End Continuity Tests",
        description: "Test continuity between the ring ends for line, neutral, and earth conductors",
        safetyWarnings: [
          "Test each conductor type separately",
          "Record all readings for comparison"
        ],
        equipment: ["Multifunction tester", "Test leads", "Test sheet"],
        wagoInstructions: {
          connectorType: "Wago 221 Series (Lever Nuts) - Multiple 2-way connectors",
          steps: [
            "Connect test lead to line conductor of Leg 1 using 221 connector",
            "Connect second test lead to line conductor of Leg 2 using separate connector",
            "Measure and record line-to-line resistance",
            "Repeat process for neutral-to-neutral using new connectors",
            "Finally test earth-to-earth using additional connectors",
            "Ensure all readings are within expected limits"
          ],
          safetyTips: [
            "Use separate connectors for each test to maintain connection integrity",
            "221 connectors ensure consistent contact pressure"
          ]
        },
        troubleshooting: [
          "If no continuity, check for broken ring",
          "High resistance may indicate poor connections"
        ],
        expectedResults: "Typically less than 1Ω for domestic ring circuits"
      },
      {
        id: "cross-connection-test",
        title: "Cross-Connection Test Setup",
        description: "Connect line of leg 1 to neutral of leg 2, and neutral of leg 1 to line of leg 2",
        safetyWarnings: [
          "This creates a figure-8 configuration for testing",
          "Ensure connections are secure before testing"
        ],
        equipment: ["Multifunction tester", "Test leads", "Circuit diagram"],
        wagoInstructions: {
          connectorType: "Wago 221 Series (Lever Nuts) - 3-way connectors for cross-connections",
          steps: [
            "Use 3-way 221 connector to join line from Leg 1 with neutral from Leg 2",
            "Use second 3-way connector to join neutral from Leg 1 with line from Leg 2",
            "Connect test leads to third positions in each connector",
            "This creates the cross-connection pattern for testing",
            "Verify all connections are secure before proceeding"
          ],
          safetyTips: [
            "3-way connectors simplify cross-connection setup",
            "Visual verification of connections through connector body",
            "No risk of conductor damage during connection changes"
          ]
        },
        troubleshooting: [
          "If confused about cross-connections, draw diagram first",
          "Double-check connections before measuring"
        ]
      },
      {
        id: "socket-outlet-testing",
        title: "Test at Each Socket Outlet",
        description: "Measure resistance at each socket outlet to verify ring continuity",
        safetyWarnings: [
          "Test at every socket on the circuit",
          "Look for consistent readings indicating proper ring"
        ],
        equipment: ["Multifunction tester", "Socket tester leads", "Test sheet"],
        wagoInstructions: {
          connectorType: "Wago 773 Series (Push-In with Test Points) for socket testing",
          steps: [
            "At each socket, connect test leads using 773 connectors to line and neutral terminals",
            "Push test leads firmly into 773 connectors",
            "Use test points on connectors for meter connection",
            "Record resistance reading for each socket location",
            "Move systematically around the ring circuit",
            "Compare readings for consistency"
          ],
          safetyTips: [
            "773 connectors provide safe test points at each socket",
            "Consistent connection method ensures reliable readings",
            "Test points eliminate risk of short circuits during measurement"
          ]
        },
        troubleshooting: [
          "Significant variation in readings may indicate spurs or poor connections",
          "Very high readings suggest broken ring or poor socket connection"
        ],
        expectedResults: "All socket readings should be similar (within 0.05Ω)"
      },
      {
        id: "final-reconnection",
        title: "Final R1+R2 Test and Reconnection",
        description: "Reconnect circuit normally and perform final R1+R2 measurement",
        safetyWarnings: [
          "Ensure all connections are remade properly",
          "Verify circuit operates correctly after reconnection"
        ],
        equipment: ["Multifunction tester", "Screwdriver", "Circuit schedule"],
        wagoInstructions: {
          connectorType: "Return to original MCB connections (remove Wago connectors)",
          steps: [
            "Remove all 221 connectors used for testing",
            "Reconnect both line conductors to the MCB terminals",
            "Ensure terminal screws are tightened to correct torque",
            "Reconnect neutral conductors to neutral bar",
            "Perform final R1+R2 test from furthest socket",
            "Document final readings on test certificate"
          ],
          safetyTips: [
            "Ensure all temporary test connections are removed",
            "Verify proper polarity during reconnection"
          ]
        },
        troubleshooting: [
          "If final R1+R2 reading is incorrect, check all connections",
          "Reading should be approximately 1/4 of end-to-end readings"
        ],
        expectedResults: "R1+R2 should be approximately 1/4 of the end-to-end resistance readings"
      }
    ]
  },
  {
    id: "insulation-resistance",
    title: "Insulation Resistance Testing", 
    description: "Test insulation resistance between conductors and to earth",
    purpose: "To verify electrical insulation integrity and identify potential breakdown paths",
    duration: "20-25 mins",
    difficulty: "Intermediate",
    testLimits: [
      { parameter: "Minimum resistance", limit: "> 1", unit: "MΩ" },
      { parameter: "Test voltage", limit: "500", unit: "V DC" },
      { parameter: "SELV circuits", limit: "> 0.5", unit: "MΩ" }
    ],
    commonIssues: [
      "Low readings due to dampness",
      "Electronic equipment not isolated properly",
      "Neon indicators causing low readings",
      "Surge protection devices affecting results"
    ],
    steps: [
      {
        id: "isolate-equipment",
        title: "Isolate Electronic Equipment",
        description: "Remove or isolate all electronic equipment, lamps, and surge protection devices",
        safetyWarnings: [
          "Failure to isolate equipment may damage it or give false readings",
          "Remove all lamps including LED and fluorescent types"
        ],
        equipment: ["Equipment list", "Labels for reconnection", "Lamp removal tools"],
        wagoInstructions: {
          connectorType: "Wago 221 Series (Lever Nuts) for equipment isolation",
          steps: [
            "Identify equipment to be isolated (dimmer switches, electronic timers, etc.)",
            "Use 221 connectors to safely disconnect equipment temporarily",
            "Connect equipment conductors to one side of connector",
            "Leave circuit conductors in second side for testing",
            "Label all connections for easy reconnection",
            "Document what has been isolated"
          ],
          safetyTips: [
            "221 connectors provide safe, temporary isolation",
            "Clear labelling ensures correct reconnection",
            "No risk of losing small screws or components"
          ]
        },
        troubleshooting: [
          "If unsure what to isolate, check manufacturer guidance",
          "Consider using 250V test instead of 500V for sensitive circuits"
        ]
      },
      {
        id: "test-line-neutral",
        title: "Line to Neutral Insulation Test",
        description: "Connect test leads between line and neutral conductors and perform 500V insulation test",
        safetyWarnings: [
          "Ensure all equipment is isolated before applying 500V",
          "Hold test button for full duration to get stable reading"
        ],
        equipment: ["Multifunction tester", "Insulation test leads", "Test certificate"],
        wagoInstructions: {
          connectorType: "Wago 773 Series (Push-In with Test Points) for test connections",
          steps: [
            "At distribution board, connect test lead to line conductor using 773 connector",
            "Connect second test lead to neutral conductor using separate 773 connector",
            "Ensure firm insertion into connectors",
            "Connect meter leads to test points on connectors",
            "Apply 500V test voltage for recommended duration",
            "Record reading when stable"
          ],
          safetyTips: [
            "Test points provide safe measurement access",
            "No risk of short circuit during connection",
            "Consistent contact pressure ensures accurate readings"
          ]
        },
        troubleshooting: [
          "Low readings may indicate damp conditions - allow drying time",
          "Check for missed equipment that should be isolated"
        ],
        expectedResults: "Minimum 1MΩ for circuits up to 500V"
      },
      {
        id: "test-line-earth",
        title: "Line to Earth Insulation Test", 
        description: "Test insulation resistance between line conductor and earth",
        safetyWarnings: [
          "Ensure good connection to earth conductor",
          "Test each line conductor separately in three-phase circuits"
        ],
        equipment: ["Multifunction tester", "Insulation test leads", "Earth connection point"],
        wagoInstructions: {
          connectorType: "Wago 773 Series (Push-In with Test Points)",
          steps: [
            "Connect test lead to line conductor using 773 connector as before",
            "Connect second test lead to earth conductor using separate 773 connector",
            "Verify earth connection is to main earth terminal",
            "Use connector test points for meter connections",
            "Apply 500V test and record reading",
            "Repeat for each line conductor in three-phase systems"
          ],
          safetyTips: [
            "Ensure earth connection is to main earth terminal not local earth",
            "Test points eliminate risk of accidental short circuits"
          ]
        },
        troubleshooting: [
          "Low readings to earth may indicate insulation breakdown",
          "Check for water ingress in external circuits"
        ],
        expectedResults: "Minimum 1MΩ for circuits up to 500V"
      },
      {
        id: "test-neutral-earth",
        title: "Neutral to Earth Insulation Test",
        description: "Test insulation resistance between neutral conductor and earth",
        safetyWarnings: [
          "In TN-C-S systems, this test may show lower readings",
          "Consider system earthing arrangement when interpreting results"
        ],
        equipment: ["Multifunction tester", "Insulation test leads", "System earthing diagram"],
        wagoInstructions: {
          connectorType: "Wago 773 Series (Push-In with Test Points)",
          steps: [
            "Connect test lead to neutral conductor using 773 connector",
            "Connect second test lead to earth conductor using separate 773 connector",
            "Ensure connection is at the same point in the installation",
            "Use test points for meter connections",
            "Apply test voltage and record reading",
            "Note any system-specific considerations"
          ],
          safetyTips: [
            "Be aware of earthing system type when interpreting readings",
            "Document any system-specific results clearly"
          ]
        },
        troubleshooting: [
          "Low readings may be normal in some earthing systems",
          "Check system earthing arrangement if readings seem unusual"
        ],
        expectedResults: "Minimum 1MΩ, but may be lower in some earthing systems"
      },
      {
        id: "reconnect-equipment",
        title: "Reconnect Isolated Equipment",
        description: "Systematically reconnect all equipment that was isolated for testing",
        safetyWarnings: [
          "Ensure all equipment is reconnected correctly",
          "Check polarity and phase rotation where applicable"
        ],
        equipment: ["Equipment list", "Connection labels", "Basic tools"],
        wagoInstructions: {
          connectorType: "Remove 221 connectors and restore original connections",
          steps: [
            "Work through isolation list systematically",
            "Remove 221 connectors and restore equipment connections",
            "Ensure all conductors are properly terminated",
            "Check terminal tightness after reconnection",
            "Test equipment operation where possible",
            "Update test documentation"
          ],
          safetyTips: [
            "Double-check all connections before energising",
            "Verify no tools or materials left in equipment"
          ]
        },
        troubleshooting: [
          "If equipment doesn't work after reconnection, check connections",
          "Some electronic equipment may need reset after insulation testing"
        ]
      }
    ]
  },
  {
    id: "rcd-testing",
    title: "RCD Testing Procedures",
    description: "Comprehensive RCD testing including ramp test and trip time measurements",
    purpose: "To verify RCD operates correctly within specified parameters for personal protection",
    duration: "15-20 mins", 
    difficulty: "Intermediate",
    testLimits: [
      { parameter: "Trip current", limit: "50-100% of rated", unit: "mA" },
      { parameter: "Trip time @ 1x In", limit: "< 300", unit: "ms" },
      { parameter: "Trip time @ 5x In", limit: "< 40", unit: "ms" }
    ],
    commonIssues: [
      "RCD not tripping within time limits",
      "Nuisance tripping due to background leakage",
      "False readings due to poor test connections",
      "RCD damaged by insulation testing"
    ],
    steps: [
      {
        id: "rcd-identification",
        title: "Identify and Prepare RCD",
        description: "Locate RCD to be tested and verify its rating and type",
        safetyWarnings: [
          "Ensure RCD is de-energised for initial inspection",
          "Check RCD is not damaged before testing"
        ],
        equipment: ["RCD tester", "RCD identification chart", "Test leads"],
        troubleshooting: [
          "If RCD rating is unclear, check manufacturer markings",
          "Verify RCD type (AC, A, or B) before testing"
        ]
      },
      {
        id: "functional-test",
        title: "RCD Functional Test (Push Button)",
        description: "Perform mechanical test using RCD push button to verify basic operation",
        safetyWarnings: [
          "This tests mechanical operation only",
          "If push button test fails, do not proceed with electrical testing"
        ],
        equipment: ["None required for push button test"],
        troubleshooting: [
          "If RCD doesn't trip on push button, check for mechanical fault",
          "Ensure RCD can be reset after push button test"
        ],
        expectedResults: "RCD should trip immediately and reset successfully"
      },
      {
        id: "connect-rcd-tester",
        title: "Connect RCD Tester",
        description: "Connect RCD tester leads to line, neutral, and earth at appropriate test points",
        safetyWarnings: [
          "Ensure circuit is energised for RCD testing",
          "Verify correct connection of test leads"
        ],
        equipment: ["RCD tester", "Test leads", "Socket outlet or test points"],
        wagoInstructions: {
          connectorType: "Wago 773 Series (Push-In with Test Points) for RCD test connections",
          steps: [
            "At test location (typically socket outlet), connect RCD tester leads",
            "Use 773 connector for line connection - push test lead in firmly",
            "Connect neutral test lead to separate 773 connector",
            "Connect earth lead to earth terminal or earth connector",
            "Use test points on connectors for secure meter connection",
            "Verify all connections before energising"
          ],
          safetyTips: [
            "Test points provide safe, reliable connections for RCD testing",
            "No risk of loose connections during testing",
            "Easy to verify connection security"
          ]
        },
        troubleshooting: [
          "If tester doesn't detect RCD, check connections and energisation",
          "Ensure tester is set for correct RCD rating"
        ]
      },
      {
        id: "ramp-test",
        title: "RCD Ramp Test",
        description: "Perform ramp test to determine actual trip current of the RCD",
        safetyWarnings: [
          "Ensure RCD resets between tests",
          "Allow cooling time between multiple tests"
        ],
        equipment: ["RCD tester", "Test certificate", "Timer"],
        wagoInstructions: {
          connectorType: "Maintain 773 connections established in previous step",
          steps: [
            "Verify 773 connectors remain securely connected",
            "Check test points are clean and making good contact",
            "Initiate ramp test on RCD tester",
            "Monitor test progress and record trip current",
            "Allow RCD to reset before next test",
            "Repeat if required for verification"
          ],
          safetyTips: [
            "Stable connections ensure accurate ramp test results",
            "Test points maintain consistent contact throughout test"
          ]
        },
        troubleshooting: [
          "If RCD doesn't trip during ramp test, check for correct wiring",
          "High trip current may indicate RCD degradation"
        ],
        expectedResults: "RCD should trip between 50% and 100% of rated current"
      },
      {
        id: "trip-time-1x",
        title: "Trip Time Test at 1× Rated Current",
        description: "Measure RCD trip time at 1× rated current (e.g., 30mA for 30mA RCD)",
        safetyWarnings: [
          "Test at both 0° and 180° phase angles",
          "Record the longer of the two readings"
        ],
        equipment: ["RCD tester", "Test certificate"],
        wagoInstructions: {
          connectorType: "Continue using established 773 connections",
          steps: [
            "Maintain secure 773 connector connections throughout testing",
            "Set RCD tester to 1× rated current mode",
            "Perform test at 0° phase angle first",
            "Record trip time result",
            "Reset RCD and test at 180° phase angle", 
            "Record longer of the two trip times"
          ],
          safetyTips: [
            "Consistent connections ensure repeatable results",
            "No connection disturbance between phase angle tests"
          ]
        },
        troubleshooting: [
          "If trip time is too long, check RCD condition",
          "Verify test current is correct for RCD rating"
        ],
        expectedResults: "Trip time should be less than 300ms for general purpose RCDs"
      },
      {
        id: "trip-time-5x",
        title: "Trip Time Test at 5× Rated Current",
        description: "Measure RCD trip time at 5× rated current (e.g., 150mA for 30mA RCD)",
        safetyWarnings: [
          "This is the fastest trip time test",
          "Ensure RCD can handle the higher test current"
        ],
        equipment: ["RCD tester", "Test certificate"],
        wagoInstructions: {
          connectorType: "Continue using established 773 connections",
          steps: [
            "Verify 773 connections remain secure for final test",
            "Set RCD tester to 5× rated current mode",
            "Perform single test at this current level",
            "Record trip time immediately",
            "Check RCD resets normally after test",
            "Remove test connections carefully"
          ],
          safetyTips: [
            "Final test requires stable connections for accurate timing",
            "Safe removal of test connections after completion"
          ]
        },
        troubleshooting: [
          "If RCD doesn't trip quickly at 5× current, investigate fault",
          "Check for overheating after high current test"
        ],
        expectedResults: "Trip time should be less than 40ms"
      }
    ]
  }
];

export const getEnhancedTestGuideById = (id: string): EnhancedTestGuide | undefined => {
  return comprehensiveTestingGuides.find(guide => guide.id === id);
};

export const getEnhancedTestGuidesByDifficulty = (difficulty: "Beginner" | "Intermediate" | "Advanced"): EnhancedTestGuide[] => {
  return comprehensiveTestingGuides.filter(guide => guide.difficulty === difficulty);
};
