import { useState, useEffect, useCallback, useRef } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import {
  ResponsiveFormModal,
  ResponsiveFormModalContent,
  ResponsiveFormModalHeader,
  ResponsiveFormModalTitle,
  ResponsiveFormModalBody,
} from '@/components/ui/responsive-form-modal';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ChatHeader } from './ChatHeader';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { Clock } from 'lucide-react';
import {
  useMessages,
  useSendMessage,
  useMarkAllAsRead,
  useTypingIndicator,
  useEditMessage,
  useDeleteMessage,
  useAddReaction,
  useRemoveReaction,
} from '@/hooks/useMessages';
import { useFileUpload, useSaveAttachment } from '@/hooks/useFileUpload';
import { useArchiveConversation } from '@/hooks/useConversations';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import type { Conversation, Message } from '@/services/conversationService';
import type { ReplyToMessage } from '@/components/messaging/MessageReply';
import type { MentionUser } from '@/components/messaging/Mentions';

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
  const [editDraft, setEditDraft] = useState('');
  const [deletingMessageId, setDeletingMessageId] = useState<string | null>(null);
  const messageListRef = useRef<{ scrollToMessage: (id: string) => void } | null>(null);

  // Fetch messages
  const { data: messages = [], isLoading: messagesLoading } = useMessages(conversation?.id || '');

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
    ? [
        {
          id: conversation.electrician_profile.employee.id,
          name: conversation.electrician_profile.employee.name || 'Unknown',
          avatar: conversation.electrician_profile.employee.avatar_url || undefined,
        },
      ]
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
              title: 'File Upload Failed',
              description: `Failed to upload ${file.name}`,
              variant: 'destructive',
            });
          }
        }
      }

      // Clear reply state
      setReplyTo(null);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: 'Failed to Send',
        description: "Your message couldn't be sent. Please try again.",
        variant: 'destructive',
      });
    } finally {
      setIsSending(false);
    }
  };

  // Handle reply to message
  const handleReply = useCallback(
    (message: Message) => {
      setReplyTo({
        id: message.id,
        content: message.content,
        senderName:
          message.sender_type === 'employer'
            ? 'You'
            : conversation?.electrician_profile?.employee?.name || 'Unknown',
      });
    },
    [conversation]
  );

  // Handle edit message — themed modal, not window.prompt (which breaks in
  // native WebViews and looks nothing like the app)
  const handleEdit = useCallback((message: Message) => {
    setEditingMessage(message);
    setEditDraft(message.content);
  }, []);

  const handleSaveEdit = () => {
    const content = editDraft.trim();
    if (editingMessage && content && content !== editingMessage.content) {
      editMessage.mutate({ messageId: editingMessage.id, content });
    }
    setEditingMessage(null);
    setEditDraft('');
  };

  // Handle delete message — themed confirm, not window.confirm
  const handleDelete = useCallback((messageId: string) => {
    setDeletingMessageId(messageId);
  }, []);

  // Handle add reaction
  const handleAddReaction = useCallback(
    (messageId: string, emoji: string) => {
      if (!user) return;
      addReaction.mutate({ messageId, userId: user.id, emoji });
    },
    [user, addReaction]
  );

  // Handle remove reaction
  const handleRemoveReaction = useCallback(
    (reactionId: string) => {
      removeReaction.mutate(reactionId);
    },
    [removeReaction]
  );

  // Handle scroll to message (for reply navigation)
  const handleScrollToMessage = useCallback((messageId: string) => {
    messageListRef.current?.scrollToMessage(messageId);
  }, []);

  const handleArchive = async () => {
    if (!conversation) return;

    try {
      await archiveConversation.mutateAsync(conversation.id);
      toast({
        title: 'Conversation Archived',
        description: 'The conversation has been archived.',
      });
      onOpenChange(false);
      onArchived?.();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to archive conversation.',
        variant: 'destructive',
      });
    }
  };

  if (!conversation) return null;

  const canReply = conversation.electrician_can_reply;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[95vh] rounded-t-2xl p-0 flex flex-col bg-[hsl(0_0%_8%)] border-t border-white/[0.06]"
      >
        {/* Header */}
        <ChatHeader
          conversation={conversation}
          onBack={() => onOpenChange(false)}
          onArchive={handleArchive}
        />

        {/* Info banner if electrician can't reply yet */}
        {!canReply && (
          <div className="mx-4 mt-3">
            <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-3 flex items-start gap-2.5 relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-amber-500/70 via-amber-400/70 to-yellow-400/70 opacity-70" />
              <Clock className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-sm min-w-0">
                <p className="text-[13px] font-semibold text-white">
                  Awaiting Application
                </p>
                <p className="text-white text-[12px] mt-0.5">
                  {conversation.electrician_profile?.employee?.name || 'This person'} can reply
                  once they apply to one of your vacancies.
                </p>
              </div>
            </div>
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
            canReply ? 'Type a message...' : 'Send a message (they can reply after applying)'
          }
          replyTo={replyTo}
          onCancelReply={() => setReplyTo(null)}
          mentionUsers={mentionUsers}
        />
      </SheetContent>

      {/* Edit message — themed input replacing window.prompt */}
      <ResponsiveFormModal
        open={!!editingMessage}
        onOpenChange={(o) => {
          if (!o) {
            setEditingMessage(null);
            setEditDraft('');
          }
        }}
      >
        <ResponsiveFormModalContent className="bg-[hsl(0_0%_8%)] border-white/[0.08]">
          <ResponsiveFormModalHeader>
            <ResponsiveFormModalTitle className="text-white">Edit message</ResponsiveFormModalTitle>
          </ResponsiveFormModalHeader>
          <ResponsiveFormModalBody className="pb-6 space-y-3">
            <Textarea
              value={editDraft}
              onChange={(e) => setEditDraft(e.target.value)}
              autoFocus
              className="touch-manipulation text-base min-h-[100px] bg-white/[0.05] border-white/30 text-white focus:border-yellow-500 focus:ring-2 focus:ring-elec-yellow/20"
            />
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setEditingMessage(null);
                  setEditDraft('');
                }}
                className="flex-1 h-11 touch-manipulation bg-white/[0.06] text-white border-white/[0.1] hover:bg-white/[0.1]"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleSaveEdit}
                disabled={!editDraft.trim() || editMessage.isPending}
                className="flex-1 h-11 touch-manipulation bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold"
              >
                Save
              </Button>
            </div>
          </ResponsiveFormModalBody>
        </ResponsiveFormModalContent>
      </ResponsiveFormModal>

      {/* Delete message — themed confirm replacing window.confirm */}
      <AlertDialog
        open={!!deletingMessageId}
        onOpenChange={(o) => !o && setDeletingMessageId(null)}
      >
        <AlertDialogContent className="bg-[hsl(0_0%_8%)] border border-white/[0.08]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete this message?</AlertDialogTitle>
            <AlertDialogDescription className="text-white/70">
              The message will be removed for everyone in this conversation. This cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="h-11 touch-manipulation bg-white/[0.06] text-white border-white/[0.1] hover:bg-white/[0.1]">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deletingMessageId) deleteMessage.mutate(deletingMessageId);
                setDeletingMessageId(null);
              }}
              className="h-11 touch-manipulation bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Sheet>
  );
}
