import { useState } from 'react';
import { Check, CheckCheck, MoreVertical, Reply, Pencil, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Message, MessageReaction } from '@/services/conversationService';
import { MessageReactions, ReactionBar } from '@/components/messaging/MessageReactions';
import { ReplyQuote, ReplyToMessage } from '@/components/messaging/MessageReply';
import { TextWithLinks, AutoLinkPreview } from '@/components/messaging/LinkPreview';
import { FileAttachment } from '@/components/messaging/FileAttachment';

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
  currentUserId: string;
  replyTo?: ReplyToMessage;
  reactions?: MessageReaction[];
  attachments?: Array<{
    id: string;
    file_name: string;
    file_type: string;
    file_size: number;
    storage_path: string;
    thumbnail_path: string | null;
    metadata: Record<string, unknown>;
  }>;
  onReply?: (message: Message) => void;
  onEdit?: (message: Message) => void;
  onDelete?: (messageId: string) => void;
  onAddReaction?: (messageId: string, emoji: string) => void;
  onRemoveReaction?: (reactionId: string) => void;
  onScrollToMessage?: (messageId: string) => void;
}

export function MessageBubble({
  message,
  isOwn,
  currentUserId,
  replyTo,
  reactions = [],
  attachments = [],
  onReply,
  onEdit,
  onDelete,
  onAddReaction,
  onRemoveReaction,
  onScrollToMessage,
}: MessageBubbleProps) {
  const [showActions, setShowActions] = useState(false);
  const formattedTime = formatDistanceToNow(new Date(message.sent_at), { addSuffix: false });
  const isEdited = !!message.edited_at;
  const isDeleted = !!message.deleted_at;

  // Convert reactions to the format expected by MessageReactions
  const formattedReactions = reactions.map((r) => ({
    id: r.id,
    emoji: r.emoji,
    userId: r.user_id,
  }));

  return (
    <div
      className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-3 group`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="relative max-w-[80%]">
        {/* Quick reaction bar on hover */}
        {showActions && !isDeleted && onAddReaction && (
          <div className={`absolute -top-8 ${isOwn ? 'right-0' : 'left-0'} z-10`}>
            <ReactionBar onReact={(emoji) => onAddReaction(message.id, emoji)} />
          </div>
        )}

        <div
          className={`
            rounded-2xl px-4 py-2.5 border
            ${
              isOwn
                ? 'bg-elec-yellow/20 border-elec-yellow/30 text-white rounded-br-md'
                : 'bg-[hsl(0_0%_12%)] border-white/[0.06] text-white rounded-bl-md'
            }
            ${isDeleted ? 'opacity-60 italic' : ''}
          `}
        >
          {/* Reply quote */}
          {replyTo && !isDeleted && (
            <ReplyQuote
              replyTo={replyTo}
              isOwnMessage={isOwn}
              onClick={() => onScrollToMessage?.(replyTo.id)}
            />
          )}

          {/* Attachments */}
          {attachments.length > 0 && !isDeleted && (
            <div className="space-y-2 mb-2">
              {attachments.map((attachment) => (
                <FileAttachment
                  key={attachment.id}
                  attachment={{
                    id: attachment.id,
                    message_id: message.id,
                    file_name: attachment.file_name,
                    file_type: attachment.file_type,
                    file_size: attachment.file_size,
                    storage_path: attachment.storage_path,
                    thumbnail_path: attachment.thumbnail_path,
                    metadata: attachment.metadata,
                    created_at: message.created_at,
                  }}
                />
              ))}
            </div>
          )}

          {/* Message content */}
          <div className="text-sm whitespace-pre-wrap break-words text-white">
            {isDeleted ? (
              <span className="text-white">This message was deleted</span>
            ) : (
              <TextWithLinks text={message.content} />
            )}
          </div>

          {/* Link previews */}
          {!isDeleted && <AutoLinkPreview text={message.content} maxPreviews={1} />}

          {/* Timestamp and read receipts */}
          <div
            className={`flex items-center gap-1 mt-1 ${isOwn ? 'justify-end' : 'justify-start'}`}
          >
            {isEdited && !isDeleted && (
              <span className="text-[10px] text-white">edited</span>
            )}
            <span className="text-[10px] text-white">{formattedTime}</span>
            {isOwn && !isDeleted && (
              <span className={message.read_at ? 'text-elec-yellow' : 'text-white'}>
                {message.read_at ? (
                  <CheckCheck className="h-3.5 w-3.5" />
                ) : message.delivered_at ? (
                  <CheckCheck className="h-3.5 w-3.5 opacity-60" />
                ) : (
                  <Check className="h-3.5 w-3.5 opacity-60" />
                )}
              </span>
            )}
          </div>
        </div>

        {/* Reactions display */}
        {formattedReactions.length > 0 && !isDeleted && (
          <div className={`mt-1 ${isOwn ? 'flex justify-end' : ''}`}>
            <MessageReactions
              reactions={formattedReactions}
              currentUserId={currentUserId}
              onAddReaction={(emoji) => onAddReaction?.(message.id, emoji)}
              onRemoveReaction={(reactionId) => onRemoveReaction?.(reactionId)}
            />
          </div>
        )}

        {/* Actions dropdown */}
        {showActions && !isDeleted && (
          <div
            className={`absolute top-1 ${isOwn ? 'left-0 -translate-x-full pr-1' : 'right-0 translate-x-full pl-1'}`}
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  aria-label="Message actions"
                  className="h-9 w-9 sm:h-7 sm:w-7 rounded-full bg-white/[0.04] border border-white/[0.08] text-white flex items-center justify-center hover:bg-white/[0.08] transition-colors touch-manipulation"
                >
                  <MoreVertical className="h-3.5 w-3.5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align={isOwn ? 'end' : 'start'}
                className="bg-[hsl(0_0%_12%)] border border-white/[0.08] text-white"
              >
                {onReply && (
                  <DropdownMenuItem
                    onClick={() => onReply(message)}
                    className="text-white focus:bg-white/[0.08] focus:text-white"
                  >
                    <Reply className="h-4 w-4 mr-2" />
                    Reply
                  </DropdownMenuItem>
                )}
                {isOwn && onEdit && (
                  <DropdownMenuItem
                    onClick={() => onEdit(message)}
                    className="text-white focus:bg-white/[0.08] focus:text-white"
                  >
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                )}
                {isOwn && onDelete && (
                  <DropdownMenuItem
                    onClick={() => onDelete(message.id)}
                    className="text-red-400 focus:bg-red-500/15 focus:text-red-400"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </div>
  );
}

export function SystemMessage({ content }: { content: string }) {
  return (
    <div className="flex justify-center my-4">
      <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-white bg-[hsl(0_0%_12%)] border border-white/[0.06] px-3 py-1 rounded-full">
        {content}
      </span>
    </div>
  );
}
