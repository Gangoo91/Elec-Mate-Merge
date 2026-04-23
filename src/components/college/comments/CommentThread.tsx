import { useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { useCollege, type CollegeComment } from '@/contexts/CollegeContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Pill, type Tone } from '@/components/college/primitives';
import { cn } from '@/lib/utils';

interface CommentThreadProps {
  contextType: 'evidence' | 'assessment' | 'ilp' | 'portfolio';
  contextId: string;
  currentUserId?: string;
  currentUserName?: string;
  currentUserRole?: string;
  currentUserInitials?: string;
  readOnly?: boolean;
}

export function CommentThread({
  contextType,
  contextId,
  currentUserId = 'staff-1',
  currentUserName = 'Dr. Sarah Johnson',
  currentUserRole = 'tutor',
  currentUserInitials = 'SJ',
  readOnly = false,
}: CommentThreadProps) {
  const { getCommentsForItem, addComment, resolveComment, staff, students } = useCollege();
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');
  const [replyContent, setReplyContent] = useState('');
  const [showMentionPopover, setShowMentionPopover] = useState(false);
  const [mentionSearch, setMentionSearch] = useState('');
  const [, setSelectedMentions] = useState<string[]>([]);

  const comments = getCommentsForItem(contextType, contextId);

  const topLevelComments = comments.filter((c) => !c.parentId);
  const getReplies = (parentId: string) => comments.filter((c) => c.parentId === parentId);

  const mentionableUsers = [
    ...staff
      .filter((s) => s.status === 'Active')
      .map((s) => ({ id: s.id, name: s.name, role: s.role, initials: s.avatarInitials })),
    ...students
      .filter((s) => s.status === 'Active')
      .map((s) => ({ id: s.id, name: s.name, role: 'student', initials: s.avatarInitials })),
  ].filter(
    (u) => mentionSearch === '' || u.name.toLowerCase().includes(mentionSearch.toLowerCase())
  );

  const handleMention = (user: { id: string; name: string }) => {
    const mentionText = `@${user.name}`;
    if (replyingTo) {
      setReplyContent((prev) => prev + mentionText + ' ');
    } else {
      setNewComment((prev) => prev + mentionText + ' ');
    }
    setSelectedMentions((prev) => [...prev, user.id]);
    setShowMentionPopover(false);
    setMentionSearch('');
  };

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;
    const mentionMatches = newComment.match(/@[\w\s]+/g) || [];
    const mentionIds = mentionMatches
      .map((m) => {
        const name = m.substring(1);
        const user = [...staff, ...students].find((u) => u.name === name);
        return user?.id;
      })
      .filter(Boolean) as string[];

    const hasRequiresAction =
      newComment.includes('?') ||
      newComment.toLowerCase().includes('please') ||
      newComment.toLowerCase().includes('can you') ||
      mentionIds.length > 0;

    addComment({
      contextType,
      contextId,
      authorId: currentUserId,
      authorName: currentUserName,
      authorRole: currentUserRole,
      authorInitials: currentUserInitials,
      content: newComment,
      mentions: mentionIds,
      requiresAction: hasRequiresAction,
      actionOwner: mentionIds[0],
      isResolved: false,
      createdAt: new Date().toISOString(),
    });

    setNewComment('');
    setSelectedMentions([]);
  };

  const handleSubmitReply = (parentId: string) => {
    if (!replyContent.trim()) return;
    const mentionMatches = replyContent.match(/@[\w\s]+/g) || [];
    const mentionIds = mentionMatches
      .map((m) => {
        const name = m.substring(1);
        const user = [...staff, ...students].find((u) => u.name === name);
        return user?.id;
      })
      .filter(Boolean) as string[];

    addComment({
      contextType,
      contextId,
      parentId,
      authorId: currentUserId,
      authorName: currentUserName,
      authorRole: currentUserRole,
      authorInitials: currentUserInitials,
      content: replyContent,
      mentions: mentionIds,
      requiresAction: mentionIds.length > 0,
      actionOwner: mentionIds[0],
      isResolved: false,
      createdAt: new Date().toISOString(),
    });

    setReplyContent('');
    setReplyingTo(null);
    setSelectedMentions([]);
  };

  const handleResolve = (commentId: string) => {
    resolveComment(commentId, currentUserId, currentUserName);
  };

  const roleTone = (role: string): Tone =>
    role === 'tutor'
      ? 'blue'
      : role === 'assessor'
        ? 'emerald'
        : role === 'iqa'
          ? 'amber'
          : role === 'head_of_department'
            ? 'purple'
            : role === 'student'
              ? 'yellow'
              : 'yellow';

  const roleAvatarClass = (role: string) =>
    role === 'tutor'
      ? 'bg-blue-500/10 text-blue-400'
      : role === 'assessor'
        ? 'bg-emerald-500/10 text-emerald-400'
        : role === 'iqa'
          ? 'bg-amber-500/10 text-amber-400'
          : role === 'head_of_department'
            ? 'bg-purple-500/10 text-purple-400'
            : role === 'student'
              ? 'bg-elec-yellow/10 text-elec-yellow'
              : 'bg-white/[0.06] text-white/70';

  const formatRole = (role: string) => {
    switch (role) {
      case 'tutor':
        return 'Tutor';
      case 'assessor':
        return 'Assessor';
      case 'iqa':
        return 'IQA';
      case 'head_of_department':
        return 'HoD';
      case 'student':
        return 'Student';
      case 'admin':
        return 'Admin';
      case 'support':
        return 'Support';
      default:
        return role;
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  };

  const highlightMentions = (text: string) => {
    const parts = text.split(/(@[\w\s]+)/g);
    return parts.map((part, i) => {
      if (part.startsWith('@')) {
        return (
          <span key={i} className="text-elec-yellow font-medium">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  const renderMentionPopover = () => (
    <Popover open={showMentionPopover} onOpenChange={setShowMentionPopover}>
      <PopoverTrigger asChild>
        <button
          className="h-11 px-3 text-[12px] font-medium text-white/70 hover:text-white bg-[hsl(0_0%_12%)] border border-white/[0.08] rounded-xl transition-colors touch-manipulation"
          aria-label="Mention"
        >
          @
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-72 p-3 bg-[hsl(0_0%_12%)] border border-white/[0.08] rounded-2xl"
        align="end"
      >
        <input
          type="text"
          placeholder="Search users…"
          value={mentionSearch}
          onChange={(e) => setMentionSearch(e.target.value)}
          className="w-full h-10 px-3 bg-[hsl(0_0%_9%)] border border-white/[0.08] rounded-xl text-[13px] text-white placeholder:text-white/65 focus:outline-none focus:border-elec-yellow/60 mb-2"
        />
        <div className="max-h-[200px] overflow-y-auto space-y-0.5">
          {mentionableUsers.slice(0, 10).map((user) => (
            <button
              key={user.id}
              onClick={() => handleMention(user)}
              className="w-full flex items-center gap-2.5 px-2 py-2 text-[13px] hover:bg-white/[0.04] rounded-lg text-left transition-colors touch-manipulation"
            >
              <Avatar className="h-7 w-7 shrink-0">
                <AvatarFallback className={cn('text-[10px]', roleAvatarClass(user.role))}>
                  {user.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="text-white truncate">{user.name}</div>
                <div className="text-[11px] text-white/75">{formatRole(user.role)}</div>
              </div>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );

  const renderComment = (comment: CollegeComment, isReply = false) => {
    const replies = getReplies(comment.id);

    return (
      <div key={comment.id} className={cn(isReply ? 'ml-8 mt-3' : '')}>
        <div className={cn('flex gap-3', comment.isResolved ? 'opacity-60' : '')}>
          <Avatar className="h-8 w-8 shrink-0">
            <AvatarFallback
              className={cn('text-[11px] font-semibold', roleAvatarClass(comment.authorRole))}
            >
              {comment.authorInitials}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-medium text-[13px] text-white">{comment.authorName}</span>
                <Pill tone={roleTone(comment.authorRole)}>{formatRole(comment.authorRole)}</Pill>
                <span className="text-[11px] text-white/70 tabular-nums">
                  {formatDate(comment.createdAt)}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                {comment.requiresAction && !comment.isResolved && (
                  <Pill tone="amber">Action</Pill>
                )}
                {comment.isResolved && <Pill tone="green">Resolved</Pill>}
                {!readOnly && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        className="text-white/75 hover:text-white text-[16px] leading-none px-1 touch-manipulation"
                        aria-label="Options"
                      >
                        ⋯
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setReplyingTo(comment.id)}>
                        Reply
                      </DropdownMenuItem>
                      {comment.requiresAction && !comment.isResolved && (
                        <DropdownMenuItem onClick={() => handleResolve(comment.id)}>
                          Mark resolved
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </div>

            <p className="text-[13px] text-white/80 mt-1.5 whitespace-pre-wrap leading-relaxed">
              {highlightMentions(comment.content)}
            </p>

            {comment.isResolved && comment.resolvedByName && (
              <p className="mt-1.5 text-[11px] text-white/70 tabular-nums">
                Resolved by {comment.resolvedByName} on{' '}
                {new Date(comment.resolvedAt!).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                })}
              </p>
            )}

            {replyingTo === comment.id && !readOnly && (
              <div className="mt-3 flex gap-2">
                <Textarea
                  placeholder="Write a reply…"
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="min-h-[60px] text-[13px] bg-[hsl(0_0%_9%)] border-white/[0.08] text-white placeholder:text-white/65 focus:border-elec-yellow/60 resize-none"
                  rows={2}
                />
                <div className="flex flex-col gap-1.5">
                  {renderMentionPopover()}
                  <button
                    onClick={() => handleSubmitReply(comment.id)}
                    disabled={!replyContent.trim()}
                    className="h-11 px-4 bg-elec-yellow text-black rounded-xl text-[12.5px] font-semibold hover:opacity-90 disabled:opacity-40 transition-opacity touch-manipulation"
                  >
                    Send
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {replies.length > 0 && (
          <div className="border-l-2 border-white/[0.06] pl-2 ml-4 mt-3">
            {replies.map((reply) => renderComment(reply, true))}
          </div>
        )}
      </div>
    );
  };

  const actionCount = comments.filter((c) => c.requiresAction && !c.isResolved).length;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/55">
          Comments · {comments.length}
        </div>
        {actionCount > 0 && <Pill tone="amber">{actionCount} need action</Pill>}
      </div>

      {!readOnly && (
        <div className="flex gap-3">
          <Avatar className="h-8 w-8 shrink-0">
            <AvatarFallback
              className={cn('text-[11px] font-semibold', roleAvatarClass(currentUserRole))}
            >
              {currentUserInitials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 flex gap-2">
            <Textarea
              placeholder="Add a comment… use @ to mention someone"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[60px] text-[13px] bg-[hsl(0_0%_9%)] border-white/[0.08] text-white placeholder:text-white/65 focus:border-elec-yellow/60 resize-none"
              rows={2}
            />
            <div className="flex flex-col gap-1.5">
              {renderMentionPopover()}
              <button
                onClick={handleSubmitComment}
                disabled={!newComment.trim()}
                className="h-11 px-4 bg-elec-yellow text-black rounded-xl text-[12.5px] font-semibold hover:opacity-90 disabled:opacity-40 transition-opacity touch-manipulation"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-5">
        {topLevelComments.length === 0 ? (
          <p className="text-[12.5px] text-white/70 text-center py-6">
            No comments yet. Be the first to add one.
          </p>
        ) : (
          topLevelComments.map((comment) => renderComment(comment))
        )}
      </div>
    </div>
  );
}
