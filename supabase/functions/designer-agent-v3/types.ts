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

export interface RAGContext {
  regulations: RegulationResult[];
  designPatterns: DesignPatternResult[];
  practicalGuides: PracticalGuideResult[];
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
}

export interface DesignedCircuit {
  name: string;
  loadType?: string;
  specialLocation?: string;
  cableSize: number;
  cpcSize: number;
  protectionDevice: ProtectionDevice;
  calculations: CircuitCalculations;
  justifications: CircuitJustifications;
}

export interface Design {
  circuits: DesignedCircuit[];
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
  fromCache: boolean;
  cacheAge?: number;
  cacheHitCount?: number;
  autoFixApplied: boolean;
  processingTime?: number;
  version?: string;
  error?: string;
  requestId?: string;
}
