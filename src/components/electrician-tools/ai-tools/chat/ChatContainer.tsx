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
 * ChatContainer - Premium Full-height Chat Interface
 *
 * Features:
 * - Full viewport height with safe area padding
 * - Premium ambient gradient background
 * - Native momentum scrolling on mobile
 * - Fixed input area at bottom (via children)
 */
export function ChatContainer({
  children,
  className,
}: ChatContainerProps) {
  return (
    <div
      className={cn(
        // Fill parent container (not 100dvh - parent handles that)
        "flex flex-col h-full w-full",
        // Premium ambient background
        "bg-gradient-to-br from-background via-background to-background/98",
        "overflow-hidden relative",
        className
      )}
    >
      {/* Subtle ambient glow effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-elec-yellow/[0.03] rounded-full blur-3xl" />
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-elec-blue/[0.03] rounded-full blur-3xl" />
      </div>
      <div className="relative flex flex-col h-full z-10">
        {children}
      </div>
    </div>
  );
}

interface ChatMessagesAreaProps {
  children: React.ReactNode;
  className?: string;
  /** Called when user scrolls to top (for loading more messages) */
  onScrollTop?: () => void;
  /** Called on any scroll event - for tracking scroll position */
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
  /** Auto-scroll to bottom when new messages arrive */
  autoScrollToBottom?: boolean;
  /** Ref for the messages end element */
  messagesEndRef?: React.RefObject<HTMLDivElement>;
}

/**
 * ChatMessagesArea - Premium Scrollable Message Container
 */
export function ChatMessagesArea({
  children,
  className,
  onScrollTop,
  onScroll,
  autoScrollToBottom = true,
  messagesEndRef
}: ChatMessagesAreaProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const { scrollTop } = el;

    // Load more messages when scrolled to top
    if (scrollTop < 50 && onScrollTop) {
      onScrollTop();
    }

    // Pass scroll event to parent for position tracking
    onScroll?.(e);
  }, [onScrollTop, onScroll]);

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className={cn(
        "flex-1 overflow-y-auto overscroll-none",
        // Native momentum scrolling on iOS
        "scroll-smooth webkit-overflow-scrolling-touch",
        // Custom scrollbar styling
        "scrollbar-thin scrollbar-thumb-border/40 scrollbar-track-transparent",
        "hover:scrollbar-thumb-border/60",
        className
      )}
      style={{
        WebkitOverflowScrolling: 'touch',
      }}
    >
      <div className="min-h-full flex flex-col justify-end">
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
 * ChatInputArea - Fixed Bottom Input Container (ChatGPT-style)
 */
export function ChatInputArea({ children, className }: ChatInputAreaProps) {
  return (
    <div
      className={cn(
        // Fixed at bottom, not sticky
        "shrink-0 z-20",
        // Premium gradient backdrop
        "bg-gradient-to-t from-background via-background to-background/95",
        "backdrop-blur-xl",
        // Safe area padding for mobile
        "pb-safe pt-1.5 px-2 sm:px-3",
        className
      )}
    >
      {/* Top border with gradient fade */}
      <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-border/30 to-transparent" />
      {children}
    </div>
  );
}

export default ChatContainer;
