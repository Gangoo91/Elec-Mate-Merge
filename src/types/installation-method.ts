// Installation Method Types - For Installation Specialist Agent

export interface InstallationStep {
  stepNumber: number;
  title: string;
  content: string;
  safety?: string[];
  toolsRequired?: string[];
  materialsNeeded?: string[];
  estimatedDuration?: string;
  riskLevel?: 'low' | 'medium' | 'high';
  qualifications?: string[];
  linkedHazards?: string[];
  notes?: string;
  assignedPersonnel?: string[];
  bsReferences?: string[];
  inspectionCheckpoints?: string[];
}

export interface InstallationMethodSummary {
  totalSteps: number;
  estimatedDuration: string;
  requiredQualifications: string[];
  toolsRequired: string[];
  materialsRequired: string[];
  overallRiskLevel: 'low' | 'medium' | 'high';
}

export interface InstallationMethodData {
  installationGuide: string;
  steps: InstallationStep[];
  summary: InstallationMethodSummary;
  metadata?: {
    installationType: 'domestic' | 'commercial' | 'industrial';
    generatedAt: string;
    citations?: any[];
  };
}

export interface InstallationProjectDetails {
  projectName: string;
  location: string;
  clientName?: string;
  electricianName?: string;
  installationType: 'domestic' | 'commercial' | 'industrial';
  expectedStartDate?: string;
  additionalNotes?: string;
}

export interface InstallationSignatures {
  completedBy: {
    name: string;
    date: string;
    signatureDataUrl: string;
  };
  verifiedBy: {
    name: string;
    date: string;
    signatureDataUrl: string;
  };
}
