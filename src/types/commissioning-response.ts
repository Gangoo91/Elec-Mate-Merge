export interface VisualInspectionCheckpoint {
  item: string;
  requirement: string;
  reference?: string;
}

export interface TestResult {
  calculated?: string;
  measured?: string;
  maximumPermitted?: string;
  result?: string;
  passFail?: string;
  marginOfSafety?: string;
  tolerance?: string;
  calculationMethod?: string;
}

export interface CalculationBreakdown {
  formula?: string;
  Ze?: string;
  R1R2?: string;
  expectedZs?: string;
}

export interface TestProcedure {
  testName: string;
  regulation: string;
  instrumentSetup: string;
  procedure: string[];
  acceptanceCriteria: string;
  expectedResult?: TestResult | string;
  calculation?: CalculationBreakdown | string;
  troubleshooting?: string[];
  commonMistakes?: string[];
  proTips?: string[];
  testDuration?: string;
}

export interface TestingProcedure {
  visualInspection?: {
    checkpoints: VisualInspectionCheckpoint[];
    safetyNotes?: string[];
  };
  deadTests?: TestProcedure[];
  liveTests?: TestProcedure[];
}

export interface CertificationRequirements {
  certificateType: string;
  requiredSchedules: string[];
  requiredData: Array<{
    field: string;
    regulation: string;
    description: string;
  }>;
  nextInspection?: string;
  additionalNotes?: string[];
}

export interface CommissioningResponse {
  success: boolean;
  response?: string;
  structuredData?: {
    testingProcedure?: TestingProcedure;
    certification?: CertificationRequirements;
  };
  citations?: any[];
  enrichment?: any;
  rendering?: any;
  suggestedNextAgents?: any[];
  metadata?: {
    ragQualityMetrics?: {
      gn3ProceduresFound: number;
      regulationsFound: number;
      totalSources: number;
    };
  };
  // Additional fields that may come from agent response
  circuits?: any[];
  overallResult?: string;
  notes?: string;
}
