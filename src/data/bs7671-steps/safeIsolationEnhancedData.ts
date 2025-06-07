
export const safeIsolationEnhancedData = {
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

  testSequences: {
    singlePhase: [
      { step: 1, test: "L-E", description: "Live to Earth" },
      { step: 2, test: "L-N", description: "Live to Neutral" },
      { step: 3, test: "N-E", description: "Neutral to Earth" }
    ],
    threePhase: [
      { step: 1, test: "L1-E", description: "Line 1 to Earth" },
      { step: 2, test: "L2-E", description: "Line 2 to Earth" },
      { step: 3, test: "L3-E", description: "Line 3 to Earth" },
      { step: 4, test: "L1-L2", description: "Line 1 to Line 2" },
      { step: 5, test: "L2-L3", description: "Line 2 to Line 3" },
      { step: 6, test: "L1-L3", description: "Line 1 to Line 3" },
      { step: 7, test: "L1-N", description: "Line 1 to Neutral" },
      { step: 8, test: "L2-N", description: "Line 2 to Neutral" },
      { step: 9, test: "L3-N", description: "Line 3 to Neutral" },
      { step: 10, test: "N-E", description: "Neutral to Earth" }
    ]
  },

  gs38Requirements: {
    testEquipment: [
      "Voltage indicators must comply with GS38",
      "Test leads fused at maximum 500mA",
      "Insulation rated for the test voltage",
      "Current calibration certificate required",
      "Visual inspection before each use"
    ],
    testLeads: [
      "Finger barriers or shrouded probes",
      "Maximum 2mm exposed conductive tip",
      "Robust and flexible construction",
      "Clearly marked voltage rating",
      "No damage or wear visible"
    ]
  },

  commonMistakes: [
    {
      mistake: "Not connecting earth lead first",
      consequence: "Risk of electric shock if unexpected voltage present",
      prevention: "Always follow earth first, earth last procedure"
    },
    {
      mistake: "Using uncalibrated test equipment",
      consequence: "False readings could indicate dead when live",
      prevention: "Check calibration certificates before use"
    },
    {
      mistake: "Not proving test equipment before and after",
      consequence: "Equipment fault could give false dead indication",
      prevention: "Always test on known live source before and after"
    },
    {
      mistake: "Inadequate isolation (switching only)",
      consequence: "Supply could be accidentally restored",
      prevention: "Use proper isolation with locks and labels"
    },
    {
      mistake: "Not testing all conductor combinations",
      consequence: "Could miss voltage on one conductor",
      prevention: "Follow the complete test sequence systematically"
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
  ],

  emergencyProcedures: {
    ifVoltageDetected: [
      "Do not touch any conductors",
      "Immediately warn others in the area",
      "Investigate the source of voltage",
      "Check isolation points are actually open",
      "Look for alternative supply routes",
      "Do not proceed until completely safe"
    ],
    equipmentFailure: [
      "Stop work immediately",
      "Check test equipment on known live source",
      "Replace faulty equipment if confirmed",
      "Re-start procedure from the beginning",
      "Document the equipment failure",
      "Report to supervisor if required"
    ]
  }
};
