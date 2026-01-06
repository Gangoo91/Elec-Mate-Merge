import { useRef, useEffect, forwardRef, useImperativeHandle, useCallback } from "react";
import { MessageBubble, SystemMessage } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";
import { Skeleton } from "@/components/ui/skeleton";
import { useMessageAttachments } from "@/hooks/useFileUpload";
import type { Message, MessageReaction } from "@/services/conversationService";
import type { ReplyToMessage } from "@/components/messaging/MessageReply";

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
  isLoading?: boolean;
  isTyping?: boolean;
  onReply?: (message: Message) => void;
  onEdit?: (message: Message) => void;
  onDelete?: (messageId: string) => void;
  onAddReaction?: (messageId: string, emoji: string) => void;
  onRemoveReaction?: (reactionId: string) => void;
  onScrollToMessage?: (messageId: string) => void;
}

export interface MessageListRef {
  scrollToMessage: (messageId: string) => void;
}

export const MessageList = forwardRef<MessageListRef, MessageListProps>(({
  messages,
  currentUserId,
  isLoading,
  isTyping,
  onReply,
  onEdit,
  onDelete,
  onAddReaction,
  onRemoveReaction,
  onScrollToMessage,
}, ref) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const messageRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Scroll to a specific message
  const scrollToMessage = useCallback((messageId: string) => {
    const messageEl = messageRefs.current.get(messageId);
    if (messageEl) {
      messageEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Highlight effect
      messageEl.classList.add('bg-primary/10');
      setTimeout(() => {
        messageEl.classList.remove('bg-primary/10');
      }, 2000);
    }
  }, []);

  // Expose scrollToMessage method via ref
  useImperativeHandle(ref, () => ({
    scrollToMessage,
  }), [scrollToMessage]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Build a map of replies for quick lookup
  const replyMap = new Map<string, ReplyToMessage>();
  messages.forEach(msg => {
    if (msg.reply_to_id) {
      const replyToMsg = messages.find(m => m.id === msg.reply_to_id);
      if (replyToMsg) {
        replyMap.set(msg.id, {
          id: replyToMsg.id,
          content: replyToMsg.content,
          senderName: replyToMsg.sender_type === 'employer' ? 'You' : 'Electrician',
        });
      }
    }
  });

  if (isLoading) {
    return (
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Loading skeletons */}
        <div className="flex justify-end">
          <Skeleton className="h-16 w-3/4 rounded-2xl" />
        </div>
        <div className="flex justify-start">
          <Skeleton className="h-12 w-2/3 rounded-2xl" />
        </div>
        <div className="flex justify-end">
          <Skeleton className="h-20 w-3/4 rounded-2xl" />
        </div>
        <div className="flex justify-start">
          <Skeleton className="h-14 w-1/2 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-muted-foreground">No messages yet</p>
          <p className="text-xs text-muted-foreground mt-1">
            Send a message to start the conversation
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto p-4"
    >
      {messages.map((message) => {
        // System messages
        if (message.message_type === 'system') {
          return <SystemMessage key={message.id} content={message.content} />;
        }

        const isOwn = message.sender_id === currentUserId;
        const replyTo = replyMap.get(message.id);

        return (
          <div
            key={message.id}
            ref={(el) => {
              if (el) messageRefs.current.set(message.id, el);
            }}
            className="transition-colors duration-500"
          >
            <MessageBubble
              message={message}
              isOwn={isOwn}
              currentUserId={currentUserId}
              replyTo={replyTo}
              reactions={message.reactions || []}
              attachments={message.attachments || []}
              onReply={onReply}
              onEdit={isOwn ? onEdit : undefined}
              onDelete={isOwn ? onDelete : undefined}
              onAddReaction={onAddReaction}
              onRemoveReaction={onRemoveReaction}
              onScrollToMessage={scrollToMessage}
            />
          </div>
        );
      })}

      {isTyping && <TypingIndicator />}

      <div ref={bottomRef} />
    </div>
  );
});
