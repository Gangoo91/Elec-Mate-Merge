
import { Edit, Trash2, UserRound, Flag, Ban } from "lucide-react";
import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
} from "@/components/ui/context-menu";

interface MessageContextMenuProps {
  isOwnMessage: boolean;
  onEditClick: () => void;
  onDeleteClick: () => void;
  onDirectMessageClick: () => void;
  onReportClick?: () => void;
  onBlockUserClick?: () => void;
}

const MessageContextMenu = ({ 
  isOwnMessage, 
  onEditClick, 
  onDeleteClick, 
  onDirectMessageClick,
  onReportClick,
  onBlockUserClick
}: MessageContextMenuProps) => {
  return (
    <ContextMenuContent>
      {isOwnMessage ? (
        <>
          <ContextMenuItem onClick={onEditClick}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Message
          </ContextMenuItem>
          <ContextMenuItem onClick={onDeleteClick} className="text-red-500">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Message
          </ContextMenuItem>
        </>
      ) : (
        <>
          <ContextMenuItem onClick={onReportClick} className="text-amber-500">
            <Flag className="mr-2 h-4 w-4" />
            Report Message
          </ContextMenuItem>
          <ContextMenuItem onClick={onBlockUserClick} className="text-red-500">
            <Ban className="mr-2 h-4 w-4" />
            Block User
          </ContextMenuItem>
        </>
      )}
      <ContextMenuSeparator />
      <ContextMenuItem onClick={onDirectMessageClick}>
        <UserRound className="mr-2 h-4 w-4" />
        Send Direct Message
      </ContextMenuItem>
    </ContextMenuContent>
  );
};

export default MessageContextMenu;
