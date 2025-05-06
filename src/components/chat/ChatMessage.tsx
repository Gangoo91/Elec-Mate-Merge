
import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, ThumbsUp, Send } from "lucide-react";

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
    <div className="bg-elec-gray-light/5 border border-elec-yellow/10 rounded-lg overflow-hidden shadow-md">
      {/* Message header */}
      <div className="p-4 pb-2">
        <div className="flex items-center space-x-3 mb-2">
          <Avatar className="h-10 w-10 border-2 border-elec-yellow/20">
            <AvatarImage src={message.authorAvatar} alt={message.authorName} />
            <AvatarFallback className="bg-elec-yellow text-elec-dark font-medium">
              {getInitials(message.authorName)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex justify-between">
              <div>
                <p className="font-medium text-white">{message.authorName}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(message.createdAt, { addSuffix: true })}
                </p>
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-elec-yellow/20 text-elec-yellow">
                {message.category}
              </span>
            </div>
          </div>
        </div>
        
        {/* Message content */}
        <div className="text-white text-sm mt-1 mb-3">{message.content}</div>
      </div>
      
      {/* Message actions */}
      <div className="border-t border-elec-yellow/10">
        <div className="flex px-3">
          <Button 
            variant="ghost" 
            className={`flex-1 flex items-center justify-center gap-2 rounded-none py-3 ${
              message.hasUserUpvoted ? 'text-elec-yellow' : 'text-muted-foreground hover:text-elec-yellow'
            }`}
            onClick={() => onUpvote(message.id)}
          >
            <ThumbsUp 
              className={`h-4 w-4 ${message.hasUserUpvoted ? 'fill-elec-yellow' : ''}`} 
            />
            <span>{message.upvotes} {message.upvotes === 1 ? 'Like' : 'Likes'}</span>
          </Button>
          <Button 
            variant="ghost" 
            className="flex-1 flex items-center justify-center gap-2 text-muted-foreground hover:text-elec-yellow rounded-none py-3"
            onClick={() => setShowCommentInput(!showCommentInput)}
          >
            <MessageSquare className="h-4 w-4" />
            <span>{message.comments.length} {message.comments.length === 1 ? 'Comment' : 'Comments'}</span>
          </Button>
        </div>
      </div>
      
      {/* Comments section */}
      {(message.comments.length > 0 || showCommentInput) && (
        <div className="bg-elec-gray-dark/30 px-4 py-3 border-t border-elec-yellow/10">
          {/* Show existing comments */}
          {message.comments.length > 0 && (
            <div className="space-y-4 mb-4">
              {message.comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <Avatar className="h-8 w-8 mt-0.5">
                    <AvatarImage src={comment.authorAvatar} alt={comment.authorName} />
                    <AvatarFallback className="bg-elec-gray-light text-white text-xs">
                      {getInitials(comment.authorName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="bg-elec-gray-light/20 rounded-lg p-3 inline-block">
                      <div className="font-medium text-sm text-white">{comment.authorName}</div>
                      <div className="text-sm text-white">{comment.content}</div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 ml-1">
                      {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Comment input */}
          {showCommentInput && (
            <div className="flex gap-3 mt-3">
              <Avatar className="h-8 w-8 mt-0.5">
                <AvatarImage src={currentUserId ? "https://i.pravatar.cc/150?img=9" : undefined} alt="You" />
                <AvatarFallback className="bg-elec-yellow text-elec-dark text-xs">
                  YOU
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="relative">
                  <Textarea
                    placeholder="Write a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="min-h-[60px] bg-elec-gray-light/10 border-elec-yellow/20 focus:border-elec-yellow focus:ring-elec-yellow/20 text-white rounded-lg pr-10"
                  />
                  <Button
                    size="icon"
                    className="absolute right-2 bottom-2 h-7 w-7 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/80"
                    disabled={!commentText.trim()}
                    onClick={handleSubmitComment}
                  >
                    <Send className="h-3 w-3" />
                  </Button>
                </div>
                <div className="flex justify-end mt-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      setShowCommentInput(false);
                      setCommentText('');
                    }}
                    className="text-muted-foreground text-xs"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
