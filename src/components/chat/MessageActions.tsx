
import { ThumbsUp, MessageSquare } from "lucide-react";

interface MessageActionsProps {
  upvotes: number;
  commentsCount: number;
  hasUserUpvoted?: boolean;
  onUpvote: () => void;
  onCommentToggle: () => void;
}

const MessageActions = ({ 
  upvotes, 
  commentsCount, 
  hasUserUpvoted, 
  onUpvote, 
  onCommentToggle 
}: MessageActionsProps) => {
  return (
    <div className="flex gap-4">
      <button 
        className={`flex items-center gap-1 ${
          hasUserUpvoted ? 'text-elec-yellow' : 'text-gray-400 hover:text-elec-yellow'
        }`}
        onClick={onUpvote}
      >
        <ThumbsUp className="h-4 w-4" />
        <span>{upvotes}</span>
      </button>
      
      <button 
        className="flex items-center gap-1 text-gray-400 hover:text-elec-yellow"
        onClick={onCommentToggle}
      >
        <MessageSquare className="h-4 w-4" />
        <span>{commentsCount}</span>
      </button>
    </div>
  );
};

export default MessageActions;
