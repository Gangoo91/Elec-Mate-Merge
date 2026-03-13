import { memo, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Plus, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import type { AIChatSession } from '@/hooks/useAIChatHistory';

function formatRelativeTime(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diffMs = now - then;
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;

  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;

  return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
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
        // Reset confirmation after 3s
        setTimeout(() => setConfirmDeleteId(null), 3000);
      }
    },
    [confirmDeleteId, onDeleteSession]
  );

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="max-h-[80vh]">
        <DrawerHeader className="flex flex-row items-center justify-between pb-2">
          <DrawerTitle className="text-white">Chat History</DrawerTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-10 w-10 touch-manipulation"
          >
            <X className="h-5 w-5" />
          </Button>
        </DrawerHeader>

        <div className="px-4 pb-4">
          {/* New Chat button */}
          <button
            onClick={handleNewChat}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-elec-yellow/10 border border-elec-yellow/30 text-white hover:bg-elec-yellow/20 transition-colors touch-manipulation active:scale-[0.98] mb-3"
          >
            <div className="w-8 h-8 rounded-lg bg-elec-yellow flex items-center justify-center">
              <Plus className="w-4 h-4 text-black" />
            </div>
            <span className="font-medium">New Chat</span>
          </button>

          {/* Sessions list */}
          <div className="overflow-y-auto max-h-[55vh] space-y-1">
            {isLoading && sessions.length === 0 && (
              <div className="flex items-center justify-center py-8 text-white">
                <div className="animate-pulse">Loading chats...</div>
              </div>
            )}

            {!isLoading && sessions.length === 0 && (
              <div className="flex flex-col items-center justify-center py-8 text-white">
                <Brain className="w-10 h-10 mb-3 opacity-40" />
                <p className="font-medium">No previous chats</p>
                <p className="text-sm mt-1 opacity-70">Start a conversation above</p>
              </div>
            )}

            <AnimatePresence mode="popLayout">
              {sessions.map((session) => (
                <motion.button
                  key={session.id}
                  layout
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => handleSelect(session.id)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-colors touch-manipulation active:scale-[0.98] ${
                    session.id === currentSessionId
                      ? 'bg-elec-yellow/10 border-l-2 border-elec-yellow'
                      : 'hover:bg-white/5'
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{session.title}</p>
                    {session.last_message_preview && (
                      <p className="text-xs text-white opacity-60 truncate mt-0.5">
                        {session.last_message_preview}
                      </p>
                    )}
                    <p className="text-[10px] text-white opacity-40 mt-1">
                      {formatRelativeTime(session.updated_at)} · {session.message_count} messages
                    </p>
                  </div>

                  {/* Delete button */}
                  <button
                    onClick={(e) => handleDelete(e, session.id)}
                    className={`shrink-0 p-2 rounded-lg transition-colors touch-manipulation ${
                      confirmDeleteId === session.id
                        ? 'bg-red-500/20 text-red-400'
                        : 'text-white opacity-30 hover:opacity-70 hover:bg-white/5'
                    }`}
                    aria-label={confirmDeleteId === session.id ? 'Confirm delete' : 'Delete chat'}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
});

export default ChatHistoryDrawer;
