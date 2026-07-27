import React, { useCallback } from 'react';
import { cn } from '@/lib/utils';

/**
 * Extends the div props so callers can attach drag-and-drop (and any other
 * native handlers) to the shell without this component having to enumerate
 * them. `children`/`className` stay explicit for clarity.
 */
interface ChatContainerProps extends React.HTMLAttributes<HTMLDivElement> {
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
export function ChatContainer({
  children,
  className,
  scrollRef: _scrollRef,
  smoothScroll: _smoothScroll,
  ...divProps
}: ChatContainerProps) {
  return (
    <div
      {...divProps}
      className={cn(
        'flex flex-col h-full w-full min-w-0 bg-[#0a0a0a] overflow-hidden relative',
        className
      )}
      /*
       * Landscape safe area. The app isn't orientation-locked, so on a notched
       * phone held sideways the notch and the rounded corners eat into the left
       * or right edge — text and the send button ended up underneath them.
       * Applied once here so everything in the chat is inset; resolves to 0 on
       * devices without insets, so nothing changes in portrait or on desktop.
       */
      style={{
        paddingLeft: 'env(safe-area-inset-left, 0px)',
        paddingRight: 'env(safe-area-inset-right, 0px)',
      }}
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
  /**
   * Exposes the scroll container to the caller. Needed because scroll position
   * can change without a scroll event: while an answer streams, the content
   * grows underneath a stationary viewport, so `onScroll` alone never fires and
   * any derived "is the user near the bottom" state goes stale.
   */
  scrollContainerRef?: React.MutableRefObject<HTMLDivElement | null>;
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
  scrollContainerRef,
}: ChatMessagesAreaProps) {
  // No local container ref: it was declared but never read, and assigning to a
  // `useRef<T>(null)` is a type error anyway (its `current` is readonly). The
  // caller's optional ref is the only consumer.

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
      ref={(el) => {
        if (scrollContainerRef) scrollContainerRef.current = el;
      }}
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
