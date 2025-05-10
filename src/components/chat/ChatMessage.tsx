
import { useState } from 'react';
import {
  ContextMenu,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import DirectMessageModal from './DirectMessageModal';
import ReportUserModal from './ReportUserModal';
import MessageHeader from './MessageHeader';
import MessageContent from './MessageContent';
import MessageActions from './MessageActions';
import CommentsList from './CommentsList';
import CommentInput from './CommentInput';
import MessageContextMenu from './MessageContextMenu';
import { ChatMessage as ChatMessageType } from "@/components/messenger/types";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

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
  const { profile } = useAuth();
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDirectMessageModalOpen, setIsDirectMessageModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
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
  
  const handleOpenReportModal = () => {
    if (!profile) {
      toast({
        title: "Sign in required",
        description: "Please sign in to report messages.",
        variant: "destructive"
      });
      return;
    }
    
    setIsReportModalOpen(true);
  };
  
  const handleBlockUser = async () => {
    if (!profile) {
      toast({
        title: "Sign in required",
        description: "Please sign in to block users.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      // In a production environment, you would add this to a blocked_users table
      // For now, we'll just show a toast notification
      toast({
        title: "User blocked",
        description: `You have blocked ${message.authorName}. You will no longer see their messages.`,
      });
    } catch (error) {
      console.error('Error blocking user:', error);
      toast({
        title: "Error",
        description: "Could not block this user. Please try again.",
        variant: "destructive"
      });
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
          onReportClick={handleOpenReportModal}
          onBlockUserClick={handleBlockUser}
        />
      </ContextMenu>

      {/* Direct Message Modal */}
      <DirectMessageModal 
        isOpen={isDirectMessageModalOpen}
        onClose={handleCloseDirectMessage}
        recipient={dmRecipient}
      />
      
      {/* Report User Modal */}
      <ReportUserModal 
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        reportedUser={dmRecipient ? {
          id: dmRecipient.id,
          name: dmRecipient.name,
          messageId: message.id
        } : null}
      />
    </>
  );
};

export default ChatMessage;
