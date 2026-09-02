/**
 * DirectMessaging
 *
 * Direct messaging interface for apprentice-tutor communication.
 * Mobile-first bottom sheet design with real-time updates.
 */

import { useState, useRef, useEffect } from 'react';
import { FormSheet } from '@/components/forms/FormSheet';
import { buttonPrimaryCn, inputCn } from '@/components/forms/fieldStyles';
import { CARD_BASE, CARD_NEUTRAL, CARD_SURFACE } from '@/components/ui/card-recipe';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Loader2, MessageSquare, ChevronLeft, User, CheckCheck, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  useDirectMessages,
  type DirectMessage,
  type MentorConnection,
} from '@/hooks/portfolio/useDirectMessages';
import { useAuth } from '@/contexts/AuthContext';
import { formatDistanceToNow } from 'date-fns';

interface DirectMessagingProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DirectMessaging({ open, onOpenChange }: DirectMessagingProps) {
  const { user } = useAuth();
  const {
    connections,
    messages,
    activeConnectionId,
    isLoading,
    isSending,
    unreadCount,
    sendMessage,
    openConversation,
    closeConversation,
    activeConnection,
  } = useDirectMessages();

  const [messageInput, setMessageInput] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // Focus input when conversation opens
  useEffect(() => {
    if (activeConnectionId && inputRef.current) {
      inputRef.current.focus();
    }
  }, [activeConnectionId]);

  const handleSend = async () => {
    if (!activeConnectionId || !messageInput.trim()) return;

    const success = await sendMessage(activeConnectionId, messageInput);
    if (success) {
      setMessageInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleBack = () => {
    closeConversation();
  };

  const getInitials = (name?: string) => {
    if (!name) return 'T';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatMessageTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffHours < 24) {
      return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    }
    return formatDistanceToNow(date, { addSuffix: true });
  };

  // Conversation list — a JSX value, not a component declared in render
  // (that remounted on every keystroke and dropped focus from the input).
  const conversationList = (
    <div className="space-y-2">
      {connections.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <MessageSquare className="mb-3 h-8 w-8 text-white" />
          <p className="font-medium text-white">No conversations yet</p>
          <p className="text-sm text-white mt-1">Connect with a tutor to start messaging</p>
        </div>
      ) : (
        connections.map((connection) => {
          const mentor = connection.mentor;
          const lastMessage = messages
            .filter((m) => m.connection_id === connection.id)
            .slice(-1)[0];

          return (
            <button
              key={connection.id}
              onClick={() => openConversation(connection.id)}
              className={cn(CARD_BASE, CARD_NEUTRAL, 'w-full flex-row items-center gap-3 p-3')}
            >
              <Avatar className="h-12 w-12">
                <AvatarImage src={mentor?.avatar_url} />
                <AvatarFallback className="bg-white/[0.08] text-elec-yellow">
                  {getInitials(mentor?.full_name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-left min-w-0">
                <div className="flex items-center justify-between">
                  <p className="truncate font-medium text-white">{mentor?.full_name || 'Tutor'}</p>
                  {lastMessage && (
                    <span className="text-xs text-white shrink-0 ml-2">
                      {formatMessageTime(lastMessage.created_at)}
                    </span>
                  )}
                </div>
                <p className="text-sm text-white truncate">{mentor?.role || 'Training Provider'}</p>
              </div>
            </button>
          );
        })
      )}
    </div>
  );

  const renderBubble = (message: DirectMessage) => {
    const isOwn = message.sender_type === 'apprentice';

    return (
      <div className={cn('flex', isOwn ? 'justify-end' : 'justify-start')}>
        <div
          className={cn(
            'max-w-[80%] rounded-2xl px-4 py-2.5',
            isOwn
              ? 'bg-elec-yellow text-black rounded-br-sm'
              : cn('text-white rounded-bl-sm', CARD_SURFACE)
          )}
        >
          <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
          <div
            className={cn('flex items-center gap-1 mt-1', isOwn ? 'justify-end' : 'justify-start')}
          >
            <span className={cn('text-xs', isOwn ? 'text-black/60' : 'text-white')}>
              {formatMessageTime(message.created_at)}
            </span>
            {isOwn &&
              (message.is_read ? (
                <CheckCheck className="h-3 w-3 text-black/60" />
              ) : (
                <Clock className="h-3 w-3 text-black/60" />
              ))}
          </div>
        </div>
      </div>
    );
  };

  const mentor = activeConnection?.mentor;

  const conversationTitle = (
    <span className="flex items-center gap-3">
      <button
        type="button"
        onClick={handleBack}
        aria-label="Back to conversations"
        className="-ml-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white touch-manipulation"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <Avatar className="h-10 w-10">
        <AvatarImage src={mentor?.avatar_url} />
        <AvatarFallback className="bg-white/[0.08] text-elec-yellow">
          {getInitials(mentor?.full_name)}
        </AvatarFallback>
      </Avatar>
      <span className="min-w-0">
        <span className="block truncate text-[17px] font-semibold text-white">
          {mentor?.full_name || 'Tutor'}
        </span>
        <span className="block text-[12px] font-normal text-white">
          {mentor?.role || 'Training Provider'}
        </span>
      </span>
    </span>
  );

  const composer = (
    <div className="flex items-center gap-2">
      <Input
        ref={inputRef}
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Type a message…"
        className={cn(inputCn, 'flex-1')}
        disabled={isSending}
      />
      <button
        type="button"
        onClick={handleSend}
        disabled={!messageInput.trim() || isSending}
        aria-label="Send"
        className={cn(buttonPrimaryCn, 'h-11 w-11 shrink-0 p-0')}
      >
        {isSending ? (
          <Loader2 className="mx-auto h-5 w-5 animate-spin" />
        ) : (
          <Send className="mx-auto h-5 w-5" />
        )}
      </button>
    </div>
  );

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      eyebrow={activeConnectionId ? undefined : 'Portfolio'}
      title={activeConnectionId ? conversationTitle : 'Messages'}
      description={activeConnectionId ? undefined : 'Message your tutor or assessor'}
      headerTrailing={
        !activeConnectionId && unreadCount > 0 ? (
          <span className="rounded-full bg-elec-yellow px-2 py-0.5 text-[11px] font-semibold tabular-nums text-black">
            {unreadCount}
          </span>
        ) : undefined
      }
      footer={activeConnectionId ? composer : undefined}
      bodyClassName="space-y-0"
    >
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
          <p className="mt-2 text-sm text-white">Loading messages…</p>
        </div>
      ) : activeConnectionId ? (
        <div ref={scrollAreaRef} className="space-y-3 py-2">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <User className="mb-3 h-12 w-12 text-white" />
              <p className="text-sm text-white">No messages yet. Start the conversation.</p>
            </div>
          ) : (
            messages.map((message) => <div key={message.id}>{renderBubble(message)}</div>)
          )}
        </div>
      ) : (
        conversationList
      )}
    </FormSheet>
  );
}

export default DirectMessaging;
