// Enhanced Installation Guidance with RAG-driven structured data
export interface EnhancedInstallationGuidance {
  safetyConsiderations: SafetyConsideration[];
  materialsRequired: MaterialRequirement[];
  toolsRequired: ToolRequirement[];
  cableRouting: CableRoutingStep[];
  terminationRequirements: TerminationRequirement[];
  installationProcedure: InstallationStep[];
}

export interface SafetyConsideration {
  consideration: string;
  toolsRequired: string[];
  bsReference?: string;
  priority: 'critical' | 'high' | 'medium';
}

export interface MaterialRequirement {
  item: string;
  specification: string;
  quantity: string;
  source?: string;
}

export interface ToolRequirement {
  tool: string;
  purpose: string;
  category: string;
}

export interface CableRoutingStep {
  step: string;
  cableType?: string;
  method: string;
  bsReference?: string;
  notes?: string;
}

export interface TerminationRequirement {
  location: string;
  procedure: string;
  toolsNeeded: string[];
  torqueSettings?: string;
  bsReference?: string;
}

export interface InstallationStep {
  stepNumber: number;
  title: string;
  description: string;
  toolsForStep: string[];
  materialsForStep?: string[];
  bsReferences?: string[];
}

export interface TestingRequirements {
  intro: string;
  tests: TestRequirement[];
  recordingNote: string;
}

export interface TestRequirement {
  testName: string;
  regulation: string;
  procedure: string;
  expectedReading?: string;
  acceptanceCriteria: string;
  toolsRequired: string[];
}
