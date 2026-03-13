/**
 * Structured Safety Document Types
 * Used by safety_document_templates and user_safety_documents
 */

// --- Field types (top-level document fields like company name, site, date) ---

export interface DocumentField {
  key: string; // e.g. "company_name", "site_address", "date"
  label: string; // e.g. "Company Name"
  type: 'text' | 'date' | 'textarea';
  required: boolean;
  placeholder?: string;
  default_value?: string; // e.g. "today" for auto-fill date
}

// --- Section types ---

export interface HazardRow {
  hazard: string;
  who_at_risk: string;
  likelihood: number; // 1-5
  severity: number; // 1-5
  risk_rating: number; // L x S
  controls: string[];
  residual_likelihood: number;
  residual_severity: number;
  residual_risk: number;
}

export interface HazardTableSection {
  type: 'hazard_table';
  title: string;
  hazards: HazardRow[];
}

export interface StepItem {
  step_number: number;
  title: string;
  description: string;
  safety_notes?: string;
}

export interface StepsSection {
  type: 'steps';
  title: string;
  steps: StepItem[];
}

export interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
}

export interface ChecklistSection {
  type: 'checklist';
  title: string;
  items: ChecklistItem[];
}

export interface TextBlockSection {
  type: 'text_block';
  title: string;
  content: string; // HTML from TipTap
}

export interface BulletListSection {
  type: 'bullet_list';
  title: string;
  items: string[];
}

export interface PPEItem {
  name: string;
  required: boolean;
  specification?: string;
}

export interface PPEGridSection {
  type: 'ppe_grid';
  title: string;
  items: PPEItem[];
}

export interface SignatureEntry {
  role: string;
  name: string;
  date: string;
  signature?: string; // base64 data URL from SignaturePad
}

export interface SignatureBlockSection {
  type: 'signature_block';
  title: string;
  entries: SignatureEntry[];
}

export interface ReferenceItem {
  code: string; // e.g. "BS 7671"
  description?: string;
}

export interface ReferencesSection {
  type: 'references';
  title: string;
  items: ReferenceItem[];
}

export interface KeyValuePair {
  label: string;
  value: string;
}

export interface KeyValueSection {
  type: 'key_value';
  title: string;
  pairs: KeyValuePair[];
}

// --- Union of all section types ---

export type DocumentSection =
  | HazardTableSection
  | StepsSection
  | ChecklistSection
  | TextBlockSection
  | BulletListSection
  | PPEGridSection
  | SignatureBlockSection
  | ReferencesSection
  | KeyValueSection;

// --- Root document schema ---

export type SafetyDocumentType =
  | 'risk_assessment'
  | 'method_statement'
  | 'safe_system'
  | 'checklist';

export interface StructuredSafetyDocument {
  version: 1;
  document_type: SafetyDocumentType;
  fields: DocumentField[];
  sections: DocumentSection[];
}
