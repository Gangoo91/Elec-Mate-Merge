
// Enhanced BS7671 step data structure with detailed information
export interface ProcedureStep {
  step: number;
  title: string;
  description: string;
  actions: string[];
  criticalSafetyPoint?: string;  // Added optional property
}

export interface ExpectedResults {
  typical: string;
  minimum?: string;
  maximum?: string;
}

export interface TestSequence {
  step: number;
  test: string;
  description: string;
}

export interface SystemTypes {
  singlePhase: string[];
  threePhase: string[];
}

export interface InstallationTypes {
  [key: string]: string[];
}

export interface MFTSettings {
  testType: string;
  voltage: string;
  current: string;
  duration: string;
  leads: string[];
}

export interface TroubleshootingIssue {
  issue: string;
  causes: string[];
  solutions: string[];
}

export interface CommonMistake {
  mistake: string;
  consequence: string;
  prevention: string;
}

// Updated BS7671StepData interface to include all required properties
export interface BS7671StepData {
  id: number;
  title: string;
  description: string;
  category: string;
  checklist: string[];  // Added required property
  regulations: string[];  // Added required property
  nextSteps: string;  // Added required property
  safetyNotes?: string[];
  procedureSteps?: ProcedureStep[];
  testSequences?: {
    singlePhase?: TestSequence[];
    threePhase?: TestSequence[];
  };
  gs38Requirements?: {
    testEquipment?: string[];
    testLeads?: string[];
  };
  commonMistakes?: CommonMistake[];
  troubleshooting?: TroubleshootingIssue[];
  emergencyProcedures?: {
    [key: string]: string[];
  };
  mftSettings?: MFTSettings;
  connections?: string[];
  expectedResults?: ExpectedResults;
  systemTypes?: SystemTypes;
  installationTypes?: InstallationTypes;
}

