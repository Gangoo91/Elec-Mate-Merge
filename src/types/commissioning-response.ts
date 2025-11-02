export interface VisualInspectionCheckpoint {
  item: string;
  requirement: string;
  reference?: string;
}

export interface TestProcedure {
  testName: string;
  regulation: string;
  instrumentSetup: string;
  procedure: string[];
  acceptanceCriteria: string;
  expectedResult?: string;
  calculation?: string;
  troubleshooting?: string[];
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
  // Additional fields that may come from agent response
  circuits?: any[];
  overallResult?: string;
  notes?: string;
}
