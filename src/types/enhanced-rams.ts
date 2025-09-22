// Enhanced Risk Assessment and Method Statement Types
// Defines the integrated system for tasks, hazards, and linking

export interface Task {
  id: string;
  user_id?: string;
  title: string;
  description?: string;
  category: string;
  estimated_duration?: string;
  risk_level: 'low' | 'medium' | 'high';
  linked_hazards: string[]; // Array of hazard IDs
  linked_method_steps: string[]; // Array of method step IDs
  prerequisites: string[]; // Other task IDs that must be completed first
  responsible_person?: string;
  status: 'pending' | 'in-progress' | 'completed';
  created_at: string;
  updated_at: string;
}

export interface EnhancedHazard {
  id: string;
  user_id?: string;
  hazard_id: string;
  hazard_name: string;
  category: string;
  linked_tasks: string[]; // Tasks that involve this hazard
  linked_risks: string[]; // Risk assessments that address this hazard
  linked_method_statements: string[]; // Method statements that mitigate this hazard
  frequency: number; // How often this hazard is selected (for prioritization)
  last_used: string;
  custom_controls: string[]; // User-added control measures
  is_custom: boolean;
  created_at: string;
  updated_at: string;
}

export interface RAMSMethodLink {
  id: string;
  user_id: string;
  rams_id?: string;
  method_statement_id?: string;
  task_ids: string[];
  hazard_ids: string[];
  link_type: 'primary' | 'secondary' | 'reference';
  created_at: string;
}

export interface DocumentRelationship {
  id: string;
  user_id: string;
  source_type: string;
  source_id: string;
  target_type: string;
  target_id: string;
  relationship_type: string;
  created_at: string;
}

export interface CustomHazard {
  id: string;
  user_id: string;
  name: string;
  category: string;
  description?: string;
  default_controls: string[];
  risk_level?: 'low' | 'medium' | 'high';
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface UsageAnalytics {
  id: string;
  user_id?: string;
  entity_type: string;
  entity_id: string;
  action_type: string;
  context_data: Record<string, any>;
  created_at: string;
}

// Enhanced RAMS Data with linking capabilities
export interface EnhancedRAMSData {
  id?: string;
  projectName: string;
  location: string;
  date: string;
  assessor: string;
  activities: string[];
  risks: EnhancedRAMSRisk[];
  linked_tasks: string[];
  linked_method_statements: string[];
  created_at?: string;
  updated_at?: string;
}

export interface EnhancedRAMSRisk {
  id: string;
  hazard: string;
  risk: string;
  likelihood: number;
  severity: number;
  riskRating: number;
  controls: string;
  residualRisk: number;
  furtherAction?: string;
  responsible?: string;
  actionBy?: string;
  done?: boolean;
  linked_tasks: string[];
  linked_hazards: string[];
}

// Task management interfaces
export interface TaskTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  estimated_duration: string;
  risk_level: 'low' | 'medium' | 'high';
  common_hazards: string[];
  required_skills: string[];
  default_controls: string[];
}

export interface TaskDependency {
  task_id: string;
  depends_on: string;
  dependency_type: 'blocks' | 'requires' | 'suggests';
}

// Hazard database interfaces
export interface HazardDatabase {
  categories: HazardCategoryEnhanced[];
  custom_hazards: CustomHazard[];
  recent_hazards: EnhancedHazard[];
  suggested_hazards: EnhancedHazard[];
}

export interface HazardCategoryEnhanced {
  id: string;
  name: string;
  icon: string;
  color: string;
  hazards: EnhancedHazard[];
  usage_frequency: number;
  last_updated: string;
}

// Linking system interfaces
export interface LinkingSuggestion {
  type: 'hazard' | 'task' | 'control';
  id: string;
  name: string;
  confidence: number;
  reason: string;
}

export interface ValidationResult {
  is_valid: boolean;
  warnings: string[];
  errors: string[];
  suggestions: LinkingSuggestion[];
}

// Search and filtering interfaces
export interface SearchFilters {
  categories: string[];
  risk_levels: string[];
  status: string[];
  date_range: {
    start: string;
    end: string;
  };
  keywords: string;
}

export interface SearchResult {
  type: 'task' | 'hazard' | 'rams' | 'method_statement';
  id: string;
  title: string;
  description: string;
  category: string;
  relevance_score: number;
}

// Integration workflow interfaces
export interface WorkflowStep {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'skipped';
  required_data: string[];
  outputs: string[];
  validation_rules: string[];
}

export interface IntegratedWorkflow {
  id: string;
  name: string;
  description: string;
  steps: WorkflowStep[];
  current_step: number;
  progress: number;
  created_at: string;
  updated_at: string;
}

// No duplicate exports needed