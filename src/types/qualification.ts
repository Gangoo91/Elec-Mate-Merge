export interface Qualification {
  id: string;
  awarding_body: string;
  level: string;
  title: string;
  code: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface QualificationCategory {
  id: string;
  qualification_id: string;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  required_entries: number;
  learning_outcomes: string[];
  assessment_criteria: string[];
  created_at: string;
}

export interface UserQualificationSelection {
  id: string;
  user_id: string;
  qualification_id: string;
  selected_at: string;
  is_active: boolean;
  progress_percentage: number;
  target_completion_date?: string;
  qualification?: Qualification;
}

export interface QualificationTemplate {
  id: string;
  qualification_category_id: string;
  title: string;
  description?: string;
  skills: string[];
  evidence_requirements: string[];
  template_content: any;
  created_at: string;
}

export interface QualificationCompliance {
  id: string;
  user_id: string;
  qualification_id: string;
  category_id: string;
  required_entries: number;
  completed_entries: number;
  compliance_percentage: number;
  last_updated: string;
  created_at: string;
  category?: QualificationCategory;
}

export interface QualificationAwardingBody {
  id: string;
  name: string;
  description: string;
  icon: string;
  qualifications: Qualification[];
}

// KSB (Knowledge, Skills, Behaviours) Types
export type KSBType = 'knowledge' | 'skill' | 'behaviour';

export interface ApprenticeshipKSB {
  id: string;
  qualification_id: string;
  ksb_type: KSBType;
  code: string;
  title: string;
  description?: string;
  assessment_method: string[];
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export type KSBProgressStatus =
  | 'not_started'
  | 'in_progress'
  | 'evidence_submitted'
  | 'verified'
  | 'completed';

export interface UserKSBProgress {
  id: string;
  user_id: string;
  ksb_id: string;
  status: KSBProgressStatus;
  evidence_portfolio_ids: string[];
  notes?: string;
  verified_by?: string;
  verified_at?: string;
  created_at: string;
  updated_at: string;
  ksb?: ApprenticeshipKSB;
}

export interface KSBSummary {
  user_id: string;
  qualification_id: string;
  qualification_title: string;
  ksb_type: KSBType;
  total_ksbs: number;
  completed_ksbs: number;
  verified_ksbs: number;
  in_progress_ksbs: number;
  completion_percentage: number;
}

export interface JourneyProgress {
  user_id: string;
  qualification_id: string;
  qualification_title: string;
  qualification_code: string;
  total_categories: number;
  completed_categories: number;
  overall_progress: number;
  target_completion_date?: string;
  days_remaining?: number;
}