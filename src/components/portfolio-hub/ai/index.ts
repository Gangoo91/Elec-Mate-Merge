// AI Components for Portfolio Hub - Phase 2

// Core AI tagging components
export { AITagSuggestions } from './AITagSuggestions';
export { SmartCaptureFlow } from './SmartCaptureFlow';
export { KSBMappingAssistant } from './KSBMappingAssistant';

// Re-export hook types for convenience
export type {
  AIAnalysisResult,
  KSBSuggestion,
  TagSuggestion,
  AssessmentCriteria,
  LearningOutcome,
  QualityAssessment,
  DetectedContent,
} from '@/hooks/portfolio/useAIEvidenceTagger';
