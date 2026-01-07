import { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

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

// Generate unique ID
const generateId = (prefix: string) =>
  `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// Get initials from name
const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(n => n[0])
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
  const [comments, setComments] = useState<PortfolioComment[]>([]);
  const [readCommentIds, setReadCommentIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch comments for the current user's portfolio
  const fetchComments = useCallback(async () => {
    if (!user?.id) return;

    setIsLoading(true);
    setError(null);

    try {
      // Fetch from portfolio_comments table (if it exists)
      // or fallback to mock data for demo
      const { data, error: fetchError } = await supabase
        .from('portfolio_comments')
        .select('*')
        .or(`action_owner.eq.${user.id},author_id.eq.${user.id}`)
        .order('created_at', { ascending: true });

      if (fetchError) {
        // Table might not exist yet - use mock data for demo
        console.warn('Portfolio comments table not found, using mock data');
        setComments(getMockCommentsForUser(user.id));
      } else {
        setComments((data || []).map(mapDatabaseComment));
      }
    } catch (err) {
      console.error('Error fetching comments:', err);
      // Fallback to mock data
      setComments(getMockCommentsForUser(user.id));
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  // Set up real-time subscription
  useEffect(() => {
    if (!user?.id) return;

    fetchComments();

    // Subscribe to real-time changes
    const channel = supabase
      .channel('portfolio-comments-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'portfolio_comments',
          filter: `action_owner=eq.${user.id}`,
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newComment = mapDatabaseComment(payload.new);
            setComments(prev => [...prev, newComment]);
          } else if (payload.eventType === 'UPDATE') {
            const updatedComment = mapDatabaseComment(payload.new);
            setComments(prev =>
              prev.map(c => c.id === updatedComment.id ? updatedComment : c)
            );
          } else if (payload.eventType === 'DELETE') {
            setComments(prev => prev.filter(c => c.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id, fetchComments]);

  // Organize comments into threads
  const threads = useMemo((): CommentThread[] => {
    const rootComments = comments.filter(c => !c.parentId);

    return rootComments.map(root => ({
      rootComment: root,
      replies: comments
        .filter(c => c.parentId === root.id)
        .sort((a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        ),
    }));
  }, [comments]);

  // Calculate unread count
  const unreadCount = useMemo(() => {
    return comments.filter(c =>
      c.authorRole !== 'student' &&
      !readCommentIds.has(c.id)
    ).length;
  }, [comments, readCommentIds]);

  // Calculate action required count
  const actionRequiredCount = useMemo(() => {
    return comments.filter(c =>
      c.requiresAction &&
      !c.isResolved &&
      c.actionOwner === user?.id
    ).length;
  }, [comments, user?.id]);

  // Add a new comment
  const addComment = useCallback(async (
    comment: Omit<PortfolioComment, 'id' | 'createdAt'>
  ) => {
    if (!user?.id) return;

    const newComment: PortfolioComment = {
      ...comment,
      id: generateId('comment'),
      createdAt: new Date().toISOString(),
    };

    try {
      const { error: insertError } = await supabase
        .from('portfolio_comments')
        .insert(mapCommentToDatabase(newComment));

      if (insertError) {
        console.warn('Failed to save comment to database:', insertError);
      }

      // Optimistically add to local state
      setComments(prev => [...prev, newComment]);
    } catch (err) {
      console.error('Error adding comment:', err);
      setError(err instanceof Error ? err : new Error('Failed to add comment'));
      throw err;
    }
  }, [user?.id]);

  // Add a reply to an existing comment
  const addReply = useCallback(async (
    parentId: string,
    content: string,
    mentions: string[] = []
  ) => {
    if (!user?.id) return;

    const parentComment = comments.find(c => c.id === parentId);
    if (!parentComment) return;

    // Find the original tutor to set as action owner
    const rootComment = parentComment.parentId
      ? comments.find(c => c.id === parentComment.parentId)
      : parentComment;

    const actionOwner = rootComment?.authorId !== user.id
      ? rootComment?.authorId
      : undefined;

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
  }, [user, comments, addComment]);

  // Resolve a comment/thread
  const resolveComment = useCallback(async (commentId: string) => {
    if (!user?.id) return;

    const now = new Date().toISOString();
    const updates = {
      isResolved: true,
      resolvedBy: user.id,
      resolvedByName: user.user_metadata?.full_name || 'Apprentice',
      resolvedAt: now,
      requiresAction: false,
      updatedAt: now,
    };

    try {
      const { error: updateError } = await supabase
        .from('portfolio_comments')
        .update({
          is_resolved: true,
          resolved_by: user.id,
          resolved_by_name: user.user_metadata?.full_name || 'Apprentice',
          resolved_at: now,
          requires_action: false,
          updated_at: now,
        })
        .eq('id', commentId);

      if (updateError) {
        console.warn('Failed to resolve comment in database:', updateError);
      }

      // Optimistically update local state
      setComments(prev => prev.map(c =>
        c.id === commentId ? { ...c, ...updates } : c
      ));
    } catch (err) {
      console.error('Error resolving comment:', err);
    }
  }, [user]);

  // Mark comments as read
  const markAsRead = useCallback((commentIds: string[]) => {
    setReadCommentIds(prev => {
      const next = new Set(prev);
      commentIds.forEach(id => next.add(id));
      return next;
    });
  }, []);

  // Get comments for a specific evidence item
  const getCommentsForEvidence = useCallback((evidenceId: string): CommentThread[] => {
    const evidenceComments = comments.filter(c =>
      c.contextType === 'evidence' && c.contextId === evidenceId
    );

    const rootComments = evidenceComments.filter(c => !c.parentId);

    return rootComments.map(root => ({
      rootComment: root,
      replies: evidenceComments
        .filter(c => c.parentId === root.id)
        .sort((a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        ),
    }));
  }, [comments]);

  // Get unread count for a specific evidence item
  const getUnreadForEvidence = useCallback((evidenceId: string): number => {
    return comments.filter(c =>
      c.contextType === 'evidence' &&
      c.contextId === evidenceId &&
      c.authorRole !== 'student' &&
      !readCommentIds.has(c.id)
    ).length;
  }, [comments, readCommentIds]);

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
function mapDatabaseComment(row: any): PortfolioComment {
  return {
    id: row.id,
    contextType: row.context_type,
    contextId: row.context_id,
    parentId: row.parent_id,
    authorId: row.author_id,
    authorName: row.author_name,
    authorRole: row.author_role,
    authorInitials: row.author_initials,
    content: row.content,
    mentions: row.mentions || [],
    requiresAction: row.requires_action,
    actionOwner: row.action_owner,
    isResolved: row.is_resolved,
    resolvedBy: row.resolved_by,
    resolvedByName: row.resolved_by_name,
    resolvedAt: row.resolved_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// Map PortfolioComment to database row
function mapCommentToDatabase(comment: PortfolioComment): any {
  return {
    id: comment.id,
    context_type: comment.contextType,
    context_id: comment.contextId,
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
    resolved_by: comment.resolvedBy,
    resolved_by_name: comment.resolvedByName,
    resolved_at: comment.resolvedAt,
    created_at: comment.createdAt,
    updated_at: comment.updatedAt,
  };
}

// Mock data for demo/development
function getMockCommentsForUser(userId: string): PortfolioComment[] {
  return [
    {
      id: 'mock-comment-1',
      contextType: 'evidence',
      contextId: 'evidence-1',
      authorId: 'staff-1',
      authorName: 'Dr. Sarah Johnson',
      authorRole: 'tutor',
      authorInitials: 'SJ',
      content: 'Great work on documenting this installation! The photos clearly show your cable management skills. Can you add a brief note about the testing you performed?',
      mentions: [],
      requiresAction: true,
      actionOwner: userId,
      isResolved: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    },
    {
      id: 'mock-comment-2',
      contextType: 'evidence',
      contextId: 'evidence-1',
      parentId: 'mock-comment-1',
      authorId: userId,
      authorName: 'Apprentice',
      authorRole: 'student',
      authorInitials: 'AP',
      content: 'Thanks for the feedback! I\'ve updated the description with the test results. The insulation resistance was >200MΩ on all circuits.',
      mentions: ['staff-1'],
      requiresAction: true,
      actionOwner: 'staff-1',
      isResolved: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    },
    {
      id: 'mock-comment-3',
      contextType: 'evidence',
      contextId: 'evidence-2',
      authorId: 'staff-2',
      authorName: 'Mark Williams',
      authorRole: 'assessor',
      authorInitials: 'MW',
      content: 'This evidence meets criteria PB1 and PB2. Well done! Consider adding a witness statement from your supervisor for extra verification.',
      mentions: [],
      requiresAction: false,
      isResolved: true,
      resolvedBy: 'staff-2',
      resolvedByName: 'Mark Williams',
      resolvedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    },
    {
      id: 'mock-comment-4',
      contextType: 'evidence',
      contextId: 'evidence-3',
      authorId: 'staff-1',
      authorName: 'Dr. Sarah Johnson',
      authorRole: 'tutor',
      authorInitials: 'SJ',
      content: 'Please provide more detail on the cable sizing calculations. What formula did you use and what factors did you consider?',
      mentions: [],
      requiresAction: true,
      actionOwner: userId,
      isResolved: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    },
  ];
}

export default usePortfolioComments;
