
export interface Question {
  id: string;
  question: string;
  options: string[];
  criticalPath?: boolean;
}

export interface DiagnosticResult {
  faultType: string;
  confidence: number;
  immediateActions: string[];
  safetyWarning?: string;
  nextSteps: string[];
}
