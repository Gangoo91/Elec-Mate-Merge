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