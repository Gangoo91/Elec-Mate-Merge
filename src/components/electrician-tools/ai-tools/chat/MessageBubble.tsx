import React, { memo, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';
import { copyToClipboard } from '@/utils/clipboard';

interface MessageBubbleProps {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
  isStreaming?: boolean;
  className?: string;
  /** Render custom content for assistant messages */
  renderContent?: (content: string) => React.ReactNode;
}

/**
 * MessageBubble — Editorial message surface.
 *
 * User: right-aligned on a bright neutral surface. A yellow tint at 10% over
 * this background renders olive-brown, which read as a rendering fault rather
 * than as the user's own words.
 * Assistant: full-width prose block, no chrome — reads like an article.
 * Copy action is a plain text button. Timestamp muted, 11px, below the message.
 */
export const MessageBubble = memo(function MessageBubble({
  role,
  content,
  timestamp,
  isStreaming = false,
  className,
  renderContent,
}: MessageBubbleProps) {
  const [isCopied, setIsCopied] = useState(false);
  const haptic = useHaptic();

  const handleCopy = useCallback(async () => {
    try {
      await copyToClipboard(content);
      setIsCopied(true);
      haptic.success();
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      haptic.error();
    }
  }, [content, haptic]);

  const isUser = role === 'user';
  const timeLabel = timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  if (isUser) {
    return (
      <motion.div
        initial={isStreaming ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18 }}
        className={cn('flex flex-col items-end', className)}
      >
        <div
          className={cn(
            'max-w-[85%] sm:max-w-[75%]',
            'rounded-2xl px-4 py-3',
            'border border-white/[0.16] bg-white/[0.10]',
            'text-white'
          )}
        >
          <div className="whitespace-pre-wrap break-words text-[14.5px] leading-relaxed">
            {content}
          </div>
        </div>
        {timeLabel && !isStreaming && (
          <div className="mt-1 text-[11px] text-white">{timeLabel}</div>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={isStreaming ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18 }}
      className={cn('flex flex-col items-start w-full', className)}
    >
      <div className="w-full max-w-3xl text-left">
        {renderContent ? (
          renderContent(content)
        ) : (
          <div className="text-[14.5px] leading-relaxed text-white whitespace-pre-wrap break-words">
            {content}
          </div>
        )}
      </div>

      {!isStreaming && content && (
        <div className="mt-2 flex items-center gap-4 text-[11px]">
          <button
            onClick={handleCopy}
            className="font-medium text-white underline decoration-white/40 underline-offset-2 transition-colors hover:decoration-white touch-manipulation"
          >
            {isCopied ? 'Copied' : 'Copy'}
          </button>
          {timeLabel && <span className="text-white">{timeLabel}</span>}
        </div>
      )}
    </motion.div>
  );
});

export default MessageBubble;
