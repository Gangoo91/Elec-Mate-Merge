import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { realtimeChannelName } from '@/lib/realtimeChannel';

/* ==========================================================================
   useQsReviewComments — itemised QS comments on a certificate review.
   Reads/writes report_qs_review_comments directly under RLS (participants
   only). A QS leaves targeted notes (per observation / circuit / general);
   the electrician sees them and can reply. No edge function.
   ========================================================================== */

export interface QsReviewComment {
  id: string;
  review_id: string;
  target: string;
  target_label: string | null;
  body: string;
  author_id: string;
  author_name: string | null;
  resolved: boolean;
  created_at: string;
}

// report_qs_review_comments isn't in the generated Supabase types yet, so the
// table name is cast. Runtime is unaffected (the table exists + RLS applies).
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const table = () => (supabase as any).from('report_qs_review_comments');

export function useQsReviewComments(reviewId: string | null | undefined) {
  const qc = useQueryClient();

  useEffect(() => {
    if (!reviewId) return;
    const channel = supabase
      .channel(realtimeChannelName(`qs-comments-${reviewId}`))
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'report_qs_review_comments',
          filter: `review_id=eq.${reviewId}`,
        },
        () => qc.invalidateQueries({ queryKey: ['qs-review-comments', reviewId] })
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [reviewId, qc]);

  const query = useQuery<QsReviewComment[]>({
    queryKey: ['qs-review-comments', reviewId],
    enabled: !!reviewId,
    // report_qs_review_comments is not in the realtime publication, so the
    // channel above may never fire cross-party — poll as a fallback.
    refetchInterval: 30000,
    queryFn: async () => {
      const { data, error } = await table()
        .select('*')
        .eq('review_id', reviewId)
        .order('created_at', { ascending: true });
      if (error) throw error;
      return (data ?? []) as QsReviewComment[];
    },
  });

  const add = useMutation({
    mutationFn: async (input: {
      body: string;
      target?: string;
      target_label?: string | null;
      author_name?: string | null;
    }) => {
      const { error } = await table().insert({
        review_id: reviewId,
        body: input.body,
        target: input.target ?? 'general',
        target_label: input.target_label ?? null,
        author_name: input.author_name ?? null,
      });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['qs-review-comments', reviewId] }),
  });

  const resolve = useMutation({
    mutationFn: async (input: { id: string; resolved: boolean }) => {
      const { error } = await table().update({ resolved: input.resolved }).eq('id', input.id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['qs-review-comments', reviewId] }),
  });

  return {
    comments: query.data ?? [],
    isLoading: query.isLoading,
    add,
    resolve,
  };
}
