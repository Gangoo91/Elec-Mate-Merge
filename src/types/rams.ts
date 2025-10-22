export interface PPEItem {
  id: string;
  itemNumber: number;
  ppeType: string;
  standard: string;
  mandatory: boolean;
  purpose: string;
}

export interface RAMSData {
  projectName: string;
  location: string;
  date: string;
  assessor: string;
  activities: string[];
  risks: RAMSRisk[];
  hazards?: Array<{
    id: string;
    hazard: string;
    likelihood: number;
    severity: number;
    riskScore: number;
    riskLevel: string;
    regulation?: string;
  }>;
  requiredPPE?: string[]; // Keep for backward compatibility
  ppeDetails?: PPEItem[]; // NEW: Enhanced PPE structure
  emergencyProcedures?: string[];
  contractor?: string;
  supervisor?: string;
  siteManagerName?: string;
  siteManagerPhone?: string;
  firstAiderName?: string;
  firstAiderPhone?: string;
  safetyOfficerName?: string;
  safetyOfficerPhone?: string;
  assemblyPoint?: string;
  complianceRegulations?: string[];
  complianceWarnings?: string[];
}

export interface RAMSRisk {
  id: string;
  hazard: string;
  risk: string;
  likelihood: number;
  severity: number;
  riskRating: number;
  controls: string;
  residualRisk: number;
  // HSE-style additional fields
  furtherAction?: string;
  responsible?: string;
  actionBy?: string;
  done?: boolean;
}

export interface RAMSReportOptions {
  includeSignatures?: boolean;
  companyName?: string;
  logoUrl?: string;
  documentReference?: string;
  reviewDate?: string;
  distribution?: string[];
}