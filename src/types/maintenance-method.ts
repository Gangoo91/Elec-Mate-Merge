// Maintenance Method Types - For Maintenance Specialist Agent

export interface SafetyNote {
  note: string;
  regulation?: string;
  severity?: 'info' | 'warning' | 'critical';
}

export interface MaintenanceStep {
  stepNumber: number;
  title: string;
  content: string;
  safety?: (string | SafetyNote)[];
  toolsRequired?: string[];
  materialsNeeded?: string[];
  estimatedDuration?: string;
  riskLevel?: 'low' | 'medium' | 'high';
  qualifications?: string[];
  inspectionCheckpoints?: string[];
  linkedHazards?: string[];
  bsReferences?: string[];
  observations?: string[];
  defectCodes?: string[];
}

export interface MaintenanceMethodSummary {
  totalSteps: number;
  estimatedDuration: string;
  requiredQualifications: string[];
  toolsRequired: string[];
  materialsRequired?: string[];
  overallRiskLevel: 'low' | 'medium' | 'high';
  criticalSafetyNotes?: string[];
}

export interface EICRObservations {
  c1Dangerous?: string[];
  c2UrgentRemedial?: string[];
  c3Improvement?: string[];
  fir?: string[];
}

export interface MaintenanceExecutiveSummary {
  equipmentType: string;
  estimatedAge?: string;
  maintenanceType: 'Periodic Inspection' | 'Preventive Maintenance' | 'Condition-Based Maintenance';
  recommendedFrequency: string;
  overallCondition: string;
  criticalFindings?: string[];
}

export interface MaintenanceMethodData {
  maintenanceGuide: string;
  executiveSummary: MaintenanceExecutiveSummary;
  steps: MaintenanceStep[];
  summary: MaintenanceMethodSummary;
  recommendations?: string[];
  eicrObservations?: EICRObservations;
  metadata?: {
    maintenanceType: 'periodic' | 'preventive' | 'condition-based';
    generatedAt: string;
    citations?: any[];
  };
}

export interface MaintenanceEquipmentDetails {
  equipmentType: string;
  location: string;
  ageYears?: number;
  lastInspectionDate?: string;
  knownIssues?: string;
  installationType: 'domestic' | 'commercial' | 'industrial';
  additionalNotes?: string;
}

export interface MaintenanceSignatures {
  inspectedBy: {
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
