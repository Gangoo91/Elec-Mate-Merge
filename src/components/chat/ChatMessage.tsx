
import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, ThumbsUp, Send, Edit, Trash2 } from "lucide-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

interface Comment {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  createdAt: Date;
  parentId: string;
}

interface Message {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  createdAt: Date;
  upvotes: number;
  comments: Comment[];
  hasUserUpvoted?: boolean;
  category: string;
}

interface ChatMessageProps {
  message: Message;
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
  const [commentText, setCommentText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(message.content);
  
  const handleSubmitComment = () => {
    if (commentText.trim()) {
      onPostComment(message.id, commentText);
      setCommentText('');
      setShowCommentInput(false);
    }
  };
  
  const handleSubmitEdit = () => {
    if (editText.trim() && onEditMessage) {
      onEditMessage(message.id, editText);
      setIsEditing(false);
    }
  };
  
  const handleDeleteMessage = () => {
    if (onDeleteMessage) {
      onDeleteMessage(message.id);
    }
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };
  
  const isOwnMessage = message.authorId === currentUserId;
  
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="bg-[#2c2c2c] border border-elec-yellow/20 rounded-lg overflow-hidden">
          <div className="p-4">
            {/* Author and timestamp */}
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={message.authorAvatar} alt={message.authorName} />
                  <AvatarFallback className="bg-elec-yellow text-black font-medium">
                    {getInitials(message.authorName)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold text-elec-yellow">{message.authorName}</h3>
                  <p className="text-xs text-gray-400">
                    {formatDistanceToNow(message.createdAt, { addSuffix: true })}
                  </p>
                </div>
              </div>
              
              {/* Edit/Delete buttons (only shown for user's own messages) */}
              {isOwnMessage && (
                <div className="flex gap-2">
                  <button 
                    className="text-gray-400 hover:text-elec-yellow"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button 
                    className="text-gray-400 hover:text-red-500"
                    onClick={handleDeleteMessage}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
            
            {/* Message content */}
            {isEditing ? (
              <div className="mb-4">
                <Textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="min-h-[80px] bg-black/60 border border-elec-yellow/30 text-white resize-none"
                />
                <div className="flex justify-end gap-2 mt-2">
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="text-xs text-gray-400 hover:text-white px-2 py-1"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSubmitEdit}
                    className="text-xs bg-elec-yellow text-black px-2 py-1 rounded"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-white mb-4">{message.content}</p>
            )}
            
            {/* Message actions */}
            <div className="flex gap-4">
              <button 
                className={`flex items-center gap-1 ${
                  message.hasUserUpvoted ? 'text-elec-yellow' : 'text-gray-400 hover:text-elec-yellow'
                }`}
                onClick={() => onUpvote(message.id)}
              >
                <ThumbsUp className="h-4 w-4" />
                <span>{message.upvotes}</span>
              </button>
              
              <button 
                className="flex items-center gap-1 text-gray-400 hover:text-elec-yellow"
                onClick={() => setShowCommentInput(!showCommentInput)}
              >
                <MessageSquare className="h-4 w-4" />
                <span>{message.comments.length}</span>
              </button>
            </div>
          </div>
          
          {/* Comments */}
          {message.comments.length > 0 && (
            <div className="bg-black/20 px-4 py-3 border-t border-elec-yellow/10">
              {message.comments.map((comment) => (
                <div key={comment.id} className="flex gap-3 mb-3">
                  <Avatar className="h-7 w-7 mt-1">
                    <AvatarImage src={comment.authorAvatar} alt={comment.authorName} />
                    <AvatarFallback className="bg-gray-700 text-white text-xs">
                      {getInitials(comment.authorName)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-medium text-sm text-elec-yellow">{comment.authorName}</span>
                      <span className="text-xs text-gray-400">
                        {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
                      </span>
                    </div>
                    <p className="text-sm text-white">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Comment input */}
          {showCommentInput && (
            <div className="bg-black/20 px-4 py-3 border-t border-elec-yellow/10">
              <div className="flex gap-3">
                <Avatar className="h-7 w-7 mt-1">
                  <AvatarImage src={currentUserId ? "https://i.pravatar.cc/150?img=9" : undefined} alt="You" />
                  <AvatarFallback className="bg-elec-yellow text-black text-xs">
                    YOU
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="relative">
                    <Textarea
                      placeholder="Write a comment..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      className="min-h-[50px] bg-black/60 border border-elec-yellow/30 text-white resize-none text-sm"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSubmitComment();
                        }
                      }}
                    />
                    <button 
                      onClick={handleSubmitComment} 
                      disabled={!commentText.trim()}
                      className="absolute right-2 bottom-2 bg-elec-yellow text-black p-1 rounded-full disabled:opacity-50"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex justify-end mt-2">
                    <button 
                      onClick={() => {
                        setShowCommentInput(false);
                        setCommentText('');
                      }}
                      className="text-xs text-gray-400 hover:text-white"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        {isOwnMessage && (
          <>
            <ContextMenuItem onClick={() => setIsEditing(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Message
            </ContextMenuItem>
            <ContextMenuItem onClick={handleDeleteMessage} className="text-red-500">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Message
            </ContextMenuItem>
          </>
        )}
        <ContextMenuItem>
          <MessageSquare className="mr-2 h-4 w-4" />
          Send Direct Message
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default ChatMessage;
