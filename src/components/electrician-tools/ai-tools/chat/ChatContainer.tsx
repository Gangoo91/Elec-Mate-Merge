import React, { useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface ChatContainerProps {
  children: React.ReactNode;
  className?: string;
  /** Ref to scroll to bottom */
  scrollRef?: React.RefObject<HTMLDivElement>;
  /** Enable smooth scrolling behavior */
  smoothScroll?: boolean;
}

/**
 * ChatContainer — Editorial full-height chat shell.
 *
 * Flat `bg-[#0a0a0a]` background. No ambient gradients, no glow.
 * Safe-area aware. Fills the viewport region provided by its parent.
 */
export function ChatContainer({ children, className }: ChatContainerProps) {
  return (
    <div
      className={cn(
        'flex flex-col h-full w-full min-w-0 bg-[#0a0a0a] overflow-hidden relative',
        className
      )}
    >
      <div className="relative flex flex-col h-full min-w-0 z-10">{children}</div>
    </div>
  );
}

interface ChatMessagesAreaProps {
  children: React.ReactNode;
  className?: string;
  /** Called when user scrolls to top (for loading more messages) */
  onScrollTop?: () => void;
  /** Called on any scroll event — for tracking scroll position */
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
  /** Auto-scroll to bottom when new messages arrive */
  autoScrollToBottom?: boolean;
  /** Ref for the messages end element */
  messagesEndRef?: React.RefObject<HTMLDivElement>;
}

/**
 * ChatMessagesArea — Scrollable message container.
 *
 * Native momentum scrolling on iOS. Content pins to bottom of viewport
 * when list is short, so the welcome hero sits above the input bar.
 */
export function ChatMessagesArea({
  children,
  className,
  onScrollTop,
  onScroll,
  messagesEndRef,
}: ChatMessagesAreaProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const el = e.currentTarget;
      const { scrollTop } = el;

      if (scrollTop < 50 && onScrollTop) {
        onScrollTop();
      }

      onScroll?.(e);
    },
    [onScrollTop, onScroll]
  );

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className={cn(
        'flex-1 min-w-0 overflow-y-auto overflow-x-hidden overscroll-none scroll-smooth',
        'scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent',
        className
      )}
      style={{
        WebkitOverflowScrolling: 'touch',
      }}
    >
      <div className="min-h-full min-w-0 flex flex-col justify-end">
        {children}
        {messagesEndRef && <div ref={messagesEndRef} className="h-4" />}
      </div>
    </div>
  );
}

interface ChatInputAreaProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * ChatInputArea — Sticky bottom input container.
 *
 * Solid `bg-[#0a0a0a]` surface with a single hairline on top.
 * Safe-area padding for iOS home indicator.
 */
export function ChatInputArea({ children, className }: ChatInputAreaProps) {
  return (
    <div
      className={cn(
        'shrink-0 z-20 relative bg-[#0a0a0a] border-t border-white/[0.08]',
        'pb-safe pt-2 px-3 sm:px-4',
        className
      )}
    >
      {children}
    </div>
  );
}

export default ChatContainer;
