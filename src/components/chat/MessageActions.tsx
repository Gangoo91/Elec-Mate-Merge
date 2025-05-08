
import { useState } from "react";
import { ThumbsUp, MessageSquare, Share2, Bookmark, Flag } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

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
  const [isSaved, setIsSaved] = useState(false);
  
  const handleSaveToggle = () => {
    setIsSaved(prev => !prev);
    toast({
      title: isSaved ? "Removed from saved" : "Saved",
      description: isSaved ? "Post removed from your saved items" : "Post saved to your profile",
      duration: 2000,
    });
  };
  
  const handleShare = () => {
    // In a real implementation, this would open a share dialog or copy a link
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        toast({
          title: "Link copied",
          description: "Post link copied to clipboard",
          duration: 2000,
        });
      })
      .catch(() => {
        toast({
          title: "Share error",
          description: "Could not copy the link",
          variant: "destructive",
          duration: 2000,
        });
      });
  };
  
  const handleReport = () => {
    toast({
      title: "Report submitted",
      description: "Thank you for reporting this content. Our team will review it.",
      duration: 3000,
    });
  };

  return (
    <div className="flex flex-wrap gap-4 mt-4 pt-3 border-t border-elec-yellow/10">
      <button 
        className={`flex items-center gap-1.5 px-2 py-1 rounded-md transition-colors ${
          hasUserUpvoted ? 'text-elec-yellow bg-elec-yellow/10' : 'text-gray-400 hover:text-elec-yellow hover:bg-elec-yellow/5'
        }`}
        onClick={onUpvote}
        aria-label={hasUserUpvoted ? "Remove upvote" : "Upvote"}
      >
        <ThumbsUp className={`h-4 w-4 ${hasUserUpvoted ? 'fill-elec-yellow' : ''}`} />
        <span>{upvotes}</span>
      </button>
      
      <button 
        className="flex items-center gap-1.5 text-gray-400 hover:text-elec-yellow px-2 py-1 rounded-md hover:bg-elec-yellow/5 transition-colors"
        onClick={onCommentToggle}
        aria-label="Comment"
      >
        <MessageSquare className="h-4 w-4" />
        <span>{commentsCount}</span>
      </button>
      
      <button 
        className="flex items-center gap-1.5 text-gray-400 hover:text-elec-yellow px-2 py-1 rounded-md hover:bg-elec-yellow/5 transition-colors"
        onClick={handleShare}
        aria-label="Share"
      >
        <Share2 className="h-4 w-4" />
        <span className="hidden sm:inline">Share</span>
      </button>
      
      <button 
        className={`flex items-center gap-1.5 px-2 py-1 rounded-md transition-colors ml-auto ${
          isSaved ? 'text-elec-yellow bg-elec-yellow/10' : 'text-gray-400 hover:text-elec-yellow hover:bg-elec-yellow/5'
        }`}
        onClick={handleSaveToggle}
        aria-label={isSaved ? "Unsave" : "Save"}
      >
        <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-elec-yellow' : ''}`} />
        <span className="hidden sm:inline">{isSaved ? "Saved" : "Save"}</span>
      </button>
      
      <button 
        className="flex items-center gap-1.5 text-gray-400 hover:text-red-500 px-2 py-1 rounded-md hover:bg-red-500/5 transition-colors"
        onClick={handleReport}
        aria-label="Report"
      >
        <Flag className="h-4 w-4" />
        <span className="hidden sm:inline">Report</span>
      </button>
    </div>
  );
};

export default MessageActions;
