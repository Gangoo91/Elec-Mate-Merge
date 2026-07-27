/**
 * ChatThread — the one message thread used by every messaging surface.
 *
 * ELE-1417 / ELE-1415. There were two separate chat implementations: the admin
 * inbox (editorial system, yellow) and the user-facing MessagesSheet (blue and
 * red bubbles, off-brand, 1,200+ lines). They looked nothing like each other and
 * they drifted apart in behaviour too — the bug in ELE-1416 existed on one side
 * only. One component means one design and one set of behaviour to fix.
 *
 * Design follows the house language: quiet raised surfaces, exactly one accent
 * (elec-yellow, spent on your own messages), high-contrast text, hairline
 * separators, 44px touch targets, no gradients or glow.
 */

import { useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent } from 'react';
import { Loader2, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ChatMessage {
  id: string;
  body: string;
  createdAt: string;
  /** True when our side wrote it — drives which side the bubble sits on. */
  isOwn: boolean;
  /**
   * Who on our side wrote it, when that is not the viewer. The admin inbox is a
   * team inbox with several admins, so "own side" is not the same as "me" —
   * without this, a colleague's reply reads as your own.
   */
  authorLabel?: string;
  /** Optimistic rows render dimmed until the insert confirms. */
  pending?: boolean;
  failed?: boolean;
}

interface ChatThreadProps {
  messages: ChatMessage[];
  /**
   * Return a promise to get failure handling: a rejected send flips its
   * optimistic bubble to "Not sent" instead of silently disappearing.
   */
  onSend: (body: string) => void | Promise<unknown>;
  isSending?: boolean;
  disabled?: boolean;
  placeholder?: string;
  /** Shown when there are no messages yet. */
  emptyState?: React.ReactNode;
  className?: string;
}

/** Day separator label — "Today"/"Yesterday" beat a date nobody parses. */
function dayLabel(date: Date): string {
  const today = new Date();
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
  const day = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  const diffDays = Math.round((startOfToday - day) / 86_400_000);
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return date.toLocaleDateString('en-GB', { weekday: 'long' });
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    ...(date.getFullYear() !== today.getFullYear() ? { year: 'numeric' } : {}),
  });
}

const timeLabel = (date: Date) =>
  date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

