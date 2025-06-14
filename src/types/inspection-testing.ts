
export interface TestStep {
  id: string;
  title: string;
  description: string;
  instructions: string[];
  safetyWarnings?: string[];
  safetyNotes?: string[];
  requiredEquipment?: string[];
  tools?: string[];
  acceptableLimits?: {
    min?: number;
    max?: number;
    unit?: string;
  };
  estimatedTime?: string;
  category: string;
  expectedResult?: string;
  order?: string; // Keep as string to match existing data files
}

export interface TestResult {
  stepId: string;
  value?: number;
  unit?: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed' | 'skipped';
  notes?: string;
  timestamp: Date;
  isWithinLimits?: boolean;
}

export interface TestSession {
  id: string;
  flowId?: string;
  startTime: Date;
  endTime?: Date;
  steps: TestStep[];
  results: TestResult[];
  installationType: string;
  location: string;
  currentStepIndex?: number;
  status?: TestStatus;
  isComprehensive?: boolean;
  installationDetails?: any;
  technician?: any;
}

export type TestStatus = 'pending' | 'in-progress' | 'completed' | 'failed' | 'skipped';

export interface TestFlow {
  id: string;
  title: string;
  description: string;
  type: TestType;
  steps: TestStep[];
  estimatedDuration: string;
  isComprehensive?: boolean;
  name?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  prerequisites?: string[];
  regulatoryStandards?: string[];
  safetyRequirements?: string[];
}

export type TestType = 'eicr' | 'eic' | 'minor-works' | 'pat' | 'comprehensive' | 'safe-isolation' | 'continuity' | 'insulation-resistance' | 'earth-fault-loop' | 'rcd-test' | 'polarity' | 'all-tests';

export interface ValidationResult {
  isValid: boolean;
  message: string;
  severity: 'info' | 'warning' | 'error';
  code?: string;
}

export interface ComprehensiveTestResults {
  sessionId: string;
  testType: TestType;
  overallResult: 'pass' | 'fail' | 'incomplete';
  results: TestResult[];
  faults: any[];
  recommendations: string[];
  generatedAt: Date;
  visualInspection?: TestResult[];
  continuity?: TestResult[];
  insulationResistance?: TestResult[];
  polarity?: TestResult[];
  earthFaultLoop?: TestResult[];
  rcdTest?: TestResult[];
  functionalTest?: TestResult[];
}
