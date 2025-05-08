
import { ThumbsUp, MessageSquare, Share2, Bookmark, Flag } from "lucide-react";

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
    <div className="flex flex-wrap gap-4 mt-4 pt-3 border-t border-elec-yellow/10">
      <button 
        className={`flex items-center gap-1.5 px-2 py-1 rounded-md transition-colors ${
          hasUserUpvoted ? 'text-elec-yellow bg-elec-yellow/10' : 'text-gray-400 hover:text-elec-yellow hover:bg-elec-yellow/5'
        }`}
        onClick={onUpvote}
      >
        <ThumbsUp className={`h-4 w-4 ${hasUserUpvoted ? 'fill-elec-yellow' : ''}`} />
        <span>{upvotes}</span>
      </button>
      
      <button 
        className="flex items-center gap-1.5 text-gray-400 hover:text-elec-yellow px-2 py-1 rounded-md hover:bg-elec-yellow/5 transition-colors"
        onClick={onCommentToggle}
      >
        <MessageSquare className="h-4 w-4" />
        <span>{commentsCount}</span>
      </button>
      
      <button 
        className="flex items-center gap-1.5 text-gray-400 hover:text-elec-yellow px-2 py-1 rounded-md hover:bg-elec-yellow/5 transition-colors"
      >
        <Share2 className="h-4 w-4" />
        <span className="hidden sm:inline">Share</span>
      </button>
      
      <button 
        className="flex items-center gap-1.5 text-gray-400 hover:text-elec-yellow px-2 py-1 rounded-md hover:bg-elec-yellow/5 transition-colors ml-auto"
      >
        <Bookmark className="h-4 w-4" />
        <span className="hidden sm:inline">Save</span>
      </button>
      
      <button 
        className="flex items-center gap-1.5 text-gray-400 hover:text-red-500 px-2 py-1 rounded-md hover:bg-red-500/5 transition-colors"
      >
        <Flag className="h-4 w-4" />
        <span className="hidden sm:inline">Report</span>
      </button>
    </div>
  );
};

export default MessageActions;
