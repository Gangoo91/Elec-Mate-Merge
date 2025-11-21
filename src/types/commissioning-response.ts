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
  components?: Record<string, string>;
  expectedResult?: string;
  limitCheck?: string;
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
  prerequisiteTests?: string[];
  conflictingTests?: string[];
  testSequence?: number;
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

export interface DiagnosticStep {
  stepNumber: number;
  ragStatus: 'RED' | 'AMBER' | 'GREEN';
  stepTitle: string;
  action: string;
  whatToTest: string;
  whatToMeasure?: string;
  expectedReading?: string;
  acceptableRange?: string;
  instrumentSetup?: string;
  safetyWarnings?: string[];
  ifFailed?: string;
  regulation?: string;
}

export interface CorrectiveAction {
  forSymptom: string;
  action: string;
  tools?: string[];
  estimatedTime?: string;
  verificationTest?: string;
}

export interface LockoutTagout {
  required: boolean;
  procedure?: string[];
  isolationPoints?: string[];
}

export interface AdditionalContext {
  commonMistakes?: string[];
  proTips?: string[];
  regulations?: string[];
}

export interface FaultDiagnosis {
  faultSummary: {
    reportedSymptom: string;
    likelyRootCauses: string[];
    safetyRisk: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
    immediateAction?: string;
  };
  diagnosticWorkflow: DiagnosticStep[];
  correctiveActions: CorrectiveAction[];
  lockoutTagout?: LockoutTagout;
  additionalContext?: AdditionalContext;
}

export interface CommissioningResponse {
  success: boolean;
  mode?: 'procedure' | 'conversational' | 'fault-diagnosis' | 'eicr-photo-analysis';
  queryType?: 'troubleshooting' | 'question' | 'photo-analysis';
  response?: string;
  structuredData?: {
    testingProcedure?: TestingProcedure;
    certification?: CertificationRequirements;
  };
  structuredDiagnosis?: FaultDiagnosis;
  eicrDefects?: any[]; // EICR photo analysis defects
  citations?: any[];
  enrichment?: any;
  rendering?: any;
  suggestedNextAgents?: any[];
  metadata?: {
    classification?: {
      mode: string;
      confidence: number;
      reasoning?: string;
    };
    ragQualityMetrics?: {
      gn3ProceduresFound: number;
      regulationsFound: number;
      totalSources: number;
    };
  };
  circuits?: any[];
  overallResult?: string;
  notes?: string;
}
