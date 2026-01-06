import { cn } from '@/lib/utils';
import { Check, CheckCheck, Clock } from 'lucide-react';

type ReceiptStatus = 'sending' | 'sent' | 'delivered' | 'read';

interface ReadReceiptProps {
  status: ReceiptStatus;
  readAt?: string | null;
  deliveredAt?: string | null;
  className?: string;
  showLabel?: boolean;
}

/**
 * Read receipt indicator (WhatsApp-style double ticks)
 */
export function ReadReceipt({
  status,
  readAt,
  deliveredAt,
  className,
  showLabel = false,
}: ReadReceiptProps) {
  const getIcon = () => {
    switch (status) {
      case 'sending':
        return <Clock className="h-3 w-3" />;
      case 'sent':
        return <Check className="h-3 w-3" />;
      case 'delivered':
        return <CheckCheck className="h-3.5 w-3.5" />;
      case 'read':
        return <CheckCheck className="h-3.5 w-3.5" />;
      default:
        return null;
    }
  };

  const getColor = () => {
    switch (status) {
      case 'sending':
        return 'text-muted-foreground/50';
      case 'sent':
        return 'text-muted-foreground';
      case 'delivered':
        return 'text-muted-foreground';
      case 'read':
        return 'text-blue-500';
      default:
        return 'text-muted-foreground';
    }
  };

  const getLabel = () => {
    switch (status) {
      case 'sending':
        return 'Sending...';
      case 'sent':
        return 'Sent';
      case 'delivered':
        return 'Delivered';
      case 'read':
        return readAt ? `Read ${formatTime(readAt)}` : 'Read';
      default:
        return '';
    }
  };

  return (
    <span className={cn('inline-flex items-center gap-1', getColor(), className)}>
      {getIcon()}
      {showLabel && <span className="text-[10px]">{getLabel()}</span>}
    </span>
  );
}

/**
 * Determine receipt status from message data
 */
export function getReceiptStatus(
  sentAt: string | null,
  deliveredAt: string | null,
  readAt: string | null,
  isOptimistic?: boolean
): ReceiptStatus {
  if (isOptimistic || !sentAt) return 'sending';
  if (readAt) return 'read';
  if (deliveredAt) return 'delivered';
  return 'sent';
}

/**
 * Format timestamp for receipt label
 */
function formatTime(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;

  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

/**
 * Enhanced read receipt with tooltip
 */
interface ReadReceiptWithTooltipProps extends ReadReceiptProps {
  sentAt?: string | null;
}

export function ReadReceiptDetailed({
  status,
  sentAt,
  deliveredAt,
  readAt,
  className,
}: ReadReceiptWithTooltipProps) {
  const formatDateTime = (timestamp: string | null | undefined) => {
    if (!timestamp) return null;
    return new Date(timestamp).toLocaleString([], {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const tooltip = [
    sentAt && `Sent: ${formatDateTime(sentAt)}`,
    deliveredAt && `Delivered: ${formatDateTime(deliveredAt)}`,
    readAt && `Read: ${formatDateTime(readAt)}`,
  ].filter(Boolean).join('\n');

  return (
    <span title={tooltip} className={cn('cursor-help', className)}>
      <ReadReceipt
        status={status}
        readAt={readAt}
        deliveredAt={deliveredAt}
      />
    </span>
  );
}

/**
 * Typing indicator animation (three bouncing dots)
 */
export function TypingIndicator({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-1 px-3 py-2', className)}>
      <span className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce [animation-delay:-0.3s]" />
      <span className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce [animation-delay:-0.15s]" />
      <span className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" />
    </div>
  );
}

/**
 * Typing indicator with user name
 */
interface TypingIndicatorWithNameProps {
  userName: string;
  className?: string;
}

export function TypingIndicatorWithName({ userName, className }: TypingIndicatorWithNameProps) {
  return (
    <div className={cn('flex items-center gap-2 text-sm text-muted-foreground', className)}>
      <TypingIndicator />
      <span>{userName} is typing...</span>
    </div>
  );
}
