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