// Enhanced BS7671 steps array with comprehensive testing procedures
export const enhancedBS7671Steps: BS7671StepData[] = [
  {
    id: 1,
    title: "Initial Verification",
    description: "Planning and preparation before starting any electrical work",
    category: "Planning",
    checklist: [
      "Review installation drawings and specifications",
      "Identify all circuits and protective devices",
      "Check availability of test equipment",
      "Verify calibration certificates are current",
      "Plan the testing sequence",
      "Identify any special requirements"
    ],
    regulations: [
      "BS 7671 Regulation 610.1 - General requirements",
      "BS 7671 Regulation 610.2 - Competence of inspector",
      "IET Guidance Note 3 - Inspection & Testing"
    ],
    nextSteps: "Proceed to compliance verification to ensure all regulatory requirements are met"
  },
  {
    id: 2,
    title: "Compliance Verification",
    description: "Verify installation compliance with BS 7671 regulations",
    category: "Documentation",
    checklist: [
      "Check design calculations and specifications",
      "Verify protective device selection and coordination",
      "Confirm cable selection and installation methods",
      "Review earthing and bonding arrangements",
      "Check special location requirements if applicable",
      "Verify RCD protection where required"
    ],
    regulations: [
      "BS 7671 Chapter 41 - Protection against electric shock",
      "BS 7671 Chapter 43 - Protection against overcurrent",
      "BS 7671 Chapter 52 - Selection and erection of wiring systems",
      "BS 7671 Part 7 - Requirements for special installations"
    ],
    nextSteps: "Move to documentation review to ensure all paperwork is in order"
  },
  {
    id: 3,
    title: "Documentation Requirements",
    description: "Ensure all required documentation is available and correct",
    category: "Documentation",
    checklist: [
      "Electrical installation certificate prepared",
      "Circuit charts and schedules completed",
      "Test results schedule ready for completion",
      "Previous test certificates available (if applicable)",
      "Manufacturer instructions and warranties collected",
      "Risk assessments and method statements prepared"
    ],
    regulations: [
      "BS 7671 Regulation 630.1 - Certification and reporting",
      "Building Regulations Part P compliance",
      "Construction (Design and Management) Regulations"
    ],
    nextSteps: "Begin safe isolation procedures before any testing can commence"
  },
  {
    id: 4,
    title: "Safe Isolation",
    description: "Critical life-safety procedure for isolating electrical supplies before work",
    category: "Safety Critical",
    checklist: [
      "Identify all sources of supply to work area",
      "Inform all relevant parties of planned isolation",
      "Open appropriate isolators and apply locks",
      "Prove test equipment on known live source",
      "Test installation following correct sequence (earth first, earth last)",
      "Re-prove test equipment functionality",
      "Secure work area with appropriate warnings"
    ],
    regulations: [
      "BS 7671 Regulation 537.2.1.1 - Isolation",
      "HSE Guidance HSG85 - Electricity at work: Safe working practices",
      "HSE Guidance GS38 - Electrical test equipment for use on low voltage electrical systems"
    ],
    nextSteps: "With the installation safely isolated, begin continuity testing of protective conductors",
    safetyNotes: [
      "CRITICAL: Always connect test leads to EARTH FIRST when proving dead - this can save your life",
      "Never assume a circuit is dead - always prove it using the correct sequence",
      "Use only GS38 compliant test equipment with current calibration certificates",
      "If in doubt, don't proceed - get supervision or advice"
    ]
  },
  {
    id: 5,
    title: "Continuity Testing (R1+R2)",
    description: "Test continuity of circuit protective conductors",
    category: "Electrical Testing",
    checklist: [
      "Connect MFT leads to line and CPC at consumer unit",
      "Test each circuit systematically",
      "Record all readings on test schedule",
      "Check readings are within expected values",
      "Investigate any anomalous results",
      "Cross-reference with cable length calculations"
    ],
    regulations: [
      "BS 7671 Regulation 612.2.1 - Continuity of protective conductors",
      "IET Guidance Note 3 Section 10.3"
    ],
    nextSteps: "Continue with insulation resistance testing between live conductors and earth",
    mftSettings: {
      testType: "Continuity",
      voltage: "DC supply (typically 4-24V)",
      current: "Maximum 200mA",
      duration: "Until stable reading obtained",
      leads: ["Line lead to L terminal", "CPC lead to E terminal"]
    },
    connections: [
      "Connect test leads at the distribution board",
      "Link line and CPC at the far end of each circuit",
      "Ensure all switches and devices are in ON position",
      "Remove any electronic equipment that could be damaged"
    ],
    expectedResults: {
      typical: "0.05Ω to 2.0Ω depending on circuit length and cable size",
      maximum: "Value should not exceed 1.67 times the design calculation"
    }
  },
  {
    id: 6,
    title: "Insulation Resistance Testing",
    description: "Test insulation resistance between conductors and to earth",
    category: "Electrical Testing",
    checklist: [
      "Disconnect all equipment and remove lamps",
      "Link live conductors at consumer unit",
      "Test between live conductors and earth",
      "Test between line and neutral",
      "Record all readings",
      "Investigate any low readings"
    ],
    regulations: [
      "BS 7671 Regulation 612.3.2 - Insulation resistance",
      "IET Guidance Note 3 Section 10.4"
    ],
    nextSteps: "Proceed with polarity testing to verify correct connections",
    mftSettings: {
      testType: "Insulation Resistance",
      voltage: "500V DC for circuits up to 500V",
      current: "Maximum 1mA",
      duration: "1 minute or until stable reading",
      leads: ["Test between conductors", "Test to earth"]
    },
    expectedResults: {
      typical: "Greater than 200MΩ for new installations",
      minimum: "1MΩ minimum acceptable value"
    }
  },
  {
    id: 7,
    title: "Polarity Testing",
    description: "Verify correct polarity of all single pole devices",
    category: "Electrical Testing",
    checklist: [
      "Check all single pole switches are in line conductor",
      "Verify ES lamp holders have live to centre contact",
      "Confirm socket outlets have correct polarity",
      "Check all protective devices are in line conductor",
      "Test using continuity method",
      "Record results for each circuit"
    ],
    regulations: [
      "BS 7671 Regulation 612.6 - Polarity",
      "IET Guidance Note 3 Section 10.6"
    ],
    nextSteps: "Continue with earth fault loop impedance testing"
  },
  {
    id: 8,
    title: "Earth Fault Loop Impedance (Zs)",
    description: "Measure earth fault loop impedance to verify disconnection times",
    category: "Electrical Testing",
    checklist: [
      "Reconnect installation after previous tests",
      "Set MFT to appropriate test method",
      "Test at origin and each circuit",
      "Record Zs values for each circuit",
      "Compare with maximum permitted values",
      "Calculate or verify disconnection times"
    ],
    regulations: [
      "BS 7671 Regulation 612.9 - Earth fault loop impedance",
      "BS 7671 Chapter 41 - Protection by automatic disconnection"
    ],
    nextSteps: "Test RCD operation if RCD protection is installed",
    mftSettings: {
      testType: "Earth Fault Loop Impedance",
      voltage: "Nominal supply voltage",
      current: "Test current as per instrument specification",
      duration: "Momentary test",
      leads: ["Line to earth measurement"]
    },
    expectedResults: {
      typical: "Varies by circuit protection and cable length",
      maximum: "Must not exceed values in BS 7671 Tables 41.2, 41.3, 41.4"
    }
  },
  {
    id: 9,
    title: "RCD Testing",
    description: "Test operation of residual current devices",
    category: "Electrical Testing",
    checklist: [
      "Test manual test button operation",
      "Measure RCD operating time at 1x rated current",
      "Test at 5x rated current for trip time",
      "Check non-operation at 50% rated current",
      "Test operation of any time delay RCDs",
      "Record all test results"
    ],
    regulations: [
      "BS 7671 Regulation 612.13 - Additional protection",
      "IET Guidance Note 3 Section 10.13"
    ],
    nextSteps: "Complete functional testing of all systems and prepare certification",
    mftSettings: {
      testType: "RCD Testing",
      voltage: "Nominal supply voltage",
      current: "0.5x, 1x, and 5x rated trip current",
      duration: "As specified in test sequence",
      leads: ["Standard RCD test leads"]
    },
    expectedResults: {
      typical: "Trip time: <300ms at 1x In, <40ms at 5x In",
      minimum: "Must trip within specified times, no trip at 0.5x In"
    }
  },
  {
    id: 10,
    title: "Functional Testing",
    description: "Test operation of all electrical systems and safety features",
    category: "Functional Testing",
    checklist: [
      "Test all lighting circuits and switches",
      "Check socket outlet operation",
      "Test emergency lighting systems",
      "Verify fire alarm system operation",
      "Check interlocks and safety systems",
      "Test any special installations or equipment"
    ],
    regulations: [
      "BS 7671 Regulation 612.12 - Functional testing",
      "Relevant product standards for specific equipment"
    ],
    nextSteps: "Complete all documentation and issue electrical installation certificate"
  }
];
