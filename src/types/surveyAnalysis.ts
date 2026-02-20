export interface SurveyAnalysisResult {
  materials_list: MaterialItem[];
  regulatory_flags: RegulatoryFlag[];
  cable_sizing: CableSizing[];
  circuit_recommendations: CircuitRecommendation[];
  labour_estimate: LabourEstimate;
  cost_summary: CostSummary;
  issues: SurveyIssue[];
}

export interface MaterialItem {
  description: string;
  quantity: number;
  unit: string;
  est_price_gbp: number;
  supplier?: string;
}

export interface RegulatoryFlag {
  regulation: string;
  description: string;
  severity: 'info' | 'warning' | 'critical';
  room?: string;
}

export interface CableSizing {
  circuit: string;
  cable_type: string;
  csa_mm2: string;
  ref_method: string;
}

export interface CircuitRecommendation {
  room: string;
  circuit_type: string;
  rating_a: number;
  protection: string;
}

export interface LabourEstimate {
  total_hours: number;
  breakdown: { task: string; hours: number }[];
}

export interface CostSummary {
  materials_gbp: number;
  labour_gbp: number;
  total_gbp: number;
  confidence: 'low' | 'medium' | 'high';
}

export interface SurveyIssue {
  description: string;
  severity: 'info' | 'warning' | 'critical';
  action: string;
}

export interface SiteSurveyAnalysisJob {
  id: string;
  user_id: string;
  site_visit_id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  current_step: string | null;
  input_data: Record<string, unknown> | null;
  result: SurveyAnalysisResult | null;
  error: string | null;
  created_at: string;
  started_at: string | null;
  completed_at: string | null;
}
