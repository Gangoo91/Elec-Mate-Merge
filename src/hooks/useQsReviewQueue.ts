import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { realtimeChannelName } from '@/lib/realtimeChannel';

export interface QsQueueItem {
  review_id: string;
  status: 'pending' | 'approved' | 'returned' | 'cancelled';
  submitted_at: string;
  submitted_note: string | null;
  reviewed_at: string | null;
  reviewer_name: string | null;
  review_comments: string | null;
  report_uuid: string;
  report_id: string;
  report_type: string;
  certificate_number: string | null;
  client_name: string | null;
  installation_address: string | null;
  inspection_date: string | null;
  inspector_name: string | null;
  report_updated_at: string;
  electrician_id: string;
  electrician_name: string;
}

export interface QsReviewReportDetail {
  review: Record<string, unknown>;
  report: {
    id: string;
    report_id: string;
    report_type: string;
    certificate_number: string | null;
    client_name: string | null;
    installation_address: string | null;
    inspection_date: string | null;
    inspector_name: string | null;
    updated_at: string;
    pdf_url: string | null;
    data: Record<string, unknown> | null;
  };
}

/** The company's QS review queue (employer account or active QS team member). */
export const useQsReviewQueue = (status: 'pending' | 'all' = 'pending') => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['qsReviews', status],
    queryFn: async (): Promise<QsQueueItem[]> => {
      const { data, error } = await supabase.rpc('get_qs_review_queue', {
        p_status: status === 'all' ? null : status,
      });
      if (error) {
        console.error('[QS queue] fetch failed:', error);
        return [];
      }
      return (data ?? []) as QsQueueItem[];
    },
    refetchInterval: 60000,
  });

  useEffect(() => {
    const channel = supabase
      .channel(realtimeChannelName('qs-review-queue'))
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'report_qs_reviews' },
        () => {
          queryClient.invalidateQueries({ queryKey: ['qsReviews'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return query;
};

export const useQsPendingCount = () => {
  const { data } = useQsReviewQueue('pending');
  return data?.length ?? 0;
};

/** Full certificate payload for the read-only review sheet. */
export const useQsReviewReport = (reviewId: string | null) => {
  return useQuery({
    queryKey: ['qsReviewReport', reviewId],
    queryFn: async (): Promise<QsReviewReportDetail | null> => {
      const { data, error } = await supabase.rpc('get_qs_review_report', {
        p_review_id: reviewId!,
      });
      if (error) {
        console.error('[QS queue] report fetch failed:', error);
        throw new Error(error.message);
      }
      return data as unknown as QsReviewReportDetail;
    },
    enabled: !!reviewId,
  });
};

export const useApproveQsReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      reviewId,
      signature,
      reviewerName,
      comments,
    }: {
      reviewId: string;
      signature: string;
      reviewerName: string;
      comments?: string;
    }) => {
      const { data, error } = await supabase.rpc('approve_qs_review', {
        p_review_id: reviewId,
        p_signature: signature,
        p_reviewer_name: reviewerName,
        p_comments: comments ?? null,
      });
      if (error) throw new Error(error.message || 'Failed to approve.');
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['qsReviews'] });
    },
  });
};

export const useReturnQsReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ reviewId, comments }: { reviewId: string; comments: string }) => {
      const { data, error } = await supabase.rpc('return_qs_review', {
        p_review_id: reviewId,
        p_comments: comments,
      });
      if (error) throw new Error(error.message || 'Failed to return.');
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['qsReviews'] });
    },
  });
};
