
export interface TestStep {
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
  category: string;
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
  startTime: Date;
  endTime?: Date;
  steps: TestStep[];
  results: TestResult[];
  installationType: string;
  location: string;
}
