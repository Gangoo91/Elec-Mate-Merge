
import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, ThumbsUp } from "lucide-react";

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
}

const ChatMessage = ({ message, currentUserId, onUpvote, onPostComment }: ChatMessageProps) => {
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentText, setCommentText] = useState('');
  
  const handleSubmitComment = () => {
    if (commentText.trim()) {
      onPostComment(message.id, commentText);
      setCommentText('');
      setShowCommentInput(false);
    }
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };
  
  return (
    <div className="border border-elec-yellow/10 rounded-lg p-4 bg-elec-gray-light/5 hover:bg-elec-gray-light/10 transition-colors">
      <div className="flex items-start space-x-3">
        {/* Author avatar */}
        <Avatar className="h-10 w-10">
          <AvatarImage src={message.authorAvatar} alt={message.authorName} />
          <AvatarFallback className="bg-elec-yellow text-elec-dark">
            {getInitials(message.authorName)}
          </AvatarFallback>
        </Avatar>
        
        {/* Message content */}
        <div className="flex-1 space-y-2">
          {/* Author info and timestamp */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="font-medium">{message.authorName}</span>
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(message.createdAt, { addSuffix: true })}
              </span>
            </div>
            <span className="text-xs px-2 py-1 rounded-full bg-elec-gray-light/10">
              {message.category}
            </span>
          </div>
          
          {/* Message text */}
          <p className="text-sm">{message.content}</p>
          
          {/* Actions */}
          <div className="flex items-center gap-4 pt-1">
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-1"
              onClick={() => onUpvote(message.id)}
            >
              <ThumbsUp 
                className={`h-4 w-4 ${message.hasUserUpvoted ? 'text-elec-yellow fill-elec-yellow' : ''}`} 
              />
              <span className={`text-xs ${message.hasUserUpvoted ? 'text-elec-yellow' : ''}`}>
                {message.upvotes}
              </span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-1"
              onClick={() => setShowCommentInput(!showCommentInput)}
            >
              <MessageSquare className="h-4 w-4" />
              <span className="text-xs">{message.comments.length}</span>
            </Button>
          </div>
          
          {/* Comment input */}
          {showCommentInput && (
            <div className="pt-2">
              <Textarea
                placeholder="Write your reply..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="min-h-[80px] bg-elec-gray-light/5 text-sm"
              />
              <div className="flex justify-end gap-2 mt-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setShowCommentInput(false);
                    setCommentText('');
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  size="sm"
                  className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/80"
                  onClick={handleSubmitComment}
                  disabled={!commentText.trim()}
                >
                  Reply
                </Button>
              </div>
            </div>
          )}
          
          {/* Comments */}
          {message.comments.length > 0 && (
            <div className="pt-3 pl-4 border-l border-elec-yellow/10 space-y-4 mt-2">
              {message.comments.map((comment) => (
                <div key={comment.id} className="flex items-start space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.authorAvatar} alt={comment.authorName} />
                    <AvatarFallback className="bg-elec-gray-light text-white text-sm">
                      {getInitials(comment.authorName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{comment.authorName}</span>
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
                      </span>
                    </div>
                    <p className="text-sm mt-1">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
