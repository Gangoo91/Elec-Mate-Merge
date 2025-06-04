
export interface TestStep {
  id: string;
  title: string;
  description: string;
  instructions: string[];
  expectedResult: string;
  safetyNotes?: string[];
  tools?: string[];
  isRequired: boolean;
  estimatedTime: number;
}

export type TestType = 
  | 'safe-isolation'
  | 'continuity' 
  | 'insulation-resistance' 
  | 'earth-fault-loop' 
  | 'rcd-test' 
  | 'polarity' 
  | 'visual-inspection'
  | 'functional-testing'
  | 'all-tests';

export type TestDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface TestFlow {
  id: string;
  name: string;
  type: TestType;
  description: string;
  difficulty: TestDifficulty;
  steps: TestStep[];
  prerequisites?: string[];
  regulatoryStandards?: string[];
  isComprehensive?: boolean;
}

export type TestStatus = 'pending' | 'in-progress' | 'completed' | 'failed' | 'skipped';

export interface TestResult {
  stepId: string;
  value?: number;
  unit?: string;
  status: TestStatus;
  timestamp: Date;
  notes?: string;
  isWithinLimits?: boolean;
}

export interface TestSession {
  id: string;
  flowId: string;
  installationDetails: any;
  technician: any;
  currentStepIndex: number;
  results: TestResult[];
  startTime: Date;
  endTime?: Date;
  status: TestStatus;
  isComprehensive?: boolean;
}

// Add missing ValidationResult interface
export interface ValidationResult {
  isValid: boolean;
  message: string;
  severity: 'info' | 'warning' | 'error';
}

// Add missing ComprehensiveTestResults interface
export interface ComprehensiveTestResults {
  continuity: TestResult[];
  insulationResistance: TestResult[];
  polarity: TestResult[];
  earthFaultLoop: TestResult[];
  rcdTest: TestResult[];
  functionalTest: TestResult[];
  visualInspection: TestResult[];
}
