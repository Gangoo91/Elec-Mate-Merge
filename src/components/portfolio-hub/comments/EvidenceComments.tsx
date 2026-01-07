import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import {
  MessageSquare,
  Send,
  Loader2,
  AlertCircle,
  CheckCircle2,
  X,
} from 'lucide-react';
import { CommentThread } from './CommentThread';
import { usePortfolioComments, type CommentThread as CommentThreadType } from '@/hooks/portfolio/usePortfolioComments';
import { useAuth } from '@/contexts/AuthContext';

interface EvidenceCommentsProps {
  evidenceId: string;
  evidenceTitle: string;
  onClose?: () => void;
  inline?: boolean;
}

/**
 * EvidenceComments - Display and manage comments on evidence
 *
 * Shows threaded comments from tutors/assessors with ability to reply
 * and mark as resolved. Used in both sheet/drawer and inline modes.
 */
export function EvidenceComments({
  evidenceId,
  evidenceTitle,
  onClose,
  inline = false,
}: EvidenceCommentsProps) {
  const { user } = useAuth();
  const {
    getCommentsForEvidence,
    addReply,
    resolveComment,
    isLoading,
    error,
  } = usePortfolioComments();

  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const threads = getCommentsForEvidence(evidenceId);
  const actionRequiredCount = threads.filter(
    t => t.rootComment.requiresAction &&
        !t.rootComment.isResolved &&
        t.rootComment.actionOwner === user?.id
  ).length;

  const handleSendMessage = async () => {
    if (!newMessage.trim() || isSending) return;

    // For new messages (not replies), we'd need a dedicated endpoint
    // For now, this is handled by the thread reply mechanism
    console.log('Would send new message:', newMessage);
    setNewMessage('');
  };

  const handleReply = async (parentId: string, content: string) => {
    try {
      await addReply(parentId, content);
    } catch (err) {
      console.error('Failed to send reply:', err);
    }
  };

  const handleResolve = async (commentId: string) => {
    try {
      await resolveComment(commentId);
    } catch (err) {
      console.error('Failed to resolve comment:', err);
    }
  };

  const content = (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-elec-yellow" />
            Tutor Feedback
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
            {evidenceTitle}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {actionRequiredCount > 0 && (
            <Badge
              variant="outline"
              className="bg-amber-500/10 text-amber-500 border-amber-500/20"
            >
              <AlertCircle className="h-3 w-3 mr-1" />
              {actionRequiredCount} action{actionRequiredCount > 1 ? 's' : ''} needed
            </Badge>
          )}
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Comments List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <AlertCircle className="h-10 w-10 text-red-500/50 mb-3" />
          <p className="text-sm text-muted-foreground">Failed to load comments</p>
          <p className="text-xs text-muted-foreground mt-1">{error.message}</p>
        </div>
      ) : threads.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <MessageSquare className="h-12 w-12 text-muted-foreground/30 mb-4" />
          <p className="font-medium text-foreground">No feedback yet</p>
          <p className="text-sm text-muted-foreground mt-1">
            Your tutor will leave comments here when they review this evidence
          </p>
        </div>
      ) : (
        <ScrollArea className={inline ? "max-h-[400px]" : "h-[calc(100vh-250px)]"}>
          <div className="space-y-4 pr-4">
            {threads.map((thread) => (
              <CommentThread
                key={thread.rootComment.id}
                thread={thread}
                currentUserId={user?.id || ''}
                onReply={handleReply}
                onResolve={handleResolve}
              />
            ))}
          </div>
        </ScrollArea>
      )}
    </>
  );

  if (inline) {
    return <div className="p-4">{content}</div>;
  }

  return (
    <Card className="border-border">
      <CardContent className="p-4">{content}</CardContent>
    </Card>
  );
}

/**
 * EvidenceCommentsIndicator - Badge showing comment count for evidence card
 */
interface EvidenceCommentsIndicatorProps {
  evidenceId: string;
  onClick?: () => void;
  className?: string;
}

