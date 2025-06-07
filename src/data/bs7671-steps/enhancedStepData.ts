import { safeIsolationEnhancedData } from "./safeIsolationEnhancedData";

export interface BS7671StepData {
  id: number;
  title: string;
  description: string;
  category: string;
  procedureSteps?: ProcedureStep[];
  safetyNotes?: string[];
  mftSettings?: MFTSetting;
  connections?: string[];
  expectedResults?: ExpectedResults;
  systemTypes?: SystemTypes;
  gs38Requirements?: GS38Requirements;
  commonMistakes?: CommonMistake[];
  troubleshooting?: Troubleshooting[];
  emergencyProcedures?: EmergencyProcedures;
  testSequences?: TestSequences;
  installationTypes?: string[];
  stepByStepGuide?: StepByStepGuide[];
  compliancePoints?: string[];
  regulationsReference?: string[];
  documentationItems?: string[];
  visualInspectionChecklist?: string[];
  criticalSafetyPoint?: string;
}

export interface ProcedureStep {
  step: number;
  title: string;
  description: string;
  actions: string[];
}

export interface MFTSetting {
  testType: string;
  voltage?: string;
  current?: string;
  duration?: string;
  leads: string[];
}

export interface ExpectedResults {
  typical: string;
  minimum?: string;
  maximum?: string;
}

export interface SystemTypes {
  singlePhase: string[];
  threePhase: string[];
}

export interface GS38Requirements {
  testEquipment: string[];
  testLeads: string[];
}

export interface CommonMistake {
  mistake: string;
  consequence: string;
  prevention: string;
}

export interface Troubleshooting {
  issue: string;
  causes: string[];
  solutions: string[];
}

export interface EmergencyProcedures {
  ifVoltageDetected: string[];
  equipmentFailure: string[];
}

export interface TestSequences {
  singlePhase: TestStep[];
  threePhase: TestStep[];
}

export interface TestStep {
  step: number;
  test: string;
  description: string;
}

export interface StepByStepGuide {
  step: number;
  instruction: string;
  image?: string;
}

