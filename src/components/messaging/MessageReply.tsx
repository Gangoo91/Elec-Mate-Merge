import { cn } from '@/lib/utils';
import { X, Reply, CornerDownRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface ReplyToMessage {
  id: string;
  content: string;
  senderName: string;
  senderId: string;
}

interface ReplyPreviewProps {
  replyTo: ReplyToMessage;
  onClear?: () => void;
  className?: string;
}

/**
 * Reply preview shown above the message input when replying
 */
export function ReplyPreview({ replyTo, onClear, className }: ReplyPreviewProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 px-3 py-2 bg-muted/50 border-l-2 border-elec-yellow rounded-r-lg',
        className
      )}
    >
      <Reply className="h-4 w-4 text-muted-foreground shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-elec-yellow truncate">
          Replying to {replyTo.senderName}
        </p>
        <p className="text-xs text-muted-foreground truncate">
          {replyTo.content}
        </p>
      </div>
      {onClear && (
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 shrink-0"
          onClick={onClear}
        >
          <X className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
}

/**
 * Inline reply quote shown in a message bubble
 */
interface ReplyQuoteProps {
  replyTo: ReplyToMessage;
  isOwnMessage?: boolean;
  onClick?: () => void;
  className?: string;
}

export function ReplyQuote({
  replyTo,
  isOwnMessage = false,
  onClick,
  className,
}: ReplyQuoteProps) {
  return (
    <div
      className={cn(
        'flex items-start gap-2 px-2 py-1.5 rounded-lg mb-1 cursor-pointer hover:opacity-80 transition-opacity',
        isOwnMessage ? 'bg-black/10' : 'bg-muted',
        className
      )}
      onClick={onClick}
    >
      <div
        className={cn(
          'w-0.5 rounded-full self-stretch shrink-0',
          isOwnMessage ? 'bg-black/30' : 'bg-elec-yellow'
        )}
      />
      <div className="min-w-0 flex-1">
        <p
          className={cn(
            'text-[10px] font-medium truncate',
            isOwnMessage ? 'text-black/70' : 'text-elec-yellow'
          )}
        >
          {replyTo.senderName}
        </p>
        <p
          className={cn(
            'text-[11px] truncate',
            isOwnMessage ? 'text-black/60' : 'text-muted-foreground'
          )}
        >
          {replyTo.content}
        </p>
      </div>
    </div>
  );
}

/**
 * Thread indicator for messages that have replies
 */
interface ThreadIndicatorProps {
  replyCount: number;
  lastReplyAt?: string;
  onClick?: () => void;
  className?: string;
}

export function ThreadIndicator({
  replyCount,
  lastReplyAt,
  onClick,
  className,
}: ThreadIndicatorProps) {
  if (replyCount === 0) return null;

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMins = Math.floor((now.getTime() - date.getTime()) / 60000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-1 text-xs text-blue-500 hover:text-blue-600 hover:underline mt-1',
        className
      )}
    >
      <CornerDownRight className="h-3 w-3" />
      <span>
        {replyCount} {replyCount === 1 ? 'reply' : 'replies'}
        {lastReplyAt && (
          <span className="text-muted-foreground ml-1">
            · {formatTime(lastReplyAt)}
          </span>
        )}
      </span>
    </button>
  );
}

/**
 * Reply action button for message context menu
 */
interface ReplyButtonProps {
  onClick: () => void;
  className?: string;
}

export function ReplyButton({ onClick, className }: ReplyButtonProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn('h-8 px-2 gap-1', className)}
      onClick={onClick}
    >
      <Reply className="h-3.5 w-3.5" />
      <span className="text-xs">Reply</span>
    </Button>
  );
}

/**
 * Thread view header
 */
interface ThreadHeaderProps {
  originalMessage: {
    content: string;
    senderName: string;
    sentAt: string;
  };
  replyCount: number;
  onClose: () => void;
  className?: string;
}

export function ThreadHeader({
  originalMessage,
  replyCount,
  onClose,
  className,
}: ThreadHeaderProps) {
  return (
    <div className={cn('border-b border-border', className)}>
      <div className="flex items-center justify-between p-3">
        <div>
          <h3 className="font-semibold">Thread</h3>
          <p className="text-xs text-muted-foreground">
            {replyCount} {replyCount === 1 ? 'reply' : 'replies'}
          </p>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Original message */}
      <div className="px-3 pb-3">
        <div className="bg-muted/50 rounded-lg p-3 border-l-2 border-elec-yellow">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-sm">{originalMessage.senderName}</span>
            <span className="text-xs text-muted-foreground">
              {new Date(originalMessage.sentAt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
          <p className="text-sm">{originalMessage.content}</p>
        </div>
      </div>
    </div>
  );
}
