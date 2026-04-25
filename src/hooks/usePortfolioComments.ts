import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   usePortfolioComments — live thread of comments for one learner's
   portfolio submission OR a single evidence item. Realtime-subscribed so
   college and apprentice sides stay in sync as comments land.

   Pass either submissionId OR evidenceId. studentUserId is required (it's
   the auth.users.id of the learner — used to scope INSERTs / RLS).
   ========================================================================== */

export interface PortfolioComment {
  id: string;
  user_id: string;
  evidence_id: string | null;
  context_type: string | null;
  content: string;
  author_id: string | null;
  author_name: string | null;
  author_role: string | null;
  author_initials: string | null;
  parent_id: string | null;
  mentions: string[];
  requires_action: boolean;
  is_resolved: boolean;
  resolved_by_name: string | null;
  action_owner: string | null;
  created_at: string;
  updated_at: string | null;
}

export interface NewComment {
  content: string;
  parent_id?: string | null;
  requires_action?: boolean;
  evidence_id?: string | null;
  context_type?: string | null;
}

export interface PortfolioCommentsHook {
  comments: PortfolioComment[];
  loading: boolean;
  error: string | null;
  post: (input: NewComment) => Promise<void>;
  toggleResolved: (id: string, resolved: boolean) => Promise<void>;
  remove: (id: string) => Promise<void>;
  refresh: () => Promise<void>;
}

interface Args {
  studentUserId: string | null;
  submissionId?: string | null;
  evidenceId?: string | null;
  /**
   * What context_type to write on insert. Defaults to 'submission' when a
   * submissionId is provided, 'evidence' when an evidenceId is provided.
   */
  contextType?: string;
}

export function usePortfolioComments({
  studentUserId,
  submissionId,
  evidenceId,
  contextType,
}: Args): PortfolioCommentsHook {
  const [comments, setComments] = useState<PortfolioComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const filterColumn = evidenceId ? 'evidence_id' : null;
  const filterValue = evidenceId ?? null;

  const fetch = useCallback(async () => {
    if (!studentUserId) {
      setComments([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      let q = supabase
        .from('portfolio_comments')
        .select(
          'id, user_id, evidence_id, context_type, content, author_id, author_name, author_role, author_initials, parent_id, mentions, requires_action, is_resolved, resolved_by_name, action_owner, created_at, updated_at'
        )
        .eq('user_id', studentUserId)
        .order('created_at', { ascending: true });

      if (filterColumn === 'evidence_id' && filterValue) {
        q = q.eq('evidence_id', filterValue);
      } else if (submissionId) {
        // Submission-scoped: comments where context_type='submission' and
        // evidence_id stores the submission id (existing apprentice convention)
        q = q.eq('evidence_id', submissionId);
      }

      const { data, error: err } = await q;
      if (err) throw err;
      setComments(
        ((data ?? []) as Array<PortfolioComment & { mentions: string[] | null }>).map((c) => ({
          ...c,
          mentions: c.mentions ?? [],
        }))
      );
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [studentUserId, submissionId, filterColumn, filterValue]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  // Realtime — listen for new comments for this learner. We over-fetch
  // (any new comment for the student) and let the local filter trim,
  // because the realtime filter language doesn't combine on user_id +
  // evidence_id cleanly. Refetch keeps it correct in all edge cases.
  useEffect(() => {
    if (!studentUserId) return;
    const channel = supabase
      .channel(`portfolio_comments:${studentUserId}:${submissionId ?? evidenceId ?? 'all'}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'portfolio_comments',
          filter: `user_id=eq.${studentUserId}`,
        },
        () => fetch()
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [studentUserId, submissionId, evidenceId, fetch]);

  const post = useCallback(
    async (input: NewComment) => {
      if (!studentUserId) throw new Error('No learner');
      const { data: userData } = await supabase.auth.getUser();
      const uid = userData.user?.id ?? null;

      let authorName: string | null = null;
      let authorRole: string | null = null;
      if (uid) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name, role')
          .eq('id', uid)
          .maybeSingle();
        authorName = (profile?.full_name as string | null) ?? null;
        authorRole = (profile?.role as string | null) ?? null;
      }

      const initials =
        (authorName ?? '?')
          .split(/\s+/)
          .slice(0, 2)
          .map((w) => w[0])
          .join('')
          .toUpperCase() || null;

      // Resolve which evidence_id / context_type to stamp
      const targetEvidenceId =
        input.evidence_id ?? evidenceId ?? submissionId ?? null;
      const ctx =
        input.context_type ?? contextType ?? (submissionId ? 'submission' : 'evidence');

      const { error: insErr } = await supabase.from('portfolio_comments').insert({
        user_id: studentUserId,
        evidence_id: targetEvidenceId,
        context_type: ctx,
        content: input.content.trim(),
        author_id: uid,
        author_name: authorName,
        author_role: authorRole,
        author_initials: initials,
        parent_id: input.parent_id ?? null,
        requires_action: input.requires_action ?? false,
        is_resolved: false,
      });
      if (insErr) throw insErr;
    },
    [studentUserId, evidenceId, submissionId, contextType]
  );

  const toggleResolved = useCallback(
    async (id: string, resolved: boolean) => {
      const { data: userData } = await supabase.auth.getUser();
      const uid = userData.user?.id ?? null;
      let resolverName: string | null = null;
      if (uid && resolved) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', uid)
          .maybeSingle();
        resolverName = (profile?.full_name as string | null) ?? null;
      }
      const { error: updErr } = await supabase
        .from('portfolio_comments')
        .update({
          is_resolved: resolved,
          resolved_by_name: resolved ? resolverName : null,
        })
        .eq('id', id);
      if (updErr) throw updErr;
    },
    []
  );

  const remove = useCallback(async (id: string) => {
    const { error: delErr } = await supabase
      .from('portfolio_comments')
      .delete()
      .eq('id', id);
    if (delErr) throw delErr;
  }, []);

  return useMemo(
    () => ({ comments, loading, error, post, toggleResolved, remove, refresh: fetch }),
    [comments, loading, error, post, toggleResolved, remove, fetch]
  );
}