export const enhancedBS7671Steps: BS7671StepData[] = [
  {
    id: 1,
    title: "Initial Assessment & Planning",
    description: "Thoroughly assess the installation and plan the testing process",
    category: "Initial Verification",
    installationTypes: ["Domestic", "Commercial", "Industrial"],
    stepByStepGuide: [
      { step: 1, instruction: "Review existing documentation (if available)" },
      { step: 2, instruction: "Identify the installation type (domestic, commercial, etc.)" },
      { step: 3, instruction: "Note any specific requirements or regulations" },
      { step: 4, instruction: "Plan the sequence of tests" },
      { step: 5, instruction: "Gather necessary tools and equipment" }
    ]
  },
  {
    id: 2,
    title: "Compliance & Regulation Check",
    description: "Verify compliance with BS7671 and other relevant regulations",
    category: "Initial Verification",
    installationTypes: ["Domestic", "Commercial", "Industrial"],
    compliancePoints: [
      "Earth Electrode Resistance",
      "Continuity of Protective Conductors",
      "Insulation Resistance",
      "Polarity",
      "Earth Fault Loop Impedance",
      "RCD Testing"
    ],
    regulationsReference: [
      "Regulation 411.4.5 - RCD protection",
      "Regulation 522.6.202 - Cables buried in walls",
      "Chapter 54 - Earthing arrangements",
      "Section 61 - Initial Verification"
    ]
  },
  {
    id: 3,
    title: "Documentation & Certification",
    description: "Complete the necessary documentation and certification accurately",
    category: "Documentation",
    installationTypes: ["Domestic", "Commercial", "Industrial"],
    documentationItems: [
      "Electrical Installation Certificate",
      "Electrical Installation Condition Report (EICR)",
      "Minor Electrical Installation Works Certificate",
      "Schedule of Inspections",
      "Schedule of Test Results"
    ]
  },
  {
    id: 4,
    title: "Safe Isolation",
    description: "Critical life-safety procedure for isolating electrical supplies before work",
    category: "Safety Critical",
    
    safetyNotes: [
      "CRITICAL: Always connect test leads to EARTH FIRST when proving dead - this can save your life",
      "Never assume a circuit is dead - always prove it using the correct sequence",
      "Use only GS38 compliant test equipment with current calibration certificates",
      "If in doubt, don't proceed - get supervision or advice",
      "Lock off procedures must use approved locks and warning notices",
      "Inform all relevant parties before isolation to prevent accidental re-energisation"
    ],

    procedureSteps: [
      {
        step: 1,
        title: "Planning and Risk Assessment",
        description: "Identify the work to be undertaken and plan the isolation",
        actions: [
          "Identify all sources of supply to the work area",
          "Check drawings and circuit charts for accuracy",
          "Identify the correct isolation points",
          "Plan the isolation sequence for complex installations",
          "Ensure adequate lighting for the work area",
          "Confirm availability of appropriate test equipment"
        ]
      },
      {
        step: 2,
        title: "Inform Relevant Parties",
        description: "Notify all affected parties of the planned isolation",
        actions: [
          "Notify building occupants of planned outage",
          "Inform security personnel of the work",
          "Contact relevant supervisors and duty holders",
          "Check for any critical processes that may be affected",
          "Ensure emergency procedures are in place if required",
          "Document who has been informed and when"
        ]
      },
      {
        step: 3,
        title: "Secure Isolation",
        description: "Physically isolate the supply using appropriate devices",
        actions: [
          "Open the appropriate isolator or remove fuses",
          "Ensure the isolation is secure and cannot be accidentally closed",
          "Apply approved locks using your personal key",
          "Attach warning notices to the isolation point",
          "Record the isolation in the permit-to-work system",
          "Ensure the key remains in your possession throughout the work"
        ]
      },
      {
        step: 4,
        title: "Prove Dead - Equipment Check",
        description: "Verify test equipment is functioning correctly",
        actions: [
          "Visually inspect test leads for damage",
          "Check calibration certificates are current",
          "Test voltage indicator on a known live source",
          "Verify both audible and visual indicators work",
          "Ensure test leads meet GS38 requirements",
          "Replace any damaged or expired equipment"
        ]
      },
      {
        step: 5,
        title: "Prove Dead - Test Sequence",
        description: "Test the isolated installation following the correct sequence",
        actions: [
          "Connect EARTH lead to earth terminal FIRST",
          "Test between each live conductor and earth",
          "Test between live conductors (where applicable)",
          "Test between neutral and earth",
          "Ensure all readings show zero volts",
          "Remove earth lead LAST when testing is complete"
        ],
        criticalSafetyPoint: "EARTH CONNECTION FIRST - REMOVAL LAST"
      },
      {
        step: 6,
        title: "Re-prove Test Equipment",
        description: "Confirm test equipment is still functioning after testing",
        actions: [
          "Test voltage indicator on the same known live source",
          "Verify readings are consistent with initial test",
          "Confirm equipment was not damaged during testing",
          "If equipment fails this test, repeat isolation procedure",
          "Document the test results",
          "Equipment must work correctly before proceeding"
        ]
      },
      {
        step: 7,
        title: "Secure Work Area",
        description: "Make the work area safe and prevent unauthorised access",
        actions: [
          "Apply warning notices at the work location",
          "Barriers or guards where necessary",
          "Ensure adequate lighting for safe working",
          "Remove or isolate any other hazards",
          "Brief all workers on the isolation status",
          "Establish communication procedures"
        ]
      }
    ],

    troubleshooting: [
      {
        issue: "Test equipment shows voltage when circuit should be dead",
        causes: [
          "Incorrect isolation point selected",
          "Alternative supply route not identified",
          "Induced voltage from adjacent circuits",
          "Faulty isolation switch or contactor"
        ],
        solutions: [
          "Double-check isolation points against drawings",
          "Look for alternative supply routes",
          "Check for backfeed from other circuits",
          "Test isolation device operation",
          "Consult supervisor if uncertainty remains"
        ]
      },
      {
        issue: "Test equipment appears to have failed during testing",
        causes: [
          "Damaged test leads",
          "Low battery in voltage indicator",
          "Excessive fault current damage",
          "Water ingress or contamination"
        ],
        solutions: [
          "Replace test equipment immediately",
          "Start isolation procedure from beginning",
          "Check equipment calibration dates",
          "Report equipment failure to supervisor",
          "Use alternative calibrated equipment"
        ]
      },
      {
        issue: "Unable to achieve secure isolation",
        causes: [
          "No lockable isolation point available",
          "Multiple supply sources present",
          "Generator or UPS backup systems",
          "Complex distribution arrangement"
        ],
        solutions: [
          "Identify all supply sources systematically",
          "Use multiple isolation points if required",
          "Coordinate with building management",
          "Implement permit-to-work procedures",
          "Consider alternative work methods"
        ]
      }
    ]
  },
  {
    id: 5,
    title: "Continuity Testing (R1+R2)",
    description: "Verify the continuity of circuit protective conductors (CPC)",
    category: "Electrical Testing",
    mftSettings: {
      testType: "Continuity",
      current: ">200mA",
      leads: ["Red", "Green"]
    },
    connections: [
      "Connect test leads to the Line and CPC conductors at the distribution board",
      "Connect the other ends of the test leads to the Line and CPC conductors at the furthest point of the circuit",
      "Null out the test lead resistance before testing"
    ],
    expectedResults: {
      typical: "<1 ohm",
      maximum: "Regulation dependent"
    },
    systemTypes: {
      singlePhase: ["Test between Line and CPC"],
      threePhase: ["Test each Line to CPC"]
    },
    troubleshooting: [
      {
        issue: "High resistance reading",
        causes: [
          "Poor connection",
          "Loose terminals",
          "Cable damage",
          "Incorrect test lead nulling"
        ],
        solutions: [
          "Check all connections are tight and clean",
          "Inspect the cable for damage",
          "Re-null the test leads",
          "Use a different test instrument"
        ]
      }
    ]
  },
  {
    id: 6,
    title: "Insulation Resistance Testing",
    description: "Measure the insulation resistance of the electrical installation",
    category: "Electrical Testing",
    mftSettings: {
      testType: "Insulation Resistance",
      voltage: "500V DC",
      leads: ["Red", "Black"]
    },
    connections: [
      "Isolate the circuit under test",
      "Connect test leads between Line and Neutral",
      "Connect test leads between Line and CPC",
      "Connect test leads between Neutral and CPC"
    ],
    expectedResults: {
      minimum: ">1 MΩ"
    },
    systemTypes: {
      singlePhase: ["Test L-N, L-E, N-E"],
      threePhase: ["Test L1-L2, L2-L3, L1-L3, L-N, L-E, N-E"]
    },
    safetyNotes: [
      "Ensure all sensitive electronic equipment is disconnected before testing",
      "Apply the test voltage for the recommended duration (typically 5 seconds)"
    ],
    troubleshooting: [
      {
        issue: "Low insulation resistance reading",
        causes: [
          "Damp or contaminated cables",
          "Damaged insulation",
          "Incorrect disconnection of equipment",
          "Surface tracking"
        ],
        solutions: [
          "Dry out or replace damp cables",
          "Repair or replace damaged cables",
          "Ensure all equipment is disconnected",
          "Clean any surface tracking"
        ]
      }
    ]
  },
  {
    id: 7,
    title: "Polarity Testing",
    description: "Verify correct polarity of wiring",
    category: "Visual Inspection",
    visualInspectionChecklist: [
      "Correctly identified Line, Neutral and Earth conductors",
      "Correct polarity at socket outlets",
      "Correct polarity at light switches",
      "Correct polarity at fused connection units"
    ],
    installationTypes: ["Domestic", "Commercial", "Industrial"],
    troubleshooting: [
      {
        issue: "Incorrect polarity",
        causes: [
          "Reversed connections at socket outlets",
          "Reversed connections at light switches",
          "Incorrectly wired distribution board"
        ],
        solutions: [
          "Correct reversed connections at socket outlets",
          "Correct reversed connections at light switches",
          "Rewire the distribution board correctly"
        ]
      }
    ]
  },
  {
    id: 8,
    title: "Earth Fault Loop Impedance Testing (Zs)",
    description: "Measure the earth fault loop impedance of the circuit",
    category: "Electrical Testing",
    mftSettings: {
      testType: "Zs Loop Test",
      leads: ["Red", "Green"]
    },
    connections: [
      "Connect test leads to the Line and CPC conductors at the point of test",
      "Perform the loop impedance test"
    ],
    expectedResults: {
      maximum: "Regulation dependent",
      typical: "<1 ohm"
    },
    systemTypes: {
      singlePhase: ["Test at furthest point of circuit"],
      threePhase: ["Test each phase to CPC"]
    },
    troubleshooting: [
      {
        issue: "High earth fault loop impedance reading",
        causes: [
          "Poor connection",
          "High earth electrode resistance",
          "Long circuit length",
          "Small conductor size"
        ],
        solutions: [
          "Check all connections are tight and clean",
          "Improve the earth electrode resistance",
          "Reduce the circuit length",
          "Increase the conductor size"
        ]
      }
    ]
  },
  {
    id: 9,
    title: "RCD Testing",
    description: "Test the operation of residual current devices (RCDs)",
    category: "Electrical Testing",
    mftSettings: {
      testType: "RCD Test",
      current: "30mA",
      leads: ["Red", "Green"]
    },
    connections: [
      "Connect test leads to the Line and CPC conductors on the load side of the RCD",
      "Perform the RCD test at 0.5x, 1x and 5x the rated tripping current",
      "Measure the tripping time at 1x the rated tripping current"
    ],
    expectedResults: {
      maximum: "Regulation dependent",
      typical: "<40ms"
    },
    systemTypes: {
      singlePhase: ["Test RCD tripping time"],
      threePhase: ["Test RCD tripping time"]
    },
    troubleshooting: [
      {
        issue: "RCD fails to trip",
        causes: [
          "Faulty RCD",
          "Incorrect wiring",
          "High earth leakage current",
          "Test instrument fault"
        ],
        solutions: [
          "Replace the RCD",
          "Check the wiring is correct",
          "Reduce the earth leakage current",
          "Use a different test instrument"
        ]
      }
    ]
  },
  {
    id: 10,
    title: "Final Visual Inspection",
    description: "Perform a final visual inspection of the installation",
    category: "Visual Inspection",
    visualInspectionChecklist: [
      "Correctly installed equipment",
      "Correctly labelled circuits",
      "No signs of damage or overheating",
      "Correctly terminated cables",
      "No exposed live parts"
    ],
    installationTypes: ["Domestic", "Commercial", "Industrial"]
  },
  safeIsolationEnhancedData
];
