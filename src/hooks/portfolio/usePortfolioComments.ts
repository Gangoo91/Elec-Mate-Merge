/**
 * usePortfolioComments — the ONE portfolio comments module (ELE-1917).
 *
 *   usePortfolioCommentThread({ studentUserId, submissionId?, evidenceId? })
 *     a live thread for one learner, one submission or one evidence item,
 *     as raw rows; the tutor's submission drawer reads this.
 *   usePortfolioComments()
 *     the signed-in learner's own comments, threaded and counted, built on
 *     the same thread (one fetch, one realtime subscription).
 *
 * Replaces src/hooks/usePortfolioComments.ts, which was a second copy with its
 * own fetch, its own realtime channel and its own row shape.
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { realtimeChannelName } from '@/lib/realtimeChannel';

/* ─── Scoped thread (raw rows) ─────────────────────────────────────────── */

export interface PortfolioCommentRow {
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

export interface PortfolioCommentThreadHook {
  comments: PortfolioCommentRow[];
  loading: boolean;
  error: string | null;
  post: (input: NewComment) => Promise<void>;
  toggleResolved: (id: string, resolved: boolean) => Promise<void>;
  remove: (id: string) => Promise<void>;
  refresh: () => Promise<void>;
}

interface ThreadArgs {
  studentUserId: string | null;
  submissionId?: string | null;
  evidenceId?: string | null;
  /**
   * What context_type to write on insert. Defaults to 'submission' when a
   * submissionId is provided, 'evidence' when an evidenceId is provided.
   */
  contextType?: string;
}

export function usePortfolioCommentThread({
  studentUserId,
  submissionId,
  evidenceId,
  contextType,
}: ThreadArgs): PortfolioCommentThreadHook {
  const [comments, setComments] = useState<PortfolioCommentRow[]>([]);
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
        ((data ?? []) as Array<PortfolioCommentRow & { mentions: string[] | null }>).map((c) => ({
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
      .channel(realtimeChannelName(`portfolio_comments:${studentUserId}:${submissionId ?? evidenceId ?? 'all'}`))
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

/* ─── Learner view (threaded, camel case) ──────────────────────────────── */

/**
 * Portfolio Comment Interface
 * Mirrors CollegeComment structure for compatibility
 */
export interface PortfolioComment {
  id: string;
  contextType: 'evidence' | 'assessment' | 'ilp' | 'portfolio';
  contextId: string;
  parentId?: string;
  authorId: string;
  authorName: string;
  authorRole: 'tutor' | 'assessor' | 'student' | 'admin' | 'support';
  authorInitials: string;
  content: string;
  mentions: string[];
  requiresAction: boolean;
  actionOwner?: string;
  isResolved: boolean;
  resolvedBy?: string;
  resolvedByName?: string;
  resolvedAt?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CommentThread {
  rootComment: PortfolioComment;
  replies: PortfolioComment[];
}

interface UsePortfolioCommentsReturn {
  comments: PortfolioComment[];
  threads: CommentThread[];
  unreadCount: number;
  actionRequiredCount: number;
  isLoading: boolean;
  error: Error | null;
  addComment: (comment: Omit<PortfolioComment, 'id' | 'createdAt'>) => Promise<void>;
  addReply: (parentId: string, content: string, mentions?: string[]) => Promise<void>;
  resolveComment: (commentId: string) => Promise<void>;
  markAsRead: (commentIds: string[]) => void;
  refreshComments: () => Promise<void>;
  getCommentsForEvidence: (evidenceId: string) => CommentThread[];
  getUnreadForEvidence: (evidenceId: string) => number;
}

/**
 * portfolio_comments.id is a uuid column, so a "comment-<ts>-<rand>" string
 * is rejected outright (22P02). Generate a real one.
 */
const generateId = (): string =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : // Fallback for the rare context without randomUUID.
      'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
      });

// Get initials from name
const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

/**
 * usePortfolioComments - Hook for managing portfolio evidence comments
 *
 * Features:
 * - Fetches comments from Supabase for apprentice's portfolio
 * - Real-time subscriptions for live updates
 * - Threaded conversations support
 * - Action tracking (requires_action, resolved)
 * - Unread indicators
 */
export function usePortfolioComments(): UsePortfolioCommentsReturn {
  const { user } = useAuth();
  // ELE-1917: one fetch and one realtime subscription for every comment
  // surface. The learner view is the learner-scoped thread (user_id = me),
  // mapped to the camel-case shape the portfolio components read. The old
  // copy subscribed on action_owner only, so a tutor's new comment never
  // arrived live; the thread subscribes on user_id.
  const thread = usePortfolioCommentThread({ studentUserId: user?.id ?? null });
  const comments = useMemo(() => thread.comments.map(mapDatabaseComment), [thread.comments]);
  const [readCommentIds, setReadCommentIds] = useState<Set<string>>(new Set());
  const [writeError, setWriteError] = useState<Error | null>(null);
  const isLoading = thread.loading;
  const error = writeError ?? (thread.error ? new Error(thread.error) : null);
  const fetchComments = thread.refresh;

  // Organize comments into threads
  const threads = useMemo((): CommentThread[] => {
    const rootComments = comments.filter((c) => !c.parentId);

    return rootComments.map((root) => ({
      rootComment: root,
      replies: comments
        .filter((c) => c.parentId === root.id)
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()),
    }));
  }, [comments]);

  // Calculate unread count
  const unreadCount = useMemo(() => {
    return comments.filter((c) => c.authorRole !== 'student' && !readCommentIds.has(c.id)).length;
  }, [comments, readCommentIds]);

  // Calculate action required count
  const actionRequiredCount = useMemo(() => {
    return comments.filter((c) => c.requiresAction && !c.isResolved && c.actionOwner === user?.id)
      .length;
  }, [comments, user?.id]);

  // Add a new comment
  const addComment = useCallback(
    async (comment: Omit<PortfolioComment, 'id' | 'createdAt'>) => {
      if (!user?.id) return;

      const newComment: PortfolioComment = {
        ...comment,
        id: generateId(),
        createdAt: new Date().toISOString(),
      };

      try {
        const { error: insertError } = await supabase
          .from('portfolio_comments')
          .insert(mapCommentToDatabase(newComment, user.id));

        /*
         * Do NOT swallow this. The old code warned to the console and then
         * added the comment to local state regardless, so a failed write was
         * indistinguishable from a successful one until the next reload —
         * which is how a completely non-functional insert survived unnoticed.
         */
        if (insertError) {
          console.error('Failed to save comment:', insertError);
          throw insertError;
        }

        await fetchComments();
      } catch (err) {
        console.error('Error adding comment:', err);
        setWriteError(err instanceof Error ? err : new Error('Failed to add comment'));
        throw err;
      }
    },
    [user?.id, fetchComments]
  );

  // Add a reply to an existing comment
  const addReply = useCallback(
    async (parentId: string, content: string, mentions: string[] = []) => {
      if (!user?.id) return;

      const parentComment = comments.find((c) => c.id === parentId);
      if (!parentComment) return;

      // Find the original tutor to set as action owner
      const rootComment = parentComment.parentId
        ? comments.find((c) => c.id === parentComment.parentId)
        : parentComment;

      const actionOwner = rootComment?.authorId !== user.id ? rootComment?.authorId : undefined;

      await addComment({
        contextType: parentComment.contextType,
        contextId: parentComment.contextId,
        parentId,
        authorId: user.id,
        authorName: user.user_metadata?.full_name || 'Apprentice',
        authorRole: 'student',
        authorInitials: getInitials(user.user_metadata?.full_name || 'AP'),
        content,
        mentions,
        requiresAction: mentions.length > 0 || !!actionOwner,
        actionOwner,
        isResolved: false,
      });
    },
    [user, comments, addComment]
  );

  // Resolve a comment/thread
  const resolveComment = useCallback(
    async (commentId: string) => {
      if (!user?.id) return;

      const now = new Date().toISOString();
      try {
        const { error: updateError } = await supabase
          .from('portfolio_comments')
          // resolved_by / resolved_at are not columns on portfolio_comments;
          // including them failed the whole update.
          .update({
            is_resolved: true,
            resolved_by_name: user.user_metadata?.full_name || 'Apprentice',
            requires_action: false,
            updated_at: now,
          })
          .eq('id', commentId);

        if (updateError) {
          console.warn('Failed to resolve comment in database:', updateError);
        }

        await fetchComments();
      } catch (err) {
        console.error('Error resolving comment:', err);
      }
    },
    [user, fetchComments]
  );

  // Mark comments as read
  const markAsRead = useCallback((commentIds: string[]) => {
    setReadCommentIds((prev) => {
      const next = new Set(prev);
      commentIds.forEach((id) => next.add(id));
      return next;
    });
  }, []);

  // Get comments for a specific evidence item
  const getCommentsForEvidence = useCallback(
    (evidenceId: string): CommentThread[] => {
      const evidenceComments = comments.filter(
        (c) => c.contextType === 'evidence' && c.contextId === evidenceId
      );

      const rootComments = evidenceComments.filter((c) => !c.parentId);

      return rootComments.map((root) => ({
        rootComment: root,
        replies: evidenceComments
          .filter((c) => c.parentId === root.id)
          .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()),
      }));
    },
    [comments]
  );

  // Get unread count for a specific evidence item
  const getUnreadForEvidence = useCallback(
    (evidenceId: string): number => {
      return comments.filter(
        (c) =>
          c.contextType === 'evidence' &&
          c.contextId === evidenceId &&
          c.authorRole !== 'student' &&
          !readCommentIds.has(c.id)
      ).length;
    },
    [comments, readCommentIds]
  );

  return {
    comments,
    threads,
    unreadCount,
    actionRequiredCount,
    isLoading,
    error,
    addComment,
    addReply,
    resolveComment,
    markAsRead,
    refreshComments: fetchComments,
    getCommentsForEvidence,
    getUnreadForEvidence,
  };
}

// Map database row to PortfolioComment
function mapDatabaseComment(row: PortfolioCommentRow): PortfolioComment {
  return {
    id: row.id,
    contextType: row.context_type as PortfolioComment['contextType'],
    // 🔴 This read `row.context_id`. There IS no context_id column — the
    // evidence a comment hangs off is `evidence_id`. So contextId was
    // undefined on every row, and getCommentsForEvidence (which matches on
    // contextId === evidenceId) never matched anything. Tutor feedback was
    // fetched and then silently filtered out of every thread.
    contextId: row.evidence_id ?? '',
    parentId: row.parent_id ?? undefined,
    authorId: row.author_id ?? '',
    authorName: row.author_name ?? '',
    authorRole: row.author_role as PortfolioComment['authorRole'],
    authorInitials: row.author_initials ?? '',
    content: row.content,
    mentions: row.mentions || [],
    requiresAction: row.requires_action,
    actionOwner: row.action_owner ?? undefined,
    isResolved: row.is_resolved,
    // resolved_by / resolved_at are not columns on this table either.
    resolvedByName: row.resolved_by_name ?? undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at ?? undefined,
  };
}

// Map PortfolioComment to database row
/**
 * 🔴 Every insert this produced was rejected, and the rejection was swallowed.
 *
 * portfolio_comments requires id (uuid), user_id, evidence_id, context_type,
 * content, author_name and author_role. The old mapper sent NEITHER user_id
 * NOR evidence_id, sent a non-UUID id ("comment-1712…-a1b2c3"), and sent three
 * columns that do not exist (context_id, resolved_by, resolved_at). The insert
 * failed on every path, `addComment` logged it with console.warn and then
 * optimistically pushed the comment into local state anyway — so an apprentice
 * replying to a tutor watched their message appear and be lost on reload,
 * while the tutor never received it.
 *
 * `ownerId` is the learner whose portfolio the thread belongs to; the RLS
 * INSERT check requires user_id = auth.uid() for a learner posting on their
 * own evidence.
 */
function mapCommentToDatabase(comment: PortfolioComment, ownerId: string): any {
  return {
    id: comment.id,
    user_id: ownerId,
    evidence_id: comment.contextId,
    context_type: comment.contextType,
    parent_id: comment.parentId,
    author_id: comment.authorId,
    author_name: comment.authorName,
    author_role: comment.authorRole,
    author_initials: comment.authorInitials,
    content: comment.content,
    mentions: comment.mentions,
    requires_action: comment.requiresAction,
    action_owner: comment.actionOwner,
    is_resolved: comment.isResolved,
    resolved_by_name: comment.resolvedByName,
    created_at: comment.createdAt,
    updated_at: comment.updatedAt,
  };
}


export default usePortfolioComments;
