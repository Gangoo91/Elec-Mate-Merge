// BS 7671 Appendix 6: Model Forms for Certification and Reporting
// Amendment 3:2024 Compliant

export interface CertificationRequirement {
  certificateType: string;
  regulation: string;
  when Required: string;
  signatoryResponsibilities: string[];
  mustInclude: string[];
  validity Conditions: string[];
}

export interface InspectionItemCategory {
  category: string;
  regulation: string;
  items: InspectionItem[];
}

export interface InspectionItem {
  itemNumber: string;
  description: string;
  regulation: string;
  critical: boolean;
  applicableTo: string[]; // 'domestic', 'commercial', 'industrial', 'special-locations'
}

export interface TestRequirement {
  testName: string;
  regulation: string;
  sequence: number;
  testMethod: string;
  acceptanceCriteria: string;
  recordOn: string;
  notes: string[];
}

// Regulation 644.1 & 644.4 - Electrical Installation Certificate (EIC)
export const electricalInstallationCertificate: CertificationRequirement = {
  certificateType: "Electrical Installation Certificate (EIC)",
  regulation: "644.1, 644.4",
  whenRequired: "New installation OR addition/alteration with new circuits OR replacement of consumer unit/DB",
  signatoryResponsibilities: [
    "Design - Person responsible for circuit design",
    "Construction - Person responsible for installation work",
    "Inspection - Person responsible for inspection",
    "Testing - Person responsible for testing"
  ],
  mustInclude: [
    "Schedule of Inspections (completed)",
    "Schedule(s) of Circuit Details and Test Results",
    "Details of departures from BS 7671 (if any)",
    "Next inspection interval recommendation",
    "Maximum prospective fault current (Ipf)",
    "Earthing arrangements (TN-S, TN-C-S, TT, IT)",
    "Main protective bonding conductor size"
  ],
  validityConditions: [
    "Only valid if Schedule of Inspections completed",
    "Must be accompanied by Schedule(s) of Circuit Details and Test Results",
    "Original issued to person ordering work (Reg 644.4)",
    "Duplicate retained by issuer"
  ]
};

// Regulation 644.4.201 - Minor Electrical Installation Works Certificate (MEIWC)
export const minorWorksCertificate: CertificationRequirement = {
  certificateType: "Minor Electrical Installation Works Certificate (MEIWC)",
  regulation: "644.4.201",
  whenRequired: "Addition/alteration NOT extending to new circuit (e.g., adding socket-outlets, relocating switch)",
  signatoryResponsibilities: [
    "Design, Construction, Inspection & Testing - Single skilled person"
  ],
  mustInclude: [
    "Description of minor works carried out",
    "Circuit details (circuit number, description)",
    "Test results (Zs, insulation resistance, polarity, RCD test)",
    "Comments on existing installation (if relevant)"
  ],
  validityConditions: [
    "Not for new circuits or consumer unit replacement",
    "Separate certificate for each circuit altered",
    "Appropriate inspection and testing still required"
  ]
};

// Regulation 653.1 - Electrical Installation Condition Report (EICR)
export const conditionReport: CertificationRequirement = {
  certificateType: "Electrical Installation Condition Report (EICR)",
  regulation: "653.1",
  whenRequired: "Periodic inspection and testing of existing installation",
  signatoryResponsibilities: [
    "Inspection - Person responsible for inspection",
    "Testing - Person responsible for testing"
  ],
  mustInclude: [
    "Extent and limitations of inspection",
    "Schedule of Items Inspected",
    "Schedule(s) of Circuit Details and Test Results",
    "Observations (coded C1, C2, C3, FI)",
    "Overall assessment: Satisfactory / Unsatisfactory",
    "Recommendations for remedial action",
    "Next inspection recommendation"
  ],
  validityConditions: [
    "Must state extent and limitations clearly",
    "Cannot certify work not inspected",
    "Observations must be coded correctly"
  ]
};

// Observation Codes for EICR (Reg 653)
export interface ObservationCode {
  code: string;
  classification: string;
  action: string;
  examples: string[];
}

