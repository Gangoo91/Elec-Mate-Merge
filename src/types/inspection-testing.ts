
export type TestType = 
  | 'continuity'
  | 'insulation-resistance'
  | 'polarity'
  | 'earth-fault-loop'
  | 'rcd-test'
  | 'functional-test'
  | 'visual-inspection'
  | 'all-tests'; // New type for comprehensive testing

export type TestStatus = 'pending' | 'in-progress' | 'completed' | 'failed' | 'skipped';

export type ValidationResult = {
  isValid: boolean;
  message: string;
  severity: 'info' | 'warning' | 'error';
};

export interface TestStep {
  id: string;
  title: string;
  description: string;
  instructions: string[];
  expectedResult?: string;
  safetyNotes?: string[];
  tools?: string[];
  isRequired: boolean;
  estimatedTime?: number; // in minutes
}

export interface TestFlow {
  id: string;
  name: string;
  type: TestType;
  description: string;
  steps: TestStep[];
  prerequisites?: string[];
  regulatoryStandards?: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  isComprehensive?: boolean; // New field for all-tests mode
}

export interface TestResult {
  stepId: string;
  value?: number;
  unit?: string;
  status: TestStatus;
  notes?: string;
  timestamp: Date;
  isWithinLimits?: boolean;
  photos?: string[];
  testType?: TestType; // New field to track which test type this result belongs to
}

export interface TestSession {
  id: string;
  flowId: string;
  installationDetails: {
    location: string;
    circuitDescription: string;
    voltage: number;
    current: number;
  };
  currentStepIndex: number;
  results: TestResult[];
  startTime: Date;
  endTime?: Date;
  status: TestStatus;
  technician: {
    name: string;
    certification?: string;
  };
  isComprehensive?: boolean; // New field to track if this is an all-tests session
}

export interface TestReport {
  sessionId: string;
  testFlow: TestFlow;
  session: TestSession;
  summary: {
    totalTests: number;
    passedTests: number;
    failedTests: number;
    overallStatus: 'pass' | 'fail' | 'incomplete';
  };
  generatedAt: Date;
  recommendations?: string[];
}

// New interface for comprehensive test results grouping
export interface ComprehensiveTestResults {
  continuity: TestResult[];
  insulationResistance: TestResult[];
  polarity: TestResult[];
  earthFaultLoop: TestResult[];
  rcdTest: TestResult[];
  functionalTest: TestResult[];
  visualInspection: TestResult[];
}
