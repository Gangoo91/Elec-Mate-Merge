import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface CriterionAnalysis {
  ac_ref: string;
  status: 'met' | 'partially_met' | 'not_met';
  evidence_item_ids: string[];
  reasoning: string;
}

export interface CriterionGap {
  ac_ref: string;
  what_is_missing: string;
  suggestion: string;
}

export interface QualityAssessment {
  evidence_range: 'excellent' | 'good' | 'adequate' | 'insufficient';
  reflection_quality: 'excellent' | 'good' | 'adequate' | 'insufficient';
  technical_depth: 'excellent' | 'good' | 'adequate' | 'insufficient';
}

export interface AIReviewResult {
  grade_suggestion: 'distinction' | 'merit' | 'pass' | 'refer' | 'not_yet_competent';
  grade_justification: string;
  criteria_analysis: CriterionAnalysis[];
  gaps: CriterionGap[];
  strengths: string[];
  improvements: string[];
  draft_feedback: string;
  quality: QualityAssessment;
  processing_time_ms?: number;
}

interface PortfolioItemInput {
  id: string;
  title: string;
  description: string;
  skills_demonstrated: string[];
  reflection_notes: string;
  assessment_criteria_met: string[];
  evidence_files: Array<{ url: string; type: string; name: string }>;
}

export function useAIPortfolioReview() {
  const [isReviewing, setIsReviewing] = useState(false);
  const [result, setResult] = useState<AIReviewResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const reviewSubmission = useCallback(
    async (
      submissionId: string,
      categoryId: string,
      qualificationId: string,
      items: PortfolioItemInput[]
    ) => {
      setIsReviewing(true);
      setError(null);
      setResult(null);

      try {
        const { data, error: fnError } = await supabase.functions.invoke(
          'review-portfolio-submission',
          {
            body: {
              submission_id: submissionId,
              category_id: categoryId,
              qualification_id: qualificationId,
              portfolio_items: items,
            },
          }
        );

        if (fnError) {
          throw new Error(fnError.message || 'Edge function call failed');
        }

        if (!data?.success) {
          throw new Error(data?.error || 'Review failed');
        }

        const reviewResult: AIReviewResult = {
          ...data.review,
          processing_time_ms: data.processing_time_ms,
        };

        setResult(reviewResult);
        return reviewResult;
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Failed to review submission';
        setError(message);
        toast({
          title: 'AI Review Failed',
          description: message,
          variant: 'destructive',
        });
        return null;
      } finally {
        setIsReviewing(false);
      }
    },
    [toast]
  );

  const clearResult = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return {
    reviewSubmission,
    isReviewing,
    result,
    error,
    clearResult,
  };
}