export const eicrObservationCodes: ObservationCode[] = [
  {
    code: "C1",
    classification: "Danger present - Risk of injury",
    action: "Requires IMMEDIATE remedial action",
    examples: [
      "Live parts accessible",
      "No RCD protection where required (bathrooms, sockets)",
      "Damaged cables with exposed live conductors",
      "Missing earth bonding to services",
      "Polarity reversed on socket-outlets"
    ]
  },
  {
    code: "C2",
    classification: "Potentially dangerous - Urgent remedial action required",
    action: "Requires URGENT remedial action",
    examples: [
      "Inadequate earthing/bonding arrangements",
      "Overloaded circuits (cables overheating)",
      "Lack of RCD protection for concealed cables",
      "Zs values exceeded for circuit",
      "Inadequate fault current protection"
    ]
  },
  {
    code: "C3",
    classification: "Improvement recommended",
    action: "Improvement recommended to meet current standards",
    examples: [
      "Older wiring not to current colour standards",
      "Lack of SPD (for installations pre-2019)",
      "Inadequate labelling",
      "No AFDD protection",
      "Circuits not RCD protected (not required, but recommended)"
    ]
  },
  {
    code: "FI",
    classification: "Further Investigation required",
    action: "Further investigation required without delay",
    examples: [
      "Unable to verify earth electrode resistance",
      "Unable to access concealed wiring",
      "Suspected damage but unable to confirm",
      "External supply characteristics unknown"
    ]
  }
];

// Schedule of Inspections - Appendix 6
export const scheduleOfInspections: InspectionItemCategory[] = [
  {
    category: "1.0 External Condition of Intake Equipment",
    regulation: "Chap 51",
    items: [
      {
        itemNumber: "1.1",
        description: "Service cable (visual inspection where accessible)",
        regulation: "132.16",
        critical: true,
        applicableTo: ['domestic', 'commercial', 'industrial']
      },
      {
        itemNumber: "1.2",
        description: "Distributor's earthing arrangement (PME/TN-S/TT)",
        regulation: "Chap 54",
        critical: true,
        applicableTo: ['domestic', 'commercial', 'industrial']
      }
    ]
  },
  {
    category: "2.0 Earthing and Bonding Arrangements",
    regulation: "Chap 54",
    items: [
      {
        itemNumber: "2.1",
        description: "Presence and condition of earthing conductor",
        regulation: "542.3",
        critical: true,
        applicableTo: ['domestic', 'commercial', 'industrial']
      },
      {
        itemNumber: "2.2",
        description: "Presence and condition of main protective bonding conductors (water, gas, oil, structural steel)",
        regulation: "411.3.1.2, 544.1",
        critical: true,
        applicableTo: ['domestic', 'commercial', 'industrial']
      },
      {
        itemNumber: "2.3",
        description: "Earthing/bonding conductor sizes meet BS 7671",
        regulation: "543.1, Table 54.7",
        critical: true,
        applicableTo: ['domestic', 'commercial', 'industrial']
      },
      {
        itemNumber: "2.4",
        description: "Earthing/bonding connections tight and labels present",
        regulation: "514.13.1",
        critical: true,
        applicableTo: ['domestic', 'commercial', 'industrial']
      }
    ]
  },
  {
    category: "3.0 Consumer Unit / Distribution Board",
    regulation: "Sec 536",
    items: [
      {
        itemNumber: "3.1",
        description: "Adequacy of working space/accessibility (132.12)",
        regulation: "132.12, 513.1",
        critical: false,
        applicableTo: ['domestic', 'commercial', 'industrial']
      },
      {
        itemNumber: "3.2",
        description: "Security of fixing",
        regulation: "134.1.1",
        critical: true,
        applicableTo: ['domestic', 'commercial', 'industrial']
      },
      {
        itemNumber: "3.3",
        description: "Condition of enclosure - IP rating, fire rating (non-combustible for domestic)",
        regulation: "421.1.201, 526.5",
        critical: true,
        applicableTo: ['domestic', 'commercial', 'industrial']
      },
      {
        itemNumber: "3.4",
        description: "Presence of main switch, correctly rated",
        regulation: "462.1.201",
        critical: true,
        applicableTo: ['domestic', 'commercial', 'industrial']
      },
      {
        itemNumber: "3.5",
        description: "Correct type and rating of protective devices (MCB/RCBO/RCD)",
        regulation: "411.3.2, Sections 432, 433, 434",
        critical: true,
        applicableTo: ['domestic', 'commercial', 'industrial']
      },
      {
        itemNumber: "3.6",
        description: "Presence and correct operation of RCDs (30mA for sockets ≤32A)",
        regulation: "411.3.3, 415.1.1",
        critical: true,
        applicableTo: ['domestic', 'commercial', 'industrial']
      },
      {
        itemNumber: "3.7",
        description: "Presence of SPD (required from 2019 for new installations)",
        regulation: "534.4.4.1",
        critical: false,
        applicableTo: ['domestic', 'commercial', 'industrial']
      }
    ]
  },
  {
    category: "4.0 Circuits (Distribution and Final)",
    regulation: "Chap 52",
    items: [
      {
        itemNumber: "4.1",
        description: "Identification of conductors (colour coding correct)",
        regulation: "514.3.1, Table 51",
        critical: true,
        applicableTo: ['domestic', 'commercial', 'industrial']
      },
      {
        itemNumber: "4.2",
        description: "Cables correctly supported, protected against abrasion",
        regulation: "522.8.5",
        critical: true,
        applicableTo: ['domestic', 'commercial', 'industrial']
      },
      {
        itemNumber: "4.3",
        description: "Presence and correct connection of protective conductors (CPC)",
        regulation: "411.3.1.1, 543.1",
        critical: true,
        applicableTo: ['domestic', 'commercial', 'industrial']
      },
      {
        itemNumber: "4.4",
        description: "Cables concealed in walls protected by RCD (if <50mm depth or metal-clad walls)",
        regulation: "522.6.202, 522.6.203",
        critical: true,
        applicableTo: ['domestic', 'commercial']
      },
      {
        itemNumber: "4.5",
        description: "Fire barriers present where cables penetrate fire-rated structures",
        regulation: "Section 527",
        critical: true,
        applicableTo: ['domestic', 'commercial', 'industrial']
      }
    ]
  },
  {
    category: "5.0 Special Locations (if applicable)",
    regulation: "Part 7",
    items: [
      {
        itemNumber: "5.1",
        description: "Bathrooms - All circuits protected by 30mA RCD (701.411.3.3)",
        regulation: "701.411.3.3",
        critical: true,
        applicableTo: ['domestic', 'commercial']
      },
      {
        itemNumber: "5.2",
        description: "Bathrooms - Supplementary bonding present (if required 701.415.2)",
        regulation: "701.415.2",
        critical: true,
        applicableTo: ['domestic', 'commercial']
      },
      {
        itemNumber: "5.3",
        description: "Swimming pools - Zone requirements met (Section 702)",
        regulation: "Section 702",
        critical: true,
        applicableTo: ['commercial', 'special-locations']
      },
      {
        itemNumber: "5.4",
        description: "Agricultural - Supplementary bonding for livestock (Section 705)",
        regulation: "Section 705",
        critical: true,
        applicableTo: ['special-locations']
      }
    ]
  }
];

