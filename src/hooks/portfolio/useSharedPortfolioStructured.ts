import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from '@/integrations/supabase/client';
import type {
  StructuredExportData,
  UnitSection,
  KSBSummary,
  OTJHours,
  EvidenceEntry,
  ApprenticeInfo,
} from '@/hooks/portfolio/usePortfolioExportData';

// Separate anon client for public access
const anonClient = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

// ============================================
// Extended types for share view (includes comments + submissions)
// ============================================

export interface SharedComment {
  id: string;
  context_type: string;
  context_id: string;
  parent_id: string | null;
  author_name: string;
  author_role: string;
  author_initials: string;
  content: string;
  requires_action: boolean;
  is_resolved: boolean;
  created_at: string;
}

export interface SharedSubmission {
  id: string;
  category_id: string;
  category_name: string;
  qualification_id: string;
  status: string;
  submitted_at: string;
  reviewed_at: string | null;
  assessor_feedback: string | null;
  grade: string | null;
  action_required: string | null;
  strengths_noted: string | null;
  areas_for_improvement: string | null;
  submission_count: number;
  signed_off_at: string | null;
  /** ELE-1926: AI-drafted feedback, confirmed by an assessor's decision. */
  feedback_source?: string | null;
  feedback_confirmed_at?: string | null;
  feedback_confirmed_by_name?: string | null;
}

export interface SharedEvidenceEntry extends EvidenceEntry {
  supervisor_feedback: string | null;
  reflection_notes: string | null;
  file_url: string | null;
  file_type: string | null;
  /** Stored file references (public-URL shaped); signed for viewers by sign-shared-portfolio-evidence. */
  files?: { name?: string; type?: string; url?: string }[] | null;
}

/**
 * ELE-1885: a criterion with a current assessor decision, or one sent to the
 * assessor and waiting (state 'submitted', decision null or an older referral).
 */
export interface SharedDecision {
  unit_code: string;
  unit_title: string | null;
  ac_code: string;
  ac_text: string | null;
  state: 'passed' | 'referred' | 'not_yet' | 'submitted' | string;
  decision: 'passed' | 'referred' | 'not_yet' | string | null;
  feedback: string | null;
  assessor_name: string | null;
  decided_at: string | null;
  iqa_verdict: string | null;
  iqa_at: string | null;
  /** ELE-1870: the assessor's qualifications when they decided. */
  assessor_qualifications?: string[] | null;
  /** ELE-1882: the college the decision was made at, or "Independent assessor". */
  assessed_at?: string | null;
}

/**
 * ELE-2016: every criterion with the same states get_portfolio_ac_state gives
 * (an AI suggestion reads as not_started: it is never shown as fact).
 */
export interface SharedCriterion {
  unit_code: string;
  unit_title: string | null;
  lo_number: number | null;
  ac_code: string;
  ac_text: string | null;
  state:
    | 'not_started'
    | 'claimed'
    | 'submitted'
    | 'referred'
    | 'not_yet'
    | 'passed'
    | 'iqa_confirmed'
    | 'iqa_rejected';
}

/** ELE-2016: hours as the OTJ source of truth counts them. */
export interface SharedOtj {
  verified_hours: number | null;
  required_hours: number | null;
  college_verified_hours: number | null;
  employer_attested_hours: number | null;
  frozen_at: string | null;
}

/** ELE-1885: a signed witness statement (reviewer-safe fields only). */
export interface SharedWitness {
  id: string;
  portfolio_item_id: string | null;
  witness_name: string | null;
  witness_role: string | null;
  witness_company: string | null;
  statement: string | null;
  criteria: string[];
  statement_hash: string | null;
  signed_at: string | null;
}

export interface SharedApprenticeInfo extends ApprenticeInfo {
  share_title: string | null;
  share_description: string | null;
}

export interface SharedPortfolioStructuredData {
  apprentice: SharedApprenticeInfo;
  units: UnitSection[];
  ksb_summary: KSBSummary;
  otj_hours: OTJHours;
  entries: SharedEvidenceEntry[];
  comments: SharedComment[];
  submissions: SharedSubmission[];
  /** Optional until 20261008061000 is applied. */
  decisions?: SharedDecision[];
  witnesses?: SharedWitness[];
  /** Optional until 20261010180200 is applied. */
  criteria?: SharedCriterion[];
  item_criteria?: { item_id: string; unit_code: string; ac_code: string }[];
  otj?: SharedOtj | null;
}

// ============================================
// Hook
// ============================================

export function useSharedPortfolioStructured(token: string | undefined) {
  const [data, setData] = useState<SharedPortfolioStructuredData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    if (!token) {
      setError('No share token provided');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { data: rpcData, error: rpcError } = await anonClient.rpc(
        'get_shared_portfolio_structured',
        { p_share_token: token }
      );

      if (rpcError) {
        setError(rpcError.message);
        return;
      }

      const result = rpcData as unknown as SharedPortfolioStructuredData & { error?: string };
      if (result?.error) {
        setError(result.error);
        return;
      }

      setData(result);
    } catch (err: any) {
      setError(err.message || 'Failed to load portfolio');
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const reloadComments = useCallback(async () => {
    if (!token || !data) return;
    try {
      const { data: commentsData } = await anonClient.rpc('get_shared_portfolio_comments', {
        p_share_token: token,
      });
      if (commentsData) {
        setData((prev) =>
          prev
            ? {
                ...prev,
                comments: Array.isArray(commentsData) ? commentsData : [],
              }
            : prev
        );
      }
    } catch {
      // Silent fail on comment reload
    }
  }, [token, data]);

  const reloadSubmissions = useCallback(async () => {
    if (!token || !data) return;
    try {
      const { data: statusData } = await anonClient.rpc('get_shared_portfolio_status', {
        p_share_token: token,
      });
      if (statusData?.submissions) {
        setData((prev) =>
          prev
            ? {
                ...prev,
                submissions: Array.isArray(statusData.submissions) ? statusData.submissions : [],
              }
            : prev
        );
      }
    } catch {
      // Silent fail on submission reload
    }
  }, [token, data]);

  return {
    data,
    isLoading,
    error,
    reload: loadData,
    reloadComments,
    reloadSubmissions,
    anonClient,
  };
}
