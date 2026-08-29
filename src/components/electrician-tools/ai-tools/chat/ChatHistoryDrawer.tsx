import { memo, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import type { AIChatSession } from '@/hooks/useAIChatHistory';
import { cn } from '@/lib/utils';

function formatDayEyebrow(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const isSameDay =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();

  if (isSameDay) return 'TODAY';

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);
  const isYesterday =
    date.getFullYear() === yesterday.getFullYear() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getDate() === yesterday.getDate();
  if (isYesterday) return 'YESTERDAY';

  return date
    .toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })
    .toUpperCase();
}

/**
 * Previews are stored as raw answer text, so they open with markdown noise —
 * "**Verdict:** NON-COMPLIANT…". One line of plain prose is all a preview is
 * for; strip the syntax rather than render it.
 */
function cleanPreview(raw: string): string {
  return raw
    .replace(/[*_`#>]/g, '')
    .replace(/^\s*Verdict:\s*/i, '')
    .replace(/\s+/g, ' ')
    .trim();
}

interface ChatHistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  sessions: AIChatSession[];
  isLoading: boolean;
  currentSessionId: string | null;
  onSelectSession: (id: string) => void;
  onDeleteSession: (id: string) => void;
  onNewChat: () => void;
}

export const ChatHistoryDrawer = memo(function ChatHistoryDrawer({
  isOpen,
  onClose,
  sessions,
  isLoading,
  currentSessionId,
  onSelectSession,
  onDeleteSession,
  onNewChat,
}: ChatHistoryDrawerProps) {
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const handleSelect = useCallback(
    (id: string) => {
      onSelectSession(id);
      onClose();
    },
    [onSelectSession, onClose]
  );

  const handleNewChat = useCallback(() => {
    onNewChat();
    onClose();
  }, [onNewChat, onClose]);

  const handleDelete = useCallback(
    (e: React.MouseEvent, id: string) => {
      e.stopPropagation();
      if (confirmDeleteId === id) {
        onDeleteSession(id);
        setConfirmDeleteId(null);
      } else {
        setConfirmDeleteId(id);
        setTimeout(() => setConfirmDeleteId(null), 3000);
      }
    },
    [confirmDeleteId, onDeleteSession]
  );

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="max-h-[85vh] bg-elec-dark border-white/[0.08]">
        {/* Header — title + actions, closed by the same volt hairline the
            answer cards wear, so the sheet reads as part of the same system. */}
        <div className="relative flex-shrink-0 px-5 pt-4 pb-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-[17px] font-semibold text-white tracking-tight">History</h2>
            <div className="flex items-center gap-1 shrink-0 text-[12.5px] font-medium">
              <button
                onClick={handleNewChat}
                className="flex h-11 items-center px-2.5 font-semibold text-elec-yellow transition-colors touch-manipulation [-webkit-tap-highlight-color:transparent]"
              >
                New chat
              </button>
              <button
                onClick={onClose}
                className="flex h-11 items-center px-2.5 text-white transition-colors touch-manipulation [-webkit-tap-highlight-color:transparent]"
                aria-label="Close history"
              >
                Close
              </button>
            </div>
          </div>
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/40 to-elec-yellow/0"
          />
        </div>

        {/* Sessions list */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-4">
          {isLoading && sessions.length === 0 && (
            <div className="flex items-center justify-center py-10">
              <div className="h-5 w-5 rounded-full border-2 border-elec-yellow border-t-transparent animate-spin" />
            </div>
          )}

          {!isLoading && sessions.length === 0 && (
            <div className="rounded-2xl border border-white/[0.12] bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-white/[0.03] px-6 py-10 text-center shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
              <div className="text-base font-semibold text-white">No previous chats</div>
              <p className="mt-2 text-[12.5px] text-white max-w-md mx-auto leading-relaxed">
                Start a conversation to build your chat history. Every session is saved for later
                reference.
              </p>
            </div>
          )}

          {sessions.length > 0 && (
            /* Same object as the hub work list — card-recipe surface, volt /35
               edge, hairline-divided rows. */
            <div className="rounded-2xl border border-elec-yellow/35 bg-gradient-to-br from-white/[0.10] via-white/[0.06] to-white/[0.04] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] overflow-hidden divide-y divide-white/[0.10]">
              <AnimatePresence mode="popLayout">
                {sessions.map((session) => {
                  const isActive = session.id === currentSessionId;
                  return (
                    <motion.div
                      key={session.id}
                      layout
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ duration: 0.18 }}
                      className={cn(
                        'group relative flex items-center gap-3 px-4 py-3.5 sm:px-5',
                        'hover:bg-white/[0.06] active:bg-white/[0.09] transition-colors touch-manipulation'
                      )}
                    >
                      {/* The hub work-list rule: volt marks the conversation
                          you are currently in; everything else stays quiet. */}
                      <span
                        aria-hidden="true"
                        className={cn(
                          'h-9 w-[3px] shrink-0 rounded-full',
                          isActive ? 'bg-elec-yellow' : 'bg-white/[0.25]'
                        )}
                      />
                      <button
                        onClick={() => handleSelect(session.id)}
                        className="flex-1 min-w-0 text-left [-webkit-tap-highlight-color:transparent]"
                      >
                        <div className="flex items-baseline gap-2 text-[10.5px] font-medium">
                          <span
                            className={cn(
                              'uppercase tracking-[0.16em]',
                              isActive ? 'text-elec-yellow' : 'text-white'
                            )}
                          >
                            {isActive ? 'Current chat' : formatDayEyebrow(session.updated_at)}
                          </span>
                          <span className="tabular-nums text-white">
                            · {session.message_count} messages
                          </span>
                        </div>
                        <div className="mt-1 text-[14.5px] font-semibold text-white tracking-tight truncate">
                          {session.title}
                        </div>
                        {session.last_message_preview && (
                          <div className="mt-0.5 text-[12.5px] text-white truncate leading-relaxed">
                            {cleanPreview(session.last_message_preview)}
                          </div>
                        )}
                      </button>

                      <button
                        onClick={(e) => handleDelete(e, session.id)}
                        className={cn(
                          'shrink-0 h-9 px-3 rounded-full border text-[11.5px] font-medium transition-colors touch-manipulation [-webkit-tap-highlight-color:transparent] active:scale-[0.97]',
                          confirmDeleteId === session.id
                            ? 'text-red-300 bg-red-500/10 border-red-400/30'
                            : 'text-white border-white/[0.12] bg-white/[0.05] hover:bg-white/[0.10] hover:border-white/[0.22]'
                        )}
                        aria-label={
                          confirmDeleteId === session.id ? 'Confirm delete' : 'Delete chat'
                        }
                      >
                        {confirmDeleteId === session.id ? 'Confirm' : 'Delete'}
                      </button>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
});

export default ChatHistoryDrawer;