// Test Sequence - Regulation 643
export const testSequence: TestRequirement[] = [
  {
    testName: "1. Continuity of protective conductors",
    regulation: "643.2",
    sequence: 1,
    testMethod: "Low resistance ohmmeter (R1 + R2 method OR direct CPC test)",
    acceptanceCriteria: "Reading consistent with cable length and size. Max values in Table 54.7",
    recordOn: "Schedule of Test Results",
    notes: [
      "Test BEFORE energizing installation",
      "Includes main/supplementary bonding conductors",
      "Ring final circuit continuity test included"
    ]
  },
  {
    testName: "2. Continuity of ring final circuit conductors",
    regulation: "643.2.2",
    sequence: 2,
    testMethod: "End-to-end test then cross-connect test at each socket",
    acceptanceCriteria: "R1+R2 readings at each socket within ±0.05Ω of average value",
    recordOn: "Schedule of Test Results",
    notes: [
      "Tests line, neutral AND CPC continuity",
      "Identifies breaks, transpositions, interconnections"
    ]
  },
  {
    testName: "3. Insulation resistance",
    regulation: "643.3",
    sequence: 3,
    testMethod: "500V DC for LV installations (≥1MΩ required), 250V DC for SELV/PELV (≥0.5MΩ)",
    acceptanceCriteria: "See Table 64: ≥1.0MΩ for SELV/PELV, ≥1.0MΩ for LV (≥2MΩ typical good installation)",
    recordOn: "Schedule of Test Results",
    notes: [
      "Test between live conductors and earth",
      "Test between live conductors",
      "Disconnect sensitive equipment",
      "Minimum values in Table 64"
    ]
  },
  {
    testName: "4. Protection by SELV, PELV or electrical separation",
    regulation: "643.4",
    sequence: 4,
    testMethod: "Insulation resistance test between circuits at 500V DC (≥5MΩ)",
    acceptanceCriteria: "≥5MΩ between separated circuits",
    recordOn: "Schedule of Test Results (if applicable)",
    notes: [
      "Only if SELV/PELV/electrical separation used",
      "Confirms separation from other circuits"
    ]
  },
  {
    testName: "5. Insulation resistance of floors and walls (if applicable)",
    regulation: "643.5",
    sequence: 5,
    testMethod: "500V DC between floor/wall and earth (for non-conducting locations Reg 418.1)",
    acceptanceCriteria: "≥50kΩ (at least 3 points per room)",
    recordOn: "Schedule of Test Results (if applicable)",
    notes: [
      "Only for non-conducting locations (Reg 418.1) - RARE",
      "Not applicable to most domestic/commercial"
    ]
  },
  {
    testName: "6. Polarity",
    regulation: "643.6",
    sequence: 6,
    testMethod: "Visual inspection + continuity test OR live polarity test",
    acceptanceCriteria: "All single-pole devices in line conductor only. No reversed polarity",
    recordOn: "Schedule of Test Results",
    notes: [
      "Critical safety test",
      "Protective devices MUST be in line conductor",
      "Check at socket-outlets, switches, lampholders"
    ]
  },
  {
    testName: "7. Earth fault loop impedance (Zs)",
    regulation: "643.7.1",
    sequence: 7,
    testMethod: "Earth fault loop impedance tester (live test) OR calculated from Ze + (R1+R2)",
    acceptanceCriteria: "Zs ≤ Max values in Tables 41.2, 41.3, 41.4, 41.6 (applying 0.8 factor to measured)",
    recordOn: "Schedule of Test Results",
    notes: [
      "Test at origin (Ze) and furthest point of each circuit",
      "Apply 0.8 correction factor to measured values (temperature)",
      "Critical for ADS compliance (Reg 411.3.2)"
    ]
  },
  {
    testName: "8. Additional protection (RCD test)",
    regulation: "643.8",
    sequence: 8,
    testMethod: "RCD tester at ×1, ×5 rated current (×0.5 for Type A)",
    acceptanceCriteria: "Trips ≤300ms at ×1 IΔn, ≤40ms at ×5 IΔn. Integral test button operates correctly",
    recordOn: "Schedule of Test Results",
    notes: [
      "30mA RCDs required for socket-outlets ≤32A (Reg 411.3.3)",
      "Test at furthest point of circuit",
      "Press integral test button (functional test)"
    ]
  },
  {
    testName: "9. Prospective fault current (Ipf)",
    regulation: "643.7.3.201",
    sequence: 9,
    testMethod: "Prospective fault current tester OR calculated OR enquiry from DNO",
    acceptanceCriteria: "Protective devices have adequate breaking capacity (≥Ipf)",
    recordOn: "Schedule of Test Results",
    notes: [
      "Record highest value (PFC or PEFC)",
      "Typically 1-6kA domestic, up to 16kA commercial",
      "Protective device breaking capacity must exceed Ipf (Reg 434.5.2)"
    ]
  },
  {
    testName: "10. Functional testing",
    regulation: "643.10",
    sequence: 10,
    testMethod: "Manual operation of switches, RCDs, AFDDs, SPDs",
    acceptanceCriteria: "All devices operate correctly as designed",
    recordOn: "Schedule of Inspections (item 7.11-7.13)",
    notes: [
      "Operate main switch",
      "Operate all circuit breakers",
      "Test RCD integral buttons",
      "Check SPD status indicators"
    ]
  }
];

// Utility Functions
export function getCertificateRequirements(workType: string): CertificationRequirement | null {
  const workTypeMap: Record<string, CertificationRequirement> = {
    'new-installation': electricalInstallationCertificate,
    'new-circuit': electricalInstallationCertificate,
    'consumer-unit-replacement': electricalInstallationCertificate,
    'minor-works': minorWorksCertificate,
    'periodic-inspection': conditionReport
  };
  
  return workTypeMap[workType.toLowerCase()] || null;
}

export function getInspectionItemsByCategory(category: string): InspectionItem[] {
  const categoryData = scheduleOfInspections.find(cat => 
    cat.category.toLowerCase().includes(category.toLowerCase())
  );
  
  return categoryData?.items || [];
}

export function getCriticalInspectionItems(): InspectionItem[] {
  return scheduleOfInspections.flatMap(cat => 
    cat.items.filter(item => item.critical)
  );
}

export function getTestBySequence(sequence: number): TestRequirement | null {
  return testSequence.find(test => test.sequence === sequence) || null;
}

export function validateEICRObservation(code: string): ObservationCode | null {
  return eicrObservationCodes.find(obs => obs.code === code) || null;
}
