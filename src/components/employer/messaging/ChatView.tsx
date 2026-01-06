import { useState, useEffect, useCallback, useRef } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { ChatHeader } from "./ChatHeader";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";
import {
  useMessages,
  useSendMessage,
  useMarkAllAsRead,
  useTypingIndicator,
  useEditMessage,
  useDeleteMessage,
  useAddReaction,
  useRemoveReaction,
} from "@/hooks/useMessages";
import { useFileUpload, useSaveAttachment, useMessageAttachments } from "@/hooks/useFileUpload";
import { useArchiveConversation } from "@/hooks/useConversations";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import type { Conversation, Message, MessageReaction } from "@/services/conversationService";
import type { ReplyToMessage } from "@/components/messaging/MessageReply";
import type { MentionUser } from "@/components/messaging/Mentions";

interface ChatViewProps {
  conversation: Conversation | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onArchived?: () => void;
}

export function ChatView({ conversation, open, onOpenChange, onArchived }: ChatViewProps) {
  const { user } = useAuth();
  const [isSending, setIsSending] = useState(false);
  const [replyTo, setReplyTo] = useState<ReplyToMessage | null>(null);
  const [editingMessage, setEditingMessage] = useState<Message | null>(null);
  const messageListRef = useRef<{ scrollToMessage: (id: string) => void } | null>(null);

  // Fetch messages
  const { data: messages = [], isLoading: messagesLoading } = useMessages(
    conversation?.id || ''
  );

  // Mutations
  const sendMessage = useSendMessage();
  const archiveConversation = useArchiveConversation();
  const markAllAsRead = useMarkAllAsRead();
  const editMessage = useEditMessage();
  const deleteMessage = useDeleteMessage();
  const addReaction = useAddReaction();
  const removeReaction = useRemoveReaction();

  // File upload
  const { uploadFile, isUploading } = useFileUpload(conversation?.id || '');
  const saveAttachment = useSaveAttachment();

  // Typing indicator
  const { setTyping, isOtherTyping } = useTypingIndicator(
    conversation?.id || '',
    user?.id || '',
    'employer'
  );

  // Build mention users list from conversation participants
  const mentionUsers: MentionUser[] = conversation?.electrician_profile?.employee
    ? [{
        id: conversation.electrician_profile.employee.id,
        name: conversation.electrician_profile.employee.name || 'Unknown',
        avatar: conversation.electrician_profile.employee.avatar_url || undefined,
      }]
    : [];

  // Mark messages as read when conversation opens
  useEffect(() => {
    if (open && conversation && user) {
      markAllAsRead.mutate({
        conversationId: conversation.id,
        userType: 'employer',
      });
    }
  }, [open, conversation?.id, user?.id]);

  const handleSendMessage = async (content: string, attachments?: File[], replyToId?: string) => {
    if (!conversation || !user) return;

    setIsSending(true);
    try {
      // Send the message
      const newMessage = await sendMessage.mutateAsync({
        conversation_id: conversation.id,
        sender_type: 'employer',
        sender_id: user.id,
        content,
        message_type: 'text',
        reply_to_id: replyToId,
      });

      // Upload attachments if any
      if (attachments && attachments.length > 0 && newMessage) {
        for (const file of attachments) {
          try {
            const uploadResult = await uploadFile(file);
            if (uploadResult) {
              await saveAttachment.mutateAsync({
                messageId: newMessage.id,
                upload: uploadResult,
              });
            }
          } catch (uploadError) {
            console.error('Error uploading file:', uploadError);
            toast({
              title: "File Upload Failed",
              description: `Failed to upload ${file.name}`,
              variant: "destructive",
            });
          }
        }
      }

      // Clear reply state
      setReplyTo(null);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Failed to Send",
        description: "Your message couldn't be sent. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  // Handle reply to message
  const handleReply = useCallback((message: Message) => {
    setReplyTo({
      id: message.id,
      content: message.content,
      senderName: message.sender_type === 'employer' ? 'You' :
        conversation?.electrician_profile?.employee?.name || 'Unknown',
    });
  }, [conversation]);

  // Handle edit message
  const handleEdit = useCallback((message: Message) => {
    setEditingMessage(message);
    // For now, we'll just open a simple prompt - could be enhanced with inline editing
    const newContent = window.prompt('Edit message:', message.content);
    if (newContent && newContent !== message.content) {
      editMessage.mutate({ messageId: message.id, content: newContent });
    }
    setEditingMessage(null);
  }, [editMessage]);

  // Handle delete message
  const handleDelete = useCallback((messageId: string) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      deleteMessage.mutate(messageId);
    }
  }, [deleteMessage]);

  // Handle add reaction
  const handleAddReaction = useCallback((messageId: string, emoji: string) => {
    if (!user) return;
    addReaction.mutate({ messageId, userId: user.id, emoji });
  }, [user, addReaction]);

  // Handle remove reaction
  const handleRemoveReaction = useCallback((reactionId: string) => {
    removeReaction.mutate(reactionId);
  }, [removeReaction]);

  // Handle scroll to message (for reply navigation)
  const handleScrollToMessage = useCallback((messageId: string) => {
    messageListRef.current?.scrollToMessage(messageId);
  }, []);

  const handleArchive = async () => {
    if (!conversation) return;

    try {
      await archiveConversation.mutateAsync(conversation.id);
      toast({
        title: "Conversation Archived",
        description: "The conversation has been archived.",
      });
      onOpenChange(false);
      onArchived?.();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to archive conversation.",
        variant: "destructive",
      });
    }
  };

  if (!conversation) return null;

  const canReply = conversation.electrician_can_reply;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[95vh] rounded-t-2xl p-0 flex flex-col"
      >
        {/* Header */}
        <ChatHeader
          conversation={conversation}
          onBack={() => onOpenChange(false)}
          onArchive={handleArchive}
        />

        {/* Info banner if electrician can't reply yet */}
        {!canReply && (
          <div className="mx-4 mt-2">
            <Card className="bg-amber-500/10 border-amber-500/30">
              <CardContent className="p-3 flex items-start gap-2">
                <Clock className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-amber-600 dark:text-amber-400">
                    Awaiting Application
                  </p>
                  <p className="text-muted-foreground text-xs mt-0.5">
                    {conversation.electrician_profile?.employee?.name || 'This person'} can reply once they apply to one of your vacancies.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Messages */}
        <MessageList
          ref={messageListRef}
          messages={messages}
          currentUserId={user?.id || ''}
          isLoading={messagesLoading}
          isTyping={isOtherTyping}
          onReply={handleReply}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAddReaction={handleAddReaction}
          onRemoveReaction={handleRemoveReaction}
          onScrollToMessage={handleScrollToMessage}
        />

        {/* Input */}
        <MessageInput
          onSend={handleSendMessage}
          onTyping={setTyping}
          isSending={isSending || isUploading}
          placeholder={
            canReply
              ? "Type a message..."
              : "Send a message (they can reply after applying)"
          }
          replyTo={replyTo}
          onCancelReply={() => setReplyTo(null)}
          mentionUsers={mentionUsers}
        />
      </SheetContent>
    </Sheet>
  );
}
