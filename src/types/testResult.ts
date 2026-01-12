
export interface TestResult {
  id: string;
  
  // Circuit Details (Columns 1-5)
  circuitNumber: string; // Column 1
  circuitDescription: string; // Column 2
  typeOfWiring?: string; // Column 3 - NEW: Type of wiring (A, B, C, D, E, F, G, H, O codes)
  referenceMethod: string; // Column 4: Reference method‡
  pointsServed: string; // Column 5: Number of points served
  
  // Legacy field for backward compatibility
  circuitType: string;
  
  // Conductor Details (Columns 6-7)
  liveSize: string; // Column 6: Live (mm²)
  cpcSize: string; // Column 7: cpc (mm²)
  
  // Overcurrent Protective Device (Columns 8-12)
  bsStandard: string; // Column 8: BS (EN)
  protectiveDeviceType: string; // Column 9: Type
  protectiveDeviceCurve?: string; // Type A, B, C, D, K, Z for MCBs
  protectiveDeviceRating: string; // Column 10: Rating (A)
  protectiveDeviceKaRating: string; // Column 11: Breaking capacity (kA)
  maxZs: string; // Column 12: Maximum permitted Zs (Ω)§
  protectiveDeviceLocation: string; // Legacy field
  
  // Continuity Tests (Column 21)
  r1r2: string; // Column 21: (R₁ + R₂) or R₂
  r2: string; // R₂ only (Ω)
  ringContinuityLive: string; // Legacy ring final tests
  ringContinuityNeutral: string;
  
  // RCD Details (Columns 13-16)
  rcdBsStandard?: string; // Column 13: BS (EN) - RCD
  rcdType?: string; // Column 14: Type - RCD
  rcdRating: string; // Column 15: IΔn (mA)
  rcdRatingA?: string; // Column 16: Rating (A) - RCD
  
  // Ring Final Circuit Tests (Columns 18-20 for detailed ring tests)
  ringR1: string; // Column 18: r₁ (line) (Ω)
  ringRn: string; // Column 19: rₙ (neutral) (Ω)
  ringR2: string; // Column 20: r₂ (cpc) (Ω)
  
  // Insulation Resistance Tests (Columns 22-24)
  insulationTestVoltage: string; // Column 22: Test voltage (V)
  insulationLiveNeutral: string; // Column 23: Live - Live (MΩ)
  insulationLiveEarth: string; // Column 24: Live - Earth (MΩ)
  
  // Consolidated field for backward compatibility
  insulationResistance: string;
  insulationNeutralEarth: string; // Legacy field
  
  // Other Tests (Columns 25-26)
  polarity: string; // Column 25: Polarity#
  zs: string; // Column 26: Zs Maximum measured (Ω)
  
  // RCD Disconnection Test (Column 27)
  rcdOneX: string; // Column 27: Disconnection time (ms)* - Previously: 1×In test
  
  // Test Button Operations (Columns 28-29)
  rcdTestButton: string; // Column 28: Test button operation
  afddTest: string; // Column 29: Manual test button operation [AFDD]
  
  // Deprecated RCD fields (Amendment 3 - only 1x required)
  rcdHalfX?: string;
  rcdFiveX?: string;
  
  // Prospective Fault Current
  pfc: string; // Consolidated kA reading
  
  // Legacy fields for backward compatibility
  pfcLiveNeutral: string;
  pfcLiveEarth: string;
  
  // Functional Testing
  functionalTesting: string;
  
  // Remarks (Column 30)
  notes: string; // Column 30: Remarks
  
  // Track source circuit ID for sync
  sourceCircuitId?: number;

  // Track auto-filled circuits
  autoFilled?: boolean;

  // Board association (for multi-board installations)
  boardId?: string; // References DistributionBoard.id, defaults to MAIN_BOARD_ID
  
  // Three-Phase Circuit Fields (BS 7671:2018+A2:2022)
  phaseType?: '1P' | '3P' | '';
  phaseRotation?: string; // Phase sequence test (L1-L2-L3 clockwise)
  phaseBalanceL1?: string; // Load balance on L1 (Amps)
  phaseBalanceL2?: string; // Load balance on L2 (Amps)
  phaseBalanceL3?: string; // Load balance on L3 (Amps)
  lineToLineVoltage?: string; // L-L voltage (400V nominal)
  
  // Legacy fields for backward compatibility
  circuitDesignation: string;
  type: string;
  cableSize: string;
  protectiveDevice: string;
}
