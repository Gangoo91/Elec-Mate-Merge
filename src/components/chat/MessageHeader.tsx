
import { formatDistanceToNow } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit, Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MessageHeaderProps {
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  createdAt: Date;
  currentUserId?: string;
  onEditClick: () => void;
  onDeleteClick: () => void;
  onAuthorClick: () => void;
}

const MessageHeader = ({ 
  authorId, 
  authorName, 
  authorAvatar, 
  createdAt, 
  currentUserId, 
  onEditClick, 
  onDeleteClick,
  onAuthorClick
}: MessageHeaderProps) => {
  const isOwnMessage = authorId === currentUserId;
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };
  
  return (
    <div className="flex justify-between items-center mb-3">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center cursor-pointer" onClick={onAuthorClick}>
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={authorAvatar} alt={authorName} />
                <AvatarFallback className="bg-elec-yellow text-black font-medium">
                  {getInitials(authorName)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-bold text-elec-yellow">{authorName}</h3>
                <p className="text-xs text-gray-400">
                  {formatDistanceToNow(createdAt, { addSuffix: true })}
                </p>
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Click to send direct message</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      {isOwnMessage && (
        <div className="flex gap-2">
          <button 
            className="text-gray-400 hover:text-elec-yellow"
            onClick={onEditClick}
          >
            <Edit className="h-4 w-4" />
          </button>
          <button 
            className="text-gray-400 hover:text-red-500"
            onClick={onDeleteClick}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default MessageHeader;
