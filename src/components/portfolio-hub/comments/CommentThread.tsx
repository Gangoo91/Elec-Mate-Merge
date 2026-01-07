import { useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import {
  MessageCircle,
  Reply,
  CheckCircle2,
  AlertCircle,
  Clock,
  Send,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { type CommentThread as CommentThreadType, type PortfolioComment } from '@/hooks/portfolio/usePortfolioComments';

interface CommentThreadProps {
  thread: CommentThreadType;
  currentUserId: string;
  onReply: (parentId: string, content: string) => Promise<void>;
  onResolve: (commentId: string) => Promise<void>;
  compact?: boolean;
}

export function CommentThread({
  thread,
  currentUserId,
  onReply,
  onResolve,
  compact = false,
}: CommentThreadProps) {
  const [isExpanded, setIsExpanded] = useState(!compact);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { rootComment, replies } = thread;
  const hasReplies = replies.length > 0;
  const isFromTutor = rootComment.authorRole !== 'student';
  const needsAction = rootComment.requiresAction && !rootComment.isResolved && rootComment.actionOwner === currentUserId;

  const handleSubmitReply = async () => {
    if (!replyContent.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onReply(rootComment.id, replyContent.trim());
      setReplyContent('');
      setShowReplyInput(false);
    } catch (err) {
      console.error('Failed to submit reply:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResolve = async () => {
    await onResolve(rootComment.id);
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'tutor':
        return 'bg-blue-500/20 text-blue-500 border-blue-500/30';
      case 'assessor':
        return 'bg-purple-500/20 text-purple-500 border-purple-500/30';
      case 'student':
        return 'bg-green-500/20 text-green-500 border-green-500/30';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div
      className={cn(
        "rounded-lg border transition-all",
        needsAction
          ? "border-amber-500/30 bg-amber-500/5"
          : rootComment.isResolved
          ? "border-green-500/20 bg-green-500/5"
          : "border-border bg-card"
      )}
    >
      {/* Main Comment */}
      <div className="p-3 sm:p-4">
        <div className="flex items-start gap-3">
          {/* Avatar */}
          <Avatar className="h-8 w-8 sm:h-10 sm:w-10 shrink-0">
            <AvatarFallback
              className={cn(
                "text-xs font-medium",
                isFromTutor
                  ? "bg-elec-yellow/20 text-elec-yellow"
                  : "bg-green-500/20 text-green-500"
              )}
            >
              {rootComment.authorInitials}
            </AvatarFallback>
          </Avatar>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="font-medium text-sm text-foreground">
                {rootComment.authorName}
              </span>
              <Badge
                variant="outline"
                className={cn("text-[10px] capitalize", getRoleBadgeColor(rootComment.authorRole))}
              >
                {rootComment.authorRole}
              </Badge>
              {rootComment.isResolved && (
                <Badge
                  variant="outline"
                  className="text-[10px] bg-green-500/10 text-green-500 border-green-500/20"
                >
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Resolved
                </Badge>
              )}
              {needsAction && (
                <Badge
                  variant="outline"
                  className="text-[10px] bg-amber-500/10 text-amber-500 border-amber-500/20"
                >
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Action Required
                </Badge>
              )}
            </div>

            {/* Message */}
            <p className="text-sm text-foreground/90 whitespace-pre-wrap">
              {rootComment.content}
            </p>

            {/* Footer */}
            <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {formatTimeAgo(new Date(rootComment.createdAt))}
              </span>
              {hasReplies && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center gap-1 hover:text-foreground transition-colors"
                >
                  <MessageCircle className="h-3 w-3" />
                  {replies.length} {replies.length === 1 ? 'reply' : 'replies'}
                  {isExpanded ? (
                    <ChevronUp className="h-3 w-3" />
                  ) : (
                    <ChevronDown className="h-3 w-3" />
                  )}
                </button>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowReplyInput(!showReplyInput)}
                className="h-7 text-xs gap-1"
              >
                <Reply className="h-3 w-3" />
                Reply
              </Button>
              {needsAction && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleResolve}
                  className="h-7 text-xs gap-1 text-green-500 hover:text-green-400 hover:bg-green-500/10"
                >
                  <CheckCircle2 className="h-3 w-3" />
                  Mark Resolved
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Reply Input */}
        {showReplyInput && (
          <div className="mt-4 pl-11 sm:pl-13">
            <Textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Write your reply..."
              className="min-h-[80px] text-sm resize-none bg-background border-border"
            />
            <div className="flex justify-end gap-2 mt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowReplyInput(false);
                  setReplyContent('');
                }}
                className="h-8 text-xs"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleSubmitReply}
                disabled={!replyContent.trim() || isSubmitting}
                className="h-8 text-xs bg-elec-yellow text-black hover:bg-elec-yellow/90"
              >
                <Send className="h-3 w-3 mr-1" />
                {isSubmitting ? 'Sending...' : 'Send Reply'}
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Replies */}
      {isExpanded && hasReplies && (
        <div className="border-t border-border/50 bg-muted/30">
          {replies.map((reply) => (
            <CommentReply key={reply.id} comment={reply} currentUserId={currentUserId} />
          ))}
        </div>
      )}
    </div>
  );
}

interface CommentReplyProps {
  comment: PortfolioComment;
  currentUserId: string;
}

function CommentReply({ comment, currentUserId }: CommentReplyProps) {
  const isOwnComment = comment.authorId === currentUserId;

  return (
    <div className="p-3 sm:p-4 border-b border-border/30 last:border-b-0">
      <div className="flex items-start gap-3 pl-2 sm:pl-8">
        <Avatar className="h-6 w-6 sm:h-8 sm:w-8 shrink-0">
          <AvatarFallback
            className={cn(
              "text-[10px] sm:text-xs font-medium",
              isOwnComment
                ? "bg-green-500/20 text-green-500"
                : "bg-elec-yellow/20 text-elec-yellow"
            )}
          >
            {comment.authorInitials}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="font-medium text-xs sm:text-sm text-foreground">
              {comment.authorName}
            </span>
            <span className="text-[10px] text-muted-foreground">
              {formatTimeAgo(new Date(comment.createdAt))}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-foreground/90 whitespace-pre-wrap">
            {comment.content}
          </p>
        </div>
      </div>
    </div>
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

export default CommentThread;
