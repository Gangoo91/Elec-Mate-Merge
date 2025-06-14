
export interface CircuitTestStep {
  id: string;
  title: string;
  description: string;
  instructions: string[];
  safetyWarnings?: string[];
  requiredEquipment?: string[];
  acceptableLimits?: {
    min?: number;
    max?: number;
    unit?: string;
  };
  estimatedTime?: string;
  category: 'safe-isolation' | 'continuity' | 'insulation-resistance' | 'earth-fault-loop' | 'rcd-test' | 'polarity' | 'functional-test';
  testType: 'visual' | 'measurement' | 'procedural';
  order: number;
  prerequisites?: string[];
  nextSteps?: string[];
}

export interface CircuitTestResult {
  stepId: string;
  value?: number;
  unit?: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed' | 'skipped';
  notes?: string;
  timestamp: Date;
  isWithinLimits?: boolean;
  circuitRef?: string;
}

export interface CircuitTestSession {
  id: string;
  flowId: string;
  startTime: Date;
  endTime?: Date;
  steps: CircuitTestStep[];
  results: CircuitTestResult[];
  currentStepIndex: number;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  installationDetails: {
    location: string;
    installationType: string;
    description: string;
  };
  technician: {
    name: string;
    qualifications: string;
    company: string;
  };
}

export interface CircuitTestFlow {
  id: string;
  title: string;
  description: string;
  type: 'comprehensive-circuit-testing';
  steps: CircuitTestStep[];
  estimatedDuration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  regulatoryStandards: string[];
  safetyRequirements: string[];
}
