
import { Edit, Trash2, UserRound } from "lucide-react";
import {
  ContextMenuContent,
  ContextMenuItem,
} from "@/components/ui/context-menu";

interface MessageContextMenuProps {
  isOwnMessage: boolean;
  onEditClick: () => void;
  onDeleteClick: () => void;
  onDirectMessageClick: () => void;
}

const MessageContextMenu = ({ 
  isOwnMessage, 
  onEditClick, 
  onDeleteClick, 
  onDirectMessageClick 
}: MessageContextMenuProps) => {
  return (
    <ContextMenuContent>
      {isOwnMessage && (
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
      )}
      <ContextMenuItem onClick={onDirectMessageClick}>
        <UserRound className="mr-2 h-4 w-4" />
        Send Direct Message
      </ContextMenuItem>
    </ContextMenuContent>
  );
};

export default MessageContextMenu;
