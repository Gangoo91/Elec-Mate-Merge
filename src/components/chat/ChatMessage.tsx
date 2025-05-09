
import { useState } from 'react';
import {
  ContextMenu,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import DirectMessageModal from './DirectMessageModal';
import MessageHeader from './MessageHeader';
import MessageContent from './MessageContent';
import MessageActions from './MessageActions';
import CommentsList from './CommentsList';
import CommentInput from './CommentInput';
import MessageContextMenu from './MessageContextMenu';
import { ChatMessage as ChatMessageType } from "@/components/messenger/types";

interface ChatMessageProps {
  message: ChatMessageType;
  currentUserId?: string;
  onUpvote: (messageId: string) => void;
  onPostComment: (messageId: string, content: string) => void;
  onEditMessage?: (messageId: string, content: string) => void;
  onDeleteMessage?: (messageId: string) => void;
}

const ChatMessage = ({ 
  message, 
  currentUserId, 
  onUpvote, 
  onPostComment,
  onEditMessage,
  onDeleteMessage 
}: ChatMessageProps) => {
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDirectMessageModalOpen, setIsDirectMessageModalOpen] = useState(false);
  const [dmRecipient, setDmRecipient] = useState<{ id: string; name: string; avatar?: string } | null>(null);
  
  const handleSubmitComment = (commentText: string) => {
    onPostComment(message.id, commentText);
    setShowCommentInput(false);
  };
  
  const handleSubmitEdit = (editText: string) => {
    if (onEditMessage) {
      onEditMessage(message.id, editText);
      setIsEditing(false);
    }
  };
  
  const handleOpenDirectMessage = () => {
    setDmRecipient({
      id: message.authorId,
      name: message.authorName,
      avatar: message.authorAvatar
    });
    setIsDirectMessageModalOpen(true);
  };

  const handleCloseDirectMessage = () => {
    setIsDirectMessageModalOpen(false);
    setDmRecipient(null);
  };
  
  const handleDeleteMessage = () => {
    if (onDeleteMessage) {
      onDeleteMessage(message.id);
    }
  };
  
  const isOwnMessage = message.authorId === currentUserId;
  
  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="bg-[#2c2c2c] border border-elec-yellow/20 rounded-lg overflow-hidden">
            <div className="p-4">
              {/* Message Header */}
              <MessageHeader 
                authorId={message.authorId}
                authorName={message.authorName}
                authorAvatar={message.authorAvatar}
                createdAt={message.createdAt}
                currentUserId={currentUserId}
                onEditClick={() => setIsEditing(true)}
                onDeleteClick={handleDeleteMessage}
                onAuthorClick={handleOpenDirectMessage}
              />
              
              {/* Message Content */}
              <MessageContent 
                content={message.content}
                isEditing={isEditing}
                onSaveEdit={handleSubmitEdit}
                onCancelEdit={() => setIsEditing(false)}
              />
              
              {/* Message Actions */}
              <MessageActions 
                upvotes={message.upvotes}
                commentsCount={message.comments.length}
                hasUserUpvoted={message.hasUserUpvoted}
                onUpvote={() => onUpvote(message.id)}
                onCommentToggle={() => setShowCommentInput(!showCommentInput)}
              />
            </div>
            
            {/* Comments List */}
            <CommentsList comments={message.comments} />
            
            {/* Comment Input */}
            {showCommentInput && (
              <CommentInput 
                currentUserId={currentUserId}
                onSubmit={handleSubmitComment}
                onCancel={() => setShowCommentInput(false)}
              />
            )}
          </div>
        </ContextMenuTrigger>
        
        {/* Context Menu */}
        <MessageContextMenu 
          isOwnMessage={isOwnMessage}
          onEditClick={() => setIsEditing(true)}
          onDeleteClick={handleDeleteMessage}
          onDirectMessageClick={handleOpenDirectMessage}
        />
      </ContextMenu>

      {/* Direct Message Modal */}
      <DirectMessageModal 
        isOpen={isDirectMessageModalOpen}
        onClose={handleCloseDirectMessage}
        recipient={dmRecipient}
      />
    </>
  );
};

export default ChatMessage;
