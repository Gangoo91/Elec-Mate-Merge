export interface RAMSData {
  projectName: string;
  location: string;
  date: string;
  assessor: string;
  activities: string[];
  risks: RAMSRisk[];
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