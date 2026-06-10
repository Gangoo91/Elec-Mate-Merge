import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { realtimeChannelName } from '@/lib/realtimeChannel';

export type QsReviewableType = 'eic' | 'eicr' | 'minor-works';

export const QS_REVIEWABLE_TYPES: QsReviewableType[] = ['eic', 'eicr', 'minor-works'];

export interface QsTeamContext {
  is_team_member: boolean;
  employer_id?: string;
  company_name?: string | null;
  am_i_qs?: boolean;
  qs_approval_required?: boolean;
}

export interface QsReview {
  id: string;
  report_uuid: string;
  report_id: string;
  report_type: string;
  employer_id: string;
  electrician_id: string;
  status: 'pending' | 'approved' | 'returned' | 'cancelled';
  submitted_note: string | null;
  submitted_at: string;
  reviewed_by: string | null;
  reviewer_name: string | null;
  qs_position: string;
  review_comments: string | null;
  reviewed_at: string | null;
  created_at: string;
  updated_at: string;
}

// qs_signature is deliberately NOT selectable by clients (column privilege
// revoked) — the signature only reaches PDFs via get_qs_countersignature_for_pdf.
const QS_REVIEW_COLUMNS =
  'id, report_uuid, report_id, report_type, employer_id, electrician_id, status, submitted_note, submitted_at, reviewed_by, reviewer_name, qs_position, review_comments, reviewed_at, created_at, updated_at';

/**
 * Whether the signed-in electrician belongs to an employer's team.
 * Also claims any roster rows the employer created with this user's email,
 * so the linkage "just works" the first time the team member opens a cert.
 */
export const useQsTeamContext = () => {
  return useQuery({
    queryKey: ['qs-team-context'],
    queryFn: async (): Promise<QsTeamContext> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return { is_team_member: false };

      // Link employer-created roster rows matching this account's email
      await supabase.rpc('claim_employee_records');

      const { data, error } = await supabase.rpc('get_my_qs_team_context');
      if (error) {
        console.error('[QS review] team context failed:', error);
        return { is_team_member: false };
      }
      return (data ?? { is_team_member: false }) as unknown as QsTeamContext;
    },
    staleTime: 10 * 60 * 1000,
  });
};

/** Latest review row for a certificate (any status), live-updating. */
export const useQsReviewStatus = (reportId: string | undefined, enabled = true) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['qs-review-status', reportId],
    queryFn: async (): Promise<QsReview | null> => {
      const { data, error } = await supabase
        .from('report_qs_reviews')
        .select(QS_REVIEW_COLUMNS)
        .eq('report_id', reportId!)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('[QS review] status fetch failed:', error);
        return null;
      }
      return data as unknown as QsReview | null;
    },
    enabled: enabled && !!reportId,
    // Realtime invalidates instantly; polling is the fallback
    refetchInterval: 30000,
  });

  useEffect(() => {
    if (!enabled || !reportId) return;

    const channel = supabase
      .channel(realtimeChannelName(`qs-review-${reportId}`))
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'report_qs_reviews',
          filter: `report_id=eq.${reportId}`,
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['qs-review-status', reportId] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [enabled, reportId, queryClient]);

  return query;
};

/** Submit a certificate for QS review (resolves the report's DB id first). */
export const useSubmitForQsReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ reportId, note }: { reportId: string; note?: string }) => {
      const { data: report, error: reportError } = await supabase
        .from('reports')
        .select('id')
        .eq('report_id', reportId)
        .maybeSingle();

      if (reportError || !report) {
        throw new Error('Save the certificate before sending it for review.');
      }

      const { data, error } = await supabase.rpc('submit_report_for_qs_review', {
        p_report_uuid: report.id,
        p_note: note ?? null,
      });

      if (error) {
        if (error.message?.includes('NOT_A_TEAM_MEMBER')) {
          throw new Error("You're not linked to a company team yet.");
        }
        if (error.message?.includes('REPORT_TYPE_NOT_SUPPORTED')) {
          throw new Error('This certificate type does not support QS review yet.');
        }
        throw new Error(error.message || 'Failed to submit for review.');
      }
      return data;
    },
    onSuccess: (_data, { reportId }) => {
      queryClient.invalidateQueries({ queryKey: ['qs-review-status', reportId] });
    },
  });
};

export const useCancelQsReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ reviewId }: { reviewId: string; reportId: string }) => {
      const { data, error } = await supabase.rpc('cancel_qs_review', { p_review_id: reviewId });
      if (error) throw new Error(error.message || 'Failed to cancel review.');
      return data;
    },
    onSuccess: (_data, { reportId }) => {
      queryClient.invalidateQueries({ queryKey: ['qs-review-status', reportId] });
    },
  });
};

/** Batched review lookup for certificate lists (MyReports badges). */
export const useQsReviewStatuses = (reportIds: string[], enabled = true) => {
  return useQuery({
    queryKey: ['qs-review-statuses', [...reportIds].sort().join(',')],
    queryFn: async (): Promise<Record<string, QsReview>> => {
      if (reportIds.length === 0) return {};
      const { data, error } = await supabase
        .from('report_qs_reviews')
        .select(QS_REVIEW_COLUMNS)
        .in('report_id', reportIds)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('[QS review] batch status fetch failed:', error);
        return {};
      }
      // Later rows win — leaves the most recent review per report
      const map: Record<string, QsReview> = {};
      for (const row of (data ?? []) as unknown as QsReview[]) {
        map[row.report_id] = row;
      }
      return map;
    },
    enabled: enabled && reportIds.length > 0,
    staleTime: 30 * 1000,
  });
};
