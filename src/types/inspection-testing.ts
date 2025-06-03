
export type TestType = 
  | 'continuity'
  | 'insulation-resistance'
  | 'polarity'
  | 'earth-fault-loop'
  | 'rcd-test'
  | 'functional-test'
  | 'visual-inspection';

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
