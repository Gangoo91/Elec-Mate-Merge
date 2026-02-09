/**
 * DirectMessaging
 *
 * Direct messaging interface for apprentice-tutor communication.
 * Mobile-first bottom sheet design with real-time updates.
 */

import { useState, useRef, useEffect } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Send,
  Loader2,
  MessageSquare,
  ChevronLeft,
  User,
  CheckCheck,
  Clock,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDirectMessages, type DirectMessage, type MentorConnection } from '@/hooks/portfolio/useDirectMessages';
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

  // Conversation List View
  const ConversationList = () => (
    <div className="space-y-2">
      {connections.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="p-4 rounded-full bg-muted mb-4">
            <MessageSquare className="h-8 w-8 text-white/80" />
          </div>
          <p className="font-medium text-foreground">No conversations yet</p>
          <p className="text-sm text-white/80 mt-1">
            Connect with a tutor to start messaging
          </p>
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
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors active:scale-[0.98] touch-manipulation"
            >
              <Avatar className="h-12 w-12">
                <AvatarImage src={mentor?.avatar_url} />
                <AvatarFallback className="bg-elec-yellow/10 text-elec-yellow">
                  {getInitials(mentor?.full_name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-left min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-foreground truncate">
                    {mentor?.full_name || 'Tutor'}
                  </p>
                  {lastMessage && (
                    <span className="text-xs text-white/80 shrink-0 ml-2">
                      {formatMessageTime(lastMessage.created_at)}
                    </span>
                  )}
                </div>
                <p className="text-sm text-white/80 truncate">
                  {mentor?.role || 'Training Provider'}
                </p>
              </div>
            </button>
          );
        })
      )}
    </div>
  );

  // Message Bubble Component
  const MessageBubble = ({ message }: { message: DirectMessage }) => {
    const isOwn = message.sender_type === 'apprentice';

    return (
      <div
        className={cn(
          'flex',
          isOwn ? 'justify-end' : 'justify-start'
        )}
      >
        <div
          className={cn(
            'max-w-[80%] rounded-2xl px-4 py-2.5',
            isOwn
              ? 'bg-elec-yellow text-black rounded-br-sm'
              : 'bg-muted text-foreground rounded-bl-sm'
          )}
        >
          <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
          <div
            className={cn(
              'flex items-center gap-1 mt-1',
              isOwn ? 'justify-end' : 'justify-start'
            )}
          >
            <span
              className={cn(
                'text-xs',
                isOwn ? 'text-black/60' : 'text-white/80'
              )}
            >
              {formatMessageTime(message.created_at)}
            </span>
            {isOwn && (
              message.is_read ? (
                <CheckCheck className="h-3 w-3 text-black/60" />
              ) : (
                <Clock className="h-3 w-3 text-black/60" />
              )
            )}
          </div>
        </div>
      </div>
    );
  };

  // Conversation View
  const ConversationView = () => {
    const mentor = activeConnection?.mentor;

    return (
      <div className="flex flex-col h-full">
        {/* Conversation Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="shrink-0 -ml-2"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Avatar className="h-10 w-10">
            <AvatarImage src={mentor?.avatar_url} />
            <AvatarFallback className="bg-elec-yellow/10 text-elec-yellow">
              {getInitials(mentor?.full_name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-foreground truncate">
              {mentor?.full_name || 'Tutor'}
            </p>
            <p className="text-xs text-white/80">
              {mentor?.role || 'Training Provider'}
            </p>
          </div>
        </div>

        {/* Messages Area */}
        <ScrollArea
          ref={scrollAreaRef}
          className="flex-1 px-4 py-4"
        >
          <div className="space-y-3">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <User className="h-12 w-12 text-white/80/30 mb-3" />
                <p className="text-sm text-white/80">
                  No messages yet. Start the conversation!
                </p>
              </div>
            ) : (
              messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))
            )}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="p-4 border-t border-border bg-background">
          <div className="flex items-center gap-2">
            <Input
              ref={inputRef}
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 h-11 touch-manipulation"
              disabled={isSending}
            />
            <Button
              onClick={handleSend}
              disabled={!messageInput.trim() || isSending}
              className="h-11 w-11 p-0 bg-elec-yellow text-black hover:bg-elec-yellow/90 shrink-0"
            >
              {isSending ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl p-0">
        <div className="w-12 h-1 bg-muted rounded-full mx-auto mt-3 mb-2" />

        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full">
            <Loader2 className="h-8 w-8 animate-spin text-white/80" />
            <p className="text-sm text-white/80 mt-2">Loading messages...</p>
          </div>
        ) : activeConnectionId ? (
          <ConversationView />
        ) : (
          <>
            <SheetHeader className="px-4 pb-4">
              <SheetTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-elec-yellow" />
                Messages
                {unreadCount > 0 && (
                  <Badge className="bg-elec-yellow text-black">{unreadCount}</Badge>
                )}
              </SheetTitle>
              <SheetDescription>
                Message your tutor or assessor
              </SheetDescription>
            </SheetHeader>
            <ScrollArea className="h-[calc(85vh-8rem)] px-4 pb-8">
              <ConversationList />
            </ScrollArea>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

export default DirectMessaging;
