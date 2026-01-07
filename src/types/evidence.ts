/**
 * Evidence Types
 *
 * Type definitions for evidence requirements and tracking
 * in electrical qualifications.
 */

// Evidence type codes
export type EvidenceTypeCode =
  | 'photo'
  | 'document'
  | 'certificate'
  | 'test_result'
  | 'witness'
  | 'reflection'
  | 'work_log'
  | 'video'
  | 'drawing'
  | 'calculation';

// Evidence type definition
export interface EvidenceType {
  id: string;
  code: EvidenceTypeCode;
  name: string;
  description: string;
  icon: string;
  color: string;
  allowed_file_types: string[];
  max_file_size_mb: number;
  requires_witness: boolean;
  requires_date: boolean;
  sort_order: number;
  created_at: string;
}

// Evidence requirement for a specific assessment criterion
export interface UnitEvidenceRequirement {
  id: string;
  category_id: string;
  assessment_criterion: string;
  assessment_criterion_text: string | null;
  evidence_type_codes: EvidenceTypeCode[];
  quantity_required: number;
  min_quantity: number;
  guidance: string | null;
  example_description: string | null;
  is_mandatory: boolean;
  created_at: string;
}

// Evidence requirement with resolved types
export interface EvidenceRequirementWithTypes extends UnitEvidenceRequirement {
  evidence_types: EvidenceType[];
}

// User's evidence submission for a requirement
export interface EvidenceSubmission {
  id: string;
  user_id: string;
  requirement_id: string;
  portfolio_item_id?: string;
  evidence_type_code: EvidenceTypeCode;
  file_url: string;
  file_name: string;
  file_type: string;
  file_size: number;
  notes?: string;
  witness_name?: string;
  witness_signature_url?: string;
  date_of_evidence?: string;
  status: 'pending' | 'submitted' | 'verified' | 'rejected';
  verified_by?: string;
  verified_at?: string;
  created_at: string;
  updated_at: string;
}

// Progress tracking for evidence per unit
export interface UnitEvidenceProgress {
  category_id: string;
  category_name: string;
  total_requirements: number;
  met_requirements: number;
  progress_percentage: number;
  requirements: RequirementProgress[];
}

export interface RequirementProgress {
  requirement_id: string;
  assessment_criterion: string;
  evidence_type_codes: EvidenceTypeCode[];
  quantity_required: number;
  quantity_submitted: number;
  quantity_verified: number;
  is_complete: boolean;
  is_mandatory: boolean;
}

// Summary of evidence types needed
export interface EvidenceTypeSummary {
  code: EvidenceTypeCode;
  name: string;
  icon: string;
  color: string;
  required_count: number;
  submitted_count: number;
  verified_count: number;
}

// Evidence type icons mapping (for quick reference)
export const EVIDENCE_TYPE_ICONS: Record<EvidenceTypeCode, string> = {
  photo: 'Camera',
  document: 'FileText',
  certificate: 'Award',
  test_result: 'ClipboardList',
  witness: 'Users',
  reflection: 'BookOpen',
  work_log: 'Calendar',
  video: 'Video',
  drawing: 'PenTool',
  calculation: 'Calculator',
};

// Evidence type colors mapping
export const EVIDENCE_TYPE_COLORS: Record<EvidenceTypeCode, string> = {
  photo: '#3b82f6',
  document: '#6366f1',
  certificate: '#eab308',
  test_result: '#10b981',
  witness: '#8b5cf6',
  reflection: '#f59e0b',
  work_log: '#0ea5e9',
  video: '#ef4444',
  drawing: '#14b8a6',
  calculation: '#ec4899',
};

// Helper to get human-readable evidence type name
export const EVIDENCE_TYPE_NAMES: Record<EvidenceTypeCode, string> = {
  photo: 'Photograph',
  document: 'Document',
  certificate: 'Certificate',
  test_result: 'Test Results',
  witness: 'Witness Statement',
  reflection: 'Reflective Account',
  work_log: 'Work Log',
  video: 'Video',
  drawing: 'Technical Drawing',
  calculation: 'Calculation',
};

// Tutor-assigned custom requirement
export interface TutorPortfolioRequirement {
  id: string;
  tutor_id: string;
  student_id: string;
  category_id: string | null;
  title: string;
  description: string | null;
  evidence_type_codes: EvidenceTypeCode[];
  quantity_required: number;
  guidance: string | null;
  is_mandatory: boolean;
  due_date: string | null;
  status: 'active' | 'completed' | 'cancelled';
  completed_at: string | null;
  created_at: string;
}

// Combined requirement (unit + tutor) for display
export interface CombinedEvidenceRequirement {
  id: string;
  source: 'unit' | 'tutor';
  title: string | null;
  assessment_criterion: string | null;
  assessment_criterion_text: string | null;
  evidence_type_codes: EvidenceTypeCode[];
  evidence_types: EvidenceType[];
  quantity_required: number;
  quantity_uploaded: number;
  is_mandatory: boolean;
  is_complete: boolean;
  guidance: string | null;
  due_date: string | null;
}