export function EvidenceCommentsIndicator({
  evidenceId,
  onClick,
  className,
}: EvidenceCommentsIndicatorProps) {
  const { getCommentsForEvidence, getUnreadForEvidence } = usePortfolioComments();
  const { user } = useAuth();

  const threads = getCommentsForEvidence(evidenceId);
  const totalComments = threads.reduce((sum, t) => sum + 1 + t.replies.length, 0);
  const unreadCount = getUnreadForEvidence(evidenceId);
  const actionRequired = threads.some(
    t => t.rootComment.requiresAction &&
        !t.rootComment.isResolved &&
        t.rootComment.actionOwner === user?.id
  );

  if (totalComments === 0) return null;

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-1.5 px-2 py-1 rounded-full text-xs transition-colors",
        actionRequired
          ? "bg-amber-500/20 text-amber-500 hover:bg-amber-500/30"
          : unreadCount > 0
          ? "bg-elec-yellow/20 text-elec-yellow hover:bg-elec-yellow/30"
          : "bg-muted text-muted-foreground hover:bg-muted/80",
        className
      )}
    >
      <MessageSquare className="h-3 w-3" />
      <span>{totalComments}</span>
      {unreadCount > 0 && (
        <span className="h-4 min-w-[16px] px-1 bg-red-500 rounded-full text-[10px] text-white font-bold flex items-center justify-center">
          {unreadCount}
        </span>
      )}
      {actionRequired && (
        <AlertCircle className="h-3 w-3" />
      )}
    </button>
  );
}

/**
 * CommentsSummary - Quick summary for dashboard
 */
interface CommentsSummaryProps {
  onViewAll?: () => void;
}

export function CommentsSummary({ onViewAll }: CommentsSummaryProps) {
  const { threads, unreadCount, actionRequiredCount, isLoading } = usePortfolioComments();

  const recentThreads = threads
    .sort((a, b) =>
      new Date(b.rootComment.createdAt).getTime() -
      new Date(a.rootComment.createdAt).getTime()
    )
    .slice(0, 3);

  return (
    <Card className="border-border">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-elec-yellow" />
            Tutor Comments
            {(unreadCount > 0 || actionRequiredCount > 0) && (
              <Badge
                variant="outline"
                className={cn(
                  "text-[10px]",
                  actionRequiredCount > 0
                    ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                    : "bg-elec-yellow/10 text-elec-yellow border-elec-yellow/20"
                )}
              >
                {actionRequiredCount > 0
                  ? `${actionRequiredCount} action${actionRequiredCount > 1 ? 's' : ''} needed`
                  : `${unreadCount} new`}
              </Badge>
            )}
          </CardTitle>
          {onViewAll && (
            <Button variant="ghost" size="sm" onClick={onViewAll} className="text-xs h-7">
              View All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {isLoading ? (
          <div className="flex items-center justify-center py-6">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        ) : recentThreads.length === 0 ? (
          <div className="text-center py-6">
            <CheckCircle2 className="h-8 w-8 text-green-500/30 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">All caught up!</p>
          </div>
        ) : (
          recentThreads.map((thread) => {
            const { rootComment } = thread;
            const needsAction = rootComment.requiresAction && !rootComment.isResolved;

            return (
              <div
                key={rootComment.id}
                className={cn(
                  "p-3 rounded-lg border transition-colors cursor-pointer hover:border-elec-yellow/30",
                  needsAction
                    ? "border-amber-500/20 bg-amber-500/5"
                    : "border-border bg-card"
                )}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="font-medium text-sm text-foreground">
                    {rootComment.authorName}
                  </span>
                  <span className="text-[10px] text-muted-foreground shrink-0">
                    {formatTimeAgo(new Date(rootComment.createdAt))}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {rootComment.content}
                </p>
                {needsAction && (
                  <Badge
                    variant="outline"
                    className="mt-2 text-[10px] bg-amber-500/10 text-amber-500 border-amber-500/20"
                  >
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Response needed
                  </Badge>
                )}
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

export default EvidenceComments;
