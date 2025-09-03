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
}

export interface RAMSReportOptions {
  includeSignatures?: boolean;
  companyName?: string;
  logoUrl?: string;
}