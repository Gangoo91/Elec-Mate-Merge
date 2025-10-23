export interface MethodStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  safetyRequirements: string[];
  equipmentNeeded: string[];
  qualifications: string[];
  estimatedDuration: string;
  riskLevel: 'low' | 'medium' | 'high';
  dependencies?: string[]; // IDs of prerequisite steps
  isCompleted?: boolean;
  notes?: string;
  linkedHazards?: string[]; // IDs of linked hazards
}

export interface MethodStatementRiskAssessment {
  hazards: Array<{
    hazard: string;
    linkedToStep: number; // 0 = general, 1+ = specific step
    likelihood: number;
    likelihoodReason?: string;
    severity: number;
    severityReason?: string;
    riskScore: number;
    riskLevel: string;
    regulation?: string;
  }>;
  controls: Array<{
    hazard: string;
    linkedToStep: number;
    controlMeasure: string;
    residualLikelihood?: number;
    residualSeverity?: number;
    residualRisk: number;
    residualRiskLevel: string;
    regulation?: string;
    practicalImplementation?: string;
  }>;
  riskMatrix?: {
    beforeControls: Record<string, any>;
    afterControls: Record<string, any>;
  };
}

export interface MethodStatementPPE {
  itemNumber: number;
  ppeType: string;
  standard: string; // e.g., "BS EN 397"
  mandatory: boolean; // true if from RAG knowledge base
  purpose: string;
}

export interface MethodStatementSiteLogistics {
  vehicleAccess?: string;
  parking?: string;
  materialStorage?: string;
  wasteManagement?: string;
  welfareFacilities?: string;
  siteRestrictions?: string;
}

export interface MethodStatementCompetency {
  competencyRequirements?: string;
  trainingRequired?: string;
  supervisionLevel?: string;
  additionalCertifications?: string;
}

export interface MethodStatementConditionalProcedures {
  workAtHeight?: {
    required: boolean;
    equipment?: Array<{
      type: string;
      height: string;
      fallProtection: string;
      inspection: string;
    }>;
  };
  servicesUtilities?: {
    required: boolean;
    detectionMethod?: string;
    servicesPresent?: string[];
    catScanner?: string;
    safeDigging?: string;
  };
  hotWorks?: {
    required: boolean;
    permitRequired?: string;
    fireWatchDuration?: string;
    combustiblesRemoved?: string;
    fireExtinguishers?: string;
    ventilation?: string;
  };
  noiseDust?: {
    required: boolean;
    noiseLevels?: string;
    hearingProtection?: string;
    dustSuppression?: string;
    rpeRequired?: string;
    hoursRestriction?: string;
  };
  clientLiaison?: {
    required: boolean;
    occupiedPremises?: string;
    accessRestrictions?: string;
    publicAreas?: string;
    dailyBriefings?: string;
    disruptionNotices?: string;
    cleanlinessStandard?: string;
  };
}

export interface MethodStatementScopeOfWork {
  description: string;
  keyDeliverables: string[];
  exclusions?: string;
}

export interface MethodStatementSchedule {
  workingHours?: string;
  teamSize?: string;
  weatherDependency?: string;
  accessRequirements?: string;
}

export interface MethodStatementData {
  id?: string;
  jobTitle: string;
  location: string;
  contractor: string;
  supervisor: string;
  workType: string;
  duration: string;
  teamSize: string;
  description: string;
  overallRiskLevel: 'low' | 'medium' | 'high';
  reviewDate: string;
  approvedBy?: string;
  steps: MethodStep[];
  createdAt?: string;
  updatedAt?: string;
  practicalTips?: string[];
  commonMistakes?: string[];
  toolsRequired?: string[];
  materialsRequired?: string[];
  totalEstimatedTime?: string;
  difficultyLevel?: string;
  complianceRegulations?: string[];
  complianceWarnings?: string[];
  
  // Enhanced AI-generated fields
  riskAssessment?: MethodStatementRiskAssessment;
  ppeDetails?: MethodStatementPPE[];
  siteLogistics?: MethodStatementSiteLogistics;
  competencyMatrix?: MethodStatementCompetency;
  conditionalProcedures?: MethodStatementConditionalProcedures;
  scopeOfWork?: MethodStatementScopeOfWork;
  scheduleDetails?: MethodStatementSchedule;
  
  // RAG citations from both agents
  ragCitations?: Array<{
    source: 'health-safety' | 'installer';
    regulation: string;
    content: string;
    linkedToStep?: number;
  }>;
  
  // Agent metadata
  agentMetadata?: {
    healthSafetyVersion?: string;
    installerVersion?: string;
    generatedAt: string;
    aiModel?: string;
  };
}

export interface MethodTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  workType: string;
  estimatedDuration: string;
  difficultyLevel: 'basic' | 'intermediate' | 'advanced';
  isPopular?: boolean;
  requiredQualifications: string[];
  steps: Omit<MethodStep, 'id' | 'stepNumber' | 'isCompleted'>[];
}

export interface StepTemplate {
  id: string;
  title: string;
  description: string;
  category: string;
  safetyRequirements: string[];
  equipmentNeeded: string[];
  qualifications: string[];
  estimatedDuration: string;
  riskLevel: 'low' | 'medium' | 'high';
  commonlyUsedWith: string[]; // IDs of other step templates
}

export type WizardStep = 'template' | 'details' | 'steps' | 'hazards' | 'review';