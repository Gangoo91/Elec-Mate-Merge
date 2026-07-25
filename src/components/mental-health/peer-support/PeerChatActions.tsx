import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreVertical, ShieldAlert, Flag, CheckCircle2 } from 'lucide-react';
import { BlockUserDialog } from './BlockUserDialog';
import { ReportUserDialog } from './ReportUserDialog';

interface PeerChatActionsProps {
  otherUserId: string;
  otherUserName?: string;
  conversationId?: string;
  onBlocked?: () => void;
  /** Render an "End chat" item — marks the conversation ended for both sides. */
  onEndChat?: () => void;
}

export function PeerChatActions({
  otherUserId,
  otherUserName = 'this user',
  conversationId,
  onBlocked,
  onEndChat,
}: PeerChatActionsProps) {
  const [showBlockDialog, setShowBlockDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);

  const handleBlocked = () => {
    onBlocked?.();
  };

  const handleAlsoReport = () => {
    setShowReportDialog(true);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-11 w-11 text-white hover:text-white touch-manipulation"
          >
            <MoreVertical className="h-5 w-5" />
            <span className="sr-only">Chat actions</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {onEndChat && (
            <>
              <DropdownMenuItem onClick={onEndChat} className="gap-2 cursor-pointer">
                <CheckCircle2 className="h-4 w-4 text-white/85" />
                <span>End chat</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuItem
            onClick={() => setShowReportDialog(true)}
            className="gap-2 cursor-pointer"
          >
            <Flag className="h-4 w-4 text-white/85" />
            <span>Report User</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setShowBlockDialog(true)}
            className="gap-2 cursor-pointer text-red-500 focus:text-red-500"
          >
            <ShieldAlert className="h-4 w-4" />
            <span>Block User</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <BlockUserDialog
        open={showBlockDialog}
        onOpenChange={setShowBlockDialog}
        userId={otherUserId}
        userName={otherUserName}
        conversationId={conversationId}
        onBlocked={handleBlocked}
        onAlsoReport={handleAlsoReport}
      />

      <ReportUserDialog
        open={showReportDialog}
        onOpenChange={setShowReportDialog}
        userId={otherUserId}
        userName={otherUserName}
        conversationId={conversationId}
      />
    </>
  );
}
