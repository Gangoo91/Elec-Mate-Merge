import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

// ============================================
// Types
// ============================================

export interface AssessmentCriterion {
  ac_text: string;
  is_met: boolean;
}

export interface LearningOutcome {
  lo_number: string;
  lo_text: string;
  assessment_criteria: AssessmentCriterion[];
}

export interface UnitSection {
  unit_code: string;
  unit_title: string;
  learning_outcomes: LearningOutcome[];
}

export interface KSBUnitLink {
  unit_code: string;
  unit_title: string;
  mapping_type: 'primary' | 'supporting';
}

export interface KSBItem {
  code: string;
  title: string;
  route: 'core' | 'installation' | 'maintenance';
  status: 'not_started' | 'in_progress' | 'evidence_submitted' | 'verified' | 'completed';
  delivering_units: KSBUnitLink[];
}

export interface KSBSummary {
  knowledge: KSBItem[];
  behaviours: KSBItem[];
}

export interface OTJHours {
  current: number;
  target: number;
  percentage: number;
}

export interface EvidenceEntry {
  id: string;
  title: string;
  description: string | null;
  category: string;
  skills_demonstrated: string[] | null;
  learning_outcomes_met: string[] | null;
  assessment_criteria_met: string[] | null;
  grade: string | null;
  created_at: string;
}

export interface ApprenticeInfo {
  name: string;
  qualification: string;
  code: string;
  awarding_body: string;
  level: string;
  employer: string;
  training_provider: string;
  start_date: string | null;
  expected_end: string | null;
}

export interface StructuredExportData {
  apprentice: ApprenticeInfo;
  units: UnitSection[];
  ksb_summary: KSBSummary;
  otj_hours: OTJHours;
  entries: EvidenceEntry[];
}

// ============================================
// Hook
// ============================================

export function usePortfolioExportData() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch structured export data for authenticated user
   */
  const fetchExportData = useCallback(async (userId: string): Promise<StructuredExportData | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error: rpcError } = await supabase.rpc('get_portfolio_export_data', {
        p_user_id: userId,
      });

      if (rpcError) {
        setError(rpcError.message);
        return null;
      }

      const result = data as unknown as StructuredExportData & { error?: string };
      if (result?.error) {
        setError(result.error);
        return null;
      }

      return result;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch export data');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Fetch structured export data via public share token (no auth required)
   */
  const fetchSharedExportData = useCallback(async (shareToken: string): Promise<StructuredExportData | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const { data, error: rpcError } = await supabase.rpc('get_shared_portfolio_export_data', {
        p_share_token: shareToken,
      });

      if (rpcError) {
        setError(rpcError.message);
        return null;
      }

      const result = data as unknown as StructuredExportData & { error?: string };
      if (result?.error) {
        setError(result.error);
        return null;
      }

      return result;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch shared export data');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    fetchExportData,
    fetchSharedExportData,
  };
}
