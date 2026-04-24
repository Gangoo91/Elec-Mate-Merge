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
      <DrawerContent className="max-h-[85vh] bg-[hsl(0_0%_8%)] border-white/[0.06]">
        {/* Header */}
        <div className="flex-shrink-0 border-b border-white/[0.06] px-5 pt-4 pb-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/55">
                Previous chats
              </div>
              <h2 className="mt-1 text-xl font-semibold text-white tracking-tight">History</h2>
            </div>
            <div className="flex items-center gap-4 text-[12px] font-medium shrink-0">
              <button
                onClick={handleNewChat}
                className="text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation"
              >
                New chat
              </button>
              <button
                onClick={onClose}
                className="text-white/55 hover:text-white transition-colors touch-manipulation"
                aria-label="Close history"
              >
                Close
              </button>
            </div>
          </div>
        </div>

        {/* Sessions list */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-4">
          {isLoading && sessions.length === 0 && (
            <div className="flex items-center justify-center py-10">
              <div className="h-5 w-5 rounded-full border-2 border-elec-yellow border-t-transparent animate-spin" />
            </div>
          )}

          {!isLoading && sessions.length === 0 && (
            <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-6 py-10 text-center">
              <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/55">
                Nothing here yet
              </div>
              <div className="mt-2 text-base font-medium text-white">No previous chats</div>
              <p className="mt-2 text-[12.5px] text-white/70 max-w-md mx-auto leading-relaxed">
                Start a conversation to build your chat history. Every session is saved for later
                reference.
              </p>
            </div>
          )}

          {sessions.length > 0 && (
            <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden divide-y divide-white/[0.06]">
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
                        'group relative flex items-start gap-4 px-5 py-4',
                        'hover:bg-[hsl(0_0%_15%)] transition-colors touch-manipulation'
                      )}
                    >
                      <button
                        onClick={() => handleSelect(session.id)}
                        className="flex-1 min-w-0 text-left"
                      >
                        <div
                          className={cn(
                            'text-[10px] font-medium uppercase tracking-[0.22em]',
                            isActive ? 'text-elec-yellow' : 'text-white/55'
                          )}
                        >
                          {formatDayEyebrow(session.updated_at)}
                          <span className="ml-2 text-white/40 tabular-nums normal-case tracking-normal">
                            · {session.message_count} messages
                          </span>
                        </div>
                        <div className="mt-1.5 text-[15px] font-semibold text-white tracking-tight truncate">
                          {session.title}
                        </div>
                        {session.last_message_preview && (
                          <div className="mt-1 text-[12.5px] text-white/70 truncate leading-relaxed">
                            {session.last_message_preview}
                          </div>
                        )}
                      </button>

                      <button
                        onClick={(e) => handleDelete(e, session.id)}
                        className={cn(
                          'shrink-0 text-[11px] font-medium uppercase tracking-[0.18em] px-2 py-1 rounded-md transition-colors touch-manipulation',
                          confirmDeleteId === session.id
                            ? 'text-red-400 bg-red-500/10 border border-red-500/20'
                            : 'text-white/40 hover:text-white'
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
