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
}

export interface SharedEvidenceEntry extends EvidenceEntry {
  supervisor_feedback: string | null;
  reflection_notes: string | null;
  file_url: string | null;
  file_type: string | null;
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
        setData(prev => prev ? {
          ...prev,
          comments: Array.isArray(commentsData) ? commentsData : [],
        } : prev);
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
        setData(prev => prev ? {
          ...prev,
          submissions: Array.isArray(statusData.submissions) ? statusData.submissions : [],
        } : prev);
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