export function ChatThread({
  messages,
  onSend,
  isSending = false,
  disabled = false,
  placeholder = 'Write a message…',
  emptyState,
  className,
}: ChatThreadProps) {
  const [draft, setDraft] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const hasPaintedRef = useRef(false);

  /**
   * Messages sent from this composer that the server has not echoed back yet.
   * Without these the text vanishes from the box on send and nothing appears
   * until the next refetch, which reads as the message having been lost.
   */
  const [optimistic, setOptimistic] = useState<ChatMessage[]>([]);

  // Any real message arriving means the send landed — drop the placeholders.
  // Matching on body would break for someone sending the same line twice, so
  // clear on the count growing instead.
  const realCount = messages.length;
  const prevRealCountRef = useRef(realCount);
  useEffect(() => {
    if (realCount > prevRealCountRef.current) setOptimistic((prev) => prev.filter((m) => m.failed));
    prevRealCountRef.current = realCount;
  }, [realCount]);

  const rendered = optimistic.length ? [...messages, ...optimistic] : messages;

  // Pin to the newest message. useLayoutEffect so it happens before paint —
  // with useEffect you see the thread jump after it has rendered. The very
  // first paint must be instant: a thread should open already at the bottom,
  // not animate down through the history.
  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: hasPaintedRef.current ? 'smooth' : 'auto' });
    hasPaintedRef.current = true;
  }, [rendered.length]);

  // Grow the composer with the content instead of scrolling a one-line box.
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 140)}px`;
  }, [draft]);

  const send = () => {
    const body = draft.trim();
    if (!body || disabled || isSending) return;

    const localId = `optimistic-${Date.now()}`;
    setOptimistic((prev) => [
      ...prev,
      { id: localId, body, createdAt: new Date().toISOString(), isOwn: true, pending: true },
    ]);
    setDraft('');

    // If the caller reports failure, keep the bubble and mark it — losing the
    // text on a failed send is the worst outcome, because it is usually
    // something the person just typed and cannot easily retype.
    Promise.resolve(onSend(body)).catch(() => {
      setOptimistic((prev) =>
        prev.map((m) => (m.id === localId ? { ...m, pending: false, failed: true } : m))
      );
    });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter sends, Shift+Enter breaks the line. On touch keyboards Enter should
    // insert a newline instead — there is no Shift key to reach for.
    const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
    if (e.key === 'Enter' && !e.shiftKey && !isTouch) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className={cn('flex flex-col h-full min-h-0', className)}>
      <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto px-4 py-4">
        {rendered.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            {emptyState ?? (
              <p className="text-[13.5px] text-white/60">No messages yet.</p>
            )}
          </div>
        ) : (
          <div className="space-y-1">
            {rendered.map((msg, i) => {
              const prev = rendered[i - 1];
              const next = rendered[i + 1];
              const created = new Date(msg.createdAt);

              const newDay =
                !prev || new Date(prev.createdAt).toDateString() !== created.toDateString();

              // Group consecutive messages from the same side within 5 minutes:
              // one tail and one timestamp per group, not per line.
              const contiguous =
                !!prev &&
                prev.isOwn === msg.isOwn &&
                created.getTime() - new Date(prev.createdAt).getTime() < 5 * 60_000 &&
                !newDay;
              const endsGroup =
                !next ||
                next.isOwn !== msg.isOwn ||
                new Date(next.createdAt).getTime() - created.getTime() >= 5 * 60_000 ||
                new Date(next.createdAt).toDateString() !== created.toDateString();

              return (
                <div key={msg.id}>
                  {newDay && (
                    <div className="flex items-center gap-3 py-4">
                      <div className="h-px flex-1 bg-white/[0.10]" />
                      <span className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-white/60">
                        {dayLabel(created)}
                      </span>
                      <div className="h-px flex-1 bg-white/[0.10]" />
                    </div>
                  )}

                  <div
                    className={cn(
                      'flex',
                      msg.isOwn ? 'justify-end' : 'justify-start',
                      contiguous ? 'mt-0.5' : 'mt-3'
                    )}
                  >
                    <div className={cn('max-w-[78%] min-w-0', msg.isOwn && 'items-end')}>
                      {/* Team inbox: say who on our side wrote it when it was
                          not the viewer, otherwise a colleague's reply reads as
                          your own. Only on the first bubble of a group. */}
                      {msg.isOwn && msg.authorLabel && !contiguous && (
                        <p className="mb-1 px-1 text-right text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/55">
                          {msg.authorLabel}
                        </p>
                      )}
                      <div
                        className={cn(
                          'px-3.5 py-2.5 text-[14px] leading-[1.5] whitespace-pre-wrap break-words rounded-2xl',
                          msg.isOwn
                            ? 'bg-elec-yellow text-black font-medium'
                            : 'bg-white/[0.07] border border-white/[0.10] text-white',
                          // Tighten the corner nearest the tail, and only on the
                          // last message of a group so a run reads as one block.
                          msg.isOwn && endsGroup && 'rounded-br-md',
                          !msg.isOwn && endsGroup && 'rounded-bl-md',
                          msg.pending && 'opacity-60',
                          msg.failed && 'ring-1 ring-red-400/60'
                        )}
                      >
                        {msg.body}
                      </div>

                      {endsGroup && (
                        <div
                          className={cn(
                            'flex items-center gap-1.5 mt-1 px-1',
                            msg.isOwn ? 'justify-end' : 'justify-start'
                          )}
                        >
                          <span className="text-[10.5px] tabular-nums text-white/50">
                            {timeLabel(created)}
                          </span>
                          {msg.pending && (
                            <span className="text-[10.5px] text-white/50">Sending…</span>
                          )}
                          {msg.failed && (
                            <span className="text-[10.5px] font-semibold text-red-400">
                              Not sent
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Composer — sits on its own surface so it reads as a distinct control
          strip, and clears the iOS home indicator. */}
      <div className="shrink-0 border-t border-white/[0.10] bg-white/[0.03] px-3 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="flex items-end gap-2">
          <textarea
            ref={textareaRef}
            rows={1}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            // ELE-1419 — the OS was capitalising the first letter of every
            // message, which is wrong for names and lowercase technical terms.
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            className={cn(
              'flex-1 min-w-0 resize-none rounded-2xl bg-white/[0.06] border border-white/[0.12]',
              'px-4 py-3 text-[14px] leading-[1.4] text-white placeholder:text-white/40',
              'focus:outline-none focus:border-elec-yellow/60 touch-manipulation',
              'disabled:opacity-50'
            )}
          />
          <button
            type="button"
            onClick={send}
            disabled={!draft.trim() || disabled || isSending}
            aria-label="Send message"
            className={cn(
              'h-11 w-11 shrink-0 rounded-full flex items-center justify-center touch-manipulation transition-colors',
              draft.trim() && !disabled && !isSending
                ? 'bg-elec-yellow text-black'
                : 'bg-white/[0.08] text-white/40'
            )}
          >
            {isSending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatThread;
