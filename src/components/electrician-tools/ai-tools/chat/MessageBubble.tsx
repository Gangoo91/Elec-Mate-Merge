import React, { memo, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, User, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';

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
 * MessageBubble - Styled message bubble for chat interfaces
 *
 * Features:
 * - Different styling for user vs assistant
 * - Copy button on hover/tap
 * - Smooth animations
 * - Mobile-optimized tap targets
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
  const [showCopyButton, setShowCopyButton] = useState(false);
  const haptic = useHaptic();

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(content);
      setIsCopied(true);
      haptic.success();
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      haptic.error();
    }
  }, [content, haptic]);

  const isUser = role === 'user';

  return (
    <motion.div
      initial={isStreaming ? false : { opacity: 0, y: 10, x: isUser ? 10 : -10 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={cn(
        "flex w-full",
        isUser ? "justify-end" : "justify-start",
        className
      )}
      onMouseEnter={() => setShowCopyButton(true)}
      onMouseLeave={() => setShowCopyButton(false)}
      onTouchStart={() => setShowCopyButton(true)}
    >
      <div
        className={cn(
          "relative group",
          isUser ? "max-w-[85%] sm:max-w-[75%]" : "max-w-[95%] sm:max-w-[85%]"
        )}
      >
        {/* Avatar for assistant */}
        {!isUser && (
          <div className="flex items-start gap-3">
            <div className="shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-elec-yellow to-elec-yellow/80 flex items-center justify-center shadow-sm">
              <Zap className="w-4 h-4 text-elec-dark" />
            </div>
            <div className="flex-1 min-w-0">
              {/* Assistant name */}
              <div className="text-xs text-muted-foreground mb-1 font-medium">
                BS 7671 Assistant
              </div>
              {/* Message bubble */}
              <div
                className={cn(
                  "rounded-2xl rounded-tl-sm px-4 py-3",
                  "bg-card/80 backdrop-blur-sm",
                  "border border-border/50",
                  "shadow-sm"
                )}
              >
                {renderContent ? renderContent(content) : (
                  <div className="text-foreground whitespace-pre-wrap break-words">
                    {content}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* User message */}
        {isUser && (
          <div className="flex items-start gap-3">
            <div
              className={cn(
                "rounded-2xl rounded-tr-sm px-4 py-3",
                "bg-gradient-to-br from-elec-yellow to-elec-yellow/90",
                "text-elec-dark",
                "shadow-lg shadow-elec-yellow/20"
              )}
            >
              <div className="whitespace-pre-wrap break-words font-medium">
                {content}
              </div>
            </div>
            <div className="shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-elec-dark to-elec-dark/80 flex items-center justify-center border border-border/50">
              <User className="w-4 h-4 text-foreground/80" />
            </div>
          </div>
        )}

        {/* Copy button */}
        {!isStreaming && content && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: showCopyButton ? 1 : 0,
              scale: showCopyButton ? 1 : 0.8
            }}
            onClick={handleCopy}
            className={cn(
              "absolute -bottom-2 p-1.5 rounded-lg",
              "bg-card/90 backdrop-blur-sm border border-border/50",
              "shadow-sm hover:shadow-md transition-all",
              "text-muted-foreground hover:text-foreground",
              isUser ? "left-0" : "right-0"
            )}
            aria-label="Copy message"
          >
            {isCopied ? (
              <Check className="w-3.5 h-3.5 text-green-500" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </motion.button>
        )}

        {/* Timestamp */}
        {timestamp && !isStreaming && (
          <div
            className={cn(
              "text-[10px] text-muted-foreground/60 mt-1",
              isUser ? "text-right mr-11" : "text-left ml-11"
            )}
          >
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        )}
      </div>
    </motion.div>
  );
});

export default MessageBubble;
