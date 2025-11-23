/**
 * Type Definitions for Design Agent V3
 * All interfaces for form inputs, normalized data, RAG, AI, validation
 */

// ========================================
// FORM INPUT TYPES (Raw from Frontend)
// ========================================

export interface SupplyInput {
  voltage?: number;
  phases?: string;
  ze?: number;
  earthingSystem?: string;
  earthing?: string;
  installationType?: string;
}

export interface CircuitInput {
  name: string;
  loadType: string;
  loadPower: number;
  cableLength: number;
  phases?: string;
  specialLocation?: string;
  installMethod?: string;
  protectionType?: string;
  bathroomZone?: string | null;
  outdoorInstall?: string | null;
  calculatedIb?: number | null;
  suggestedMCB?: number | null;
  calculatedDiversity?: number | null;
  estimatedCableSize?: number | null;
}

// ========================================
// NORMALIZED TYPES (After Form Normalization)
// ========================================

export interface NormalizedSupply {
  voltage: number;
  phases: string;
  ze: number;
  earthing: string;
  installationType: string;
}

export interface NormalizedCircuit {
  name: string;
  loadType: string;
  loadPower: number;
  cableLength: number;
  phases: string;
  specialLocation: string;
  installMethod: string;
  protectionType: string;
  bathroomZone: string | null;
  outdoorInstall: string | null;
  calculatedIb: number | null;
  suggestedMCB: number | null;
  calculatedDiversity: number | null;
  estimatedCableSize: number | null;
}

export interface NormalizedInputs {
  supply: NormalizedSupply;
  circuits: NormalizedCircuit[];
}

// ========================================
// RAG TYPES (Knowledge Base Search Results)
// ========================================

export interface RegulationResult {
  regulation_number: string;
  content: string;
  similarity?: number;
  weightedScore?: number;
}

export interface DesignPatternResult {
  topic: string;
  content: string;
  source: string;
  similarity?: number;
  weightedScore?: number;
}

export interface PracticalGuideResult {
  primary_topic: string;
  content?: string;
  keywords?: string[];
  equipment_category?: string;
  tools_required?: string[];
  bs7671_regulations?: string[];
  similarity?: number;
  weightedScore?: number;
}

export interface DesignKnowledgeResult {
  id: string;
  design_knowledge_id: string;
  facet_type: string;
  primary_topic: string;
  keywords: string[];
  design_category: string;
  design_subcategory?: string;
  content: string;
  formulas?: string[];
  worked_examples?: any[];
  calculation_steps?: string[];
  bs7671_regulations?: string[];
  table_refs?: string[];
  common_mistakes?: string[];
  typical_values?: any;
  applies_to?: string[];
  similarity?: number;
  weightedScore?: number;
}

export interface RAGContext {
  regulations: RegulationResult[];
  designKnowledge: DesignKnowledgeResult[];
  // practicalGuides removed - handled by Design Installation Agent
  totalResults: number;
  searchTime: number;
}

// ========================================
// AI DESIGN TYPES (OpenAI Tool Call Output)
// ========================================

export interface ProtectionDevice {
  type: 'MCB' | 'RCBO';
  rating: number;
  curve: 'B' | 'C' | 'D';
  kaRating: number;
}

export interface VoltageDropCalculation {
  volts: number;
  percent: number;
  limit: number;
  compliant: boolean;
}

export interface CircuitCalculations {
  Ib: number;
  In: number;
  Iz: number;
  voltageDrop: VoltageDropCalculation;
  zs: number;
  maxZs: number;
}

export interface CircuitJustifications {
  cableSize: string;
  protection: string;
  rcd?: string;
  corrections?: string; // PHASE 2: Track what was corrected
}

// LEGACY - Replaced with installationNotes string in DesignedCircuit
// Kept for backwards compatibility with existing data
export interface InstallationGuidance {
  cableRouting: string;
  terminationAdvice: string;
  testingRequirements: string;
  safetyNotes: string[];
}

// PHASE 4: Design Reasoning
export interface DesignReasoning {
  voltageContext: string;
  cableSelectionLogic: string;
  protectionLogic: string;
  complianceChecks: string;
  correctionsApplied?: string;
}

// PHASE 5: Structured Output
export interface AtAGlanceSummary {
  loadKw: number;
  loadIb: string;
  cable: string;
  protectiveDevice: string;
  voltageDrop: string;
  zs: string;
  complianceTick: boolean;
  notes: string;
}

export interface DesignSections {
  circuitSummary: string;
  loadDetails: string;
  cableSelectionBreakdown: string;
  protectiveDeviceSelection: string;
  complianceConfirmation: string;
  designJustification: string;
  installationGuidance: string;
  safetyNotes: string;
  testingCommissioningGuidance: string;
}

export interface StructuredOutput {
  atAGlanceSummary: AtAGlanceSummary;
  sections: DesignSections;
}

export interface ExpectedTestValues {
  r1r2: {
    at20C: number;
    at70C: number;
    value: string;
    regulation: string;
  };
  zs: {
    expected: number;
    maxPermitted: number;
    marginPercent: number;
    compliant: boolean;
    regulation: string;
  };
  insulationResistance: {
    testVoltage: string;
    minResistance: string;
    regulation: string;
  };
  rcd?: {
    ratingmA: number;
    maxTripTimeMs: number;
    testCurrentMultiple: number;
    regulation: string;
  };
}

export interface DesignedCircuit {
  name: string;
  loadType: string;
  specialLocation: string;
  cableSize: number;
  cpcSize: number;
  protectionDevice: ProtectionDevice;
  calculations: CircuitCalculations;
  justifications: CircuitJustifications;
  // installationNotes and installationGuidance removed - handled by Design Installation Agent
  structuredOutput?: StructuredOutput; // PHASE 5
  expectedTests?: ExpectedTestValues; // Expected test values for EIC/testing
}

export interface Design {
  circuits: DesignedCircuit[];
  reasoning?: DesignReasoning; // PHASE 4
}

// ========================================
// VALIDATION TYPES
// ========================================

export interface ValidationIssue {
  circuitIndex: number;
  circuitName: string;
  rule: string;
  regulation: string;
  severity: 'error' | 'warning';
  message: string;
  currentValue: any;
  expectedValue: any;
  fieldAffected: string;
}

export interface ValidationResult {
  isValid: boolean;
  issues: ValidationIssue[];
  autoFixSuggestions: string[];
}

// ========================================
// CACHE TYPES
// ========================================

export interface CachedDesign {
  design: any;
  ageSeconds: number;
  hitCount: number;
}

// ========================================
// FINAL RESPONSE TYPES
// ========================================

export interface DesignResult {
  success: boolean;
  circuits?: DesignedCircuit[];
  supply?: any;
  fromCache: boolean;
  cacheAge?: number;
  cacheHitCount?: number;
  autoFixApplied: boolean;
  processingTime?: number;
  version?: string;
  error?: string;
  requestId?: string;
  // PHASE 4: Reasoning
  reasoning?: DesignReasoning;
  // Validation surfacing
  validationPassed?: boolean;
  validationIssues?: ValidationIssue[];
  autoFixSuggestions?: string[];
}
