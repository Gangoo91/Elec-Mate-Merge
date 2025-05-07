
import { formatDistanceToNow } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChatComment } from "@/components/messenger/types";
import { getInitials } from "@/utils/stringUtils";

interface CommentsListProps {
  comments: ChatComment[];
}

const CommentsList = ({ comments }: CommentsListProps) => {
  if (comments.length === 0) return null;
  
  return (
    <div className="bg-black/20 px-4 py-3 border-t border-elec-yellow/10">
      {comments.map((comment) => (
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
  );
};

export default CommentsList;
