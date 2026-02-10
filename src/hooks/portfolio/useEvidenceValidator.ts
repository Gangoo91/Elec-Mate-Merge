/**
 * useEvidenceValidator
 *
 * Hook for AI evidence quality validation against specific ACs.
 * Pattern follows useAIEvidenceTagger.ts.
 */

import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface ACValidation {
  acCode: string;
  acText: string;
  unitCode?: string;
  sufficiencyScore: number;
  status: 'sufficient' | 'minor_gaps' | 'significant_gaps' | 'insufficient';
  feedback: string;
  suggestedAdditions: string[];
}

export interface ImprovementAction {
  priority: 'high' | 'medium' | 'low';
  action: string;
  acCode?: string;
}

export interface EvidenceValidationResult {
  overallGrade: 'A' | 'B' | 'C' | 'D';
  overallScore: number;
  assessorSummary: string;
  acValidations: ACValidation[];
  improvementActions: ImprovementAction[];
  processingTimeMs: number;
}

interface ValidateOptions {
  portfolioItemId?: string;
  evidenceText: string;
  evidenceUrls?: string[];
  claimedACs: string[];
  qualificationCode: string;
}

// Cache key builder
function getCacheKey(portfolioItemId: string, updatedAt?: string): string {
  return `ev-validation-${portfolioItemId}-${updatedAt || 'latest'}`;
}

export function useEvidenceValidator() {
  const [isValidating, setIsValidating] = useState(false);
  const [result, setResult] = useState<EvidenceValidationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validate = useCallback(
    async (
      options: ValidateOptions
    ): Promise<EvidenceValidationResult | null> => {
      // Check cache first
      if (options.portfolioItemId) {
        const cacheKey = getCacheKey(options.portfolioItemId);
        try {
          const cached = localStorage.getItem(cacheKey);
          if (cached) {
            const parsed = JSON.parse(cached);
            setResult(parsed);
            return parsed;
          }
        } catch {
          /* ignore cache miss */
        }
      }

      setIsValidating(true);
      setError(null);

      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!session?.access_token) {
          throw new Error('Not authenticated');
        }

        const response = await supabase.functions.invoke(
          'validate-evidence-quality',
          {
            body: {
              portfolio_item_id: options.portfolioItemId,
              evidence_text: options.evidenceText,
              evidence_urls: options.evidenceUrls,
              claimed_acs: options.claimedACs,
              qualification_code: options.qualificationCode,
            },
          }
        );

        if (response.error) throw response.error;

        const data = response.data;
        if (!data?.success) {
          throw new Error(data?.error || 'Validation failed');
        }

        const validationResult: EvidenceValidationResult = {
          overallGrade: data.overallGrade,
          overallScore: data.overallScore,
          assessorSummary: data.assessorSummary,
          acValidations: data.acValidations || [],
          improvementActions: data.improvementActions || [],
          processingTimeMs: data.processingTimeMs || 0,
        };

        setResult(validationResult);

        // Cache result
        if (options.portfolioItemId) {
          const cacheKey = getCacheKey(options.portfolioItemId);
          try {
            localStorage.setItem(cacheKey, JSON.stringify(validationResult));
          } catch {
            /* storage full */
          }
        }

        toast.success('Evidence validation complete');
        return validationResult;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Validation failed';
        console.error('Evidence validation error:', err);
        setError(message);
        toast.error(message);
        return null;
      } finally {
        setIsValidating(false);
      }
    },
    []
  );

  const clearResult = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return {
    validate,
    isValidating,
    result,
    error,
    clearResult,
  };
}

// Helper: get grade colour
export function getGradeColour(
  grade: string
): { bg: string; text: string; border: string } {
  switch (grade) {
    case 'A':
      return {
        bg: 'bg-emerald-500/10',
        text: 'text-emerald-400',
        border: 'border-emerald-500/30',
      };
    case 'B':
      return {
        bg: 'bg-amber-500/10',
        text: 'text-amber-400',
        border: 'border-amber-500/30',
      };
    case 'C':
      return {
        bg: 'bg-orange-500/10',
        text: 'text-orange-400',
        border: 'border-orange-500/30',
      };
    case 'D':
      return {
        bg: 'bg-red-500/10',
        text: 'text-red-400',
        border: 'border-red-500/30',
      };
    default:
      return {
        bg: 'bg-muted',
        text: 'text-white/80',
        border: 'border-border',
      };
  }
}

// Helper: get status colour
export function getStatusColour(
  status: string
): { bg: string; text: string } {
  switch (status) {
    case 'sufficient':
      return { bg: 'bg-emerald-500', text: 'text-emerald-400' };
    case 'minor_gaps':
      return { bg: 'bg-amber-500', text: 'text-amber-400' };
    case 'significant_gaps':
      return { bg: 'bg-orange-500', text: 'text-orange-400' };
    case 'insufficient':
      return { bg: 'bg-red-500', text: 'text-red-400' };
    default:
      return { bg: 'bg-muted', text: 'text-white/80' };
  }
}

export default useEvidenceValidator;
