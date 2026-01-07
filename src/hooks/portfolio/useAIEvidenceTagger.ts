import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

/**
 * AI Evidence Tagger Hook
 *
 * Analyzes portfolio evidence using AI to suggest:
 * - KSB (Knowledge, Skills, Behaviours) mappings
 * - Assessment criteria
 * - Tags and categories
 * - Quality feedback
 */

export interface KSBSuggestion {
  code: string;
  category: 'knowledge' | 'skill' | 'behaviour';
  description: string;
  confidence: number;
  reason: string;
}

export interface TagSuggestion {
  tag: string;
  confidence: number;
  category: string;
}

export interface AssessmentCriteria {
  code: string;
  description: string;
  confidence: number;
}

export interface LearningOutcome {
  code: string;
  description: string;
  confidence: number;
}

export interface QualityAssessment {
  score: number;
  feedback: string;
  improvements: string[];
}

export interface DetectedContent {
  description: string;
  electrical_elements: string[];
  work_type: string;
  location_type: string;
}

export interface AIAnalysisResult {
  ksb_suggestions: KSBSuggestion[];
  tag_suggestions: TagSuggestion[];
  assessment_criteria: AssessmentCriteria[];
  learning_outcomes: LearningOutcome[];
  quality_assessment: QualityAssessment;
  detected_content: DetectedContent;
  summary: string;
}

export interface AnalyzeEvidenceParams {
  evidenceUrl: string;
  evidenceType: 'image' | 'document' | 'video';
  title?: string;
  description?: string;
  existingTags?: string[];
}

interface UseAIEvidenceTaggerReturn {
  analyze: (params: AnalyzeEvidenceParams) => Promise<AIAnalysisResult | null>;
  isAnalyzing: boolean;
  result: AIAnalysisResult | null;
  error: string | null;
  clearResult: () => void;
}

export function useAIEvidenceTagger(): UseAIEvidenceTaggerReturn {
  const { toast } = useToast();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AIAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyze = useCallback(async (params: AnalyzeEvidenceParams): Promise<AIAnalysisResult | null> => {
    setIsAnalyzing(true);
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke('analyze-portfolio-evidence', {
        body: {
          evidence_url: params.evidenceUrl,
          evidence_type: params.evidenceType,
          title: params.title,
          description: params.description,
          existing_tags: params.existingTags,
        }
      });

      if (fnError) {
        throw new Error(fnError.message || 'Analysis failed');
      }

      if (!data?.success) {
        throw new Error(data?.error || 'Analysis returned no results');
      }

      const analysisResult = data.analysis as AIAnalysisResult;
      setResult(analysisResult);

      toast({
        title: "AI Analysis Complete",
        description: `Found ${analysisResult.ksb_suggestions.length} KSB mappings and ${analysisResult.tag_suggestions.length} tag suggestions`,
      });

      return analysisResult;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Analysis failed';
      setError(errorMessage);

      toast({
        title: "Analysis Failed",
        description: errorMessage,
        variant: "destructive"
      });

      return null;
    } finally {
      setIsAnalyzing(false);
    }
  }, [toast]);

  const clearResult = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return {
    analyze,
    isAnalyzing,
    result,
    error,
    clearResult,
  };
}

/**
 * Helper to get KSB category color
 */
export function getKSBCategoryColor(category: 'knowledge' | 'skill' | 'behaviour'): string {
  switch (category) {
    case 'knowledge':
      return 'bg-blue-500/20 text-blue-500 border-blue-500/30';
    case 'skill':
      return 'bg-green-500/20 text-green-500 border-green-500/30';
    case 'behaviour':
      return 'bg-purple-500/20 text-purple-500 border-purple-500/30';
    default:
      return 'bg-gray-500/20 text-gray-500 border-gray-500/30';
  }
}

/**
 * Helper to get confidence color
 */
export function getConfidenceColor(confidence: number): string {
  if (confidence >= 80) return 'text-green-500';
  if (confidence >= 60) return 'text-amber-500';
  return 'text-orange-500';
}

/**
 * Helper to get confidence badge variant
 */
export function getConfidenceBadgeClass(confidence: number): string {
  if (confidence >= 80) return 'bg-green-500/20 text-green-500 border-green-500/30';
  if (confidence >= 60) return 'bg-amber-500/20 text-amber-500 border-amber-500/30';
  return 'bg-orange-500/20 text-orange-500 border-orange-500/30';
}

export default useAIEvidenceTagger;
